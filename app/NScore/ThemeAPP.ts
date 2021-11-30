import { isAndroid, isIOS, Utils } from "@nativescript/core";

export const isDarkMode = () => {
  if (isAndroid) {
    const nightModeFlags =
      Utils.android.getApplicationContext().getResources().getConfiguration()
        .uiMode & android.content.res.Configuration.UI_MODE_NIGHT_MASK;
    switch (nightModeFlags) {
      case android.content.res.Configuration.UI_MODE_NIGHT_YES:
        return true;
      case android.content.res.Configuration.UI_MODE_NIGHT_NO:
        break;
      case android.content.res.Configuration.UI_MODE_NIGHT_UNDEFINED:
        break;
    }
  } else if (isIOS) {
    return (
      UITraitCollection.currentTraitCollection.userInterfaceStyle ===
      UIUserInterfaceStyle.Dark
    );
  }

  return false;
};
