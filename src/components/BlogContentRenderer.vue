<template>
  <div class="blog-content-renderer">
    <div v-if="!content" class="empty">No content</div>
    <div v-else-if="contentFormat === 'html'" class="html-content" v-html="content"></div>
    <div v-else class="text-content">{{ content }}</div>
  </div>
</template>

<script setup>
defineProps({
  content: { type: [String, Object], default: '' },
  contentFormat: { type: String, default: 'html' } // 'html' | 'delta'
})
</script>

<style scoped>
.blog-content-renderer {
  width: 100%;
}

.empty { 
  color: #9e9e9e; 
  font-style: italic; 
}

.html-content {
  line-height: 1.6;
  color: #fff;
}

.html-content :deep(h2) {
  font-size: 1.8rem;
  font-weight: 700;
  margin: 2rem 0 1rem 0;
  color: #fff;
}

.html-content :deep(h3) {
  font-size: 1.4rem;
  font-weight: 600;
  margin: 1.5rem 0 0.75rem 0;
  color: #b2b8ff;
}

.html-content :deep(p) {
  margin: 1rem 0;
  font-size: 1.05rem;
  color: #cfd8dc;
}

.html-content :deep(ul),
.html-content :deep(ol) {
  margin: 1rem 0;
  padding-left: 2rem;
}

.html-content :deep(li) {
  margin: 0.5rem 0;
  color: #cfd8dc;
}

.html-content :deep(pre) {
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 1rem;
  overflow-x: auto;
  margin: 1rem 0;
}

.html-content :deep(code) {
  font-family: 'Courier New', monospace;
  color: #00eaff;
  font-size: 0.9rem;
}

.html-content :deep(img) { 
  max-width: 100%; 
  height: auto; 
  border-radius: 8px;
  margin: 1rem 0;
}

.text-content {
  white-space: pre-wrap;
  color: #cfd8dc;
}
</style>

