<template>
  <div class="music-glass-card" v-if="enabled">
    <div class="music-content">
      <div class="music-disc">
        <div class="disc-outer">
          <div class="disc-grooves">
            <div class="groove" v-for="n in 12" :key="n" :style="{ width: (85 - n * 4) + '%', height: (85 - n * 4) + '%' }"></div>
          </div>
          <div class="disc-label">
            <img :src="image || fallbackImage" alt="Album Art" class="label-image" />
            <div class="label-overlay"></div>
            <div class="disc-center"></div>
          </div>
          <div class="disc-reflection"></div>
        </div>
      </div>
      <div class="music-info">
        <div class="music-title">{{ title || '—' }}</div>
        <div class="music-artist">{{ artist || '' }}</div>
      </div>
      <div class="play-button">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M8 5V19L19 12L8 5Z" fill="currentColor"/>
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  enabled: { type: Boolean, default: false },
  title: { type: String, default: '' },
  artist: { type: String, default: '' },
  image: { type: String, default: '' },
  previewUrl: { type: String, default: '' },
  spotifyUrl: { type: String, default: '' },
})
const fallbackImage = 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop&crop=center'
</script>

<style scoped>
.music-glass-card {
  position: relative;
  border-radius: 18px;
  box-shadow: 0 8px 32px 0 #0004;
  border: 1px solid rgba(255, 255, 255, 0.05);
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(12px);
  color: #fff;
  padding: 18px 18px 16px 18px;
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  height: 110px;
  max-height: 110px;
  margin: 0 auto;
  overflow: hidden;
}

.music-glass-card::before {
  content: "";
  position: absolute;
  inset: 1px;
  border-radius: 16.5px;
  border: 1px solid rgba(255, 255, 255, 0.07);
  pointer-events: none;
  z-index: 1;
}

.music-content {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 16px;
}

.music-disc {
  flex-shrink: 0;
  width: 64px;
  height: 64px;
  position: relative;
}

.disc-outer {
  width: 100%;
  height: 100%;
  background: 
    radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 70% 70%, rgba(0, 0, 0, 0.2) 0%, transparent 50%),
    linear-gradient(135deg, #1a1a1a 0%, #0d0d0d 50%, #1a1a1a 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: spin 4s linear infinite;
  box-shadow: 
    0 0 0 1px rgba(255, 255, 255, 0.05),
    0 2px 8px rgba(0, 0, 0, 0.4),
    inset 0 1px 2px rgba(255, 255, 255, 0.05),
    inset 0 -1px 2px rgba(0, 0, 0, 0.3);
  position: relative;
  border: 1px solid rgba(255, 255, 255, 0.03);
}

.disc-grooves {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
}

.groove {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 0.5px solid rgba(255, 255, 255, 0.02);
  border-radius: 50%;
  box-shadow: 
    inset 0 0 1px rgba(0, 0, 0, 0.1),
    0 0 1px rgba(255, 255, 255, 0.02);
}

.disc-label {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 3;
  overflow: hidden;
  box-shadow: 
    0 0 0 1px rgba(255, 255, 255, 0.08),
    0 2px 6px rgba(0, 0, 0, 0.3),
    inset 0 1px 2px rgba(255, 255, 255, 0.1);
}

.label-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
  opacity: 0.9;
}

.label-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: 
    radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.15) 0%, transparent 40%),
    radial-gradient(circle at 75% 75%, rgba(0, 0, 0, 0.2) 0%, transparent 40%);
  border-radius: 50%;
  pointer-events: none;
  z-index: 1;
}

.disc-center {
  width: 10px;
  height: 10px;
  background: 
    radial-gradient(circle at 30% 30%, #666 0%, #222 100%);
  border-radius: 50%;
  position: absolute;
  z-index: 2;
  box-shadow: 
    0 0 0 1px rgba(255, 255, 255, 0.1),
    0 1px 3px rgba(0, 0, 0, 0.5),
    inset 0 1px 1px rgba(255, 255, 255, 0.2),
    inset 0 -1px 1px rgba(0, 0, 0, 0.3);
  border: 0.5px solid rgba(255, 255, 255, 0.05);
}

.disc-reflection {
  position: absolute;
  top: 2px;
  left: 2px;
  right: 2px;
  bottom: 2px;
  border-radius: 50%;
  background: 
    linear-gradient(135deg, 
      rgba(255, 255, 255, 0.08) 0%, 
      transparent 30%, 
      transparent 70%, 
      rgba(255, 255, 255, 0.03) 100%);
  pointer-events: none;
  z-index: 4;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.music-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;
}

.music-title {
  font-size: 1.05rem;
  font-weight: 700;
  color: #fff;
}

.music-artist {
  font-size: 0.97rem;
  color: #b2b8ff;
  font-weight: 500;
}

.play-button {
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 10%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 
    0 4px 12px rgba(102, 126, 234, 0.3),
    inset 0 1px 2px rgba(255, 255, 255, 0.2);
  position: relative;
}

.play-button:hover {
  transform: scale(1.05);
  box-shadow: 
    0 6px 20px rgba(102, 126, 234, 0.4),
    inset 0 1px 2px rgba(255, 255, 255, 0.3);
}

.play-button:active {
  transform: scale(0.95);
}

.play-button svg {
  margin-left: 2px;
}
</style>