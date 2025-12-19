<template>
  <div class="main-outer">
    <!-- Profile Header - Always visible -->
    <ProfileHeader :loading="isLoading" :profile="homeData.profile" />

    <!-- Desktop Layout (840px and above) -->
    <div class="desktop-layout">
      <div class="row">
        <div
          v-if="isLoading || homeData.lastPost"
          class="col"
          :style="colStyle(desktopRow1Count)"
        >
          <RecentPosts :loading="isLoading" :post="homeData.lastPost" />
        </div>
        <div
          v-if="
            isLoading || (homeData.experiences && homeData.experiences.length)
          "
          class="col"
          :style="colStyle(desktopRow1Count)"
        >
          <ExperienceTimeline
            :loading="isLoading"
            :experiences="homeData.experiences"
          />
        </div>
      </div>
      <div class="row">
        <div
          v-if="isLoading || (homeData.projects && homeData.projects.length)"
          class="col"
          :style="colStyle(desktopRow2Count)"
        >
          <ProjectCard :loading="isLoading" :projects="homeData.projects" />
        </div>
        <div
          v-if="
            isLoading ||
            homeData.preferences?.music ||
            homeData.preferences?.contact
          "
          class="col"
          :style="colStyle(desktopRow2Count)"
        >
          <MusicCard
            class="mb-4"
            :enabled="!!homeData.preferences?.music"
            :title="homeData.preferences?.music?.title"
            :artist="homeData.preferences?.music?.artist"
            :image="homeData.preferences?.music?.image"
            :preview-url="homeData.preferences?.music?.previewUrl"
            :spotify-url="homeData.preferences?.music?.spotifyUrl"
          />
        </div>
        <div
          v-if="
            isLoading ||
            (homeData.certifications && homeData.certifications.length)
          "
          class="col"
          :style="colStyle(desktopRow2Count)"
        >
          <CertificationCard
            :loading="isLoading"
            :certifications="homeData.certifications"
          />
        </div>
      </div>
    </div>

    <!-- Mobile Layout (below 840px) -->
    <div class="mobile-layout">
      <RecentPosts
        v-if="isLoading || homeData.lastPost"
        :loading="isLoading"
        :post="homeData.lastPost"
      />
      <ExperienceTimeline
        v-if="
          isLoading || (homeData.experiences && homeData.experiences.length)
        "
        :loading="isLoading"
        :experiences="homeData.experiences"
      />
      <ProjectCard
        v-if="isLoading || (homeData.projects && homeData.projects.length)"
        :loading="isLoading"
        :projects="homeData.projects"
      />
      <CertificationCard
        v-if="
          isLoading ||
          (homeData.certifications && homeData.certifications.length)
        "
        :loading="isLoading"
        :certifications="homeData.certifications"
      />
      <MusicCard
        v-if="isLoading || homeData.preferences?.music"
        :enabled="!!homeData.preferences?.music"
        :title="homeData.preferences?.music?.title"
        :artist="homeData.preferences?.music?.artist"
        :image="homeData.preferences?.music?.image"
        :preview-url="homeData.preferences?.music?.previewUrl"
        :spotify-url="homeData.preferences?.music?.spotifyUrl"
      />
    </div>
  </div>  
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import dataService from '@/services/dataService';
import ProfileHeader from '@/components/ProfileHeaderCard.vue';
import RecentPosts from '@/components/RecentPostCard.vue';
import ExperienceTimeline from '@/components/ExperienceTimelineCard.vue';
import ProjectCard from '@/components/ProjectCard.vue';
import MusicCard from '@/components/MusicCard.vue';
import CertificationCard from '@/components/CertificationCard.vue';

const isLoading = ref(true);
const homeData = ref({
  profile: null,
  lastPost: null,
  experiences: [],
  projects: [],
  certifications: [],
  preferences: { music: null, contact: null },
});

const desktopRow1Count = computed(() => {
  // Always count based on what will be displayed, not just when loaded
  let c = 0;
  if (isLoading.value || homeData.value.lastPost) c++;
  if (isLoading.value || (homeData.value.experiences && homeData.value.experiences.length)) c++;
  return c > 0 ? c : 2; // Default to 2 if nothing to show
});

const desktopRow2Count = computed(() => {
  // Always count based on what will be displayed, not just when loaded
  let c = 0;
  if (isLoading.value || (homeData.value.projects && homeData.value.projects.length)) c++;
  if (
    isLoading.value ||
    (homeData.value.preferences &&
      (homeData.value.preferences.music || homeData.value.preferences.contact))
  )
    c++;
  if (isLoading.value || (homeData.value.certifications && homeData.value.certifications.length))
    c++;
  return c > 0 ? c : 3; // Default to 3 if nothing to show
});

const colStyle = (count) => ({
  flex: `0 0 ${count ? 100 / count : 100}%`,
  maxWidth: `${count ? 100 / count : 100}%`,
});

onMounted(async () => {
  try {
    const data = await dataService.getHomeData();
    homeData.value = data;
  } catch (error) {
    console.error('Failed to load home data:', error);
  } finally {
    isLoading.value = false;
  }
});
</script>

<style scoped>
/* Reset */
* {
  margin: 0;
  padding: auto auto;
  box-sizing: border-box;
}

.main-outer {
  width: 100%;
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

.row .col {
  padding: 0 8px;
}
.row {
  gap: 0;
}

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

  .mobile-layout > * {
    margin-bottom: 24px;
  }
}
</style>
