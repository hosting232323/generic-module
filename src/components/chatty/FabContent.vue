<template>
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
          :src="data.image"
          alt="botAvatar"
        >
        <p>{{ index % 2 === 0 ? data.name : 'Tu' }}</p>
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
    <div
      v-show="showArrow"
      class="arrow-dynamic"
      @click="scrollToBottom"
    >
      <v-icon>mdi-arrow-down</v-icon>
    </div>
  </main>
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
</template>

<script setup>
import { marked } from 'marked';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { useChattyStore } from '@/stores/chatty';
import { computed, ref, nextTick, watch, onMounted } from 'vue';

const chattyStore = useChattyStore();
const { data, exportMode, messages, userMessage, loading, showFaq } = storeToRefs(chattyStore);

const router = useRouter();
const showArrow = ref(false);
const fabContent = ref(null);
const exportSuccess = ref(false);
const clickedFaqs = ref(new Set());

const filteredFaqs = computed(() => {
  return data.value.faq || [];
});

const clickFaq = (faq, index) => {
  if (clickedFaqs.value.has(index)) return;

  clickedFaqs.value.add(index);
  userMessage.value = faq.value;
  chattyStore.sendMessage(router);
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
      return `${index % 2 === 0 ? data.value.name : 'Utente'}: ${msg.replace(/<[^>]+>/g, '').trim()}`;
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

watch(messages, async () => {
  await nextTick();
  checkScroll();
});

onMounted(() => {
  if (fabContent.value) {
    fabContent.value.addEventListener('scroll', checkScroll);
    checkScroll();
  }
});
</script>
