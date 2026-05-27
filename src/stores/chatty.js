import http from '@/utils/http';
import { defineStore } from 'pinia';
import productionData from '@/productionData';
import { useRouter } from 'vue-router';

export const useChattyStore = defineStore('chatty:genericFeStore', {
  state: () => ({
    data: {},
    messages: [],
    loading: false,
    showFaq: false,
    hostname: null,
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

      const body = { message: messageToSend, bot_id: this.data.botId, session_id: sessionId.value };
      if (botData.stream) {
        await streamMessage(`${this.hostname}chatty/stream-chat`, body);
      } else {
        http.postRequest('chatty/chat',
          body, 
          (data) => {
            if(data.status == 'ok') {
              this.messages.push(data.response);
              sessionId.value = data.session_id;
            }
            this.loading = false;
            this.showFaq = true;
          }, 'POST', router, this.hostname);
        scrollToBottom();
      }
    }
}
});
