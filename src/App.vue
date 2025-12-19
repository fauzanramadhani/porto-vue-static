<style scoped>
.main-bg {
  min-height: 100vh;
  width: 100vw;
  position: relative;
  overflow-x: hidden;
}
</style>

<template>
  <VantaBackground :background-settings="backgroundSettings" />

  <main class="content">
    <h1>Vanta Background</h1>
  </main>
</template>

<script setup>
import VantaBackground from './assets/VantaBackground.vue'

const backgroundSettings = {
  type: 'halo',
}
</script>
