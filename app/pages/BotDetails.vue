<template>
  <Page actionBarHidden="true">
    <FlexboxLayout
      width="100%"
      height="100%"
      justifyContent="space-between"
      flexDirection="column"
    >
      <StackLayout>
        <Label text="Bot details" class="text-3xl px-2 mt-4"></Label>
        <FlexboxLayout
          height="150"
          class="p-2 bg-secondary mt-4"
          justifyContent="space-between"
          alignContent="center"
        >
          <FlexboxLayout justifyContent="center" alignItems="center">
            <Label text="status"></Label>
          </FlexboxLayout>
          <FlexboxLayout justifyContent="center" alignItems="center">
            <Label text="Bot reachable"></Label>
          </FlexboxLayout>
        </FlexboxLayout>
        <StackLayout class="p-2 mt-8">
          <FlexboxLayout
            class="option-item"
            justifyContent="space-between"
            alignItems="center"
          >
            <Label class="text-lg" text="Show config"></Label>
            <Label text.decode="&#xf054;" class="fas"></Label>
          </FlexboxLayout>

          <FlexboxLayout
            class="option-item"
            justifyContent="space-between"
            alignItems="center"
          >
            <Label class="text-lg" text="Pair list"></Label>
            <Label text.decode="&#xf054;" class="fas"></Label>
          </FlexboxLayout>
          <FlexboxLayout
            class="option-item"
            justifyContent="space-between"
            alignItems="center"
          >
            <Label class="text-lg" text="Connection "></Label>
            <Label text.decode="&#xf054;" class="fas"></Label>
          </FlexboxLayout>
        </StackLayout>
      </StackLayout>
      <FlexboxLayout
        justifyContent="space-between"
        width="100%"
        height="65"
        backgroundColor="blue"
      >
        <NSButton
          text="STOP"
          width="100%"
          class="p-0 m-0 bg-down"
          borderRadius="0"
          :primary="false"
        ></NSButton>
        <NSButton
          text="PAUSE"
          width="100%"
          class="p-0 m-0 bg-warning"
          borderRadius="0"
          :primary="false"
        ></NSButton>
        <NSButton
          text="STOP BUY"
          width="100%"
          class="p-0 m-0 bg-down"
          borderRadius="0"
          :primary="false"
        ></NSButton>
      </FlexboxLayout>
    </FlexboxLayout>
  </Page>
</template>

<script lang="ts">
import Vue from "nativescript-vue";
import {
  BotServer,
  BotServerRepository,
} from "~/repository/BotServerRepository";
import { PropType } from "vue";
import { TypeNewBot } from "~/pages/NewBot.vue";
import NSButton from "~/components/NSButton.vue";

export default Vue.extend({
  components: { NSButton },
  props: {
    type: {
      type: Number,
      default: 1,
    },
    botServer: Object as PropType<BotServer>,
  },
  created() {},
  data() {
    return {
      bot: new BotServerRepository().findEnable(),
    };
  },
  computed: {},
  methods: {
    editBot(botServer: BotServer): void {
      this.$navigator.navigate("/new_bot", {
        props: { type: TypeNewBot.Edit, botServer: this.botServer },
      });
    },
  },
});
</script>

<style scoped>
.option-item {
  padding: 10 0;
  border-bottom-width: 1;
  border-bottom-color: var(--bg-secondary);
}

.fas {
  font-size: 16;
  margin-right: 8;
}
</style>
