import { CoreTypes } from "@nativescript/core";

export const DEFAULT_ANIMATION_CURVE = CoreTypes.AnimationCurve.cubicBezier(
  0.17,
  0.89,
  0.24,
  0.87
);

export const ROOTLAYOUT_BOTTOM_SHEET_ORDER_TRADERS = {
  shadeCover: {
    color: "#000",
    opacity: 0.7,
    tapToClose: true,
  },
  animation: {
    enterFrom: {
      translateY: 1000,
      duration: 150,
      curve: DEFAULT_ANIMATION_CURVE,
    },
    exitTo: {
      translateY: 1000,
      duration: 150,
      curve: DEFAULT_ANIMATION_CURVE,
    },
  },
};

export const ROOTLAYOUT_BOTTOM_SHEET_CONNECTION = {
  shadeCover: {
    color: "#000",
    opacity: 0.7,
    tapToClose: true,
  },
  animation: {
    enterFrom: {
      translateY: -300,
      duration: 400,
      curve: DEFAULT_ANIMATION_CURVE,
    },
    exitTo: {
      translateY: -300,
      duration: 400,
      curve: DEFAULT_ANIMATION_CURVE,
    },
  },
};
