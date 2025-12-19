<template>
  <div class="app">
    <VantaBackground :background-settings="backgroundSettings" />
    <router-view />
    <BottomNav />
  </div>
</template>

<script setup>
import VantaBackground from './assets/VantaBackground.vue'
import BottomNav from './components/BottomNav.vue'

const backgroundSettings = {
  type: 'halo',
}
</script>

<style scoped>
.app {
  width: 100%;
}
</style>
