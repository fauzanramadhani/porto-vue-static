<template>

    <div class="main-outer">
      
      <!-- Desktop Layout -->
      <div class="desktop-layout">
        <div class="blog-container">
          <div class="blog-card">
            <h2 class="section-title">Latest Posts</h2>
            <div class="blog-posts">
              <div v-if="isLoading" class="skeleton-container">
                <div v-for="n in 3" :key="n" class="blog-post skeleton-post">
                  <div class="post-image skeleton-image">
                    <SkeletonLoader width="120px" height="80px" borderRadius="8px" />
                  </div>
                  <div class="post-content">
                    <SkeletonLoader width="60%" height="24px" />
                    <SkeletonLoader width="100%" height="16px"/>
                    <SkeletonLoader width="90%" height="16px"/>
                    <div class="d-flex">
                       <SkeletonLoader width="80px" height="14px" />
                    </div>
                  </div>
                </div>
              </div>
              
              <div v-else>
                <div v-if="filteredPosts.length === 0" class="no-posts">
                  No posts found matching your criteria.
                </div>
                <div v-else>
                  <div v-for="post in filteredPosts" :key="post.id" class="blog-post" @click="readPost(post.id)">
                    <div class="post-image">
                      <img :src="normalizeImagePath(post.image)" :alt="post.title" />
                      <div class="post-category">{{ post.category }}</div>
                    </div>
                    <div class="post-content">
                      <h3 class="post-title">{{ post.title }}</h3>
                      <p class="post-excerpt">{{ post.excerpt }}</p>
                      <div class="post-meta">
                        <span class="post-date">{{ post.date }}</span>
                        <span class="post-read-time">{{ post.readTime }} min read</span>
                      </div>
                    </div>
                  </div>
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
                :class="{ active: selectedTag === tag.name }"
                @click="selectTag(tag.name)"
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
                :class="{ active: selectedTag === tag.name }"
                @click="selectTag(tag.name)"
              >
                {{ tag.name }}
              </span>
            </div>
          </div>
        </div>

        <div class="mobile-blog-posts">
          <h2 class="mobile-section-title">Latest Posts</h2>
          <div class="mobile-posts">
            <div v-if="isLoading" class="skeleton-container">
              <div v-for="n in 3" :key="n" class="mobile-blog-post skeleton-post">
                <div class="mobile-post-image">
                  <SkeletonLoader width="100%" height="100%" borderRadius="0" />
                </div>
                <div class="mobile-post-content">
                   <SkeletonLoader width="80%" height="24px" />
                   <SkeletonLoader width="100%" height="16px"/>
                   <SkeletonLoader width="90%" height="16px"/>
                   <div class="meta-loading">
                      <SkeletonLoader width="80px" height="14px" />
                      <SkeletonLoader width="60px" height="14px" />
                   </div>
                </div>
              </div>
            </div>

            <div v-else>
              <div v-if="filteredPosts.length === 0" class="no-posts mobile-no-posts">
                No posts found matching your criteria.
              </div>
              <div v-else>
                <div v-for="post in filteredPosts" :key="post.id" class="mobile-blog-post" @click="readPost(post.id)">
                  <div class="mobile-post-image">
                    <img :src="normalizeImagePath(post.image)" :alt="post.title" />
                    <div class="mobile-post-category">{{ post.category }}</div>
                  </div>
                  <div class="mobile-post-content">
                    <h3 class="mobile-post-title">{{ post.title }}</h3>
                    <p class="mobile-post-excerpt">{{ post.excerpt }}</p>
                    <div class="mobile-post-meta">
                      <span class="mobile-post-date">{{ post.date }}</span>
                      <span class="mobile-post-read-time">{{ post.readTime }} min read</span>
                    </div>
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
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import dataService from '@/services/dataService';
import SkeletonLoader from '@/components/SkeletonLoader.vue';

const router = useRouter();

// Helper to normalize image paths
const normalizeImagePath = (path) => {
  if (!path) return '';
  if (path.startsWith('http') || path.startsWith('/')) return path;
  if (path.startsWith('src/')) return `/${path}`;
  return path;
};

// Reactive state
const selectedCategory = ref('All');
const selectedTag = ref(null);
const blogPosts = ref([]);
const isLoading = ref(true);

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

// Compute filtered posts
const filteredPosts = computed(() => {
  return blogPosts.value.filter(post => {
    const categoryMatch = selectedCategory.value === 'All' || post.category === selectedCategory.value;
    const tagMatch = !selectedTag.value || (post.tags && post.tags.includes(selectedTag.value));
    return categoryMatch && tagMatch;
  });
});

// Methods
const selectCategory = (category) => {
  selectedCategory.value = category;
  selectedTag.value = null; // Reset tag selection when category is selected
};

const selectTag = (tag) => {
  if (selectedTag.value === tag) {
    selectedTag.value = null; // Toggle off if already selected
  } else {
    selectedTag.value = tag;
    selectedCategory.value = 'All'; // Reset category selection when tag is selected
  }
};

const readPost = (postId) => {
  router.push(`/blog/${postId}`);
};

// Load data on mount
onMounted(async () => {
  try {
    isLoading.value = true
    
    const [posts] = await Promise.all([
      dataService.getBlogPosts()
    ])
    
    blogPosts.value = posts
  } catch (error) {
    console.error('Failed to load blog page data:', error)
  } finally {
    isLoading.value = false
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

.main-outer {
  width: 100%;
}

@media (min-width: 1420px) {
  .main-outer {
    max-width: 1200px;
    padding: 0 0 48px 0;
  }
}

/* ===== RESPONSIVE LAYOUT ===== */
.desktop-layout {
  display: block;
}

.mobile-layout {
  display: none;
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
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(12px);
  color: #fff;
  padding: 24px 24px 0px 24px;
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
  margin-bottom: 24px;
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
  margin-bottom: 24px;
  box-shadow: 0 8px 32px 0 #0004;
  border: 1px solid rgba(255, 255, 255, 0.05);
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(12px);
  color: #fff;
  border-radius: 18px;
  transition: all 0.3s ease;
  cursor: pointer;
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

.no-posts {
  color: #b0b0b0;
  padding: 20px 0;
  font-style: italic;
  text-align: center;
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
  box-shadow: 0 8px 32px 0 #0004;
  border: 1px solid rgba(255, 255, 255, 0.05);
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(12px);
  color: #fff;
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

.tag-item.active {
  background: rgba(0, 234, 255, 0.3);
  border-color: rgba(0, 234, 255, 0.8);
  box-shadow: 0 0 10px rgba(0, 234, 255, 0.2);
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
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.9rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
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

.mobile-tag-item.active {
  background: rgba(0, 234, 255, 0.3);
  border-color: rgba(0, 234, 255, 0.8);
  box-shadow: 0 0 10px rgba(0, 234, 255, 0.2);
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
}

.mobile-blog-post {
  box-shadow: 0 8px 32px 0 #0004;
  border: 1px solid rgba(255, 255, 255, 0.05);
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(12px);
  color: #fff;
  border-radius: 18px;
  overflow: hidden;
  transition: all 0.3s ease;
  margin-bottom: 20px;
  cursor: pointer;
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

.meta-loading {
  display: flex;
  gap: 16px;
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

.mobile-no-posts {
  text-align: left;
  padding-left: 8px;
}
</style>