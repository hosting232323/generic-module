<template>
  <v-container class="contacts-section py-16">
    <v-card class="contact-card" elevation="0">
      <v-container class="pa-8">
        <v-row justify="center" class="mb-8">
          <v-col cols="12" class="text-center">
            <h2 class="text-h3 font-weight-bold mb-4" :style="{ color: info.primaryColor }">
              {{ getText(content.title) || 'I nostri contatti' }}
            </h2>
            <div class="title-underline" :style="{ background: `linear-gradient(90deg, transparent, ${info.primaryColor}, transparent)` }"></div>
          </v-col>
        </v-row>

        <v-row class="mb-8">
          <v-col
            v-for="(contact, idx) in content.contacts"
            :key="idx"
            cols="12"
            md="4"
          >
            <div class="contact-item">
              <div class="contact-icon-wrapper" :style="{ borderColor: info.primaryColor }">
                <v-icon :icon="contact.icon" :color="info.primaryColor" size="30"/>
              </div>
              <a :href="contact.url" target="_blank" class="contact-link">
                {{ getText(contact.title) }}
              </a>
            </div>
          </v-col>
        </v-row>

        <v-divider class="my-8" :style="{ borderColor: info.primaryColor, borderWidth: '2px' }"/>

        <div class="text-center mb-6">
          <h3 class="text-h5 font-weight-bold">
            {{ getText(content.subtitle) || 'Contattaci direttamente con questo form' }}
          </h3>
        </div>

        <v-form fast-fail @submit.prevent="sendMail" class="contact-form">
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="name"
                :rules="validation.requiredRules"
                variant="outlined"
                label="Nome"
                :color="info.primaryColor"
                class="custom-input"
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="email"
                :rules="validation.emailRules"
                variant="outlined"
                label="Email"
                :color="info.primaryColor"
                class="custom-input"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-textarea
                label="Messaggio"
                rows="5"
                v-model="body"
                :rules="validation.requiredRules"
                variant="outlined"
                :color="info.primaryColor"
                class="custom-input"
              />
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="12" md="6">
              <v-btn
                block
                size="large"
                type="submit"
                :color="info.primaryColor"
                class="submit-btn"
                elevation="4"
              >
                <v-icon left>mdi-send</v-icon>
                Invia Messaggio
              </v-btn>
            </v-col>
          </v-row>
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
    http.postRequest('send-mail', {
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
.contacts-section {
  background: linear-gradient(180deg, #ffffff 0%, #f8f9fa 100%);
}

.title-underline {
  width: 200px;
  height: 4px;
  margin: 20px auto 0;
  border-radius: 2px;
}

.contact-card {
  border-radius: 25px;
  background: linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%);
  border: 2px solid #f0f0f0;
  overflow: hidden;
}

.contact-item {
  text-align: center;
  padding: 30px 20px;
  border-radius: 15px;
  background: white;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  height: 100%;
}

.contact-item:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 35px rgba(214, 52, 71, 0.15);
}

.contact-icon-wrapper {
  width: 80px;
  height: 80px;
  margin: 0 auto 20px;
  border-radius: 50%;
  border: 3px solid;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.contact-item:hover .contact-icon-wrapper {
  transform: rotate(360deg) scale(1.1);
}

.contact-link {
  display: block;
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
  text-decoration: none;
  transition: color 0.3s ease;
}

.contact-link:hover {
  color: var(--v-theme-primary);
}

.contact-form {
  max-width: 800px;
  margin: 0 auto;
}

.custom-input {
  transition: all 0.3s ease;
}

.submit-btn {
  font-size: 1.1rem;
  font-weight: bold;
  letter-spacing: 1px;
  padding: 26px 0 !important;
  transition: all 0.3s ease;
}

.submit-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(214, 52, 71, 0.3);
}
</style>
