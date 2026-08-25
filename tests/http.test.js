import assert from 'node:assert/strict';
import test from 'node:test';

import { createHttpClient } from '../src/utils/http.js';

const response = (status, data) => ({
  status,
  ok: status >= 200 && status < 300,
  statusText: '',
  json: async () => data
});

const deferred = () => {
  let resolve;
  const promise = new Promise(done => { resolve = done; });
  return { promise, resolve };
};

test('refresh sends the expired access token and retries with the new one', async t => {
  let token = 'expired-token';
  const calls = [];
  const originalFetch = globalThis.fetch;
  t.after(() => { globalThis.fetch = originalFetch; });

  globalThis.fetch = async (url, options) => {
    calls.push({ url: String(url), options });
    if (String(url).endsWith('/refresh'))
      return response(200, { status: 'ok', access_token: 'fresh-token' });
    if (calls.filter(call => call.url.endsWith('/resource')).length === 1)
      return response(401, { status: 'session' });
    return response(200, { status: 'ok' });
  };

  const client = createHttpClient({
    hostname: 'https://api.example',
    refreshEndpoint: '/refresh',
    getToken: () => token,
    setToken: value => { token = value; }
  });
  await new Promise(resolve => client.makeRequest('/resource', 'GET', {}, resolve));

  const refreshCall = calls.find(call => call.url.endsWith('/refresh'));
  const retryCall = calls.filter(call => call.url.endsWith('/resource'))[1];
  assert.equal(refreshCall.options.headers.Token, 'expired-token');
  assert.equal(retryCall.options.headers.Token, 'fresh-token');
});

test('a delayed 401 retries with the token already refreshed by another request', async t => {
  let token = 'expired-token';
  let refreshCalls = 0;
  let resourceCalls = 0;
  const firstResponses = [deferred(), deferred()];
  const originalFetch = globalThis.fetch;
  t.after(() => { globalThis.fetch = originalFetch; });

  globalThis.fetch = async (url) => {
    if (String(url).endsWith('/refresh')) {
      refreshCalls += 1;
      return response(200, { status: 'ok', access_token: 'fresh-token' });
    }
    resourceCalls += 1;
    if (resourceCalls <= 2)
      return firstResponses[resourceCalls - 1].promise;
    return response(200, { status: 'ok' });
  };

  const client = createHttpClient({
    hostname: 'https://api.example',
    refreshEndpoint: '/refresh',
    getToken: () => token,
    setToken: value => { token = value; }
  });
  const first = new Promise(resolve => client.makeRequest('/resource', 'GET', {}, resolve));
  const second = new Promise(resolve => client.makeRequest('/resource', 'GET', {}, resolve));

  firstResponses[0].resolve(response(401, { status: 'session' }));
  await first;
  firstResponses[1].resolve(response(401, { status: 'session' }));
  await second;

  assert.equal(refreshCalls, 1);
  assert.equal(resourceCalls, 4);
});