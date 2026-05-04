import { TransactionType } from "./transaction";

/**
 * 分类类型
 */
export interface Category {
  id: string;
  name: string;
  icon: string;
  type: TransactionType;
  parentId?: string;
  level: 1 | 2;
  isDefault: boolean;
}