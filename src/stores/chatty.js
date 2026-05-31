import { nextTick } from 'vue';
import http from '@/utils/http';
import { defineStore } from 'pinia';

export const useChattyStore = defineStore('chatty:genericFeStore', {
  state: () => ({
    data: {},
    messages: [],
    loading: false,
    showFaq: true,
    hostname: null,
    sessionId: null,
    userMessage: null,
    exportMode: false,
  }),
  actions: {
    initData(data, hostname) {
      this.data = data;
      this.hostname = hostname;
      this.messages = [data.message];
    },
    async sendMessage (router) {
      if (!this.userMessage) return;

      this.loading = true;
      this.showFaq = false;

      const messageToSend = this.userMessage;
      this.userMessage = '';
      this.messages.push(messageToSend);

      const body = { message: messageToSend, bot_id: this.data.botId, session_id: this.sessionId };
      if (this.data.stream) {
        await this.streamMessage(`${this.hostname}chatty/stream-chat`, body);
      } else {
        http.postRequest('chatty/chat',
          body, 
          (data) => {
            if(data.status == 'ok') {
              this.messages.push(data.response);
              this.sessionId = data.session_id;
            }
            this.loading = false;
            this.showFaq = true;
          }, 'POST', router, this.hostname);
      }
    },
    async streamMessage (url, body) {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      let done = false;
      let firstContentReceived = false;
      const botIndex = this.messages.push('') - 1;

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;

        let chunk = decoder.decode(value);

        if (chunk.includes('"session_id"')) {
          const jsonEnd = chunk.indexOf('}') + 1;
          const jsonPart = chunk.slice(0, jsonEnd);
          this.sessionId = JSON.parse(jsonPart).session_id;
          chunk = chunk.slice(jsonEnd);
        }

        if (chunk.trim()) {
          this.messages[botIndex] += chunk;

          if (!firstContentReceived) {
            firstContentReceived = true;
            this.loading = false;
          }
        }

        await nextTick();
      }
      this.loading = false;
      this.showFaq = true;
    }
  }
});
