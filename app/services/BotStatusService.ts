import axios from "axios";
import { Environment } from "~/utils/env/env";

export class BotStatusService {
  stop() {
    return axios.post(Environment.getBaseURL() + "stop", {});
  }
  //Stop buying? Freqtrade will continue to handle open trades.
  //No more buy will occur from now. Run /reload_config to reset
  stopBuy() {
    return axios.post(Environment.getBaseURL() + "stopbuy", {});
  }

  start() {
    return axios.post(Environment.getBaseURL() + "start", {});
  }

  reloadConfig() {
    return axios.post(Environment.getBaseURL() + "reload_config", {});
  }

  status() {
    return axios.get(Environment.getBaseURL() + "show_config", {});
  }
}
