<template>
  <Loading :home="false" v-if="!ready"/>
  <v-container v-else>
    <h1 class="text-h3 font-weight-bold" :style="{ color: info.primaryColor, margin: '10px 0'}">Ultimi post</h1>
    <div v-for="(post, index) in displayedPosts" :key="post.id">
      <BlogItem :post="post" :isFeatured="index === 0"/>
    </div>
    <div v-if="displayedPosts && allPosts.length > displayedPosts.length" class="mt-4">
      <a @click="loadMorePosts" class="more-posts" :style="{ color: info.primaryColor }">Mostra più articoli</a>
    </div>
    <div v-else-if="displayedPosts && allPosts.length > maxItems && displayedPosts.length >= maxItems" class="mt-4">
      <a @click="removeMorePosts" class="more-posts" :style="{ color: info.primaryColor }">Mostra meno</a>
    </div>
  </v-container>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import BlogItem from '@/components/sections/BlogItem';
import Loading from '@/layouts/Loading.vue';
import { useBlogStore } from '@/stores/blog';
import { useDataStore } from '@/stores/data';

const displayedPosts = ref([]);
const allPosts = ref([]);
const maxItems = 4;
const itemsToShow = ref(maxItems);

const dataStore = useDataStore();
const blogStore = useBlogStore();

const { posts, ready } = storeToRefs(blogStore);
const { data } = storeToRefs(dataStore);
const info = data.value.info;

const examplePosts = [
  {
    id: 1,
    title: 'La Storia della Pizza Napoletana',
    content: 'La pizza napoletana è un prodotto gastronomico tradizionale che nasce a Napoli nel XVIII secolo. La sua ricetta originale prevede pomodoro San Marzano, mozzarella di bufala campana, basilico fresco, sale e olio extravergine di oliva. Nel 2017 l\'arte dei pizzaiuoli napoletani è stata riconosciuta dall\'UNESCO come patrimonio culturale immateriale dell\'umanità.',
    cover: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800',
    updated_at: '26/10/2025 12:00',
    ordinal: 1
  },
  {
    id: 2,
    title: 'I Segreti della Pasta Fresca',
    content: 'La pasta fresca è uno dei pilastri della cucina italiana. Per prepararla servono ingredienti semplici: farina, uova e un pizzico di sale. La lavorazione richiede pazienza e amore. Impastare, stendere e tagliare la pasta sono gesti che si tramandano di generazione in generazione. Ogni regione italiana ha le sue forme tradizionali.',
    cover: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800',
    updated_at: '25/10/2025 15:30',
    ordinal: 2
  },
  {
    id: 3,
    title: 'Il Tiramisù: Dolce Italiano per Eccellenza',
    content: 'Il tiramisù è uno dei dolci italiani più famosi al mondo. Nato negli anni \'60 in Veneto, combina savoiardi imbevuti nel caffè con una crema di mascarpone, uova e zucchero. Il nome significa "tirami su" per l\'effetto energizzante dato dal caffè. È il dessert perfetto per concludere un pasto italiano.',
    cover: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800',
    updated_at: '24/10/2025 10:15',
    ordinal: 3
  },
  {
    id: 4,
    title: 'Vini Italiani: Guida ai Migliori Abbinamenti',
    content: 'Il vino è parte integrante della cultura gastronomica italiana. Ogni regione produce vini unici che si abbinano perfettamente ai piatti locali. Dal Chianti toscano al Barolo piemontese, dal Prosecco veneto al Nero d\'Avola siciliano, l\'Italia offre una varietà incredibile di vini per accompagnare ogni portata.',
    cover: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800',
    updated_at: '23/10/2025 18:45',
    ordinal: 4
  },
  {
    id: 5,
    title: 'Antipasti Italiani: Tradizione e Innovazione',
    content: 'Gli antipasti italiani sono l\'apertura perfetta per ogni pasto. Dalle bruschette al pomodoro ai salumi e formaggi, passando per la caprese e i crostini, ogni regione ha le sue specialità. Gli antipasti sono pensati per stuzzicare l\'appetito e preparare il palato ai piatti successivi.',
    cover: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800',
    updated_at: '22/10/2025 14:20',
    ordinal: 5
  },
  {
    id: 6,
    title: 'Birre Artigianali: La Rivoluzione del Gusto',
    content: 'Negli ultimi anni l\'Italia ha vissuto una vera rivoluzione nel mondo della birra. I birrifici artigianali producono birre di altissima qualità che si sposano perfettamente con la cucina italiana. Dalle IPA luppolate alle stout scure, c\'è una birra per ogni piatto e per ogni occasione.',
    cover: 'https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=800',
    updated_at: '21/10/2025 09:00',
    ordinal: 6
  }
];


const displayPosts = () => {
  const postsToDisplay = (posts.value && posts.value.length > 0) ? posts.value : examplePosts;
  allPosts.value = postsToDisplay;
  displayedPosts.value = postsToDisplay.slice(0, itemsToShow.value);
};

const loadMorePosts = () => {
  itemsToShow.value += 5;
  displayPosts();
};

const removeMorePosts = () => {
  itemsToShow.value = maxItems;
  displayPosts();
};

if (ready.value)
  displayPosts();
else
  blogStore.initData(data.value.blog, function () {
    displayPosts();
  });

</script>

<style scoped>
.more-posts {
  font-family: 'Montserrat', sans-serif;
  cursor: pointer;
  text-transform: uppercase;
  font-weight: 600;
  text-decoration: none;
  position: relative;
  display: inline-block;
  font-style: italic;
}

.more-posts::after {
  content: '';
  position: absolute;
  left: 0%;
  bottom: -2px;
  width: 50%;
  height: 2px;
  background-color: currentColor;
  transition: width 0.3s ease, left 0.3s ease;
}

.more-posts:hover::after {
  width: 100%;
  left: 0;
  transform: none;
}
</style>
