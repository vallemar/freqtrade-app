<template>
  <PullToRefresh @refresh="refresh" class="mt-4">
    <ScrollView scrollBarIndicatorVisible="false">
      <StackLayout class="px-2">
        <FlexboxLayout alignItems="center" justifyContent="space-between">
          <Label text="Balance" class="text-3xl"></Label>
          <ShowDetailButton
            @tap="changeShow"
            :showDetails="showDetails"
            class="mr-2"
          ></ShowDetailButton>
        </FlexboxLayout>

        <FlexboxLayout class="mt-4">
          <Label text="Total" class="text-xl"></Label>
          <FlexboxLayout
            v-if="balance"
            orientation="horizontal"
            alignItems="flex-end"
            height="20"
          >
            <Label
              :text="renderNumber(balance.total)"
              class="text-xl ml-2"
            ></Label>
            <Label
              :text="balance.stake"
              class="text-base secondary ml-1"
            ></Label>
          </FlexboxLayout>
        </FlexboxLayout>
        <FlexboxLayout class="mt-4" alignItems="center">
          <GridLayout width="160">
            <PieChart width="160" height="160" @loaded="loadBaseChart" />
            <PieChart id="chart" width="160" height="160" @loaded="loadChart" />
          </GridLayout>

          <StackLayout style="flex: 1" class="mr-2">
            <FlexboxLayout
              v-for="(currency, index) in currencyChart"
              :key="index"
              justifyContent="space-between"
            >
              <FlexboxLayout>
                <Label
                  alignSelf="center"
                  height="8"
                  width="8"
                  class="rounded-full"
                  :style="{ 'background-color': currency.color }"
                ></Label>
                <Label :text="currency.label" class="ml-2"></Label>
              </FlexboxLayout>
              <Label :text="currency.percentage"></Label>
            </FlexboxLayout>
          </StackLayout>
        </FlexboxLayout>

        <StackLayout v-if="balance" class="mt-2">
          <StackLayout
            class="mt-1 rounded-full bg-secondary p-2 rounded-md"
            v-for="(currency, index) in currencyChart"
            :key="index"
            justifyContent="space-between"
          >
            <HeaderCurrencyItem
              :currency="currency.label"
              :stake="currency.stake"
            >
            </HeaderCurrencyItem>
            <Label
              :text="'Balance ' + renderNumber(currency.value, true)"
              class="text-base mt-2"
            ></Label>
          </StackLayout>
        </StackLayout>
      </StackLayout>
    </ScrollView>
  </PullToRefresh>
</template>

<script lang="ts">
import Vue from "nativescript-vue";
import NSButton from "~/components/NSButton.vue";
import Chip from "~/components/Chip.vue";
import { Balance } from "~/model/payload";
import { DashboardService } from "~/services/DashboardService";
import { PieChart } from "@nativescript-community/ui-chart";
import {
  CurrencyChart,
  drawBaseChar,
  drawPieChart,
} from "~/utils/charts/PieChart";
import HeaderCurrencyItem from "~/components/HeaderCurrencyItem.vue";
import { Text } from "~/utils/Text";
import { UtilNumber } from "~/utils/UtilNumber";
import { PullToRefresh } from "@nativescript-community/ui-pulltorefresh";
import ShowDetailButton from "~/components/ShowDetailButton.vue";
import { eventBus } from "~/NScore/EventBus";
import { ObjectUtils } from "~/utils/ObjectUtils";
import { EventBusEventName } from "~/constant/EventBus";

const dashboardService = new DashboardService();

export default Vue.extend({
  name: "Balance",
  components: {
    ShowDetailButton,
    HeaderCurrencyItem,
    Chip,
    NSButton,
  },
  data() {
    return {
      balance: null! as Balance,
      balanceLoadedOnBackground: null! as Balance,
      currencyChart: [] as CurrencyChart[],
      showDetails: true,
      dataLoadedOnBackground: false,
      pieChart: null! as PieChart,
    };
  },
  created() {
    this.onChangeServerBot();
  },
  destroyed() {},
  mounted() {},
  computed: {},
  methods: {
    onChangeServerBot() {
      eventBus.on(EventBusEventName.UpdateServer, () => {
        this.loadBalance(true);
      });
    },
    loadChart(args: any): void {
      this.chart = args.object as PieChart;

      if (
        this.dataLoadedOnBackground &&
        this.balanceLoadedOnBackground &&
        !ObjectUtils.equals(this.balance, this.balanceLoadedOnBackground)
      ) {
        this.dataLoadedOnBackground = false;
        this.balance = ObjectUtils.clone(this.balanceLoadedOnBackground);
        this.currencyChart = drawPieChart(this.balance.currencies, this.chart);
      }
      this.loadBalance();
    },
    loadBaseChart(args: any): void {
      const chart = args.object as PieChart;
      drawBaseChar(chart);
    },

    refresh(args: any): void {
      const pullRefresh = args.object as PullToRefresh;
      this.loadBalance().finally(() => {
        pullRefresh.refreshing = false;
      });
    },

    loadBalance(dataLoadedOnBackground = false) {
      return dashboardService.getBalance().then(({ data }) => {
        if (dataLoadedOnBackground) {
          this.dataLoadedOnBackground = true;
          this.balanceLoadedOnBackground = data;
        } else {
          this.dataLoadedOnBackground = false;
          this.balanceLoadedOnBackground = null;
          if (
            !this.balance ||
            (this.balance && !ObjectUtils.equals(this.balance, data))
          ) {
            this.balance = ObjectUtils.clone(data);
            this.currencyChart = drawPieChart(data.currencies, this.chart);
          }
        }
      });
    },
    renderNumber(number: number, noFixed = false) {
      return Text.showText(
        this.showDetails,
        noFixed ? number.toString() : UtilNumber.toFixed(number, 3)
      );
    },
    changeShow() {
      this.showDetails = !this.showDetails;
      this.$emit("showDetails", this.showDetails);
    },
  },
});
</script>

<style></style>
