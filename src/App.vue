<template>
  <div class="app">
    <VantaBackground :background-settings="backgroundSettings" />

    <!-- Main tab pages: always mounted, toggled with v-show -->
    <!-- Each has its own scroll container so scroll position is preserved -->
    <div class="tab-page" v-show="currentTab === 'home'">
      <HomeView />
    </div>
    <div class="tab-page" v-show="currentTab === 'about'">
      <AboutView />
    </div>
    <div class="tab-page" v-show="currentTab === 'blog'">
      <BlogView />
    </div>
    <div class="tab-page" v-show="currentTab === 'projects'">
      <ProjectsView />
    </div>
    <div class="tab-page" v-show="currentTab === 'certifications'">
      <CertificationsView />
    </div>

    <!-- Detail pages: rendered via router-view only when on a detail route -->
    <div class="tab-page" v-if="isDetailRoute">
      <router-view />
    </div>

    <BottomNav />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import VantaBackground from './assets/VantaBackground.vue'
import BottomNav from './components/BottomNav.vue'
import HomeView from './views/HomeView.vue'
import AboutView from './views/about/AboutView.vue'
import BlogView from './views/blog/BlogView.vue'
import ProjectsView from './views/project/ProjectsView.vue'
import CertificationsView from './views/certification/CertificationsView.vue'

const route = useRoute()

const backgroundSettings = {
  type: 'solid',
}

const tabRoutes = {
  '/home': 'home',
  '/about': 'about',
  '/blog': 'blog',
  '/projects': 'projects',
  '/certifications': 'certifications',
}

const currentTab = computed(() => {
  return tabRoutes[route.path] || null
})

const isDetailRoute = computed(() => {
  // Not a tab route and not the root redirect
  return !tabRoutes[route.path] && route.path !== '/'
})
</script>

<style scoped>
.app {
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;
}

.tab-page {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  justify-content: center;
  padding: 1rem 1rem 4rem 1rem;
  align-items: flex-start;
}
</style>
