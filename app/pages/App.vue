<template>
  <Navigator :defaultRoute="isLoggedIn ? '/' : '/new_bot'" />
</template>

<script>
import { AuthenticationService } from "~/services/AuthenticationService";
const authenticationService = new AuthenticationService();

export default {
  name: "App.vue",
  data() {
    return {
      isLoggedIn: authenticationService.isUserSession(),
    };
  },
};
</script>

<style scoped></style>
