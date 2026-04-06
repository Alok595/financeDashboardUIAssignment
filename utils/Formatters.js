/** Format a number as Indian Rupees */
export function toINR(n) {
  return "₹" + Number(n).toLocaleString("en-IN");
}
