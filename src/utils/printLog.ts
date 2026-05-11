import { formatDate, formatDateTime } from "@/utils/format";

export function printLog(...msg: string[]): void {
  console.log("=======================")
  console.log(formatDateTime(new Date()) ,"<====>",msg.join("  "));
  console.log("=======================")
}