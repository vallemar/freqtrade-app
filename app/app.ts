import Vue from "nativescript-vue";
import App from "./pages/App.vue";
import { routes } from "./plugins/router";
// @ts-ignore
import Navigator from "nativescript-vue-navigator";
import { AuthenticationService } from "~/services/AuthenticationService";
import CollectionView from "@nativescript-community/ui-collectionview/vue";
import BottomNavigation from "@nativescript-community/ui-material-bottom-navigation/vue";
import { Application, isAndroid } from "@nativescript/core";
import { setColorStatusBar } from "~/NScore/AndroidStatusBar";

/* LOGIN */
const authenticationService = new AuthenticationService();
authenticationService.init();

/* INIT NATIVE */
if (isAndroid) {
  Application.on(Application.resumeEvent, setColorStatusBar);
}

/* CONFIG NS-VUE */
declare let __DEV__: boolean;
Vue.config.silent = !__DEV__;
Vue.config.suppressRenderLogs = true;

/* REGISTER ELEMENTS */
Vue.registerElement(
  "BarChart",
  () => require("@nativescript-community/ui-chart/charts").BarChart
);
Vue.registerElement(
  "PieChart",
  () => require("@nativescript-community/ui-chart/charts").PieChart
);
Vue.registerElement(
  "PullToRefresh",
  () => require("@nativescript-community/ui-pulltorefresh").PullToRefresh
);
Vue.use(CollectionView);
Vue.use(BottomNavigation);
Vue.use(Navigator, { routes });

new Vue({
  render: (h) => h(App),
}).$start();
