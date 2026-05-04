import * as SQLite from 'expo-sqlite';
import { BaseDBHelper } from "@/db/DBHelper/BaseDBHelper";
import { Primitive } from "./types";
import { databaseName } from "@/db/TableName";

class DBHelper extends BaseDBHelper {
  private db: SQLite.SQLiteDatabase | null = null;

  // 打开数据库（单例模式）
  async open(): Promise<SQLite.SQLiteDatabase> {
    if (this.db) return this.db;
    // 数据库名称：记账本
    this.db = await SQLite.openDatabaseAsync(databaseName);
    return this.db;
  }

  async close(): Promise<void> {
    if (this.db) {
      await this.db.closeAsync();
      this.db = null;
    }
  }

  private ensureDb(): SQLite.SQLiteDatabase {
    if (!this.db) throw new Error('Database not opened. Call open() first.');
    return this.db;
  }

  async executeSql(sql: string, params: Primitive[] = []): Promise<{ rowsAffected: number, insertId?: number }> {
    const db = this.ensureDb();
    const result = await db.runAsync(sql, ...params);

    return {
      rowsAffected: result.changes,
      insertId: result.lastInsertRowId
    }
  }

  async queryAll<T>(sql: string, params: Primitive[] = []): Promise<T[]> {
    const db = this.ensureDb();
    return db.getAllAsync<T>(sql, ...params);
  }

  async queryOne<T>(sql: string, params: Primitive[] = []): Promise<T | null> {
    const db = this.ensureDb();
    const result = await db.getFirstAsync<T>(sql, ...params);
    return result ?? null;
  }

  // 事务支持
  async beginTransaction(): Promise<void> {
    await this.executeSql('BEGIN TRANSACTION');
  }
  async commitTransaction(): Promise<void> {
    await this.executeSql('COMMIT');
  }
  async rollbackTransaction(): Promise<void> {
    await this.executeSql('ROLLBACK');
  }
}

// 导出单例
export const DatabaseHelper = new DBHelper();