// Data service for loading local JSON data
import profileData from '@/data/profile.json'
import experiencesData from '@/data/experiences.json'
import certificationsData from '@/data/certifications.json'
import projectsData from '@/data/projects.json'
import blogPostsData from '@/data/blog-posts.json'
import aboutData from '@/data/about.json'
import preferencesData from '@/data/preferences.json'

export const dataService = {
  // Get profile data
  async getProfile() {
    return profileData
  },

  // Get experiences
  async getExperiences() {
    return experiencesData
  },

  // Get certifications
  async getCertifications() {
    return certificationsData
  },

  // Get projects
  async getProjects() {
    return JSON.parse(JSON.stringify(projectsData))
  },

  // Get project by ID
  async getProjectById(id) {
    const project = projectsData.find(p => p.id === parseInt(id))
    return project ? JSON.parse(JSON.stringify(project)) : null
  },

  // Get blog posts
  async getBlogPosts() {
    return blogPostsData
  },

  // Get blog post by ID
  async getBlogPostById(id) {
    const post = blogPostsData.find(p => p.id === parseInt(id))
    return post || null
  },

  // Get latest blog post
  async getLatestBlogPost() {
    if (blogPostsData.length === 0) return null
    // Sort by createdAt and return the most recent
    const sorted = [...blogPostsData].sort((a, b) => 
      new Date(b.createdAt) - new Date(a.createdAt)
    )
    return sorted[0]
  },

  // Get about data
  async getAbout() {
    return aboutData
  },

  // Get preferences (music, contact)
  async getPreferences() {
    return preferencesData
  },

  // Get home data (combined data for home view)
  async getHomeData() {
    const [profile, lastPost, experiences, projects, certifications, preferences] = await Promise.all([
      this.getProfile(),
      this.getLatestBlogPost(),
      this.getExperiences(),
      this.getProjects(),
      this.getCertifications(),
      this.getPreferences()
    ])

    return {
      profile,
      lastPost,
      experiences: experiences.slice(0, 5), // Get top 5 experiences for home
      projects: projects.slice(0, 3), // Get top 3 projects for home
      certifications: certifications.slice(0, 5), // Get top 5 certifications for home
      preferences
    }
  },

  // Get about page data (combined)
  async getAboutData() {
    const [profile, aboutInfo, experiences] = await Promise.all([
      this.getProfile(),
      this.getAbout(),
      this.getExperiences()
    ])

    return {
      profile,
      aboutText: aboutInfo.aboutText,
      skills: aboutInfo.skills,
      experiences
    }
  }
}

export default dataService
