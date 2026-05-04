export function printLog(...msg: string[]): void {
  console.log("=======================")
  console.log(msg.join("  "));
  console.log("=======================")
}