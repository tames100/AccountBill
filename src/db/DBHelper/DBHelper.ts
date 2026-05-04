import * as SQLite from 'expo-sqlite';

export interface Transaction {
  id?: number;
  amount: number;         // 正收入，负支出
  type: 'income' | 'expense';
  category_id?: number;
  note?: string;
  transaction_date: string; // YYYY-MM-DD
  created_at?: string;
}

class DBHelper {
  private db: SQLite.SQLiteDatabase | null = null;

  // 打开数据库（单例模式）
  async openDatabase(): Promise<SQLite.SQLiteDatabase> {
    if (this.db) return this.db;
    // 数据库名称：记账本
    this.db = await SQLite.openDatabaseAsync('accounting.db');
    await this.createTables("");
    return this.db;
  }

  // 创建表（初始化时调用）
  private async createTables(tableName: string): Promise<void> {
    const db = await this.openDatabase();
    const sql = `
            CREATE TABLE IF NOT EXISTS ${tableName} (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                amount REAL NOT NULL,
                type TEXT NOT NULL,
                category_id INTEGER,
                note TEXT,
                transaction_date TEXT NOT NULL,
                created_at TEXT DEFAULT CURRENT_TIMESTAMP
            );
            CREATE INDEX IF NOT EXISTS idx_transactions_date ON transactions(transaction_date);
        `;
    await db.execAsync(sql);
  }

  // ========== 增 (Insert) ==========
  async insertTransaction(tx: Omit<Transaction, 'id' | 'created_at'>): Promise<number> {
    const db = await this.openDatabase();
    const sql = `
            INSERT INTO transactions (amount, type, category_id, note, transaction_date)
            VALUES (?, ?, ?, ?, ?)
        `;
    const result = await db.runAsync(sql, [
      tx.amount,
      tx.type,
      tx.category_id ?? null,
      tx.note ?? null,
      tx.transaction_date,
    ]);
    return result.lastInsertRowId;
  }

  // ========== 删 (Delete) ==========
  async deleteTransaction(id: number): Promise<boolean> {
    const db = await this.openDatabase();
    const result = await db.runAsync('DELETE FROM transactions WHERE id = ?', id);
    return result.changes > 0;
  }

  // 批量删除（按日期范围删除）
  async deleteTransactionsByDate(startDate: string, endDate: string): Promise<number> {
    const db = await this.openDatabase();
    const result = await db.runAsync(
      'DELETE FROM transactions WHERE transaction_date BETWEEN ? AND ?',
      startDate,
      endDate
    );
    return result.changes;
  }

  // ========== 改 (Update) ==========
  async updateTransaction(tx: Transaction): Promise<boolean> {
    if (!tx.id) throw new Error('缺少id');
    const db = await this.openDatabase();
    const sql = `
            UPDATE transactions 
            SET amount = ?, type = ?, category_id = ?, note = ?, transaction_date = ?
            WHERE id = ?
        `;
    const result = await db.runAsync(sql, [
      tx.amount,
      tx.type,
      tx.category_id ?? null,
      tx.note ?? null,
      tx.transaction_date,
      tx.id,
    ]);
    return result.changes > 0;
  }

  // ========== 查 (Query) ==========
  // 获取所有交易（按日期倒序）
  async getAllTransactions(): Promise<Transaction[]> {
    const db = await this.openDatabase();
    const result = await db.getAllAsync<Transaction>(
      'SELECT * FROM transactions ORDER BY transaction_date DESC, id DESC'
    );
    return result;
  }

  // 按日期范围查询
  async getTransactionsByDateRange(startDate: string, endDate: string): Promise<Transaction[]> {
    const db = await this.openDatabase();
    const rows = await db.getAllAsync<Transaction>(
      'SELECT * FROM transactions WHERE transaction_date BETWEEN ? AND ? ORDER BY transaction_date DESC',
      startDate,
      endDate
    );
    return rows;
  }

  // 分页查询（每页条目数，页码从0开始）
  async getTransactionsPaginated(page: number, pageSize: number): Promise<{
    data: Transaction[];
    total: number;
  }> {
    const db = await this.openDatabase();
    const offset = page * pageSize;
    const data = await db.getAllAsync<Transaction>(
      'SELECT * FROM transactions ORDER BY transaction_date DESC, id DESC LIMIT ? OFFSET ?',
      pageSize,
      offset
    );
    const totalResult = await db.getFirstAsync<{ total: number }>('SELECT COUNT(*) as total FROM transactions');
    const total = totalResult?.total ?? 0;
    return { data, total };
  }

  // 按类型查询 (收入/支出)
  async getTransactionsByType(type: 'income' | 'expense'): Promise<Transaction[]> {
    const db = await this.openDatabase();
    return db.getAllAsync<Transaction>(
      'SELECT * FROM transactions WHERE type = ? ORDER BY transaction_date DESC',
      type
    );
  }

  // 获取某个月的汇总 (收入总和，支出总和)
  async getMonthlySummary(year: number, month: number): Promise<{
    totalIncome: number;
    totalExpense: number;
  }> {
    const startDate = `${year}-${String(month).padStart(2, '0')}-01`;
    const lastDay = new Date(year, month, 0).getDate();
    const endDate = `${year}-${String(month).padStart(2, '0')}-${lastDay}`;
    const db = await this.openDatabase();
    const result = await db.getFirstAsync<{
      totalIncome: number;
      totalExpense: number;
    }>(
      `SELECT 
                SUM(CASE WHEN amount > 0 THEN amount ELSE 0 END) as totalIncome,
                SUM(CASE WHEN amount < 0 THEN amount ELSE 0 END) as totalExpense
             FROM transactions 
             WHERE transaction_date BETWEEN ? AND ?`,
      startDate,
      endDate
    );
    return {
      totalIncome: result?.totalIncome ?? 0,
      totalExpense: result?.totalExpense ?? 0,
    };
  }

  // 关闭数据库（一般不需要主动关闭，但可在应用退出时调用）
  async closeDatabase(): Promise<void> {
    if (this.db) {
      await this.db.closeAsync();
      this.db = null;
    }
  }
}

// 导出单例
export const dbHelper = new DBHelper();