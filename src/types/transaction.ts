export type TransactionType = "income" | "expense" | "transfer";

/**
 * 账单类型
 */
export interface Transaction {
  id: string;
  // 金额
  amount: number;
  // 账单类型：收入、支出、转账
  type: TransactionType;
  // 分类ID
  categoryId: string;
  // 备注
  remark: string;
  // 账户
  account: string;
  // 账单创建时间（yyyy-MM-dd HH:mm:ss）
  createTime: Date;
  // 账单更新时间（yyyy-MM-dd HH:mm:ss）
  updateTime: Date;
}
