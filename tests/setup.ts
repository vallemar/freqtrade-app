import Vue from "vue";

/* MOCK Vue & Nativescript */
jest.mock("nativescript-vue", () => Vue);
jest.mock("@nativescript/core", () => {});

/* MOCK Nativescript Component */
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

NSElements.forEach((ele) => {
  Vue.config.ignoredElements.push(ele);
});
