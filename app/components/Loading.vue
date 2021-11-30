<template>
  <FlexboxLayout
    justifyContent="center"
    alignItems="center"
    :class="{ 'full-screen': fullScreen, bg: bg }"
  >
    <ActivityIndicator
      :busy="loading"
      :width="size"
      :height="size"
      :class="[color]"
    ></ActivityIndicator>
  </FlexboxLayout>
</template>

<script>
export default {
  name: "Loading",
  props: {
    loading: Boolean,
    bg: Boolean,
    fullScreen: Boolean,
    size: {
      type: String,
      default: "50",
    },
    primary: {
      type: Boolean,
      default: true,
    },
    white: Boolean,
    black: Boolean,
  },
  computed: {
    color() {
      return this.white ? "text-white" : this.black ? "text-dark" : "";
    },
  },
};
</script>

<style scoped>
.full-screen {
  height: 100%;
  width: 100%;
}
</style>
