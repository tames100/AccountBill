// dbhelper.ts
import * as SQLite from 'expo-sqlite';
import { BaseDbHelper, SQLiteDatabase } from './BaseDBHelper';

/**
 * 数据库单例助手
 * 负责数据库的创建、升级及所有表的初始化
 */
export class DbHelper extends BaseDbHelper {
  private static instance: DbHelper;
  private dbInstance: SQLiteDatabase | null = null;
  private isInitialized = false;

  private constructor() {
    super();
  }

  public static getInstance(): DbHelper {
    if (!DbHelper.instance) {
      DbHelper.instance = new DbHelper();
    }
    return DbHelper.instance;
  }

  // 实现抽象方法：获取数据库实例
  protected async getDatabase(): Promise<SQLiteDatabase> {
    if (!this.dbInstance) {
      // 打开或创建数据库文件（例如 myapp.db）
      this.dbInstance = await SQLite.openDatabaseAsync('myapp.db');
    }
    return this.dbInstance;
  }

  /**
   * 初始化数据库：创建所有表（如果不存在）
   * 应在 App 启动时调用一次
   */
  public async initDatabase(): Promise<void> {
    if (this.isInitialized) return;

    const db = await this.getDatabase();
    // 使用 executeSql（基类方法）创建表
    await this.executeSql(`
      CREATE TABLE IF NOT EXISTS bills (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        amount REAL NOT NULL,
        type TEXT NOT NULL CHECK(type IN ('income', 'expense')),
        date TEXT NOT NULL,
        note TEXT,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        updated_at TEXT DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 可以创建索引提升查询性能
    await this.executeSql(`CREATE INDEX IF NOT EXISTS idx_bills_date ON bills(date)`);
    await this.executeSql(`CREATE INDEX IF NOT EXISTS idx_bills_type ON bills(type)`);

    this.isInitialized = true;
    console.log('Database initialized');
  }

  /**
   * 获取原始数据库实例（供复杂查询使用，非必须）
   */
  public async getRawDb(): Promise<SQLiteDatabase> {
    return this.getDatabase();
  }
}