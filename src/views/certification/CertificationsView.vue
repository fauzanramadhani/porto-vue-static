<template>
  <div class="main-outer">
    <h2 class="section-title">My Certifications</h2>
    <!-- Desktop Layout -->
    <div class="desktop-layout">
      <div class="certifications-card">
        <div class="certifications-grid">
          <div v-if="isLoading" style="display: contents;">
            <div v-for="n in 3" :key="n" class="certification-card skeleton-card">
              <div class="cert-header">
                 <div class="cert-logo">
                   <SkeletonLoader width="44px" height="44px" borderRadius="8px" />
                 </div>
                 <SkeletonLoader width="80px" height="24px" borderRadius="20px" />
              </div>
              
              <div class="cert-content cert-content-loading">
                <SkeletonLoader width="70%" height="28px"/>
                <SkeletonLoader width="50%" height="18px"/>
                
                <SkeletonLoader width="100%" height="16px"/>
                <SkeletonLoader width="90%" height="16px"/>
                
                <div class="cert-details cert-details-loading">
                  <SkeletonLoader width="120px" height="16px"/>
                  <SkeletonLoader width="130px" height="16px"/>
                  <SkeletonLoader width="140px" height="16px"/>
                </div>
              </div>
            </div>
          </div>

          <div 
            v-else
            v-for="cert in certifications" 
            :key="cert.id" 
            class="certification-card"
            :class="{ 'in-progress': cert.status === 'In Progress' }"
          >
            <div class="cert-header">
              <div class="cert-logo">
                <img :src="cert.logo" :alt="cert.issuer" />
              </div>
              <div class="cert-status" :class="cert.status.toLowerCase().replace(' ', '-')">
                {{ cert.status }}
              </div>
            </div>
            
            <div class="cert-content">
              <h3 class="cert-title">{{ cert.title }}</h3>
              <p class="cert-issuer">{{ cert.issuer }}</p>
              <p class="cert-description">{{ cert.description }}</p>
              
              <div class="cert-details">
                <div class="detail-item">
                  <span class="detail-label">Issued:</span>
                  <span class="detail-value">{{ cert.issuedDate }}</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">Expires:</span>
                  <span class="detail-value">{{ cert.expiryDate || 'No Expiry' }}</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">Credential ID:</span>
                  <span class="detail-value">{{ cert.credentialId }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Mobile Layout -->
    <div class="mobile-layout">
      <div class="certifications-card">
        <div class="mobile-certifications-grid">
          <div v-if="isLoading" style="display: contents;">
            <div v-for="n in 3" :key="n" class="certification-card skeleton-card">
              <div class="cert-header">
                <div class="cert-logo">
                  <SkeletonLoader width="44px" height="44px" borderRadius="8px" />
                </div>
                <SkeletonLoader width="80px" height="24px" borderRadius="20px" />
              </div>
              
              <div class="cert-content cert-content-loading">
                <SkeletonLoader width="70%" height="24px"/>
                <SkeletonLoader width="50%" height="16px"/>
                
                <SkeletonLoader width="100%" height="14px"/>
                <SkeletonLoader width="90%" height="14px"/>
                
                <div class="cert-details">
                  <SkeletonLoader width="120px" height="14px"/>
                  <SkeletonLoader width="130px" height="14px"/>
                  <SkeletonLoader width="140px" height="14px"/>
                </div>
              </div>
            </div>
          </div>

          <div 
            v-else
            v-for="cert in certifications" 
            :key="cert.id" 
            class="certification-card mobile-card"
            :class="{ 'in-progress': cert.status === 'In Progress' }"
          >
            <div class="cert-header">
              <div class="cert-logo">
                <img :src="cert.logo" :alt="cert.issuer" />
              </div>
              <div class="cert-status" :class="cert.status.toLowerCase().replace(' ', '-')">
                {{ cert.status }}
              </div>
            </div>
            
            <div class="cert-content">
              <h3 class="cert-title">{{ cert.title }}</h3>
              <p class="cert-issuer">{{ cert.issuer }}</p>
              <p class="cert-description">{{ cert.description }}</p>
              
              <div class="cert-details">
                <div class="detail-item">
                  <span class="detail-label">Issued:</span>
                  <span class="detail-value">{{ cert.issuedDate }}</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">Expires:</span>
                  <span class="detail-value">{{ cert.expiryDate || 'No Expiry' }}</span>
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
import { ref, computed, onMounted } from 'vue';
import dataService from '@/services/dataService';
import ProfileHeader from '@/components/ProfileHeaderCard.vue';
import SkeletonLoader from '@/components/SkeletonLoader.vue';

const certifications = ref([]);
const profile = ref(null);
const isLoading = ref(true);

const completedCertifications = computed(() => {
  return certifications.value.filter(cert => cert.status === 'Completed').length;
});

const inProgressCertifications = computed(() => {
  return certifications.value.filter(cert => cert.status === 'In Progress').length;
});

const viewCertificate = (certId) => {
  console.log('Viewing certificate:', certId);
  // Navigate to certificate detail or open certificate URL
};

const verifyCertificate = (verifyUrl) => {
  if (verifyUrl) {
    window.open(verifyUrl, '_blank');
  }
};

// Load data on mount
onMounted(async () => {
  try {
    isLoading.value = true
    
    const [certData, profileData] = await Promise.all([
      dataService.getCertifications(),
      dataService.getProfile()
    ])
    
    certifications.value = certData
    profile.value = profileData
  } catch (error) {
    console.error('Failed to load certifications page data:', error)
  } finally {
    isLoading.value = false
  }
});
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.main-outer {
  width: 100%;
}

.section-title {
  font-size: 2rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 32px;
  letter-spacing: -0.5px;
  text-align: left;
}

@media (min-width: 1420px) {
  .main-outer {
    max-width: 1200px;
    padding: 0 0 48px 0;
  }
}

/* Layout containers */
.desktop-layout {
  display: block;
}

.mobile-layout {
  display: none;
}

/* Certifications Layout */
.certifications-card {
  width: 100%;
}

.certifications-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 32px;
}

