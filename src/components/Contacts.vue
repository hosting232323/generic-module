<template>
  <v-container>
    <v-card elevation="20" title="I nostri contatti">
      <v-container>
        <v-list>
          <v-list-item height="20" v-for="contact_type in getContactTypes(data.contacts)">
            <template v-slot:prepend>
              <v-icon :icon="CONTACT_ICON_MAP[contact_type]" :color="data.primaryColor" />
            </template>
            <v-list-item-title v-html="data.contacts[contact_type]" />
          </v-list-item>
        </v-list><br>
        <hr :style="{ height: '5px', backgroundColor: data.primaryColor }" />
        <br><b>
          Contattaci direttamente con questo form
        </b><br><br>
        <v-form fast-fail @submit.prevent="sendMail">
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field v-model="name" :rules="validation.requiredRules" variant="outlined" label="Nominativo" />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field v-model="email" :rules="validation.emailRules" variant="outlined" label="Email" />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="12">
              <v-textarea label="Testo" rows="4" v-model="body" :rules="validation.requiredRules" variant="outlined" />
            </v-col>
          </v-row><br>
          <v-btn block text="Invia" type="submit" :color="data.primaryColor" />
        </v-form>
      </v-container>
    </v-card>
  </v-container>
</template>

<script setup>
  import { ref } from 'vue';
  import http from '@/utils/http';
  import validation from '@/utils/validation';

  import { storeToRefs } from 'pinia';
  import { useDataStore } from '@/stores/data';
import router from '../plugins/router';

  const dataStore = useDataStore();
  const { data } = storeToRefs(dataStore);

  const name = ref('');
  const body = ref('');
  const email = ref('');

  const CONTACT_ICON_MAP = {
    Phone: 'mdi-phone',
    Address: 'mdi-map-marker'
  };
  const getContactTypes = (contacts) => {
    return Object.keys(contacts).filter(contact => CONTACT_ICON_MAP[contact]);
  };

  const mail = import.meta.env.VITE_FORM_MAIL;

  const sendMail = () => {
    if (
      !validation.validateInput(email.value, validation.emailRules) &&
      !validation.validateInput(name.value, validation.requiredRules) &&
      !validation.validateInput(body.value, validation.requiredRules)
    ) {
      http.postRequestGenericBE('send-mail', {
        email: mail,
        subject: `Qualcuno ho usato il form del sito ${data.value.name}`,
        body: 'Buongiorno,\nSono il tuo mailer, hai ricevuto il seguente messaggio:\n\n' +
          `Nominativo: ${name.value}\n` +
          `Mail: ${email.value}\n\n` +
          `Testo:\n${body.value}`
      }, function () {
        alert("Mail inviata\nTi ringraziamo per il contatto");
      }, 'POST', router);
    }
  };
</script>

<style scoped>
  .contact__text {
    margin-left: 10px;
    float: left;
  }
</style>
