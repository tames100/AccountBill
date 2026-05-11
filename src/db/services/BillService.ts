// billService.ts
import { DbHelper } from '../DBHelper/DBHelper';

export interface Bill {
  id?: number;
  name: string;
  amount: number;
  type: 'income' | 'expense';   // 收入或支出
  date: string;                 // ISO 8601 格式 'YYYY-MM-DD'
  note?: string;
  created_at?: string;
  updated_at?: string;
}

export class BillService {
  private dbHelper = DbHelper.getInstance();

  /**
   * 新增账单
   */
  async addBill(bill: Omit<Bill, 'id' | 'created_at' | 'updated_at'>): Promise<number> {
    const { name, amount, type, date, note } = bill;
    const data = { name, amount, type, date, note };
    // 使用基类的 insert 方法
    const newId = await this.dbHelper.insert('bills', data);
    return newId;
  }

  /**
   * 根据 ID 查询账单
   */
  async getBillById(id: number): Promise<Bill | null> {
    const sql = `SELECT * FROM bills WHERE id = ?`;
    return this.dbHelper.queryFirst<Bill>(sql, [id]);
  }

  /**
   * 查询所有账单（可按日期排序）
   */
  async getAllBills(orderBy: 'date' | 'amount' = 'date', descending: boolean = true): Promise<Bill[]> {
    const direction = descending ? 'DESC' : 'ASC';
    const sql = `SELECT * FROM bills ORDER BY ${orderBy} ${direction}`;
    return this.dbHelper.query<Bill>(sql);
  }

  /**
   * 按类型查询账单
   */
  async getBillsByType(type: 'income' | 'expense'): Promise<Bill[]> {
    const sql = `SELECT * FROM bills WHERE type = ? ORDER BY date DESC`;
    return this.dbHelper.query<Bill>(sql, [type]);
  }

  /**
   * 按日期范围查询账单
   * @param startDate YYYY-MM-DD
   * @param endDate YYYY-MM-DD
   */
  async getBillsByDateRange(startDate: string, endDate: string): Promise<Bill[]> {
    const sql = `SELECT * FROM bills WHERE date BETWEEN ? AND ? ORDER BY date DESC`;
    return this.dbHelper.query<Bill>(sql, [startDate, endDate]);
  }

  /**
   * 更新账单
   */
  async updateBill(id: number, updates: Partial<Omit<Bill, 'id' | 'created_at' | 'updated_at'>>): Promise<boolean> {
    // 防止传入 id 或 created_at 等字段
    const { name, amount, type, date, note } = updates;
    const data: Record<string, any> = {};
    if (name !== undefined) data.name = name;
    if (amount !== undefined) data.amount = amount;
    if (type !== undefined) data.type = type;
    if (date !== undefined) data.date = date;
    if (note !== undefined) data.note = note;

    if (Object.keys(data).length === 0) return false;

    // 同时更新 updated_at 字段
    data.updated_at = new Date().toISOString();

    const affectedRows = await this.dbHelper.update('bills', data, 'id = ?', [id]);
    return affectedRows > 0;
  }

  /**
   * 删除账单
   */
  async deleteBill(id: number): Promise<boolean> {
    const affectedRows = await this.dbHelper.delete('bills', 'id = ?', [id]);
    return affectedRows > 0;
  }

  /**
   * 批量删除账单（事务示例）
   */
  async deleteBills(ids: number[]): Promise<boolean> {
    if (ids.length === 0) return false;

    return await this.dbHelper.transaction(async (db) => {
      for (const id of ids) {
        await db.runAsync('DELETE FROM bills WHERE id = ?', [id]);
      }
      return true;
    });
  }

  /**
   * 获取收支汇总（总收入、总支出、结余）
   */
  async getSummary(): Promise<{ totalIncome: number; totalExpense: number; balance: number }> {
    const sql = `
      SELECT 
        SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) as totalIncome,
        SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) as totalExpense
      FROM bills
    `;
    const result = await this.dbHelper.queryFirst<{ totalIncome: number; totalExpense: number }>(sql);
    const totalIncome = result?.totalIncome || 0;
    const totalExpense = result?.totalExpense || 0;
    return {
      totalIncome,
      totalExpense,
      balance: totalIncome - totalExpense
    };
  }
}

// 导出单例方便使用
export const billService = new BillService();