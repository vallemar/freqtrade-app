<template>
  <FlexboxLayout>
    <image
      :src="
        'https://lcw.nyc3.cdn.digitaloceanspaces.com/production/currencies/32/' +
        currency.toLowerCase() +
        '.png'
      "
      style="width: 56px; height: 56px"
    ></image>
    <FlexboxLayout alignItems="flex-end">
      <Label :text="currency" class="ml-2 text-lg" textWrap="true"></Label>
      <Label
        v-if="stake"
        :text="'/' + stake"
        class="text-xs secondary"
        style="padding-bottom: 2"
      ></Label>
    </FlexboxLayout>
  </FlexboxLayout>
</template>

<script lang="ts">
import Vue from "nativescript-vue";

export default Vue.extend({
  name: "HeaderCurrencyItem",
  props: {
    currency: String,
    stake: String,
  },
});
</script>

<style scoped lang="scss"></style>
