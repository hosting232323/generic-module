<template>
  <v-container :style="{ color: content.primaryColor }" >
    <br>
    <div v-if="!isMobile"><h1>
      Chi siamo
    </h1><br></div>
    <p class="black_text">
      Operiamo nel sistema moda da circa, <b>quarant’anni</b>, con un team fortemente motivato e convinto che questo lavoro vada svolto, oggi più che mai, con rinnovato <b>entusiasmo</b>, <b>metodo</b> e <b>professionalità</b>.
    </p><br>
    <p class="black_text">
      Il nostro percorso, ci permette di vantare decennali esperienze di collaborazione con marchi rinomati, quali Trussardi, Iceberg, Mabitex, Versace, ecc. e la storia continua con <b>marchi tra i più prestigiosi</b> sul mercato.
    </p><br>
    <p class="black_text">
      La nostra agenzia è al momento composta da <b>cinque venditori e un addetto all’ufficio</b> commerciale / amministrativo e dispone di una <b>show-room di circa millecento metri quadrati</b>, disposti su due superfici e suddiviso in ambienti <b>dedicabili alle singole linee</b>.
    </p><br>
  </v-container>
</template>

<script setup>
import { useLanguageStore } from '@/stores/language';

const { getText } = useLanguageStore();
const { content, info } = defineProps(['content', 'info']);
</script>

<style scoped>
  .green_text {
    color: #009900;
  }

  .black_text {
    color: black;
    font-size: large;
  }
</style>
