// db/sql/createTables.ts
export const createTransactionsTable = `
  CREATE TABLE IF NOT EXISTS transactions (
    id TEXT PRIMARY KEY,
    amount REAL NOT NULL,
    type TEXT NOT NULL CHECK(type IN ('income','expense','transfer')),
    categoryId TEXT NOT NULL,
    remark TEXT,
    account TEXT NOT NULL,
    createTime TEXT NOT NULL,   -- 存储 ISO 字符串
    updateTime TEXT NOT NULL
  );
  CREATE INDEX IF NOT EXISTS idx_transactions_createTime ON transactions(createTime);
  CREATE INDEX IF NOT EXISTS idx_transactions_type ON transactions(type);
  CREATE INDEX IF NOT EXISTS idx_transactions_categoryId ON transactions(categoryId);
`;