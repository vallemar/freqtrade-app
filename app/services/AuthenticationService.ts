import axios from "axios";
import { Login, RefreshToken, Token } from "~/model/payload";
import { Base64 } from "~/NScore/Base64";
import { localStorage } from "@/utils/LocalStorage";
import { Environment } from "~/utils/env/env";
import { HttpUtils } from "~/utils/HttpUtils";
import { BotServerRepository } from "~/repository/BotServerRepository";
import { Http } from "@nativescript/core";

export enum KEY_SESSION {
  TOKEN = "auth_token",
  REFRESH_TOKEN = "refresh_token",
  DIRECTION_SERVER = "direction_server",
}

export class AuthenticationService {
  timer = null as any;

  init() {
    const isUserLogin = this.isUserSession();
    if (isUserLogin) {
      this.restoreUserFromStorage();
      this.refreshAndUpdateExpiredToken();
    }
    return isUserLogin;
  }

  isUserSession() {
    return !!localStorage.getString(KEY_SESSION.TOKEN);
  }

  login(
    user: string,
    password: string,
    directionServer: string
  ): Promise<Login> {
    return new Promise((resolve, reject) => {
      axios
        .post<Login>(
          Environment.buildBaseURL(directionServer) + "token/login",
          {},
          {
            headers: {
              Authorization: `${"Basic"} ${Base64.encode(
                user + ":" + password
              )}`,
            },
          }
        )
        .then((response) => {
          this.selectServer(response.data, directionServer);
          resolve(response.data);
        })
        .catch((e) => {
          reject();
        });
    });
  }

  selectServer(login: Login, directionServer: string) {
    this.saveToken(login);
    this.saveDirectionServer(directionServer);
    this.timerRefresh();
  }

  refrehToken(
    directionServer?: string,
    token?: string,
    cancelToken?: { token: any }
  ): Promise<RefreshToken> {
    const baseURL = directionServer
      ? Environment.buildBaseURL(directionServer)
      : Environment.getBaseURL();

    return new Promise((resolve, reject) => {
      Http.request({
        url: baseURL + "token/refresh",
        method: "POST",
        timeout: 2000,
        headers: {
          Authorization: `${"Bearer"} ${
            token || localStorage.getString(KEY_SESSION.REFRESH_TOKEN)
          }`,
        },
      })
        .then((response) => {
          // @ts-ignore
          resolve(response.content.toJSON());
        })
        .catch((e) => {
          reject();
        });
    });
  }

  refreshAndUpdateExpiredToken() {
    return this.refrehToken()
      .then((data) => {
        if (data) {
          const botServerRepository = new BotServerRepository();
          const botServer = botServerRepository.findEnable();
          if (botServer) {
            botServer.token = data.access_token;
            botServerRepository.store(botServer);
          }
          this.saveToken(data as Login);
          this.timerRefresh();
        }
      })
      .catch((e) => {
        console.log("ERROR refreshAndUpdateExpiredToken " + e);
      });
  }

  restoreUserFromStorage() {
    axios.defaults.headers.common.Authorization = `${"Bearer"} ${localStorage.getString(
      KEY_SESSION.TOKEN
    )}`;
  }

  expiredToken() {
    return HttpUtils.checkExpiredToken(
      localStorage.getString(KEY_SESSION.TOKEN)
    );
  }

  expiredRefreshToken() {
    return HttpUtils.checkExpiredToken(
      localStorage.getString(KEY_SESSION.REFRESH_TOKEN)
    );
  }

  private timerRefresh() {
    const minDelay = 10;
    var delay = minDelay * 60 * 1000;
    if (this.timer) {
      clearInterval(this.timer);
    }
    this.timer = setInterval(() => {
      console.log("Run Refresh Token");
      clearInterval(this.timer);
      this.refreshAndUpdateExpiredToken();
    }, delay);
  }

  private saveDirectionServer(directionServer: string) {
    console.log("saveDirectionServer: " + directionServer);
    localStorage.setString(KEY_SESSION.DIRECTION_SERVER, directionServer);
  }

  private saveToken(auth: Login) {
    axios.defaults.headers.common.Authorization = `${"Bearer"} ${
      auth.access_token
    }`;
    axios.defaults.headers.common["Content-Type"] = "application/json";
    localStorage.setString(KEY_SESSION.TOKEN, auth.access_token);
    if (auth.refresh_token) {
      localStorage.setString(KEY_SESSION.REFRESH_TOKEN, auth.refresh_token);
    }
  }

  remove() {
    localStorage.remove(KEY_SESSION.DIRECTION_SERVER);
    localStorage.remove(KEY_SESSION.TOKEN);
    localStorage.remove(KEY_SESSION.REFRESH_TOKEN);
    delete axios.defaults.headers.common["Authorization"];
  }
}
