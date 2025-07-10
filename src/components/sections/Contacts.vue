<template>
  <v-container>
    <v-card elevation="20">
      <v-container>
        <h2 :style="{ color: info.primaryColor }" v-html="getText(content.title) || 'I nostri contatti'"/>
        <v-list>
          <v-list-item height="20" v-for="contact in content.contacts" :key="contact">
            <template v-slot:prepend>
              <v-icon :icon="contact.icon" :color="info.primaryColor" />
            </template>
            <v-list-item-title class="contact__text">
              <a :href="contact.url" target="_blank" style="text-decoration: none; color: inherit;" v-html="getText(contact.title)"/>
            </v-list-item-title>
          </v-list-item>
        </v-list><br>
        <hr :style="{ height: '5px', backgroundColor: info.primaryColor }" />
        <br><b v-html="getText(content.subtitle) || 'Contattaci direttamente con questo form'"/>
        <br><br>
        <v-form fast-fail @submit.prevent="sendMail">
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field v-model="name" :rules="validation.requiredRules" variant="outlined" label="Name" />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field v-model="email" :rules="validation.emailRules" variant="outlined" label="Email" />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="12">
              <v-textarea label="Body" rows="4" v-model="body" :rules="validation.requiredRules" variant="outlined" />
            </v-col>
          </v-row><br>
          <v-btn block text="Send" type="submit" :color="info.primaryColor" />
        </v-form>
      </v-container>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import http from '@/utils/http';
import validation from '@/utils/validation';
import { useLanguageStore } from '@/stores/language';

const mail = import.meta.env.VITE_FORM_MAIL;
const { content, info } = defineProps(['content', 'info']);
const { getText } = useLanguageStore();

const name = ref('');
const body = ref('');
const email = ref('');

const sendMail = () => {
  if (
    !validation.validateInput(email.value, validation.emailRules) &&
    !validation.validateInput(name.value, validation.requiredRules) &&
    !validation.validateInput(body.value, validation.requiredRules)
  ) {
    http.postRequestGenericBE('send-email', {
      email: mail,
      subject: `Qualcuno ho usato il form del sito ${info.name}`,
      body: 'Buongiorno,\nSono il tuo mailer, hai ricevuto il seguente messaggio:\n\n' +
        `Nominativo: ${name.value}\n` +
        `Mail: ${email.value}\n\n` +
        `Testo:\n${body.value}`
    }, function () {
      alert("Mail inviata\nTi ringraziamo per il contatto");
    });
  }
};
</script>

<style scoped>
  .contact__text {
    white-space: normal;
  }
</style>
