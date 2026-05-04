import { BaseDBHelper } from "@/db/DBHelper/BaseDBHelper";

import { SimpleCondition, WhereClause, Primitive } from "@/db/DBHelper/types";


export interface TableOptions<T>{
  tableName: string;
  primaryKey?: keyof T;
  columns?: (keyof T)[];
  autoIncrement?: boolean;
}

export class DBTable<T extends Record<string, any>> {
  private db: BaseDBHelper;
  private readonly tableName: string;
  private readonly primaryKey: string;
  private columns: string[];
  private autoIncrement: boolean;

  constructor(db: BaseDBHelper, options: TableOptions<T>) {
    this.db = db;
    this.tableName = options.tableName;
    this.primaryKey = (options.primaryKey as string) || "id";
    // 如果用户未提供 columns，则利用第一条插入数据动态推断（需提供示例），但此处要求必须提供
    if (!options.columns || options.columns.length === 0) {
      throw new Error(`Table ${this.tableName}: columns must be provided for type safety`);
    }
    // 确保主键在 columns 中（如果 autoIncrement 且主键不参与 INSERT，可以不在列中，但为简化，要求包含）
    this.columns = options.columns.map(c => c as string);
    // 默认不自增
    this.autoIncrement = options.autoIncrement ?? false;
  }

  /**
   * 校验列名是否属于表的合法字段
   */
  private validateColumnName(column: string): void {
    if (!this.columns.includes(column) && column !== this.primaryKey) {
      throw new Error(`Invalid column name: "${column}" for table ${this.tableName}`);
    }
  }


  // 插入一条记录
  async insert(item: Omit<T, typeof this.primaryKey>): Promise<number> {
    const insertColumns = this.columns.filter(col => col !== this.primaryKey);
    const placeholders = insertColumns.map(() => '?').join(',');
    const sql = `INSERT INTO ${this.tableName} (${insertColumns.join(',')}) VALUES (${placeholders})`;
    const params = insertColumns.map(col => (item as any)[col]);
    const result = await this.db.executeSql(sql, params);

    return result.insertId ?? 0;
  }

  // 批量插入
  async insertMany(items: Omit<T, typeof this.primaryKey>[]): Promise<number[]> {
    const ids: number[] = [];
    for (const item of items) {
      const id = await this.insert(item);
      ids.push(id);
    }
    return ids;
  }

  // 根据主键更新
  async update(item: T): Promise<boolean> {
    const idValue = (item as any)[this.primaryKey];
    if (idValue === undefined) {
      throw new Error(`Primary key ${this.primaryKey} is missing in update item`);
    }
    const updateColumns = this.columns.filter(col => col !== this.primaryKey);
    const setClause = updateColumns.map(col => `${col} = ?`).join(',');
    const sql = `UPDATE ${this.tableName} SET ${setClause} WHERE ${this.primaryKey} = ?`;
    const params = [...updateColumns.map(col => (item as any)[col]), idValue];
    const result = await this.db.executeSql(sql, params);
    return result.rowsAffected > 0;
  }

  // 根据主键删除
  async deleteById(id: Primitive): Promise<boolean> {
    const sql = `DELETE FROM ${this.tableName} WHERE ${this.primaryKey} = ?`;
    const result = await this.db.executeSql(sql, [id]);
    return result.rowsAffected > 0;
  }

  // 按条件删除（条件对象）
  async deleteWhere(conditions: SimpleCondition): Promise<number> {
    const { sql: whereSql, params } = this.db.buildWhereClause(conditions);
    const sql = `DELETE FROM ${this.tableName} ${whereSql}`;
    const result = await this.db.executeSql(sql, params);
    return result.rowsAffected;
  }

  // 根据主键查询
  async findById(id: Primitive): Promise<T | null> {
    const sql = `SELECT * FROM ${this.tableName} WHERE ${this.primaryKey} = ? LIMIT 1`;
    const rows = await this.db.queryAll<T>(sql, [id]);
    return rows.length ? rows[0] : null;
  }

  // 查询所有
  async findAll(orderBy?: string, order: 'ASC' | 'DESC' = 'ASC'): Promise<T[]> {
    let sql = `SELECT * FROM ${this.tableName}`;
    if (orderBy) {
      this.validateColumnName(orderBy);
      sql += ` ORDER BY ${orderBy} ${order}`;
    }
    return this.db.queryAll<T>(sql);
  }

  // 按条件查询（简单等值或IN）
  async findByCondition(conditions: SimpleCondition, orderBy?: string, order: 'ASC' | 'DESC' = 'ASC'): Promise<T[]> {
    const { sql: whereSql, params } = this.db.buildWhereClause(conditions);
    let sql = `SELECT * FROM ${this.tableName} ${whereSql}`;
    if (orderBy) {
      this.validateColumnName(orderBy);
      sql += ` ORDER BY ${orderBy} ${order}`;
    }
    return this.db.queryAll<T>(sql, params);
  }

  // 分页查询
  async findPage(page: number, pageSize: number, conditions?: SimpleCondition, orderBy?: string, order: 'ASC' | 'DESC' = 'ASC'): Promise<{ data: T[]; total: number }> {
    const offset = (page - 1) * pageSize;
    let whereClause: WhereClause = { sql: '', params: [] };
    if (conditions) {
      whereClause = this.db.buildWhereClause(conditions);
    }
    const countSql = `SELECT COUNT(*) as total FROM ${this.tableName} ${whereClause.sql}`;
    const countResult = await this.db.queryOne<{ total: number }>(countSql, whereClause.params);
    const total = countResult?.total ?? 0;

    let sql = `SELECT * FROM ${this.tableName} ${whereClause.sql}`;
    if (orderBy) {
      this.validateColumnName(orderBy);
      sql += ` ORDER BY ${orderBy} ${order}`;
    }
    sql += ` LIMIT ? OFFSET ?`;
    const params = [...whereClause.params, pageSize, offset];
    const data = await this.db.queryAll<T>(sql, params);
    return { data, total };
  }

  // 执行原始SQL（高级用法，返回自定义类型）
  async rawQuery<R = T>(sql: string, params?: Primitive[]): Promise<R[]> {
    return this.db.queryAll<R>(sql, params);
  }
}