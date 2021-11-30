import { CancelToken } from "axios";
import { Base64 } from "~/NScore/Base64";
import { Token } from "~/model/payload";

export class HttpUtils {
  static buildCancelToken(timeout = 2000): { token: any } {
    // @ts-ignore
    let source = CancelToken.source();
    setTimeout(() => {
      source.cancel();
    }, timeout);
    return source;
  }

  static parseJwt(token: string): Token {
    const data = token.split(".")[1];
    return JSON.parse(Base64.decode(data));
  }

  static checkExpiredToken(token: string): boolean {
    return HttpUtils.parseJwt(token).exp < new Date().getTime() / 1000;
  }
}
