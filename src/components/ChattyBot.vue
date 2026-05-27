<template>
  <div
    ref="fabButton"
    class="fab"
    @click="toggleWheel('open')"
  >
    <div class="fab-dots fab-dots-1" />
    <div class="fab-dots fab-dots-2" />
    <div class="fab-dots fab-dots-3" />
  </div>
  <div
    ref="fabWheel"
    class="fab-wheel"
  >
    <FabNav @toggle-wheel="toggleWheel"/>
    <FabContent />
  
    <div 
      v-if="!exportMode"
      class="fab-send"
    >
      <input
        v-model="userMessage"
        type="text"
        placeholder="Scrivi qui..."
        :disabled="loading"
        @keyup.enter="sendMessage"
      >
      <button 
        :disabled="loading"  
        @click="sendMessage"
      >
        <v-icon>mdi-send-circle</v-icon>
      </button>
    </div>

    <footer class="fab-footer">
      <p>
        Powered by
        <a
          class="link-decoration"
          target="_blank"
          href="https://fastsite.it"
        >FastSite</a>
      </p>
    </footer>
    <div
      v-show="showArrow"
      class="arrow-dynamic"
      @click="scrollToBottom"
    >
      <v-icon>mdi-arrow-down</v-icon>
    </div>
  </div>
</template>

<script setup>
import '@/styles/chatty.scss';

import http from '@/utils/http';
import { marked } from 'marked';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { useChattyStore } from '@/stores/chatty';
import { ref, onMounted, nextTick, watch, computed } from 'vue';

import FabNav from '@/components/chatty/FabNav';
import FabContent from '@/components/chatty/FabContent';

const chattyStore = useChattyStore();

const router = useRouter();
const loading = ref(false);
const fabWheel = ref(null);
const sessionId = ref(null);
const fabButton = ref(null);
const fabContent = ref(null);
const showArrow = ref(false);
const exportMode = ref(false);
const userMessage = ref(null);
const exportSuccess = ref(false);

const showFaq = ref(true);
const clickedFaqs = ref(new Set());

const { hostname, botData } = defineProps({
  hostname: {
    type: String,
    required: true
  },
  botData: {
    type: Object,
    required: true
  }
});

chattyStore.initData(botData, hostname)

const messages = ref([botData.message]);
console.log(messages.value);

const colorPaletteDefault = {
  theme_color: '#126EE2',
  theme_color_hover: '#2C87E8',
  fab_hover: '#2C87E8',
  fab_shadow: '#81A4F1',
  fab_border: '#0C50A7'
};

const toggleWheel = (mode) => {
  fabWheel.value.style.transform = mode == 'open' ? 'scale(1)' : 'scale(0)';
  fabButton.value.style.transform = mode == 'open' ? 'scale(0)' : 'scale(1)';
};

const sendMessage = async () => {
  if (!userMessage.value) return;

  loading.value = true;
  showFaq.value = false;

  const messageToSend = userMessage.value;
  userMessage.value = '';
  messages.value.push(messageToSend);

  const body = { message: messageToSend, bot_id: botData.botId, session_id: sessionId.value };
  if (botData.stream) {
    await streamMessage(`${hostname}chatty/stream-chat`, body);
  } else {
    http.postRequest('chatty/chat',
      body, 
      (data) => {
        if(data.status == 'ok') {
          messages.value.push(data.response);
          sessionId.value = data.session_id;
        }
        loading.value = false;
        showFaq.value = true;
      }, 'POST', router, hostname);
    scrollToBottom();
  }
};

const streamMessage = async (url, body) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });

  const reader = response.body.getReader();
  const decoder = new TextDecoder();

  let done = false;
  let firstContentReceived = false;
  const botIndex = messages.value.push('') - 1;

  while (!done) {
    const { value, done: doneReading } = await reader.read();
    done = doneReading;

    let chunk = decoder.decode(value);

    if (chunk.includes('"session_id"')) {
      const jsonEnd = chunk.indexOf('}') + 1;
      const jsonPart = chunk.slice(0, jsonEnd);
      sessionId.value = JSON.parse(jsonPart).session_id;
      chunk = chunk.slice(jsonEnd);
    }

    if (chunk.trim()) {
      messages.value[botIndex] += chunk;

      if (!firstContentReceived) {
        firstContentReceived = true;
        loading.value = false;
      }
    }

    await nextTick();
    scrollToBottom();
  }

  loading.value = false;
  showFaq.value = true;
};

const checkScroll = () => {
  if (!fabContent.value) return;

  const el = fabContent.value;
  showArrow.value = el.scrollHeight - el.scrollTop - el.clientHeight > 10;
};

const scrollToBottom = () => {
  if (!fabContent.value) return;

  fabContent.value.scrollTo({
    top: fabContent.value.scrollHeight,
    behavior: 'smooth'
  });
  showArrow.value = false;
};

const exportChat = async () => {
  exportSuccess.value = false;
  const link = document.createElement('a');
  link.href = URL.createObjectURL(new Blob([
    messages.value.map((msg, index) => {
      return `${index % 2 === 0 ? botData.name : 'Utente'}: ${msg.replace(/<[^>]+>/g, '').trim()}`;
    }).join('\n')
  ], { type: 'text/plain' }));
  link.download = 'chat_messages.txt';
  link.click();

  exportSuccess.value = true;
  setTimeout(() => {
    exportSuccess.value = false;
    exportMode.value = false;
  }, 2000);
};

const colorPalette = computed(() => {
  return botData.color || colorPaletteDefault;
});

watch(messages, async () => {
  await nextTick();
  checkScroll();
});

watch(colorPalette, (palette) => {
  document.documentElement.style.setProperty('--theme-color', palette.theme_color);
  document.documentElement.style.setProperty('--theme-color-hover', palette.theme_color_hover);
  document.documentElement.style.setProperty('--fab-hover', palette.fab_hover);
  document.documentElement.style.setProperty('--fab-shadow', palette.fab_shadow);
  document.documentElement.style.setProperty('--fab-border', palette.fab_border);
}, { immediate: true });

onMounted(() => {
  if (fabContent.value) {
    fabContent.value.addEventListener('scroll', checkScroll);
    checkScroll();
  }
});
</script>
