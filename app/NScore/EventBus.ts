import { Application } from "@nativescript/core";

export type DataEventBus = {
  eventName: string;
  data?: any;
};

export const eventBus = {
  notify(event: DataEventBus) {
    Application.notify({
      eventName: event.eventName,
      data: event.data,
    } as DataEventBus);
  },

  on(eventName: string, callback: (eventData: any) => void): void {
    Application.on(eventName, (args) => {
      callback(args);
    });
  },

  off(eventName: string): void {
    Application.off(eventName);
  },
};
