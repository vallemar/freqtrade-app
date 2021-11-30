<template>
  <Label
    @tap="$emit('tap')"
    :text="text"
    class="rounded-full px-2"
    :class="{
      'text-xs': xs,
      'bg-primary': !outline && !down && !transparent,
      'bg-down': !outline && down && !transparent,
      'border-color-primary': outline,
      'text-white': (!outline || down) && textWhite,
    }"
    :borderWidth="outline ? 1 : 0"
  >
  </Label>
</template>

<script>
export default {
  name: "Chip",
  props: {
    text: String,
    outline: Boolean,
    xs: Boolean,
    down: Boolean,
    transparent: Boolean,
    textWhite: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style></style>
