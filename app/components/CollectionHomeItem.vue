<template>
  <StackLayout class="mt-1">
    <FlexboxLayout
      class="px-2 py-2 bg-secondary rounded-md"
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
          <Label
            :text="'Amount ' + showText(item.amount)"
            class="text-xs"
            textWrap="true"
          ></Label>
          <Label
            :text="'Price ' + showText(item.current_rate.toFixed(6))"
            class="mt-1 text-xs"
            textWrap="true"
          ></Label>
          <StackLayout class="mt-2" orientation="horizontal">
            <Label text="Profit " class="text-xs"></Label>
            <Label
              :text="showText(item.profit_abs.toFixed(3))"
              class="text-xs"
              :class="[item.profit_abs > 0 ? 'up' : 'down']"
              textWrap="true"
            ></Label>
          </StackLayout>
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
          <Label
            :text="showText(item.profit_pct + '%')"
            class="ml-2 text-white"
          ></Label>
        </FlexboxLayout>
      </FlexboxLayout>
    </FlexboxLayout>
  </StackLayout>
</template>

<script lang="ts">
import Vue from "nativescript-vue";
import { Text } from "~/utils/Text";
import HeaderCurrencyItem from "~/components/HeaderCurrencyItem.vue";

export default Vue.extend({
  name: "CollectionHomeItem",
  components: { HeaderCurrencyItem },
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
    showDetails: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    showText(text: string) {
      return Text.showText(this.showDetails, text);
    },
  },
});
</script>

<style scoped lang="scss"></style>
