// Data service for loading local JSON data
import profileData from '@/data/profile.json'
import experiencesData from '@/data/experiences.json'
import certificationsData from '@/data/certifications.json'
import projectsData from '@/data/projects.json'
import blogPostsData from '@/data/blog-posts.json'
import aboutData from '@/data/about.json'
import preferencesData from '@/data/preferences.json'

// Simulate async API calls with a small delay for realistic behavior
const simulateDelay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms))

export const dataService = {
  // Get profile data
  async getProfile() {
    await simulateDelay()
    return profileData
  },

  // Get experiences
  async getExperiences() {
    await simulateDelay()
    return experiencesData
  },

  // Get certifications
  async getCertifications() {
    await simulateDelay()
    return certificationsData
  },

  // Get projects
  async getProjects() {
    await simulateDelay()
    return projectsData
  },

  // Get project by ID
  async getProjectById(id) {
    await simulateDelay()
    const project = projectsData.find(p => p.id === parseInt(id))
    return project || null
  },

  // Get blog posts
  async getBlogPosts() {
    await simulateDelay()
    return blogPostsData
  },

  // Get blog post by ID
  async getBlogPostById(id) {
    await simulateDelay()
    const post = blogPostsData.find(p => p.id === parseInt(id))
    return post || null
  },

  // Get latest blog post
  async getLatestBlogPost() {
    await simulateDelay()
    if (blogPostsData.length === 0) return null
    // Sort by createdAt and return the most recent
    const sorted = [...blogPostsData].sort((a, b) => 
      new Date(b.createdAt) - new Date(a.createdAt)
    )
    return sorted[0]
  },

  // Get about data
  async getAbout() {
    await simulateDelay()
    return aboutData
  },

  // Get preferences (music, contact)
  async getPreferences() {
    await simulateDelay()
    return preferencesData
  },

  // Get home data (combined data for home view)
  async getHomeData() {
    await simulateDelay()
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
    await simulateDelay()
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
