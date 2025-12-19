<template>
  <div class="main-bg">
    <div class="main-outer">
      <ProfileHeader />
      
      <!-- Desktop Layout -->
      <div class="desktop-layout">
        <div class="blog-detail-container">
          <div class="blog-detail-card">
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
                Back to Blog
              </v-btn>
            </div>

            <!-- Blog Header -->
            <div class="blog-header">
              <div class="blog-category">{{ blogPost.category }}</div>
              <h1 class="blog-title">{{ blogPost.title }}</h1>
              <div class="blog-meta">
                <span class="blog-date">{{ blogPost.date }}</span>
                <span class="blog-read-time">{{ blogPost.readTime }} min read</span>
                <span class="blog-author">By {{ blogPost.author }}</span>
              </div>
            </div>

            <!-- Featured Image -->
            <div class="featured-image">
              <img :src="blogPost.image" :alt="blogPost.title" />
            </div>

            <!-- Blog Content -->
            <div class="blog-content">
              <template v-if="blogPost.contentFormat">
                <BlogContentRenderer :content="blogPost.content" :contentFormat="blogPost.contentFormat" />
              </template>
              <template v-else>
                <div v-for="(section, index) in blogPost.content" :key="index" class="content-section">
                  <h2 v-if="section.heading" class="section-heading">{{ section.heading }}</h2>
                  <p v-if="section.paragraph" class="section-paragraph">{{ section.paragraph }}</p>
                  <div v-if="section.codeBlock" class="code-block">
                    <pre><code>{{ section.codeBlock }}</code></pre>
                  </div>
                  <ul v-if="section.list" class="section-list">
                    <li v-for="(item, itemIndex) in section.list" :key="itemIndex">{{ item }}</li>
                  </ul>
                </div>
              </template>
            </div>

            <!-- Blog Footer -->
            <div class="blog-footer">
              <div class="blog-tags">
                <span class="tag-label">Tags:</span>
                <span v-for="tag in blogPost.tags" :key="tag" class="blog-tag">{{ tag }}</span>
              </div>
              <div class="share-section">
                <span class="share-label">Share:</span>
                <div class="share-buttons">
                  <v-btn variant="text" color="#00eaff" class="share-btn">
                    <i class="fab fa-twitter"></i>
                  </v-btn>
                  <v-btn variant="text" color="#00eaff" class="share-btn">
                    <i class="fab fa-facebook"></i>
                  </v-btn>
                  <v-btn variant="text" color="#00eaff" class="share-btn">
                    <i class="fab fa-linkedin"></i>
                  </v-btn>
                </div>
              </div>
            </div>
          </div>

          <!-- Sidebar -->
          <div class="sidebar-card">
            <h3 class="sidebar-title">Related Posts</h3>
            <div class="related-posts">
              <div v-for="post in relatedPosts" :key="post.id" class="related-post" @click="navigateToPost(post.id)">
                <div class="related-post-image">
                  <img :src="post.image" :alt="post.title" />
                </div>
                <div class="related-post-content">
                  <h4 class="related-post-title">{{ post.title }}</h4>
                  <span class="related-post-date">{{ post.date }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Mobile Layout -->
      <div class="mobile-layout">
        <div class="mobile-blog-detail">
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
              Back to Blog
            </v-btn>
          </div>

          <!-- Blog Header -->
          <div class="mobile-blog-header">
            <div class="mobile-blog-category">{{ blogPost.category }}</div>
            <h1 class="mobile-blog-title">{{ blogPost.title }}</h1>
            <div class="mobile-blog-meta">
              <span class="mobile-blog-date">{{ blogPost.date }}</span>
              <span class="mobile-blog-read-time">{{ blogPost.readTime }} min read</span>
              <span class="mobile-blog-author">By {{ blogPost.author }}</span>
            </div>
          </div>

          <!-- Featured Image -->
          <div class="mobile-featured-image">
            <img :src="blogPost.image" :alt="blogPost.title" />
          </div>

          <!-- Blog Content -->
          <div class="mobile-blog-content">
            <template v-if="blogPost.contentFormat">
              <BlogContentRenderer :content="blogPost.content" :contentFormat="blogPost.contentFormat" />
            </template>
            <template v-else>
              <div v-for="(section, index) in blogPost.content" :key="index" class="mobile-content-section">
                <h2 v-if="section.heading" class="mobile-section-heading">{{ section.heading }}</h2>
                <p v-if="section.paragraph" class="mobile-section-paragraph">{{ section.paragraph }}</p>
                <div v-if="section.codeBlock" class="mobile-code-block">
                  <pre><code>{{ section.codeBlock }}</code></pre>
                </div>
                <ul v-if="section.list" class="mobile-section-list">
                  <li v-for="(item, itemIndex) in section.list" :key="itemIndex">{{ item }}</li>
                </ul>
              </div>
            </template>
          </div>

          <!-- Blog Footer -->
          <div class="mobile-blog-footer">
            <div class="mobile-blog-tags">
              <span class="mobile-tag-label">Tags:</span>
              <div class="mobile-tags-container">
                <span v-for="tag in blogPost.tags" :key="tag" class="mobile-blog-tag">{{ tag }}</span>
              </div>
            </div>
            <div class="mobile-share-section">
              <span class="mobile-share-label">Share:</span>
              <div class="mobile-share-buttons">
                <v-btn variant="text" color="#00eaff" class="mobile-share-btn">
                  <i class="fab fa-twitter"></i>
                </v-btn>
                <v-btn variant="text" color="#00eaff" class="mobile-share-btn">
                  <i class="fab fa-facebook"></i>
                </v-btn>
                <v-btn variant="text" color="#00eaff" class="mobile-share-btn">
                  <i class="fab fa-linkedin"></i>
                </v-btn>
              </div>
            </div>
          </div>

          <!-- Mobile Related Posts -->
          <div class="mobile-related-posts">
            <h3 class="mobile-related-posts-title">Related Posts</h3>
            <div class="mobile-related-posts-grid">
              <div v-for="post in relatedPosts" :key="post.id" class="mobile-related-post" @click="navigateToPost(post.id)">
                <div class="mobile-related-post-image">
                  <img :src="post.image" :alt="post.title" />
                </div>
                <div class="mobile-related-post-content">
                  <h4 class="mobile-related-post-title">{{ post.title }}</h4>
                  <span class="mobile-related-post-date">{{ post.date }}</span>
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
import BlogContentRenderer from '@/components/BlogContentRenderer.vue';

const router = useRouter();
const route = useRoute();

// Blog posts data (dummy data)
const blogPostsData = {
  1: {
    id: 1,
    title: "Building Modern Web Applications with Vue 3",
    excerpt: "Explore the latest features in Vue 3 and how they can improve your development workflow. From Composition API to better TypeScript support...",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop",
    category: "Development",
    date: "March 15, 2024",
    readTime: 8,
    author: "John Doe",
    tags: ["Vue.js", "JavaScript", "Web Development", "Frontend"],
    content: [
      {
        heading: "Introduction to Vue 3",
        paragraph: "Vue 3 represents a significant evolution in the Vue.js framework, introducing the Composition API alongside the existing Options API. This new approach provides better TypeScript support and more flexible code organization."
      },
      {
        paragraph: "The Composition API allows developers to organize code by logical concerns rather than component options, making it easier to extract and reuse logic across components. This is particularly beneficial for large applications where code organization becomes crucial."
      },
      {
        heading: "Key Features of Vue 3",
        list: [
          "Composition API for better logic organization",
          "Improved TypeScript support",
          "Better tree-shaking for smaller bundle sizes",
          "Fragments for cleaner component structure",
          "Teleport for flexible component rendering"
        ]
      },
      {
        heading: "Getting Started with Composition API",
        paragraph: "To use the Composition API, you'll need to import the necessary functions from Vue. The setup function serves as the entry point for composition API usage within a component."
      },
      {
        codeBlock: `<script setup>
import { ref, computed, onMounted } from 'vue'

const count = ref(0)
const doubleCount = computed(() => count.value * 2)

const increment = () => {
  count.value++
}

onMounted(() => {
  console.log('Component mounted!')
})
<\/script>`
      },
      {
        paragraph: "This approach provides a more functional programming style that many developers find more intuitive and easier to test. The reactive references (ref) and computed properties work seamlessly with the template, providing a smooth development experience."
      },
      {
        heading: "Performance Improvements",
        paragraph: "Vue 3 introduces several performance optimizations, including better tree-shaking, improved virtual DOM diffing, and more efficient reactivity system. These improvements result in faster rendering and smaller bundle sizes."
      },
      {
        heading: "Conclusion",
        paragraph: "Vue 3 represents a significant step forward for the framework, providing developers with powerful new tools while maintaining backward compatibility. The Composition API, in particular, opens up new possibilities for code organization and reuse."
      }
    ]
  },
  2: {
    id: 2,
    title: "The Future of Frontend Design Systems",
    excerpt: "Design systems are becoming increasingly important in modern web development. Learn how to create scalable and maintainable design systems...",
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&h=400&fit=crop",
    category: "Design",
    date: "March 10, 2024",
    readTime: 6,
    author: "Sarah Johnson",
    tags: ["Design Systems", "UI/UX", "Frontend", "Design"],
    content: [
      {
        heading: "The Rise of Design Systems",
        paragraph: "In today's fast-paced digital landscape, design systems have emerged as a crucial tool for maintaining consistency and efficiency across complex applications. They serve as a single source of truth for design decisions, enabling teams to work more collaboratively and deliver better user experiences."
      },
      {
        heading: "Core Components of a Design System",
        list: [
          "Design tokens for consistent spacing, colors, and typography",
          "Component library with reusable UI elements",
          "Documentation and usage guidelines",
          "Design principles and brand guidelines",
          "Accessibility standards and best practices"
        ]
      },
      {
        paragraph: "A well-designed system not only improves the development workflow but also ensures that users have a consistent experience across all touchpoints. This consistency builds trust and familiarity, ultimately leading to better user engagement and satisfaction."
      },
      {
        heading: "Implementation Strategies",
        paragraph: "When implementing a design system, it's essential to start with the foundational elements and gradually build up to more complex components. This incremental approach allows teams to validate decisions early and iterate based on real-world usage."
      },
      {
        codeBlock: `// Example of design tokens in CSS
:root {
  --color-primary: #00eaff;
  --color-secondary: #ffffff;
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
}`
      },
      {
        heading: "Conclusion",
        paragraph: "Design systems represent the future of scalable design and development. By investing in a robust design system, organizations can achieve greater efficiency, consistency, and quality in their digital products."
      }
    ]
  },
  3: {
    id: 3,
    title: "Optimizing Performance in React Applications",
    excerpt: "Performance is crucial for user experience. Discover techniques to optimize your React applications and improve loading times...",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop",
    category: "Development",
    date: "March 5, 2024",
    readTime: 10,
    author: "Mike Chen",
    tags: ["React", "Performance", "JavaScript", "Frontend"],
    content: [
      {
        heading: "Why Performance Matters",
        paragraph: "In today's competitive digital landscape, application performance directly impacts user satisfaction, conversion rates, and search engine rankings. Users expect fast, responsive applications, and even small delays can lead to significant user drop-off."
      },
      {
        heading: "Key Performance Metrics",
        list: [
          "First Contentful Paint (FCP)",
          "Largest Contentful Paint (LCP)",
          "Time to Interactive (TTI)",
          "Cumulative Layout Shift (CLS)",
          "First Input Delay (FID)"
        ]
      },
      {
        paragraph: "Understanding these metrics is crucial for identifying performance bottlenecks and measuring the effectiveness of optimization efforts. Each metric provides insights into different aspects of the user experience."
      },
      {
        heading: "React-Specific Optimizations",
        paragraph: "React provides several built-in optimization features that developers can leverage to improve application performance. These include React.memo, useMemo, useCallback, and the Suspense API for code splitting."
      },
      {
        codeBlock: `// Example of React.memo usage
const ExpensiveComponent = React.memo(({ data }) => {
  return (
    <div className="expensive-component">
      {data.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
});`
      },
      {
        heading: "Conclusion",
        paragraph: "Performance optimization is an ongoing process that requires continuous monitoring and improvement. By implementing these techniques and staying informed about best practices, developers can create React applications that provide exceptional user experiences."
      }
    ]
  },
  4: {
    id: 4,
    title: "CSS Grid vs Flexbox: When to Use What",
    excerpt: "Understanding the differences between CSS Grid and Flexbox is essential for modern layout design. Here's a comprehensive guide...",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop",
    category: "CSS",
    date: "February 28, 2024",
    readTime: 7,
    author: "Emily Rodriguez",
    tags: ["CSS", "Layout", "Grid", "Flexbox"],
    content: [
      {
        heading: "Understanding Layout Systems",
        paragraph: "CSS Grid and Flexbox are two powerful layout systems that have revolutionized how we approach web design. While they can both be used for layout, they serve different purposes and excel in different scenarios."
      },
      {
        heading: "When to Use Flexbox",
        list: [
          "One-dimensional layouts (row or column)",
          "Navigation menus and toolbars",
          "Form layouts and input groups",
          "Card layouts with flexible heights",
          "Centering content both horizontally and vertically"
        ]
      },
      {
        heading: "When to Use CSS Grid",
        list: [
          "Two-dimensional layouts (rows and columns)",
          "Page layouts and overall structure",
          "Complex form layouts",
          "Image galleries and portfolios",
          "Dashboard layouts with multiple sections"
        ]
      },
      {
        paragraph: "The key is to understand that these systems are not mutually exclusive. In fact, they work beautifully together, with Grid handling the overall page structure and Flexbox managing the alignment and distribution of items within grid areas."
      },
      {
        codeBlock: `/* Example of Grid and Flexbox working together */
.page-layout {
  display: grid;
  grid-template-columns: 1fr 300px;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
}

.header, .footer {
  grid-column: 1 / -1;
}

.sidebar {
  grid-row: 2;
  grid-column: 2;
}

.main-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}`
      },
      {
        heading: "Conclusion",
        paragraph: "Both CSS Grid and Flexbox are essential tools in the modern web developer's toolkit. Understanding when and how to use each will enable you to create more flexible, maintainable, and responsive layouts."
      }
    ]
  }
};

const blogPost = ref(blogPostsData[1]); // Default to first post

const relatedPosts = ref([]);

// Function to get related posts (excluding current post)
const getRelatedPosts = (currentPostId) => {
  const allPosts = Object.values(blogPostsData);
  return allPosts
    .filter(post => post.id !== currentPostId)
    .slice(0, 3)
    .map(post => ({
      id: post.id,
      title: post.title,
      image: post.image.replace('w=800&h=400', 'w=200&h=120'),
      date: post.date
    }));
};

// Methods
const goBack = () => {
  router.go(-1);
};

const navigateToPost = (postId) => {
  router.push(`/fauzan/blog/${postId}`);
};

onMounted(() => {
  // Load the blog post data based on the route parameter
  const postId = parseInt(route.params.postId);
  console.log('Loading blog post:', postId);
  
  if (blogPostsData[postId]) {
    blogPost.value = blogPostsData[postId];
    // Update related posts
    relatedPosts.value = getRelatedPosts(postId);
  } else {
    // Handle case when post is not found
    console.warn('Blog post not found:', postId);
    // You could redirect to 404 or show an error message
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
.blog-detail-container {
  display: flex;
  gap: 24px;
  align-items: flex-start;
}

.blog-detail-card {
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

.blog-detail-card::before {
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

/* Blog Header */
.blog-header {
  margin-bottom: 32px;
}

.blog-category {
  display: inline-block;
  background: rgba(0, 234, 255, 0.9);
  color: #000;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 16px;
}

.blog-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #ffffff;
  line-height: 1.2;
  margin-bottom: 20px;
  letter-spacing: -0.5px;
}

.blog-meta {
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

/* Blog Content */
.blog-content {
  margin-bottom: 40px;
}

.content-section {
  margin-bottom: 32px;
}

.section-heading {
  font-size: 1.8rem;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 20px;
  letter-spacing: -0.3px;
}

.section-paragraph {
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

.section-list {
  margin: 20px 0;
  padding-left: 24px;
}

.section-list li {
  font-size: 1.1rem;
  color: #e0e0e0;
  line-height: 1.8;
  margin-bottom: 12px;
}

/* Blog Footer */
.blog-footer {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
}

.blog-tags {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.tag-label {
  color: #b0b0b0;
  font-weight: 500;
}

.blog-tag {
  background: rgba(0, 234, 255, 0.1);
  color: #00eaff;
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 0.85rem;
  font-weight: 500;
  border: 1px solid rgba(0, 234, 255, 0.2);
}

.share-section {
  display: flex;
  align-items: center;
  gap: 12px;
}

.share-label {
  color: #b0b0b0;
  font-weight: 500;
}

.share-buttons {
  display: flex;
  gap: 8px;
}

.share-btn {
  min-width: 40px;
  height: 40px;
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

.related-posts {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.related-post {
  display: flex;
  flex-direction: column;
  padding: 16px;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  cursor: pointer;
  transition: all 0.3s ease;
}

.related-post:hover {
  background: rgba(255, 255, 255, 0.08);
  transform: translateY(-2px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}

.related-post-image {
  margin-bottom: 12px;
}

.related-post-image img {
  width: 100%;
  height: 120px;
  object-fit: cover;
  border-radius: 8px;
}

.related-post-content {
  display: flex;
  flex-direction: column;
}

.related-post-title {
  font-size: 1rem;
  font-weight: 600;
  color: #ffffff;
  line-height: 1.4;
  margin-bottom: 8px;
}



.related-post-date {
  font-size: 0.8rem;
  color: #808080;
}

/* ===== MOBILE LAYOUT ===== */
.mobile-blog-detail {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 18px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  padding: 24px;
  margin-bottom: 32px;
}

/* Mobile Related Posts */
.mobile-related-posts {
  margin-top: 32px;
}

.mobile-related-posts-title {
  font-size: 1.4rem;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 20px;
  letter-spacing: -0.2px;
}

.mobile-related-posts-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}

.mobile-related-post {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
}

.mobile-related-post:hover {
  background: rgba(255, 255, 255, 0.08);
  transform: translateY(-2px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}

.mobile-related-post-image {
  width: 100%;
  height: 160px;
}

.mobile-related-post-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.mobile-related-post-content {
  padding: 16px;
}

.mobile-related-post-title {
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

.mobile-related-post-date {
  font-size: 0.8rem;
  color: #808080;
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

.mobile-blog-header {
  margin-bottom: 24px;
}

.mobile-blog-category {
  display: inline-block;
  background: rgba(0, 234, 255, 0.9);
  color: #000;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 600;
  margin-bottom: 16px;
}

.mobile-blog-title {
  font-size: 1.8rem;
  font-weight: 700;
  color: #ffffff;
  line-height: 1.3;
  margin-bottom: 16px;
  letter-spacing: -0.3px;
}

.mobile-blog-meta {
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

.mobile-blog-content {
  margin-bottom: 32px;
}

.mobile-content-section {
  margin-bottom: 24px;
}

.mobile-section-heading {
  font-size: 1.4rem;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 16px;
  letter-spacing: -0.2px;
}

.mobile-section-paragraph {
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

.mobile-section-list {
  margin: 16px 0;
  padding-left: 20px;
}

.mobile-section-list li {
  font-size: 1rem;
  color: #e0e0e0;
  line-height: 1.7;
  margin-bottom: 10px;
}

.mobile-blog-footer {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.mobile-blog-tags {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.mobile-tag-label {
  color: #b0b0b0;
  font-weight: 500;
}

.mobile-tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.mobile-blog-tag {
  background: rgba(0, 234, 255, 0.1);
  color: #00eaff;
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 0.8rem;
  font-weight: 500;
  border: 1px solid rgba(0, 234, 255, 0.2);
}

.mobile-share-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.mobile-share-label {
  color: #b0b0b0;
  font-weight: 500;
}

.mobile-share-buttons {
  display: flex;
  gap: 8px;
}

.mobile-share-btn {
  min-width: 36px;
  height: 36px;
}
</style>
