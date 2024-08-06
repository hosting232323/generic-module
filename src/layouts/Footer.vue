<template>
  <v-footer elevation="2" :color="data.info.primaryColor" class="bento-footer">
    <v-container>
      <v-row class="footer-row">
        <!-- Left Side of Footer (with Logo) -->
        <v-col cols="6" class="footer-left">
          <div class="footer-left-content">
            <div class="footer-text">
              <a href="/PrivacyPolicyForm.pdf" class="footer-link" target="_blank">Privacy Policy</a>

              <div v-if="data.info.iva" class="iva-text">P. IVA {{ data.info.iva }}</div>
            </div>
          </div>
        </v-col>
        
        <!-- Right Side of Footer -->
        <v-col cols="7" class="footer-right text-right">
          <div class="footer-right-content">
            <div class="powered-by">
              <span class="powered-by-text">Powered by</span>
              <a href="https://fastsite.it" class="fast-site-link" target="_blank">
                Fast-Site
                <v-icon right>mdi-web</v-icon>
              </a>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useDataStore } from '@/stores/data';

const dataStore = useDataStore();
const { data } = storeToRefs(dataStore);
</script>

<style scoped>
.bento-footer {
  border-radius: 3px; /* Rounded top corners for the footer */
  padding: 16px; /* Padding to give some space inside the footer */
}

.footer-row {
  display: flex;
}

.footer-left {
  display: flex;
  align-items: center;
}

.footer-left-content {
  display: flex;
  align-items: center; /* Align logo and text vertically */
}

.footer-logo {
  height: 30px; /* Adjust the height as needed */
  margin-right: 16px; /* Space between logo and text */
}

.footer-text {
  display: flex;
  flex-direction: column;
}

.iva-text {
  margin-top: 4px; /* Space between the year/name and P. IVA */
}

.footer-right {
  display: flex;
  align-items: center;
  justify-content: flex-end; /* Align items to the end of the column */
}

.footer-right-content {
  display: flex;
  flex-direction: column;
  align-items: flex-end; /* Align items to the end of the column */
}

.footer-link {
  color: #f7f4ef;
  font-weight: bold;
  transition: color 0.3s ease;
  margin-bottom: 8px; /* Space between the Privacy Policy link and the powered by text */
}

.footer-link:hover {
  color: #2c3e50;
  text-decoration: underline;
}

.powered-by {
  display: flex;
  align-items: center;
}

.powered-by-text {
  margin-right: 8px; /* Space between "Powered by" text and the Fast-Site link */
}

.fast-site-link {
  color: #f7f4ef;
  font-weight: bold;
  transition: color 0.3s ease;
}

.fast-site-link:hover {
  color: #2c3e50;
  text-decoration: underline;
}
</style>
