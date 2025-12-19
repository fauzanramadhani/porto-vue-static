<template>
  <div class="certification-glass-card">
    <div class="certification-header">
      <span class="certification-header-icon"><i class="fa-regular fa-file-pdf"></i></span>
      <span class="certification-header-title">Certifications</span>
      <ArrowButton to="/certifications" title="View more certifications" />
    </div>
    <div class="certification-list">
      <template v-if="loading">
        <div v-for="n in 5" :key="n" class="certification-item">
          <div class="certification-icon shimmer"></div>
          <div class="certification-info">
            <div class="sk-line shimmer" style="width:60%"></div>
            <div class="sk-line shimmer" style="width:40%"></div>
          </div>
          <div class="sk-line shimmer" style="width:80px"></div>
        </div>
      </template>
      <template v-else>
        <div v-for="c in certifications" :key="c.id" class="certification-item">
          <div class="certification-icon">
            <img v-if="c.logo" :src="c.logo" alt="logo" class="cert-logo" />
            <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" class="cert-svg"><!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path fill="#00eaff" d="M240 112L128 112C119.2 112 112 119.2 112 128L112 512C112 520.8 119.2 528 128 528L208 528L208 576L128 576C92.7 576 64 547.3 64 512L64 128C64 92.7 92.7 64 128 64L261.5 64C278.5 64 294.8 70.7 306.8 82.7L429.3 205.3C441.3 217.3 448 233.6 448 250.6L448 400.1L400 400.1L400 272.1L312 272.1C272.2 272.1 240 239.9 240 200.1L240 112.1zM380.1 224L288 131.9L288 200C288 213.3 298.7 224 312 224L380.1 224zM272 444L304 444C337.1 444 364 470.9 364 504C364 537.1 337.1 564 304 564L292 564L292 592C292 603 283 612 272 612C261 612 252 603 252 592L252 464C252 453 261 444 272 444zM304 524C315 524 324 515 324 504C324 493 315 484 304 484L292 484L292 524L304 524zM400 444L432 444C460.7 444 484 467.3 484 496L484 560C484 588.7 460.7 612 432 612L400 612C389 612 380 603 380 592L380 464C380 453 389 444 400 444zM432 572C438.6 572 444 566.6 444 560L444 496C444 489.4 438.6 484 432 484L420 484L420 572L432 572zM508 464C508 453 517 444 528 444L576 444C587 444 596 453 596 464C596 475 587 484 576 484L548 484L548 508L576 508C587 508 596 517 596 528C596 539 587 548 576 548L548 548L548 592C548 603 539 612 528 612C517 612 508 603 508 592L508 464z"/></svg>
          </div>
          <div class="certification-info">
            <div class="certification-title">{{ c.title }}</div>
            <div class="certification-issuer">{{ c.issuer }}</div>
          </div>
          <div class="certification-date">{{ formatDate(c.issuedDate) }}</div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import ArrowButton from '@/components/ArrowButton.vue'
const props = defineProps({
  loading: { type: Boolean, default: false },
  certifications: { type: Array, default: () => [] }
})

const formatDate = (d) => {
  if (!d) return ''
  const dt = new Date(d)
  return isNaN(dt) ? '' : dt.toLocaleDateString()
}
</script>

<style scoped>
/* Card Container */
.certification-glass-card {
  border-radius: 18px;
  box-shadow: 0 8px 32px 0 #0004;
  border: 1.5px solid rgba(255,255,255,0.08);
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(12px);
  color: #fff;
  padding: 24px 28px 0px 28px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 350px;
  max-height: 350px;
}

.certification-glass-card::before {
  content: "";
  position: absolute;
  inset: 1px;
  border-radius: 16.5px;
  border: 1px solid rgba(255, 255, 255, 0.07);
  pointer-events: none;
  z-index: 1;
}

/* Header */
.certification-header {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1.05rem;
  font-weight: 500;
  margin-bottom: 2px;
  position: relative;
}

.certification-header-icon {
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

.certification-header-title {
  color: #fff;
  font-weight: 500;
  font-size: 1.08rem;
  flex: 1;
}

/* Content */
.certification-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  overflow-y: auto;
  padding-right: 4px;
  max-height: 260px;
  flex: 1;
}

.certification-list::-webkit-scrollbar {
  width: 6px;
}

.certification-list::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.15);
  border-radius: 8px;
}

/* Items */
.certification-item {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 0px 0;
}

.certification-icon {
  font-size: 1.5rem;
  color: #00eaff;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #23243a;
  border-radius: 8px;
  box-shadow: 0 2px 8px #0002;
}

.cert-logo { width: 100%; height: 100%; object-fit: contain; border-radius: 6px; }
.cert-svg { width: 24px; height: 24px; }

.certification-info {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.certification-title {
  font-weight: 700;
  font-size: 1.05rem;
  color: #fff;
}

.certification-issuer {
  color: #b2b8ff;
  font-size: 0.98rem;
  font-weight: 500;
}

.sk-line { height: 12px; border-radius: 6px; background: rgba(255,255,255,0.08); margin: 4px 0; }
.shimmer { background: linear-gradient(90deg, rgba(255,255,255,0.06) 25%, rgba(255,255,255,0.12) 50%, rgba(255,255,255,0.06) 75%); background-size: 200% 100%; animation: shimmer 1.5s infinite; }
@keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }

.certification-date {
  color: #cfd8dc;
  font-size: 0.97rem;
  font-weight: 500;
  min-width: 90px;
  text-align: right;
}

/* Mobile Responsive */
@media (max-width: 1034px) {
  .certification-list {
    flex-direction: row;
    overflow-x: auto;
    overflow-y: hidden;
    gap: 16px;
    padding-bottom: 8px;
    padding-left: 0;
    padding-right: 0;
    margin-left: -28px;
    margin-right: -28px;
    padding-left: 28px;
    padding-right: 28px;
  }
  
  .certification-item {
    min-width: 260px;
    flex-shrink: 0;
    padding: 12px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
  }
  
  .certification-icon {
    margin-bottom: 8px;
  }
  
  .certification-info {
    width: 100%;
  }
  
  .certification-date {
    min-width: auto;
    text-align: left;
    margin-top: 4px;
  }
  
  .certification-list::-webkit-scrollbar {
    height: 4px;
    width: auto;
  }
  
  .certification-list::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 4px;
  }
}
</style>