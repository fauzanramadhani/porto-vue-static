<template>
  <div class="main-bg">
    <div class="main-outer">
      <div class="mb-12">
        <ProfileHeader />
      </div>
      <div class="main-sections">
        <v-row no-gutters>
          <v-col cols="12" class="d-flex justify-center">
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
                <div 
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
          </v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import dataService from '@/services/dataService';
import ProfileHeader from '@/components/ProfileHeaderCard.vue';

const router = useRouter();

const selectedFilter = ref('All');
const projects = ref([]);

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
    const data = await dataService.getProjects()
    projects.value = data
  } catch (error) {
    console.error('Failed to load projects:', error)
  }
});
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.main-bg {
  min-height: 100vh;
  width: 100vw;
}

.main-outer {
  width: 100%;
  margin: 48px auto 108px auto;
  padding: 0 2rem;
}

@media (min-width: 1420px) {
  .main-outer {
    max-width: 1200px;
    padding: 0;
  }
}

.main-sections {
  width: 100%;
}

.projects-card {
  width: 100%;
  max-width: 1200px;
}

.section-title {
  font-size: 2rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 32px;
  letter-spacing: -0.5px;
  text-align: center;
}

.filter-buttons {
  display: flex;
  justify-content: center;
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

.project-card {
  background: rgba(255, 255, 255, 0.03);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
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

@media (max-width: 768px) {
  
  .filter-buttons {
    gap: 8px;
    margin-bottom: 32px;
  }
  
  .filter-btn {
    padding: 6px 16px;
    font-size: 0.9rem;
  }
  
  .projects-grid {
    grid-template-columns: 1fr;
    gap: 24px;
  }
  
  .project-content {
    padding: 20px;
  }
  
  .project-title {
    font-size: 1.2rem;
  }
}
</style> 