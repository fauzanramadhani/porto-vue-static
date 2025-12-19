<template>
  <div class="main-bg">
    <div class="main-outer">
      <ProfileHeader />
      
      <!-- Desktop Layout -->
      <div class="desktop-layout">
        <div class="project-detail-container">
          <div class="project-detail-card">
            <!-- Back Button -->
            <div class="back-section">
              <v-btn 
                variant="text" 
                color="#00eaff" 
                class="back-btn"
                @click="goBack"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" class="back-arrow-icon mr-1">
                  <path d="M73.4 297.4C60.9 309.9 60.9 330.2 73.4 342.7L233.4 502.7C245.9 515.2 266.2 515.2 278.7 502.7C291.2 490.2 291.2 469.9 278.7 457.4L173.3 352L544 352C561.7 352 576 337.7 576 320C576 302.3 561.7 288 544 288L173.3 288L278.7 182.6C291.2 170.1 291.2 149.8 278.7 137.3C266.2 124.8 245.9 124.8 233.4 137.3L73.4 297.3z"/>
                </svg>
                Back to Projects
              </v-btn>
            </div>

            <!-- Project Header -->
            <div class="project-header">
              <div class="project-category">{{ project.category }}</div>
              <h1 class="project-title">{{ project.title }}</h1>
              <div class="project-meta">
                <span class="project-year">{{ project.year }}</span>
                <span class="project-duration">{{ project.duration }}</span>
                <span class="project-status">{{ project.status }}</span>
              </div>
            </div>

            <!-- Featured Image -->
            <div class="featured-image">
              <img :src="project.image" :alt="project.title" />
            </div>

            <!-- Project Overview -->
            <div class="project-overview">
              <h2 class="section-heading">Project Overview</h2>
              <p class="overview-text">{{ project.overview }}</p>
            </div>

            <!-- Technologies Used -->
            <div class="technologies-section">
              <h2 class="section-heading">Technologies Used</h2>
              <div class="tech-grid">
                <div v-for="tech in project.technologies" :key="tech.name" class="tech-item">
                  <div class="tech-icon">
                    <component :is="tech.icon" />
                  </div>
                  <span class="tech-name">{{ tech.name }}</span>
                </div>
              </div>
            </div>

            <!-- Project Features -->
            <div class="features-section">
              <h2 class="section-heading">Key Features</h2>
              <div class="features-list">
                <div v-for="feature in project.features" :key="feature" class="feature-item">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" class="feature-icon">
                    <path d="M96 128a32 32 0 1 0 0-64 32 32 0 1 0 0 64zM96 320a32 32 0 1 0 0-64 32 32 0 1 0 0 64zM96 512a32 32 0 1 0 0-64 32 32 0 1 0 0 64zM160 64c0 17.7-14.3 32-32 32s-32-14.3-32-32 14.3-32 32-32 32 14.3 32 32zm0 192c0 17.7-14.3 32-32 32s-32-14.3-32-32 14.3-32 32-32 32 14.3 32 32zm0 192c0 17.7-14.3 32-32 32s-32-14.3-32-32 14.3-32 32-32 32 14.3 32 32z"/>
                  </svg>
                  <span>{{ feature }}</span>
                </div>
              </div>
            </div>

            <!-- Project Details -->
            <div class="project-details">
              <h2 class="section-heading">Project Details</h2>
              <div v-for="(section, index) in project.details" :key="index" class="detail-section">
                <h3 v-if="section.heading" class="detail-heading">{{ section.heading }}</h3>
                <p v-if="section.paragraph" class="detail-paragraph">{{ section.paragraph }}</p>
                <div v-if="section.codeBlock" class="code-block">
                  <pre><code>{{ section.codeBlock }}</code></pre>
                </div>
                <ul v-if="section.list" class="detail-list">
                  <li v-for="(item, itemIndex) in section.list" :key="itemIndex">{{ item }}</li>
                </ul>
              </div>
            </div>

            <!-- Project Links -->
            <div class="project-links">
              <h2 class="section-heading">Project Links</h2>
              <div class="links-grid">
                <a v-if="project.links.demo" :href="project.links.demo" target="_blank" class="project-link demo-link">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" class="link-icon">
                    <path d="M579.8 267.7c56.5-56.5 56.5-148 0-204.5c-50-50-128.8-56.5-186.3-15.4l-1.6 1.1c-14.4 10.3-17.7 30.3-7.4 44.6s30.3 17.7 44.6 7.4l1.6-1.1c32.1-22.9 76-19.3 103.8 8.6c31.5 31.5 31.5 82.5 0 114L422.3 334.6c-31.5 31.5-82.5 31.5-114 0c-27.9-27.9-31.5-71.8-8.6-103.8l1.1-1.6c10.3-14.4 6.9-34.4-7.4-44.6s-34.4-6.9-44.6 7.4l-1.1 1.6C206.5 251.2 213 330.1 263 380c56.5 56.5 148 56.5 204.5 0L579.8 267.7zM60.2 372.3c-56.5 56.5-56.5 148 0 204.5c50 50 128.8 56.5 186.3 15.4l1.6-1.1c14.4-10.3 17.7-30.3 7.4-44.6s30.3-17.7 44.6-7.4l1.6-1.1c32.1 22.9-76 19.3-103.8-8.6C74 372 74 321 105.5 289.5l112.2-112.2c31.5-31.5 82.5-31.5 114 0c27.9 27.9 31.5 71.8 8.6 103.9l-1.1 1.6c-10.3 14.4-6.9 34.4 7.4 44.6s34.4 6.9 44.6-7.4l1.1-1.6C433.5 388.8 427 309.9 377 260c-56.5-56.5-148-56.5-204.5 0L60.2 372.3z"/>
                  </svg>
                  Live Demo
                </a>
                <a v-if="project.links.github" :href="project.links.github" target="_blank" class="project-link github-link">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" class="link-icon">
                    <path d="M320 32c-17.7 0-32 14.3-32 32v96H160c-17.7 0-32 14.3-32 32s14.3 32 32 32h128v96c0 17.7 14.3 32 32 32s32-14.3 32-32V224h128c17.7 0 32-14.3 32-32s-14.3-32-32-32H352V64c0-17.7-14.3-32-32-32z"/>
                  </svg>
                  View Code
                </a>
                <a v-if="project.links.documentation" :href="project.links.documentation" target="_blank" class="project-link docs-link">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" class="link-icon">
                    <path d="M96 0C60.7 0 32 28.7 32 64V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0H96zM256 0V128H384L256 0z"/>
                  </svg>
                  Documentation
                </a>
              </div>
            </div>
          </div>

          <!-- Sidebar -->
          <div class="sidebar-card">
            <h3 class="sidebar-title">Other Projects</h3>
            <div class="other-projects">
              <div v-for="otherProject in otherProjects" :key="otherProject.id" class="other-project" @click="navigateToProject(otherProject.id)">
                <div class="other-project-image">
                  <img :src="otherProject.image" :alt="otherProject.title" />
                </div>
                <div class="other-project-content">
                  <h4 class="other-project-title">{{ otherProject.title }}</h4>
                  <span class="other-project-category">{{ otherProject.category }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Mobile Layout -->
      <div class="mobile-layout">
        <div class="mobile-project-detail">
          <!-- Back Button -->
          <div class="mobile-back-section">
            <v-btn 
              variant="text" 
              color="#00eaff" 
              class="mobile-back-btn"
              @click="goBack"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" class="back-arrow-icon">
                <path d="M73.4 297.4C60.9 309.9 60.9 330.2 73.4 342.7L233.4 502.7C245.9 515.2 266.2 515.2 278.7 502.7C291.2 490.2 291.2 469.9 278.7 457.4L173.3 352L544 352C561.7 352 576 337.7 576 320C576 302.3 561.7 288 544 288L173.3 288L278.7 182.6C291.2 170.1 291.2 149.8 278.7 137.3C266.2 124.8 245.9 124.8 233.4 137.3L73.4 297.3z"/>
              </svg>
              Back to Projects
            </v-btn>
          </div>

          <!-- Project Header -->
          <div class="mobile-project-header">
            <div class="mobile-project-category">{{ project.category }}</div>
            <h1 class="mobile-project-title">{{ project.title }}</h1>
            <div class="mobile-project-meta">
              <span class="mobile-project-year">{{ project.year }}</span>
              <span class="mobile-project-duration">{{ project.duration }}</span>
              <span class="mobile-project-status">{{ project.status }}</span>
            </div>
          </div>

          <!-- Featured Image -->
          <div class="mobile-featured-image">
            <img :src="project.image" :alt="project.title" />
          </div>

          <!-- Project Overview -->
          <div class="mobile-project-overview">
            <h2 class="mobile-section-heading">Project Overview</h2>
            <p class="mobile-overview-text">{{ project.overview }}</p>
          </div>

          <!-- Technologies Used -->
          <div class="mobile-technologies-section">
            <h2 class="mobile-section-heading">Technologies Used</h2>
            <div class="mobile-tech-grid">
              <div v-for="tech in project.technologies" :key="tech.name" class="mobile-tech-item">
                <div class="mobile-tech-icon">
                  <component :is="tech.icon" />
                </div>
                <span class="mobile-tech-name">{{ tech.name }}</span>
              </div>
            </div>
          </div>

          <!-- Project Features -->
          <div class="mobile-features-section">
            <h2 class="mobile-section-heading">Key Features</h2>
            <div class="mobile-features-list">
              <div v-for="feature in project.features" :key="feature" class="mobile-feature-item">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" class="mobile-feature-icon">
                  <path d="M96 128a32 32 0 1 0 0-64 32 32 0 1 0 0 64zM96 320a32 32 0 1 0 0-64 32 32 0 1 0 0 64zM96 512a32 32 0 1 0 0-64 32 32 0 1 0 0 64zM160 64c0 17.7-14.3 32-32 32s-32-14.3-32-32 14.3-32 32-32 32 14.3 32 32zm0 192c0 17.7-14.3 32-32 32s-32-14.3-32-32 14.3-32 32-32 32 14.3 32 32zm0 192c0 17.7-14.3 32-32 32s-32-14.3-32-32 14.3-32 32-32 32 14.3 32 32z"/>
                </svg>
                <span>{{ feature }}</span>
              </div>
            </div>
          </div>

          <!-- Project Details -->
          <div class="mobile-project-details">
            <h2 class="mobile-section-heading">Project Details</h2>
            <div v-for="(section, index) in project.details" :key="index" class="mobile-detail-section">
              <h3 v-if="section.heading" class="mobile-detail-heading">{{ section.heading }}</h3>
              <p v-if="section.paragraph" class="mobile-detail-paragraph">{{ section.paragraph }}</p>
              <div v-if="section.codeBlock" class="mobile-code-block">
                <pre><code>{{ section.codeBlock }}</code></pre>
              </div>
              <ul v-if="section.list" class="mobile-detail-list">
                <li v-for="(item, itemIndex) in section.list" :key="itemIndex">{{ item }}</li>
              </ul>
            </div>
          </div>

          <!-- Project Links -->
          <div class="mobile-project-links">
            <h2 class="mobile-section-heading">Project Links</h2>
            <div class="mobile-links-grid">
              <a v-if="project.links.demo" :href="project.links.demo" target="_blank" class="mobile-project-link mobile-demo-link">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" class="mobile-link-icon">
                  <path d="M579.8 267.7c56.5-56.5 56.5-148 0-204.5c-50-50-128.8-56.5-186.3-15.4l-1.6 1.1c-14.4 10.3-17.7 30.3-7.4 44.6s30.3 17.7 44.6 7.4l1.6-1.1c32.1-22.9 76-19.3 103.8 8.6c31.5 31.5 31.5 82.5 0 114L422.3 334.6c-31.5 31.5-82.5 31.5-114 0c-27.9-27.9-31.5-71.8-8.6-103.8l1.1-1.6c10.3-14.4 6.9-34.4-7.4-44.6s-34.4-6.9-44.6 7.4l-1.1 1.6C206.5 251.2 213 330.1 263 380c56.5 56.5 148 56.5 204.5 0L579.8 267.7zM60.2 372.3c-56.5 56.5-56.5 148 0 204.5c50 50 128.8 56.5 186.3 15.4l1.6-1.1c14.4-10.3 17.7-30.3 7.4-44.6s30.3-17.7 44.6-7.4l1.6-1.1c32.1 22.9-76 19.3-103.8-8.6C74 372 74 321 105.5 289.5l112.2-112.2c31.5-31.5 82.5-31.5 114 0c27.9 27.9 31.5 71.8 8.6 103.9l-1.1 1.6c-10.3 14.4-6.9 34.4 7.4 44.6s34.4 6.9 44.6-7.4l1.1-1.6C433.5 388.8 427 309.9 377 260c-56.5-56.5-148-56.5-204.5 0L60.2 372.3z"/>
                </svg>
                Live Demo
              </a>
              <a v-if="project.links.github" :href="project.links.github" target="_blank" class="mobile-project-link mobile-github-link">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" class="mobile-link-icon">
                  <path d="M320 32c-17.7 0-32 14.3-32 32v96H160c-17.7 0-32 14.3-32 32s14.3 32 32 32h128v96c0 17.7 14.3 32 32 32s32-14.3 32-32V224h128c17.7 0 32-14.3 32-32s-14.3-32-32-32H352V64c0-17.7-14.3-32-32-32z"/>
                </svg>
                View Code
              </a>
              <a v-if="project.links.documentation" :href="project.links.documentation" target="_blank" class="mobile-project-link mobile-docs-link">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" class="mobile-link-icon">
                  <path d="M96 0C60.7 0 32 28.7 32 64V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0H96zM256 0V128H384L256 0z"/>
                </svg>
                Documentation
              </a>
            </div>
          </div>

          <!-- Mobile Other Projects -->
          <div class="mobile-other-projects">
            <h3 class="mobile-other-projects-title">Other Projects</h3>
            <div class="mobile-other-projects-grid">
              <div v-for="otherProject in otherProjects" :key="otherProject.id" class="mobile-other-project" @click="navigateToProject(otherProject.id)">
                <div class="mobile-other-project-image">
                  <img :src="otherProject.image" :alt="otherProject.title" />
                </div>
                <div class="mobile-other-project-content">
                  <h4 class="mobile-other-project-title">{{ otherProject.title }}</h4>
                  <span class="mobile-other-project-category">{{ otherProject.category }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import ProfileHeader from '@/components/layout/home/card/ProfileHeaderCard.vue';

const router = useRouter();
const route = useRoute();

// Project data (dummy data)
const project = ref({
  id: 1,
  title: "E-Commerce Platform",
  category: "Web Apps",
  year: "2024",
  duration: "3 months",
  status: "Completed",
  image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop",
  overview: "A modern e-commerce platform built with Vue.js and Node.js. Features include user authentication, product management, shopping cart functionality, payment integration with Stripe, and a responsive admin dashboard.",
  technologies: [
    { name: "Vue.js", icon: "VueIcon" },
    { name: "Node.js", icon: "NodeIcon" },
    { name: "MongoDB", icon: "MongoIcon" },
    { name: "Stripe", icon: "StripeIcon" }
  ],
  features: [
    "User authentication and authorization",
    "Product catalog with search and filtering",
    "Shopping cart and checkout process",
    "Payment processing with Stripe",
    "Admin dashboard for product management",
    "Responsive design for all devices"
  ],
  details: [
    {
      heading: "Project Overview",
      paragraph: "This e-commerce platform was designed to provide a seamless shopping experience for both customers and administrators. The project involved building a full-stack application with modern web technologies."
    },
    {
      heading: "Technical Architecture",
      paragraph: "The application follows a modern architecture pattern with a Vue.js frontend, Node.js backend, and MongoDB database. The frontend uses Vue 3 with Composition API for better code organization and maintainability."
    },
    {
      heading: "Key Features Implementation",
      list: [
        "JWT-based authentication system",
        "RESTful API with Express.js",
        "Real-time inventory management",
        "Order tracking and notifications",
        "Analytics and reporting dashboard"
      ]
    },
    {
      heading: "Challenges and Solutions",
      paragraph: "One of the main challenges was implementing a robust payment system. We solved this by integrating Stripe's payment APIs and implementing proper error handling and validation."
    }
  ],
  links: {
    demo: "https://demo-ecommerce.com",
    github: "https://github.com/username/ecommerce-platform",
    documentation: "https://docs-ecommerce.com"
  }
});

const otherProjects = ref([
  {
    id: 2,
    title: "Task Management App",
    category: "Web Apps",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=200&h=120&fit=crop"
  },
  {
    id: 3,
    title: "Fitness Tracking Mobile App",
    category: "Mobile Apps",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=120&fit=crop"
  },
  {
    id: 4,
    title: "Portfolio Website Design",
    category: "Design",
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=200&h=120&fit=crop"
  }
]);

// Methods
const goBack = () => {
  router.go(-1);
};

const navigateToProject = (projectId) => {
  router.push(`/fauzan/projects/${projectId}`);
};

onMounted(() => {
  // Load the project data based on the route parameter
  const projectId = parseInt(route.params.projectId);
  console.log('Loading project:', projectId);
  
  // In a real app, you would fetch the project data based on the ID
  // For now, we're using static data
});
</script>

<style scoped>
/* ===== RESET & BASE ===== */
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

/* ===== RESPONSIVE LAYOUT ===== */
.desktop-layout {
  display: block;
}

.mobile-layout {
  display: none;
}

@media (max-width: 768px) {
  .desktop-layout {
    display: none;
  }
  
  .mobile-layout {
    display: block;
  }
  
  .main-outer {
    padding: 0 2rem;
  }
}

/* ===== DESKTOP LAYOUT ===== */
.project-detail-container {
  display: flex;
  gap: 24px;
  align-items: flex-start;
}

.project-detail-card {
  flex: 1;
  position: relative;
  border-radius: 18px;
  box-shadow: 0 8px 32px 0 #0004;
  border: 1px solid rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(12px);
  color: #fff;
  padding: 32px;
  overflow: hidden;
}

.project-detail-card::before {
  content: "";
  position: absolute;
  inset: 1px;
  border-radius: 16.5px;
  border: 1px solid rgba(255, 255, 255, 0.07);
  pointer-events: none;
  z-index: 1;
}

/* Back Button */
.back-section {
  margin-bottom: 24px;
}

.back-btn {
  font-weight: 500;
  text-transform: none;
  padding: 8px 16px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.back-arrow-icon {
  width: 16px;
  height: 16px;
  fill: currentColor;
  transition: transform 0.2s ease;
}

.back-btn:hover .back-arrow-icon {
  transform: translateX(-4px);
}

/* Project Header */
.project-header {
  margin-bottom: 32px;
}

.project-category {
  display: inline-block;
  background: rgba(0, 234, 255, 0.9);
  color: #000;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 16px;
}

.project-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #ffffff;
  line-height: 1.2;
  margin-bottom: 20px;
  letter-spacing: -0.5px;
}

.project-meta {
  display: flex;
  gap: 20px;
  font-size: 0.9rem;
  color: #b0b0b0;
}

/* Featured Image */
.featured-image {
  margin-bottom: 32px;
  border-radius: 16px;
  overflow: hidden;
}

.featured-image img {
  width: 100%;
  height: auto;
  object-fit: cover;
}

/* Section Headings */
.section-heading {
  font-size: 1.8rem;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 20px;
  letter-spacing: -0.3px;
}

/* Project Overview */
.project-overview {
  margin-bottom: 40px;
}

.overview-text {
  font-size: 1.1rem;
  color: #e0e0e0;
  line-height: 1.8;
  margin-bottom: 20px;
}

/* Technologies Section */
.technologies-section {
  margin-bottom: 40px;
}

.tech-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 20px;
}

.tech-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  text-align: center;
}

