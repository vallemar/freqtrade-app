export class Text {
  static showText(showDetails: boolean, text: string) {
    return showDetails ? text : "***";
  }
}
