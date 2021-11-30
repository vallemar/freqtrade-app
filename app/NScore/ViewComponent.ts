import Vue from "nativescript-vue";

export const buildViewComponent = (component: any, props?: any) => {
  // @ts-ignore
  return new Vue({
    render: (h: any) =>
      h(component, {
        props: props,
      }),
    // @ts-ignore
  }).$mount().$el.nativeView;
};
