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
    <nav class="fab-nav">
      <v-icon
        v-if="!exportMode"
        @click="exportMode = true"
      >
        mdi-content-save
      </v-icon>
      <v-icon
        v-if="exportMode"
        @click="exportMode = false"
      >
        mdi-restore
      </v-icon>
      <div class="avatar">
        <img
          :src="botData.image"
          alt="botAvatar"
        >
        <p>{{ botData.name }}</p>
      </div> 
      <div
        class="close"
        @click="toggleWheel('close')"
      >
        <div class="line" />
        <div class="line" />
      </div>
    </nav>
    <main
      v-if="!exportMode"
      ref="fabContent"
      class="fab-content"
    >
      <div
        v-for="(message, index) in messages"
        :key="index"
        class="fab-message"
      >
        <div :class="{sender: true, bot_s: index % 2 === 0, user_s: index % 2 !== 0}">
          <img
            v-if="index % 2 === 0"
            :src="botData.image"
            alt="botAvatar"
          >
          <p>{{ index % 2 === 0 ? botData.name : 'Tu' }}</p>
        </div>

        <!-- eslint-disable vue/no-v-html -->
        <div
          v-show="message !== ''"
          :class="{msg: true, bot: index % 2 === 0, user: index % 2 !== 0}"
          v-html="marked.parse(message)"
        />
        <!-- eslint-enable vue/no-v-html -->

        <div
          v-if="loading && index == messages.length - 1"
          class="msg bot"
        >
          <span class="loading-dots"><span /><span /><span /></span>
        </div>
      </div>
      <div
        v-if="showFaq && filteredFaqs.length"
        class="faq-container"
      >
        <button
          v-for="(faq, index) in filteredFaqs"
          :key="index"
          class="faq-card"
          @click="clickFaq(faq, index)"
        >
          {{ faq.name }}
        </button>
      </div>
    </main>
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
    <div
      v-else
      class="export-chat"
    >
      <h3 v-if="!exportSuccess">
        Vuoi esportare la chat?
      </h3>
      <div
        v-if="!exportSuccess"
        class="content-button"
      >
        <button @click="exportChat">
          Si
        </button>
        <button @click="exportMode = false">
          No
        </button>
      </div>
      <div
        v-else
        class="successExport"
      >
        <div class="success-animation">
          <svg
            class="checkmark"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 52 52"
          >
            <circle
              class="checkmark__circle"
              cx="26"
              cy="26"
              r="25"
              fill="none"
            />
            <path
              class="checkmark__check"
              fill="none"
              d="M14.1 27.2l7.1 7.2 16.7-16.8"
            />
          </svg>
        </div>
      </div>
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
import { useRouter } from 'vue-router';
import { ref, onMounted, nextTick, watch, computed } from 'vue';

const router = useRouter();
const loading = ref(false);
const fabWheel = ref(null);
const threadId = ref(null);
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
const messages = ref([botData.message]);

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

  if (botData.vectorStoreId) {
    http.postRequest('vector-store/chat', {
      message: messageToSend,
      vector_store_id: botData.vectorStoreId
    }, (data) => {
      if(data.status == 'ok') {
        messages.value.push(data.response);
        threadId.value = data.thread_id;
      }
      loading.value = false;
      showFaq.value = true;
    }, 'POST', router, hostname);
  } else {
    let botIndex = messages.value.length;
    messages.value.push('');

    const response = await fetch(`${hostname}stream-chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: messageToSend,
        bot_id: botData.id,
        assistant_id: botData.assistantId,
        thread_id: threadId.value
      })
    });

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    let done = false;
    let firstContentReceived = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;

      let chunk = decoder.decode(value);

      if (chunk.includes('"thread_id"')) {
        const jsonEnd = chunk.indexOf('}') + 1;
        const jsonPart = chunk.slice(0, jsonEnd);
        threadId.value = JSON.parse(jsonPart).thread_id;
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
  }
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

const filteredFaqs = computed(() => {
  return botData.faq || [];
});

const colorPalette = computed(() => {
  return botData.color || colorPaletteDefault;
});

const clickFaq = (faq, index) => {
  if (clickedFaqs.value.has(index)) return;

  clickedFaqs.value.add(index);
  userMessage.value = faq.value;
  sendMessage();
};

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
