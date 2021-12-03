/*import {createRouter} from "nativescript-vue-router-extended";*/
// Initialize Example Routes
import NewBot from "@/pages/NewBot.vue";
import BotDetails from "@/pages/BotDetails.vue";
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
  "/bot_details": {
    component: BotDetails,
  },
};
