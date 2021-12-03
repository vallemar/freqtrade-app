<template>
  <AbsoluteLayout id="ns-button" @tap="!disabled ? $emit('tap') : ''">
    <FlexboxLayout
      :disabled="disabled"
      :class="[background]"
      style="border-radius: 50; justify-content: center; align-items: center"
      :style="{
        'padding-left': px,
        'padding-right': px,
        'padding-top': py,
        'padding-bottom': py,
      }"
      :height="height"
      :width="width"
      justifyContent="center"
      alignItems="center"
    >
      <Label
        v-if="!loading"
        :text="text"
        :style="{ 'font-size': fontSize }"
        :class="[textColorClass]"
      ></Label>
      <Loading
        v-else
        :loading="loading"
        size="30"
        :white="loadingWhite"
        :black="loadingBlack"
      >
      </Loading>
    </FlexboxLayout>
  </AbsoluteLayout>
</template>
<script lang="ts">
import Vue from "nativescript-vue";
import Loading from "~/components/Loading.vue";

export default Vue.extend({
  name: "NSButton",
  components: { Loading },
  props: {
    text: String,
    loading: Boolean,
    disabled: Boolean,
    height: {
      type: String,
      default: "48",
    },
    width: {
      type: String,
      default: "100%",
    },
    fontSize: {
      type: String,
      default: "18",
    },
    primary: {
      type: Boolean,
      default: true,
    },
    textColorClass: {
      type: String,
      default: "text-white",
    },
    px: {
      type: String,
      default: "0",
    },
    py: {
      type: String,
      default: "0",
    },
    loadingWhite: Boolean,
    loadingBlack: Boolean,
  },
  computed: {
    background() {
      return this.primary ? "bg-primary" : "";
    },
  },
});
</script>

<style></style>
