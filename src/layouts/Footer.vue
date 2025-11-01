<template>
  <v-footer 
    elevation="0" 
    class="footer-enhanced"
    :style="{ 
      background: `linear-gradient(135deg, ${data.info.primaryColor} 0%, ${adjustColor(data.info.primaryColor, -15)} 100%)` 
    }"
  >
    <v-container>
      <v-row align="center">
        <v-col cols="12" md="6" class="footer-left">
          <div class="company-info">
            <div class="company-name">
              {{ new Date().getFullYear() }} — <strong>{{ data.info.name }}</strong>
            </div>
            <div v-if="data.info.iva" class="vat-number">P. IVA {{ data.info.iva }}</div>
          </div>
        </v-col>
        <v-col cols="12" md="6" class="footer-right">
          <div class="footer-links">
            <a href="/PrivacyPolicyForm.pdf" class="footer-link" target="_blank">
              <v-icon size="18">mdi-shield-lock</v-icon>
              Privacy Policy
            </a>
            <div class="powered-by">
              Powered by 
              <a href="https://fastsite.it" class="fast-site-link" target="_blank">
                Fast-Site
                <v-icon size="18">mdi-web</v-icon>
              </a>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <div class="footer-decoration"></div>
  </v-footer>
</template>

<script setup>
  import { storeToRefs } from 'pinia';
  import { useDataStore } from '@/stores/data';

  const dataStore = useDataStore();
  const { data } = storeToRefs(dataStore);

  const adjustColor = (color, percent) => {
    const num = parseInt(color.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
    return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
      (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
      (B < 255 ? B < 1 ? 0 : B : 255))
      .toString(16).slice(1);
  };
</script>

<style scoped>
.footer-enhanced {
  color: white;
  padding: 40px 0;
  position: relative;
  overflow: hidden;
}

.footer-decoration {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, transparent 0%, white 50%, transparent 100%);
  opacity: 0.3;
}

.footer-left {
  text-align: left;
}

@media (max-width: 960px) {
  .footer-left {
    text-align: center;
    margin-bottom: 20px;
  }
}

.company-info {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.company-name {
  font-size: 1.1rem;
  letter-spacing: 0.5px;
}

.vat-number {
  font-size: 0.9rem;
  opacity: 0.9;
}

.footer-right {
  text-align: right;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 15px;
}

@media (max-width: 960px) {
  .footer-right {
    align-items: center;
    text-align: center;
  }
}

.footer-links {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.footer-link {
  color: white;
  text-decoration: none;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: all 0.3s ease;
  padding: 5px 10px;
  border-radius: 5px;
}

.footer-link:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateX(-5px);
}

.powered-by {
  font-size: 0.95rem;
  opacity: 0.95;
}

.fast-site-link {
  color: white;
  font-weight: bold;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  transition: all 0.3s ease;
  padding: 3px 8px;
  border-radius: 5px;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.fast-site-link:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: white;
  transform: scale(1.05);
}
</style>
