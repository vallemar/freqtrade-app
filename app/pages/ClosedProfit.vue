<template>
  <Page actionBarHidden="true">
    <RootLayout height="100%" width="100%">
      <GridLayout>
        <StackLayout class="px-2 mt-4">
          <FlexboxLayout justifyContent="space-between" alignItems="center">
            <FlexboxLayout alignItems="center">
              <Label
                v-if="isIOS"
                text.decode="&#xf053;"
                class="fas"
                @tap="$navigator.back()"
              ></Label>
              <Label
                text="Closed Profit"
                class="text-3xl"
                :class="{ 'ml-3': isIOS }"
              ></Label>
            </FlexboxLayout>

            <Label
              text.decode="&#xf160;"
              class="fas mr-2"
              @tap="openSortPanel"
              :class="{ primary: applyOrder }"
            ></Label>
          </FlexboxLayout>

          <CollectionView
            ref="collectionView"
            class="mt-2"
            :items="trades"
            height="100%"
            width="100%"
            @loadMoreItems="loadMoreItems"
          >
            <v-template>
              <CollectionCloseProfitItem
                :item="item"
              ></CollectionCloseProfitItem>
            </v-template>
          </CollectionView>
        </StackLayout>
        <Loading v-if="loading" fullScreen :loading="loading"></Loading>
      </GridLayout>
    </RootLayout>
  </Page>
</template>

<script lang="ts">
import Vue from "nativescript-vue";
import { DashboardService } from "~/services/DashboardService";
import { Trade } from "~/model/payload";
import CollectionHomeItem from "~/components/CollectionHomeItem.vue";
import { getRootLayout, isIOS, ObservableArray } from "@nativescript/core";
import CollectionCloseProfitItem from "~/components/CollectionCloseProfitItem.vue";
import Loading from "~/components/Loading.vue";
import SortPanel, { TypeOrder } from "~/components/SortPanel.vue";
import { ROOTLAYOUT_BOTTOM_SHEET_ORDER_TRADERS } from "~/constant/ui/RootLayout";
import { buildViewComponent } from "~/NScore/ViewComponent";
import { eventBus } from "~/NScore/EventBus";
import { EventBusEventName } from "~/constant/EventBus";
import { OrderTrades } from "~/utils/filters/Order";

const dashboardService = new DashboardService();
const orderTrades = new OrderTrades();

export default Vue.extend({
  components: { Loading, CollectionCloseProfitItem, CollectionHomeItem },
  data() {
    return {
      isIOS: isIOS,
      full: [] as Trade[],
      itemsPerPage: 50,
      currentPage: 0,
      trades: new ObservableArray<Trade>([]),
      loading: true,
      typeOrder: TypeOrder.CloseDate,
    };
  },
  created() {
    dashboardService
      .getTrades()
      .then(({ data }) => {
        data.trades = orderTrades.order(data.trades, TypeOrder.CloseDate);
        this.full.push(...data.trades);
        this.trades.push(data.trades.slice(0, this.itemsPerPage));
      })
      .finally(() => {
        this.loading = false;
      })
      .catch((e) => {
        console.log(e);
      });
  },
  destroyed() {
    eventBus.off("filter");
  },
  computed: {
    applyOrder(): boolean {
      return this.typeOrder !== TypeOrder.CloseDate;
    },
  },
  methods: {
    openSortPanel() {
      const view = buildViewComponent(SortPanel, {
        selectOrder: this.typeOrder,
      });
      this.listenerOrder();
      getRootLayout()
        .open(view, ROOTLAYOUT_BOTTOM_SHEET_ORDER_TRADERS)
        .catch((ex) => console.error(ex));
    },
    listenerOrder() {
      eventBus.on(EventBusEventName.Filter, (filter) => {
        this.typeOrder = filter.data;
        orderTrades.order(this.full, filter.data);
        orderTrades.updateObservable(this.full, this.trades);
      });
    },
    loadMoreItems() {
      this.currentPage++;
      const newItems = this.full.slice(
        this.currentPage * this.itemsPerPage,
        this.currentPage * this.itemsPerPage + this.itemsPerPage
      );
      this.trades.push(newItems);
    },
  },
});
</script>

<style scoped lang="scss"></style>
