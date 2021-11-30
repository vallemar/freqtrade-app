export class UtilNumber {
  static toFixed(number: number, decimal = 2) {
    return (Math.round(number * 100) / 100).toFixed(decimal);
  }
}
