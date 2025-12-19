<template>
  <div class="main-bg">
    <div class="main-outer">
      <!-- Profile Header - Always visible -->
      <ProfileHeader :loading="isLoading" :profile="homeData.profile" />

      <!-- Desktop Layout (840px and above) -->
      <div class="desktop-layout">
        <div class="row">
          <div v-if="isLoading || homeData.lastPost" class="col" :style="colStyle(desktopRow1Count)">
            <RecentPosts :loading="isLoading" :post="homeData.lastPost" />
          </div>
          <div v-if="isLoading || (homeData.experiences && homeData.experiences.length)" class="col" :style="colStyle(desktopRow1Count)">
            <ExperienceTimeline :loading="isLoading" :experiences="homeData.experiences" />
          </div>
        </div>
        <div class="row">
          <div v-if="isLoading || (homeData.projects && homeData.projects.length)" class="col" :style="colStyle(desktopRow2Count)">
            <ProjectCard :loading="isLoading" :projects="homeData.projects" />
          </div>
          <div v-if="isLoading || homeData.preferences?.music || homeData.preferences?.contact" class="col" :style="colStyle(desktopRow2Count)">
            <MusicCard class="mb-4"
                       :enabled="!!homeData.preferences?.music"
                       :title="homeData.preferences?.music?.title"
                       :artist="homeData.preferences?.music?.artist"
                       :image="homeData.preferences?.music?.image"
                       :preview-url="homeData.preferences?.music?.previewUrl"
                       :spotify-url="homeData.preferences?.music?.spotifyUrl" />
            <ContactCard class="mt-4"
                         :enabled="!!homeData.preferences?.contact"
                         :email="homeData.preferences?.contact?.email"
                         :instagram-url="homeData.preferences?.contact?.instagramUrl"
                         :message="homeData.preferences?.contact?.defaultMessage" />
          </div>
          <div v-if="isLoading || (homeData.certifications && homeData.certifications.length)" class="col" :style="colStyle(desktopRow2Count)">
            <CertificationCard :loading="isLoading" :certifications="homeData.certifications" />
          </div>
        </div>
      </div>

      <!-- Mobile Layout (below 840px) -->
      <div class="mobile-layout">
        <RecentPosts v-if="isLoading || homeData.lastPost"
                     :loading="isLoading" :post="homeData.lastPost" />
        <ExperienceTimeline v-if="isLoading || (homeData.experiences && homeData.experiences.length)"
                            :loading="isLoading" :experiences="homeData.experiences" />
        <ProjectCard v-if="isLoading || (homeData.projects && homeData.projects.length)"
                     :loading="isLoading" :projects="homeData.projects" />
        <CertificationCard v-if="isLoading || (homeData.certifications && homeData.certifications.length)"
                           :loading="isLoading" :certifications="homeData.certifications" />
        <ContactCard v-if="isLoading || homeData.preferences?.contact"
                     :enabled="!!homeData.preferences?.contact"
                     :email="homeData.preferences?.contact?.email"
                     :instagram-url="homeData.preferences?.contact?.instagramUrl"
                     :message="homeData.preferences?.contact?.defaultMessage" />
        <MusicCard v-if="isLoading || homeData.preferences?.music"
                   :enabled="!!homeData.preferences?.music"
                   :title="homeData.preferences?.music?.title"
                   :artist="homeData.preferences?.music?.artist"
                   :image="homeData.preferences?.music?.image"
                   :preview-url="homeData.preferences?.music?.previewUrl"
                   :spotify-url="homeData.preferences?.music?.spotifyUrl" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { getHomeByUsername } from '@/utils/api'
import ProfileHeader from '@/components/ProfileHeaderCard.vue';
import RecentPosts from '@/components/RecentPostCard.vue'; 
import ExperienceTimeline from '@/components/ExperienceTimelineCard.vue';
import ProjectCard from '@/components/ProjectCard.vue';
import MusicCard from '@/components/MusicCard.vue';
import ContactCard from '@/components/ContactCard.vue';
import CertificationCard from '@/components/CertificationCard.vue';

const authStore = useAuthStore()
const isLoading = ref(true)
const homeData = ref({ profile: null, lastPost: null, experiences: [], projects: [], certifications: [], preferences: { music: null, contact: null } })

const desktopRow1Count = computed(() => {
  if (isLoading.value) return 2
  let c = 0
  if (homeData.value.lastPost) c++
  if (homeData.value.experiences && homeData.value.experiences.length) c++
  return Math.max(c, 0)
})

const desktopRow2Count = computed(() => {
  if (isLoading.value) return 3
  let c = 0
  if (homeData.value.projects && homeData.value.projects.length) c++
  if (homeData.value.preferences && (homeData.value.preferences.music || homeData.value.preferences.contact)) c++
  if (homeData.value.certifications && homeData.value.certifications.length) c++
  return Math.max(c, 0)
})

const colStyle = (count) => ({ flex: `0 0 ${count ? (100 / count) : 100}%`, maxWidth: `${count ? (100 / count) : 100}%` })

onMounted(async () => {
  try {
    const username = authStore.username
    if (!username) return
    const res = await getHomeByUsername(username)
    if (res.ok) {
      const json = await res.json()
      console.log(json);
      if (json.status === 'success') {
        homeData.value = json.data || homeData.value
      }
    }
  } finally {
    isLoading.value = false
  }
})
</script>

<style scoped>
/* Reset */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Main container */
.main-bg {
  min-height: 100vh;
  width: 100vw;
}

.main-outer {
  width: 100%;
  margin: 48px auto 108px auto;
  padding: 0 2rem;
}

/* Responsive container */
@media (min-width: 1420px) {
  .main-outer {
    max-width: 1200px;
    padding: 0;
  }
}

/* Layout containers */
.desktop-layout {
  display: block;
}

.mobile-layout {
  display: none;
}

.row {
  display: flex;
  justify-content: center;
}

.row .col { padding: 0 8px; }
.row { gap: 0; }

.music-contact-container {
  width: 100%;
}

/* Mobile layout (below 840px) */
@media (max-width: 1034px) {
  .desktop-layout {
    display: none;
  }

  .mobile-layout {
    display: block;
  }

  .mobile-layout>* {
    margin-bottom: 24px;
  }
}
</style>