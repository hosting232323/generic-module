import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';

import { useChattyStore } from '@/stores/chatty.js';

beforeEach(() => {
  setActivePinia(createPinia());
});

describe('initData', () => {
  it('inizializza stato, primo messaggio e client http custom', () => {
    const store = useChattyStore();
    const httpClient = { makeRequest: vi.fn() };

    store.initData({ message: 'Ciao!', botId: 'bot-1' }, 'https://api.example/', httpClient);

    expect(store.messages).toEqual(['Ciao!']);
    expect(store.hostname).toBe('https://api.example/');
  });
});

describe('sendMessage - modalita\' non streaming', () => {
  it('accoda il messaggio utente e aggiunge la risposta del bot', async () => {
    const store = useChattyStore();
    const makeRequest = vi.fn((endpoint, method, options, callback) => {
      callback({ status: 'ok', response: 'Risposta bot', session_id: 'sess-1' });
    });
    store.initData({ message: 'Ciao!', botId: 'bot-1', session: true }, 'https://api.example/', { makeRequest });

    store.userMessage = 'Domanda utente';
    await store.sendMessage();

    expect(store.messages).toEqual(['Ciao!', 'Domanda utente', 'Risposta bot']);
    expect(store.sessionId).toBe('sess-1');
    expect(store.userMessage).toBe('');
    expect(store.loading).toBe(false);
    expect(store.showFaq).toBe(true);
    expect(makeRequest).toHaveBeenCalledWith(
      'chatty/chat', 'POST',
      expect.objectContaining({
        body: { message: 'Domanda utente', bot_id: 'bot-1', session_id: null },
        session: true,
        hostname: 'https://api.example/'
      }),
      expect.any(Function)
    );
  });

  it('senza un messaggio da inviare non fa nulla', async () => {
    const store = useChattyStore();
    const makeRequest = vi.fn();
    store.initData({ message: 'Ciao!', botId: 'bot-1' }, 'https://api.example/', { makeRequest });

    await store.sendMessage();

    expect(makeRequest).not.toHaveBeenCalled();
    expect(store.messages).toEqual(['Ciao!']);
  });
});

describe('sendMessage - modalita\' streaming', () => {
  it('assembla la risposta a chunk e ricava il session_id dal primo pacchetto', async () => {
    const store = useChattyStore();
    store.initData({ message: 'Ciao!', botId: 'bot-1', stream: true }, 'https://api.example/');

    const encoder = new TextEncoder();
    const reads = [
      { value: encoder.encode('{"session_id":"sess-2"}Hello '), done: false },
      { value: encoder.encode('world'), done: false },
      { value: undefined, done: true }
    ];
    let callIndex = 0;
    global.fetch = vi.fn(async () => ({
      body: { getReader: () => ({ read: async () => reads[callIndex++] }) }
    }));

    store.userMessage = 'Domanda utente';
    await store.sendMessage();

    expect(store.sessionId).toBe('sess-2');
    expect(store.messages).toEqual(['Ciao!', 'Domanda utente', 'Hello world']);
    expect(store.loading).toBe(false);
    expect(store.showFaq).toBe(true);
    expect(global.fetch).toHaveBeenCalledWith('https://api.example/chatty/stream-chat', expect.objectContaining({
      method: 'POST'
    }));
  });
});
