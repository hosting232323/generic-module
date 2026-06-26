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
    >
      <button
        v-for="(faq, index) in filteredFaqs"
        :key="index"
        class="faq-card"
        @click="clickFaq(faq)"
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
  return (data.value.faq || []).filter(
    faq => !clickedFaqs.value.has(faq.value)
  );
});

const clickFaq = (faq) => {
  if (clickedFaqs.value.has(faq.value)) return;

  clickedFaqs.value.add(faq.value);
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

<style scoped>
.fab-content {
  position: relative;
  flex-grow: 1;
  overflow-y: auto;
  padding: 0 25px 10px;
  display: flex;
  flex-direction: column;
}

.fab-content .bot {
  align-self: flex-start;
}

.fab-content .user {
  align-self: flex-end;
  border-radius: 25px 0 25px 25px !important;
}

.fab-content .msg {
  background-color: #fff;
  padding: 15px 20px;
  color: #000;
  border-radius: 25px;
  margin: 5px 0;
  line-height: 20px;
  display: inline-block;
}

.fab-content .msg p {
  width: auto;
}

.first {
  border-radius: 0 25px 25px 25px !important;
}

.fab-message {
  display: flex;
  flex-direction: column;
}

.fab-message .msg.bot ol {
  padding-left: 30px;
}

.fab-message .msg.bot ul {
  padding-left: 30px;
}

.fab-message .msg.bot img {
  height: 500px;
}

.fab-content .sender {
  display: flex;
  align-items: center;
  color: #000;
  margin-top: 15px;
}

.fab-content .bot_s img {
  height: 20px;
  margin-right: 8px;
}

.user_s {
  align-self: flex-end;
}

#faq {
  display: flex;
  flex-wrap: wrap;
  user-select: none;
  margin-top: 10px;
}

.faq-card {
  padding: 8px 15px;
  margin: 5px 10px 5px 0;
  border: 2px solid var(--theme-color);
  font-size: 15px;
  font-weight: 600;
  border-radius: 10px;
  background-color: #fff;
  color: var(--theme-color);
  text-align: center;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.faq-card:hover {
  background-color: var(--theme-color);
  color: #FFFFFF;
}

.loading-dots {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 20px;

  span {
    width: 10px;
    height: 10px;
    background-color: var(--theme-color);
    border-radius: 50%;
    display: inline-block;
    animation: bounce 1.4s infinite ease-in-out both;
  }

  span:nth-child(1) {
    animation-delay: -0.32s;
  }

  span:nth-child(2) {
    animation-delay: -0.16s;
  }

  span:nth-child(3) {
    animation-delay: 0s;
  }
}

.arrow-dynamic {
  position: fixed;
  bottom: 120px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
  background-color: #fff;
  color: #000; 
  width: 30px;
  height: 30px;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 4px 4px 0px rgb(0 0 0 / 20%);
  font-size: 12px;
  cursor: pointer;
}

.export-chat {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex-grow: 1;
  border-radius: 20px;
  padding: 20px;
  margin-bottom: 25%;
}

.export-chat h3 {
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
}

/* Export Chat Buttons */
.content-button {
  display: flex;
  justify-content: center;
  align-items: center;
}

.content-button button {
  height: 45px;
  width: 80px;
  margin: 0 10px;
  font-size: 18px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  color: white;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
}

.content-button button:nth-child(2) {
  background-color: #FF5733;
}

.content-button button:nth-child(1) {
  background-color: #4CAF50;
}

.content-button button:hover {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
  transform: scale(1.05);
}

/* Checkmark Animation */
.checkmark {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  display: block;
  stroke-width: 2;
  stroke: #4bb71b;
  stroke-miterlimit: 10;
  box-shadow: inset 0px 0px 0px #4bb71b;
  animation: fill .4s ease-in-out .4s forwards, scale .3s ease-in-out .9s both;
  position: relative;
  top: 5px;
  right: 5px;
  margin: 0 auto;
}

.checkmark__circle {
  stroke-dasharray: 166;
  stroke-dashoffset: 166;
  stroke-width: 2;
  stroke-miterlimit: 10;
  stroke: #4bb71b;
  fill: #eaeef3;
  animation: stroke 0.6s ease-in-out;
}

.checkmark__check {
  stroke-dasharray: 48;
  stroke-dashoffset: 48;
  animation: stroke 0.3s ease-in-out .4s forwards;
}

@keyframes stroke {
  100% {
    stroke-dashoffset: 0;
  }
}

@keyframes scale {
  0% {
    transform: none;
  }

  100% {
    transform: scale(1);
  }
}

@keyframes fill {
  0% {
    fill: none;
  }

  100% {
    fill: #eaeef3;
  }
}

@keyframes bounce {
  0%, 80%, 100% {
    transform: scale(0.6);
    opacity: 0.5;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
}

@media (min-width: 768px) and (max-width: 1440px) {
  .fab-content .sender {
    font-size: 13px;
  }
  .fab-content .msg {
    padding: 12px 16px;
    font-size: 14px;
  }
}
</style>
