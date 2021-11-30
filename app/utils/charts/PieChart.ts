import { Color } from "@nativescript/core";
import { PieChart } from "@nativescript-community/ui-chart";

import { Currency } from "~/model/payload";
import { PieDataSet } from "@nativescript-community/ui-chart/data/PieDataSet";
import { PieData } from "@nativescript-community/ui-chart/data/PieData";
import { UtilNumber } from "~/utils/UtilNumber";
import { Colors } from "~/utils/Colors";

export type CurrencyChart = {
  label: string;
  value: number;
  color: string;
  percentage: string;
  stake: string;
};

const transparentCircleRadius = 45;
const drawEntryLabels = false;
const holeRadius = 70;
const holeColor = new Color(Colors.bgColor);

export const drawPieChart = (
  currencies: Currency[],
  chart: PieChart
): CurrencyChart[] => {
  chart.setHoleColor(holeColor);
  chart.setTransparentCircleRadius(transparentCircleRadius);
  chart.setDrawEntryLabels(drawEntryLabels);
  chart.setHoleRadius(holeRadius);

  const sumBalances = currencies.reduce(
    (acc, actual) => acc + actual.balance,
    0
  );
  const data: CurrencyChart[] = currencies
    .map((currency: Currency) => {
      return {
        label: currency.currency,
        value: currency.balance,
        color: getColor(currency.currency),
        stake: currency.stake,
        percentage:
          UtilNumber.toFixed((currency.balance / sumBalances) * 100) + "%",
      };
    })
    .sort((a, b) => b.value - a.value);

  const sets = [];
  const set = new PieDataSet(data, "Dataset Label", "value");
  set.setColors(data.map((d) => d.color));
  set.setDrawValues(true);
  sets.push(set);

  // Create a data object with the data sets
  const pd = new PieData(sets);

  // Set data
  chart.animateY(500);
  chart.setData(pd);
  chart.invalidate();

  return data;
};

function getColor(stringInput: string) {
  const stringUniqueHash = [...stringInput].reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc);
  }, 0);
  return `hsl(${stringUniqueHash % 360},70%,70%)`;
  /*  return `hsla(${~~(360 * (Math.random() * Math.random() * Math.random()))},70%,70%,0.8)`*/
}

export const drawBaseChar = (chart: PieChart) => {
  chart.setHoleColor(holeColor);
  chart.setTransparentCircleRadius(transparentCircleRadius);
  chart.setDrawEntryLabels(drawEntryLabels);
  chart.setHoleRadius(holeRadius);
  const data = [
    {
      label: 1,
      value: 1,
      color: new Color("#959FA7"),
    },
  ];

  const sets = [];
  const set = new PieDataSet(data, "Dataset Label", "value");
  set.setColors(data.map((d) => d.color));
  set.setDrawValues(true);
  sets.push(set);

  // Create a data object with the data sets
  const pd = new PieData(sets);

  // Set data
  chart.setData(pd);
  chart.highlightValues(null);
  chart.invalidate();
};
