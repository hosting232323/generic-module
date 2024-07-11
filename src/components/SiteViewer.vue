<template>
  <v-container>
    <v-card class="styled-card" elevation="4">
      <v-card-title class="title-card">
        <v-icon class="mr-2">mdi-web</v-icon>
        Siti Attivi
      </v-card-title>
      <v-card-text>
        <v-container class="scrollable-container">
          <v-row>
            <v-col v-for="site in content" :key="site.name" cols="12" md="6">
              <v-card class="site-card mb-1" :style="{ borderColor: info.primaryColor }" elevation="2">
                <v-card-title class="d-flex align-center justify-space-between py-2">
                  <span class="site-name text-body-2">{{ site.name }}</span>
                  <div class="d-flex align-center">
                    <v-btn small color="primary" :href="'https://' + site.url" target="_blank" class="ml-2">
                      Visita
                    </v-btn>
                    <v-avatar size="40" class="ml-2">
                      <v-img :src="site.logo ? site.logo : 'src/assets/defaultLogo.png'"></v-img>
                    </v-avatar>
                  </div>
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
  const { content, info } = defineProps(['content', 'info']);
</script>

<style scoped>
.styled-card { 
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  max-height: 500px;
}

.title-card {
  display: flex;
  align-items: center;
  font-size: 1.25rem;
  font-weight: bold;
  color: #3f51b5;
  background-color: #e3f2fd;
  padding: 16px;
  border-bottom: 2px solid #3f51b5;
}

.scrollable-container {
  max-height: 400px;
  overflow-y: auto;
}

.scrollable-container::-webkit-scrollbar {
  width: 12px;
}

.scrollable-container::-webkit-scrollbar-thumb {
  background-color: #3f51b5;
  border-radius: 10px;
  border: 3px solid #e3f2fd;
}

.scrollable-container::-webkit-scrollbar-track {
  background-color: #f1f1f1;
  border-radius: 10px;
}

.site-card {
  border: 2px solid;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
}

.site-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
}

.v-btn {
  font-size: 0.875rem;
}

.v-avatar {
  border: 2px solid #eee;
}

.site-name {
  font-weight: bold;
  color: rgb(0, 0, 0);
}

.mb-1 {
  margin-bottom: 4px; /* Riduce ulteriormente lo spazio tra le righe */
}
</style>
