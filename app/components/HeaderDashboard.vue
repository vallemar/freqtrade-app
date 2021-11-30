<template>
  <StackLayout class="mt-4" height="">
    <FlexboxLayout alignItems="center" justifyContent="space-between">
      <Label text="Closed Profit" class="text-3xl"></Label>
      <ShowDetailButton
        @tap="changeShow"
        :showDetails="showDetails"
        class="mr-2"
      ></ShowDetailButton>
    </FlexboxLayout>

    <FlexboxLayout
      class="bg-secondary mt-2"
      style="border-radius: 16px; height: 150"
      @tap="toCloseProfit"
      flexDirection="column"
      justifyContent="space-between"
    >
      <StackLayout class="p-2" orientation="horizontal">
        <Label
          v-if="profit && closeProfit"
          :text="showText(closeProfit.percentage + '%')"
          class="text-xl"
          :class="[profit.profit_closed_percent_sum > 0 ? 'up' : 'down']"
        ></Label>
        <Label
          v-if="profit && closeProfit"
          text="/"
          class="text-xl mx-2"
        ></Label>
        <Label
          v-if="profit && closeProfit"
          :text="showText(closeProfit.money)"
          class="text-xl"
        ></Label>
      </StackLayout>
      <StackLayout height="110" width="100%">
        <BarChart id="chart" width="100%" height="150" @loaded="loadBarChart" />
      </StackLayout>
    </FlexboxLayout>
  </StackLayout>
</template>

<script lang="ts">
import Vue from "nativescript-vue";
import { Profit, Status, Trade, Trades } from "~/model/payload";
import CollectionHomeItem from "~/components/CollectionHomeItem.vue";
import { UtilNumber } from "~/utils/UtilNumber";
import { Text } from "~/utils/Text";
import { PropType } from "vue";
import { BarChart } from "@nativescript-community/ui-chart";
import { drawBarChart } from "~/utils/charts/BarChart";
import { DashboardService } from "~/services/DashboardService";
import ShowDetailButton from "~/components/ShowDetailButton.vue";
import { ObjectUtils } from "~/utils/ObjectUtils";
import { OrderTrades } from "~/utils/filters/Order";
import { TypeOrder } from "~/components/SortPanel.vue";

const dashboardService = new DashboardService();
const orderTrades = new OrderTrades();

export default Vue.extend({
  name: "HeaderDashboard",
  components: { ShowDetailButton, CollectionHomeItem },
  props: {
    profit: {
      type: Object as PropType<Profit>,
    },
    showDetails: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      trades: null! as Trades,
      chart: null! as BarChart,
    };
  },
  computed: {
    closeProfit(): { percentage: string; money: string } | null {
      return this.profit
        ? {
            percentage: UtilNumber.toFixed(
              this.profit.profit_closed_percent_sum,
              3
            ),
            money: UtilNumber.toFixed(this.profit.profit_closed_coin, 3),
          }
        : null;
    },
  },
  watch: {
    closeProfit(newVal, oldVal) {
      if (!ObjectUtils.equals(newVal, oldVal) && this.chart) {
        this.loadTrades();
      }
    },
  },
  methods: {
    showText(text: string) {
      return Text.showText(this.showDetails, text);
    },
    changeShow(showDetails: boolean) {
      this.$emit("showDetails", showDetails);
    },
    toCloseProfit() {
      this.$navigator.navigate("/closed_profit");
    },
    loadBarChart(args: any) {
      this.chart = args.object as BarChart;
      this.loadTrades();
    },
    loadTrades() {
      dashboardService.getTrades().then(({ data }) => {
        data.trades = orderTrades.order(data.trades, TypeOrder.CloseDate);
        if (!ObjectUtils.equals(this.trades, data)) {
          this.trades = data;
          drawBarChart(data, this.chart);
        }
      });
    },
  },
});
</script>

<style scoped lang="scss"></style>
