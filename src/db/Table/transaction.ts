import { DatabaseHelper } from "@/db/DBHelper/DBHelper";
import { tableSetting } from "@/db/TableName";

const dbHelper = new DatabaseHelper()
await dbHelper.open();

await dbHelper.executeSql(`
CREATE TABLE ${tableSetting} (
  id
  theme 
)`)