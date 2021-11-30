/*import {createRouter} from "nativescript-vue-router-extended";*/
// Initialize Example Routes
import NewBot from "@/pages/NewBot.vue";
import Home from "@/pages/Home.vue";
import ClosedProfit from "@/pages/ClosedProfit.vue";

export const routes = {
  "/": {
    component: Home,
  },
  "/closed_profit": {
    component: ClosedProfit,
  },
  "/new_bot": {
    component: NewBot,
  },
};
