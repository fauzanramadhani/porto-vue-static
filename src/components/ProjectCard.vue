<template>
  <div class="project-glass-card">
    <div class="project-header">
      <span class="project-header-icon"><font-awesome-icon :icon="['far', 'file-code']" /></span>
      <span class="project-header-title">Projects</span>
      <ArrowButton to="/projects" title="View more projects" />
    </div>
    <div class="project-list">
      <template v-if="loading">
        <div v-for="n in (limit ? limit : 3)" :key="n" class="project-item">
          <div class="project-logo shimmer"></div>
          <div class="project-info">
            <div class="sk-line shimmer" style="width:60%"></div>
            <div class="sk-line shimmer" style="width:90%"></div>
            <div class="sk-line shimmer" style="width:50%"></div>
          </div>
        </div>
      </template>
      <template v-else>
        <div v-for="p in visibleProjects" :key="p.id" class="project-item">
          <div v-if="!p.thumbnail" class="project-logo project-initials">
            {{ getInitials(p.title) }}
          </div>
          <img v-else :src="normalizeImagePath(p.thumbnail)" :alt="p.title" class="project-logo" />
          <div class="project-info">
            <div class="project-title">{{ p.title }}</div>
            <div class="project-desc">{{ p.description }}</div>
            <div class="project-role" v-if="p.category">{{ p.category }}</div>
          </div>
        </div>
        <div v-if="remainingCount > 0" class="project-more" @click="goToMore">
          + {{ remainingCount }} More
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import ArrowButton from '@/components/ArrowButton.vue'

const props = defineProps({
  loading: { type: Boolean, default: false },
  projects: { type: Array, default: () => [] },
  limit: { type: Number, default: 0 }
})

const router = useRouter();

const visibleProjects = computed(() => {
  if (props.limit && props.limit > 0 && props.projects.length > props.limit) {
    return props.projects.slice(0, props.limit);
  }
  return props.projects;
});

const remainingCount = computed(() => {
  if (props.limit && props.limit > 0 && props.projects.length > props.limit) {
    return props.projects.length - props.limit;
  }
  return 0;
});

const goToMore = () => {
  router.push('/projects');
};

const normalizeImagePath = (path) => {
  if (!path) return '';
  if (path.startsWith('http') || path.startsWith('/')) return path;
  if (path.startsWith('src/')) return `/${path}`;
  return path;
};

const getInitials = (title) => {
  if (!title) return 'P';
  const words = title.split(' ').filter(w => w.length > 0);
  if (words.length === 0) return 'P';
  if (words.length === 1) return words[0].substring(0, 2).toUpperCase();
  return (words[0][0] + words[words.length - 1][0]).toUpperCase();
};

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
  height: 350px;
  max-height: 350px;
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
  max-height: 260px;
  flex: 1;
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
  margin-top: 4px;
  width: 48px;
  height: 48px;
  border-radius: 8px;
  object-fit: contain;
  padding: 4px;
  background: #23243a;
  box-shadow: 0 2px 8px #0002;
  flex-shrink: 0;
}

.project-initials {
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #00eaff 0%, #0072ff 100%);
  color: #000;
  font-weight: 700;
  font-size: 1.2rem;
  padding: 0; /* Remove padding for initials to center them better */
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

.project-more {
  text-align: center;
  color: #b2b8ff;
  font-size: 0.9rem;
  font-weight: 600;
  padding: 8px;
  cursor: pointer;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 8px;
  margin-top: 4px;
  transition: background 0.2s;
}
.project-more:hover {
  background: rgba(255, 255, 255, 0.07);
}

.sk-line { height: 12px; border-radius: 6px; background: rgba(255,255,255,0.08); margin: 4px 0; }
.shimmer { background: linear-gradient(90deg, rgba(255,255,255,0.06) 25%, rgba(255,255,255,0.12) 50%, rgba(255,255,255,0.06) 75%); background-size: 200% 100%; animation: shimmer 1.5s infinite; }
@keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }

/* Mobile Responsive */
@media (max-width: 1034px) {
  .project-glass-card {
    height: auto;
    max-height: none;
    padding: 16px;
    margin-bottom: 16px;
  }

  .project-list {
    flex-direction: column;
    overflow-x: hidden;
    overflow-y: visible;
    gap: 12px;
    padding: 0;
    margin: 0;
    max-height: none;
  }
  
  /* Removed nth-child hiding */
  
  .project-item {
    align-self: stretch;
    min-width: 0;
    padding: 8px 10px;
    background: rgba(255, 255, 255, 0.03);
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    flex-direction: row;
    align-items: flex-start;
    gap: 12px;
    text-align: left;
  }
  
  .project-logo {
    width: 38px;
    height: 38px;
    margin-bottom: 0;
    border-radius: 4px;
    flex-shrink: 0;
  }
  
  .project-info {
    flex: 1;
    min-width: 0;
    gap: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  
  .project-title {
    font-size: 0.9rem;
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: 1px;
    line-height: 1.2;
  }

  .project-desc {
    display: -webkit-box;
    -webkit-line-clamp: 1; /* Clamp to 1 line for super compact look, or 2? User says "small icon next to title", implies compact. */
    line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    font-size: 0.8rem;
    color: #cfd8dc;
    line-height: 1.3;
  }
  
  .project-technologies {
    display: none;
  }

  .tech-tag {
    font-size: 0.7rem;
    padding: 1px 5px;
  }
}
</style>
