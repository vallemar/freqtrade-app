<template>
  <Page actionBarHidden="true">
    <RootLayout height="100%" width="100%">
      <GridLayout>
        <MDBottomNavigation :selectedIndex="selectedIndex">
          <MDTabContentItem>
            <Dashboard @loading="loading = $event"></Dashboard>
          </MDTabContentItem>
          <MDTabContentItem>
            <Balance></Balance>
          </MDTabContentItem>
          <MDTabContentItem>
            <Bots />
          </MDTabContentItem>

          <MDTabStrip>
            <MDTabStripItem
              class="strip"
              :class="{ active: selectedIndex === 0 }"
            >
              <Label
                text.decode="&#xf200;"
                class="fas"
                style="font-size: 22"
              ></Label>
            </MDTabStripItem>
            <MDTabStripItem
              class="strip"
              :class="{ active: selectedIndex === 1 }"
            >
              <Label
                text.decode="&#xf555;"
                class="fas"
                style="font-size: 22"
              ></Label>
            </MDTabStripItem>
            <MDTabStripItem
              class="strip"
              :class="{ active: selectedIndex === 2 }"
            >
              <Label
                text.decode="&#xf544;"
                class="fas"
                style="font-size: 22"
              ></Label>
            </MDTabStripItem>
          </MDTabStrip>
        </MDBottomNavigation>
        <StackLayout
          v-if="isAndroid"
          verticalAlignment="bottom"
          style=""
          id="divider-bottom-navigation"
        ></StackLayout>
        <Loading v-if="loading" fullScreen :loading="loading"></Loading>
      </GridLayout>
    </RootLayout>
  </Page>
</template>
<script lang="ts">
import Vue from "nativescript-vue";
import CollectionHomeItem from "~/components/CollectionHomeItem.vue";
import Dashboard from "~/pages/Dashboard.vue";
import Bots from "~/pages/Bots.vue";
import Loading from "~/components/Loading.vue";
import { eventBus } from "~/NScore/EventBus";
import { buildViewComponent } from "~/NScore/ViewComponent";
import { getRootLayout, isAndroid } from "@nativescript/core";
import { ROOTLAYOUT_BOTTOM_SHEET_CONNECTION } from "~/constant/ui/RootLayout";
import NotifyStatusConnection from "~/components/NotifyStatusConnection.vue";
import Balance from "~/pages/Balance.vue";
import { EventBusEventName } from "~/constant/EventBus";

export default Vue.extend({
  components: {
    Balance,
    Loading,
    Bots,
    Dashboard,
    CollectionHomeItem,
  },
  data() {
    return {
      selectedIndex: 0,
      loading: true,
      isAndroid: isAndroid,
    };
  },
  created() {
    eventBus.on(EventBusEventName.LostConnection, () => {
      const view = buildViewComponent(NotifyStatusConnection, {
        bgBackground: "bg-down",
        text: "Lost connection with your server",
      });
      getRootLayout()
        .open(view, ROOTLAYOUT_BOTTOM_SHEET_CONNECTION)
        .catch((ex) => console.error(ex));
    });

    eventBus.on(EventBusEventName.ReopenConnection, () => {
      const view = buildViewComponent(NotifyStatusConnection, {
        bgBackground: "bg-up",
        text: "Connection recovered with your server",
      });
      getRootLayout()
        .open(view, ROOTLAYOUT_BOTTOM_SHEET_CONNECTION)
        .catch((ex) => console.error(ex));
    });
  },
});
</script>

<style lang="scss">
MDTabStrip,
MDTabStripItem {
  background-color: var(--bg-secondary);
}

#divider-bottom-navigation {
  height: 1;
  width: 100%;
  background-color: var(--bg-color);
  margin-bottom: 55;
}

MDTabStripItem.strip Label {
  color: var(--color-text-secondary);
}

MDTabStripItem:active Label {
  color: var(--color-text);
}
</style>
