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

export const createLedgerTable = `
CREATE TABLE IF NOT EXISTS ledgers (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    icon TEXT,
    create_time TEXT NOT NULL,
    update_time TEXT NOT NULL
);`

const createcategoryTable = `
CREATE TABLE IF NOT EXISTS categories (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    icon TEXT,
    is_just_show_this INTEGER DEFAULT 0,   -- 0: 全局显示, 1: 仅当前账本显示
    parent_id TEXT,                        -- 父分类ID，NULL 表示一级分类
    ledger_id TEXT,                        -- 若 is_just_show_this=1 则需要关联账本
    create_time TEXT NOT NULL,
    update_time TEXT NOT NULL,
    FOREIGN KEY (parent_id) REFERENCES categories(id),
    FOREIGN KEY (ledger_id) REFERENCES ledgers(id)
);`
