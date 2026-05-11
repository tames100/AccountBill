import * as SQLite from 'expo-sqlite';

export type SQLiteDatabase = Awaited<ReturnType<typeof SQLite.openDatabaseAsync>>;

/**
 * 抽象数据库基类，提供通用的增删改查方法
 */
export abstract class BaseDbHelper {
  protected db: SQLiteDatabase | null = null;

  /**
   * 子类必须实现获取数据库实例的方法
   */
  protected abstract getDatabase(): Promise<SQLiteDatabase>;

  /**
   * 确保数据库已初始化
   */
  private async ensureDb(): Promise<SQLiteDatabase> {
    if (!this.db) {
      this.db = await this.getDatabase();
    }
    return this.db;
  }

  /**
   * 执行无返回结果的 SQL（INSERT, UPDATE, DELETE, CREATE TABLE 等）
   * @param sql SQL 语句
   * @param params 参数数组
   */
  protected async executeSql(sql: string, params: any[] = []): Promise<void> {
    const db = await this.ensureDb();
    await db.runAsync(sql, params);
  }

  /**
   * 查询多条记录
   * @param sql SQL 查询语句
   * @param params 参数数组
   * @returns 返回泛型 T 类型的数组
   */
  async query<T = any>(sql: string, params: any[] = []): Promise<T[]> {
    const db = await this.ensureDb();
    const result = await db.getAllAsync<T>(sql, params);
    return result;
  }

  /**
   * 查询单条记录（第一条）
   * @param sql SQL 查询语句
   * @param params 参数数组
   * @returns 返回泛型 T 类型的对象或 null
   */
  async queryFirst<T = any>(sql: string, params: any[] = []): Promise<T | null> {
    const rows = await this.query<T>(sql, params);
    return rows.length > 0 ? rows[0] : null;
  }

  /**
   * 插入数据
   * @param tableName 表名
   * @param data 要插入的键值对
   * @returns 插入行的最后 ID（rowid）
   */
  async insert(tableName: string, data: Record<string, any>): Promise<number> {
    const keys = Object.keys(data);
    const placeholders = keys.map(() => '?').join(',');
    const sql = `INSERT INTO ${tableName} (${keys.join(',')}) VALUES (${placeholders})`;
    const values = keys.map(k => data[k]);

    const db = await this.ensureDb();
    const result = await db.runAsync(sql, values);
    return result.lastInsertRowId;
  }

  /**
   * 更新数据
   * @param tableName 表名
   * @param data 要更新的键值对
   * @param whereClause WHERE 子句（不含 'WHERE' 关键字）
   * @param whereParams WHERE 子句的参数
   * @returns 影响的行数
   */
  async update(
    tableName: string,
    data: Record<string, any>,
    whereClause: string,
    whereParams: any[] = []
  ): Promise<number> {
    const setClause = Object.keys(data).map(key => `${key} = ?`).join(',');
    const sql = `UPDATE ${tableName} SET ${setClause} WHERE ${whereClause}`;
    const values = [...Object.values(data), ...whereParams];

    const db = await this.ensureDb();
    const result = await db.runAsync(sql, values);
    return result.changes;
  }

  /**
   * 删除数据
   * @param tableName 表名
   * @param whereClause WHERE 子句
   * @param whereParams 参数
   * @returns 影响的行数
   */
  async delete(tableName: string, whereClause: string, whereParams: any[] = []): Promise<number> {
    const sql = `DELETE FROM ${tableName} WHERE ${whereClause}`;
    const db = await this.ensureDb();
    const result = await db.runAsync(sql, whereParams);
    return result.changes;
  }

  /**
   * 执行事务
   * @param callback 事务回调
   */
  async transaction<T>(callback: (db: SQLiteDatabase) => Promise<T>): Promise<T> {
    const db = await this.ensureDb();
    await db.execAsync('BEGIN TRANSACTION');
    try {
      const result = await callback(db);
      await db.execAsync('COMMIT');
      return result;
    } catch (error) {
      await db.execAsync('ROLLBACK');
      throw error;
    }
  }
}