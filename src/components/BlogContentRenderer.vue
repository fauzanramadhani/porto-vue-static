<template>
  <div class="blog-content-renderer">
    <div v-if="!content" class="empty">No content</div>
    <div v-else>
      <div v-if="contentFormat === 'html'" class="html" v-html="content"></div>
      <QuillEditor
        v-else
        :content="content"
        contentType="delta"
        theme="bubble"
        read-only
        class="delta"
      />
    </div>
  </div>
</template>

<script setup>
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.bubble.css'

defineProps({
  content: { type: [String, Object], default: '' },
  contentFormat: { type: String, default: 'html' } // 'html' | 'delta'
})
</script>

<style scoped>
.empty { color: #9e9e9e; font-style: italic; }
.html :deep(img) { max-width: 100%; height: auto; }
.html :deep(pre) { overflow: auto; }
.delta { background: transparent; }
</style>

