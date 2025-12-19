<template>
  <div class="contact-glass-card" v-if="enabled">
    <div class="contact-content">
      <div class="contact-header">
        <span class="contact-icon">💬</span>
        <span class="contact-title">Contact</span>
      </div>
      <div class="contact-desc" v-html="message"></div>
    </div>
    
    <div class="contact-actions">
      <a v-if="email" class="contact-btn primary" :href="`mailto:${email}`">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" class="btn-icon">
          <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"/>
        </svg>
        <span>Email</span>
      </a>
      <a v-if="instagramUrl" class="contact-btn secondary" :href="instagramUrl" target="_blank">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" class="btn-icon">
          <path d="M224 160C241.7 160 256 145.7 256 128C256 110.3 241.7 96 224 96L160 96C107 96 64 139 64 192L64 448C64 501 107 544 160 544L224 544C241.7 544 256 529.7 256 512C256 494.3 241.7 480 224 480L160 480C142.3 480 128 465.7 128 448L128 192C128 174.3 142.3 160 160 160L224 160zM566.6 342.6C579.1 330.1 579.1 309.8 566.6 297.3L438.6 169.3C426.1 156.8 405.8 156.8 393.3 169.3C380.8 181.8 380.8 202.1 393.3 214.6L466.7 288L256 288C238.3 288 224 302.3 224 320C224 337.7 238.3 352 256 352L466.7 352L393.3 425.4C380.8 437.9 380.8 458.2 393.3 470.7C405.8 483.2 426.1 483.2 438.6 470.7L566.6 342.7z"/>
        </svg>
        <span>DM on Instagram</span>
      </a>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  enabled: { type: Boolean, default: false },
  email: { type: String, default: '' },
  instagramUrl: { type: String, default: '' },
  message: { type: String, default: '' }
})
</script>

<style scoped>
.contact-glass-card {
  border-radius: 18px;
  box-shadow: 0 8px 32px 0 #0004;
  border: 1.5px solid rgba(255,255,255,0.08);
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(12px);
  color: #fff;
  padding: 24px 20px 20px 20px;
  width: 100%;
  height: 280px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
}

.contact-glass-card::before {
  content: "";
  position: absolute;
  inset: 1px;
  border-radius: 16.5px;
  border: 1px solid rgba(255, 255, 255, 0.07); /* Inner border */
  pointer-events: none;
  z-index: 1;
}

.contact-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 1;
}

.contact-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
}

.contact-icon {
  font-size: 1.2rem;
  opacity: 0.9;
}

.contact-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #fff;
}

.contact-desc {
  font-size: 0.95rem;
  color: #a0a8b0;
  line-height: 1.4;
  text-align: left;
  margin-bottom: 4px;
}

.contact-actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  margin-top: auto;
}

.contact-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  border: none;
  border-radius: 10px;
  padding: 12px 16px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: left;
  width: 100%;
  position: relative;
  overflow: hidden;
}

.contact-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  transition: left 0.5s ease;
}

.contact-btn:hover::before {
  left: 100%;
}

.contact-btn.primary {
  background: linear-gradient(135deg, #b2b8ff, #00eaff);
  color: #fff;
  border: 1px solid rgba(178, 184, 255, 0.3);
  box-shadow: 0 4px 15px rgba(178, 184, 255, 0.2);
}

.contact-btn.primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(178, 184, 255, 0.3);
}

.contact-btn.secondary {
  background: rgba(255, 255, 255, 0.05);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
}

.contact-btn.secondary:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.2);
  transform: translateY(-1px);
}

.btn-icon {
  width: 16px;
  height: 16px;
  fill: currentColor;
  flex-shrink: 0;
}

.contact-btn span {
  font-weight: 500;
  letter-spacing: 0.02em;
}
</style>