.tech-icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 234, 255, 0.1);
  border-radius: 8px;
}

.tech-name {
  font-size: 0.9rem;
  color: #ffffff;
  font-weight: 500;
}

/* Features Section */
.features-section {
  margin-bottom: 40px;
}

.features-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.feature-icon {
  width: 20px;
  height: 20px;
  fill: #00eaff;
  flex-shrink: 0;
}

/* Project Details */
.project-details {
  margin-bottom: 40px;
}

.detail-section {
  margin-bottom: 32px;
}

.detail-heading {
  font-size: 1.4rem;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 16px;
  letter-spacing: -0.2px;
}

.detail-paragraph {
  font-size: 1.1rem;
  color: #e0e0e0;
  line-height: 1.8;
  margin-bottom: 20px;
}

.code-block {
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 20px;
  margin: 20px 0;
  overflow-x: auto;
}

.code-block pre {
  margin: 0;
  color: #00eaff;
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
  line-height: 1.5;
}

.detail-list {
  margin: 20px 0;
  padding-left: 24px;
}

.detail-list li {
  font-size: 1.1rem;
  color: #e0e0e0;
  line-height: 1.8;
  margin-bottom: 12px;
}

/* Project Links */
.project-links {
  margin-bottom: 40px;
}

.links-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.project-link {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: #ffffff;
  text-decoration: none;
  transition: all 0.3s ease;
}

