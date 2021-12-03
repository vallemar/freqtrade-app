<template>
  <StackLayout class="px-2 mt-4">
    <CollectionView
      height="100%"
      width="100%"
      ref="collectionView"
      :items="connections"
      @loaded="loaded"
      @unloaded="unmounted"
      :itemTemplateSelector="(item, index) => (index === 0 ? 'header' : 'row')"
    >
      <v-template name="header">
        <StackLayout>
          <FlexboxLayout alignItems="center" justifyContent="space-between">
            <Label text="Bots" class="text-3xl"></Label>
            <Label
              text.decode="&#xf2f5;"
              class="fas mr-2"
              style="font-size: 20"
              @tap="close"
            ></Label>
          </FlexboxLayout>

          <FlexboxLayout justifyContent="space-between" alignItems="flex-end">
            <Label text="Connections" class="text-base mt-4"></Label>
            <Chip @tap="newBot" class="text-white" text="New bot"></Chip>
          </FlexboxLayout>
        </StackLayout>
      </v-template>

      <v-template name="row">
        <FlexboxLayout
          class="bg-secondary rounded-md p-2 mt-2"
          justifyContent="space-between"
          alignItems="center"
        >
          <StackLayout class="" width="40%">
            <Label :text="item.user" class="text-sm"></Label>
            <Label :text="item.directionServer" class="text-sm mt-1"></Label>
            <Label :text="item.botName" class="text-sm mt-1"></Label>
          </StackLayout>
          <StackLayout
            orientation="vertical"
            verticalAlignment="middle"
            flexDirection="column"
            justifyContent="center"
            width="60%"
          >
            <FlexboxLayout justifyContent="flex-end">
              <Chip v-if="item.expired" class="mr-3" xs text="expired"></Chip>
              <Chip
                v-if="item.select"
                class=""
                outline
                xs
                text="selected"
              ></Chip>
              <StackLayout
                style="height: 18; width: 18; max-width: 18; border-radius: 50%"
                :class="[item.status ? 'bg-up' : 'bg-down']"
                class="ml-3"
              ></StackLayout>
            </FlexboxLayout>
            <FlexboxLayout class="mt-5" justifyContent="flex-end">
              <Label
                @tap="select($index)"
                text.decode="&#xf06e;"
                class="far"
                style="font-size: 20"
              ></Label>
              <Label
                @tap="botDetails"
                text.decode="&#xf044;"
                class="far ml-7"
                style="font-size: 20"
              ></Label>
              <Label
                @tap="remove($index)"
                text.decode="&#xf2ed;"
                class="far ml-7"
                style="font-size: 20"
              ></Label>
            </FlexboxLayout>
          </StackLayout>
        </FlexboxLayout>
      </v-template>
    </CollectionView>
  </StackLayout>
</template>

<script lang="ts">
import Vue from "nativescript-vue";
import {
  BotServer,
  BotServerRepository,
} from "~/repository/BotServerRepository";
import { AuthenticationService } from "~/services/AuthenticationService";
import NSButton from "~/components/NSButton.vue";
import Chip from "~/components/Chip.vue";
import { TypeNewBot } from "~/pages/NewBot.vue";
import { EnableServerService } from "~/services/EnableServerService";
import { Dialogs, ObservableArray } from "@nativescript/core";
import { eventBus } from "~/NScore/EventBus";
import { HttpUtils } from "~/utils/HttpUtils";
import { EventBusEventName } from "~/constant/EventBus";

const botServerRepository = new BotServerRepository();
const enableServerService = new EnableServerService();
const authenticationService = new AuthenticationService();
const rowHeader = { headerRow: true };
const offsetHeader = 1;

