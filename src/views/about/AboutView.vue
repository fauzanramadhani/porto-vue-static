<template>
  <div class="main-bg">
    <div class="main-outer">
      <ProfileHeader :loading="isLoading" :profile="data.profile" />
      
      <!-- Desktop Layout -->
      <div class="desktop-layout">
        <div class="row">
          <div class="about-card" v-if="isLoading || aboutText">
            <h2 class="section-title">About Me</h2>
            <div class="about-content">
              <template v-if="isLoading">
                <p v-for="n in 3" :key="n" class="about-text sk-line shimmer">&nbsp;</p>
              </template>
              <template v-else>
                <p v-for="(para, idx) in splitParagraphs(aboutText)" :key="idx" class="about-text">
                  {{ para }}
                </p>
              </template>
              <div class="skills-section">
                <h3 class="skills-title">Skills & Technologies</h3>
                <div class="skills-grid" v-if="isLoading || (skills && skills.length)">
                  <template v-if="isLoading">
                    <div v-for="n in 3" :key="n" class="skill-category">
                      <h4 class="sk-line shimmer" style="width:140px">&nbsp;</h4>
                      <div class="skill-tags">
                        <span v-for="m in 6" :key="m" class="skill-tag sk-line shimmer" style="width:90px">&nbsp;</span>
                      </div>
                    </div>
                  </template>
                  <template v-else>
                    <div v-for="s in skills" :key="s.id" class="skill-category">
                      <h4>{{ s.title }}</h4>
                      <div class="skill-tags">
                        <span v-for="skill in s.skills" :key="skill" class="skill-tag">
                          {{ skill }}
                        </span>
                      </div>
                    </div>
                  </template>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="exp-card" v-if="isLoading || (experiences && experiences.length)">
            <div class="exp-header">
              <span class="exp-header-icon"><i class="fa-regular fa-id-badge"></i></span>
              <span class="exp-header-title">Experience</span>
            </div>
            <div class="exp-list">
              <template v-if="isLoading">
                <div v-for="n in 5" :key="n" class="exp-item">
                  <div class="exp-logo-wrapper shimmer"></div>
                  <div class="exp-info">
                    <div class="sk-line shimmer" style="width: 40%"></div>
                    <div class="sk-line shimmer" style="width: 60%"></div>
                    <div class="sk-line shimmer" style="width: 30%"></div>
                  </div>
                </div>
              </template>
              <template v-else>
                <div v-for="exp in experiences" :key="exp.id" class="exp-item">
                  <div class="exp-logo-wrapper">
                    <img :src="logoSrc(exp.logoUrl)" :alt="exp.company" class="exp-logo" />
                  </div>
                  <div class="exp-info">
                    <div class="exp-company">{{ exp.company }}</div>
                    <div class="exp-title">{{ exp.position }}</div>
                    <div class="exp-years">{{ exp.startYear }} — {{ exp.isCurrent ? 'Present' : (exp.endYear || '') }}</div>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Mobile Layout -->
      <div class="mobile-layout">
        <div class="about-card" v-if="isLoading || aboutText">
          <h2 class="section-title">About Me</h2>
          <div class="about-content">
            <template v-if="isLoading">
              <p v-for="n in 3" :key="n" class="about-text sk-line shimmer">&nbsp;</p>
            </template>
            <template v-else>
              <p v-for="(para, idx) in splitParagraphs(aboutText)" :key="idx" class="about-text">
                {{ para }}
              </p>
            </template>
            <div class="skills-section">
              <h3 class="skills-title">Skills & Technologies</h3>
              <div class="skills-grid" v-if="isLoading || (skills && skills.length)">
                <template v-if="isLoading">
                  <div v-for="n in 3" :key="n" class="skill-category">
                    <h4 class="sk-line shimmer" style="width:140px">&nbsp;</h4>
                    <div class="skill-tags">
                      <span v-for="m in 6" :key="m" class="skill-tag sk-line shimmer" style="width:90px">&nbsp;</span>
                    </div>
                  </div>
                </template>
                <template v-else>
                  <div v-for="s in skills" :key="s.id" class="skill-category">
                    <h4>{{ s.title }}</h4>
                    <div class="skill-tags">
                      <span v-for="skill in s.skills" :key="skill" class="skill-tag">
                        {{ skill }}
                      </span>
                    </div>
                  </div>
                </template>
              </div>
            </div>
          </div>
        </div>
        <div class="exp-card" v-if="isLoading || (experiences && experiences.length)">
          <div class="exp-header">
            <span class="exp-header-icon"><i class="fa-regular fa-id-badge"></i></span>
            <span class="exp-header-title">Experience</span>
          </div>
          <div class="exp-list">
            <template v-if="isLoading">
              <div v-for="n in 5" :key="n" class="exp-item">
                <div class="exp-logo-wrapper shimmer"></div>
                <div class="exp-info">
                  <div class="sk-line shimmer" style="width: 40%"></div>
                  <div class="sk-line shimmer" style="width: 60%"></div>
                  <div class="sk-line shimmer" style="width: 30%"></div>
                </div>
              </div>
            </template>
            <template v-else>
              <div v-for="exp in experiences" :key="exp.id" class="exp-item">
                <div class="exp-logo-wrapper">
                  <img :src="logoSrc(exp.logoUrl)" :alt="exp.company" class="exp-logo" />
                </div>
                <div class="exp-info">
                  <div class="exp-company">{{ exp.company }}</div>
                  <div class="exp-title">{{ exp.position }}</div>
                  <div class="exp-years">{{ exp.startYear }} — {{ exp.isCurrent ? 'Present' : (exp.endYear || '') }}</div>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getAboutByUsername } from '@/utils/api'
