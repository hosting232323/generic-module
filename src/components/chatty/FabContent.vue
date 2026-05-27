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
import { computed, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { useChattyStore } from '@/stores/chatty';

const chattyStore = useChattyStore();
const { data, exportMode, messages, userMessage } = storeToRefs(chattyStore);

const showFaq = ref(true);
const router = useRouter();
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
</script>
