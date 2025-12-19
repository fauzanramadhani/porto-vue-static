<template>
  <div class="exp-glass-card">
    <div class="exp-header">
      <span class="exp-header-icon"><i class="fa-regular fa-id-badge"></i></span>
      <span class="exp-header-title">Experience</span>
      <ArrowButton to="/about" title="View more experience" />
    </div>
    <div class="exp-list">
      <template v-if="loading">
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
</template>

<script setup>
import ArrowButton from '@/assets/ArrowButton.vue'
const props = defineProps({
  loading: { type: Boolean, default: false },
  experiences: { type: Array, default: () => [] }
})
const fallbackLogo = 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Google_Favicon_2025.svg/250px-Google_Favicon_2025.svg.png'
const logoSrc = (url) => {
  if (!url) return fallbackLogo
  return /^https?:\/\//i.test(url) ? url : `${BASE_API_URL}${url}`
}
</script>

<style scoped>
/* Card Container */
.exp-glass-card {
  position: relative;
  border-radius: 18px;
  box-shadow: 0 8px 32px 0 #0004;
  border: 1px solid rgba(255, 255, 255, 0.05);
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(12px);
  color: #fff;
  padding: 24px 28px 0px 28px;
  width: 100%;
  height: 350px;
  margin-bottom: 24px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow: hidden;
}

.exp-glass-card::before {
  content: "";
  position: absolute;
  inset: 1.5px;
  border-radius: 16.5px;
  border: 1px solid rgba(255, 255, 255, 0.07);
  pointer-events: none;
  z-index: 1;
}

/* Header */
.exp-header {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1.05rem;
  font-weight: 500;
  margin-bottom: 2px;
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

/* Content */
.exp-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1 1 auto;
  overflow-y: auto;
  padding-right: 4px;
}

.exp-list::-webkit-scrollbar {
  width: 6px;
}

.exp-list::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.15);
  border-radius: 8px;
}

/* Items */
.exp-item {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 6px 0;
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

.sk-line { height: 12px; border-radius: 6px; background: rgba(255,255,255,0.08); margin: 4px 0; }
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

/* Mobile Responsive */
@media (max-width: 1034px) {
  .exp-glass-card {
    height: 180px;
  }
  
  .exp-list {
    flex-direction: row;
    overflow-x: auto;
    overflow-y: hidden;
    gap: 16px;
    padding-bottom: 8px;
    padding-left: 0;
    padding-right: 0;
    margin-left: -28px;
    margin-right: -28px;
    padding-left: 28px;
    padding-right: 28px;
  }
  
  .exp-item {
    min-width: 280px;
    flex-shrink: 0;
    padding: 12px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .exp-list::-webkit-scrollbar {
    height: 4px;
    width: auto;
  }
  
  .exp-list::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 4px;
  }
}
</style> 