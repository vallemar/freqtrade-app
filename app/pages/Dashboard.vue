<template>
  <GridLayout @loaded="loaded" @unloaded="unmounted">
    <CollectionView
      height="100%"
      class="px-2"
      ref="collectionView"
      @loaded="loadedCollectionView"
      :items="statusItems"
      :itemTemplateSelector="itemTemplateSelector"
    >
      <v-template name="header">
        <HeaderDashboard
          height="200"
          @showDetails="onChangeShowDetail"
          :profit="profit"
          :showDetails="showDetails"
        ></HeaderDashboard>
      </v-template>
      <v-template name="header-open-profit">
        <HeaderOpenProfitDashboard
          height="65"
          :statusItems="statusItems.slice(2, statusItems.length)"
          :showDetails="showDetails"
        ></HeaderOpenProfitDashboard>
      </v-template>

      <v-template name="row">
        <CollectionHomeItem
          height="108"
          :item="item"
          :showDetails="showDetails"
        ></CollectionHomeItem>
      </v-template>
    </CollectionView>

    <FlexboxLayout
      justifyContent="center"
      alignItems="center"
      verticalAlignment="bottom"
      height="50%"
      v-if="!loading && statusItems.length === 2 && !tryConnected"
    >
      <Chip class="px-2 py-2" text="There are no trades for now"></Chip>
    </FlexboxLayout>
    <FlexboxLayout
      v-if="!loadingProfit && !profit.first_trade_date"
      justifyContent="center"
      alignItems="center"
      class="bg"
      height="100%"
    >
      <Chip class="px-2 py-2" text="Do not have any investment yet"></Chip>
    </FlexboxLayout>
  </GridLayout>
</template>

<script lang="ts">
import Vue from "nativescript-vue";
import { DashboardService } from "~/services/DashboardService";
import { AuthenticationService } from "~/services/AuthenticationService";
import { ObservableArray } from "@nativescript/core";
import { Profit, Status } from "~/model/payload";
import CollectionHomeItem from "~/components/CollectionHomeItem.vue";
import { CollectionView } from "@nativescript-community/ui-collectionview";
import HeaderDashboard from "~/components/HeaderDashboard.vue";
import { eventBus } from "~/NScore/EventBus";
import Chip from "~/components/Chip.vue";
import {
  BotServer,
  BotServerRepository,
} from "~/repository/BotServerRepository";
import { EnableServerService } from "~/services/EnableServerService";
import { EventBusEventName } from "~/constant/EventBus";
import { ObjectUtils } from "~/utils/ObjectUtils";
import HeaderOpenProfitDashboard from "~/components/HeaderOpenProfitDashboard.vue";

const dashboardService = new DashboardService();
const authenticationService = new AuthenticationService();
const botServerRepository = new BotServerRepository();
const rowHeader = { headerRow: true };
const offsetHeader = 2;
let collectionView: CollectionView;

export default Vue.extend({
  name: "Dashboard",
  components: {
    HeaderOpenProfitDashboard,
    HeaderDashboard,
    CollectionHomeItem,
    Chip,
  },
  data() {
    return {
      profit: null! as Profit,
      statusItems: new ObservableArray<Status | { headerRow: boolean }>([
        rowHeader,
        rowHeader,
      ]),
      showDetails: true,
      loading: true,
      loadingProfit: true,
      interval: null,
      connected: true,
      tryConnected: false,
      currentBot: null! as BotServer,
    };
  },
  created() {
    this.poll();
  },
  destroyed() {
    this.unmounted();
  },
  methods: {
    loaded() {
      this.poll();
    },
    loadedCollectionView(arg: any) {
      collectionView = arg.object;
    },
    unmounted() {
      clearInterval(this.interval);
    },
    itemTemplateSelector(item: any, index: number) {
      return index === 0
        ? "header"
        : index === 1
        ? "header-open-profit"
        : "row";
    },
    poll() {
      this.currentBot = botServerRepository.findEnable();
      this.onChangeServerBot();
      this.getProfit();
      this.getStatus();
      this.unmounted();
      const intervalRequest = 1500;
      const intervalRequestTryConnect = 3000;
      this.interval = setInterval(
        () => {
          if (
            authenticationService.expiredToken() &&
            !authenticationService.expiredRefreshToken()
          ) {
            this.updateToken();
          } else {
            if (this.tryConnected) {
              this.checkConnection();
            } else {
              this.getProfit();
              this.getStatus();
            }
          }
        },
        !this.tryConnected ? intervalRequest : intervalRequestTryConnect
      );
    },
    onChangeServerBot() {
      eventBus.off(EventBusEventName.UpdateServer);
      eventBus.on(EventBusEventName.UpdateServer, () => {
        this.currentBot = botServerRepository.findEnable();
        if (!this.tryConnected) {
          this.getProfit();
          this.getStatus();
        }
      });
    },
    checkConnection() {
      const botServerRepository = new BotServerRepository();
      const enableServerService = new EnableServerService();
      const botServer = botServerRepository.findEnable();
      if (botServer && !authenticationService.expiredToken()) {
        enableServerService.isEnableServer(botServer).then((isEnableServer) => {
          if (isEnableServer) {
            this.connected = true;
            this.tryConnected = false;
            this.loading = true;
            eventBus.notify({
              eventName: EventBusEventName.ReopenConnection,
              data: null,
            });
          } else if (this.connected) {
            eventBus.notify({
              eventName: EventBusEventName.LostConnection,
              data: null,
            });
            this.connected = false;
          }
        });
      } else {
        //expiredToken
      }
    },
    updateToken() {
      authenticationService
        .refreshAndUpdateExpiredToken()
        .then(() => {
          //Update token
          this.currentBot = botServerRepository.findEnable();
        })
        .catch(() => {
          //TODO: It is possible that you have no connection to the server or that the refresh_token is expired
        });
    },
    onChangeShowDetail() {
      this.showDetails = !this.showDetails;
      collectionView.refresh();
    },
    getStatus() {
      dashboardService
        .getStatus()
        .then(({ data }) => {
          this.connected = true;
          this.tryConnected = false;
          this.updateRowHeaderOpenProfit();
          const newItem =
            data.length !== this.statusItems.length - offsetHeader;

          data.forEach((status, index) => {
            const offset = index + offsetHeader;

            if (offset < this.statusItems.length) {
              const item = this.statusItems.getItem(offset);
              if (!ObjectUtils.equals(item, status)) {
                this.statusItems.setItem(offset, status);
              }
            } else {
              this.statusItems.push(status);
            }
          });

          //When Sell
          if (this.statusItems.length > data.length + offsetHeader) {
            this.statusItems.splice(
              data.length + offsetHeader,
              this.statusItems.length - data.length - offsetHeader
            );
          }

          if (newItem && collectionView) {
            collectionView.refresh();
          }
        })
        .finally(() => {
          this.loading = false;
          this.$emit("loading", false);
        })
        .catch((e) => {
          console.log("Error getStatus: " + e);
          this.tryConnected = true;
        });
    },
    getProfit() {
      dashboardService.getProfit().then(({ data }) => {
        if (!ObjectUtils.equals(this.profit, data)) {
          this.profit = data;
          this.updateRowHeader();
        }

        this.loadingProfit = false;
      });
    },

    updateRowHeader() {
      this.statusItems.setItem(0, rowHeader);
    },
    updateRowHeaderOpenProfit() {
      this.statusItems.setItem(1, rowHeader);
    },
    toCloseProfit() {
      this.$navigator.navigate("/closed_profit");
    },
  },
});
</script>

<style scoped lang="scss"></style>
