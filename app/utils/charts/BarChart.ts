import { ObservableArray, View } from "@nativescript/core";
import { BarChart } from "@nativescript-community/ui-chart";
import { Trade } from "~/model/payload";
import { BarDataSet } from "@nativescript-community/ui-chart/data/BarDataSet";
import { BarData } from "@nativescript-community/ui-chart/data/BarData";
import { ValueFormatter } from "@nativescript-community/ui-chart/formatter/ValueFormatter";

const animationDuration = 250;

export const drawBarChart = (data: any, chart: BarChart) => {
  chart.setScaleEnabled(true);
  chart.setDragEnabled(true);
  chart.getAxisRight().setEnabled(false);
  chart.getAxisLeft().setDrawGridLines(false);
  chart.getXAxis().setDrawGridLines(false);
  chart.getXAxis().setEnabled(false);
  chart.setHighlightPerTapEnabled(false);

  chart.setDrawBorders(false);
  chart.setDrawGridBackground(false);

  chart.getDescription().setEnabled(false);
  chart.getLegend().setEnabled(false);

  chart.getAxisLeft().setDrawGridLines(false);
  chart.getAxisLeft().setDrawLabels(false);
  chart.getAxisLeft().setDrawAxisLine(false);

  chart.getXAxis().setDrawGridLines(false);
  chart.getXAxis().setDrawLabels(false);
  chart.getXAxis().setDrawAxisLine(false);

  chart.getAxisRight().setDrawGridLines(false);
  chart.getAxisRight().setDrawLabels(false);
  chart.getAxisRight().setDrawAxisLine(false);

  const dataChart = new ObservableArray([]);
  const colors: string[] = [];
  data.trades.forEach((trade: Trade, index: number) => {
    dataChart.push({ index: index, value: trade.close_profit_pct });
    colors.push(trade.close_profit_pct >= 0 ? "#16C784" : "#ea3943");
  });

  const sets = [];
  const set = new BarDataSet(dataChart, "Dataset Label", "index", "value");
  set.setValueFormatter(new LineDataFormatter());
  sets.push(set);
  set.setColors(colors);

  // Create a data object with the data sets
  const bd = new BarData(sets);
  bd.setBarWidth(1);
  chart.animateY(animationDuration);
  chart.animateX(animationDuration);
  // Set data
  chart.setData(bd);
};

class LineDataFormatter extends ValueFormatter {
  public getFormattedValue(value: number, entry?: any) {
    return value.toPrecision(3) + "a";
  }
}
