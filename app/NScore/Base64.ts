import { isAndroid, isIOS } from "@nativescript/core";

export class Base64 {
  static encode(textString: string) {
    if (isAndroid) {
      const text = new java.lang.String(textString);
      const data = text.getBytes("UTF-8");
      return android.util.Base64.encodeToString(
        data,
        android.util.Base64.DEFAULT
      );
    } else if (isIOS) {
      const text = NSString.stringWithString(textString);
      const data = text.dataUsingEncoding(NSUTF8StringEncoding);
      return data.base64EncodedStringWithOptions(0);
    }
  }

  // @ts-ignore
  static decode(base64String: string): string {
    if (isAndroid) {
      const data = android.util.Base64.decode(
        base64String,
        android.util.Base64.DEFAULT
      );

      return new java.lang.String(data).toString();
    } else if (isIOS) {
      //https://stackoverflow.com/questions/19348104/check-objective-c-string-for-specific-characters
      let encoded64 = NSString.alloc().initWithString(base64String);
      const remainder = encoded64.length % 4;
      if (remainder > 0) {
        encoded64 = NSString.alloc().initWithString(
          encoded64.stringByPaddingToLengthWithStringStartingAtIndex(
            encoded64.length + 4 - remainder,
            "=",
            0
          )
        );
      }

      const decodedData = NSData.alloc().initWithBase64EncodedStringOptions(
        // @ts-ignore
        encoded64,
        0
      );
      // @ts-ignore
      const result: string = NSString.alloc().initWithDataEncoding(
        decodedData,
        NSUTF8StringEncoding
      );
      return result;
    }
  }
}
