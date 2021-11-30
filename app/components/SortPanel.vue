<template>
  <FlexboxLayout
    height="165"
    verticalAlignment="bottom"
    class="bg-secondary px-4 pt-3"
    style="border-top-left-radius: 16; border-top-right-radius: 16"
  >
    <StackLayout>
      <Label text="Order by" class="text-lg"></Label>
      <FlexboxLayout class="mt-3">
        <Chip
          @tap="order(types.Name)"
          text="Name"
          :textWhite="sortBy === types.Name"
          :transparent="sortBy !== types.Name"
          class="bg px-2 py-1 m-2"
        ></Chip>

        <Chip
          @tap="order(types.CloseDate)"
          text="Close date"
          class="bg px-2 py-1 m-2"
          :textWhite="sortBy === types.CloseDate"
          :transparent="sortBy !== types.CloseDate"
        ></Chip>

        <Chip
          @tap="order(types.OpenDate)"
          text="Open date"
          class="bg px-2 py-1 m-2"
          :textWhite="sortBy === types.OpenDate"
          :transparent="sortBy !== types.OpenDate"
        ></Chip>
      </FlexboxLayout>
      <FlexboxLayout class="mt-2">
        <Chip
          @tap="order(types.Amount)"
          text="Amount"
          class="bg px-2 py-1 m-2"
          :textWhite="sortBy === types.Amount"
          :transparent="sortBy !== types.Amount"
        ></Chip>

        <Chip
          @tap="order(types.Profit)"
          text="Profit"
          class="bg px-2 py-1 m-2"
          :textWhite="sortBy === types.Profit"
          :transparent="sortBy !== types.Profit"
        ></Chip>
      </FlexboxLayout>
    </StackLayout>
  </FlexboxLayout>
</template>

<script lang="ts">
import Vue from "nativescript-vue";
import { eventBus } from "~/NScore/EventBus";
import Chip from "~/components/Chip.vue";
import { EventBusEventName } from "~/constant/EventBus";

export enum TypeOrder {
  Name = "name",
  CloseDate = "close_date",
  OpenDate = "open_date",
  Amount = "amount",
  Profit = "profit",
}

export default Vue.extend({
  name: "SortPanel",
  components: { Chip },
  props: {
    selectOrder: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      sortBy: this.selectOrder,
      types: TypeOrder,
    };
  },
  methods: {
    order(typeOrder: TypeOrder) {
      this.sortBy = typeOrder;
      eventBus.notify({
        eventName: EventBusEventName.Filter,
        data: typeOrder,
      });
    },
  },
});
</script>

<style scoped lang="scss"></style>
