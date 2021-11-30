import { environment as prodEnvironment } from "./environment.prod";
import { environment as localEnvironment } from "./environment.local";
import { localStorage } from "@/utils/LocalStorage";
import { KEY_SESSION } from "~/services/AuthenticationService";

export interface PropsEnvironment {
  name: string;
  local: boolean;
  production: boolean;
  baseAPI: string;
  version: string;
  portAPI?: number;
  apiUrl?: string;
  url?: string;
  staticUrl?: string;
  getBaseURL?: () => string;
}

export class Environment {
  static getProps(): PropsEnvironment {
    let envVars;
    switch (process.env.ENVIRONMENT) {
      case "prod":
        envVars = prodEnvironment;
        break;
      default:
        envVars = localEnvironment;
    }
    return envVars;
  }

  static isProduction() {
    return Environment.getProps().production;
  }

  static getBaseURL = () => {
    if (!localStorage.getString(KEY_SESSION.DIRECTION_SERVER)) {
      console.log(KEY_SESSION.DIRECTION_SERVER);
      console.log(localStorage.getString(KEY_SESSION.DIRECTION_SERVER));
    }
    return (
      localStorage.getString(KEY_SESSION.DIRECTION_SERVER) +
      "/" +
      Environment.getProps().baseAPI +
      "/" +
      Environment.getProps().version +
      "/"
    );
  };

  static buildBaseURL = (directionServer: string) => {
    return (
      directionServer +
      "/" +
      Environment.getProps().baseAPI +
      "/" +
      Environment.getProps().version +
      "/"
    );
  };
}
