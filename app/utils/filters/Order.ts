import { ObservableArray } from "@nativescript/core";
import { Trade } from "~/model/payload";
import { TypeOrder } from "~/components/SortPanel.vue";

interface Order<T = any> {
  order: (data: T[], typeOrder: TypeOrder) => T[];
  updateObservable: (data: T[], observableArray: ObservableArray<T>) => void;
}

export class OrderTrades implements Order<Trade> {
  order(data: Trade[], typeOrder: TypeOrder): Trade[] {
    switch (typeOrder) {
      case TypeOrder.Name:
        data = this.orderByName(data);
        break;
      case TypeOrder.CloseDate:
        data = this.orderByCloseDate(data);
        break;
      case TypeOrder.OpenDate:
        data = this.orderByOpenDate(data);
        break;
      case TypeOrder.Amount:
        data = this.orderByAmount(data);
        break;
      case TypeOrder.Profit:
        data = this.orderByProfit(data);
        break;
    }
    return data;
  }

  updateObservable(
    data: Trade[],
    observableArray: ObservableArray<Trade>
  ): void {
    for (let i = 0; i < observableArray.length; i++) {
      observableArray.setItem(i, data[i]);
    }
  }

  private orderByCloseDate(trades: Trade[]): Trade[] {
    return trades.sort(
      (a, b) =>
        new Date(b.close_date).getTime() - new Date(a.close_date).getTime()
    );
  }

  private orderByName(trades: Trade[]): Trade[] {
    return trades.sort((a, b) => a.pair.localeCompare(b.pair));
  }

  private orderByOpenDate(trades: Trade[]): Trade[] {
    return trades.sort(
      (a, b) =>
        new Date(b.open_date).getTime() - new Date(a.open_date).getTime()
    );
  }

  private orderByAmount(trades: Trade[]): Trade[] {
    return trades.sort((a, b) => b.amount - a.amount);
  }

  private orderByProfit(trades: Trade[]): Trade[] {
    return trades.sort((a, b) => b.profit_abs - a.profit_abs);
  }
}
