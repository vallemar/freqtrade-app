<template>
  <FlexboxLayout
    height="80"
    verticalAlignment="top"
    class="px-4 pt-3 rounded-b-xl"
    :class="[bgBackground]"
  >
    <FlexboxLayout alignItems="center">
      <Label :text="text" class="text-lg text-white"></Label>
    </FlexboxLayout>
  </FlexboxLayout>
</template>

<script lang="ts">
import Vue from "nativescript-vue";

export default Vue.extend({
  name: "NotifyStatusConnection",
  props: {
    text: {
      type: String,
      default: "",
    },
    icon: {
      type: String,
      default: "",
    },
    bgBackground: {
      type: String,
      default: "",
    },
  },
});
</script>

<style scoped lang="scss"></style>
