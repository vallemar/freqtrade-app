<template>
  <StackLayout class="mt-4">
    <Label text="Open Profit" class="text-2xl"></Label>
    <StackLayout v-if="openProfit" orientation="horizontal">
      <Label
        :text="showText(openProfit.percentage + '%')"
        class="text-xl"
        :class="[openProfit.percentage > 0 ? 'up' : 'down']"
      ></Label>
      <Label text="/" class="text-xl mx-2"></Label>
      <Label :text="showText(openProfit.money)" class="text-xl"></Label>
    </StackLayout>
  </StackLayout>
</template>

<script lang="ts">
import Vue from "nativescript-vue";
import { Status, Trades } from "~/model/payload";
import CollectionHomeItem from "~/components/CollectionHomeItem.vue";
import { UtilNumber } from "~/utils/UtilNumber";
import { Text } from "~/utils/Text";
import { PropType } from "vue";
import { BarChart } from "@nativescript-community/ui-chart";
import ShowDetailButton from "~/components/ShowDetailButton.vue";

export default Vue.extend({
  name: "HeaderOpenProfitDashboard",
  components: { ShowDetailButton, CollectionHomeItem },
  props: {
    statusItems: {
      type: Array as PropType<Status[]>,
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
    openProfit() {
      const sumPercentage = this.statusItems
        .map((x: Status) => x.profit_pct)
        .reduce((accumulator: number, a: number) => accumulator + a, 0);
      const sumMoney = this.statusItems
        .map((x: Status) => x.profit_abs)
        .reduce((accumulator: number, a: number) => accumulator + a, 0);
      return this.statusItems.length == 0
        ? null
        : {
            percentage: UtilNumber.toFixed(
              sumPercentage / this.statusItems.length,
              3
            ),
            money: UtilNumber.toFixed(sumMoney, 3),
          };
    },
  },
  methods: {
    showText(text: string) {
      return Text.showText(this.showDetails, text);
    },
  },
});
</script>

<style scoped lang="scss"></style>
