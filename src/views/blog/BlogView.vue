<template>
  <div class="main-bg">
    <div class="main-outer">
      <ProfileHeader />
      
      <!-- Desktop Layout -->
      <div class="desktop-layout">
        <div class="blog-container">
          <div class="blog-card">
            <h2 class="section-title">Latest Posts</h2>
            <div class="blog-posts">
              <div v-for="post in blogPosts" :key="post.id" class="blog-post">
                <div class="post-image">
                  <img :src="post.image" :alt="post.title" />
                  <div class="post-category">{{ post.category }}</div>
                </div>
                <div class="post-content">
                  <h3 class="post-title">{{ post.title }}</h3>
                  <p class="post-excerpt">{{ post.excerpt }}</p>
                  <div class="post-meta">
                    <span class="post-date">{{ post.date }}</span>
                    <span class="post-read-time">{{ post.readTime }} min read</span>
                  </div>
                  <v-btn 
                    variant="text" 
                    color="#00eaff" 
                    class="read-more-btn"
                    @click="readPost(post.id)"
                  >
                    Read More
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" class="arrow-icon ml-1">
                      <path d="M566.6 342.6C579.1 330.1 579.1 309.8 566.6 297.3L406.6 137.3C394.1 124.8 373.8 124.8 361.3 137.3C348.8 149.8 348.8 170.1 361.3 182.6L466.7 288L96 288C78.3 288 64 302.3 64 320C64 337.7 78.3 352 96 352L466.7 352L361.3 457.4C348.8 469.9 348.8 490.2 361.3 502.7C373.8 515.2 394.1 515.2 406.6 502.7L566.6 342.7z"/>
                    </svg>
                  </v-btn>
                </div>
              </div>
            </div>
          </div>
          <div class="sidebar-card">
            <h3 class="sidebar-title">Categories</h3>
            <div class="categories-list">
              <div 
                v-for="category in categories" 
                :key="category.name"
                class="category-item"
                :class="{ active: selectedCategory === category.name }"
                @click="selectCategory(category.name)"
              >
                <span class="category-name">{{ category.name }}</span>
                <span class="category-count">{{ category.count }}</span>
              </div>
            </div>
            
            <h3 class="sidebar-title">Popular Tags</h3>
            <div class="tags-cloud">
              <span 
                v-for="tag in popularTags" 
                :key="tag.name"
                class="tag-item"
              >
                {{ tag.name }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Mobile Layout -->
      <div class="mobile-layout">
        <div class="mobile-filters">
          <div class="filter-section">
            <h3 class="filter-title">Categories</h3>
            <div class="mobile-categories">
              <div 
                v-for="category in categories" 
                :key="category.name"
                class="mobile-category-item"
                :class="{ active: selectedCategory === category.name }"
                @click="selectCategory(category.name)"
              >
                <span class="mobile-category-name">{{ category.name }}</span>
                <span class="mobile-category-count">{{ category.count }}</span>
              </div>
            </div>
          </div>
          
          <div class="filter-section">
            <h3 class="filter-title">Popular Tags</h3>
            <div class="mobile-tags">
              <span 
                v-for="tag in popularTags" 
                :key="tag.name"
                class="mobile-tag-item"
              >
                {{ tag.name }}
              </span>
            </div>
          </div>
        </div>

        <div class="mobile-blog-posts">
          <h2 class="mobile-section-title">Latest Posts</h2>
          <div class="mobile-posts">
            <div v-for="post in blogPosts" :key="post.id" class="mobile-blog-post">
              <div class="mobile-post-image">
                <img :src="post.image" :alt="post.title" />
                <div class="mobile-post-category">{{ post.category }}</div>
              </div>
              <div class="mobile-post-content">
                <h3 class="mobile-post-title">{{ post.title }}</h3>
                <p class="mobile-post-excerpt">{{ post.excerpt }}</p>
                <div class="mobile-post-meta">
                  <span class="mobile-post-date">{{ post.date }}</span>
                  <span class="mobile-post-read-time">{{ post.readTime }} min read</span>
                </div>
                <v-btn 
                  variant="text" 
                  color="#00eaff" 
                  class="mobile-read-more-btn"
                  @click="readPost(post.id)"
                >
                  Read More
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" class="arrow-icon ml-1">
                    <path d="M566.6 342.6C579.1 330.1 579.1 309.8 566.6 297.3L406.6 137.3C394.1 124.8 373.8 124.8 361.3 137.3C348.8 149.8 348.8 170.1 361.3 182.6L466.7 288L96 288C78.3 288 64 302.3 64 320C64 337.7 78.3 352 96 352L466.7 352L361.3 457.4C348.8 469.9 348.8 490.2 361.3 502.7C373.8 515.2 394.1 515.2 406.6 502.7L566.6 342.7z"/>
                  </svg>
                </v-btn>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import dataService from '@/services/dataService';
import ProfileHeader from '@/components/ProfileHeaderCard.vue';

const router = useRouter();

// Reactive state
const selectedCategory = ref('All');
const blogPosts = ref([]);

// Compute categories from blog posts
const categories = computed(() => {
  if (blogPosts.value.length === 0) return [{ name: 'All', count: 0 }]
  
  const categoryMap = {}
  blogPosts.value.forEach(post => {
    if (!categoryMap[post.category]) {
      categoryMap[post.category] = 0
    }
    categoryMap[post.category]++
  })
  
  const result = [{ name: 'All', count: blogPosts.value.length }]
  Object.entries(categoryMap).forEach(([name, count]) => {
    result.push({ name, count })
  })
  return result
});

// Compute popular tags from blog posts
const popularTags = computed(() => {
  if (blogPosts.value.length === 0) return []
  
  const tagSet = new Set()
  blogPosts.value.forEach(post => {
    post.tags?.forEach(tag => tagSet.add(tag))
  })
  
  return Array.from(tagSet).map(tag => ({ name: tag }))
});

// Methods
const selectCategory = (category) => {
  selectedCategory.value = category;
};

const readPost = (postId) => {
  router.push(`/blog/${postId}`);
};

// Load data on mount
onMounted(async () => {
  try {
    const posts = await dataService.getBlogPosts()
    blogPosts.value = posts
  } catch (error) {
    console.error('Failed to load blog posts:', error)
  }
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
.blog-container {
  display: flex;
  gap: 24px;
  align-items: flex-start;
}

.blog-card {
  flex: 1;
  position: relative;
  border-radius: 18px;
  box-shadow: 0 8px 32px 0 #0004;
  border: 1px solid rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(12px);
  color: #fff;
  padding: 24px 28px;
  overflow: hidden;
}

.blog-card::before {
  content: "";
  position: absolute;
  inset: 1px;
  border-radius: 16.5px;
  border: 1px solid rgba(255, 255, 255, 0.07);
  pointer-events: none;
  z-index: 1;
}

.section-title {
  font-size: 2rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 32px;
  letter-spacing: -0.5px;
}

.blog-posts {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.blog-post {
  display: flex;
  gap: 24px;
  padding: 24px;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition: all 0.3s ease;
}

.blog-post:hover {
  background: rgba(255, 255, 255, 0.05);
  transform: translateY(-2px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}

.post-image {
  position: relative;
  flex-shrink: 0;
}

.post-image img {
  width: 120px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
}

.post-category {
  position: absolute;
  top: 8px;
  left: 8px;
  background: rgba(0, 234, 255, 0.9);
  color: #000;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
}

.post-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.post-title {
  font-size: 1.3rem;
  font-weight: 600;
  color: #ffffff;
  line-height: 1.4;
}

.post-excerpt {
  font-size: 0.95rem;
  color: #b0b0b0;
  line-height: 1.6;
}

.post-meta {
  display: flex;
  gap: 16px;
  font-size: 0.85rem;
  color: #808080;
}

.read-more-btn {
  align-self: flex-start;
  font-weight: 500;
  text-transform: none;
  padding: 8px 16px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.arrow-icon {
  width: 16px;
  height: 16px;
  fill: currentColor;
  transition: transform 0.2s ease;
}

.read-more-btn:hover .arrow-icon {
  transform: translateX(4px);
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
  margin-bottom: 20px;
}

.categories-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 32px;
}

.category-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid transparent;
}

.category-item:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(0, 234, 255, 0.3);
}

.category-item.active {
  background: rgba(0, 234, 255, 0.1);
  border-color: rgba(0, 234, 255, 0.5);
}

.category-name {
  color: #ffffff;
  font-weight: 500;
}

.category-count {
  color: #808080;
  font-size: 0.9rem;
}

.tags-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag-item {
  background: rgba(0, 234, 255, 0.1);
  color: #00eaff;
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 0.85rem;
  font-weight: 500;
  border: 1px solid rgba(0, 234, 255, 0.2);
  transition: all 0.2s ease;
  cursor: pointer;
}

.tag-item:hover {
  background: rgba(0, 234, 255, 0.2);
  transform: translateY(-1px);
}

/* ===== MOBILE LAYOUT ===== */
.mobile-filters {
  margin-bottom: 32px;
}

.filter-section {
  margin-bottom: 24px;
}

.filter-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 16px;
}

.mobile-categories {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.mobile-category-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 0.9rem;
}

.mobile-category-item:hover {
  background: rgba(255, 255, 255, 0.08);
  transform: translateY(-1px);
}

.mobile-category-item.active {
  background: rgba(0, 234, 255, 0.15);
  border-color: rgba(0, 234, 255, 0.4);
  color: #00eaff;
}

.mobile-category-name {
  color: #ffffff;
  font-weight: 500;
}

.mobile-category-count {
  background: rgba(255, 255, 255, 0.1);
  color: #b0b0b0;
  padding: 2px 6px;
  border-radius: 10px;
  font-size: 0.75rem;
  font-weight: 500;
}

.mobile-category-item.active .mobile-category-count {
  background: rgba(0, 234, 255, 0.2);
  color: #00eaff;
}

.mobile-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.mobile-tag-item {
  background: rgba(0, 234, 255, 0.1);
  color: #00eaff;
  padding: 8px 12px;
  border-radius: 16px;
  font-size: 0.85rem;
  font-weight: 500;
  border: 1px solid rgba(0, 234, 255, 0.2);
  transition: all 0.2s ease;
  cursor: pointer;
}

.mobile-tag-item:hover {
  background: rgba(0, 234, 255, 0.2);
  transform: translateY(-1px);
}

.mobile-blog-posts {
  margin-top: 32px;
}

.mobile-section-title {
  font-size: 1.8rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 24px;
  letter-spacing: -0.5px;
}

.mobile-posts {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.mobile-blog-post {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  overflow: hidden;
  transition: all 0.3s ease;
}

.mobile-blog-post:hover {
  background: rgba(255, 255, 255, 0.08);
  transform: translateY(-2px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}

.mobile-post-image {
  position: relative;
  width: 100%;
  height: 200px;
}

.mobile-post-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.mobile-post-category {
  position: absolute;
  top: 12px;
  left: 12px;
  background: rgba(0, 234, 255, 0.9);
  color: #000;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 600;
}

.mobile-post-content {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.mobile-post-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: #ffffff;
  line-height: 1.4;
}

.mobile-post-excerpt {
  font-size: 0.9rem;
  color: #b0b0b0;
  line-height: 1.6;
}

.mobile-post-meta {
  display: flex;
  gap: 16px;
  font-size: 0.8rem;
  color: #808080;
}

.mobile-read-more-btn {
  align-self: flex-start;
  font-weight: 500;
  text-transform: none;
  padding: 8px 16px;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 8px;
}

.mobile-read-more-btn .arrow-icon {
  width: 14px;
  height: 14px;
  fill: currentColor;
  transition: transform 0.2s ease;
}

.mobile-read-more-btn:hover .arrow-icon {
  transform: translateX(4px);
}
</style> 