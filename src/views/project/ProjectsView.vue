<template>
  <div class="main-outer">
    
    <!-- Desktop Layout -->
    <div class="desktop-layout">
      <div class="projects-card">
        <h2 class="section-title">My Projects</h2>
        
        <!-- Filter Buttons -->
        <div class="filter-buttons">
          <v-btn
            v-for="filter in filters"
            :key="filter.name"
            :variant="selectedFilter === filter.name ? 'elevated' : 'text'"
            :color="selectedFilter === filter.name ? '#00eaff' : '#ffffff'"
            class="filter-btn"
            @click="selectFilter(filter.name)"
          >
            {{ filter.name }}
          </v-btn>
        </div>
        
        <!-- Projects Grid -->
        <div class="projects-grid">
          <div v-if="isLoading" style="display: contents;">
            <!-- Render multiple skeleton cards -->
            <div v-for="n in 3" :key="n" class="project-card skeleton-card">
              <div class="project-image">
                <SkeletonLoader width="100%" height="100%" borderRadius="0" />
              </div>
              <div class="project-content project-content-loading">
                <SkeletonLoader width="70%" height="28px" />
                <SkeletonLoader width="100%" height="16px" />
                <SkeletonLoader width="90%" height="16px" />
                <div class="tag-loading">
                  <SkeletonLoader width="60px" height="24px" borderRadius="12px" />
                  <SkeletonLoader width="70px" height="24px" borderRadius="12px" />
                  <SkeletonLoader width="50px" height="24px" borderRadius="12px" />
                </div>
                <div class="button-loading">
                   <SkeletonLoader width="40px" height="14px" />
                   <SkeletonLoader width="60px" height="20px" borderRadius="4px" />
                </div>
              </div>
            </div>
          </div>

          <div 
            v-else
            v-for="project in filteredProjects" 
            :key="project.id" 
            class="project-card"
            @click="viewProject(project.id)"
          >
            <div class="project-image">
              <img :src="project.image" :alt="project.title" />
              <div class="project-overlay">
                <v-btn 
                  variant="text" 
                  color="#ffffff" 
                  class="view-project-btn"
                >
                  View Project
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke-width="1.5" 
                    stroke="currentColor" 
                    class="chevron-icon ms-1"
                  >
                    <path 
                      stroke-linecap="round" 
                      stroke-linejoin="round" 
                      d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" 
                    />
                  </svg>
                </v-btn>
              </div>
            </div>
            <div class="project-content">
              <h3 class="project-title">{{ project.title }}</h3>
              <p class="project-description">{{ project.description }}</p>
              <div class="project-tech">
                <span 
                  v-for="tech in project.technologies" 
                  :key="tech"
                  class="tech-tag"
                >
                  {{ tech }}
                </span>
              </div>
              <div class="project-meta">
                <span class="project-year">{{ project.year }}</span>
                <span class="project-category">{{ project.category }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Mobile Layout -->
    <div class="mobile-layout">
      <div class="projects-card">
        <h2 class="section-title">My Projects</h2>
        
        <!-- Filter Buttons Mobile -->
        <div class="filter-buttons">
          <v-btn
            v-for="filter in filters"
            :key="filter.name"
            :variant="selectedFilter === filter.name ? 'elevated' : 'text'"
            :color="selectedFilter === filter.name ? '#00eaff' : '#ffffff'"
            class="filter-btn"
            size="small"
            @click="selectFilter(filter.name)"
          >
            {{ filter.name }}
          </v-btn>
        </div>
        
        <!-- Projects List Mobile -->
        <div class="mobile-projects-list">
          <div v-if="isLoading" style="display: contents;">
             <div v-for="n in 3" :key="n" class="project-card skeleton-card">
              <div class="project-image">
                <SkeletonLoader width="100%" height="100%" borderRadius="0" />
              </div>
              <div class="project-content project-content-loading">
                <SkeletonLoader width="70%" height="24px" />
                <SkeletonLoader width="100%" height="16px" />
                <SkeletonLoader width="90%" height="16px" />
                <div class="tag-loading">
                  <SkeletonLoader width="60px" height="24px" borderRadius="12px" />
                  <SkeletonLoader width="70px" height="24px" borderRadius="12px" />
                </div>
                <div class="button-loading">
                   <SkeletonLoader width="40px" height="14px" />
                   <SkeletonLoader width="60px" height="20px" borderRadius="4px" />
                </div>
              </div>
              <div>
                 <SkeletonLoader width="100%" height="36px" borderRadius="4px" />
              </div>
            </div>
          </div>

          <div 
            v-else
            v-for="project in filteredProjects" 
            :key="project.id" 
            class="project-card"
            @click="viewProject(project.id)"
          >
            <div class="project-image">
              <img :src="project.image" :alt="project.title" />
            </div>
            <div class="project-content">
              <h3 class="project-title">{{ project.title }}</h3>
              <p class="project-description">{{ project.description }}</p>
              <div class="project-tech">
                <span 
                  v-for="tech in project.technologies" 
                  :key="tech"
                  class="tech-tag"
                >
                  {{ tech }}
                </span>
              </div>
              <div class="project-meta">
                <span class="project-year">{{ project.year }}</span>
                <span class="project-category">{{ project.category }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import dataService from '@/services/dataService';
import SkeletonLoader from '@/components/SkeletonLoader.vue';

const router = useRouter();

const selectedFilter = ref('All');
const projects = ref([]);
const isLoading = ref(true);

// Compute filters dynamically from projects
const filters = computed(() => {
  if (projects.value.length === 0) return [{ name: 'All' }]
  
  const categories = new Set(['All'])
  projects.value.forEach(project => {
    if (project.category) categories.add(project.category)
  })
  
  return Array.from(categories).map(name => ({ name }))
});

const filteredProjects = computed(() => {
  if (selectedFilter.value === 'All') {
    return projects.value;
  }
  return projects.value.filter(project => project.category === selectedFilter.value);
});

const selectFilter = (filterName) => {
  selectedFilter.value = filterName;
};

const viewProject = (projectId) => {
  router.push(`/projects/${projectId}`);
};

// Load data on mount
onMounted(async () => {
  try {
    isLoading.value = true
    
    const [projectsData] = await Promise.all([
      dataService.getProjects(),
    ])
    
    projects.value = projectsData
  } catch (error) {
    console.error('Failed to load projects page data:', error)
  } finally {
    isLoading.value = false
  }
});
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.main-outer {
  width: 100%;
}

@media (min-width: 1420px) {
  .main-outer {
    max-width: 1200px;
    padding: 0 0 48px 0;
  }
}

/* Layout containers */
.desktop-layout {
  display: block;
}

.mobile-layout {
  display: none;
}

.projects-card {
  width: 100%;
}

.section-title {
  font-size: 2rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 32px;
  letter-spacing: -0.5px;
  text-align: left;
}

.filter-buttons {
  display: flex;
  justify-content: flex-start;
  gap: 12px;
  margin-bottom: 40px;
  flex-wrap: wrap;
}

.filter-btn {
  font-weight: 500;
  text-transform: none;
  border-radius: 20px;
  padding: 8px 20px;
  transition: all 0.3s ease;
}

.filter-btn:hover {
  transform: translateY(-2px);
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 32px;
}

.mobile-projects-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.project-card {
  background: rgba(255, 255, 255, 0.03);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
}

.project-content-loading {
  gap: 12px;
  display: flex;
  flex-direction: column;
}

.tag-loading {
  display: flex;
  gap: 8px;
}

.button-loading {
  display: flex;
  justify-content: space-between;
}

.project-card:hover {
  background: rgba(255, 255, 255, 0.05);
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
}

.project-image {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.project-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.project-card:hover .project-image img {
  transform: scale(1.05);
}

.project-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.project-card:hover .project-overlay {
  opacity: 1;
}

.view-project-btn {
  font-weight: 500;
  text-transform: none;
  padding: 12px 24px;
  border-radius: 8px;
  background: rgba(0, 234, 255, 0.9);
  color: #000 !important;
  display: flex;
  align-items: center;
}

.chevron-icon {
  width: 16px;
  height: 16px;
  transition: transform 0.2s ease;
}

.view-project-btn:hover .chevron-icon {
  transform: translateX(2px);
}

.project-content {
  padding: 24px;
}

.project-title {
  font-size: 1.4rem;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 12px;
  line-height: 1.3;
}

.project-description {
  font-size: 0.95rem;
  color: #b0b0b0;
  line-height: 1.6;
  margin-bottom: 16px;
}

.project-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
}

.tech-tag {
  background: rgba(0, 234, 255, 0.1);
  color: #00eaff;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;
  border: 1px solid rgba(0, 234, 255, 0.2);
}

.project-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.85rem;
  color: #808080;
}

.project-year {
  font-weight: 500;
}

.project-category {
  background: rgba(255, 255, 255, 0.1);
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.75rem;
}

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

  .filter-buttons {
    gap: 8px;
    margin-bottom: 32px;
  }
  
  .filter-btn {
    padding: 6px 16px;
    font-size: 0.9rem;
  }
  
  .project-content {
    padding: 20px;
  }
  
  .project-title {
    font-size: 1.2rem;
  }
}
</style>