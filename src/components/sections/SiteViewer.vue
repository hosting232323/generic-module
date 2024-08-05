<template>
  <v-container>
    <v-card elevation="4" height="500">
      <v-card-title class="title-card">
        <v-icon class="mr-2">mdi-web</v-icon>
        Chi ci ha già scelto
      </v-card-title>
      <v-card-text>
        <v-container class="scrollable-container">
          <v-row>
            <v-col v-for="site in content" :key="site.name" cols="12" md="6">
              <v-card v-if="!isMobile" class="site-card" :style="{ borderColor: info.primaryColor }" elevation="2">
                <v-card-title class="d-flex align-center justify-space-between py-2">
                  <span class="site-name text-body-2">{{ site.name }}</span>
                  <div class="d-flex align-center">
                    <v-btn small color="#f34455" :href="'https://' + site.url" target="_blank" class="ml-2">
                      Visita
                    </v-btn>
                    <v-avatar size="40" class="ml-2">
                      <v-img :src="site.logo ? site.logo : 'src/assets/defaultLogo.png'"></v-img>
                    </v-avatar>
                  </div>
                </v-card-title>
              </v-card>
              <v-card v-else class="site-card d-flex align-center" :style="{ borderColor: info.primaryColor }" elevation="2" :href="'https://' + site.url" target="_blank">
                <v-card-title class="d-flex align-center py-2">
                  <v-avatar size="40" class="mr-2">
                    <v-img :src="site.logo ? site.logo : 'src/assets/defaultLogo.png'"></v-img>
                  </v-avatar>
                  <span class="site-name text-body-2">{{ site.name }}</span>
                </v-card-title>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
  import mobile from '@/utils/mobile';

  const isMobile = mobile.setupMobileUtils();
  const { content, info } = defineProps(['content', 'info']);
</script>

<style scoped>
.title-card {
  font-weight: bold;
  color: #f34455;
  background-color: #f7f4ef;
  padding: 16px;
  border-bottom: 2px solid #f34455;
}

.scrollable-container {
  max-height: 400px;
  overflow-y: auto;
}

.scrollable-container::-webkit-scrollbar {
  width: 12px;
}

.scrollable-container::-webkit-scrollbar-thumb {
  background-color: #f34455;
  border-radius: 10px;
  border: 3px solid #e3f2fd;
}

.scrollable-container::-webkit-scrollbar-track {
  background-color: #f7f4ef;
  border-radius: 10px;
}

.site-card {
  border: 2px solid;
  border-radius: 8px;
  transition: transform 0.2s, box-shadow 0.2s;
}

.site-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
}

.v-avatar {
  border: 2px solid #eee;
}

.site-name {
  font-weight: bold;
}
</style>