.mobile-certifications-grid {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.certification-card {
  background: rgba(255, 255, 255, 0.03);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  overflow: hidden;
  transition: all 0.3s ease;
}

.certification-card:hover {
  background: rgba(255, 255, 255, 0.05);
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
}

.certification-card.in-progress {
  border-color: rgba(255, 193, 7, 0.3);
  background: rgba(255, 193, 7, 0.05);
}

.cert-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 24px 0 24px;
}

.cert-logo {
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 8px;
}

.cert-logo img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.cert-status {
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.cert-status.completed {
  background: rgba(0, 234, 255, 0.2);
  color: #00eaff;
  border: 1px solid rgba(0, 234, 255, 0.3);
}

.cert-status.in-progress {
  background: rgba(255, 193, 7, 0.2);
  color: #ffc107;
  border: 1px solid rgba(255, 193, 7, 0.3);
}

.cert-content {
  padding: 24px;
}

.cert-content-loading {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.cert-title {
  font-size: 1.3rem;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 8px;
  line-height: 1.3;
}

.cert-issuer {
  font-size: 1rem;
  color: #00eaff;
  font-weight: 500;
  margin-bottom: 12px;
}

.cert-description {
  font-size: 0.95rem;
  color: #b0b0b0;
  line-height: 1.6;
  margin-bottom: 20px;
}

.cert-details {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 24px;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.85rem;
}

.detail-label {
  color: #808080;
  font-weight: 500;
}

.detail-value {
  color: #ffffff;
  font-weight: 400;
}

.view-cert-btn {
  font-weight: 500;
  text-transform: none;
  padding: 8px 16px;
}

.verify-btn {
  font-weight: 500;
  text-transform: none;
  padding: 8px 16px;
  border-color: rgba(0, 234, 255, 0.3);
}

.verify-btn:hover {
  background: rgba(0, 234, 255, 0.1);
}

/* Tablet/Mobile Breakpoint matches HomeView */
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

  .cert-content {
    padding: 20px;
  }
  
  .cert-title {
    font-size: 1.2rem;
  }
}
</style>