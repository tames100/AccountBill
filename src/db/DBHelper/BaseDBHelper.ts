import { Primitive, SimpleCondition, WhereClause } from "@/db/DBHelper/types";


export abstract class BaseDBHelper {
// 执行非查询 SQL（INSERT/UPDATE/DELETE），返回影响行数及自增ID（如果有）
  abstract executeSql(sql: string, params?: Primitive[]): Promise<{ rowsAffected: number, insertId?: number }>
  // 查询多条记录
  abstract queryAll<T>(sql: string, params?: Primitive[]): Promise<T[]>;

  // 查询单条记录
  abstract queryOne<T>(sql: string, params?: Primitive[]): Promise<T | null>;

  // 开启事务（可选）
  abstract beginTransaction?(): Promise<void>;
  abstract commitTransaction?(): Promise<void>;
  abstract rollbackTransaction?(): Promise<void>;

  // 将简单条件对象转换为 WhereClause
  public buildWhereClause(conditions: SimpleCondition): WhereClause {
    const keys = Object.keys(conditions);
    const clauses: string[] = [];
    const params: Primitive[] = [];

    for (const key of keys) {
      const value = conditions[key];
      if (Array.isArray(value)) {
        // IN 查询: field IN (?, ?, ...)
        const placeholders = value.map(() => '?').join(',');
        clauses.push(`${key} IN (${placeholders})`);
        params.push(...value);
      } else {
        clauses.push(`${key} = ?`);
        params.push(value);
      }
    }
    return {
      sql: clauses.length ? 'WHERE ' + clauses.join(' AND ') : '',
      params,
    };
  }
}