import { DatabaseHelper } from "@/db/DBHelper/DBHelper";
import { tableTransaction } from "@/db/TableName";
import { DBTable } from "@/db/DBHelper/DBTable";
import { Transaction, TransactionType } from "@/types/transaction";

export class TransactionDB {
  private table: DBTable<Transaction>;

  constructor() {
    this.table = new DBTable<Transaction>(DatabaseHelper, {
      tableName: tableTransaction,
      columns: ["id", "amount", "type", "categoryId", "remark", "account", "createTime", "updateTime"],
      autoIncrement: true,
    })

  }

  async addTransaction(transaction: Omit<Transaction, "updateTime">): Promise<boolean> {
    const now = new Date();
    const newTx: Transaction = {
      ...transaction,
      updateTime: now,
      createTime: transaction.createTime || now,
    }
    return await this.table.insert(newTx) > 0;
  }


  async updateTransaction(tx: Transaction): Promise<boolean> {
    if (!tx.id) throw new Error('缺少 id');
    const updated = { ...tx, updateTime: new Date() };
    return this.table.update(updated);
  }

  async deleteTransaction(id: string): Promise<boolean> {
    return this.table.deleteById(id);
  }

  async getTransactionById(id: string): Promise<Transaction | null> {
    return this.table.findById(id);
  }

  async getAllTransactions(orderBy: keyof Transaction = 'createTime', order: 'ASC' | 'DESC' = 'DESC'): Promise<Transaction[]> {
    return this.table.findAll(orderBy as string, order);
  }

  // ========== 条件查询（安全） ==========
  async getTransactionsByType(type: TransactionType): Promise<Transaction[]> {
    return this.table.findByCondition({ type }, 'createTime', 'DESC');
  }

  async getTransactionsByCategory(categoryId: string): Promise<Transaction[]> {
    return this.table.findByCondition({ categoryId }, 'createTime', 'DESC');
  }

  async getTransactionsByAccount(account: string): Promise<Transaction[]> {
    return this.table.findByCondition({ account }, 'createTime', 'DESC');
  }

  // 日期范围查询（使用原始 SQL，但因为使用参数化查询，依然安全）
  async getTransactionsByDateRange(startDate: Date, endDate: Date): Promise<Transaction[]> {
    const sql = `
      SELECT * FROM transactions 
      WHERE createTime BETWEEN ? AND ? 
      ORDER BY createTime DESC
    `;
    return this.table.rawQuery(sql, [startDate.toISOString(), endDate.toISOString()]);
  }

  // 分页查询（支持可选类型过滤）
  async getTransactionsPaginated(
    page: number,
    pageSize: number,
    type?: TransactionType
  ): Promise<{ data: Transaction[]; total: number }> {
    if (type) {
      return this.table.findPage(page, pageSize, { type }, 'createTime', 'DESC');
    } else {
      return this.table.findPage(page, pageSize, undefined, 'createTime', 'DESC');
    }
  }

  // 月度汇总
  async getMonthlySummary(year: number, month: number): Promise<{
    income: number;
    expense: number;
    transfer: number;
    balance: number;
  }> {
    const start = new Date(year, month - 1, 1);
    const end = new Date(year, month, 0, 23, 59, 59);
    const sql = `
      SELECT type, SUM(amount) as total
      FROM transactions
      WHERE createTime BETWEEN ? AND ?
      GROUP BY type
    `;
    const rows = await this.table.rawQuery<{ type: TransactionType; total: number }>(
      sql,
      [start.toISOString(), end.toISOString()]
    );
    let income = 0, expense = 0, transfer = 0;
    rows.forEach(row => {
      if (row.type === 'income') income = row.total;
      else if (row.type === 'expense') expense = row.total;
      else if (row.type === 'transfer') transfer = row.total;
    });
    return { income, expense, transfer, balance: income - expense };
  }

}