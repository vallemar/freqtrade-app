import axios from "axios";
import {
  Balance,
  Blacklist,
  Daily,
  Performance,
  Profit,
  Status,
  Trades,
  Whitelist,
} from "~/model/payload";
import { Environment } from "~/utils/env/env";
import { HttpUtils } from "~/utils/HttpUtils";

export class DashboardService {
  getWhitelist() {
    return axios.get<Whitelist>(Environment.getBaseURL() + "whitelist");
  }

  getBlacklist() {
    return axios.get<Blacklist>(Environment.getBaseURL() + "blacklist");
  }

  getProfit() {
    return axios.get<Profit>(Environment.getBaseURL() + "profit");
  }

  getBalance() {
    return axios.get<Balance>(Environment.getBaseURL() + "balance");
  }

  getDaily() {
    return axios.get<Daily>(Environment.getBaseURL() + "daily");
  }

  getStatus() {
    return axios.get<Status[]>(Environment.getBaseURL() + "status", {
      cancelToken: HttpUtils.buildCancelToken(5000).token,
    });
  }

  getPerformance() {
    return axios.get<Performance>(Environment.getBaseURL() + "performance");
  }

  getTrades() {
    return axios.get<Trades>(Environment.getBaseURL() + "trades");
  }
}
