<template>
  <div class="project-glass-card">
    <div class="project-header">
      <span class="project-header-icon"><i class="fa-regular fa-file-code"></i></span>
      <span class="project-header-title">Projects</span>
      <ArrowButton to="/projects" title="View more projects" />
    </div>
    <div class="project-list">
      <template v-if="loading">
        <div v-for="n in 3" :key="n" class="project-item">
          <div class="project-logo shimmer"></div>
          <div class="project-info">
            <div class="sk-line shimmer" style="width:60%"></div>
            <div class="sk-line shimmer" style="width:90%"></div>
            <div class="sk-line shimmer" style="width:50%"></div>
          </div>
        </div>
      </template>
      <template v-else>
        <div v-for="p in projects" :key="p.id" class="project-item">
          <img :src="p.thumbnail || fallbackThumb" :alt="p.title" class="project-logo" />
          <div class="project-info">
            <div class="project-title">{{ p.title }}</div>
            <div class="project-desc">{{ p.description }}</div>
            <div class="project-role" v-if="p.category">{{ p.category }}</div>
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
  projects: { type: Array, default: () => [] }
})
const fallbackThumb = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=80&q=80'
</script>

<style scoped>
/* Card Container */
.project-glass-card {
  position: relative;
  border-radius: 18px;
  box-shadow: 0 8px 32px 0 #0004;
  border: 1px solid rgba(255, 255, 255, 0.05);
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(12px);
  color: #fff;
  padding: 24px 28px 0px 28px;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow: hidden;
}

.project-glass-card::before {
  content: "";
  position: absolute;
  inset: 1.5px;
  border-radius: 16.5px;
  border: 1px solid rgba(255, 255, 255, 0.07);
  pointer-events: none;
  z-index: 1;
}

/* Header */
.project-header {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1.05rem;
  font-weight: 500;
  margin-bottom: 2px;
  position: relative;
}

.project-header-icon {
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

.project-header-title {
  color: #fff;
  font-weight: 500;
  font-size: 1.08rem;
  flex: 1;
}

/* Content */
.project-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  overflow-y: auto;
  padding-right: 4px;
}

.project-list::-webkit-scrollbar {
  width: 6px;
}

.project-list::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.15);
  border-radius: 8px;
}

/* Items */
.project-item {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 6px 0;
}

.project-logo {
  width: 48px;
  height: 48px;
  border-radius: 8px;
  object-fit: cover;
  background: #23243a;
  box-shadow: 0 2px 8px #0002;
  flex-shrink: 0;
}

.project-info {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.project-title {
  font-weight: 700;
  font-size: 1.05rem;
  color: #fff;
  line-height: 1.2;
}

.project-desc {
  color: #cfd8dc;
  font-size: 0.9rem;
  font-weight: 400;
  line-height: 1.3;
  margin-bottom: 2px;
}

.project-role {
  color: #b2b8ff;
  font-size: 0.88rem;
  font-weight: 500;
  margin-bottom: 4px;
}

.project-technologies {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.tech-tag {
  background: rgba(178, 184, 255, 0.15);
  color: #b2b8ff;
  padding: 2px 6px;
  border-radius: 8px;
  font-size: 0.75rem;
  font-weight: 500;
  border: 1px solid rgba(178, 184, 255, 0.2);
}

.sk-line { height: 12px; border-radius: 6px; background: rgba(255,255,255,0.08); margin: 4px 0; }
.shimmer { background: linear-gradient(90deg, rgba(255,255,255,0.06) 25%, rgba(255,255,255,0.12) 50%, rgba(255,255,255,0.06) 75%); background-size: 200% 100%; animation: shimmer 1.5s infinite; }
@keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }

/* Mobile Responsive */
@media (max-width: 1034px) {
  .project-list {
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
  
  .project-item {
    min-width: 320px;
    flex-shrink: 0;
    padding: 16px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
  }
  
  .project-logo {
    width: 64px;
    height: 64px;
    margin-bottom: 12px;
  }
  
  .project-info {
    width: 100%;
  }
  
  .project-technologies {
    justify-content: flex-start;
  }
  
  .project-list::-webkit-scrollbar {
    height: 4px;
    width: auto;
  }
  
  .project-list::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 4px;
  }
}
</style>