import ProfileHeader from '@/components/layout/home/card/ProfileHeaderCard.vue';

const route = useRoute()
const username = route.params.username

const isLoading = ref(true)
const data = ref({ profile: null, about: null })

const aboutText = ref('')
const skills = ref([])
const experiences = ref([])

const splitParagraphs = (text) => {
  if (!text) return []
  return String(text).split(/\n\n+/).map(p => p.trim()).filter(Boolean)
}

const logoSrc = (url) => {
  if (!url) return 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Google_Favicon_2025.svg/250px-Google_Favicon_2025.svg.png'
  return /^https?:\/\//i.test(url) ? url : `${BASE_API_URL}${url}`
}

onMounted(async () => {
  try {
    const res = await getAboutByUsername(username)
    if (res.ok) {
      const json = await res.json()
      if (json.status === 'success') {
        data.value = json.data || {}
        aboutText.value = data.value.about?.aboutText || ''
        skills.value = data.value.about?.skills || []
        experiences.value = data.value.about?.experiences || []
      }
    }
  } finally {
    isLoading.value = false
  }
})
</script>

<style scoped>
/* ===== RESET & BASE ===== */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* ===== LAYOUT CONTAINERS ===== */
.main-bg {
  min-height: 100vh;
  width: 100vw;
}

.main-outer {
  width: 100%;
  margin: 48px auto 108px auto;
  padding: 0 2rem;
}

.row {
  display: flex;
  justify-content: center;
}

/* ===== RESPONSIVE LAYOUT ===== */
.desktop-layout {
  display: block;
}

.mobile-layout {
  display: none;
}

@media (max-width: 767px) {
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

@media (min-width: 1420px) {
  .main-outer {
    max-width: 1200px;
    padding: 0;
  }
}

/* ===== CARD STYLES ===== */
.about-card {
  position: relative;
  border-radius: 18px;
  box-shadow: 0 8px 32px 0 #0004;
  border: 1px solid rgba(255, 255, 255, 0.05);
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(12px);
  color: #fff;
  padding: 24px 28px 22px 28px;
  width: 100%;
  margin-bottom: 24px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow: hidden;
}

.about-card::before {
  content: "";
  position: absolute;
  inset: 1px;
  border-radius: 16.5px;
  border: 1px solid rgba(255, 255, 255, 0.07);
  pointer-events: none;
  z-index: 1;
}

/* ===== TYPOGRAPHY ===== */
.section-title {
  font-size: 2rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 24px;
  letter-spacing: -0.5px;
}

.about-content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.about-text {
  font-size: 1.1rem;
  line-height: 1.7;
  color: #e0e0e0;
  margin-bottom: 16px;
}

/* ===== SKILLS SECTION ===== */
.skills-section {
  margin-top: 16px;
}

.skills-title {
  font-size: 1.4rem;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 16px;
}

.skills-grid {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.skill-category h4 {
  font-size: 1.1rem;
  font-weight: 600;
  color: #00eaff;
  margin-bottom: 8px;
}

.skill-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.skill-tag {
  background: rgba(0, 234, 255, 0.1);
  color: #00eaff;
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 0.9rem;
  font-weight: 500;
  border: 1px solid rgba(0, 234, 255, 0.2);
  transition: all 0.2s ease;
}

.skill-tag:hover {
  background: rgba(0, 234, 255, 0.2);
  transform: translateY(-1px);
}

/* ===== EXPERIENCE CARD ===== */
.exp-card {
  position: relative;
  border-radius: 18px;
  box-shadow: 0 8px 32px 0 #0004;
  border: 1px solid rgba(255, 255, 255, 0.05);
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(12px);
  color: #fff;
  padding: 24px 28px 24px 28px;
  width: 100%;
  margin-bottom: 24px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow: hidden;
}

.exp-card::before {
  content: "";
  position: absolute;
  inset: 1.5px;
  border-radius: 16.5px;
  border: 1px solid rgba(255, 255, 255, 0.07);
  pointer-events: none;
  z-index: 1;
}

.exp-header {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1.05rem;
  font-weight: 500;
  margin-bottom: 16px;
  position: relative;
}

.exp-header-icon {
  color: #fff;
  background: #23243a;
  border-radius: 50%;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  box-shadow: 0 2px 8px #0002;
}

.exp-header-title {
  color: #fff;
  font-weight: 500;
  font-size: 1.08rem;
  flex: 1;
}

.exp-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.exp-item {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.exp-logo-wrapper {
  width: 64px;
  height: 64px;
  border-radius: 8px;
  background: #23243a;
  box-shadow: 0 2px 8px #0002;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.exp-logo {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.sk-line { height: 14px; border-radius: 6px; background: rgba(255,255,255,0.08); }
.shimmer { background: linear-gradient(90deg, rgba(255,255,255,0.06) 25%, rgba(255,255,255,0.12) 50%, rgba(255,255,255,0.06) 75%); background-size: 200% 100%; animation: shimmer 1.5s infinite; }
@keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }

.exp-info {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.exp-company {
  font-weight: 700;
  font-size: 1.05rem;
  color: #fff;
}

.exp-title {
  color: #b2b8ff;
  font-size: 0.98rem;
  font-weight: 500;
}

.exp-years {
  color: #cfd8dc;
  font-size: 0.97rem;
  font-weight: 500;
  text-align: left;
  margin-top: 2px;
}

/* ===== MOBILE RESPONSIVE ===== */
@media (max-width: 767px) {
  .about-card {
    padding: 24px;
  }

  .section-title {
    font-size: 1.75rem;
  }
  
  .about-text {
    font-size: 1rem;
  }

  .exp-card {
    padding: 24px;
  }
}
</style>
