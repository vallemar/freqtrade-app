import Vue from "vue";
import { config } from "@vue/test-utils";

const NSElements = [
  "ActionBar",
  "ActionItem",
  "FormattedString",
  "GridLayout",
  "HtmlView",
  "NavigationButton",
  "Page",
  "StackLayout",
  "AbsoluteLayout",
  "FlexboxLayout",
  "TabView",
  "TabViewItem",
  "TextField",
];

/* MOCK VUE */
jest.mock("nativescript-vue", () => Vue);

NSElements.forEach((ele) => {
  Vue.config.ignoredElements.push(ele);
  /*  config.stubs[ele] = {
    template: "</div>",
  };*/
});
