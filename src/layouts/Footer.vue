<template>
  <v-footer elevation="2" :color="info.primaryColor">
    <v-container>
      <v-row>
        <v-col cols="6">
          {{ new Date().getFullYear() }} —
          <strong>{{ info.name }}</strong>
          <div v-if="info.iva">P. IVA {{ info.iva }}</div>
        </v-col>
        <v-col cols="6" class="text-right">
          <a
            href="/PrivacyPolicyForm.pdf"
            target="_blank"
            style="color: #42b983; font-weight: bold; transition: color 0.3s ease;"
            @mouseover="e => e.target.style.color = '#2c3e50'"
            @mouseleave="e => e.target.style.color = '#42b983'"
          >
            Privacy Policy
          </a>
          <div>
            Powered by 
            <a
              href="https://fastsite.it"
              target="_blank"
              style="color: #42b983; font-weight: bold; transition: color 0.3s ease;"
              @mouseover="e => e.target.style.color = '#2c3e50'"
              @mouseleave="e => e.target.style.color = '#42b983'"
            >
              Fast-Site
              <v-icon right>mdi-web</v-icon>
            </a>
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

const props = defineProps({
  info: {
    default: null,
  }
});

const info = props.info ? props.info : data.value.info;
</script>

<style scoped>
.footer-link {
  color: #42b983;
  font-weight: bold;
  transition: color 0.3s ease;
}

.footer-link:hover {
  color: #2c3e50;
  text-decoration: underline;
}

.fast-site-link {
  color: #42b983;
  font-weight: bold;
  transition: color 0.3s ease;
}

.fast-site-link:hover {
  color: #2c3e50;
  text-decoration: underline;
}
</style>
