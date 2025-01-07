<template>
  <v-container>
    <v-card style="margin-right: 20px;">
      <v-card-title>Richiedi un Sito Web</v-card-title>
      <v-form @submit.prevent="submit">
        <v-card-text>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="name"
                label="Nome"
                required
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="email"
                label="Email"
                required
              />
            </v-col>
            <v-col cols="12">
              <v-autocomplete
                v-model="business"
                label="Business"
                :items="getBusiness()"
                :hint="getHint()"
                required
              />
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-btn
            block
            type="submit"
            color="primary"
            text="Invia"
          />
        </v-card-actions>
      </v-form>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import businessTypes from '@/assets/business';

const name = ref('');
const email = ref('');
const business = ref('');

const getBusiness = () => {
  let res = [];
  for (const key in businessTypes)
    res = res.concat(businessTypes[key]);
  return res;
};

const getHint = () => {
  if (business.value) {
    for (const key in businessTypes) {
      if (businessTypes[key].includes(business.value)) return key;
    }
  }
}

const submit = () => {
  console.log(name.value, email.value, business.value);
};
</script>
