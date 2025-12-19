<template>
  <div class="post-glass-card">
    <div class="post-header">
      <span class="post-header-icon"><i class="fa-regular fa-newspaper"></i></span>
      <span class="post-header-title">Latest Post</span>
      <ArrowButton :to="postLink" title="View details" />
    </div>
    <div v-if="loading" class="date-skeleton shimmer"></div>
    <div v-else class="post-date">{{ formattedDate }}</div>
    <div v-if="loading" class="title-skeleton shimmer"></div>
    <div v-else class="post-title">{{ post?.title || '—' }}</div>
    <div class="post-tags">
      <template v-if="loading">
        <span class="post-tag skeleton-tag shimmer" v-for="n in 3" :key="n">&nbsp;</span>
      </template>
      <template v-else>
        <span class="post-tag" v-for="t in post?.tags || []" :key="t">#{{ t }}</span>
      </template>
    </div>
    <div v-if="loading" class="summary-skeleton shimmer"></div>
    <div v-else class="post-summary">{{ post?.excerpt || '' }}</div>
  </div>
</template>

<script setup>
import ArrowButton from '@/assets/ArrowButton.vue'
import { computed } from 'vue'

const props = defineProps({
  loading: { type: Boolean, default: false },
  post: { type: Object, default: null }
})

const formattedDate = computed(() => props.post?.createdAt ? new Date(props.post.createdAt).toLocaleDateString() : '')
const postLink = computed(() => props.post ? `/blog/${props.post.id}` : '/')
</script>

<style scoped>
.post-glass-card {
  position: relative;
  border-radius: 18px;
  box-shadow: 0 8px 32px 0 #0004;
  border: 1px solid rgba(255, 255, 255, 0.05);
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(12px);
  color: #fff;
  padding: 24px 28px 22px 28px;
  width: 100%;
  height: 350px;
  margin-bottom: 24px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow: hidden;
}

.post-glass-card::before {
  content: "";
  position: absolute;
  inset: 1px;
  border-radius: 16.5px;
  border: 1px solid rgba(255, 255, 255, 0.07); /* Inner border */
  pointer-events: none;
  z-index: 1;
}

.post-header {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1.05rem;
  font-weight: 500;
  margin-bottom: 2px;
  position: relative;
}
.post-header-icon {
  color: #fff;
  background: #23243a;
  border-radius: 50%;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  box-shadow: 0 2px 8px #0002;
}
.post-header-title {
  color: #fff;
  font-weight: 500;
  font-size: 1.08rem;
}
.post-date {
  color: #b2b8ff;
  font-size: 0.98rem;
  margin-bottom: 2px;
}
.post-title {
  font-weight: 700;
  font-size: 1.13rem;
  margin-bottom: 6px;
  color: #fff;
}
.post-tags {
  display: flex;
  gap: 6px;
  margin-bottom: 2px;
}
.post-tag {
  background: #23243a;
  color: #fff;
  border-radius: 8px;
  font-size: 0.92rem;
  padding: 2px 10px 2px 10px;
  font-weight: 500;
  letter-spacing: 0.01em;
  border: 1px solid #23243a;
  box-shadow: 0 1px 4px #0002;
}
.post-summary {
  color: #cfd8dc;
  font-size: 1rem;
  margin-top: 2px;
}

.date-skeleton { width: 140px; height: 14px; border-radius: 6px; background: rgba(255,255,255,0.06); }
.title-skeleton { width: 90%; height: 20px; border-radius: 8px; background: rgba(255,255,255,0.08); }
.summary-skeleton { width: 100%; height: 48px; border-radius: 8px; background: rgba(255,255,255,0.06); }
.skeleton-tag { width: 80px; color: transparent; }
.shimmer { background: linear-gradient(90deg, rgba(255,255,255,0.06) 25%, rgba(255,255,255,0.12) 50%, rgba(255,255,255,0.06) 75%); background-size: 200% 100%; animation: shimmer 1.5s infinite; }
@keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
</style> 