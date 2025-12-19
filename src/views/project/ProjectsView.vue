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
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import ProfileHeader from '@/components/layout/home/card/ProfileHeaderCard.vue';

const router = useRouter();

const selectedFilter = ref('All');

const filters = ref([
  { name: 'All' },
  { name: 'Web Apps' },
  { name: 'Mobile Apps' },
  { name: 'Design' },
  { name: 'Open Source' }
]);

const projects = ref([
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "A modern e-commerce platform built with Vue.js and Node.js. Features include user authentication, product management, and payment integration.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop",
    technologies: ["Vue.js", "Node.js", "MongoDB", "Stripe"],
    year: "2024",
    category: "Web Apps"
  },
  {
    id: 2,
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=250&fit=crop",
    technologies: ["React", "Firebase", "Material-UI", "Socket.io"],
    year: "2023",
    category: "Web Apps"
  },
  {
    id: 3,
    title: "Fitness Tracking Mobile App",
    description: "A cross-platform mobile app for tracking workouts, nutrition, and fitness goals with beautiful charts and progress visualization.",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop",
    technologies: ["React Native", "Redux", "Chart.js", "AsyncStorage"],
    year: "2023",
    category: "Mobile Apps"
  },
  {
    id: 4,
    title: "Portfolio Website Design",
    description: "A modern portfolio website design with smooth animations, responsive layout, and interactive elements.",
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=400&h=250&fit=crop",
    technologies: ["HTML5", "CSS3", "JavaScript", "GSAP"],
    year: "2024",
    category: "Design"
  },
  {
    id: 5,
    title: "Vue Component Library",
    description: "An open-source Vue.js component library with 50+ reusable components, comprehensive documentation, and TypeScript support.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=250&fit=crop",
    technologies: ["Vue.js", "TypeScript", "Vite", "Storybook"],
    year: "2023",
    category: "Open Source"
  },
  {
    id: 6,
    title: "Real-time Chat Application",
    description: "A real-time chat application with features like message encryption, file sharing, and group conversations.",
    image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=250&fit=crop",
    technologies: ["Socket.io", "Express.js", "MongoDB", "JWT"],
    year: "2023",
    category: "Web Apps"
  }
]);

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
  console.log('Viewing project:', projectId);
  // Navigate to project detail page
  router.push(`/fauzan/projects/${projectId}`);
};
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