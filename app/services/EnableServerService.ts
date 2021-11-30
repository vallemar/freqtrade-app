import { RefreshToken } from "~/model/payload";
import { Environment } from "~/utils/env/env";
import { BotServer } from "~/repository/BotServerRepository";
import { HttpUtils } from "~/utils/HttpUtils";
import { AuthenticationService } from "./AuthenticationService";

import { Http } from "@nativescript/core";

const authenticationService = new AuthenticationService();

export class EnableServerService {
  async isEnableServer(botServer: BotServer, refreshToken = false) {
    const cancelToken = HttpUtils.buildCancelToken(2000);

    let refresh: RefreshToken = null!;

    try {
      if (refreshToken && !botServer.expired) {
        refresh = await authenticationService.refrehToken(
          botServer.directionServer,
          botServer.refresh_token,
          cancelToken
        );
      }
      if (!refreshToken || (refreshToken && refresh)) {
        const directionServer = Environment.buildBaseURL(
          botServer.directionServer
        );
        const pong = await Http.request({
          url: directionServer + "ping",
          method: "GET",
          timeout: 2000,
        });

        return pong.statusCode == 200;
      }
    } catch (e) {}
    return false;
  }
}
