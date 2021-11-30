import * as appSettings from "@nativescript/core/application-settings";

export const localStorage = {
  getString: (key: string, defaultValue?: string): string => {
    return appSettings.getString(key, defaultValue);
  },
  setString: (key: string, value: string) => {
    appSettings.setString(key, value);
  },
  getNumber: (key: string, defaultValue?: number) => {
    return appSettings.getNumber(key, defaultValue);
  },
  setNumber: (key: string, value: number) => {
    appSettings.setNumber(key, value);
  },
  getBoolean: (key: string, defaultValue?: boolean) => {
    return appSettings.getBoolean(key, defaultValue);
  },
  setBoolean: (key: string, value: boolean) => {
    appSettings.setBoolean(key, value);
  },
  remove: (key: string) => {
    appSettings.remove(key);
  },
};