.project-link:hover {
  background: rgba(255, 255, 255, 0.08);
  transform: translateY(-2px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}

.link-icon {
  width: 20px;
  height: 20px;
  fill: currentColor;
}

/* ===== SIDEBAR ===== */
.sidebar-card {
  position: relative;
  border-radius: 18px;
  box-shadow: 0 8px 32px 0 #0004;
  border: 1px solid rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(12px);
  color: #fff;
  padding: 32px;
  width: 300px;
  flex-shrink: 0;
}

.sidebar-card::before {
  content: "";
  position: absolute;
  inset: 1px;
  border-radius: 16.5px;
  border: 1px solid rgba(255, 255, 255, 0.07);
  pointer-events: none;
  z-index: 1;
}

.sidebar-title {
  font-size: 1.3rem;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 24px;
}

.other-projects {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.other-project {
  display: flex;
  flex-direction: column;
  padding: 16px;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  cursor: pointer;
  transition: all 0.3s ease;
}

.other-project:hover {
  background: rgba(255, 255, 255, 0.08);
  transform: translateY(-2px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}

.other-project-image {
  margin-bottom: 12px;
}

.other-project-image img {
  width: 100%;
  height: 120px;
  object-fit: cover;
  border-radius: 8px;
}

.other-project-content {
  display: flex;
  flex-direction: column;
}

.other-project-title {
  font-size: 1rem;
  font-weight: 600;
  color: #ffffff;
  line-height: 1.4;
  margin-bottom: 8px;
}

.other-project-category {
  font-size: 0.8rem;
  color: #808080;
}

/* ===== MOBILE LAYOUT ===== */
.mobile-project-detail {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 18px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  padding: 24px;
  margin-bottom: 32px;
}

.mobile-back-section {
  margin-bottom: 20px;
}

.mobile-back-btn {
  font-weight: 500;
  text-transform: none;
  padding: 8px 16px;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 8px;
}

.mobile-back-btn .back-arrow-icon {
  width: 14px;
  height: 14px;
  fill: currentColor;
  transition: transform 0.2s ease;
}

.mobile-back-btn:hover .back-arrow-icon {
  transform: translateX(-4px);
}

.mobile-project-header {
  margin-bottom: 24px;
}

.mobile-project-category {
  display: inline-block;
  background: rgba(0, 234, 255, 0.9);
  color: #000;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 600;
  margin-bottom: 16px;
}

.mobile-project-title {
  font-size: 1.8rem;
  font-weight: 700;
  color: #ffffff;
  line-height: 1.3;
  margin-bottom: 16px;
  letter-spacing: -0.3px;
}

.mobile-project-meta {
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 0.85rem;
  color: #b0b0b0;
}

.mobile-featured-image {
  margin-bottom: 24px;
  border-radius: 12px;
  overflow: hidden;
}

.mobile-featured-image img {
  width: 100%;
  height: auto;
  object-fit: cover;
}

.mobile-section-heading {
  font-size: 1.4rem;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 16px;
  letter-spacing: -0.2px;
}

.mobile-project-overview {
  margin-bottom: 32px;
}

.mobile-overview-text {
  font-size: 1rem;
  color: #e0e0e0;
  line-height: 1.7;
  margin-bottom: 16px;
}

.mobile-technologies-section {
  margin-bottom: 32px;
}

.mobile-tech-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.mobile-tech-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 16px;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  text-align: center;
}

.mobile-tech-icon {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 234, 255, 0.1);
  border-radius: 6px;
}

.mobile-tech-name {
  font-size: 0.8rem;
  color: #ffffff;
  font-weight: 500;
}

.mobile-features-section {
  margin-bottom: 32px;
}

.mobile-features-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.mobile-feature-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.mobile-feature-icon {
  width: 16px;
  height: 16px;
  fill: #00eaff;
  flex-shrink: 0;
}

.mobile-project-details {
  margin-bottom: 32px;
}

.mobile-detail-section {
  margin-bottom: 24px;
}

.mobile-detail-heading {
  font-size: 1.2rem;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 12px;
  letter-spacing: -0.1px;
}

.mobile-detail-paragraph {
  font-size: 1rem;
  color: #e0e0e0;
  line-height: 1.7;
  margin-bottom: 16px;
}

.mobile-code-block {
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 16px;
  margin: 16px 0;
  overflow-x: auto;
}

.mobile-code-block pre {
  margin: 0;
  color: #00eaff;
  font-family: 'Courier New', monospace;
  font-size: 0.8rem;
  line-height: 1.4;
}

.mobile-detail-list {
  margin: 16px 0;
  padding-left: 20px;
}

.mobile-detail-list li {
  font-size: 1rem;
  color: #e0e0e0;
  line-height: 1.7;
  margin-bottom: 10px;
}

.mobile-project-links {
  margin-bottom: 32px;
}

.mobile-links-grid {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.mobile-project-link {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: #ffffff;
  text-decoration: none;
  transition: all 0.3s ease;
}

.mobile-project-link:hover {
  background: rgba(255, 255, 255, 0.08);
  transform: translateY(-2px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}

.mobile-link-icon {
  width: 18px;
  height: 18px;
  fill: currentColor;
}

/* Mobile Other Projects */
.mobile-other-projects {
  margin-top: 32px;
}

.mobile-other-projects-title {
  font-size: 1.4rem;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 20px;
  letter-spacing: -0.2px;
}

.mobile-other-projects-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}

.mobile-other-project {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
}

.mobile-other-project:hover {
  background: rgba(255, 255, 255, 0.08);
  transform: translateY(-2px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}

.mobile-other-project-image {
  width: 100%;
  height: 160px;
}

.mobile-other-project-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.mobile-other-project-content {
  padding: 16px;
}

.mobile-other-project-title {
  font-size: 1rem;
  font-weight: 600;
  color: #ffffff;
  line-height: 1.4;
  margin-bottom: 8px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.mobile-other-project-category {
  font-size: 0.8rem;
  color: #808080;
}
</style>
