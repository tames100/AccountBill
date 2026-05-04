export type Primitive = string | number | boolean | null

export interface WhereClause {
  sql: string, // sql语句
  params: Primitive[] // 参数列表
}

// 简单条件对象类型（用于便捷调用）
export type SimpleCondition = Record<string, Primitive | Primitive[]>;