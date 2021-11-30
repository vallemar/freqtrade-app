<template>
  <Label
    v-if="showDetails"
    text.decode="&#xf06e;"
    class="fas"
    style="font-size: 18"
    @tap="$emit('tap', false)"
  ></Label>
  <Label
    v-else
    text.decode="&#xf070;"
    class="fas"
    style="font-size: 18"
    @tap="$emit('tap', true)"
  ></Label>
</template>

<script>
export default {
  name: "ShowDetailButton",
  props: {
    showDetails: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style></style>
