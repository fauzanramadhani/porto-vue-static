<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-copyright">
        © 2025 Bioblub. All rights reserved.
      </div>
      <div class="footer-links">
        <a href="#" class="footer-link">Privacy Policy</a>
        <span class="footer-separator">•</span>
        <a href="#" class="footer-link">Terms of Service</a>
      </div>
    </div>
  </footer>
</template>

<script setup>
// Footer component for all pages
</script>

<style scoped>
.footer {
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding: 1.5rem 0;
  margin-top: auto;
  position: relative;
  z-index: 10;
}

.footer-content {
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.footer-copyright {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  font-weight: 400;
}

.footer-links {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.footer-link {
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 400;
  transition: color 0.3s ease;
}

.footer-link:hover {
  color: rgba(255, 255, 255, 0.9);
}

.footer-separator {
  color: rgba(255, 255, 255, 0.4);
  font-size: 0.8rem;
}

/* Mobile responsive */
@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
    text-align: center;
    gap: 0.75rem;
  }
  
  .footer-links {
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .footer {
    padding: 1rem 0;
  }
  
  .footer-content {
    padding: 0 1rem;
  }
  
  .footer-copyright,
  .footer-link {
    font-size: 0.85rem;
  }
}
</style>
