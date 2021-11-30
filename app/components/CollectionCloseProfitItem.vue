<template>
  <StackLayout class="mt-1">
    <FlexboxLayout
      class="px-2 py-2 bg-secondary"
      style="border-radius: 16px"
      justifyContent="space-between"
      alignItems="center"
    >
      <FlexboxLayout justifyContent="center" flexDirection="column">
        <HeaderCurrencyItem
          :currency="item.pair.split('/')[0]"
          :stake="item.pair.split('/')[1]"
        >
        </HeaderCurrencyItem>
        <StackLayout class="mt-2">
          <Label :text="'Amount ' + item.amount" class="text-xs"></Label>
          <StackLayout class="mt-2" orientation="horizontal">
            <Label text="Profit " class="text-xs"></Label>
            <Label
              :text="item.profit_abs.toFixed(3)"
              class="text-xs"
              :class="[item.profit_abs > 0 ? 'up' : 'down']"
            ></Label>
          </StackLayout>
          <Label
            :text="'Open date ' + item.open_date"
            class="text-xs mt-1"
          ></Label>
          <Label
            :text="'Close date ' + item.close_date"
            class="text-xs mt-1"
          ></Label>
        </StackLayout>
      </FlexboxLayout>
      <FlexboxLayout alignItems="center">
        <FlexboxLayout
          style="
            height: 32;
            border-radius: 16px;
            width: 80;
            justify-content: center;
            align-items: center;
          "
          :class="[item.profit_pct > 0 ? 'bg-up' : 'bg-down']"
        >
          <Label :text="item.profit_pct + '%'" class="ml-2 text-white"></Label>
        </FlexboxLayout>
      </FlexboxLayout>
    </FlexboxLayout>
  </StackLayout>
</template>

<script lang="ts">
import Vue from "nativescript-vue";
import { PropType } from "vue";
import { Trade } from "~/model/payload";
import HeaderCurrencyItem from "~/components/HeaderCurrencyItem.vue";

export default Vue.extend({
  name: "CollectionCloseProfitItem",
  components: { HeaderCurrencyItem },
  props: {
    item: {
      type: Object as PropType<Trade>,
      default: () => ({}),
    },
  },
});
</script>

<style scoped lang="scss"></style>