export default Vue.extend({
  name: "Account",
  components: { Chip, NSButton },
  data() {
    return {
      connections: new ObservableArray([
        rowHeader,
        ...botServerRepository.getAll(),
      ]),
      interval: null,
    };
  },
  destroyed() {
    this.unmounted();
  },
  methods: {
    loaded() {
      this.unmounted();
      const intervalRequest = 5000;
      this.checkConnections();
      this.interval = setInterval(() => {
        this.checkConnections();
      }, intervalRequest);
    },
    unmounted() {
      clearInterval(this.interval);
    },
    close(): void {
      Dialogs.confirm({
        title: "Close sessions",
        message: "Do you want to close all sessions?",
        okButtonText: "Close",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result) {
          botServerRepository.removeAll();
          authenticationService.remove();
          this.$navigator.navigate("/new_bot", { clearHistory: true });
        }
      });
    },
    select(index: number): void {
      const botServerSelect: BotServer = this.connections.getItem(index);
      this.changeTagSelect(botServerSelect);

      botServerRepository.select(botServerSelect.id);

      authenticationService
        .refrehToken(
          botServerSelect.directionServer,
          botServerSelect.refresh_token,
          HttpUtils.buildCancelToken(2000)
        )
        .then((response) => {
          authenticationService.selectServer(
            {
              access_token: response.access_token,
              refresh_token: botServerSelect.refresh_token,
            },
            botServerSelect.directionServer
          );
        })
        .catch(() => {
          //Even if the token refresh fails, you have to select the server
          authenticationService.selectServer(
            {
              access_token: botServerSelect.token,
              refresh_token: botServerSelect.refresh_token,
            },
            botServerSelect.directionServer
          );
        })
        .finally(() => {
          eventBus.notify({ eventName: EventBusEventName.UpdateServer });
        });
    },
    changeTagSelect(botServerSelect: BotServer) {
      botServerRepository.getAll().forEach((item, indexIterator) => {
        indexIterator = indexIterator + offsetHeader;
        const iteratorBot = this.connections.getItem(indexIterator);
        if (iteratorBot.id === botServerSelect.id) {
          iteratorBot.select = true;
        } else {
          iteratorBot.select = false;
        }
        this.connections.setItem(indexIterator, iteratorBot);
      });
    },

    remove(index: number): void {
      const botServerRemove = this.connections.getItem(index);
      Dialogs.confirm({
        title: "Remove bot",
        message: `Are you sure you delete the ${botServerRemove.directionServer} bot?`,
        okButtonText: "Remove",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result) {
          this.confirmRemoveBot(botServerRemove, index);
        }
      });
    },
    confirmRemoveBot(botServerRemove: BotServer, index: number) {
      //if last bot
      if (this.connections.length === 1 + offsetHeader) {
        botServerRepository.removeAll();
        authenticationService.remove();
        this.$navigator.navigate("/new_bot", { clearHistory: true });
        return;
      }

      if (
        botServerRemove.select &&
        this.connections.length > 1 + offsetHeader
      ) {
        let newSelectIndex = -1;
        const serverWithStatusConnect = this.connections.filter(
          (botServer: BotServer) =>
            botServer.status && botServer.id != botServerRemove.id
        );

        if (serverWithStatusConnect.length != 0) {
          newSelectIndex = this.connections.findIndex(
            (botServer: BotServer) =>
              botServer.id === serverWithStatusConnect[0].id
          );
          this.select(newSelectIndex);
        }
      }
      this.connections.splice(index, 1);
      botServerRepository.removeById(botServerRemove.id);
      setTimeout(() => {
        //WHEN FINISH ANIMATION
        this.$refs.collectionView.refresh();
      }, 500);
    },
    newBot(): void {
      this.$navigator.navigate("/new_bot", { type: TypeNewBot.Add });
    },

    botDetails(botServer: BotServer): void {
      this.$navigator.navigate("/bot_details", {
        props: { botServer: botServer },
        transition: {
          name: "slide",
          duration: 150,
          curve: "linear",
        },
      });
    },
    checkConnections() {
      botServerRepository
        .getAll()
        .forEach((botServer: BotServer, index: number) => {
          botServer.expired = HttpUtils.checkExpiredToken(
            botServer.refresh_token
          );
          enableServerService
            .isEnableServer(botServer, false)
            .then((isEnableServer) => {
              botServer.status = isEnableServer;
              this.connections.setItem(index + offsetHeader, botServer);
            });
        });
    },
  },
});
</script>

<style></style>
