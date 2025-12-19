<template>
  <div class="main-bg">
    <div class="main-outer">
      <ProfileHeader />
      <div class="main-sections">
        <v-row no-gutters>
          <v-col cols="12" class="d-flex justify-center">
            <div class="certifications-card">
              <!-- Certifications Grid -->
              <div class="certifications-grid">
                <div 
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
                    
                    <div class="cert-actions">
                      <v-btn 
                        variant="text" 
                        color="#00eaff" 
                        class="view-cert-btn"
                        @click="viewCertificate(cert.id)"
                      >
                        View Certificate
                        <i class="fas fa-external-link-alt ml-2"></i>
                      </v-btn>
                      <v-btn 
                        v-if="cert.verifyUrl"
                        variant="outlined" 
                        color="#00eaff" 
                        class="verify-btn"
                        @click="verifyCertificate(cert.verifyUrl)"
                      >
                        Verify
                      </v-btn>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import dataService from '@/services/dataService';
import ProfileHeader from '@/components/ProfileHeaderCard.vue';

const certifications = ref([]);

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
    const data = await dataService.getCertifications()
    certifications.value = data
  } catch (error) {
    console.error('Failed to load certifications:', error)
  }
});
</script>

<style scoped>
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

.main-sections {
  width: 100%;
}

.certifications-card {
  width: 100%;
  max-width: 1200px;
}

.certifications-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 32px;
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

.cert-actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
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

@media (max-width: 768px) {
  .certifications-grid {
    grid-template-columns: 1fr;
    gap: 24px;
  }
  
  .cert-content {
    padding: 20px;
  }
  
  .cert-title {
    font-size: 1.2rem;
  }
  
  .cert-actions {
    flex-direction: column;
  }
}
</style> 