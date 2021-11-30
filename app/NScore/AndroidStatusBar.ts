import { android as androidAPP } from "@nativescript/core/application";
import { Device } from "@nativescript/core";
import { isDarkMode } from "~/NScore/ThemeAPP";

export const setColorStatusBar = () => {
  const decor = androidAPP.foregroundActivity.getWindow().getDecorView();
  let isDark = isDarkMode();

  // @ts-ignore
  if (Device.sdkVersion >= 23) {
    //android.os.Build.VERSION_CODES.M
    if (!isDark) {
      decor.setSystemUiVisibility(
        // @ts-ignore
        android.view.View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR
      );
    } else {
      decor.setSystemUiVisibility(0);
    }
  }
};
