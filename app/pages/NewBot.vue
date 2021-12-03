<template>
  <Page actionBarHidden="true">
    <FlexboxLayout
      class="px-4"
      justifyContent="space-between"
      alignItems="center"
      flexDirection="column"
    >
      <StackLayout>
        <FlexboxLayout width="100%" class="mt-4 px-2">
          <Label
            v-if="isIOS && type !== typeNewBot.New"
            text.decode="&#xf053;"
            class="fas"
            @tap="$navigator.back()"
          ></Label>
        </FlexboxLayout>

        <Image
          class="mt-12"
          height="200"
          width="200"
          src="https://www.freqtrade.io/en/stable/images/logo.png"
        ></Image>
        <StackLayout class="w-full mt-8" :class="{ ios: isIOS }">
          <TextField v-model="user" hint="Usuario" class="mt-2" />
          <TextField v-model="password" hint="Password" class="mt-2" />
          <TextField
            v-model="directionServer"
            hint="Direction IP/DNS:port"
            class="mt-2"
          />
          <TextField
            v-model="botName"
            hint="Name Bot (Not required)"
            class="mt-2"
          />
          <FlexboxLayout justifyContent="flex-end">
            <NSButton
              width="auto"
              height="auto"
              @tap="applyExampleServer"
              text="Apply server example"
              bgClass="bg-primary"
              class="mt-4"
              px="12"
              py="10"
              fontSize="15"
            ></NSButton>
          </FlexboxLayout>
        </StackLayout>
      </StackLayout>

      <NSButton
        :loading="loading"
        loading-white
        @tap="login"
        :disabled="disabled"
        :text="
          type === typeNewBot.New || type === typeNewBot.Add
            ? 'ADD NEW BOT'
            : 'EDIT BOT'
        "
        bgClass="bg-primary"
        class="mb-6"
      ></NSButton>
    </FlexboxLayout>
  </Page>
</template>

<script lang="ts">
import Vue from "nativescript-vue";
import { AuthenticationService } from "~/services/AuthenticationService";
import NSButton from "~/components/NSButton.vue";
import { Toasty } from "@triniwiz/nativescript-toasty";
import { Color, isIOS } from "@nativescript/core";
import {
  BotServer,
  BotServerRepository,
} from "~/repository/BotServerRepository";
import Loading from "~/components/Loading.vue";
import { PropType } from "vue";

const authenticationService = new AuthenticationService();

export enum TypeNewBot {
  New,
  Add,
  Edit,
}

const remoteServerExample = {
  user: "freqtrader",
  password: "123456",
  directionServer: "http://example.freqtrade.jmarvall.com:8080",
};

export default Vue.extend({
  components: { Loading, NSButton },
  props: {
    type: {
      type: Number,
      default: TypeNewBot.New,
    },
    botServer: Object as PropType<BotServer>,
  },
  data() {
    return {
      user: this.botServer ? this.botServer.user : "",
      password: "",
      directionServer: this.botServer ? this.botServer.directionServer : "",
      botName: this.botServer ? this.botServer.botName : "",
      loading: false,
      typeNewBot: TypeNewBot,
      isIOS: isIOS,
    };
  },
  computed: {
    disabled() {
      return !(this.user && this.password && this.directionServer);
    },
  },
  methods: {
    applyExampleServer() {
      this.user = remoteServerExample.user;
      this.password = remoteServerExample.password;
      this.directionServer = remoteServerExample.directionServer;
    },
    login(): void {
      this.loading = true;

      authenticationService
        .login(this.user, this.password, this.directionServer)
        .then((login) => {
          const botServerRepository = new BotServerRepository();
          let storeBotServer: BotServer =
            botServerRepository.findByDirectionServer(this.directionServer)! ||
            this.botServer;
          if (
            (this.type === TypeNewBot.New || this.type === TypeNewBot.Add) &&
            !storeBotServer
          ) {
            let uuid =
              Date.now().toString(36) + Math.random().toString(36).substring(2);
            const defaultName = "ftbot." + botServerRepository.getAll().length;
            storeBotServer = {
              id: uuid,
              user: this.user,
              botName: this.botName || defaultName,
              directionServer: this.directionServer,
              token: login.access_token,
              refresh_token: login.refresh_token,
              select: false,
            };
          } else {
            storeBotServer = Object.assign(storeBotServer, {
              user: this.user,
              botName: this.botName || storeBotServer.botName,
              directionServer: this.directionServer,
              token: login.access_token,
              refresh_token: login.refresh_token,
            });
          }
          botServerRepository.store(storeBotServer);
          botServerRepository.select(storeBotServer.id);

          this.$navigator.navigate("/", { clearHistory: true });
        })
        .catch((e) => {
          new Toasty({ text: "Error Connect", yAxisOffset: 100 })
            .setTextColor(new Color("white"))
            .setBackgroundColor("#ea3943")
            .show();
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
});
</script>

<style scoped>
.ios TextField {
  margin-top: 25;
  border-bottom-color: var(--color-text);
  border-bottom-width: 1;
}
</style>
