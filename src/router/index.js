import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AboutView from '@/views/about/AboutView.vue'
import BlogView from '@/views/blog/BlogView.vue'
import BlogDetailView from '@/views/blog/BlogDetailView.vue'
import ProjectsView from '@/views/project/ProjectsView.vue'
import ProjectDetailView from '@/views/project/ProjectDetailView.vue'
import CertificationsView from '@/views/certification/CertificationsView.vue'

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView
  },
  {
    path: '/blog',
    name: 'Blog',
    component: BlogView
  },
  {
    path: '/blog/:postId',
    name: 'BlogDetail',
    component: BlogDetailView
  },
  {
    path: '/projects',
    name: 'Projects',
    component: ProjectsView
  },
  {
    path: '/projects/:projectId',
    name: 'ProjectDetail',
    component: ProjectDetailView
  },
  {
    path: '/certifications',
    name: 'Certifications',
    component: CertificationsView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
