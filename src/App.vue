<script setup>
import { RouterView } from 'vue-router'
import TheHeader from "@/components/layout/TheHeader.vue";
import {useAuthStore} from "@/stores/auth.js";

const authStore = useAuthStore();

</script>

<template>
  <div>
  <TheHeader v-if="authStore.isLoggedIn" />
  <RouterView />
  </div>
</template>

<style scoped>
</style>
