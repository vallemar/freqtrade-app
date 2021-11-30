import { isDarkMode } from "~/NScore/ThemeAPP";

export class Colors {
  static bgWhite = "white";
  static bgDark = "#1a222c";
  static up = "#16c784";
  static down = "#ea3943";
  static colorPrimary = "#3861fb";
  static warning = "#881d22";

  /*Light*/
  private static bgColorLight = "#f4f6ff";
  private static bgSecondaryLight = "white";
  private static colorTextLight = "#1a222c";
  private static colorTextSecondaryLight = "#959fa7";

  /*DARK*/
  private static bgColorDark = "#20222e";
  private static bgSecondaryDark = "#323546";
  private static colorTextDark = "white";
  private static colorTextSecondaryDark = "#58595d";

  static get bgColor() {
    return isDarkMode() ? this.bgColorDark : this.bgColorLight;
  }
  static get bgSecondary() {
    return isDarkMode() ? this.bgSecondaryDark : this.bgSecondaryLight;
  }
  static get colorText() {
    return isDarkMode() ? this.colorTextDark : this.colorTextLight;
  }
  static get colorTextSecondary() {
    return isDarkMode()
      ? this.colorTextSecondaryDark
      : this.colorTextSecondaryLight;
  }
}
