var nf = Object.defineProperty;
var sf = (t, e, n) => e in t ? nf(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var El = (t, e, n) => (sf(t, typeof e != "symbol" ? e + "" : e, n), n);
import { Fragment as Ee, reactive as sc, computed as w, watchEffect as _r, toRefs as rc, capitalize as xs, warn as oc, defineComponent as rf, camelize as ac, h as bi, getCurrentInstance as of, ref as J, unref as te, provide as mt, inject as Ye, shallowRef as ye, createVNode as v, isRef as Cs, mergeProps as Oe, toRef as re, Text as af, Transition as vr, watch as pe, onBeforeMount as lc, nextTick as Ht, onBeforeUnmount as Ft, withDirectives as Xe, resolveDirective as Sn, vShow as Ii, onScopeDispose as lf, effectScope as uf, toRaw as $n, resolveDynamicComponent as cf, onMounted as bn, openBlock as le, createBlock as Te, withCtx as U, createElementVNode as Ie, normalizeStyle as Gn, readonly as uc, onUnmounted as hf, createElementBlock as it, renderList as zn, createCommentVNode as Zt, TransitionGroup as df, cloneVNode as ff, vModelText as gf, withModifiers as mf, createTextVNode as wl, normalizeClass as Sl } from "vue";
import { defineStore as _f } from "pinia";
class vf {
  /**
   * @param {string} type Type.
   */
  constructor(e) {
    this.propagationStopped, this.defaultPrevented, this.type = e, this.target = null;
  }
  /**
   * Prevent default. This means that no emulated `click`, `singleclick` or `doubleclick` events
   * will be fired.
   * @api
   */
  preventDefault() {
    this.defaultPrevented = !0;
  }
  /**
   * Stop event propagation.
   * @api
   */
  stopPropagation() {
    this.propagationStopped = !0;
  }
}
const sn = vf, yi = {
  /**
   * Triggered when a property is changed.
   * @event module:ol/Object.ObjectEvent#propertychange
   * @api
   */
  PROPERTYCHANGE: "propertychange"
};
class yf {
  constructor() {
    this.disposed = !1;
  }
  /**
   * Clean up.
   */
  dispose() {
    this.disposed || (this.disposed = !0, this.disposeInternal());
  }
  /**
   * Extension point for disposable objects.
   * @protected
   */
  disposeInternal() {
  }
}
const ta = yf;
function pf(t, e, n) {
  let i, s;
  n = n || qt;
  let r = 0, o = t.length, a = !1;
  for (; r < o; )
    i = r + (o - r >> 1), s = +n(t[i], e), s < 0 ? r = i + 1 : (o = i, a = !s);
  return a ? r : ~r;
}
function qt(t, e) {
  return t > e ? 1 : t < e ? -1 : 0;
}
function na(t, e, n) {
  if (t[0] <= e)
    return 0;
  const i = t.length;
  if (e <= t[i - 1])
    return i - 1;
  if (typeof n == "function") {
    for (let s = 1; s < i; ++s) {
      const r = t[s];
      if (r === e)
        return s;
      if (r < e)
        return n(e, t[s - 1], r) > 0 ? s - 1 : s;
    }
    return i - 1;
  }
  if (n > 0) {
    for (let s = 1; s < i; ++s)
      if (t[s] < e)
        return s - 1;
    return i - 1;
  }
  if (n < 0) {
    for (let s = 1; s < i; ++s)
      if (t[s] <= e)
        return s;
    return i - 1;
  }
  for (let s = 1; s < i; ++s) {
    if (t[s] == e)
      return s;
    if (t[s] < e)
      return t[s - 1] - e < e - t[s] ? s - 1 : s;
  }
  return i - 1;
}
function xf(t, e, n) {
  for (; e < n; ) {
    const i = t[e];
    t[e] = t[n], t[n] = i, ++e, --n;
  }
}
function ia(t, e) {
  const n = Array.isArray(e) ? e : [e], i = n.length;
  for (let s = 0; s < i; s++)
    t[t.length] = n[s];
}
function In(t, e) {
  const n = t.length;
  if (n !== e.length)
    return !1;
  for (let i = 0; i < n; i++)
    if (t[i] !== e[i])
      return !1;
  return !0;
}
function Cf(t, e, n) {
  const i = e || qt;
  return t.every(function(s, r) {
    if (r === 0)
      return !0;
    const o = i(t[r - 1], s);
    return !(o > 0 || n && o === 0);
  });
}
function ts() {
  return !0;
}
function yr() {
  return !1;
}
function pi() {
}
function cc(t) {
  let e = !1, n, i, s;
  return function() {
    const r = Array.prototype.slice.call(arguments);
    return (!e || this !== s || !In(r, i)) && (e = !0, s = this, i = r, n = t.apply(this, arguments)), n;
  };
}
function Ef(t) {
  function e() {
    let n;
    try {
      n = t();
    } catch (i) {
      return Promise.reject(i);
    }
    return n instanceof Promise ? n : Promise.resolve(n);
  }
  return e();
}
function Es(t) {
  for (const e in t)
    delete t[e];
}
function xi(t) {
  let e;
  for (e in t)
    return !1;
  return !e;
}
class wf extends ta {
  /**
   * @param {*} [target] Default event target for dispatched events.
   */
  constructor(e) {
    super(), this.eventTarget_ = e, this.pendingRemovals_ = null, this.dispatching_ = null, this.listeners_ = null;
  }
  /**
   * @param {string} type Type.
   * @param {import("../events.js").Listener} listener Listener.
   */
  addEventListener(e, n) {
    if (!e || !n)
      return;
    const i = this.listeners_ || (this.listeners_ = {}), s = i[e] || (i[e] = []);
    s.includes(n) || s.push(n);
  }
  /**
   * Dispatches an event and calls all listeners listening for events
   * of this type. The event parameter can either be a string or an
   * Object with a `type` property.
   *
   * @param {import("./Event.js").default|string} event Event object.
   * @return {boolean|undefined} `false` if anyone called preventDefault on the
   *     event object or if any of the listeners returned false.
   * @api
   */
  dispatchEvent(e) {
    const n = typeof e == "string", i = n ? e : e.type, s = this.listeners_ && this.listeners_[i];
    if (!s)
      return;
    const r = n ? new sn(e) : (
      /** @type {Event} */
      e
    );
    r.target || (r.target = this.eventTarget_ || this);
    const o = this.dispatching_ || (this.dispatching_ = {}), a = this.pendingRemovals_ || (this.pendingRemovals_ = {});
    i in o || (o[i] = 0, a[i] = 0), ++o[i];
    let l;
    for (let u = 0, c = s.length; u < c; ++u)
      if ("handleEvent" in s[u] ? l = /** @type {import("../events.js").ListenerObject} */
      s[u].handleEvent(r) : l = /** @type {import("../events.js").ListenerFunction} */
      s[u].call(this, r), l === !1 || r.propagationStopped) {
        l = !1;
        break;
      }
    if (--o[i] === 0) {
      let u = a[i];
      for (delete a[i]; u--; )
        this.removeEventListener(i, pi);
      delete o[i];
    }
    return l;
  }
  /**
   * Clean up.
   */
  disposeInternal() {
    this.listeners_ && Es(this.listeners_);
  }
  /**
   * Get the listeners for a specified event type. Listeners are returned in the
   * order that they will be called in.
   *
   * @param {string} type Type.
   * @return {Array<import("../events.js").Listener>|undefined} Listeners.
   */
  getListeners(e) {
    return this.listeners_ && this.listeners_[e] || void 0;
  }
  /**
   * @param {string} [type] Type. If not provided,
   *     `true` will be returned if this event target has any listeners.
   * @return {boolean} Has listeners.
   */
  hasListener(e) {
    return this.listeners_ ? e ? e in this.listeners_ : Object.keys(this.listeners_).length > 0 : !1;
  }
  /**
   * @param {string} type Type.
   * @param {import("../events.js").Listener} listener Listener.
   */
  removeEventListener(e, n) {
    if (!this.listeners_)
      return;
    const i = this.listeners_[e];
    if (!i)
      return;
    const s = i.indexOf(n);
    s !== -1 && (this.pendingRemovals_ && e in this.pendingRemovals_ ? (i[s] = pi, ++this.pendingRemovals_[e]) : (i.splice(s, 1), i.length === 0 && delete this.listeners_[e]));
  }
}
const pr = wf, H = {
  /**
   * Generic change event. Triggered when the revision counter is increased.
   * @event module:ol/events/Event~BaseEvent#change
   * @api
   */
  CHANGE: "change",
  /**
   * Generic error event. Triggered when an error occurs.
   * @event module:ol/events/Event~BaseEvent#error
   * @api
   */
  ERROR: "error",
  BLUR: "blur",
  CLEAR: "clear",
  CONTEXTMENU: "contextmenu",
  CLICK: "click",
  DBLCLICK: "dblclick",
  DRAGENTER: "dragenter",
  DRAGOVER: "dragover",
  DROP: "drop",
  FOCUS: "focus",
  KEYDOWN: "keydown",
  KEYPRESS: "keypress",
  LOAD: "load",
  RESIZE: "resize",
  TOUCHMOVE: "touchmove",
  WHEEL: "wheel"
};
function he(t, e, n, i, s) {
  if (i && i !== t && (n = n.bind(i)), s) {
    const o = n;
    n = function() {
      t.removeEventListener(e, n), o.apply(this, arguments);
    };
  }
  const r = {
    target: t,
    type: e,
    listener: n
  };
  return t.addEventListener(e, n), r;
}
function er(t, e, n, i) {
  return he(t, e, n, i, !0);
}
function Ce(t) {
  t && t.target && (t.target.removeEventListener(t.type, t.listener), Es(t));
}
class xr extends pr {
  constructor() {
    super(), this.on = /** @type {ObservableOnSignature<import("./events").EventsKey>} */
    this.onInternal, this.once = /** @type {ObservableOnSignature<import("./events").EventsKey>} */
    this.onceInternal, this.un = /** @type {ObservableOnSignature<void>} */
    this.unInternal, this.revision_ = 0;
  }
  /**
   * Increases the revision counter and dispatches a 'change' event.
   * @api
   */
  changed() {
    ++this.revision_, this.dispatchEvent(H.CHANGE);
  }
  /**
   * Get the version number for this object.  Each time the object is modified,
   * its version number will be incremented.
   * @return {number} Revision.
   * @api
   */
  getRevision() {
    return this.revision_;
  }
  /**
   * @param {string|Array<string>} type Type.
   * @param {function((Event|import("./events/Event").default)): ?} listener Listener.
   * @return {import("./events.js").EventsKey|Array<import("./events.js").EventsKey>} Event key.
   * @protected
   */
  onInternal(e, n) {
    if (Array.isArray(e)) {
      const i = e.length, s = new Array(i);
      for (let r = 0; r < i; ++r)
        s[r] = he(this, e[r], n);
      return s;
    }
    return he(
      this,
      /** @type {string} */
      e,
      n
    );
  }
  /**
   * @param {string|Array<string>} type Type.
   * @param {function((Event|import("./events/Event").default)): ?} listener Listener.
   * @return {import("./events.js").EventsKey|Array<import("./events.js").EventsKey>} Event key.
   * @protected
   */
  onceInternal(e, n) {
    let i;
    if (Array.isArray(e)) {
      const s = e.length;
      i = new Array(s);
      for (let r = 0; r < s; ++r)
        i[r] = er(this, e[r], n);
    } else
      i = er(
        this,
        /** @type {string} */
        e,
        n
      );
    return n.ol_key = i, i;
  }
  /**
   * Unlisten for a certain type of event.
   * @param {string|Array<string>} type Type.
   * @param {function((Event|import("./events/Event").default)): ?} listener Listener.
   * @protected
   */
  unInternal(e, n) {
    const i = (
      /** @type {Object} */
      n.ol_key
    );
    if (i)
      Sf(i);
    else if (Array.isArray(e))
      for (let s = 0, r = e.length; s < r; ++s)
        this.removeEventListener(e[s], n);
    else
      this.removeEventListener(e, n);
  }
}
xr.prototype.on;
xr.prototype.once;
xr.prototype.un;
function Sf(t) {
  if (Array.isArray(t))
    for (let e = 0, n = t.length; e < n; ++e)
      Ce(t[e]);
  else
    Ce(
      /** @type {import("./events.js").EventsKey} */
      t
    );
}
const hc = xr;
function ce() {
  throw new Error("Unimplemented abstract method.");
}
let bf = 0;
function fe(t) {
  return t.ol_uid || (t.ol_uid = String(++bf));
}
class bl extends sn {
  /**
   * @param {string} type The event type.
   * @param {string} key The property name.
   * @param {*} oldValue The old value for `key`.
   */
  constructor(e, n, i) {
    super(e), this.key = n, this.oldValue = i;
  }
}
class If extends hc {
  /**
   * @param {Object<string, *>} [values] An object with key-value pairs.
   */
  constructor(e) {
    super(), this.on, this.once, this.un, fe(this), this.values_ = null, e !== void 0 && this.setProperties(e);
  }
  /**
   * Gets a value.
   * @param {string} key Key name.
   * @return {*} Value.
   * @api
   */
  get(e) {
    let n;
    return this.values_ && this.values_.hasOwnProperty(e) && (n = this.values_[e]), n;
  }
  /**
   * Get a list of object property names.
   * @return {Array<string>} List of property names.
   * @api
   */
  getKeys() {
    return this.values_ && Object.keys(this.values_) || [];
  }
  /**
   * Get an object of all property names and values.
   * @return {Object<string, *>} Object.
   * @api
   */
  getProperties() {
    return this.values_ && Object.assign({}, this.values_) || {};
  }
  /**
   * Get an object of all property names and values.
   * @return {Object<string, *>?} Object.
   */
  getPropertiesInternal() {
    return this.values_;
  }
  /**
   * @return {boolean} The object has properties.
   */
  hasProperties() {
    return !!this.values_;
  }
  /**
   * @param {string} key Key name.
   * @param {*} oldValue Old value.
   */
  notify(e, n) {
    let i;
    i = `change:${e}`, this.hasListener(i) && this.dispatchEvent(new bl(i, e, n)), i = yi.PROPERTYCHANGE, this.hasListener(i) && this.dispatchEvent(new bl(i, e, n));
  }
  /**
   * @param {string} key Key name.
   * @param {import("./events.js").Listener} listener Listener.
   */
  addChangeListener(e, n) {
    this.addEventListener(`change:${e}`, n);
  }
  /**
   * @param {string} key Key name.
   * @param {import("./events.js").Listener} listener Listener.
   */
  removeChangeListener(e, n) {
    this.removeEventListener(`change:${e}`, n);
  }
  /**
   * Sets a value.
   * @param {string} key Key name.
   * @param {*} value Value.
   * @param {boolean} [silent] Update without triggering an event.
   * @api
   */
  set(e, n, i) {
    const s = this.values_ || (this.values_ = {});
    if (i)
      s[e] = n;
    else {
      const r = s[e];
      s[e] = n, r !== n && this.notify(e, r);
    }
  }
  /**
   * Sets a collection of key-value pairs.  Note that this changes any existing
   * properties and adds new ones (it does not remove any existing properties).
   * @param {Object<string, *>} values Values.
   * @param {boolean} [silent] Update without triggering an event.
   * @api
   */
  setProperties(e, n) {
    for (const i in e)
      this.set(i, e[i], n);
  }
  /**
   * Apply any properties from another object without triggering events.
   * @param {BaseObject} source The source object.
   * @protected
   */
  applyProperties(e) {
    e.values_ && Object.assign(this.values_ || (this.values_ = {}), e.values_);
  }
  /**
   * Unsets a property.
   * @param {string} key Key name.
   * @param {boolean} [silent] Unset without triggering an event.
   * @api
   */
  unset(e, n) {
    if (this.values_ && e in this.values_) {
      const i = this.values_[e];
      delete this.values_[e], xi(this.values_) && (this.values_ = null), n || this.notify(e, i);
    }
  }
}
const Nt = If, Ke = {
  /**
   * Triggered when an item is added to the collection.
   * @event module:ol/Collection.CollectionEvent#add
   * @api
   */
  ADD: "add",
  /**
   * Triggered when an item is removed from the collection.
   * @event module:ol/Collection.CollectionEvent#remove
   * @api
   */
  REMOVE: "remove"
}, Il = {
  LENGTH: "length"
};
class Ns extends sn {
  /**
   * @param {import("./CollectionEventType.js").default} type Type.
   * @param {T} element Element.
   * @param {number} index The index of the added or removed element.
   */
  constructor(e, n, i) {
    super(e), this.element = n, this.index = i;
  }
}
class Tf extends Nt {
  /**
   * @param {Array<T>} [array] Array.
   * @param {Options} [options] Collection options.
   */
  constructor(e, n) {
    if (super(), this.on, this.once, this.un, n = n || {}, this.unique_ = !!n.unique, this.array_ = e || [], this.unique_)
      for (let i = 0, s = this.array_.length; i < s; ++i)
        this.assertUnique_(this.array_[i], i);
    this.updateLength_();
  }
  /**
   * Remove all elements from the collection.
   * @api
   */
  clear() {
    for (; this.getLength() > 0; )
      this.pop();
  }
  /**
   * Add elements to the collection.  This pushes each item in the provided array
   * to the end of the collection.
   * @param {!Array<T>} arr Array.
   * @return {Collection<T>} This collection.
   * @api
   */
  extend(e) {
    for (let n = 0, i = e.length; n < i; ++n)
      this.push(e[n]);
    return this;
  }
  /**
   * Iterate over each element, calling the provided callback.
   * @param {function(T, number, Array<T>): *} f The function to call
   *     for every element. This function takes 3 arguments (the element, the
   *     index and the array). The return value is ignored.
   * @api
   */
  forEach(e) {
    const n = this.array_;
    for (let i = 0, s = n.length; i < s; ++i)
      e(n[i], i, n);
  }
  /**
   * Get a reference to the underlying Array object. Warning: if the array
   * is mutated, no events will be dispatched by the collection, and the
   * collection's "length" property won't be in sync with the actual length
   * of the array.
   * @return {!Array<T>} Array.
   * @api
   */
  getArray() {
    return this.array_;
  }
  /**
   * Get the element at the provided index.
   * @param {number} index Index.
   * @return {T} Element.
   * @api
   */
  item(e) {
    return this.array_[e];
  }
  /**
   * Get the length of this collection.
   * @return {number} The length of the array.
   * @observable
   * @api
   */
  getLength() {
    return this.get(Il.LENGTH);
  }
  /**
   * Insert an element at the provided index.
   * @param {number} index Index.
   * @param {T} elem Element.
   * @api
   */
  insertAt(e, n) {
    if (e < 0 || e > this.getLength())
      throw new Error("Index out of bounds: " + e);
    this.unique_ && this.assertUnique_(n), this.array_.splice(e, 0, n), this.updateLength_(), this.dispatchEvent(
      new Ns(Ke.ADD, n, e)
    );
  }
  /**
   * Remove the last element of the collection and return it.
   * Return `undefined` if the collection is empty.
   * @return {T|undefined} Element.
   * @api
   */
  pop() {
    return this.removeAt(this.getLength() - 1);
  }
  /**
   * Insert the provided element at the end of the collection.
   * @param {T} elem Element.
   * @return {number} New length of the collection.
   * @api
   */
  push(e) {
    this.unique_ && this.assertUnique_(e);
    const n = this.getLength();
    return this.insertAt(n, e), this.getLength();
  }
  /**
   * Remove the first occurrence of an element from the collection.
   * @param {T} elem Element.
   * @return {T|undefined} The removed element or undefined if none found.
   * @api
   */
  remove(e) {
    const n = this.array_;
    for (let i = 0, s = n.length; i < s; ++i)
      if (n[i] === e)
        return this.removeAt(i);
  }
  /**
   * Remove the element at the provided index and return it.
   * Return `undefined` if the collection does not contain this index.
   * @param {number} index Index.
   * @return {T|undefined} Value.
   * @api
   */
  removeAt(e) {
    if (e < 0 || e >= this.getLength())
      return;
    const n = this.array_[e];
    return this.array_.splice(e, 1), this.updateLength_(), this.dispatchEvent(
      /** @type {CollectionEvent<T>} */
      new Ns(Ke.REMOVE, n, e)
    ), n;
  }
  /**
   * Set the element at the provided index.
   * @param {number} index Index.
   * @param {T} elem Element.
   * @api
   */
  setAt(e, n) {
    const i = this.getLength();
    if (e >= i) {
      this.insertAt(e, n);
      return;
    }
    if (e < 0)
      throw new Error("Index out of bounds: " + e);
    this.unique_ && this.assertUnique_(n, e);
    const s = this.array_[e];
    this.array_[e] = n, this.dispatchEvent(
      /** @type {CollectionEvent<T>} */
      new Ns(Ke.REMOVE, s, e)
    ), this.dispatchEvent(
      /** @type {CollectionEvent<T>} */
      new Ns(Ke.ADD, n, e)
    );
  }
  /**
   * @private
   */
  updateLength_() {
    this.set(Il.LENGTH, this.array_.length);
  }
  /**
   * @private
   * @param {T} elem Element.
   * @param {number} [except] Optional index to ignore.
   */
  assertUnique_(e, n) {
    for (let i = 0, s = this.array_.length; i < s; ++i)
      if (this.array_[i] === e && i !== n)
        throw new Error("Duplicate item added to a unique collection");
  }
}
const Lt = Tf, ge = {
  OPACITY: "opacity",
  VISIBLE: "visible",
  EXTENT: "extent",
  Z_INDEX: "zIndex",
  MAX_RESOLUTION: "maxResolution",
  MIN_RESOLUTION: "minResolution",
  MAX_ZOOM: "maxZoom",
  MIN_ZOOM: "minZoom",
  SOURCE: "source",
  MAP: "map"
};
function ue(t, e) {
  if (!t)
    throw new Error(e);
}
function Re(t, e, n) {
  return Math.min(Math.max(t, e), n);
}
function Rf(t, e, n, i, s, r) {
  const o = s - n, a = r - i;
  if (o !== 0 || a !== 0) {
    const l = ((t - n) * o + (e - i) * a) / (o * o + a * a);
    l > 1 ? (n = s, i = r) : l > 0 && (n += o * l, i += a * l);
  }
  return di(t, e, n, i);
}
function di(t, e, n, i) {
  const s = n - t, r = i - e;
  return s * s + r * r;
}
function Lf(t) {
  const e = t.length;
  for (let i = 0; i < e; i++) {
    let s = i, r = Math.abs(t[i][i]);
    for (let a = i + 1; a < e; a++) {
      const l = Math.abs(t[a][i]);
      l > r && (r = l, s = a);
    }
    if (r === 0)
      return null;
    const o = t[s];
    t[s] = t[i], t[i] = o;
    for (let a = i + 1; a < e; a++) {
      const l = -t[a][i] / t[i][i];
      for (let u = i; u < e + 1; u++)
        i == u ? t[a][u] = 0 : t[a][u] += l * t[i][u];
    }
  }
  const n = new Array(e);
  for (let i = e - 1; i >= 0; i--) {
    n[i] = t[i][e] / t[i][i];
    for (let s = i - 1; s >= 0; s--)
      t[s][e] -= t[s][i] * n[i];
  }
  return n;
}
function qs(t) {
  return t * Math.PI / 180;
}
function fi(t, e) {
  const n = t % e;
  return n * e < 0 ? n + e : n;
}
function ht(t, e, n) {
  return t + n * (e - t);
}
function sa(t, e) {
  const n = Math.pow(10, e);
  return Math.round(t * n) / n;
}
function Vs(t, e) {
  return Math.floor(sa(t, e));
}
function Gs(t, e) {
  return Math.ceil(sa(t, e));
}
class Af extends Nt {
  /**
   * @param {Options} options Layer options.
   */
  constructor(e) {
    super(), this.on, this.once, this.un, this.background_ = e.background;
    const n = Object.assign({}, e);
    typeof e.properties == "object" && (delete n.properties, Object.assign(n, e.properties)), n[ge.OPACITY] = e.opacity !== void 0 ? e.opacity : 1, ue(
      typeof n[ge.OPACITY] == "number",
      "Layer opacity must be a number"
    ), n[ge.VISIBLE] = e.visible !== void 0 ? e.visible : !0, n[ge.Z_INDEX] = e.zIndex, n[ge.MAX_RESOLUTION] = e.maxResolution !== void 0 ? e.maxResolution : 1 / 0, n[ge.MIN_RESOLUTION] = e.minResolution !== void 0 ? e.minResolution : 0, n[ge.MIN_ZOOM] = e.minZoom !== void 0 ? e.minZoom : -1 / 0, n[ge.MAX_ZOOM] = e.maxZoom !== void 0 ? e.maxZoom : 1 / 0, this.className_ = n.className !== void 0 ? n.className : "ol-layer", delete n.className, this.setProperties(n), this.state_ = null;
  }
  /**
   * Get the background for this layer.
   * @return {BackgroundColor|false} Layer background.
   */
  getBackground() {
    return this.background_;
  }
  /**
   * @return {string} CSS class name.
   */
  getClassName() {
    return this.className_;
  }
  /**
   * This method is not meant to be called by layers or layer renderers because the state
   * is incorrect if the layer is included in a layer group.
   *
   * @param {boolean} [managed] Layer is managed.
   * @return {import("./Layer.js").State} Layer state.
   */
  getLayerState(e) {
    const n = this.state_ || /** @type {?} */
    {
      layer: this,
      managed: e === void 0 ? !0 : e
    }, i = this.getZIndex();
    return n.opacity = Re(Math.round(this.getOpacity() * 100) / 100, 0, 1), n.visible = this.getVisible(), n.extent = this.getExtent(), n.zIndex = i === void 0 && !n.managed ? 1 / 0 : i, n.maxResolution = this.getMaxResolution(), n.minResolution = Math.max(this.getMinResolution(), 0), n.minZoom = this.getMinZoom(), n.maxZoom = this.getMaxZoom(), this.state_ = n, n;
  }
  /**
   * @abstract
   * @param {Array<import("./Layer.js").default>} [array] Array of layers (to be
   *     modified in place).
   * @return {Array<import("./Layer.js").default>} Array of layers.
   */
  getLayersArray(e) {
    return ce();
  }
  /**
   * @abstract
   * @param {Array<import("./Layer.js").State>} [states] Optional list of layer
   *     states (to be modified in place).
   * @return {Array<import("./Layer.js").State>} List of layer states.
   */
  getLayerStatesArray(e) {
    return ce();
  }
  /**
   * Return the {@link module:ol/extent~Extent extent} of the layer or `undefined` if it
   * will be visible regardless of extent.
   * @return {import("../extent.js").Extent|undefined} The layer extent.
   * @observable
   * @api
   */
  getExtent() {
    return (
      /** @type {import("../extent.js").Extent|undefined} */
      this.get(ge.EXTENT)
    );
  }
  /**
   * Return the maximum resolution of the layer. Returns Infinity if
   * the layer has no maximum resolution set.
   * @return {number} The maximum resolution of the layer.
   * @observable
   * @api
   */
  getMaxResolution() {
    return (
      /** @type {number} */
      this.get(ge.MAX_RESOLUTION)
    );
  }
  /**
   * Return the minimum resolution of the layer. Returns 0 if
   * the layer has no minimum resolution set.
   * @return {number} The minimum resolution of the layer.
   * @observable
   * @api
   */
  getMinResolution() {
    return (
      /** @type {number} */
      this.get(ge.MIN_RESOLUTION)
    );
  }
  /**
   * Return the minimum zoom level of the layer. Returns -Infinity if
   * the layer has no minimum zoom set.
   * @return {number} The minimum zoom level of the layer.
   * @observable
   * @api
   */
  getMinZoom() {
    return (
      /** @type {number} */
      this.get(ge.MIN_ZOOM)
    );
  }
  /**
   * Return the maximum zoom level of the layer. Returns Infinity if
   * the layer has no maximum zoom set.
   * @return {number} The maximum zoom level of the layer.
   * @observable
   * @api
   */
  getMaxZoom() {
    return (
      /** @type {number} */
      this.get(ge.MAX_ZOOM)
    );
  }
  /**
   * Return the opacity of the layer (between 0 and 1).
   * @return {number} The opacity of the layer.
   * @observable
   * @api
   */
  getOpacity() {
    return (
      /** @type {number} */
      this.get(ge.OPACITY)
    );
  }
  /**
   * @abstract
   * @return {import("../source/Source.js").State} Source state.
   */
  getSourceState() {
    return ce();
  }
  /**
   * Return the value of this layer's `visible` property. To find out whether the layer
   * is visible on a map, use `isVisible()` instead.
   * @return {boolean} The value of the `visible` property of the layer.
   * @observable
   * @api
   */
  getVisible() {
    return (
      /** @type {boolean} */
      this.get(ge.VISIBLE)
    );
  }
  /**
   * Return the Z-index of the layer, which is used to order layers before
   * rendering. Returns undefined if the layer is unmanaged.
   * @return {number|undefined} The Z-index of the layer.
   * @observable
   * @api
   */
  getZIndex() {
    return (
      /** @type {number|undefined} */
      this.get(ge.Z_INDEX)
    );
  }
  /**
   * Sets the background color.
   * @param {BackgroundColor} [background] Background color.
   */
  setBackground(e) {
    this.background_ = e, this.changed();
  }
  /**
   * Set the extent at which the layer is visible.  If `undefined`, the layer
   * will be visible at all extents.
   * @param {import("../extent.js").Extent|undefined} extent The extent of the layer.
   * @observable
   * @api
   */
  setExtent(e) {
    this.set(ge.EXTENT, e);
  }
  /**
   * Set the maximum resolution at which the layer is visible.
   * @param {number} maxResolution The maximum resolution of the layer.
   * @observable
   * @api
   */
  setMaxResolution(e) {
    this.set(ge.MAX_RESOLUTION, e);
  }
  /**
   * Set the minimum resolution at which the layer is visible.
   * @param {number} minResolution The minimum resolution of the layer.
   * @observable
   * @api
   */
  setMinResolution(e) {
    this.set(ge.MIN_RESOLUTION, e);
  }
  /**
   * Set the maximum zoom (exclusive) at which the layer is visible.
   * Note that the zoom levels for layer visibility are based on the
   * view zoom level, which may be different from a tile source zoom level.
   * @param {number} maxZoom The maximum zoom of the layer.
   * @observable
   * @api
   */
  setMaxZoom(e) {
    this.set(ge.MAX_ZOOM, e);
  }
  /**
   * Set the minimum zoom (inclusive) at which the layer is visible.
   * Note that the zoom levels for layer visibility are based on the
   * view zoom level, which may be different from a tile source zoom level.
   * @param {number} minZoom The minimum zoom of the layer.
   * @observable
   * @api
   */
  setMinZoom(e) {
    this.set(ge.MIN_ZOOM, e);
  }
  /**
   * Set the opacity of the layer, allowed values range from 0 to 1.
   * @param {number} opacity The opacity of the layer.
   * @observable
   * @api
   */
  setOpacity(e) {
    ue(typeof e == "number", "Layer opacity must be a number"), this.set(ge.OPACITY, e);
  }
  /**
   * Set the visibility of the layer (`true` or `false`).
   * @param {boolean} visible The visibility of the layer.
   * @observable
   * @api
   */
  setVisible(e) {
    this.set(ge.VISIBLE, e);
  }
  /**
   * Set Z-index of the layer, which is used to order layers before rendering.
   * The default Z-index is 0.
   * @param {number} zindex The z-index of the layer.
   * @observable
   * @api
   */
  setZIndex(e) {
    this.set(ge.Z_INDEX, e);
  }
  /**
   * Clean up.
   */
  disposeInternal() {
    this.state_ && (this.state_.layer = null, this.state_ = null), super.disposeInternal();
  }
}
const dc = Af, dt = {
  /**
   * Triggered before a layer is rendered.
   * @event module:ol/render/Event~RenderEvent#prerender
   * @api
   */
  PRERENDER: "prerender",
  /**
   * Triggered after a layer is rendered.
   * @event module:ol/render/Event~RenderEvent#postrender
   * @api
   */
  POSTRENDER: "postrender",
  /**
   * Triggered before layers are composed.  When dispatched by the map, the event object will not have
   * a `context` set.  When dispatched by a layer, the event object will have a `context` set.  Only
   * WebGL layers currently dispatch this event.
   * @event module:ol/render/Event~RenderEvent#precompose
   * @api
   */
  PRECOMPOSE: "precompose",
  /**
   * Triggered after layers are composed.  When dispatched by the map, the event object will not have
   * a `context` set.  When dispatched by a layer, the event object will have a `context` set.  Only
   * WebGL layers currently dispatch this event.
   * @event module:ol/render/Event~RenderEvent#postcompose
   * @api
   */
  POSTCOMPOSE: "postcompose",
  /**
   * Triggered when rendering is complete, i.e. all sources and tiles have
   * finished loading for the current viewport, and all tiles are faded in.
   * The event object will not have a `context` set.
   * @event module:ol/render/Event~RenderEvent#rendercomplete
   * @api
   */
  RENDERCOMPLETE: "rendercomplete"
}, Ve = {
  ANIMATING: 0,
  INTERACTING: 1
}, xt = {
  CENTER: "center",
  RESOLUTION: "resolution",
  ROTATION: "rotation"
}, Pf = 42, ra = 256, ns = {
  // use the radius of the Normal sphere
  radians: 6370997 / (2 * Math.PI),
  degrees: 2 * Math.PI * 6370997 / 360,
  ft: 0.3048,
  m: 1,
  "us-ft": 1200 / 3937
};
class Mf {
  /**
   * @param {Options} options Projection options.
   */
  constructor(e) {
    this.code_ = e.code, this.units_ = /** @type {import("./Units.js").Units} */
    e.units, this.extent_ = e.extent !== void 0 ? e.extent : null, this.worldExtent_ = e.worldExtent !== void 0 ? e.worldExtent : null, this.axisOrientation_ = e.axisOrientation !== void 0 ? e.axisOrientation : "enu", this.global_ = e.global !== void 0 ? e.global : !1, this.canWrapX_ = !!(this.global_ && this.extent_), this.getPointResolutionFunc_ = e.getPointResolution, this.defaultTileGrid_ = null, this.metersPerUnit_ = e.metersPerUnit;
  }
  /**
   * @return {boolean} The projection is suitable for wrapping the x-axis
   */
  canWrapX() {
    return this.canWrapX_;
  }
  /**
   * Get the code for this projection, e.g. 'EPSG:4326'.
   * @return {string} Code.
   * @api
   */
  getCode() {
    return this.code_;
  }
  /**
   * Get the validity extent for this projection.
   * @return {import("../extent.js").Extent} Extent.
   * @api
   */
  getExtent() {
    return this.extent_;
  }
  /**
   * Get the units of this projection.
   * @return {import("./Units.js").Units} Units.
   * @api
   */
  getUnits() {
    return this.units_;
  }
  /**
   * Get the amount of meters per unit of this projection.  If the projection is
   * not configured with `metersPerUnit` or a units identifier, the return is
   * `undefined`.
   * @return {number|undefined} Meters.
   * @api
   */
  getMetersPerUnit() {
    return this.metersPerUnit_ || ns[this.units_];
  }
  /**
   * Get the world extent for this projection.
   * @return {import("../extent.js").Extent} Extent.
   * @api
   */
  getWorldExtent() {
    return this.worldExtent_;
  }
  /**
   * Get the axis orientation of this projection.
   * Example values are:
   * enu - the default easting, northing, elevation.
   * neu - northing, easting, up - useful for "lat/long" geographic coordinates,
   *     or south orientated transverse mercator.
   * wnu - westing, northing, up - some planetary coordinate systems have
   *     "west positive" coordinate systems
   * @return {string} Axis orientation.
   * @api
   */
  getAxisOrientation() {
    return this.axisOrientation_;
  }
  /**
   * Is this projection a global projection which spans the whole world?
   * @return {boolean} Whether the projection is global.
   * @api
   */
  isGlobal() {
    return this.global_;
  }
  /**
   * Set if the projection is a global projection which spans the whole world
   * @param {boolean} global Whether the projection is global.
   * @api
   */
  setGlobal(e) {
    this.global_ = e, this.canWrapX_ = !!(e && this.extent_);
  }
  /**
   * @return {import("../tilegrid/TileGrid.js").default} The default tile grid.
   */
  getDefaultTileGrid() {
    return this.defaultTileGrid_;
  }
  /**
   * @param {import("../tilegrid/TileGrid.js").default} tileGrid The default tile grid.
   */
  setDefaultTileGrid(e) {
    this.defaultTileGrid_ = e;
  }
  /**
   * Set the validity extent for this projection.
   * @param {import("../extent.js").Extent} extent Extent.
   * @api
   */
  setExtent(e) {
    this.extent_ = e, this.canWrapX_ = !!(this.global_ && e);
  }
  /**
   * Set the world extent for this projection.
   * @param {import("../extent.js").Extent} worldExtent World extent
   *     [minlon, minlat, maxlon, maxlat].
   * @api
   */
  setWorldExtent(e) {
    this.worldExtent_ = e;
  }
  /**
   * Set the getPointResolution function (see {@link module:ol/proj.getPointResolution}
   * for this projection.
   * @param {function(number, import("../coordinate.js").Coordinate):number} func Function
   * @api
   */
  setGetPointResolution(e) {
    this.getPointResolutionFunc_ = e;
  }
  /**
   * Get the custom point resolution function for this projection (if set).
   * @return {function(number, import("../coordinate.js").Coordinate):number|undefined} The custom point
   * resolution function (if set).
   */
  getPointResolutionFunc() {
    return this.getPointResolutionFunc_;
  }
}
const fc = Mf, ws = 6378137, li = Math.PI * ws, kf = [-li, -li, li, li], Of = [-180, -85, 180, 85], zs = ws * Math.log(Math.tan(Math.PI / 2));
class qn extends fc {
  /**
   * @param {string} code Code.
   */
  constructor(e) {
    super({
      code: e,
      units: "m",
      extent: kf,
      global: !0,
      worldExtent: Of,
      getPointResolution: function(n, i) {
        return n / Math.cosh(i[1] / ws);
      }
    });
  }
}
const Tl = [
  new qn("EPSG:3857"),
  new qn("EPSG:102100"),
  new qn("EPSG:102113"),
  new qn("EPSG:900913"),
  new qn("http://www.opengis.net/def/crs/EPSG/0/3857"),
  new qn("http://www.opengis.net/gml/srs/epsg.xml#3857")
];
function Df(t, e, n) {
  const i = t.length;
  n = n > 1 ? n : 2, e === void 0 && (n > 2 ? e = t.slice() : e = new Array(i));
  for (let s = 0; s < i; s += n) {
    e[s] = li * t[s] / 180;
    let r = ws * Math.log(Math.tan(Math.PI * (+t[s + 1] + 90) / 360));
    r > zs ? r = zs : r < -zs && (r = -zs), e[s + 1] = r;
  }
  return e;
}
function Ff(t, e, n) {
  const i = t.length;
  n = n > 1 ? n : 2, e === void 0 && (n > 2 ? e = t.slice() : e = new Array(i));
  for (let s = 0; s < i; s += n)
    e[s] = 180 * t[s] / li, e[s + 1] = 360 * Math.atan(Math.exp(t[s + 1] / ws)) / Math.PI - 90;
  return e;
}
const Nf = 6378137, Rl = [-180, -90, 180, 90], Vf = Math.PI * Nf / 180;
class An extends fc {
  /**
   * @param {string} code Code.
   * @param {string} [axisOrientation] Axis orientation.
   */
  constructor(e, n) {
    super({
      code: e,
      units: "degrees",
      extent: Rl,
      axisOrientation: n,
      global: !0,
      metersPerUnit: Vf,
      worldExtent: Rl
    });
  }
}
const Ll = [
  new An("CRS:84"),
  new An("EPSG:4326", "neu"),
  new An("urn:ogc:def:crs:OGC:1.3:CRS84"),
  new An("urn:ogc:def:crs:OGC:2:84"),
  new An("http://www.opengis.net/def/crs/OGC/1.3/CRS84"),
  new An("http://www.opengis.net/gml/srs/epsg.xml#4326", "neu"),
  new An("http://www.opengis.net/def/crs/EPSG/0/4326", "neu")
];
let To = {};
function Gf(t) {
  return To[t] || To[t.replace(/urn:(x-)?ogc:def:crs:EPSG:(.*:)?(\w+)$/, "EPSG:$3")] || null;
}
function zf(t, e) {
  To[t] = e;
}
let gi = {};
function tr(t, e, n) {
  const i = t.getCode(), s = e.getCode();
  i in gi || (gi[i] = {}), gi[i][s] = n;
}
function Bf(t, e) {
  let n;
  return t in gi && e in gi[t] && (n = gi[t][e]), n;
}
const Ae = {
  UNKNOWN: 0,
  INTERSECTING: 1,
  ABOVE: 2,
  RIGHT: 4,
  BELOW: 8,
  LEFT: 16
};
function Al(t) {
  const e = ft();
  for (let n = 0, i = t.length; n < i; ++n)
    Hi(e, t[n]);
  return e;
}
function oa(t, e, n) {
  return n ? (n[0] = t[0] - e, n[1] = t[1] - e, n[2] = t[2] + e, n[3] = t[3] + e, n) : [
    t[0] - e,
    t[1] - e,
    t[2] + e,
    t[3] + e
  ];
}
function gc(t, e) {
  return e ? (e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[3], e) : t.slice();
}
function mc(t, e, n) {
  let i, s;
  return e < t[0] ? i = t[0] - e : t[2] < e ? i = e - t[2] : i = 0, n < t[1] ? s = t[1] - n : t[3] < n ? s = n - t[3] : s = 0, i * i + s * s;
}
function Ci(t, e) {
  return _c(t, e[0], e[1]);
}
function ui(t, e) {
  return t[0] <= e[0] && e[2] <= t[2] && t[1] <= e[1] && e[3] <= t[3];
}
function _c(t, e, n) {
  return t[0] <= e && e <= t[2] && t[1] <= n && n <= t[3];
}
function Ro(t, e) {
  const n = t[0], i = t[1], s = t[2], r = t[3], o = e[0], a = e[1];
  let l = Ae.UNKNOWN;
  return o < n ? l = l | Ae.LEFT : o > s && (l = l | Ae.RIGHT), a < i ? l = l | Ae.BELOW : a > r && (l = l | Ae.ABOVE), l === Ae.UNKNOWN && (l = Ae.INTERSECTING), l;
}
function ft() {
  return [1 / 0, 1 / 0, -1 / 0, -1 / 0];
}
function pn(t, e, n, i, s) {
  return s ? (s[0] = t, s[1] = e, s[2] = n, s[3] = i, s) : [t, e, n, i];
}
function Cr(t) {
  return pn(1 / 0, 1 / 0, -1 / 0, -1 / 0, t);
}
function vc(t, e) {
  const n = t[0], i = t[1];
  return pn(n, i, n, i, e);
}
function aa(t, e, n, i, s) {
  const r = Cr(s);
  return yc(r, t, e, n, i);
}
function is(t, e) {
  return t[0] == e[0] && t[2] == e[2] && t[1] == e[1] && t[3] == e[3];
}
function $f(t, e) {
  return e[0] < t[0] && (t[0] = e[0]), e[2] > t[2] && (t[2] = e[2]), e[1] < t[1] && (t[1] = e[1]), e[3] > t[3] && (t[3] = e[3]), t;
}
function Hi(t, e) {
  e[0] < t[0] && (t[0] = e[0]), e[0] > t[2] && (t[2] = e[0]), e[1] < t[1] && (t[1] = e[1]), e[1] > t[3] && (t[3] = e[1]);
}
function yc(t, e, n, i, s) {
  for (; n < i; n += s)
    Wf(t, e[n], e[n + 1]);
  return t;
}
function Wf(t, e, n) {
  t[0] = Math.min(t[0], e), t[1] = Math.min(t[1], n), t[2] = Math.max(t[2], e), t[3] = Math.max(t[3], n);
}
function pc(t, e) {
  let n;
  return n = e(Er(t)), n || (n = e(wr(t)), n) || (n = e(Sr(t)), n) || (n = e(Wn(t)), n) ? n : !1;
}
function Lo(t) {
  let e = 0;
  return br(t) || (e = _e(t) * Ge(t)), e;
}
function Er(t) {
  return [t[0], t[1]];
}
function wr(t) {
  return [t[2], t[1]];
}
function Bn(t) {
  return [(t[0] + t[2]) / 2, (t[1] + t[3]) / 2];
}
function Xf(t, e) {
  let n;
  if (e === "bottom-left")
    n = Er(t);
  else if (e === "bottom-right")
    n = wr(t);
  else if (e === "top-left")
    n = Wn(t);
  else if (e === "top-right")
    n = Sr(t);
  else
    throw new Error("Invalid corner");
  return n;
}
function Ao(t, e, n, i, s) {
  const [r, o, a, l, u, c, h, d] = Po(
    t,
    e,
    n,
    i
  );
  return pn(
    Math.min(r, a, u, h),
    Math.min(o, l, c, d),
    Math.max(r, a, u, h),
    Math.max(o, l, c, d),
    s
  );
}
function Po(t, e, n, i) {
  const s = e * i[0] / 2, r = e * i[1] / 2, o = Math.cos(n), a = Math.sin(n), l = s * o, u = s * a, c = r * o, h = r * a, d = t[0], f = t[1];
  return [
    d - l + h,
    f - u - c,
    d - l - h,
    f - u + c,
    d + l - h,
    f + u + c,
    d + l + h,
    f + u - c,
    d - l + h,
    f - u - c
  ];
}
function Ge(t) {
  return t[3] - t[1];
}
function qi(t, e, n) {
  const i = n || ft();
  return qe(t, e) ? (t[0] > e[0] ? i[0] = t[0] : i[0] = e[0], t[1] > e[1] ? i[1] = t[1] : i[1] = e[1], t[2] < e[2] ? i[2] = t[2] : i[2] = e[2], t[3] < e[3] ? i[3] = t[3] : i[3] = e[3]) : Cr(i), i;
}
function Wn(t) {
  return [t[0], t[3]];
}
function Sr(t) {
  return [t[2], t[3]];
}
function _e(t) {
  return t[2] - t[0];
}
function qe(t, e) {
  return t[0] <= e[2] && t[2] >= e[0] && t[1] <= e[3] && t[3] >= e[1];
}
function br(t) {
  return t[2] < t[0] || t[3] < t[1];
}
function Yf(t, e) {
  return e ? (e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[3], e) : t;
}
function jf(t, e, n) {
  let i = !1;
  const s = Ro(t, e), r = Ro(t, n);
  if (s === Ae.INTERSECTING || r === Ae.INTERSECTING)
    i = !0;
  else {
    const o = t[0], a = t[1], l = t[2], u = t[3], c = e[0], h = e[1], d = n[0], f = n[1], g = (f - h) / (d - c);
    let m, _;
    r & Ae.ABOVE && !(s & Ae.ABOVE) && (m = d - (f - u) / g, i = m >= o && m <= l), !i && r & Ae.RIGHT && !(s & Ae.RIGHT) && (_ = f - (d - l) * g, i = _ >= a && _ <= u), !i && r & Ae.BELOW && !(s & Ae.BELOW) && (m = d - (f - a) / g, i = m >= o && m <= l), !i && r & Ae.LEFT && !(s & Ae.LEFT) && (_ = f - (d - o) * g, i = _ >= a && _ <= u);
  }
  return i;
}
function xc(t, e) {
  const n = e.getExtent(), i = Bn(t);
  if (e.canWrapX() && (i[0] < n[0] || i[0] >= n[2])) {
    const s = _e(n), o = Math.floor(
      (i[0] - n[0]) / s
    ) * s;
    t[0] -= o, t[2] -= o;
  }
  return t;
}
function Uf(t, e) {
  if (e.canWrapX()) {
    const n = e.getExtent();
    if (!isFinite(t[0]) || !isFinite(t[2]))
      return [[n[0], t[1], n[2], t[3]]];
    xc(t, e);
    const i = _e(n);
    if (_e(t) > i)
      return [[n[0], t[1], n[2], t[3]]];
    if (t[0] < n[0])
      return [
        [t[0] + i, t[1], n[2], t[3]],
        [n[0], t[1], t[2], t[3]]
      ];
    if (t[2] > n[2])
      return [
        [t[0], t[1], n[2], t[3]],
        [n[0], t[1], t[2] - i, t[3]]
      ];
  }
  return [t];
}
function Zf(t, e) {
  return t[0] += +e[0], t[1] += +e[1], t;
}
function nr(t, e) {
  let n = !0;
  for (let i = t.length - 1; i >= 0; --i)
    if (t[i] != e[i]) {
      n = !1;
      break;
    }
  return n;
}
function la(t, e) {
  const n = Math.cos(e), i = Math.sin(e), s = t[0] * n - t[1] * i, r = t[1] * n + t[0] * i;
  return t[0] = s, t[1] = r, t;
}
function Kf(t, e) {
  return t[0] *= e, t[1] *= e, t;
}
function Cc(t, e) {
  if (e.canWrapX()) {
    const n = _e(e.getExtent()), i = Hf(t, e, n);
    i && (t[0] -= i * n);
  }
  return t;
}
function Hf(t, e, n) {
  const i = e.getExtent();
  let s = 0;
  return e.canWrapX() && (t[0] < i[0] || t[0] > i[2]) && (n = n || _e(i), s = Math.floor(
    (t[0] - i[0]) / n
  )), s;
}
const qf = 63710088e-1;
function Pl(t, e, n) {
  n = n || qf;
  const i = qs(t[1]), s = qs(e[1]), r = (s - i) / 2, o = qs(e[0] - t[0]) / 2, a = Math.sin(r) * Math.sin(r) + Math.sin(o) * Math.sin(o) * Math.cos(i) * Math.cos(s);
  return 2 * n * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
const Ec = {
  info: 1,
  warn: 2,
  error: 3,
  none: 4
};
let Jf = Ec.info;
function wc(...t) {
  Jf > Ec.warn || console.warn(...t);
}
let Mo = !0;
function Sc(t) {
  Mo = !(t === void 0 ? !0 : t);
}
function ua(t, e) {
  if (e !== void 0) {
    for (let n = 0, i = t.length; n < i; ++n)
      e[n] = t[n];
    e = e;
  } else
    e = t.slice();
  return e;
}
function bc(t, e) {
  if (e !== void 0 && t !== e) {
    for (let n = 0, i = t.length; n < i; ++n)
      e[n] = t[n];
    t = e;
  }
  return t;
}
function Qf(t) {
  zf(t.getCode(), t), tr(t, t, ua);
}
function eg(t) {
  t.forEach(Qf);
}
function gt(t) {
  return typeof t == "string" ? Gf(
    /** @type {string} */
    t
  ) : (
    /** @type {Projection} */
    t || null
  );
}
function Ml(t, e, n, i) {
  t = gt(t);
  let s;
  const r = t.getPointResolutionFunc();
  if (r) {
    if (s = r(e, n), i && i !== t.getUnits()) {
      const o = t.getMetersPerUnit();
      o && (s = s * o / ns[i]);
    }
  } else {
    const o = t.getUnits();
    if (o == "degrees" && !i || i == "degrees")
      s = e;
    else {
      const a = Ir(
        t,
        gt("EPSG:4326")
      );
      if (a === bc && o !== "degrees")
        s = e * t.getMetersPerUnit();
      else {
        let u = [
          n[0] - e / 2,
          n[1],
          n[0] + e / 2,
          n[1],
          n[0],
          n[1] - e / 2,
          n[0],
          n[1] + e / 2
        ];
        u = a(u, u, 2);
        const c = Pl(u.slice(0, 2), u.slice(2, 4)), h = Pl(u.slice(4, 6), u.slice(6, 8));
        s = (c + h) / 2;
      }
      const l = i ? ns[i] : t.getMetersPerUnit();
      l !== void 0 && (s /= l);
    }
  }
  return s;
}
function kl(t) {
  eg(t), t.forEach(function(e) {
    t.forEach(function(n) {
      e !== n && tr(e, n, ua);
    });
  });
}
function tg(t, e, n, i) {
  t.forEach(function(s) {
    e.forEach(function(r) {
      tr(s, r, n), tr(r, s, i);
    });
  });
}
function ca(t, e) {
  return t ? typeof t == "string" ? gt(t) : (
    /** @type {Projection} */
    t
  ) : gt(e);
}
function Ol(t, e) {
  return Sc(), Ic(
    t,
    "EPSG:4326",
    e !== void 0 ? e : "EPSG:3857"
  );
}
function ii(t, e) {
  if (t === e)
    return !0;
  const n = t.getUnits() === e.getUnits();
  return (t.getCode() === e.getCode() || Ir(t, e) === ua) && n;
}
function Ir(t, e) {
  const n = t.getCode(), i = e.getCode();
  let s = Bf(n, i);
  return s || (s = bc), s;
}
function ir(t, e) {
  const n = gt(t), i = gt(e);
  return Ir(n, i);
}
function Ic(t, e, n) {
  return ir(e, n)(t, void 0, t.length);
}
let ng = null;
function ig() {
  return ng;
}
function ko(t, e) {
  return t;
}
function jt(t, e) {
  return Mo && !nr(t, [0, 0]) && t[0] >= -180 && t[0] <= 180 && t[1] >= -90 && t[1] <= 90 && (Mo = !1, wc(
    "Call useGeographic() from ol/proj once to work with [longitude, latitude] coordinates."
  )), t;
}
function ha(t, e) {
  return t;
}
function On(t, e) {
  return t;
}
function sg() {
  kl(Tl), kl(Ll), tg(
    Ll,
    Tl,
    Df,
    Ff
  );
}
sg();
function Dl(t, e, n) {
  return (
    /**
     * @param {import("./coordinate.js").Coordinate|undefined} center Center.
     * @param {number|undefined} resolution Resolution.
     * @param {import("./size.js").Size} size Viewport size; unused if `onlyCenter` was specified.
     * @param {boolean} [isMoving] True if an interaction or animation is in progress.
     * @param {Array<number>} [centerShift] Shift between map center and viewport center.
     * @return {import("./coordinate.js").Coordinate|undefined} Center.
     */
    function(i, s, r, o, a) {
      if (!i)
        return;
      if (!s && !e)
        return i;
      const l = e ? 0 : r[0] * s, u = e ? 0 : r[1] * s, c = a ? a[0] : 0, h = a ? a[1] : 0;
      let d = t[0] + l / 2 + c, f = t[2] - l / 2 + c, g = t[1] + u / 2 + h, m = t[3] - u / 2 + h;
      d > f && (d = (f + d) / 2, f = d), g > m && (g = (m + g) / 2, m = g);
      let _ = Re(i[0], d, f), p = Re(i[1], g, m);
      if (o && n && s) {
        const y = 30 * s;
        _ += -y * Math.log(1 + Math.max(0, d - i[0]) / y) + y * Math.log(1 + Math.max(0, i[0] - f) / y), p += -y * Math.log(1 + Math.max(0, g - i[1]) / y) + y * Math.log(1 + Math.max(0, i[1] - m) / y);
      }
      return [_, p];
    }
  );
}
function rg(t) {
  return t;
}
function da(t, e, n, i) {
  const s = _e(e) / n[0], r = Ge(e) / n[1];
  return i ? Math.min(t, Math.max(s, r)) : Math.min(t, Math.min(s, r));
}
function fa(t, e, n) {
  let i = Math.min(t, e);
  const s = 50;
  return i *= Math.log(1 + s * Math.max(0, t / e - 1)) / s + 1, n && (i = Math.max(i, n), i /= Math.log(1 + s * Math.max(0, n / t - 1)) / s + 1), Re(i, n / 2, e * 2);
}
function og(t, e, n, i) {
  return e = e !== void 0 ? e : !0, /**
   * @param {number|undefined} resolution Resolution.
   * @param {number} direction Direction.
   * @param {import("./size.js").Size} size Viewport size.
   * @param {boolean} [isMoving] True if an interaction or animation is in progress.
   * @return {number|undefined} Resolution.
   */
  function(s, r, o, a) {
    if (s !== void 0) {
      const l = t[0], u = t[t.length - 1], c = n ? da(
        l,
        n,
        o,
        i
      ) : l;
      if (a)
        return e ? fa(
          s,
          c,
          u
        ) : Re(s, u, c);
      const h = Math.min(c, s), d = Math.floor(na(t, h, r));
      return t[d] > c && d < t.length - 1 ? t[d + 1] : t[d];
    }
  };
}
function ag(t, e, n, i, s, r) {
  return i = i !== void 0 ? i : !0, n = n !== void 0 ? n : 0, /**
   * @param {number|undefined} resolution Resolution.
   * @param {number} direction Direction.
   * @param {import("./size.js").Size} size Viewport size.
   * @param {boolean} [isMoving] True if an interaction or animation is in progress.
   * @return {number|undefined} Resolution.
   */
  function(o, a, l, u) {
    if (o !== void 0) {
      const c = s ? da(
        e,
        s,
        l,
        r
      ) : e;
      if (u)
        return i ? fa(
          o,
          c,
          n
        ) : Re(o, n, c);
      const h = 1e-9, d = Math.ceil(
        Math.log(e / c) / Math.log(t) - h
      ), f = -a * (0.5 - h) + 0.5, g = Math.min(c, o), m = Math.floor(
        Math.log(e / g) / Math.log(t) + f
      ), _ = Math.max(d, m), p = e / Math.pow(t, _);
      return Re(p, n, c);
    }
  };
}
function Fl(t, e, n, i, s) {
  return n = n !== void 0 ? n : !0, /**
   * @param {number|undefined} resolution Resolution.
   * @param {number} direction Direction.
   * @param {import("./size.js").Size} size Viewport size.
   * @param {boolean} [isMoving] True if an interaction or animation is in progress.
   * @return {number|undefined} Resolution.
   */
  function(r, o, a, l) {
    if (r !== void 0) {
      const u = i ? da(
        t,
        i,
        a,
        s
      ) : t;
      return !n || !l ? Re(r, e, u) : fa(
        r,
        u,
        e
      );
    }
  };
}
function ga(t) {
  if (t !== void 0)
    return 0;
}
function Nl(t) {
  if (t !== void 0)
    return t;
}
function lg(t) {
  const e = 2 * Math.PI / t;
  return (
    /**
     * @param {number|undefined} rotation Rotation.
     * @param {boolean} [isMoving] True if an interaction or animation is in progress.
     * @return {number|undefined} Rotation.
     */
    function(n, i) {
      if (i)
        return n;
      if (n !== void 0)
        return n = Math.floor(n / e + 0.5) * e, n;
    }
  );
}
function ug(t) {
  const e = t === void 0 ? qs(5) : t;
  return (
    /**
     * @param {number|undefined} rotation Rotation.
     * @param {boolean} [isMoving] True if an interaction or animation is in progress.
     * @return {number|undefined} Rotation.
     */
    function(n, i) {
      return i || n === void 0 ? n : Math.abs(n) <= e ? 0 : n;
    }
  );
}
function Tc(t) {
  return Math.pow(t, 3);
}
function Ti(t) {
  return 1 - Tc(1 - t);
}
function cg(t) {
  return 3 * t * t - 2 * t * t * t;
}
function hg(t) {
  return t;
}
new Array(6);
function Ct() {
  return [1, 0, 0, 1, 0, 0];
}
function dg(t, e) {
  return t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t[4] = e[4], t[5] = e[5], t;
}
function Pe(t, e) {
  const n = e[0], i = e[1];
  return e[0] = t[0] * n + t[2] * i + t[4], e[1] = t[1] * n + t[3] * i + t[5], e;
}
function Ot(t, e, n, i, s, r, o, a) {
  const l = Math.sin(r), u = Math.cos(r);
  return t[0] = i * u, t[1] = s * l, t[2] = -i * l, t[3] = s * u, t[4] = o * i * u - a * i * l + e, t[5] = o * s * l + a * s * u + n, t;
}
function ma(t, e) {
  const n = fg(e);
  ue(n !== 0, "Transformation matrix cannot be inverted");
  const i = e[0], s = e[1], r = e[2], o = e[3], a = e[4], l = e[5];
  return t[0] = o / n, t[1] = -s / n, t[2] = -r / n, t[3] = i / n, t[4] = (r * l - o * a) / n, t[5] = -(i * l - s * a) / n, t;
}
function fg(t) {
  return t[0] * t[3] - t[1] * t[2];
}
const Vl = [1e6, 1e6, 1e6, 1e6, 2, 2];
function Rc(t) {
  return "matrix(" + t.map(
    (n, i) => Math.round(n * Vl[i]) / Vl[i]
  ).join(", ") + ")";
}
function yn(t, e, n, i, s, r) {
  r = r || [];
  let o = 0;
  for (let a = e; a < n; a += i) {
    const l = t[a], u = t[a + 1];
    r[o++] = s[0] * l + s[2] * u + s[4], r[o++] = s[1] * l + s[3] * u + s[5];
  }
  return r && r.length != o && (r.length = o), r;
}
function Lc(t, e, n, i, s, r, o) {
  o = o || [];
  const a = Math.cos(s), l = Math.sin(s), u = r[0], c = r[1];
  let h = 0;
  for (let d = e; d < n; d += i) {
    const f = t[d] - u, g = t[d + 1] - c;
    o[h++] = u + f * a - g * l, o[h++] = c + f * l + g * a;
    for (let m = d + 2; m < d + i; ++m)
      o[h++] = t[m];
  }
  return o && o.length != h && (o.length = h), o;
}
function gg(t, e, n, i, s, r, o, a) {
  a = a || [];
  const l = o[0], u = o[1];
  let c = 0;
  for (let h = e; h < n; h += i) {
    const d = t[h] - l, f = t[h + 1] - u;
    a[c++] = l + s * d, a[c++] = u + r * f;
    for (let g = h + 2; g < h + i; ++g)
      a[c++] = t[g];
  }
  return a && a.length != c && (a.length = c), a;
}
function mg(t, e, n, i, s, r, o) {
  o = o || [];
  let a = 0;
  for (let l = e; l < n; l += i) {
    o[a++] = t[l] + s, o[a++] = t[l + 1] + r;
    for (let u = l + 2; u < l + i; ++u)
      o[a++] = t[u];
  }
  return o && o.length != a && (o.length = a), o;
}
const Gl = Ct();
class _g extends Nt {
  constructor() {
    super(), this.extent_ = ft(), this.extentRevision_ = -1, this.simplifiedGeometryMaxMinSquaredTolerance = 0, this.simplifiedGeometryRevision = 0, this.simplifyTransformedInternal = cc(
      (e, n, i) => {
        if (!i)
          return this.getSimplifiedGeometry(n);
        const s = this.clone();
        return s.applyTransform(i), s.getSimplifiedGeometry(n);
      }
    );
  }
  /**
   * Get a transformed and simplified version of the geometry.
   * @abstract
   * @param {number} squaredTolerance Squared tolerance.
   * @param {import("../proj.js").TransformFunction} [transform] Optional transform function.
   * @return {Geometry} Simplified geometry.
   */
  simplifyTransformed(e, n) {
    return this.simplifyTransformedInternal(
      this.getRevision(),
      e,
      n
    );
  }
  /**
   * Make a complete copy of the geometry.
   * @abstract
   * @return {!Geometry} Clone.
   */
  clone() {
    return ce();
  }
  /**
   * @abstract
   * @param {number} x X.
   * @param {number} y Y.
   * @param {import("../coordinate.js").Coordinate} closestPoint Closest point.
   * @param {number} minSquaredDistance Minimum squared distance.
   * @return {number} Minimum squared distance.
   */
  closestPointXY(e, n, i, s) {
    return ce();
  }
  /**
   * @param {number} x X.
   * @param {number} y Y.
   * @return {boolean} Contains (x, y).
   */
  containsXY(e, n) {
    const i = this.getClosestPoint([e, n]);
    return i[0] === e && i[1] === n;
  }
  /**
   * Return the closest point of the geometry to the passed point as
   * {@link module:ol/coordinate~Coordinate coordinate}.
   * @param {import("../coordinate.js").Coordinate} point Point.
   * @param {import("../coordinate.js").Coordinate} [closestPoint] Closest point.
   * @return {import("../coordinate.js").Coordinate} Closest point.
   * @api
   */
  getClosestPoint(e, n) {
    return n = n || [NaN, NaN], this.closestPointXY(e[0], e[1], n, 1 / 0), n;
  }
  /**
   * Returns true if this geometry includes the specified coordinate. If the
   * coordinate is on the boundary of the geometry, returns false.
   * @param {import("../coordinate.js").Coordinate} coordinate Coordinate.
   * @return {boolean} Contains coordinate.
   * @api
   */
  intersectsCoordinate(e) {
    return this.containsXY(e[0], e[1]);
  }
  /**
   * @abstract
   * @param {import("../extent.js").Extent} extent Extent.
   * @protected
   * @return {import("../extent.js").Extent} extent Extent.
   */
  computeExtent(e) {
    return ce();
  }
  /**
   * Get the extent of the geometry.
   * @param {import("../extent.js").Extent} [extent] Extent.
   * @return {import("../extent.js").Extent} extent Extent.
   * @api
   */
  getExtent(e) {
    if (this.extentRevision_ != this.getRevision()) {
      const n = this.computeExtent(this.extent_);
      (isNaN(n[0]) || isNaN(n[1])) && Cr(n), this.extentRevision_ = this.getRevision();
    }
    return Yf(this.extent_, e);
  }
  /**
   * Rotate the geometry around a given coordinate. This modifies the geometry
   * coordinates in place.
   * @abstract
   * @param {number} angle Rotation angle in radians.
   * @param {import("../coordinate.js").Coordinate} anchor The rotation center.
   * @api
   */
  rotate(e, n) {
    ce();
  }
  /**
   * Scale the geometry (with an optional origin).  This modifies the geometry
   * coordinates in place.
   * @abstract
   * @param {number} sx The scaling factor in the x-direction.
   * @param {number} [sy] The scaling factor in the y-direction (defaults to sx).
   * @param {import("../coordinate.js").Coordinate} [anchor] The scale origin (defaults to the center
   *     of the geometry extent).
   * @api
   */
  scale(e, n, i) {
    ce();
  }
  /**
   * Create a simplified version of this geometry.  For linestrings, this uses
   * the [Douglas Peucker](https://en.wikipedia.org/wiki/Ramer-Douglas-Peucker_algorithm)
   * algorithm.  For polygons, a quantization-based
   * simplification is used to preserve topology.
   * @param {number} tolerance The tolerance distance for simplification.
   * @return {Geometry} A new, simplified version of the original geometry.
   * @api
   */
  simplify(e) {
    return this.getSimplifiedGeometry(e * e);
  }
  /**
   * Create a simplified version of this geometry using the Douglas Peucker
   * algorithm.
   * See https://en.wikipedia.org/wiki/Ramer-Douglas-Peucker_algorithm.
   * @abstract
   * @param {number} squaredTolerance Squared tolerance.
   * @return {Geometry} Simplified geometry.
   */
  getSimplifiedGeometry(e) {
    return ce();
  }
  /**
   * Get the type of this geometry.
   * @abstract
   * @return {Type} Geometry type.
   */
  getType() {
    return ce();
  }
  /**
   * Apply a transform function to the coordinates of the geometry.
   * The geometry is modified in place.
   * If you do not want the geometry modified in place, first `clone()` it and
   * then use this function on the clone.
   * @abstract
   * @param {import("../proj.js").TransformFunction} transformFn Transform function.
   * Called with a flat array of geometry coordinates.
   */
  applyTransform(e) {
    ce();
  }
  /**
   * Test if the geometry and the passed extent intersect.
   * @abstract
   * @param {import("../extent.js").Extent} extent Extent.
   * @return {boolean} `true` if the geometry and the extent intersect.
   */
  intersectsExtent(e) {
    return ce();
  }
  /**
   * Translate the geometry.  This modifies the geometry coordinates in place.  If
   * instead you want a new geometry, first `clone()` this geometry.
   * @abstract
   * @param {number} deltaX Delta X.
   * @param {number} deltaY Delta Y.
   * @api
   */
  translate(e, n) {
    ce();
  }
  /**
   * Transform each coordinate of the geometry from one coordinate reference
   * system to another. The geometry is modified in place.
   * For example, a line will be transformed to a line and a circle to a circle.
   * If you do not want the geometry modified in place, first `clone()` it and
   * then use this function on the clone.
   *
   * @param {import("../proj.js").ProjectionLike} source The current projection.  Can be a
   *     string identifier or a {@link module:ol/proj/Projection~Projection} object.
   * @param {import("../proj.js").ProjectionLike} destination The desired projection.  Can be a
   *     string identifier or a {@link module:ol/proj/Projection~Projection} object.
   * @return {this} This geometry.  Note that original geometry is
   *     modified in place.
   * @api
   */
  transform(e, n) {
    const i = gt(e), s = i.getUnits() == "tile-pixels" ? function(r, o, a) {
      const l = i.getExtent(), u = i.getWorldExtent(), c = Ge(u) / Ge(l);
      return Ot(
        Gl,
        u[0],
        u[3],
        c,
        -c,
        0,
        0,
        0
      ), yn(
        r,
        0,
        r.length,
        a,
        Gl,
        o
      ), ir(i, n)(
        r,
        o,
        a
      );
    } : ir(i, n);
    return this.applyTransform(s), this;
  }
}
const vg = _g;
class yg extends vg {
  constructor() {
    super(), this.layout = "XY", this.stride = 2, this.flatCoordinates;
  }
  /**
   * @param {import("../extent.js").Extent} extent Extent.
   * @protected
   * @return {import("../extent.js").Extent} extent Extent.
   */
  computeExtent(e) {
    return aa(
      this.flatCoordinates,
      0,
      this.flatCoordinates.length,
      this.stride,
      e
    );
  }
  /**
   * @abstract
   * @return {Array<*> | null} Coordinates.
   */
  getCoordinates() {
    return ce();
  }
  /**
   * Return the first coordinate of the geometry.
   * @return {import("../coordinate.js").Coordinate} First coordinate.
   * @api
   */
  getFirstCoordinate() {
    return this.flatCoordinates.slice(0, this.stride);
  }
  /**
   * @return {Array<number>} Flat coordinates.
   */
  getFlatCoordinates() {
    return this.flatCoordinates;
  }
  /**
   * Return the last coordinate of the geometry.
   * @return {import("../coordinate.js").Coordinate} Last point.
   * @api
   */
  getLastCoordinate() {
    return this.flatCoordinates.slice(
      this.flatCoordinates.length - this.stride
    );
  }
  /**
   * Return the {@link import("./Geometry.js").GeometryLayout layout} of the geometry.
   * @return {import("./Geometry.js").GeometryLayout} Layout.
   * @api
   */
  getLayout() {
    return this.layout;
  }
  /**
   * Create a simplified version of this geometry using the Douglas Peucker algorithm.
   * @param {number} squaredTolerance Squared tolerance.
   * @return {SimpleGeometry} Simplified geometry.
   */
  getSimplifiedGeometry(e) {
    if (this.simplifiedGeometryRevision !== this.getRevision() && (this.simplifiedGeometryMaxMinSquaredTolerance = 0, this.simplifiedGeometryRevision = this.getRevision()), e < 0 || this.simplifiedGeometryMaxMinSquaredTolerance !== 0 && e <= this.simplifiedGeometryMaxMinSquaredTolerance)
      return this;
    const n = this.getSimplifiedGeometryInternal(e);
    return n.getFlatCoordinates().length < this.flatCoordinates.length ? n : (this.simplifiedGeometryMaxMinSquaredTolerance = e, this);
  }
  /**
   * @param {number} squaredTolerance Squared tolerance.
   * @return {SimpleGeometry} Simplified geometry.
   * @protected
   */
  getSimplifiedGeometryInternal(e) {
    return this;
  }
  /**
   * @return {number} Stride.
   */
  getStride() {
    return this.stride;
  }
  /**
   * @param {import("./Geometry.js").GeometryLayout} layout Layout.
   * @param {Array<number>} flatCoordinates Flat coordinates.
   */
  setFlatCoordinates(e, n) {
    this.stride = zl(e), this.layout = e, this.flatCoordinates = n;
  }
  /**
   * @abstract
   * @param {!Array<*>} coordinates Coordinates.
   * @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
   */
  setCoordinates(e, n) {
    ce();
  }
  /**
   * @param {import("./Geometry.js").GeometryLayout|undefined} layout Layout.
   * @param {Array<*>} coordinates Coordinates.
   * @param {number} nesting Nesting.
   * @protected
   */
  setLayout(e, n, i) {
    let s;
    if (e)
      s = zl(e);
    else {
      for (let r = 0; r < i; ++r) {
        if (n.length === 0) {
          this.layout = "XY", this.stride = 2;
          return;
        }
        n = /** @type {Array<unknown>} */
        n[0];
      }
      s = n.length, e = pg(s);
    }
    this.layout = e, this.stride = s;
  }
  /**
   * Apply a transform function to the coordinates of the geometry.
   * The geometry is modified in place.
   * If you do not want the geometry modified in place, first `clone()` it and
   * then use this function on the clone.
   * @param {import("../proj.js").TransformFunction} transformFn Transform function.
   * Called with a flat array of geometry coordinates.
   * @api
   */
  applyTransform(e) {
    this.flatCoordinates && (e(this.flatCoordinates, this.flatCoordinates, this.stride), this.changed());
  }
  /**
   * Rotate the geometry around a given coordinate. This modifies the geometry
   * coordinates in place.
   * @param {number} angle Rotation angle in counter-clockwise radians.
   * @param {import("../coordinate.js").Coordinate} anchor The rotation center.
   * @api
   */
  rotate(e, n) {
    const i = this.getFlatCoordinates();
    if (i) {
      const s = this.getStride();
      Lc(
        i,
        0,
        i.length,
        s,
        e,
        n,
        i
      ), this.changed();
    }
  }
  /**
   * Scale the geometry (with an optional origin).  This modifies the geometry
   * coordinates in place.
   * @param {number} sx The scaling factor in the x-direction.
   * @param {number} [sy] The scaling factor in the y-direction (defaults to sx).
   * @param {import("../coordinate.js").Coordinate} [anchor] The scale origin (defaults to the center
   *     of the geometry extent).
   * @api
   */
  scale(e, n, i) {
    n === void 0 && (n = e), i || (i = Bn(this.getExtent()));
    const s = this.getFlatCoordinates();
    if (s) {
      const r = this.getStride();
      gg(
        s,
        0,
        s.length,
        r,
        e,
        n,
        i,
        s
      ), this.changed();
    }
  }
  /**
   * Translate the geometry.  This modifies the geometry coordinates in place.  If
   * instead you want a new geometry, first `clone()` this geometry.
   * @param {number} deltaX Delta X.
   * @param {number} deltaY Delta Y.
   * @api
   */
  translate(e, n) {
    const i = this.getFlatCoordinates();
    if (i) {
      const s = this.getStride();
      mg(
        i,
        0,
        i.length,
        s,
        e,
        n,
        i
      ), this.changed();
    }
  }
}
function pg(t) {
  let e;
  return t == 2 ? e = "XY" : t == 3 ? e = "XYZ" : t == 4 && (e = "XYZM"), /** @type {import("./Geometry.js").GeometryLayout} */
  e;
}
function zl(t) {
  let e;
  return t == "XY" ? e = 2 : t == "XYZ" || t == "XYM" ? e = 3 : t == "XYZM" && (e = 4), /** @type {number} */
  e;
}
function xg(t, e, n) {
  const i = t.getFlatCoordinates();
  if (!i)
    return null;
  const s = t.getStride();
  return yn(
    i,
    0,
    i.length,
    s,
    e,
    n
  );
}
const _a = yg;
function Bl(t, e, n, i, s, r, o) {
  const a = t[e], l = t[e + 1], u = t[n] - a, c = t[n + 1] - l;
  let h;
  if (u === 0 && c === 0)
    h = e;
  else {
    const d = ((s - a) * u + (r - l) * c) / (u * u + c * c);
    if (d > 1)
      h = n;
    else if (d > 0) {
      for (let f = 0; f < i; ++f)
        o[f] = ht(
          t[e + f],
          t[n + f],
          d
        );
      o.length = i;
      return;
    } else
      h = e;
  }
  for (let d = 0; d < i; ++d)
    o[d] = t[h + d];
  o.length = i;
}
function Ac(t, e, n, i, s) {
  let r = t[e], o = t[e + 1];
  for (e += i; e < n; e += i) {
    const a = t[e], l = t[e + 1], u = di(r, o, a, l);
    u > s && (s = u), r = a, o = l;
  }
  return s;
}
function Cg(t, e, n, i, s) {
  for (let r = 0, o = n.length; r < o; ++r) {
    const a = n[r];
    s = Ac(t, e, a, i, s), e = a;
  }
  return s;
}
function Pc(t, e, n, i, s, r, o, a, l, u, c) {
  if (e == n)
    return u;
  let h, d;
  if (s === 0) {
    if (d = di(
      o,
      a,
      t[e],
      t[e + 1]
    ), d < u) {
      for (h = 0; h < i; ++h)
        l[h] = t[e + h];
      return l.length = i, d;
    }
    return u;
  }
  c = c || [NaN, NaN];
  let f = e + i;
  for (; f < n; )
    if (Bl(
      t,
      f - i,
      f,
      i,
      o,
      a,
      c
    ), d = di(o, a, c[0], c[1]), d < u) {
      for (u = d, h = 0; h < i; ++h)
        l[h] = c[h];
      l.length = i, f += i;
    } else
      f += i * Math.max(
        (Math.sqrt(d) - Math.sqrt(u)) / s | 0,
        1
      );
  if (r && (Bl(
    t,
    n - i,
    e,
    i,
    o,
    a,
    c
  ), d = di(o, a, c[0], c[1]), d < u)) {
    for (u = d, h = 0; h < i; ++h)
      l[h] = c[h];
    l.length = i;
  }
  return u;
}
function Eg(t, e, n, i, s, r, o, a, l, u, c) {
  c = c || [NaN, NaN];
  for (let h = 0, d = n.length; h < d; ++h) {
    const f = n[h];
    u = Pc(
      t,
      e,
      f,
      i,
      s,
      r,
      o,
      a,
      l,
      u,
      c
    ), e = f;
  }
  return u;
}
function wg(t, e, n, i) {
  for (let s = 0, r = n.length; s < r; ++s)
    t[e++] = n[s];
  return e;
}
function Mc(t, e, n, i) {
  for (let s = 0, r = n.length; s < r; ++s) {
    const o = n[s];
    for (let a = 0; a < i; ++a)
      t[e++] = o[a];
  }
  return e;
}
function Sg(t, e, n, i, s) {
  s = s || [];
  let r = 0;
  for (let o = 0, a = n.length; o < a; ++o) {
    const l = Mc(
      t,
      e,
      n[o],
      i
    );
    s[r++] = l, e = l;
  }
  return s.length = r, s;
}
function va(t, e, n, i, s, r, o) {
  const a = (n - e) / i;
  if (a < 3) {
    for (; e < n; e += i)
      r[o++] = t[e], r[o++] = t[e + 1];
    return o;
  }
  const l = new Array(a);
  l[0] = 1, l[a - 1] = 1;
  const u = [e, n - i];
  let c = 0;
  for (; u.length > 0; ) {
    const h = u.pop(), d = u.pop();
    let f = 0;
    const g = t[d], m = t[d + 1], _ = t[h], p = t[h + 1];
    for (let y = d + i; y < h; y += i) {
      const C = t[y], x = t[y + 1], E = Rf(C, x, g, m, _, p);
      E > f && (c = y, f = E);
    }
    f > s && (l[(c - e) / i] = 1, d + i < c && u.push(d, c), c + i < h && u.push(c, h));
  }
  for (let h = 0; h < a; ++h)
    l[h] && (r[o++] = t[e + h * i], r[o++] = t[e + h * i + 1]);
  return o;
}
function bg(t, e, n, i, s, r, o, a) {
  for (let l = 0, u = n.length; l < u; ++l) {
    const c = n[l];
    o = va(
      t,
      e,
      c,
      i,
      s,
      r,
      o
    ), a.push(o), e = c;
  }
  return o;
}
function kn(t, e) {
  return e * Math.round(t / e);
}
function Ig(t, e, n, i, s, r, o) {
  if (e == n)
    return o;
  let a = kn(t[e], s), l = kn(t[e + 1], s);
  e += i, r[o++] = a, r[o++] = l;
  let u, c;
  do
    if (u = kn(t[e], s), c = kn(t[e + 1], s), e += i, e == n)
      return r[o++] = u, r[o++] = c, o;
  while (u == a && c == l);
  for (; e < n; ) {
    const h = kn(t[e], s), d = kn(t[e + 1], s);
    if (e += i, h == u && d == c)
      continue;
    const f = u - a, g = c - l, m = h - a, _ = d - l;
    if (f * _ == g * m && (f < 0 && m < f || f == m || f > 0 && m > f) && (g < 0 && _ < g || g == _ || g > 0 && _ > g)) {
      u = h, c = d;
      continue;
    }
    r[o++] = u, r[o++] = c, a = u, l = c, u = h, c = d;
  }
  return r[o++] = u, r[o++] = c, o;
}
function kc(t, e, n, i, s, r, o, a) {
  for (let l = 0, u = n.length; l < u; ++l) {
    const c = n[l];
    o = Ig(
      t,
      e,
      c,
      i,
      s,
      r,
      o
    ), a.push(o), e = c;
  }
  return o;
}
function ci(t, e, n, i, s) {
  s = s !== void 0 ? s : [];
  let r = 0;
  for (let o = e; o < n; o += i)
    s[r++] = t.slice(o, o + i);
  return s.length = r, s;
}
function sr(t, e, n, i, s) {
  s = s !== void 0 ? s : [];
  let r = 0;
  for (let o = 0, a = n.length; o < a; ++o) {
    const l = n[o];
    s[r++] = ci(
      t,
      e,
      l,
      i,
      s[r]
    ), e = l;
  }
  return s.length = r, s;
}
function $l(t, e, n, i, s) {
  s = s !== void 0 ? s : [];
  let r = 0;
  for (let o = 0, a = n.length; o < a; ++o) {
    const l = n[o];
    s[r++] = l.length === 1 && l[0] === e ? [] : sr(
      t,
      e,
      l,
      i,
      s[r]
    ), e = l[l.length - 1];
  }
  return s.length = r, s;
}
function Oc(t, e, n, i) {
  let s = 0, r = t[n - i], o = t[n - i + 1];
  for (; e < n; e += i) {
    const a = t[e], l = t[e + 1];
    s += o * a - r * l, r = a, o = l;
  }
  return s / 2;
}
function Tg(t, e, n, i) {
  let s = 0;
  for (let r = 0, o = n.length; r < o; ++r) {
    const a = n[r];
    s += Oc(t, e, a, i), e = a;
  }
  return s;
}
class rr extends _a {
  /**
   * @param {Array<import("../coordinate.js").Coordinate>|Array<number>} coordinates Coordinates.
   *     For internal use, flat coordinates in combination with `layout` are also accepted.
   * @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
   */
  constructor(e, n) {
    super(), this.maxDelta_ = -1, this.maxDeltaRevision_ = -1, n !== void 0 && !Array.isArray(e[0]) ? this.setFlatCoordinates(
      n,
      /** @type {Array<number>} */
      e
    ) : this.setCoordinates(
      /** @type {Array<import("../coordinate.js").Coordinate>} */
      e,
      n
    );
  }
  /**
   * Make a complete copy of the geometry.
   * @return {!LinearRing} Clone.
   * @api
   */
  clone() {
    return new rr(this.flatCoordinates.slice(), this.layout);
  }
  /**
   * @param {number} x X.
   * @param {number} y Y.
   * @param {import("../coordinate.js").Coordinate} closestPoint Closest point.
   * @param {number} minSquaredDistance Minimum squared distance.
   * @return {number} Minimum squared distance.
   */
  closestPointXY(e, n, i, s) {
    return s < mc(this.getExtent(), e, n) ? s : (this.maxDeltaRevision_ != this.getRevision() && (this.maxDelta_ = Math.sqrt(
      Ac(
        this.flatCoordinates,
        0,
        this.flatCoordinates.length,
        this.stride,
        0
      )
    ), this.maxDeltaRevision_ = this.getRevision()), Pc(
      this.flatCoordinates,
      0,
      this.flatCoordinates.length,
      this.stride,
      this.maxDelta_,
      !0,
      e,
      n,
      i,
      s
    ));
  }
  /**
   * Return the area of the linear ring on projected plane.
   * @return {number} Area (on projected plane).
   * @api
   */
  getArea() {
    return Oc(
      this.flatCoordinates,
      0,
      this.flatCoordinates.length,
      this.stride
    );
  }
  /**
   * Return the coordinates of the linear ring.
   * @return {Array<import("../coordinate.js").Coordinate>} Coordinates.
   * @api
   */
  getCoordinates() {
    return ci(
      this.flatCoordinates,
      0,
      this.flatCoordinates.length,
      this.stride
    );
  }
  /**
   * @param {number} squaredTolerance Squared tolerance.
   * @return {LinearRing} Simplified LinearRing.
   * @protected
   */
  getSimplifiedGeometryInternal(e) {
    const n = [];
    return n.length = va(
      this.flatCoordinates,
      0,
      this.flatCoordinates.length,
      this.stride,
      e,
      n,
      0
    ), new rr(n, "XY");
  }
  /**
   * Get the type of this geometry.
   * @return {import("./Geometry.js").Type} Geometry type.
   * @api
   */
  getType() {
    return "LinearRing";
  }
  /**
   * Test if the geometry and the passed extent intersect.
   * @param {import("../extent.js").Extent} extent Extent.
   * @return {boolean} `true` if the geometry and the extent intersect.
   * @api
   */
  intersectsExtent(e) {
    return !1;
  }
  /**
   * Set the coordinates of the linear ring.
   * @param {!Array<import("../coordinate.js").Coordinate>} coordinates Coordinates.
   * @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
   * @api
   */
  setCoordinates(e, n) {
    this.setLayout(n, e, 1), this.flatCoordinates || (this.flatCoordinates = []), this.flatCoordinates.length = Mc(
      this.flatCoordinates,
      0,
      e,
      this.stride
    ), this.changed();
  }
}
const Wl = rr;
class ya extends _a {
  /**
   * @param {import("../coordinate.js").Coordinate} coordinates Coordinates.
   * @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
   */
  constructor(e, n) {
    super(), this.setCoordinates(e, n);
  }
  /**
   * Make a complete copy of the geometry.
   * @return {!Point} Clone.
   * @api
   */
  clone() {
    const e = new ya(this.flatCoordinates.slice(), this.layout);
    return e.applyProperties(this), e;
  }
  /**
   * @param {number} x X.
   * @param {number} y Y.
   * @param {import("../coordinate.js").Coordinate} closestPoint Closest point.
   * @param {number} minSquaredDistance Minimum squared distance.
   * @return {number} Minimum squared distance.
   */
  closestPointXY(e, n, i, s) {
    const r = this.flatCoordinates, o = di(
      e,
      n,
      r[0],
      r[1]
    );
    if (o < s) {
      const a = this.stride;
      for (let l = 0; l < a; ++l)
        i[l] = r[l];
      return i.length = a, o;
    }
    return s;
  }
  /**
   * Return the coordinate of the point.
   * @return {import("../coordinate.js").Coordinate} Coordinates.
   * @api
   */
  getCoordinates() {
    return this.flatCoordinates.slice();
  }
  /**
   * @param {import("../extent.js").Extent} extent Extent.
   * @protected
   * @return {import("../extent.js").Extent} extent Extent.
   */
  computeExtent(e) {
    return vc(this.flatCoordinates, e);
  }
  /**
   * Get the type of this geometry.
   * @return {import("./Geometry.js").Type} Geometry type.
   * @api
   */
  getType() {
    return "Point";
  }
  /**
   * Test if the geometry and the passed extent intersect.
   * @param {import("../extent.js").Extent} extent Extent.
   * @return {boolean} `true` if the geometry and the extent intersect.
   * @api
   */
  intersectsExtent(e) {
    return _c(e, this.flatCoordinates[0], this.flatCoordinates[1]);
  }
  /**
   * @param {!Array<*>} coordinates Coordinates.
   * @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
   * @api
   */
  setCoordinates(e, n) {
    this.setLayout(n, e, 0), this.flatCoordinates || (this.flatCoordinates = []), this.flatCoordinates.length = wg(
      this.flatCoordinates,
      0,
      e,
      this.stride
    ), this.changed();
  }
}
const Dc = ya;
function Rg(t, e, n, i, s) {
  return !pc(
    s,
    /**
     * @param {import("../../coordinate.js").Coordinate} coordinate Coordinate.
     * @return {boolean} Contains (x, y).
     */
    function(o) {
      return !Dn(
        t,
        e,
        n,
        i,
        o[0],
        o[1]
      );
    }
  );
}
function Dn(t, e, n, i, s, r) {
  let o = 0, a = t[n - i], l = t[n - i + 1];
  for (; e < n; e += i) {
    const u = t[e], c = t[e + 1];
    l <= r ? c > r && (u - a) * (r - l) - (s - a) * (c - l) > 0 && o++ : c <= r && (u - a) * (r - l) - (s - a) * (c - l) < 0 && o--, a = u, l = c;
  }
  return o !== 0;
}
function Fc(t, e, n, i, s, r) {
  if (n.length === 0 || !Dn(t, e, n[0], i, s, r))
    return !1;
  for (let o = 1, a = n.length; o < a; ++o)
    if (Dn(t, n[o - 1], n[o], i, s, r))
      return !1;
  return !0;
}
function pa(t, e, n, i, s, r, o) {
  let a, l, u, c, h, d, f;
  const g = s[r + 1], m = [];
  for (let y = 0, C = n.length; y < C; ++y) {
    const x = n[y];
    for (c = t[x - i], d = t[x - i + 1], a = e; a < x; a += i)
      h = t[a], f = t[a + 1], (g <= d && f <= g || d <= g && g <= f) && (u = (g - d) / (f - d) * (h - c) + c, m.push(u)), c = h, d = f;
  }
  let _ = NaN, p = -1 / 0;
  for (m.sort(qt), c = m[0], a = 1, l = m.length; a < l; ++a) {
    h = m[a];
    const y = Math.abs(h - c);
    y > p && (u = (c + h) / 2, Fc(t, e, n, i, u, g) && (_ = u, p = y)), c = h;
  }
  return isNaN(_) && (_ = s[r]), o ? (o.push(_, g, p), o) : [_, g, p];
}
function Lg(t, e, n, i, s) {
  let r = [];
  for (let o = 0, a = n.length; o < a; ++o) {
    const l = n[o];
    r = pa(
      t,
      e,
      l,
      i,
      s,
      2 * o,
      r
    ), e = l[l.length - 1];
  }
  return r;
}
function Ag(t, e, n, i, s) {
  let r;
  for (e += i; e < n; e += i)
    if (r = s(
      t.slice(e - i, e),
      t.slice(e, e + i)
    ), r)
      return r;
  return !1;
}
function Nc(t, e, n, i, s) {
  const r = yc(
    ft(),
    t,
    e,
    n,
    i
  );
  return qe(s, r) ? ui(s, r) || r[0] >= s[0] && r[2] <= s[2] || r[1] >= s[1] && r[3] <= s[3] ? !0 : Ag(
    t,
    e,
    n,
    i,
    /**
     * @param {import("../../coordinate.js").Coordinate} point1 Start point.
     * @param {import("../../coordinate.js").Coordinate} point2 End point.
     * @return {boolean} `true` if the segment and the extent intersect,
     *     `false` otherwise.
     */
    function(o, a) {
      return jf(s, o, a);
    }
  ) : !1;
}
function Vc(t, e, n, i, s) {
  return !!(Nc(t, e, n, i, s) || Dn(
    t,
    e,
    n,
    i,
    s[0],
    s[1]
  ) || Dn(
    t,
    e,
    n,
    i,
    s[0],
    s[3]
  ) || Dn(
    t,
    e,
    n,
    i,
    s[2],
    s[1]
  ) || Dn(
    t,
    e,
    n,
    i,
    s[2],
    s[3]
  ));
}
function Pg(t, e, n, i, s) {
  if (!Vc(t, e, n[0], i, s))
    return !1;
  if (n.length === 1)
    return !0;
  for (let r = 1, o = n.length; r < o; ++r)
    if (Rg(
      t,
      n[r - 1],
      n[r],
      i,
      s
    ) && !Nc(
      t,
      n[r - 1],
      n[r],
      i,
      s
    ))
      return !1;
  return !0;
}
function Mg(t, e, n, i) {
  for (; e < n - i; ) {
    for (let s = 0; s < i; ++s) {
      const r = t[e + s];
      t[e + s] = t[n - i + s], t[n - i + s] = r;
    }
    e += i, n -= i;
  }
}
function xa(t, e, n, i) {
  let s = 0, r = t[n - i], o = t[n - i + 1];
  for (; e < n; e += i) {
    const a = t[e], l = t[e + 1];
    s += (a - r) * (l + o), r = a, o = l;
  }
  return s === 0 ? void 0 : s > 0;
}
function kg(t, e, n, i, s) {
  s = s !== void 0 ? s : !1;
  for (let r = 0, o = n.length; r < o; ++r) {
    const a = n[r], l = xa(
      t,
      e,
      a,
      i
    );
    if (r === 0) {
      if (s && l || !s && !l)
        return !1;
    } else if (s && !l || !s && l)
      return !1;
    e = a;
  }
  return !0;
}
function Xl(t, e, n, i, s) {
  s = s !== void 0 ? s : !1;
  for (let r = 0, o = n.length; r < o; ++r) {
    const a = n[r], l = xa(
      t,
      e,
      a,
      i
    );
    (r === 0 ? s && l || !s && !l : s && !l || !s && l) && Mg(t, e, a, i), e = a;
  }
  return e;
}
function Og(t, e) {
  const n = [];
  let i = 0, s = 0, r;
  for (let o = 0, a = e.length; o < a; ++o) {
    const l = e[o], u = xa(t, i, l, 2);
    if (r === void 0 && (r = u), u === r)
      n.push(e.slice(s, o + 1));
    else {
      if (n.length === 0)
        continue;
      n[n.length - 1].push(e[s]);
    }
    s = o + 1, i = l;
  }
  return n;
}
class ss extends _a {
  /**
   * @param {!Array<Array<import("../coordinate.js").Coordinate>>|!Array<number>} coordinates
   *     Array of linear rings that define the polygon. The first linear ring of the
   *     array defines the outer-boundary or surface of the polygon. Each subsequent
   *     linear ring defines a hole in the surface of the polygon. A linear ring is
   *     an array of vertices' coordinates where the first coordinate and the last are
   *     equivalent. (For internal use, flat coordinates in combination with
   *     `layout` and `ends` are also accepted.)
   * @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
   * @param {Array<number>} [ends] Ends (for internal use with flat coordinates).
   */
  constructor(e, n, i) {
    super(), this.ends_ = [], this.flatInteriorPointRevision_ = -1, this.flatInteriorPoint_ = null, this.maxDelta_ = -1, this.maxDeltaRevision_ = -1, this.orientedRevision_ = -1, this.orientedFlatCoordinates_ = null, n !== void 0 && i ? (this.setFlatCoordinates(
      n,
      /** @type {Array<number>} */
      e
    ), this.ends_ = i) : this.setCoordinates(
      /** @type {Array<Array<import("../coordinate.js").Coordinate>>} */
      e,
      n
    );
  }
  /**
   * Append the passed linear ring to this polygon.
   * @param {LinearRing} linearRing Linear ring.
   * @api
   */
  appendLinearRing(e) {
    this.flatCoordinates ? ia(this.flatCoordinates, e.getFlatCoordinates()) : this.flatCoordinates = e.getFlatCoordinates().slice(), this.ends_.push(this.flatCoordinates.length), this.changed();
  }
  /**
   * Make a complete copy of the geometry.
   * @return {!Polygon} Clone.
   * @api
   */
  clone() {
    const e = new ss(
      this.flatCoordinates.slice(),
      this.layout,
      this.ends_.slice()
    );
    return e.applyProperties(this), e;
  }
  /**
   * @param {number} x X.
   * @param {number} y Y.
   * @param {import("../coordinate.js").Coordinate} closestPoint Closest point.
   * @param {number} minSquaredDistance Minimum squared distance.
   * @return {number} Minimum squared distance.
   */
  closestPointXY(e, n, i, s) {
    return s < mc(this.getExtent(), e, n) ? s : (this.maxDeltaRevision_ != this.getRevision() && (this.maxDelta_ = Math.sqrt(
      Cg(
        this.flatCoordinates,
        0,
        this.ends_,
        this.stride,
        0
      )
    ), this.maxDeltaRevision_ = this.getRevision()), Eg(
      this.flatCoordinates,
      0,
      this.ends_,
      this.stride,
      this.maxDelta_,
      !0,
      e,
      n,
      i,
      s
    ));
  }
  /**
   * @param {number} x X.
   * @param {number} y Y.
   * @return {boolean} Contains (x, y).
   */
  containsXY(e, n) {
    return Fc(
      this.getOrientedFlatCoordinates(),
      0,
      this.ends_,
      this.stride,
      e,
      n
    );
  }
  /**
   * Return the area of the polygon on projected plane.
   * @return {number} Area (on projected plane).
   * @api
   */
  getArea() {
    return Tg(
      this.getOrientedFlatCoordinates(),
      0,
      this.ends_,
      this.stride
    );
  }
  /**
   * Get the coordinate array for this geometry.  This array has the structure
   * of a GeoJSON coordinate array for polygons.
   *
   * @param {boolean} [right] Orient coordinates according to the right-hand
   *     rule (counter-clockwise for exterior and clockwise for interior rings).
   *     If `false`, coordinates will be oriented according to the left-hand rule
   *     (clockwise for exterior and counter-clockwise for interior rings).
   *     By default, coordinate orientation will depend on how the geometry was
   *     constructed.
   * @return {Array<Array<import("../coordinate.js").Coordinate>>} Coordinates.
   * @api
   */
  getCoordinates(e) {
    let n;
    return e !== void 0 ? (n = this.getOrientedFlatCoordinates().slice(), Xl(n, 0, this.ends_, this.stride, e)) : n = this.flatCoordinates, sr(n, 0, this.ends_, this.stride);
  }
  /**
   * @return {Array<number>} Ends.
   */
  getEnds() {
    return this.ends_;
  }
  /**
   * @return {Array<number>} Interior point.
   */
  getFlatInteriorPoint() {
    if (this.flatInteriorPointRevision_ != this.getRevision()) {
      const e = Bn(this.getExtent());
      this.flatInteriorPoint_ = pa(
        this.getOrientedFlatCoordinates(),
        0,
        this.ends_,
        this.stride,
        e,
        0
      ), this.flatInteriorPointRevision_ = this.getRevision();
    }
    return (
      /** @type {import("../coordinate.js").Coordinate} */
      this.flatInteriorPoint_
    );
  }
  /**
   * Return an interior point of the polygon.
   * @return {Point} Interior point as XYM coordinate, where M is the
   * length of the horizontal intersection that the point belongs to.
   * @api
   */
  getInteriorPoint() {
    return new Dc(this.getFlatInteriorPoint(), "XYM");
  }
  /**
   * Return the number of rings of the polygon,  this includes the exterior
   * ring and any interior rings.
   *
   * @return {number} Number of rings.
   * @api
   */
  getLinearRingCount() {
    return this.ends_.length;
  }
  /**
   * Return the Nth linear ring of the polygon geometry. Return `null` if the
   * given index is out of range.
   * The exterior linear ring is available at index `0` and the interior rings
   * at index `1` and beyond.
   *
   * @param {number} index Index.
   * @return {LinearRing|null} Linear ring.
   * @api
   */
  getLinearRing(e) {
    return e < 0 || this.ends_.length <= e ? null : new Wl(
      this.flatCoordinates.slice(
        e === 0 ? 0 : this.ends_[e - 1],
        this.ends_[e]
      ),
      this.layout
    );
  }
  /**
   * Return the linear rings of the polygon.
   * @return {Array<LinearRing>} Linear rings.
   * @api
   */
  getLinearRings() {
    const e = this.layout, n = this.flatCoordinates, i = this.ends_, s = [];
    let r = 0;
    for (let o = 0, a = i.length; o < a; ++o) {
      const l = i[o], u = new Wl(
        n.slice(r, l),
        e
      );
      s.push(u), r = l;
    }
    return s;
  }
  /**
   * @return {Array<number>} Oriented flat coordinates.
   */
  getOrientedFlatCoordinates() {
    if (this.orientedRevision_ != this.getRevision()) {
      const e = this.flatCoordinates;
      kg(e, 0, this.ends_, this.stride) ? this.orientedFlatCoordinates_ = e : (this.orientedFlatCoordinates_ = e.slice(), this.orientedFlatCoordinates_.length = Xl(
        this.orientedFlatCoordinates_,
        0,
        this.ends_,
        this.stride
      )), this.orientedRevision_ = this.getRevision();
    }
    return (
      /** @type {Array<number>} */
      this.orientedFlatCoordinates_
    );
  }
  /**
   * @param {number} squaredTolerance Squared tolerance.
   * @return {Polygon} Simplified Polygon.
   * @protected
   */
  getSimplifiedGeometryInternal(e) {
    const n = [], i = [];
    return n.length = kc(
      this.flatCoordinates,
      0,
      this.ends_,
      this.stride,
      Math.sqrt(e),
      n,
      0,
      i
    ), new ss(n, "XY", i);
  }
  /**
   * Get the type of this geometry.
   * @return {import("./Geometry.js").Type} Geometry type.
   * @api
   */
  getType() {
    return "Polygon";
  }
  /**
   * Test if the geometry and the passed extent intersect.
   * @param {import("../extent.js").Extent} extent Extent.
   * @return {boolean} `true` if the geometry and the extent intersect.
   * @api
   */
  intersectsExtent(e) {
    return Pg(
      this.getOrientedFlatCoordinates(),
      0,
      this.ends_,
      this.stride,
      e
    );
  }
  /**
   * Set the coordinates of the polygon.
   * @param {!Array<Array<import("../coordinate.js").Coordinate>>} coordinates Coordinates.
   * @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
   * @api
   */
  setCoordinates(e, n) {
    this.setLayout(n, e, 2), this.flatCoordinates || (this.flatCoordinates = []);
    const i = Sg(
      this.flatCoordinates,
      0,
      e,
      this.stride,
      this.ends_
    );
    this.flatCoordinates.length = i.length === 0 ? 0 : i[i.length - 1], this.changed();
  }
}
function Yl(t) {
  if (br(t))
    throw new Error("Cannot create polygon from empty extent");
  const e = t[0], n = t[1], i = t[2], s = t[3], r = [
    e,
    n,
    e,
    s,
    i,
    s,
    i,
    n,
    e,
    n
  ];
  return new ss(r, "XY", [r.length]);
}
const ro = 0;
class Dg extends Nt {
  /**
   * @param {ViewOptions} [options] View options.
   */
  constructor(e) {
    super(), this.on, this.once, this.un, e = Object.assign({}, e), this.hints_ = [0, 0], this.animations_ = [], this.updateAnimationKey_, this.projection_ = ca(e.projection, "EPSG:3857"), this.viewportSize_ = [100, 100], this.targetCenter_ = null, this.targetResolution_, this.targetRotation_, this.nextCenter_ = null, this.nextResolution_, this.nextRotation_, this.cancelAnchor_ = void 0, e.projection && Sc(), e.center && (e.center = jt(e.center, this.projection_)), e.extent && (e.extent = On(e.extent, this.projection_)), this.applyOptions_(e);
  }
  /**
   * Set up the view with the given options.
   * @param {ViewOptions} options View options.
   */
  applyOptions_(e) {
    const n = Object.assign({}, e);
    for (const a in xt)
      delete n[a];
    this.setProperties(n, !0);
    const i = Ng(e);
    this.maxResolution_ = i.maxResolution, this.minResolution_ = i.minResolution, this.zoomFactor_ = i.zoomFactor, this.resolutions_ = e.resolutions, this.padding_ = e.padding, this.minZoom_ = i.minZoom;
    const s = Fg(e), r = i.constraint, o = Vg(e);
    this.constraints_ = {
      center: s,
      resolution: r,
      rotation: o
    }, this.setRotation(e.rotation !== void 0 ? e.rotation : 0), this.setCenterInternal(
      e.center !== void 0 ? e.center : null
    ), e.resolution !== void 0 ? this.setResolution(e.resolution) : e.zoom !== void 0 && this.setZoom(e.zoom);
  }
  /**
   * Padding (in css pixels).
   * If the map viewport is partially covered with other content (overlays) along
   * its edges, this setting allows to shift the center of the viewport away from that
   * content. The order of the values in the array is top, right, bottom, left.
   * The default is no padding, which is equivalent to `[0, 0, 0, 0]`.
   * @type {Array<number>|undefined}
   * @api
   */
  get padding() {
    return this.padding_;
  }
  set padding(e) {
    let n = this.padding_;
    this.padding_ = e;
    const i = this.getCenterInternal();
    if (i) {
      const s = e || [0, 0, 0, 0];
      n = n || [0, 0, 0, 0];
      const r = this.getResolution(), o = r / 2 * (s[3] - n[3] + n[1] - s[1]), a = r / 2 * (s[0] - n[0] + n[2] - s[2]);
      this.setCenterInternal([i[0] + o, i[1] - a]);
    }
  }
  /**
   * Get an updated version of the view options used to construct the view.  The
   * current resolution (or zoom), center, and rotation are applied to any stored
   * options.  The provided options can be used to apply new min/max zoom or
   * resolution limits.
   * @param {ViewOptions} newOptions New options to be applied.
   * @return {ViewOptions} New options updated with the current view state.
   */
  getUpdatedOptions_(e) {
    const n = this.getProperties();
    return n.resolution !== void 0 ? n.resolution = this.getResolution() : n.zoom = this.getZoom(), n.center = this.getCenterInternal(), n.rotation = this.getRotation(), Object.assign({}, n, e);
  }
  /**
   * Animate the view.  The view's center, zoom (or resolution), and rotation
   * can be animated for smooth transitions between view states.  For example,
   * to animate the view to a new zoom level:
   *
   *     view.animate({zoom: view.getZoom() + 1});
   *
   * By default, the animation lasts one second and uses in-and-out easing.  You
   * can customize this behavior by including `duration` (in milliseconds) and
   * `easing` options (see {@link module:ol/easing}).
   *
   * To chain together multiple animations, call the method with multiple
   * animation objects.  For example, to first zoom and then pan:
   *
   *     view.animate({zoom: 10}, {center: [0, 0]});
   *
   * If you provide a function as the last argument to the animate method, it
   * will get called at the end of an animation series.  The callback will be
   * called with `true` if the animation series completed on its own or `false`
   * if it was cancelled.
   *
   * Animations are cancelled by user interactions (e.g. dragging the map) or by
   * calling `view.setCenter()`, `view.setResolution()`, or `view.setRotation()`
   * (or another method that calls one of these).
   *
   * @param {...(AnimationOptions|function(boolean): void)} var_args Animation
   *     options.  Multiple animations can be run in series by passing multiple
   *     options objects.  To run multiple animations in parallel, call the method
   *     multiple times.  An optional callback can be provided as a final
   *     argument.  The callback will be called with a boolean indicating whether
   *     the animation completed without being cancelled.
   * @api
   */
  animate(e) {
    this.isDef() && !this.getAnimating() && this.resolveConstraints(0);
    const n = new Array(arguments.length);
    for (let i = 0; i < n.length; ++i) {
      let s = arguments[i];
      s.center && (s = Object.assign({}, s), s.center = jt(
        s.center,
        this.getProjection()
      )), s.anchor && (s = Object.assign({}, s), s.anchor = jt(
        s.anchor,
        this.getProjection()
      )), n[i] = s;
    }
    this.animateInternal.apply(this, n);
  }
  /**
   * @param {...(AnimationOptions|function(boolean): void)} var_args Animation options.
   */
  animateInternal(e) {
    let n = arguments.length, i;
    n > 1 && typeof arguments[n - 1] == "function" && (i = arguments[n - 1], --n);
    let s = 0;
    for (; s < n && !this.isDef(); ++s) {
      const c = arguments[s];
      c.center && this.setCenterInternal(c.center), c.zoom !== void 0 ? this.setZoom(c.zoom) : c.resolution && this.setResolution(c.resolution), c.rotation !== void 0 && this.setRotation(c.rotation);
    }
    if (s === n) {
      i && Bs(i, !0);
      return;
    }
    let r = Date.now(), o = this.targetCenter_.slice(), a = this.targetResolution_, l = this.targetRotation_;
    const u = [];
    for (; s < n; ++s) {
      const c = (
        /** @type {AnimationOptions} */
        arguments[s]
      ), h = {
        start: r,
        complete: !1,
        anchor: c.anchor,
        duration: c.duration !== void 0 ? c.duration : 1e3,
        easing: c.easing || cg,
        callback: i
      };
      if (c.center && (h.sourceCenter = o, h.targetCenter = c.center.slice(), o = h.targetCenter), c.zoom !== void 0 ? (h.sourceResolution = a, h.targetResolution = this.getResolutionForZoom(c.zoom), a = h.targetResolution) : c.resolution && (h.sourceResolution = a, h.targetResolution = c.resolution, a = h.targetResolution), c.rotation !== void 0) {
        h.sourceRotation = l;
        const d = fi(c.rotation - l + Math.PI, 2 * Math.PI) - Math.PI;
        h.targetRotation = l + d, l = h.targetRotation;
      }
      Gg(h) ? h.complete = !0 : r += h.duration, u.push(h);
    }
    this.animations_.push(u), this.setHint(Ve.ANIMATING, 1), this.updateAnimations_();
  }
  /**
   * Determine if the view is being animated.
   * @return {boolean} The view is being animated.
   * @api
   */
  getAnimating() {
    return this.hints_[Ve.ANIMATING] > 0;
  }
  /**
   * Determine if the user is interacting with the view, such as panning or zooming.
   * @return {boolean} The view is being interacted with.
   * @api
   */
  getInteracting() {
    return this.hints_[Ve.INTERACTING] > 0;
  }
  /**
   * Cancel any ongoing animations.
   * @api
   */
  cancelAnimations() {
    this.setHint(Ve.ANIMATING, -this.hints_[Ve.ANIMATING]);
    let e;
    for (let n = 0, i = this.animations_.length; n < i; ++n) {
      const s = this.animations_[n];
      if (s[0].callback && Bs(s[0].callback, !1), !e)
        for (let r = 0, o = s.length; r < o; ++r) {
          const a = s[r];
          if (!a.complete) {
            e = a.anchor;
            break;
          }
        }
    }
    this.animations_.length = 0, this.cancelAnchor_ = e, this.nextCenter_ = null, this.nextResolution_ = NaN, this.nextRotation_ = NaN;
  }
  /**
   * Update all animations.
   */
  updateAnimations_() {
    if (this.updateAnimationKey_ !== void 0 && (cancelAnimationFrame(this.updateAnimationKey_), this.updateAnimationKey_ = void 0), !this.getAnimating())
      return;
    const e = Date.now();
    let n = !1;
    for (let i = this.animations_.length - 1; i >= 0; --i) {
      const s = this.animations_[i];
      let r = !0;
      for (let o = 0, a = s.length; o < a; ++o) {
        const l = s[o];
        if (l.complete)
          continue;
        const u = e - l.start;
        let c = l.duration > 0 ? u / l.duration : 1;
        c >= 1 ? (l.complete = !0, c = 1) : r = !1;
        const h = l.easing(c);
        if (l.sourceCenter) {
          const d = l.sourceCenter[0], f = l.sourceCenter[1], g = l.targetCenter[0], m = l.targetCenter[1];
          this.nextCenter_ = l.targetCenter;
          const _ = d + h * (g - d), p = f + h * (m - f);
          this.targetCenter_ = [_, p];
        }
        if (l.sourceResolution && l.targetResolution) {
          const d = h === 1 ? l.targetResolution : l.sourceResolution + h * (l.targetResolution - l.sourceResolution);
          if (l.anchor) {
            const f = this.getViewportSize_(this.getRotation()), g = this.constraints_.resolution(
              d,
              0,
              f,
              !0
            );
            this.targetCenter_ = this.calculateCenterZoom(
              g,
              l.anchor
            );
          }
          this.nextResolution_ = l.targetResolution, this.targetResolution_ = d, this.applyTargetState_(!0);
        }
        if (l.sourceRotation !== void 0 && l.targetRotation !== void 0) {
          const d = h === 1 ? fi(l.targetRotation + Math.PI, 2 * Math.PI) - Math.PI : l.sourceRotation + h * (l.targetRotation - l.sourceRotation);
          if (l.anchor) {
            const f = this.constraints_.rotation(
              d,
              !0
            );
            this.targetCenter_ = this.calculateCenterRotate(
              f,
              l.anchor
            );
          }
          this.nextRotation_ = l.targetRotation, this.targetRotation_ = d;
        }
        if (this.applyTargetState_(!0), n = !0, !l.complete)
          break;
      }
      if (r) {
        this.animations_[i] = null, this.setHint(Ve.ANIMATING, -1), this.nextCenter_ = null, this.nextResolution_ = NaN, this.nextRotation_ = NaN;
        const o = s[0].callback;
        o && Bs(o, !0);
      }
    }
    this.animations_ = this.animations_.filter(Boolean), n && this.updateAnimationKey_ === void 0 && (this.updateAnimationKey_ = requestAnimationFrame(
      this.updateAnimations_.bind(this)
    ));
  }
  /**
   * @param {number} rotation Target rotation.
   * @param {import("./coordinate.js").Coordinate} anchor Rotation anchor.
   * @return {import("./coordinate.js").Coordinate|undefined} Center for rotation and anchor.
   */
  calculateCenterRotate(e, n) {
    let i;
    const s = this.getCenterInternal();
    return s !== void 0 && (i = [s[0] - n[0], s[1] - n[1]], la(i, e - this.getRotation()), Zf(i, n)), i;
  }
  /**
   * @param {number} resolution Target resolution.
   * @param {import("./coordinate.js").Coordinate} anchor Zoom anchor.
   * @return {import("./coordinate.js").Coordinate|undefined} Center for resolution and anchor.
   */
  calculateCenterZoom(e, n) {
    let i;
    const s = this.getCenterInternal(), r = this.getResolution();
    if (s !== void 0 && r !== void 0) {
      const o = n[0] - e * (n[0] - s[0]) / r, a = n[1] - e * (n[1] - s[1]) / r;
      i = [o, a];
    }
    return i;
  }
  /**
   * Returns the current viewport size.
   * @private
   * @param {number} [rotation] Take into account the rotation of the viewport when giving the size
   * @return {import("./size.js").Size} Viewport size or `[100, 100]` when no viewport is found.
   */
  getViewportSize_(e) {
    const n = this.viewportSize_;
    if (e) {
      const i = n[0], s = n[1];
      return [
        Math.abs(i * Math.cos(e)) + Math.abs(s * Math.sin(e)),
        Math.abs(i * Math.sin(e)) + Math.abs(s * Math.cos(e))
      ];
    }
    return n;
  }
  /**
   * Stores the viewport size on the view. The viewport size is not read every time from the DOM
   * to avoid performance hit and layout reflow.
   * This should be done on map size change.
   * Note: the constraints are not resolved during an animation to avoid stopping it
   * @param {import("./size.js").Size} [size] Viewport size; if undefined, [100, 100] is assumed
   */
  setViewportSize(e) {
    this.viewportSize_ = Array.isArray(e) ? e.slice() : [100, 100], this.getAnimating() || this.resolveConstraints(0);
  }
  /**
   * Get the view center.
   * @return {import("./coordinate.js").Coordinate|undefined} The center of the view.
   * @observable
   * @api
   */
  getCenter() {
    const e = this.getCenterInternal();
    return e && ko(e, this.getProjection());
  }
  /**
   * Get the view center without transforming to user projection.
   * @return {import("./coordinate.js").Coordinate|undefined} The center of the view.
   */
  getCenterInternal() {
    return (
      /** @type {import("./coordinate.js").Coordinate|undefined} */
      this.get(xt.CENTER)
    );
  }
  /**
   * @return {Constraints} Constraints.
   */
  getConstraints() {
    return this.constraints_;
  }
  /**
   * @return {boolean} Resolution constraint is set
   */
  getConstrainResolution() {
    return this.get("constrainResolution");
  }
  /**
   * @param {Array<number>} [hints] Destination array.
   * @return {Array<number>} Hint.
   */
  getHints(e) {
    return e !== void 0 ? (e[0] = this.hints_[0], e[1] = this.hints_[1], e) : this.hints_.slice();
  }
  /**
   * Calculate the extent for the current view state and the passed box size.
   * @param {import("./size.js").Size} [size] The pixel dimensions of the box
   * into which the calculated extent should fit. Defaults to the size of the
   * map the view is associated with.
   * If no map or multiple maps are connected to the view, provide the desired
   * box size (e.g. `map.getSize()`).
   * @return {import("./extent.js").Extent} Extent.
   * @api
   */
  calculateExtent(e) {
    const n = this.calculateExtentInternal(e);
    return ha(n, this.getProjection());
  }
  /**
   * @param {import("./size.js").Size} [size] Box pixel size. If not provided,
   * the map's last known viewport size will be used.
   * @return {import("./extent.js").Extent} Extent.
   */
  calculateExtentInternal(e) {
    e = e || this.getViewportSizeMinusPadding_();
    const n = (
      /** @type {!import("./coordinate.js").Coordinate} */
      this.getCenterInternal()
    );
    ue(n, "The view center is not defined");
    const i = (
      /** @type {!number} */
      this.getResolution()
    );
    ue(i !== void 0, "The view resolution is not defined");
    const s = (
      /** @type {!number} */
      this.getRotation()
    );
    return ue(s !== void 0, "The view rotation is not defined"), Ao(n, i, s, e);
  }
  /**
   * Get the maximum resolution of the view.
   * @return {number} The maximum resolution of the view.
   * @api
   */
  getMaxResolution() {
    return this.maxResolution_;
  }
  /**
   * Get the minimum resolution of the view.
   * @return {number} The minimum resolution of the view.
   * @api
   */
  getMinResolution() {
    return this.minResolution_;
  }
  /**
   * Get the maximum zoom level for the view.
   * @return {number} The maximum zoom level.
   * @api
   */
  getMaxZoom() {
    return (
      /** @type {number} */
      this.getZoomForResolution(this.minResolution_)
    );
  }
  /**
   * Set a new maximum zoom level for the view.
   * @param {number} zoom The maximum zoom level.
   * @api
   */
  setMaxZoom(e) {
    this.applyOptions_(this.getUpdatedOptions_({ maxZoom: e }));
  }
  /**
   * Get the minimum zoom level for the view.
   * @return {number} The minimum zoom level.
   * @api
   */
  getMinZoom() {
    return (
      /** @type {number} */
      this.getZoomForResolution(this.maxResolution_)
    );
  }
  /**
   * Set a new minimum zoom level for the view.
   * @param {number} zoom The minimum zoom level.
   * @api
   */
  setMinZoom(e) {
    this.applyOptions_(this.getUpdatedOptions_({ minZoom: e }));
  }
  /**
   * Set whether the view should allow intermediary zoom levels.
   * @param {boolean} enabled Whether the resolution is constrained.
   * @api
   */
  setConstrainResolution(e) {
    this.applyOptions_(this.getUpdatedOptions_({ constrainResolution: e }));
  }
  /**
   * Get the view projection.
   * @return {import("./proj/Projection.js").default} The projection of the view.
   * @api
   */
  getProjection() {
    return this.projection_;
  }
  /**
   * Get the view resolution.
   * @return {number|undefined} The resolution of the view.
   * @observable
   * @api
   */
  getResolution() {
    return (
      /** @type {number|undefined} */
      this.get(xt.RESOLUTION)
    );
  }
  /**
   * Get the resolutions for the view. This returns the array of resolutions
   * passed to the constructor of the View, or undefined if none were given.
   * @return {Array<number>|undefined} The resolutions of the view.
   * @api
   */
  getResolutions() {
    return this.resolutions_;
  }
  /**
   * Get the resolution for a provided extent (in map units) and size (in pixels).
   * @param {import("./extent.js").Extent} extent Extent.
   * @param {import("./size.js").Size} [size] Box pixel size.
   * @return {number} The resolution at which the provided extent will render at
   *     the given size.
   * @api
   */
  getResolutionForExtent(e, n) {
    return this.getResolutionForExtentInternal(
      On(e, this.getProjection()),
      n
    );
  }
  /**
   * Get the resolution for a provided extent (in map units) and size (in pixels).
   * @param {import("./extent.js").Extent} extent Extent.
   * @param {import("./size.js").Size} [size] Box pixel size.
   * @return {number} The resolution at which the provided extent will render at
   *     the given size.
   */
  getResolutionForExtentInternal(e, n) {
    n = n || this.getViewportSizeMinusPadding_();
    const i = _e(e) / n[0], s = Ge(e) / n[1];
    return Math.max(i, s);
  }
  /**
   * Return a function that returns a value between 0 and 1 for a
   * resolution. Exponential scaling is assumed.
   * @param {number} [power] Power.
   * @return {function(number): number} Resolution for value function.
   */
  getResolutionForValueFunction(e) {
    e = e || 2;
    const n = this.getConstrainedResolution(this.maxResolution_), i = this.minResolution_, s = Math.log(n / i) / Math.log(e);
    return (
      /**
       * @param {number} value Value.
       * @return {number} Resolution.
       */
      function(r) {
        return n / Math.pow(e, r * s);
      }
    );
  }
  /**
   * Get the view rotation.
   * @return {number} The rotation of the view in radians.
   * @observable
   * @api
   */
  getRotation() {
    return (
      /** @type {number} */
      this.get(xt.ROTATION)
    );
  }
  /**
   * Return a function that returns a resolution for a value between
   * 0 and 1. Exponential scaling is assumed.
   * @param {number} [power] Power.
   * @return {function(number): number} Value for resolution function.
   */
  getValueForResolutionFunction(e) {
    const n = Math.log(e || 2), i = this.getConstrainedResolution(this.maxResolution_), s = this.minResolution_, r = Math.log(i / s) / n;
    return (
      /**
       * @param {number} resolution Resolution.
       * @return {number} Value.
       */
      function(o) {
        return Math.log(i / o) / n / r;
      }
    );
  }
  /**
   * Returns the size of the viewport minus padding.
   * @private
   * @param {number} [rotation] Take into account the rotation of the viewport when giving the size
   * @return {import("./size.js").Size} Viewport size reduced by the padding.
   */
  getViewportSizeMinusPadding_(e) {
    let n = this.getViewportSize_(e);
    const i = this.padding_;
    return i && (n = [
      n[0] - i[1] - i[3],
      n[1] - i[0] - i[2]
    ]), n;
  }
  /**
   * @return {State} View state.
   */
  getState() {
    const e = this.getProjection(), n = this.getResolution(), i = this.getRotation();
    let s = (
      /** @type {import("./coordinate.js").Coordinate} */
      this.getCenterInternal()
    );
    const r = this.padding_;
    if (r) {
      const o = this.getViewportSizeMinusPadding_();
      s = oo(
        s,
        this.getViewportSize_(),
        [o[0] / 2 + r[3], o[1] / 2 + r[0]],
        n,
        i
      );
    }
    return {
      center: s.slice(0),
      projection: e !== void 0 ? e : null,
      resolution: n,
      nextCenter: this.nextCenter_,
      nextResolution: this.nextResolution_,
      nextRotation: this.nextRotation_,
      rotation: i,
      zoom: this.getZoom()
    };
  }
  /**
   * @return {ViewStateLayerStateExtent} Like `FrameState`, but just `viewState` and `extent`.
   */
  getViewStateAndExtent() {
    return {
      viewState: this.getState(),
      extent: this.calculateExtent()
    };
  }
  /**
   * Get the current zoom level. This method may return non-integer zoom levels
   * if the view does not constrain the resolution, or if an interaction or
   * animation is underway.
   * @return {number|undefined} Zoom.
   * @api
   */
  getZoom() {
    let e;
    const n = this.getResolution();
    return n !== void 0 && (e = this.getZoomForResolution(n)), e;
  }
  /**
   * Get the zoom level for a resolution.
   * @param {number} resolution The resolution.
   * @return {number|undefined} The zoom level for the provided resolution.
   * @api
   */
  getZoomForResolution(e) {
    let n = this.minZoom_ || 0, i, s;
    if (this.resolutions_) {
      const r = na(this.resolutions_, e, 1);
      n = r, i = this.resolutions_[r], r == this.resolutions_.length - 1 ? s = 2 : s = i / this.resolutions_[r + 1];
    } else
      i = this.maxResolution_, s = this.zoomFactor_;
    return n + Math.log(i / e) / Math.log(s);
  }
  /**
   * Get the resolution for a zoom level.
   * @param {number} zoom Zoom level.
   * @return {number} The view resolution for the provided zoom level.
   * @api
   */
  getResolutionForZoom(e) {
    if (this.resolutions_) {
      if (this.resolutions_.length <= 1)
        return 0;
      const n = Re(
        Math.floor(e),
        0,
        this.resolutions_.length - 2
      ), i = this.resolutions_[n] / this.resolutions_[n + 1];
      return this.resolutions_[n] / Math.pow(i, Re(e - n, 0, 1));
    }
    return this.maxResolution_ / Math.pow(this.zoomFactor_, e - this.minZoom_);
  }
  /**
   * Fit the given geometry or extent based on the given map size and border.
   * The size is pixel dimensions of the box to fit the extent into.
   * In most cases you will want to use the map size, that is `map.getSize()`.
   * Takes care of the map angle.
   * @param {import("./geom/SimpleGeometry.js").default|import("./extent.js").Extent} geometryOrExtent The geometry or
   *     extent to fit the view to.
   * @param {FitOptions} [options] Options.
   * @api
   */
  fit(e, n) {
    let i;
    if (ue(
      Array.isArray(e) || typeof /** @type {?} */
      e.getSimplifiedGeometry == "function",
      "Invalid extent or geometry provided as `geometry`"
    ), Array.isArray(e)) {
      ue(
        !br(e),
        "Cannot fit empty extent provided as `geometry`"
      );
      const s = On(e, this.getProjection());
      i = Yl(s);
    } else if (e.getType() === "Circle") {
      const s = On(
        e.getExtent(),
        this.getProjection()
      );
      i = Yl(s), i.rotate(this.getRotation(), Bn(s));
    } else
      i = e;
    this.fitInternal(i, n);
  }
  /**
   * Calculate rotated extent
   * @param {import("./geom/SimpleGeometry.js").default} geometry The geometry.
   * @return {import("./extent").Extent} The rotated extent for the geometry.
   */
  rotatedExtentForGeometry(e) {
    const n = this.getRotation(), i = Math.cos(n), s = Math.sin(-n), r = e.getFlatCoordinates(), o = e.getStride();
    let a = 1 / 0, l = 1 / 0, u = -1 / 0, c = -1 / 0;
    for (let h = 0, d = r.length; h < d; h += o) {
      const f = r[h] * i - r[h + 1] * s, g = r[h] * s + r[h + 1] * i;
      a = Math.min(a, f), l = Math.min(l, g), u = Math.max(u, f), c = Math.max(c, g);
    }
    return [a, l, u, c];
  }
  /**
   * @param {import("./geom/SimpleGeometry.js").default} geometry The geometry.
   * @param {FitOptions} [options] Options.
   */
  fitInternal(e, n) {
    n = n || {};
    let i = n.size;
    i || (i = this.getViewportSizeMinusPadding_());
    const s = n.padding !== void 0 ? n.padding : [0, 0, 0, 0], r = n.nearest !== void 0 ? n.nearest : !1;
    let o;
    n.minResolution !== void 0 ? o = n.minResolution : n.maxZoom !== void 0 ? o = this.getResolutionForZoom(n.maxZoom) : o = 0;
    const a = this.rotatedExtentForGeometry(e);
    let l = this.getResolutionForExtentInternal(a, [
      i[0] - s[1] - s[3],
      i[1] - s[0] - s[2]
    ]);
    l = isNaN(l) ? o : Math.max(l, o), l = this.getConstrainedResolution(l, r ? 0 : 1);
    const u = this.getRotation(), c = Math.sin(u), h = Math.cos(u), d = Bn(a);
    d[0] += (s[1] - s[3]) / 2 * l, d[1] += (s[0] - s[2]) / 2 * l;
    const f = d[0] * h - d[1] * c, g = d[1] * h + d[0] * c, m = this.getConstrainedCenter([f, g], l), _ = n.callback ? n.callback : pi;
    n.duration !== void 0 ? this.animateInternal(
      {
        resolution: l,
        center: m,
        duration: n.duration,
        easing: n.easing
      },
      _
    ) : (this.targetResolution_ = l, this.targetCenter_ = m, this.applyTargetState_(!1, !0), Bs(_, !0));
  }
  /**
   * Center on coordinate and view position.
   * @param {import("./coordinate.js").Coordinate} coordinate Coordinate.
   * @param {import("./size.js").Size} size Box pixel size.
   * @param {import("./pixel.js").Pixel} position Position on the view to center on.
   * @api
   */
  centerOn(e, n, i) {
    this.centerOnInternal(
      jt(e, this.getProjection()),
      n,
      i
    );
  }
  /**
   * @param {import("./coordinate.js").Coordinate} coordinate Coordinate.
   * @param {import("./size.js").Size} size Box pixel size.
   * @param {import("./pixel.js").Pixel} position Position on the view to center on.
   */
  centerOnInternal(e, n, i) {
    this.setCenterInternal(
      oo(
        e,
        n,
        i,
        this.getResolution(),
        this.getRotation()
      )
    );
  }
  /**
   * Calculates the shift between map and viewport center.
   * @param {import("./coordinate.js").Coordinate} center Center.
   * @param {number} resolution Resolution.
   * @param {number} rotation Rotation.
   * @param {import("./size.js").Size} size Size.
   * @return {Array<number>|undefined} Center shift.
   */
  calculateCenterShift(e, n, i, s) {
    let r;
    const o = this.padding_;
    if (o && e) {
      const a = this.getViewportSizeMinusPadding_(-i), l = oo(
        e,
        s,
        [a[0] / 2 + o[3], a[1] / 2 + o[0]],
        n,
        i
      );
      r = [
        e[0] - l[0],
        e[1] - l[1]
      ];
    }
    return r;
  }
  /**
   * @return {boolean} Is defined.
   */
  isDef() {
    return !!this.getCenterInternal() && this.getResolution() !== void 0;
  }
  /**
   * Adds relative coordinates to the center of the view. Any extent constraint will apply.
   * @param {import("./coordinate.js").Coordinate} deltaCoordinates Relative value to add.
   * @api
   */
  adjustCenter(e) {
    const n = ko(this.targetCenter_, this.getProjection());
    this.setCenter([
      n[0] + e[0],
      n[1] + e[1]
    ]);
  }
  /**
   * Adds relative coordinates to the center of the view. Any extent constraint will apply.
   * @param {import("./coordinate.js").Coordinate} deltaCoordinates Relative value to add.
   */
  adjustCenterInternal(e) {
    const n = this.targetCenter_;
    this.setCenterInternal([
      n[0] + e[0],
      n[1] + e[1]
    ]);
  }
  /**
   * Multiply the view resolution by a ratio, optionally using an anchor. Any resolution
   * constraint will apply.
   * @param {number} ratio The ratio to apply on the view resolution.
   * @param {import("./coordinate.js").Coordinate} [anchor] The origin of the transformation.
   * @api
   */
  adjustResolution(e, n) {
    n = n && jt(n, this.getProjection()), this.adjustResolutionInternal(e, n);
  }
  /**
   * Multiply the view resolution by a ratio, optionally using an anchor. Any resolution
   * constraint will apply.
   * @param {number} ratio The ratio to apply on the view resolution.
   * @param {import("./coordinate.js").Coordinate} [anchor] The origin of the transformation.
   */
  adjustResolutionInternal(e, n) {
    const i = this.getAnimating() || this.getInteracting(), s = this.getViewportSize_(this.getRotation()), r = this.constraints_.resolution(
      this.targetResolution_ * e,
      0,
      s,
      i
    );
    n && (this.targetCenter_ = this.calculateCenterZoom(r, n)), this.targetResolution_ *= e, this.applyTargetState_();
  }
  /**
   * Adds a value to the view zoom level, optionally using an anchor. Any resolution
   * constraint will apply.
   * @param {number} delta Relative value to add to the zoom level.
   * @param {import("./coordinate.js").Coordinate} [anchor] The origin of the transformation.
   * @api
   */
  adjustZoom(e, n) {
    this.adjustResolution(Math.pow(this.zoomFactor_, -e), n);
  }
  /**
   * Adds a value to the view rotation, optionally using an anchor. Any rotation
   * constraint will apply.
   * @param {number} delta Relative value to add to the zoom rotation, in radians.
   * @param {import("./coordinate.js").Coordinate} [anchor] The rotation center.
   * @api
   */
  adjustRotation(e, n) {
    n && (n = jt(n, this.getProjection())), this.adjustRotationInternal(e, n);
  }
  /**
   * @param {number} delta Relative value to add to the zoom rotation, in radians.
   * @param {import("./coordinate.js").Coordinate} [anchor] The rotation center.
   */
  adjustRotationInternal(e, n) {
    const i = this.getAnimating() || this.getInteracting(), s = this.constraints_.rotation(
      this.targetRotation_ + e,
      i
    );
    n && (this.targetCenter_ = this.calculateCenterRotate(s, n)), this.targetRotation_ += e, this.applyTargetState_();
  }
  /**
   * Set the center of the current view. Any extent constraint will apply.
   * @param {import("./coordinate.js").Coordinate|undefined} center The center of the view.
   * @observable
   * @api
   */
  setCenter(e) {
    this.setCenterInternal(
      e && jt(e, this.getProjection())
    );
  }
  /**
   * Set the center using the view projection (not the user projection).
   * @param {import("./coordinate.js").Coordinate|undefined} center The center of the view.
   */
  setCenterInternal(e) {
    this.targetCenter_ = e, this.applyTargetState_();
  }
  /**
   * @param {import("./ViewHint.js").default} hint Hint.
   * @param {number} delta Delta.
   * @return {number} New value.
   */
  setHint(e, n) {
    return this.hints_[e] += n, this.changed(), this.hints_[e];
  }
  /**
   * Set the resolution for this view. Any resolution constraint will apply.
   * @param {number|undefined} resolution The resolution of the view.
   * @observable
   * @api
   */
  setResolution(e) {
    this.targetResolution_ = e, this.applyTargetState_();
  }
  /**
   * Set the rotation for this view. Any rotation constraint will apply.
   * @param {number} rotation The rotation of the view in radians.
   * @observable
   * @api
   */
  setRotation(e) {
    this.targetRotation_ = e, this.applyTargetState_();
  }
  /**
   * Zoom to a specific zoom level. Any resolution constrain will apply.
   * @param {number} zoom Zoom level.
   * @api
   */
  setZoom(e) {
    this.setResolution(this.getResolutionForZoom(e));
  }
  /**
   * Recompute rotation/resolution/center based on target values.
   * Note: we have to compute rotation first, then resolution and center considering that
   * parameters can influence one another in case a view extent constraint is present.
   * @param {boolean} [doNotCancelAnims] Do not cancel animations.
   * @param {boolean} [forceMoving] Apply constraints as if the view is moving.
   * @private
   */
  applyTargetState_(e, n) {
    const i = this.getAnimating() || this.getInteracting() || n, s = this.constraints_.rotation(
      this.targetRotation_,
      i
    ), r = this.getViewportSize_(s), o = this.constraints_.resolution(
      this.targetResolution_,
      0,
      r,
      i
    ), a = this.constraints_.center(
      this.targetCenter_,
      o,
      r,
      i,
      this.calculateCenterShift(
        this.targetCenter_,
        o,
        s,
        r
      )
    );
    this.get(xt.ROTATION) !== s && this.set(xt.ROTATION, s), this.get(xt.RESOLUTION) !== o && (this.set(xt.RESOLUTION, o), this.set("zoom", this.getZoom(), !0)), (!a || !this.get(xt.CENTER) || !nr(this.get(xt.CENTER), a)) && this.set(xt.CENTER, a), this.getAnimating() && !e && this.cancelAnimations(), this.cancelAnchor_ = void 0;
  }
  /**
   * If any constraints need to be applied, an animation will be triggered.
   * This is typically done on interaction end.
   * Note: calling this with a duration of 0 will apply the constrained values straight away,
   * without animation.
   * @param {number} [duration] The animation duration in ms.
   * @param {number} [resolutionDirection] Which direction to zoom.
   * @param {import("./coordinate.js").Coordinate} [anchor] The origin of the transformation.
   */
  resolveConstraints(e, n, i) {
    e = e !== void 0 ? e : 200;
    const s = n || 0, r = this.constraints_.rotation(this.targetRotation_), o = this.getViewportSize_(r), a = this.constraints_.resolution(
      this.targetResolution_,
      s,
      o
    ), l = this.constraints_.center(
      this.targetCenter_,
      a,
      o,
      !1,
      this.calculateCenterShift(
        this.targetCenter_,
        a,
        r,
        o
      )
    );
    if (e === 0 && !this.cancelAnchor_) {
      this.targetResolution_ = a, this.targetRotation_ = r, this.targetCenter_ = l, this.applyTargetState_();
      return;
    }
    i = i || (e === 0 ? this.cancelAnchor_ : void 0), this.cancelAnchor_ = void 0, (this.getResolution() !== a || this.getRotation() !== r || !this.getCenterInternal() || !nr(this.getCenterInternal(), l)) && (this.getAnimating() && this.cancelAnimations(), this.animateInternal({
      rotation: r,
      center: l,
      resolution: a,
      duration: e,
      easing: Ti,
      anchor: i
    }));
  }
  /**
   * Notify the View that an interaction has started.
   * The view state will be resolved to a stable one if needed
   * (depending on its constraints).
   * @api
   */
  beginInteraction() {
    this.resolveConstraints(0), this.setHint(Ve.INTERACTING, 1);
  }
  /**
   * Notify the View that an interaction has ended. The view state will be resolved
   * to a stable one if needed (depending on its constraints).
   * @param {number} [duration] Animation duration in ms.
   * @param {number} [resolutionDirection] Which direction to zoom.
   * @param {import("./coordinate.js").Coordinate} [anchor] The origin of the transformation.
   * @api
   */
  endInteraction(e, n, i) {
    i = i && jt(i, this.getProjection()), this.endInteractionInternal(e, n, i);
  }
  /**
   * Notify the View that an interaction has ended. The view state will be resolved
   * to a stable one if needed (depending on its constraints).
   * @param {number} [duration] Animation duration in ms.
   * @param {number} [resolutionDirection] Which direction to zoom.
   * @param {import("./coordinate.js").Coordinate} [anchor] The origin of the transformation.
   */
  endInteractionInternal(e, n, i) {
    this.getInteracting() && (this.setHint(Ve.INTERACTING, -1), this.resolveConstraints(e, n, i));
  }
  /**
   * Get a valid position for the view center according to the current constraints.
   * @param {import("./coordinate.js").Coordinate|undefined} targetCenter Target center position.
   * @param {number} [targetResolution] Target resolution. If not supplied, the current one will be used.
   * This is useful to guess a valid center position at a different zoom level.
   * @return {import("./coordinate.js").Coordinate|undefined} Valid center position.
   */
  getConstrainedCenter(e, n) {
    const i = this.getViewportSize_(this.getRotation());
    return this.constraints_.center(
      e,
      n || this.getResolution(),
      i
    );
  }
  /**
   * Get a valid zoom level according to the current view constraints.
   * @param {number|undefined} targetZoom Target zoom.
   * @param {number} [direction=0] Indicate which resolution should be used
   * by a renderer if the view resolution does not match any resolution of the tile source.
   * If 0, the nearest resolution will be used. If 1, the nearest lower resolution
   * will be used. If -1, the nearest higher resolution will be used.
   * @return {number|undefined} Valid zoom level.
   */
  getConstrainedZoom(e, n) {
    const i = this.getResolutionForZoom(e);
    return this.getZoomForResolution(
      this.getConstrainedResolution(i, n)
    );
  }
  /**
   * Get a valid resolution according to the current view constraints.
   * @param {number|undefined} targetResolution Target resolution.
   * @param {number} [direction=0] Indicate which resolution should be used
   * by a renderer if the view resolution does not match any resolution of the tile source.
   * If 0, the nearest resolution will be used. If 1, the nearest lower resolution
   * will be used. If -1, the nearest higher resolution will be used.
   * @return {number|undefined} Valid resolution.
   */
  getConstrainedResolution(e, n) {
    n = n || 0;
    const i = this.getViewportSize_(this.getRotation());
    return this.constraints_.resolution(e, n, i);
  }
}
function Bs(t, e) {
  setTimeout(function() {
    t(e);
  }, 0);
}
function Fg(t) {
  if (t.extent !== void 0) {
    const n = t.smoothExtentConstraint !== void 0 ? t.smoothExtentConstraint : !0;
    return Dl(t.extent, t.constrainOnlyCenter, n);
  }
  const e = ca(t.projection, "EPSG:3857");
  if (t.multiWorld !== !0 && e.isGlobal()) {
    const n = e.getExtent().slice();
    return n[0] = -1 / 0, n[2] = 1 / 0, Dl(n, !1, !1);
  }
  return rg;
}
function Ng(t) {
  let e, n, i, o = t.minZoom !== void 0 ? t.minZoom : ro, a = t.maxZoom !== void 0 ? t.maxZoom : 28;
  const l = t.zoomFactor !== void 0 ? t.zoomFactor : 2, u = t.multiWorld !== void 0 ? t.multiWorld : !1, c = t.smoothResolutionConstraint !== void 0 ? t.smoothResolutionConstraint : !0, h = t.showFullExtent !== void 0 ? t.showFullExtent : !1, d = ca(t.projection, "EPSG:3857"), f = d.getExtent();
  let g = t.constrainOnlyCenter, m = t.extent;
  if (!u && !m && d.isGlobal() && (g = !1, m = f), t.resolutions !== void 0) {
    const _ = t.resolutions;
    n = _[o], i = _[a] !== void 0 ? _[a] : _[_.length - 1], t.constrainResolution ? e = og(
      _,
      c,
      !g && m,
      h
    ) : e = Fl(
      n,
      i,
      c,
      !g && m,
      h
    );
  } else {
    const p = (f ? Math.max(_e(f), Ge(f)) : (
      // use an extent that can fit the whole world if need be
      360 * ns.degrees / d.getMetersPerUnit()
    )) / ra / Math.pow(2, ro), y = p / Math.pow(2, 28 - ro);
    n = t.maxResolution, n !== void 0 ? o = 0 : n = p / Math.pow(l, o), i = t.minResolution, i === void 0 && (t.maxZoom !== void 0 ? t.maxResolution !== void 0 ? i = n / Math.pow(l, a) : i = p / Math.pow(l, a) : i = y), a = o + Math.floor(
      Math.log(n / i) / Math.log(l)
    ), i = n / Math.pow(l, a - o), t.constrainResolution ? e = ag(
      l,
      n,
      i,
      c,
      !g && m,
      h
    ) : e = Fl(
      n,
      i,
      c,
      !g && m,
      h
    );
  }
  return {
    constraint: e,
    maxResolution: n,
    minResolution: i,
    minZoom: o,
    zoomFactor: l
  };
}
function Vg(t) {
  if (t.enableRotation !== void 0 ? t.enableRotation : !0) {
    const n = t.constrainRotation;
    return n === void 0 || n === !0 ? ug() : n === !1 ? Nl : typeof n == "number" ? lg(n) : Nl;
  }
  return ga;
}
function Gg(t) {
  return !(t.sourceCenter && t.targetCenter && !nr(t.sourceCenter, t.targetCenter) || t.sourceResolution !== t.targetResolution || t.sourceRotation !== t.targetRotation);
}
function oo(t, e, n, i, s) {
  const r = Math.cos(-s);
  let o = Math.sin(-s), a = t[0] * r - t[1] * o, l = t[1] * r + t[0] * o;
  a += (e[0] / 2 - n[0]) * i, l += (n[1] - e[1] / 2) * i, o = -o;
  const u = a * r - l * o, c = l * r + a * o;
  return [u, c];
}
const Tt = Dg;
class zg extends dc {
  /**
   * @param {Options<SourceType>} options Layer options.
   */
  constructor(e) {
    const n = Object.assign({}, e);
    delete n.source, super(n), this.on, this.once, this.un, this.mapPrecomposeKey_ = null, this.mapRenderKey_ = null, this.sourceChangeKey_ = null, this.renderer_ = null, this.sourceReady_ = !1, this.rendered = !1, e.render && (this.render = e.render), e.map && this.setMap(e.map), this.addChangeListener(
      ge.SOURCE,
      this.handleSourcePropertyChange_
    );
    const i = e.source ? (
      /** @type {SourceType} */
      e.source
    ) : null;
    this.setSource(i);
  }
  /**
   * @param {Array<import("./Layer.js").default>} [array] Array of layers (to be modified in place).
   * @return {Array<import("./Layer.js").default>} Array of layers.
   */
  getLayersArray(e) {
    return e = e || [], e.push(this), e;
  }
  /**
   * @param {Array<import("./Layer.js").State>} [states] Optional list of layer states (to be modified in place).
   * @return {Array<import("./Layer.js").State>} List of layer states.
   */
  getLayerStatesArray(e) {
    return e = e || [], e.push(this.getLayerState()), e;
  }
  /**
   * Get the layer source.
   * @return {SourceType|null} The layer source (or `null` if not yet set).
   * @observable
   * @api
   */
  getSource() {
    return (
      /** @type {SourceType} */
      this.get(ge.SOURCE) || null
    );
  }
  /**
   * @return {SourceType|null} The source being rendered.
   */
  getRenderSource() {
    return this.getSource();
  }
  /**
   * @return {import("../source/Source.js").State} Source state.
   */
  getSourceState() {
    const e = this.getSource();
    return e ? e.getState() : "undefined";
  }
  /**
   * @private
   */
  handleSourceChange_() {
    this.changed(), !(this.sourceReady_ || this.getSource().getState() !== "ready") && (this.sourceReady_ = !0, this.dispatchEvent("sourceready"));
  }
  /**
   * @private
   */
  handleSourcePropertyChange_() {
    this.sourceChangeKey_ && (Ce(this.sourceChangeKey_), this.sourceChangeKey_ = null), this.sourceReady_ = !1;
    const e = this.getSource();
    e && (this.sourceChangeKey_ = he(
      e,
      H.CHANGE,
      this.handleSourceChange_,
      this
    ), e.getState() === "ready" && (this.sourceReady_ = !0, setTimeout(() => {
      this.dispatchEvent("sourceready");
    }, 0))), this.changed();
  }
  /**
   * @param {import("../pixel").Pixel} pixel Pixel.
   * @return {Promise<Array<import("../Feature").FeatureLike>>} Promise that resolves with
   * an array of features.
   */
  getFeatures(e) {
    return this.renderer_ ? this.renderer_.getFeatures(e) : Promise.resolve([]);
  }
  /**
   * @param {import("../pixel").Pixel} pixel Pixel.
   * @return {Uint8ClampedArray|Uint8Array|Float32Array|DataView|null} Pixel data.
   */
  getData(e) {
    return !this.renderer_ || !this.rendered ? null : this.renderer_.getData(e);
  }
  /**
   * The layer is visible on the map view, i.e. within its min/max resolution or zoom and
   * extent, not set to `visible: false`, and not inside a layer group that is set
   * to `visible: false`.
   * @param {View|import("../View.js").ViewStateLayerStateExtent} [view] View or {@link import("../Map.js").FrameState}.
   * Only required when the layer is not added to a map.
   * @return {boolean} The layer is visible in the map view.
   * @api
   */
  isVisible(e) {
    let n;
    const i = this.getMapInternal();
    !e && i && (e = i.getView()), e instanceof Tt ? n = {
      viewState: e.getState(),
      extent: e.calculateExtent()
    } : n = e, !n.layerStatesArray && i && (n.layerStatesArray = i.getLayerGroup().getLayerStatesArray());
    let s;
    n.layerStatesArray ? s = n.layerStatesArray.find(
      (o) => o.layer === this
    ) : s = this.getLayerState();
    const r = this.getExtent();
    return Ca(s, n.viewState) && (!r || qe(r, n.extent));
  }
  /**
   * Get the attributions of the source of this layer for the given view.
   * @param {View|import("../View.js").ViewStateLayerStateExtent} [view] View or {@link import("../Map.js").FrameState}.
   * Only required when the layer is not added to a map.
   * @return {Array<string>} Attributions for this layer at the given view.
   * @api
   */
  getAttributions(e) {
    if (!this.isVisible(e))
      return [];
    let n;
    const i = this.getSource();
    if (i && (n = i.getAttributions()), !n)
      return [];
    const s = e instanceof Tt ? e.getViewStateAndExtent() : e;
    let r = n(s);
    return Array.isArray(r) || (r = [r]), r;
  }
  /**
   * In charge to manage the rendering of the layer. One layer type is
   * bounded with one layer renderer.
   * @param {?import("../Map.js").FrameState} frameState Frame state.
   * @param {HTMLElement} target Target which the renderer may (but need not) use
   * for rendering its content.
   * @return {HTMLElement|null} The rendered element.
   */
  render(e, n) {
    const i = this.getRenderer();
    return i.prepareFrame(e) ? (this.rendered = !0, i.renderFrame(e, n)) : null;
  }
  /**
   * Called when a layer is not visible during a map render.
   */
  unrender() {
    this.rendered = !1;
  }
  /** @return {string} Declutter */
  getDeclutter() {
  }
  /**
   * @param {import("../Map.js").FrameState} frameState Frame state.
   * @param {import("../layer/Layer.js").State} layerState Layer state.
   */
  renderDeclutter(e, n) {
  }
  /**
   * When the renderer follows a layout -> render approach, do the final rendering here.
   * @param {import('../Map.js').FrameState} frameState Frame state
   */
  renderDeferred(e) {
    const n = this.getRenderer();
    n && n.renderDeferred(e);
  }
  /**
   * For use inside the library only.
   * @param {import("../Map.js").default|null} map Map.
   */
  setMapInternal(e) {
    e || this.unrender(), this.set(ge.MAP, e);
  }
  /**
   * For use inside the library only.
   * @return {import("../Map.js").default|null} Map.
   */
  getMapInternal() {
    return this.get(ge.MAP);
  }
  /**
   * Sets the layer to be rendered on top of other layers on a map. The map will
   * not manage this layer in its layers collection. This
   * is useful for temporary layers. To remove an unmanaged layer from the map,
   * use `#setMap(null)`.
   *
   * To add the layer to a map and have it managed by the map, use
   * {@link module:ol/Map~Map#addLayer} instead.
   * @param {import("../Map.js").default|null} map Map.
   * @api
   */
  setMap(e) {
    this.mapPrecomposeKey_ && (Ce(this.mapPrecomposeKey_), this.mapPrecomposeKey_ = null), e || this.changed(), this.mapRenderKey_ && (Ce(this.mapRenderKey_), this.mapRenderKey_ = null), e && (this.mapPrecomposeKey_ = he(
      e,
      dt.PRECOMPOSE,
      function(n) {
        const s = /** @type {import("../render/Event.js").default} */ n.frameState.layerStatesArray, r = this.getLayerState(!1);
        ue(
          !s.some(function(o) {
            return o.layer === r.layer;
          }),
          "A layer can only be added to the map once. Use either `layer.setMap()` or `map.addLayer()`, not both."
        ), s.push(r);
      },
      this
    ), this.mapRenderKey_ = he(this, H.CHANGE, e.render, e), this.changed());
  }
  /**
   * Set the layer source.
   * @param {SourceType|null} source The layer source.
   * @observable
   * @api
   */
  setSource(e) {
    this.set(ge.SOURCE, e);
  }
  /**
   * Get the renderer for this layer.
   * @return {RendererType|null} The layer renderer.
   */
  getRenderer() {
    return this.renderer_ || (this.renderer_ = this.createRenderer()), this.renderer_;
  }
  /**
   * @return {boolean} The layer has a renderer.
   */
  hasRenderer() {
    return !!this.renderer_;
  }
  /**
   * Create a renderer for this layer.
   * @return {RendererType} A layer renderer.
   * @protected
   */
  createRenderer() {
    return null;
  }
  /**
   * Clean up.
   */
  disposeInternal() {
    this.renderer_ && (this.renderer_.dispose(), delete this.renderer_), this.setSource(null), super.disposeInternal();
  }
}
function Ca(t, e) {
  if (!t.visible)
    return !1;
  const n = e.resolution;
  if (n < t.minResolution || n >= t.maxResolution)
    return !1;
  const i = e.zoom;
  return i > t.minZoom && i <= t.maxZoom;
}
const Tr = zg;
function Bg(t, e, n, i, s) {
  Gc(t, e, n || 0, i || t.length - 1, s || $g);
}
function Gc(t, e, n, i, s) {
  for (; i > n; ) {
    if (i - n > 600) {
      var r = i - n + 1, o = e - n + 1, a = Math.log(r), l = 0.5 * Math.exp(2 * a / 3), u = 0.5 * Math.sqrt(a * l * (r - l) / r) * (o - r / 2 < 0 ? -1 : 1), c = Math.max(n, Math.floor(e - o * l / r + u)), h = Math.min(i, Math.floor(e + (r - o) * l / r + u));
      Gc(t, e, c, h, s);
    }
    var d = t[e], f = n, g = i;
    for (Bi(t, n, e), s(t[i], d) > 0 && Bi(t, n, i); f < g; ) {
      for (Bi(t, f, g), f++, g--; s(t[f], d) < 0; )
        f++;
      for (; s(t[g], d) > 0; )
        g--;
    }
    s(t[n], d) === 0 ? Bi(t, n, g) : (g++, Bi(t, g, i)), g <= e && (n = g + 1), e <= g && (i = g - 1);
  }
}
function Bi(t, e, n) {
  var i = t[e];
  t[e] = t[n], t[n] = i;
}
function $g(t, e) {
  return t < e ? -1 : t > e ? 1 : 0;
}
let zc = class {
  constructor(e = 9) {
    this._maxEntries = Math.max(4, e), this._minEntries = Math.max(2, Math.ceil(this._maxEntries * 0.4)), this.clear();
  }
  all() {
    return this._all(this.data, []);
  }
  search(e) {
    let n = this.data;
    const i = [];
    if (!Ws(e, n))
      return i;
    const s = this.toBBox, r = [];
    for (; n; ) {
      for (let o = 0; o < n.children.length; o++) {
        const a = n.children[o], l = n.leaf ? s(a) : a;
        Ws(e, l) && (n.leaf ? i.push(a) : lo(e, l) ? this._all(a, i) : r.push(a));
      }
      n = r.pop();
    }
    return i;
  }
  collides(e) {
    let n = this.data;
    if (!Ws(e, n))
      return !1;
    const i = [];
    for (; n; ) {
      for (let s = 0; s < n.children.length; s++) {
        const r = n.children[s], o = n.leaf ? this.toBBox(r) : r;
        if (Ws(e, o)) {
          if (n.leaf || lo(e, o))
            return !0;
          i.push(r);
        }
      }
      n = i.pop();
    }
    return !1;
  }
  load(e) {
    if (!(e && e.length))
      return this;
    if (e.length < this._minEntries) {
      for (let i = 0; i < e.length; i++)
        this.insert(e[i]);
      return this;
    }
    let n = this._build(e.slice(), 0, e.length - 1, 0);
    if (!this.data.children.length)
      this.data = n;
    else if (this.data.height === n.height)
      this._splitRoot(this.data, n);
    else {
      if (this.data.height < n.height) {
        const i = this.data;
        this.data = n, n = i;
      }
      this._insert(n, this.data.height - n.height - 1, !0);
    }
    return this;
  }
  insert(e) {
    return e && this._insert(e, this.data.height - 1), this;
  }
  clear() {
    return this.data = si([]), this;
  }
  remove(e, n) {
    if (!e)
      return this;
    let i = this.data;
    const s = this.toBBox(e), r = [], o = [];
    let a, l, u;
    for (; i || r.length; ) {
      if (i || (i = r.pop(), l = r[r.length - 1], a = o.pop(), u = !0), i.leaf) {
        const c = Wg(e, i.children, n);
        if (c !== -1)
          return i.children.splice(c, 1), r.push(i), this._condense(r), this;
      }
      !u && !i.leaf && lo(i, s) ? (r.push(i), o.push(a), a = 0, l = i, i = i.children[0]) : l ? (a++, i = l.children[a], u = !1) : i = null;
    }
    return this;
  }
  toBBox(e) {
    return e;
  }
  compareMinX(e, n) {
    return e.minX - n.minX;
  }
  compareMinY(e, n) {
    return e.minY - n.minY;
  }
  toJSON() {
    return this.data;
  }
  fromJSON(e) {
    return this.data = e, this;
  }
  _all(e, n) {
    const i = [];
    for (; e; )
      e.leaf ? n.push(...e.children) : i.push(...e.children), e = i.pop();
    return n;
  }
  _build(e, n, i, s) {
    const r = i - n + 1;
    let o = this._maxEntries, a;
    if (r <= o)
      return a = si(e.slice(n, i + 1)), Jn(a, this.toBBox), a;
    s || (s = Math.ceil(Math.log(r) / Math.log(o)), o = Math.ceil(r / Math.pow(o, s - 1))), a = si([]), a.leaf = !1, a.height = s;
    const l = Math.ceil(r / o), u = l * Math.ceil(Math.sqrt(o));
    jl(e, n, i, u, this.compareMinX);
    for (let c = n; c <= i; c += u) {
      const h = Math.min(c + u - 1, i);
      jl(e, c, h, l, this.compareMinY);
      for (let d = c; d <= h; d += l) {
        const f = Math.min(d + l - 1, h);
        a.children.push(this._build(e, d, f, s - 1));
      }
    }
    return Jn(a, this.toBBox), a;
  }
  _chooseSubtree(e, n, i, s) {
    for (; s.push(n), !(n.leaf || s.length - 1 === i); ) {
      let r = 1 / 0, o = 1 / 0, a;
      for (let l = 0; l < n.children.length; l++) {
        const u = n.children[l], c = ao(u), h = jg(e, u) - c;
        h < o ? (o = h, r = c < r ? c : r, a = u) : h === o && c < r && (r = c, a = u);
      }
      n = a || n.children[0];
    }
    return n;
  }
  _insert(e, n, i) {
    const s = i ? e : this.toBBox(e), r = [], o = this._chooseSubtree(s, this.data, n, r);
    for (o.children.push(e), Ui(o, s); n >= 0 && r[n].children.length > this._maxEntries; )
      this._split(r, n), n--;
    this._adjustParentBBoxes(s, r, n);
  }
  // split overflowed node into two
  _split(e, n) {
    const i = e[n], s = i.children.length, r = this._minEntries;
    this._chooseSplitAxis(i, r, s);
    const o = this._chooseSplitIndex(i, r, s), a = si(i.children.splice(o, i.children.length - o));
    a.height = i.height, a.leaf = i.leaf, Jn(i, this.toBBox), Jn(a, this.toBBox), n ? e[n - 1].children.push(a) : this._splitRoot(i, a);
  }
  _splitRoot(e, n) {
    this.data = si([e, n]), this.data.height = e.height + 1, this.data.leaf = !1, Jn(this.data, this.toBBox);
  }
  _chooseSplitIndex(e, n, i) {
    let s, r = 1 / 0, o = 1 / 0;
    for (let a = n; a <= i - n; a++) {
      const l = ji(e, 0, a, this.toBBox), u = ji(e, a, i, this.toBBox), c = Ug(l, u), h = ao(l) + ao(u);
      c < r ? (r = c, s = a, o = h < o ? h : o) : c === r && h < o && (o = h, s = a);
    }
    return s || i - n;
  }
  // sorts node children by the best axis for split
  _chooseSplitAxis(e, n, i) {
    const s = e.leaf ? this.compareMinX : Xg, r = e.leaf ? this.compareMinY : Yg, o = this._allDistMargin(e, n, i, s), a = this._allDistMargin(e, n, i, r);
    o < a && e.children.sort(s);
  }
  // total margin of all possible split distributions where each node is at least m full
  _allDistMargin(e, n, i, s) {
    e.children.sort(s);
    const r = this.toBBox, o = ji(e, 0, n, r), a = ji(e, i - n, i, r);
    let l = $s(o) + $s(a);
    for (let u = n; u < i - n; u++) {
      const c = e.children[u];
      Ui(o, e.leaf ? r(c) : c), l += $s(o);
    }
    for (let u = i - n - 1; u >= n; u--) {
      const c = e.children[u];
      Ui(a, e.leaf ? r(c) : c), l += $s(a);
    }
    return l;
  }
  _adjustParentBBoxes(e, n, i) {
    for (let s = i; s >= 0; s--)
      Ui(n[s], e);
  }
  _condense(e) {
    for (let n = e.length - 1, i; n >= 0; n--)
      e[n].children.length === 0 ? n > 0 ? (i = e[n - 1].children, i.splice(i.indexOf(e[n]), 1)) : this.clear() : Jn(e[n], this.toBBox);
  }
};
function Wg(t, e, n) {
  if (!n)
    return e.indexOf(t);
  for (let i = 0; i < e.length; i++)
    if (n(t, e[i]))
      return i;
  return -1;
}
function Jn(t, e) {
  ji(t, 0, t.children.length, e, t);
}
function ji(t, e, n, i, s) {
  s || (s = si(null)), s.minX = 1 / 0, s.minY = 1 / 0, s.maxX = -1 / 0, s.maxY = -1 / 0;
  for (let r = e; r < n; r++) {
    const o = t.children[r];
    Ui(s, t.leaf ? i(o) : o);
  }
  return s;
}
function Ui(t, e) {
  return t.minX = Math.min(t.minX, e.minX), t.minY = Math.min(t.minY, e.minY), t.maxX = Math.max(t.maxX, e.maxX), t.maxY = Math.max(t.maxY, e.maxY), t;
}
function Xg(t, e) {
  return t.minX - e.minX;
}
function Yg(t, e) {
  return t.minY - e.minY;
}
function ao(t) {
  return (t.maxX - t.minX) * (t.maxY - t.minY);
}
function $s(t) {
  return t.maxX - t.minX + (t.maxY - t.minY);
}
function jg(t, e) {
  return (Math.max(e.maxX, t.maxX) - Math.min(e.minX, t.minX)) * (Math.max(e.maxY, t.maxY) - Math.min(e.minY, t.minY));
}
function Ug(t, e) {
  const n = Math.max(t.minX, e.minX), i = Math.max(t.minY, e.minY), s = Math.min(t.maxX, e.maxX), r = Math.min(t.maxY, e.maxY);
  return Math.max(0, s - n) * Math.max(0, r - i);
}
function lo(t, e) {
  return t.minX <= e.minX && t.minY <= e.minY && e.maxX <= t.maxX && e.maxY <= t.maxY;
}
function Ws(t, e) {
  return e.minX <= t.maxX && e.minY <= t.maxY && e.maxX >= t.minX && e.maxY >= t.minY;
}
function si(t) {
  return {
    children: t,
    height: 1,
    leaf: !0,
    minX: 1 / 0,
    minY: 1 / 0,
    maxX: -1 / 0,
    maxY: -1 / 0
  };
}
function jl(t, e, n, i, s) {
  const r = [e, n];
  for (; r.length; ) {
    if (n = r.pop(), e = r.pop(), n - e <= i)
      continue;
    const o = e + Math.ceil((n - e) / i / 2) * i;
    Bg(t, o, e, n, s), r.push(e, o, o, n);
  }
}
const ee = {
  IDLE: 0,
  LOADING: 1,
  LOADED: 2,
  ERROR: 3,
  EMPTY: 4
};
function Ul(t) {
  return t[0] > 0 && t[1] > 0;
}
function Zg(t, e, n) {
  return n === void 0 && (n = [0, 0]), n[0] = t[0] * e + 0.5 | 0, n[1] = t[1] * e + 0.5 | 0, n;
}
function st(t, e) {
  return Array.isArray(t) ? t : (e === void 0 ? e = [t, t] : (e[0] = t, e[1] = t), e);
}
class Ea {
  /**
   * @param {Options} options Options.
   */
  constructor(e) {
    this.opacity_ = e.opacity, this.rotateWithView_ = e.rotateWithView, this.rotation_ = e.rotation, this.scale_ = e.scale, this.scaleArray_ = st(e.scale), this.displacement_ = e.displacement, this.declutterMode_ = e.declutterMode;
  }
  /**
   * Clones the style.
   * @return {ImageStyle} The cloned style.
   * @api
   */
  clone() {
    const e = this.getScale();
    return new Ea({
      opacity: this.getOpacity(),
      scale: Array.isArray(e) ? e.slice() : e,
      rotation: this.getRotation(),
      rotateWithView: this.getRotateWithView(),
      displacement: this.getDisplacement().slice(),
      declutterMode: this.getDeclutterMode()
    });
  }
  /**
   * Get the symbolizer opacity.
   * @return {number} Opacity.
   * @api
   */
  getOpacity() {
    return this.opacity_;
  }
  /**
   * Determine whether the symbolizer rotates with the map.
   * @return {boolean} Rotate with map.
   * @api
   */
  getRotateWithView() {
    return this.rotateWithView_;
  }
  /**
   * Get the symoblizer rotation.
   * @return {number} Rotation.
   * @api
   */
  getRotation() {
    return this.rotation_;
  }
  /**
   * Get the symbolizer scale.
   * @return {number|import("../size.js").Size} Scale.
   * @api
   */
  getScale() {
    return this.scale_;
  }
  /**
   * Get the symbolizer scale array.
   * @return {import("../size.js").Size} Scale array.
   */
  getScaleArray() {
    return this.scaleArray_;
  }
  /**
   * Get the displacement of the shape
   * @return {Array<number>} Shape's center displacement
   * @api
   */
  getDisplacement() {
    return this.displacement_;
  }
  /**
   * Get the declutter mode of the shape
   * @return {import("./Style.js").DeclutterMode} Shape's declutter mode
   * @api
   */
  getDeclutterMode() {
    return this.declutterMode_;
  }
  /**
   * Get the anchor point in pixels. The anchor determines the center point for the
   * symbolizer.
   * @abstract
   * @return {Array<number>} Anchor.
   */
  getAnchor() {
    return ce();
  }
  /**
   * Get the image element for the symbolizer.
   * @abstract
   * @param {number} pixelRatio Pixel ratio.
   * @return {import('../DataTile.js').ImageLike} Image element.
   */
  getImage(e) {
    return ce();
  }
  /**
   * @abstract
   * @return {import('../DataTile.js').ImageLike} Image element.
   */
  getHitDetectionImage() {
    return ce();
  }
  /**
   * Get the image pixel ratio.
   * @param {number} pixelRatio Pixel ratio.
   * @return {number} Pixel ratio.
   */
  getPixelRatio(e) {
    return 1;
  }
  /**
   * @abstract
   * @return {import("../ImageState.js").default} Image state.
   */
  getImageState() {
    return ce();
  }
  /**
   * @abstract
   * @return {import("../size.js").Size} Image size.
   */
  getImageSize() {
    return ce();
  }
  /**
   * Get the origin of the symbolizer.
   * @abstract
   * @return {Array<number>} Origin.
   */
  getOrigin() {
    return ce();
  }
  /**
   * Get the size of the symbolizer (in pixels).
   * @abstract
   * @return {import("../size.js").Size} Size.
   */
  getSize() {
    return ce();
  }
  /**
   * Set the displacement.
   *
   * @param {Array<number>} displacement Displacement.
   * @api
   */
  setDisplacement(e) {
    this.displacement_ = e;
  }
  /**
   * Set the opacity.
   *
   * @param {number} opacity Opacity.
   * @api
   */
  setOpacity(e) {
    this.opacity_ = e;
  }
  /**
   * Set whether to rotate the style with the view.
   *
   * @param {boolean} rotateWithView Rotate with map.
   * @api
   */
  setRotateWithView(e) {
    this.rotateWithView_ = e;
  }
  /**
   * Set the rotation.
   *
   * @param {number} rotation Rotation.
   * @api
   */
  setRotation(e) {
    this.rotation_ = e;
  }
  /**
   * Set the scale.
   *
   * @param {number|import("../size.js").Size} scale Scale.
   * @api
   */
  setScale(e) {
    this.scale_ = e, this.scaleArray_ = st(e);
  }
  /**
   * @abstract
   * @param {function(import("../events/Event.js").default): void} listener Listener function.
   */
  listenImageChange(e) {
    ce();
  }
  /**
   * Load not yet loaded URI.
   * @abstract
   */
  load() {
    ce();
  }
  /**
   * @abstract
   * @param {function(import("../events/Event.js").default): void} listener Listener function.
   */
  unlistenImageChange(e) {
    ce();
  }
  /**
   * @return {Promise<void>} `false` or Promise that resolves when the style is ready to use.
   */
  ready() {
    return Promise.resolve();
  }
}
const Bc = Ea, rs = {
  name: "rgb",
  min: [0, 0, 0],
  max: [255, 255, 255],
  channel: ["red", "green", "blue"],
  alias: ["RGB"]
};
var ke = {
  name: "xyz",
  min: [0, 0, 0],
  channel: ["X", "Y", "Z"],
  alias: ["XYZ", "ciexyz", "cie1931"]
};
ke.whitepoint = {
  //1931 2°
  2: {
    //incadescent
    A: [109.85, 100, 35.585],
    // B:[],
    C: [98.074, 100, 118.232],
    D50: [96.422, 100, 82.521],
    D55: [95.682, 100, 92.149],
    //daylight
    D65: [95.045592705167, 100, 108.9057750759878],
    D75: [94.972, 100, 122.638],
    //flourescent
    // F1: [],
    F2: [99.187, 100, 67.395],
    // F3: [],
    // F4: [],
    // F5: [],
    // F6:[],
    F7: [95.044, 100, 108.755],
    // F8: [],
    // F9: [],
    // F10: [],
    F11: [100.966, 100, 64.37],
    // F12: [],
    E: [100, 100, 100]
  },
  //1964  10°
  10: {
    //incadescent
    A: [111.144, 100, 35.2],
    C: [97.285, 100, 116.145],
    D50: [96.72, 100, 81.427],
    D55: [95.799, 100, 90.926],
    //daylight
    D65: [94.811, 100, 107.304],
    D75: [94.416, 100, 120.641],
    //flourescent
    F2: [103.28, 100, 69.026],
    F7: [95.792, 100, 107.687],
    F11: [103.866, 100, 65.627],
    E: [100, 100, 100]
  }
};
ke.max = ke.whitepoint[2].D65;
ke.rgb = function(t, e) {
  e = e || ke.whitepoint[2].E;
  var n = t[0] / e[0], i = t[1] / e[1], s = t[2] / e[2], r, o, a;
  return r = n * 3.240969941904521 + i * -1.537383177570093 + s * -0.498610760293, o = n * -0.96924363628087 + i * 1.87596750150772 + s * 0.041555057407175, a = n * 0.055630079696993 + i * -0.20397695888897 + s * 1.056971514242878, r = r > 31308e-7 ? 1.055 * Math.pow(r, 1 / 2.4) - 0.055 : r = r * 12.92, o = o > 31308e-7 ? 1.055 * Math.pow(o, 1 / 2.4) - 0.055 : o = o * 12.92, a = a > 31308e-7 ? 1.055 * Math.pow(a, 1 / 2.4) - 0.055 : a = a * 12.92, r = Math.min(Math.max(0, r), 1), o = Math.min(Math.max(0, o), 1), a = Math.min(Math.max(0, a), 1), [r * 255, o * 255, a * 255];
};
rs.xyz = function(t, e) {
  var n = t[0] / 255, i = t[1] / 255, s = t[2] / 255;
  n = n > 0.04045 ? Math.pow((n + 0.055) / 1.055, 2.4) : n / 12.92, i = i > 0.04045 ? Math.pow((i + 0.055) / 1.055, 2.4) : i / 12.92, s = s > 0.04045 ? Math.pow((s + 0.055) / 1.055, 2.4) : s / 12.92;
  var r = n * 0.41239079926595 + i * 0.35758433938387 + s * 0.18048078840183, o = n * 0.21263900587151 + i * 0.71516867876775 + s * 0.072192315360733, a = n * 0.019330818715591 + i * 0.11919477979462 + s * 0.95053215224966;
  return e = e || ke.whitepoint[2].E, [r * e[0], o * e[1], a * e[2]];
};
const wa = {
  name: "luv",
  //NOTE: luv has no rigidly defined limits
  //easyrgb fails to get proper coords
  //boronine states no rigid limits
  //colorMine refers this ones:
  min: [0, -134, -140],
  max: [100, 224, 122],
  channel: ["lightness", "u", "v"],
  alias: ["LUV", "cieluv", "cie1976"],
  xyz: function(t, e, n) {
    var i, s, r, o, a, l, u, c, h, d, f, g, m;
    if (r = t[0], o = t[1], a = t[2], r === 0)
      return [0, 0, 0];
    var _ = 0.0011070564598794539;
    return e = e || "D65", n = n || 2, h = ke.whitepoint[n][e][0], d = ke.whitepoint[n][e][1], f = ke.whitepoint[n][e][2], g = 4 * h / (h + 15 * d + 3 * f), m = 9 * d / (h + 15 * d + 3 * f), i = o / (13 * r) + g || 0, s = a / (13 * r) + m || 0, u = r > 8 ? d * Math.pow((r + 16) / 116, 3) : d * r * _, l = u * 9 * i / (4 * s) || 0, c = u * (12 - 3 * i - 20 * s) / (4 * s) || 0, [l, u, c];
  }
};
ke.luv = function(t, e, n) {
  var i, s, r, o, a, l, u, c, h, d, f, g, m, _ = 0.008856451679035631, p = 903.2962962962961;
  e = e || "D65", n = n || 2, h = ke.whitepoint[n][e][0], d = ke.whitepoint[n][e][1], f = ke.whitepoint[n][e][2], g = 4 * h / (h + 15 * d + 3 * f), m = 9 * d / (h + 15 * d + 3 * f), l = t[0], u = t[1], c = t[2], i = 4 * l / (l + 15 * u + 3 * c) || 0, s = 9 * u / (l + 15 * u + 3 * c) || 0;
  var y = u / d;
  return r = y <= _ ? p * y : 116 * Math.pow(y, 1 / 3) - 16, o = 13 * r * (i - g), a = 13 * r * (s - m), [r, o, a];
};
var $c = {
  name: "lchuv",
  channel: ["lightness", "chroma", "hue"],
  alias: ["LCHuv", "cielchuv"],
  min: [0, 0, 0],
  max: [100, 100, 360],
  luv: function(t) {
    var e = t[0], n = t[1], i = t[2], s, r, o;
    return o = i / 360 * 2 * Math.PI, s = n * Math.cos(o), r = n * Math.sin(o), [e, s, r];
  },
  xyz: function(t) {
    return wa.xyz($c.luv(t));
  }
};
wa.lchuv = function(t) {
  var e = t[0], n = t[1], i = t[2], s = Math.sqrt(n * n + i * i), r = Math.atan2(i, n), o = r * 360 / 2 / Math.PI;
  return o < 0 && (o += 360), [e, s, o];
};
ke.lchuv = function(t) {
  return wa.lchuv(ke.luv(t));
};
const Zl = {
  aliceblue: [240, 248, 255],
  antiquewhite: [250, 235, 215],
  aqua: [0, 255, 255],
  aquamarine: [127, 255, 212],
  azure: [240, 255, 255],
  beige: [245, 245, 220],
  bisque: [255, 228, 196],
  black: [0, 0, 0],
  blanchedalmond: [255, 235, 205],
  blue: [0, 0, 255],
  blueviolet: [138, 43, 226],
  brown: [165, 42, 42],
  burlywood: [222, 184, 135],
  cadetblue: [95, 158, 160],
  chartreuse: [127, 255, 0],
  chocolate: [210, 105, 30],
  coral: [255, 127, 80],
  cornflowerblue: [100, 149, 237],
  cornsilk: [255, 248, 220],
  crimson: [220, 20, 60],
  cyan: [0, 255, 255],
  darkblue: [0, 0, 139],
  darkcyan: [0, 139, 139],
  darkgoldenrod: [184, 134, 11],
  darkgray: [169, 169, 169],
  darkgreen: [0, 100, 0],
  darkgrey: [169, 169, 169],
  darkkhaki: [189, 183, 107],
  darkmagenta: [139, 0, 139],
  darkolivegreen: [85, 107, 47],
  darkorange: [255, 140, 0],
  darkorchid: [153, 50, 204],
  darkred: [139, 0, 0],
  darksalmon: [233, 150, 122],
  darkseagreen: [143, 188, 143],
  darkslateblue: [72, 61, 139],
  darkslategray: [47, 79, 79],
  darkslategrey: [47, 79, 79],
  darkturquoise: [0, 206, 209],
  darkviolet: [148, 0, 211],
  deeppink: [255, 20, 147],
  deepskyblue: [0, 191, 255],
  dimgray: [105, 105, 105],
  dimgrey: [105, 105, 105],
  dodgerblue: [30, 144, 255],
  firebrick: [178, 34, 34],
  floralwhite: [255, 250, 240],
  forestgreen: [34, 139, 34],
  fuchsia: [255, 0, 255],
  gainsboro: [220, 220, 220],
  ghostwhite: [248, 248, 255],
  gold: [255, 215, 0],
  goldenrod: [218, 165, 32],
  gray: [128, 128, 128],
  green: [0, 128, 0],
  greenyellow: [173, 255, 47],
  grey: [128, 128, 128],
  honeydew: [240, 255, 240],
  hotpink: [255, 105, 180],
  indianred: [205, 92, 92],
  indigo: [75, 0, 130],
  ivory: [255, 255, 240],
  khaki: [240, 230, 140],
  lavender: [230, 230, 250],
  lavenderblush: [255, 240, 245],
  lawngreen: [124, 252, 0],
  lemonchiffon: [255, 250, 205],
  lightblue: [173, 216, 230],
  lightcoral: [240, 128, 128],
  lightcyan: [224, 255, 255],
  lightgoldenrodyellow: [250, 250, 210],
  lightgray: [211, 211, 211],
  lightgreen: [144, 238, 144],
  lightgrey: [211, 211, 211],
  lightpink: [255, 182, 193],
  lightsalmon: [255, 160, 122],
  lightseagreen: [32, 178, 170],
  lightskyblue: [135, 206, 250],
  lightslategray: [119, 136, 153],
  lightslategrey: [119, 136, 153],
  lightsteelblue: [176, 196, 222],
  lightyellow: [255, 255, 224],
  lime: [0, 255, 0],
  limegreen: [50, 205, 50],
  linen: [250, 240, 230],
  magenta: [255, 0, 255],
  maroon: [128, 0, 0],
  mediumaquamarine: [102, 205, 170],
  mediumblue: [0, 0, 205],
  mediumorchid: [186, 85, 211],
  mediumpurple: [147, 112, 219],
  mediumseagreen: [60, 179, 113],
  mediumslateblue: [123, 104, 238],
  mediumspringgreen: [0, 250, 154],
  mediumturquoise: [72, 209, 204],
  mediumvioletred: [199, 21, 133],
  midnightblue: [25, 25, 112],
  mintcream: [245, 255, 250],
  mistyrose: [255, 228, 225],
  moccasin: [255, 228, 181],
  navajowhite: [255, 222, 173],
  navy: [0, 0, 128],
  oldlace: [253, 245, 230],
  olive: [128, 128, 0],
  olivedrab: [107, 142, 35],
  orange: [255, 165, 0],
  orangered: [255, 69, 0],
  orchid: [218, 112, 214],
  palegoldenrod: [238, 232, 170],
  palegreen: [152, 251, 152],
  paleturquoise: [175, 238, 238],
  palevioletred: [219, 112, 147],
  papayawhip: [255, 239, 213],
  peachpuff: [255, 218, 185],
  peru: [205, 133, 63],
  pink: [255, 192, 203],
  plum: [221, 160, 221],
  powderblue: [176, 224, 230],
  purple: [128, 0, 128],
  rebeccapurple: [102, 51, 153],
  red: [255, 0, 0],
  rosybrown: [188, 143, 143],
  royalblue: [65, 105, 225],
  saddlebrown: [139, 69, 19],
  salmon: [250, 128, 114],
  sandybrown: [244, 164, 96],
  seagreen: [46, 139, 87],
  seashell: [255, 245, 238],
  sienna: [160, 82, 45],
  silver: [192, 192, 192],
  skyblue: [135, 206, 235],
  slateblue: [106, 90, 205],
  slategray: [112, 128, 144],
  slategrey: [112, 128, 144],
  snow: [255, 250, 250],
  springgreen: [0, 255, 127],
  steelblue: [70, 130, 180],
  tan: [210, 180, 140],
  teal: [0, 128, 128],
  thistle: [216, 191, 216],
  tomato: [255, 99, 71],
  turquoise: [64, 224, 208],
  violet: [238, 130, 238],
  wheat: [245, 222, 179],
  white: [255, 255, 255],
  whitesmoke: [245, 245, 245],
  yellow: [255, 255, 0],
  yellowgreen: [154, 205, 50]
};
var Kl = {
  red: 0,
  orange: 60,
  yellow: 120,
  green: 180,
  blue: 240,
  purple: 300
};
function Kg(t) {
  var c, h;
  var e, n = [], i = 1, s;
  if (typeof t == "number")
    return { space: "rgb", values: [t >>> 16, (t & 65280) >>> 8, t & 255], alpha: 1 };
  if (typeof t == "number")
    return { space: "rgb", values: [t >>> 16, (t & 65280) >>> 8, t & 255], alpha: 1 };
  if (t = String(t).toLowerCase(), Zl[t])
    n = Zl[t].slice(), s = "rgb";
  else if (t === "transparent")
    i = 0, s = "rgb", n = [0, 0, 0];
  else if (t[0] === "#") {
    var r = t.slice(1), o = r.length, a = o <= 4;
    i = 1, a ? (n = [
      parseInt(r[0] + r[0], 16),
      parseInt(r[1] + r[1], 16),
      parseInt(r[2] + r[2], 16)
    ], o === 4 && (i = parseInt(r[3] + r[3], 16) / 255)) : (n = [
      parseInt(r[0] + r[1], 16),
      parseInt(r[2] + r[3], 16),
      parseInt(r[4] + r[5], 16)
    ], o === 8 && (i = parseInt(r[6] + r[7], 16) / 255)), n[0] || (n[0] = 0), n[1] || (n[1] = 0), n[2] || (n[2] = 0), s = "rgb";
  } else if (e = /^((?:rgba?|hs[lvb]a?|hwba?|cmyk?|xy[zy]|gray|lab|lchu?v?|[ly]uv|lms|oklch|oklab|color))\s*\(([^\)]*)\)/.exec(t)) {
    var l = e[1];
    s = l.replace(/a$/, "");
    var u = s === "cmyk" ? 4 : s === "gray" ? 1 : 3;
    n = e[2].trim().split(/\s*[,\/]\s*|\s+/), s === "color" && (s = n.shift()), n = n.map(function(d, f) {
      if (d[d.length - 1] === "%")
        return d = parseFloat(d) / 100, f === 3 ? d : s === "rgb" ? d * 255 : s[0] === "h" || s[0] === "l" && !f ? d * 100 : s === "lab" ? d * 125 : s === "lch" ? f < 2 ? d * 150 : d * 360 : s[0] === "o" && !f ? d : s === "oklab" ? d * 0.4 : s === "oklch" ? f < 2 ? d * 0.4 : d * 360 : d;
      if (s[f] === "h" || f === 2 && s[s.length - 1] === "h") {
        if (Kl[d] !== void 0)
          return Kl[d];
        if (d.endsWith("deg"))
          return parseFloat(d);
        if (d.endsWith("turn"))
          return parseFloat(d) * 360;
        if (d.endsWith("grad"))
          return parseFloat(d) * 360 / 400;
        if (d.endsWith("rad"))
          return parseFloat(d) * 180 / Math.PI;
      }
      return d === "none" ? 0 : parseFloat(d);
    }), i = n.length > u ? n.pop() : 1;
  } else
    /[0-9](?:\s|\/|,)/.test(t) && (n = t.match(/([0-9]+)/g).map(function(d) {
      return parseFloat(d);
    }), s = ((h = (c = t.match(/([a-z])/ig)) == null ? void 0 : c.join("")) == null ? void 0 : h.toLowerCase()) || "rgb");
  return {
    space: s,
    values: n,
    alpha: i
  };
}
const uo = {
  name: "hsl",
  min: [0, 0, 0],
  max: [360, 100, 100],
  channel: ["hue", "saturation", "lightness"],
  alias: ["HSL"],
  rgb: function(t) {
    var e = t[0] / 360, n = t[1] / 100, i = t[2] / 100, s, r, o, a, l, u = 0;
    if (n === 0)
      return l = i * 255, [l, l, l];
    for (r = i < 0.5 ? i * (1 + n) : i + n - i * n, s = 2 * i - r, a = [0, 0, 0]; u < 3; )
      o = e + 1 / 3 * -(u - 1), o < 0 ? o++ : o > 1 && o--, l = 6 * o < 1 ? s + (r - s) * 6 * o : 2 * o < 1 ? r : 3 * o < 2 ? s + (r - s) * (2 / 3 - o) * 6 : s, a[u++] = l * 255;
    return a;
  }
};
rs.hsl = function(t) {
  var e = t[0] / 255, n = t[1] / 255, i = t[2] / 255, s = Math.min(e, n, i), r = Math.max(e, n, i), o = r - s, a, l, u;
  return r === s ? a = 0 : e === r ? a = (n - i) / o : n === r ? a = 2 + (i - e) / o : i === r && (a = 4 + (e - n) / o), a = Math.min(a * 60, 360), a < 0 && (a += 360), u = (s + r) / 2, r === s ? l = 0 : u <= 0.5 ? l = o / (r + s) : l = o / (2 - r - s), [a, l * 100, u * 100];
};
function Hg(t) {
  Array.isArray(t) && t.raw && (t = String.raw(...arguments)), t instanceof Number && (t = +t);
  var e, n = Kg(t);
  if (!n.space)
    return [];
  const i = n.space[0] === "h" ? uo.min : rs.min, s = n.space[0] === "h" ? uo.max : rs.max;
  return e = Array(3), e[0] = Math.min(Math.max(n.values[0], i[0]), s[0]), e[1] = Math.min(Math.max(n.values[1], i[1]), s[1]), e[2] = Math.min(Math.max(n.values[2], i[2]), s[2]), n.space[0] === "h" && (e = uo.rgb(e)), e.push(Math.min(Math.max(n.alpha, 0), 1)), e;
}
function qg(t) {
  return typeof t == "string" ? t : ba(t);
}
const Jg = 1024, $i = {};
let co = 0;
function Qg(t) {
  if (t.length === 4)
    return t;
  const e = t.slice();
  return e[3] = 1, e;
}
function Hl(t) {
  const e = ke.lchuv(rs.xyz(t));
  return e[3] = t[3], e;
}
function em(t) {
  const e = ke.rgb($c.xyz(t));
  return e[3] = t[3], e;
}
function Sa(t) {
  if ($i.hasOwnProperty(t))
    return $i[t];
  if (co >= Jg) {
    let n = 0;
    for (const i in $i)
      n++ & 3 || (delete $i[i], --co);
  }
  const e = Hg(t);
  if (e.length !== 4)
    throw new Error('Failed to parse "' + t + '" as color');
  for (const n of e)
    if (isNaN(n))
      throw new Error('Failed to parse "' + t + '" as color');
  return Wc(e), $i[t] = e, ++co, e;
}
function os(t) {
  return Array.isArray(t) ? t : Sa(t);
}
function Wc(t) {
  return t[0] = Re(t[0] + 0.5 | 0, 0, 255), t[1] = Re(t[1] + 0.5 | 0, 0, 255), t[2] = Re(t[2] + 0.5 | 0, 0, 255), t[3] = Re(t[3], 0, 1), t;
}
function ba(t) {
  let e = t[0];
  e != (e | 0) && (e = e + 0.5 | 0);
  let n = t[1];
  n != (n | 0) && (n = n + 0.5 | 0);
  let i = t[2];
  i != (i | 0) && (i = i + 0.5 | 0);
  const s = t[3] === void 0 ? 1 : Math.round(t[3] * 1e3) / 1e3;
  return "rgba(" + e + "," + n + "," + i + "," + s + ")";
}
function tm(t) {
  try {
    return Sa(t), !0;
  } catch {
    return !1;
  }
}
const xn = typeof navigator < "u" && typeof navigator.userAgent < "u" ? navigator.userAgent.toLowerCase() : "", nm = xn.includes("firefox"), im = xn.includes("safari") && !xn.includes("chrom");
im && (xn.includes("version/15.4") || /cpu (os|iphone os) 15_4 like mac os x/.test(xn));
const sm = xn.includes("webkit") && !xn.includes("edge"), Xc = xn.includes("macintosh"), Yc = typeof devicePixelRatio < "u" ? devicePixelRatio : 1, jc = typeof WorkerGlobalScope < "u" && typeof OffscreenCanvas < "u" && self instanceof WorkerGlobalScope, Uc = typeof Image < "u" && Image.prototype.decode, Zc = function() {
  let t = !1;
  try {
    const e = Object.defineProperty({}, "passive", {
      get: function() {
        t = !0;
      }
    });
    window.addEventListener("_", null, e), window.removeEventListener("_", null, e);
  } catch {
  }
  return t;
}();
function De(t, e, n, i) {
  let s;
  return n && n.length ? s = /** @type {HTMLCanvasElement} */
  n.shift() : jc ? s = new OffscreenCanvas(t || 300, e || 300) : s = document.createElement("canvas"), t && (s.width = t), e && (s.height = e), /** @type {CanvasRenderingContext2D} */
  s.getContext("2d", i);
}
let ho;
function Oo() {
  return ho || (ho = De(1, 1)), ho;
}
function Rr(t) {
  const e = t.canvas;
  e.width = 1, e.height = 1, t.clearRect(0, 0, 1, 1);
}
function ql(t, e) {
  const n = e.parentNode;
  n && n.replaceChild(t, e);
}
function Do(t) {
  return t && t.parentNode ? t.parentNode.removeChild(t) : null;
}
function rm(t) {
  for (; t.lastChild; )
    t.removeChild(t.lastChild);
}
function om(t, e) {
  const n = t.childNodes;
  for (let i = 0; ; ++i) {
    const s = n[i], r = e[i];
    if (!s && !r)
      break;
    if (s !== r) {
      if (!s) {
        t.appendChild(r);
        continue;
      }
      if (!r) {
        t.removeChild(s), --i;
        continue;
      }
      t.insertBefore(r, s);
    }
  }
}
function am(t, e, n) {
  const i = (
    /** @type {HTMLImageElement} */
    t
  );
  let s = !0, r = !1, o = !1;
  const a = [
    er(i, H.LOAD, function() {
      o = !0, r || e();
    })
  ];
  return i.src && Uc ? (r = !0, i.decode().then(function() {
    s && e();
  }).catch(function(l) {
    s && (o ? e() : n());
  })) : a.push(er(i, H.ERROR, n)), function() {
    s = !1, a.forEach(Ce);
  };
}
function lm(t, e) {
  return new Promise((n, i) => {
    function s() {
      o(), n(t);
    }
    function r() {
      o(), i(new Error("Image load error"));
    }
    function o() {
      t.removeEventListener("load", s), t.removeEventListener("error", r);
    }
    t.addEventListener("load", s), t.addEventListener("error", r), e && (t.src = e);
  });
}
function um(t, e) {
  return e && (t.src = e), t.src && Uc ? new Promise(
    (n, i) => t.decode().then(() => n(t)).catch(
      (s) => t.complete && t.width ? n(t) : i(s)
    )
  ) : lm(t);
}
class cm {
  constructor() {
    this.cache_ = {}, this.patternCache_ = {}, this.cacheSize_ = 0, this.maxCacheSize_ = 32;
  }
  /**
   * FIXME empty description for jsdoc
   */
  clear() {
    this.cache_ = {}, this.patternCache_ = {}, this.cacheSize_ = 0;
  }
  /**
   * @return {boolean} Can expire cache.
   */
  canExpireCache() {
    return this.cacheSize_ > this.maxCacheSize_;
  }
  /**
   * FIXME empty description for jsdoc
   */
  expire() {
    if (this.canExpireCache()) {
      let e = 0;
      for (const n in this.cache_) {
        const i = this.cache_[n];
        !(e++ & 3) && !i.hasListener() && (delete this.cache_[n], delete this.patternCache_[n], --this.cacheSize_);
      }
    }
  }
  /**
   * @param {string} src Src.
   * @param {?string} crossOrigin Cross origin.
   * @param {import("../color.js").Color|string|null} color Color.
   * @return {import("./IconImage.js").default} Icon image.
   */
  get(e, n, i) {
    const s = fo(e, n, i);
    return s in this.cache_ ? this.cache_[s] : null;
  }
  /**
   * @param {string} src Src.
   * @param {?string} crossOrigin Cross origin.
   * @param {import("../color.js").Color|string|null} color Color.
   * @return {CanvasPattern} Icon image.
   */
  getPattern(e, n, i) {
    const s = fo(e, n, i);
    return s in this.patternCache_ ? this.patternCache_[s] : null;
  }
  /**
   * @param {string} src Src.
   * @param {?string} crossOrigin Cross origin.
   * @param {import("../color.js").Color|string|null} color Color.
   * @param {import("./IconImage.js").default|null} iconImage Icon image.
   * @param {boolean} [pattern] Also cache a `'repeat'` pattern with this `iconImage`.
   */
  set(e, n, i, s, r) {
    const o = fo(e, n, i), a = o in this.cache_;
    this.cache_[o] = s, r && (s.getImageState() === ee.IDLE && s.load(), s.getImageState() === ee.LOADING ? s.ready().then(() => {
      this.patternCache_[o] = Oo().createPattern(
        s.getImage(1),
        "repeat"
      );
    }) : this.patternCache_[o] = Oo().createPattern(
      s.getImage(1),
      "repeat"
    )), a || ++this.cacheSize_;
  }
  /**
   * Set the cache size of the icon cache. Default is `32`. Change this value when
   * your map uses more than 32 different icon images and you are not caching icon
   * styles on the application level.
   * @param {number} maxCacheSize Cache max size.
   * @api
   */
  setSize(e) {
    this.maxCacheSize_ = e, this.expire();
  }
}
function fo(t, e, n) {
  const i = n ? os(n) : "null";
  return e + ":" + t + ":" + i;
}
const At = new cm();
let Wi = null;
class hm extends pr {
  /**
   * @param {HTMLImageElement|HTMLCanvasElement|ImageBitmap|null} image Image.
   * @param {string|undefined} src Src.
   * @param {?string} crossOrigin Cross origin.
   * @param {import("../ImageState.js").default|undefined} imageState Image state.
   * @param {import("../color.js").Color|string|null} color Color.
   */
  constructor(e, n, i, s, r) {
    super(), this.hitDetectionImage_ = null, this.image_ = e, this.crossOrigin_ = i, this.canvas_ = {}, this.color_ = r, this.imageState_ = s === void 0 ? ee.IDLE : s, this.size_ = e && e.width && e.height ? [e.width, e.height] : null, this.src_ = n, this.tainted_, this.ready_ = null;
  }
  /**
   * @private
   */
  initializeImage_() {
    this.image_ = new Image(), this.crossOrigin_ !== null && (this.image_.crossOrigin = this.crossOrigin_);
  }
  /**
   * @private
   * @return {boolean} The image canvas is tainted.
   */
  isTainted_() {
    if (this.tainted_ === void 0 && this.imageState_ === ee.LOADED) {
      Wi || (Wi = De(1, 1, void 0, {
        willReadFrequently: !0
      })), Wi.drawImage(this.image_, 0, 0);
      try {
        Wi.getImageData(0, 0, 1, 1), this.tainted_ = !1;
      } catch {
        Wi = null, this.tainted_ = !0;
      }
    }
    return this.tainted_ === !0;
  }
  /**
   * @private
   */
  dispatchChangeEvent_() {
    this.dispatchEvent(H.CHANGE);
  }
  /**
   * @private
   */
  handleImageError_() {
    this.imageState_ = ee.ERROR, this.dispatchChangeEvent_();
  }
  /**
   * @private
   */
  handleImageLoad_() {
    this.imageState_ = ee.LOADED, this.size_ = [this.image_.width, this.image_.height], this.dispatchChangeEvent_();
  }
  /**
   * @param {number} pixelRatio Pixel ratio.
   * @return {HTMLImageElement|HTMLCanvasElement|ImageBitmap} Image or Canvas element or image bitmap.
   */
  getImage(e) {
    return this.image_ || this.initializeImage_(), this.replaceColor_(e), this.canvas_[e] ? this.canvas_[e] : this.image_;
  }
  /**
   * @param {number} pixelRatio Pixel ratio.
   * @return {number} Image or Canvas element.
   */
  getPixelRatio(e) {
    return this.replaceColor_(e), this.canvas_[e] ? e : 1;
  }
  /**
   * @return {import("../ImageState.js").default} Image state.
   */
  getImageState() {
    return this.imageState_;
  }
  /**
   * @return {HTMLImageElement|HTMLCanvasElement|ImageBitmap} Image element.
   */
  getHitDetectionImage() {
    if (this.image_ || this.initializeImage_(), !this.hitDetectionImage_)
      if (this.isTainted_()) {
        const e = this.size_[0], n = this.size_[1], i = De(e, n);
        i.fillRect(0, 0, e, n), this.hitDetectionImage_ = i.canvas;
      } else
        this.hitDetectionImage_ = this.image_;
    return this.hitDetectionImage_;
  }
  /**
   * Get the size of the icon (in pixels).
   * @return {import("../size.js").Size} Image size.
   */
  getSize() {
    return this.size_;
  }
  /**
   * @return {string|undefined} Image src.
   */
  getSrc() {
    return this.src_;
  }
  /**
   * Load not yet loaded URI.
   */
  load() {
    if (this.imageState_ === ee.IDLE) {
      this.image_ || this.initializeImage_(), this.imageState_ = ee.LOADING;
      try {
        this.src_ !== void 0 && (this.image_.src = this.src_);
      } catch {
        this.handleImageError_();
      }
      this.image_ instanceof HTMLImageElement && um(this.image_, this.src_).then((e) => {
        this.image_ = e, this.handleImageLoad_();
      }).catch(this.handleImageError_.bind(this));
    }
  }
  /**
   * @param {number} pixelRatio Pixel ratio.
   * @private
   */
  replaceColor_(e) {
    if (!this.color_ || this.canvas_[e] || this.imageState_ !== ee.LOADED)
      return;
    const n = this.image_, i = document.createElement("canvas");
    i.width = Math.ceil(n.width * e), i.height = Math.ceil(n.height * e);
    const s = i.getContext("2d");
    s.scale(e, e), s.drawImage(n, 0, 0), s.globalCompositeOperation = "multiply", s.fillStyle = qg(this.color_), s.fillRect(0, 0, i.width / e, i.height / e), s.globalCompositeOperation = "destination-in", s.drawImage(n, 0, 0), this.canvas_[e] = i;
  }
  /**
   * @return {Promise<void>} Promise that resolves when the image is loaded.
   */
  ready() {
    return this.ready_ || (this.ready_ = new Promise((e) => {
      this.imageState_ === ee.LOADED || this.imageState_ === ee.ERROR ? e() : this.addEventListener(H.CHANGE, function n() {
        (this.imageState_ === ee.LOADED || this.imageState_ === ee.ERROR) && (this.removeEventListener(H.CHANGE, n), e());
      });
    })), this.ready_;
  }
}
function Ia(t, e, n, i, s, r) {
  let o = e === void 0 ? void 0 : At.get(e, n, s);
  return o || (o = new hm(
    t,
    t instanceof HTMLImageElement ? t.src || void 0 : e,
    n,
    i,
    s
  ), At.set(e, n, s, o, r)), r && o && !At.getPattern(e, n, s) && At.set(e, n, s, o, r), o;
}
function Pt(t) {
  return t ? Array.isArray(t) ? ba(t) : typeof t == "object" && "src" in t ? dm(t) : t : null;
}
function dm(t) {
  if (!t.offset || !t.size)
    return At.getPattern(t.src, "anonymous", t.color);
  const e = t.src + ":" + t.offset, n = At.getPattern(
    e,
    void 0,
    t.color
  );
  if (n)
    return n;
  const i = At.get(t.src, "anonymous", null);
  if (i.getImageState() !== ee.LOADED)
    return null;
  const s = De(
    t.size[0],
    t.size[1]
  );
  return s.drawImage(
    i.getImage(1),
    t.offset[0],
    t.offset[1],
    t.size[0],
    t.size[1],
    0,
    0,
    t.size[0],
    t.size[1]
  ), Ia(
    s.canvas,
    e,
    void 0,
    ee.LOADED,
    t.color,
    !0
  ), At.getPattern(e, void 0, t.color);
}
const Xs = "ol-hidden", Lr = "ol-unselectable", Ta = "ol-control", Jl = "ol-collapsed", fm = new RegExp(
  [
    "^\\s*(?=(?:(?:[-a-z]+\\s*){0,2}(italic|oblique))?)",
    "(?=(?:(?:[-a-z]+\\s*){0,2}(small-caps))?)",
    "(?=(?:(?:[-a-z]+\\s*){0,2}(bold(?:er)?|lighter|[1-9]00 ))?)",
    "(?:(?:normal|\\1|\\2|\\3)\\s*){0,3}((?:xx?-)?",
    "(?:small|large)|medium|smaller|larger|[\\.\\d]+(?:\\%|in|[cem]m|ex|p[ctx]))",
    "(?:\\s*\\/\\s*(normal|[\\.\\d]+(?:\\%|in|[cem]m|ex|p[ctx])?))",
    `?\\s*([-,\\"\\'\\sa-z]+?)\\s*$`
  ].join(""),
  "i"
), Ql = [
  "style",
  "variant",
  "weight",
  "size",
  "lineHeight",
  "family"
], Kc = function(t) {
  const e = t.match(fm);
  if (!e)
    return null;
  const n = (
    /** @type {FontParameters} */
    {
      lineHeight: "normal",
      size: "1.2em",
      style: "normal",
      weight: "normal",
      variant: "normal"
    }
  );
  for (let i = 0, s = Ql.length; i < s; ++i) {
    const r = e[i + 1];
    r !== void 0 && (n[Ql[i]] = r);
  }
  return n.families = n.family.split(/,\s?/), n;
}, Hc = "10px sans-serif", He = "#000", Ei = "round", Jt = [], Qt = 0, wi = "round", as = 10, ls = "#000", us = "center", or = "middle", Fn = [0, 0, 0, 0], cs = 1, Ut = new Nt();
let ri = null, Fo;
const No = {}, gm = function() {
  const e = "32px ", n = ["monospace", "serif"], i = n.length, s = "wmytzilWMYTZIL@#/&?$%10";
  let r, o;
  function a(u, c, h) {
    let d = !0;
    for (let f = 0; f < i; ++f) {
      const g = n[f];
      if (o = ar(
        u + " " + c + " " + e + g,
        s
      ), h != g) {
        const m = ar(
          u + " " + c + " " + e + h + "," + g,
          s
        );
        d = d && m != o;
      }
    }
    return !!d;
  }
  function l() {
    let u = !0;
    const c = Ut.getKeys();
    for (let h = 0, d = c.length; h < d; ++h) {
      const f = c[h];
      Ut.get(f) < 100 && (a.apply(this, f.split(`
`)) ? (Es(No), ri = null, Fo = void 0, Ut.set(f, 100)) : (Ut.set(f, Ut.get(f) + 1, !0), u = !1));
    }
    u && (clearInterval(r), r = void 0);
  }
  return function(u) {
    const c = Kc(u);
    if (!c)
      return;
    const h = c.families;
    for (let d = 0, f = h.length; d < f; ++d) {
      const g = h[d], m = c.style + `
` + c.weight + `
` + g;
      Ut.get(m) === void 0 && (Ut.set(m, 100, !0), a(c.style, c.weight, g) || (Ut.set(m, 0, !0), r === void 0 && (r = setInterval(l, 32))));
    }
  };
}(), mm = function() {
  let t;
  return function(e) {
    let n = No[e];
    if (n == null) {
      if (jc) {
        const i = Kc(e), s = qc(e, "Žg");
        n = (isNaN(Number(i.lineHeight)) ? 1.2 : Number(i.lineHeight)) * (s.actualBoundingBoxAscent + s.actualBoundingBoxDescent);
      } else
        t || (t = document.createElement("div"), t.innerHTML = "M", t.style.minHeight = "0", t.style.maxHeight = "none", t.style.height = "auto", t.style.padding = "0", t.style.border = "none", t.style.position = "absolute", t.style.display = "block", t.style.left = "-99999px"), t.style.font = e, document.body.appendChild(t), n = t.offsetHeight, document.body.removeChild(t);
      No[e] = n;
    }
    return n;
  };
}();
function qc(t, e) {
  return ri || (ri = De(1, 1)), t != Fo && (ri.font = t, Fo = ri.font), ri.measureText(e);
}
function ar(t, e) {
  return qc(t, e).width;
}
function eu(t, e, n) {
  if (e in n)
    return n[e];
  const i = e.split(`
`).reduce((s, r) => Math.max(s, ar(t, r)), 0);
  return n[e] = i, i;
}
function _m(t, e) {
  const n = [], i = [], s = [];
  let r = 0, o = 0, a = 0, l = 0;
  for (let u = 0, c = e.length; u <= c; u += 2) {
    const h = e[u];
    if (h === `
` || u === c) {
      r = Math.max(r, o), s.push(o), o = 0, a += l;
      continue;
    }
    const d = e[u + 1] || t.font, f = ar(d, h);
    n.push(f), o += f;
    const g = mm(d);
    i.push(g), l = Math.max(l, g);
  }
  return { width: r, height: a, widths: n, heights: i, lineWidths: s };
}
function vm(t, e, n, i, s, r, o, a, l, u, c) {
  t.save(), n !== 1 && (t.globalAlpha === void 0 ? t.globalAlpha = (h) => h.globalAlpha *= n : t.globalAlpha *= n), e && t.transform.apply(t, e), /** @type {*} */
  i.contextInstructions ? (t.translate(l, u), t.scale(c[0], c[1]), ym(
    /** @type {Label} */
    i,
    t
  )) : c[0] < 0 || c[1] < 0 ? (t.translate(l, u), t.scale(c[0], c[1]), t.drawImage(
    /** @type {HTMLCanvasElement|HTMLImageElement|HTMLVideoElement} */
    i,
    s,
    r,
    o,
    a,
    0,
    0,
    o,
    a
  )) : t.drawImage(
    /** @type {HTMLCanvasElement|HTMLImageElement|HTMLVideoElement} */
    i,
    s,
    r,
    o,
    a,
    l,
    u,
    o * c[0],
    a * c[1]
  ), t.restore();
}
function ym(t, e) {
  const n = t.contextInstructions;
  for (let i = 0, s = n.length; i < s; i += 2)
    Array.isArray(n[i + 1]) ? e[n[i]].apply(
      e,
      n[i + 1]
    ) : e[n[i]] = n[i + 1];
}
class Ra extends Bc {
  /**
   * @param {Options} options Options.
   */
  constructor(e) {
    super({
      opacity: 1,
      rotateWithView: e.rotateWithView !== void 0 ? e.rotateWithView : !1,
      rotation: e.rotation !== void 0 ? e.rotation : 0,
      scale: e.scale !== void 0 ? e.scale : 1,
      displacement: e.displacement !== void 0 ? e.displacement : [0, 0],
      declutterMode: e.declutterMode
    }), this.canvases_, this.hitDetectionCanvas_ = null, this.fill_ = e.fill !== void 0 ? e.fill : null, this.origin_ = [0, 0], this.points_ = e.points, this.radius_ = e.radius, this.radius2_ = e.radius2, this.angle_ = e.angle !== void 0 ? e.angle : 0, this.stroke_ = e.stroke !== void 0 ? e.stroke : null, this.size_, this.renderOptions_, this.imageState_ = this.fill_ && this.fill_.loading() ? ee.LOADING : ee.LOADED, this.imageState_ === ee.LOADING && this.ready().then(() => this.imageState_ = ee.LOADED), this.render();
  }
  /**
   * Clones the style.
   * @return {RegularShape} The cloned style.
   * @api
   */
  clone() {
    const e = this.getScale(), n = new Ra({
      fill: this.getFill() ? this.getFill().clone() : void 0,
      points: this.getPoints(),
      radius: this.getRadius(),
      radius2: this.getRadius2(),
      angle: this.getAngle(),
      stroke: this.getStroke() ? this.getStroke().clone() : void 0,
      rotation: this.getRotation(),
      rotateWithView: this.getRotateWithView(),
      scale: Array.isArray(e) ? e.slice() : e,
      displacement: this.getDisplacement().slice(),
      declutterMode: this.getDeclutterMode()
    });
    return n.setOpacity(this.getOpacity()), n;
  }
  /**
   * Get the anchor point in pixels. The anchor determines the center point for the
   * symbolizer.
   * @return {Array<number>} Anchor.
   * @api
   */
  getAnchor() {
    const e = this.size_, n = this.getDisplacement(), i = this.getScaleArray();
    return [
      e[0] / 2 - n[0] / i[0],
      e[1] / 2 + n[1] / i[1]
    ];
  }
  /**
   * Get the angle used in generating the shape.
   * @return {number} Shape's rotation in radians.
   * @api
   */
  getAngle() {
    return this.angle_;
  }
  /**
   * Get the fill style for the shape.
   * @return {import("./Fill.js").default|null} Fill style.
   * @api
   */
  getFill() {
    return this.fill_;
  }
  /**
   * Set the fill style.
   * @param {import("./Fill.js").default|null} fill Fill style.
   * @api
   */
  setFill(e) {
    this.fill_ = e, this.render();
  }
  /**
   * @return {HTMLCanvasElement} Image element.
   */
  getHitDetectionImage() {
    return this.hitDetectionCanvas_ || (this.hitDetectionCanvas_ = this.createHitDetectionCanvas_(
      this.renderOptions_
    )), this.hitDetectionCanvas_;
  }
  /**
   * Get the image icon.
   * @param {number} pixelRatio Pixel ratio.
   * @return {HTMLCanvasElement} Image or Canvas element.
   * @api
   */
  getImage(e) {
    let n = this.canvases_[e];
    if (!n) {
      const i = this.renderOptions_, s = De(
        i.size * e,
        i.size * e
      );
      this.draw_(i, s, e), n = s.canvas, this.canvases_[e] = n;
    }
    return n;
  }
  /**
   * Get the image pixel ratio.
   * @param {number} pixelRatio Pixel ratio.
   * @return {number} Pixel ratio.
   */
  getPixelRatio(e) {
    return e;
  }
  /**
   * @return {import("../size.js").Size} Image size.
   */
  getImageSize() {
    return this.size_;
  }
  /**
   * @return {import("../ImageState.js").default} Image state.
   */
  getImageState() {
    return this.imageState_;
  }
  /**
   * Get the origin of the symbolizer.
   * @return {Array<number>} Origin.
   * @api
   */
  getOrigin() {
    return this.origin_;
  }
  /**
   * Get the number of points for generating the shape.
   * @return {number} Number of points for stars and regular polygons.
   * @api
   */
  getPoints() {
    return this.points_;
  }
  /**
   * Get the (primary) radius for the shape.
   * @return {number} Radius.
   * @api
   */
  getRadius() {
    return this.radius_;
  }
  /**
   * Get the secondary radius for the shape.
   * @return {number|undefined} Radius2.
   * @api
   */
  getRadius2() {
    return this.radius2_;
  }
  /**
   * Get the size of the symbolizer (in pixels).
   * @return {import("../size.js").Size} Size.
   * @api
   */
  getSize() {
    return this.size_;
  }
  /**
   * Get the stroke style for the shape.
   * @return {import("./Stroke.js").default|null} Stroke style.
   * @api
   */
  getStroke() {
    return this.stroke_;
  }
  /**
   * Set the stroke style.
   * @param {import("./Stroke.js").default|null} stroke Stroke style.
   * @api
   */
  setStroke(e) {
    this.stroke_ = e, this.render();
  }
  /**
   * @param {function(import("../events/Event.js").default): void} listener Listener function.
   */
  listenImageChange(e) {
  }
  /**
   * Load not yet loaded URI.
   */
  load() {
  }
  /**
   * @param {function(import("../events/Event.js").default): void} listener Listener function.
   */
  unlistenImageChange(e) {
  }
  /**
   * Calculate additional canvas size needed for the miter.
   * @param {string} lineJoin Line join
   * @param {number} strokeWidth Stroke width
   * @param {number} miterLimit Miter limit
   * @return {number} Additional canvas size needed
   * @private
   */
  calculateLineJoinSize_(e, n, i) {
    if (n === 0 || this.points_ === 1 / 0 || e !== "bevel" && e !== "miter")
      return n;
    let s = this.radius_, r = this.radius2_ === void 0 ? s : this.radius2_;
    if (s < r) {
      const S = s;
      s = r, r = S;
    }
    const o = this.radius2_ === void 0 ? this.points_ : this.points_ * 2, a = 2 * Math.PI / o, l = r * Math.sin(a), u = Math.sqrt(r * r - l * l), c = s - u, h = Math.sqrt(l * l + c * c), d = h / l;
    if (e === "miter" && d <= i)
      return d * n;
    const f = n / 2 / d, g = n / 2 * (c / h), _ = Math.sqrt((s + f) * (s + f) + g * g) - s;
    if (this.radius2_ === void 0 || e === "bevel")
      return _ * 2;
    const p = s * Math.sin(a), y = Math.sqrt(s * s - p * p), C = r - y, E = Math.sqrt(p * p + C * C) / p;
    if (E <= i) {
      const S = E * n / 2 - r - s;
      return 2 * Math.max(_, S);
    }
    return _ * 2;
  }
  /**
   * @return {RenderOptions}  The render options
   * @protected
   */
  createRenderOptions() {
    let e = Ei, n = wi, i = 0, s = null, r = 0, o, a = 0;
    this.stroke_ && (o = Pt(this.stroke_.getColor() ?? ls), a = this.stroke_.getWidth() ?? cs, s = this.stroke_.getLineDash(), r = this.stroke_.getLineDashOffset() ?? 0, n = this.stroke_.getLineJoin() ?? wi, e = this.stroke_.getLineCap() ?? Ei, i = this.stroke_.getMiterLimit() ?? as);
    const l = this.calculateLineJoinSize_(n, a, i), u = Math.max(this.radius_, this.radius2_ || 0), c = Math.ceil(2 * u + l);
    return {
      strokeStyle: o,
      strokeWidth: a,
      size: c,
      lineCap: e,
      lineDash: s,
      lineDashOffset: r,
      lineJoin: n,
      miterLimit: i
    };
  }
  /**
   * @protected
   */
  render() {
    this.renderOptions_ = this.createRenderOptions();
    const e = this.renderOptions_.size;
    this.canvases_ = {}, this.hitDetectionCanvas_ = null, this.size_ = [e, e];
  }
  /**
   * @private
   * @param {RenderOptions} renderOptions Render options.
   * @param {CanvasRenderingContext2D} context The rendering context.
   * @param {number} pixelRatio The pixel ratio.
   */
  draw_(e, n, i) {
    if (n.scale(i, i), n.translate(e.size / 2, e.size / 2), this.createPath_(n), this.fill_) {
      let s = this.fill_.getColor();
      s === null && (s = He), n.fillStyle = Pt(s), n.fill();
    }
    e.strokeStyle && (n.strokeStyle = e.strokeStyle, n.lineWidth = e.strokeWidth, e.lineDash && (n.setLineDash(e.lineDash), n.lineDashOffset = e.lineDashOffset), n.lineCap = e.lineCap, n.lineJoin = e.lineJoin, n.miterLimit = e.miterLimit, n.stroke());
  }
  /**
   * @private
   * @param {RenderOptions} renderOptions Render options.
   * @return {HTMLCanvasElement} Canvas containing the icon
   */
  createHitDetectionCanvas_(e) {
    let n;
    if (this.fill_) {
      let i = this.fill_.getColor(), s = 0;
      typeof i == "string" && (i = os(i)), i === null ? s = 1 : Array.isArray(i) && (s = i.length === 4 ? i[3] : 1), s === 0 && (n = De(e.size, e.size), this.drawHitDetectionCanvas_(e, n));
    }
    return n ? n.canvas : this.getImage(1);
  }
  /**
   * @private
   * @param {CanvasRenderingContext2D} context The context to draw in.
   */
  createPath_(e) {
    let n = this.points_;
    const i = this.radius_;
    if (n === 1 / 0)
      e.arc(0, 0, i, 0, 2 * Math.PI);
    else {
      const s = this.radius2_ === void 0 ? i : this.radius2_;
      this.radius2_ !== void 0 && (n *= 2);
      const r = this.angle_ - Math.PI / 2, o = 2 * Math.PI / n;
      for (let a = 0; a < n; a++) {
        const l = r + a * o, u = a % 2 === 0 ? i : s;
        e.lineTo(u * Math.cos(l), u * Math.sin(l));
      }
      e.closePath();
    }
  }
  /**
   * @private
   * @param {RenderOptions} renderOptions Render options.
   * @param {CanvasRenderingContext2D} context The context.
   */
  drawHitDetectionCanvas_(e, n) {
    n.translate(e.size / 2, e.size / 2), this.createPath_(n), n.fillStyle = He, n.fill(), e.strokeStyle && (n.strokeStyle = e.strokeStyle, n.lineWidth = e.strokeWidth, e.lineDash && (n.setLineDash(e.lineDash), n.lineDashOffset = e.lineDashOffset), n.lineJoin = e.lineJoin, n.miterLimit = e.miterLimit, n.stroke());
  }
  ready() {
    return this.fill_ ? this.fill_.ready() : Promise.resolve();
  }
}
const Jc = Ra;
class La extends Jc {
  /**
   * @param {Options} [options] Options.
   */
  constructor(e) {
    e = e || { radius: 5 }, super({
      points: 1 / 0,
      fill: e.fill,
      radius: e.radius,
      stroke: e.stroke,
      scale: e.scale !== void 0 ? e.scale : 1,
      rotation: e.rotation !== void 0 ? e.rotation : 0,
      rotateWithView: e.rotateWithView !== void 0 ? e.rotateWithView : !1,
      displacement: e.displacement !== void 0 ? e.displacement : [0, 0],
      declutterMode: e.declutterMode
    });
  }
  /**
   * Clones the style.
   * @return {CircleStyle} The cloned style.
   * @api
   */
  clone() {
    const e = this.getScale(), n = new La({
      fill: this.getFill() ? this.getFill().clone() : void 0,
      stroke: this.getStroke() ? this.getStroke().clone() : void 0,
      radius: this.getRadius(),
      scale: Array.isArray(e) ? e.slice() : e,
      rotation: this.getRotation(),
      rotateWithView: this.getRotateWithView(),
      displacement: this.getDisplacement().slice(),
      declutterMode: this.getDeclutterMode()
    });
    return n.setOpacity(this.getOpacity()), n;
  }
  /**
   * Set the circle radius.
   *
   * @param {number} radius Circle radius.
   * @api
   */
  setRadius(e) {
    this.radius_ = e, this.render();
  }
}
const Qc = La;
class Aa {
  /**
   * @param {Options} [options] Options.
   */
  constructor(e) {
    e = e || {}, this.patternImage_ = null, this.color_ = null, e.color !== void 0 && this.setColor(e.color);
  }
  /**
   * Clones the style. The color is not cloned if it is an {@link module:ol/colorlike~ColorLike}.
   * @return {Fill} The cloned style.
   * @api
   */
  clone() {
    const e = this.getColor();
    return new Aa({
      color: Array.isArray(e) ? e.slice() : e || void 0
    });
  }
  /**
   * Get the fill color.
   * @return {import("../color.js").Color|import("../colorlike.js").ColorLike|import('../colorlike.js').PatternDescriptor|null} Color.
   * @api
   */
  getColor() {
    return this.color_;
  }
  /**
   * Set the color.
   *
   * @param {import("../color.js").Color|import("../colorlike.js").ColorLike|import('../colorlike.js').PatternDescriptor|null} color Color.
   * @api
   */
  setColor(e) {
    if (e !== null && typeof e == "object" && "src" in e) {
      const n = Ia(
        null,
        e.src,
        "anonymous",
        void 0,
        e.offset ? null : e.color ? e.color : null,
        !(e.offset && e.size)
      );
      n.ready().then(() => {
        this.patternImage_ = null;
      }), n.getImageState() === ee.IDLE && n.load(), n.getImageState() === ee.LOADING && (this.patternImage_ = n);
    }
    this.color_ = e;
  }
  /**
   * @return {boolean} The fill style is loading an image pattern.
   */
  loading() {
    return !!this.patternImage_;
  }
  /**
   * @return {Promise<void>} `false` or a promise that resolves when the style is ready to use.
   */
  ready() {
    return this.patternImage_ ? this.patternImage_.ready() : Promise.resolve();
  }
}
const Pa = Aa;
class Ma {
  /**
   * @param {Options} [options] Options.
   */
  constructor(e) {
    e = e || {}, this.color_ = e.color !== void 0 ? e.color : null, this.lineCap_ = e.lineCap, this.lineDash_ = e.lineDash !== void 0 ? e.lineDash : null, this.lineDashOffset_ = e.lineDashOffset, this.lineJoin_ = e.lineJoin, this.miterLimit_ = e.miterLimit, this.width_ = e.width;
  }
  /**
   * Clones the style.
   * @return {Stroke} The cloned style.
   * @api
   */
  clone() {
    const e = this.getColor();
    return new Ma({
      color: Array.isArray(e) ? e.slice() : e || void 0,
      lineCap: this.getLineCap(),
      lineDash: this.getLineDash() ? this.getLineDash().slice() : void 0,
      lineDashOffset: this.getLineDashOffset(),
      lineJoin: this.getLineJoin(),
      miterLimit: this.getMiterLimit(),
      width: this.getWidth()
    });
  }
  /**
   * Get the stroke color.
   * @return {import("../color.js").Color|import("../colorlike.js").ColorLike} Color.
   * @api
   */
  getColor() {
    return this.color_;
  }
  /**
   * Get the line cap type for the stroke.
   * @return {CanvasLineCap|undefined} Line cap.
   * @api
   */
  getLineCap() {
    return this.lineCap_;
  }
  /**
   * Get the line dash style for the stroke.
   * @return {Array<number>|null} Line dash.
   * @api
   */
  getLineDash() {
    return this.lineDash_;
  }
  /**
   * Get the line dash offset for the stroke.
   * @return {number|undefined} Line dash offset.
   * @api
   */
  getLineDashOffset() {
    return this.lineDashOffset_;
  }
  /**
   * Get the line join type for the stroke.
   * @return {CanvasLineJoin|undefined} Line join.
   * @api
   */
  getLineJoin() {
    return this.lineJoin_;
  }
  /**
   * Get the miter limit for the stroke.
   * @return {number|undefined} Miter limit.
   * @api
   */
  getMiterLimit() {
    return this.miterLimit_;
  }
  /**
   * Get the stroke width.
   * @return {number|undefined} Width.
   * @api
   */
  getWidth() {
    return this.width_;
  }
  /**
   * Set the color.
   *
   * @param {import("../color.js").Color|import("../colorlike.js").ColorLike} color Color.
   * @api
   */
  setColor(e) {
    this.color_ = e;
  }
  /**
   * Set the line cap.
   *
   * @param {CanvasLineCap|undefined} lineCap Line cap.
   * @api
   */
  setLineCap(e) {
    this.lineCap_ = e;
  }
  /**
   * Set the line dash.
   *
   * @param {Array<number>|null} lineDash Line dash.
   * @api
   */
  setLineDash(e) {
    this.lineDash_ = e;
  }
  /**
   * Set the line dash offset.
   *
   * @param {number|undefined} lineDashOffset Line dash offset.
   * @api
   */
  setLineDashOffset(e) {
    this.lineDashOffset_ = e;
  }
  /**
   * Set the line join.
   *
   * @param {CanvasLineJoin|undefined} lineJoin Line join.
   * @api
   */
  setLineJoin(e) {
    this.lineJoin_ = e;
  }
  /**
   * Set the miter limit.
   *
   * @param {number|undefined} miterLimit Miter limit.
   * @api
   */
  setMiterLimit(e) {
    this.miterLimit_ = e;
  }
  /**
   * Set the width.
   *
   * @param {number|undefined} width Width.
   * @api
   */
  setWidth(e) {
    this.width_ = e;
  }
}
const eh = Ma;
class Ar {
  /**
   * @param {Options} [options] Style options.
   */
  constructor(e) {
    e = e || {}, this.geometry_ = null, this.geometryFunction_ = tu, e.geometry !== void 0 && this.setGeometry(e.geometry), this.fill_ = e.fill !== void 0 ? e.fill : null, this.image_ = e.image !== void 0 ? e.image : null, this.renderer_ = e.renderer !== void 0 ? e.renderer : null, this.hitDetectionRenderer_ = e.hitDetectionRenderer !== void 0 ? e.hitDetectionRenderer : null, this.stroke_ = e.stroke !== void 0 ? e.stroke : null, this.text_ = e.text !== void 0 ? e.text : null, this.zIndex_ = e.zIndex;
  }
  /**
   * Clones the style.
   * @return {Style} The cloned style.
   * @api
   */
  clone() {
    let e = this.getGeometry();
    return e && typeof e == "object" && (e = /** @type {import("../geom/Geometry.js").default} */
    e.clone()), new Ar({
      geometry: e ?? void 0,
      fill: this.getFill() ? this.getFill().clone() : void 0,
      image: this.getImage() ? this.getImage().clone() : void 0,
      renderer: this.getRenderer() ?? void 0,
      stroke: this.getStroke() ? this.getStroke().clone() : void 0,
      text: this.getText() ? this.getText().clone() : void 0,
      zIndex: this.getZIndex()
    });
  }
  /**
   * Get the custom renderer function that was configured with
   * {@link #setRenderer} or the `renderer` constructor option.
   * @return {RenderFunction|null} Custom renderer function.
   * @api
   */
  getRenderer() {
    return this.renderer_;
  }
  /**
   * Sets a custom renderer function for this style. When set, `fill`, `stroke`
   * and `image` options of the style will be ignored.
   * @param {RenderFunction|null} renderer Custom renderer function.
   * @api
   */
  setRenderer(e) {
    this.renderer_ = e;
  }
  /**
   * Sets a custom renderer function for this style used
   * in hit detection.
   * @param {RenderFunction|null} renderer Custom renderer function.
   * @api
   */
  setHitDetectionRenderer(e) {
    this.hitDetectionRenderer_ = e;
  }
  /**
   * Get the custom renderer function that was configured with
   * {@link #setHitDetectionRenderer} or the `hitDetectionRenderer` constructor option.
   * @return {RenderFunction|null} Custom renderer function.
   * @api
   */
  getHitDetectionRenderer() {
    return this.hitDetectionRenderer_;
  }
  /**
   * Get the geometry to be rendered.
   * @return {string|import("../geom/Geometry.js").default|GeometryFunction|null}
   * Feature property or geometry or function that returns the geometry that will
   * be rendered with this style.
   * @api
   */
  getGeometry() {
    return this.geometry_;
  }
  /**
   * Get the function used to generate a geometry for rendering.
   * @return {!GeometryFunction} Function that is called with a feature
   * and returns the geometry to render instead of the feature's geometry.
   * @api
   */
  getGeometryFunction() {
    return this.geometryFunction_;
  }
  /**
   * Get the fill style.
   * @return {import("./Fill.js").default|null} Fill style.
   * @api
   */
  getFill() {
    return this.fill_;
  }
  /**
   * Set the fill style.
   * @param {import("./Fill.js").default|null} fill Fill style.
   * @api
   */
  setFill(e) {
    this.fill_ = e;
  }
  /**
   * Get the image style.
   * @return {import("./Image.js").default|null} Image style.
   * @api
   */
  getImage() {
    return this.image_;
  }
  /**
   * Set the image style.
   * @param {import("./Image.js").default} image Image style.
   * @api
   */
  setImage(e) {
    this.image_ = e;
  }
  /**
   * Get the stroke style.
   * @return {import("./Stroke.js").default|null} Stroke style.
   * @api
   */
  getStroke() {
    return this.stroke_;
  }
  /**
   * Set the stroke style.
   * @param {import("./Stroke.js").default|null} stroke Stroke style.
   * @api
   */
  setStroke(e) {
    this.stroke_ = e;
  }
  /**
   * Get the text style.
   * @return {import("./Text.js").default|null} Text style.
   * @api
   */
  getText() {
    return this.text_;
  }
  /**
   * Set the text style.
   * @param {import("./Text.js").default} text Text style.
   * @api
   */
  setText(e) {
    this.text_ = e;
  }
  /**
   * Get the z-index for the style.
   * @return {number|undefined} ZIndex.
   * @api
   */
  getZIndex() {
    return this.zIndex_;
  }
  /**
   * Set a geometry that is rendered instead of the feature's geometry.
   *
   * @param {string|import("../geom/Geometry.js").default|GeometryFunction} geometry
   *     Feature property or geometry or function returning a geometry to render
   *     for this style.
   * @api
   */
  setGeometry(e) {
    typeof e == "function" ? this.geometryFunction_ = e : typeof e == "string" ? this.geometryFunction_ = function(n) {
      return (
        /** @type {import("../geom/Geometry.js").default} */
        n.get(e)
      );
    } : e ? e !== void 0 && (this.geometryFunction_ = function() {
      return (
        /** @type {import("../geom/Geometry.js").default} */
        e
      );
    }) : this.geometryFunction_ = tu, this.geometry_ = e;
  }
  /**
   * Set the z-index.
   *
   * @param {number|undefined} zIndex ZIndex.
   * @api
   */
  setZIndex(e) {
    this.zIndex_ = e;
  }
}
function pm(t) {
  let e;
  if (typeof t == "function")
    e = t;
  else {
    let n;
    Array.isArray(t) ? n = t : (ue(
      typeof /** @type {?} */
      t.getZIndex == "function",
      "Expected an `Style` or an array of `Style`"
    ), n = [
      /** @type {Style} */
      t
    ]), e = function() {
      return n;
    };
  }
  return e;
}
let go = null;
function xm(t, e) {
  if (!go) {
    const n = new Pa({
      color: "rgba(255,255,255,0.4)"
    }), i = new eh({
      color: "#3399CC",
      width: 1.25
    });
    go = [
      new Ar({
        image: new Qc({
          fill: n,
          stroke: i,
          radius: 5
        }),
        fill: n,
        stroke: i
      })
    ];
  }
  return go;
}
function tu(t) {
  return t.getGeometry();
}
const Ji = Ar;
function nu(t, e, n, i) {
  return n !== void 0 && i !== void 0 ? [n / t, i / e] : n !== void 0 ? n / t : i !== void 0 ? i / e : 1;
}
class ka extends Bc {
  /**
   * @param {Options} [options] Options.
   */
  constructor(e) {
    e = e || {};
    const n = e.opacity !== void 0 ? e.opacity : 1, i = e.rotation !== void 0 ? e.rotation : 0, s = e.scale !== void 0 ? e.scale : 1, r = e.rotateWithView !== void 0 ? e.rotateWithView : !1;
    super({
      opacity: n,
      rotation: i,
      scale: s,
      displacement: e.displacement !== void 0 ? e.displacement : [0, 0],
      rotateWithView: r,
      declutterMode: e.declutterMode
    }), this.anchor_ = e.anchor !== void 0 ? e.anchor : [0.5, 0.5], this.normalizedAnchor_ = null, this.anchorOrigin_ = e.anchorOrigin !== void 0 ? e.anchorOrigin : "top-left", this.anchorXUnits_ = e.anchorXUnits !== void 0 ? e.anchorXUnits : "fraction", this.anchorYUnits_ = e.anchorYUnits !== void 0 ? e.anchorYUnits : "fraction", this.crossOrigin_ = e.crossOrigin !== void 0 ? e.crossOrigin : null;
    const o = e.img !== void 0 ? e.img : null;
    let a = e.src;
    ue(
      !(a !== void 0 && o),
      "`image` and `src` cannot be provided at the same time"
    ), (a === void 0 || a.length === 0) && o && (a = /** @type {HTMLImageElement} */
    o.src || fe(o)), ue(
      a !== void 0 && a.length > 0,
      "A defined and non-empty `src` or `image` must be provided"
    ), ue(
      !((e.width !== void 0 || e.height !== void 0) && e.scale !== void 0),
      "`width` or `height` cannot be provided together with `scale`"
    );
    let l;
    if (e.src !== void 0 ? l = ee.IDLE : o !== void 0 && (o instanceof HTMLImageElement ? o.complete ? l = o.src ? ee.LOADED : ee.IDLE : l = ee.LOADING : l = ee.LOADED), this.color_ = e.color !== void 0 ? os(e.color) : null, this.iconImage_ = Ia(
      o,
      /** @type {string} */
      a,
      this.crossOrigin_,
      l,
      this.color_
    ), this.offset_ = e.offset !== void 0 ? e.offset : [0, 0], this.offsetOrigin_ = e.offsetOrigin !== void 0 ? e.offsetOrigin : "top-left", this.origin_ = null, this.size_ = e.size !== void 0 ? e.size : null, e.width !== void 0 || e.height !== void 0) {
      let u, c;
      if (e.size)
        [u, c] = e.size;
      else {
        const h = this.getImage(1);
        if (h.width && h.height)
          u = h.width, c = h.height;
        else if (h instanceof HTMLImageElement) {
          this.initialOptions_ = e;
          const d = () => {
            if (this.unlistenImageChange(d), !this.initialOptions_)
              return;
            const f = this.iconImage_.getSize();
            this.setScale(
              nu(
                f[0],
                f[1],
                e.width,
                e.height
              )
            );
          };
          this.listenImageChange(d);
          return;
        }
      }
      u !== void 0 && this.setScale(
        nu(u, c, e.width, e.height)
      );
    }
  }
  /**
   * Clones the style. The underlying Image/HTMLCanvasElement is not cloned.
   * @return {Icon} The cloned style.
   * @api
   */
  clone() {
    let e, n, i;
    return this.initialOptions_ ? (n = this.initialOptions_.width, i = this.initialOptions_.height) : (e = this.getScale(), e = Array.isArray(e) ? e.slice() : e), new ka({
      anchor: this.anchor_.slice(),
      anchorOrigin: this.anchorOrigin_,
      anchorXUnits: this.anchorXUnits_,
      anchorYUnits: this.anchorYUnits_,
      color: this.color_ && this.color_.slice ? this.color_.slice() : this.color_ || void 0,
      crossOrigin: this.crossOrigin_,
      offset: this.offset_.slice(),
      offsetOrigin: this.offsetOrigin_,
      opacity: this.getOpacity(),
      rotateWithView: this.getRotateWithView(),
      rotation: this.getRotation(),
      scale: e,
      width: n,
      height: i,
      size: this.size_ !== null ? this.size_.slice() : void 0,
      src: this.getSrc(),
      displacement: this.getDisplacement().slice(),
      declutterMode: this.getDeclutterMode()
    });
  }
  /**
   * Get the anchor point in pixels. The anchor determines the center point for the
   * symbolizer.
   * @return {Array<number>} Anchor.
   * @api
   */
  getAnchor() {
    let e = this.normalizedAnchor_;
    if (!e) {
      e = this.anchor_;
      const s = this.getSize();
      if (this.anchorXUnits_ == "fraction" || this.anchorYUnits_ == "fraction") {
        if (!s)
          return null;
        e = this.anchor_.slice(), this.anchorXUnits_ == "fraction" && (e[0] *= s[0]), this.anchorYUnits_ == "fraction" && (e[1] *= s[1]);
      }
      if (this.anchorOrigin_ != "top-left") {
        if (!s)
          return null;
        e === this.anchor_ && (e = this.anchor_.slice()), (this.anchorOrigin_ == "top-right" || this.anchorOrigin_ == "bottom-right") && (e[0] = -e[0] + s[0]), (this.anchorOrigin_ == "bottom-left" || this.anchorOrigin_ == "bottom-right") && (e[1] = -e[1] + s[1]);
      }
      this.normalizedAnchor_ = e;
    }
    const n = this.getDisplacement(), i = this.getScaleArray();
    return [
      e[0] - n[0] / i[0],
      e[1] + n[1] / i[1]
    ];
  }
  /**
   * Set the anchor point. The anchor determines the center point for the
   * symbolizer.
   *
   * @param {Array<number>} anchor Anchor.
   * @api
   */
  setAnchor(e) {
    this.anchor_ = e, this.normalizedAnchor_ = null;
  }
  /**
   * Get the icon color.
   * @return {import("../color.js").Color} Color.
   * @api
   */
  getColor() {
    return this.color_;
  }
  /**
   * Get the image icon.
   * @param {number} pixelRatio Pixel ratio.
   * @return {HTMLImageElement|HTMLCanvasElement|ImageBitmap} Image or Canvas element. If the Icon
   * style was configured with `src` or with a not let loaded `img`, an `ImageBitmap` will be returned.
   * @api
   */
  getImage(e) {
    return this.iconImage_.getImage(e);
  }
  /**
   * Get the pixel ratio.
   * @param {number} pixelRatio Pixel ratio.
   * @return {number} The pixel ratio of the image.
   * @api
   */
  getPixelRatio(e) {
    return this.iconImage_.getPixelRatio(e);
  }
  /**
   * @return {import("../size.js").Size} Image size.
   */
  getImageSize() {
    return this.iconImage_.getSize();
  }
  /**
   * @return {import("../ImageState.js").default} Image state.
   */
  getImageState() {
    return this.iconImage_.getImageState();
  }
  /**
   * @return {HTMLImageElement|HTMLCanvasElement|ImageBitmap} Image element.
   */
  getHitDetectionImage() {
    return this.iconImage_.getHitDetectionImage();
  }
  /**
   * Get the origin of the symbolizer.
   * @return {Array<number>} Origin.
   * @api
   */
  getOrigin() {
    if (this.origin_)
      return this.origin_;
    let e = this.offset_;
    if (this.offsetOrigin_ != "top-left") {
      const n = this.getSize(), i = this.iconImage_.getSize();
      if (!n || !i)
        return null;
      e = e.slice(), (this.offsetOrigin_ == "top-right" || this.offsetOrigin_ == "bottom-right") && (e[0] = i[0] - n[0] - e[0]), (this.offsetOrigin_ == "bottom-left" || this.offsetOrigin_ == "bottom-right") && (e[1] = i[1] - n[1] - e[1]);
    }
    return this.origin_ = e, this.origin_;
  }
  /**
   * Get the image URL.
   * @return {string|undefined} Image src.
   * @api
   */
  getSrc() {
    return this.iconImage_.getSrc();
  }
  /**
   * Get the size of the icon (in pixels).
   * @return {import("../size.js").Size} Image size.
   * @api
   */
  getSize() {
    return this.size_ ? this.size_ : this.iconImage_.getSize();
  }
  /**
   * Get the width of the icon (in pixels). Will return undefined when the icon image is not yet loaded.
   * @return {number} Icon width (in pixels).
   * @api
   */
  getWidth() {
    const e = this.getScaleArray();
    if (this.size_)
      return this.size_[0] * e[0];
    if (this.iconImage_.getImageState() == ee.LOADED)
      return this.iconImage_.getSize()[0] * e[0];
  }
  /**
   * Get the height of the icon (in pixels). Will return undefined when the icon image is not yet loaded.
   * @return {number} Icon height (in pixels).
   * @api
   */
  getHeight() {
    const e = this.getScaleArray();
    if (this.size_)
      return this.size_[1] * e[1];
    if (this.iconImage_.getImageState() == ee.LOADED)
      return this.iconImage_.getSize()[1] * e[1];
  }
  /**
   * Set the scale.
   *
   * @param {number|import("../size.js").Size} scale Scale.
   * @api
   */
  setScale(e) {
    delete this.initialOptions_, super.setScale(e);
  }
  /**
   * @param {function(import("../events/Event.js").default): void} listener Listener function.
   */
  listenImageChange(e) {
    this.iconImage_.addEventListener(H.CHANGE, e);
  }
  /**
   * Load not yet loaded URI.
   * When rendering a feature with an icon style, the vector renderer will
   * automatically call this method. However, you might want to call this
   * method yourself for preloading or other purposes.
   * @api
   */
  load() {
    this.iconImage_.load();
  }
  /**
   * @param {function(import("../events/Event.js").default): void} listener Listener function.
   */
  unlistenImageChange(e) {
    this.iconImage_.removeEventListener(H.CHANGE, e);
  }
  ready() {
    return this.iconImage_.ready();
  }
}
const Oa = ka, Cm = "#333";
class Da {
  /**
   * @param {Options} [options] Options.
   */
  constructor(e) {
    e = e || {}, this.font_ = e.font, this.rotation_ = e.rotation, this.rotateWithView_ = e.rotateWithView, this.scale_ = e.scale, this.scaleArray_ = st(e.scale !== void 0 ? e.scale : 1), this.text_ = e.text, this.textAlign_ = e.textAlign, this.justify_ = e.justify, this.repeat_ = e.repeat, this.textBaseline_ = e.textBaseline, this.fill_ = e.fill !== void 0 ? e.fill : new Pa({ color: Cm }), this.maxAngle_ = e.maxAngle !== void 0 ? e.maxAngle : Math.PI / 4, this.placement_ = e.placement !== void 0 ? e.placement : "point", this.overflow_ = !!e.overflow, this.stroke_ = e.stroke !== void 0 ? e.stroke : null, this.offsetX_ = e.offsetX !== void 0 ? e.offsetX : 0, this.offsetY_ = e.offsetY !== void 0 ? e.offsetY : 0, this.backgroundFill_ = e.backgroundFill ? e.backgroundFill : null, this.backgroundStroke_ = e.backgroundStroke ? e.backgroundStroke : null, this.padding_ = e.padding === void 0 ? null : e.padding, this.declutterMode_ = e.declutterMode;
  }
  /**
   * Clones the style.
   * @return {Text} The cloned style.
   * @api
   */
  clone() {
    const e = this.getScale();
    return new Da({
      font: this.getFont(),
      placement: this.getPlacement(),
      repeat: this.getRepeat(),
      maxAngle: this.getMaxAngle(),
      overflow: this.getOverflow(),
      rotation: this.getRotation(),
      rotateWithView: this.getRotateWithView(),
      scale: Array.isArray(e) ? e.slice() : e,
      text: this.getText(),
      textAlign: this.getTextAlign(),
      justify: this.getJustify(),
      textBaseline: this.getTextBaseline(),
      fill: this.getFill() ? this.getFill().clone() : void 0,
      stroke: this.getStroke() ? this.getStroke().clone() : void 0,
      offsetX: this.getOffsetX(),
      offsetY: this.getOffsetY(),
      backgroundFill: this.getBackgroundFill() ? this.getBackgroundFill().clone() : void 0,
      backgroundStroke: this.getBackgroundStroke() ? this.getBackgroundStroke().clone() : void 0,
      padding: this.getPadding() || void 0,
      declutterMode: this.getDeclutterMode()
    });
  }
  /**
   * Get the `overflow` configuration.
   * @return {boolean} Let text overflow the length of the path they follow.
   * @api
   */
  getOverflow() {
    return this.overflow_;
  }
  /**
   * Get the font name.
   * @return {string|undefined} Font.
   * @api
   */
  getFont() {
    return this.font_;
  }
  /**
   * Get the maximum angle between adjacent characters.
   * @return {number} Angle in radians.
   * @api
   */
  getMaxAngle() {
    return this.maxAngle_;
  }
  /**
   * Get the label placement.
   * @return {TextPlacement} Text placement.
   * @api
   */
  getPlacement() {
    return this.placement_;
  }
  /**
   * Get the repeat interval of the text.
   * @return {number|undefined} Repeat interval in pixels.
   * @api
   */
  getRepeat() {
    return this.repeat_;
  }
  /**
   * Get the x-offset for the text.
   * @return {number} Horizontal text offset.
   * @api
   */
  getOffsetX() {
    return this.offsetX_;
  }
  /**
   * Get the y-offset for the text.
   * @return {number} Vertical text offset.
   * @api
   */
  getOffsetY() {
    return this.offsetY_;
  }
  /**
   * Get the fill style for the text.
   * @return {import("./Fill.js").default|null} Fill style.
   * @api
   */
  getFill() {
    return this.fill_;
  }
  /**
   * Determine whether the text rotates with the map.
   * @return {boolean|undefined} Rotate with map.
   * @api
   */
  getRotateWithView() {
    return this.rotateWithView_;
  }
  /**
   * Get the text rotation.
   * @return {number|undefined} Rotation.
   * @api
   */
  getRotation() {
    return this.rotation_;
  }
  /**
   * Get the text scale.
   * @return {number|import("../size.js").Size|undefined} Scale.
   * @api
   */
  getScale() {
    return this.scale_;
  }
  /**
   * Get the symbolizer scale array.
   * @return {import("../size.js").Size} Scale array.
   */
  getScaleArray() {
    return this.scaleArray_;
  }
  /**
   * Get the stroke style for the text.
   * @return {import("./Stroke.js").default|null} Stroke style.
   * @api
   */
  getStroke() {
    return this.stroke_;
  }
  /**
   * Get the text to be rendered.
   * @return {string|Array<string>|undefined} Text.
   * @api
   */
  getText() {
    return this.text_;
  }
  /**
   * Get the text alignment.
   * @return {CanvasTextAlign|undefined} Text align.
   * @api
   */
  getTextAlign() {
    return this.textAlign_;
  }
  /**
   * Get the justification.
   * @return {TextJustify|undefined} Justification.
   * @api
   */
  getJustify() {
    return this.justify_;
  }
  /**
   * Get the text baseline.
   * @return {CanvasTextBaseline|undefined} Text baseline.
   * @api
   */
  getTextBaseline() {
    return this.textBaseline_;
  }
  /**
   * Get the background fill style for the text.
   * @return {import("./Fill.js").default|null} Fill style.
   * @api
   */
  getBackgroundFill() {
    return this.backgroundFill_;
  }
  /**
   * Get the background stroke style for the text.
   * @return {import("./Stroke.js").default|null} Stroke style.
   * @api
   */
  getBackgroundStroke() {
    return this.backgroundStroke_;
  }
  /**
   * Get the padding for the text.
   * @return {Array<number>|null} Padding.
   * @api
   */
  getPadding() {
    return this.padding_;
  }
  /**
   * Get the declutter mode of the shape
   * @return {import("./Style.js").DeclutterMode} Shape's declutter mode
   * @api
   */
  getDeclutterMode() {
    return this.declutterMode_;
  }
  /**
   * Set the `overflow` property.
   *
   * @param {boolean} overflow Let text overflow the path that it follows.
   * @api
   */
  setOverflow(e) {
    this.overflow_ = e;
  }
  /**
   * Set the font.
   *
   * @param {string|undefined} font Font.
   * @api
   */
  setFont(e) {
    this.font_ = e;
  }
  /**
   * Set the maximum angle between adjacent characters.
   *
   * @param {number} maxAngle Angle in radians.
   * @api
   */
  setMaxAngle(e) {
    this.maxAngle_ = e;
  }
  /**
   * Set the x offset.
   *
   * @param {number} offsetX Horizontal text offset.
   * @api
   */
  setOffsetX(e) {
    this.offsetX_ = e;
  }
  /**
   * Set the y offset.
   *
   * @param {number} offsetY Vertical text offset.
   * @api
   */
  setOffsetY(e) {
    this.offsetY_ = e;
  }
  /**
   * Set the text placement.
   *
   * @param {TextPlacement} placement Placement.
   * @api
   */
  setPlacement(e) {
    this.placement_ = e;
  }
  /**
   * Set the repeat interval of the text.
   * @param {number|undefined} [repeat] Repeat interval in pixels.
   * @api
   */
  setRepeat(e) {
    this.repeat_ = e;
  }
  /**
   * Set whether to rotate the text with the view.
   *
   * @param {boolean} rotateWithView Rotate with map.
   * @api
   */
  setRotateWithView(e) {
    this.rotateWithView_ = e;
  }
  /**
   * Set the fill.
   *
   * @param {import("./Fill.js").default|null} fill Fill style.
   * @api
   */
  setFill(e) {
    this.fill_ = e;
  }
  /**
   * Set the rotation.
   *
   * @param {number|undefined} rotation Rotation.
   * @api
   */
  setRotation(e) {
    this.rotation_ = e;
  }
  /**
   * Set the scale.
   *
   * @param {number|import("../size.js").Size|undefined} scale Scale.
   * @api
   */
  setScale(e) {
    this.scale_ = e, this.scaleArray_ = st(e !== void 0 ? e : 1);
  }
  /**
   * Set the stroke.
   *
   * @param {import("./Stroke.js").default|null} stroke Stroke style.
   * @api
   */
  setStroke(e) {
    this.stroke_ = e;
  }
  /**
   * Set the text.
   *
   * @param {string|Array<string>|undefined} text Text.
   * @api
   */
  setText(e) {
    this.text_ = e;
  }
  /**
   * Set the text alignment.
   *
   * @param {CanvasTextAlign|undefined} textAlign Text align.
   * @api
   */
  setTextAlign(e) {
    this.textAlign_ = e;
  }
  /**
   * Set the justification.
   *
   * @param {TextJustify|undefined} justify Justification.
   * @api
   */
  setJustify(e) {
    this.justify_ = e;
  }
  /**
   * Set the text baseline.
   *
   * @param {CanvasTextBaseline|undefined} textBaseline Text baseline.
   * @api
   */
  setTextBaseline(e) {
    this.textBaseline_ = e;
  }
  /**
   * Set the background fill.
   *
   * @param {import("./Fill.js").default|null} fill Fill style.
   * @api
   */
  setBackgroundFill(e) {
    this.backgroundFill_ = e;
  }
  /**
   * Set the background stroke.
   *
   * @param {import("./Stroke.js").default|null} stroke Stroke style.
   * @api
   */
  setBackgroundStroke(e) {
    this.backgroundStroke_ = e;
  }
  /**
   * Set the padding (`[top, right, bottom, left]`).
   *
   * @param {Array<number>|null} padding Padding.
   * @api
   */
  setPadding(e) {
    this.padding_ = e;
  }
}
const Em = Da;
let Ri = 0;
const Li = 0, Se = 1 << Ri++, $ = 1 << Ri++, tt = 1 << Ri++, Me = 1 << Ri++, tn = 1 << Ri++, Fe = Math.pow(2, Ri) - 1, th = {
  [Se]: "boolean",
  [$]: "number",
  [tt]: "string",
  [Me]: "color",
  [tn]: "number[]"
}, wm = Object.keys(th).map(Number).sort(qt);
function ze(t) {
  const e = [];
  for (const n of wm)
    Sm(t, n) && e.push(th[n]);
  return e.length === 0 ? "untyped" : e.length < 3 ? e.join(" or ") : e.slice(0, -1).join(", ") + ", or " + e[e.length - 1];
}
function Sm(t, e) {
  return (t & e) === e;
}
function Mt(t, e) {
  return !!(t & e);
}
function Pr(t, e) {
  return t === e;
}
class mn {
  /**
   * @param {number} type The value type.
   * @param {LiteralValue} value The literal value.
   */
  constructor(e, n) {
    this.type = e, this.value = n;
  }
}
class bm {
  /**
   * @param {number} type The return type.
   * @param {string} operator The operator.
   * @param {...Expression} args The arguments.
   */
  constructor(e, n, ...i) {
    this.type = e, this.operator = n, this.args = i;
  }
}
function nh() {
  return {
    variables: /* @__PURE__ */ new Set(),
    properties: /* @__PURE__ */ new Set(),
    featureId: !1,
    geometryType: !1,
    style: {}
  };
}
function Im(t) {
  switch (t) {
    case "string":
      return tt;
    case "color":
      return Me;
    case "number":
      return $;
    case "boolean":
      return Se;
    case "number[]":
      return tn;
    default:
      throw new Error(`Unrecognized type hint: ${t}`);
  }
}
function de(t, e, n) {
  switch (typeof t) {
    case "boolean":
      return new mn(Se, t);
    case "number":
      return new mn($, t);
    case "string": {
      let s = tt;
      return tm(t) && (s |= Me), Pr(s & n, Li) || (s &= n), new mn(s, t);
    }
  }
  if (!Array.isArray(t))
    throw new Error("Expression must be an array or a primitive value");
  if (t.length === 0)
    throw new Error("Empty expression");
  if (typeof t[0] == "string")
    return Vm(t, e, n);
  for (const s of t)
    if (typeof s != "number")
      throw new Error("Expected an array of numbers");
  let i = tn;
  return (t.length === 3 || t.length === 4) && (i |= Me), n && (i &= n), new mn(i, t);
}
const R = {
  Get: "get",
  Var: "var",
  Concat: "concat",
  GeometryType: "geometry-type",
  Any: "any",
  All: "all",
  Not: "!",
  Resolution: "resolution",
  Zoom: "zoom",
  Time: "time",
  Equal: "==",
  NotEqual: "!=",
  GreaterThan: ">",
  GreaterThanOrEqualTo: ">=",
  LessThan: "<",
  LessThanOrEqualTo: "<=",
  Multiply: "*",
  Divide: "/",
  Add: "+",
  Subtract: "-",
  Clamp: "clamp",
  Mod: "%",
  Pow: "^",
  Abs: "abs",
  Floor: "floor",
  Ceil: "ceil",
  Round: "round",
  Sin: "sin",
  Cos: "cos",
  Atan: "atan",
  Sqrt: "sqrt",
  Match: "match",
  Between: "between",
  Interpolate: "interpolate",
  Coalesce: "coalesce",
  Case: "case",
  In: "in",
  Number: "number",
  String: "string",
  Array: "array",
  Color: "color",
  Id: "id",
  Band: "band",
  Palette: "palette",
  ToString: "to-string"
}, Tm = {
  [R.Get]: K(
    ([t, e]) => e !== void 0 ? Im(
      /** @type {string} */
      /** @type {LiteralExpression} */
      e.value
    ) : Fe,
    Q(1, 2),
    Rm
  ),
  [R.Var]: K(
    ([t]) => t.type,
    Q(1, 1),
    Lm
  ),
  [R.Id]: K($ | tt, Xi, Am),
  [R.Concat]: K(
    tt,
    Q(2, 1 / 0),
    ae(Fe)
  ),
  [R.GeometryType]: K(tt, Xi, Pm),
  [R.Resolution]: K($, Xi),
  [R.Zoom]: K($, Xi),
  [R.Time]: K($, Xi),
  [R.Any]: K(
    Se,
    Q(2, 1 / 0),
    ae(Se)
  ),
  [R.All]: K(
    Se,
    Q(2, 1 / 0),
    ae(Se)
  ),
  [R.Not]: K(
    Se,
    Q(1, 1),
    ae(Se)
  ),
  [R.Equal]: K(
    Se,
    Q(2, 2),
    ae(Fe),
    an
  ),
  [R.NotEqual]: K(
    Se,
    Q(2, 2),
    ae(Fe),
    an
  ),
  [R.GreaterThan]: K(
    Se,
    Q(2, 2),
    ae(Fe),
    an
  ),
  [R.GreaterThanOrEqualTo]: K(
    Se,
    Q(2, 2),
    ae(Fe),
    an
  ),
  [R.LessThan]: K(
    Se,
    Q(2, 2),
    ae(Fe),
    an
  ),
  [R.LessThanOrEqualTo]: K(
    Se,
    Q(2, 2),
    ae(Fe),
    an
  ),
  [R.Multiply]: K(
    (t) => {
      let e = $ | Me;
      for (let n = 0; n < t.length; n++)
        e &= t[n].type;
      return e;
    },
    Q(2, 1 / 0),
    ae($ | Me),
    an
  ),
  [R.Coalesce]: K(
    (t) => {
      let e = Fe;
      for (let n = 1; n < t.length; n += 2)
        e &= t[n].type;
      return e &= t[t.length - 1].type, e;
    },
    Q(2, 1 / 0),
    ae(Fe),
    an
  ),
  [R.Divide]: K(
    $,
    Q(2, 2),
    ae($)
  ),
  [R.Add]: K(
    $,
    Q(2, 1 / 0),
    ae($)
  ),
  [R.Subtract]: K(
    $,
    Q(2, 2),
    ae($)
  ),
  [R.Clamp]: K(
    $,
    Q(3, 3),
    ae($)
  ),
  [R.Mod]: K(
    $,
    Q(2, 2),
    ae($)
  ),
  [R.Pow]: K(
    $,
    Q(2, 2),
    ae($)
  ),
  [R.Abs]: K(
    $,
    Q(1, 1),
    ae($)
  ),
  [R.Floor]: K(
    $,
    Q(1, 1),
    ae($)
  ),
  [R.Ceil]: K(
    $,
    Q(1, 1),
    ae($)
  ),
  [R.Round]: K(
    $,
    Q(1, 1),
    ae($)
  ),
  [R.Sin]: K(
    $,
    Q(1, 1),
    ae($)
  ),
  [R.Cos]: K(
    $,
    Q(1, 1),
    ae($)
  ),
  [R.Atan]: K(
    $,
    Q(1, 2),
    ae($)
  ),
  [R.Sqrt]: K(
    $,
    Q(1, 1),
    ae($)
  ),
  [R.Match]: K(
    (t) => {
      let e = Fe;
      for (let n = 2; n < t.length; n += 2)
        e &= t[n].type;
      return e &= t[t.length - 1].type, e;
    },
    Q(4, 1 / 0),
    iu,
    km
  ),
  [R.Between]: K(
    Se,
    Q(3, 3),
    ae($)
  ),
  [R.Interpolate]: K(
    (t) => {
      let e = Me | $;
      for (let n = 3; n < t.length; n += 2)
        e &= t[n].type;
      return e;
    },
    Q(6, 1 / 0),
    iu,
    Om
  ),
  [R.Case]: K(
    (t) => {
      let e = Fe;
      for (let n = 1; n < t.length; n += 2)
        e &= t[n].type;
      return e &= t[t.length - 1].type, e;
    },
    Q(3, 1 / 0),
    Mm,
    Dm
  ),
  [R.In]: K(Se, Q(2, 2), Fm),
  [R.Number]: K(
    $,
    Q(1, 1 / 0),
    ae(Fe)
  ),
  [R.String]: K(
    tt,
    Q(1, 1 / 0),
    ae(Fe)
  ),
  [R.Array]: K(
    (t) => t.length === 3 || t.length === 4 ? tn | Me : tn,
    Q(1, 1 / 0),
    ae($)
  ),
  [R.Color]: K(
    Me,
    Q(1, 4),
    ae($)
  ),
  [R.Band]: K(
    $,
    Q(1, 3),
    ae($)
  ),
  [R.Palette]: K(Me, Q(2, 2), Nm),
  [R.ToString]: K(
    tt,
    Q(1, 1),
    ae(Se | $ | tt | Me)
  )
};
function Rm(t, e) {
  const n = de(t[1], e);
  if (!(n instanceof mn))
    throw new Error("Expected a literal argument for get operation");
  if (typeof n.value != "string")
    throw new Error("Expected a string argument for get operation");
  if (e.properties.add(n.value), t.length === 3) {
    const i = de(t[2], e);
    return [n, i];
  }
  return [n];
}
function Lm(t, e, n, i) {
  const s = t[1];
  if (typeof s != "string")
    throw new Error("Expected a string argument for var operation");
  if (e.variables.add(s), !("variables" in e.style) || e.style.variables[s] === void 0)
    return [new mn(Fe, s)];
  const r = e.style.variables[s], o = (
    /** @type {LiteralExpression} */
    de(r, e)
  );
  if (o.value = s, i && !Mt(i, o.type))
    throw new Error(
      `The variable ${s} has type ${ze(
        o.type
      )} but the following type was expected: ${ze(i)}`
    );
  return [o];
}
function Am(t, e) {
  e.featureId = !0;
}
function Pm(t, e) {
  e.geometryType = !0;
}
function Xi(t, e) {
  const n = t[0];
  if (t.length !== 1)
    throw new Error(`Expected no arguments for ${n} operation`);
  return [];
}
function Q(t, e) {
  return function(n, i) {
    const s = n[0], r = n.length - 1;
    if (t === e) {
      if (r !== t) {
        const o = t === 1 ? "" : "s";
        throw new Error(
          `Expected ${t} argument${o} for ${s}, got ${r}`
        );
      }
    } else if (r < t || r > e) {
      const o = e === 1 / 0 ? `${t} or more` : `${t} to ${e}`;
      throw new Error(
        `Expected ${o} arguments for ${s}, got ${r}`
      );
    }
  };
}
function ae(t) {
  return function(e, n) {
    const i = e[0], s = e.length - 1, r = new Array(s);
    for (let o = 0; o < s; ++o) {
      const a = de(e[o + 1], n);
      if (!Mt(t, a.type)) {
        const l = ze(t), u = ze(a.type);
        throw new Error(
          `Unexpected type for argument ${o} of ${i} operation, got ${l} but expected ${u}`
        );
      }
      a.type &= t, r[o] = a;
    }
    return r;
  };
}
function an(t, e, n) {
  const i = t[0], s = t.length - 1;
  let r = Fe;
  for (let a = 0; a < n.length; ++a)
    r &= n[a].type;
  if (r === Li)
    throw new Error(
      `No common type could be found for arguments of ${i} operation`
    );
  const o = new Array(s);
  for (let a = 0; a < s; ++a)
    o[a] = de(t[a + 1], e, r);
  return o;
}
function Mm(t, e) {
  const n = t[0], i = t.length - 1;
  if (i % 2 === 0)
    throw new Error(
      `An odd amount of arguments was expected for operation ${n}, got ${JSON.stringify(
        i
      )} instead`
    );
}
function iu(t, e) {
  const n = t[0], i = t.length - 1;
  if (i % 2 === 1)
    throw new Error(
      `An even amount of arguments was expected for operation ${n}, got ${JSON.stringify(
        i
      )} instead`
    );
}
function km(t, e, n, i) {
  const s = t.length - 1;
  let o = de(t[1], e).type;
  const a = de(t[t.length - 1], e);
  let l = i !== void 0 ? i & a.type : a.type;
  const u = new Array(s - 2);
  for (let h = 0; h < s - 2; h += 2) {
    const d = de(t[h + 2], e), f = de(t[h + 3], e);
    o &= d.type, l &= f.type, u[h] = d, u[h + 1] = f;
  }
  const c = tt | $ | Se;
  if (!Mt(c, o))
    throw new Error(
      `Expected an input of type ${ze(
        c
      )} for the interpolate operation, got ${ze(o)} instead`
    );
  if (Pr(l, Li))
    throw new Error(
      "Could not find a common output type for the following match operation: " + JSON.stringify(t)
    );
  for (let h = 0; h < s - 2; h += 2) {
    const d = de(t[h + 2], e, o), f = de(t[h + 3], e, l);
    u[h] = d, u[h + 1] = f;
  }
  return [
    de(t[1], e, o),
    ...u,
    de(t[t.length - 1], e, l)
  ];
}
function Om(t, e, n, i) {
  const s = t[1];
  let r;
  switch (s[0]) {
    case "linear":
      r = 1;
      break;
    case "exponential":
      if (r = s[1], typeof r != "number")
        throw new Error(
          `Expected a number base for exponential interpolation, got ${JSON.stringify(r)} instead`
        );
      break;
    default:
      r = null;
  }
  if (!r)
    throw new Error(
      `Invalid interpolation type: ${JSON.stringify(s)}`
    );
  r = de(r, e);
  let o = de(t[2], e);
  if (!Mt($, o.type))
    throw new Error(
      `Expected an input of type number for the interpolate operation, got ${ze(o.type)} instead`
    );
  o = de(t[2], e, $);
  const a = new Array(t.length - 3);
  for (let l = 0; l < a.length; l += 2) {
    let u = de(t[l + 3], e);
    if (!Mt($, u.type))
      throw new Error(
        `Expected all stop input values in the interpolate operation to be of type number, got ${ze(u.type)} at position ${l + 2} instead`
      );
    let c = de(t[l + 4], e);
    if (!Mt($ | Me, c.type))
      throw new Error(
        `Expected all stop output values in the interpolate operation to be a number or color, got ${ze(c.type)} at position ${l + 3} instead`
      );
    u = de(t[l + 3], e, $), c = de(t[l + 4], e, $ | Me), a[l] = u, a[l + 1] = c;
  }
  return [r, o, ...a];
}
function Dm(t, e, n, i) {
  const s = de(t[t.length - 1], e);
  let r = i !== void 0 ? i & s.type : s.type;
  const o = new Array(t.length - 1);
  for (let a = 0; a < o.length - 1; a += 2) {
    const l = de(t[a + 1], e), u = de(t[a + 2], e);
    if (!Mt(Se, l.type))
      throw new Error(
        `Expected all conditions in the case operation to be of type boolean, got ${ze(l.type)} at position ${a} instead`
      );
    r &= u.type, o[a] = l, o[a + 1] = u;
  }
  if (Pr(r, Li))
    throw new Error(
      "Could not find a common output type for the following case operation: " + JSON.stringify(t)
    );
  for (let a = 0; a < o.length - 1; a += 2)
    o[a + 1] = de(t[a + 2], e, r);
  return o[o.length - 1] = de(
    t[t.length - 1],
    e,
    r
  ), o;
}
function Fm(t, e) {
  let n = (
    /** @type {any} */
    t[2]
  );
  if (!Array.isArray(n))
    throw new Error(
      'The "in" operator was provided a literal value which was not an array as second argument.'
    );
  if (typeof n[0] == "string") {
    if (n[0] !== "literal")
      throw new Error(
        'For the "in" operator, a string array should be wrapped in a "literal" operator to disambiguate from expressions.'
      );
    if (!Array.isArray(n[1]))
      throw new Error(
        'The "in" operator was provided a literal value which was not an array as second argument.'
      );
    n = n[1];
  }
  let i = tt | $;
  const s = new Array(n.length);
  for (let o = 0; o < s.length; o++) {
    const a = de(n[o], e);
    i &= a.type, s[o] = a;
  }
  if (Pr(i, Li))
    throw new Error(
      "Could not find a common type for the following in operation: " + JSON.stringify(t)
    );
  return [de(t[1], e, i), ...s];
}
function Nm(t, e) {
  const n = de(t[1], e, $);
  if (n.type !== $)
    throw new Error(
      `The first argument of palette must be an number, got ${ze(
        n.type
      )} instead`
    );
  const i = t[2];
  if (!Array.isArray(i))
    throw new Error("The second argument of palette must be an array");
  const s = new Array(i.length);
  for (let r = 0; r < s.length; r++) {
    const o = de(i[r], e, Me);
    if (!(o instanceof mn))
      throw new Error(
        `The palette color at index ${r} must be a literal value`
      );
    if (!Mt(o.type, Me))
      throw new Error(
        `The palette color at index ${r} should be of type color, got ${ze(
          o.type
        )} instead`
      );
    s[r] = o;
  }
  return [n, ...s];
}
function K(t, ...e) {
  return function(n, i, s) {
    const r = n[0];
    let o = [];
    for (let l = 0; l < e.length; l++)
      o = e[l](n, i, o, s) || o;
    let a = typeof t == "function" ? t(o) : t;
    if (s !== void 0) {
      if (!Mt(a, s))
        throw new Error(
          `The following expression was expected to return ${ze(
            s
          )}, but returns ${ze(a)} instead: ${JSON.stringify(
            n
          )}`
        );
      a &= s;
    }
    if (a === Li)
      throw new Error(
        `No matching type was found for the following expression: ${JSON.stringify(
          n
        )}`
      );
    return new bm(a, r, ...o);
  };
}
function Vm(t, e, n) {
  const i = t[0], s = Tm[i];
  if (!s)
    throw new Error(`Unknown operator: ${i}`);
  return s(t, e, n);
}
function ih(t) {
  if (!t)
    return "";
  const e = t.getType();
  switch (e) {
    case "Point":
    case "LineString":
    case "Polygon":
      return e;
    case "MultiPoint":
    case "MultiLineString":
    case "MultiPolygon":
      return (
        /** @type {'Point'|'LineString'|'Polygon'} */
        e.substring(5)
      );
    case "Circle":
      return "Polygon";
    case "GeometryCollection":
      return ih(
        /** @type {import("../geom/GeometryCollection.js").default} */
        t.getGeometries()[0]
      );
    default:
      return "";
  }
}
function sh() {
  return {
    variables: {},
    properties: {},
    resolution: NaN,
    featureId: null,
    geometryType: ""
  };
}
function rn(t, e, n) {
  const i = de(t, n);
  if (!Mt(e, i.type)) {
    const s = ze(e), r = ze(i.type);
    throw new Error(
      `Expected expression to be of type ${s}, got ${r}`
    );
  }
  return Et(i);
}
function Et(t, e) {
  if (t instanceof mn) {
    if (t.type === Me && typeof t.value == "string") {
      const i = Sa(t.value);
      return function() {
        return i;
      };
    }
    return function() {
      return t.value;
    };
  }
  const n = t.operator;
  switch (n) {
    case R.Number:
    case R.String:
    case R.Coalesce:
      return Gm(t);
    case R.Get:
    case R.Var:
      return zm(t);
    case R.Id:
      return (i) => i.featureId;
    case R.GeometryType:
      return (i) => i.geometryType;
    case R.Concat: {
      const i = t.args.map((s) => Et(s));
      return (s) => "".concat(...i.map((r) => r(s).toString()));
    }
    case R.Resolution:
      return (i) => i.resolution;
    case R.Any:
    case R.All:
    case R.Between:
    case R.In:
    case R.Not:
      return $m(t);
    case R.Equal:
    case R.NotEqual:
    case R.LessThan:
    case R.LessThanOrEqualTo:
    case R.GreaterThan:
    case R.GreaterThanOrEqualTo:
      return Bm(t);
    case R.Multiply:
    case R.Divide:
    case R.Add:
    case R.Subtract:
    case R.Clamp:
    case R.Mod:
    case R.Pow:
    case R.Abs:
    case R.Floor:
    case R.Ceil:
    case R.Round:
    case R.Sin:
    case R.Cos:
    case R.Atan:
    case R.Sqrt:
      return Wm(t);
    case R.Case:
      return Xm(t);
    case R.Match:
      return Ym(t);
    case R.Interpolate:
      return jm(t);
    case R.ToString:
      return Um(t);
    default:
      throw new Error(`Unsupported operator ${n}`);
  }
}
function Gm(t, e) {
  const n = t.operator, i = t.args.length, s = new Array(i);
  for (let r = 0; r < i; ++r)
    s[r] = Et(t.args[r]);
  switch (n) {
    case R.Coalesce:
      return (r) => {
        for (let o = 0; o < i; ++o) {
          const a = s[o](r);
          if (typeof a < "u" && a !== null)
            return a;
        }
        throw new Error("Expected one of the values to be non-null");
      };
    case R.Number:
    case R.String:
      return (r) => {
        for (let o = 0; o < i; ++o) {
          const a = s[o](r);
          if (typeof a === n)
            return a;
        }
        throw new Error(`Expected one of the values to be a ${n}`);
      };
    default:
      throw new Error(`Unsupported assertion operator ${n}`);
  }
}
function zm(t, e) {
  const i = (
    /** @type {string} */
    /** @type {LiteralExpression} */
    t.args[0].value
  );
  switch (t.operator) {
    case R.Get:
      return (s) => s.properties[i];
    case R.Var:
      return (s) => s.variables[i];
    default:
      throw new Error(`Unsupported accessor operator ${t.operator}`);
  }
}
function Bm(t, e) {
  const n = t.operator, i = Et(t.args[0]), s = Et(t.args[1]);
  switch (n) {
    case R.Equal:
      return (r) => i(r) === s(r);
    case R.NotEqual:
      return (r) => i(r) !== s(r);
    case R.LessThan:
      return (r) => i(r) < s(r);
    case R.LessThanOrEqualTo:
      return (r) => i(r) <= s(r);
    case R.GreaterThan:
      return (r) => i(r) > s(r);
    case R.GreaterThanOrEqualTo:
      return (r) => i(r) >= s(r);
    default:
      throw new Error(`Unsupported comparison operator ${n}`);
  }
}
function $m(t, e) {
  const n = t.operator, i = t.args.length, s = new Array(i);
  for (let r = 0; r < i; ++r)
    s[r] = Et(t.args[r]);
  switch (n) {
    case R.Any:
      return (r) => {
        for (let o = 0; o < i; ++o)
          if (s[o](r))
            return !0;
        return !1;
      };
    case R.All:
      return (r) => {
        for (let o = 0; o < i; ++o)
          if (!s[o](r))
            return !1;
        return !0;
      };
    case R.Between:
      return (r) => {
        const o = s[0](r), a = s[1](r), l = s[2](r);
        return o >= a && o <= l;
      };
    case R.In:
      return (r) => {
        const o = s[0](r);
        for (let a = 1; a < i; ++a)
          if (o === s[a](r))
            return !0;
        return !1;
      };
    case R.Not:
      return (r) => !s[0](r);
    default:
      throw new Error(`Unsupported logical operator ${n}`);
  }
}
function Wm(t, e) {
  const n = t.operator, i = t.args.length, s = new Array(i);
  for (let r = 0; r < i; ++r)
    s[r] = Et(t.args[r]);
  switch (n) {
    case R.Multiply:
      return (r) => {
        let o = 1;
        for (let a = 0; a < i; ++a)
          o *= s[a](r);
        return o;
      };
    case R.Divide:
      return (r) => s[0](r) / s[1](r);
    case R.Add:
      return (r) => {
        let o = 0;
        for (let a = 0; a < i; ++a)
          o += s[a](r);
        return o;
      };
    case R.Subtract:
      return (r) => s[0](r) - s[1](r);
    case R.Clamp:
      return (r) => {
        const o = s[0](r), a = s[1](r);
        if (o < a)
          return a;
        const l = s[2](r);
        return o > l ? l : o;
      };
    case R.Mod:
      return (r) => s[0](r) % s[1](r);
    case R.Pow:
      return (r) => Math.pow(s[0](r), s[1](r));
    case R.Abs:
      return (r) => Math.abs(s[0](r));
    case R.Floor:
      return (r) => Math.floor(s[0](r));
    case R.Ceil:
      return (r) => Math.ceil(s[0](r));
    case R.Round:
      return (r) => Math.round(s[0](r));
    case R.Sin:
      return (r) => Math.sin(s[0](r));
    case R.Cos:
      return (r) => Math.cos(s[0](r));
    case R.Atan:
      return i === 2 ? (r) => Math.atan2(s[0](r), s[1](r)) : (r) => Math.atan(s[0](r));
    case R.Sqrt:
      return (r) => Math.sqrt(s[0](r));
    default:
      throw new Error(`Unsupported numeric operator ${n}`);
  }
}
function Xm(t, e) {
  const n = t.args.length, i = new Array(n);
  for (let s = 0; s < n; ++s)
    i[s] = Et(t.args[s]);
  return (s) => {
    for (let r = 0; r < n - 1; r += 2)
      if (i[r](s))
        return i[r + 1](s);
    return i[n - 1](s);
  };
}
function Ym(t, e) {
  const n = t.args.length, i = new Array(n);
  for (let s = 0; s < n; ++s)
    i[s] = Et(t.args[s]);
  return (s) => {
    const r = i[0](s);
    for (let o = 1; o < n; o += 2)
      if (r === i[o](s))
        return i[o + 1](s);
    return i[n - 1](s);
  };
}
function jm(t, e) {
  const n = t.args.length, i = new Array(n);
  for (let s = 0; s < n; ++s)
    i[s] = Et(t.args[s]);
  return (s) => {
    const r = i[0](s), o = i[1](s);
    let a, l;
    for (let u = 2; u < n; u += 2) {
      const c = i[u](s);
      let h = i[u + 1](s);
      const d = Array.isArray(h);
      if (d && (h = Qg(h)), c >= o)
        return u === 2 ? h : d ? Zm(
          r,
          o,
          a,
          l,
          c,
          h
        ) : Zi(
          r,
          o,
          a,
          l,
          c,
          h
        );
      a = c, l = h;
    }
    return l;
  };
}
function Um(t, e) {
  const n = t.operator, i = t.args.length, s = new Array(i);
  for (let r = 0; r < i; ++r)
    s[r] = Et(t.args[r]);
  switch (n) {
    case R.ToString:
      return (r) => {
        const o = s[0](r);
        return t.args[0].type === Me ? ba(o) : o.toString();
      };
    default:
      throw new Error(`Unsupported convert operator ${n}`);
  }
}
function Zi(t, e, n, i, s, r) {
  const o = s - n;
  if (o === 0)
    return i;
  const a = e - n, l = t === 1 ? a / o : (Math.pow(t, a) - 1) / (Math.pow(t, o) - 1);
  return i + l * (r - i);
}
function Zm(t, e, n, i, s, r) {
  if (s - n === 0)
    return i;
  const a = Hl(i), l = Hl(r);
  let u = l[2] - a[2];
  u > 180 ? u -= 360 : u < -180 && (u += 360);
  const c = [
    Zi(t, e, n, a[0], s, l[0]),
    Zi(t, e, n, a[1], s, l[1]),
    a[2] + Zi(t, e, n, 0, s, u),
    Zi(t, e, n, i[3], s, r[3])
  ];
  return Wc(em(c));
}
function Km(t) {
  return !0;
}
function Hm(t) {
  const e = nh(), n = qm(t, e), i = sh();
  return function(s, r) {
    if (i.properties = s.getPropertiesInternal(), i.resolution = r, e.featureId) {
      const o = s.getId();
      o !== void 0 ? i.featureId = o : i.featureId = null;
    }
    return e.geometryType && (i.geometryType = ih(
      s.getGeometry()
    )), n(i);
  };
}
function su(t) {
  const e = nh(), n = t.length, i = new Array(n);
  for (let o = 0; o < n; ++o)
    i[o] = Vo(t[o], e);
  const s = sh(), r = new Array(n);
  return function(o, a) {
    if (s.properties = o.getPropertiesInternal(), s.resolution = a, e.featureId) {
      const u = o.getId();
      u !== void 0 ? s.featureId = u : s.featureId = null;
    }
    let l = 0;
    for (let u = 0; u < n; ++u) {
      const c = i[u](s);
      c && (r[l] = c, l += 1);
    }
    return r.length = l, r;
  };
}
function qm(t, e) {
  const n = t.length, i = new Array(n);
  for (let s = 0; s < n; ++s) {
    const r = t[s], o = "filter" in r ? rn(r.filter, Se, e) : Km;
    let a;
    if (Array.isArray(r.style)) {
      const l = r.style.length;
      a = new Array(l);
      for (let u = 0; u < l; ++u)
        a[u] = Vo(r.style[u], e);
    } else
      a = [Vo(r.style, e)];
    i[s] = { filter: o, styles: a };
  }
  return function(s) {
    const r = [];
    let o = !1;
    for (let a = 0; a < n; ++a) {
      const l = i[a].filter;
      if (l(s) && !(t[a].else && o)) {
        o = !0;
        for (const u of i[a].styles) {
          const c = u(s);
          c && r.push(c);
        }
      }
    }
    return r;
  };
}
function Vo(t, e) {
  const n = hs(t, "", e), i = ds(t, "", e), s = Jm(t, e), r = Qm(t, e), o = Je(t, "z-index", e);
  if (!n && !i && !s && !r && !xi(t))
    throw new Error(
      "No fill, stroke, point, or text symbolizer properties in style: " + JSON.stringify(t)
    );
  const a = new Ji();
  return function(l) {
    let u = !0;
    if (n) {
      const c = n(l);
      c && (u = !1), a.setFill(c);
    }
    if (i) {
      const c = i(l);
      c && (u = !1), a.setStroke(c);
    }
    if (s) {
      const c = s(l);
      c && (u = !1), a.setText(c);
    }
    if (r) {
      const c = r(l);
      c && (u = !1), a.setImage(c);
    }
    return o && a.setZIndex(o(l)), u ? null : a;
  };
}
function hs(t, e, n) {
  let i;
  if (e + "fill-pattern-src" in t ? i = i_(t, e + "fill-", n) : i = Fa(
    t,
    e + "fill-color",
    n
  ), !i)
    return null;
  const s = new Pa();
  return function(r) {
    const o = i(r);
    return o === "none" ? null : (s.setColor(o), s);
  };
}
function ds(t, e, n) {
  const i = Je(
    t,
    e + "stroke-width",
    n
  ), s = Fa(
    t,
    e + "stroke-color",
    n
  );
  if (!i && !s)
    return null;
  const r = Kt(
    t,
    e + "stroke-line-cap",
    n
  ), o = Kt(
    t,
    e + "stroke-line-join",
    n
  ), a = rh(
    t,
    e + "stroke-line-dash",
    n
  ), l = Je(
    t,
    e + "stroke-line-dash-offset",
    n
  ), u = Je(
    t,
    e + "stroke-miter-limit",
    n
  ), c = new eh();
  return function(h) {
    if (s) {
      const d = s(h);
      if (d === "none")
        return null;
      c.setColor(d);
    }
    if (i && c.setWidth(i(h)), r) {
      const d = r(h);
      if (d !== "butt" && d !== "round" && d !== "square")
        throw new Error("Expected butt, round, or square line cap");
      c.setLineCap(d);
    }
    if (o) {
      const d = o(h);
      if (d !== "bevel" && d !== "round" && d !== "miter")
        throw new Error("Expected bevel, round, or miter line join");
      c.setLineJoin(d);
    }
    return a && c.setLineDash(a(h)), l && c.setLineDashOffset(l(h)), u && c.setMiterLimit(u(h)), c;
  };
}
function Jm(t, e) {
  const n = "text-", i = Kt(t, n + "value", e);
  if (!i)
    return null;
  const s = hs(t, n, e), r = hs(
    t,
    n + "background-",
    e
  ), o = ds(t, n, e), a = ds(
    t,
    n + "background-",
    e
  ), l = Kt(t, n + "font", e), u = Je(
    t,
    n + "max-angle",
    e
  ), c = Je(
    t,
    n + "offset-x",
    e
  ), h = Je(
    t,
    n + "offset-y",
    e
  ), d = fs(
    t,
    n + "overflow",
    e
  ), f = Kt(
    t,
    n + "placement",
    e
  ), g = Je(t, n + "repeat", e), m = Mr(t, n + "scale", e), _ = fs(
    t,
    n + "rotate-with-view",
    e
  ), p = Je(
    t,
    n + "rotation",
    e
  ), y = Kt(t, n + "align", e), C = Kt(
    t,
    n + "justify",
    e
  ), x = Kt(
    t,
    n + "baseline",
    e
  ), E = rh(
    t,
    n + "padding",
    e
  ), S = kr(
    t,
    n + "declutter-mode"
  ), T = new Em({ declutterMode: S });
  return function(I) {
    if (T.setText(i(I)), s && T.setFill(s(I)), r && T.setBackgroundFill(r(I)), o && T.setStroke(o(I)), a && T.setBackgroundStroke(a(I)), l && T.setFont(l(I)), u && T.setMaxAngle(u(I)), c && T.setOffsetX(c(I)), h && T.setOffsetY(h(I)), d && T.setOverflow(d(I)), f) {
      const b = f(I);
      if (b !== "point" && b !== "line")
        throw new Error("Expected point or line for text-placement");
      T.setPlacement(b);
    }
    if (g && T.setRepeat(g(I)), m && T.setScale(m(I)), _ && T.setRotateWithView(_(I)), p && T.setRotation(p(I)), y) {
      const b = y(I);
      if (b !== "left" && b !== "center" && b !== "right" && b !== "end" && b !== "start")
        throw new Error(
          "Expected left, right, center, start, or end for text-align"
        );
      T.setTextAlign(b);
    }
    if (C) {
      const b = C(I);
      if (b !== "left" && b !== "right" && b !== "center")
        throw new Error("Expected left, right, or center for text-justify");
      T.setJustify(b);
    }
    if (x) {
      const b = x(I);
      if (b !== "bottom" && b !== "top" && b !== "middle" && b !== "alphabetic" && b !== "hanging")
        throw new Error(
          "Expected bottom, top, middle, alphabetic, or hanging for text-baseline"
        );
      T.setTextBaseline(b);
    }
    return E && T.setPadding(E(I)), T;
  };
}
function Qm(t, e) {
  return "icon-src" in t ? e_(t, e) : "shape-points" in t ? t_(t, e) : "circle-radius" in t ? n_(t, e) : null;
}
function e_(t, e) {
  const n = "icon-", i = n + "src", s = oh(t[i], i), r = lr(
    t,
    n + "anchor",
    e
  ), o = Mr(t, n + "scale", e), a = Je(
    t,
    n + "opacity",
    e
  ), l = lr(
    t,
    n + "displacement",
    e
  ), u = Je(
    t,
    n + "rotation",
    e
  ), c = fs(
    t,
    n + "rotate-with-view",
    e
  ), h = ou(t, n + "anchor-origin"), d = au(
    t,
    n + "anchor-x-units"
  ), f = au(
    t,
    n + "anchor-y-units"
  ), g = a_(t, n + "color"), m = r_(t, n + "cross-origin"), _ = o_(t, n + "offset"), p = ou(t, n + "offset-origin"), y = ur(t, n + "width"), C = ur(t, n + "height"), x = s_(t, n + "size"), E = kr(
    t,
    n + "declutter-mode"
  ), S = new Oa({
    src: s,
    anchorOrigin: h,
    anchorXUnits: d,
    anchorYUnits: f,
    color: g,
    crossOrigin: m,
    offset: _,
    offsetOrigin: p,
    height: C,
    width: y,
    size: x,
    declutterMode: E
  });
  return function(T) {
    return a && S.setOpacity(a(T)), l && S.setDisplacement(l(T)), u && S.setRotation(u(T)), c && S.setRotateWithView(c(T)), o && S.setScale(o(T)), r && S.setAnchor(r(T)), S;
  };
}
function t_(t, e) {
  const n = "shape-", i = n + "points", s = n + "radius", r = Go(t[i], i), o = Go(t[s], s), a = hs(t, n, e), l = ds(t, n, e), u = Mr(t, n + "scale", e), c = lr(
    t,
    n + "displacement",
    e
  ), h = Je(
    t,
    n + "rotation",
    e
  ), d = fs(
    t,
    n + "rotate-with-view",
    e
  ), f = ur(t, n + "radius2"), g = ur(t, n + "angle"), m = kr(
    t,
    n + "declutter-mode"
  ), _ = new Jc({
    points: r,
    radius: o,
    radius2: f,
    angle: g,
    declutterMode: m
  });
  return function(p) {
    return a && _.setFill(a(p)), l && _.setStroke(l(p)), c && _.setDisplacement(c(p)), h && _.setRotation(h(p)), d && _.setRotateWithView(d(p)), u && _.setScale(u(p)), _;
  };
}
function n_(t, e) {
  const n = "circle-", i = hs(t, n, e), s = ds(t, n, e), r = Je(t, n + "radius", e), o = Mr(t, n + "scale", e), a = lr(
    t,
    n + "displacement",
    e
  ), l = Je(
    t,
    n + "rotation",
    e
  ), u = fs(
    t,
    n + "rotate-with-view",
    e
  ), c = kr(
    t,
    n + "declutter-mode"
  ), h = new Qc({
    radius: 5,
    // this is arbitrary, but required - the evaluated radius is used below
    declutterMode: c
  });
  return function(d) {
    return r && h.setRadius(r(d)), i && h.setFill(i(d)), s && h.setStroke(s(d)), a && h.setDisplacement(a(d)), l && h.setRotation(l(d)), u && h.setRotateWithView(u(d)), o && h.setScale(o(d)), h;
  };
}
function Je(t, e, n) {
  if (!(e in t))
    return;
  const i = rn(t[e], $, n);
  return function(s) {
    return Go(i(s), e);
  };
}
function Kt(t, e, n) {
  if (!(e in t))
    return null;
  const i = rn(t[e], tt, n);
  return function(s) {
    return oh(i(s), e);
  };
}
function i_(t, e, n) {
  const i = Kt(
    t,
    e + "pattern-src",
    n
  ), s = ru(
    t,
    e + "pattern-offset",
    n
  ), r = ru(
    t,
    e + "pattern-size",
    n
  ), o = Fa(
    t,
    e + "color",
    n
  );
  return function(a) {
    return {
      src: i(a),
      offset: s && s(a),
      size: r && r(a),
      color: o && o(a)
    };
  };
}
function fs(t, e, n) {
  if (!(e in t))
    return null;
  const i = rn(t[e], Se, n);
  return function(s) {
    const r = i(s);
    if (typeof r != "boolean")
      throw new Error(`Expected a boolean for ${e}`);
    return r;
  };
}
function Fa(t, e, n) {
  if (!(e in t))
    return null;
  const i = rn(
    t[e],
    Me | tt,
    n
  );
  return function(s) {
    return ah(i(s), e);
  };
}
function rh(t, e, n) {
  if (!(e in t))
    return null;
  const i = rn(t[e], tn, n);
  return function(s) {
    return Ss(i(s), e);
  };
}
function lr(t, e, n) {
  if (!(e in t))
    return null;
  const i = rn(t[e], tn, n);
  return function(s) {
    const r = Ss(i(s), e);
    if (r.length !== 2)
      throw new Error(`Expected two numbers for ${e}`);
    return r;
  };
}
function ru(t, e, n) {
  if (!(e in t))
    return null;
  const i = rn(t[e], tn, n);
  return function(s) {
    return lh(i(s), e);
  };
}
function Mr(t, e, n) {
  if (!(e in t))
    return null;
  const i = rn(
    t[e],
    tn | $,
    n
  );
  return function(s) {
    return l_(i(s), e);
  };
}
function ur(t, e) {
  const n = t[e];
  if (n !== void 0) {
    if (typeof n != "number")
      throw new Error(`Expected a number for ${e}`);
    return n;
  }
}
function s_(t, e) {
  const n = t[e];
  if (n !== void 0) {
    if (typeof n == "number")
      return st(n);
    if (!Array.isArray(n))
      throw new Error(`Expected a number or size array for ${e}`);
    if (n.length !== 2 || typeof n[0] != "number" || typeof n[1] != "number")
      throw new Error(`Expected a number or size array for ${e}`);
    return n;
  }
}
function r_(t, e) {
  const n = t[e];
  if (n !== void 0) {
    if (typeof n != "string")
      throw new Error(`Expected a string for ${e}`);
    return n;
  }
}
function ou(t, e) {
  const n = t[e];
  if (n !== void 0) {
    if (n !== "bottom-left" && n !== "bottom-right" && n !== "top-left" && n !== "top-right")
      throw new Error(
        `Expected bottom-left, bottom-right, top-left, or top-right for ${e}`
      );
    return n;
  }
}
function au(t, e) {
  const n = t[e];
  if (n !== void 0) {
    if (n !== "pixels" && n !== "fraction")
      throw new Error(`Expected pixels or fraction for ${e}`);
    return n;
  }
}
function o_(t, e) {
  const n = t[e];
  if (n !== void 0)
    return Ss(n, e);
}
function kr(t, e) {
  const n = t[e];
  if (n !== void 0) {
    if (typeof n != "string")
      throw new Error(`Expected a string for ${e}`);
    if (n !== "declutter" && n !== "obstacle" && n !== "none")
      throw new Error(`Expected declutter, obstacle, or none for ${e}`);
    return n;
  }
}
function a_(t, e) {
  const n = t[e];
  if (n !== void 0)
    return ah(n, e);
}
function Ss(t, e) {
  if (!Array.isArray(t))
    throw new Error(`Expected an array for ${e}`);
  const n = t.length;
  for (let i = 0; i < n; ++i)
    if (typeof t[i] != "number")
      throw new Error(`Expected an array of numbers for ${e}`);
  return t;
}
function oh(t, e) {
  if (typeof t != "string")
    throw new Error(`Expected a string for ${e}`);
  return t;
}
function Go(t, e) {
  if (typeof t != "number")
    throw new Error(`Expected a number for ${e}`);
  return t;
}
function ah(t, e) {
  if (typeof t == "string")
    return t;
  const n = Ss(t, e), i = n.length;
  if (i < 3 || i > 4)
    throw new Error(`Expected a color with 3 or 4 values for ${e}`);
  return n;
}
function lh(t, e) {
  const n = Ss(t, e);
  if (n.length !== 2)
    throw new Error(`Expected an array of two numbers for ${e}`);
  return n;
}
function l_(t, e) {
  return typeof t == "number" ? t : lh(t, e);
}
const lu = {
  RENDER_ORDER: "renderOrder"
};
class u_ extends Tr {
  /**
   * @param {Options<VectorSourceType>} [options] Options.
   */
  constructor(e) {
    e = e || {};
    const n = Object.assign({}, e);
    delete n.style, delete n.renderBuffer, delete n.updateWhileAnimating, delete n.updateWhileInteracting, super(n), this.declutter_ = e.declutter ? String(e.declutter) : void 0, this.renderBuffer_ = e.renderBuffer !== void 0 ? e.renderBuffer : 100, this.style_ = null, this.styleFunction_ = void 0, this.setStyle(e.style), this.updateWhileAnimating_ = e.updateWhileAnimating !== void 0 ? e.updateWhileAnimating : !1, this.updateWhileInteracting_ = e.updateWhileInteracting !== void 0 ? e.updateWhileInteracting : !1;
  }
  /**
   * @return {string} Declutter group.
   */
  getDeclutter() {
    return this.declutter_;
  }
  /**
   * Get the topmost feature that intersects the given pixel on the viewport. Returns a promise
   * that resolves with an array of features. The array will either contain the topmost feature
   * when a hit was detected, or it will be empty.
   *
   * The hit detection algorithm used for this method is optimized for performance, but is less
   * accurate than the one used in [map.getFeaturesAtPixel()]{@link import("../Map.js").default#getFeaturesAtPixel}.
   * Text is not considered, and icons are only represented by their bounding box instead of the exact
   * image.
   *
   * @param {import("../pixel.js").Pixel} pixel Pixel.
   * @return {Promise<Array<import("../Feature").FeatureLike>>} Promise that resolves with an array of features.
   * @api
   */
  getFeatures(e) {
    return super.getFeatures(e);
  }
  /**
   * @return {number|undefined} Render buffer.
   */
  getRenderBuffer() {
    return this.renderBuffer_;
  }
  /**
   * @return {function(import("../Feature.js").default, import("../Feature.js").default): number|null|undefined} Render
   *     order.
   */
  getRenderOrder() {
    return (
      /** @type {import("../render.js").OrderFunction|null|undefined} */
      this.get(lu.RENDER_ORDER)
    );
  }
  /**
   * Get the style for features.  This returns whatever was passed to the `style`
   * option at construction or to the `setStyle` method.
   * @return {import("../style/Style.js").StyleLike|null|undefined} Layer style.
   * @api
   */
  getStyle() {
    return this.style_;
  }
  /**
   * Get the style function.
   * @return {import("../style/Style.js").StyleFunction|undefined} Layer style function.
   * @api
   */
  getStyleFunction() {
    return this.styleFunction_;
  }
  /**
   * @return {boolean} Whether the rendered layer should be updated while
   *     animating.
   */
  getUpdateWhileAnimating() {
    return this.updateWhileAnimating_;
  }
  /**
   * @return {boolean} Whether the rendered layer should be updated while
   *     interacting.
   */
  getUpdateWhileInteracting() {
    return this.updateWhileInteracting_;
  }
  /**
   * Render declutter items for this layer
   * @param {import("../Map.js").FrameState} frameState Frame state.
   * @param {import("../layer/Layer.js").State} layerState Layer state.
   */
  renderDeclutter(e, n) {
    const i = this.getDeclutter();
    i in e.declutter || (e.declutter[i] = new zc(9)), this.getRenderer().renderDeclutter(e, n);
  }
  /**
   * @param {import("../render.js").OrderFunction|null|undefined} renderOrder
   *     Render order.
   */
  setRenderOrder(e) {
    this.set(lu.RENDER_ORDER, e);
  }
  /**
   * Set the style for features.  This can be a single style object, an array
   * of styles, or a function that takes a feature and resolution and returns
   * an array of styles. If set to `null`, the layer has no style (a `null` style),
   * so only features that have their own styles will be rendered in the layer. Call
   * `setStyle()` without arguments to reset to the default style. See
   * [the ol/style/Style module]{@link module:ol/style/Style~Style} for information on the default style.
   *
   * If your layer has a static style, you can use [flat style]{@link module:ol/style/flat~FlatStyle} object
   * literals instead of using the `Style` and symbolizer constructors (`Fill`, `Stroke`, etc.):
   * ```js
   * vectorLayer.setStyle({
   *   "fill-color": "yellow",
   *   "stroke-color": "black",
   *   "stroke-width": 4
   * })
   * ```
   *
   * @param {import("../style/Style.js").StyleLike|import("../style/flat.js").FlatStyleLike|null} [style] Layer style.
   * @api
   */
  setStyle(e) {
    this.style_ = c_(e), this.styleFunction_ = e === null ? void 0 : pm(this.style_), this.changed();
  }
}
function c_(t) {
  if (t === void 0)
    return xm;
  if (!t)
    return null;
  if (typeof t == "function" || t instanceof Ji)
    return t;
  if (!Array.isArray(t))
    return su([t]);
  if (t.length === 0)
    return [];
  const e = t.length, n = t[0];
  if (n instanceof Ji) {
    const s = new Array(e);
    for (let r = 0; r < e; ++r) {
      const o = t[r];
      if (!(o instanceof Ji))
        throw new Error("Expected a list of style instances");
      s[r] = o;
    }
    return s;
  }
  if ("style" in n) {
    const s = new Array(e);
    for (let r = 0; r < e; ++r) {
      const o = t[r];
      if (!("style" in o))
        throw new Error("Expected a list of rules with a style property");
      s[r] = o;
    }
    return Hm(s);
  }
  return su(
    /** @type {Array<import("../style/flat.js").FlatStyle>} */
    t
  );
}
const uh = u_;
class h_ extends ta {
  /**
   * @param {import("../Map.js").default} map Map.
   */
  constructor(e) {
    super(), this.map_ = e;
  }
  /**
   * @abstract
   * @param {import("../render/EventType.js").default} type Event type.
   * @param {import("../Map.js").FrameState} frameState Frame state.
   */
  dispatchRenderEvent(e, n) {
    ce();
  }
  /**
   * @param {import("../Map.js").FrameState} frameState FrameState.
   * @protected
   */
  calculateMatrices2D(e) {
    const n = e.viewState, i = e.coordinateToPixelTransform, s = e.pixelToCoordinateTransform;
    Ot(
      i,
      e.size[0] / 2,
      e.size[1] / 2,
      1 / n.resolution,
      -1 / n.resolution,
      -n.rotation,
      -n.center[0],
      -n.center[1]
    ), ma(s, i);
  }
  /**
   * @param {import("../coordinate.js").Coordinate} coordinate Coordinate.
   * @param {import("../Map.js").FrameState} frameState FrameState.
   * @param {number} hitTolerance Hit tolerance in pixels.
   * @param {boolean} checkWrapped Check for wrapped geometries.
   * @param {import("./vector.js").FeatureCallback<T>} callback Feature callback.
   * @param {S} thisArg Value to use as `this` when executing `callback`.
   * @param {function(this: U, import("../layer/Layer.js").default): boolean} layerFilter Layer filter
   *     function, only layers which are visible and for which this function
   *     returns `true` will be tested for features.  By default, all visible
   *     layers will be tested.
   * @param {U} thisArg2 Value to use as `this` when executing `layerFilter`.
   * @return {T|undefined} Callback result.
   * @template S,T,U
   */
  forEachFeatureAtCoordinate(e, n, i, s, r, o, a, l) {
    let u;
    const c = n.viewState;
    function h(x, E, S, T) {
      return r.call(o, E, x ? S : null, T);
    }
    const d = c.projection, f = Cc(e.slice(), d), g = [[0, 0]];
    if (d.canWrapX() && s) {
      const x = d.getExtent(), E = _e(x);
      g.push([-E, 0], [E, 0]);
    }
    const m = n.layerStatesArray, _ = m.length, p = (
      /** @type {Array<HitMatch<T>>} */
      []
    ), y = [];
    for (let x = 0; x < g.length; x++)
      for (let E = _ - 1; E >= 0; --E) {
        const S = m[E], T = S.layer;
        if (T.hasRenderer() && Ca(S, c) && a.call(l, T)) {
          const I = T.getRenderer(), b = T.getSource();
          if (I && b) {
            const D = b.getWrapX() ? f : e, P = h.bind(
              null,
              S.managed
            );
            y[0] = D[0] + g[x][0], y[1] = D[1] + g[x][1], u = I.forEachFeatureAtCoordinate(
              y,
              n,
              i,
              P,
              p
            );
          }
          if (u)
            return u;
        }
      }
    if (p.length === 0)
      return;
    const C = 1 / p.length;
    return p.forEach((x, E) => x.distanceSq += E * C), p.sort((x, E) => x.distanceSq - E.distanceSq), p.some((x) => u = x.callback(x.feature, x.layer, x.geometry)), u;
  }
  /**
   * @param {import("../coordinate.js").Coordinate} coordinate Coordinate.
   * @param {import("../Map.js").FrameState} frameState FrameState.
   * @param {number} hitTolerance Hit tolerance in pixels.
   * @param {boolean} checkWrapped Check for wrapped geometries.
   * @param {function(this: U, import("../layer/Layer.js").default): boolean} layerFilter Layer filter
   *     function, only layers which are visible and for which this function
   *     returns `true` will be tested for features.  By default, all visible
   *     layers will be tested.
   * @param {U} thisArg Value to use as `this` when executing `layerFilter`.
   * @return {boolean} Is there a feature at the given coordinate?
   * @template U
   */
  hasFeatureAtCoordinate(e, n, i, s, r, o) {
    return this.forEachFeatureAtCoordinate(
      e,
      n,
      i,
      s,
      ts,
      this,
      r,
      o
    ) !== void 0;
  }
  /**
   * @return {import("../Map.js").default} Map.
   */
  getMap() {
    return this.map_;
  }
  /**
   * Render.
   * @abstract
   * @param {?import("../Map.js").FrameState} frameState Frame state.
   */
  renderFrame(e) {
    ce();
  }
  /**
   * @param {import("../Map.js").FrameState} frameState Frame state.
   * @protected
   */
  scheduleExpireIconCache(e) {
    At.canExpireCache() && e.postRenderFunctions.push(d_);
  }
}
function d_(t, e) {
  At.expire();
}
const f_ = h_;
class g_ extends sn {
  /**
   * @param {import("./EventType.js").default} type Type.
   * @param {import("../transform.js").Transform} [inversePixelTransform] Transform for
   *     CSS pixels to rendered pixels.
   * @param {import("../Map.js").FrameState} [frameState] Frame state.
   * @param {?(CanvasRenderingContext2D|WebGLRenderingContext)} [context] Context.
   */
  constructor(e, n, i, s) {
    super(e), this.inversePixelTransform = n, this.frameState = i, this.context = s;
  }
}
const ch = g_;
class m_ extends f_ {
  /**
   * @param {import("../Map.js").default} map Map.
   */
  constructor(e) {
    super(e), this.fontChangeListenerKey_ = he(
      Ut,
      yi.PROPERTYCHANGE,
      e.redrawText.bind(e)
    ), this.element_ = document.createElement("div");
    const n = this.element_.style;
    n.position = "absolute", n.width = "100%", n.height = "100%", n.zIndex = "0", this.element_.className = Lr + " ol-layers";
    const i = e.getViewport();
    i.insertBefore(this.element_, i.firstChild || null), this.children_ = [], this.renderedVisible_ = !0;
  }
  /**
   * @param {import("../render/EventType.js").default} type Event type.
   * @param {import("../Map.js").FrameState} frameState Frame state.
   */
  dispatchRenderEvent(e, n) {
    const i = this.getMap();
    if (i.hasListener(e)) {
      const s = new ch(e, void 0, n);
      i.dispatchEvent(s);
    }
  }
  disposeInternal() {
    Ce(this.fontChangeListenerKey_), this.element_.parentNode.removeChild(this.element_), super.disposeInternal();
  }
  /**
   * Render.
   * @param {?import("../Map.js").FrameState} frameState Frame state.
   */
  renderFrame(e) {
    if (!e) {
      this.renderedVisible_ && (this.element_.style.display = "none", this.renderedVisible_ = !1);
      return;
    }
    this.calculateMatrices2D(e), this.dispatchRenderEvent(dt.PRECOMPOSE, e);
    const n = e.layerStatesArray.sort(function(a, l) {
      return a.zIndex - l.zIndex;
    });
    n.some(
      (a) => a.layer instanceof uh && a.layer.getDeclutter()
    ) && (e.declutter = {});
    const s = e.viewState;
    this.children_.length = 0;
    const r = [];
    let o = null;
    for (let a = 0, l = n.length; a < l; ++a) {
      const u = n[a];
      e.layerIndex = a;
      const c = u.layer, h = c.getSourceState();
      if (!Ca(u, s) || h != "ready" && h != "undefined") {
        c.unrender();
        continue;
      }
      const d = c.render(e, o);
      d && (d !== o && (this.children_.push(d), o = d), r.push(u));
    }
    this.declutter(e, r), om(this.element_, this.children_), this.dispatchRenderEvent(dt.POSTCOMPOSE, e), this.renderedVisible_ || (this.element_.style.display = "", this.renderedVisible_ = !0), this.scheduleExpireIconCache(e);
  }
  /**
   * @param {import("../Map.js").FrameState} frameState Frame state.
   * @param {Array<import('../layer/Layer.js').State>} layerStates Layers.
   */
  declutter(e, n) {
    for (let i = n.length - 1; i >= 0; --i) {
      const s = n[i], r = s.layer;
      r.getDeclutter() && r.renderDeclutter(e, s);
    }
    n.forEach(
      (i) => i.layer.renderDeferred(e)
    );
  }
}
const __ = m_;
class gn extends sn {
  /**
   * @param {EventType} type The event type.
   * @param {BaseLayer} layer The layer.
   */
  constructor(e, n) {
    super(e), this.layer = n;
  }
}
const mo = {
  LAYERS: "layers"
};
class Na extends dc {
  /**
   * @param {Options} [options] Layer options.
   */
  constructor(e) {
    e = e || {};
    const n = (
      /** @type {Options} */
      Object.assign({}, e)
    );
    delete n.layers;
    let i = e.layers;
    super(n), this.on, this.once, this.un, this.layersListenerKeys_ = [], this.listenerKeys_ = {}, this.addChangeListener(mo.LAYERS, this.handleLayersChanged_), i ? Array.isArray(i) ? i = new Lt(i.slice(), { unique: !0 }) : ue(
      typeof /** @type {?} */
      i.getArray == "function",
      "Expected `layers` to be an array or a `Collection`"
    ) : i = new Lt(void 0, { unique: !0 }), this.setLayers(i);
  }
  /**
   * @private
   */
  handleLayerChange_() {
    this.changed();
  }
  /**
   * @private
   */
  handleLayersChanged_() {
    this.layersListenerKeys_.forEach(Ce), this.layersListenerKeys_.length = 0;
    const e = this.getLayers();
    this.layersListenerKeys_.push(
      he(e, Ke.ADD, this.handleLayersAdd_, this),
      he(
        e,
        Ke.REMOVE,
        this.handleLayersRemove_,
        this
      )
    );
    for (const i in this.listenerKeys_)
      this.listenerKeys_[i].forEach(Ce);
    Es(this.listenerKeys_);
    const n = e.getArray();
    for (let i = 0, s = n.length; i < s; i++) {
      const r = n[i];
      this.registerLayerListeners_(r), this.dispatchEvent(new gn("addlayer", r));
    }
    this.changed();
  }
  /**
   * @param {BaseLayer} layer The layer.
   */
  registerLayerListeners_(e) {
    const n = [
      he(
        e,
        yi.PROPERTYCHANGE,
        this.handleLayerChange_,
        this
      ),
      he(e, H.CHANGE, this.handleLayerChange_, this)
    ];
    e instanceof Na && n.push(
      he(e, "addlayer", this.handleLayerGroupAdd_, this),
      he(e, "removelayer", this.handleLayerGroupRemove_, this)
    ), this.listenerKeys_[fe(e)] = n;
  }
  /**
   * @param {GroupEvent} event The layer group event.
   */
  handleLayerGroupAdd_(e) {
    this.dispatchEvent(new gn("addlayer", e.layer));
  }
  /**
   * @param {GroupEvent} event The layer group event.
   */
  handleLayerGroupRemove_(e) {
    this.dispatchEvent(new gn("removelayer", e.layer));
  }
  /**
   * @param {import("../Collection.js").CollectionEvent<import("./Base.js").default>} collectionEvent CollectionEvent.
   * @private
   */
  handleLayersAdd_(e) {
    const n = e.element;
    this.registerLayerListeners_(n), this.dispatchEvent(new gn("addlayer", n)), this.changed();
  }
  /**
   * @param {import("../Collection.js").CollectionEvent<import("./Base.js").default>} collectionEvent CollectionEvent.
   * @private
   */
  handleLayersRemove_(e) {
    const n = e.element, i = fe(n);
    this.listenerKeys_[i].forEach(Ce), delete this.listenerKeys_[i], this.dispatchEvent(new gn("removelayer", n)), this.changed();
  }
  /**
   * Returns the {@link module:ol/Collection~Collection collection} of {@link module:ol/layer/Layer~Layer layers}
   * in this group.
   * @return {!Collection<import("./Base.js").default>} Collection of
   *   {@link module:ol/layer/Base~BaseLayer layers} that are part of this group.
   * @observable
   * @api
   */
  getLayers() {
    return (
      /** @type {!Collection<import("./Base.js").default>} */
      this.get(mo.LAYERS)
    );
  }
  /**
   * Set the {@link module:ol/Collection~Collection collection} of {@link module:ol/layer/Layer~Layer layers}
   * in this group.
   * @param {!Collection<import("./Base.js").default>} layers Collection of
   *   {@link module:ol/layer/Base~BaseLayer layers} that are part of this group.
   * @observable
   * @api
   */
  setLayers(e) {
    const n = this.getLayers();
    if (n) {
      const i = n.getArray();
      for (let s = 0, r = i.length; s < r; ++s)
        this.dispatchEvent(new gn("removelayer", i[s]));
    }
    this.set(mo.LAYERS, e);
  }
  /**
   * @param {Array<import("./Layer.js").default>} [array] Array of layers (to be modified in place).
   * @return {Array<import("./Layer.js").default>} Array of layers.
   */
  getLayersArray(e) {
    return e = e !== void 0 ? e : [], this.getLayers().forEach(function(n) {
      n.getLayersArray(e);
    }), e;
  }
  /**
   * Get the layer states list and use this groups z-index as the default
   * for all layers in this and nested groups, if it is unset at this point.
   * If dest is not provided and this group's z-index is undefined
   * 0 is used a the default z-index.
   * @param {Array<import("./Layer.js").State>} [dest] Optional list
   * of layer states (to be modified in place).
   * @return {Array<import("./Layer.js").State>} List of layer states.
   */
  getLayerStatesArray(e) {
    const n = e !== void 0 ? e : [], i = n.length;
    this.getLayers().forEach(function(o) {
      o.getLayerStatesArray(n);
    });
    const s = this.getLayerState();
    let r = s.zIndex;
    !e && s.zIndex === void 0 && (r = 0);
    for (let o = i, a = n.length; o < a; o++) {
      const l = n[o];
      l.opacity *= s.opacity, l.visible = l.visible && s.visible, l.maxResolution = Math.min(
        l.maxResolution,
        s.maxResolution
      ), l.minResolution = Math.max(
        l.minResolution,
        s.minResolution
      ), l.minZoom = Math.max(l.minZoom, s.minZoom), l.maxZoom = Math.min(l.maxZoom, s.maxZoom), s.extent !== void 0 && (l.extent !== void 0 ? l.extent = qi(
        l.extent,
        s.extent
      ) : l.extent = s.extent), l.zIndex === void 0 && (l.zIndex = r);
    }
    return n;
  }
  /**
   * @return {import("../source/Source.js").State} Source state.
   */
  getSourceState() {
    return "ready";
  }
}
const Or = Na;
class v_ extends sn {
  /**
   * @param {string} type Event type.
   * @param {import("./Map.js").default} map Map.
   * @param {?import("./Map.js").FrameState} [frameState] Frame state.
   */
  constructor(e, n, i) {
    super(e), this.map = n, this.frameState = i !== void 0 ? i : null;
  }
}
const oi = v_;
class y_ extends oi {
  /**
   * @param {string} type Event type.
   * @param {import("./Map.js").default} map Map.
   * @param {EVENT} originalEvent Original event.
   * @param {boolean} [dragging] Is the map currently being dragged?
   * @param {import("./Map.js").FrameState} [frameState] Frame state.
   * @param {Array<PointerEvent>} [activePointers] Active pointers.
   */
  constructor(e, n, i, s, r, o) {
    super(e, n, r), this.originalEvent = i, this.pixel_ = null, this.coordinate_ = null, this.dragging = s !== void 0 ? s : !1, this.activePointers = o;
  }
  /**
   * The map pixel relative to the viewport corresponding to the original event.
   * @type {import("./pixel.js").Pixel}
   * @api
   */
  get pixel() {
    return this.pixel_ || (this.pixel_ = this.map.getEventPixel(this.originalEvent)), this.pixel_;
  }
  set pixel(e) {
    this.pixel_ = e;
  }
  /**
   * The coordinate corresponding to the original browser event.  This will be in the user
   * projection if one is set.  Otherwise it will be in the view projection.
   * @type {import("./coordinate.js").Coordinate}
   * @api
   */
  get coordinate() {
    return this.coordinate_ || (this.coordinate_ = this.map.getCoordinateFromPixel(this.pixel)), this.coordinate_;
  }
  set coordinate(e) {
    this.coordinate_ = e;
  }
  /**
   * Prevents the default browser action.
   * See https://developer.mozilla.org/en-US/docs/Web/API/event.preventDefault.
   * @api
   */
  preventDefault() {
    super.preventDefault(), "preventDefault" in this.originalEvent && this.originalEvent.preventDefault();
  }
  /**
   * Prevents further propagation of the current event.
   * See https://developer.mozilla.org/en-US/docs/Web/API/event.stopPropagation.
   * @api
   */
  stopPropagation() {
    super.stopPropagation(), "stopPropagation" in this.originalEvent && this.originalEvent.stopPropagation();
  }
}
const dn = y_, be = {
  /**
   * A true single click with no dragging and no double click. Note that this
   * event is delayed by 250 ms to ensure that it is not a double click.
   * @event module:ol/MapBrowserEvent~MapBrowserEvent#singleclick
   * @api
   */
  SINGLECLICK: "singleclick",
  /**
   * A click with no dragging. A double click will fire two of this.
   * @event module:ol/MapBrowserEvent~MapBrowserEvent#click
   * @api
   */
  CLICK: H.CLICK,
  /**
   * A true double click, with no dragging.
   * @event module:ol/MapBrowserEvent~MapBrowserEvent#dblclick
   * @api
   */
  DBLCLICK: H.DBLCLICK,
  /**
   * Triggered when a pointer is dragged.
   * @event module:ol/MapBrowserEvent~MapBrowserEvent#pointerdrag
   * @api
   */
  POINTERDRAG: "pointerdrag",
  /**
   * Triggered when a pointer is moved. Note that on touch devices this is
   * triggered when the map is panned, so is not the same as mousemove.
   * @event module:ol/MapBrowserEvent~MapBrowserEvent#pointermove
   * @api
   */
  POINTERMOVE: "pointermove",
  POINTERDOWN: "pointerdown",
  POINTERUP: "pointerup",
  POINTEROVER: "pointerover",
  POINTEROUT: "pointerout",
  POINTERENTER: "pointerenter",
  POINTERLEAVE: "pointerleave",
  POINTERCANCEL: "pointercancel"
}, zo = {
  POINTERMOVE: "pointermove",
  POINTERDOWN: "pointerdown",
  POINTERUP: "pointerup",
  POINTEROVER: "pointerover",
  POINTEROUT: "pointerout",
  POINTERENTER: "pointerenter",
  POINTERLEAVE: "pointerleave",
  POINTERCANCEL: "pointercancel"
};
class p_ extends pr {
  /**
   * @param {import("./Map.js").default} map The map with the viewport to listen to events on.
   * @param {number} [moveTolerance] The minimal distance the pointer must travel to trigger a move.
   */
  constructor(e, n) {
    super(e), this.map_ = e, this.clickTimeoutId_, this.emulateClicks_ = !1, this.dragging_ = !1, this.dragListenerKeys_ = [], this.moveTolerance_ = n === void 0 ? 1 : n, this.down_ = null;
    const i = this.map_.getViewport();
    this.activePointers_ = [], this.trackedTouches_ = {}, this.element_ = i, this.pointerdownListenerKey_ = he(
      i,
      zo.POINTERDOWN,
      this.handlePointerDown_,
      this
    ), this.originalPointerMoveEvent_, this.relayedListenerKey_ = he(
      i,
      zo.POINTERMOVE,
      this.relayMoveEvent_,
      this
    ), this.boundHandleTouchMove_ = this.handleTouchMove_.bind(this), this.element_.addEventListener(
      H.TOUCHMOVE,
      this.boundHandleTouchMove_,
      Zc ? { passive: !1 } : !1
    );
  }
  /**
   * @param {PointerEvent} pointerEvent Pointer
   * event.
   * @private
   */
  emulateClick_(e) {
    let n = new dn(
      be.CLICK,
      this.map_,
      e
    );
    this.dispatchEvent(n), this.clickTimeoutId_ !== void 0 ? (clearTimeout(this.clickTimeoutId_), this.clickTimeoutId_ = void 0, n = new dn(
      be.DBLCLICK,
      this.map_,
      e
    ), this.dispatchEvent(n)) : this.clickTimeoutId_ = setTimeout(() => {
      this.clickTimeoutId_ = void 0;
      const i = new dn(
        be.SINGLECLICK,
        this.map_,
        e
      );
      this.dispatchEvent(i);
    }, 250);
  }
  /**
   * Keeps track on how many pointers are currently active.
   *
   * @param {PointerEvent} pointerEvent Pointer
   * event.
   * @private
   */
  updateActivePointers_(e) {
    const n = e, i = n.pointerId;
    if (n.type == be.POINTERUP || n.type == be.POINTERCANCEL) {
      delete this.trackedTouches_[i];
      for (const s in this.trackedTouches_)
        if (this.trackedTouches_[s].target !== n.target) {
          delete this.trackedTouches_[s];
          break;
        }
    } else
      (n.type == be.POINTERDOWN || n.type == be.POINTERMOVE) && (this.trackedTouches_[i] = n);
    this.activePointers_ = Object.values(this.trackedTouches_);
  }
  /**
   * @param {PointerEvent} pointerEvent Pointer
   * event.
   * @private
   */
  handlePointerUp_(e) {
    this.updateActivePointers_(e);
    const n = new dn(
      be.POINTERUP,
      this.map_,
      e,
      void 0,
      void 0,
      this.activePointers_
    );
    this.dispatchEvent(n), this.emulateClicks_ && !n.defaultPrevented && !this.dragging_ && this.isMouseActionButton_(e) && this.emulateClick_(this.down_), this.activePointers_.length === 0 && (this.dragListenerKeys_.forEach(Ce), this.dragListenerKeys_.length = 0, this.dragging_ = !1, this.down_ = null);
  }
  /**
   * @param {PointerEvent} pointerEvent Pointer
   * event.
   * @return {boolean} If the left mouse button was pressed.
   * @private
   */
  isMouseActionButton_(e) {
    return e.button === 0;
  }
  /**
   * @param {PointerEvent} pointerEvent Pointer
   * event.
   * @private
   */
  handlePointerDown_(e) {
    this.emulateClicks_ = this.activePointers_.length === 0, this.updateActivePointers_(e);
    const n = new dn(
      be.POINTERDOWN,
      this.map_,
      e,
      void 0,
      void 0,
      this.activePointers_
    );
    if (this.dispatchEvent(n), this.down_ = new PointerEvent(e.type, e), Object.defineProperty(this.down_, "target", {
      writable: !1,
      value: e.target
    }), this.dragListenerKeys_.length === 0) {
      const i = this.map_.getOwnerDocument();
      this.dragListenerKeys_.push(
        he(
          i,
          be.POINTERMOVE,
          this.handlePointerMove_,
          this
        ),
        he(i, be.POINTERUP, this.handlePointerUp_, this),
        /* Note that the listener for `pointercancel is set up on
         * `pointerEventHandler_` and not `documentPointerEventHandler_` like
         * the `pointerup` and `pointermove` listeners.
         *
         * The reason for this is the following: `TouchSource.vacuumTouches_()`
         * issues `pointercancel` events, when there was no `touchend` for a
         * `touchstart`. Now, let's say a first `touchstart` is registered on
         * `pointerEventHandler_`. The `documentPointerEventHandler_` is set up.
         * But `documentPointerEventHandler_` doesn't know about the first
         * `touchstart`. If there is no `touchend` for the `touchstart`, we can
         * only receive a `touchcancel` from `pointerEventHandler_`, because it is
         * only registered there.
         */
        he(
          this.element_,
          be.POINTERCANCEL,
          this.handlePointerUp_,
          this
        )
      ), this.element_.getRootNode && this.element_.getRootNode() !== i && this.dragListenerKeys_.push(
        he(
          this.element_.getRootNode(),
          be.POINTERUP,
          this.handlePointerUp_,
          this
        )
      );
    }
  }
  /**
   * @param {PointerEvent} pointerEvent Pointer
   * event.
   * @private
   */
  handlePointerMove_(e) {
    if (this.isMoving_(e)) {
      this.updateActivePointers_(e), this.dragging_ = !0;
      const n = new dn(
        be.POINTERDRAG,
        this.map_,
        e,
        this.dragging_,
        void 0,
        this.activePointers_
      );
      this.dispatchEvent(n);
    }
  }
  /**
   * Wrap and relay a pointermove event.
   * @param {PointerEvent} pointerEvent Pointer
   * event.
   * @private
   */
  relayMoveEvent_(e) {
    this.originalPointerMoveEvent_ = e;
    const n = !!(this.down_ && this.isMoving_(e));
    this.dispatchEvent(
      new dn(
        be.POINTERMOVE,
        this.map_,
        e,
        n
      )
    );
  }
  /**
   * Flexible handling of a `touch-action: none` css equivalent: because calling
   * `preventDefault()` on a `pointermove` event does not stop native page scrolling
   * and zooming, we also listen for `touchmove` and call `preventDefault()` on it
   * when an interaction (currently `DragPan` handles the event.
   * @param {TouchEvent} event Event.
   * @private
   */
  handleTouchMove_(e) {
    const n = this.originalPointerMoveEvent_;
    (!n || n.defaultPrevented) && (typeof e.cancelable != "boolean" || e.cancelable === !0) && e.preventDefault();
  }
  /**
   * @param {PointerEvent} pointerEvent Pointer
   * event.
   * @return {boolean} Is moving.
   * @private
   */
  isMoving_(e) {
    return this.dragging_ || Math.abs(e.clientX - this.down_.clientX) > this.moveTolerance_ || Math.abs(e.clientY - this.down_.clientY) > this.moveTolerance_;
  }
  /**
   * Clean up.
   */
  disposeInternal() {
    this.relayedListenerKey_ && (Ce(this.relayedListenerKey_), this.relayedListenerKey_ = null), this.element_.removeEventListener(
      H.TOUCHMOVE,
      this.boundHandleTouchMove_
    ), this.pointerdownListenerKey_ && (Ce(this.pointerdownListenerKey_), this.pointerdownListenerKey_ = null), this.dragListenerKeys_.forEach(Ce), this.dragListenerKeys_.length = 0, this.element_ = null, super.disposeInternal();
  }
}
const x_ = p_, fn = {
  /**
   * Triggered after a map frame is rendered.
   * @event module:ol/MapEvent~MapEvent#postrender
   * @api
   */
  POSTRENDER: "postrender",
  /**
   * Triggered when the map starts moving.
   * @event module:ol/MapEvent~MapEvent#movestart
   * @api
   */
  MOVESTART: "movestart",
  /**
   * Triggered after the map is moved.
   * @event module:ol/MapEvent~MapEvent#moveend
   * @api
   */
  MOVEEND: "moveend",
  /**
   * Triggered when loading of additional map data (tiles, images, features) starts.
   * @event module:ol/MapEvent~MapEvent#loadstart
   * @api
   */
  LOADSTART: "loadstart",
  /**
   * Triggered when loading of additional map data has completed.
   * @event module:ol/MapEvent~MapEvent#loadend
   * @api
   */
  LOADEND: "loadend"
}, Ne = {
  LAYERGROUP: "layergroup",
  SIZE: "size",
  TARGET: "target",
  VIEW: "view"
}, cr = 1 / 0;
class C_ {
  /**
   * @param {function(T): number} priorityFunction Priority function.
   * @param {function(T): string} keyFunction Key function.
   */
  constructor(e, n) {
    this.priorityFunction_ = e, this.keyFunction_ = n, this.elements_ = [], this.priorities_ = [], this.queuedElements_ = {};
  }
  /**
   * FIXME empty description for jsdoc
   */
  clear() {
    this.elements_.length = 0, this.priorities_.length = 0, Es(this.queuedElements_);
  }
  /**
   * Remove and return the highest-priority element. O(log N).
   * @return {T} Element.
   */
  dequeue() {
    const e = this.elements_, n = this.priorities_, i = e[0];
    e.length == 1 ? (e.length = 0, n.length = 0) : (e[0] = /** @type {T} */
    e.pop(), n[0] = /** @type {number} */
    n.pop(), this.siftUp_(0));
    const s = this.keyFunction_(i);
    return delete this.queuedElements_[s], i;
  }
  /**
   * Enqueue an element. O(log N).
   * @param {T} element Element.
   * @return {boolean} The element was added to the queue.
   */
  enqueue(e) {
    ue(
      !(this.keyFunction_(e) in this.queuedElements_),
      "Tried to enqueue an `element` that was already added to the queue"
    );
    const n = this.priorityFunction_(e);
    return n != cr ? (this.elements_.push(e), this.priorities_.push(n), this.queuedElements_[this.keyFunction_(e)] = !0, this.siftDown_(0, this.elements_.length - 1), !0) : !1;
  }
  /**
   * @return {number} Count.
   */
  getCount() {
    return this.elements_.length;
  }
  /**
   * Gets the index of the left child of the node at the given index.
   * @param {number} index The index of the node to get the left child for.
   * @return {number} The index of the left child.
   * @private
   */
  getLeftChildIndex_(e) {
    return e * 2 + 1;
  }
  /**
   * Gets the index of the right child of the node at the given index.
   * @param {number} index The index of the node to get the right child for.
   * @return {number} The index of the right child.
   * @private
   */
  getRightChildIndex_(e) {
    return e * 2 + 2;
  }
  /**
   * Gets the index of the parent of the node at the given index.
   * @param {number} index The index of the node to get the parent for.
   * @return {number} The index of the parent.
   * @private
   */
  getParentIndex_(e) {
    return e - 1 >> 1;
  }
  /**
   * Make this a heap. O(N).
   * @private
   */
  heapify_() {
    let e;
    for (e = (this.elements_.length >> 1) - 1; e >= 0; e--)
      this.siftUp_(e);
  }
  /**
   * @return {boolean} Is empty.
   */
  isEmpty() {
    return this.elements_.length === 0;
  }
  /**
   * @param {string} key Key.
   * @return {boolean} Is key queued.
   */
  isKeyQueued(e) {
    return e in this.queuedElements_;
  }
  /**
   * @param {T} element Element.
   * @return {boolean} Is queued.
   */
  isQueued(e) {
    return this.isKeyQueued(this.keyFunction_(e));
  }
  /**
   * @param {number} index The index of the node to move down.
   * @private
   */
  siftUp_(e) {
    const n = this.elements_, i = this.priorities_, s = n.length, r = n[e], o = i[e], a = e;
    for (; e < s >> 1; ) {
      const l = this.getLeftChildIndex_(e), u = this.getRightChildIndex_(e), c = u < s && i[u] < i[l] ? u : l;
      n[e] = n[c], i[e] = i[c], e = c;
    }
    n[e] = r, i[e] = o, this.siftDown_(a, e);
  }
  /**
   * @param {number} startIndex The index of the root.
   * @param {number} index The index of the node to move up.
   * @private
   */
  siftDown_(e, n) {
    const i = this.elements_, s = this.priorities_, r = i[n], o = s[n];
    for (; n > e; ) {
      const a = this.getParentIndex_(n);
      if (s[a] > o)
        i[n] = i[a], s[n] = s[a], n = a;
      else
        break;
    }
    i[n] = r, s[n] = o;
  }
  /**
   * FIXME empty description for jsdoc
   */
  reprioritize() {
    const e = this.priorityFunction_, n = this.elements_, i = this.priorities_;
    let s = 0;
    const r = n.length;
    let o, a, l;
    for (a = 0; a < r; ++a)
      o = n[a], l = e(o), l == cr ? delete this.queuedElements_[this.keyFunction_(o)] : (i[s] = l, n[s++] = o);
    n.length = s, i.length = s, this.heapify_();
  }
}
const E_ = C_, X = {
  IDLE: 0,
  LOADING: 1,
  LOADED: 2,
  /**
   * Indicates that tile loading failed
   * @type {number}
   */
  ERROR: 3,
  EMPTY: 4
};
class w_ extends E_ {
  /**
   * @param {PriorityFunction} tilePriorityFunction Tile priority function.
   * @param {function(): ?} tileChangeCallback Function called on each tile change event.
   */
  constructor(e, n) {
    super(
      /**
       * @param {Array} element Element.
       * @return {number} Priority.
       */
      function(i) {
        return e.apply(null, i);
      },
      /**
       * @param {Array} element Element.
       * @return {string} Key.
       */
      function(i) {
        return (
          /** @type {import("./Tile.js").default} */
          i[0].getKey()
        );
      }
    ), this.boundHandleTileChange_ = this.handleTileChange.bind(this), this.tileChangeCallback_ = n, this.tilesLoading_ = 0, this.tilesLoadingKeys_ = {};
  }
  /**
   * @param {Array} element Element.
   * @return {boolean} The element was added to the queue.
   */
  enqueue(e) {
    const n = super.enqueue(e);
    return n && e[0].addEventListener(H.CHANGE, this.boundHandleTileChange_), n;
  }
  /**
   * @return {number} Number of tiles loading.
   */
  getTilesLoading() {
    return this.tilesLoading_;
  }
  /**
   * @param {import("./events/Event.js").default} event Event.
   * @protected
   */
  handleTileChange(e) {
    const n = (
      /** @type {import("./Tile.js").default} */
      e.target
    ), i = n.getState();
    if (i === X.LOADED || i === X.ERROR || i === X.EMPTY) {
      i !== X.ERROR && n.removeEventListener(H.CHANGE, this.boundHandleTileChange_);
      const s = n.getKey();
      s in this.tilesLoadingKeys_ && (delete this.tilesLoadingKeys_[s], --this.tilesLoading_), this.tileChangeCallback_();
    }
  }
  /**
   * @param {number} maxTotalLoading Maximum number tiles to load simultaneously.
   * @param {number} maxNewLoads Maximum number of new tiles to load.
   */
  loadMoreTiles(e, n) {
    let i = 0, s, r, o;
    for (; this.tilesLoading_ < e && i < n && this.getCount() > 0; )
      r = /** @type {import("./Tile.js").default} */
      this.dequeue()[0], o = r.getKey(), s = r.getState(), s === X.IDLE && !(o in this.tilesLoadingKeys_) && (this.tilesLoadingKeys_[o] = !0, ++this.tilesLoading_, ++i, r.load());
  }
}
const S_ = w_;
function b_(t, e, n, i, s) {
  if (!t || !(n in t.wantedTiles) || !t.wantedTiles[n][e.getKey()])
    return cr;
  const r = t.viewState.center, o = i[0] - r[0], a = i[1] - r[1];
  return 65536 * Math.log(s) + Math.sqrt(o * o + a * a) / s;
}
class I_ extends Nt {
  /**
   * @param {Options} options Control options.
   */
  constructor(e) {
    super();
    const n = e.element;
    n && !e.target && !n.style.pointerEvents && (n.style.pointerEvents = "auto"), this.element = n || null, this.target_ = null, this.map_ = null, this.listenerKeys = [], e.render && (this.render = e.render), e.target && this.setTarget(e.target);
  }
  /**
   * Clean up.
   */
  disposeInternal() {
    Do(this.element), super.disposeInternal();
  }
  /**
   * Get the map associated with this control.
   * @return {import("../Map.js").default|null} Map.
   * @api
   */
  getMap() {
    return this.map_;
  }
  /**
   * Remove the control from its current map and attach it to the new map.
   * Pass `null` to just remove the control from the current map.
   * Subclasses may set up event handlers to get notified about changes to
   * the map here.
   * @param {import("../Map.js").default|null} map Map.
   * @api
   */
  setMap(e) {
    this.map_ && Do(this.element);
    for (let n = 0, i = this.listenerKeys.length; n < i; ++n)
      Ce(this.listenerKeys[n]);
    this.listenerKeys.length = 0, this.map_ = e, e && ((this.target_ ? this.target_ : e.getOverlayContainerStopEvent()).appendChild(this.element), this.render !== pi && this.listenerKeys.push(
      he(e, fn.POSTRENDER, this.render, this)
    ), e.render());
  }
  /**
   * Renders the control.
   * @param {import("../MapEvent.js").default} mapEvent Map event.
   * @api
   */
  render(e) {
  }
  /**
   * This function is used to set a target element for the control. It has no
   * effect if it is called after the control has been added to the map (i.e.
   * after `setMap` is called on the control). If no `target` is set in the
   * options passed to the control constructor and if `setTarget` is not called
   * then the control is added to the map's overlay container.
   * @param {HTMLElement|string} target Target.
   * @api
   */
  setTarget(e) {
    this.target_ = typeof e == "string" ? document.getElementById(e) : e;
  }
}
const Va = I_;
class T_ extends Va {
  /**
   * @param {Options} [options] Attribution options.
   */
  constructor(e) {
    e = e || {}, super({
      element: document.createElement("div"),
      render: e.render,
      target: e.target
    }), this.ulElement_ = document.createElement("ul"), this.collapsed_ = e.collapsed !== void 0 ? e.collapsed : !0, this.userCollapsed_ = this.collapsed_, this.overrideCollapsible_ = e.collapsible !== void 0, this.collapsible_ = e.collapsible !== void 0 ? e.collapsible : !0, this.collapsible_ || (this.collapsed_ = !1);
    const n = e.className !== void 0 ? e.className : "ol-attribution", i = e.tipLabel !== void 0 ? e.tipLabel : "Attributions", s = e.expandClassName !== void 0 ? e.expandClassName : n + "-expand", r = e.collapseLabel !== void 0 ? e.collapseLabel : "›", o = e.collapseClassName !== void 0 ? e.collapseClassName : n + "-collapse";
    typeof r == "string" ? (this.collapseLabel_ = document.createElement("span"), this.collapseLabel_.textContent = r, this.collapseLabel_.className = o) : this.collapseLabel_ = r;
    const a = e.label !== void 0 ? e.label : "i";
    typeof a == "string" ? (this.label_ = document.createElement("span"), this.label_.textContent = a, this.label_.className = s) : this.label_ = a;
    const l = this.collapsible_ && !this.collapsed_ ? this.collapseLabel_ : this.label_;
    this.toggleButton_ = document.createElement("button"), this.toggleButton_.setAttribute("type", "button"), this.toggleButton_.setAttribute("aria-expanded", String(!this.collapsed_)), this.toggleButton_.title = i, this.toggleButton_.appendChild(l), this.toggleButton_.addEventListener(
      H.CLICK,
      this.handleClick_.bind(this),
      !1
    );
    const u = n + " " + Lr + " " + Ta + (this.collapsed_ && this.collapsible_ ? " " + Jl : "") + (this.collapsible_ ? "" : " ol-uncollapsible"), c = this.element;
    c.className = u, c.appendChild(this.toggleButton_), c.appendChild(this.ulElement_), this.renderedAttributions_ = [], this.renderedVisible_ = !0;
  }
  /**
   * Collect a list of visible attributions and set the collapsible state.
   * @param {import("../Map.js").FrameState} frameState Frame state.
   * @return {Array<string>} Attributions.
   * @private
   */
  collectSourceAttributions_(e) {
    const n = Array.from(
      new Set(
        this.getMap().getAllLayers().flatMap((s) => s.getAttributions(e))
      )
    ), i = !this.getMap().getAllLayers().some(
      (s) => s.getSource() && s.getSource().getAttributionsCollapsible() === !1
    );
    return this.overrideCollapsible_ || this.setCollapsible(i), n;
  }
  /**
   * @private
   * @param {?import("../Map.js").FrameState} frameState Frame state.
   */
  async updateElement_(e) {
    if (!e) {
      this.renderedVisible_ && (this.element.style.display = "none", this.renderedVisible_ = !1);
      return;
    }
    const n = await Promise.all(
      this.collectSourceAttributions_(e).map(
        (s) => Ef(() => s)
      )
    ), i = n.length > 0;
    if (this.renderedVisible_ != i && (this.element.style.display = i ? "" : "none", this.renderedVisible_ = i), !In(n, this.renderedAttributions_)) {
      rm(this.ulElement_);
      for (let s = 0, r = n.length; s < r; ++s) {
        const o = document.createElement("li");
        o.innerHTML = n[s], this.ulElement_.appendChild(o);
      }
      this.renderedAttributions_ = n;
    }
  }
  /**
   * @param {MouseEvent} event The event to handle
   * @private
   */
  handleClick_(e) {
    e.preventDefault(), this.handleToggle_(), this.userCollapsed_ = this.collapsed_;
  }
  /**
   * @private
   */
  handleToggle_() {
    this.element.classList.toggle(Jl), this.collapsed_ ? ql(this.collapseLabel_, this.label_) : ql(this.label_, this.collapseLabel_), this.collapsed_ = !this.collapsed_, this.toggleButton_.setAttribute("aria-expanded", String(!this.collapsed_));
  }
  /**
   * Return `true` if the attribution is collapsible, `false` otherwise.
   * @return {boolean} True if the widget is collapsible.
   * @api
   */
  getCollapsible() {
    return this.collapsible_;
  }
  /**
   * Set whether the attribution should be collapsible.
   * @param {boolean} collapsible True if the widget is collapsible.
   * @api
   */
  setCollapsible(e) {
    this.collapsible_ !== e && (this.collapsible_ = e, this.element.classList.toggle("ol-uncollapsible"), this.userCollapsed_ && this.handleToggle_());
  }
  /**
   * Collapse or expand the attribution according to the passed parameter. Will
   * not do anything if the attribution isn't collapsible or if the current
   * collapsed state is already the one requested.
   * @param {boolean} collapsed True if the widget is collapsed.
   * @api
   */
  setCollapsed(e) {
    this.userCollapsed_ = e, !(!this.collapsible_ || this.collapsed_ === e) && this.handleToggle_();
  }
  /**
   * Return `true` when the attribution is currently collapsed or `false`
   * otherwise.
   * @return {boolean} True if the widget is collapsed.
   * @api
   */
  getCollapsed() {
    return this.collapsed_;
  }
  /**
   * Update the attribution element.
   * @param {import("../MapEvent.js").default} mapEvent Map event.
   * @override
   */
  render(e) {
    this.updateElement_(e.frameState);
  }
}
const R_ = T_;
class L_ extends Va {
  /**
   * @param {Options} [options] Rotate options.
   */
  constructor(e) {
    e = e || {}, super({
      element: document.createElement("div"),
      render: e.render,
      target: e.target
    });
    const n = e.className !== void 0 ? e.className : "ol-rotate", i = e.label !== void 0 ? e.label : "⇧", s = e.compassClassName !== void 0 ? e.compassClassName : "ol-compass";
    this.label_ = null, typeof i == "string" ? (this.label_ = document.createElement("span"), this.label_.className = s, this.label_.textContent = i) : (this.label_ = i, this.label_.classList.add(s));
    const r = e.tipLabel ? e.tipLabel : "Reset rotation", o = document.createElement("button");
    o.className = n + "-reset", o.setAttribute("type", "button"), o.title = r, o.appendChild(this.label_), o.addEventListener(
      H.CLICK,
      this.handleClick_.bind(this),
      !1
    );
    const a = n + " " + Lr + " " + Ta, l = this.element;
    l.className = a, l.appendChild(o), this.callResetNorth_ = e.resetNorth ? e.resetNorth : void 0, this.duration_ = e.duration !== void 0 ? e.duration : 250, this.autoHide_ = e.autoHide !== void 0 ? e.autoHide : !0, this.rotation_ = void 0, this.autoHide_ && this.element.classList.add(Xs);
  }
  /**
   * @param {MouseEvent} event The event to handle
   * @private
   */
  handleClick_(e) {
    e.preventDefault(), this.callResetNorth_ !== void 0 ? this.callResetNorth_() : this.resetNorth_();
  }
  /**
   * @private
   */
  resetNorth_() {
    const n = this.getMap().getView();
    if (!n)
      return;
    const i = n.getRotation();
    i !== void 0 && (this.duration_ > 0 && i % (2 * Math.PI) !== 0 ? n.animate({
      rotation: 0,
      duration: this.duration_,
      easing: Ti
    }) : n.setRotation(0));
  }
  /**
   * Update the rotate control element.
   * @param {import("../MapEvent.js").default} mapEvent Map event.
   * @override
   */
  render(e) {
    const n = e.frameState;
    if (!n)
      return;
    const i = n.viewState.rotation;
    if (i != this.rotation_) {
      const s = "rotate(" + i + "rad)";
      if (this.autoHide_) {
        const r = this.element.classList.contains(Xs);
        !r && i === 0 ? this.element.classList.add(Xs) : r && i !== 0 && this.element.classList.remove(Xs);
      }
      this.label_.style.transform = s;
    }
    this.rotation_ = i;
  }
}
const A_ = L_;
class P_ extends Va {
  /**
   * @param {Options} [options] Zoom options.
   */
  constructor(e) {
    e = e || {}, super({
      element: document.createElement("div"),
      target: e.target
    });
    const n = e.className !== void 0 ? e.className : "ol-zoom", i = e.delta !== void 0 ? e.delta : 1, s = e.zoomInClassName !== void 0 ? e.zoomInClassName : n + "-in", r = e.zoomOutClassName !== void 0 ? e.zoomOutClassName : n + "-out", o = e.zoomInLabel !== void 0 ? e.zoomInLabel : "+", a = e.zoomOutLabel !== void 0 ? e.zoomOutLabel : "–", l = e.zoomInTipLabel !== void 0 ? e.zoomInTipLabel : "Zoom in", u = e.zoomOutTipLabel !== void 0 ? e.zoomOutTipLabel : "Zoom out", c = document.createElement("button");
    c.className = s, c.setAttribute("type", "button"), c.title = l, c.appendChild(
      typeof o == "string" ? document.createTextNode(o) : o
    ), c.addEventListener(
      H.CLICK,
      this.handleClick_.bind(this, i),
      !1
    );
    const h = document.createElement("button");
    h.className = r, h.setAttribute("type", "button"), h.title = u, h.appendChild(
      typeof a == "string" ? document.createTextNode(a) : a
    ), h.addEventListener(
      H.CLICK,
      this.handleClick_.bind(this, -i),
      !1
    );
    const d = n + " " + Lr + " " + Ta, f = this.element;
    f.className = d, f.appendChild(c), f.appendChild(h), this.duration_ = e.duration !== void 0 ? e.duration : 250;
  }
  /**
   * @param {number} delta Zoom delta.
   * @param {MouseEvent} event The event to handle
   * @private
   */
  handleClick_(e, n) {
    n.preventDefault(), this.zoomByDelta_(e);
  }
  /**
   * @param {number} delta Zoom delta.
   * @private
   */
  zoomByDelta_(e) {
    const i = this.getMap().getView();
    if (!i)
      return;
    const s = i.getZoom();
    if (s !== void 0) {
      const r = i.getConstrainedZoom(s + e);
      this.duration_ > 0 ? (i.getAnimating() && i.cancelAnimations(), i.animate({
        zoom: r,
        duration: this.duration_,
        easing: Ti
      })) : i.setZoom(r);
    }
  }
}
const M_ = P_;
function k_(t) {
  t = t || {};
  const e = new Lt();
  return (t.zoom !== void 0 ? t.zoom : !0) && e.push(new M_(t.zoomOptions)), (t.rotate !== void 0 ? t.rotate : !0) && e.push(new A_(t.rotateOptions)), (t.attribution !== void 0 ? t.attribution : !0) && e.push(new R_(t.attributionOptions)), e;
}
const uu = {
  ACTIVE: "active"
};
class O_ extends Nt {
  /**
   * @param {InteractionOptions} [options] Options.
   */
  constructor(e) {
    super(), this.on, this.once, this.un, e && e.handleEvent && (this.handleEvent = e.handleEvent), this.map_ = null, this.setActive(!0);
  }
  /**
   * Return whether the interaction is currently active.
   * @return {boolean} `true` if the interaction is active, `false` otherwise.
   * @observable
   * @api
   */
  getActive() {
    return (
      /** @type {boolean} */
      this.get(uu.ACTIVE)
    );
  }
  /**
   * Get the map associated with this interaction.
   * @return {import("../Map.js").default|null} Map.
   * @api
   */
  getMap() {
    return this.map_;
  }
  /**
   * Handles the {@link module:ol/MapBrowserEvent~MapBrowserEvent map browser event}.
   * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Map browser event.
   * @return {boolean} `false` to stop event propagation.
   * @api
   */
  handleEvent(e) {
    return !0;
  }
  /**
   * Activate or deactivate the interaction.
   * @param {boolean} active Active.
   * @observable
   * @api
   */
  setActive(e) {
    this.set(uu.ACTIVE, e);
  }
  /**
   * Remove the interaction from its current map and attach it to the new map.
   * Subclasses may set up event handlers to get notified about changes to
   * the map here.
   * @param {import("../Map.js").default|null} map Map.
   */
  setMap(e) {
    this.map_ = e;
  }
}
function D_(t, e, n) {
  const i = t.getCenterInternal();
  if (i) {
    const s = [i[0] + e[0], i[1] + e[1]];
    t.animateInternal({
      duration: n !== void 0 ? n : 250,
      easing: hg,
      center: t.getConstrainedCenter(s)
    });
  }
}
function Ga(t, e, n, i) {
  const s = t.getZoom();
  if (s === void 0)
    return;
  const r = t.getConstrainedZoom(s + e), o = t.getResolutionForZoom(r);
  t.getAnimating() && t.cancelAnimations(), t.animate({
    resolution: o,
    anchor: n,
    duration: i !== void 0 ? i : 250,
    easing: Ti
  });
}
const bs = O_;
class F_ extends bs {
  /**
   * @param {Options} [options] Options.
   */
  constructor(e) {
    super(), e = e || {}, this.delta_ = e.delta ? e.delta : 1, this.duration_ = e.duration !== void 0 ? e.duration : 250;
  }
  /**
   * Handles the {@link module:ol/MapBrowserEvent~MapBrowserEvent map browser event} (if it was a
   * doubleclick) and eventually zooms the map.
   * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Map browser event.
   * @return {boolean} `false` to stop event propagation.
   */
  handleEvent(e) {
    let n = !1;
    if (e.type == be.DBLCLICK) {
      const i = (
        /** @type {MouseEvent} */
        e.originalEvent
      ), s = e.map, r = e.coordinate, o = i.shiftKey ? -this.delta_ : this.delta_, a = s.getView();
      Ga(a, o, r, this.duration_), i.preventDefault(), n = !0;
    }
    return !n;
  }
}
const N_ = F_;
class V_ extends bs {
  /**
   * @param {Options} [options] Options.
   */
  constructor(e) {
    e = e || {}, super(
      /** @type {import("./Interaction.js").InteractionOptions} */
      e
    ), e.handleDownEvent && (this.handleDownEvent = e.handleDownEvent), e.handleDragEvent && (this.handleDragEvent = e.handleDragEvent), e.handleMoveEvent && (this.handleMoveEvent = e.handleMoveEvent), e.handleUpEvent && (this.handleUpEvent = e.handleUpEvent), e.stopDown && (this.stopDown = e.stopDown), this.handlingDownUpSequence = !1, this.targetPointers = [];
  }
  /**
   * Returns the current number of pointers involved in the interaction,
   * e.g. `2` when two fingers are used.
   * @return {number} The number of pointers.
   * @api
   */
  getPointerCount() {
    return this.targetPointers.length;
  }
  /**
   * Handle pointer down events.
   * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
   * @return {boolean} If the event was consumed.
   * @protected
   */
  handleDownEvent(e) {
    return !1;
  }
  /**
   * Handle pointer drag events.
   * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
   * @protected
   */
  handleDragEvent(e) {
  }
  /**
   * Handles the {@link module:ol/MapBrowserEvent~MapBrowserEvent map browser event} and may call into
   * other functions, if event sequences like e.g. 'drag' or 'down-up' etc. are
   * detected.
   * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Map browser event.
   * @return {boolean} `false` to stop event propagation.
   * @api
   */
  handleEvent(e) {
    if (!e.originalEvent)
      return !0;
    let n = !1;
    if (this.updateTrackedPointers_(e), this.handlingDownUpSequence) {
      if (e.type == be.POINTERDRAG)
        this.handleDragEvent(e), e.originalEvent.preventDefault();
      else if (e.type == be.POINTERUP) {
        const i = this.handleUpEvent(e);
        this.handlingDownUpSequence = i && this.targetPointers.length > 0;
      }
    } else if (e.type == be.POINTERDOWN) {
      const i = this.handleDownEvent(e);
      this.handlingDownUpSequence = i, n = this.stopDown(i);
    } else
      e.type == be.POINTERMOVE && this.handleMoveEvent(e);
    return !n;
  }
  /**
   * Handle pointer move events.
   * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
   * @protected
   */
  handleMoveEvent(e) {
  }
  /**
   * Handle pointer up events.
   * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
   * @return {boolean} If the event was consumed.
   * @protected
   */
  handleUpEvent(e) {
    return !1;
  }
  /**
   * This function is used to determine if "down" events should be propagated
   * to other interactions or should be stopped.
   * @param {boolean} handled Was the event handled by the interaction?
   * @return {boolean} Should the `down` event be stopped?
   */
  stopDown(e) {
    return e;
  }
  /**
   * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
   * @private
   */
  updateTrackedPointers_(e) {
    e.activePointers && (this.targetPointers = e.activePointers);
  }
}
function za(t) {
  const e = t.length;
  let n = 0, i = 0;
  for (let s = 0; s < e; s++)
    n += t[s].clientX, i += t[s].clientY;
  return { clientX: n / e, clientY: i / e };
}
const Is = V_;
function Bo(t) {
  const e = arguments;
  return function(n) {
    let i = !0;
    for (let s = 0, r = e.length; s < r && (i = i && e[s](n), !!i); ++s)
      ;
    return i;
  };
}
const G_ = function(t) {
  const e = (
    /** @type {KeyboardEvent|MouseEvent|TouchEvent} */
    t.originalEvent
  );
  return e.altKey && !(e.metaKey || e.ctrlKey) && e.shiftKey;
}, z_ = function(t) {
  const e = t.map.getTargetElement(), n = t.map.getOwnerDocument().activeElement;
  return e.contains(n);
}, hh = function(t) {
  return t.map.getTargetElement().hasAttribute("tabindex") ? z_(t) : !0;
}, B_ = ts, dh = function(t) {
  const e = (
    /** @type {MouseEvent} */
    t.originalEvent
  );
  return e.button == 0 && !(sm && Xc && e.ctrlKey);
}, fh = function(t) {
  const e = (
    /** @type {KeyboardEvent|MouseEvent|TouchEvent} */
    t.originalEvent
  );
  return !e.altKey && !(e.metaKey || e.ctrlKey) && !e.shiftKey;
}, $_ = function(t) {
  const e = (
    /** @type {KeyboardEvent|MouseEvent|TouchEvent} */
    t.originalEvent
  );
  return Xc ? e.metaKey : e.ctrlKey;
}, W_ = function(t) {
  const e = (
    /** @type {KeyboardEvent|MouseEvent|TouchEvent} */
    t.originalEvent
  );
  return !e.altKey && !(e.metaKey || e.ctrlKey) && e.shiftKey;
}, gh = function(t) {
  const e = (
    /** @type {KeyboardEvent|MouseEvent|TouchEvent} */
    t.originalEvent
  ), n = (
    /** @type {Element} */
    e.target.tagName
  );
  return n !== "INPUT" && n !== "SELECT" && n !== "TEXTAREA" && // `isContentEditable` is only available on `HTMLElement`, but it may also be a
  // different type like `SVGElement`.
  // @ts-ignore
  !e.target.isContentEditable;
}, _o = function(t) {
  const e = (
    /** @type {import("../MapBrowserEvent").default} */
    t.originalEvent
  );
  return ue(
    e !== void 0,
    "mapBrowserEvent must originate from a pointer event"
  ), e.pointerType == "mouse";
}, X_ = function(t) {
  const e = (
    /** @type {import("../MapBrowserEvent").default} */
    t.originalEvent
  );
  return ue(
    e !== void 0,
    "mapBrowserEvent must originate from a pointer event"
  ), e.isPrimary && e.button === 0;
};
class Y_ extends Is {
  /**
   * @param {Options} [options] Options.
   */
  constructor(e) {
    super({
      stopDown: yr
    }), e = e || {}, this.kinetic_ = e.kinetic, this.lastCentroid = null, this.lastPointersCount_, this.panning_ = !1;
    const n = e.condition ? e.condition : Bo(fh, X_);
    this.condition_ = e.onFocusOnly ? Bo(hh, n) : n, this.noKinetic_ = !1;
  }
  /**
   * Handle pointer drag events.
   * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
   */
  handleDragEvent(e) {
    const n = e.map;
    this.panning_ || (this.panning_ = !0, n.getView().beginInteraction());
    const i = this.targetPointers, s = n.getEventPixel(za(i));
    if (i.length == this.lastPointersCount_) {
      if (this.kinetic_ && this.kinetic_.update(s[0], s[1]), this.lastCentroid) {
        const r = [
          this.lastCentroid[0] - s[0],
          s[1] - this.lastCentroid[1]
        ], a = e.map.getView();
        Kf(r, a.getResolution()), la(r, a.getRotation()), a.adjustCenterInternal(r);
      }
    } else
      this.kinetic_ && this.kinetic_.begin();
    this.lastCentroid = s, this.lastPointersCount_ = i.length, e.originalEvent.preventDefault();
  }
  /**
   * Handle pointer up events.
   * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
   * @return {boolean} If the event was consumed.
   */
  handleUpEvent(e) {
    const n = e.map, i = n.getView();
    if (this.targetPointers.length === 0) {
      if (!this.noKinetic_ && this.kinetic_ && this.kinetic_.end()) {
        const s = this.kinetic_.getDistance(), r = this.kinetic_.getAngle(), o = i.getCenterInternal(), a = n.getPixelFromCoordinateInternal(o), l = n.getCoordinateFromPixelInternal([
          a[0] - s * Math.cos(r),
          a[1] - s * Math.sin(r)
        ]);
        i.animateInternal({
          center: i.getConstrainedCenter(l),
          duration: 500,
          easing: Ti
        });
      }
      return this.panning_ && (this.panning_ = !1, i.endInteraction()), !1;
    }
    return this.kinetic_ && this.kinetic_.begin(), this.lastCentroid = null, !0;
  }
  /**
   * Handle pointer down events.
   * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
   * @return {boolean} If the event was consumed.
   */
  handleDownEvent(e) {
    if (this.targetPointers.length > 0 && this.condition_(e)) {
      const i = e.map.getView();
      return this.lastCentroid = null, i.getAnimating() && i.cancelAnimations(), this.kinetic_ && this.kinetic_.begin(), this.noKinetic_ = this.targetPointers.length > 1, !0;
    }
    return !1;
  }
}
const j_ = Y_;
class U_ extends Is {
  /**
   * @param {Options} [options] Options.
   */
  constructor(e) {
    e = e || {}, super({
      stopDown: yr
    }), this.condition_ = e.condition ? e.condition : G_, this.lastAngle_ = void 0, this.duration_ = e.duration !== void 0 ? e.duration : 250;
  }
  /**
   * Handle pointer drag events.
   * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
   */
  handleDragEvent(e) {
    if (!_o(e))
      return;
    const n = e.map, i = n.getView();
    if (i.getConstraints().rotation === ga)
      return;
    const s = n.getSize(), r = e.pixel, o = Math.atan2(s[1] / 2 - r[1], r[0] - s[0] / 2);
    if (this.lastAngle_ !== void 0) {
      const a = o - this.lastAngle_;
      i.adjustRotationInternal(-a);
    }
    this.lastAngle_ = o;
  }
  /**
   * Handle pointer up events.
   * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
   * @return {boolean} If the event was consumed.
   */
  handleUpEvent(e) {
    return _o(e) ? (e.map.getView().endInteraction(this.duration_), !1) : !0;
  }
  /**
   * Handle pointer down events.
   * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
   * @return {boolean} If the event was consumed.
   */
  handleDownEvent(e) {
    return _o(e) && dh(e) && this.condition_(e) ? (e.map.getView().beginInteraction(), this.lastAngle_ = void 0, !0) : !1;
  }
}
const Z_ = U_;
class K_ extends ta {
  /**
   * @param {string} className CSS class name.
   */
  constructor(e) {
    super(), this.geometry_ = null, this.element_ = document.createElement("div"), this.element_.style.position = "absolute", this.element_.style.pointerEvents = "auto", this.element_.className = "ol-box " + e, this.map_ = null, this.startPixel_ = null, this.endPixel_ = null;
  }
  /**
   * Clean up.
   */
  disposeInternal() {
    this.setMap(null);
  }
  /**
   * @private
   */
  render_() {
    const e = this.startPixel_, n = this.endPixel_, i = "px", s = this.element_.style;
    s.left = Math.min(e[0], n[0]) + i, s.top = Math.min(e[1], n[1]) + i, s.width = Math.abs(n[0] - e[0]) + i, s.height = Math.abs(n[1] - e[1]) + i;
  }
  /**
   * @param {import("../Map.js").default|null} map Map.
   */
  setMap(e) {
    if (this.map_) {
      this.map_.getOverlayContainer().removeChild(this.element_);
      const n = this.element_.style;
      n.left = "inherit", n.top = "inherit", n.width = "inherit", n.height = "inherit";
    }
    this.map_ = e, this.map_ && this.map_.getOverlayContainer().appendChild(this.element_);
  }
  /**
   * @param {import("../pixel.js").Pixel} startPixel Start pixel.
   * @param {import("../pixel.js").Pixel} endPixel End pixel.
   */
  setPixels(e, n) {
    this.startPixel_ = e, this.endPixel_ = n, this.createOrUpdateGeometry(), this.render_();
  }
  /**
   * Creates or updates the cached geometry.
   */
  createOrUpdateGeometry() {
    const e = this.startPixel_, n = this.endPixel_, s = [
      e,
      [e[0], n[1]],
      n,
      [n[0], e[1]]
    ].map(
      this.map_.getCoordinateFromPixelInternal,
      this.map_
    );
    s[4] = s[0].slice(), this.geometry_ ? this.geometry_.setCoordinates([s]) : this.geometry_ = new ss([s]);
  }
  /**
   * @return {import("../geom/Polygon.js").default} Geometry.
   */
  getGeometry() {
    return this.geometry_;
  }
}
const H_ = K_, Ys = {
  /**
   * Triggered upon drag box start.
   * @event DragBoxEvent#boxstart
   * @api
   */
  BOXSTART: "boxstart",
  /**
   * Triggered on drag when box is active.
   * @event DragBoxEvent#boxdrag
   * @api
   */
  BOXDRAG: "boxdrag",
  /**
   * Triggered upon drag box end.
   * @event DragBoxEvent#boxend
   * @api
   */
  BOXEND: "boxend",
  /**
   * Triggered upon drag box canceled.
   * @event DragBoxEvent#boxcancel
   * @api
   */
  BOXCANCEL: "boxcancel"
};
class vo extends sn {
  /**
   * @param {string} type The event type.
   * @param {import("../coordinate.js").Coordinate} coordinate The event coordinate.
   * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Originating event.
   */
  constructor(e, n, i) {
    super(e), this.coordinate = n, this.mapBrowserEvent = i;
  }
}
class q_ extends Is {
  /**
   * @param {Options} [options] Options.
   */
  constructor(e) {
    super(), this.on, this.once, this.un, e = e || {}, this.box_ = new H_(e.className || "ol-dragbox"), this.minArea_ = e.minArea !== void 0 ? e.minArea : 64, e.onBoxEnd && (this.onBoxEnd = e.onBoxEnd), this.startPixel_ = null, this.condition_ = e.condition ? e.condition : dh, this.boxEndCondition_ = e.boxEndCondition ? e.boxEndCondition : this.defaultBoxEndCondition;
  }
  /**
   * The default condition for determining whether the boxend event
   * should fire.
   * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent The originating MapBrowserEvent
   *     leading to the box end.
   * @param {import("../pixel.js").Pixel} startPixel The starting pixel of the box.
   * @param {import("../pixel.js").Pixel} endPixel The end pixel of the box.
   * @return {boolean} Whether or not the boxend condition should be fired.
   */
  defaultBoxEndCondition(e, n, i) {
    const s = i[0] - n[0], r = i[1] - n[1];
    return s * s + r * r >= this.minArea_;
  }
  /**
   * Returns geometry of last drawn box.
   * @return {import("../geom/Polygon.js").default} Geometry.
   * @api
   */
  getGeometry() {
    return this.box_.getGeometry();
  }
  /**
   * Handle pointer drag events.
   * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
   */
  handleDragEvent(e) {
    this.box_.setPixels(this.startPixel_, e.pixel), this.dispatchEvent(
      new vo(
        Ys.BOXDRAG,
        e.coordinate,
        e
      )
    );
  }
  /**
   * Handle pointer up events.
   * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
   * @return {boolean} If the event was consumed.
   */
  handleUpEvent(e) {
    this.box_.setMap(null);
    const n = this.boxEndCondition_(
      e,
      this.startPixel_,
      e.pixel
    );
    return n && this.onBoxEnd(e), this.dispatchEvent(
      new vo(
        n ? Ys.BOXEND : Ys.BOXCANCEL,
        e.coordinate,
        e
      )
    ), !1;
  }
  /**
   * Handle pointer down events.
   * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
   * @return {boolean} If the event was consumed.
   */
  handleDownEvent(e) {
    return this.condition_(e) ? (this.startPixel_ = e.pixel, this.box_.setMap(e.map), this.box_.setPixels(this.startPixel_, this.startPixel_), this.dispatchEvent(
      new vo(
        Ys.BOXSTART,
        e.coordinate,
        e
      )
    ), !0) : !1;
  }
  /**
   * Function to execute just before `onboxend` is fired
   * @param {import("../MapBrowserEvent.js").default} event Event.
   */
  onBoxEnd(e) {
  }
}
const J_ = q_;
class Q_ extends J_ {
  /**
   * @param {Options} [options] Options.
   */
  constructor(e) {
    e = e || {};
    const n = e.condition ? e.condition : W_;
    super({
      condition: n,
      className: e.className || "ol-dragzoom",
      minArea: e.minArea
    }), this.duration_ = e.duration !== void 0 ? e.duration : 200, this.out_ = e.out !== void 0 ? e.out : !1;
  }
  /**
   * Function to execute just before `onboxend` is fired
   * @param {import("../MapBrowserEvent.js").default} event Event.
   */
  onBoxEnd(e) {
    const i = (
      /** @type {!import("../View.js").default} */
      this.getMap().getView()
    );
    let s = this.getGeometry();
    if (this.out_) {
      const r = i.rotatedExtentForGeometry(s), o = i.getResolutionForExtentInternal(r), a = i.getResolution() / o;
      s = s.clone(), s.scale(a * a);
    }
    i.fitInternal(s, {
      duration: this.duration_,
      easing: Ti
    });
  }
}
const ev = Q_, Pn = {
  LEFT: "ArrowLeft",
  UP: "ArrowUp",
  RIGHT: "ArrowRight",
  DOWN: "ArrowDown"
};
class tv extends bs {
  /**
   * @param {Options} [options] Options.
   */
  constructor(e) {
    super(), e = e || {}, this.defaultCondition_ = function(n) {
      return fh(n) && gh(n);
    }, this.condition_ = e.condition !== void 0 ? e.condition : this.defaultCondition_, this.duration_ = e.duration !== void 0 ? e.duration : 100, this.pixelDelta_ = e.pixelDelta !== void 0 ? e.pixelDelta : 128;
  }
  /**
   * Handles the {@link module:ol/MapBrowserEvent~MapBrowserEvent map browser event} if it was a
   * `KeyEvent`, and decides the direction to pan to (if an arrow key was
   * pressed).
   * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Map browser event.
   * @return {boolean} `false` to stop event propagation.
   */
  handleEvent(e) {
    let n = !1;
    if (e.type == H.KEYDOWN) {
      const i = (
        /** @type {KeyboardEvent} */
        e.originalEvent
      ), s = i.key;
      if (this.condition_(e) && (s == Pn.DOWN || s == Pn.LEFT || s == Pn.RIGHT || s == Pn.UP)) {
        const o = e.map.getView(), a = o.getResolution() * this.pixelDelta_;
        let l = 0, u = 0;
        s == Pn.DOWN ? u = -a : s == Pn.LEFT ? l = -a : s == Pn.RIGHT ? l = a : u = a;
        const c = [l, u];
        la(c, o.getRotation()), D_(o, c, this.duration_), i.preventDefault(), n = !0;
      }
    }
    return !n;
  }
}
const nv = tv;
class iv extends bs {
  /**
   * @param {Options} [options] Options.
   */
  constructor(e) {
    super(), e = e || {}, this.condition_ = e.condition ? e.condition : function(n) {
      return !$_(n) && gh(n);
    }, this.delta_ = e.delta ? e.delta : 1, this.duration_ = e.duration !== void 0 ? e.duration : 100;
  }
  /**
   * Handles the {@link module:ol/MapBrowserEvent~MapBrowserEvent map browser event} if it was a
   * `KeyEvent`, and decides whether to zoom in or out (depending on whether the
   * key pressed was '+' or '-').
   * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Map browser event.
   * @return {boolean} `false` to stop event propagation.
   */
  handleEvent(e) {
    let n = !1;
    if (e.type == H.KEYDOWN || e.type == H.KEYPRESS) {
      const i = (
        /** @type {KeyboardEvent} */
        e.originalEvent
      ), s = i.key;
      if (this.condition_(e) && (s === "+" || s === "-")) {
        const r = e.map, o = s === "+" ? this.delta_ : -this.delta_, a = r.getView();
        Ga(a, o, void 0, this.duration_), i.preventDefault(), n = !0;
      }
    }
    return !n;
  }
}
const sv = iv;
class rv {
  /**
   * @param {number} decay Rate of decay (must be negative).
   * @param {number} minVelocity Minimum velocity (pixels/millisecond).
   * @param {number} delay Delay to consider to calculate the kinetic
   *     initial values (milliseconds).
   */
  constructor(e, n, i) {
    this.decay_ = e, this.minVelocity_ = n, this.delay_ = i, this.points_ = [], this.angle_ = 0, this.initialVelocity_ = 0;
  }
  /**
   * FIXME empty description for jsdoc
   */
  begin() {
    this.points_.length = 0, this.angle_ = 0, this.initialVelocity_ = 0;
  }
  /**
   * @param {number} x X.
   * @param {number} y Y.
   */
  update(e, n) {
    this.points_.push(e, n, Date.now());
  }
  /**
   * @return {boolean} Whether we should do kinetic animation.
   */
  end() {
    if (this.points_.length < 6)
      return !1;
    const e = Date.now() - this.delay_, n = this.points_.length - 3;
    if (this.points_[n + 2] < e)
      return !1;
    let i = n - 3;
    for (; i > 0 && this.points_[i + 2] > e; )
      i -= 3;
    const s = this.points_[n + 2] - this.points_[i + 2];
    if (s < 1e3 / 60)
      return !1;
    const r = this.points_[n] - this.points_[i], o = this.points_[n + 1] - this.points_[i + 1];
    return this.angle_ = Math.atan2(o, r), this.initialVelocity_ = Math.sqrt(r * r + o * o) / s, this.initialVelocity_ > this.minVelocity_;
  }
  /**
   * @return {number} Total distance travelled (pixels).
   */
  getDistance() {
    return (this.minVelocity_ - this.initialVelocity_) / this.decay_;
  }
  /**
   * @return {number} Angle of the kinetic panning animation (radians).
   */
  getAngle() {
    return this.angle_;
  }
}
const ov = rv;
class av extends bs {
  /**
   * @param {Options} [options] Options.
   */
  constructor(e) {
    e = e || {}, super(
      /** @type {import("./Interaction.js").InteractionOptions} */
      e
    ), this.totalDelta_ = 0, this.lastDelta_ = 0, this.maxDelta_ = e.maxDelta !== void 0 ? e.maxDelta : 1, this.duration_ = e.duration !== void 0 ? e.duration : 250, this.timeout_ = e.timeout !== void 0 ? e.timeout : 80, this.useAnchor_ = e.useAnchor !== void 0 ? e.useAnchor : !0, this.constrainResolution_ = e.constrainResolution !== void 0 ? e.constrainResolution : !1;
    const n = e.condition ? e.condition : B_;
    this.condition_ = e.onFocusOnly ? Bo(hh, n) : n, this.lastAnchor_ = null, this.startTime_ = void 0, this.timeoutId_, this.mode_ = void 0, this.trackpadEventGap_ = 400, this.trackpadTimeoutId_, this.deltaPerZoom_ = 300;
  }
  /**
   * @private
   */
  endInteraction_() {
    this.trackpadTimeoutId_ = void 0;
    const e = this.getMap();
    if (!e)
      return;
    e.getView().endInteraction(
      void 0,
      this.lastDelta_ ? this.lastDelta_ > 0 ? 1 : -1 : 0,
      this.lastAnchor_
    );
  }
  /**
   * Handles the {@link module:ol/MapBrowserEvent~MapBrowserEvent map browser event} (if it was a mousewheel-event) and eventually
   * zooms the map.
   * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Map browser event.
   * @return {boolean} `false` to stop event propagation.
   */
  handleEvent(e) {
    if (!this.condition_(e) || e.type !== H.WHEEL)
      return !0;
    const i = e.map, s = (
      /** @type {WheelEvent} */
      e.originalEvent
    );
    s.preventDefault(), this.useAnchor_ && (this.lastAnchor_ = e.coordinate);
    let r;
    if (e.type == H.WHEEL && (r = s.deltaY, nm && s.deltaMode === WheelEvent.DOM_DELTA_PIXEL && (r /= Yc), s.deltaMode === WheelEvent.DOM_DELTA_LINE && (r *= 40)), r === 0)
      return !1;
    this.lastDelta_ = r;
    const o = Date.now();
    this.startTime_ === void 0 && (this.startTime_ = o), (!this.mode_ || o - this.startTime_ > this.trackpadEventGap_) && (this.mode_ = Math.abs(r) < 4 ? "trackpad" : "wheel");
    const a = i.getView();
    if (this.mode_ === "trackpad" && !(a.getConstrainResolution() || this.constrainResolution_))
      return this.trackpadTimeoutId_ ? clearTimeout(this.trackpadTimeoutId_) : (a.getAnimating() && a.cancelAnimations(), a.beginInteraction()), this.trackpadTimeoutId_ = setTimeout(
        this.endInteraction_.bind(this),
        this.timeout_
      ), a.adjustZoom(-r / this.deltaPerZoom_, this.lastAnchor_), this.startTime_ = o, !1;
    this.totalDelta_ += r;
    const l = Math.max(this.timeout_ - (o - this.startTime_), 0);
    return clearTimeout(this.timeoutId_), this.timeoutId_ = setTimeout(
      this.handleWheelZoom_.bind(this, i),
      l
    ), !1;
  }
  /**
   * @private
   * @param {import("../Map.js").default} map Map.
   */
  handleWheelZoom_(e) {
    const n = e.getView();
    n.getAnimating() && n.cancelAnimations();
    let i = -Re(
      this.totalDelta_,
      -this.maxDelta_ * this.deltaPerZoom_,
      this.maxDelta_ * this.deltaPerZoom_
    ) / this.deltaPerZoom_;
    (n.getConstrainResolution() || this.constrainResolution_) && (i = i ? i > 0 ? 1 : -1 : 0), Ga(n, i, this.lastAnchor_, this.duration_), this.mode_ = void 0, this.totalDelta_ = 0, this.lastAnchor_ = null, this.startTime_ = void 0, this.timeoutId_ = void 0;
  }
  /**
   * Enable or disable using the mouse's location as an anchor when zooming
   * @param {boolean} useAnchor true to zoom to the mouse's location, false
   * to zoom to the center of the map
   * @api
   */
  setMouseAnchor(e) {
    this.useAnchor_ = e, e || (this.lastAnchor_ = null);
  }
}
const lv = av;
class uv extends Is {
  /**
   * @param {Options} [options] Options.
   */
  constructor(e) {
    e = e || {};
    const n = (
      /** @type {import("./Pointer.js").Options} */
      e
    );
    n.stopDown || (n.stopDown = yr), super(n), this.anchor_ = null, this.lastAngle_ = void 0, this.rotating_ = !1, this.rotationDelta_ = 0, this.threshold_ = e.threshold !== void 0 ? e.threshold : 0.3, this.duration_ = e.duration !== void 0 ? e.duration : 250;
  }
  /**
   * Handle pointer drag events.
   * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
   */
  handleDragEvent(e) {
    let n = 0;
    const i = this.targetPointers[0], s = this.targetPointers[1], r = Math.atan2(
      s.clientY - i.clientY,
      s.clientX - i.clientX
    );
    if (this.lastAngle_ !== void 0) {
      const l = r - this.lastAngle_;
      this.rotationDelta_ += l, !this.rotating_ && Math.abs(this.rotationDelta_) > this.threshold_ && (this.rotating_ = !0), n = l;
    }
    this.lastAngle_ = r;
    const o = e.map, a = o.getView();
    a.getConstraints().rotation !== ga && (this.anchor_ = o.getCoordinateFromPixelInternal(
      o.getEventPixel(za(this.targetPointers))
    ), this.rotating_ && (o.render(), a.adjustRotationInternal(n, this.anchor_)));
  }
  /**
   * Handle pointer up events.
   * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
   * @return {boolean} If the event was consumed.
   */
  handleUpEvent(e) {
    return this.targetPointers.length < 2 ? (e.map.getView().endInteraction(this.duration_), !1) : !0;
  }
  /**
   * Handle pointer down events.
   * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
   * @return {boolean} If the event was consumed.
   */
  handleDownEvent(e) {
    if (this.targetPointers.length >= 2) {
      const n = e.map;
      return this.anchor_ = null, this.lastAngle_ = void 0, this.rotating_ = !1, this.rotationDelta_ = 0, this.handlingDownUpSequence || n.getView().beginInteraction(), !0;
    }
    return !1;
  }
}
const cv = uv;
class hv extends Is {
  /**
   * @param {Options} [options] Options.
   */
  constructor(e) {
    e = e || {};
    const n = (
      /** @type {import("./Pointer.js").Options} */
      e
    );
    n.stopDown || (n.stopDown = yr), super(n), this.anchor_ = null, this.duration_ = e.duration !== void 0 ? e.duration : 400, this.lastDistance_ = void 0, this.lastScaleDelta_ = 1;
  }
  /**
   * Handle pointer drag events.
   * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
   */
  handleDragEvent(e) {
    let n = 1;
    const i = this.targetPointers[0], s = this.targetPointers[1], r = i.clientX - s.clientX, o = i.clientY - s.clientY, a = Math.sqrt(r * r + o * o);
    this.lastDistance_ !== void 0 && (n = this.lastDistance_ / a), this.lastDistance_ = a;
    const l = e.map, u = l.getView();
    n != 1 && (this.lastScaleDelta_ = n), this.anchor_ = l.getCoordinateFromPixelInternal(
      l.getEventPixel(za(this.targetPointers))
    ), l.render(), u.adjustResolutionInternal(n, this.anchor_);
  }
  /**
   * Handle pointer up events.
   * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
   * @return {boolean} If the event was consumed.
   */
  handleUpEvent(e) {
    if (this.targetPointers.length < 2) {
      const i = e.map.getView(), s = this.lastScaleDelta_ > 1 ? 1 : -1;
      return i.endInteraction(this.duration_, s), !1;
    }
    return !0;
  }
  /**
   * Handle pointer down events.
   * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
   * @return {boolean} If the event was consumed.
   */
  handleDownEvent(e) {
    if (this.targetPointers.length >= 2) {
      const n = e.map;
      return this.anchor_ = null, this.lastDistance_ = void 0, this.lastScaleDelta_ = 1, this.handlingDownUpSequence || n.getView().beginInteraction(), !0;
    }
    return !1;
  }
}
const dv = hv;
function fv(t) {
  t = t || {};
  const e = new Lt(), n = new ov(-5e-3, 0.05, 100);
  return (t.altShiftDragRotate !== void 0 ? t.altShiftDragRotate : !0) && e.push(new Z_()), (t.doubleClickZoom !== void 0 ? t.doubleClickZoom : !0) && e.push(
    new N_({
      delta: t.zoomDelta,
      duration: t.zoomDuration
    })
  ), (t.dragPan !== void 0 ? t.dragPan : !0) && e.push(
    new j_({
      onFocusOnly: t.onFocusOnly,
      kinetic: n
    })
  ), (t.pinchRotate !== void 0 ? t.pinchRotate : !0) && e.push(new cv()), (t.pinchZoom !== void 0 ? t.pinchZoom : !0) && e.push(
    new dv({
      duration: t.zoomDuration
    })
  ), (t.keyboard !== void 0 ? t.keyboard : !0) && (e.push(new nv()), e.push(
    new sv({
      delta: t.zoomDelta,
      duration: t.zoomDuration
    })
  )), (t.mouseWheelZoom !== void 0 ? t.mouseWheelZoom : !0) && e.push(
    new lv({
      onFocusOnly: t.onFocusOnly,
      duration: t.zoomDuration
    })
  ), (t.shiftDragZoom !== void 0 ? t.shiftDragZoom : !0) && e.push(
    new ev({
      duration: t.zoomDuration
    })
  ), e;
}
function mh(t) {
  if (t instanceof Tr) {
    t.setMapInternal(null);
    return;
  }
  t instanceof Or && t.getLayers().forEach(mh);
}
function _h(t, e) {
  if (t instanceof Tr) {
    t.setMapInternal(e);
    return;
  }
  if (t instanceof Or) {
    const n = t.getLayers().getArray();
    for (let i = 0, s = n.length; i < s; ++i)
      _h(n[i], e);
  }
}
let gv = class extends Nt {
  /**
   * @param {MapOptions} [options] Map options.
   */
  constructor(e) {
    super(), e = e || {}, this.on, this.once, this.un;
    const n = mv(e);
    this.renderComplete_, this.loaded_ = !0, this.boundHandleBrowserEvent_ = this.handleBrowserEvent.bind(this), this.maxTilesLoading_ = e.maxTilesLoading !== void 0 ? e.maxTilesLoading : 16, this.pixelRatio_ = e.pixelRatio !== void 0 ? e.pixelRatio : Yc, this.postRenderTimeoutHandle_, this.animationDelayKey_, this.animationDelay_ = this.animationDelay_.bind(this), this.coordinateToPixelTransform_ = Ct(), this.pixelToCoordinateTransform_ = Ct(), this.frameIndex_ = 0, this.frameState_ = null, this.previousExtent_ = null, this.viewPropertyListenerKey_ = null, this.viewChangeListenerKey_ = null, this.layerGroupPropertyListenerKeys_ = null, this.viewport_ = document.createElement("div"), this.viewport_.className = "ol-viewport" + ("ontouchstart" in window ? " ol-touch" : ""), this.viewport_.style.position = "relative", this.viewport_.style.overflow = "hidden", this.viewport_.style.width = "100%", this.viewport_.style.height = "100%", this.overlayContainer_ = document.createElement("div"), this.overlayContainer_.style.position = "absolute", this.overlayContainer_.style.zIndex = "0", this.overlayContainer_.style.width = "100%", this.overlayContainer_.style.height = "100%", this.overlayContainer_.style.pointerEvents = "none", this.overlayContainer_.className = "ol-overlaycontainer", this.viewport_.appendChild(this.overlayContainer_), this.overlayContainerStopEvent_ = document.createElement("div"), this.overlayContainerStopEvent_.style.position = "absolute", this.overlayContainerStopEvent_.style.zIndex = "0", this.overlayContainerStopEvent_.style.width = "100%", this.overlayContainerStopEvent_.style.height = "100%", this.overlayContainerStopEvent_.style.pointerEvents = "none", this.overlayContainerStopEvent_.className = "ol-overlaycontainer-stopevent", this.viewport_.appendChild(this.overlayContainerStopEvent_), this.mapBrowserEventHandler_ = null, this.moveTolerance_ = e.moveTolerance, this.keyboardEventTarget_ = n.keyboardEventTarget, this.targetChangeHandlerKeys_ = null, this.targetElement_ = null, this.resizeObserver_ = new ResizeObserver(() => this.updateSize()), this.controls = n.controls || k_(), this.interactions = n.interactions || fv({
      onFocusOnly: !0
    }), this.overlays_ = n.overlays, this.overlayIdIndex_ = {}, this.renderer_ = null, this.postRenderFunctions_ = [], this.tileQueue_ = new S_(
      this.getTilePriority.bind(this),
      this.handleTileChange_.bind(this)
    ), this.addChangeListener(
      Ne.LAYERGROUP,
      this.handleLayerGroupChanged_
    ), this.addChangeListener(Ne.VIEW, this.handleViewChanged_), this.addChangeListener(Ne.SIZE, this.handleSizeChanged_), this.addChangeListener(Ne.TARGET, this.handleTargetChanged_), this.setProperties(n.values);
    const i = this;
    e.view && !(e.view instanceof Tt) && e.view.then(function(s) {
      i.setView(new Tt(s));
    }), this.controls.addEventListener(
      Ke.ADD,
      /**
       * @param {import("./Collection.js").CollectionEvent<import("./control/Control.js").default>} event CollectionEvent
       */
      (s) => {
        s.element.setMap(this);
      }
    ), this.controls.addEventListener(
      Ke.REMOVE,
      /**
       * @param {import("./Collection.js").CollectionEvent<import("./control/Control.js").default>} event CollectionEvent.
       */
      (s) => {
        s.element.setMap(null);
      }
    ), this.interactions.addEventListener(
      Ke.ADD,
      /**
       * @param {import("./Collection.js").CollectionEvent<import("./interaction/Interaction.js").default>} event CollectionEvent.
       */
      (s) => {
        s.element.setMap(this);
      }
    ), this.interactions.addEventListener(
      Ke.REMOVE,
      /**
       * @param {import("./Collection.js").CollectionEvent<import("./interaction/Interaction.js").default>} event CollectionEvent.
       */
      (s) => {
        s.element.setMap(null);
      }
    ), this.overlays_.addEventListener(
      Ke.ADD,
      /**
       * @param {import("./Collection.js").CollectionEvent<import("./Overlay.js").default>} event CollectionEvent.
       */
      (s) => {
        this.addOverlayInternal_(s.element);
      }
    ), this.overlays_.addEventListener(
      Ke.REMOVE,
      /**
       * @param {import("./Collection.js").CollectionEvent<import("./Overlay.js").default>} event CollectionEvent.
       */
      (s) => {
        const r = s.element.getId();
        r !== void 0 && delete this.overlayIdIndex_[r.toString()], s.element.setMap(null);
      }
    ), this.controls.forEach(
      /**
       * @param {import("./control/Control.js").default} control Control.
       */
      (s) => {
        s.setMap(this);
      }
    ), this.interactions.forEach(
      /**
       * @param {import("./interaction/Interaction.js").default} interaction Interaction.
       */
      (s) => {
        s.setMap(this);
      }
    ), this.overlays_.forEach(this.addOverlayInternal_.bind(this));
  }
  /**
   * Add the given control to the map.
   * @param {import("./control/Control.js").default} control Control.
   * @api
   */
  addControl(e) {
    this.getControls().push(e);
  }
  /**
   * Add the given interaction to the map. If you want to add an interaction
   * at another point of the collection use `getInteractions()` and the methods
   * available on {@link module:ol/Collection~Collection}. This can be used to
   * stop the event propagation from the handleEvent function. The interactions
   * get to handle the events in the reverse order of this collection.
   * @param {import("./interaction/Interaction.js").default} interaction Interaction to add.
   * @api
   */
  addInteraction(e) {
    this.getInteractions().push(e);
  }
  /**
   * Adds the given layer to the top of this map. If you want to add a layer
   * elsewhere in the stack, use `getLayers()` and the methods available on
   * {@link module:ol/Collection~Collection}.
   * @param {import("./layer/Base.js").default} layer Layer.
   * @api
   */
  addLayer(e) {
    this.getLayerGroup().getLayers().push(e);
  }
  /**
   * @param {import("./layer/Group.js").GroupEvent} event The layer add event.
   * @private
   */
  handleLayerAdd_(e) {
    _h(e.layer, this);
  }
  /**
   * Add the given overlay to the map.
   * @param {import("./Overlay.js").default} overlay Overlay.
   * @api
   */
  addOverlay(e) {
    this.getOverlays().push(e);
  }
  /**
   * This deals with map's overlay collection changes.
   * @param {import("./Overlay.js").default} overlay Overlay.
   * @private
   */
  addOverlayInternal_(e) {
    const n = e.getId();
    n !== void 0 && (this.overlayIdIndex_[n.toString()] = e), e.setMap(this);
  }
  /**
   *
   * Clean up.
   */
  disposeInternal() {
    this.controls.clear(), this.interactions.clear(), this.overlays_.clear(), this.resizeObserver_.disconnect(), this.setTarget(null), super.disposeInternal();
  }
  /**
   * Detect features that intersect a pixel on the viewport, and execute a
   * callback with each intersecting feature. Layers included in the detection can
   * be configured through the `layerFilter` option in `options`.
   * @param {import("./pixel.js").Pixel} pixel Pixel.
   * @param {function(import("./Feature.js").FeatureLike, import("./layer/Layer.js").default<import("./source/Source").default>, import("./geom/SimpleGeometry.js").default): T} callback Feature callback. The callback will be
   *     called with two arguments. The first argument is one
   *     {@link module:ol/Feature~Feature feature} or
   *     {@link module:ol/render/Feature~RenderFeature render feature} at the pixel, the second is
   *     the {@link module:ol/layer/Layer~Layer layer} of the feature and will be null for
   *     unmanaged layers. To stop detection, callback functions can return a
   *     truthy value.
   * @param {AtPixelOptions} [options] Optional options.
   * @return {T|undefined} Callback result, i.e. the return value of last
   * callback execution, or the first truthy callback return value.
   * @template T
   * @api
   */
  forEachFeatureAtPixel(e, n, i) {
    if (!this.frameState_ || !this.renderer_)
      return;
    const s = this.getCoordinateFromPixelInternal(e);
    i = i !== void 0 ? i : {};
    const r = i.hitTolerance !== void 0 ? i.hitTolerance : 0, o = i.layerFilter !== void 0 ? i.layerFilter : ts, a = i.checkWrapped !== !1;
    return this.renderer_.forEachFeatureAtCoordinate(
      s,
      this.frameState_,
      r,
      a,
      n,
      null,
      o,
      null
    );
  }
  /**
   * Get all features that intersect a pixel on the viewport.
   * @param {import("./pixel.js").Pixel} pixel Pixel.
   * @param {AtPixelOptions} [options] Optional options.
   * @return {Array<import("./Feature.js").FeatureLike>} The detected features or
   * an empty array if none were found.
   * @api
   */
  getFeaturesAtPixel(e, n) {
    const i = [];
    return this.forEachFeatureAtPixel(
      e,
      function(s) {
        i.push(s);
      },
      n
    ), i;
  }
  /**
   * Get all layers from all layer groups.
   * @return {Array<import("./layer/Layer.js").default>} Layers.
   * @api
   */
  getAllLayers() {
    const e = [];
    function n(i) {
      i.forEach(function(s) {
        s instanceof Or ? n(s.getLayers()) : e.push(s);
      });
    }
    return n(this.getLayers()), e;
  }
  /**
   * Detect if features intersect a pixel on the viewport. Layers included in the
   * detection can be configured through the `layerFilter` option.
   * @param {import("./pixel.js").Pixel} pixel Pixel.
   * @param {AtPixelOptions} [options] Optional options.
   * @return {boolean} Is there a feature at the given pixel?
   * @api
   */
  hasFeatureAtPixel(e, n) {
    if (!this.frameState_ || !this.renderer_)
      return !1;
    const i = this.getCoordinateFromPixelInternal(e);
    n = n !== void 0 ? n : {};
    const s = n.layerFilter !== void 0 ? n.layerFilter : ts, r = n.hitTolerance !== void 0 ? n.hitTolerance : 0, o = n.checkWrapped !== !1;
    return this.renderer_.hasFeatureAtCoordinate(
      i,
      this.frameState_,
      r,
      o,
      s,
      null
    );
  }
  /**
   * Returns the coordinate in user projection for a browser event.
   * @param {MouseEvent} event Event.
   * @return {import("./coordinate.js").Coordinate} Coordinate.
   * @api
   */
  getEventCoordinate(e) {
    return this.getCoordinateFromPixel(this.getEventPixel(e));
  }
  /**
   * Returns the coordinate in view projection for a browser event.
   * @param {MouseEvent} event Event.
   * @return {import("./coordinate.js").Coordinate} Coordinate.
   */
  getEventCoordinateInternal(e) {
    return this.getCoordinateFromPixelInternal(this.getEventPixel(e));
  }
  /**
   * Returns the map pixel position for a browser event relative to the viewport.
   * @param {UIEvent|{clientX: number, clientY: number}} event Event.
   * @return {import("./pixel.js").Pixel} Pixel.
   * @api
   */
  getEventPixel(e) {
    const i = this.viewport_.getBoundingClientRect(), s = this.getSize(), r = i.width / s[0], o = i.height / s[1], a = (
      //FIXME Are we really calling this with a TouchEvent anywhere?
      "changedTouches" in e ? (
        /** @type {TouchEvent} */
        e.changedTouches[0]
      ) : (
        /** @type {MouseEvent} */
        e
      )
    );
    return [
      (a.clientX - i.left) / r,
      (a.clientY - i.top) / o
    ];
  }
  /**
   * Get the target in which this map is rendered.
   * Note that this returns what is entered as an option or in setTarget:
   * if that was an element, it returns an element; if a string, it returns that.
   * @return {HTMLElement|string|undefined} The Element or id of the Element that the
   *     map is rendered in.
   * @observable
   * @api
   */
  getTarget() {
    return (
      /** @type {HTMLElement|string|undefined} */
      this.get(Ne.TARGET)
    );
  }
  /**
   * Get the DOM element into which this map is rendered. In contrast to
   * `getTarget` this method always return an `Element`, or `null` if the
   * map has no target.
   * @return {HTMLElement} The element that the map is rendered in.
   * @api
   */
  getTargetElement() {
    return this.targetElement_;
  }
  /**
   * Get the coordinate for a given pixel.  This returns a coordinate in the
   * user projection.
   * @param {import("./pixel.js").Pixel} pixel Pixel position in the map viewport.
   * @return {import("./coordinate.js").Coordinate} The coordinate for the pixel position.
   * @api
   */
  getCoordinateFromPixel(e) {
    return ko(
      this.getCoordinateFromPixelInternal(e),
      this.getView().getProjection()
    );
  }
  /**
   * Get the coordinate for a given pixel.  This returns a coordinate in the
   * map view projection.
   * @param {import("./pixel.js").Pixel} pixel Pixel position in the map viewport.
   * @return {import("./coordinate.js").Coordinate} The coordinate for the pixel position.
   */
  getCoordinateFromPixelInternal(e) {
    const n = this.frameState_;
    return n ? Pe(n.pixelToCoordinateTransform, e.slice()) : null;
  }
  /**
   * Get the map controls. Modifying this collection changes the controls
   * associated with the map.
   * @return {Collection<import("./control/Control.js").default>} Controls.
   * @api
   */
  getControls() {
    return this.controls;
  }
  /**
   * Get the map overlays. Modifying this collection changes the overlays
   * associated with the map.
   * @return {Collection<import("./Overlay.js").default>} Overlays.
   * @api
   */
  getOverlays() {
    return this.overlays_;
  }
  /**
   * Get an overlay by its identifier (the value returned by overlay.getId()).
   * Note that the index treats string and numeric identifiers as the same. So
   * `map.getOverlayById(2)` will return an overlay with id `'2'` or `2`.
   * @param {string|number} id Overlay identifier.
   * @return {import("./Overlay.js").default|null} Overlay.
   * @api
   */
  getOverlayById(e) {
    const n = this.overlayIdIndex_[e.toString()];
    return n !== void 0 ? n : null;
  }
  /**
   * Get the map interactions. Modifying this collection changes the interactions
   * associated with the map.
   *
   * Interactions are used for e.g. pan, zoom and rotate.
   * @return {Collection<import("./interaction/Interaction.js").default>} Interactions.
   * @api
   */
  getInteractions() {
    return this.interactions;
  }
  /**
   * Get the layergroup associated with this map.
   * @return {LayerGroup} A layer group containing the layers in this map.
   * @observable
   * @api
   */
  getLayerGroup() {
    return (
      /** @type {LayerGroup} */
      this.get(Ne.LAYERGROUP)
    );
  }
  /**
   * Clear any existing layers and add layers to the map.
   * @param {Array<import("./layer/Base.js").default>|Collection<import("./layer/Base.js").default>} layers The layers to be added to the map.
   * @api
   */
  setLayers(e) {
    const n = this.getLayerGroup();
    if (e instanceof Lt) {
      n.setLayers(e);
      return;
    }
    const i = n.getLayers();
    i.clear(), i.extend(e);
  }
  /**
   * Get the collection of layers associated with this map.
   * @return {!Collection<import("./layer/Base.js").default>} Layers.
   * @api
   */
  getLayers() {
    return this.getLayerGroup().getLayers();
  }
  /**
   * @return {boolean} Layers have sources that are still loading.
   */
  getLoadingOrNotReady() {
    const e = this.getLayerGroup().getLayerStatesArray();
    for (let n = 0, i = e.length; n < i; ++n) {
      const s = e[n];
      if (!s.visible)
        continue;
      const r = s.layer.getRenderer();
      if (r && !r.ready)
        return !0;
      const o = s.layer.getSource();
      if (o && o.loading)
        return !0;
    }
    return !1;
  }
  /**
   * Get the pixel for a coordinate.  This takes a coordinate in the user
   * projection and returns the corresponding pixel.
   * @param {import("./coordinate.js").Coordinate} coordinate A map coordinate.
   * @return {import("./pixel.js").Pixel} A pixel position in the map viewport.
   * @api
   */
  getPixelFromCoordinate(e) {
    const n = jt(
      e,
      this.getView().getProjection()
    );
    return this.getPixelFromCoordinateInternal(n);
  }
  /**
   * Get the pixel for a coordinate.  This takes a coordinate in the map view
   * projection and returns the corresponding pixel.
   * @param {import("./coordinate.js").Coordinate} coordinate A map coordinate.
   * @return {import("./pixel.js").Pixel} A pixel position in the map viewport.
   */
  getPixelFromCoordinateInternal(e) {
    const n = this.frameState_;
    return n ? Pe(
      n.coordinateToPixelTransform,
      e.slice(0, 2)
    ) : null;
  }
  /**
   * Get the map renderer.
   * @return {import("./renderer/Map.js").default|null} Renderer
   */
  getRenderer() {
    return this.renderer_;
  }
  /**
   * Get the size of this map.
   * @return {import("./size.js").Size|undefined} The size in pixels of the map in the DOM.
   * @observable
   * @api
   */
  getSize() {
    return (
      /** @type {import("./size.js").Size|undefined} */
      this.get(Ne.SIZE)
    );
  }
  /**
   * Get the view associated with this map. A view manages properties such as
   * center and resolution.
   * @return {View} The view that controls this map.
   * @observable
   * @api
   */
  getView() {
    return (
      /** @type {View} */
      this.get(Ne.VIEW)
    );
  }
  /**
   * Get the element that serves as the map viewport.
   * @return {HTMLElement} Viewport.
   * @api
   */
  getViewport() {
    return this.viewport_;
  }
  /**
   * Get the element that serves as the container for overlays.  Elements added to
   * this container will let mousedown and touchstart events through to the map,
   * so clicks and gestures on an overlay will trigger {@link module:ol/MapBrowserEvent~MapBrowserEvent}
   * events.
   * @return {!HTMLElement} The map's overlay container.
   */
  getOverlayContainer() {
    return this.overlayContainer_;
  }
  /**
   * Get the element that serves as a container for overlays that don't allow
   * event propagation. Elements added to this container won't let mousedown and
   * touchstart events through to the map, so clicks and gestures on an overlay
   * don't trigger any {@link module:ol/MapBrowserEvent~MapBrowserEvent}.
   * @return {!HTMLElement} The map's overlay container that stops events.
   */
  getOverlayContainerStopEvent() {
    return this.overlayContainerStopEvent_;
  }
  /**
   * @return {!Document} The document where the map is displayed.
   */
  getOwnerDocument() {
    const e = this.getTargetElement();
    return e ? e.ownerDocument : document;
  }
  /**
   * @param {import("./Tile.js").default} tile Tile.
   * @param {string} tileSourceKey Tile source key.
   * @param {import("./coordinate.js").Coordinate} tileCenter Tile center.
   * @param {number} tileResolution Tile resolution.
   * @return {number} Tile priority.
   */
  getTilePriority(e, n, i, s) {
    return b_(
      this.frameState_,
      e,
      n,
      i,
      s
    );
  }
  /**
   * @param {UIEvent} browserEvent Browser event.
   * @param {string} [type] Type.
   */
  handleBrowserEvent(e, n) {
    n = n || e.type;
    const i = new dn(n, this, e);
    this.handleMapBrowserEvent(i);
  }
  /**
   * @param {MapBrowserEvent} mapBrowserEvent The event to handle.
   */
  handleMapBrowserEvent(e) {
    if (!this.frameState_)
      return;
    const n = (
      /** @type {PointerEvent} */
      e.originalEvent
    ), i = n.type;
    if (i === zo.POINTERDOWN || i === H.WHEEL || i === H.KEYDOWN) {
      const s = this.getOwnerDocument(), r = this.viewport_.getRootNode ? this.viewport_.getRootNode() : s, o = (
        /** @type {Node} */
        n.target
      );
      if (
        // Abort if the target is a child of the container for elements whose events are not meant
        // to be handled by map interactions.
        this.overlayContainerStopEvent_.contains(o) || // Abort if the event target is a child of the container that is no longer in the page.
        // It's possible for the target to no longer be in the page if it has been removed in an
        // event listener, this might happen in a Control that recreates it's content based on
        // user interaction either manually or via a render in something like https://reactjs.org/
        !(r === s ? s.documentElement : r).contains(o)
      )
        return;
    }
    if (e.frameState = this.frameState_, this.dispatchEvent(e) !== !1) {
      const s = this.getInteractions().getArray().slice();
      for (let r = s.length - 1; r >= 0; r--) {
        const o = s[r];
        if (o.getMap() !== this || !o.getActive() || !this.getTargetElement())
          continue;
        if (!o.handleEvent(e) || e.propagationStopped)
          break;
      }
    }
  }
  /**
   * @protected
   */
  handlePostRender() {
    const e = this.frameState_, n = this.tileQueue_;
    if (!n.isEmpty()) {
      let s = this.maxTilesLoading_, r = s;
      if (e) {
        const o = e.viewHints;
        if (o[Ve.ANIMATING] || o[Ve.INTERACTING]) {
          const a = Date.now() - e.time > 8;
          s = a ? 0 : 8, r = a ? 0 : 2;
        }
      }
      n.getTilesLoading() < s && (n.reprioritize(), n.loadMoreTiles(s, r));
    }
    e && this.renderer_ && !e.animate && (this.renderComplete_ === !0 ? (this.hasListener(dt.RENDERCOMPLETE) && this.renderer_.dispatchRenderEvent(
      dt.RENDERCOMPLETE,
      e
    ), this.loaded_ === !1 && (this.loaded_ = !0, this.dispatchEvent(
      new oi(fn.LOADEND, this, e)
    ))) : this.loaded_ === !0 && (this.loaded_ = !1, this.dispatchEvent(
      new oi(fn.LOADSTART, this, e)
    )));
    const i = this.postRenderFunctions_;
    for (let s = 0, r = i.length; s < r; ++s)
      i[s](this, e);
    i.length = 0;
  }
  /**
   * @private
   */
  handleSizeChanged_() {
    this.getView() && !this.getView().getAnimating() && this.getView().resolveConstraints(0), this.render();
  }
  /**
   * @private
   */
  handleTargetChanged_() {
    if (this.mapBrowserEventHandler_) {
      for (let i = 0, s = this.targetChangeHandlerKeys_.length; i < s; ++i)
        Ce(this.targetChangeHandlerKeys_[i]);
      this.targetChangeHandlerKeys_ = null, this.viewport_.removeEventListener(
        H.CONTEXTMENU,
        this.boundHandleBrowserEvent_
      ), this.viewport_.removeEventListener(
        H.WHEEL,
        this.boundHandleBrowserEvent_
      ), this.mapBrowserEventHandler_.dispose(), this.mapBrowserEventHandler_ = null, Do(this.viewport_);
    }
    if (this.targetElement_) {
      this.resizeObserver_.unobserve(this.targetElement_);
      const i = this.targetElement_.getRootNode();
      i instanceof ShadowRoot && this.resizeObserver_.unobserve(i.host), this.setSize(void 0);
    }
    const e = this.getTarget(), n = typeof e == "string" ? document.getElementById(e) : e;
    if (this.targetElement_ = n, !n)
      this.renderer_ && (clearTimeout(this.postRenderTimeoutHandle_), this.postRenderTimeoutHandle_ = void 0, this.postRenderFunctions_.length = 0, this.renderer_.dispose(), this.renderer_ = null), this.animationDelayKey_ && (cancelAnimationFrame(this.animationDelayKey_), this.animationDelayKey_ = void 0);
    else {
      n.appendChild(this.viewport_), this.renderer_ || (this.renderer_ = new __(this)), this.mapBrowserEventHandler_ = new x_(
        this,
        this.moveTolerance_
      );
      for (const r in be)
        this.mapBrowserEventHandler_.addEventListener(
          be[r],
          this.handleMapBrowserEvent.bind(this)
        );
      this.viewport_.addEventListener(
        H.CONTEXTMENU,
        this.boundHandleBrowserEvent_,
        !1
      ), this.viewport_.addEventListener(
        H.WHEEL,
        this.boundHandleBrowserEvent_,
        Zc ? { passive: !1 } : !1
      );
      const i = this.keyboardEventTarget_ ? this.keyboardEventTarget_ : n;
      this.targetChangeHandlerKeys_ = [
        he(
          i,
          H.KEYDOWN,
          this.handleBrowserEvent,
          this
        ),
        he(
          i,
          H.KEYPRESS,
          this.handleBrowserEvent,
          this
        )
      ];
      const s = n.getRootNode();
      s instanceof ShadowRoot && this.resizeObserver_.observe(s.host), this.resizeObserver_.observe(n);
    }
    this.updateSize();
  }
  /**
   * @private
   */
  handleTileChange_() {
    this.render();
  }
  /**
   * @private
   */
  handleViewPropertyChanged_() {
    this.render();
  }
  /**
   * @private
   */
  handleViewChanged_() {
    this.viewPropertyListenerKey_ && (Ce(this.viewPropertyListenerKey_), this.viewPropertyListenerKey_ = null), this.viewChangeListenerKey_ && (Ce(this.viewChangeListenerKey_), this.viewChangeListenerKey_ = null);
    const e = this.getView();
    e && (this.updateViewportSize_(this.getSize()), this.viewPropertyListenerKey_ = he(
      e,
      yi.PROPERTYCHANGE,
      this.handleViewPropertyChanged_,
      this
    ), this.viewChangeListenerKey_ = he(
      e,
      H.CHANGE,
      this.handleViewPropertyChanged_,
      this
    ), e.resolveConstraints(0)), this.render();
  }
  /**
   * @private
   */
  handleLayerGroupChanged_() {
    this.layerGroupPropertyListenerKeys_ && (this.layerGroupPropertyListenerKeys_.forEach(Ce), this.layerGroupPropertyListenerKeys_ = null);
    const e = this.getLayerGroup();
    e && (this.handleLayerAdd_(new gn("addlayer", e)), this.layerGroupPropertyListenerKeys_ = [
      he(e, yi.PROPERTYCHANGE, this.render, this),
      he(e, H.CHANGE, this.render, this),
      he(e, "addlayer", this.handleLayerAdd_, this),
      he(e, "removelayer", this.handleLayerRemove_, this)
    ]), this.render();
  }
  /**
   * @return {boolean} Is rendered.
   */
  isRendered() {
    return !!this.frameState_;
  }
  /**
   * @private
   */
  animationDelay_() {
    this.animationDelayKey_ = void 0, this.renderFrame_(Date.now());
  }
  /**
   * Requests an immediate render in a synchronous manner.
   * @api
   */
  renderSync() {
    this.animationDelayKey_ && cancelAnimationFrame(this.animationDelayKey_), this.animationDelay_();
  }
  /**
   * Redraws all text after new fonts have loaded
   */
  redrawText() {
    const e = this.getLayerGroup().getLayerStatesArray();
    for (let n = 0, i = e.length; n < i; ++n) {
      const s = e[n].layer;
      s.hasRenderer() && s.getRenderer().handleFontsChanged();
    }
  }
  /**
   * Request a map rendering (at the next animation frame).
   * @api
   */
  render() {
    this.renderer_ && this.animationDelayKey_ === void 0 && (this.animationDelayKey_ = requestAnimationFrame(this.animationDelay_));
  }
  /**
   * Remove the given control from the map.
   * @param {import("./control/Control.js").default} control Control.
   * @return {import("./control/Control.js").default|undefined} The removed control (or undefined
   *     if the control was not found).
   * @api
   */
  removeControl(e) {
    return this.getControls().remove(e);
  }
  /**
   * Remove the given interaction from the map.
   * @param {import("./interaction/Interaction.js").default} interaction Interaction to remove.
   * @return {import("./interaction/Interaction.js").default|undefined} The removed interaction (or
   *     undefined if the interaction was not found).
   * @api
   */
  removeInteraction(e) {
    return this.getInteractions().remove(e);
  }
  /**
   * Removes the given layer from the map.
   * @param {import("./layer/Base.js").default} layer Layer.
   * @return {import("./layer/Base.js").default|undefined} The removed layer (or undefined if the
   *     layer was not found).
   * @api
   */
  removeLayer(e) {
    return this.getLayerGroup().getLayers().remove(e);
  }
  /**
   * @param {import("./layer/Group.js").GroupEvent} event The layer remove event.
   * @private
   */
  handleLayerRemove_(e) {
    mh(e.layer);
  }
  /**
   * Remove the given overlay from the map.
   * @param {import("./Overlay.js").default} overlay Overlay.
   * @return {import("./Overlay.js").default|undefined} The removed overlay (or undefined
   *     if the overlay was not found).
   * @api
   */
  removeOverlay(e) {
    return this.getOverlays().remove(e);
  }
  /**
   * @param {number} time Time.
   * @private
   */
  renderFrame_(e) {
    const n = this.getSize(), i = this.getView(), s = this.frameState_;
    let r = null;
    if (n !== void 0 && Ul(n) && i && i.isDef()) {
      const o = i.getHints(
        this.frameState_ ? this.frameState_.viewHints : void 0
      ), a = i.getState();
      if (r = {
        animate: !1,
        coordinateToPixelTransform: this.coordinateToPixelTransform_,
        declutter: null,
        extent: Ao(
          a.center,
          a.resolution,
          a.rotation,
          n
        ),
        index: this.frameIndex_++,
        layerIndex: 0,
        layerStatesArray: this.getLayerGroup().getLayerStatesArray(),
        pixelRatio: this.pixelRatio_,
        pixelToCoordinateTransform: this.pixelToCoordinateTransform_,
        postRenderFunctions: [],
        size: n,
        tileQueue: this.tileQueue_,
        time: e,
        usedTiles: {},
        viewState: a,
        viewHints: o,
        wantedTiles: {},
        mapId: fe(this),
        renderTargets: {}
      }, a.nextCenter && a.nextResolution) {
        const l = isNaN(a.nextRotation) ? a.rotation : a.nextRotation;
        r.nextExtent = Ao(
          a.nextCenter,
          a.nextResolution,
          l,
          n
        );
      }
    }
    this.frameState_ = r, this.renderer_.renderFrame(r), r && (r.animate && this.render(), Array.prototype.push.apply(
      this.postRenderFunctions_,
      r.postRenderFunctions
    ), s && (!this.previousExtent_ || !br(this.previousExtent_) && !is(r.extent, this.previousExtent_)) && (this.dispatchEvent(
      new oi(fn.MOVESTART, this, s)
    ), this.previousExtent_ = Cr(this.previousExtent_)), this.previousExtent_ && !r.viewHints[Ve.ANIMATING] && !r.viewHints[Ve.INTERACTING] && !is(r.extent, this.previousExtent_) && (this.dispatchEvent(
      new oi(fn.MOVEEND, this, r)
    ), gc(r.extent, this.previousExtent_))), this.dispatchEvent(new oi(fn.POSTRENDER, this, r)), this.renderComplete_ = this.hasListener(fn.LOADSTART) || this.hasListener(fn.LOADEND) || this.hasListener(dt.RENDERCOMPLETE) ? !this.tileQueue_.getTilesLoading() && !this.tileQueue_.getCount() && !this.getLoadingOrNotReady() : void 0, this.postRenderTimeoutHandle_ || (this.postRenderTimeoutHandle_ = setTimeout(() => {
      this.postRenderTimeoutHandle_ = void 0, this.handlePostRender();
    }, 0));
  }
  /**
   * Sets the layergroup of this map.
   * @param {LayerGroup} layerGroup A layer group containing the layers in this map.
   * @observable
   * @api
   */
  setLayerGroup(e) {
    const n = this.getLayerGroup();
    n && this.handleLayerRemove_(new gn("removelayer", n)), this.set(Ne.LAYERGROUP, e);
  }
  /**
   * Set the size of this map.
   * @param {import("./size.js").Size|undefined} size The size in pixels of the map in the DOM.
   * @observable
   * @api
   */
  setSize(e) {
    this.set(Ne.SIZE, e);
  }
  /**
   * Set the target element to render this map into.
   * @param {HTMLElement|string} [target] The Element or id of the Element
   *     that the map is rendered in.
   * @observable
   * @api
   */
  setTarget(e) {
    this.set(Ne.TARGET, e);
  }
  /**
   * Set the view for this map.
   * @param {View|Promise<import("./View.js").ViewOptions>} view The view that controls this map.
   * It is also possible to pass a promise that resolves to options for constructing a view.  This
   * alternative allows view properties to be resolved by sources or other components that load
   * view-related metadata.
   * @observable
   * @api
   */
  setView(e) {
    if (!e || e instanceof Tt) {
      this.set(Ne.VIEW, e);
      return;
    }
    this.set(Ne.VIEW, new Tt());
    const n = this;
    e.then(function(i) {
      n.setView(new Tt(i));
    });
  }
  /**
   * Force a recalculation of the map viewport size.  This should be called when
   * third-party code changes the size of the map viewport.
   * @api
   */
  updateSize() {
    const e = this.getTargetElement();
    let n;
    if (e) {
      const s = getComputedStyle(e), r = e.offsetWidth - parseFloat(s.borderLeftWidth) - parseFloat(s.paddingLeft) - parseFloat(s.paddingRight) - parseFloat(s.borderRightWidth), o = e.offsetHeight - parseFloat(s.borderTopWidth) - parseFloat(s.paddingTop) - parseFloat(s.paddingBottom) - parseFloat(s.borderBottomWidth);
      !isNaN(r) && !isNaN(o) && (n = [r, o], !Ul(n) && (e.offsetWidth || e.offsetHeight || e.getClientRects().length) && wc(
        "No map visible because the map container's width or height are 0."
      ));
    }
    const i = this.getSize();
    n && (!i || !In(n, i)) && (this.setSize(n), this.updateViewportSize_(n));
  }
  /**
   * Recomputes the viewport size and save it on the view object (if any)
   * @param {import("./size.js").Size|undefined} size The size.
   * @private
   */
  updateViewportSize_(e) {
    const n = this.getView();
    n && n.setViewportSize(e);
  }
};
function mv(t) {
  let e = null;
  t.keyboardEventTarget !== void 0 && (e = typeof t.keyboardEventTarget == "string" ? document.getElementById(t.keyboardEventTarget) : t.keyboardEventTarget);
  const n = {}, i = t.layers && typeof /** @type {?} */
  t.layers.getLayers == "function" ? (
    /** @type {LayerGroup} */
    t.layers
  ) : new Or({
    layers: (
      /** @type {Collection<import("./layer/Base.js").default>|Array<import("./layer/Base.js").default>} */
      t.layers
    )
  });
  n[Ne.LAYERGROUP] = i, n[Ne.TARGET] = t.target, n[Ne.VIEW] = t.view instanceof Tt ? t.view : new Tt();
  let s;
  t.controls !== void 0 && (Array.isArray(t.controls) ? s = new Lt(t.controls.slice()) : (ue(
    typeof /** @type {?} */
    t.controls.getArray == "function",
    "Expected `controls` to be an array or an `ol/Collection.js`"
  ), s = t.controls));
  let r;
  t.interactions !== void 0 && (Array.isArray(t.interactions) ? r = new Lt(t.interactions.slice()) : (ue(
    typeof /** @type {?} */
    t.interactions.getArray == "function",
    "Expected `interactions` to be an array or an `ol/Collection.js`"
  ), r = t.interactions));
  let o;
  return t.overlays !== void 0 ? Array.isArray(t.overlays) ? o = new Lt(t.overlays.slice()) : (ue(
    typeof /** @type {?} */
    t.overlays.getArray == "function",
    "Expected `overlays` to be an array or an `ol/Collection.js`"
  ), o = t.overlays) : o = new Lt(), {
    controls: s,
    interactions: r,
    keyboardEventTarget: e,
    overlays: o,
    values: n
  };
}
const _v = gv;
class vv extends pr {
  /**
   * @param {import("./tilecoord.js").TileCoord} tileCoord Tile coordinate.
   * @param {import("./TileState.js").default} state State.
   * @param {Options} [options] Tile options.
   */
  constructor(e, n, i) {
    super(), i = i || {}, this.tileCoord = e, this.state = n, this.interimTile = null, this.key = "", this.transition_ = i.transition === void 0 ? 250 : i.transition, this.transitionStarts_ = {}, this.interpolate = !!i.interpolate;
  }
  /**
   * @protected
   */
  changed() {
    this.dispatchEvent(H.CHANGE);
  }
  /**
   * Called by the tile cache when the tile is removed from the cache due to expiry
   */
  release() {
    this.state === X.ERROR && this.setState(X.EMPTY);
  }
  /**
   * @return {string} Key.
   */
  getKey() {
    return this.key + "/" + this.tileCoord;
  }
  /**
   * Get the interim tile most suitable for rendering using the chain of interim
   * tiles. This corresponds to the  most recent tile that has been loaded, if no
   * such tile exists, the original tile is returned.
   * @return {!Tile} Best tile for rendering.
   */
  getInterimTile() {
    let e = this.interimTile;
    if (!e)
      return this;
    do {
      if (e.getState() == X.LOADED)
        return this.transition_ = 0, e;
      e = e.interimTile;
    } while (e);
    return this;
  }
  /**
   * Goes through the chain of interim tiles and discards sections of the chain
   * that are no longer relevant.
   */
  refreshInterimChain() {
    let e = this.interimTile;
    if (!e)
      return;
    let n = this;
    do {
      if (e.getState() == X.LOADED) {
        e.interimTile = null;
        break;
      }
      e.getState() == X.LOADING ? n = e : e.getState() == X.IDLE ? n.interimTile = e.interimTile : n = e, e = n.interimTile;
    } while (e);
  }
  /**
   * Get the tile coordinate for this tile.
   * @return {import("./tilecoord.js").TileCoord} The tile coordinate.
   * @api
   */
  getTileCoord() {
    return this.tileCoord;
  }
  /**
   * @return {import("./TileState.js").default} State.
   */
  getState() {
    return this.state;
  }
  /**
   * Sets the state of this tile. If you write your own {@link module:ol/Tile~LoadFunction tileLoadFunction} ,
   * it is important to set the state correctly to {@link module:ol/TileState~ERROR}
   * when the tile cannot be loaded. Otherwise the tile cannot be removed from
   * the tile queue and will block other requests.
   * @param {import("./TileState.js").default} state State.
   * @api
   */
  setState(e) {
    if (this.state !== X.ERROR && this.state > e)
      throw new Error("Tile load sequence violation");
    this.state = e, this.changed();
  }
  /**
   * Load the image or retry if loading previously failed.
   * Loading is taken care of by the tile queue, and calling this method is
   * only needed for preloading or for reloading in case of an error.
   * @abstract
   * @api
   */
  load() {
    ce();
  }
  /**
   * Get the alpha value for rendering.
   * @param {string} id An id for the renderer.
   * @param {number} time The render frame time.
   * @return {number} A number between 0 and 1.
   */
  getAlpha(e, n) {
    if (!this.transition_)
      return 1;
    let i = this.transitionStarts_[e];
    if (!i)
      i = n, this.transitionStarts_[e] = i;
    else if (i === -1)
      return 1;
    const s = n - i + 1e3 / 60;
    return s >= this.transition_ ? 1 : Tc(s / this.transition_);
  }
  /**
   * Determine if a tile is in an alpha transition.  A tile is considered in
   * transition if tile.getAlpha() has not yet been called or has been called
   * and returned 1.
   * @param {string} id An id for the renderer.
   * @return {boolean} The tile is in transition.
   */
  inTransition(e) {
    return this.transition_ ? this.transitionStarts_[e] !== -1 : !1;
  }
  /**
   * Mark a transition as complete.
   * @param {string} id An id for the renderer.
   */
  endTransition(e) {
    this.transition_ && (this.transitionStarts_[e] = -1);
  }
}
const vh = vv;
class yv extends vh {
  /**
   * @param {import("./tilecoord.js").TileCoord} tileCoord Tile coordinate.
   * @param {import("./TileState.js").default} state State.
   * @param {string} src Image source URI.
   * @param {?string} crossOrigin Cross origin.
   * @param {import("./Tile.js").LoadFunction} tileLoadFunction Tile load function.
   * @param {import("./Tile.js").Options} [options] Tile options.
   */
  constructor(e, n, i, s, r, o) {
    super(e, n, o), this.crossOrigin_ = s, this.src_ = i, this.key = i, this.image_ = new Image(), s !== null && (this.image_.crossOrigin = s), this.unlisten_ = null, this.tileLoadFunction_ = r;
  }
  /**
   * Get the HTML image element for this tile (may be a Canvas, Image, or Video).
   * @return {HTMLCanvasElement|HTMLImageElement|HTMLVideoElement} Image.
   * @api
   */
  getImage() {
    return this.image_;
  }
  /**
   * Sets an HTML image element for this tile (may be a Canvas or preloaded Image).
   * @param {HTMLCanvasElement|HTMLImageElement} element Element.
   */
  setImage(e) {
    this.image_ = e, this.state = X.LOADED, this.unlistenImage_(), this.changed();
  }
  /**
   * Tracks loading or read errors.
   *
   * @private
   */
  handleImageError_() {
    this.state = X.ERROR, this.unlistenImage_(), this.image_ = pv(), this.changed();
  }
  /**
   * Tracks successful image load.
   *
   * @private
   */
  handleImageLoad_() {
    const e = (
      /** @type {HTMLImageElement} */
      this.image_
    );
    e.naturalWidth && e.naturalHeight ? this.state = X.LOADED : this.state = X.EMPTY, this.unlistenImage_(), this.changed();
  }
  /**
   * Load the image or retry if loading previously failed.
   * Loading is taken care of by the tile queue, and calling this method is
   * only needed for preloading or for reloading in case of an error.
   *
   * To retry loading tiles on failed requests, use a custom `tileLoadFunction`
   * that checks for error status codes and reloads only when the status code is
   * 408, 429, 500, 502, 503 and 504, and only when not too many retries have been
   * made already:
   *
   * ```js
   * const retryCodes = [408, 429, 500, 502, 503, 504];
   * const retries = {};
   * source.setTileLoadFunction((tile, src) => {
   *   const image = tile.getImage();
   *   fetch(src)
   *     .then((response) => {
   *       if (retryCodes.includes(response.status)) {
   *         retries[src] = (retries[src] || 0) + 1;
   *         if (retries[src] <= 3) {
   *           setTimeout(() => tile.load(), retries[src] * 1000);
   *         }
   *         return Promise.reject();
   *       }
   *       return response.blob();
   *     })
   *     .then((blob) => {
   *       const imageUrl = URL.createObjectURL(blob);
   *       image.src = imageUrl;
   *       setTimeout(() => URL.revokeObjectURL(imageUrl), 5000);
   *     })
   *     .catch(() => tile.setState(3)); // error
   * });
   * ```
   *
   * @api
   */
  load() {
    this.state == X.ERROR && (this.state = X.IDLE, this.image_ = new Image(), this.crossOrigin_ !== null && (this.image_.crossOrigin = this.crossOrigin_)), this.state == X.IDLE && (this.state = X.LOADING, this.changed(), this.tileLoadFunction_(this, this.src_), this.unlisten_ = am(
      this.image_,
      this.handleImageLoad_.bind(this),
      this.handleImageError_.bind(this)
    ));
  }
  /**
   * Discards event handlers which listen for load completion or errors.
   *
   * @private
   */
  unlistenImage_() {
    this.unlisten_ && (this.unlisten_(), this.unlisten_ = null);
  }
}
function pv() {
  const t = De(1, 1);
  return t.fillStyle = "rgba(0,0,0,0)", t.fillRect(0, 0, 1, 1), t.canvas;
}
const yh = yv, xv = 0.5, Cv = 10, cu = 0.25;
class Ev {
  /**
   * @param {import("../proj/Projection.js").default} sourceProj Source projection.
   * @param {import("../proj/Projection.js").default} targetProj Target projection.
   * @param {import("../extent.js").Extent} targetExtent Target extent to triangulate.
   * @param {import("../extent.js").Extent} maxSourceExtent Maximal source extent that can be used.
   * @param {number} errorThreshold Acceptable error (in source units).
   * @param {?number} destinationResolution The (optional) resolution of the destination.
   */
  constructor(e, n, i, s, r, o) {
    this.sourceProj_ = e, this.targetProj_ = n;
    let a = {};
    const l = ir(this.targetProj_, this.sourceProj_);
    this.transformInv_ = function(y) {
      const C = y[0] + "/" + y[1];
      return a[C] || (a[C] = l(y)), a[C];
    }, this.maxSourceExtent_ = s, this.errorThresholdSquared_ = r * r, this.triangles_ = [], this.wrapsXInSource_ = !1, this.canWrapXInSource_ = this.sourceProj_.canWrapX() && !!s && !!this.sourceProj_.getExtent() && _e(s) >= _e(this.sourceProj_.getExtent()), this.sourceWorldWidth_ = this.sourceProj_.getExtent() ? _e(this.sourceProj_.getExtent()) : null, this.targetWorldWidth_ = this.targetProj_.getExtent() ? _e(this.targetProj_.getExtent()) : null;
    const u = Wn(i), c = Sr(i), h = wr(i), d = Er(i), f = this.transformInv_(u), g = this.transformInv_(c), m = this.transformInv_(h), _ = this.transformInv_(d), p = Cv + (o ? Math.max(
      0,
      Math.ceil(
        Math.log2(
          Lo(i) / (o * o * 256 * 256)
        )
      )
    ) : 0);
    if (this.addQuad_(
      u,
      c,
      h,
      d,
      f,
      g,
      m,
      _,
      p
    ), this.wrapsXInSource_) {
      let y = 1 / 0;
      this.triangles_.forEach(function(C, x, E) {
        y = Math.min(
          y,
          C.source[0][0],
          C.source[1][0],
          C.source[2][0]
        );
      }), this.triangles_.forEach((C) => {
        if (Math.max(
          C.source[0][0],
          C.source[1][0],
          C.source[2][0]
        ) - y > this.sourceWorldWidth_ / 2) {
          const x = [
            [C.source[0][0], C.source[0][1]],
            [C.source[1][0], C.source[1][1]],
            [C.source[2][0], C.source[2][1]]
          ];
          x[0][0] - y > this.sourceWorldWidth_ / 2 && (x[0][0] -= this.sourceWorldWidth_), x[1][0] - y > this.sourceWorldWidth_ / 2 && (x[1][0] -= this.sourceWorldWidth_), x[2][0] - y > this.sourceWorldWidth_ / 2 && (x[2][0] -= this.sourceWorldWidth_);
          const E = Math.min(
            x[0][0],
            x[1][0],
            x[2][0]
          );
          Math.max(
            x[0][0],
            x[1][0],
            x[2][0]
          ) - E < this.sourceWorldWidth_ / 2 && (C.source = x);
        }
      });
    }
    a = {};
  }
  /**
   * Adds triangle to the triangulation.
   * @param {import("../coordinate.js").Coordinate} a The target a coordinate.
   * @param {import("../coordinate.js").Coordinate} b The target b coordinate.
   * @param {import("../coordinate.js").Coordinate} c The target c coordinate.
   * @param {import("../coordinate.js").Coordinate} aSrc The source a coordinate.
   * @param {import("../coordinate.js").Coordinate} bSrc The source b coordinate.
   * @param {import("../coordinate.js").Coordinate} cSrc The source c coordinate.
   * @private
   */
  addTriangle_(e, n, i, s, r, o) {
    this.triangles_.push({
      source: [s, r, o],
      target: [e, n, i]
    });
  }
  /**
   * Adds quad (points in clock-wise order) to the triangulation
   * (and reprojects the vertices) if valid.
   * Performs quad subdivision if needed to increase precision.
   *
   * @param {import("../coordinate.js").Coordinate} a The target a coordinate.
   * @param {import("../coordinate.js").Coordinate} b The target b coordinate.
   * @param {import("../coordinate.js").Coordinate} c The target c coordinate.
   * @param {import("../coordinate.js").Coordinate} d The target d coordinate.
   * @param {import("../coordinate.js").Coordinate} aSrc The source a coordinate.
   * @param {import("../coordinate.js").Coordinate} bSrc The source b coordinate.
   * @param {import("../coordinate.js").Coordinate} cSrc The source c coordinate.
   * @param {import("../coordinate.js").Coordinate} dSrc The source d coordinate.
   * @param {number} maxSubdivision Maximal allowed subdivision of the quad.
   * @private
   */
  addQuad_(e, n, i, s, r, o, a, l, u) {
    const c = Al([r, o, a, l]), h = this.sourceWorldWidth_ ? _e(c) / this.sourceWorldWidth_ : null, d = (
      /** @type {number} */
      this.sourceWorldWidth_
    ), f = this.sourceProj_.canWrapX() && h > 0.5 && h < 1;
    let g = !1;
    if (u > 0) {
      if (this.targetProj_.isGlobal() && this.targetWorldWidth_) {
        const _ = Al([e, n, i, s]);
        g = _e(_) / this.targetWorldWidth_ > cu || g;
      }
      !f && this.sourceProj_.isGlobal() && h && (g = h > cu || g);
    }
    if (!g && this.maxSourceExtent_ && isFinite(c[0]) && isFinite(c[1]) && isFinite(c[2]) && isFinite(c[3]) && !qe(c, this.maxSourceExtent_))
      return;
    let m = 0;
    if (!g && (!isFinite(r[0]) || !isFinite(r[1]) || !isFinite(o[0]) || !isFinite(o[1]) || !isFinite(a[0]) || !isFinite(a[1]) || !isFinite(l[0]) || !isFinite(l[1]))) {
      if (u > 0)
        g = !0;
      else if (m = (!isFinite(r[0]) || !isFinite(r[1]) ? 8 : 0) + (!isFinite(o[0]) || !isFinite(o[1]) ? 4 : 0) + (!isFinite(a[0]) || !isFinite(a[1]) ? 2 : 0) + (!isFinite(l[0]) || !isFinite(l[1]) ? 1 : 0), m != 1 && m != 2 && m != 4 && m != 8)
        return;
    }
    if (u > 0) {
      if (!g) {
        const _ = [(e[0] + i[0]) / 2, (e[1] + i[1]) / 2], p = this.transformInv_(_);
        let y;
        f ? y = (fi(r[0], d) + fi(a[0], d)) / 2 - fi(p[0], d) : y = (r[0] + a[0]) / 2 - p[0];
        const C = (r[1] + a[1]) / 2 - p[1];
        g = y * y + C * C > this.errorThresholdSquared_;
      }
      if (g) {
        if (Math.abs(e[0] - i[0]) <= Math.abs(e[1] - i[1])) {
          const _ = [(n[0] + i[0]) / 2, (n[1] + i[1]) / 2], p = this.transformInv_(_), y = [(s[0] + e[0]) / 2, (s[1] + e[1]) / 2], C = this.transformInv_(y);
          this.addQuad_(
            e,
            n,
            _,
            y,
            r,
            o,
            p,
            C,
            u - 1
          ), this.addQuad_(
            y,
            _,
            i,
            s,
            C,
            p,
            a,
            l,
            u - 1
          );
        } else {
          const _ = [(e[0] + n[0]) / 2, (e[1] + n[1]) / 2], p = this.transformInv_(_), y = [(i[0] + s[0]) / 2, (i[1] + s[1]) / 2], C = this.transformInv_(y);
          this.addQuad_(
            e,
            _,
            y,
            s,
            r,
            p,
            C,
            l,
            u - 1
          ), this.addQuad_(
            _,
            n,
            i,
            y,
            p,
            o,
            a,
            C,
            u - 1
          );
        }
        return;
      }
    }
    if (f) {
      if (!this.canWrapXInSource_)
        return;
      this.wrapsXInSource_ = !0;
    }
    m & 11 || this.addTriangle_(e, i, s, r, a, l), m & 14 || this.addTriangle_(e, i, n, r, a, o), m && (m & 13 || this.addTriangle_(n, s, e, o, l, r), m & 7 || this.addTriangle_(n, s, i, o, l, a));
  }
  /**
   * Calculates extent of the `source` coordinates from all the triangles.
   *
   * @return {import("../extent.js").Extent} Calculated extent.
   */
  calculateSourceExtent() {
    const e = ft();
    return this.triangles_.forEach(function(n, i, s) {
      const r = n.source;
      Hi(e, r[0]), Hi(e, r[1]), Hi(e, r[2]);
    }), e;
  }
  /**
   * @return {Array<Triangle>} Array of the calculated triangles.
   */
  getTriangles() {
    return this.triangles_;
  }
}
const wv = Ev;
let yo;
const mi = [];
function hu(t, e, n, i, s) {
  t.beginPath(), t.moveTo(0, 0), t.lineTo(e, n), t.lineTo(i, s), t.closePath(), t.save(), t.clip(), t.fillRect(0, 0, Math.max(e, i) + 1, Math.max(n, s)), t.restore();
}
function po(t, e) {
  return Math.abs(t[e * 4] - 210) > 2 || Math.abs(t[e * 4 + 3] - 0.75 * 255) > 2;
}
function Sv() {
  if (yo === void 0) {
    const t = De(6, 6, mi);
    t.globalCompositeOperation = "lighter", t.fillStyle = "rgba(210, 0, 0, 0.75)", hu(t, 4, 5, 4, 0), hu(t, 4, 5, 0, 5);
    const e = t.getImageData(0, 0, 3, 3).data;
    yo = po(e, 0) || po(e, 4) || po(e, 8), Rr(t), mi.push(t.canvas);
  }
  return yo;
}
function du(t, e, n, i) {
  const s = Ic(n, e, t);
  let r = Ml(
    e,
    i,
    n
  );
  const o = e.getMetersPerUnit();
  o !== void 0 && (r *= o);
  const a = t.getMetersPerUnit();
  a !== void 0 && (r /= a);
  const l = t.getExtent();
  if (!l || Ci(l, s)) {
    const u = Ml(t, r, s) / r;
    isFinite(u) && u > 0 && (r /= u);
  }
  return r;
}
function bv(t, e, n, i) {
  const s = Bn(n);
  let r = du(
    t,
    e,
    s,
    i
  );
  return (!isFinite(r) || r <= 0) && pc(n, function(o) {
    return r = du(
      t,
      e,
      o,
      i
    ), isFinite(r) && r > 0;
  }), r;
}
function Iv(t, e, n, i, s, r, o, a, l, u, c, h, d, f) {
  const g = De(
    Math.round(n * t),
    Math.round(n * e),
    mi
  );
  if (h || (g.imageSmoothingEnabled = !1), l.length === 0)
    return g.canvas;
  g.scale(n, n);
  function m(E) {
    return Math.round(E * n) / n;
  }
  g.globalCompositeOperation = "lighter";
  const _ = ft();
  l.forEach(function(E, S, T) {
    $f(_, E.extent);
  });
  let p;
  const y = n / i, C = (h ? 1 : 1 + Math.pow(2, -24)) / y;
  if (!d || l.length !== 1 || u !== 0) {
    if (p = De(
      Math.round(_e(_) * y),
      Math.round(Ge(_) * y),
      mi
    ), h || (p.imageSmoothingEnabled = !1), s && f) {
      const E = (s[0] - _[0]) * y, S = -(s[3] - _[3]) * y, T = _e(s) * y, I = Ge(s) * y;
      p.rect(E, S, T, I), p.clip();
    }
    l.forEach(function(E, S, T) {
      const I = (E.extent[0] - _[0]) * y, b = -(E.extent[3] - _[3]) * y, D = _e(E.extent) * y, P = Ge(E.extent) * y;
      E.image.width > 0 && E.image.height > 0 && p.drawImage(
        E.image,
        u,
        u,
        E.image.width - 2 * u,
        E.image.height - 2 * u,
        h ? I : Math.round(I),
        h ? b : Math.round(b),
        h ? D : Math.round(I + D) - Math.round(I),
        h ? P : Math.round(b + P) - Math.round(b)
      );
    });
  }
  const x = Wn(o);
  return a.getTriangles().forEach(function(E, S, T) {
    const I = E.source, b = E.target;
    let D = I[0][0], P = I[0][1], A = I[1][0], M = I[1][1], k = I[2][0], V = I[2][1];
    const O = m((b[0][0] - x[0]) / r), G = m(
      -(b[0][1] - x[1]) / r
    ), F = m((b[1][0] - x[0]) / r), j = m(
      -(b[1][1] - x[1]) / r
    ), W = m((b[2][0] - x[0]) / r), N = m(
      -(b[2][1] - x[1]) / r
    ), z = D, q = P;
    D = 0, P = 0, A -= z, M -= q, k -= z, V -= q;
    const L = [
      [A, M, 0, 0, F - O],
      [k, V, 0, 0, W - O],
      [0, 0, A, M, j - G],
      [0, 0, k, V, N - G]
    ], se = Lf(L);
    if (!se)
      return;
    if (g.save(), g.beginPath(), Sv() || !h) {
      g.moveTo(F, j);
      const ve = 4, Ue = O - F, vt = G - j;
      for (let Ze = 0; Ze < ve; Ze++)
        g.lineTo(
          F + m((Ze + 1) * Ue / ve),
          j + m(Ze * vt / (ve - 1))
        ), Ze != ve - 1 && g.lineTo(
          F + m((Ze + 1) * Ue / ve),
          j + m((Ze + 1) * vt / (ve - 1))
        );
      g.lineTo(W, N);
    } else
      g.moveTo(F, j), g.lineTo(O, G), g.lineTo(W, N);
    g.clip(), g.transform(
      se[0],
      se[2],
      se[1],
      se[3],
      O,
      G
    ), g.translate(
      _[0] - z,
      _[3] - q
    );
    let oe;
    if (p)
      oe = p.canvas, g.scale(C, -C);
    else {
      const ve = l[0], Ue = ve.extent;
      oe = ve.image, g.scale(
        _e(Ue) / oe.width,
        -Ge(Ue) / oe.height
      );
    }
    g.drawImage(oe, 0, 0), g.restore();
  }), p && (Rr(p), mi.push(p.canvas)), c && (g.save(), g.globalCompositeOperation = "source-over", g.strokeStyle = "black", g.lineWidth = 1, a.getTriangles().forEach(function(E, S, T) {
    const I = E.target, b = (I[0][0] - x[0]) / r, D = -(I[0][1] - x[1]) / r, P = (I[1][0] - x[0]) / r, A = -(I[1][1] - x[1]) / r, M = (I[2][0] - x[0]) / r, k = -(I[2][1] - x[1]) / r;
    g.beginPath(), g.moveTo(P, A), g.lineTo(b, D), g.lineTo(M, k), g.closePath(), g.stroke();
  }), g.restore()), g.canvas;
}
class Tv extends vh {
  /**
   * @param {import("../proj/Projection.js").default} sourceProj Source projection.
   * @param {import("../tilegrid/TileGrid.js").default} sourceTileGrid Source tile grid.
   * @param {import("../proj/Projection.js").default} targetProj Target projection.
   * @param {import("../tilegrid/TileGrid.js").default} targetTileGrid Target tile grid.
   * @param {import("../tilecoord.js").TileCoord} tileCoord Coordinate of the tile.
   * @param {import("../tilecoord.js").TileCoord} wrappedTileCoord Coordinate of the tile wrapped in X.
   * @param {number} pixelRatio Pixel ratio.
   * @param {number} gutter Gutter of the source tiles.
   * @param {FunctionType} getTileFunction
   *     Function returning source tiles (z, x, y, pixelRatio).
   * @param {number} [errorThreshold] Acceptable reprojection error (in px).
   * @param {boolean} [renderEdges] Render reprojection edges.
   * @param {import("../Tile.js").Options} [options] Tile options.
   */
  constructor(e, n, i, s, r, o, a, l, u, c, h, d) {
    super(r, X.IDLE, d), this.renderEdges_ = h !== void 0 ? h : !1, this.pixelRatio_ = a, this.gutter_ = l, this.canvas_ = null, this.sourceTileGrid_ = n, this.targetTileGrid_ = s, this.wrappedTileCoord_ = o || r, this.sourceTiles_ = [], this.sourcesListenerKeys_ = null, this.sourceZ_ = 0;
    const f = s.getTileCoordExtent(
      this.wrappedTileCoord_
    ), g = this.targetTileGrid_.getExtent();
    let m = this.sourceTileGrid_.getExtent();
    const _ = g ? qi(f, g) : f;
    if (Lo(_) === 0) {
      this.state = X.EMPTY;
      return;
    }
    const p = e.getExtent();
    p && (m ? m = qi(m, p) : m = p);
    const y = s.getResolution(
      this.wrappedTileCoord_[0]
    ), C = bv(
      e,
      i,
      _,
      y
    );
    if (!isFinite(C) || C <= 0) {
      this.state = X.EMPTY;
      return;
    }
    const x = c !== void 0 ? c : xv;
    if (this.triangulation_ = new wv(
      e,
      i,
      _,
      m,
      C * x,
      y
    ), this.triangulation_.getTriangles().length === 0) {
      this.state = X.EMPTY;
      return;
    }
    this.sourceZ_ = n.getZForResolution(C);
    let E = this.triangulation_.calculateSourceExtent();
    if (m && (e.canWrapX() ? (E[1] = Re(
      E[1],
      m[1],
      m[3]
    ), E[3] = Re(
      E[3],
      m[1],
      m[3]
    )) : E = qi(E, m)), !Lo(E))
      this.state = X.EMPTY;
    else {
      const S = n.getTileRangeForExtentAndZ(
        E,
        this.sourceZ_
      );
      for (let T = S.minX; T <= S.maxX; T++)
        for (let I = S.minY; I <= S.maxY; I++) {
          const b = u(this.sourceZ_, T, I, a);
          b && this.sourceTiles_.push(b);
        }
      this.sourceTiles_.length === 0 && (this.state = X.EMPTY);
    }
  }
  /**
   * Get the HTML Canvas element for this tile.
   * @return {HTMLCanvasElement} Canvas.
   */
  getImage() {
    return this.canvas_;
  }
  /**
   * @private
   */
  reproject_() {
    const e = [];
    if (this.sourceTiles_.forEach((n) => {
      n && n.getState() == X.LOADED && e.push({
        extent: this.sourceTileGrid_.getTileCoordExtent(n.tileCoord),
        image: n.getImage()
      });
    }), this.sourceTiles_.length = 0, e.length === 0)
      this.state = X.ERROR;
    else {
      const n = this.wrappedTileCoord_[0], i = this.targetTileGrid_.getTileSize(n), s = typeof i == "number" ? i : i[0], r = typeof i == "number" ? i : i[1], o = this.targetTileGrid_.getResolution(n), a = this.sourceTileGrid_.getResolution(
        this.sourceZ_
      ), l = this.targetTileGrid_.getTileCoordExtent(
        this.wrappedTileCoord_
      );
      this.canvas_ = Iv(
        s,
        r,
        this.pixelRatio_,
        a,
        this.sourceTileGrid_.getExtent(),
        o,
        l,
        this.triangulation_,
        e,
        this.gutter_,
        this.renderEdges_,
        this.interpolate
      ), this.state = X.LOADED;
    }
    this.changed();
  }
  /**
   * Load not yet loaded URI.
   */
  load() {
    if (this.state == X.IDLE) {
      this.state = X.LOADING, this.changed();
      let e = 0;
      this.sourcesListenerKeys_ = [], this.sourceTiles_.forEach((n) => {
        const i = n.getState();
        if (i == X.IDLE || i == X.LOADING) {
          e++;
          const s = he(
            n,
            H.CHANGE,
            function(r) {
              const o = n.getState();
              (o == X.LOADED || o == X.ERROR || o == X.EMPTY) && (Ce(s), e--, e === 0 && (this.unlistenSources_(), this.reproject_()));
            },
            this
          );
          this.sourcesListenerKeys_.push(s);
        }
      }), e === 0 ? setTimeout(this.reproject_.bind(this), 0) : this.sourceTiles_.forEach(function(n, i, s) {
        n.getState() == X.IDLE && n.load();
      });
    }
  }
  /**
   * @private
   */
  unlistenSources_() {
    this.sourcesListenerKeys_.forEach(Ce), this.sourcesListenerKeys_ = null;
  }
  /**
   * Remove from the cache due to expiry
   */
  release() {
    this.canvas_ && (Rr(this.canvas_.getContext("2d")), mi.push(this.canvas_), this.canvas_ = null), super.release();
  }
}
const $o = Tv;
class Rv {
  /**
   * @param {number} [highWaterMark] High water mark.
   */
  constructor(e) {
    this.highWaterMark = e !== void 0 ? e : 2048, this.count_ = 0, this.entries_ = {}, this.oldest_ = null, this.newest_ = null;
  }
  /**
   * @return {boolean} Can expire cache.
   */
  canExpireCache() {
    return this.highWaterMark > 0 && this.getCount() > this.highWaterMark;
  }
  /**
   * Expire the cache.
   * @param {!Object<string, boolean>} [keep] Keys to keep. To be implemented by subclasses.
   */
  expireCache(e) {
    for (; this.canExpireCache(); )
      this.pop();
  }
  /**
   * FIXME empty description for jsdoc
   */
  clear() {
    this.count_ = 0, this.entries_ = {}, this.oldest_ = null, this.newest_ = null;
  }
  /**
   * @param {string} key Key.
   * @return {boolean} Contains key.
   */
  containsKey(e) {
    return this.entries_.hasOwnProperty(e);
  }
  /**
   * @param {function(T, string, LRUCache<T>): ?} f The function
   *     to call for every entry from the oldest to the newer. This function takes
   *     3 arguments (the entry value, the entry key and the LRUCache object).
   *     The return value is ignored.
   */
  forEach(e) {
    let n = this.oldest_;
    for (; n; )
      e(n.value_, n.key_, this), n = n.newer;
  }
  /**
   * @param {string} key Key.
   * @param {*} [options] Options (reserved for subclasses).
   * @return {T} Value.
   */
  get(e, n) {
    const i = this.entries_[e];
    return ue(
      i !== void 0,
      "Tried to get a value for a key that does not exist in the cache"
    ), i === this.newest_ || (i === this.oldest_ ? (this.oldest_ = /** @type {Entry} */
    this.oldest_.newer, this.oldest_.older = null) : (i.newer.older = i.older, i.older.newer = i.newer), i.newer = null, i.older = this.newest_, this.newest_.newer = i, this.newest_ = i), i.value_;
  }
  /**
   * Remove an entry from the cache.
   * @param {string} key The entry key.
   * @return {T} The removed entry.
   */
  remove(e) {
    const n = this.entries_[e];
    return ue(
      n !== void 0,
      "Tried to get a value for a key that does not exist in the cache"
    ), n === this.newest_ ? (this.newest_ = /** @type {Entry} */
    n.older, this.newest_ && (this.newest_.newer = null)) : n === this.oldest_ ? (this.oldest_ = /** @type {Entry} */
    n.newer, this.oldest_ && (this.oldest_.older = null)) : (n.newer.older = n.older, n.older.newer = n.newer), delete this.entries_[e], --this.count_, n.value_;
  }
  /**
   * @return {number} Count.
   */
  getCount() {
    return this.count_;
  }
  /**
   * @return {Array<string>} Keys.
   */
  getKeys() {
    const e = new Array(this.count_);
    let n = 0, i;
    for (i = this.newest_; i; i = i.older)
      e[n++] = i.key_;
    return e;
  }
  /**
   * @return {Array<T>} Values.
   */
  getValues() {
    const e = new Array(this.count_);
    let n = 0, i;
    for (i = this.newest_; i; i = i.older)
      e[n++] = i.value_;
    return e;
  }
  /**
   * @return {T} Last value.
   */
  peekLast() {
    return this.oldest_.value_;
  }
  /**
   * @return {string} Last key.
   */
  peekLastKey() {
    return this.oldest_.key_;
  }
  /**
   * Get the key of the newest item in the cache.  Throws if the cache is empty.
   * @return {string} The newest key.
   */
  peekFirstKey() {
    return this.newest_.key_;
  }
  /**
   * Return an entry without updating least recently used time.
   * @param {string} key Key.
   * @return {T|undefined} Value.
   */
  peek(e) {
    var n;
    return (n = this.entries_[e]) == null ? void 0 : n.value_;
  }
  /**
   * @return {T} value Value.
   */
  pop() {
    const e = this.oldest_;
    return delete this.entries_[e.key_], e.newer && (e.newer.older = null), this.oldest_ = /** @type {Entry} */
    e.newer, this.oldest_ || (this.newest_ = null), --this.count_, e.value_;
  }
  /**
   * @param {string} key Key.
   * @param {T} value Value.
   */
  replace(e, n) {
    this.get(e), this.entries_[e].value_ = n;
  }
  /**
   * @param {string} key Key.
   * @param {T} value Value.
   */
  set(e, n) {
    ue(
      !(e in this.entries_),
      "Tried to set a value for a key that is used already"
    );
    const i = {
      key_: e,
      newer: null,
      older: this.newest_,
      value_: n
    };
    this.newest_ ? this.newest_.newer = i : this.oldest_ = i, this.newest_ = i, this.entries_[e] = i, ++this.count_;
  }
  /**
   * Set a maximum number of entries for the cache.
   * @param {number} size Cache size.
   * @api
   */
  setSize(e) {
    this.highWaterMark = e;
  }
}
const Lv = Rv;
function fu(t, e, n, i) {
  return i !== void 0 ? (i[0] = t, i[1] = e, i[2] = n, i) : [t, e, n];
}
function Dr(t, e, n) {
  return t + "/" + e + "/" + n;
}
function ph(t) {
  return Dr(t[0], t[1], t[2]);
}
function Av(t) {
  return t.split("/").map(Number);
}
function Pv(t) {
  return (t[1] << t[0]) + t[2];
}
function Mv(t, e) {
  const n = t[0], i = t[1], s = t[2];
  if (e.getMinZoom() > n || n > e.getMaxZoom())
    return !1;
  const r = e.getFullTileRange(n);
  return r ? r.containsXY(i, s) : !0;
}
class kv extends Lv {
  clear() {
    for (; this.getCount() > 0; )
      this.pop().release();
    super.clear();
  }
  /**
   * @param {!Object<string, boolean>} usedTiles Used tiles.
   */
  expireCache(e) {
    for (; this.canExpireCache() && !(this.peekLast().getKey() in e); )
      this.pop().release();
  }
  /**
   * Prune all tiles from the cache that don't have the same z as the newest tile.
   */
  pruneExceptNewestZ() {
    if (this.getCount() === 0)
      return;
    const e = this.peekFirstKey(), i = Av(e)[0];
    this.forEach((s) => {
      s.tileCoord[0] !== i && (this.remove(ph(s.tileCoord)), s.release());
    });
  }
}
const xh = kv, xo = {
  /**
   * Triggered when a tile starts loading.
   * @event module:ol/source/Tile.TileSourceEvent#tileloadstart
   * @api
   */
  TILELOADSTART: "tileloadstart",
  /**
   * Triggered when a tile finishes loading, either when its data is loaded,
   * or when loading was aborted because the tile is no longer needed.
   * @event module:ol/source/Tile.TileSourceEvent#tileloadend
   * @api
   */
  TILELOADEND: "tileloadend",
  /**
   * Triggered if tile loading results in an error. Note that this is not the
   * right place to re-fetch tiles. See {@link module:ol/ImageTile~ImageTile#load}
   * for details.
   * @event module:ol/source/Tile.TileSourceEvent#tileloaderror
   * @api
   */
  TILELOADERROR: "tileloaderror"
};
class Ov extends Nt {
  /**
   * @param {Options} options Source options.
   */
  constructor(e) {
    super(), this.projection = gt(e.projection), this.attributions_ = gu(e.attributions), this.attributionsCollapsible_ = e.attributionsCollapsible !== void 0 ? e.attributionsCollapsible : !0, this.loading = !1, this.state_ = e.state !== void 0 ? e.state : "ready", this.wrapX_ = e.wrapX !== void 0 ? e.wrapX : !1, this.interpolate_ = !!e.interpolate, this.viewResolver = null, this.viewRejector = null;
    const n = this;
    this.viewPromise_ = new Promise(function(i, s) {
      n.viewResolver = i, n.viewRejector = s;
    });
  }
  /**
   * Get the attribution function for the source.
   * @return {?Attribution} Attribution function.
   * @api
   */
  getAttributions() {
    return this.attributions_;
  }
  /**
   * @return {boolean} Attributions are collapsible.
   * @api
   */
  getAttributionsCollapsible() {
    return this.attributionsCollapsible_;
  }
  /**
   * Get the projection of the source.
   * @return {import("../proj/Projection.js").default|null} Projection.
   * @api
   */
  getProjection() {
    return this.projection;
  }
  /**
   * @param {import("../proj/Projection").default} [projection] Projection.
   * @return {Array<number>|null} Resolutions.
   */
  getResolutions(e) {
    return null;
  }
  /**
   * @return {Promise<import("../View.js").ViewOptions>} A promise for view-related properties.
   */
  getView() {
    return this.viewPromise_;
  }
  /**
   * Get the state of the source, see {@link import("./Source.js").State} for possible states.
   * @return {import("./Source.js").State} State.
   * @api
   */
  getState() {
    return this.state_;
  }
  /**
   * @return {boolean|undefined} Wrap X.
   */
  getWrapX() {
    return this.wrapX_;
  }
  /**
   * @return {boolean} Use linear interpolation when resampling.
   */
  getInterpolate() {
    return this.interpolate_;
  }
  /**
   * Refreshes the source. The source will be cleared, and data from the server will be reloaded.
   * @api
   */
  refresh() {
    this.changed();
  }
  /**
   * Set the attributions of the source.
   * @param {AttributionLike|undefined} attributions Attributions.
   *     Can be passed as `string`, `Array<string>`, {@link module:ol/source/Source~Attribution},
   *     or `undefined`.
   * @api
   */
  setAttributions(e) {
    this.attributions_ = gu(e), this.changed();
  }
  /**
   * Set the state of the source.
   * @param {import("./Source.js").State} state State.
   */
  setState(e) {
    this.state_ = e, this.changed();
  }
}
function gu(t) {
  return t ? Array.isArray(t) ? function(e) {
    return t;
  } : typeof t == "function" ? t : function(e) {
    return [t];
  } : null;
}
const Ch = Ov;
class Eh {
  /**
   * @param {number} minX Minimum X.
   * @param {number} maxX Maximum X.
   * @param {number} minY Minimum Y.
   * @param {number} maxY Maximum Y.
   */
  constructor(e, n, i, s) {
    this.minX = e, this.maxX = n, this.minY = i, this.maxY = s;
  }
  /**
   * @param {import("./tilecoord.js").TileCoord} tileCoord Tile coordinate.
   * @return {boolean} Contains tile coordinate.
   */
  contains(e) {
    return this.containsXY(e[1], e[2]);
  }
  /**
   * @param {TileRange} tileRange Tile range.
   * @return {boolean} Contains.
   */
  containsTileRange(e) {
    return this.minX <= e.minX && e.maxX <= this.maxX && this.minY <= e.minY && e.maxY <= this.maxY;
  }
  /**
   * @param {number} x Tile coordinate x.
   * @param {number} y Tile coordinate y.
   * @return {boolean} Contains coordinate.
   */
  containsXY(e, n) {
    return this.minX <= e && e <= this.maxX && this.minY <= n && n <= this.maxY;
  }
  /**
   * @param {TileRange} tileRange Tile range.
   * @return {boolean} Equals.
   */
  equals(e) {
    return this.minX == e.minX && this.minY == e.minY && this.maxX == e.maxX && this.maxY == e.maxY;
  }
  /**
   * @param {TileRange} tileRange Tile range.
   */
  extend(e) {
    e.minX < this.minX && (this.minX = e.minX), e.maxX > this.maxX && (this.maxX = e.maxX), e.minY < this.minY && (this.minY = e.minY), e.maxY > this.maxY && (this.maxY = e.maxY);
  }
  /**
   * @return {number} Height.
   */
  getHeight() {
    return this.maxY - this.minY + 1;
  }
  /**
   * @return {import("./size.js").Size} Size.
   */
  getSize() {
    return [this.getWidth(), this.getHeight()];
  }
  /**
   * @return {number} Width.
   */
  getWidth() {
    return this.maxX - this.minX + 1;
  }
  /**
   * @param {TileRange} tileRange Tile range.
   * @return {boolean} Intersects.
   */
  intersects(e) {
    return this.minX <= e.maxX && this.maxX >= e.minX && this.minY <= e.maxY && this.maxY >= e.minY;
  }
}
function Qn(t, e, n, i, s) {
  return s !== void 0 ? (s.minX = t, s.maxX = e, s.minY = n, s.maxY = i, s) : new Eh(t, e, n, i);
}
const wh = Eh, ei = [0, 0, 0], ln = 5;
class Dv {
  /**
   * @param {Options} options Tile grid options.
   */
  constructor(e) {
    this.minZoom = e.minZoom !== void 0 ? e.minZoom : 0, this.resolutions_ = e.resolutions, ue(
      Cf(
        this.resolutions_,
        /**
         * @param {number} a First resolution
         * @param {number} b Second resolution
         * @return {number} Comparison result
         */
        (s, r) => r - s,
        !0
      ),
      "`resolutions` must be sorted in descending order"
    );
    let n;
    if (!e.origins) {
      for (let s = 0, r = this.resolutions_.length - 1; s < r; ++s)
        if (!n)
          n = this.resolutions_[s] / this.resolutions_[s + 1];
        else if (this.resolutions_[s] / this.resolutions_[s + 1] !== n) {
          n = void 0;
          break;
        }
    }
    this.zoomFactor_ = n, this.maxZoom = this.resolutions_.length - 1, this.origin_ = e.origin !== void 0 ? e.origin : null, this.origins_ = null, e.origins !== void 0 && (this.origins_ = e.origins, ue(
      this.origins_.length == this.resolutions_.length,
      "Number of `origins` and `resolutions` must be equal"
    ));
    const i = e.extent;
    i !== void 0 && !this.origin_ && !this.origins_ && (this.origin_ = Wn(i)), ue(
      !this.origin_ && this.origins_ || this.origin_ && !this.origins_,
      "Either `origin` or `origins` must be configured, never both"
    ), this.tileSizes_ = null, e.tileSizes !== void 0 && (this.tileSizes_ = e.tileSizes, ue(
      this.tileSizes_.length == this.resolutions_.length,
      "Number of `tileSizes` and `resolutions` must be equal"
    )), this.tileSize_ = e.tileSize !== void 0 ? e.tileSize : this.tileSizes_ ? null : ra, ue(
      !this.tileSize_ && this.tileSizes_ || this.tileSize_ && !this.tileSizes_,
      "Either `tileSize` or `tileSizes` must be configured, never both"
    ), this.extent_ = i !== void 0 ? i : null, this.fullTileRanges_ = null, this.tmpSize_ = [0, 0], this.tmpExtent_ = [0, 0, 0, 0], e.sizes !== void 0 ? this.fullTileRanges_ = e.sizes.map((s, r) => {
      const o = new wh(
        Math.min(0, s[0]),
        Math.max(s[0] - 1, -1),
        Math.min(0, s[1]),
        Math.max(s[1] - 1, -1)
      );
      if (i) {
        const a = this.getTileRangeForExtentAndZ(i, r);
        o.minX = Math.max(a.minX, o.minX), o.maxX = Math.min(a.maxX, o.maxX), o.minY = Math.max(a.minY, o.minY), o.maxY = Math.min(a.maxY, o.maxY);
      }
      return o;
    }) : i && this.calculateTileRanges_(i);
  }
  /**
   * Call a function with each tile coordinate for a given extent and zoom level.
   *
   * @param {import("../extent.js").Extent} extent Extent.
   * @param {number} zoom Integer zoom level.
   * @param {function(import("../tilecoord.js").TileCoord): void} callback Function called with each tile coordinate.
   * @api
   */
  forEachTileCoord(e, n, i) {
    const s = this.getTileRangeForExtentAndZ(e, n);
    for (let r = s.minX, o = s.maxX; r <= o; ++r)
      for (let a = s.minY, l = s.maxY; a <= l; ++a)
        i([n, r, a]);
  }
  /**
   * @param {import("../tilecoord.js").TileCoord} tileCoord Tile coordinate.
   * @param {function(number, import("../TileRange.js").default): boolean} callback Callback.
   * @param {import("../TileRange.js").default} [tempTileRange] Temporary import("../TileRange.js").default object.
   * @param {import("../extent.js").Extent} [tempExtent] Temporary import("../extent.js").Extent object.
   * @return {boolean} Callback succeeded.
   */
  forEachTileCoordParentTileRange(e, n, i, s) {
    let r, o, a, l = null, u = e[0] - 1;
    for (this.zoomFactor_ === 2 ? (o = e[1], a = e[2]) : l = this.getTileCoordExtent(e, s); u >= this.minZoom; ) {
      if (o !== void 0 && a !== void 0 ? (o = Math.floor(o / 2), a = Math.floor(a / 2), r = Qn(o, o, a, a, i)) : r = this.getTileRangeForExtentAndZ(
        l,
        u,
        i
      ), n(u, r))
        return !0;
      --u;
    }
    return !1;
  }
  /**
   * Get the extent for this tile grid, if it was configured.
   * @return {import("../extent.js").Extent} Extent.
   * @api
   */
  getExtent() {
    return this.extent_;
  }
  /**
   * Get the maximum zoom level for the grid.
   * @return {number} Max zoom.
   * @api
   */
  getMaxZoom() {
    return this.maxZoom;
  }
  /**
   * Get the minimum zoom level for the grid.
   * @return {number} Min zoom.
   * @api
   */
  getMinZoom() {
    return this.minZoom;
  }
  /**
   * Get the origin for the grid at the given zoom level.
   * @param {number} z Integer zoom level.
   * @return {import("../coordinate.js").Coordinate} Origin.
   * @api
   */
  getOrigin(e) {
    return this.origin_ ? this.origin_ : this.origins_[e];
  }
  /**
   * Get the resolution for the given zoom level.
   * @param {number} z Integer zoom level.
   * @return {number} Resolution.
   * @api
   */
  getResolution(e) {
    return this.resolutions_[e];
  }
  /**
   * Get the list of resolutions for the tile grid.
   * @return {Array<number>} Resolutions.
   * @api
   */
  getResolutions() {
    return this.resolutions_;
  }
  /**
   * @param {import("../tilecoord.js").TileCoord} tileCoord Tile coordinate.
   * @param {import("../TileRange.js").default} [tempTileRange] Temporary import("../TileRange.js").default object.
   * @param {import("../extent.js").Extent} [tempExtent] Temporary import("../extent.js").Extent object.
   * @return {import("../TileRange.js").default|null} Tile range.
   */
  getTileCoordChildTileRange(e, n, i) {
    if (e[0] < this.maxZoom) {
      if (this.zoomFactor_ === 2) {
        const r = e[1] * 2, o = e[2] * 2;
        return Qn(
          r,
          r + 1,
          o,
          o + 1,
          n
        );
      }
      const s = this.getTileCoordExtent(
        e,
        i || this.tmpExtent_
      );
      return this.getTileRangeForExtentAndZ(
        s,
        e[0] + 1,
        n
      );
    }
    return null;
  }
  /**
   * @param {import("../tilecoord.js").TileCoord} tileCoord Tile coordinate.
   * @param {number} z Integer zoom level.
   * @param {import("../TileRange.js").default} [tempTileRange] Temporary import("../TileRange.js").default object.
   * @return {import("../TileRange.js").default|null} Tile range.
   */
  getTileRangeForTileCoordAndZ(e, n, i) {
    if (n > this.maxZoom || n < this.minZoom)
      return null;
    const s = e[0], r = e[1], o = e[2];
    if (n === s)
      return Qn(
        r,
        o,
        r,
        o,
        i
      );
    if (this.zoomFactor_) {
      const l = Math.pow(this.zoomFactor_, n - s), u = Math.floor(r * l), c = Math.floor(o * l);
      if (n < s)
        return Qn(u, u, c, c, i);
      const h = Math.floor(l * (r + 1)) - 1, d = Math.floor(l * (o + 1)) - 1;
      return Qn(u, h, c, d, i);
    }
    const a = this.getTileCoordExtent(e, this.tmpExtent_);
    return this.getTileRangeForExtentAndZ(a, n, i);
  }
  /**
   * Get a tile range for the given extent and integer zoom level.
   * @param {import("../extent.js").Extent} extent Extent.
   * @param {number} z Integer zoom level.
   * @param {import("../TileRange.js").default} [tempTileRange] Temporary tile range object.
   * @return {import("../TileRange.js").default} Tile range.
   */
  getTileRangeForExtentAndZ(e, n, i) {
    this.getTileCoordForXYAndZ_(e[0], e[3], n, !1, ei);
    const s = ei[1], r = ei[2];
    this.getTileCoordForXYAndZ_(e[2], e[1], n, !0, ei);
    const o = ei[1], a = ei[2];
    return Qn(s, o, r, a, i);
  }
  /**
   * @param {import("../tilecoord.js").TileCoord} tileCoord Tile coordinate.
   * @return {import("../coordinate.js").Coordinate} Tile center.
   */
  getTileCoordCenter(e) {
    const n = this.getOrigin(e[0]), i = this.getResolution(e[0]), s = st(this.getTileSize(e[0]), this.tmpSize_);
    return [
      n[0] + (e[1] + 0.5) * s[0] * i,
      n[1] - (e[2] + 0.5) * s[1] * i
    ];
  }
  /**
   * Get the extent of a tile coordinate.
   *
   * @param {import("../tilecoord.js").TileCoord} tileCoord Tile coordinate.
   * @param {import("../extent.js").Extent} [tempExtent] Temporary extent object.
   * @return {import("../extent.js").Extent} Extent.
   * @api
   */
  getTileCoordExtent(e, n) {
    const i = this.getOrigin(e[0]), s = this.getResolution(e[0]), r = st(this.getTileSize(e[0]), this.tmpSize_), o = i[0] + e[1] * r[0] * s, a = i[1] - (e[2] + 1) * r[1] * s, l = o + r[0] * s, u = a + r[1] * s;
    return pn(o, a, l, u, n);
  }
  /**
   * Get the tile coordinate for the given map coordinate and resolution.  This
   * method considers that coordinates that intersect tile boundaries should be
   * assigned the higher tile coordinate.
   *
   * @param {import("../coordinate.js").Coordinate} coordinate Coordinate.
   * @param {number} resolution Resolution.
   * @param {import("../tilecoord.js").TileCoord} [opt_tileCoord] Destination import("../tilecoord.js").TileCoord object.
   * @return {import("../tilecoord.js").TileCoord} Tile coordinate.
   * @api
   */
  getTileCoordForCoordAndResolution(e, n, i) {
    return this.getTileCoordForXYAndResolution_(
      e[0],
      e[1],
      n,
      !1,
      i
    );
  }
  /**
   * Note that this method should not be called for resolutions that correspond
   * to an integer zoom level.  Instead call the `getTileCoordForXYAndZ_` method.
   * @param {number} x X.
   * @param {number} y Y.
   * @param {number} resolution Resolution (for a non-integer zoom level).
   * @param {boolean} reverseIntersectionPolicy Instead of letting edge
   *     intersections go to the higher tile coordinate, let edge intersections
   *     go to the lower tile coordinate.
   * @param {import("../tilecoord.js").TileCoord} [opt_tileCoord] Temporary import("../tilecoord.js").TileCoord object.
   * @return {import("../tilecoord.js").TileCoord} Tile coordinate.
   * @private
   */
  getTileCoordForXYAndResolution_(e, n, i, s, r) {
    const o = this.getZForResolution(i), a = i / this.getResolution(o), l = this.getOrigin(o), u = st(this.getTileSize(o), this.tmpSize_);
    let c = a * (e - l[0]) / i / u[0], h = a * (l[1] - n) / i / u[1];
    return s ? (c = Gs(c, ln) - 1, h = Gs(h, ln) - 1) : (c = Vs(c, ln), h = Vs(h, ln)), fu(o, c, h, r);
  }
  /**
   * Although there is repetition between this method and `getTileCoordForXYAndResolution_`,
   * they should have separate implementations.  This method is for integer zoom
   * levels.  The other method should only be called for resolutions corresponding
   * to non-integer zoom levels.
   * @param {number} x Map x coordinate.
   * @param {number} y Map y coordinate.
   * @param {number} z Integer zoom level.
   * @param {boolean} reverseIntersectionPolicy Instead of letting edge
   *     intersections go to the higher tile coordinate, let edge intersections
   *     go to the lower tile coordinate.
   * @param {import("../tilecoord.js").TileCoord} [opt_tileCoord] Temporary import("../tilecoord.js").TileCoord object.
   * @return {import("../tilecoord.js").TileCoord} Tile coordinate.
   * @private
   */
  getTileCoordForXYAndZ_(e, n, i, s, r) {
    const o = this.getOrigin(i), a = this.getResolution(i), l = st(this.getTileSize(i), this.tmpSize_);
    let u = (e - o[0]) / a / l[0], c = (o[1] - n) / a / l[1];
    return s ? (u = Gs(u, ln) - 1, c = Gs(c, ln) - 1) : (u = Vs(u, ln), c = Vs(c, ln)), fu(i, u, c, r);
  }
  /**
   * Get a tile coordinate given a map coordinate and zoom level.
   * @param {import("../coordinate.js").Coordinate} coordinate Coordinate.
   * @param {number} z Integer zoom level, e.g. the result of a `getZForResolution()` method call
   * @param {import("../tilecoord.js").TileCoord} [opt_tileCoord] Destination import("../tilecoord.js").TileCoord object.
   * @return {import("../tilecoord.js").TileCoord} Tile coordinate.
   * @api
   */
  getTileCoordForCoordAndZ(e, n, i) {
    return this.getTileCoordForXYAndZ_(
      e[0],
      e[1],
      n,
      !1,
      i
    );
  }
  /**
   * @param {import("../tilecoord.js").TileCoord} tileCoord Tile coordinate.
   * @return {number} Tile resolution.
   */
  getTileCoordResolution(e) {
    return this.resolutions_[e[0]];
  }
  /**
   * Get the tile size for a zoom level. The type of the return value matches the
   * `tileSize` or `tileSizes` that the tile grid was configured with. To always
   * get an {@link import("../size.js").Size}, run the result through {@link module:ol/size.toSize}.
   * @param {number} z Z.
   * @return {number|import("../size.js").Size} Tile size.
   * @api
   */
  getTileSize(e) {
    return this.tileSize_ ? this.tileSize_ : this.tileSizes_[e];
  }
  /**
   * @param {number} z Zoom level.
   * @return {import("../TileRange.js").default|null} Extent tile range for the specified zoom level.
   */
  getFullTileRange(e) {
    return this.fullTileRanges_ ? this.fullTileRanges_[e] : this.extent_ ? this.getTileRangeForExtentAndZ(this.extent_, e) : null;
  }
  /**
   * @param {number} resolution Resolution.
   * @param {number|import("../array.js").NearestDirectionFunction} [opt_direction]
   *     If 0, the nearest resolution will be used.
   *     If 1, the nearest higher resolution (lower Z) will be used. If -1, the
   *     nearest lower resolution (higher Z) will be used. Default is 0.
   *     Use a {@link module:ol/array~NearestDirectionFunction} for more precise control.
   *
   * For example to change tile Z at the midpoint of zoom levels
   * ```js
   * function(value, high, low) {
   *   return value - low * Math.sqrt(high / low);
   * }
   * ```
   * @return {number} Z.
   * @api
   */
  getZForResolution(e, n) {
    const i = na(
      this.resolutions_,
      e,
      n || 0
    );
    return Re(i, this.minZoom, this.maxZoom);
  }
  /**
   * The tile with the provided tile coordinate intersects the given viewport.
   * @param {import('../tilecoord.js').TileCoord} tileCoord Tile coordinate.
   * @param {Array<number>} viewport Viewport as returned from {@link module:ol/extent.getRotatedViewport}.
   * @return {boolean} The tile with the provided tile coordinate intersects the given viewport.
   */
  tileCoordIntersectsViewport(e, n) {
    return Vc(
      n,
      0,
      n.length,
      2,
      this.getTileCoordExtent(e)
    );
  }
  /**
   * @param {!import("../extent.js").Extent} extent Extent for this tile grid.
   * @private
   */
  calculateTileRanges_(e) {
    const n = this.resolutions_.length, i = new Array(n);
    for (let s = this.minZoom; s < n; ++s)
      i[s] = this.getTileRangeForExtentAndZ(e, s);
    this.fullTileRanges_ = i;
  }
}
const Sh = Dv;
function bh(t) {
  let e = t.getDefaultTileGrid();
  return e || (e = Gv(t), t.setDefaultTileGrid(e)), e;
}
function Fv(t, e, n) {
  const i = e[0], s = t.getTileCoordCenter(e), r = Ba(n);
  if (!Ci(r, s)) {
    const o = _e(r), a = Math.ceil(
      (r[0] - s[0]) / o
    );
    return s[0] += o * a, t.getTileCoordForCoordAndZ(s, i);
  }
  return e;
}
function Nv(t, e, n, i) {
  i = i !== void 0 ? i : "top-left";
  const s = Ih(t, e, n);
  return new Sh({
    extent: t,
    origin: Xf(t, i),
    resolutions: s,
    tileSize: n
  });
}
function Vv(t) {
  const e = t || {}, n = e.extent || gt("EPSG:3857").getExtent(), i = {
    extent: n,
    minZoom: e.minZoom,
    tileSize: e.tileSize,
    resolutions: Ih(
      n,
      e.maxZoom,
      e.tileSize,
      e.maxResolution
    )
  };
  return new Sh(i);
}
function Ih(t, e, n, i) {
  e = e !== void 0 ? e : Pf, n = st(n !== void 0 ? n : ra);
  const s = Ge(t), r = _e(t);
  i = i > 0 ? i : Math.max(r / n[0], s / n[1]);
  const o = e + 1, a = new Array(o);
  for (let l = 0; l < o; ++l)
    a[l] = i / Math.pow(2, l);
  return a;
}
function Gv(t, e, n, i) {
  const s = Ba(t);
  return Nv(s, e, n, i);
}
function Ba(t) {
  t = gt(t);
  let e = t.getExtent();
  if (!e) {
    const n = 180 * ns.degrees / t.getMetersPerUnit();
    e = pn(-n, -n, n, n);
  }
  return e;
}
class zv extends Ch {
  /**
   * @param {Options} options SourceTile source options.
   */
  constructor(e) {
    super({
      attributions: e.attributions,
      attributionsCollapsible: e.attributionsCollapsible,
      projection: e.projection,
      state: e.state,
      wrapX: e.wrapX,
      interpolate: e.interpolate
    }), this.on, this.once, this.un, this.opaque_ = e.opaque !== void 0 ? e.opaque : !1, this.tilePixelRatio_ = e.tilePixelRatio !== void 0 ? e.tilePixelRatio : 1, this.tileGrid = e.tileGrid !== void 0 ? e.tileGrid : null;
    const n = [256, 256];
    this.tileGrid && st(this.tileGrid.getTileSize(this.tileGrid.getMinZoom()), n), this.tileCache = new xh(e.cacheSize || 0), this.tmpSize = [0, 0], this.key_ = e.key || "", this.tileOptions = {
      transition: e.transition,
      interpolate: e.interpolate
    }, this.zDirection = e.zDirection ? e.zDirection : 0;
  }
  /**
   * @return {boolean} Can expire cache.
   */
  canExpireCache() {
    return this.tileCache.canExpireCache();
  }
  /**
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @param {!Object<string, boolean>} usedTiles Used tiles.
   */
  expireCache(e, n) {
    const i = this.getTileCacheForProjection(e);
    i && i.expireCache(n);
  }
  /**
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @param {number} z Zoom level.
   * @param {import("../TileRange.js").default} tileRange Tile range.
   * @param {function(import("../Tile.js").default):(boolean|void)} callback Called with each
   *     loaded tile.  If the callback returns `false`, the tile will not be
   *     considered loaded.
   * @return {boolean} The tile range is fully covered with loaded tiles.
   */
  forEachLoadedTile(e, n, i, s) {
    const r = this.getTileCacheForProjection(e);
    if (!r)
      return !1;
    let o = !0, a, l, u;
    for (let c = i.minX; c <= i.maxX; ++c)
      for (let h = i.minY; h <= i.maxY; ++h)
        l = Dr(n, c, h), u = !1, r.containsKey(l) && (a = /** @type {!import("../Tile.js").default} */
        r.get(l), u = a.getState() === X.LOADED, u && (u = s(a) !== !1)), u || (o = !1);
    return o;
  }
  /**
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @return {number} Gutter.
   */
  getGutterForProjection(e) {
    return 0;
  }
  /**
   * Return the key to be used for all tiles in the source.
   * @return {string} The key for all tiles.
   */
  getKey() {
    return this.key_;
  }
  /**
   * Set the value to be used as the key for all tiles in the source.
   * @param {string} key The key for tiles.
   * @protected
   */
  setKey(e) {
    this.key_ !== e && (this.key_ = e, this.changed());
  }
  /**
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @return {boolean} Opaque.
   */
  getOpaque(e) {
    return this.opaque_;
  }
  /**
   * @param {import("../proj/Projection").default} [projection] Projection.
   * @return {Array<number>|null} Resolutions.
   */
  getResolutions(e) {
    const n = e ? this.getTileGridForProjection(e) : this.tileGrid;
    return n ? n.getResolutions() : null;
  }
  /**
   * @abstract
   * @param {number} z Tile coordinate z.
   * @param {number} x Tile coordinate x.
   * @param {number} y Tile coordinate y.
   * @param {number} pixelRatio Pixel ratio.
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @return {!import("../Tile.js").default} Tile.
   */
  getTile(e, n, i, s, r) {
    return ce();
  }
  /**
   * Return the tile grid of the tile source.
   * @return {import("../tilegrid/TileGrid.js").default|null} Tile grid.
   * @api
   */
  getTileGrid() {
    return this.tileGrid;
  }
  /**
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @return {!import("../tilegrid/TileGrid.js").default} Tile grid.
   */
  getTileGridForProjection(e) {
    return this.tileGrid ? this.tileGrid : bh(e);
  }
  /**
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @return {import("../TileCache.js").default} Tile cache.
   * @protected
   */
  getTileCacheForProjection(e) {
    const n = this.getProjection();
    return ue(
      n === null || ii(n, e),
      "A VectorTile source can only be rendered if it has a projection compatible with the view projection."
    ), this.tileCache;
  }
  /**
   * Get the tile pixel ratio for this source. Subclasses may override this
   * method, which is meant to return a supported pixel ratio that matches the
   * provided `pixelRatio` as close as possible.
   * @param {number} pixelRatio Pixel ratio.
   * @return {number} Tile pixel ratio.
   */
  getTilePixelRatio(e) {
    return this.tilePixelRatio_;
  }
  /**
   * @param {number} z Z.
   * @param {number} pixelRatio Pixel ratio.
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @return {import("../size.js").Size} Tile size.
   */
  getTilePixelSize(e, n, i) {
    const s = this.getTileGridForProjection(i), r = this.getTilePixelRatio(n), o = st(s.getTileSize(e), this.tmpSize);
    return r == 1 ? o : Zg(o, r, this.tmpSize);
  }
  /**
   * Returns a tile coordinate wrapped around the x-axis. When the tile coordinate
   * is outside the resolution and extent range of the tile grid, `null` will be
   * returned.
   * @param {import("../tilecoord.js").TileCoord} tileCoord Tile coordinate.
   * @param {import("../proj/Projection.js").default} [projection] Projection.
   * @return {import("../tilecoord.js").TileCoord} Tile coordinate to be passed to the tileUrlFunction or
   *     null if no tile URL should be created for the passed `tileCoord`.
   */
  getTileCoordForTileUrlFunction(e, n) {
    n = n !== void 0 ? n : this.getProjection();
    const i = this.getTileGridForProjection(n);
    return this.getWrapX() && n.isGlobal() && (e = Fv(i, e, n)), Mv(e, i) ? e : null;
  }
  /**
   * Remove all cached tiles from the source. The next render cycle will fetch new tiles.
   * @api
   */
  clear() {
    this.tileCache.clear();
  }
  refresh() {
    this.clear(), super.refresh();
  }
  /**
   * Increases the cache size if needed
   * @param {number} tileCount Minimum number of tiles needed.
   * @param {import("../proj/Projection.js").default} projection Projection.
   */
  updateCacheSize(e, n) {
    const i = this.getTileCacheForProjection(n);
    e > i.highWaterMark && (i.highWaterMark = e);
  }
  /**
   * Marks a tile coord as being used, without triggering a load.
   * @abstract
   * @param {number} z Tile coordinate z.
   * @param {number} x Tile coordinate x.
   * @param {number} y Tile coordinate y.
   * @param {import("../proj/Projection.js").default} projection Projection.
   */
  useTile(e, n, i, s) {
  }
}
class Bv extends sn {
  /**
   * @param {string} type Type.
   * @param {import("../Tile.js").default} tile The tile.
   */
  constructor(e, n) {
    super(e), this.tile = n;
  }
}
const $v = zv;
function Wv(t, e) {
  const n = /\{z\}/g, i = /\{x\}/g, s = /\{y\}/g, r = /\{-y\}/g;
  return (
    /**
     * @param {import("./tilecoord.js").TileCoord} tileCoord Tile Coordinate.
     * @param {number} pixelRatio Pixel ratio.
     * @param {import("./proj/Projection.js").default} projection Projection.
     * @return {string|undefined} Tile URL.
     */
    function(o, a, l) {
      if (o)
        return t.replace(n, o[0].toString()).replace(i, o[1].toString()).replace(s, o[2].toString()).replace(r, function() {
          const u = o[0], c = e.getFullTileRange(u);
          if (!c)
            throw new Error(
              "The {-y} placeholder requires a tile grid with extent"
            );
          return (c.getHeight() - o[2] - 1).toString();
        });
    }
  );
}
function Xv(t, e) {
  const n = t.length, i = new Array(n);
  for (let s = 0; s < n; ++s)
    i[s] = Wv(t[s], e);
  return Yv(i);
}
function Yv(t) {
  return t.length === 1 ? t[0] : (
    /**
     * @param {import("./tilecoord.js").TileCoord} tileCoord Tile Coordinate.
     * @param {number} pixelRatio Pixel ratio.
     * @param {import("./proj/Projection.js").default} projection Projection.
     * @return {string|undefined} Tile URL.
     */
    function(e, n, i) {
      if (!e)
        return;
      const s = Pv(e), r = fi(s, t.length);
      return t[r](e, n, i);
    }
  );
}
function jv(t) {
  const e = [];
  let n = /\{([a-z])-([a-z])\}/.exec(t);
  if (n) {
    const i = n[1].charCodeAt(0), s = n[2].charCodeAt(0);
    let r;
    for (r = i; r <= s; ++r)
      e.push(t.replace(n[0], String.fromCharCode(r)));
    return e;
  }
  if (n = /\{(\d+)-(\d+)\}/.exec(t), n) {
    const i = parseInt(n[2], 10);
    for (let s = parseInt(n[1], 10); s <= i; s++)
      e.push(t.replace(n[0], s.toString()));
    return e;
  }
  return e.push(t), e;
}
class $a extends $v {
  /**
   * @param {Options} options Image tile options.
   */
  constructor(e) {
    super({
      attributions: e.attributions,
      cacheSize: e.cacheSize,
      opaque: e.opaque,
      projection: e.projection,
      state: e.state,
      tileGrid: e.tileGrid,
      tilePixelRatio: e.tilePixelRatio,
      wrapX: e.wrapX,
      transition: e.transition,
      interpolate: e.interpolate,
      key: e.key,
      attributionsCollapsible: e.attributionsCollapsible,
      zDirection: e.zDirection
    }), this.generateTileUrlFunction_ = this.tileUrlFunction === $a.prototype.tileUrlFunction, this.tileLoadFunction = e.tileLoadFunction, e.tileUrlFunction && (this.tileUrlFunction = e.tileUrlFunction), this.urls = null, e.urls ? this.setUrls(e.urls) : e.url && this.setUrl(e.url), this.tileLoadingKeys_ = {};
  }
  /**
   * Return the tile load function of the source.
   * @return {import("../Tile.js").LoadFunction} TileLoadFunction
   * @api
   */
  getTileLoadFunction() {
    return this.tileLoadFunction;
  }
  /**
   * Return the tile URL function of the source.
   * @return {import("../Tile.js").UrlFunction} TileUrlFunction
   * @api
   */
  getTileUrlFunction() {
    return Object.getPrototypeOf(this).tileUrlFunction === this.tileUrlFunction ? this.tileUrlFunction.bind(this) : this.tileUrlFunction;
  }
  /**
   * Return the URLs used for this source.
   * When a tileUrlFunction is used instead of url or urls,
   * null will be returned.
   * @return {!Array<string>|null} URLs.
   * @api
   */
  getUrls() {
    return this.urls;
  }
  /**
   * Handle tile change events.
   * @param {import("../events/Event.js").default} event Event.
   * @protected
   */
  handleTileChange(e) {
    const n = (
      /** @type {import("../Tile.js").default} */
      e.target
    ), i = fe(n), s = n.getState();
    let r;
    s == X.LOADING ? (this.tileLoadingKeys_[i] = !0, r = xo.TILELOADSTART) : i in this.tileLoadingKeys_ && (delete this.tileLoadingKeys_[i], r = s == X.ERROR ? xo.TILELOADERROR : s == X.LOADED ? xo.TILELOADEND : void 0), r != null && this.dispatchEvent(new Bv(r, n));
  }
  /**
   * Set the tile load function of the source.
   * @param {import("../Tile.js").LoadFunction} tileLoadFunction Tile load function.
   * @api
   */
  setTileLoadFunction(e) {
    this.tileCache.clear(), this.tileLoadFunction = e, this.changed();
  }
  /**
   * Set the tile URL function of the source.
   * @param {import("../Tile.js").UrlFunction} tileUrlFunction Tile URL function.
   * @param {string} [key] Optional new tile key for the source.
   * @api
   */
  setTileUrlFunction(e, n) {
    this.tileUrlFunction = e, this.tileCache.pruneExceptNewestZ(), typeof n < "u" ? this.setKey(n) : this.changed();
  }
  /**
   * Set the URL to use for requests.
   * @param {string} url URL.
   * @api
   */
  setUrl(e) {
    const n = jv(e);
    this.urls = n, this.setUrls(n);
  }
  /**
   * Set the URLs to use for requests.
   * @param {Array<string>} urls URLs.
   * @api
   */
  setUrls(e) {
    this.urls = e;
    const n = e.join(`
`);
    this.generateTileUrlFunction_ ? this.setTileUrlFunction(Xv(e, this.tileGrid), n) : this.setKey(n);
  }
  /**
   * @param {import("../tilecoord.js").TileCoord} tileCoord Tile coordinate.
   * @param {number} pixelRatio Pixel ratio.
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @return {string|undefined} Tile URL.
   */
  tileUrlFunction(e, n, i) {
  }
  /**
   * Marks a tile coord as being used, without triggering a load.
   * @param {number} z Tile coordinate z.
   * @param {number} x Tile coordinate x.
   * @param {number} y Tile coordinate y.
   */
  useTile(e, n, i) {
    const s = Dr(e, n, i);
    this.tileCache.containsKey(s) && this.tileCache.get(s);
  }
}
const Uv = $a;
class Zv extends Uv {
  /**
   * @param {!Options} options Image tile options.
   */
  constructor(e) {
    super({
      attributions: e.attributions,
      cacheSize: e.cacheSize,
      opaque: e.opaque,
      projection: e.projection,
      state: e.state,
      tileGrid: e.tileGrid,
      tileLoadFunction: e.tileLoadFunction ? e.tileLoadFunction : Kv,
      tilePixelRatio: e.tilePixelRatio,
      tileUrlFunction: e.tileUrlFunction,
      url: e.url,
      urls: e.urls,
      wrapX: e.wrapX,
      transition: e.transition,
      interpolate: e.interpolate !== void 0 ? e.interpolate : !0,
      key: e.key,
      attributionsCollapsible: e.attributionsCollapsible,
      zDirection: e.zDirection
    }), this.crossOrigin = e.crossOrigin !== void 0 ? e.crossOrigin : null, this.tileClass = e.tileClass !== void 0 ? e.tileClass : yh, this.tileCacheForProjection = {}, this.tileGridForProjection = {}, this.reprojectionErrorThreshold_ = e.reprojectionErrorThreshold, this.renderReprojectionEdges_ = !1;
  }
  /**
   * @return {boolean} Can expire cache.
   */
  canExpireCache() {
    if (this.tileCache.canExpireCache())
      return !0;
    for (const e in this.tileCacheForProjection)
      if (this.tileCacheForProjection[e].canExpireCache())
        return !0;
    return !1;
  }
  /**
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @param {!Object<string, boolean>} usedTiles Used tiles.
   */
  expireCache(e, n) {
    const i = this.getTileCacheForProjection(e);
    this.tileCache.expireCache(
      this.tileCache == i ? n : {}
    );
    for (const s in this.tileCacheForProjection) {
      const r = this.tileCacheForProjection[s];
      r.expireCache(r == i ? n : {});
    }
  }
  /**
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @return {number} Gutter.
   */
  getGutterForProjection(e) {
    return this.getProjection() && e && !ii(this.getProjection(), e) ? 0 : this.getGutter();
  }
  /**
   * @return {number} Gutter.
   */
  getGutter() {
    return 0;
  }
  /**
   * Return the key to be used for all tiles in the source.
   * @return {string} The key for all tiles.
   */
  getKey() {
    let e = super.getKey();
    return this.getInterpolate() || (e += ":disable-interpolation"), e;
  }
  /**
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @return {boolean} Opaque.
   */
  getOpaque(e) {
    return this.getProjection() && e && !ii(this.getProjection(), e) ? !1 : super.getOpaque(e);
  }
  /**
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @return {!import("../tilegrid/TileGrid.js").default} Tile grid.
   */
  getTileGridForProjection(e) {
    const n = this.getProjection();
    if (this.tileGrid && (!n || ii(n, e)))
      return this.tileGrid;
    const i = fe(e);
    return i in this.tileGridForProjection || (this.tileGridForProjection[i] = bh(e)), this.tileGridForProjection[i];
  }
  /**
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @return {import("../TileCache.js").default} Tile cache.
   */
  getTileCacheForProjection(e) {
    const n = this.getProjection();
    if (!n || ii(n, e))
      return this.tileCache;
    const i = fe(e);
    return i in this.tileCacheForProjection || (this.tileCacheForProjection[i] = new xh(
      this.tileCache.highWaterMark
    )), this.tileCacheForProjection[i];
  }
  /**
   * @param {number} z Tile coordinate z.
   * @param {number} x Tile coordinate x.
   * @param {number} y Tile coordinate y.
   * @param {number} pixelRatio Pixel ratio.
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @param {string} key The key set on the tile.
   * @return {!ImageTile} Tile.
   * @private
   */
  createTile_(e, n, i, s, r, o) {
    const a = [e, n, i], l = this.getTileCoordForTileUrlFunction(
      a,
      r
    ), u = l ? this.tileUrlFunction(l, s, r) : void 0, c = new this.tileClass(
      a,
      u !== void 0 ? X.IDLE : X.EMPTY,
      u !== void 0 ? u : "",
      this.crossOrigin,
      this.tileLoadFunction,
      this.tileOptions
    );
    return c.key = o, c.addEventListener(H.CHANGE, this.handleTileChange.bind(this)), c;
  }
  /**
   * @param {number} z Tile coordinate z.
   * @param {number} x Tile coordinate x.
   * @param {number} y Tile coordinate y.
   * @param {number} pixelRatio Pixel ratio.
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @return {!(ImageTile|ReprojTile)} Tile.
   */
  getTile(e, n, i, s, r) {
    const o = this.getProjection();
    if (!o || !r || ii(o, r))
      return this.getTileInternal(
        e,
        n,
        i,
        s,
        o || r
      );
    const a = this.getTileCacheForProjection(r), l = [e, n, i];
    let u;
    const c = ph(l);
    a.containsKey(c) && (u = a.get(c));
    const h = this.getKey();
    if (u && u.key == h)
      return u;
    const d = this.getTileGridForProjection(o), f = this.getTileGridForProjection(r), g = this.getTileCoordForTileUrlFunction(
      l,
      r
    ), m = new $o(
      o,
      d,
      r,
      f,
      l,
      g,
      this.getTilePixelRatio(s),
      this.getGutter(),
      (_, p, y, C) => this.getTileInternal(_, p, y, C, o),
      this.reprojectionErrorThreshold_,
      this.renderReprojectionEdges_,
      this.tileOptions
    );
    return m.key = h, u ? (m.interimTile = u, m.refreshInterimChain(), a.replace(c, m)) : a.set(c, m), m;
  }
  /**
   * @param {number} z Tile coordinate z.
   * @param {number} x Tile coordinate x.
   * @param {number} y Tile coordinate y.
   * @param {number} pixelRatio Pixel ratio.
   * @param {!import("../proj/Projection.js").default} projection Projection.
   * @return {!ImageTile} Tile.
   * @protected
   */
  getTileInternal(e, n, i, s, r) {
    let o = null;
    const a = Dr(e, n, i), l = this.getKey();
    if (!this.tileCache.containsKey(a))
      o = this.createTile_(e, n, i, s, r, l), this.tileCache.set(a, o);
    else if (o = this.tileCache.get(a), o.key != l) {
      const u = o;
      o = this.createTile_(e, n, i, s, r, l), u.getState() == X.IDLE ? o.interimTile = u.interimTile : o.interimTile = u, o.refreshInterimChain(), this.tileCache.replace(a, o);
    }
    return o;
  }
  /**
   * Sets whether to render reprojection edges or not (usually for debugging).
   * @param {boolean} render Render the edges.
   * @api
   */
  setRenderReprojectionEdges(e) {
    if (this.renderReprojectionEdges_ != e) {
      this.renderReprojectionEdges_ = e;
      for (const n in this.tileCacheForProjection)
        this.tileCacheForProjection[n].clear();
      this.changed();
    }
  }
  /**
   * Sets the tile grid to use when reprojecting the tiles to the given
   * projection instead of the default tile grid for the projection.
   *
   * This can be useful when the default tile grid cannot be created
   * (e.g. projection has no extent defined) or
   * for optimization reasons (custom tile size, resolutions, ...).
   *
   * @param {import("../proj.js").ProjectionLike} projection Projection.
   * @param {import("../tilegrid/TileGrid.js").default} tilegrid Tile grid to use for the projection.
   * @api
   */
  setTileGridForProjection(e, n) {
    const i = gt(e);
    if (i) {
      const s = fe(i);
      s in this.tileGridForProjection || (this.tileGridForProjection[s] = n);
    }
  }
  clear() {
    super.clear();
    for (const e in this.tileCacheForProjection)
      this.tileCacheForProjection[e].clear();
  }
}
function Kv(t, e) {
  t.getImage().src = e;
}
const Hv = Zv;
class qv extends Hv {
  /**
   * @param {Options} [options] XYZ options.
   */
  constructor(e) {
    e = e || {};
    const n = e.projection !== void 0 ? e.projection : "EPSG:3857", i = e.tileGrid !== void 0 ? e.tileGrid : Vv({
      extent: Ba(n),
      maxResolution: e.maxResolution,
      maxZoom: e.maxZoom,
      minZoom: e.minZoom,
      tileSize: e.tileSize
    });
    super({
      attributions: e.attributions,
      cacheSize: e.cacheSize,
      crossOrigin: e.crossOrigin,
      interpolate: e.interpolate,
      opaque: e.opaque,
      projection: n,
      reprojectionErrorThreshold: e.reprojectionErrorThreshold,
      tileGrid: i,
      tileLoadFunction: e.tileLoadFunction,
      tilePixelRatio: e.tilePixelRatio,
      tileUrlFunction: e.tileUrlFunction,
      url: e.url,
      urls: e.urls,
      wrapX: e.wrapX !== void 0 ? e.wrapX : !0,
      transition: e.transition,
      attributionsCollapsible: e.attributionsCollapsible,
      zDirection: e.zDirection
    }), this.gutter_ = e.gutter !== void 0 ? e.gutter : 0;
  }
  /**
   * @return {number} Gutter.
   */
  getGutter() {
    return this.gutter_;
  }
}
const Jv = qv, Qv = '&#169; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors.';
class ey extends Jv {
  /**
   * @param {Options} [options] Open Street Map options.
   */
  constructor(e) {
    e = e || {};
    let n;
    e.attributions !== void 0 ? n = e.attributions : n = [Qv];
    const i = e.crossOrigin !== void 0 ? e.crossOrigin : "anonymous", s = e.url !== void 0 ? e.url : "https://tile.openstreetmap.org/{z}/{x}/{y}.png";
    super({
      attributions: n,
      attributionsCollapsible: !1,
      cacheSize: e.cacheSize,
      crossOrigin: i,
      interpolate: e.interpolate,
      maxZoom: e.maxZoom !== void 0 ? e.maxZoom : 19,
      opaque: e.opaque !== void 0 ? e.opaque : !0,
      reprojectionErrorThreshold: e.reprojectionErrorThreshold,
      tileLoadFunction: e.tileLoadFunction,
      transition: e.transition,
      url: s,
      wrapX: e.wrapX,
      zDirection: e.zDirection
    });
  }
}
const ty = ey;
class Wa extends Nt {
  /**
   * @param {Geometry|ObjectWithGeometry<Geometry>} [geometryOrProperties]
   *     You may pass a Geometry object directly, or an object literal containing
   *     properties. If you pass an object literal, you may include a Geometry
   *     associated with a `geometry` key.
   */
  constructor(e) {
    if (super(), this.on, this.once, this.un, this.id_ = void 0, this.geometryName_ = "geometry", this.style_ = null, this.styleFunction_ = void 0, this.geometryChangeKey_ = null, this.addChangeListener(this.geometryName_, this.handleGeometryChanged_), e)
      if (typeof /** @type {?} */
      e.getSimplifiedGeometry == "function") {
        const n = (
          /** @type {Geometry} */
          e
        );
        this.setGeometry(n);
      } else {
        const n = e;
        this.setProperties(n);
      }
  }
  /**
   * Clone this feature. If the original feature has a geometry it
   * is also cloned. The feature id is not set in the clone.
   * @return {Feature<Geometry>} The clone.
   * @api
   */
  clone() {
    const e = (
      /** @type {Feature<Geometry>} */
      new Wa(this.hasProperties() ? this.getProperties() : null)
    );
    e.setGeometryName(this.getGeometryName());
    const n = this.getGeometry();
    n && e.setGeometry(
      /** @type {Geometry} */
      n.clone()
    );
    const i = this.getStyle();
    return i && e.setStyle(i), e;
  }
  /**
   * Get the feature's default geometry.  A feature may have any number of named
   * geometries.  The "default" geometry (the one that is rendered by default) is
   * set when calling {@link module:ol/Feature~Feature#setGeometry}.
   * @return {Geometry|undefined} The default geometry for the feature.
   * @api
   * @observable
   */
  getGeometry() {
    return (
      /** @type {Geometry|undefined} */
      this.get(this.geometryName_)
    );
  }
  /**
   * Get the feature identifier.  This is a stable identifier for the feature and
   * is either set when reading data from a remote source or set explicitly by
   * calling {@link module:ol/Feature~Feature#setId}.
   * @return {number|string|undefined} Id.
   * @api
   */
  getId() {
    return this.id_;
  }
  /**
   * Get the name of the feature's default geometry.  By default, the default
   * geometry is named `geometry`.
   * @return {string} Get the property name associated with the default geometry
   *     for this feature.
   * @api
   */
  getGeometryName() {
    return this.geometryName_;
  }
  /**
   * Get the feature's style. Will return what was provided to the
   * {@link module:ol/Feature~Feature#setStyle} method.
   * @return {import("./style/Style.js").StyleLike|undefined} The feature style.
   * @api
   */
  getStyle() {
    return this.style_;
  }
  /**
   * Get the feature's style function.
   * @return {import("./style/Style.js").StyleFunction|undefined} Return a function
   * representing the current style of this feature.
   * @api
   */
  getStyleFunction() {
    return this.styleFunction_;
  }
  /**
   * @private
   */
  handleGeometryChange_() {
    this.changed();
  }
  /**
   * @private
   */
  handleGeometryChanged_() {
    this.geometryChangeKey_ && (Ce(this.geometryChangeKey_), this.geometryChangeKey_ = null);
    const e = this.getGeometry();
    e && (this.geometryChangeKey_ = he(
      e,
      H.CHANGE,
      this.handleGeometryChange_,
      this
    )), this.changed();
  }
  /**
   * Set the default geometry for the feature.  This will update the property
   * with the name returned by {@link module:ol/Feature~Feature#getGeometryName}.
   * @param {Geometry|undefined} geometry The new geometry.
   * @api
   * @observable
   */
  setGeometry(e) {
    this.set(this.geometryName_, e);
  }
  /**
   * Set the style for the feature to override the layer style.  This can be a
   * single style object, an array of styles, or a function that takes a
   * resolution and returns an array of styles. To unset the feature style, call
   * `setStyle()` without arguments or a falsey value.
   * @param {import("./style/Style.js").StyleLike} [style] Style for this feature.
   * @api
   * @fires module:ol/events/Event~BaseEvent#event:change
   */
  setStyle(e) {
    this.style_ = e, this.styleFunction_ = e ? ny(e) : void 0, this.changed();
  }
  /**
   * Set the feature id.  The feature id is considered stable and may be used when
   * requesting features or comparing identifiers returned from a remote source.
   * The feature id can be used with the
   * {@link module:ol/source/Vector~VectorSource#getFeatureById} method.
   * @param {number|string|undefined} id The feature id.
   * @api
   * @fires module:ol/events/Event~BaseEvent#event:change
   */
  setId(e) {
    this.id_ = e, this.changed();
  }
  /**
   * Set the property name to be used when getting the feature's default geometry.
   * When calling {@link module:ol/Feature~Feature#getGeometry}, the value of the property with
   * this name will be returned.
   * @param {string} name The property name of the default geometry.
   * @api
   */
  setGeometryName(e) {
    this.removeChangeListener(this.geometryName_, this.handleGeometryChanged_), this.geometryName_ = e, this.addChangeListener(this.geometryName_, this.handleGeometryChanged_), this.handleGeometryChanged_();
  }
}
function ny(t) {
  if (typeof t == "function")
    return t;
  let e;
  return Array.isArray(t) ? e = t : (ue(
    typeof /** @type {?} */
    t.getZIndex == "function",
    "Expected an `ol/style/Style` or an array of `ol/style/Style.js`"
  ), e = [
    /** @type {import("./style/Style.js").default} */
    t
  ]), function() {
    return e;
  };
}
const iy = Wa, js = {
  PRELOAD: "preload",
  USE_INTERIM_TILES_ON_ERROR: "useInterimTilesOnError"
};
class sy extends Tr {
  /**
   * @param {Options<TileSourceType>} [options] Tile layer options.
   */
  constructor(e) {
    e = e || {};
    const n = Object.assign({}, e);
    delete n.preload, delete n.useInterimTilesOnError, super(n), this.on, this.once, this.un, this.setPreload(e.preload !== void 0 ? e.preload : 0), this.setUseInterimTilesOnError(
      e.useInterimTilesOnError !== void 0 ? e.useInterimTilesOnError : !0
    );
  }
  /**
   * Return the level as number to which we will preload tiles up to.
   * @return {number} The level to preload tiles up to.
   * @observable
   * @api
   */
  getPreload() {
    return (
      /** @type {number} */
      this.get(js.PRELOAD)
    );
  }
  /**
   * Set the level as number to which we will preload tiles up to.
   * @param {number} preload The level to preload tiles up to.
   * @observable
   * @api
   */
  setPreload(e) {
    this.set(js.PRELOAD, e);
  }
  /**
   * Whether we use interim tiles on error.
   * @return {boolean} Use interim tiles on error.
   * @observable
   * @api
   */
  getUseInterimTilesOnError() {
    return (
      /** @type {boolean} */
      this.get(js.USE_INTERIM_TILES_ON_ERROR)
    );
  }
  /**
   * Set whether we use interim tiles on error.
   * @param {boolean} useInterimTilesOnError Use interim tiles on error.
   * @observable
   * @api
   */
  setUseInterimTilesOnError(e) {
    this.set(js.USE_INTERIM_TILES_ON_ERROR, e);
  }
  /**
   * Get data for a pixel location.  The return type depends on the source data.  For image tiles,
   * a four element RGBA array will be returned.  For data tiles, the array length will match the
   * number of bands in the dataset.  For requests outside the layer extent, `null` will be returned.
   * Data for a image tiles can only be retrieved if the source's `crossOrigin` property is set.
   *
   * ```js
   * // display layer data on every pointer move
   * map.on('pointermove', (event) => {
   *   console.log(layer.getData(event.pixel));
   * });
   * ```
   * @param {import("../pixel").Pixel} pixel Pixel.
   * @return {Uint8ClampedArray|Uint8Array|Float32Array|DataView|null} Pixel data.
   * @api
   */
  getData(e) {
    return super.getData(e);
  }
}
const ry = sy;
class oy extends hc {
  /**
   * @param {LayerType} layer Layer.
   */
  constructor(e) {
    super(), this.ready = !0, this.boundHandleImageChange_ = this.handleImageChange_.bind(this), this.layer_ = e, this.declutterExecutorGroup = null;
  }
  /**
   * Asynchronous layer level hit detection.
   * @param {import("../pixel.js").Pixel} pixel Pixel.
   * @return {Promise<Array<import("../Feature").FeatureLike>>} Promise that resolves with
   * an array of features.
   */
  getFeatures(e) {
    return ce();
  }
  /**
   * @param {import("../pixel.js").Pixel} pixel Pixel.
   * @return {Uint8ClampedArray|Uint8Array|Float32Array|DataView|null} Pixel data.
   */
  getData(e) {
    return null;
  }
  /**
   * Determine whether render should be called.
   * @abstract
   * @param {import("../Map.js").FrameState} frameState Frame state.
   * @return {boolean} Layer is ready to be rendered.
   */
  prepareFrame(e) {
    return ce();
  }
  /**
   * Render the layer.
   * @abstract
   * @param {import("../Map.js").FrameState} frameState Frame state.
   * @param {HTMLElement|null} target Target that may be used to render content to.
   * @return {HTMLElement|null} The rendered element.
   */
  renderFrame(e, n) {
    return ce();
  }
  /**
   * @param {Object<number, Object<string, import("../Tile.js").default>>} tiles Lookup of loaded tiles by zoom level.
   * @param {number} zoom Zoom level.
   * @param {import("../Tile.js").default} tile Tile.
   * @return {boolean|void} If `false`, the tile will not be considered loaded.
   */
  loadedTileCallback(e, n, i) {
    e[n] || (e[n] = {}), e[n][i.tileCoord.toString()] = i;
  }
  /**
   * Create a function that adds loaded tiles to the tile lookup.
   * @param {import("../source/Tile.js").default} source Tile source.
   * @param {import("../proj/Projection.js").default} projection Projection of the tiles.
   * @param {Object<number, Object<string, import("../Tile.js").default>>} tiles Lookup of loaded tiles by zoom level.
   * @return {function(number, import("../TileRange.js").default):boolean} A function that can be
   *     called with a zoom level and a tile range to add loaded tiles to the lookup.
   * @protected
   */
  createLoadedTileFinder(e, n, i) {
    return (
      /**
       * @param {number} zoom Zoom level.
       * @param {import("../TileRange.js").default} tileRange Tile range.
       * @return {boolean} The tile range is fully loaded.
       */
      (s, r) => {
        const o = this.loadedTileCallback.bind(this, i, s);
        return e.forEachLoadedTile(n, s, r, o);
      }
    );
  }
  /**
   * @abstract
   * @param {import("../coordinate.js").Coordinate} coordinate Coordinate.
   * @param {import("../Map.js").FrameState} frameState Frame state.
   * @param {number} hitTolerance Hit tolerance in pixels.
   * @param {import("./vector.js").FeatureCallback<T>} callback Feature callback.
   * @param {Array<import("./Map.js").HitMatch<T>>} matches The hit detected matches with tolerance.
   * @return {T|undefined} Callback result.
   * @template T
   */
  forEachFeatureAtCoordinate(e, n, i, s, r) {
  }
  /**
   * @return {LayerType} Layer.
   */
  getLayer() {
    return this.layer_;
  }
  /**
   * Perform action necessary to get the layer rendered after new fonts have loaded
   * @abstract
   */
  handleFontsChanged() {
  }
  /**
   * Handle changes in image state.
   * @param {import("../events/Event.js").default} event Image change event.
   * @private
   */
  handleImageChange_(e) {
    const n = (
      /** @type {import("../Image.js").default} */
      e.target
    );
    (n.getState() === ee.LOADED || n.getState() === ee.ERROR) && this.renderIfReadyAndVisible();
  }
  /**
   * Load the image if not already loaded, and register the image change
   * listener if needed.
   * @param {import("../Image.js").default} image Image.
   * @return {boolean} `true` if the image is already loaded, `false` otherwise.
   * @protected
   */
  loadImage(e) {
    let n = e.getState();
    return n != ee.LOADED && n != ee.ERROR && e.addEventListener(H.CHANGE, this.boundHandleImageChange_), n == ee.IDLE && (e.load(), n = e.getState()), n == ee.LOADED;
  }
  /**
   * @protected
   */
  renderIfReadyAndVisible() {
    const e = this.getLayer();
    e && e.getVisible() && e.getSourceState() === "ready" && e.changed();
  }
  /**
   * @param {import("../Map.js").FrameState} frameState Frame state.
   */
  renderDeferred(e) {
  }
  /**
   * Clean up.
   */
  disposeInternal() {
    delete this.layer_, super.disposeInternal();
  }
}
const ay = oy;
class ly {
  constructor() {
    /**
     * @private
     * @param {...*} args Args.
     * @return {ZIndexContext} This.
     */
    El(this, "pushMethodArgs_", (...e) => (this.instructions_[this.zIndex + this.offset_].push(e), this));
    this.instructions_ = [], this.zIndex = 0, this.offset_ = 0, this.context_ = /** @type {ZIndexContextProxy} */
    new Proxy(CanvasRenderingContext2D.prototype, {
      get: (e, n) => {
        if (typeof /** @type {*} */
        Oo()[n] == "function")
          return this.instructions_[this.zIndex + this.offset_] || (this.instructions_[this.zIndex + this.offset_] = []), this.instructions_[this.zIndex + this.offset_].push(n), this.pushMethodArgs_;
      },
      set: (e, n, i) => (this.instructions_[this.zIndex + this.offset_] || (this.instructions_[this.zIndex + this.offset_] = []), this.instructions_[this.zIndex + this.offset_].push(n, i), !0)
    });
  }
  /**
   * Get a proxy for CanvasRenderingContext2D which does not support getting state
   * (e.g. `context.globalAlpha`, which will return `undefined`). To set state, if it relies on a
   * previous state (e.g. `context.globalAlpha = context.globalAlpha / 2`), set a function,
   * e.g. `context.globalAlpha = (context) => context.globalAlpha / 2`.
   * @return {ZIndexContextProxy} Context.
   */
  getContext() {
    return this.context_;
  }
  /**
   * @param {CanvasRenderingContext2D} context Context.
   */
  draw(e) {
    this.instructions_.forEach((n) => {
      for (let i = 0, s = n.length; i < s; i += 2) {
        const r = n[i], o = n[i + 1];
        if (typeof /** @type {*} */
        e[r] == "function")
          e[r](...o);
        else {
          if (typeof o == "function") {
            e[r] = o(e);
            continue;
          }
          e[r] = o;
        }
      }
    });
  }
  clear() {
    this.instructions_.length = 0, this.zIndex = 0, this.offset_ = 0;
  }
  /**
   * Offsets the zIndex by the highest current zIndex. Useful for rendering multiple worlds or tiles, to
   * avoid conflicting context.clip() or context.save()/restore() calls.
   */
  offset() {
    this.offset_ = this.instructions_.length, this.zIndex = 0;
  }
}
const Th = ly, mu = [];
let ai = null;
function uy() {
  ai = De(1, 1, void 0, {
    willReadFrequently: !0
  });
}
class cy extends ay {
  /**
   * @param {LayerType} layer Layer.
   */
  constructor(e) {
    super(e), this.container = null, this.renderedResolution, this.tempTransform = Ct(), this.pixelTransform = Ct(), this.inversePixelTransform = Ct(), this.context = null, this.deferredContext_ = null, this.containerReused = !1, this.pixelContext_ = null, this.frameState = null;
  }
  /**
   * @param {import('../../DataTile.js').ImageLike} image Image.
   * @param {number} col The column index.
   * @param {number} row The row index.
   * @return {Uint8ClampedArray|null} The image data.
   */
  getImageData(e, n, i) {
    ai || uy(), ai.clearRect(0, 0, 1, 1);
    let s;
    try {
      ai.drawImage(e, n, i, 1, 1, 0, 0, 1, 1), s = ai.getImageData(0, 0, 1, 1).data;
    } catch {
      return ai = null, null;
    }
    return s;
  }
  /**
   * @param {import('../../Map.js').FrameState} frameState Frame state.
   * @return {string} Background color.
   */
  getBackground(e) {
    let i = this.getLayer().getBackground();
    return typeof i == "function" && (i = i(e.viewState.resolution)), i || void 0;
  }
  /**
   * Get a rendering container from an existing target, if compatible.
   * @param {HTMLElement} target Potential render target.
   * @param {string} transform CSS Transform.
   * @param {string} [backgroundColor] Background color.
   */
  useContainer(e, n, i) {
    const s = this.getLayer().getClassName();
    let r, o;
    if (e && e.className === s && (!i || e && e.style.backgroundColor && In(
      os(e.style.backgroundColor),
      os(i)
    ))) {
      const a = e.firstElementChild;
      a instanceof HTMLCanvasElement && (o = a.getContext("2d"));
    }
    if (o && o.canvas.style.transform === n ? (this.container = e, this.context = o, this.containerReused = !0) : this.containerReused ? (this.container = null, this.context = null, this.containerReused = !1) : this.container && (this.container.style.backgroundColor = null), !this.container) {
      r = document.createElement("div"), r.className = s;
      let a = r.style;
      a.position = "absolute", a.width = "100%", a.height = "100%", o = De();
      const l = o.canvas;
      r.appendChild(l), a = l.style, a.position = "absolute", a.left = "0", a.transformOrigin = "top left", this.container = r, this.context = o;
    }
    !this.containerReused && i && !this.container.style.backgroundColor && (this.container.style.backgroundColor = i);
  }
  /**
   * @param {CanvasRenderingContext2D} context Context.
   * @param {import("../../Map.js").FrameState} frameState Frame state.
   * @param {import("../../extent.js").Extent} extent Clip extent.
   * @protected
   */
  clipUnrotated(e, n, i) {
    const s = Wn(i), r = Sr(i), o = wr(i), a = Er(i);
    Pe(n.coordinateToPixelTransform, s), Pe(n.coordinateToPixelTransform, r), Pe(n.coordinateToPixelTransform, o), Pe(n.coordinateToPixelTransform, a);
    const l = this.inversePixelTransform;
    Pe(l, s), Pe(l, r), Pe(l, o), Pe(l, a), e.save(), e.beginPath(), e.moveTo(Math.round(s[0]), Math.round(s[1])), e.lineTo(Math.round(r[0]), Math.round(r[1])), e.lineTo(Math.round(o[0]), Math.round(o[1])), e.lineTo(Math.round(a[0]), Math.round(a[1])), e.clip();
  }
  /**
   * @param {import("../../render/EventType.js").default} type Event type.
   * @param {CanvasRenderingContext2D} context Context.
   * @param {import("../../Map.js").FrameState} frameState Frame state.
   * @private
   */
  dispatchRenderEvent_(e, n, i) {
    const s = this.getLayer();
    if (s.hasListener(e)) {
      const r = new ch(
        e,
        this.inversePixelTransform,
        i,
        n
      );
      s.dispatchEvent(r);
    }
  }
  /**
   * @param {CanvasRenderingContext2D} context Context.
   * @param {import("../../Map.js").FrameState} frameState Frame state.
   * @protected
   */
  preRender(e, n) {
    this.frameState = n, !n.declutter && this.dispatchRenderEvent_(dt.PRERENDER, e, n);
  }
  /**
   * @param {CanvasRenderingContext2D} context Context.
   * @param {import("../../Map.js").FrameState} frameState Frame state.
   * @protected
   */
  postRender(e, n) {
    n.declutter || this.dispatchRenderEvent_(dt.POSTRENDER, e, n);
  }
  /**
   * @param {import("../../Map.js").FrameState} frameState Frame state.
   */
  renderDeferredInternal(e) {
  }
  /**
   * @param {import("../../Map.js").FrameState} frameState Frame state.
   * @return {import('../../render/canvas/ZIndexContext.js').ZIndexContextProxy} Context.
   */
  getRenderContext(e) {
    return e.declutter && !this.deferredContext_ && (this.deferredContext_ = new Th()), e.declutter ? this.deferredContext_.getContext() : this.context;
  }
  /**
   * @param {import("../../Map.js").FrameState} frameState Frame state.
   * @override
   */
  renderDeferred(e) {
    e.declutter && (this.dispatchRenderEvent_(
      dt.PRERENDER,
      this.context,
      e
    ), e.declutter && this.deferredContext_ && (this.deferredContext_.draw(this.context), this.deferredContext_.clear()), this.renderDeferredInternal(e), this.dispatchRenderEvent_(
      dt.POSTRENDER,
      this.context,
      e
    ));
  }
  /**
   * Creates a transform for rendering to an element that will be rotated after rendering.
   * @param {import("../../coordinate.js").Coordinate} center Center.
   * @param {number} resolution Resolution.
   * @param {number} rotation Rotation.
   * @param {number} pixelRatio Pixel ratio.
   * @param {number} width Width of the rendered element (in pixels).
   * @param {number} height Height of the rendered element (in pixels).
   * @param {number} offsetX Offset on the x-axis in view coordinates.
   * @protected
   * @return {!import("../../transform.js").Transform} Transform.
   */
  getRenderTransform(e, n, i, s, r, o, a) {
    const l = r / 2, u = o / 2, c = s / n, h = -c, d = -e[0] + a, f = -e[1];
    return Ot(
      this.tempTransform,
      l,
      u,
      c,
      h,
      -i,
      d,
      f
    );
  }
  /**
   * Clean up.
   */
  disposeInternal() {
    delete this.frameState, super.disposeInternal();
  }
}
const Rh = cy;
class hy extends Rh {
  /**
   * @param {LayerType} tileLayer Tile layer.
   */
  constructor(e) {
    super(e), this.extentChanged = !0, this.renderedExtent_ = null, this.renderedPixelRatio, this.renderedProjection = null, this.renderedRevision, this.renderedTiles = [], this.newTiles_ = !1, this.tmpExtent = ft(), this.tmpTileRange_ = new wh(0, 0, 0, 0);
  }
  /**
   * @protected
   * @param {import("../../Tile.js").default} tile Tile.
   * @return {boolean} Tile is drawable.
   */
  isDrawableTile(e) {
    const n = this.getLayer(), i = e.getState(), s = n.getUseInterimTilesOnError();
    return i == X.LOADED || i == X.EMPTY || i == X.ERROR && !s;
  }
  /**
   * @param {number} z Tile coordinate z.
   * @param {number} x Tile coordinate x.
   * @param {number} y Tile coordinate y.
   * @param {import("../../Map.js").FrameState} frameState Frame state.
   * @return {!import("../../Tile.js").default} Tile.
   */
  getTile(e, n, i, s) {
    const r = s.pixelRatio, o = s.viewState.projection, a = this.getLayer();
    let u = a.getSource().getTile(e, n, i, r, o);
    return u.getState() == X.ERROR && a.getUseInterimTilesOnError() && a.getPreload() > 0 && (this.newTiles_ = !0), this.isDrawableTile(u) || (u = u.getInterimTile()), u;
  }
  /**
   * @param {import("../../pixel.js").Pixel} pixel Pixel.
   * @return {Uint8ClampedArray} Data at the pixel location.
   */
  getData(e) {
    const n = this.frameState;
    if (!n)
      return null;
    const i = this.getLayer(), s = Pe(
      n.pixelToCoordinateTransform,
      e.slice()
    ), r = i.getExtent();
    if (r && !Ci(r, s))
      return null;
    const o = n.pixelRatio, a = n.viewState.projection, l = n.viewState, u = i.getRenderSource(), c = u.getTileGridForProjection(l.projection), h = u.getTilePixelRatio(n.pixelRatio);
    for (let d = c.getZForResolution(l.resolution); d >= c.getMinZoom(); --d) {
      const f = c.getTileCoordForCoordAndZ(s, d), g = u.getTile(
        d,
        f[1],
        f[2],
        o,
        a
      );
      if (!(g instanceof yh || g instanceof $o) || g instanceof $o && g.getState() === X.EMPTY)
        return null;
      if (g.getState() !== X.LOADED)
        continue;
      const m = c.getOrigin(d), _ = st(c.getTileSize(d)), p = c.getResolution(d), y = Math.floor(
        h * ((s[0] - m[0]) / p - f[1] * _[0])
      ), C = Math.floor(
        h * ((m[1] - s[1]) / p - f[2] * _[1])
      ), x = Math.round(
        h * u.getGutterForProjection(l.projection)
      );
      return this.getImageData(g.getImage(), y + x, C + x);
    }
    return null;
  }
  /**
   * @param {Object<number, Object<string, import("../../Tile.js").default>>} tiles Lookup of loaded tiles by zoom level.
   * @param {number} zoom Zoom level.
   * @param {import("../../Tile.js").default} tile Tile.
   * @return {boolean|void} If `false`, the tile will not be considered loaded.
   */
  loadedTileCallback(e, n, i) {
    return this.isDrawableTile(i) ? super.loadedTileCallback(e, n, i) : !1;
  }
  /**
   * Determine whether render should be called.
   * @param {import("../../Map.js").FrameState} frameState Frame state.
   * @return {boolean} Layer is ready to be rendered.
   */
  prepareFrame(e) {
    return !!this.getLayer().getSource();
  }
  /**
   * Render the layer.
   * @param {import("../../Map.js").FrameState} frameState Frame state.
   * @param {HTMLElement} target Target that may be used to render content to.
   * @return {HTMLElement} The rendered element.
   */
  renderFrame(e, n) {
    const i = e.layerStatesArray[e.layerIndex], s = e.viewState, r = s.projection, o = s.resolution, a = s.center, l = s.rotation, u = e.pixelRatio, c = this.getLayer(), h = c.getSource(), d = h.getRevision(), f = h.getTileGridForProjection(r), g = f.getZForResolution(o, h.zDirection), m = f.getResolution(g);
    let _ = e.extent;
    const p = e.viewState.resolution, y = h.getTilePixelRatio(u), C = Math.round(_e(_) / p * u), x = Math.round(Ge(_) / p * u), E = i.extent && On(i.extent);
    E && (_ = qi(
      _,
      On(i.extent)
    ));
    const S = m * C / 2 / y, T = m * x / 2 / y, I = [
      a[0] - S,
      a[1] - T,
      a[0] + S,
      a[1] + T
    ], b = f.getTileRangeForExtentAndZ(_, g), D = {};
    D[g] = {};
    const P = this.createLoadedTileFinder(
      h,
      r,
      D
    ), A = this.tmpExtent, M = this.tmpTileRange_;
    this.newTiles_ = !1;
    const k = l ? Po(
      s.center,
      p,
      l,
      e.size
    ) : void 0;
    for (let q = b.minX; q <= b.maxX; ++q)
      for (let L = b.minY; L <= b.maxY; ++L) {
        if (l && !f.tileCoordIntersectsViewport([g, q, L], k))
          continue;
        const se = this.getTile(g, q, L, e);
        if (this.isDrawableTile(se)) {
          const Ue = fe(this);
          if (se.getState() == X.LOADED) {
            D[g][se.tileCoord.toString()] = se;
            let vt = se.inTransition(Ue);
            vt && i.opacity !== 1 && (se.endTransition(Ue), vt = !1), !this.newTiles_ && (vt || !this.renderedTiles.includes(se)) && (this.newTiles_ = !0);
          }
          if (se.getAlpha(Ue, e.time) === 1)
            continue;
        }
        const oe = f.getTileCoordChildTileRange(
          se.tileCoord,
          M,
          A
        );
        let ve = !1;
        oe && (ve = P(g + 1, oe)), ve || f.forEachTileCoordParentTileRange(
          se.tileCoord,
          P,
          M,
          A
        );
      }
    const V = m / o * u / y;
    Ot(
      this.pixelTransform,
      e.size[0] / 2,
      e.size[1] / 2,
      1 / u,
      1 / u,
      l,
      -C / 2,
      -x / 2
    );
    const O = Rc(this.pixelTransform);
    this.useContainer(n, O, this.getBackground(e));
    const G = this.getRenderContext(e), F = this.context.canvas;
    ma(this.inversePixelTransform, this.pixelTransform), Ot(
      this.tempTransform,
      C / 2,
      x / 2,
      V,
      V,
      0,
      -C / 2,
      -x / 2
    ), F.width != C || F.height != x ? (F.width = C, F.height = x) : this.containerReused || G.clearRect(0, 0, C, x), E && this.clipUnrotated(G, e, E), h.getInterpolate() || (G.imageSmoothingEnabled = !1), this.preRender(G, e), this.renderedTiles.length = 0;
    let j = Object.keys(D).map(Number);
    j.sort(qt);
    let W, N, z;
    i.opacity === 1 && (!this.containerReused || h.getOpaque(e.viewState.projection)) ? j = j.reverse() : (W = [], N = []);
    for (let q = j.length - 1; q >= 0; --q) {
      const L = j[q], se = h.getTilePixelSize(
        L,
        u,
        r
      ), ve = f.getResolution(L) / m, Ue = se[0] * ve * V, vt = se[1] * ve * V, Ze = f.getTileCoordForCoordAndZ(
        Wn(I),
        L
      ), Ni = f.getTileCoordExtent(Ze), Rn = Pe(this.tempTransform, [
        y * (Ni[0] - I[0]) / m,
        y * (I[3] - Ni[3]) / m
      ]), Qr = y * h.getGutterForProjection(r), Ms = D[L];
      for (const ks in Ms) {
        const ot = (
          /** @type {import("../../ImageTile.js").default} */
          Ms[ks]
        ), Zn = ot.tileCoord, Os = Ze[1] - Zn[1], eo = Math.round(Rn[0] - (Os - 1) * Ue), Ds = Ze[2] - Zn[2], Fs = Math.round(Rn[1] - (Ds - 1) * vt), et = Math.round(Rn[0] - Os * Ue), yt = Math.round(Rn[1] - Ds * vt), bt = eo - et, pt = Fs - yt, Kn = g === L, Hn = Kn && ot.getAlpha(fe(this), e.time) !== 1;
        let on = !1;
        if (!Hn)
          if (W) {
            z = [et, yt, et + bt, yt, et + bt, yt + pt, et, yt + pt];
            for (let Gt = 0, to = W.length; Gt < to; ++Gt)
              if (g !== L && L < N[Gt]) {
                const Be = W[Gt];
                qe(
                  [et, yt, et + bt, yt + pt],
                  [Be[0], Be[3], Be[4], Be[7]]
                ) && (on || (G.save(), on = !0), G.beginPath(), G.moveTo(z[0], z[1]), G.lineTo(z[2], z[3]), G.lineTo(z[4], z[5]), G.lineTo(z[6], z[7]), G.moveTo(Be[6], Be[7]), G.lineTo(Be[4], Be[5]), G.lineTo(Be[2], Be[3]), G.lineTo(Be[0], Be[1]), G.clip());
              }
            W.push(z), N.push(L);
          } else
            G.clearRect(et, yt, bt, pt);
        this.drawTileImage(
          ot,
          e,
          et,
          yt,
          bt,
          pt,
          Qr,
          Kn
        ), W && !Hn ? (on && G.restore(), this.renderedTiles.unshift(ot)) : this.renderedTiles.push(ot), this.updateUsedTiles(e.usedTiles, h, ot);
      }
    }
    return this.renderedRevision = d, this.renderedResolution = m, this.extentChanged = !this.renderedExtent_ || !is(this.renderedExtent_, I), this.renderedExtent_ = I, this.renderedPixelRatio = u, this.renderedProjection = r, this.manageTilePyramid(
      e,
      h,
      f,
      u,
      r,
      _,
      g,
      c.getPreload()
    ), this.scheduleExpireCache(e, h), this.postRender(this.context, e), i.extent && G.restore(), G.imageSmoothingEnabled = !0, O !== F.style.transform && (F.style.transform = O), this.container;
  }
  /**
   * @param {import("../../ImageTile.js").default} tile Tile.
   * @param {import("../../Map.js").FrameState} frameState Frame state.
   * @param {number} x Left of the tile.
   * @param {number} y Top of the tile.
   * @param {number} w Width of the tile.
   * @param {number} h Height of the tile.
   * @param {number} gutter Tile gutter.
   * @param {boolean} transition Apply an alpha transition.
   */
  drawTileImage(e, n, i, s, r, o, a, l) {
    const u = this.getTileImage(e);
    if (!u)
      return;
    const c = this.getRenderContext(n), h = fe(this), d = n.layerStatesArray[n.layerIndex], f = d.opacity * (l ? e.getAlpha(h, n.time) : 1), g = f !== c.globalAlpha;
    g && (c.save(), c.globalAlpha = f), c.drawImage(
      u,
      a,
      a,
      u.width - 2 * a,
      u.height - 2 * a,
      i,
      s,
      r,
      o
    ), g && c.restore(), f !== d.opacity ? n.animate = !0 : l && e.endTransition(h);
  }
  /**
   * @return {HTMLCanvasElement} Image
   */
  getImage() {
    const e = this.context;
    return e ? e.canvas : null;
  }
  /**
   * Get the image from a tile.
   * @param {import("../../ImageTile.js").default} tile Tile.
   * @return {HTMLCanvasElement|HTMLImageElement|HTMLVideoElement} Image.
   * @protected
   */
  getTileImage(e) {
    return e.getImage();
  }
  /**
   * @param {import("../../Map.js").FrameState} frameState Frame state.
   * @param {import("../../source/Tile.js").default} tileSource Tile source.
   * @protected
   */
  scheduleExpireCache(e, n) {
    if (n.canExpireCache()) {
      const i = (function(s, r, o) {
        const a = fe(s);
        a in o.usedTiles && s.expireCache(
          o.viewState.projection,
          o.usedTiles[a]
        );
      }).bind(null, n);
      e.postRenderFunctions.push(
        /** @type {import("../../Map.js").PostRenderFunction} */
        i
      );
    }
  }
  /**
   * @param {!Object<string, !Object<string, boolean>>} usedTiles Used tiles.
   * @param {import("../../source/Tile.js").default} tileSource Tile source.
   * @param {import('../../Tile.js').default} tile Tile.
   * @protected
   */
  updateUsedTiles(e, n, i) {
    const s = fe(n);
    s in e || (e[s] = {}), e[s][i.getKey()] = !0;
  }
  /**
   * Manage tile pyramid.
   * This function performs a number of functions related to the tiles at the
   * current zoom and lower zoom levels:
   * - registers idle tiles in frameState.wantedTiles so that they are not
   *   discarded by the tile queue
   * - enqueues missing tiles
   * @param {import("../../Map.js").FrameState} frameState Frame state.
   * @param {import("../../source/Tile.js").default} tileSource Tile source.
   * @param {import("../../tilegrid/TileGrid.js").default} tileGrid Tile grid.
   * @param {number} pixelRatio Pixel ratio.
   * @param {import("../../proj/Projection.js").default} projection Projection.
   * @param {import("../../extent.js").Extent} extent Extent.
   * @param {number} currentZ Current Z.
   * @param {number} preload Load low resolution tiles up to `preload` levels.
   * @param {function(import("../../Tile.js").default):void} [tileCallback] Tile callback.
   * @protected
   */
  manageTilePyramid(e, n, i, s, r, o, a, l, u) {
    const c = fe(n);
    c in e.wantedTiles || (e.wantedTiles[c] = {});
    const h = e.wantedTiles[c], d = e.tileQueue, f = i.getMinZoom(), g = e.viewState.rotation, m = g ? Po(
      e.viewState.center,
      e.viewState.resolution,
      g,
      e.size
    ) : void 0;
    let _ = 0, p, y, C, x, E, S;
    for (S = f; S <= a; ++S)
      for (y = i.getTileRangeForExtentAndZ(o, S, y), C = i.getResolution(S), x = y.minX; x <= y.maxX; ++x)
        for (E = y.minY; E <= y.maxY; ++E)
          g && !i.tileCoordIntersectsViewport([S, x, E], m) || (a - S <= l ? (++_, p = n.getTile(S, x, E, s, r), p.getState() == X.IDLE && (h[p.getKey()] = !0, d.isKeyQueued(p.getKey()) || d.enqueue([
            p,
            c,
            i.getTileCoordCenter(p.tileCoord),
            C
          ])), u !== void 0 && u(p)) : n.useTile(S, x, E, r));
    n.updateCacheSize(_, r);
  }
}
const dy = hy;
class fy extends ry {
  /**
   * @param {import("./BaseTile.js").Options<TileSourceType>} [options] Tile layer options.
   */
  constructor(e) {
    super(e);
  }
  createRenderer() {
    return new dy(this);
  }
}
const gy = fy, Ts = {
  BEGIN_GEOMETRY: 0,
  BEGIN_PATH: 1,
  CIRCLE: 2,
  CLOSE_PATH: 3,
  CUSTOM: 4,
  DRAW_CHARS: 5,
  DRAW_IMAGE: 6,
  END_GEOMETRY: 7,
  FILL: 8,
  MOVE_TO_LINE_TO: 9,
  SET_FILL_STYLE: 10,
  SET_STROKE_STYLE: 11,
  STROKE: 12
}, Us = [Ts.FILL], _n = [Ts.STROKE], Nn = [Ts.BEGIN_PATH], _u = [Ts.CLOSE_PATH], Y = Ts;
class my {
  /**
   * Render a geometry with a custom renderer.
   *
   * @param {import("../geom/SimpleGeometry.js").default} geometry Geometry.
   * @param {import("../Feature.js").FeatureLike} feature Feature.
   * @param {Function} renderer Renderer.
   * @param {Function} hitDetectionRenderer Renderer.
   * @param {number} [index] Render order index.
   */
  drawCustom(e, n, i, s, r) {
  }
  /**
   * Render a geometry.
   *
   * @param {import("../geom/Geometry.js").default} geometry The geometry to render.
   */
  drawGeometry(e) {
  }
  /**
   * Set the rendering style.
   *
   * @param {import("../style/Style.js").default} style The rendering style.
   */
  setStyle(e) {
  }
  /**
   * @param {import("../geom/Circle.js").default} circleGeometry Circle geometry.
   * @param {import("../Feature.js").default} feature Feature.
   * @param {number} [index] Render order index.
   */
  drawCircle(e, n, i) {
  }
  /**
   * @param {import("../Feature.js").default} feature Feature.
   * @param {import("../style/Style.js").default} style Style.
   * @param {number} [index] Render order index.
   */
  drawFeature(e, n, i) {
  }
  /**
   * @param {import("../geom/GeometryCollection.js").default} geometryCollectionGeometry Geometry collection.
   * @param {import("../Feature.js").default} feature Feature.
   * @param {number} [index] Render order index.
   */
  drawGeometryCollection(e, n, i) {
  }
  /**
   * @param {import("../geom/LineString.js").default|import("./Feature.js").default} lineStringGeometry Line string geometry.
   * @param {import("../Feature.js").FeatureLike} feature Feature.
   * @param {number} [index] Render order index.
   */
  drawLineString(e, n, i) {
  }
  /**
   * @param {import("../geom/MultiLineString.js").default|import("./Feature.js").default} multiLineStringGeometry MultiLineString geometry.
   * @param {import("../Feature.js").FeatureLike} feature Feature.
   * @param {number} [index] Render order index.
   */
  drawMultiLineString(e, n, i) {
  }
  /**
   * @param {import("../geom/MultiPoint.js").default|import("./Feature.js").default} multiPointGeometry MultiPoint geometry.
   * @param {import("../Feature.js").FeatureLike} feature Feature.
   * @param {number} [index] Render order index.
   */
  drawMultiPoint(e, n, i) {
  }
  /**
   * @param {import("../geom/MultiPolygon.js").default} multiPolygonGeometry MultiPolygon geometry.
   * @param {import("../Feature.js").FeatureLike} feature Feature.
   * @param {number} [index] Render order index.
   */
  drawMultiPolygon(e, n, i) {
  }
  /**
   * @param {import("../geom/Point.js").default|import("./Feature.js").default} pointGeometry Point geometry.
   * @param {import("../Feature.js").FeatureLike} feature Feature.
   * @param {number} [index] Render order index.
   */
  drawPoint(e, n, i) {
  }
  /**
   * @param {import("../geom/Polygon.js").default|import("./Feature.js").default} polygonGeometry Polygon geometry.
   * @param {import("../Feature.js").FeatureLike} feature Feature.
   * @param {number} [index] Render order index.
   */
  drawPolygon(e, n, i) {
  }
  /**
   * @param {import("../geom/SimpleGeometry.js").default|import("./Feature.js").default} geometry Geometry.
   * @param {import("../Feature.js").FeatureLike} feature Feature.
   * @param {number} [index] Render order index.
   */
  drawText(e, n, i) {
  }
  /**
   * @param {import("../style/Fill.js").default} fillStyle Fill style.
   * @param {import("../style/Stroke.js").default} strokeStyle Stroke style.
   */
  setFillStrokeStyle(e, n) {
  }
  /**
   * @param {import("../style/Image.js").default} imageStyle Image style.
   * @param {import("../render/canvas.js").DeclutterImageWithText} [declutterImageWithText] Shared data for combined decluttering with a text style.
   */
  setImageStyle(e, n) {
  }
  /**
   * @param {import("../style/Text.js").default} textStyle Text style.
   * @param {import("../render/canvas.js").DeclutterImageWithText} [declutterImageWithText] Shared data for combined decluttering with an image style.
   */
  setTextStyle(e, n) {
  }
}
const Lh = my;
class _y extends Lh {
  /**
   * @param {number} tolerance Tolerance.
   * @param {import("../../extent.js").Extent} maxExtent Maximum extent.
   * @param {number} resolution Resolution.
   * @param {number} pixelRatio Pixel ratio.
   */
  constructor(e, n, i, s) {
    super(), this.tolerance = e, this.maxExtent = n, this.pixelRatio = s, this.maxLineWidth = 0, this.resolution = i, this.beginGeometryInstruction1_ = null, this.beginGeometryInstruction2_ = null, this.bufferedMaxExtent_ = null, this.instructions = [], this.coordinates = [], this.tmpCoordinate_ = [], this.hitDetectionInstructions = [], this.state = /** @type {import("../canvas.js").FillStrokeState} */
    {};
  }
  /**
   * @protected
   * @param {Array<number>} dashArray Dash array.
   * @return {Array<number>} Dash array with pixel ratio applied
   */
  applyPixelRatio(e) {
    const n = this.pixelRatio;
    return n == 1 ? e : e.map(function(i) {
      return i * n;
    });
  }
  /**
   * @param {Array<number>} flatCoordinates Flat coordinates.
   * @param {number} stride Stride.
   * @protected
   * @return {number} My end
   */
  appendFlatPointCoordinates(e, n) {
    const i = this.getBufferedMaxExtent(), s = this.tmpCoordinate_, r = this.coordinates;
    let o = r.length;
    for (let a = 0, l = e.length; a < l; a += n)
      s[0] = e[a], s[1] = e[a + 1], Ci(i, s) && (r[o++] = s[0], r[o++] = s[1]);
    return o;
  }
  /**
   * @param {Array<number>} flatCoordinates Flat coordinates.
   * @param {number} offset Offset.
   * @param {number} end End.
   * @param {number} stride Stride.
   * @param {boolean} closed Last input coordinate equals first.
   * @param {boolean} skipFirst Skip first coordinate.
   * @protected
   * @return {number} My end.
   */
  appendFlatLineCoordinates(e, n, i, s, r, o) {
    const a = this.coordinates;
    let l = a.length;
    const u = this.getBufferedMaxExtent();
    o && (n += s);
    let c = e[n], h = e[n + 1];
    const d = this.tmpCoordinate_;
    let f = !0, g, m, _;
    for (g = n + s; g < i; g += s)
      d[0] = e[g], d[1] = e[g + 1], _ = Ro(u, d), _ !== m ? (f && (a[l++] = c, a[l++] = h, f = !1), a[l++] = d[0], a[l++] = d[1]) : _ === Ae.INTERSECTING ? (a[l++] = d[0], a[l++] = d[1], f = !1) : f = !0, c = d[0], h = d[1], m = _;
    return (r && f || g === n + s) && (a[l++] = c, a[l++] = h), l;
  }
  /**
   * @param {Array<number>} flatCoordinates Flat coordinates.
   * @param {number} offset Offset.
   * @param {Array<number>} ends Ends.
   * @param {number} stride Stride.
   * @param {Array<number>} builderEnds Builder ends.
   * @return {number} Offset.
   */
  drawCustomCoordinates_(e, n, i, s, r) {
    for (let o = 0, a = i.length; o < a; ++o) {
      const l = i[o], u = this.appendFlatLineCoordinates(
        e,
        n,
        l,
        s,
        !1,
        !1
      );
      r.push(u), n = l;
    }
    return n;
  }
  /**
   * @param {import("../../geom/SimpleGeometry.js").default} geometry Geometry.
   * @param {import("../../Feature.js").FeatureLike} feature Feature.
   * @param {Function} renderer Renderer.
   * @param {Function} hitDetectionRenderer Renderer.
   * @param {number} [index] Render order index.
   */
  drawCustom(e, n, i, s, r) {
    this.beginGeometry(e, n, r);
    const o = e.getType(), a = e.getStride(), l = this.coordinates.length;
    let u, c, h, d, f;
    switch (o) {
      case "MultiPolygon":
        u = /** @type {import("../../geom/MultiPolygon.js").default} */
        e.getOrientedFlatCoordinates(), d = [];
        const g = (
          /** @type {import("../../geom/MultiPolygon.js").default} */
          e.getEndss()
        );
        f = 0;
        for (let m = 0, _ = g.length; m < _; ++m) {
          const p = [];
          f = this.drawCustomCoordinates_(
            u,
            f,
            g[m],
            a,
            p
          ), d.push(p);
        }
        this.instructions.push([
          Y.CUSTOM,
          l,
          d,
          e,
          i,
          $l,
          r
        ]), this.hitDetectionInstructions.push([
          Y.CUSTOM,
          l,
          d,
          e,
          s || i,
          $l,
          r
        ]);
        break;
      case "Polygon":
      case "MultiLineString":
        h = [], u = o == "Polygon" ? (
          /** @type {import("../../geom/Polygon.js").default} */
          e.getOrientedFlatCoordinates()
        ) : e.getFlatCoordinates(), f = this.drawCustomCoordinates_(
          u,
          0,
          /** @type {import("../../geom/Polygon.js").default|import("../../geom/MultiLineString.js").default} */
          e.getEnds(),
          a,
          h
        ), this.instructions.push([
          Y.CUSTOM,
          l,
          h,
          e,
          i,
          sr,
          r
        ]), this.hitDetectionInstructions.push([
          Y.CUSTOM,
          l,
          h,
          e,
          s || i,
          sr,
          r
        ]);
        break;
      case "LineString":
      case "Circle":
        u = e.getFlatCoordinates(), c = this.appendFlatLineCoordinates(
          u,
          0,
          u.length,
          a,
          !1,
          !1
        ), this.instructions.push([
          Y.CUSTOM,
          l,
          c,
          e,
          i,
          ci,
          r
        ]), this.hitDetectionInstructions.push([
          Y.CUSTOM,
          l,
          c,
          e,
          s || i,
          ci,
          r
        ]);
        break;
      case "MultiPoint":
        u = e.getFlatCoordinates(), c = this.appendFlatPointCoordinates(u, a), c > l && (this.instructions.push([
          Y.CUSTOM,
          l,
          c,
          e,
          i,
          ci,
          r
        ]), this.hitDetectionInstructions.push([
          Y.CUSTOM,
          l,
          c,
          e,
          s || i,
          ci,
          r
        ]));
        break;
      case "Point":
        u = e.getFlatCoordinates(), this.coordinates.push(u[0], u[1]), c = this.coordinates.length, this.instructions.push([
          Y.CUSTOM,
          l,
          c,
          e,
          i,
          void 0,
          r
        ]), this.hitDetectionInstructions.push([
          Y.CUSTOM,
          l,
          c,
          e,
          s || i,
          void 0,
          r
        ]);
        break;
    }
    this.endGeometry(n);
  }
  /**
   * @protected
   * @param {import("../../geom/Geometry").default|import("../Feature.js").default} geometry The geometry.
   * @param {import("../../Feature.js").FeatureLike} feature Feature.
   * @param {number} index Render order index
   */
  beginGeometry(e, n, i) {
    this.beginGeometryInstruction1_ = [
      Y.BEGIN_GEOMETRY,
      n,
      0,
      e,
      i
    ], this.instructions.push(this.beginGeometryInstruction1_), this.beginGeometryInstruction2_ = [
      Y.BEGIN_GEOMETRY,
      n,
      0,
      e,
      i
    ], this.hitDetectionInstructions.push(this.beginGeometryInstruction2_);
  }
  /**
   * @return {import("../canvas.js").SerializableInstructions} the serializable instructions.
   */
  finish() {
    return {
      instructions: this.instructions,
      hitDetectionInstructions: this.hitDetectionInstructions,
      coordinates: this.coordinates
    };
  }
  /**
   * Reverse the hit detection instructions.
   */
  reverseHitDetectionInstructions() {
    const e = this.hitDetectionInstructions;
    e.reverse();
    let n;
    const i = e.length;
    let s, r, o = -1;
    for (n = 0; n < i; ++n)
      s = e[n], r = /** @type {import("./Instruction.js").default} */
      s[0], r == Y.END_GEOMETRY ? o = n : r == Y.BEGIN_GEOMETRY && (s[2] = n, xf(this.hitDetectionInstructions, o, n), o = -1);
  }
  /**
   * @param {import("../../style/Fill.js").default} fillStyle Fill style.
   * @param {import("../../style/Stroke.js").default} strokeStyle Stroke style.
   */
  setFillStrokeStyle(e, n) {
    const i = this.state;
    if (e) {
      const s = e.getColor();
      i.fillPatternScale = s && typeof s == "object" && "src" in s ? this.pixelRatio : 1, i.fillStyle = Pt(
        s || He
      );
    } else
      i.fillStyle = void 0;
    if (n) {
      const s = n.getColor();
      i.strokeStyle = Pt(
        s || ls
      );
      const r = n.getLineCap();
      i.lineCap = r !== void 0 ? r : Ei;
      const o = n.getLineDash();
      i.lineDash = o ? o.slice() : Jt;
      const a = n.getLineDashOffset();
      i.lineDashOffset = a || Qt;
      const l = n.getLineJoin();
      i.lineJoin = l !== void 0 ? l : wi;
      const u = n.getWidth();
      i.lineWidth = u !== void 0 ? u : cs;
      const c = n.getMiterLimit();
      i.miterLimit = c !== void 0 ? c : as, i.lineWidth > this.maxLineWidth && (this.maxLineWidth = i.lineWidth, this.bufferedMaxExtent_ = null);
    } else
      i.strokeStyle = void 0, i.lineCap = void 0, i.lineDash = null, i.lineDashOffset = void 0, i.lineJoin = void 0, i.lineWidth = void 0, i.miterLimit = void 0;
  }
  /**
   * @param {import("../canvas.js").FillStrokeState} state State.
   * @return {Array<*>} Fill instruction.
   */
  createFill(e) {
    const n = e.fillStyle, i = [Y.SET_FILL_STYLE, n];
    return typeof n != "string" && i.push(e.fillPatternScale), i;
  }
  /**
   * @param {import("../canvas.js").FillStrokeState} state State.
   */
  applyStroke(e) {
    this.instructions.push(this.createStroke(e));
  }
  /**
   * @param {import("../canvas.js").FillStrokeState} state State.
   * @return {Array<*>} Stroke instruction.
   */
  createStroke(e) {
    return [
      Y.SET_STROKE_STYLE,
      e.strokeStyle,
      e.lineWidth * this.pixelRatio,
      e.lineCap,
      e.lineJoin,
      e.miterLimit,
      this.applyPixelRatio(e.lineDash),
      e.lineDashOffset * this.pixelRatio
    ];
  }
  /**
   * @param {import("../canvas.js").FillStrokeState} state State.
   * @param {function(this:CanvasBuilder, import("../canvas.js").FillStrokeState):Array<*>} createFill Create fill.
   */
  updateFillStyle(e, n) {
    const i = e.fillStyle;
    (typeof i != "string" || e.currentFillStyle != i) && (i !== void 0 && this.instructions.push(n.call(this, e)), e.currentFillStyle = i);
  }
  /**
   * @param {import("../canvas.js").FillStrokeState} state State.
   * @param {function(this:CanvasBuilder, import("../canvas.js").FillStrokeState): void} applyStroke Apply stroke.
   */
  updateStrokeStyle(e, n) {
    const i = e.strokeStyle, s = e.lineCap, r = e.lineDash, o = e.lineDashOffset, a = e.lineJoin, l = e.lineWidth, u = e.miterLimit;
    (e.currentStrokeStyle != i || e.currentLineCap != s || r != e.currentLineDash && !In(e.currentLineDash, r) || e.currentLineDashOffset != o || e.currentLineJoin != a || e.currentLineWidth != l || e.currentMiterLimit != u) && (i !== void 0 && n.call(this, e), e.currentStrokeStyle = i, e.currentLineCap = s, e.currentLineDash = r, e.currentLineDashOffset = o, e.currentLineJoin = a, e.currentLineWidth = l, e.currentMiterLimit = u);
  }
  /**
   * @param {import("../../Feature.js").FeatureLike} feature Feature.
   */
  endGeometry(e) {
    this.beginGeometryInstruction1_[2] = this.instructions.length, this.beginGeometryInstruction1_ = null, this.beginGeometryInstruction2_[2] = this.hitDetectionInstructions.length, this.beginGeometryInstruction2_ = null;
    const n = [Y.END_GEOMETRY, e];
    this.instructions.push(n), this.hitDetectionInstructions.push(n);
  }
  /**
   * Get the buffered rendering extent.  Rendering will be clipped to the extent
   * provided to the constructor.  To account for symbolizers that may intersect
   * this extent, we calculate a buffered extent (e.g. based on stroke width).
   * @return {import("../../extent.js").Extent} The buffered rendering extent.
   * @protected
   */
  getBufferedMaxExtent() {
    if (!this.bufferedMaxExtent_ && (this.bufferedMaxExtent_ = gc(this.maxExtent), this.maxLineWidth > 0)) {
      const e = this.resolution * (this.maxLineWidth + 1) / 2;
      oa(this.bufferedMaxExtent_, e, this.bufferedMaxExtent_);
    }
    return this.bufferedMaxExtent_;
  }
}
const Rs = _y;
class vy extends Rs {
  /**
   * @param {number} tolerance Tolerance.
   * @param {import("../../extent.js").Extent} maxExtent Maximum extent.
   * @param {number} resolution Resolution.
   * @param {number} pixelRatio Pixel ratio.
   */
  constructor(e, n, i, s) {
    super(e, n, i, s), this.hitDetectionImage_ = null, this.image_ = null, this.imagePixelRatio_ = void 0, this.anchorX_ = void 0, this.anchorY_ = void 0, this.height_ = void 0, this.opacity_ = void 0, this.originX_ = void 0, this.originY_ = void 0, this.rotateWithView_ = void 0, this.rotation_ = void 0, this.scale_ = void 0, this.width_ = void 0, this.declutterMode_ = void 0, this.declutterImageWithText_ = void 0;
  }
  /**
   * @param {import("../../geom/Point.js").default|import("../Feature.js").default} pointGeometry Point geometry.
   * @param {import("../../Feature.js").FeatureLike} feature Feature.
   * @param {number} [index] Render order index.
   */
  drawPoint(e, n, i) {
    if (!this.image_ || this.maxExtent && !Ci(this.maxExtent, e.getFlatCoordinates()))
      return;
    this.beginGeometry(e, n, i);
    const s = e.getFlatCoordinates(), r = e.getStride(), o = this.coordinates.length, a = this.appendFlatPointCoordinates(s, r);
    this.instructions.push([
      Y.DRAW_IMAGE,
      o,
      a,
      this.image_,
      // Remaining arguments to DRAW_IMAGE are in alphabetical order
      this.anchorX_ * this.imagePixelRatio_,
      this.anchorY_ * this.imagePixelRatio_,
      Math.ceil(this.height_ * this.imagePixelRatio_),
      this.opacity_,
      this.originX_ * this.imagePixelRatio_,
      this.originY_ * this.imagePixelRatio_,
      this.rotateWithView_,
      this.rotation_,
      [
        this.scale_[0] * this.pixelRatio / this.imagePixelRatio_,
        this.scale_[1] * this.pixelRatio / this.imagePixelRatio_
      ],
      Math.ceil(this.width_ * this.imagePixelRatio_),
      this.declutterMode_,
      this.declutterImageWithText_
    ]), this.hitDetectionInstructions.push([
      Y.DRAW_IMAGE,
      o,
      a,
      this.hitDetectionImage_,
      // Remaining arguments to DRAW_IMAGE are in alphabetical order
      this.anchorX_,
      this.anchorY_,
      this.height_,
      1,
      this.originX_,
      this.originY_,
      this.rotateWithView_,
      this.rotation_,
      this.scale_,
      this.width_,
      this.declutterMode_,
      this.declutterImageWithText_
    ]), this.endGeometry(n);
  }
  /**
   * @param {import("../../geom/MultiPoint.js").default|import("../Feature.js").default} multiPointGeometry MultiPoint geometry.
   * @param {import("../../Feature.js").FeatureLike} feature Feature.
   * @param {number} [index] Render order index.
   */
  drawMultiPoint(e, n, i) {
    if (!this.image_)
      return;
    this.beginGeometry(e, n, i);
    const s = e.getFlatCoordinates(), r = [];
    for (let l = 0, u = s.length; l < u; l += e.getStride())
      (!this.maxExtent || Ci(this.maxExtent, s.slice(l, l + 2))) && r.push(
        s[l],
        s[l + 1]
      );
    const o = this.coordinates.length, a = this.appendFlatPointCoordinates(r, 2);
    this.instructions.push([
      Y.DRAW_IMAGE,
      o,
      a,
      this.image_,
      // Remaining arguments to DRAW_IMAGE are in alphabetical order
      this.anchorX_ * this.imagePixelRatio_,
      this.anchorY_ * this.imagePixelRatio_,
      Math.ceil(this.height_ * this.imagePixelRatio_),
      this.opacity_,
      this.originX_ * this.imagePixelRatio_,
      this.originY_ * this.imagePixelRatio_,
      this.rotateWithView_,
      this.rotation_,
      [
        this.scale_[0] * this.pixelRatio / this.imagePixelRatio_,
        this.scale_[1] * this.pixelRatio / this.imagePixelRatio_
      ],
      Math.ceil(this.width_ * this.imagePixelRatio_),
      this.declutterMode_,
      this.declutterImageWithText_
    ]), this.hitDetectionInstructions.push([
      Y.DRAW_IMAGE,
      o,
      a,
      this.hitDetectionImage_,
      // Remaining arguments to DRAW_IMAGE are in alphabetical order
      this.anchorX_,
      this.anchorY_,
      this.height_,
      1,
      this.originX_,
      this.originY_,
      this.rotateWithView_,
      this.rotation_,
      this.scale_,
      this.width_,
      this.declutterMode_,
      this.declutterImageWithText_
    ]), this.endGeometry(n);
  }
  /**
   * @return {import("../canvas.js").SerializableInstructions} the serializable instructions.
   */
  finish() {
    return this.reverseHitDetectionInstructions(), this.anchorX_ = void 0, this.anchorY_ = void 0, this.hitDetectionImage_ = null, this.image_ = null, this.imagePixelRatio_ = void 0, this.height_ = void 0, this.scale_ = void 0, this.opacity_ = void 0, this.originX_ = void 0, this.originY_ = void 0, this.rotateWithView_ = void 0, this.rotation_ = void 0, this.width_ = void 0, super.finish();
  }
  /**
   * @param {import("../../style/Image.js").default} imageStyle Image style.
   * @param {Object} [sharedData] Shared data.
   */
  setImageStyle(e, n) {
    const i = e.getAnchor(), s = e.getSize(), r = e.getOrigin();
    this.imagePixelRatio_ = e.getPixelRatio(this.pixelRatio), this.anchorX_ = i[0], this.anchorY_ = i[1], this.hitDetectionImage_ = e.getHitDetectionImage(), this.image_ = e.getImage(this.pixelRatio), this.height_ = s[1], this.opacity_ = e.getOpacity(), this.originX_ = r[0], this.originY_ = r[1], this.rotateWithView_ = e.getRotateWithView(), this.rotation_ = e.getRotation(), this.scale_ = e.getScaleArray(), this.width_ = s[0], this.declutterMode_ = e.getDeclutterMode(), this.declutterImageWithText_ = n;
  }
}
const yy = vy;
class py extends Rs {
  /**
   * @param {number} tolerance Tolerance.
   * @param {import("../../extent.js").Extent} maxExtent Maximum extent.
   * @param {number} resolution Resolution.
   * @param {number} pixelRatio Pixel ratio.
   */
  constructor(e, n, i, s) {
    super(e, n, i, s);
  }
  /**
   * @param {Array<number>} flatCoordinates Flat coordinates.
   * @param {number} offset Offset.
   * @param {number} end End.
   * @param {number} stride Stride.
   * @private
   * @return {number} end.
   */
  drawFlatCoordinates_(e, n, i, s) {
    const r = this.coordinates.length, o = this.appendFlatLineCoordinates(
      e,
      n,
      i,
      s,
      !1,
      !1
    ), a = [
      Y.MOVE_TO_LINE_TO,
      r,
      o
    ];
    return this.instructions.push(a), this.hitDetectionInstructions.push(a), i;
  }
  /**
   * @param {import("../../geom/LineString.js").default|import("../Feature.js").default} lineStringGeometry Line string geometry.
   * @param {import("../../Feature.js").FeatureLike} feature Feature.
   * @param {number} [index] Render order index.
   */
  drawLineString(e, n, i) {
    const s = this.state, r = s.strokeStyle, o = s.lineWidth;
    if (r === void 0 || o === void 0)
      return;
    this.updateStrokeStyle(s, this.applyStroke), this.beginGeometry(e, n, i), this.hitDetectionInstructions.push(
      [
        Y.SET_STROKE_STYLE,
        s.strokeStyle,
        s.lineWidth,
        s.lineCap,
        s.lineJoin,
        s.miterLimit,
        Jt,
        Qt
      ],
      Nn
    );
    const a = e.getFlatCoordinates(), l = e.getStride();
    this.drawFlatCoordinates_(
      a,
      0,
      a.length,
      l
    ), this.hitDetectionInstructions.push(_n), this.endGeometry(n);
  }
  /**
   * @param {import("../../geom/MultiLineString.js").default|import("../Feature.js").default} multiLineStringGeometry MultiLineString geometry.
   * @param {import("../../Feature.js").FeatureLike} feature Feature.
   * @param {number} [index] Render order index.
   */
  drawMultiLineString(e, n, i) {
    const s = this.state, r = s.strokeStyle, o = s.lineWidth;
    if (r === void 0 || o === void 0)
      return;
    this.updateStrokeStyle(s, this.applyStroke), this.beginGeometry(e, n, i), this.hitDetectionInstructions.push(
      [
        Y.SET_STROKE_STYLE,
        s.strokeStyle,
        s.lineWidth,
        s.lineCap,
        s.lineJoin,
        s.miterLimit,
        Jt,
        Qt
      ],
      Nn
    );
    const a = e.getEnds(), l = e.getFlatCoordinates(), u = e.getStride();
    let c = 0;
    for (let h = 0, d = a.length; h < d; ++h)
      c = this.drawFlatCoordinates_(
        l,
        c,
        /** @type {number} */
        a[h],
        u
      );
    this.hitDetectionInstructions.push(_n), this.endGeometry(n);
  }
  /**
   * @return {import("../canvas.js").SerializableInstructions} the serializable instructions.
   */
  finish() {
    const e = this.state;
    return e.lastStroke != null && e.lastStroke != this.coordinates.length && this.instructions.push(_n), this.reverseHitDetectionInstructions(), this.state = null, super.finish();
  }
  /**
   * @param {import("../canvas.js").FillStrokeState} state State.
   */
  applyStroke(e) {
    e.lastStroke != null && e.lastStroke != this.coordinates.length && (this.instructions.push(_n), e.lastStroke = this.coordinates.length), e.lastStroke = 0, super.applyStroke(e), this.instructions.push(Nn);
  }
}
const xy = py;
class Cy extends Rs {
  /**
   * @param {number} tolerance Tolerance.
   * @param {import("../../extent.js").Extent} maxExtent Maximum extent.
   * @param {number} resolution Resolution.
   * @param {number} pixelRatio Pixel ratio.
   */
  constructor(e, n, i, s) {
    super(e, n, i, s);
  }
  /**
   * @param {Array<number>} flatCoordinates Flat coordinates.
   * @param {number} offset Offset.
   * @param {Array<number>} ends Ends.
   * @param {number} stride Stride.
   * @private
   * @return {number} End.
   */
  drawFlatCoordinatess_(e, n, i, s) {
    const r = this.state, o = r.fillStyle !== void 0, a = r.strokeStyle !== void 0, l = i.length;
    this.instructions.push(Nn), this.hitDetectionInstructions.push(Nn);
    for (let u = 0; u < l; ++u) {
      const c = i[u], h = this.coordinates.length, d = this.appendFlatLineCoordinates(
        e,
        n,
        c,
        s,
        !0,
        !a
      ), f = [
        Y.MOVE_TO_LINE_TO,
        h,
        d
      ];
      this.instructions.push(f), this.hitDetectionInstructions.push(f), a && (this.instructions.push(_u), this.hitDetectionInstructions.push(_u)), n = c;
    }
    return o && (this.instructions.push(Us), this.hitDetectionInstructions.push(Us)), a && (this.instructions.push(_n), this.hitDetectionInstructions.push(_n)), n;
  }
  /**
   * @param {import("../../geom/Circle.js").default} circleGeometry Circle geometry.
   * @param {import("../../Feature.js").default} feature Feature.
   * @param {number} [index] Render order index.
   */
  drawCircle(e, n, i) {
    const s = this.state, r = s.fillStyle, o = s.strokeStyle;
    if (r === void 0 && o === void 0)
      return;
    this.setFillStrokeStyles_(), this.beginGeometry(e, n, i), s.fillStyle !== void 0 && this.hitDetectionInstructions.push([
      Y.SET_FILL_STYLE,
      He
    ]), s.strokeStyle !== void 0 && this.hitDetectionInstructions.push([
      Y.SET_STROKE_STYLE,
      s.strokeStyle,
      s.lineWidth,
      s.lineCap,
      s.lineJoin,
      s.miterLimit,
      Jt,
      Qt
    ]);
    const a = e.getFlatCoordinates(), l = e.getStride(), u = this.coordinates.length;
    this.appendFlatLineCoordinates(
      a,
      0,
      a.length,
      l,
      !1,
      !1
    );
    const c = [Y.CIRCLE, u];
    this.instructions.push(Nn, c), this.hitDetectionInstructions.push(Nn, c), s.fillStyle !== void 0 && (this.instructions.push(Us), this.hitDetectionInstructions.push(Us)), s.strokeStyle !== void 0 && (this.instructions.push(_n), this.hitDetectionInstructions.push(_n)), this.endGeometry(n);
  }
  /**
   * @param {import("../../geom/Polygon.js").default|import("../Feature.js").default} polygonGeometry Polygon geometry.
   * @param {import("../../Feature.js").FeatureLike} feature Feature.
   * @param {number} [index] Render order index.
   */
  drawPolygon(e, n, i) {
    const s = this.state, r = s.fillStyle, o = s.strokeStyle;
    if (r === void 0 && o === void 0)
      return;
    this.setFillStrokeStyles_(), this.beginGeometry(e, n, i), s.fillStyle !== void 0 && this.hitDetectionInstructions.push([
      Y.SET_FILL_STYLE,
      He
    ]), s.strokeStyle !== void 0 && this.hitDetectionInstructions.push([
      Y.SET_STROKE_STYLE,
      s.strokeStyle,
      s.lineWidth,
      s.lineCap,
      s.lineJoin,
      s.miterLimit,
      Jt,
      Qt
    ]);
    const a = e.getEnds(), l = e.getOrientedFlatCoordinates(), u = e.getStride();
    this.drawFlatCoordinatess_(
      l,
      0,
      /** @type {Array<number>} */
      a,
      u
    ), this.endGeometry(n);
  }
  /**
   * @param {import("../../geom/MultiPolygon.js").default} multiPolygonGeometry MultiPolygon geometry.
   * @param {import("../../Feature.js").FeatureLike} feature Feature.
   * @param {number} [index] Render order index.
   */
  drawMultiPolygon(e, n, i) {
    const s = this.state, r = s.fillStyle, o = s.strokeStyle;
    if (r === void 0 && o === void 0)
      return;
    this.setFillStrokeStyles_(), this.beginGeometry(e, n, i), s.fillStyle !== void 0 && this.hitDetectionInstructions.push([
      Y.SET_FILL_STYLE,
      He
    ]), s.strokeStyle !== void 0 && this.hitDetectionInstructions.push([
      Y.SET_STROKE_STYLE,
      s.strokeStyle,
      s.lineWidth,
      s.lineCap,
      s.lineJoin,
      s.miterLimit,
      Jt,
      Qt
    ]);
    const a = e.getEndss(), l = e.getOrientedFlatCoordinates(), u = e.getStride();
    let c = 0;
    for (let h = 0, d = a.length; h < d; ++h)
      c = this.drawFlatCoordinatess_(
        l,
        c,
        a[h],
        u
      );
    this.endGeometry(n);
  }
  /**
   * @return {import("../canvas.js").SerializableInstructions} the serializable instructions.
   */
  finish() {
    this.reverseHitDetectionInstructions(), this.state = null;
    const e = this.tolerance;
    if (e !== 0) {
      const n = this.coordinates;
      for (let i = 0, s = n.length; i < s; ++i)
        n[i] = kn(n[i], e);
    }
    return super.finish();
  }
  /**
   * @private
   */
  setFillStrokeStyles_() {
    const e = this.state;
    e.fillStyle !== void 0 && this.updateFillStyle(e, this.createFill), e.strokeStyle !== void 0 && this.updateStrokeStyle(e, this.applyStroke);
  }
}
const vu = Cy;
function Ey(t, e, n, i, s) {
  const r = [];
  let o = n, a = 0, l = e.slice(n, 2);
  for (; a < t && o + s < i; ) {
    const [u, c] = l.slice(-2), h = e[o + s], d = e[o + s + 1], f = Math.sqrt(
      (h - u) * (h - u) + (d - c) * (d - c)
    );
    if (a += f, a >= t) {
      const g = (t - a + f) / f, m = ht(u, h, g), _ = ht(c, d, g);
      l.push(m, _), r.push(l), l = [m, _], a == t && (o += s), a = 0;
    } else if (a < t)
      l.push(
        e[o + s],
        e[o + s + 1]
      ), o += s;
    else {
      const g = f - a, m = ht(u, h, g / f), _ = ht(c, d, g / f);
      l.push(m, _), r.push(l), l = [m, _], a = 0, o += s;
    }
  }
  return a > 0 && r.push(l), r;
}
function wy(t, e, n, i, s) {
  let r = n, o = n, a = 0, l = 0, u = n, c, h, d, f, g, m, _, p, y, C;
  for (h = n; h < i; h += s) {
    const x = e[h], E = e[h + 1];
    g !== void 0 && (y = x - g, C = E - m, f = Math.sqrt(y * y + C * C), _ !== void 0 && (l += d, c = Math.acos((_ * y + p * C) / (d * f)), c > t && (l > a && (a = l, r = u, o = h), l = 0, u = h - s)), d = f, _ = y, p = C), g = x, m = E;
  }
  return l += f, l > a ? [u, h] : [r, o];
}
const hr = {
  left: 0,
  center: 0.5,
  right: 1,
  top: 0,
  middle: 0.5,
  hanging: 0.2,
  alphabetic: 0.8,
  ideographic: 0.8,
  bottom: 1
};
class Sy extends Rs {
  /**
   * @param {number} tolerance Tolerance.
   * @param {import("../../extent.js").Extent} maxExtent Maximum extent.
   * @param {number} resolution Resolution.
   * @param {number} pixelRatio Pixel ratio.
   */
  constructor(e, n, i, s) {
    super(e, n, i, s), this.labels_ = null, this.text_ = "", this.textOffsetX_ = 0, this.textOffsetY_ = 0, this.textRotateWithView_ = void 0, this.textRotation_ = 0, this.textFillState_ = null, this.fillStates = {}, this.fillStates[He] = { fillStyle: He }, this.textStrokeState_ = null, this.strokeStates = {}, this.textState_ = /** @type {import("../canvas.js").TextState} */
    {}, this.textStates = {}, this.textKey_ = "", this.fillKey_ = "", this.strokeKey_ = "", this.declutterMode_ = void 0, this.declutterImageWithText_ = void 0;
  }
  /**
   * @return {import("../canvas.js").SerializableInstructions} the serializable instructions.
   */
  finish() {
    const e = super.finish();
    return e.textStates = this.textStates, e.fillStates = this.fillStates, e.strokeStates = this.strokeStates, e;
  }
  /**
   * @param {import("../../geom/SimpleGeometry.js").default|import("../Feature.js").default} geometry Geometry.
   * @param {import("../../Feature.js").FeatureLike} feature Feature.
   * @param {number} [index] Render order index.
   */
  drawText(e, n, i) {
    const s = this.textFillState_, r = this.textStrokeState_, o = this.textState_;
    if (this.text_ === "" || !o || !s && !r)
      return;
    const a = this.coordinates;
    let l = a.length;
    const u = e.getType();
    let c = null, h = e.getStride();
    if (o.placement === "line" && (u == "LineString" || u == "MultiLineString" || u == "Polygon" || u == "MultiPolygon")) {
      if (!qe(this.maxExtent, e.getExtent()))
        return;
      let d;
      if (c = e.getFlatCoordinates(), u == "LineString")
        d = [c.length];
      else if (u == "MultiLineString")
        d = /** @type {import("../../geom/MultiLineString.js").default} */
        e.getEnds();
      else if (u == "Polygon")
        d = /** @type {import("../../geom/Polygon.js").default} */
        e.getEnds().slice(0, 1);
      else if (u == "MultiPolygon") {
        const _ = (
          /** @type {import("../../geom/MultiPolygon.js").default} */
          e.getEndss()
        );
        d = [];
        for (let p = 0, y = _.length; p < y; ++p)
          d.push(_[p][0]);
      }
      this.beginGeometry(e, n, i);
      const f = o.repeat, g = f ? void 0 : o.textAlign;
      let m = 0;
      for (let _ = 0, p = d.length; _ < p; ++_) {
        let y;
        f ? y = Ey(
          f * this.resolution,
          c,
          m,
          d[_],
          h
        ) : y = [c.slice(m, d[_])];
        for (let C = 0, x = y.length; C < x; ++C) {
          const E = y[C];
          let S = 0, T = E.length;
          if (g == null) {
            const b = wy(
              o.maxAngle,
              E,
              0,
              E.length,
              2
            );
            S = b[0], T = b[1];
          }
          for (let b = S; b < T; b += h)
            a.push(E[b], E[b + 1]);
          const I = a.length;
          m = d[_], this.drawChars_(l, I), l = I;
        }
      }
      this.endGeometry(n);
    } else {
      let d = o.overflow ? null : [];
      switch (u) {
        case "Point":
        case "MultiPoint":
          c = /** @type {import("../../geom/MultiPoint.js").default} */
          e.getFlatCoordinates();
          break;
        case "LineString":
          c = /** @type {import("../../geom/LineString.js").default} */
          e.getFlatMidpoint();
          break;
        case "Circle":
          c = /** @type {import("../../geom/Circle.js").default} */
          e.getCenter();
          break;
        case "MultiLineString":
          c = /** @type {import("../../geom/MultiLineString.js").default} */
          e.getFlatMidpoints(), h = 2;
          break;
        case "Polygon":
          c = /** @type {import("../../geom/Polygon.js").default} */
          e.getFlatInteriorPoint(), o.overflow || d.push(c[2] / this.resolution), h = 3;
          break;
        case "MultiPolygon":
          const y = (
            /** @type {import("../../geom/MultiPolygon.js").default} */
            e.getFlatInteriorPoints()
          );
          c = [];
          for (let C = 0, x = y.length; C < x; C += 3)
            o.overflow || d.push(y[C + 2] / this.resolution), c.push(y[C], y[C + 1]);
          if (c.length === 0)
            return;
          h = 2;
          break;
      }
      const f = this.appendFlatPointCoordinates(c, h);
      if (f === l)
        return;
      if (d && (f - l) / 2 !== c.length / h) {
        let y = l / 2;
        d = d.filter((C, x) => {
          const E = a[(y + x) * 2] === c[x * h] && a[(y + x) * 2 + 1] === c[x * h + 1];
          return E || --y, E;
        });
      }
      this.saveTextStates_(), (o.backgroundFill || o.backgroundStroke) && (this.setFillStrokeStyle(
        o.backgroundFill,
        o.backgroundStroke
      ), o.backgroundFill && this.updateFillStyle(this.state, this.createFill), o.backgroundStroke && (this.updateStrokeStyle(this.state, this.applyStroke), this.hitDetectionInstructions.push(this.createStroke(this.state)))), this.beginGeometry(e, n, i);
      let g = o.padding;
      if (g != Fn && (o.scale[0] < 0 || o.scale[1] < 0)) {
        let y = o.padding[0], C = o.padding[1], x = o.padding[2], E = o.padding[3];
        o.scale[0] < 0 && (C = -C, E = -E), o.scale[1] < 0 && (y = -y, x = -x), g = [y, C, x, E];
      }
      const m = this.pixelRatio;
      this.instructions.push([
        Y.DRAW_IMAGE,
        l,
        f,
        null,
        NaN,
        NaN,
        NaN,
        1,
        0,
        0,
        this.textRotateWithView_,
        this.textRotation_,
        [1, 1],
        NaN,
        this.declutterMode_,
        this.declutterImageWithText_,
        g == Fn ? Fn : g.map(function(y) {
          return y * m;
        }),
        !!o.backgroundFill,
        !!o.backgroundStroke,
        this.text_,
        this.textKey_,
        this.strokeKey_,
        this.fillKey_,
        this.textOffsetX_,
        this.textOffsetY_,
        d
      ]);
      const _ = 1 / m, p = this.state.fillStyle;
      o.backgroundFill && (this.state.fillStyle = He, this.hitDetectionInstructions.push(this.createFill(this.state))), this.hitDetectionInstructions.push([
        Y.DRAW_IMAGE,
        l,
        f,
        null,
        NaN,
        NaN,
        NaN,
        1,
        0,
        0,
        this.textRotateWithView_,
        this.textRotation_,
        [_, _],
        NaN,
        this.declutterMode_,
        this.declutterImageWithText_,
        g,
        !!o.backgroundFill,
        !!o.backgroundStroke,
        this.text_,
        this.textKey_,
        this.strokeKey_,
        this.fillKey_ ? He : this.fillKey_,
        this.textOffsetX_,
        this.textOffsetY_,
        d
      ]), o.backgroundFill && (this.state.fillStyle = p, this.hitDetectionInstructions.push(this.createFill(this.state))), this.endGeometry(n);
    }
  }
  /**
   * @private
   */
  saveTextStates_() {
    const e = this.textStrokeState_, n = this.textState_, i = this.textFillState_, s = this.strokeKey_;
    e && (s in this.strokeStates || (this.strokeStates[s] = {
      strokeStyle: e.strokeStyle,
      lineCap: e.lineCap,
      lineDashOffset: e.lineDashOffset,
      lineWidth: e.lineWidth,
      lineJoin: e.lineJoin,
      miterLimit: e.miterLimit,
      lineDash: e.lineDash
    }));
    const r = this.textKey_;
    r in this.textStates || (this.textStates[r] = {
      font: n.font,
      textAlign: n.textAlign || us,
      justify: n.justify,
      textBaseline: n.textBaseline || or,
      scale: n.scale
    });
    const o = this.fillKey_;
    i && (o in this.fillStates || (this.fillStates[o] = {
      fillStyle: i.fillStyle
    }));
  }
  /**
   * @private
   * @param {number} begin Begin.
   * @param {number} end End.
   */
  drawChars_(e, n) {
    const i = this.textStrokeState_, s = this.textState_, r = this.strokeKey_, o = this.textKey_, a = this.fillKey_;
    this.saveTextStates_();
    const l = this.pixelRatio, u = hr[s.textBaseline], c = this.textOffsetY_ * l, h = this.text_, d = i ? i.lineWidth * Math.abs(s.scale[0]) / 2 : 0;
    this.instructions.push([
      Y.DRAW_CHARS,
      e,
      n,
      u,
      s.overflow,
      a,
      s.maxAngle,
      l,
      c,
      r,
      d * l,
      h,
      o,
      1,
      this.declutterMode_
    ]), this.hitDetectionInstructions.push([
      Y.DRAW_CHARS,
      e,
      n,
      u,
      s.overflow,
      a && He,
      s.maxAngle,
      l,
      c,
      r,
      d * l,
      h,
      o,
      1 / l,
      this.declutterMode_
    ]);
  }
  /**
   * @param {import("../../style/Text.js").default} textStyle Text style.
   * @param {Object} [sharedData] Shared data.
   */
  setTextStyle(e, n) {
    let i, s, r;
    if (!e)
      this.text_ = "";
    else {
      const o = e.getFill();
      o ? (s = this.textFillState_, s || (s = /** @type {import("../canvas.js").FillState} */
      {}, this.textFillState_ = s), s.fillStyle = Pt(
        o.getColor() || He
      )) : (s = null, this.textFillState_ = s);
      const a = e.getStroke();
      if (!a)
        r = null, this.textStrokeState_ = r;
      else {
        r = this.textStrokeState_, r || (r = /** @type {import("../canvas.js").StrokeState} */
        {}, this.textStrokeState_ = r);
        const g = a.getLineDash(), m = a.getLineDashOffset(), _ = a.getWidth(), p = a.getMiterLimit();
        r.lineCap = a.getLineCap() || Ei, r.lineDash = g ? g.slice() : Jt, r.lineDashOffset = m === void 0 ? Qt : m, r.lineJoin = a.getLineJoin() || wi, r.lineWidth = _ === void 0 ? cs : _, r.miterLimit = p === void 0 ? as : p, r.strokeStyle = Pt(
          a.getColor() || ls
        );
      }
      i = this.textState_;
      const l = e.getFont() || Hc;
      gm(l);
      const u = e.getScaleArray();
      i.overflow = e.getOverflow(), i.font = l, i.maxAngle = e.getMaxAngle(), i.placement = e.getPlacement(), i.textAlign = e.getTextAlign(), i.repeat = e.getRepeat(), i.justify = e.getJustify(), i.textBaseline = e.getTextBaseline() || or, i.backgroundFill = e.getBackgroundFill(), i.backgroundStroke = e.getBackgroundStroke(), i.padding = e.getPadding() || Fn, i.scale = u === void 0 ? [1, 1] : u;
      const c = e.getOffsetX(), h = e.getOffsetY(), d = e.getRotateWithView(), f = e.getRotation();
      this.text_ = e.getText() || "", this.textOffsetX_ = c === void 0 ? 0 : c, this.textOffsetY_ = h === void 0 ? 0 : h, this.textRotateWithView_ = d === void 0 ? !1 : d, this.textRotation_ = f === void 0 ? 0 : f, this.strokeKey_ = r ? (typeof r.strokeStyle == "string" ? r.strokeStyle : fe(r.strokeStyle)) + r.lineCap + r.lineDashOffset + "|" + r.lineWidth + r.lineJoin + r.miterLimit + "[" + r.lineDash.join() + "]" : "", this.textKey_ = i.font + i.scale + (i.textAlign || "?") + (i.repeat || "?") + (i.justify || "?") + (i.textBaseline || "?"), this.fillKey_ = s && s.fillStyle ? typeof s.fillStyle == "string" ? s.fillStyle : "|" + fe(s.fillStyle) : "";
    }
    this.declutterMode_ = e.getDeclutterMode(), this.declutterImageWithText_ = n;
  }
}
const by = {
  Circle: vu,
  Default: Rs,
  Image: yy,
  LineString: xy,
  Polygon: vu,
  Text: Sy
};
class Iy {
  /**
   * @param {number} tolerance Tolerance.
   * @param {import("../../extent.js").Extent} maxExtent Max extent.
   * @param {number} resolution Resolution.
   * @param {number} pixelRatio Pixel ratio.
   */
  constructor(e, n, i, s) {
    this.tolerance_ = e, this.maxExtent_ = n, this.pixelRatio_ = s, this.resolution_ = i, this.buildersByZIndex_ = {};
  }
  /**
   * @return {!Object<string, !Object<import("../canvas.js").BuilderType, import("./Builder.js").SerializableInstructions>>} The serializable instructions
   */
  finish() {
    const e = {};
    for (const n in this.buildersByZIndex_) {
      e[n] = e[n] || {};
      const i = this.buildersByZIndex_[n];
      for (const s in i) {
        const r = i[s].finish();
        e[n][s] = r;
      }
    }
    return e;
  }
  /**
   * @param {number|undefined} zIndex Z index.
   * @param {import("../canvas.js").BuilderType} builderType Replay type.
   * @return {import("../VectorContext.js").default} Replay.
   */
  getBuilder(e, n) {
    const i = e !== void 0 ? e.toString() : "0";
    let s = this.buildersByZIndex_[i];
    s === void 0 && (s = {}, this.buildersByZIndex_[i] = s);
    let r = s[n];
    if (r === void 0) {
      const o = by[n];
      r = new o(
        this.tolerance_,
        this.maxExtent_,
        this.resolution_,
        this.pixelRatio_
      ), s[n] = r;
    }
    return r;
  }
}
const Ty = Iy;
function Ry(t, e, n, i, s, r, o, a, l, u, c, h) {
  let d = t[e], f = t[e + 1], g = 0, m = 0, _ = 0, p = 0;
  function y() {
    g = d, m = f, e += i, d = t[e], f = t[e + 1], p += _, _ = Math.sqrt((d - g) * (d - g) + (f - m) * (f - m));
  }
  do
    y();
  while (e < n - i && p + _ < r);
  let C = _ === 0 ? 0 : (r - p) / _;
  const x = ht(g, d, C), E = ht(m, f, C), S = e - i, T = p, I = r + a * l(u, s, c);
  for (; e < n - i && p + _ < I; )
    y();
  C = _ === 0 ? 0 : (I - p) / _;
  const b = ht(g, d, C), D = ht(m, f, C);
  let P;
  if (h) {
    const O = [x, E, b, D];
    Lc(O, 0, 4, 2, h, O, O), P = O[0] > O[2];
  } else
    P = x > b;
  const A = Math.PI, M = [], k = S + i === e;
  e = S, _ = 0, p = T, d = t[e], f = t[e + 1];
  let V;
  if (k) {
    y(), V = Math.atan2(f - m, d - g), P && (V += V > 0 ? -A : A);
    const O = (b + x) / 2, G = (D + E) / 2;
    return M[0] = [O, G, (I - r) / 2, V, s], M;
  }
  s = s.replace(/\n/g, " ");
  for (let O = 0, G = s.length; O < G; ) {
    y();
    let F = Math.atan2(f - m, d - g);
    if (P && (F += F > 0 ? -A : A), V !== void 0) {
      let L = F - V;
      if (L += L > A ? -2 * A : L < -A ? 2 * A : 0, Math.abs(L) > o)
        return null;
    }
    V = F;
    const j = O;
    let W = 0;
    for (; O < G; ++O) {
      const L = P ? G - O - 1 : O, se = a * l(u, s[L], c);
      if (e + i < n && p + _ < r + W + se / 2)
        break;
      W += se;
    }
    if (O === j)
      continue;
    const N = P ? s.substring(G - j, G - O) : s.substring(j, O);
    C = _ === 0 ? 0 : (r + W / 2 - p) / _;
    const z = ht(g, d, C), q = ht(m, f, C);
    M.push([z, q, W / 2, F, N]), r += W;
  }
  return M;
}
function Ly(t, e, n, i) {
  let s = t[e], r = t[e + 1], o = 0;
  for (let a = e + i; a < n; a += i) {
    const l = t[a], u = t[a + 1];
    o += Math.sqrt((l - s) * (l - s) + (u - r) * (u - r)), s = l, r = u;
  }
  return o;
}
const ti = ft(), un = [], Wt = [], Xt = [], cn = [];
function yu(t) {
  return t[3].declutterBox;
}
const pu = new RegExp(
  /* eslint-disable prettier/prettier */
  "[" + String.fromCharCode(1425) + "-" + String.fromCharCode(2303) + String.fromCharCode(64285) + "-" + String.fromCharCode(65023) + String.fromCharCode(65136) + "-" + String.fromCharCode(65276) + String.fromCharCode(67584) + "-" + String.fromCharCode(69631) + String.fromCharCode(124928) + "-" + String.fromCharCode(126975) + "]"
  /* eslint-enable prettier/prettier */
);
function Co(t, e) {
  return e === "start" ? e = pu.test(t) ? "right" : "left" : e === "end" && (e = pu.test(t) ? "left" : "right"), hr[e];
}
function Ay(t, e, n) {
  return n > 0 && t.push(`
`, ""), t.push(e, ""), t;
}
class Py {
  /**
   * @param {number} resolution Resolution.
   * @param {number} pixelRatio Pixel ratio.
   * @param {boolean} overlaps The replay can have overlapping geometries.
   * @param {import("../canvas.js").SerializableInstructions} instructions The serializable instructions.
   * @param {boolean} [deferredRendering] Enable deferred rendering.
   */
  constructor(e, n, i, s, r) {
    this.overlaps = i, this.pixelRatio = n, this.resolution = e, this.alignAndScaleFill_, this.instructions = s.instructions, this.coordinates = s.coordinates, this.coordinateCache_ = {}, this.renderedTransform_ = Ct(), this.hitDetectionInstructions = s.hitDetectionInstructions, this.pixelCoordinates_ = null, this.viewRotation_ = 0, this.fillStates = s.fillStates || {}, this.strokeStates = s.strokeStates || {}, this.textStates = s.textStates || {}, this.widths_ = {}, this.labels_ = {}, this.zIndexContext_ = r ? new Th() : null;
  }
  /**
   * @return {ZIndexContext} ZIndex context.
   */
  getZIndexContext() {
    return this.zIndexContext_;
  }
  /**
   * @param {string|Array<string>} text Text.
   * @param {string} textKey Text style key.
   * @param {string} fillKey Fill style key.
   * @param {string} strokeKey Stroke style key.
   * @return {import("../canvas.js").Label} Label.
   */
  createLabel(e, n, i, s) {
    const r = e + n + i + s;
    if (this.labels_[r])
      return this.labels_[r];
    const o = s ? this.strokeStates[s] : null, a = i ? this.fillStates[i] : null, l = this.textStates[n], u = this.pixelRatio, c = [
      l.scale[0] * u,
      l.scale[1] * u
    ], h = Array.isArray(e), d = l.justify ? hr[l.justify] : Co(
      Array.isArray(e) ? e[0] : e,
      l.textAlign || us
    ), f = s && o.lineWidth ? o.lineWidth : 0, g = h ? e : e.split(`
`).reduce(Ay, []), { width: m, height: _, widths: p, heights: y, lineWidths: C } = _m(
      l,
      g
    ), x = m + f, E = [], S = (x + 2) * c[0], T = (_ + f) * c[1], I = {
      width: S < 0 ? Math.floor(S) : Math.ceil(S),
      height: T < 0 ? Math.floor(T) : Math.ceil(T),
      contextInstructions: E
    };
    (c[0] != 1 || c[1] != 1) && E.push("scale", c), s && (E.push("strokeStyle", o.strokeStyle), E.push("lineWidth", f), E.push("lineCap", o.lineCap), E.push("lineJoin", o.lineJoin), E.push("miterLimit", o.miterLimit), E.push("setLineDash", [o.lineDash]), E.push("lineDashOffset", o.lineDashOffset)), i && E.push("fillStyle", a.fillStyle), E.push("textBaseline", "middle"), E.push("textAlign", "center");
    const b = 0.5 - d;
    let D = d * x + b * f;
    const P = [], A = [];
    let M = 0, k = 0, V = 0, O = 0, G;
    for (let F = 0, j = g.length; F < j; F += 2) {
      const W = g[F];
      if (W === `
`) {
        k += M, M = 0, D = d * x + b * f, ++O;
        continue;
      }
      const N = g[F + 1] || l.font;
      N !== G && (s && P.push("font", N), i && A.push("font", N), G = N), M = Math.max(M, y[V]);
      const z = [
        W,
        D + b * p[V] + d * (p[V] - C[O]),
        0.5 * (f + M) + k
      ];
      D += p[V], s && P.push("strokeText", z), i && A.push("fillText", z), ++V;
    }
    return Array.prototype.push.apply(E, P), Array.prototype.push.apply(E, A), this.labels_[r] = I, I;
  }
  /**
   * @param {CanvasRenderingContext2D} context Context.
   * @param {import("../../coordinate.js").Coordinate} p1 1st point of the background box.
   * @param {import("../../coordinate.js").Coordinate} p2 2nd point of the background box.
   * @param {import("../../coordinate.js").Coordinate} p3 3rd point of the background box.
   * @param {import("../../coordinate.js").Coordinate} p4 4th point of the background box.
   * @param {Array<*>} fillInstruction Fill instruction.
   * @param {Array<*>} strokeInstruction Stroke instruction.
   */
  replayTextBackground_(e, n, i, s, r, o, a) {
    e.beginPath(), e.moveTo.apply(e, n), e.lineTo.apply(e, i), e.lineTo.apply(e, s), e.lineTo.apply(e, r), e.lineTo.apply(e, n), o && (this.alignAndScaleFill_ = /** @type {number} */
    o[2], this.fill_(e)), a && (this.setStrokeStyle_(
      e,
      /** @type {Array<*>} */
      a
    ), e.stroke());
  }
  /**
   * @private
   * @param {number} sheetWidth Width of the sprite sheet.
   * @param {number} sheetHeight Height of the sprite sheet.
   * @param {number} centerX X.
   * @param {number} centerY Y.
   * @param {number} width Width.
   * @param {number} height Height.
   * @param {number} anchorX Anchor X.
   * @param {number} anchorY Anchor Y.
   * @param {number} originX Origin X.
   * @param {number} originY Origin Y.
   * @param {number} rotation Rotation.
   * @param {import("../../size.js").Size} scale Scale.
   * @param {boolean} snapToPixel Snap to pixel.
   * @param {Array<number>} padding Padding.
   * @param {boolean} fillStroke Background fill or stroke.
   * @param {import("../../Feature.js").FeatureLike} feature Feature.
   * @return {ImageOrLabelDimensions} Dimensions for positioning and decluttering the image or label.
   */
  calculateImageOrLabelDimensions_(e, n, i, s, r, o, a, l, u, c, h, d, f, g, m, _) {
    a *= d[0], l *= d[1];
    let p = i - a, y = s - l;
    const C = r + u > e ? e - u : r, x = o + c > n ? n - c : o, E = g[3] + C * d[0] + g[1], S = g[0] + x * d[1] + g[2], T = p - g[3], I = y - g[0];
    (m || h !== 0) && (un[0] = T, cn[0] = T, un[1] = I, Wt[1] = I, Wt[0] = T + E, Xt[0] = Wt[0], Xt[1] = I + S, cn[1] = Xt[1]);
    let b;
    return h !== 0 ? (b = Ot(
      Ct(),
      i,
      s,
      1,
      1,
      h,
      -i,
      -s
    ), Pe(b, un), Pe(b, Wt), Pe(b, Xt), Pe(b, cn), pn(
      Math.min(un[0], Wt[0], Xt[0], cn[0]),
      Math.min(un[1], Wt[1], Xt[1], cn[1]),
      Math.max(un[0], Wt[0], Xt[0], cn[0]),
      Math.max(un[1], Wt[1], Xt[1], cn[1]),
      ti
    )) : pn(
      Math.min(T, T + E),
      Math.min(I, I + S),
      Math.max(T, T + E),
      Math.max(I, I + S),
      ti
    ), f && (p = Math.round(p), y = Math.round(y)), {
      drawImageX: p,
      drawImageY: y,
      drawImageW: C,
      drawImageH: x,
      originX: u,
      originY: c,
      declutterBox: {
        minX: ti[0],
        minY: ti[1],
        maxX: ti[2],
        maxY: ti[3],
        value: _
      },
      canvasTransform: b,
      scale: d
    };
  }
  /**
   * @private
   * @param {CanvasRenderingContext2D} context Context.
   * @param {import('../../size.js').Size} scaledCanvasSize Scaled canvas size.
   * @param {import("../canvas.js").Label|HTMLImageElement|HTMLCanvasElement|HTMLVideoElement} imageOrLabel Image.
   * @param {ImageOrLabelDimensions} dimensions Dimensions.
   * @param {number} opacity Opacity.
   * @param {Array<*>} fillInstruction Fill instruction.
   * @param {Array<*>} strokeInstruction Stroke instruction.
   * @return {boolean} The image or label was rendered.
   */
  replayImageOrLabel_(e, n, i, s, r, o, a) {
    const l = !!(o || a), u = s.declutterBox, c = a ? a[2] * s.scale[0] / 2 : 0;
    return u.minX - c <= n[0] && u.maxX + c >= 0 && u.minY - c <= n[1] && u.maxY + c >= 0 && (l && this.replayTextBackground_(
      e,
      un,
      Wt,
      Xt,
      cn,
      /** @type {Array<*>} */
      o,
      /** @type {Array<*>} */
      a
    ), vm(
      e,
      s.canvasTransform,
      r,
      i,
      s.originX,
      s.originY,
      s.drawImageW,
      s.drawImageH,
      s.drawImageX,
      s.drawImageY,
      s.scale
    )), !0;
  }
  /**
   * @private
   * @param {CanvasRenderingContext2D} context Context.
   */
  fill_(e) {
    const n = this.alignAndScaleFill_;
    if (n) {
      const i = Pe(this.renderedTransform_, [0, 0]), s = 512 * this.pixelRatio;
      e.save(), e.translate(i[0] % s, i[1] % s), n !== 1 && e.scale(n, n), e.rotate(this.viewRotation_);
    }
    e.fill(), n && e.restore();
  }
  /**
   * @private
   * @param {CanvasRenderingContext2D} context Context.
   * @param {Array<*>} instruction Instruction.
   */
  setStrokeStyle_(e, n) {
    e.strokeStyle = /** @type {import("../../colorlike.js").ColorLike} */
    n[1], e.lineWidth = /** @type {number} */
    n[2], e.lineCap = /** @type {CanvasLineCap} */
    n[3], e.lineJoin = /** @type {CanvasLineJoin} */
    n[4], e.miterLimit = /** @type {number} */
    n[5], e.lineDashOffset = /** @type {number} */
    n[7], e.setLineDash(
      /** @type {Array<number>} */
      n[6]
    );
  }
  /**
   * @private
   * @param {string|Array<string>} text The text to draw.
   * @param {string} textKey The key of the text state.
   * @param {string} strokeKey The key for the stroke state.
   * @param {string} fillKey The key for the fill state.
   * @return {{label: import("../canvas.js").Label, anchorX: number, anchorY: number}} The text image and its anchor.
   */
  drawLabelWithPointPlacement_(e, n, i, s) {
    const r = this.textStates[n], o = this.createLabel(e, n, s, i), a = this.strokeStates[i], l = this.pixelRatio, u = Co(
      Array.isArray(e) ? e[0] : e,
      r.textAlign || us
    ), c = hr[r.textBaseline || or], h = a && a.lineWidth ? a.lineWidth : 0, d = o.width / l - 2 * r.scale[0], f = u * d + 2 * (0.5 - u) * h, g = c * o.height / l + 2 * (0.5 - c) * h;
    return {
      label: o,
      anchorX: f,
      anchorY: g
    };
  }
  /**
   * @private
   * @param {CanvasRenderingContext2D} context Context.
   * @param {import('../../size.js').Size} scaledCanvasSize Scaled canvas size
   * @param {import("../../transform.js").Transform} transform Transform.
   * @param {Array<*>} instructions Instructions array.
   * @param {boolean} snapToPixel Snap point symbols and text to integer pixels.
   * @param {FeatureCallback<T>} [featureCallback] Feature callback.
   * @param {import("../../extent.js").Extent} [hitExtent] Only check
   *     features that intersect this extent.
   * @param {import("rbush").default} [declutterTree] Declutter tree.
   * @return {T|undefined} Callback result.
   * @template T
   */
  execute_(e, n, i, s, r, o, a, l) {
    const u = this.zIndexContext_;
    let c;
    this.pixelCoordinates_ && In(i, this.renderedTransform_) ? c = this.pixelCoordinates_ : (this.pixelCoordinates_ || (this.pixelCoordinates_ = []), c = yn(
      this.coordinates,
      0,
      this.coordinates.length,
      2,
      i,
      this.pixelCoordinates_
    ), dg(this.renderedTransform_, i));
    let h = 0;
    const d = s.length;
    let f = 0, g, m, _, p, y, C, x, E, S, T, I, b, D, P = 0, A = 0, M = null, k = null;
    const V = this.coordinateCache_, O = this.viewRotation_, G = Math.round(Math.atan2(-i[1], i[0]) * 1e12) / 1e12, F = (
      /** @type {import("../../render.js").State} */
      {
        context: e,
        pixelRatio: this.pixelRatio,
        resolution: this.resolution,
        rotation: O
      }
    ), j = this.instructions != s || this.overlaps ? 0 : 200;
    let W, N, z, q;
    for (; h < d; ) {
      const L = s[h];
      switch (
        /** @type {import("./Instruction.js").default} */
        L[0]
      ) {
        case Y.BEGIN_GEOMETRY:
          W = /** @type {import("../../Feature.js").FeatureLike} */
          L[1], q = L[3], W.getGeometry() ? a !== void 0 && !qe(a, q.getExtent()) ? h = /** @type {number} */
          L[2] + 1 : ++h : h = /** @type {number} */
          L[2], u && (u.zIndex = L[4]);
          break;
        case Y.BEGIN_PATH:
          P > j && (this.fill_(e), P = 0), A > j && (e.stroke(), A = 0), !P && !A && (e.beginPath(), y = NaN, C = NaN), ++h;
          break;
        case Y.CIRCLE:
          f = /** @type {number} */
          L[1];
          const oe = c[f], ve = c[f + 1], Ue = c[f + 2], vt = c[f + 3], Ze = Ue - oe, Ni = vt - ve, Rn = Math.sqrt(Ze * Ze + Ni * Ni);
          e.moveTo(oe + Rn, ve), e.arc(oe, ve, Rn, 0, 2 * Math.PI, !0), ++h;
          break;
        case Y.CLOSE_PATH:
          e.closePath(), ++h;
          break;
        case Y.CUSTOM:
          f = /** @type {number} */
          L[1], g = L[2];
          const Qr = (
            /** @type {import("../../geom/SimpleGeometry.js").default} */
            L[3]
          ), Ms = L[4], ks = L[5];
          F.geometry = Qr, F.feature = W, h in V || (V[h] = []);
          const ot = V[h];
          ks ? ks(c, f, g, 2, ot) : (ot[0] = c[f], ot[1] = c[f + 1], ot.length = 2), u && (u.zIndex = L[6]), Ms(ot, F), ++h;
          break;
        case Y.DRAW_IMAGE:
          f = /** @type {number} */
          L[1], g = /** @type {number} */
          L[2], S = /** @type {HTMLCanvasElement|HTMLVideoElement|HTMLImageElement} */
          L[3], m = /** @type {number} */
          L[4], _ = /** @type {number} */
          L[5];
          let Zn = (
            /** @type {number} */
            L[6]
          );
          const Os = (
            /** @type {number} */
            L[7]
          ), eo = (
            /** @type {number} */
            L[8]
          ), Ds = (
            /** @type {number} */
            L[9]
          ), Fs = (
            /** @type {boolean} */
            L[10]
          );
          let et = (
            /** @type {number} */
            L[11]
          );
          const yt = (
            /** @type {import("../../size.js").Size} */
            L[12]
          );
          let bt = (
            /** @type {number} */
            L[13]
          );
          p = L[14] || "declutter";
          const pt = (
            /** @type {{args: import("../canvas.js").DeclutterImageWithText, declutterMode: import('../../style/Style.js').DeclutterMode}} */
            L[15]
          );
          if (!S && L.length >= 20) {
            T = /** @type {string} */
            L[19], I = /** @type {string} */
            L[20], b = /** @type {string} */
            L[21], D = /** @type {string} */
            L[22];
            const at = this.drawLabelWithPointPlacement_(
              T,
              I,
              b,
              D
            );
            S = at.label, L[3] = S;
            const Ln = (
              /** @type {number} */
              L[23]
            );
            m = (at.anchorX - Ln) * this.pixelRatio, L[4] = m;
            const lt = (
              /** @type {number} */
              L[24]
            );
            _ = (at.anchorY - lt) * this.pixelRatio, L[5] = _, Zn = S.height, L[6] = Zn, bt = S.width, L[13] = bt;
          }
          let Kn;
          L.length > 25 && (Kn = /** @type {number} */
          L[25]);
          let Hn, on, Gt;
          L.length > 17 ? (Hn = /** @type {Array<number>} */
          L[16], on = /** @type {boolean} */
          L[17], Gt = /** @type {boolean} */
          L[18]) : (Hn = Fn, on = !1, Gt = !1), Fs && G ? et += O : !Fs && !G && (et -= O);
          let to = 0;
          for (; f < g; f += 2) {
            if (Kn && Kn[to++] < bt / this.pixelRatio)
              continue;
            const at = this.calculateImageOrLabelDimensions_(
              S.width,
              S.height,
              c[f],
              c[f + 1],
              bt,
              Zn,
              m,
              _,
              eo,
              Ds,
              et,
              yt,
              r,
              Hn,
              on || Gt,
              W
            ), Ln = [
              e,
              n,
              S,
              at,
              Os,
              on ? (
                /** @type {Array<*>} */
                M
              ) : null,
              Gt ? (
                /** @type {Array<*>} */
                k
              ) : null
            ];
            if (l) {
              let lt, It, ut;
              if (pt) {
                const we = g - f;
                if (!pt[we]) {
                  pt[we] = { args: Ln, declutterMode: p };
                  continue;
                }
                const $e = pt[we];
                lt = $e.args, It = $e.declutterMode, delete pt[we], ut = yu(lt);
              }
              let zt, Bt;
              if (lt && (It !== "declutter" || !l.collides(ut)) && (zt = !0), (p !== "declutter" || !l.collides(at.declutterBox)) && (Bt = !0), It === "declutter" && p === "declutter") {
                const we = zt && Bt;
                zt = we, Bt = we;
              }
              zt && (It !== "none" && l.insert(ut), this.replayImageOrLabel_.apply(this, lt)), Bt && (p !== "none" && l.insert(at.declutterBox), this.replayImageOrLabel_.apply(this, Ln));
            } else
              this.replayImageOrLabel_.apply(this, Ln);
          }
          ++h;
          break;
        case Y.DRAW_CHARS:
          const Be = (
            /** @type {number} */
            L[1]
          ), _l = (
            /** @type {number} */
            L[2]
          ), no = (
            /** @type {number} */
            L[3]
          ), Qd = (
            /** @type {number} */
            L[4]
          );
          D = /** @type {string} */
          L[5];
          const ef = (
            /** @type {number} */
            L[6]
          ), vl = (
            /** @type {number} */
            L[7]
          ), yl = (
            /** @type {number} */
            L[8]
          );
          b = /** @type {string} */
          L[9];
          const io = (
            /** @type {number} */
            L[10]
          );
          T = /** @type {string} */
          L[11], I = /** @type {string} */
          L[12];
          const pl = [
            /** @type {number} */
            L[13],
            /** @type {number} */
            L[13]
          ];
          p = L[14] || "declutter";
          const so = this.textStates[I], Vi = so.font, Gi = [
            so.scale[0] * vl,
            so.scale[1] * vl
          ];
          let zi;
          Vi in this.widths_ ? zi = this.widths_[Vi] : (zi = {}, this.widths_[Vi] = zi);
          const xl = Ly(c, Be, _l, 2), Cl = Math.abs(Gi[0]) * eu(Vi, T, zi);
          if (Qd || Cl <= xl) {
            const at = this.textStates[I].textAlign, Ln = (xl - Cl) * Co(T, at), lt = Ry(
              c,
              Be,
              _l,
              2,
              T,
              Ln,
              ef,
              Math.abs(Gi[0]),
              eu,
              Vi,
              zi,
              G ? 0 : this.viewRotation_
            );
            e:
              if (lt) {
                const It = [];
                let ut, zt, Bt, we, $e;
                if (b)
                  for (ut = 0, zt = lt.length; ut < zt; ++ut) {
                    $e = lt[ut], Bt = /** @type {string} */
                    $e[4], we = this.createLabel(Bt, I, "", b), m = /** @type {number} */
                    $e[2] + (Gi[0] < 0 ? -io : io), _ = no * we.height + (0.5 - no) * 2 * io * Gi[1] / Gi[0] - yl;
                    const $t = this.calculateImageOrLabelDimensions_(
                      we.width,
                      we.height,
                      $e[0],
                      $e[1],
                      we.width,
                      we.height,
                      m,
                      _,
                      0,
                      0,
                      $e[3],
                      pl,
                      !1,
                      Fn,
                      !1,
                      W
                    );
                    if (l && p === "declutter" && l.collides($t.declutterBox))
                      break e;
                    It.push([
                      e,
                      n,
                      we,
                      $t,
                      1,
                      null,
                      null
                    ]);
                  }
                if (D)
                  for (ut = 0, zt = lt.length; ut < zt; ++ut) {
                    $e = lt[ut], Bt = /** @type {string} */
                    $e[4], we = this.createLabel(Bt, I, D, ""), m = /** @type {number} */
                    $e[2], _ = no * we.height - yl;
                    const $t = this.calculateImageOrLabelDimensions_(
                      we.width,
                      we.height,
                      $e[0],
                      $e[1],
                      we.width,
                      we.height,
                      m,
                      _,
                      0,
                      0,
                      $e[3],
                      pl,
                      !1,
                      Fn,
                      !1,
                      W
                    );
                    if (l && p === "declutter" && l.collides($t.declutterBox))
                      break e;
                    It.push([
                      e,
                      n,
                      we,
                      $t,
                      1,
                      null,
                      null
                    ]);
                  }
                l && p !== "none" && l.load(It.map(yu));
                for (let $t = 0, tf = It.length; $t < tf; ++$t)
                  this.replayImageOrLabel_.apply(this, It[$t]);
              }
          }
          ++h;
          break;
        case Y.END_GEOMETRY:
          if (o !== void 0) {
            W = /** @type {import("../../Feature.js").FeatureLike} */
            L[1];
            const at = o(W, q);
            if (at)
              return at;
          }
          ++h;
          break;
        case Y.FILL:
          j ? P++ : this.fill_(e), ++h;
          break;
        case Y.MOVE_TO_LINE_TO:
          for (f = /** @type {number} */
          L[1], g = /** @type {number} */
          L[2], N = c[f], z = c[f + 1], x = N + 0.5 | 0, E = z + 0.5 | 0, (x !== y || E !== C) && (e.moveTo(N, z), y = x, C = E), f += 2; f < g; f += 2)
            N = c[f], z = c[f + 1], x = N + 0.5 | 0, E = z + 0.5 | 0, (f == g - 2 || x !== y || E !== C) && (e.lineTo(N, z), y = x, C = E);
          ++h;
          break;
        case Y.SET_FILL_STYLE:
          M = L, this.alignAndScaleFill_ = L[2], P && (this.fill_(e), P = 0, A && (e.stroke(), A = 0)), e.fillStyle = L[1], ++h;
          break;
        case Y.SET_STROKE_STYLE:
          k = L, A && (e.stroke(), A = 0), this.setStrokeStyle_(
            e,
            /** @type {Array<*>} */
            L
          ), ++h;
          break;
        case Y.STROKE:
          j ? A++ : e.stroke(), ++h;
          break;
        default:
          ++h;
          break;
      }
    }
    P && this.fill_(e), A && e.stroke();
  }
  /**
   * @param {CanvasRenderingContext2D} context Context.
   * @param {import('../../size.js').Size} scaledCanvasSize Scaled canvas size.
   * @param {import("../../transform.js").Transform} transform Transform.
   * @param {number} viewRotation View rotation.
   * @param {boolean} snapToPixel Snap point symbols and text to integer pixels.
   * @param {import("rbush").default} [declutterTree] Declutter tree.
   */
  execute(e, n, i, s, r, o) {
    this.viewRotation_ = s, this.execute_(
      e,
      n,
      i,
      this.instructions,
      r,
      void 0,
      void 0,
      o
    );
  }
  /**
   * @param {CanvasRenderingContext2D} context Context.
   * @param {import("../../transform.js").Transform} transform Transform.
   * @param {number} viewRotation View rotation.
   * @param {FeatureCallback<T>} [featureCallback] Feature callback.
   * @param {import("../../extent.js").Extent} [hitExtent] Only check
   *     features that intersect this extent.
   * @return {T|undefined} Callback result.
   * @template T
   */
  executeHitDetection(e, n, i, s, r) {
    return this.viewRotation_ = i, this.execute_(
      e,
      [e.canvas.width, e.canvas.height],
      n,
      this.hitDetectionInstructions,
      !0,
      s,
      r
    );
  }
}
const My = Py, Qi = [
  "Polygon",
  "Circle",
  "LineString",
  "Image",
  "Text",
  "Default"
], Ah = ["Image", "Text"], ky = Qi.filter(
  (t) => !Ah.includes(t)
);
class Oy {
  /**
   * @param {import("../../extent.js").Extent} maxExtent Max extent for clipping. When a
   * `maxExtent` was set on the Builder for this executor group, the same `maxExtent`
   * should be set here, unless the target context does not exceed that extent (which
   * can be the case when rendering to tiles).
   * @param {number} resolution Resolution.
   * @param {number} pixelRatio Pixel ratio.
   * @param {boolean} overlaps The executor group can have overlapping geometries.
   * @param {!Object<string, !Object<import("../canvas.js").BuilderType, import("../canvas.js").SerializableInstructions>>} allInstructions
   * The serializable instructions.
   * @param {number} [renderBuffer] Optional rendering buffer.
   * @param {boolean} [deferredRendering] Enable deferred rendering with renderDeferred().
   */
  constructor(e, n, i, s, r, o, a) {
    this.maxExtent_ = e, this.overlaps_ = s, this.pixelRatio_ = i, this.resolution_ = n, this.renderBuffer_ = o, this.executorsByZIndex_ = {}, this.hitDetectionContext_ = null, this.hitDetectionTransform_ = Ct(), this.renderedContext_ = null, this.deferredZIndexContexts_ = {}, this.createExecutors_(r, a);
  }
  /**
   * @param {CanvasRenderingContext2D} context Context.
   * @param {import("../../transform.js").Transform} transform Transform.
   */
  clip(e, n) {
    const i = this.getClipCoords(n);
    e.beginPath(), e.moveTo(i[0], i[1]), e.lineTo(i[2], i[3]), e.lineTo(i[4], i[5]), e.lineTo(i[6], i[7]), e.clip();
  }
  /**
   * Create executors and populate them using the provided instructions.
   * @private
   * @param {!Object<string, !Object<string, import("../canvas.js").SerializableInstructions>>} allInstructions The serializable instructions
   * @param {boolean} deferredRendering Enable deferred rendering.
   */
  createExecutors_(e, n) {
    for (const i in e) {
      let s = this.executorsByZIndex_[i];
      s === void 0 && (s = {}, this.executorsByZIndex_[i] = s);
      const r = e[i];
      for (const o in r) {
        const a = r[o];
        s[o] = new My(
          this.resolution_,
          this.pixelRatio_,
          this.overlaps_,
          a,
          n
        );
      }
    }
  }
  /**
   * @param {Array<import("../canvas.js").BuilderType>} executors Executors.
   * @return {boolean} Has executors of the provided types.
   */
  hasExecutors(e) {
    for (const n in this.executorsByZIndex_) {
      const i = this.executorsByZIndex_[n];
      for (let s = 0, r = e.length; s < r; ++s)
        if (e[s] in i)
          return !0;
    }
    return !1;
  }
  /**
   * @param {import("../../coordinate.js").Coordinate} coordinate Coordinate.
   * @param {number} resolution Resolution.
   * @param {number} rotation Rotation.
   * @param {number} hitTolerance Hit tolerance in pixels.
   * @param {function(import("../../Feature.js").FeatureLike, import("../../geom/SimpleGeometry.js").default, number): T} callback Feature callback.
   * @param {Array<import("../../Feature.js").FeatureLike>} declutteredFeatures Decluttered features.
   * @return {T|undefined} Callback result.
   * @template T
   */
  forEachFeatureAtCoordinate(e, n, i, s, r, o) {
    s = Math.round(s);
    const a = s * 2 + 1, l = Ot(
      this.hitDetectionTransform_,
      s + 0.5,
      s + 0.5,
      1 / n,
      -1 / n,
      -i,
      -e[0],
      -e[1]
    ), u = !this.hitDetectionContext_;
    u && (this.hitDetectionContext_ = De(
      a,
      a,
      void 0,
      { willReadFrequently: !0 }
    ));
    const c = this.hitDetectionContext_;
    c.canvas.width !== a || c.canvas.height !== a ? (c.canvas.width = a, c.canvas.height = a) : u || c.clearRect(0, 0, a, a);
    let h;
    this.renderBuffer_ !== void 0 && (h = ft(), Hi(h, e), oa(
      h,
      n * (this.renderBuffer_ + s),
      h
    ));
    const d = Dy(s);
    let f;
    function g(E, S) {
      const T = c.getImageData(
        0,
        0,
        a,
        a
      ).data;
      for (let I = 0, b = d.length; I < b; I++)
        if (T[d[I]] > 0) {
          if (!o || f !== "Image" && f !== "Text" || o.includes(E)) {
            const D = (d[I] - 3) / 4, P = s - D % a, A = s - (D / a | 0), M = r(E, S, P * P + A * A);
            if (M)
              return M;
          }
          c.clearRect(0, 0, a, a);
          break;
        }
    }
    const m = Object.keys(this.executorsByZIndex_).map(Number);
    m.sort(qt);
    let _, p, y, C, x;
    for (_ = m.length - 1; _ >= 0; --_) {
      const E = m[_].toString();
      for (y = this.executorsByZIndex_[E], p = Qi.length - 1; p >= 0; --p)
        if (f = Qi[p], C = y[f], C !== void 0 && (x = C.executeHitDetection(
          c,
          l,
          i,
          g,
          h
        ), x))
          return x;
    }
  }
  /**
   * @param {import("../../transform.js").Transform} transform Transform.
   * @return {Array<number>|null} Clip coordinates.
   */
  getClipCoords(e) {
    const n = this.maxExtent_;
    if (!n)
      return null;
    const i = n[0], s = n[1], r = n[2], o = n[3], a = [i, s, i, o, r, o, r, s];
    return yn(a, 0, 8, 2, e, a), a;
  }
  /**
   * @return {boolean} Is empty.
   */
  isEmpty() {
    return xi(this.executorsByZIndex_);
  }
  /**
   * @param {CanvasRenderingContext2D} targetContext Context.
   * @param {import('../../size.js').Size} scaledCanvasSize Scale of the context.
   * @param {import("../../transform.js").Transform} transform Transform.
   * @param {number} viewRotation View rotation.
   * @param {boolean} snapToPixel Snap point symbols and test to integer pixel.
   * @param {Array<import("../canvas.js").BuilderType>} [builderTypes] Ordered replay types to replay.
   *     Default is {@link module:ol/render/replay~ALL}
   * @param {import("rbush").default|null} [declutterTree] Declutter tree.
   *     When set to null, no decluttering is done, even when the executor group has a `ZIndexContext`.
   */
  execute(e, n, i, s, r, o, a) {
    const l = Object.keys(this.executorsByZIndex_).map(Number);
    l.sort(qt), o = o || Qi;
    let u, c, h, d, f, g;
    for (a && l.reverse(), u = 0, c = l.length; u < c; ++u) {
      const m = l[u].toString();
      for (f = this.executorsByZIndex_[m], h = 0, d = o.length; h < d; ++h) {
        const _ = o[h];
        if (g = f[_], g !== void 0) {
          const p = a === null ? void 0 : g.getZIndexContext(), y = p ? p.getContext() : e, C = this.maxExtent_ && _ !== "Image" && _ !== "Text";
          if (C && (y.save(), this.clip(y, i)), g.execute(
            y,
            n,
            i,
            s,
            r,
            a
          ), C && y.restore(), p) {
            p.offset();
            const x = l[u];
            this.deferredZIndexContexts_[x] || (this.deferredZIndexContexts_[x] = []), this.deferredZIndexContexts_[x].push(p);
          }
        }
      }
    }
    this.renderedContext_ = e;
  }
  getDeferredZIndexContexts() {
    return this.deferredZIndexContexts_;
  }
  getRenderedContext() {
    return this.renderedContext_;
  }
  renderDeferred() {
    const e = this.deferredZIndexContexts_, n = Object.keys(e).map(Number).sort(qt);
    for (let i = 0, s = n.length; i < s; ++i)
      e[n[i]].forEach((r) => {
        r.draw(this.renderedContext_), r.clear();
      });
  }
}
const Eo = {};
function Dy(t) {
  if (Eo[t] !== void 0)
    return Eo[t];
  const e = t * 2 + 1, n = t * t, i = new Array(n + 1);
  for (let r = 0; r <= t; ++r)
    for (let o = 0; o <= t; ++o) {
      const a = r * r + o * o;
      if (a > n)
        break;
      let l = i[a];
      l || (l = [], i[a] = l), l.push(((t + r) * e + (t + o)) * 4 + 3), r > 0 && l.push(((t - r) * e + (t + o)) * 4 + 3), o > 0 && (l.push(((t + r) * e + (t - o)) * 4 + 3), r > 0 && l.push(((t - r) * e + (t - o)) * 4 + 3));
    }
  const s = [];
  for (let r = 0, o = i.length; r < o; ++r)
    i[r] && s.push(...i[r]);
  return Eo[t] = s, s;
}
const Fy = Oy;
class Ny extends Lh {
  /**
   * @param {CanvasRenderingContext2D} context Context.
   * @param {number} pixelRatio Pixel ratio.
   * @param {import("../../extent.js").Extent} extent Extent.
   * @param {import("../../transform.js").Transform} transform Transform.
   * @param {number} viewRotation View rotation.
   * @param {number} [squaredTolerance] Optional squared tolerance for simplification.
   * @param {import("../../proj.js").TransformFunction} [userTransform] Transform from user to view projection.
   */
  constructor(e, n, i, s, r, o, a) {
    super(), this.context_ = e, this.pixelRatio_ = n, this.extent_ = i, this.transform_ = s, this.transformRotation_ = s ? sa(Math.atan2(s[1], s[0]), 10) : 0, this.viewRotation_ = r, this.squaredTolerance_ = o, this.userTransform_ = a, this.contextFillState_ = null, this.contextStrokeState_ = null, this.contextTextState_ = null, this.fillState_ = null, this.strokeState_ = null, this.image_ = null, this.imageAnchorX_ = 0, this.imageAnchorY_ = 0, this.imageHeight_ = 0, this.imageOpacity_ = 0, this.imageOriginX_ = 0, this.imageOriginY_ = 0, this.imageRotateWithView_ = !1, this.imageRotation_ = 0, this.imageScale_ = [0, 0], this.imageWidth_ = 0, this.text_ = "", this.textOffsetX_ = 0, this.textOffsetY_ = 0, this.textRotateWithView_ = !1, this.textRotation_ = 0, this.textScale_ = [0, 0], this.textFillState_ = null, this.textStrokeState_ = null, this.textState_ = null, this.pixelCoordinates_ = [], this.tmpLocalTransform_ = Ct();
  }
  /**
   * @param {Array<number>} flatCoordinates Flat coordinates.
   * @param {number} offset Offset.
   * @param {number} end End.
   * @param {number} stride Stride.
   * @private
   */
  drawImages_(e, n, i, s) {
    if (!this.image_)
      return;
    const r = yn(
      e,
      n,
      i,
      s,
      this.transform_,
      this.pixelCoordinates_
    ), o = this.context_, a = this.tmpLocalTransform_, l = o.globalAlpha;
    this.imageOpacity_ != 1 && (o.globalAlpha = l * this.imageOpacity_);
    let u = this.imageRotation_;
    this.transformRotation_ === 0 && (u -= this.viewRotation_), this.imageRotateWithView_ && (u += this.viewRotation_);
    for (let c = 0, h = r.length; c < h; c += 2) {
      const d = r[c] - this.imageAnchorX_, f = r[c + 1] - this.imageAnchorY_;
      if (u !== 0 || this.imageScale_[0] != 1 || this.imageScale_[1] != 1) {
        const g = d + this.imageAnchorX_, m = f + this.imageAnchorY_;
        Ot(
          a,
          g,
          m,
          1,
          1,
          u,
          -g,
          -m
        ), o.save(), o.transform.apply(o, a), o.translate(g, m), o.scale(this.imageScale_[0], this.imageScale_[1]), o.drawImage(
          this.image_,
          this.imageOriginX_,
          this.imageOriginY_,
          this.imageWidth_,
          this.imageHeight_,
          -this.imageAnchorX_,
          -this.imageAnchorY_,
          this.imageWidth_,
          this.imageHeight_
        ), o.restore();
      } else
        o.drawImage(
          this.image_,
          this.imageOriginX_,
          this.imageOriginY_,
          this.imageWidth_,
          this.imageHeight_,
          d,
          f,
          this.imageWidth_,
          this.imageHeight_
        );
    }
    this.imageOpacity_ != 1 && (o.globalAlpha = l);
  }
  /**
   * @param {Array<number>} flatCoordinates Flat coordinates.
   * @param {number} offset Offset.
   * @param {number} end End.
   * @param {number} stride Stride.
   * @private
   */
  drawText_(e, n, i, s) {
    if (!this.textState_ || this.text_ === "")
      return;
    this.textFillState_ && this.setContextFillState_(this.textFillState_), this.textStrokeState_ && this.setContextStrokeState_(this.textStrokeState_), this.setContextTextState_(this.textState_);
    const r = yn(
      e,
      n,
      i,
      s,
      this.transform_,
      this.pixelCoordinates_
    ), o = this.context_;
    let a = this.textRotation_;
    for (this.transformRotation_ === 0 && (a -= this.viewRotation_), this.textRotateWithView_ && (a += this.viewRotation_); n < i; n += s) {
      const l = r[n] + this.textOffsetX_, u = r[n + 1] + this.textOffsetY_;
      a !== 0 || this.textScale_[0] != 1 || this.textScale_[1] != 1 ? (o.save(), o.translate(l - this.textOffsetX_, u - this.textOffsetY_), o.rotate(a), o.translate(this.textOffsetX_, this.textOffsetY_), o.scale(this.textScale_[0], this.textScale_[1]), this.textStrokeState_ && o.strokeText(this.text_, 0, 0), this.textFillState_ && o.fillText(this.text_, 0, 0), o.restore()) : (this.textStrokeState_ && o.strokeText(this.text_, l, u), this.textFillState_ && o.fillText(this.text_, l, u));
    }
  }
  /**
   * @param {Array<number>} flatCoordinates Flat coordinates.
   * @param {number} offset Offset.
   * @param {number} end End.
   * @param {number} stride Stride.
   * @param {boolean} close Close.
   * @private
   * @return {number} end End.
   */
  moveToLineTo_(e, n, i, s, r) {
    const o = this.context_, a = yn(
      e,
      n,
      i,
      s,
      this.transform_,
      this.pixelCoordinates_
    );
    o.moveTo(a[0], a[1]);
    let l = a.length;
    r && (l -= 2);
    for (let u = 2; u < l; u += 2)
      o.lineTo(a[u], a[u + 1]);
    return r && o.closePath(), i;
  }
  /**
   * @param {Array<number>} flatCoordinates Flat coordinates.
   * @param {number} offset Offset.
   * @param {Array<number>} ends Ends.
   * @param {number} stride Stride.
   * @private
   * @return {number} End.
   */
  drawRings_(e, n, i, s) {
    for (let r = 0, o = i.length; r < o; ++r)
      n = this.moveToLineTo_(
        e,
        n,
        i[r],
        s,
        !0
      );
    return n;
  }
  /**
   * Render a circle geometry into the canvas.  Rendering is immediate and uses
   * the current fill and stroke styles.
   *
   * @param {import("../../geom/Circle.js").default} geometry Circle geometry.
   * @api
   */
  drawCircle(e) {
    if (this.squaredTolerance_ && (e = /** @type {import("../../geom/Circle.js").default} */
    e.simplifyTransformed(
      this.squaredTolerance_,
      this.userTransform_
    )), !!qe(this.extent_, e.getExtent())) {
      if (this.fillState_ || this.strokeState_) {
        this.fillState_ && this.setContextFillState_(this.fillState_), this.strokeState_ && this.setContextStrokeState_(this.strokeState_);
        const n = xg(
          e,
          this.transform_,
          this.pixelCoordinates_
        ), i = n[2] - n[0], s = n[3] - n[1], r = Math.sqrt(i * i + s * s), o = this.context_;
        o.beginPath(), o.arc(
          n[0],
          n[1],
          r,
          0,
          2 * Math.PI
        ), this.fillState_ && o.fill(), this.strokeState_ && o.stroke();
      }
      this.text_ !== "" && this.drawText_(e.getCenter(), 0, 2, 2);
    }
  }
  /**
   * Set the rendering style.  Note that since this is an immediate rendering API,
   * any `zIndex` on the provided style will be ignored.
   *
   * @param {import("../../style/Style.js").default} style The rendering style.
   * @api
   */
  setStyle(e) {
    this.setFillStrokeStyle(e.getFill(), e.getStroke()), this.setImageStyle(e.getImage()), this.setTextStyle(e.getText());
  }
  /**
   * @param {import("../../transform.js").Transform} transform Transform.
   */
  setTransform(e) {
    this.transform_ = e;
  }
  /**
   * Render a geometry into the canvas.  Call
   * {@link module:ol/render/canvas/Immediate~CanvasImmediateRenderer#setStyle renderer.setStyle()} first to set the rendering style.
   *
   * @param {import("../../geom/Geometry.js").default|import("../Feature.js").default} geometry The geometry to render.
   * @api
   */
  drawGeometry(e) {
    switch (e.getType()) {
      case "Point":
        this.drawPoint(
          /** @type {import("../../geom/Point.js").default} */
          e
        );
        break;
      case "LineString":
        this.drawLineString(
          /** @type {import("../../geom/LineString.js").default} */
          e
        );
        break;
      case "Polygon":
        this.drawPolygon(
          /** @type {import("../../geom/Polygon.js").default} */
          e
        );
        break;
      case "MultiPoint":
        this.drawMultiPoint(
          /** @type {import("../../geom/MultiPoint.js").default} */
          e
        );
        break;
      case "MultiLineString":
        this.drawMultiLineString(
          /** @type {import("../../geom/MultiLineString.js").default} */
          e
        );
        break;
      case "MultiPolygon":
        this.drawMultiPolygon(
          /** @type {import("../../geom/MultiPolygon.js").default} */
          e
        );
        break;
      case "GeometryCollection":
        this.drawGeometryCollection(
          /** @type {import("../../geom/GeometryCollection.js").default} */
          e
        );
        break;
      case "Circle":
        this.drawCircle(
          /** @type {import("../../geom/Circle.js").default} */
          e
        );
        break;
    }
  }
  /**
   * Render a feature into the canvas.  Note that any `zIndex` on the provided
   * style will be ignored - features are rendered immediately in the order that
   * this method is called.  If you need `zIndex` support, you should be using an
   * {@link module:ol/layer/Vector~VectorLayer} instead.
   *
   * @param {import("../../Feature.js").default} feature Feature.
   * @param {import("../../style/Style.js").default} style Style.
   * @api
   */
  drawFeature(e, n) {
    const i = n.getGeometryFunction()(e);
    i && (this.setStyle(n), this.drawGeometry(i));
  }
  /**
   * Render a GeometryCollection to the canvas.  Rendering is immediate and
   * uses the current styles appropriate for each geometry in the collection.
   *
   * @param {import("../../geom/GeometryCollection.js").default} geometry Geometry collection.
   */
  drawGeometryCollection(e) {
    const n = e.getGeometriesArray();
    for (let i = 0, s = n.length; i < s; ++i)
      this.drawGeometry(n[i]);
  }
  /**
   * Render a Point geometry into the canvas.  Rendering is immediate and uses
   * the current style.
   *
   * @param {import("../../geom/Point.js").default|import("../Feature.js").default} geometry Point geometry.
   */
  drawPoint(e) {
    this.squaredTolerance_ && (e = /** @type {import("../../geom/Point.js").default} */
    e.simplifyTransformed(
      this.squaredTolerance_,
      this.userTransform_
    ));
    const n = e.getFlatCoordinates(), i = e.getStride();
    this.image_ && this.drawImages_(n, 0, n.length, i), this.text_ !== "" && this.drawText_(n, 0, n.length, i);
  }
  /**
   * Render a MultiPoint geometry  into the canvas.  Rendering is immediate and
   * uses the current style.
   *
   * @param {import("../../geom/MultiPoint.js").default|import("../Feature.js").default} geometry MultiPoint geometry.
   */
  drawMultiPoint(e) {
    this.squaredTolerance_ && (e = /** @type {import("../../geom/MultiPoint.js").default} */
    e.simplifyTransformed(
      this.squaredTolerance_,
      this.userTransform_
    ));
    const n = e.getFlatCoordinates(), i = e.getStride();
    this.image_ && this.drawImages_(n, 0, n.length, i), this.text_ !== "" && this.drawText_(n, 0, n.length, i);
  }
  /**
   * Render a LineString into the canvas.  Rendering is immediate and uses
   * the current style.
   *
   * @param {import("../../geom/LineString.js").default|import("../Feature.js").default} geometry LineString geometry.
   */
  drawLineString(e) {
    if (this.squaredTolerance_ && (e = /** @type {import("../../geom/LineString.js").default} */
    e.simplifyTransformed(
      this.squaredTolerance_,
      this.userTransform_
    )), !!qe(this.extent_, e.getExtent())) {
      if (this.strokeState_) {
        this.setContextStrokeState_(this.strokeState_);
        const n = this.context_, i = e.getFlatCoordinates();
        n.beginPath(), this.moveToLineTo_(
          i,
          0,
          i.length,
          e.getStride(),
          !1
        ), n.stroke();
      }
      if (this.text_ !== "") {
        const n = e.getFlatMidpoint();
        this.drawText_(n, 0, 2, 2);
      }
    }
  }
  /**
   * Render a MultiLineString geometry into the canvas.  Rendering is immediate
   * and uses the current style.
   *
   * @param {import("../../geom/MultiLineString.js").default|import("../Feature.js").default} geometry MultiLineString geometry.
   */
  drawMultiLineString(e) {
    this.squaredTolerance_ && (e = /** @type {import("../../geom/MultiLineString.js").default} */
    e.simplifyTransformed(
      this.squaredTolerance_,
      this.userTransform_
    ));
    const n = e.getExtent();
    if (qe(this.extent_, n)) {
      if (this.strokeState_) {
        this.setContextStrokeState_(this.strokeState_);
        const i = this.context_, s = e.getFlatCoordinates();
        let r = 0;
        const o = (
          /** @type {Array<number>} */
          e.getEnds()
        ), a = e.getStride();
        i.beginPath();
        for (let l = 0, u = o.length; l < u; ++l)
          r = this.moveToLineTo_(
            s,
            r,
            o[l],
            a,
            !1
          );
        i.stroke();
      }
      if (this.text_ !== "") {
        const i = e.getFlatMidpoints();
        this.drawText_(i, 0, i.length, 2);
      }
    }
  }
  /**
   * Render a Polygon geometry into the canvas.  Rendering is immediate and uses
   * the current style.
   *
   * @param {import("../../geom/Polygon.js").default|import("../Feature.js").default} geometry Polygon geometry.
   */
  drawPolygon(e) {
    if (this.squaredTolerance_ && (e = /** @type {import("../../geom/Polygon.js").default} */
    e.simplifyTransformed(
      this.squaredTolerance_,
      this.userTransform_
    )), !!qe(this.extent_, e.getExtent())) {
      if (this.strokeState_ || this.fillState_) {
        this.fillState_ && this.setContextFillState_(this.fillState_), this.strokeState_ && this.setContextStrokeState_(this.strokeState_);
        const n = this.context_;
        n.beginPath(), this.drawRings_(
          e.getOrientedFlatCoordinates(),
          0,
          /** @type {Array<number>} */
          e.getEnds(),
          e.getStride()
        ), this.fillState_ && n.fill(), this.strokeState_ && n.stroke();
      }
      if (this.text_ !== "") {
        const n = e.getFlatInteriorPoint();
        this.drawText_(n, 0, 2, 2);
      }
    }
  }
  /**
   * Render MultiPolygon geometry into the canvas.  Rendering is immediate and
   * uses the current style.
   * @param {import("../../geom/MultiPolygon.js").default} geometry MultiPolygon geometry.
   */
  drawMultiPolygon(e) {
    if (this.squaredTolerance_ && (e = /** @type {import("../../geom/MultiPolygon.js").default} */
    e.simplifyTransformed(
      this.squaredTolerance_,
      this.userTransform_
    )), !!qe(this.extent_, e.getExtent())) {
      if (this.strokeState_ || this.fillState_) {
        this.fillState_ && this.setContextFillState_(this.fillState_), this.strokeState_ && this.setContextStrokeState_(this.strokeState_);
        const n = this.context_, i = e.getOrientedFlatCoordinates();
        let s = 0;
        const r = e.getEndss(), o = e.getStride();
        n.beginPath();
        for (let a = 0, l = r.length; a < l; ++a) {
          const u = r[a];
          s = this.drawRings_(i, s, u, o);
        }
        this.fillState_ && n.fill(), this.strokeState_ && n.stroke();
      }
      if (this.text_ !== "") {
        const n = e.getFlatInteriorPoints();
        this.drawText_(n, 0, n.length, 2);
      }
    }
  }
  /**
   * @param {import("../canvas.js").FillState} fillState Fill state.
   * @private
   */
  setContextFillState_(e) {
    const n = this.context_, i = this.contextFillState_;
    i ? i.fillStyle != e.fillStyle && (i.fillStyle = e.fillStyle, n.fillStyle = e.fillStyle) : (n.fillStyle = e.fillStyle, this.contextFillState_ = {
      fillStyle: e.fillStyle
    });
  }
  /**
   * @param {import("../canvas.js").StrokeState} strokeState Stroke state.
   * @private
   */
  setContextStrokeState_(e) {
    const n = this.context_, i = this.contextStrokeState_;
    i ? (i.lineCap != e.lineCap && (i.lineCap = e.lineCap, n.lineCap = e.lineCap), In(i.lineDash, e.lineDash) || n.setLineDash(
      i.lineDash = e.lineDash
    ), i.lineDashOffset != e.lineDashOffset && (i.lineDashOffset = e.lineDashOffset, n.lineDashOffset = e.lineDashOffset), i.lineJoin != e.lineJoin && (i.lineJoin = e.lineJoin, n.lineJoin = e.lineJoin), i.lineWidth != e.lineWidth && (i.lineWidth = e.lineWidth, n.lineWidth = e.lineWidth), i.miterLimit != e.miterLimit && (i.miterLimit = e.miterLimit, n.miterLimit = e.miterLimit), i.strokeStyle != e.strokeStyle && (i.strokeStyle = e.strokeStyle, n.strokeStyle = e.strokeStyle)) : (n.lineCap = e.lineCap, n.setLineDash(e.lineDash), n.lineDashOffset = e.lineDashOffset, n.lineJoin = e.lineJoin, n.lineWidth = e.lineWidth, n.miterLimit = e.miterLimit, n.strokeStyle = e.strokeStyle, this.contextStrokeState_ = {
      lineCap: e.lineCap,
      lineDash: e.lineDash,
      lineDashOffset: e.lineDashOffset,
      lineJoin: e.lineJoin,
      lineWidth: e.lineWidth,
      miterLimit: e.miterLimit,
      strokeStyle: e.strokeStyle
    });
  }
  /**
   * @param {import("../canvas.js").TextState} textState Text state.
   * @private
   */
  setContextTextState_(e) {
    const n = this.context_, i = this.contextTextState_, s = e.textAlign ? e.textAlign : us;
    i ? (i.font != e.font && (i.font = e.font, n.font = e.font), i.textAlign != s && (i.textAlign = s, n.textAlign = s), i.textBaseline != e.textBaseline && (i.textBaseline = e.textBaseline, n.textBaseline = e.textBaseline)) : (n.font = e.font, n.textAlign = s, n.textBaseline = e.textBaseline, this.contextTextState_ = {
      font: e.font,
      textAlign: s,
      textBaseline: e.textBaseline
    });
  }
  /**
   * Set the fill and stroke style for subsequent draw operations.  To clear
   * either fill or stroke styles, pass null for the appropriate parameter.
   *
   * @param {import("../../style/Fill.js").default} fillStyle Fill style.
   * @param {import("../../style/Stroke.js").default} strokeStyle Stroke style.
   */
  setFillStrokeStyle(e, n) {
    if (!e)
      this.fillState_ = null;
    else {
      const i = e.getColor();
      this.fillState_ = {
        fillStyle: Pt(
          i || He
        )
      };
    }
    if (!n)
      this.strokeState_ = null;
    else {
      const i = n.getColor(), s = n.getLineCap(), r = n.getLineDash(), o = n.getLineDashOffset(), a = n.getLineJoin(), l = n.getWidth(), u = n.getMiterLimit(), c = r || Jt;
      this.strokeState_ = {
        lineCap: s !== void 0 ? s : Ei,
        lineDash: this.pixelRatio_ === 1 ? c : c.map((h) => h * this.pixelRatio_),
        lineDashOffset: (o || Qt) * this.pixelRatio_,
        lineJoin: a !== void 0 ? a : wi,
        lineWidth: (l !== void 0 ? l : cs) * this.pixelRatio_,
        miterLimit: u !== void 0 ? u : as,
        strokeStyle: Pt(
          i || ls
        )
      };
    }
  }
  /**
   * Set the image style for subsequent draw operations.  Pass null to remove
   * the image style.
   *
   * @param {import("../../style/Image.js").default} imageStyle Image style.
   */
  setImageStyle(e) {
    let n;
    if (!e || !(n = e.getSize())) {
      this.image_ = null;
      return;
    }
    const i = e.getPixelRatio(this.pixelRatio_), s = e.getAnchor(), r = e.getOrigin();
    this.image_ = e.getImage(this.pixelRatio_), this.imageAnchorX_ = s[0] * i, this.imageAnchorY_ = s[1] * i, this.imageHeight_ = n[1] * i, this.imageOpacity_ = e.getOpacity(), this.imageOriginX_ = r[0], this.imageOriginY_ = r[1], this.imageRotateWithView_ = e.getRotateWithView(), this.imageRotation_ = e.getRotation();
    const o = e.getScaleArray();
    this.imageScale_ = [
      o[0] * this.pixelRatio_ / i,
      o[1] * this.pixelRatio_ / i
    ], this.imageWidth_ = n[0] * i;
  }
  /**
   * Set the text style for subsequent draw operations.  Pass null to
   * remove the text style.
   *
   * @param {import("../../style/Text.js").default} textStyle Text style.
   */
  setTextStyle(e) {
    if (!e)
      this.text_ = "";
    else {
      const n = e.getFill();
      if (!n)
        this.textFillState_ = null;
      else {
        const f = n.getColor();
        this.textFillState_ = {
          fillStyle: Pt(
            f || He
          )
        };
      }
      const i = e.getStroke();
      if (!i)
        this.textStrokeState_ = null;
      else {
        const f = i.getColor(), g = i.getLineCap(), m = i.getLineDash(), _ = i.getLineDashOffset(), p = i.getLineJoin(), y = i.getWidth(), C = i.getMiterLimit();
        this.textStrokeState_ = {
          lineCap: g !== void 0 ? g : Ei,
          lineDash: m || Jt,
          lineDashOffset: _ || Qt,
          lineJoin: p !== void 0 ? p : wi,
          lineWidth: y !== void 0 ? y : cs,
          miterLimit: C !== void 0 ? C : as,
          strokeStyle: Pt(
            f || ls
          )
        };
      }
      const s = e.getFont(), r = e.getOffsetX(), o = e.getOffsetY(), a = e.getRotateWithView(), l = e.getRotation(), u = e.getScaleArray(), c = e.getText(), h = e.getTextAlign(), d = e.getTextBaseline();
      this.textState_ = {
        font: s !== void 0 ? s : Hc,
        textAlign: h !== void 0 ? h : us,
        textBaseline: d !== void 0 ? d : or
      }, this.text_ = c !== void 0 ? Array.isArray(c) ? c.reduce((f, g, m) => f += m % 2 ? " " : g, "") : c : "", this.textOffsetX_ = r !== void 0 ? this.pixelRatio_ * r : 0, this.textOffsetY_ = o !== void 0 ? this.pixelRatio_ * o : 0, this.textRotateWithView_ = a !== void 0 ? a : !1, this.textRotation_ = l !== void 0 ? l : 0, this.textScale_ = [
        this.pixelRatio_ * u[0],
        this.pixelRatio_ * u[1]
      ];
    }
  }
}
const Vy = Ny, Rt = 0.5;
function Gy(t, e, n, i, s, r, o, a, l) {
  const u = l ? ha(s) : s, c = t[0] * Rt, h = t[1] * Rt, d = De(c, h);
  d.imageSmoothingEnabled = !1;
  const f = d.canvas, g = new Vy(
    d,
    Rt,
    s,
    null,
    o,
    a,
    l ? Ir(ig(), l) : null
  ), m = n.length, _ = Math.floor((256 * 256 * 256 - 1) / m), p = {};
  for (let C = 1; C <= m; ++C) {
    const x = n[C - 1], E = x.getStyleFunction() || i;
    if (!E)
      continue;
    let S = E(x, r);
    if (!S)
      continue;
    Array.isArray(S) || (S = [S]);
    const I = (C * _).toString(16).padStart(7, "#00000");
    for (let b = 0, D = S.length; b < D; ++b) {
      const P = S[b], A = P.getGeometryFunction()(x);
      if (!A || !qe(u, A.getExtent()))
        continue;
      const M = P.clone(), k = M.getFill();
      k && k.setColor(I);
      const V = M.getStroke();
      V && (V.setColor(I), V.setLineDash(null)), M.setText(void 0);
      const O = P.getImage();
      if (O) {
        const W = O.getImageSize();
        if (!W)
          continue;
        const N = De(
          W[0],
          W[1],
          void 0,
          { alpha: !1 }
        ), z = N.canvas;
        N.fillStyle = I, N.fillRect(0, 0, z.width, z.height), M.setImage(
          new Oa({
            img: z,
            anchor: O.getAnchor(),
            anchorXUnits: "pixels",
            anchorYUnits: "pixels",
            offset: O.getOrigin(),
            opacity: 1,
            size: O.getSize(),
            scale: O.getScale(),
            rotation: O.getRotation(),
            rotateWithView: O.getRotateWithView()
          })
        );
      }
      const G = M.getZIndex() || 0;
      let F = p[G];
      F || (F = {}, p[G] = F, F.Polygon = [], F.Circle = [], F.LineString = [], F.Point = []);
      const j = A.getType();
      if (j === "GeometryCollection") {
        const W = (
          /** @type {import("../../geom/GeometryCollection.js").default} */
          A.getGeometriesArrayRecursive()
        );
        for (let N = 0, z = W.length; N < z; ++N) {
          const q = W[N];
          F[q.getType().replace("Multi", "")].push(
            q,
            M
          );
        }
      } else
        F[j.replace("Multi", "")].push(A, M);
    }
  }
  const y = Object.keys(p).map(Number).sort(qt);
  for (let C = 0, x = y.length; C < x; ++C) {
    const E = p[y[C]];
    for (const S in E) {
      const T = E[S];
      for (let I = 0, b = T.length; I < b; I += 2) {
        g.setStyle(T[I + 1]);
        for (let D = 0, P = e.length; D < P; ++D)
          g.setTransform(e[D]), g.drawGeometry(T[I]);
      }
    }
  }
  return d.getImageData(0, 0, f.width, f.height);
}
function zy(t, e, n) {
  const i = [];
  if (n) {
    const s = Math.floor(Math.round(t[0]) * Rt), r = Math.floor(Math.round(t[1]) * Rt), o = (Re(s, 0, n.width - 1) + Re(r, 0, n.height - 1) * n.width) * 4, a = n.data[o], l = n.data[o + 1], c = n.data[o + 2] + 256 * (l + 256 * a), h = Math.floor((256 * 256 * 256 - 1) / e.length);
    c && c % h === 0 && i.push(e[c / h - 1]);
  }
  return i;
}
const By = 0.5, Ph = {
  Point: Ky,
  LineString: jy,
  Polygon: qy,
  MultiPoint: Hy,
  MultiLineString: Uy,
  MultiPolygon: Zy,
  GeometryCollection: Yy,
  Circle: Wy
};
function $y(t, e) {
  return parseInt(fe(t), 10) - parseInt(fe(e), 10);
}
function xu(t, e) {
  const n = Mh(t, e);
  return n * n;
}
function Mh(t, e) {
  return By * t / e;
}
function Wy(t, e, n, i, s) {
  const r = n.getFill(), o = n.getStroke();
  if (r || o) {
    const l = t.getBuilder(n.getZIndex(), "Circle");
    l.setFillStrokeStyle(r, o), l.drawCircle(e, i, s);
  }
  const a = n.getText();
  if (a && a.getText()) {
    const l = t.getBuilder(n.getZIndex(), "Text");
    l.setTextStyle(a), l.drawText(e, i);
  }
}
function Cu(t, e, n, i, s, r, o, a) {
  const l = [], u = n.getImage();
  if (u) {
    let d = !0;
    const f = u.getImageState();
    f == ee.LOADED || f == ee.ERROR ? d = !1 : f == ee.IDLE && u.load(), d && l.push(u.ready());
  }
  const c = n.getFill();
  c && c.loading() && l.push(c.ready());
  const h = l.length > 0;
  return h && Promise.all(l).then(() => s(null)), Xy(
    t,
    e,
    n,
    i,
    r,
    o,
    a
  ), h;
}
function Xy(t, e, n, i, s, r, o) {
  const a = n.getGeometryFunction()(e);
  if (!a)
    return;
  const l = a.simplifyTransformed(
    i,
    s
  );
  if (n.getRenderer())
    kh(t, l, n, e, o);
  else {
    const c = Ph[l.getType()];
    c(
      t,
      l,
      n,
      e,
      o,
      r
    );
  }
}
function kh(t, e, n, i, s) {
  if (e.getType() == "GeometryCollection") {
    const o = (
      /** @type {import("../geom/GeometryCollection.js").default} */
      e.getGeometries()
    );
    for (let a = 0, l = o.length; a < l; ++a)
      kh(t, o[a], n, i, s);
    return;
  }
  t.getBuilder(n.getZIndex(), "Default").drawCustom(
    /** @type {import("../geom/SimpleGeometry.js").default} */
    e,
    i,
    n.getRenderer(),
    n.getHitDetectionRenderer(),
    s
  );
}
function Yy(t, e, n, i, s, r) {
  const o = e.getGeometriesArray();
  let a, l;
  for (a = 0, l = o.length; a < l; ++a) {
    const u = Ph[o[a].getType()];
    u(
      t,
      o[a],
      n,
      i,
      s,
      r
    );
  }
}
function jy(t, e, n, i, s) {
  const r = n.getStroke();
  if (r) {
    const a = t.getBuilder(
      n.getZIndex(),
      "LineString"
    );
    a.setFillStrokeStyle(null, r), a.drawLineString(e, i, s);
  }
  const o = n.getText();
  if (o && o.getText()) {
    const a = t.getBuilder(n.getZIndex(), "Text");
    a.setTextStyle(o), a.drawText(e, i, s);
  }
}
function Uy(t, e, n, i, s) {
  const r = n.getStroke();
  if (r) {
    const a = t.getBuilder(
      n.getZIndex(),
      "LineString"
    );
    a.setFillStrokeStyle(null, r), a.drawMultiLineString(e, i, s);
  }
  const o = n.getText();
  if (o && o.getText()) {
    const a = t.getBuilder(n.getZIndex(), "Text");
    a.setTextStyle(o), a.drawText(e, i, s);
  }
}
function Zy(t, e, n, i, s) {
  const r = n.getFill(), o = n.getStroke();
  if (o || r) {
    const l = t.getBuilder(n.getZIndex(), "Polygon");
    l.setFillStrokeStyle(r, o), l.drawMultiPolygon(e, i, s);
  }
  const a = n.getText();
  if (a && a.getText()) {
    const l = t.getBuilder(n.getZIndex(), "Text");
    l.setTextStyle(a), l.drawText(e, i, s);
  }
}
function Ky(t, e, n, i, s, r) {
  const o = n.getImage(), a = n.getText(), l = a && a.getText(), u = r && o && l ? {} : void 0;
  if (o) {
    if (o.getImageState() != ee.LOADED)
      return;
    const c = t.getBuilder(n.getZIndex(), "Image");
    c.setImageStyle(o, u), c.drawPoint(e, i, s);
  }
  if (l) {
    const c = t.getBuilder(n.getZIndex(), "Text");
    c.setTextStyle(a, u), c.drawText(e, i, s);
  }
}
function Hy(t, e, n, i, s, r) {
  const o = n.getImage(), a = o && o.getOpacity() !== 0, l = n.getText(), u = l && l.getText(), c = r && a && u ? {} : void 0;
  if (a) {
    if (o.getImageState() != ee.LOADED)
      return;
    const h = t.getBuilder(n.getZIndex(), "Image");
    h.setImageStyle(o, c), h.drawMultiPoint(e, i, s);
  }
  if (u) {
    const h = t.getBuilder(n.getZIndex(), "Text");
    h.setTextStyle(l, c), h.drawText(e, i, s);
  }
}
function qy(t, e, n, i, s) {
  const r = n.getFill(), o = n.getStroke();
  if (r || o) {
    const l = t.getBuilder(n.getZIndex(), "Polygon");
    l.setFillStrokeStyle(r, o), l.drawPolygon(e, i, s);
  }
  const a = n.getText();
  if (a && a.getText()) {
    const l = t.getBuilder(n.getZIndex(), "Text");
    l.setTextStyle(a), l.drawText(e, i, s);
  }
}
class Jy extends Rh {
  /**
   * @param {import("../../layer/BaseVector.js").default} vectorLayer Vector layer.
   */
  constructor(e) {
    super(e), this.boundHandleStyleImageChange_ = this.handleStyleImageChange_.bind(this), this.animatingOrInteracting_, this.hitDetectionImageData_ = null, this.renderedFeatures_ = null, this.renderedRevision_ = -1, this.renderedResolution_ = NaN, this.renderedExtent_ = ft(), this.wrappedRenderedExtent_ = ft(), this.renderedRotation_, this.renderedCenter_ = null, this.renderedProjection_ = null, this.renderedPixelRatio_ = 1, this.renderedRenderOrder_ = null, this.replayGroup_ = null, this.replayGroupChanged = !0, this.clipping = !0, this.targetContext_ = null, this.opacity_ = 1;
  }
  /**
   * @param {ExecutorGroup} executorGroup Executor group.
   * @param {import("../../Map.js").FrameState} frameState Frame state.
   * @param {boolean} [declutterable] `true` to only render declutterable items,
   *     `false` to only render non-declutterable items, `undefined` to render all.
   */
  renderWorlds(e, n, i) {
    const s = n.extent, r = n.viewState, o = r.center, a = r.resolution, l = r.projection, u = r.rotation, c = l.getExtent(), h = this.getLayer().getSource(), d = this.getLayer().getDeclutter(), f = n.pixelRatio, g = n.viewHints, m = !(g[Ve.ANIMATING] || g[Ve.INTERACTING]), _ = this.context, p = Math.round(_e(s) / a * f), y = Math.round(Ge(s) / a * f), C = h.getWrapX() && l.canWrapX(), x = C ? _e(c) : null, E = C ? Math.ceil((s[2] - c[2]) / x) + 1 : 1;
    let S = C ? Math.floor((s[0] - c[0]) / x) : 0;
    do {
      const T = this.getRenderTransform(
        o,
        a,
        u,
        f,
        p,
        y,
        S * x
      );
      e.execute(
        _,
        [_.canvas.width, _.canvas.height],
        T,
        u,
        m,
        i === void 0 ? Qi : i ? Ah : ky,
        i ? d && n.declutter[d] : void 0
      );
    } while (++S < E);
  }
  /**
   * @private
   */
  setDrawContext_() {
    this.opacity_ !== 1 && (this.targetContext_ = this.context, this.context = De(
      this.context.canvas.width,
      this.context.canvas.height,
      mu
    ));
  }
  /**
   * @private
   */
  resetDrawContext_() {
    if (this.opacity_ !== 1) {
      const e = this.targetContext_.globalAlpha;
      this.targetContext_.globalAlpha = this.opacity_, this.targetContext_.drawImage(this.context.canvas, 0, 0), this.targetContext_.globalAlpha = e, Rr(this.context), mu.push(this.context.canvas), this.context = this.targetContext_, this.targetContext_ = null;
    }
  }
  /**
   * Render declutter items for this layer
   * @param {import("../../Map.js").FrameState} frameState Frame state.
   */
  renderDeclutter(e) {
    !this.replayGroup_ || !this.getLayer().getDeclutter() || this.renderWorlds(this.replayGroup_, e, !0);
  }
  /**
   * Render deferred instructions.
   * @param {import("../../Map.js").FrameState} frameState Frame state.
   */
  renderDeferredInternal(e) {
    this.replayGroup_ && (this.replayGroup_.renderDeferred(), this.resetDrawContext_());
  }
  /**
   * Render the layer.
   * @param {import("../../Map.js").FrameState} frameState Frame state.
   * @param {HTMLElement|null} target Target that may be used to render content to.
   * @return {HTMLElement|null} The rendered element.
   */
  renderFrame(e, n) {
    const i = e.pixelRatio, s = e.layerStatesArray[e.layerIndex];
    this.opacity_ = s.opacity;
    const r = e.extent, o = e.viewState.resolution, a = Math.round(_e(r) / o * i), l = Math.round(Ge(r) / o * i);
    Ot(
      this.pixelTransform,
      e.size[0] / 2,
      e.size[1] / 2,
      1 / i,
      1 / i,
      0,
      -a / 2,
      -l / 2
    ), ma(this.inversePixelTransform, this.pixelTransform);
    const u = Rc(this.pixelTransform);
    this.useContainer(n, u, this.getBackground(e));
    const c = this.context, h = c.canvas, d = this.replayGroup_;
    let f = d && !d.isEmpty();
    if (!f && !(this.getLayer().hasListener(dt.PRERENDER) || this.getLayer().hasListener(dt.POSTRENDER)))
      return null;
    h.width != a || h.height != l ? (h.width = a, h.height = l, h.style.transform !== u && (h.style.transform = u)) : this.containerReused || c.clearRect(0, 0, a, l), this.setDrawContext_(), this.preRender(c, e);
    const g = e.viewState;
    g.projection;
    let m = !1;
    if (f && s.extent && this.clipping) {
      const _ = On(s.extent);
      f = qe(_, e.extent), m = f && !ui(_, e.extent), m && this.clipUnrotated(c, e, _);
    }
    return f && this.renderWorlds(
      d,
      e,
      this.getLayer().getDeclutter() ? !1 : void 0
    ), m && c.restore(), this.postRender(c, e), this.renderedRotation_ !== g.rotation && (this.renderedRotation_ = g.rotation, this.hitDetectionImageData_ = null), e.declutter || this.resetDrawContext_(), this.container;
  }
  /**
   * Asynchronous layer level hit detection.
   * @param {import("../../pixel.js").Pixel} pixel Pixel.
   * @return {Promise<Array<import("../../Feature").default>>} Promise
   * that resolves with an array of features.
   */
  getFeatures(e) {
    return new Promise((n) => {
      if (!this.hitDetectionImageData_ && !this.animatingOrInteracting_) {
        const i = [this.context.canvas.width, this.context.canvas.height];
        Pe(this.pixelTransform, i);
        const s = this.renderedCenter_, r = this.renderedResolution_, o = this.renderedRotation_, a = this.renderedProjection_, l = this.wrappedRenderedExtent_, u = this.getLayer(), c = [], h = i[0] * Rt, d = i[1] * Rt;
        c.push(
          this.getRenderTransform(
            s,
            r,
            o,
            Rt,
            h,
            d,
            0
          ).slice()
        );
        const f = u.getSource(), g = a.getExtent();
        if (f.getWrapX() && a.canWrapX() && !ui(g, l)) {
          let m = l[0];
          const _ = _e(g);
          let p = 0, y;
          for (; m < g[0]; )
            --p, y = _ * p, c.push(
              this.getRenderTransform(
                s,
                r,
                o,
                Rt,
                h,
                d,
                y
              ).slice()
            ), m += _;
          for (p = 0, m = l[2]; m > g[2]; )
            ++p, y = _ * p, c.push(
              this.getRenderTransform(
                s,
                r,
                o,
                Rt,
                h,
                d,
                y
              ).slice()
            ), m -= _;
        }
        this.hitDetectionImageData_ = Gy(
          i,
          c,
          this.renderedFeatures_,
          u.getStyleFunction(),
          l,
          r,
          o,
          xu(r, this.renderedPixelRatio_),
          null
        );
      }
      n(
        zy(e, this.renderedFeatures_, this.hitDetectionImageData_)
      );
    });
  }
  /**
   * @param {import("../../coordinate.js").Coordinate} coordinate Coordinate.
   * @param {import("../../Map.js").FrameState} frameState Frame state.
   * @param {number} hitTolerance Hit tolerance in pixels.
   * @param {import("../vector.js").FeatureCallback<T>} callback Feature callback.
   * @param {Array<import("../Map.js").HitMatch<T>>} matches The hit detected matches with tolerance.
   * @return {T|undefined} Callback result.
   * @template T
   */
  forEachFeatureAtCoordinate(e, n, i, s, r) {
    if (!this.replayGroup_)
      return;
    const o = n.viewState.resolution, a = n.viewState.rotation, l = this.getLayer(), u = {}, c = function(g, m, _) {
      const p = fe(g), y = u[p];
      if (y) {
        if (y !== !0 && _ < y.distanceSq) {
          if (_ === 0)
            return u[p] = !0, r.splice(r.lastIndexOf(y), 1), s(g, l, m);
          y.geometry = m, y.distanceSq = _;
        }
      } else {
        if (_ === 0)
          return u[p] = !0, s(g, l, m);
        r.push(
          u[p] = {
            feature: g,
            layer: l,
            geometry: m,
            distanceSq: _,
            callback: s
          }
        );
      }
    };
    let h;
    const d = [this.replayGroup_], f = this.getLayer().getDeclutter();
    return d.some((g) => h = g.forEachFeatureAtCoordinate(
      e,
      o,
      a,
      i,
      c,
      f && n.declutter[f] ? n.declutter[f].all().map((m) => m.value) : null
    )), h;
  }
  /**
   * Perform action necessary to get the layer rendered after new fonts have loaded
   */
  handleFontsChanged() {
    const e = this.getLayer();
    e.getVisible() && this.replayGroup_ && e.changed();
  }
  /**
   * Handle changes in image style state.
   * @param {import("../../events/Event.js").default} event Image style change event.
   * @private
   */
  handleStyleImageChange_(e) {
    this.renderIfReadyAndVisible();
  }
  /**
   * Determine whether render should be called.
   * @param {import("../../Map.js").FrameState} frameState Frame state.
   * @return {boolean} Layer is ready to be rendered.
   */
  prepareFrame(e) {
    const n = this.getLayer(), i = n.getSource();
    if (!i)
      return !1;
    const s = e.viewHints[Ve.ANIMATING], r = e.viewHints[Ve.INTERACTING], o = n.getUpdateWhileAnimating(), a = n.getUpdateWhileInteracting();
    if (this.ready && !o && s || !a && r)
      return this.animatingOrInteracting_ = !0, !0;
    this.animatingOrInteracting_ = !1;
    const l = e.extent, u = e.viewState, c = u.projection, h = u.resolution, d = e.pixelRatio, f = n.getRevision(), g = n.getRenderBuffer();
    let m = n.getRenderOrder();
    m === void 0 && (m = $y);
    const _ = u.center.slice(), p = oa(
      l,
      g * h
    ), y = p.slice(), C = [p.slice()], x = c.getExtent();
    if (i.getWrapX() && c.canWrapX() && !ui(x, e.extent)) {
      const k = _e(x), V = Math.max(_e(p) / 2, k);
      p[0] = x[0] - V, p[2] = x[2] + V, Cc(_, c);
      const O = xc(C[0], c);
      O[0] < x[0] && O[2] < x[2] ? C.push([
        O[0] + k,
        O[1],
        O[2] + k,
        O[3]
      ]) : O[0] > x[0] && O[2] > x[2] && C.push([
        O[0] - k,
        O[1],
        O[2] - k,
        O[3]
      ]);
    }
    if (this.ready && this.renderedResolution_ == h && this.renderedRevision_ == f && this.renderedRenderOrder_ == m && ui(this.wrappedRenderedExtent_, p))
      return In(this.renderedExtent_, y) || (this.hitDetectionImageData_ = null, this.renderedExtent_ = y), this.renderedCenter_ = _, this.replayGroupChanged = !1, !0;
    this.replayGroup_ = null;
    const E = new Ty(
      Mh(h, d),
      p,
      h,
      d
    );
    let S;
    for (let k = 0, V = C.length; k < V; ++k)
      i.loadFeatures(C[k], h, c);
    const T = xu(h, d);
    let I = !0;
    const b = (
      /**
       * @param {import("../../Feature.js").default} feature Feature.
       * @param {number} index Index.
       */
      (k, V) => {
        let O;
        const G = k.getStyleFunction() || n.getStyleFunction();
        if (G && (O = G(k, h)), O) {
          const F = this.renderFeature(
            k,
            T,
            O,
            E,
            S,
            this.getLayer().getDeclutter(),
            V
          );
          I = I && !F;
        }
      }
    ), D = ha(p), P = i.getFeaturesInExtent(D);
    m && P.sort(m);
    for (let k = 0, V = P.length; k < V; ++k)
      b(P[k], k);
    this.renderedFeatures_ = P, this.ready = I;
    const A = E.finish(), M = new Fy(
      p,
      h,
      d,
      i.getOverlaps(),
      A,
      n.getRenderBuffer(),
      !!e.declutter
    );
    return this.renderedResolution_ = h, this.renderedRevision_ = f, this.renderedRenderOrder_ = m, this.renderedExtent_ = y, this.wrappedRenderedExtent_ = p, this.renderedCenter_ = _, this.renderedProjection_ = c, this.renderedPixelRatio_ = d, this.replayGroup_ = M, this.hitDetectionImageData_ = null, this.replayGroupChanged = !0, !0;
  }
  /**
   * @param {import("../../Feature.js").default} feature Feature.
   * @param {number} squaredTolerance Squared render tolerance.
   * @param {import("../../style/Style.js").default|Array<import("../../style/Style.js").default>} styles The style or array of styles.
   * @param {import("../../render/canvas/BuilderGroup.js").default} builderGroup Builder group.
   * @param {import("../../proj.js").TransformFunction} [transform] Transform from user to view projection.
   * @param {boolean} [declutter] Enable decluttering.
   * @param {number} [index] Render order index.
   * @return {boolean} `true` if an image is loading.
   */
  renderFeature(e, n, i, s, r, o, a) {
    if (!i)
      return !1;
    let l = !1;
    if (Array.isArray(i))
      for (let u = 0, c = i.length; u < c; ++u)
        l = Cu(
          s,
          e,
          i[u],
          n,
          this.boundHandleStyleImageChange_,
          r,
          o,
          a
        ) || l;
    else
      l = Cu(
        s,
        e,
        i,
        n,
        this.boundHandleStyleImageChange_,
        r,
        o,
        a
      );
    return l;
  }
}
const Qy = Jy;
class e0 extends uh {
  /**
   * @param {import("./BaseVector.js").Options<VectorSourceType>} [options] Options.
   */
  constructor(e) {
    super(e);
  }
  createRenderer() {
    return new Qy(this);
  }
}
const t0 = e0;
class n0 {
  /**
   * @param {number} [maxEntries] Max entries.
   */
  constructor(e) {
    this.rbush_ = new zc(e), this.items_ = {};
  }
  /**
   * Insert a value into the RBush.
   * @param {import("../extent.js").Extent} extent Extent.
   * @param {T} value Value.
   */
  insert(e, n) {
    const i = {
      minX: e[0],
      minY: e[1],
      maxX: e[2],
      maxY: e[3],
      value: n
    };
    this.rbush_.insert(i), this.items_[fe(n)] = i;
  }
  /**
   * Bulk-insert values into the RBush.
   * @param {Array<import("../extent.js").Extent>} extents Extents.
   * @param {Array<T>} values Values.
   */
  load(e, n) {
    const i = new Array(n.length);
    for (let s = 0, r = n.length; s < r; s++) {
      const o = e[s], a = n[s], l = {
        minX: o[0],
        minY: o[1],
        maxX: o[2],
        maxY: o[3],
        value: a
      };
      i[s] = l, this.items_[fe(a)] = l;
    }
    this.rbush_.load(i);
  }
  /**
   * Remove a value from the RBush.
   * @param {T} value Value.
   * @return {boolean} Removed.
   */
  remove(e) {
    const n = fe(e), i = this.items_[n];
    return delete this.items_[n], this.rbush_.remove(i) !== null;
  }
  /**
   * Update the extent of a value in the RBush.
   * @param {import("../extent.js").Extent} extent Extent.
   * @param {T} value Value.
   */
  update(e, n) {
    const i = this.items_[fe(n)], s = [i.minX, i.minY, i.maxX, i.maxY];
    is(s, e) || (this.remove(n), this.insert(e, n));
  }
  /**
   * Return all values in the RBush.
   * @return {Array<T>} All.
   */
  getAll() {
    return this.rbush_.all().map(function(n) {
      return n.value;
    });
  }
  /**
   * Return all values in the given extent.
   * @param {import("../extent.js").Extent} extent Extent.
   * @return {Array<T>} All in extent.
   */
  getInExtent(e) {
    const n = {
      minX: e[0],
      minY: e[1],
      maxX: e[2],
      maxY: e[3]
    };
    return this.rbush_.search(n).map(function(s) {
      return s.value;
    });
  }
  /**
   * Calls a callback function with each value in the tree.
   * If the callback returns a truthy value, this value is returned without
   * checking the rest of the tree.
   * @param {function(T): *} callback Callback.
   * @return {*} Callback return value.
   */
  forEach(e) {
    return this.forEach_(this.getAll(), e);
  }
  /**
   * Calls a callback function with each value in the provided extent.
   * @param {import("../extent.js").Extent} extent Extent.
   * @param {function(T): *} callback Callback.
   * @return {*} Callback return value.
   */
  forEachInExtent(e, n) {
    return this.forEach_(this.getInExtent(e), n);
  }
  /**
   * @param {Array<T>} values Values.
   * @param {function(T): *} callback Callback.
   * @private
   * @return {*} Callback return value.
   */
  forEach_(e, n) {
    let i;
    for (let s = 0, r = e.length; s < r; s++)
      if (i = n(e[s]), i)
        return i;
    return i;
  }
  /**
   * @return {boolean} Is empty.
   */
  isEmpty() {
    return xi(this.items_);
  }
  /**
   * Remove all values from the RBush.
   */
  clear() {
    this.rbush_.clear(), this.items_ = {};
  }
  /**
   * @param {import("../extent.js").Extent} [extent] Extent.
   * @return {import("../extent.js").Extent} Extent.
   */
  getExtent(e) {
    const n = this.rbush_.toJSON();
    return pn(n.minX, n.minY, n.maxX, n.maxY, e);
  }
  /**
   * @param {RBush} rbush R-Tree.
   */
  concat(e) {
    this.rbush_.load(e.rbush_.all());
    for (const n in e.items_)
      this.items_[n] = e.items_[n];
  }
}
const Eu = n0;
function wu(t, e, n, i, s, r, o) {
  let a, l;
  const u = (n - e) / i;
  if (u === 1)
    a = e;
  else if (u === 2)
    a = e, l = s;
  else if (u !== 0) {
    let c = t[e], h = t[e + 1], d = 0;
    const f = [0];
    for (let _ = e + i; _ < n; _ += i) {
      const p = t[_], y = t[_ + 1];
      d += Math.sqrt((p - c) * (p - c) + (y - h) * (y - h)), f.push(d), c = p, h = y;
    }
    const g = s * d, m = pf(f, g);
    m < 0 ? (l = (g - f[-m - 2]) / (f[-m - 1] - f[-m - 2]), a = e + (-m - 2) * i) : a = e + m * i;
  }
  o = o > 1 ? o : 2, r = r || new Array(o);
  for (let c = 0; c < o; ++c)
    r[c] = a === void 0 ? NaN : l === void 0 ? t[a + c] : ht(t[a + c], t[a + i + c], l);
  return r;
}
function i0(t, e, n, i) {
  const s = [];
  let r = ft();
  for (let o = 0, a = n.length; o < a; ++o) {
    const l = n[o];
    r = aa(
      t,
      e,
      l[0],
      i
    ), s.push((r[0] + r[2]) / 2, (r[1] + r[3]) / 2), e = l[l.length - 1];
  }
  return s;
}
const Su = Ct();
class Si {
  /**
   * @param {Type} type Geometry type.
   * @param {Array<number>} flatCoordinates Flat coordinates. These always need
   *     to be right-handed for polygons.
   * @param {Array<number>} ends Ends.
   * @param {number} stride Stride.
   * @param {Object<string, *>} properties Properties.
   * @param {number|string|undefined} id Feature id.
   */
  constructor(e, n, i, s, r, o) {
    this.styleFunction, this.extent_, this.id_ = o, this.type_ = e, this.flatCoordinates_ = n, this.flatInteriorPoints_ = null, this.flatMidpoints_ = null, this.ends_ = i || null, this.properties_ = r, this.squaredTolerance_, this.stride_ = s, this.simplifiedGeometry_;
  }
  /**
   * Get a feature property by its key.
   * @param {string} key Key
   * @return {*} Value for the requested key.
   * @api
   */
  get(e) {
    return this.properties_[e];
  }
  /**
   * Get the extent of this feature's geometry.
   * @return {import("../extent.js").Extent} Extent.
   * @api
   */
  getExtent() {
    return this.extent_ || (this.extent_ = this.type_ === "Point" ? vc(this.flatCoordinates_) : aa(
      this.flatCoordinates_,
      0,
      this.flatCoordinates_.length,
      2
    )), this.extent_;
  }
  /**
   * @return {Array<number>} Flat interior points.
   */
  getFlatInteriorPoint() {
    if (!this.flatInteriorPoints_) {
      const e = Bn(this.getExtent());
      this.flatInteriorPoints_ = pa(
        this.flatCoordinates_,
        0,
        this.ends_,
        2,
        e,
        0
      );
    }
    return this.flatInteriorPoints_;
  }
  /**
   * @return {Array<number>} Flat interior points.
   */
  getFlatInteriorPoints() {
    if (!this.flatInteriorPoints_) {
      const e = Og(this.flatCoordinates_, this.ends_), n = i0(this.flatCoordinates_, 0, e, 2);
      this.flatInteriorPoints_ = Lg(
        this.flatCoordinates_,
        0,
        e,
        2,
        n
      );
    }
    return this.flatInteriorPoints_;
  }
  /**
   * @return {Array<number>} Flat midpoint.
   */
  getFlatMidpoint() {
    return this.flatMidpoints_ || (this.flatMidpoints_ = wu(
      this.flatCoordinates_,
      0,
      this.flatCoordinates_.length,
      2,
      0.5
    )), this.flatMidpoints_;
  }
  /**
   * @return {Array<number>} Flat midpoints.
   */
  getFlatMidpoints() {
    if (!this.flatMidpoints_) {
      this.flatMidpoints_ = [];
      const e = this.flatCoordinates_;
      let n = 0;
      const i = (
        /** @type {Array<number>} */
        this.ends_
      );
      for (let s = 0, r = i.length; s < r; ++s) {
        const o = i[s], a = wu(e, n, o, 2, 0.5);
        ia(this.flatMidpoints_, a), n = o;
      }
    }
    return this.flatMidpoints_;
  }
  /**
   * Get the feature identifier.  This is a stable identifier for the feature and
   * is set when reading data from a remote source.
   * @return {number|string|undefined} Id.
   * @api
   */
  getId() {
    return this.id_;
  }
  /**
   * @return {Array<number>} Flat coordinates.
   */
  getOrientedFlatCoordinates() {
    return this.flatCoordinates_;
  }
  /**
   * For API compatibility with {@link module:ol/Feature~Feature}, this method is useful when
   * determining the geometry type in style function (see {@link #getType}).
   * @return {RenderFeature} Feature.
   * @api
   */
  getGeometry() {
    return this;
  }
  /**
   * @param {number} squaredTolerance Squared tolerance.
   * @return {RenderFeature} Simplified geometry.
   */
  getSimplifiedGeometry(e) {
    return this;
  }
  /**
   * Get a transformed and simplified version of the geometry.
   * @param {number} squaredTolerance Squared tolerance.
   * @param {import("../proj.js").TransformFunction} [transform] Optional transform function.
   * @return {RenderFeature} Simplified geometry.
   */
  simplifyTransformed(e, n) {
    return this;
  }
  /**
   * Get the feature properties.
   * @return {Object<string, *>} Feature properties.
   * @api
   */
  getProperties() {
    return this.properties_;
  }
  /**
   * Get an object of all property names and values.  This has the same behavior as getProperties,
   * but is here to conform with the {@link module:ol/Feature~Feature} interface.
   * @return {Object<string, *>?} Object.
   */
  getPropertiesInternal() {
    return this.properties_;
  }
  /**
   * @return {number} Stride.
   */
  getStride() {
    return this.stride_;
  }
  /**
   * @return {import('../style/Style.js').StyleFunction|undefined} Style
   */
  getStyleFunction() {
    return this.styleFunction;
  }
  /**
   * Get the type of this feature's geometry.
   * @return {Type} Geometry type.
   * @api
   */
  getType() {
    return this.type_;
  }
  /**
   * Transform geometry coordinates from tile pixel space to projected.
   *
   * @param {import("../proj.js").ProjectionLike} projection The data projection
   */
  transform(e) {
    e = gt(e);
    const n = e.getExtent(), i = e.getWorldExtent();
    if (n && i) {
      const s = Ge(i) / Ge(n);
      Ot(
        Su,
        i[0],
        i[3],
        s,
        -s,
        0,
        0,
        0
      ), yn(
        this.flatCoordinates_,
        0,
        this.flatCoordinates_.length,
        2,
        Su,
        this.flatCoordinates_
      );
    }
  }
  /**
   * Apply a transform function to the coordinates of the geometry.
   * The geometry is modified in place.
   * If you do not want the geometry modified in place, first `clone()` it and
   * then use this function on the clone.
   * @param {import("../proj.js").TransformFunction} transformFn Transform function.
   */
  applyTransform(e) {
    e(this.flatCoordinates_, this.flatCoordinates_, this.stride_);
  }
  /**
   * @return {RenderFeature} A cloned render feature.
   */
  clone() {
    var e;
    return new Si(
      this.type_,
      this.flatCoordinates_.slice(),
      (e = this.ends_) == null ? void 0 : e.slice(),
      this.stride_,
      Object.assign({}, this.properties_),
      this.id_
    );
  }
  /**
   * @return {Array<number>|null} Ends.
   */
  getEnds() {
    return this.ends_;
  }
  /**
   * Add transform and resolution based geometry simplification to this instance.
   * @return {RenderFeature} This render feature.
   */
  enableSimplifyTransformed() {
    return this.simplifyTransformed = cc((e, n) => {
      if (e === this.squaredTolerance_)
        return this.simplifiedGeometry_;
      this.simplifiedGeometry_ = this.clone(), n && this.simplifiedGeometry_.applyTransform(n);
      const i = this.simplifiedGeometry_.getFlatCoordinates();
      let s;
      switch (this.type_) {
        case "LineString":
          i.length = va(
            i,
            0,
            this.simplifiedGeometry_.flatCoordinates_.length,
            this.simplifiedGeometry_.stride_,
            e,
            i,
            0
          ), s = [i.length];
          break;
        case "MultiLineString":
          s = [], i.length = bg(
            i,
            0,
            this.simplifiedGeometry_.ends_,
            this.simplifiedGeometry_.stride_,
            e,
            i,
            0,
            s
          );
          break;
        case "Polygon":
          s = [], i.length = kc(
            i,
            0,
            this.simplifiedGeometry_.ends_,
            this.simplifiedGeometry_.stride_,
            Math.sqrt(e),
            i,
            0,
            s
          );
          break;
      }
      return s && (this.simplifiedGeometry_ = new Si(
        this.type_,
        i,
        s,
        2,
        this.properties_,
        this.id_
      )), this.squaredTolerance_ = e, this.simplifiedGeometry_;
    }), this;
  }
}
Si.prototype.getFlatCoordinates = Si.prototype.getOrientedFlatCoordinates;
const Mn = Si, ct = {
  /**
   * Triggered when a feature is added to the source.
   * @event module:ol/source/Vector.VectorSourceEvent#addfeature
   * @api
   */
  ADDFEATURE: "addfeature",
  /**
   * Triggered when a feature is updated.
   * @event module:ol/source/Vector.VectorSourceEvent#changefeature
   * @api
   */
  CHANGEFEATURE: "changefeature",
  /**
   * Triggered when the clear method is called on the source.
   * @event module:ol/source/Vector.VectorSourceEvent#clear
   * @api
   */
  CLEAR: "clear",
  /**
   * Triggered when a feature is removed from the source.
   * See {@link module:ol/source/Vector~VectorSource#clear source.clear()} for exceptions.
   * @event module:ol/source/Vector.VectorSourceEvent#removefeature
   * @api
   */
  REMOVEFEATURE: "removefeature",
  /**
   * Triggered when features starts loading.
   * @event module:ol/source/Vector.VectorSourceEvent#featuresloadstart
   * @api
   */
  FEATURESLOADSTART: "featuresloadstart",
  /**
   * Triggered when features finishes loading.
   * @event module:ol/source/Vector.VectorSourceEvent#featuresloadend
   * @api
   */
  FEATURESLOADEND: "featuresloadend",
  /**
   * Triggered if feature loading results in an error.
   * @event module:ol/source/Vector.VectorSourceEvent#featuresloaderror
   * @api
   */
  FEATURESLOADERROR: "featuresloaderror"
};
function s0(t, e) {
  return [[-1 / 0, -1 / 0, 1 / 0, 1 / 0]];
}
let r0 = !1;
function o0(t, e, n, i, s, r, o) {
  const a = new XMLHttpRequest();
  a.open(
    "GET",
    typeof t == "function" ? t(n, i, s) : t,
    !0
  ), e.getType() == "arraybuffer" && (a.responseType = "arraybuffer"), a.withCredentials = r0, a.onload = function(l) {
    if (!a.status || a.status >= 200 && a.status < 300) {
      const u = e.getType();
      let c;
      u == "json" ? c = JSON.parse(a.responseText) : u == "text" ? c = a.responseText : u == "xml" ? (c = a.responseXML, c || (c = new DOMParser().parseFromString(
        a.responseText,
        "application/xml"
      ))) : u == "arraybuffer" && (c = /** @type {ArrayBuffer} */
      a.response), c ? r(
        /** @type {Array<import("./Feature.js").default>} */
        e.readFeatures(c, {
          extent: n,
          featureProjection: s
        }),
        e.readProjection(c)
      ) : o();
    } else
      o();
  }, a.onerror = o, a.send();
}
function bu(t, e) {
  return function(n, i, s, r, o) {
    const a = (
      /** @type {import("./source/Vector").default} */
      this
    );
    o0(
      t,
      e,
      n,
      i,
      s,
      /**
       * @param {Array<import("./Feature.js").default>} features The loaded features.
       * @param {import("./proj/Projection.js").default} dataProjection Data
       * projection.
       */
      function(l, u) {
        a.addFeatures(l), r !== void 0 && r(l);
      },
      /* FIXME handle error */
      o || pi
    );
  };
}
class hn extends sn {
  /**
   * @param {string} type Type.
   * @param {FeatureClass} [feature] Feature.
   * @param {Array<FeatureClass>} [features] Features.
   */
  constructor(e, n, i) {
    super(e), this.feature = n, this.features = i;
  }
}
class a0 extends Ch {
  /**
   * @param {Options<FeatureType>} [options] Vector source options.
   */
  constructor(e) {
    e = e || {}, super({
      attributions: e.attributions,
      interpolate: !0,
      projection: void 0,
      state: "ready",
      wrapX: e.wrapX !== void 0 ? e.wrapX : !0
    }), this.on, this.once, this.un, this.loader_ = pi, this.format_ = e.format, this.overlaps_ = e.overlaps === void 0 ? !0 : e.overlaps, this.url_ = e.url, e.loader !== void 0 ? this.loader_ = e.loader : this.url_ !== void 0 && (ue(this.format_, "`format` must be set when `url` is set"), this.loader_ = bu(
      this.url_,
      /** @type {import("../format/Feature.js").default} */
      this.format_
    )), this.strategy_ = e.strategy !== void 0 ? e.strategy : s0;
    const n = e.useSpatialIndex !== void 0 ? e.useSpatialIndex : !0;
    this.featuresRtree_ = n ? new Eu() : null, this.loadedExtentsRtree_ = new Eu(), this.loadingExtentsCount_ = 0, this.nullGeometryFeatures_ = {}, this.idIndex_ = {}, this.uidIndex_ = {}, this.featureChangeKeys_ = {}, this.featuresCollection_ = null;
    let i, s;
    Array.isArray(e.features) ? s = e.features : e.features && (i = e.features, s = i.getArray()), !n && i === void 0 && (i = new Lt(s)), s !== void 0 && this.addFeaturesInternal(s), i !== void 0 && this.bindFeaturesCollection_(i);
  }
  /**
   * Add a single feature to the source.  If you want to add a batch of features
   * at once, call {@link module:ol/source/Vector~VectorSource#addFeatures #addFeatures()}
   * instead. A feature will not be added to the source if feature with
   * the same id is already there. The reason for this behavior is to avoid
   * feature duplication when using bbox or tile loading strategies.
   * Note: this also applies if an {@link module:ol/Collection~Collection} is used for features,
   * meaning that if a feature with a duplicate id is added in the collection, it will
   * be removed from it right away.
   * @param {FeatureType} feature Feature to add.
   * @api
   */
  addFeature(e) {
    this.addFeatureInternal(e), this.changed();
  }
  /**
   * Add a feature without firing a `change` event.
   * @param {FeatureType} feature Feature.
   * @protected
   */
  addFeatureInternal(e) {
    const n = fe(e);
    if (!this.addToIndex_(n, e)) {
      this.featuresCollection_ && this.featuresCollection_.remove(e);
      return;
    }
    this.setupChangeEvents_(n, e);
    const i = e.getGeometry();
    if (i) {
      const s = i.getExtent();
      this.featuresRtree_ && this.featuresRtree_.insert(s, e);
    } else
      this.nullGeometryFeatures_[n] = e;
    this.dispatchEvent(
      new hn(ct.ADDFEATURE, e)
    );
  }
  /**
   * @param {string} featureKey Unique identifier for the feature.
   * @param {FeatureType} feature The feature.
   * @private
   */
  setupChangeEvents_(e, n) {
    n instanceof Mn || (this.featureChangeKeys_[e] = [
      he(n, H.CHANGE, this.handleFeatureChange_, this),
      he(
        n,
        yi.PROPERTYCHANGE,
        this.handleFeatureChange_,
        this
      )
    ]);
  }
  /**
   * @param {string} featureKey Unique identifier for the feature.
   * @param {FeatureType} feature The feature.
   * @return {boolean} The feature is "valid", in the sense that it is also a
   *     candidate for insertion into the Rtree.
   * @private
   */
  addToIndex_(e, n) {
    let i = !0;
    if (n.getId() !== void 0) {
      const s = String(n.getId());
      if (!(s in this.idIndex_))
        this.idIndex_[s] = n;
      else if (n instanceof Mn) {
        const r = this.idIndex_[s];
        r instanceof Mn ? Array.isArray(r) ? r.push(n) : this.idIndex_[s] = [r, n] : i = !1;
      } else
        i = !1;
    }
    return i && (ue(
      !(e in this.uidIndex_),
      "The passed `feature` was already added to the source"
    ), this.uidIndex_[e] = n), i;
  }
  /**
   * Add a batch of features to the source.
   * @param {Array<FeatureType>} features Features to add.
   * @api
   */
  addFeatures(e) {
    this.addFeaturesInternal(e), this.changed();
  }
  /**
   * Add features without firing a `change` event.
   * @param {Array<FeatureType>} features Features.
   * @protected
   */
  addFeaturesInternal(e) {
    const n = [], i = [], s = [];
    for (let r = 0, o = e.length; r < o; r++) {
      const a = e[r], l = fe(a);
      this.addToIndex_(l, a) && i.push(a);
    }
    for (let r = 0, o = i.length; r < o; r++) {
      const a = i[r], l = fe(a);
      this.setupChangeEvents_(l, a);
      const u = a.getGeometry();
      if (u) {
        const c = u.getExtent();
        n.push(c), s.push(a);
      } else
        this.nullGeometryFeatures_[l] = a;
    }
    if (this.featuresRtree_ && this.featuresRtree_.load(n, s), this.hasListener(ct.ADDFEATURE))
      for (let r = 0, o = i.length; r < o; r++)
        this.dispatchEvent(
          new hn(ct.ADDFEATURE, i[r])
        );
  }
  /**
   * @param {!Collection<FeatureType>} collection Collection.
   * @private
   */
  bindFeaturesCollection_(e) {
    let n = !1;
    this.addEventListener(
      ct.ADDFEATURE,
      /**
       * @param {VectorSourceEvent<FeatureType>} evt The vector source event
       */
      function(i) {
        n || (n = !0, e.push(i.feature), n = !1);
      }
    ), this.addEventListener(
      ct.REMOVEFEATURE,
      /**
       * @param {VectorSourceEvent<FeatureType>} evt The vector source event
       */
      function(i) {
        n || (n = !0, e.remove(i.feature), n = !1);
      }
    ), e.addEventListener(
      Ke.ADD,
      /**
       * @param {import("../Collection.js").CollectionEvent<FeatureType>} evt The collection event
       */
      (i) => {
        n || (n = !0, this.addFeature(i.element), n = !1);
      }
    ), e.addEventListener(
      Ke.REMOVE,
      /**
       * @param {import("../Collection.js").CollectionEvent<FeatureType>} evt The collection event
       */
      (i) => {
        n || (n = !0, this.removeFeature(i.element), n = !1);
      }
    ), this.featuresCollection_ = e;
  }
  /**
   * Remove all features from the source.
   * @param {boolean} [fast] Skip dispatching of {@link module:ol/source/Vector.VectorSourceEvent#event:removefeature} events.
   * @api
   */
  clear(e) {
    if (e) {
      for (const i in this.featureChangeKeys_)
        this.featureChangeKeys_[i].forEach(Ce);
      this.featuresCollection_ || (this.featureChangeKeys_ = {}, this.idIndex_ = {}, this.uidIndex_ = {});
    } else if (this.featuresRtree_) {
      const i = (s) => {
        this.removeFeatureInternal(s);
      };
      this.featuresRtree_.forEach(i);
      for (const s in this.nullGeometryFeatures_)
        this.removeFeatureInternal(this.nullGeometryFeatures_[s]);
    }
    this.featuresCollection_ && this.featuresCollection_.clear(), this.featuresRtree_ && this.featuresRtree_.clear(), this.nullGeometryFeatures_ = {};
    const n = new hn(ct.CLEAR);
    this.dispatchEvent(n), this.changed();
  }
  /**
   * Iterate through all features on the source, calling the provided callback
   * with each one.  If the callback returns any "truthy" value, iteration will
   * stop and the function will return the same value.
   * Note: this function only iterate through the feature that have a defined geometry.
   *
   * @param {function(FeatureType): T} callback Called with each feature
   *     on the source.  Return a truthy value to stop iteration.
   * @return {T|undefined} The return value from the last call to the callback.
   * @template T
   * @api
   */
  forEachFeature(e) {
    if (this.featuresRtree_)
      return this.featuresRtree_.forEach(e);
    this.featuresCollection_ && this.featuresCollection_.forEach(e);
  }
  /**
   * Iterate through all features whose geometries contain the provided
   * coordinate, calling the callback with each feature.  If the callback returns
   * a "truthy" value, iteration will stop and the function will return the same
   * value.
   *
   * For {@link module:ol/render/Feature~RenderFeature} features, the callback will be
   * called for all features.
   *
   * @param {import("../coordinate.js").Coordinate} coordinate Coordinate.
   * @param {function(FeatureType): T} callback Called with each feature
   *     whose goemetry contains the provided coordinate.
   * @return {T|undefined} The return value from the last call to the callback.
   * @template T
   */
  forEachFeatureAtCoordinateDirect(e, n) {
    const i = [e[0], e[1], e[0], e[1]];
    return this.forEachFeatureInExtent(i, function(s) {
      const r = s.getGeometry();
      if (r instanceof Mn || r.intersectsCoordinate(e))
        return n(s);
    });
  }
  /**
   * Iterate through all features whose bounding box intersects the provided
   * extent (note that the feature's geometry may not intersect the extent),
   * calling the callback with each feature.  If the callback returns a "truthy"
   * value, iteration will stop and the function will return the same value.
   *
   * If you are interested in features whose geometry intersects an extent, call
   * the {@link module:ol/source/Vector~VectorSource#forEachFeatureIntersectingExtent #forEachFeatureIntersectingExtent()} method instead.
   *
   * When `useSpatialIndex` is set to false, this method will loop through all
   * features, equivalent to {@link module:ol/source/Vector~VectorSource#forEachFeature #forEachFeature()}.
   *
   * @param {import("../extent.js").Extent} extent Extent.
   * @param {function(FeatureType): T} callback Called with each feature
   *     whose bounding box intersects the provided extent.
   * @return {T|undefined} The return value from the last call to the callback.
   * @template T
   * @api
   */
  forEachFeatureInExtent(e, n) {
    if (this.featuresRtree_)
      return this.featuresRtree_.forEachInExtent(e, n);
    this.featuresCollection_ && this.featuresCollection_.forEach(n);
  }
  /**
   * Iterate through all features whose geometry intersects the provided extent,
   * calling the callback with each feature.  If the callback returns a "truthy"
   * value, iteration will stop and the function will return the same value.
   *
   * If you only want to test for bounding box intersection, call the
   * {@link module:ol/source/Vector~VectorSource#forEachFeatureInExtent #forEachFeatureInExtent()} method instead.
   *
   * @param {import("../extent.js").Extent} extent Extent.
   * @param {function(FeatureType): T} callback Called with each feature
   *     whose geometry intersects the provided extent.
   * @return {T|undefined} The return value from the last call to the callback.
   * @template T
   * @api
   */
  forEachFeatureIntersectingExtent(e, n) {
    return this.forEachFeatureInExtent(
      e,
      /**
       * @param {FeatureType} feature Feature.
       * @return {T|undefined} The return value from the last call to the callback.
       */
      function(i) {
        const s = i.getGeometry();
        if (s instanceof Mn || s.intersectsExtent(e)) {
          const r = n(i);
          if (r)
            return r;
        }
      }
    );
  }
  /**
   * Get the features collection associated with this source. Will be `null`
   * unless the source was configured with `useSpatialIndex` set to `false`, or
   * with an {@link module:ol/Collection~Collection} as `features`.
   * @return {Collection<FeatureType>|null} The collection of features.
   * @api
   */
  getFeaturesCollection() {
    return this.featuresCollection_;
  }
  /**
   * Get a snapshot of the features currently on the source in random order. The returned array
   * is a copy, the features are references to the features in the source.
   * @return {Array<FeatureType>} Features.
   * @api
   */
  getFeatures() {
    let e;
    return this.featuresCollection_ ? e = this.featuresCollection_.getArray().slice(0) : this.featuresRtree_ && (e = this.featuresRtree_.getAll(), xi(this.nullGeometryFeatures_) || ia(e, Object.values(this.nullGeometryFeatures_))), e;
  }
  /**
   * Get all features whose geometry intersects the provided coordinate.
   * @param {import("../coordinate.js").Coordinate} coordinate Coordinate.
   * @return {Array<import("../Feature.js").default>} Features.
   * @api
   */
  getFeaturesAtCoordinate(e) {
    const n = [];
    return this.forEachFeatureAtCoordinateDirect(e, function(i) {
      n.push(i);
    }), n;
  }
  /**
   * Get all features whose bounding box intersects the provided extent.  Note that this returns an array of
   * all features intersecting the given extent in random order (so it may include
   * features whose geometries do not intersect the extent).
   *
   * When `useSpatialIndex` is set to false, this method will return all
   * features.
   *
   * @param {import("../extent.js").Extent} extent Extent.
   * @param {import("../proj/Projection.js").default} [projection] Include features
   * where `extent` exceeds the x-axis bounds of `projection` and wraps around the world.
   * @return {Array<FeatureType>} Features.
   * @api
   */
  getFeaturesInExtent(e, n) {
    if (this.featuresRtree_) {
      if (!(n && n.canWrapX() && this.getWrapX()))
        return this.featuresRtree_.getInExtent(e);
      const s = Uf(e, n);
      return [].concat(
        ...s.map((r) => this.featuresRtree_.getInExtent(r))
      );
    }
    return this.featuresCollection_ ? this.featuresCollection_.getArray().slice(0) : [];
  }
  /**
   * Get the closest feature to the provided coordinate.
   *
   * This method is not available when the source is configured with
   * `useSpatialIndex` set to `false` and the features in this source are of type
   * {@link module:ol/Feature~Feature}.
   * @param {import("../coordinate.js").Coordinate} coordinate Coordinate.
   * @param {function(FeatureType):boolean} [filter] Feature filter function.
   *     The filter function will receive one argument, the {@link module:ol/Feature~Feature feature}
   *     and it should return a boolean value. By default, no filtering is made.
   * @return {FeatureType} Closest feature.
   * @api
   */
  getClosestFeatureToCoordinate(e, n) {
    const i = e[0], s = e[1];
    let r = null;
    const o = [NaN, NaN];
    let a = 1 / 0;
    const l = [-1 / 0, -1 / 0, 1 / 0, 1 / 0];
    return n = n || ts, this.featuresRtree_.forEachInExtent(
      l,
      /**
       * @param {FeatureType} feature Feature.
       */
      function(u) {
        if (n(u)) {
          const c = u.getGeometry(), h = a;
          if (a = c instanceof Mn ? 0 : c.closestPointXY(i, s, o, a), a < h) {
            r = u;
            const d = Math.sqrt(a);
            l[0] = i - d, l[1] = s - d, l[2] = i + d, l[3] = s + d;
          }
        }
      }
    ), r;
  }
  /**
   * Get the extent of the features currently in the source.
   *
   * This method is not available when the source is configured with
   * `useSpatialIndex` set to `false`.
   * @param {import("../extent.js").Extent} [extent] Destination extent. If provided, no new extent
   *     will be created. Instead, that extent's coordinates will be overwritten.
   * @return {import("../extent.js").Extent} Extent.
   * @api
   */
  getExtent(e) {
    return this.featuresRtree_.getExtent(e);
  }
  /**
   * Get a feature by its identifier (the value returned by feature.getId()). When `RenderFeature`s
   * are used, `getFeatureById()` can return an array of `RenderFeature`s. This allows for handling
   * of `GeometryCollection` geometries, where format readers create one `RenderFeature` per
   * `GeometryCollection` member.
   * Note that the index treats string and numeric identifiers as the same.  So
   * `source.getFeatureById(2)` will return a feature with id `'2'` or `2`.
   *
   * @param {string|number} id Feature identifier.
   * @return {FeatureClassOrArrayOfRenderFeatures<FeatureType>|null} The feature (or `null` if not found).
   * @api
   */
  getFeatureById(e) {
    const n = this.idIndex_[e.toString()];
    return n !== void 0 ? (
      /** @type {FeatureClassOrArrayOfRenderFeatures<FeatureType>} */
      n
    ) : null;
  }
  /**
   * Get a feature by its internal unique identifier (using `getUid`).
   *
   * @param {string} uid Feature identifier.
   * @return {FeatureType|null} The feature (or `null` if not found).
   */
  getFeatureByUid(e) {
    const n = this.uidIndex_[e];
    return n !== void 0 ? n : null;
  }
  /**
   * Get the format associated with this source.
   *
   * @return {import("../format/Feature.js").default<import('../format/Feature.js').FeatureToFeatureClass<FeatureType>>|undefined} The feature format.
   * @api
   */
  getFormat() {
    return this.format_;
  }
  /**
   * @return {boolean} The source can have overlapping geometries.
   */
  getOverlaps() {
    return this.overlaps_;
  }
  /**
   * Get the url associated with this source.
   *
   * @return {string|import("../featureloader.js").FeatureUrlFunction|undefined} The url.
   * @api
   */
  getUrl() {
    return this.url_;
  }
  /**
   * @param {Event} event Event.
   * @private
   */
  handleFeatureChange_(e) {
    const n = (
      /** @type {FeatureType} */
      e.target
    ), i = fe(n), s = n.getGeometry();
    if (!s)
      i in this.nullGeometryFeatures_ || (this.featuresRtree_ && this.featuresRtree_.remove(n), this.nullGeometryFeatures_[i] = n);
    else {
      const o = s.getExtent();
      i in this.nullGeometryFeatures_ ? (delete this.nullGeometryFeatures_[i], this.featuresRtree_ && this.featuresRtree_.insert(o, n)) : this.featuresRtree_ && this.featuresRtree_.update(o, n);
    }
    const r = n.getId();
    if (r !== void 0) {
      const o = r.toString();
      this.idIndex_[o] !== n && (this.removeFromIdIndex_(n), this.idIndex_[o] = n);
    } else
      this.removeFromIdIndex_(n), this.uidIndex_[i] = n;
    this.changed(), this.dispatchEvent(
      new hn(ct.CHANGEFEATURE, n)
    );
  }
  /**
   * Returns true if the feature is contained within the source.
   * @param {FeatureType} feature Feature.
   * @return {boolean} Has feature.
   * @api
   */
  hasFeature(e) {
    const n = e.getId();
    return n !== void 0 ? n in this.idIndex_ : fe(e) in this.uidIndex_;
  }
  /**
   * @return {boolean} Is empty.
   */
  isEmpty() {
    return this.featuresRtree_ ? this.featuresRtree_.isEmpty() && xi(this.nullGeometryFeatures_) : this.featuresCollection_ ? this.featuresCollection_.getLength() === 0 : !0;
  }
  /**
   * @param {import("../extent.js").Extent} extent Extent.
   * @param {number} resolution Resolution.
   * @param {import("../proj/Projection.js").default} projection Projection.
   */
  loadFeatures(e, n, i) {
    const s = this.loadedExtentsRtree_, r = this.strategy_(e, n, i);
    for (let o = 0, a = r.length; o < a; ++o) {
      const l = r[o];
      s.forEachInExtent(
        l,
        /**
         * @param {{extent: import("../extent.js").Extent}} object Object.
         * @return {boolean} Contains.
         */
        function(c) {
          return ui(c.extent, l);
        }
      ) || (++this.loadingExtentsCount_, this.dispatchEvent(
        new hn(ct.FEATURESLOADSTART)
      ), this.loader_.call(
        this,
        l,
        n,
        i,
        (c) => {
          --this.loadingExtentsCount_, this.dispatchEvent(
            new hn(
              ct.FEATURESLOADEND,
              void 0,
              c
            )
          );
        },
        () => {
          --this.loadingExtentsCount_, this.dispatchEvent(
            new hn(ct.FEATURESLOADERROR)
          );
        }
      ), s.insert(l, { extent: l.slice() }));
    }
    this.loading = this.loader_.length < 4 ? !1 : this.loadingExtentsCount_ > 0;
  }
  refresh() {
    this.clear(!0), this.loadedExtentsRtree_.clear(), super.refresh();
  }
  /**
   * Remove an extent from the list of loaded extents.
   * @param {import("../extent.js").Extent} extent Extent.
   * @api
   */
  removeLoadedExtent(e) {
    const n = this.loadedExtentsRtree_;
    let i;
    n.forEachInExtent(e, function(s) {
      if (is(s.extent, e))
        return i = s, !0;
    }), i && n.remove(i);
  }
  /**
   * Batch remove features from the source.  If you want to remove all features
   * at once, use the {@link module:ol/source/Vector~VectorSource#clear #clear()} method
   * instead.
   * @param {Array<FeatureType>} features Features to remove.
   */
  removeFeatures(e) {
    const n = [];
    for (let i = 0, s = e.length; i < s; ++i) {
      const r = e[i], o = this.removeFeatureInternal(r);
      o && n.push(o);
    }
    n.length > 0 && this.changed();
  }
  /**
   * Remove a single feature from the source. If you want to batch remove
   * features, use the {@link module:ol/source/Vector~VectorSource#removeFeatures #removeFeatures()} method
   * instead.
   * @param {FeatureType} feature Feature to remove.
   * @api
   */
  removeFeature(e) {
    if (!e)
      return;
    this.removeFeatureInternal(e) && this.changed();
  }
  /**
   * Remove feature without firing a `change` event.
   * @param {FeatureType} feature Feature.
   * @return {FeatureType|undefined} The removed feature
   *     (or undefined if the feature was not found).
   * @protected
   */
  removeFeatureInternal(e) {
    const n = fe(e);
    n in this.nullGeometryFeatures_ ? delete this.nullGeometryFeatures_[n] : this.featuresRtree_ && this.featuresRtree_.remove(e);
    const i = this.featureChangeKeys_[n];
    if (!i)
      return;
    i.forEach(Ce), delete this.featureChangeKeys_[n];
    const s = e.getId();
    return s !== void 0 && delete this.idIndex_[s.toString()], delete this.uidIndex_[n], this.hasListener(ct.REMOVEFEATURE) && this.dispatchEvent(
      new hn(ct.REMOVEFEATURE, e)
    ), e;
  }
  /**
   * Remove a feature from the id index.  Called internally when the feature id
   * may have changed.
   * @param {FeatureType} feature The feature.
   * @return {boolean} Removed the feature from the index.
   * @private
   */
  removeFromIdIndex_(e) {
    let n = !1;
    for (const i in this.idIndex_) {
      const s = this.idIndex_[i];
      if (e instanceof Mn && Array.isArray(s) && s.includes(e))
        s.splice(s.indexOf(e), 1);
      else if (this.idIndex_[i] === e) {
        delete this.idIndex_[i], n = !0;
        break;
      }
    }
    return n;
  }
  /**
   * Set the new loader of the source. The next render cycle will use the
   * new loader.
   * @param {import("../featureloader.js").FeatureLoader} loader The loader to set.
   * @api
   */
  setLoader(e) {
    this.loader_ = e;
  }
  /**
   * Points the source to a new url. The next render cycle will use the new url.
   * @param {string|import("../featureloader.js").FeatureUrlFunction} url Url.
   * @api
   */
  setUrl(e) {
    ue(this.format_, "`format` must be set when `url` is set"), this.url_ = e, this.setLoader(bu(e, this.format_));
  }
}
const l0 = a0, Ls = _f("language", {
  state: () => ({
    locale: "it"
  }),
  actions: {
    setLocale(t) {
      this.locale = t;
    },
    getText(t) {
      return typeof t == "string" ? t : typeof t == "object" ? t[this.locale] : "";
    },
    getAncor(t) {
      return t ? typeof t == "string" ? t : typeof t == "object" ? Object.values(t)[0] : "" : "";
    }
  },
  persist: {
    storage: localStorage
  }
});
function B(t, e) {
  return (n) => Object.keys(t).reduce((i, s) => {
    const o = typeof t[s] == "object" && t[s] != null && !Array.isArray(t[s]) ? t[s] : {
      type: t[s]
    };
    return n && s in n ? i[s] = {
      ...o,
      default: n[s]
    } : i[s] = o, e && !i[s].source && (i[s].source = e), i;
  }, {});
}
const ie = B({
  class: [String, Array],
  style: {
    type: [String, Array, Object],
    default: null
  }
}, "component"), Xa = typeof window < "u", Ya = Xa && "IntersectionObserver" in window;
function Oh(t, e, n) {
  const i = e.length - 1;
  if (i < 0)
    return t === void 0 ? n : t;
  for (let s = 0; s < i; s++) {
    if (t == null)
      return n;
    t = t[e[s]];
  }
  return t == null || t[e[i]] === void 0 ? n : t[e[i]];
}
function Fr(t, e) {
  if (t === e)
    return !0;
  if (t instanceof Date && e instanceof Date && t.getTime() !== e.getTime() || t !== Object(t) || e !== Object(e))
    return !1;
  const n = Object.keys(t);
  return n.length !== Object.keys(e).length ? !1 : n.every((i) => Fr(t[i], e[i]));
}
function u0(t, e, n) {
  return t == null || !e || typeof e != "string" ? n : t[e] !== void 0 ? t[e] : (e = e.replace(/\[(\w+)\]/g, ".$1"), e = e.replace(/^\./, ""), Oh(t, e.split("."), n));
}
function Yi(t, e, n) {
  if (e === !0)
    return t === void 0 ? n : t;
  if (e == null || typeof e == "boolean")
    return n;
  if (t !== Object(t)) {
    if (typeof e != "function")
      return n;
    const s = e(t, n);
    return typeof s > "u" ? n : s;
  }
  if (typeof e == "string")
    return u0(t, e, n);
  if (Array.isArray(e))
    return Oh(t, e, n);
  if (typeof e != "function")
    return n;
  const i = e(t, n);
  return typeof i > "u" ? n : i;
}
function me(t) {
  let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "px";
  if (!(t == null || t === ""))
    return isNaN(+t) ? String(t) : isFinite(+t) ? `${Number(t)}${e}` : void 0;
}
function Wo(t) {
  return t !== null && typeof t == "object" && !Array.isArray(t);
}
function Iu(t) {
  if (t && "$el" in t) {
    const e = t.$el;
    return (e == null ? void 0 : e.nodeType) === Node.TEXT_NODE ? e.nextElementSibling : e;
  }
  return t;
}
const Tu = Object.freeze({
  enter: 13,
  tab: 9,
  delete: 46,
  esc: 27,
  space: 32,
  up: 38,
  down: 40,
  left: 37,
  right: 39,
  end: 35,
  home: 36,
  del: 46,
  backspace: 8,
  insert: 45,
  pageup: 33,
  pagedown: 34,
  shift: 16
});
function Dh(t) {
  return Object.keys(t);
}
function wo(t, e) {
  return e.every((n) => t.hasOwnProperty(n));
}
function Fh(t, e) {
  const n = {}, i = new Set(Object.keys(t));
  for (const s of e)
    i.has(s) && (n[s] = t[s]);
  return n;
}
function Ru(t, e, n) {
  const i = /* @__PURE__ */ Object.create(null), s = /* @__PURE__ */ Object.create(null);
  for (const r in t)
    e.some((o) => o instanceof RegExp ? o.test(r) : o === r) && !(n != null && n.some((o) => o === r)) ? i[r] = t[r] : s[r] = t[r];
  return [i, s];
}
function Nh(t, e) {
  const n = {
    ...t
  };
  return e.forEach((i) => delete n[i]), n;
}
const Vh = /^on[^a-z]/, c0 = (t) => Vh.test(t), h0 = ["onAfterscriptexecute", "onAnimationcancel", "onAnimationend", "onAnimationiteration", "onAnimationstart", "onAuxclick", "onBeforeinput", "onBeforescriptexecute", "onChange", "onClick", "onCompositionend", "onCompositionstart", "onCompositionupdate", "onContextmenu", "onCopy", "onCut", "onDblclick", "onFocusin", "onFocusout", "onFullscreenchange", "onFullscreenerror", "onGesturechange", "onGestureend", "onGesturestart", "onGotpointercapture", "onInput", "onKeydown", "onKeypress", "onKeyup", "onLostpointercapture", "onMousedown", "onMousemove", "onMouseout", "onMouseover", "onMouseup", "onMousewheel", "onPaste", "onPointercancel", "onPointerdown", "onPointerenter", "onPointerleave", "onPointermove", "onPointerout", "onPointerover", "onPointerup", "onReset", "onSelect", "onSubmit", "onTouchcancel", "onTouchend", "onTouchmove", "onTouchstart", "onTransitioncancel", "onTransitionend", "onTransitionrun", "onTransitionstart", "onWheel"];
function Gh(t) {
  const [e, n] = Ru(t, [Vh]), i = Nh(e, h0), [s, r] = Ru(n, ["class", "style", "id", /^data-/]);
  return Object.assign(s, e), Object.assign(r, i), [s, r];
}
function es(t) {
  return t == null ? [] : Array.isArray(t) ? t : [t];
}
function zh(t) {
  let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1;
  return Math.max(e, Math.min(n, t));
}
function Lu(t, e) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "0";
  return t + n.repeat(Math.max(0, e - t.length));
}
function d0(t) {
  let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1;
  const n = [];
  let i = 0;
  for (; i < t.length; )
    n.push(t.substr(i, e)), i += e;
  return n;
}
function hi() {
  let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, n = arguments.length > 2 ? arguments[2] : void 0;
  const i = {};
  for (const s in t)
    i[s] = t[s];
  for (const s in e) {
    const r = t[s], o = e[s];
    if (Wo(r) && Wo(o)) {
      i[s] = hi(r, o, n);
      continue;
    }
    if (Array.isArray(r) && Array.isArray(o) && n) {
      i[s] = n(r, o);
      continue;
    }
    i[s] = o;
  }
  return i;
}
function Bh(t) {
  return t.map((e) => e.type === Ee ? Bh(e.children) : e).flat();
}
function Vn() {
  let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
  if (Vn.cache.has(t))
    return Vn.cache.get(t);
  const e = t.replace(/[^a-z]/gi, "-").replace(/\B([A-Z])/g, "-$1").toLowerCase();
  return Vn.cache.set(t, e), e;
}
Vn.cache = /* @__PURE__ */ new Map();
function Js(t, e) {
  if (!e || typeof e != "object")
    return [];
  if (Array.isArray(e))
    return e.map((n) => Js(t, n)).flat(1);
  if (Array.isArray(e.children))
    return e.children.map((n) => Js(t, n)).flat(1);
  if (e.component) {
    if (Object.getOwnPropertySymbols(e.component.provides).includes(t))
      return [e.component];
    if (e.component.subTree)
      return Js(t, e.component.subTree).flat(1);
  }
  return [];
}
function $h(t) {
  const e = sc({}), n = w(t);
  return _r(() => {
    for (const i in n.value)
      e[i] = n.value[i];
  }, {
    flush: "sync"
  }), rc(e);
}
function Xo(t, e) {
  return t.includes(e);
}
const en = () => [Function, Array];
function Au(t, e) {
  return e = "on" + xs(e), !!(t[e] || t[`${e}Once`] || t[`${e}Capture`] || t[`${e}OnceCapture`] || t[`${e}CaptureOnce`]);
}
function Wh(t) {
  for (var e = arguments.length, n = new Array(e > 1 ? e - 1 : 0), i = 1; i < e; i++)
    n[i - 1] = arguments[i];
  if (Array.isArray(t))
    for (const s of t)
      s(...n);
  else
    typeof t == "function" && t(...n);
}
function Xh(t) {
  let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
  const n = ["button", "[href]", 'input:not([type="hidden"])', "select", "textarea", "[tabindex]"].map((i) => `${i}${e ? ':not([tabindex="-1"])' : ""}:not([disabled])`).join(", ");
  return [...t.querySelectorAll(n)];
}
function f0(t, e, n) {
  let i, s = t.indexOf(document.activeElement);
  const r = e === "next" ? 1 : -1;
  do
    s += r, i = t[s];
  while ((!i || i.offsetParent == null || !((n == null ? void 0 : n(i)) ?? !0)) && s < t.length && s >= 0);
  return i;
}
function Yh(t, e) {
  var i, s, r, o;
  const n = Xh(t);
  if (!e)
    (t === document.activeElement || !t.contains(document.activeElement)) && ((i = n[0]) == null || i.focus());
  else if (e === "first")
    (s = n[0]) == null || s.focus();
  else if (e === "last")
    (r = n.at(-1)) == null || r.focus();
  else if (typeof e == "number")
    (o = n[e]) == null || o.focus();
  else {
    const a = f0(n, e);
    a ? a.focus() : Yh(t, e === "next" ? "first" : "last");
  }
}
const g0 = ["top", "bottom"], m0 = ["start", "end", "left", "right"];
function _0(t, e) {
  let [n, i] = t.split(" ");
  return i || (i = Xo(g0, n) ? "start" : Xo(m0, n) ? "top" : "center"), {
    side: Pu(n, e),
    align: Pu(i, e)
  };
}
function Pu(t, e) {
  return t === "start" ? e ? "right" : "left" : t === "end" ? e ? "left" : "right" : t;
}
class So {
  constructor(e) {
    let {
      x: n,
      y: i,
      width: s,
      height: r
    } = e;
    this.x = n, this.y = i, this.width = s, this.height = r;
  }
  get top() {
    return this.y;
  }
  get bottom() {
    return this.y + this.height;
  }
  get left() {
    return this.x;
  }
  get right() {
    return this.x + this.width;
  }
}
function v0(t) {
  const e = t.getBoundingClientRect(), n = getComputedStyle(t), i = n.transform;
  if (i) {
    let s, r, o, a, l;
    if (i.startsWith("matrix3d("))
      s = i.slice(9, -1).split(/, /), r = +s[0], o = +s[5], a = +s[12], l = +s[13];
    else if (i.startsWith("matrix("))
      s = i.slice(7, -1).split(/, /), r = +s[0], o = +s[3], a = +s[4], l = +s[5];
    else
      return new So(e);
    const u = n.transformOrigin, c = e.x - a - (1 - r) * parseFloat(u), h = e.y - l - (1 - o) * parseFloat(u.slice(u.indexOf(" ") + 1)), d = r ? e.width / r : t.offsetWidth + 1, f = o ? e.height / o : t.offsetHeight + 1;
    return new So({
      x: c,
      y: h,
      width: d,
      height: f
    });
  } else
    return new So(e);
}
function y0(t, e, n) {
  if (typeof t.animate > "u")
    return {
      finished: Promise.resolve()
    };
  let i;
  try {
    i = t.animate(e, n);
  } catch {
    return {
      finished: Promise.resolve()
    };
  }
  return typeof i.finished > "u" && (i.finished = new Promise((s) => {
    i.onfinish = () => {
      s(i);
    };
  })), i;
}
const ni = 2.4, Mu = 0.2126729, ku = 0.7151522, Ou = 0.072175, p0 = 0.55, x0 = 0.58, C0 = 0.57, E0 = 0.62, Zs = 0.03, Du = 1.45, w0 = 5e-4, S0 = 1.25, b0 = 1.25, Fu = 0.078, Nu = 12.82051282051282, Ks = 0.06, Vu = 1e-3;
function Gu(t, e) {
  const n = (t.r / 255) ** ni, i = (t.g / 255) ** ni, s = (t.b / 255) ** ni, r = (e.r / 255) ** ni, o = (e.g / 255) ** ni, a = (e.b / 255) ** ni;
  let l = n * Mu + i * ku + s * Ou, u = r * Mu + o * ku + a * Ou;
  if (l <= Zs && (l += (Zs - l) ** Du), u <= Zs && (u += (Zs - u) ** Du), Math.abs(u - l) < w0)
    return 0;
  let c;
  if (u > l) {
    const h = (u ** p0 - l ** x0) * S0;
    c = h < Vu ? 0 : h < Fu ? h - h * Nu * Ks : h - Ks;
  } else {
    const h = (u ** E0 - l ** C0) * b0;
    c = h > -Vu ? 0 : h > -Fu ? h - h * Nu * Ks : h + Ks;
  }
  return c * 100;
}
function _i(t) {
  oc(`Vuetify: ${t}`);
}
function I0(t, e) {
  e = Array.isArray(e) ? e.slice(0, -1).map((n) => `'${n}'`).join(", ") + ` or '${e.at(-1)}'` : `'${e}'`, oc(`[Vuetify UPGRADE] '${t}' is deprecated, use ${e} instead.`);
}
function Yo(t) {
  return !!t && /^(#|var\(--|(rgb|hsl)a?\()/.test(t);
}
function T0(t) {
  return Yo(t) && !/^((rgb|hsl)a?\()?var\(--/.test(t);
}
const zu = /^(?<fn>(?:rgb|hsl)a?)\((?<values>.+)\)/, R0 = {
  rgb: (t, e, n, i) => ({
    r: t,
    g: e,
    b: n,
    a: i
  }),
  rgba: (t, e, n, i) => ({
    r: t,
    g: e,
    b: n,
    a: i
  }),
  hsl: (t, e, n, i) => Bu({
    h: t,
    s: e,
    l: n,
    a: i
  }),
  hsla: (t, e, n, i) => Bu({
    h: t,
    s: e,
    l: n,
    a: i
  }),
  hsv: (t, e, n, i) => gs({
    h: t,
    s: e,
    v: n,
    a: i
  }),
  hsva: (t, e, n, i) => gs({
    h: t,
    s: e,
    v: n,
    a: i
  })
};
function Ki(t) {
  if (typeof t == "number")
    return (isNaN(t) || t < 0 || t > 16777215) && _i(`'${t}' is not a valid hex color`), {
      r: (t & 16711680) >> 16,
      g: (t & 65280) >> 8,
      b: t & 255
    };
  if (typeof t == "string" && zu.test(t)) {
    const {
      groups: e
    } = t.match(zu), {
      fn: n,
      values: i
    } = e, s = i.split(/,\s*/).map((r) => r.endsWith("%") && ["hsl", "hsla", "hsv", "hsva"].includes(n) ? parseFloat(r) / 100 : parseFloat(r));
    return R0[n](...s);
  } else if (typeof t == "string") {
    let e = t.startsWith("#") ? t.slice(1) : t;
    [3, 4].includes(e.length) ? e = e.split("").map((i) => i + i).join("") : [6, 8].includes(e.length) || _i(`'${t}' is not a valid hex(a) color`);
    const n = parseInt(e, 16);
    return (isNaN(n) || n < 0 || n > 4294967295) && _i(`'${t}' is not a valid hex(a) color`), L0(e);
  } else if (typeof t == "object") {
    if (wo(t, ["r", "g", "b"]))
      return t;
    if (wo(t, ["h", "s", "l"]))
      return gs(jh(t));
    if (wo(t, ["h", "s", "v"]))
      return gs(t);
  }
  throw new TypeError(`Invalid color: ${t == null ? t : String(t) || t.constructor.name}
Expected #hex, #hexa, rgb(), rgba(), hsl(), hsla(), object or number`);
}
function gs(t) {
  const {
    h: e,
    s: n,
    v: i,
    a: s
  } = t, r = (a) => {
    const l = (a + e / 60) % 6;
    return i - i * n * Math.max(Math.min(l, 4 - l, 1), 0);
  }, o = [r(5), r(3), r(1)].map((a) => Math.round(a * 255));
  return {
    r: o[0],
    g: o[1],
    b: o[2],
    a: s
  };
}
function Bu(t) {
  return gs(jh(t));
}
function jh(t) {
  const {
    h: e,
    s: n,
    l: i,
    a: s
  } = t, r = i + n * Math.min(i, 1 - i), o = r === 0 ? 0 : 2 - 2 * i / r;
  return {
    h: e,
    s: o,
    v: r,
    a: s
  };
}
function L0(t) {
  t = A0(t);
  let [e, n, i, s] = d0(t, 2).map((r) => parseInt(r, 16));
  return s = s === void 0 ? s : s / 255, {
    r: e,
    g: n,
    b: i,
    a: s
  };
}
function A0(t) {
  return t.startsWith("#") && (t = t.slice(1)), t = t.replace(/([^0-9a-f])/gi, "F"), (t.length === 3 || t.length === 4) && (t = t.split("").map((e) => e + e).join("")), t.length !== 6 && (t = Lu(Lu(t, 6), 8, "F")), t;
}
function P0(t) {
  const e = Math.abs(Gu(Ki(0), Ki(t)));
  return Math.abs(Gu(Ki(16777215), Ki(t))) > Math.min(e, 50) ? "#fff" : "#000";
}
function As(t) {
  if (t._setup = t._setup ?? t.setup, !t.name)
    return _i("The component is missing an explicit name, unable to generate default prop value"), t;
  if (t._setup) {
    t.props = B(t.props ?? {}, t.name)();
    const e = Object.keys(t.props).filter((n) => n !== "class" && n !== "style");
    t.filterProps = function(i) {
      return Fh(i, e);
    }, t.props._as = String, t.setup = function(i, s) {
      const r = ja();
      if (!r.value)
        return t._setup(i, s);
      const {
        props: o,
        provideSubDefaults: a
      } = D0(i, i._as ?? t.name, r), l = t._setup(o, s);
      return a(), l;
    };
  }
  return t;
}
function Z() {
  let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !0;
  return (e) => (t ? As : rf)(e);
}
function Ps(t) {
  let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "div", n = arguments.length > 2 ? arguments[2] : void 0;
  return Z()({
    name: n ?? xs(ac(t.replace(/__/g, "-"))),
    props: {
      tag: {
        type: String,
        default: e
      },
      ...ie()
    },
    setup(i, s) {
      let {
        slots: r
      } = s;
      return () => {
        var o;
        return bi(i.tag, {
          class: [t, i.class],
          style: i.style
        }, (o = r.default) == null ? void 0 : o.call(r));
      };
    }
  });
}
const M0 = "cubic-bezier(0.4, 0, 0.2, 1)";
function _t(t, e) {
  const n = of();
  if (!n)
    throw new Error(`[Vuetify] ${t} ${e || "must be called from inside a setup function"}`);
  return n;
}
function Vt() {
  let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "composables";
  const e = _t(t).type;
  return Vn((e == null ? void 0 : e.aliasName) || (e == null ? void 0 : e.name));
}
let Uh = 0, Qs = /* @__PURE__ */ new WeakMap();
function Ai() {
  const t = _t("getUid");
  if (Qs.has(t))
    return Qs.get(t);
  {
    const e = Uh++;
    return Qs.set(t, e), e;
  }
}
Ai.reset = () => {
  Uh = 0, Qs = /* @__PURE__ */ new WeakMap();
};
function k0(t) {
  let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : _t("injectSelf");
  const {
    provides: n
  } = e;
  if (n && t in n)
    return n[t];
}
function ne(t) {
  const e = _t("useRender");
  e.render = t;
}
const dr = Symbol.for("vuetify:defaults");
function ja() {
  const t = Ye(dr);
  if (!t)
    throw new Error("[Vuetify] Could not find defaults instance");
  return t;
}
function Pi(t, e) {
  const n = ja(), i = J(t), s = w(() => {
    if (te(e == null ? void 0 : e.disabled))
      return n.value;
    const o = te(e == null ? void 0 : e.scoped), a = te(e == null ? void 0 : e.reset), l = te(e == null ? void 0 : e.root);
    if (i.value == null && !(o || a || l))
      return n.value;
    let u = hi(i.value, {
      prev: n.value
    });
    if (o)
      return u;
    if (a || l) {
      const c = Number(a || 1 / 0);
      for (let h = 0; h <= c && !(!u || !("prev" in u)); h++)
        u = u.prev;
      return u && typeof l == "string" && l in u && (u = hi(hi(u, {
        prev: u
      }), u[l])), u;
    }
    return u.prev ? hi(u.prev, u) : u;
  });
  return mt(dr, s), s;
}
function O0(t, e) {
  var n, i;
  return typeof ((n = t.props) == null ? void 0 : n[e]) < "u" || typeof ((i = t.props) == null ? void 0 : i[Vn(e)]) < "u";
}
function D0() {
  let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, e = arguments.length > 1 ? arguments[1] : void 0, n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : ja();
  const i = _t("useDefaults");
  if (e = e ?? i.type.name ?? i.type.__name, !e)
    throw new Error("[Vuetify] Could not determine component name");
  const s = w(() => {
    var l;
    return (l = n.value) == null ? void 0 : l[t._as ?? e];
  }), r = new Proxy(t, {
    get(l, u) {
      var h, d, f, g;
      const c = Reflect.get(l, u);
      return u === "class" || u === "style" ? [(h = s.value) == null ? void 0 : h[u], c].filter((m) => m != null) : typeof u == "string" && !O0(i.vnode, u) ? ((d = s.value) == null ? void 0 : d[u]) ?? ((g = (f = n.value) == null ? void 0 : f.global) == null ? void 0 : g[u]) ?? c : c;
    }
  }), o = ye();
  _r(() => {
    if (s.value) {
      const l = Object.entries(s.value).filter((u) => {
        let [c] = u;
        return c.startsWith(c[0].toUpperCase());
      });
      o.value = l.length ? Object.fromEntries(l) : void 0;
    } else
      o.value = void 0;
  });
  function a() {
    const l = k0(dr, i);
    mt(dr, w(() => o.value ? hi((l == null ? void 0 : l.value) ?? {}, o.value) : l == null ? void 0 : l.value));
  }
  return {
    props: r,
    provideSubDefaults: a
  };
}
const F0 = Z()({
  name: "VCardActions",
  props: ie(),
  setup(t, e) {
    let {
      slots: n
    } = e;
    return Pi({
      VBtn: {
        slim: !0,
        variant: "text"
      }
    }), ne(() => {
      var i;
      return v("div", {
        class: ["v-card-actions", t.class],
        style: t.style
      }, [(i = n.default) == null ? void 0 : i.call(n)]);
    }), {};
  }
}), N0 = Ps("v-card-subtitle"), Zh = Ps("v-card-title");
function Ua(t) {
  return $h(() => {
    const e = [], n = {};
    if (t.value.background)
      if (Yo(t.value.background)) {
        if (n.backgroundColor = t.value.background, !t.value.text && T0(t.value.background)) {
          const i = Ki(t.value.background);
          if (i.a == null || i.a === 1) {
            const s = P0(i);
            n.color = s, n.caretColor = s;
          }
        }
      } else
        e.push(`bg-${t.value.background}`);
    return t.value.text && (Yo(t.value.text) ? (n.color = t.value.text, n.caretColor = t.value.text) : e.push(`text-${t.value.text}`)), {
      colorClasses: e,
      colorStyles: n
    };
  });
}
function Cn(t, e) {
  const n = w(() => ({
    text: Cs(t) ? t.value : e ? t[e] : null
  })), {
    colorClasses: i,
    colorStyles: s
  } = Ua(n);
  return {
    textColorClasses: i,
    textColorStyles: s
  };
}
function En(t, e) {
  const n = w(() => ({
    background: Cs(t) ? t.value : e ? t[e] : null
  })), {
    colorClasses: i,
    colorStyles: s
  } = Ua(n);
  return {
    backgroundColorClasses: i,
    backgroundColorStyles: s
  };
}
const xe = [String, Function, Object, Array], V0 = Symbol.for("vuetify:icons"), Nr = B({
  icon: {
    type: xe
  },
  // Could not remove this and use makeTagProps, types complained because it is not required
  tag: {
    type: String,
    required: !0
  }
}, "icon"), $u = Z()({
  name: "VComponentIcon",
  props: Nr(),
  setup(t, e) {
    let {
      slots: n
    } = e;
    return () => {
      const i = t.icon;
      return v(t.tag, null, {
        default: () => {
          var s;
          return [t.icon ? v(i, null, null) : (s = n.default) == null ? void 0 : s.call(n)];
        }
      });
    };
  }
}), G0 = As({
  name: "VSvgIcon",
  inheritAttrs: !1,
  props: Nr(),
  setup(t, e) {
    let {
      attrs: n
    } = e;
    return () => v(t.tag, Oe(n, {
      style: null
    }), {
      default: () => [v("svg", {
        class: "v-icon__svg",
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 24 24",
        role: "img",
        "aria-hidden": "true"
      }, [Array.isArray(t.icon) ? t.icon.map((i) => Array.isArray(i) ? v("path", {
        d: i[0],
        "fill-opacity": i[1]
      }, null) : v("path", {
        d: i
      }, null)) : v("path", {
        d: t.icon
      }, null)])]
    });
  }
});
As({
  name: "VLigatureIcon",
  props: Nr(),
  setup(t) {
    return () => v(t.tag, null, {
      default: () => [t.icon]
    });
  }
});
As({
  name: "VClassIcon",
  props: Nr(),
  setup(t) {
    return () => v(t.tag, {
      class: t.icon
    }, null);
  }
});
const z0 = (t) => {
  const e = Ye(V0);
  if (!e)
    throw new Error("Missing Vuetify Icons provide!");
  return {
    iconData: w(() => {
      var l;
      const i = te(t);
      if (!i)
        return {
          component: $u
        };
      let s = i;
      if (typeof s == "string" && (s = s.trim(), s.startsWith("$") && (s = (l = e.aliases) == null ? void 0 : l[s.slice(1)])), !s)
        throw new Error(`Could not find aliased icon "${i}"`);
      if (Array.isArray(s))
        return {
          component: G0,
          icon: s
        };
      if (typeof s != "string")
        return {
          component: $u,
          icon: s
        };
      const r = Object.keys(e.sets).find((u) => typeof s == "string" && s.startsWith(`${u}:`)), o = r ? s.slice(r.length + 1) : s;
      return {
        component: e.sets[r ?? e.defaultSet].component,
        icon: o
      };
    })
  };
}, B0 = ["x-small", "small", "default", "large", "x-large"], Vr = B({
  size: {
    type: [String, Number],
    default: "default"
  }
}, "size");
function Gr(t) {
  let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Vt();
  return $h(() => {
    let n, i;
    return Xo(B0, t.size) ? n = `${e}--size-${t.size}` : t.size && (i = {
      width: me(t.size),
      height: me(t.size)
    }), {
      sizeClasses: n,
      sizeStyles: i
    };
  });
}
const Le = B({
  tag: {
    type: String,
    default: "div"
  }
}, "tag"), Wu = Symbol.for("vuetify:theme"), je = B({
  theme: String
}, "theme");
function Qe(t) {
  _t("provideTheme");
  const e = Ye(Wu, null);
  if (!e)
    throw new Error("Could not find Vuetify theme injection");
  const n = w(() => t.theme ?? e.name.value), i = w(() => e.themes.value[n.value]), s = w(() => e.isDisabled ? void 0 : `v-theme--${n.value}`), r = {
    ...e,
    name: n,
    current: i,
    themeClasses: s
  };
  return mt(Wu, r), r;
}
const $0 = B({
  color: String,
  start: Boolean,
  end: Boolean,
  icon: xe,
  ...ie(),
  ...Vr(),
  ...Le({
    tag: "i"
  }),
  ...je()
}, "VIcon"), We = Z()({
  name: "VIcon",
  props: $0(),
  setup(t, e) {
    let {
      attrs: n,
      slots: i
    } = e;
    const s = J(), {
      themeClasses: r
    } = Qe(t), {
      iconData: o
    } = z0(w(() => s.value || t.icon)), {
      sizeClasses: a
    } = Gr(t), {
      textColorClasses: l,
      textColorStyles: u
    } = Cn(re(t, "color"));
    return ne(() => {
      var h, d;
      const c = (h = i.default) == null ? void 0 : h.call(i);
      return c && (s.value = (d = Bh(c).filter((f) => f.type === af && f.children && typeof f.children == "string")[0]) == null ? void 0 : d.children), v(o.value.component, {
        tag: t.tag,
        icon: o.value.icon,
        class: ["v-icon", "notranslate", r.value, a.value, l.value, {
          "v-icon--clickable": !!n.onClick,
          "v-icon--start": t.start,
          "v-icon--end": t.end
        }, t.class],
        style: [a.value ? void 0 : {
          fontSize: me(t.size),
          height: me(t.size),
          width: me(t.size)
        }, u.value, t.style],
        role: n.onClick ? "button" : void 0,
        "aria-hidden": !n.onClick
      }, {
        default: () => [c]
      });
    }), {};
  }
});
const Mi = B({
  height: [Number, String],
  maxHeight: [Number, String],
  maxWidth: [Number, String],
  minHeight: [Number, String],
  minWidth: [Number, String],
  width: [Number, String]
}, "dimension");
function ki(t) {
  return {
    dimensionStyles: w(() => ({
      height: me(t.height),
      maxHeight: me(t.maxHeight),
      maxWidth: me(t.maxWidth),
      minHeight: me(t.minHeight),
      minWidth: me(t.minWidth),
      width: me(t.width)
    }))
  };
}
function W0(t) {
  return {
    aspectStyles: w(() => {
      const e = Number(t.aspectRatio);
      return e ? {
        paddingBottom: String(1 / e * 100) + "%"
      } : void 0;
    })
  };
}
const Kh = B({
  aspectRatio: [String, Number],
  contentClass: String,
  inline: Boolean,
  ...ie(),
  ...Mi()
}, "VResponsive"), Xu = Z()({
  name: "VResponsive",
  props: Kh(),
  setup(t, e) {
    let {
      slots: n
    } = e;
    const {
      aspectStyles: i
    } = W0(t), {
      dimensionStyles: s
    } = ki(t);
    return ne(() => {
      var r;
      return v("div", {
        class: ["v-responsive", {
          "v-responsive--inline": t.inline
        }, t.class],
        style: [s.value, t.style]
      }, [v("div", {
        class: "v-responsive__sizer",
        style: i.value
      }, null), (r = n.additional) == null ? void 0 : r.call(n), n.default && v("div", {
        class: ["v-responsive__content", t.contentClass]
      }, [n.default()])]);
    }), {};
  }
}), wt = B({
  rounded: {
    type: [Boolean, Number, String],
    default: void 0
  }
}, "rounded");
function St(t) {
  let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Vt();
  return {
    roundedClasses: w(() => {
      const i = Cs(t) ? t.value : t.rounded, s = [];
      if (i === !0 || i === "")
        s.push(`${e}--rounded`);
      else if (typeof i == "string" || i === 0)
        for (const r of String(i).split(" "))
          s.push(`rounded-${r}`);
      return s;
    })
  };
}
const Za = B({
  transition: {
    type: [Boolean, String, Object],
    default: "fade-transition",
    validator: (t) => t !== !0
  }
}, "transition"), vn = (t, e) => {
  let {
    slots: n
  } = e;
  const {
    transition: i,
    disabled: s,
    ...r
  } = t, {
    component: o = vr,
    ...a
  } = typeof i == "object" ? i : {};
  return bi(o, Oe(typeof i == "string" ? {
    name: s ? "" : i
  } : a, r, {
    disabled: s
  }), n);
};
function X0(t, e) {
  if (!Ya)
    return;
  const n = e.modifiers || {}, i = e.value, {
    handler: s,
    options: r
  } = typeof i == "object" ? i : {
    handler: i,
    options: {}
  }, o = new IntersectionObserver(function() {
    var h;
    let a = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], l = arguments.length > 1 ? arguments[1] : void 0;
    const u = (h = t._observe) == null ? void 0 : h[e.instance.$.uid];
    if (!u)
      return;
    const c = a.some((d) => d.isIntersecting);
    s && (!n.quiet || u.init) && (!n.once || c || u.init) && s(c, a, l), c && n.once ? Hh(t, e) : u.init = !0;
  }, r);
  t._observe = Object(t._observe), t._observe[e.instance.$.uid] = {
    init: !1,
    observer: o
  }, o.observe(t);
}
function Hh(t, e) {
  var i;
  const n = (i = t._observe) == null ? void 0 : i[e.instance.$.uid];
  n && (n.observer.unobserve(t), delete t._observe[e.instance.$.uid]);
}
const Y0 = {
  mounted: X0,
  unmounted: Hh
}, Ka = Y0, qh = B({
  alt: String,
  cover: Boolean,
  color: String,
  draggable: {
    type: [Boolean, String],
    default: void 0
  },
  eager: Boolean,
  gradient: String,
  lazySrc: String,
  options: {
    type: Object,
    // For more information on types, navigate to:
    // https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
    default: () => ({
      root: void 0,
      rootMargin: void 0,
      threshold: void 0
    })
  },
  sizes: String,
  src: {
    type: [String, Object],
    default: ""
  },
  crossorigin: String,
  referrerpolicy: String,
  srcset: String,
  position: String,
  ...Kh(),
  ...ie(),
  ...wt(),
  ...Za()
}, "VImg"), wn = Z()({
  name: "VImg",
  directives: {
    intersect: Ka
  },
  props: qh(),
  emits: {
    loadstart: (t) => !0,
    load: (t) => !0,
    error: (t) => !0
  },
  setup(t, e) {
    let {
      emit: n,
      slots: i
    } = e;
    const {
      backgroundColorClasses: s,
      backgroundColorStyles: r
    } = En(re(t, "color")), {
      roundedClasses: o
    } = St(t), a = _t("VImg"), l = ye(""), u = J(), c = ye(t.eager ? "loading" : "idle"), h = ye(), d = ye(), f = w(() => t.src && typeof t.src == "object" ? {
      src: t.src.src,
      srcset: t.srcset || t.src.srcset,
      lazySrc: t.lazySrc || t.src.lazySrc,
      aspect: Number(t.aspectRatio || t.src.aspect || 0)
    } : {
      src: t.src,
      srcset: t.srcset,
      lazySrc: t.lazySrc,
      aspect: Number(t.aspectRatio || 0)
    }), g = w(() => f.value.aspect || h.value / d.value || 0);
    pe(() => t.src, () => {
      m(c.value !== "idle");
    }), pe(g, (A, M) => {
      !A && M && u.value && x(u.value);
    }), lc(() => m());
    function m(A) {
      if (!(t.eager && A) && !(Ya && !A && !t.eager)) {
        if (c.value = "loading", f.value.lazySrc) {
          const M = new Image();
          M.src = f.value.lazySrc, x(M, null);
        }
        f.value.src && Ht(() => {
          var M;
          n("loadstart", ((M = u.value) == null ? void 0 : M.currentSrc) || f.value.src), setTimeout(() => {
            var k;
            if (!a.isUnmounted)
              if ((k = u.value) != null && k.complete) {
                if (u.value.naturalWidth || p(), c.value === "error")
                  return;
                g.value || x(u.value, null), c.value === "loading" && _();
              } else
                g.value || x(u.value), y();
          });
        });
      }
    }
    function _() {
      var A;
      a.isUnmounted || (y(), x(u.value), c.value = "loaded", n("load", ((A = u.value) == null ? void 0 : A.currentSrc) || f.value.src));
    }
    function p() {
      var A;
      a.isUnmounted || (c.value = "error", n("error", ((A = u.value) == null ? void 0 : A.currentSrc) || f.value.src));
    }
    function y() {
      const A = u.value;
      A && (l.value = A.currentSrc || A.src);
    }
    let C = -1;
    Ft(() => {
      clearTimeout(C);
    });
    function x(A) {
      let M = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 100;
      const k = () => {
        if (clearTimeout(C), a.isUnmounted)
          return;
        const {
          naturalHeight: V,
          naturalWidth: O
        } = A;
        V || O ? (h.value = O, d.value = V) : !A.complete && c.value === "loading" && M != null ? C = window.setTimeout(k, M) : (A.currentSrc.endsWith(".svg") || A.currentSrc.startsWith("data:image/svg+xml")) && (h.value = 1, d.value = 1);
      };
      k();
    }
    const E = w(() => ({
      "v-img__img--cover": t.cover,
      "v-img__img--contain": !t.cover
    })), S = () => {
      var k;
      if (!f.value.src || c.value === "idle")
        return null;
      const A = v("img", {
        class: ["v-img__img", E.value],
        style: {
          objectPosition: t.position
        },
        src: f.value.src,
        srcset: f.value.srcset,
        alt: t.alt,
        crossorigin: t.crossorigin,
        referrerpolicy: t.referrerpolicy,
        draggable: t.draggable,
        sizes: t.sizes,
        ref: u,
        onLoad: _,
        onError: p
      }, null), M = (k = i.sources) == null ? void 0 : k.call(i);
      return v(vn, {
        transition: t.transition,
        appear: !0
      }, {
        default: () => [Xe(M ? v("picture", {
          class: "v-img__picture"
        }, [M, A]) : A, [[Ii, c.value === "loaded"]])]
      });
    }, T = () => v(vn, {
      transition: t.transition
    }, {
      default: () => [f.value.lazySrc && c.value !== "loaded" && v("img", {
        class: ["v-img__img", "v-img__img--preload", E.value],
        style: {
          objectPosition: t.position
        },
        src: f.value.lazySrc,
        alt: t.alt,
        crossorigin: t.crossorigin,
        referrerpolicy: t.referrerpolicy,
        draggable: t.draggable
      }, null)]
    }), I = () => i.placeholder ? v(vn, {
      transition: t.transition,
      appear: !0
    }, {
      default: () => [(c.value === "loading" || c.value === "error" && !i.error) && v("div", {
        class: "v-img__placeholder"
      }, [i.placeholder()])]
    }) : null, b = () => i.error ? v(vn, {
      transition: t.transition,
      appear: !0
    }, {
      default: () => [c.value === "error" && v("div", {
        class: "v-img__error"
      }, [i.error()])]
    }) : null, D = () => t.gradient ? v("div", {
      class: "v-img__gradient",
      style: {
        backgroundImage: `linear-gradient(${t.gradient})`
      }
    }, null) : null, P = ye(!1);
    {
      const A = pe(g, (M) => {
        M && (requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            P.value = !0;
          });
        }), A());
      });
    }
    return ne(() => {
      const A = Xu.filterProps(t);
      return Xe(v(Xu, Oe({
        class: ["v-img", {
          "v-img--booting": !P.value
        }, s.value, o.value, t.class],
        style: [{
          width: me(t.width === "auto" ? h.value : t.width)
        }, r.value, t.style]
      }, A, {
        aspectRatio: g.value,
        "aria-label": t.alt,
        role: t.alt ? "img" : void 0
      }), {
        additional: () => v(Ee, null, [v(S, null, null), v(T, null, null), v(D, null, null), v(I, null, null), v(b, null, null)]),
        default: i.default
      }), [[Sn("intersect"), {
        handler: m,
        options: t.options
      }, null, {
        once: !0
      }]]);
    }), {
      currentSrc: l,
      image: u,
      state: c,
      naturalWidth: h,
      naturalHeight: d
    };
  }
}), j0 = [null, "default", "comfortable", "compact"], Tn = B({
  density: {
    type: String,
    default: "default",
    validator: (t) => j0.includes(t)
  }
}, "density");
function Xn(t) {
  let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Vt();
  return {
    densityClasses: w(() => `${e}--density-${t.density}`)
  };
}
const U0 = ["elevated", "flat", "tonal", "outlined", "text", "plain"];
function zr(t, e) {
  return v(Ee, null, [t && v("span", {
    key: "overlay",
    class: `${e}__overlay`
  }, null), v("span", {
    key: "underlay",
    class: `${e}__underlay`
  }, null)]);
}
const Oi = B({
  color: String,
  variant: {
    type: String,
    default: "elevated",
    validator: (t) => U0.includes(t)
  }
}, "variant");
function Br(t) {
  let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Vt();
  const n = w(() => {
    const {
      variant: r
    } = te(t);
    return `${e}--variant-${r}`;
  }), {
    colorClasses: i,
    colorStyles: s
  } = Ua(w(() => {
    const {
      variant: r,
      color: o
    } = te(t);
    return {
      [["elevated", "flat"].includes(r) ? "background" : "text"]: o
    };
  }));
  return {
    colorClasses: i,
    colorStyles: s,
    variantClasses: n
  };
}
const Z0 = B({
  start: Boolean,
  end: Boolean,
  icon: xe,
  image: String,
  text: String,
  ...ie(),
  ...Tn(),
  ...wt(),
  ...Vr(),
  ...Le(),
  ...je(),
  ...Oi({
    variant: "flat"
  })
}, "VAvatar"), fr = Z()({
  name: "VAvatar",
  props: Z0(),
  setup(t, e) {
    let {
      slots: n
    } = e;
    const {
      themeClasses: i
    } = Qe(t), {
      colorClasses: s,
      colorStyles: r,
      variantClasses: o
    } = Br(t), {
      densityClasses: a
    } = Xn(t), {
      roundedClasses: l
    } = St(t), {
      sizeClasses: u,
      sizeStyles: c
    } = Gr(t);
    return ne(() => v(t.tag, {
      class: ["v-avatar", {
        "v-avatar--start": t.start,
        "v-avatar--end": t.end
      }, i.value, s.value, a.value, l.value, u.value, o.value, t.class],
      style: [r.value, c.value, t.style]
    }, {
      default: () => {
        var h;
        return [t.image ? v(wn, {
          key: "image",
          src: t.image,
          alt: "",
          cover: !0
        }, null) : t.icon ? v(We, {
          key: "icon",
          icon: t.icon
        }, null) : ((h = n.default) == null ? void 0 : h.call(n)) ?? t.text, zr(!1, "v-avatar")];
      }
    })), {};
  }
}), K0 = B({
  defaults: Object,
  disabled: Boolean,
  reset: [Number, String],
  root: [Boolean, String],
  scoped: Boolean
}, "VDefaultsProvider"), kt = Z(!1)({
  name: "VDefaultsProvider",
  props: K0(),
  setup(t, e) {
    let {
      slots: n
    } = e;
    const {
      defaults: i,
      disabled: s,
      reset: r,
      root: o,
      scoped: a
    } = rc(t);
    return Pi(i, {
      reset: r,
      root: o,
      scoped: a,
      disabled: s
    }), () => {
      var l;
      return (l = n.default) == null ? void 0 : l.call(n);
    };
  }
}), H0 = B({
  appendAvatar: String,
  appendIcon: xe,
  prependAvatar: String,
  prependIcon: xe,
  subtitle: [String, Number],
  title: [String, Number],
  ...ie(),
  ...Tn()
}, "VCardItem"), q0 = Z()({
  name: "VCardItem",
  props: H0(),
  setup(t, e) {
    let {
      slots: n
    } = e;
    return ne(() => {
      var u;
      const i = !!(t.prependAvatar || t.prependIcon), s = !!(i || n.prepend), r = !!(t.appendAvatar || t.appendIcon), o = !!(r || n.append), a = !!(t.title != null || n.title), l = !!(t.subtitle != null || n.subtitle);
      return v("div", {
        class: ["v-card-item", t.class],
        style: t.style
      }, [s && v("div", {
        key: "prepend",
        class: "v-card-item__prepend"
      }, [n.prepend ? v(kt, {
        key: "prepend-defaults",
        disabled: !i,
        defaults: {
          VAvatar: {
            density: t.density,
            image: t.prependAvatar
          },
          VIcon: {
            density: t.density,
            icon: t.prependIcon
          }
        }
      }, n.prepend) : v(Ee, null, [t.prependAvatar && v(fr, {
        key: "prepend-avatar",
        density: t.density,
        image: t.prependAvatar
      }, null), t.prependIcon && v(We, {
        key: "prepend-icon",
        density: t.density,
        icon: t.prependIcon
      }, null)])]), v("div", {
        class: "v-card-item__content"
      }, [a && v(Zh, {
        key: "title"
      }, {
        default: () => {
          var c;
          return [((c = n.title) == null ? void 0 : c.call(n)) ?? t.title];
        }
      }), l && v(N0, {
        key: "subtitle"
      }, {
        default: () => {
          var c;
          return [((c = n.subtitle) == null ? void 0 : c.call(n)) ?? t.subtitle];
        }
      }), (u = n.default) == null ? void 0 : u.call(n)]), o && v("div", {
        key: "append",
        class: "v-card-item__append"
      }, [n.append ? v(kt, {
        key: "append-defaults",
        disabled: !r,
        defaults: {
          VAvatar: {
            density: t.density,
            image: t.appendAvatar
          },
          VIcon: {
            density: t.density,
            icon: t.appendIcon
          }
        }
      }, n.append) : v(Ee, null, [t.appendIcon && v(We, {
        key: "append-icon",
        density: t.density,
        icon: t.appendIcon
      }, null), t.appendAvatar && v(fr, {
        key: "append-avatar",
        density: t.density,
        image: t.appendAvatar
      }, null)])])]);
    }), {};
  }
}), Jh = Ps("v-card-text"), Di = B({
  border: [Boolean, Number, String]
}, "border");
function Fi(t) {
  let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Vt();
  return {
    borderClasses: w(() => {
      const i = Cs(t) ? t.value : t.border, s = [];
      if (i === !0 || i === "")
        s.push(`${e}--border`);
      else if (typeof i == "string" || i === 0)
        for (const r of String(i).split(" "))
          s.push(`border-${r}`);
      return s;
    })
  };
}
const Yn = B({
  elevation: {
    type: [Number, String],
    validator(t) {
      const e = parseInt(t);
      return !isNaN(e) && e >= 0 && // Material Design has a maximum elevation of 24
      // https://material.io/design/environment/elevation.html#default-elevations
      e <= 24;
    }
  }
}, "elevation");
function jn(t) {
  return {
    elevationClasses: w(() => {
      const n = Cs(t) ? t.value : t.elevation, i = [];
      return n == null || i.push(`elevation-${n}`), i;
    })
  };
}
function Qh(t, e) {
  const n = J(), i = ye(!1);
  if (Ya) {
    const s = new IntersectionObserver((r) => {
      t == null || t(r, s), i.value = !!r.find((o) => o.isIntersecting);
    }, e);
    Ft(() => {
      s.disconnect();
    }), pe(n, (r, o) => {
      o && (s.unobserve(o), i.value = !1), r && s.observe(r);
    }, {
      flush: "post"
    });
  }
  return {
    intersectionRef: n,
    isIntersecting: i
  };
}
function jo(t, e) {
  let n;
  function i() {
    n = uf(), n.run(() => e.length ? e(() => {
      n == null || n.stop(), i();
    }) : e());
  }
  pe(t, (s) => {
    s && !n ? i() : s || (n == null || n.stop(), n = void 0);
  }, {
    immediate: !0
  }), lf(() => {
    n == null || n.stop();
  });
}
function Dt(t, e, n) {
  let i = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : (h) => h, s = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : (h) => h;
  const r = _t("useProxiedModel"), o = J(t[e] !== void 0 ? t[e] : n), a = Vn(e), u = a !== e ? w(() => {
    var h, d, f, g;
    return t[e], !!(((h = r.vnode.props) != null && h.hasOwnProperty(e) || (d = r.vnode.props) != null && d.hasOwnProperty(a)) && ((f = r.vnode.props) != null && f.hasOwnProperty(`onUpdate:${e}`) || (g = r.vnode.props) != null && g.hasOwnProperty(`onUpdate:${a}`)));
  }) : w(() => {
    var h, d;
    return t[e], !!((h = r.vnode.props) != null && h.hasOwnProperty(e) && ((d = r.vnode.props) != null && d.hasOwnProperty(`onUpdate:${e}`)));
  });
  jo(() => !u.value, () => {
    pe(() => t[e], (h) => {
      o.value = h;
    });
  });
  const c = w({
    get() {
      const h = t[e];
      return i(u.value ? h : o.value);
    },
    set(h) {
      const d = s(h), f = $n(u.value ? t[e] : o.value);
      f === d || i(f) === h || (o.value = d, r == null || r.emit(`update:${e}`, d));
    }
  });
  return Object.defineProperty(c, "externalValue", {
    get: () => u.value ? t[e] : o.value
  }), c;
}
const ed = Symbol.for("vuetify:locale");
function Ha() {
  const t = Ye(ed);
  if (!t)
    throw new Error("[Vuetify] Could not find injected locale instance");
  return t;
}
function Un() {
  const t = Ye(ed);
  if (!t)
    throw new Error("[Vuetify] Could not find injected rtl instance");
  return {
    isRtl: t.isRtl,
    rtlClasses: t.rtlClasses
  };
}
const Yu = {
  center: "center",
  top: "bottom",
  bottom: "top",
  left: "right",
  right: "left"
}, $r = B({
  location: String
}, "location");
function Wr(t) {
  let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, n = arguments.length > 2 ? arguments[2] : void 0;
  const {
    isRtl: i
  } = Un();
  return {
    locationStyles: w(() => {
      if (!t.location)
        return {};
      const {
        side: r,
        align: o
      } = _0(t.location.split(" ").length > 1 ? t.location : `${t.location} center`, i.value);
      function a(u) {
        return n ? n(u) : 0;
      }
      const l = {};
      return r !== "center" && (e ? l[Yu[r]] = `calc(100% - ${a(r)}px)` : l[r] = 0), o !== "center" ? e ? l[Yu[o]] = `calc(100% - ${a(o)}px)` : l[o] = 0 : (r === "center" ? l.top = l.left = "50%" : l[{
        top: "left",
        bottom: "left",
        left: "top",
        right: "top"
      }[r]] = "50%", l.transform = {
        top: "translateX(-50%)",
        bottom: "translateX(-50%)",
        left: "translateY(-50%)",
        right: "translateY(-50%)",
        center: "translate(-50%, -50%)"
      }[r]), l;
    })
  };
}
const J0 = B({
  absolute: Boolean,
  active: {
    type: Boolean,
    default: !0
  },
  bgColor: String,
  bgOpacity: [Number, String],
  bufferValue: {
    type: [Number, String],
    default: 0
  },
  clickable: Boolean,
  color: String,
  height: {
    type: [Number, String],
    default: 4
  },
  indeterminate: Boolean,
  max: {
    type: [Number, String],
    default: 100
  },
  modelValue: {
    type: [Number, String],
    default: 0
  },
  reverse: Boolean,
  stream: Boolean,
  striped: Boolean,
  roundedBar: Boolean,
  ...ie(),
  ...$r({
    location: "top"
  }),
  ...wt(),
  ...Le(),
  ...je()
}, "VProgressLinear"), td = Z()({
  name: "VProgressLinear",
  props: J0(),
  emits: {
    "update:modelValue": (t) => !0
  },
  setup(t, e) {
    let {
      slots: n
    } = e;
    const i = Dt(t, "modelValue"), {
      isRtl: s,
      rtlClasses: r
    } = Un(), {
      themeClasses: o
    } = Qe(t), {
      locationStyles: a
    } = Wr(t), {
      textColorClasses: l,
      textColorStyles: u
    } = Cn(t, "color"), {
      backgroundColorClasses: c,
      backgroundColorStyles: h
    } = En(w(() => t.bgColor || t.color)), {
      backgroundColorClasses: d,
      backgroundColorStyles: f
    } = En(t, "color"), {
      roundedClasses: g
    } = St(t), {
      intersectionRef: m,
      isIntersecting: _
    } = Qh(), p = w(() => parseInt(t.max, 10)), y = w(() => parseInt(t.height, 10)), C = w(() => parseFloat(t.bufferValue) / p.value * 100), x = w(() => parseFloat(i.value) / p.value * 100), E = w(() => s.value !== t.reverse), S = w(() => t.indeterminate ? "fade-transition" : "slide-x-transition"), T = w(() => t.bgOpacity == null ? t.bgOpacity : parseFloat(t.bgOpacity));
    function I(b) {
      if (!m.value)
        return;
      const {
        left: D,
        right: P,
        width: A
      } = m.value.getBoundingClientRect(), M = E.value ? A - b.clientX + (P - A) : b.clientX - D;
      i.value = Math.round(M / A * p.value);
    }
    return ne(() => v(t.tag, {
      ref: m,
      class: ["v-progress-linear", {
        "v-progress-linear--absolute": t.absolute,
        "v-progress-linear--active": t.active && _.value,
        "v-progress-linear--reverse": E.value,
        "v-progress-linear--rounded": t.rounded,
        "v-progress-linear--rounded-bar": t.roundedBar,
        "v-progress-linear--striped": t.striped
      }, g.value, o.value, r.value, t.class],
      style: [{
        bottom: t.location === "bottom" ? 0 : void 0,
        top: t.location === "top" ? 0 : void 0,
        height: t.active ? me(y.value) : 0,
        "--v-progress-linear-height": me(y.value),
        ...a.value
      }, t.style],
      role: "progressbar",
      "aria-hidden": t.active ? "false" : "true",
      "aria-valuemin": "0",
      "aria-valuemax": t.max,
      "aria-valuenow": t.indeterminate ? void 0 : x.value,
      onClick: t.clickable && I
    }, {
      default: () => [t.stream && v("div", {
        key: "stream",
        class: ["v-progress-linear__stream", l.value],
        style: {
          ...u.value,
          [E.value ? "left" : "right"]: me(-y.value),
          borderTop: `${me(y.value / 2)} dotted`,
          opacity: T.value,
          top: `calc(50% - ${me(y.value / 4)})`,
          width: me(100 - C.value, "%"),
          "--v-progress-linear-stream-to": me(y.value * (E.value ? 1 : -1))
        }
      }, null), v("div", {
        class: ["v-progress-linear__background", c.value],
        style: [h.value, {
          opacity: T.value,
          width: me(t.stream ? C.value : 100, "%")
        }]
      }, null), v(vr, {
        name: S.value
      }, {
        default: () => [t.indeterminate ? v("div", {
          class: "v-progress-linear__indeterminate"
        }, [["long", "short"].map((b) => v("div", {
          key: b,
          class: ["v-progress-linear__indeterminate", b, d.value],
          style: f.value
        }, null))]) : v("div", {
          class: ["v-progress-linear__determinate", d.value],
          style: [f.value, {
            width: me(x.value, "%")
          }]
        }, null)]
      }), n.default && v("div", {
        class: "v-progress-linear__content"
      }, [n.default({
        value: x.value,
        buffer: C.value
      })])]
    })), {};
  }
}), qa = B({
  loading: [Boolean, String]
}, "loader");
function Ja(t) {
  let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Vt();
  return {
    loaderClasses: w(() => ({
      [`${e}--loading`]: t.loading
    }))
  };
}
function nd(t, e) {
  var i;
  let {
    slots: n
  } = e;
  return v("div", {
    class: `${t.name}__loader`
  }, [((i = n.default) == null ? void 0 : i.call(n, {
    color: t.color,
    isActive: t.active
  })) || v(td, {
    absolute: t.absolute,
    active: t.active,
    color: t.color,
    height: "2",
    indeterminate: !0
  }, null)]);
}
const Q0 = ["static", "relative", "fixed", "absolute", "sticky"], Qa = B({
  position: {
    type: String,
    validator: (
      /* istanbul ignore next */
      (t) => Q0.includes(t)
    )
  }
}, "position");
function el(t) {
  let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Vt();
  return {
    positionClasses: w(() => t.position ? `${e}--${t.position}` : void 0)
  };
}
function ep() {
  const t = _t("useRoute");
  return w(() => {
    var e;
    return (e = t == null ? void 0 : t.proxy) == null ? void 0 : e.$route;
  });
}
function tl(t, e) {
  const n = cf("RouterLink"), i = w(() => !!(t.href || t.to)), s = w(() => (i == null ? void 0 : i.value) || Au(e, "click") || Au(t, "click"));
  if (typeof n == "string")
    return {
      isLink: i,
      isClickable: s,
      href: re(t, "href")
    };
  const r = t.to ? n.useLink(t) : void 0, o = ep();
  return {
    isLink: i,
    isClickable: s,
    route: r == null ? void 0 : r.route,
    navigate: r == null ? void 0 : r.navigate,
    isActive: r && w(() => {
      var a, l, u;
      return t.exact ? o.value ? ((u = r.isExactActive) == null ? void 0 : u.value) && Fr(r.route.value.query, o.value.query) : (l = r.isExactActive) == null ? void 0 : l.value : (a = r.isActive) == null ? void 0 : a.value;
    }),
    href: w(() => t.to ? r == null ? void 0 : r.route.value.href : t.href)
  };
}
const nl = B({
  href: String,
  replace: Boolean,
  to: [String, Object],
  exact: Boolean
}, "router");
const Uo = Symbol("rippleStop"), tp = 80;
function ju(t, e) {
  t.style.transform = e, t.style.webkitTransform = e;
}
function Zo(t) {
  return t.constructor.name === "TouchEvent";
}
function id(t) {
  return t.constructor.name === "KeyboardEvent";
}
const np = function(t, e) {
  var h;
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, i = 0, s = 0;
  if (!id(t)) {
    const d = e.getBoundingClientRect(), f = Zo(t) ? t.touches[t.touches.length - 1] : t;
    i = f.clientX - d.left, s = f.clientY - d.top;
  }
  let r = 0, o = 0.3;
  (h = e._ripple) != null && h.circle ? (o = 0.15, r = e.clientWidth / 2, r = n.center ? r : r + Math.sqrt((i - r) ** 2 + (s - r) ** 2) / 4) : r = Math.sqrt(e.clientWidth ** 2 + e.clientHeight ** 2) / 2;
  const a = `${(e.clientWidth - r * 2) / 2}px`, l = `${(e.clientHeight - r * 2) / 2}px`, u = n.center ? a : `${i - r}px`, c = n.center ? l : `${s - r}px`;
  return {
    radius: r,
    scale: o,
    x: u,
    y: c,
    centerX: a,
    centerY: l
  };
}, gr = {
  /* eslint-disable max-statements */
  show(t, e) {
    var f;
    let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    if (!((f = e == null ? void 0 : e._ripple) != null && f.enabled))
      return;
    const i = document.createElement("span"), s = document.createElement("span");
    i.appendChild(s), i.className = "v-ripple__container", n.class && (i.className += ` ${n.class}`);
    const {
      radius: r,
      scale: o,
      x: a,
      y: l,
      centerX: u,
      centerY: c
    } = np(t, e, n), h = `${r * 2}px`;
    s.className = "v-ripple__animation", s.style.width = h, s.style.height = h, e.appendChild(i);
    const d = window.getComputedStyle(e);
    d && d.position === "static" && (e.style.position = "relative", e.dataset.previousPosition = "static"), s.classList.add("v-ripple__animation--enter"), s.classList.add("v-ripple__animation--visible"), ju(s, `translate(${a}, ${l}) scale3d(${o},${o},${o})`), s.dataset.activated = String(performance.now()), setTimeout(() => {
      s.classList.remove("v-ripple__animation--enter"), s.classList.add("v-ripple__animation--in"), ju(s, `translate(${u}, ${c}) scale3d(1,1,1)`);
    }, 0);
  },
  hide(t) {
    var r;
    if (!((r = t == null ? void 0 : t._ripple) != null && r.enabled))
      return;
    const e = t.getElementsByClassName("v-ripple__animation");
    if (e.length === 0)
      return;
    const n = e[e.length - 1];
    if (n.dataset.isHiding)
      return;
    n.dataset.isHiding = "true";
    const i = performance.now() - Number(n.dataset.activated), s = Math.max(250 - i, 0);
    setTimeout(() => {
      n.classList.remove("v-ripple__animation--in"), n.classList.add("v-ripple__animation--out"), setTimeout(() => {
        var a;
        t.getElementsByClassName("v-ripple__animation").length === 1 && t.dataset.previousPosition && (t.style.position = t.dataset.previousPosition, delete t.dataset.previousPosition), ((a = n.parentNode) == null ? void 0 : a.parentNode) === t && t.removeChild(n.parentNode);
      }, 300);
    }, s);
  }
};
function sd(t) {
  return typeof t > "u" || !!t;
}
function ms(t) {
  const e = {}, n = t.currentTarget;
  if (!(!(n != null && n._ripple) || n._ripple.touched || t[Uo])) {
    if (t[Uo] = !0, Zo(t))
      n._ripple.touched = !0, n._ripple.isTouch = !0;
    else if (n._ripple.isTouch)
      return;
    if (e.center = n._ripple.centered || id(t), n._ripple.class && (e.class = n._ripple.class), Zo(t)) {
      if (n._ripple.showTimerCommit)
        return;
      n._ripple.showTimerCommit = () => {
        gr.show(t, n, e);
      }, n._ripple.showTimer = window.setTimeout(() => {
        var i;
        (i = n == null ? void 0 : n._ripple) != null && i.showTimerCommit && (n._ripple.showTimerCommit(), n._ripple.showTimerCommit = null);
      }, tp);
    } else
      gr.show(t, n, e);
  }
}
function Uu(t) {
  t[Uo] = !0;
}
function nt(t) {
  const e = t.currentTarget;
  if (e != null && e._ripple) {
    if (window.clearTimeout(e._ripple.showTimer), t.type === "touchend" && e._ripple.showTimerCommit) {
      e._ripple.showTimerCommit(), e._ripple.showTimerCommit = null, e._ripple.showTimer = window.setTimeout(() => {
        nt(t);
      });
      return;
    }
    window.setTimeout(() => {
      e._ripple && (e._ripple.touched = !1);
    }), gr.hide(e);
  }
}
function rd(t) {
  const e = t.currentTarget;
  e != null && e._ripple && (e._ripple.showTimerCommit && (e._ripple.showTimerCommit = null), window.clearTimeout(e._ripple.showTimer));
}
let _s = !1;
function od(t) {
  !_s && (t.keyCode === Tu.enter || t.keyCode === Tu.space) && (_s = !0, ms(t));
}
function ad(t) {
  _s = !1, nt(t);
}
function ld(t) {
  _s && (_s = !1, nt(t));
}
function ud(t, e, n) {
  const {
    value: i,
    modifiers: s
  } = e, r = sd(i);
  if (r || gr.hide(t), t._ripple = t._ripple ?? {}, t._ripple.enabled = r, t._ripple.centered = s.center, t._ripple.circle = s.circle, Wo(i) && i.class && (t._ripple.class = i.class), r && !n) {
    if (s.stop) {
      t.addEventListener("touchstart", Uu, {
        passive: !0
      }), t.addEventListener("mousedown", Uu);
      return;
    }
    t.addEventListener("touchstart", ms, {
      passive: !0
    }), t.addEventListener("touchend", nt, {
      passive: !0
    }), t.addEventListener("touchmove", rd, {
      passive: !0
    }), t.addEventListener("touchcancel", nt), t.addEventListener("mousedown", ms), t.addEventListener("mouseup", nt), t.addEventListener("mouseleave", nt), t.addEventListener("keydown", od), t.addEventListener("keyup", ad), t.addEventListener("blur", ld), t.addEventListener("dragstart", nt, {
      passive: !0
    });
  } else
    !r && n && cd(t);
}
function cd(t) {
  t.removeEventListener("mousedown", ms), t.removeEventListener("touchstart", ms), t.removeEventListener("touchend", nt), t.removeEventListener("touchmove", rd), t.removeEventListener("touchcancel", nt), t.removeEventListener("mouseup", nt), t.removeEventListener("mouseleave", nt), t.removeEventListener("keydown", od), t.removeEventListener("keyup", ad), t.removeEventListener("dragstart", nt), t.removeEventListener("blur", ld);
}
function ip(t, e) {
  ud(t, e, !1);
}
function sp(t) {
  delete t._ripple, cd(t);
}
function rp(t, e) {
  if (e.value === e.oldValue)
    return;
  const n = sd(e.oldValue);
  ud(t, e, n);
}
const Xr = {
  mounted: ip,
  unmounted: sp,
  updated: rp
}, op = B({
  appendAvatar: String,
  appendIcon: xe,
  disabled: Boolean,
  flat: Boolean,
  hover: Boolean,
  image: String,
  link: {
    type: Boolean,
    default: void 0
  },
  prependAvatar: String,
  prependIcon: xe,
  ripple: {
    type: [Boolean, Object],
    default: !0
  },
  subtitle: [String, Number],
  text: [String, Number],
  title: [String, Number],
  ...Di(),
  ...ie(),
  ...Tn(),
  ...Mi(),
  ...Yn(),
  ...qa(),
  ...$r(),
  ...Qa(),
  ...wt(),
  ...nl(),
  ...Le(),
  ...je(),
  ...Oi({
    variant: "elevated"
  })
}, "VCard"), Yr = Z()({
  name: "VCard",
  directives: {
    Ripple: Xr
  },
  props: op(),
  setup(t, e) {
    let {
      attrs: n,
      slots: i
    } = e;
    const {
      themeClasses: s
    } = Qe(t), {
      borderClasses: r
    } = Fi(t), {
      colorClasses: o,
      colorStyles: a,
      variantClasses: l
    } = Br(t), {
      densityClasses: u
    } = Xn(t), {
      dimensionStyles: c
    } = ki(t), {
      elevationClasses: h
    } = jn(t), {
      loaderClasses: d
    } = Ja(t), {
      locationStyles: f
    } = Wr(t), {
      positionClasses: g
    } = el(t), {
      roundedClasses: m
    } = St(t), _ = tl(t, n), p = w(() => t.link !== !1 && _.isLink.value), y = w(() => !t.disabled && t.link !== !1 && (t.link || _.isClickable.value));
    return ne(() => {
      const C = p.value ? "a" : t.tag, x = !!(i.title || t.title != null), E = !!(i.subtitle || t.subtitle != null), S = x || E, T = !!(i.append || t.appendAvatar || t.appendIcon), I = !!(i.prepend || t.prependAvatar || t.prependIcon), b = !!(i.image || t.image), D = S || I || T, P = !!(i.text || t.text != null);
      return Xe(v(C, {
        class: ["v-card", {
          "v-card--disabled": t.disabled,
          "v-card--flat": t.flat,
          "v-card--hover": t.hover && !(t.disabled || t.flat),
          "v-card--link": y.value
        }, s.value, r.value, o.value, u.value, h.value, d.value, g.value, m.value, l.value, t.class],
        style: [a.value, c.value, f.value, t.style],
        href: _.href.value,
        onClick: y.value && _.navigate,
        tabindex: t.disabled ? -1 : void 0
      }, {
        default: () => {
          var A;
          return [b && v("div", {
            key: "image",
            class: "v-card__image"
          }, [i.image ? v(kt, {
            key: "image-defaults",
            disabled: !t.image,
            defaults: {
              VImg: {
                cover: !0,
                src: t.image
              }
            }
          }, i.image) : v(wn, {
            key: "image-img",
            cover: !0,
            src: t.image
          }, null)]), v(nd, {
            name: "v-card",
            active: !!t.loading,
            color: typeof t.loading == "boolean" ? void 0 : t.loading
          }, {
            default: i.loader
          }), D && v(q0, {
            key: "item",
            prependAvatar: t.prependAvatar,
            prependIcon: t.prependIcon,
            title: t.title,
            subtitle: t.subtitle,
            appendAvatar: t.appendAvatar,
            appendIcon: t.appendIcon
          }, {
            default: i.item,
            prepend: i.prepend,
            title: i.title,
            subtitle: i.subtitle,
            append: i.append
          }), P && v(Jh, {
            key: "text"
          }, {
            default: () => {
              var M;
              return [((M = i.text) == null ? void 0 : M.call(i)) ?? t.text];
            }
          }), (A = i.default) == null ? void 0 : A.call(i), i.actions && v(F0, null, {
            default: i.actions
          }), zr(y.value, "v-card")];
        }
      }), [[Sn("ripple"), y.value && t.ripple]]);
    }), {};
  }
});
const ap = B({
  fluid: {
    type: Boolean,
    default: !1
  },
  ...ie(),
  ...Le()
}, "VContainer"), nn = Z()({
  name: "VContainer",
  props: ap(),
  setup(t, e) {
    let {
      slots: n
    } = e;
    const {
      rtlClasses: i
    } = Un();
    return ne(() => v(t.tag, {
      class: ["v-container", {
        "v-container--fluid": t.fluid
      }, i.value, t.class],
      style: t.style
    }, n)), {};
  }
}), jr = ["sm", "md", "lg", "xl", "xxl"], lp = Symbol.for("vuetify:display"), up = B({
  mobileBreakpoint: [Number, String]
}, "display");
function cp() {
  let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Vt();
  const n = Ye(lp);
  if (!n)
    throw new Error("Could not find Vuetify display injection");
  const i = w(() => {
    if (!t.mobileBreakpoint)
      return n.mobile.value;
    const r = typeof t.mobileBreakpoint == "number" ? t.mobileBreakpoint : n.thresholds.value[t.mobileBreakpoint];
    return n.width.value < r;
  }), s = w(() => e ? {
    [`${e}--mobile`]: i.value
  } : {});
  return {
    ...n,
    displayClasses: s,
    mobile: i
  };
}
const hd = (() => jr.reduce((t, e) => (t[e] = {
  type: [Boolean, String, Number],
  default: !1
}, t), {}))(), dd = (() => jr.reduce((t, e) => {
  const n = "offset" + xs(e);
  return t[n] = {
    type: [String, Number],
    default: null
  }, t;
}, {}))(), fd = (() => jr.reduce((t, e) => {
  const n = "order" + xs(e);
  return t[n] = {
    type: [String, Number],
    default: null
  }, t;
}, {}))(), Zu = {
  col: Object.keys(hd),
  offset: Object.keys(dd),
  order: Object.keys(fd)
};
function hp(t, e, n) {
  let i = t;
  if (!(n == null || n === !1)) {
    if (e) {
      const s = e.replace(t, "");
      i += `-${s}`;
    }
    return t === "col" && (i = "v-" + i), t === "col" && (n === "" || n === !0) || (i += `-${n}`), i.toLowerCase();
  }
}
const dp = ["auto", "start", "end", "center", "baseline", "stretch"], fp = B({
  cols: {
    type: [Boolean, String, Number],
    default: !1
  },
  ...hd,
  offset: {
    type: [String, Number],
    default: null
  },
  ...dd,
  order: {
    type: [String, Number],
    default: null
  },
  ...fd,
  alignSelf: {
    type: String,
    default: null,
    validator: (t) => dp.includes(t)
  },
  ...ie(),
  ...Le()
}, "VCol"), vi = Z()({
  name: "VCol",
  props: fp(),
  setup(t, e) {
    let {
      slots: n
    } = e;
    const i = w(() => {
      const s = [];
      let r;
      for (r in Zu)
        Zu[r].forEach((a) => {
          const l = t[a], u = hp(r, a, l);
          u && s.push(u);
        });
      const o = s.some((a) => a.startsWith("v-col-"));
      return s.push({
        // Default to .v-col if no other col-{bp}-* classes generated nor `cols` specified.
        "v-col": !o || !t.cols,
        [`v-col-${t.cols}`]: t.cols,
        [`offset-${t.offset}`]: t.offset,
        [`order-${t.order}`]: t.order,
        [`align-self-${t.alignSelf}`]: t.alignSelf
      }), s;
    });
    return () => {
      var s;
      return bi(t.tag, {
        class: [i.value, t.class],
        style: t.style
      }, (s = n.default) == null ? void 0 : s.call(n));
    };
  }
}), il = ["start", "end", "center"], gd = ["space-between", "space-around", "space-evenly"];
function sl(t, e) {
  return jr.reduce((n, i) => {
    const s = t + xs(i);
    return n[s] = e(), n;
  }, {});
}
const gp = [...il, "baseline", "stretch"], md = (t) => gp.includes(t), _d = sl("align", () => ({
  type: String,
  default: null,
  validator: md
})), mp = [...il, ...gd], vd = (t) => mp.includes(t), yd = sl("justify", () => ({
  type: String,
  default: null,
  validator: vd
})), _p = [...il, ...gd, "stretch"], pd = (t) => _p.includes(t), xd = sl("alignContent", () => ({
  type: String,
  default: null,
  validator: pd
})), Ku = {
  align: Object.keys(_d),
  justify: Object.keys(yd),
  alignContent: Object.keys(xd)
}, vp = {
  align: "align",
  justify: "justify",
  alignContent: "align-content"
};
function yp(t, e, n) {
  let i = vp[t];
  if (n != null) {
    if (e) {
      const s = e.replace(t, "");
      i += `-${s}`;
    }
    return i += `-${n}`, i.toLowerCase();
  }
}
const pp = B({
  dense: Boolean,
  noGutters: Boolean,
  align: {
    type: String,
    default: null,
    validator: md
  },
  ..._d,
  justify: {
    type: String,
    default: null,
    validator: vd
  },
  ...yd,
  alignContent: {
    type: String,
    default: null,
    validator: pd
  },
  ...xd,
  ...ie(),
  ...Le()
}, "VRow"), Ko = Z()({
  name: "VRow",
  props: pp(),
  setup(t, e) {
    let {
      slots: n
    } = e;
    const i = w(() => {
      const s = [];
      let r;
      for (r in Ku)
        Ku[r].forEach((o) => {
          const a = t[o], l = yp(r, o, a);
          l && s.push(l);
        });
      return s.push({
        "v-row--no-gutters": t.noGutters,
        "v-row--dense": t.dense,
        [`align-${t.align}`]: t.align,
        [`justify-${t.justify}`]: t.justify,
        [`align-content-${t.alignContent}`]: t.alignContent
      }), s;
    });
    return () => {
      var s;
      return bi(t.tag, {
        class: ["v-row", i.value, t.class],
        style: t.style
      }, (s = n.default) == null ? void 0 : s.call(n));
    };
  }
}), xp = ["innerHTML"], x1 = {
  __name: "Map",
  props: ["content", "info"],
  setup(t) {
    const { getText: e } = Ls();
    let n = J(null);
    return bn(() => {
      const i = new iy({
        geometry: new Dc(Ol(t.content.coordinates))
      }), s = new Ji({
        image: new Oa({
          anchor: [0.5, 46],
          anchorXUnits: "fraction",
          anchorYUnits: "pixels",
          src: `https://generic-be-test.replit.app//colorize-image?color=%23${t.info.primaryColor.substring(1)}`
        })
      });
      i.setStyle(s);
      const r = new l0({
        features: [i]
      }), o = new t0({
        source: r
      });
      new _v({
        target: n.value,
        layers: [
          new gy({
            source: new ty()
          }),
          o
        ],
        view: new Tt({
          center: Ol(t.content.coordinates),
          zoom: t.content.zoom
        })
      });
    }), (i, s) => (le(), Te(nn, null, {
      default: U(() => [
        v(Yr, { elevation: "20" }, {
          default: U(() => [
            v(nn, null, {
              default: U(() => [
                Ie("h3", {
                  style: Gn({ color: t.info.primaryColor }),
                  innerHTML: te(e)(t.content.title) || "Puoi venirci a conoscere qui"
                }, null, 12, xp),
                Ie("div", {
                  ref_key: "mapContainer",
                  ref: n,
                  style: { width: "100%", height: "400px" }
                }, null, 512)
              ]),
              _: 1
            })
          ]),
          _: 1
        })
      ]),
      _: 1
    }));
  }
}, C1 = {
  __name: "Line",
  props: ["info"],
  setup(t) {
    return (e, n) => (le(), Te(nn, null, {
      default: U(() => [
        Ie("hr", {
          style: Gn({ height: "5px", backgroundColor: t.info.primaryColor })
        }, null, 4)
      ]),
      _: 1
    }));
  }
};
function Ur() {
  const t = J(!1), e = () => {
    t.value = window.innerWidth < 600;
  };
  return bn(() => {
    e(), window.addEventListener("resize", e);
  }), Ft(() => {
    window.removeEventListener("resize", e);
  }), { isMobile: t, resolveImg: (i) => typeof i == "string" ? i : typeof i == "object" ? t.value ? i.mobile : i.desktop : "" };
}
const Zr = (t, e) => {
  const n = t.__vccOpts || t;
  for (const [i, s] of e)
    n[i] = s;
  return n;
};
const Cd = B({
  divided: Boolean,
  ...Di(),
  ...ie(),
  ...Tn(),
  ...Yn(),
  ...wt(),
  ...Le(),
  ...je(),
  ...Oi()
}, "VBtnGroup"), Hu = Z()({
  name: "VBtnGroup",
  props: Cd(),
  setup(t, e) {
    let {
      slots: n
    } = e;
    const {
      themeClasses: i
    } = Qe(t), {
      densityClasses: s
    } = Xn(t), {
      borderClasses: r
    } = Fi(t), {
      elevationClasses: o
    } = jn(t), {
      roundedClasses: a
    } = St(t);
    Pi({
      VBtn: {
        height: "auto",
        color: re(t, "color"),
        density: re(t, "density"),
        flat: !0,
        variant: re(t, "variant")
      }
    }), ne(() => v(t.tag, {
      class: ["v-btn-group", {
        "v-btn-group--divided": t.divided
      }, i.value, r.value, s.value, o.value, a.value, t.class],
      style: t.style
    }, n));
  }
}), rl = B({
  modelValue: {
    type: null,
    default: void 0
  },
  multiple: Boolean,
  mandatory: [Boolean, String],
  max: Number,
  selectedClass: String,
  disabled: Boolean
}, "group"), Kr = B({
  value: null,
  disabled: Boolean,
  selectedClass: String
}, "group-item");
function Hr(t, e) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0;
  const i = _t("useGroupItem");
  if (!i)
    throw new Error("[Vuetify] useGroupItem composable must be used inside a component setup function");
  const s = Ai();
  mt(Symbol.for(`${e.description}:id`), s);
  const r = Ye(e, null);
  if (!r) {
    if (!n)
      return r;
    throw new Error(`[Vuetify] Could not find useGroup injection with symbol ${e.description}`);
  }
  const o = re(t, "value"), a = w(() => !!(r.disabled.value || t.disabled));
  r.register({
    id: s,
    value: o,
    disabled: a
  }, i), Ft(() => {
    r.unregister(s);
  });
  const l = w(() => r.isSelected(s)), u = w(() => l.value && [r.selectedClass.value, t.selectedClass]);
  return pe(l, (c) => {
    i.emit("group:selected", {
      value: c
    });
  }), {
    id: s,
    isSelected: l,
    toggle: () => r.select(s, !l.value),
    select: (c) => r.select(s, c),
    selectedClass: u,
    value: o,
    disabled: a,
    group: r
  };
}
function qr(t, e) {
  let n = !1;
  const i = sc([]), s = Dt(t, "modelValue", [], (d) => d == null ? [] : Ed(i, es(d)), (d) => {
    const f = Ep(i, d);
    return t.multiple ? f : f[0];
  }), r = _t("useGroup");
  function o(d, f) {
    const g = d, m = Symbol.for(`${e.description}:id`), p = Js(m, r == null ? void 0 : r.vnode).indexOf(f);
    te(g.value) == null && (g.value = p), p > -1 ? i.splice(p, 0, g) : i.push(g);
  }
  function a(d) {
    if (n)
      return;
    l();
    const f = i.findIndex((g) => g.id === d);
    i.splice(f, 1);
  }
  function l() {
    const d = i.find((f) => !f.disabled);
    d && t.mandatory === "force" && !s.value.length && (s.value = [d.id]);
  }
  bn(() => {
    l();
  }), Ft(() => {
    n = !0;
  });
  function u(d, f) {
    const g = i.find((m) => m.id === d);
    if (!(f && (g != null && g.disabled)))
      if (t.multiple) {
        const m = s.value.slice(), _ = m.findIndex((y) => y === d), p = ~_;
        if (f = f ?? !p, p && t.mandatory && m.length <= 1 || !p && t.max != null && m.length + 1 > t.max)
          return;
        _ < 0 && f ? m.push(d) : _ >= 0 && !f && m.splice(_, 1), s.value = m;
      } else {
        const m = s.value.includes(d);
        if (t.mandatory && m)
          return;
        s.value = f ?? !m ? [d] : [];
      }
  }
  function c(d) {
    if (t.multiple && _i('This method is not supported when using "multiple" prop'), s.value.length) {
      const f = s.value[0], g = i.findIndex((p) => p.id === f);
      let m = (g + d) % i.length, _ = i[m];
      for (; _.disabled && m !== g; )
        m = (m + d) % i.length, _ = i[m];
      if (_.disabled)
        return;
      s.value = [i[m].id];
    } else {
      const f = i.find((g) => !g.disabled);
      f && (s.value = [f.id]);
    }
  }
  const h = {
    register: o,
    unregister: a,
    selected: s,
    select: u,
    disabled: re(t, "disabled"),
    prev: () => c(i.length - 1),
    next: () => c(1),
    isSelected: (d) => s.value.includes(d),
    selectedClass: w(() => t.selectedClass),
    items: w(() => i),
    getItemIndex: (d) => Cp(i, d)
  };
  return mt(e, h), h;
}
function Cp(t, e) {
  const n = Ed(t, [e]);
  return n.length ? t.findIndex((i) => i.id === n[0]) : -1;
}
function Ed(t, e) {
  const n = [];
  return e.forEach((i) => {
    const s = t.find((o) => Fr(i, o.value)), r = t[i];
    (s == null ? void 0 : s.value) != null ? n.push(s.id) : r != null && n.push(r.id);
  }), n;
}
function Ep(t, e) {
  const n = [];
  return e.forEach((i) => {
    const s = t.findIndex((r) => r.id === i);
    if (~s) {
      const r = t[s];
      n.push(r.value != null ? r.value : s);
    }
  }), n;
}
const wd = Symbol.for("vuetify:v-btn-toggle"), wp = B({
  ...Cd(),
  ...rl()
}, "VBtnToggle");
Z()({
  name: "VBtnToggle",
  props: wp(),
  emits: {
    "update:modelValue": (t) => !0
  },
  setup(t, e) {
    let {
      slots: n
    } = e;
    const {
      isSelected: i,
      next: s,
      prev: r,
      select: o,
      selected: a
    } = qr(t, wd);
    return ne(() => {
      const l = Hu.filterProps(t);
      return v(Hu, Oe({
        class: ["v-btn-toggle", t.class]
      }, l, {
        style: t.style
      }), {
        default: () => {
          var u;
          return [(u = n.default) == null ? void 0 : u.call(n, {
            isSelected: i,
            next: s,
            prev: r,
            select: o,
            selected: a
          })];
        }
      });
    }), {
      next: s,
      prev: r,
      select: o
    };
  }
});
function Ho(t) {
  let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "content";
  const n = J(), i = J();
  if (Xa) {
    const s = new ResizeObserver((r) => {
      t == null || t(r, s), r.length && (e === "content" ? i.value = r[0].contentRect : i.value = r[0].target.getBoundingClientRect());
    });
    Ft(() => {
      s.disconnect();
    }), pe(n, (r, o) => {
      o && (s.unobserve(Iu(o)), i.value = void 0), r && s.observe(Iu(r));
    }, {
      flush: "post"
    });
  }
  return {
    resizeRef: n,
    contentRect: uc(i)
  };
}
const Sp = B({
  bgColor: String,
  color: String,
  indeterminate: [Boolean, String],
  modelValue: {
    type: [Number, String],
    default: 0
  },
  rotate: {
    type: [Number, String],
    default: 0
  },
  width: {
    type: [Number, String],
    default: 4
  },
  ...ie(),
  ...Vr(),
  ...Le({
    tag: "div"
  }),
  ...je()
}, "VProgressCircular"), bp = Z()({
  name: "VProgressCircular",
  props: Sp(),
  setup(t, e) {
    let {
      slots: n
    } = e;
    const i = 20, s = 2 * Math.PI * i, r = J(), {
      themeClasses: o
    } = Qe(t), {
      sizeClasses: a,
      sizeStyles: l
    } = Gr(t), {
      textColorClasses: u,
      textColorStyles: c
    } = Cn(re(t, "color")), {
      textColorClasses: h,
      textColorStyles: d
    } = Cn(re(t, "bgColor")), {
      intersectionRef: f,
      isIntersecting: g
    } = Qh(), {
      resizeRef: m,
      contentRect: _
    } = Ho(), p = w(() => Math.max(0, Math.min(100, parseFloat(t.modelValue)))), y = w(() => Number(t.width)), C = w(() => l.value ? Number(t.size) : _.value ? _.value.width : Math.max(y.value, 32)), x = w(() => i / (1 - y.value / C.value) * 2), E = w(() => y.value / C.value * x.value), S = w(() => me((100 - p.value) / 100 * s));
    return _r(() => {
      f.value = r.value, m.value = r.value;
    }), ne(() => v(t.tag, {
      ref: r,
      class: ["v-progress-circular", {
        "v-progress-circular--indeterminate": !!t.indeterminate,
        "v-progress-circular--visible": g.value,
        "v-progress-circular--disable-shrink": t.indeterminate === "disable-shrink"
      }, o.value, a.value, u.value, t.class],
      style: [l.value, c.value, t.style],
      role: "progressbar",
      "aria-valuemin": "0",
      "aria-valuemax": "100",
      "aria-valuenow": t.indeterminate ? void 0 : p.value
    }, {
      default: () => [v("svg", {
        style: {
          transform: `rotate(calc(-90deg + ${Number(t.rotate)}deg))`
        },
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: `0 0 ${x.value} ${x.value}`
      }, [v("circle", {
        class: ["v-progress-circular__underlay", h.value],
        style: d.value,
        fill: "transparent",
        cx: "50%",
        cy: "50%",
        r: i,
        "stroke-width": E.value,
        "stroke-dasharray": s,
        "stroke-dashoffset": 0
      }, null), v("circle", {
        class: "v-progress-circular__overlay",
        fill: "transparent",
        cx: "50%",
        cy: "50%",
        r: i,
        "stroke-width": E.value,
        "stroke-dasharray": s,
        "stroke-dashoffset": S.value
      }, null)]), n.default && v("div", {
        class: "v-progress-circular__content"
      }, [n.default({
        value: p.value
      })])]
    })), {};
  }
});
function Ip(t, e) {
  pe(() => {
    var n;
    return (n = t.isActive) == null ? void 0 : n.value;
  }, (n) => {
    t.isLink.value && n && e && Ht(() => {
      e(!0);
    });
  }, {
    immediate: !0
  });
}
const Tp = B({
  active: {
    type: Boolean,
    default: void 0
  },
  symbol: {
    type: null,
    default: wd
  },
  flat: Boolean,
  icon: [Boolean, String, Function, Object],
  prependIcon: xe,
  appendIcon: xe,
  block: Boolean,
  slim: Boolean,
  stacked: Boolean,
  ripple: {
    type: [Boolean, Object],
    default: !0
  },
  text: String,
  ...Di(),
  ...ie(),
  ...Tn(),
  ...Mi(),
  ...Yn(),
  ...Kr(),
  ...qa(),
  ...$r(),
  ...Qa(),
  ...wt(),
  ...nl(),
  ...Vr(),
  ...Le({
    tag: "button"
  }),
  ...je(),
  ...Oi({
    variant: "elevated"
  })
}, "VBtn"), vs = Z()({
  name: "VBtn",
  directives: {
    Ripple: Xr
  },
  props: Tp(),
  emits: {
    "group:selected": (t) => !0
  },
  setup(t, e) {
    let {
      attrs: n,
      slots: i
    } = e;
    const {
      themeClasses: s
    } = Qe(t), {
      borderClasses: r
    } = Fi(t), {
      colorClasses: o,
      colorStyles: a,
      variantClasses: l
    } = Br(t), {
      densityClasses: u
    } = Xn(t), {
      dimensionStyles: c
    } = ki(t), {
      elevationClasses: h
    } = jn(t), {
      loaderClasses: d
    } = Ja(t), {
      locationStyles: f
    } = Wr(t), {
      positionClasses: g
    } = el(t), {
      roundedClasses: m
    } = St(t), {
      sizeClasses: _,
      sizeStyles: p
    } = Gr(t), y = Hr(t, t.symbol, !1), C = tl(t, n), x = w(() => {
      var b;
      return t.active !== void 0 ? t.active : C.isLink.value ? (b = C.isActive) == null ? void 0 : b.value : y == null ? void 0 : y.isSelected.value;
    }), E = w(() => (y == null ? void 0 : y.disabled.value) || t.disabled), S = w(() => t.variant === "elevated" && !(t.disabled || t.flat || t.border)), T = w(() => {
      if (!(t.value === void 0 || typeof t.value == "symbol"))
        return Object(t.value) === t.value ? JSON.stringify(t.value, null, 0) : t.value;
    });
    function I(b) {
      var D;
      E.value || C.isLink.value && (b.metaKey || b.ctrlKey || b.shiftKey || b.button !== 0 || n.target === "_blank") || ((D = C.navigate) == null || D.call(C, b), y == null || y.toggle());
    }
    return Ip(C, y == null ? void 0 : y.select), ne(() => {
      var k, V;
      const b = C.isLink.value ? "a" : t.tag, D = !!(t.prependIcon || i.prepend), P = !!(t.appendIcon || i.append), A = !!(t.icon && t.icon !== !0), M = (y == null ? void 0 : y.isSelected.value) && (!C.isLink.value || ((k = C.isActive) == null ? void 0 : k.value)) || !y || ((V = C.isActive) == null ? void 0 : V.value);
      return Xe(v(b, {
        type: b === "a" ? void 0 : "button",
        class: ["v-btn", y == null ? void 0 : y.selectedClass.value, {
          "v-btn--active": x.value,
          "v-btn--block": t.block,
          "v-btn--disabled": E.value,
          "v-btn--elevated": S.value,
          "v-btn--flat": t.flat,
          "v-btn--icon": !!t.icon,
          "v-btn--loading": t.loading,
          "v-btn--slim": t.slim,
          "v-btn--stacked": t.stacked
        }, s.value, r.value, M ? o.value : void 0, u.value, h.value, d.value, g.value, m.value, _.value, l.value, t.class],
        style: [M ? a.value : void 0, c.value, f.value, p.value, t.style],
        disabled: E.value || void 0,
        href: C.href.value,
        onClick: I,
        value: T.value
      }, {
        default: () => {
          var O;
          return [zr(!0, "v-btn"), !t.icon && D && v("span", {
            key: "prepend",
            class: "v-btn__prepend"
          }, [i.prepend ? v(kt, {
            key: "prepend-defaults",
            disabled: !t.prependIcon,
            defaults: {
              VIcon: {
                icon: t.prependIcon
              }
            }
          }, i.prepend) : v(We, {
            key: "prepend-icon",
            icon: t.prependIcon
          }, null)]), v("span", {
            class: "v-btn__content",
            "data-no-activator": ""
          }, [!i.default && A ? v(We, {
            key: "content-icon",
            icon: t.icon
          }, null) : v(kt, {
            key: "content-defaults",
            disabled: !A,
            defaults: {
              VIcon: {
                icon: t.icon
              }
            }
          }, {
            default: () => {
              var G;
              return [((G = i.default) == null ? void 0 : G.call(i)) ?? t.text];
            }
          })]), !t.icon && P && v("span", {
            key: "append",
            class: "v-btn__append"
          }, [i.append ? v(kt, {
            key: "append-defaults",
            disabled: !t.appendIcon,
            defaults: {
              VIcon: {
                icon: t.appendIcon
              }
            }
          }, i.append) : v(We, {
            key: "append-icon",
            icon: t.appendIcon
          }, null)]), !!t.loading && v("span", {
            key: "loader",
            class: "v-btn__loader"
          }, [((O = i.loader) == null ? void 0 : O.call(i)) ?? v(bp, {
            color: typeof t.loading == "boolean" ? void 0 : t.loading,
            indeterminate: !0,
            size: "23",
            width: "2"
          }, null)])];
        }
      }), [[Sn("ripple"), !E.value && t.ripple, null]]);
    }), {
      group: y
    };
  }
});
const Rp = (t) => {
  const {
    touchstartX: e,
    touchendX: n,
    touchstartY: i,
    touchendY: s
  } = t, r = 0.5, o = 16;
  t.offsetX = n - e, t.offsetY = s - i, Math.abs(t.offsetY) < r * Math.abs(t.offsetX) && (t.left && n < e - o && t.left(t), t.right && n > e + o && t.right(t)), Math.abs(t.offsetX) < r * Math.abs(t.offsetY) && (t.up && s < i - o && t.up(t), t.down && s > i + o && t.down(t));
};
function Lp(t, e) {
  var i;
  const n = t.changedTouches[0];
  e.touchstartX = n.clientX, e.touchstartY = n.clientY, (i = e.start) == null || i.call(e, {
    originalEvent: t,
    ...e
  });
}
function Ap(t, e) {
  var i;
  const n = t.changedTouches[0];
  e.touchendX = n.clientX, e.touchendY = n.clientY, (i = e.end) == null || i.call(e, {
    originalEvent: t,
    ...e
  }), Rp(e);
}
function Pp(t, e) {
  var i;
  const n = t.changedTouches[0];
  e.touchmoveX = n.clientX, e.touchmoveY = n.clientY, (i = e.move) == null || i.call(e, {
    originalEvent: t,
    ...e
  });
}
function Mp() {
  let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  const e = {
    touchstartX: 0,
    touchstartY: 0,
    touchendX: 0,
    touchendY: 0,
    touchmoveX: 0,
    touchmoveY: 0,
    offsetX: 0,
    offsetY: 0,
    left: t.left,
    right: t.right,
    up: t.up,
    down: t.down,
    start: t.start,
    move: t.move,
    end: t.end
  };
  return {
    touchstart: (n) => Lp(n, e),
    touchend: (n) => Ap(n, e),
    touchmove: (n) => Pp(n, e)
  };
}
function kp(t, e) {
  var a;
  const n = e.value, i = n != null && n.parent ? t.parentElement : t, s = (n == null ? void 0 : n.options) ?? {
    passive: !0
  }, r = (a = e.instance) == null ? void 0 : a.$.uid;
  if (!i || !r)
    return;
  const o = Mp(e.value);
  i._touchHandlers = i._touchHandlers ?? /* @__PURE__ */ Object.create(null), i._touchHandlers[r] = o, Dh(o).forEach((l) => {
    i.addEventListener(l, o[l], s);
  });
}
function Op(t, e) {
  var r, o;
  const n = (r = e.value) != null && r.parent ? t.parentElement : t, i = (o = e.instance) == null ? void 0 : o.$.uid;
  if (!(n != null && n._touchHandlers) || !i)
    return;
  const s = n._touchHandlers[i];
  Dh(s).forEach((a) => {
    n.removeEventListener(a, s[a]);
  }), delete n._touchHandlers[i];
}
const Sd = {
  mounted: kp,
  unmounted: Op
}, Dp = Sd, bd = Symbol.for("vuetify:v-window"), Id = Symbol.for("vuetify:v-window-group"), Td = B({
  continuous: Boolean,
  nextIcon: {
    type: [Boolean, String, Function, Object],
    default: "$next"
  },
  prevIcon: {
    type: [Boolean, String, Function, Object],
    default: "$prev"
  },
  reverse: Boolean,
  showArrows: {
    type: [Boolean, String],
    validator: (t) => typeof t == "boolean" || t === "hover"
  },
  touch: {
    type: [Object, Boolean],
    default: void 0
  },
  direction: {
    type: String,
    default: "horizontal"
  },
  modelValue: null,
  disabled: Boolean,
  selectedClass: {
    type: String,
    default: "v-window-item--active"
  },
  // TODO: mandatory should probably not be exposed but do this for now
  mandatory: {
    type: [Boolean, String],
    default: "force"
  },
  ...ie(),
  ...Le(),
  ...je()
}, "VWindow"), qu = Z()({
  name: "VWindow",
  directives: {
    Touch: Sd
  },
  props: Td(),
  emits: {
    "update:modelValue": (t) => !0
  },
  setup(t, e) {
    let {
      slots: n
    } = e;
    const {
      themeClasses: i
    } = Qe(t), {
      isRtl: s
    } = Un(), {
      t: r
    } = Ha(), o = qr(t, Id), a = J(), l = w(() => s.value ? !t.reverse : t.reverse), u = ye(!1), c = w(() => {
      const x = t.direction === "vertical" ? "y" : "x", S = (l.value ? !u.value : u.value) ? "-reverse" : "";
      return `v-window-${x}${S}-transition`;
    }), h = ye(0), d = J(void 0), f = w(() => o.items.value.findIndex((x) => o.selected.value.includes(x.id)));
    pe(f, (x, E) => {
      const S = o.items.value.length, T = S - 1;
      S <= 2 ? u.value = x < E : x === T && E === 0 ? u.value = !0 : x === 0 && E === T ? u.value = !1 : u.value = x < E;
    }), mt(bd, {
      transition: c,
      isReversed: u,
      transitionCount: h,
      transitionHeight: d,
      rootRef: a
    });
    const g = w(() => t.continuous || f.value !== 0), m = w(() => t.continuous || f.value !== o.items.value.length - 1);
    function _() {
      g.value && o.prev();
    }
    function p() {
      m.value && o.next();
    }
    const y = w(() => {
      const x = [], E = {
        icon: s.value ? t.nextIcon : t.prevIcon,
        class: `v-window__${l.value ? "right" : "left"}`,
        onClick: o.prev,
        "aria-label": r("$vuetify.carousel.prev")
      };
      x.push(g.value ? n.prev ? n.prev({
        props: E
      }) : v(vs, E, null) : v("div", null, null));
      const S = {
        icon: s.value ? t.prevIcon : t.nextIcon,
        class: `v-window__${l.value ? "left" : "right"}`,
        onClick: o.next,
        "aria-label": r("$vuetify.carousel.next")
      };
      return x.push(m.value ? n.next ? n.next({
        props: S
      }) : v(vs, S, null) : v("div", null, null)), x;
    }), C = w(() => t.touch === !1 ? t.touch : {
      ...{
        left: () => {
          l.value ? _() : p();
        },
        right: () => {
          l.value ? p() : _();
        },
        start: (E) => {
          let {
            originalEvent: S
          } = E;
          S.stopPropagation();
        }
      },
      ...t.touch === !0 ? {} : t.touch
    });
    return ne(() => Xe(v(t.tag, {
      ref: a,
      class: ["v-window", {
        "v-window--show-arrows-on-hover": t.showArrows === "hover"
      }, i.value, t.class],
      style: t.style
    }, {
      default: () => {
        var x, E;
        return [v("div", {
          class: "v-window__container",
          style: {
            height: d.value
          }
        }, [(x = n.default) == null ? void 0 : x.call(n, {
          group: o
        }), t.showArrows !== !1 && v("div", {
          class: "v-window__controls"
        }, [y.value])]), (E = n.additional) == null ? void 0 : E.call(n, {
          group: o
        })];
      }
    }), [[Sn("touch"), C.value]])), {
      group: o
    };
  }
}), Fp = B({
  color: String,
  cycle: Boolean,
  delimiterIcon: {
    type: xe,
    default: "$delimiter"
  },
  height: {
    type: [Number, String],
    default: 500
  },
  hideDelimiters: Boolean,
  hideDelimiterBackground: Boolean,
  interval: {
    type: [Number, String],
    default: 6e3,
    validator: (t) => Number(t) > 0
  },
  progress: [Boolean, String],
  verticalDelimiters: [Boolean, String],
  ...Td({
    continuous: !0,
    mandatory: "force",
    showArrows: !0
  })
}, "VCarousel"), qo = Z()({
  name: "VCarousel",
  props: Fp(),
  emits: {
    "update:modelValue": (t) => !0
  },
  setup(t, e) {
    let {
      slots: n
    } = e;
    const i = Dt(t, "modelValue"), {
      t: s
    } = Ha(), r = J();
    let o = -1;
    pe(i, l), pe(() => t.interval, l), pe(() => t.cycle, (u) => {
      u ? l() : window.clearTimeout(o);
    }), bn(a);
    function a() {
      !t.cycle || !r.value || (o = window.setTimeout(r.value.group.next, +t.interval > 0 ? +t.interval : 6e3));
    }
    function l() {
      window.clearTimeout(o), window.requestAnimationFrame(a);
    }
    return ne(() => {
      const u = qu.filterProps(t);
      return v(qu, Oe({
        ref: r
      }, u, {
        modelValue: i.value,
        "onUpdate:modelValue": (c) => i.value = c,
        class: ["v-carousel", {
          "v-carousel--hide-delimiter-background": t.hideDelimiterBackground,
          "v-carousel--vertical-delimiters": t.verticalDelimiters
        }, t.class],
        style: [{
          height: me(t.height)
        }, t.style]
      }), {
        default: n.default,
        additional: (c) => {
          let {
            group: h
          } = c;
          return v(Ee, null, [!t.hideDelimiters && v("div", {
            class: "v-carousel__controls",
            style: {
              left: t.verticalDelimiters === "left" && t.verticalDelimiters ? 0 : "auto",
              right: t.verticalDelimiters === "right" ? 0 : "auto"
            }
          }, [h.items.value.length > 0 && v(kt, {
            defaults: {
              VBtn: {
                color: t.color,
                icon: t.delimiterIcon,
                size: "x-small",
                variant: "text"
              }
            },
            scoped: !0
          }, {
            default: () => [h.items.value.map((d, f) => {
              const g = {
                id: `carousel-item-${d.id}`,
                "aria-label": s("$vuetify.carousel.ariaLabel.delimiter", f + 1, h.items.value.length),
                class: ["v-carousel__controls__item", h.isSelected(d.id) && "v-btn--active"],
                onClick: () => h.select(d.id, !0)
              };
              return n.item ? n.item({
                props: g,
                item: d
              }) : v(vs, Oe(d, g), null);
            })]
          })]), t.progress && v(td, {
            class: "v-carousel__progress",
            color: typeof t.progress == "string" ? t.progress : void 0,
            modelValue: (h.getItemIndex(i.value) + 1) / h.items.value.length * 100
          }, null)]);
        },
        prev: n.prev,
        next: n.next
      });
    }), {};
  }
}), ol = B({
  eager: Boolean
}, "lazy");
function Rd(t, e) {
  const n = ye(!1), i = w(() => n.value || t.eager || e.value);
  pe(e, () => n.value = !0);
  function s() {
    t.eager || (n.value = !1);
  }
  return {
    isBooted: n,
    hasContent: i,
    onAfterLeave: s
  };
}
function Ld() {
  const t = ye(!1);
  return bn(() => {
    window.requestAnimationFrame(() => {
      t.value = !0;
    });
  }), {
    ssrBootStyles: w(() => t.value ? void 0 : {
      transition: "none !important"
    }),
    isBooted: uc(t)
  };
}
const Ad = B({
  reverseTransition: {
    type: [Boolean, String],
    default: void 0
  },
  transition: {
    type: [Boolean, String],
    default: void 0
  },
  ...ie(),
  ...Kr(),
  ...ol()
}, "VWindowItem"), Ju = Z()({
  name: "VWindowItem",
  directives: {
    Touch: Dp
  },
  props: Ad(),
  emits: {
    "group:selected": (t) => !0
  },
  setup(t, e) {
    let {
      slots: n
    } = e;
    const i = Ye(bd), s = Hr(t, Id), {
      isBooted: r
    } = Ld();
    if (!i || !s)
      throw new Error("[Vuetify] VWindowItem must be used inside VWindow");
    const o = ye(!1), a = w(() => r.value && (i.isReversed.value ? t.reverseTransition !== !1 : t.transition !== !1));
    function l() {
      !o.value || !i || (o.value = !1, i.transitionCount.value > 0 && (i.transitionCount.value -= 1, i.transitionCount.value === 0 && (i.transitionHeight.value = void 0)));
    }
    function u() {
      var g;
      o.value || !i || (o.value = !0, i.transitionCount.value === 0 && (i.transitionHeight.value = me((g = i.rootRef.value) == null ? void 0 : g.clientHeight)), i.transitionCount.value += 1);
    }
    function c() {
      l();
    }
    function h(g) {
      o.value && Ht(() => {
        !a.value || !o.value || !i || (i.transitionHeight.value = me(g.clientHeight));
      });
    }
    const d = w(() => {
      const g = i.isReversed.value ? t.reverseTransition : t.transition;
      return a.value ? {
        name: typeof g != "string" ? i.transition.value : g,
        onBeforeEnter: u,
        onAfterEnter: l,
        onEnterCancelled: c,
        onBeforeLeave: u,
        onAfterLeave: l,
        onLeaveCancelled: c,
        onEnter: h
      } : !1;
    }), {
      hasContent: f
    } = Rd(t, s.isSelected);
    return ne(() => v(vn, {
      transition: d.value,
      disabled: !r.value
    }, {
      default: () => {
        var g;
        return [Xe(v("div", {
          class: ["v-window-item", s.selectedClass.value, t.class],
          style: t.style
        }, [f.value && ((g = n.default) == null ? void 0 : g.call(n))]), [[Ii, s.isSelected.value]])];
      }
    })), {
      groupItem: s
    };
  }
}), Np = B({
  ...qh(),
  ...Ad()
}, "VCarouselItem"), Jo = Z()({
  name: "VCarouselItem",
  inheritAttrs: !1,
  props: Np(),
  setup(t, e) {
    let {
      slots: n,
      attrs: i
    } = e;
    ne(() => {
      const s = wn.filterProps(t), r = Ju.filterProps(t);
      return v(Ju, Oe({
        class: "v-carousel-item"
      }, r), {
        default: () => [v(wn, Oe(i, s), n)]
      });
    });
  }
}), Vp = {
  __name: "Gallery",
  props: ["id", "content", "info"],
  setup(t) {
    const { isMobile: e, resolveImg: n } = Ur(), i = J(0), s = J(null), r = () => {
      i.value = (i.value + t.content.images.length - 1) % t.content.images.length;
    }, o = () => {
      i.value = (i.value + 1) % t.content.images.length;
    }, a = () => {
      s.value = setInterval(() => {
        o();
      }, 4e3);
    }, l = () => {
      s.value ? (clearInterval(s.value), s.value = null) : a();
    }, u = (c) => {
      c.key === "ArrowLeft" ? (r(), l()) : c.key === "ArrowRight" && (o(), l());
    };
    return bn(() => {
      window.addEventListener("keydown", u), a();
    }), hf(() => {
      window.removeEventListener("keydown", u), clearInterval(s.value);
    }), (c, h) => (le(), it(Ee, null, [
      t.content.type === "manual" ? (le(), Te(qo, {
        key: 0,
        id: t.id,
        height: te(e) ? 400 : 600,
        "delimiter-icon": "mdi-square"
      }, {
        default: U(() => [
          (le(!0), it(Ee, null, zn(t.content.images, (d, f) => (le(), Te(Jo, { key: f }, {
            default: U(() => [
              v(wn, {
                src: te(n)(d),
                cover: ""
              }, null, 8, ["src"])
            ]),
            _: 2
          }, 1024))), 128))
        ]),
        _: 1
      }, 8, ["id", "height"])) : Zt("", !0),
      t.content.type === "automatic" ? (le(), Te(qo, {
        key: 1,
        id: t.id,
        style: { height: "96vh" },
        onClick: l,
        modelValue: i.value,
        "onUpdate:modelValue": h[0] || (h[0] = (d) => i.value = d),
        "hide-delimiters": ""
      }, {
        prev: U(() => h[1] || (h[1] = [])),
        next: U(() => h[2] || (h[2] = [])),
        default: U(() => [
          (le(!0), it(Ee, null, zn(t.content.images, (d) => (le(), Te(Jo, {
            src: te(n)(d),
            cover: ""
          }, null, 8, ["src"]))), 256))
        ]),
        _: 1
      }, 8, ["id", "modelValue"])) : Zt("", !0)
    ], 64));
  }
}, E1 = /* @__PURE__ */ Zr(Vp, [["__scopeId", "data-v-cbbc1f30"]]);
const ys = Symbol.for("vuetify:v-expansion-panel"), Gp = ["default", "accordion", "inset", "popout"], zp = B({
  color: String,
  static: Boolean,
  variant: {
    type: String,
    default: "default",
    validator: (t) => Gp.includes(t)
  },
  readonly: Boolean,
  ...ie(),
  ...rl(),
  ...Le(),
  ...je()
}, "VExpansionPanels"), Bp = Z()({
  name: "VExpansionPanels",
  props: zp(),
  emits: {
    "update:modelValue": (t) => !0
  },
  setup(t, e) {
    let {
      slots: n
    } = e;
    qr(t, ys);
    const {
      themeClasses: i
    } = Qe(t), s = w(() => t.variant && `v-expansion-panels--variant-${t.variant}`);
    return Pi({
      VExpansionPanel: {
        color: re(t, "color"),
        readonly: re(t, "readonly"),
        static: re(t, "static")
      }
    }), ne(() => v(t.tag, {
      class: ["v-expansion-panels", i.value, s.value, t.class],
      style: t.style
    }, n)), {};
  }
}), $p = B({
  disabled: Boolean,
  group: Boolean,
  hideOnLeave: Boolean,
  leaveAbsolute: Boolean,
  mode: String,
  origin: String
}, "transition");
function rt(t, e, n) {
  return Z()({
    name: t,
    props: $p({
      mode: n,
      origin: e
    }),
    setup(i, s) {
      let {
        slots: r
      } = s;
      const o = {
        onBeforeEnter(a) {
          i.origin && (a.style.transformOrigin = i.origin);
        },
        onLeave(a) {
          if (i.leaveAbsolute) {
            const {
              offsetTop: l,
              offsetLeft: u,
              offsetWidth: c,
              offsetHeight: h
            } = a;
            a._transitionInitialStyles = {
              position: a.style.position,
              top: a.style.top,
              left: a.style.left,
              width: a.style.width,
              height: a.style.height
            }, a.style.position = "absolute", a.style.top = `${l}px`, a.style.left = `${u}px`, a.style.width = `${c}px`, a.style.height = `${h}px`;
          }
          i.hideOnLeave && a.style.setProperty("display", "none", "important");
        },
        onAfterLeave(a) {
          if (i.leaveAbsolute && (a != null && a._transitionInitialStyles)) {
            const {
              position: l,
              top: u,
              left: c,
              width: h,
              height: d
            } = a._transitionInitialStyles;
            delete a._transitionInitialStyles, a.style.position = l || "", a.style.top = u || "", a.style.left = c || "", a.style.width = h || "", a.style.height = d || "";
          }
        }
      };
      return () => {
        const a = i.group ? df : vr;
        return bi(a, {
          name: i.disabled ? "" : t,
          css: !i.disabled,
          ...i.group ? void 0 : {
            mode: i.mode
          },
          ...i.disabled ? {} : o
        }, r.default);
      };
    }
  });
}
function Pd(t, e) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "in-out";
  return Z()({
    name: t,
    props: {
      mode: {
        type: String,
        default: n
      },
      disabled: Boolean
    },
    setup(i, s) {
      let {
        slots: r
      } = s;
      return () => bi(vr, {
        name: i.disabled ? "" : t,
        css: !i.disabled,
        // mode: props.mode, // TODO: vuejs/vue-next#3104
        ...i.disabled ? {} : e
      }, r.default);
    }
  });
}
function Md() {
  let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
  const n = (arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1) ? "width" : "height", i = ac(`offset-${n}`);
  return {
    onBeforeEnter(o) {
      o._parent = o.parentNode, o._initialStyle = {
        transition: o.style.transition,
        overflow: o.style.overflow,
        [n]: o.style[n]
      };
    },
    onEnter(o) {
      const a = o._initialStyle;
      o.style.setProperty("transition", "none", "important"), o.style.overflow = "hidden";
      const l = `${o[i]}px`;
      o.style[n] = "0", o.offsetHeight, o.style.transition = a.transition, t && o._parent && o._parent.classList.add(t), requestAnimationFrame(() => {
        o.style[n] = l;
      });
    },
    onAfterEnter: r,
    onEnterCancelled: r,
    onLeave(o) {
      o._initialStyle = {
        transition: "",
        overflow: o.style.overflow,
        [n]: o.style[n]
      }, o.style.overflow = "hidden", o.style[n] = `${o[i]}px`, o.offsetHeight, requestAnimationFrame(() => o.style[n] = "0");
    },
    onAfterLeave: s,
    onLeaveCancelled: s
  };
  function s(o) {
    t && o._parent && o._parent.classList.remove(t), r(o);
  }
  function r(o) {
    const a = o._initialStyle[n];
    o.style.overflow = o._initialStyle.overflow, a != null && (o.style[n] = a), delete o._initialStyle;
  }
}
rt("fab-transition", "center center", "out-in");
rt("dialog-bottom-transition");
rt("dialog-top-transition");
const Qu = rt("fade-transition");
rt("scale-transition");
rt("scroll-x-transition");
rt("scroll-x-reverse-transition");
rt("scroll-y-transition");
rt("scroll-y-reverse-transition");
rt("slide-x-transition");
rt("slide-x-reverse-transition");
const kd = rt("slide-y-transition");
rt("slide-y-reverse-transition");
const Od = Pd("expand-transition", Md()), Wp = Pd("expand-x-transition", Md("", !0)), Xp = B({
  ...ie(),
  ...ol()
}, "VExpansionPanelText"), Dd = Z()({
  name: "VExpansionPanelText",
  props: Xp(),
  setup(t, e) {
    let {
      slots: n
    } = e;
    const i = Ye(ys);
    if (!i)
      throw new Error("[Vuetify] v-expansion-panel-text needs to be placed inside v-expansion-panel");
    const {
      hasContent: s,
      onAfterLeave: r
    } = Rd(t, i.isSelected);
    return ne(() => v(Od, {
      onAfterLeave: r
    }, {
      default: () => {
        var o;
        return [Xe(v("div", {
          class: ["v-expansion-panel-text", t.class],
          style: t.style
        }, [n.default && s.value && v("div", {
          class: "v-expansion-panel-text__wrapper"
        }, [(o = n.default) == null ? void 0 : o.call(n)])]), [[Ii, i.isSelected.value]])];
      }
    })), {};
  }
}), Fd = B({
  color: String,
  expandIcon: {
    type: xe,
    default: "$expand"
  },
  collapseIcon: {
    type: xe,
    default: "$collapse"
  },
  hideActions: Boolean,
  static: Boolean,
  ripple: {
    type: [Boolean, Object],
    default: !1
  },
  readonly: Boolean,
  ...ie()
}, "VExpansionPanelTitle"), Nd = Z()({
  name: "VExpansionPanelTitle",
  directives: {
    Ripple: Xr
  },
  props: Fd(),
  setup(t, e) {
    let {
      slots: n
    } = e;
    const i = Ye(ys);
    if (!i)
      throw new Error("[Vuetify] v-expansion-panel-title needs to be placed inside v-expansion-panel");
    const {
      backgroundColorClasses: s,
      backgroundColorStyles: r
    } = En(t, "color"), o = w(() => ({
      collapseIcon: t.collapseIcon,
      disabled: i.disabled.value,
      expanded: i.isSelected.value,
      expandIcon: t.expandIcon,
      readonly: t.readonly
    }));
    return ne(() => {
      var a;
      return Xe(v("button", {
        class: ["v-expansion-panel-title", {
          "v-expansion-panel-title--active": i.isSelected.value,
          "v-expansion-panel-title--static": t.static
        }, s.value, t.class],
        style: [r.value, t.style],
        type: "button",
        tabindex: i.disabled.value ? -1 : void 0,
        disabled: i.disabled.value,
        "aria-expanded": i.isSelected.value,
        onClick: t.readonly ? void 0 : i.toggle
      }, [v("span", {
        class: "v-expansion-panel-title__overlay"
      }, null), (a = n.default) == null ? void 0 : a.call(n, o.value), !t.hideActions && v("span", {
        class: "v-expansion-panel-title__icon"
      }, [n.actions ? n.actions(o.value) : v(We, {
        icon: i.isSelected.value ? t.collapseIcon : t.expandIcon
      }, null)])]), [[Sn("ripple"), t.ripple]]);
    }), {};
  }
}), Yp = B({
  title: String,
  text: String,
  bgColor: String,
  ...ie(),
  ...Yn(),
  ...Kr(),
  ...ol(),
  ...wt(),
  ...Le(),
  ...Fd()
}, "VExpansionPanel"), jp = Z()({
  name: "VExpansionPanel",
  props: Yp(),
  emits: {
    "group:selected": (t) => !0
  },
  setup(t, e) {
    let {
      slots: n
    } = e;
    const i = Hr(t, ys), {
      backgroundColorClasses: s,
      backgroundColorStyles: r
    } = En(t, "bgColor"), {
      elevationClasses: o
    } = jn(t), {
      roundedClasses: a
    } = St(t), l = w(() => (i == null ? void 0 : i.disabled.value) || t.disabled), u = w(() => i.group.items.value.reduce((d, f, g) => (i.group.selected.value.includes(f.id) && d.push(g), d), [])), c = w(() => {
      const d = i.group.items.value.findIndex((f) => f.id === i.id);
      return !i.isSelected.value && u.value.some((f) => f - d === 1);
    }), h = w(() => {
      const d = i.group.items.value.findIndex((f) => f.id === i.id);
      return !i.isSelected.value && u.value.some((f) => f - d === -1);
    });
    return mt(ys, i), Pi({
      VExpansionPanelText: {
        eager: re(t, "eager")
      },
      VExpansionPanelTitle: {
        readonly: re(t, "readonly")
      }
    }), ne(() => {
      const d = !!(n.text || t.text), f = !!(n.title || t.title);
      return v(t.tag, {
        class: ["v-expansion-panel", {
          "v-expansion-panel--active": i.isSelected.value,
          "v-expansion-panel--before-active": c.value,
          "v-expansion-panel--after-active": h.value,
          "v-expansion-panel--disabled": l.value
        }, a.value, s.value, t.class],
        style: [r.value, t.style]
      }, {
        default: () => {
          var g;
          return [v("div", {
            class: ["v-expansion-panel__shadow", ...o.value]
          }, null), f && v(Nd, {
            key: "title",
            collapseIcon: t.collapseIcon,
            color: t.color,
            expandIcon: t.expandIcon,
            hideActions: t.hideActions,
            ripple: t.ripple
          }, {
            default: () => [n.title ? n.title() : t.title]
          }), d && v(Dd, {
            key: "text"
          }, {
            default: () => [n.text ? n.text() : t.text]
          }), (g = n.default) == null ? void 0 : g.call(n)];
        }
      });
    }), {};
  }
}), Up = ["innerHTML"], Zp = ["innerHTML"], Kp = ["innerHTML"], w1 = {
  __name: "Services",
  props: ["content", "info"],
  setup(t) {
    const { getText: e } = Ls();
    return (n, i) => (le(), Te(nn, null, {
      default: U(() => [
        Ie("h1", {
          style: Gn({ color: t.info.primaryColor }),
          innerHTML: te(e)(t.content.title) || "I nostri servizi"
        }, null, 12, Up),
        v(Bp, { multiple: "" }, {
          default: U(() => [
            (le(!0), it(Ee, null, zn(t.content.services, (s) => (le(), Te(jp, {
              elevation: "20",
              class: "margin_top__default"
            }, {
              default: U(() => [
                v(Nd, null, {
                  default: U(() => [
                    Ie("b", {
                      innerHTML: te(e)(s.name)
                    }, null, 8, Zp)
                  ]),
                  _: 2
                }, 1024),
                v(Dd, null, {
                  default: U(() => [
                    Ie("div", {
                      innerHTML: te(e)(s.description)
                    }, null, 8, Kp)
                  ]),
                  _: 2
                }, 1024)
              ]),
              _: 2
            }, 1024))), 256))
          ]),
          _: 1
        })
      ]),
      _: 1
    }));
  }
}, al = "https://generic-be-test.replit.app/", Hp = "https://fastsite-be-test.replit.app/", qp = (t, e, n) => {
  const i = new URL(`${Hp}${t}`);
  Object.keys(e).forEach((s) => i.searchParams.append(s, e[s])), fetch(i, {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  }).then((s) => {
    if (!s.ok)
      throw new Error(`Errore nella risposta del server: ${s.status} - ${s.statusText}`);
    return s.json();
  }).then((s) => {
    n(s);
  }).catch((s) => {
    console.error("Errore nella richiesta:", s);
  });
}, Jp = (t, e, n, i = "POST", s = void 0) => {
  fetch(`${al}${t}`, {
    method: i,
    headers: ll(),
    body: JSON.stringify(e)
  }).then((r) => {
    if (!r.ok)
      throw new Error(`Errore nella risposta del server: ${r.status} - ${r.statusText}`);
    return r.json();
  }).then((r) => {
    ul(r, n, s);
  }).catch((r) => {
    console.error("Errore nella richiesta:", r);
  });
}, Qp = (t, e, n, i = "POST", s = void 0) => {
  const r = new FormData();
  r.append("file", e), fetch(`${al}${t}`, {
    method: i,
    headers: ll(!0),
    body: r
  }).then((o) => {
    if (!o.ok)
      throw new Error(`Errore nella risposta del server: ${o.status} - ${o.statusText}`);
    return o.json();
  }).then((o) => {
    ul(o, n, s);
  }).catch((o) => {
    console.error("Errore nella richiesta:", o);
  });
}, ex = (t, e, n, i = "GET", s = void 0) => {
  const r = new URL(`${al}${t}`);
  Object.keys(e).forEach((o) => r.searchParams.append(o, e[o])), fetch(r, {
    method: i,
    headers: ll()
  }).then((o) => {
    if (!o.ok)
      throw new Error(`Errore nella risposta del server: ${o.status} - ${o.statusText}`);
    return o.json();
  }).then((o) => {
    ul(o, n, s);
  }).catch((o) => {
    console.error("Errore nella richiesta:", o);
  });
}, ll = (t = !1) => {
  let e = {
    Token: localStorage.getItem("token")
  };
  return t ? e.Accept = "*/*" : e["Content-Type"] = "application/json", e;
}, ul = (t, e, n) => {
  t.status == "session" ? (alert("Sessione scaduta"), n.push("/")) : e(t);
}, tx = {
  getRequest: qp,
  postRequestGenericBE: Jp,
  postRequestFileGenericBE: Qp,
  getRequestGenericBE: ex
}, Jr = [
  (t) => t ? !0 : "Campo obbligatorio"
], nx = Jr.concat([
  (t) => /.+@.+\..+/.test(t) ? !0 : "E-mail non valida."
]), ix = Jr.concat([
  (t) => /^(https?:\/\/)?([\w-]+\.)+([a-z]{2,})+(\/[\w-]*)*(\?[a-z0-9-]+=[a-z0-9-%]+(&[a-z0-9-]+=[a-z0-9-%]+)*)?$/i.test(t) ? !0 : "Sito non valido."
]), sx = Jr.concat([
  (t) => /[A-Z]/.test(t) ? !0 : "La password deve contenere almeno una lettera maiscola.",
  (t) => /[a-z]/.test(t) ? !0 : "La password deve contenere almeno una lettera minuscola.",
  (t) => /\d/.test(t) ? !0 : "La password deve contenere almeno un numero.",
  (t) => t.length >= 8 ? !0 : "La password deve contenere almeno 8 caratteri."
]), rx = (t, e) => {
  const n = [];
  for (const i of e) {
    const s = i(t);
    s !== !0 && n.push(s);
  }
  return n.length === 0 ? null : n;
}, Yt = {
  validateInput: rx,
  requiredRules: Jr,
  emailRules: nx,
  siteRules: ix,
  passwordRules: sx
};
const Vd = Symbol.for("vuetify:form"), ox = B({
  disabled: Boolean,
  fastFail: Boolean,
  readonly: Boolean,
  modelValue: {
    type: Boolean,
    default: null
  },
  validateOn: {
    type: String,
    default: "input"
  }
}, "form");
function ax(t) {
  const e = Dt(t, "modelValue"), n = w(() => t.disabled), i = w(() => t.readonly), s = ye(!1), r = J([]), o = J([]);
  async function a() {
    const c = [];
    let h = !0;
    o.value = [], s.value = !0;
    for (const d of r.value) {
      const f = await d.validate();
      if (f.length > 0 && (h = !1, c.push({
        id: d.id,
        errorMessages: f
      })), !h && t.fastFail)
        break;
    }
    return o.value = c, s.value = !1, {
      valid: h,
      errors: o.value
    };
  }
  function l() {
    r.value.forEach((c) => c.reset());
  }
  function u() {
    r.value.forEach((c) => c.resetValidation());
  }
  return pe(r, () => {
    let c = 0, h = 0;
    const d = [];
    for (const f of r.value)
      f.isValid === !1 ? (h++, d.push({
        id: f.id,
        errorMessages: f.errorMessages
      })) : f.isValid === !0 && c++;
    o.value = d, e.value = h > 0 ? !1 : c === r.value.length ? !0 : null;
  }, {
    deep: !0
  }), mt(Vd, {
    register: (c) => {
      let {
        id: h,
        validate: d,
        reset: f,
        resetValidation: g
      } = c;
      r.value.some((m) => m.id === h) && _i(`Duplicate input name "${h}"`), r.value.push({
        id: h,
        validate: d,
        reset: f,
        resetValidation: g,
        isValid: null,
        errorMessages: []
      });
    },
    unregister: (c) => {
      r.value = r.value.filter((h) => h.id !== c);
    },
    update: (c, h, d) => {
      const f = r.value.find((g) => g.id === c);
      f && (f.isValid = h, f.errorMessages = d);
    },
    isDisabled: n,
    isReadonly: i,
    isValidating: s,
    isValid: e,
    items: r,
    validateOn: re(t, "validateOn")
  }), {
    errors: o,
    isDisabled: n,
    isReadonly: i,
    isValidating: s,
    isValid: e,
    items: r,
    validate: a,
    reset: l,
    resetValidation: u
  };
}
function lx() {
  return Ye(Vd, null);
}
const bo = Symbol("Forwarded refs");
function Io(t, e) {
  let n = t;
  for (; n; ) {
    const i = Reflect.getOwnPropertyDescriptor(n, e);
    if (i)
      return i;
    n = Object.getPrototypeOf(n);
  }
}
function cl(t) {
  for (var e = arguments.length, n = new Array(e > 1 ? e - 1 : 0), i = 1; i < e; i++)
    n[i - 1] = arguments[i];
  return t[bo] = n, new Proxy(t, {
    get(s, r) {
      if (Reflect.has(s, r))
        return Reflect.get(s, r);
      if (!(typeof r == "symbol" || r.startsWith("$") || r.startsWith("__"))) {
        for (const o of n)
          if (o.value && Reflect.has(o.value, r)) {
            const a = Reflect.get(o.value, r);
            return typeof a == "function" ? a.bind(o.value) : a;
          }
      }
    },
    has(s, r) {
      if (Reflect.has(s, r))
        return !0;
      if (typeof r == "symbol" || r.startsWith("$") || r.startsWith("__"))
        return !1;
      for (const o of n)
        if (o.value && Reflect.has(o.value, r))
          return !0;
      return !1;
    },
    set(s, r, o) {
      if (Reflect.has(s, r))
        return Reflect.set(s, r, o);
      if (typeof r == "symbol" || r.startsWith("$") || r.startsWith("__"))
        return !1;
      for (const a of n)
        if (a.value && Reflect.has(a.value, r))
          return Reflect.set(a.value, r, o);
      return !1;
    },
    getOwnPropertyDescriptor(s, r) {
      var a;
      const o = Reflect.getOwnPropertyDescriptor(s, r);
      if (o)
        return o;
      if (!(typeof r == "symbol" || r.startsWith("$") || r.startsWith("__"))) {
        for (const l of n) {
          if (!l.value)
            continue;
          const u = Io(l.value, r) ?? ("_" in l.value ? Io((a = l.value._) == null ? void 0 : a.setupState, r) : void 0);
          if (u)
            return u;
        }
        for (const l of n) {
          const u = l.value && l.value[bo];
          if (!u)
            continue;
          const c = u.slice();
          for (; c.length; ) {
            const h = c.shift(), d = Io(h.value, r);
            if (d)
              return d;
            const f = h.value && h.value[bo];
            f && c.push(...f);
          }
        }
      }
    }
  });
}
const ux = B({
  ...ie(),
  ...ox()
}, "VForm"), cx = Z()({
  name: "VForm",
  props: ux(),
  emits: {
    "update:modelValue": (t) => !0,
    submit: (t) => !0
  },
  setup(t, e) {
    let {
      slots: n,
      emit: i
    } = e;
    const s = ax(t), r = J();
    function o(l) {
      l.preventDefault(), s.reset();
    }
    function a(l) {
      const u = l, c = s.validate();
      u.then = c.then.bind(c), u.catch = c.catch.bind(c), u.finally = c.finally.bind(c), i("submit", u), u.defaultPrevented || c.then((h) => {
        var f;
        let {
          valid: d
        } = h;
        d && ((f = r.value) == null || f.submit());
      }), u.preventDefault();
    }
    return ne(() => {
      var l;
      return v("form", {
        ref: r,
        class: ["v-form", t.class],
        style: t.style,
        novalidate: !0,
        onReset: o,
        onSubmit: a
      }, [(l = n.default) == null ? void 0 : l.call(n, s)]);
    }), cl(s, r);
  }
});
const Qo = Symbol.for("vuetify:list");
function Gd() {
  const t = Ye(Qo, {
    hasPrepend: ye(!1),
    updateHasPrepend: () => null
  }), e = {
    hasPrepend: ye(!1),
    updateHasPrepend: (n) => {
      n && (e.hasPrepend.value = n);
    }
  };
  return mt(Qo, e), t;
}
function zd() {
  return Ye(Qo, null);
}
const hx = {
  open: (t) => {
    let {
      id: e,
      value: n,
      opened: i,
      parents: s
    } = t;
    if (n) {
      const r = /* @__PURE__ */ new Set();
      r.add(e);
      let o = s.get(e);
      for (; o != null; )
        r.add(o), o = s.get(o);
      return r;
    } else
      return i.delete(e), i;
  },
  select: () => null
}, Bd = {
  open: (t) => {
    let {
      id: e,
      value: n,
      opened: i,
      parents: s
    } = t;
    if (n) {
      let r = s.get(e);
      for (i.add(e); r != null && r !== e; )
        i.add(r), r = s.get(r);
      return i;
    } else
      i.delete(e);
    return i;
  },
  select: () => null
}, dx = {
  open: Bd.open,
  select: (t) => {
    let {
      id: e,
      value: n,
      opened: i,
      parents: s
    } = t;
    if (!n)
      return i;
    const r = [];
    let o = s.get(e);
    for (; o != null; )
      r.push(o), o = s.get(o);
    return new Set(r);
  }
}, hl = (t) => {
  const e = {
    select: (n) => {
      let {
        id: i,
        value: s,
        selected: r
      } = n;
      if (i = $n(i), t && !s) {
        const o = Array.from(r.entries()).reduce((a, l) => {
          let [u, c] = l;
          return c === "on" ? [...a, u] : a;
        }, []);
        if (o.length === 1 && o[0] === i)
          return r;
      }
      return r.set(i, s ? "on" : "off"), r;
    },
    in: (n, i, s) => {
      let r = /* @__PURE__ */ new Map();
      for (const o of n || [])
        r = e.select({
          id: o,
          value: !0,
          selected: new Map(r),
          children: i,
          parents: s
        });
      return r;
    },
    out: (n) => {
      const i = [];
      for (const [s, r] of n.entries())
        r === "on" && i.push(s);
      return i;
    }
  };
  return e;
}, $d = (t) => {
  const e = hl(t);
  return {
    select: (i) => {
      let {
        selected: s,
        id: r,
        ...o
      } = i;
      r = $n(r);
      const a = s.has(r) ? /* @__PURE__ */ new Map([[r, s.get(r)]]) : /* @__PURE__ */ new Map();
      return e.select({
        ...o,
        id: r,
        selected: a
      });
    },
    in: (i, s, r) => {
      let o = /* @__PURE__ */ new Map();
      return i != null && i.length && (o = e.in(i.slice(0, 1), s, r)), o;
    },
    out: (i, s, r) => e.out(i, s, r)
  };
}, fx = (t) => {
  const e = hl(t);
  return {
    select: (i) => {
      let {
        id: s,
        selected: r,
        children: o,
        ...a
      } = i;
      return s = $n(s), o.has(s) ? r : e.select({
        id: s,
        selected: r,
        children: o,
        ...a
      });
    },
    in: e.in,
    out: e.out
  };
}, gx = (t) => {
  const e = $d(t);
  return {
    select: (i) => {
      let {
        id: s,
        selected: r,
        children: o,
        ...a
      } = i;
      return s = $n(s), o.has(s) ? r : e.select({
        id: s,
        selected: r,
        children: o,
        ...a
      });
    },
    in: e.in,
    out: e.out
  };
}, mx = (t) => {
  const e = {
    select: (n) => {
      let {
        id: i,
        value: s,
        selected: r,
        children: o,
        parents: a
      } = n;
      i = $n(i);
      const l = new Map(r), u = [i];
      for (; u.length; ) {
        const h = u.shift();
        r.set(h, s ? "on" : "off"), o.has(h) && u.push(...o.get(h));
      }
      let c = a.get(i);
      for (; c; ) {
        const h = o.get(c), d = h.every((g) => r.get(g) === "on"), f = h.every((g) => !r.has(g) || r.get(g) === "off");
        r.set(c, d ? "on" : f ? "off" : "indeterminate"), c = a.get(c);
      }
      return t && !s && Array.from(r.entries()).reduce((d, f) => {
        let [g, m] = f;
        return m === "on" ? [...d, g] : d;
      }, []).length === 0 ? l : r;
    },
    in: (n, i, s) => {
      let r = /* @__PURE__ */ new Map();
      for (const o of n || [])
        r = e.select({
          id: o,
          value: !0,
          selected: new Map(r),
          children: i,
          parents: s
        });
      return r;
    },
    out: (n, i) => {
      const s = [];
      for (const [r, o] of n.entries())
        o === "on" && !i.has(r) && s.push(r);
      return s;
    }
  };
  return e;
}, ps = Symbol.for("vuetify:nested"), Wd = {
  id: ye(),
  root: {
    register: () => null,
    unregister: () => null,
    parents: J(/* @__PURE__ */ new Map()),
    children: J(/* @__PURE__ */ new Map()),
    open: () => null,
    openOnSelect: () => null,
    select: () => null,
    opened: J(/* @__PURE__ */ new Set()),
    selected: J(/* @__PURE__ */ new Map()),
    selectedValues: J([])
  }
}, _x = B({
  selectStrategy: [String, Function],
  openStrategy: [String, Object],
  opened: Array,
  selected: Array,
  mandatory: Boolean
}, "nested"), vx = (t) => {
  let e = !1;
  const n = J(/* @__PURE__ */ new Map()), i = J(/* @__PURE__ */ new Map()), s = Dt(t, "opened", t.opened, (h) => new Set(h), (h) => [...h.values()]), r = w(() => {
    if (typeof t.selectStrategy == "object")
      return t.selectStrategy;
    switch (t.selectStrategy) {
      case "single-leaf":
        return gx(t.mandatory);
      case "leaf":
        return fx(t.mandatory);
      case "independent":
        return hl(t.mandatory);
      case "single-independent":
        return $d(t.mandatory);
      case "classic":
      default:
        return mx(t.mandatory);
    }
  }), o = w(() => {
    if (typeof t.openStrategy == "object")
      return t.openStrategy;
    switch (t.openStrategy) {
      case "list":
        return dx;
      case "single":
        return hx;
      case "multiple":
      default:
        return Bd;
    }
  }), a = Dt(t, "selected", t.selected, (h) => r.value.in(h, n.value, i.value), (h) => r.value.out(h, n.value, i.value));
  Ft(() => {
    e = !0;
  });
  function l(h) {
    const d = [];
    let f = h;
    for (; f != null; )
      d.unshift(f), f = i.value.get(f);
    return d;
  }
  const u = _t("nested"), c = {
    id: ye(),
    root: {
      opened: s,
      selected: a,
      selectedValues: w(() => {
        const h = [];
        for (const [d, f] of a.value.entries())
          f === "on" && h.push(d);
        return h;
      }),
      register: (h, d, f) => {
        d && h !== d && i.value.set(h, d), f && n.value.set(h, []), d != null && n.value.set(d, [...n.value.get(d) || [], h]);
      },
      unregister: (h) => {
        if (e)
          return;
        n.value.delete(h);
        const d = i.value.get(h);
        if (d) {
          const f = n.value.get(d) ?? [];
          n.value.set(d, f.filter((g) => g !== h));
        }
        i.value.delete(h), s.value.delete(h);
      },
      open: (h, d, f) => {
        u.emit("click:open", {
          id: h,
          value: d,
          path: l(h),
          event: f
        });
        const g = o.value.open({
          id: h,
          value: d,
          opened: new Set(s.value),
          children: n.value,
          parents: i.value,
          event: f
        });
        g && (s.value = g);
      },
      openOnSelect: (h, d, f) => {
        const g = o.value.select({
          id: h,
          value: d,
          selected: new Map(a.value),
          opened: new Set(s.value),
          children: n.value,
          parents: i.value,
          event: f
        });
        g && (s.value = g);
      },
      select: (h, d, f) => {
        u.emit("click:select", {
          id: h,
          value: d,
          path: l(h),
          event: f
        });
        const g = r.value.select({
          id: h,
          value: d,
          selected: new Map(a.value),
          children: n.value,
          parents: i.value,
          event: f
        });
        g && (a.value = g), c.root.openOnSelect(h, d, f);
      },
      children: n,
      parents: i
    }
  };
  return mt(ps, c), c.root;
}, Xd = (t, e) => {
  const n = Ye(ps, Wd), i = Symbol(Ai()), s = w(() => t.value !== void 0 ? t.value : i), r = {
    ...n,
    id: s,
    open: (o, a) => n.root.open(s.value, o, a),
    openOnSelect: (o, a) => n.root.openOnSelect(s.value, o, a),
    isOpen: w(() => n.root.opened.value.has(s.value)),
    parent: w(() => n.root.parents.value.get(s.value)),
    select: (o, a) => n.root.select(s.value, o, a),
    isSelected: w(() => n.root.selected.value.get($n(s.value)) === "on"),
    isIndeterminate: w(() => n.root.selected.value.get(s.value) === "indeterminate"),
    isLeaf: w(() => !n.root.children.value.get(s.value)),
    isGroupActivator: n.isGroupActivator
  };
  return !n.isGroupActivator && n.root.register(s.value, n.id.value, e), Ft(() => {
    !n.isGroupActivator && n.root.unregister(s.value);
  }), e && mt(ps, r), r;
}, yx = () => {
  const t = Ye(ps, Wd);
  mt(ps, {
    ...t,
    isGroupActivator: !0
  });
}, px = As({
  name: "VListGroupActivator",
  setup(t, e) {
    let {
      slots: n
    } = e;
    return yx(), () => {
      var i;
      return (i = n.default) == null ? void 0 : i.call(n);
    };
  }
}), xx = B({
  /* @deprecated */
  activeColor: String,
  baseColor: String,
  color: String,
  collapseIcon: {
    type: xe,
    default: "$collapse"
  },
  expandIcon: {
    type: xe,
    default: "$expand"
  },
  prependIcon: xe,
  appendIcon: xe,
  fluid: Boolean,
  subgroup: Boolean,
  title: String,
  value: null,
  ...ie(),
  ...Le()
}, "VListGroup"), ec = Z()({
  name: "VListGroup",
  props: xx(),
  setup(t, e) {
    let {
      slots: n
    } = e;
    const {
      isOpen: i,
      open: s,
      id: r
    } = Xd(re(t, "value"), !0), o = w(() => `v-list-group--id-${String(r.value)}`), a = zd(), {
      isBooted: l
    } = Ld();
    function u(f) {
      s(!i.value, f);
    }
    const c = w(() => ({
      onClick: u,
      class: "v-list-group__header",
      id: o.value
    })), h = w(() => i.value ? t.collapseIcon : t.expandIcon), d = w(() => ({
      VListItem: {
        active: i.value,
        activeColor: t.activeColor,
        baseColor: t.baseColor,
        color: t.color,
        prependIcon: t.prependIcon || t.subgroup && h.value,
        appendIcon: t.appendIcon || !t.subgroup && h.value,
        title: t.title,
        value: t.value
      }
    }));
    return ne(() => v(t.tag, {
      class: ["v-list-group", {
        "v-list-group--prepend": a == null ? void 0 : a.hasPrepend.value,
        "v-list-group--fluid": t.fluid,
        "v-list-group--subgroup": t.subgroup,
        "v-list-group--open": i.value
      }, t.class],
      style: t.style
    }, {
      default: () => [n.activator && v(kt, {
        defaults: d.value
      }, {
        default: () => [v(px, null, {
          default: () => [n.activator({
            props: c.value,
            isOpen: i.value
          })]
        })]
      }), v(vn, {
        transition: {
          component: Od
        },
        disabled: !l.value
      }, {
        default: () => {
          var f;
          return [Xe(v("div", {
            class: "v-list-group__items",
            role: "group",
            "aria-labelledby": o.value
          }, [(f = n.default) == null ? void 0 : f.call(n)]), [[Ii, i.value]])];
        }
      })]
    })), {};
  }
});
const Cx = Ps("v-list-item-subtitle"), Yd = Ps("v-list-item-title"), Ex = B({
  active: {
    type: Boolean,
    default: void 0
  },
  activeClass: String,
  /* @deprecated */
  activeColor: String,
  appendAvatar: String,
  appendIcon: xe,
  baseColor: String,
  disabled: Boolean,
  lines: String,
  link: {
    type: Boolean,
    default: void 0
  },
  nav: Boolean,
  prependAvatar: String,
  prependIcon: xe,
  ripple: {
    type: [Boolean, Object],
    default: !0
  },
  slim: Boolean,
  subtitle: [String, Number],
  title: [String, Number],
  value: null,
  onClick: en(),
  onClickOnce: en(),
  ...Di(),
  ...ie(),
  ...Tn(),
  ...Mi(),
  ...Yn(),
  ...wt(),
  ...nl(),
  ...Le(),
  ...je(),
  ...Oi({
    variant: "text"
  })
}, "VListItem"), ea = Z()({
  name: "VListItem",
  directives: {
    Ripple: Xr
  },
  props: Ex(),
  emits: {
    click: (t) => !0
  },
  setup(t, e) {
    let {
      attrs: n,
      slots: i,
      emit: s
    } = e;
    const r = tl(t, n), o = w(() => t.value === void 0 ? r.href.value : t.value), {
      select: a,
      isSelected: l,
      isIndeterminate: u,
      isGroupActivator: c,
      root: h,
      parent: d,
      openOnSelect: f
    } = Xd(o, !1), g = zd(), m = w(() => {
      var F;
      return t.active !== !1 && (t.active || ((F = r.isActive) == null ? void 0 : F.value) || l.value);
    }), _ = w(() => t.link !== !1 && r.isLink.value), p = w(() => !t.disabled && t.link !== !1 && (t.link || r.isClickable.value || t.value != null && !!g)), y = w(() => t.rounded || t.nav), C = w(() => t.color ?? t.activeColor), x = w(() => ({
      color: m.value ? C.value ?? t.baseColor : t.baseColor,
      variant: t.variant
    }));
    pe(() => {
      var F;
      return (F = r.isActive) == null ? void 0 : F.value;
    }, (F) => {
      F && d.value != null && h.open(d.value, !0), F && f(F);
    }, {
      immediate: !0
    });
    const {
      themeClasses: E
    } = Qe(t), {
      borderClasses: S
    } = Fi(t), {
      colorClasses: T,
      colorStyles: I,
      variantClasses: b
    } = Br(x), {
      densityClasses: D
    } = Xn(t), {
      dimensionStyles: P
    } = ki(t), {
      elevationClasses: A
    } = jn(t), {
      roundedClasses: M
    } = St(y), k = w(() => t.lines ? `v-list-item--${t.lines}-line` : void 0), V = w(() => ({
      isActive: m.value,
      select: a,
      isSelected: l.value,
      isIndeterminate: u.value
    }));
    function O(F) {
      var j;
      s("click", F), !(c || !p.value) && ((j = r.navigate) == null || j.call(r, F), t.value != null && a(!l.value, F));
    }
    function G(F) {
      (F.key === "Enter" || F.key === " ") && (F.preventDefault(), O(F));
    }
    return ne(() => {
      const F = _.value ? "a" : t.tag, j = i.title || t.title != null, W = i.subtitle || t.subtitle != null, N = !!(t.appendAvatar || t.appendIcon), z = !!(N || i.append), q = !!(t.prependAvatar || t.prependIcon), L = !!(q || i.prepend);
      return g == null || g.updateHasPrepend(L), t.activeColor && I0("active-color", ["color", "base-color"]), Xe(v(F, {
        class: ["v-list-item", {
          "v-list-item--active": m.value,
          "v-list-item--disabled": t.disabled,
          "v-list-item--link": p.value,
          "v-list-item--nav": t.nav,
          "v-list-item--prepend": !L && (g == null ? void 0 : g.hasPrepend.value),
          "v-list-item--slim": t.slim,
          [`${t.activeClass}`]: t.activeClass && m.value
        }, E.value, S.value, T.value, D.value, A.value, k.value, M.value, b.value, t.class],
        style: [I.value, P.value, t.style],
        href: r.href.value,
        tabindex: p.value ? g ? -2 : 0 : void 0,
        onClick: O,
        onKeydown: p.value && !_.value && G
      }, {
        default: () => {
          var se;
          return [zr(p.value || m.value, "v-list-item"), L && v("div", {
            key: "prepend",
            class: "v-list-item__prepend"
          }, [i.prepend ? v(kt, {
            key: "prepend-defaults",
            disabled: !q,
            defaults: {
              VAvatar: {
                density: t.density,
                image: t.prependAvatar
              },
              VIcon: {
                density: t.density,
                icon: t.prependIcon
              },
              VListItemAction: {
                start: !0
              }
            }
          }, {
            default: () => {
              var oe;
              return [(oe = i.prepend) == null ? void 0 : oe.call(i, V.value)];
            }
          }) : v(Ee, null, [t.prependAvatar && v(fr, {
            key: "prepend-avatar",
            density: t.density,
            image: t.prependAvatar
          }, null), t.prependIcon && v(We, {
            key: "prepend-icon",
            density: t.density,
            icon: t.prependIcon
          }, null)]), v("div", {
            class: "v-list-item__spacer"
          }, null)]), v("div", {
            class: "v-list-item__content",
            "data-no-activator": ""
          }, [j && v(Yd, {
            key: "title"
          }, {
            default: () => {
              var oe;
              return [((oe = i.title) == null ? void 0 : oe.call(i, {
                title: t.title
              })) ?? t.title];
            }
          }), W && v(Cx, {
            key: "subtitle"
          }, {
            default: () => {
              var oe;
              return [((oe = i.subtitle) == null ? void 0 : oe.call(i, {
                subtitle: t.subtitle
              })) ?? t.subtitle];
            }
          }), (se = i.default) == null ? void 0 : se.call(i, V.value)]), z && v("div", {
            key: "append",
            class: "v-list-item__append"
          }, [i.append ? v(kt, {
            key: "append-defaults",
            disabled: !N,
            defaults: {
              VAvatar: {
                density: t.density,
                image: t.appendAvatar
              },
              VIcon: {
                density: t.density,
                icon: t.appendIcon
              },
              VListItemAction: {
                end: !0
              }
            }
          }, {
            default: () => {
              var oe;
              return [(oe = i.append) == null ? void 0 : oe.call(i, V.value)];
            }
          }) : v(Ee, null, [t.appendIcon && v(We, {
            key: "append-icon",
            density: t.density,
            icon: t.appendIcon
          }, null), t.appendAvatar && v(fr, {
            key: "append-avatar",
            density: t.density,
            image: t.appendAvatar
          }, null)]), v("div", {
            class: "v-list-item__spacer"
          }, null)])];
        }
      }), [[Sn("ripple"), p.value && t.ripple]]);
    }), {};
  }
}), wx = B({
  color: String,
  inset: Boolean,
  sticky: Boolean,
  title: String,
  ...ie(),
  ...Le()
}, "VListSubheader"), Sx = Z()({
  name: "VListSubheader",
  props: wx(),
  setup(t, e) {
    let {
      slots: n
    } = e;
    const {
      textColorClasses: i,
      textColorStyles: s
    } = Cn(re(t, "color"));
    return ne(() => {
      const r = !!(n.default || t.title);
      return v(t.tag, {
        class: ["v-list-subheader", {
          "v-list-subheader--inset": t.inset,
          "v-list-subheader--sticky": t.sticky
        }, i.value, t.class],
        style: [{
          textColorStyles: s
        }, t.style]
      }, {
        default: () => {
          var o;
          return [r && v("div", {
            class: "v-list-subheader__text"
          }, [((o = n.default) == null ? void 0 : o.call(n)) ?? t.title])];
        }
      });
    }), {};
  }
});
const bx = B({
  color: String,
  inset: Boolean,
  length: [Number, String],
  thickness: [Number, String],
  vertical: Boolean,
  ...ie(),
  ...je()
}, "VDivider"), Ix = Z()({
  name: "VDivider",
  props: bx(),
  setup(t, e) {
    let {
      attrs: n
    } = e;
    const {
      themeClasses: i
    } = Qe(t), {
      textColorClasses: s,
      textColorStyles: r
    } = Cn(re(t, "color")), o = w(() => {
      const a = {};
      return t.length && (a[t.vertical ? "maxHeight" : "maxWidth"] = me(t.length)), t.thickness && (a[t.vertical ? "borderRightWidth" : "borderTopWidth"] = me(t.thickness)), a;
    });
    return ne(() => v("hr", {
      class: [{
        "v-divider": !0,
        "v-divider--inset": t.inset,
        "v-divider--vertical": t.vertical
      }, i.value, s.value, t.class],
      style: [o.value, r.value, t.style],
      "aria-orientation": !n.role || n.role === "separator" ? t.vertical ? "vertical" : "horizontal" : void 0,
      role: `${n.role || "separator"}`
    }, null)), {};
  }
}), Tx = B({
  items: Array,
  returnObject: Boolean
}, "VListChildren"), jd = Z()({
  name: "VListChildren",
  props: Tx(),
  setup(t, e) {
    let {
      slots: n
    } = e;
    return Gd(), () => {
      var i, s;
      return ((i = n.default) == null ? void 0 : i.call(n)) ?? ((s = t.items) == null ? void 0 : s.map((r) => {
        var d, f;
        let {
          children: o,
          props: a,
          type: l,
          raw: u
        } = r;
        if (l === "divider")
          return ((d = n.divider) == null ? void 0 : d.call(n, {
            props: a
          })) ?? v(Ix, a, null);
        if (l === "subheader")
          return ((f = n.subheader) == null ? void 0 : f.call(n, {
            props: a
          })) ?? v(Sx, a, null);
        const c = {
          subtitle: n.subtitle ? (g) => {
            var m;
            return (m = n.subtitle) == null ? void 0 : m.call(n, {
              ...g,
              item: u
            });
          } : void 0,
          prepend: n.prepend ? (g) => {
            var m;
            return (m = n.prepend) == null ? void 0 : m.call(n, {
              ...g,
              item: u
            });
          } : void 0,
          append: n.append ? (g) => {
            var m;
            return (m = n.append) == null ? void 0 : m.call(n, {
              ...g,
              item: u
            });
          } : void 0,
          title: n.title ? (g) => {
            var m;
            return (m = n.title) == null ? void 0 : m.call(n, {
              ...g,
              item: u
            });
          } : void 0
        }, h = ec.filterProps(a);
        return o ? v(ec, Oe({
          value: a == null ? void 0 : a.value
        }, h), {
          activator: (g) => {
            let {
              props: m
            } = g;
            const _ = {
              ...a,
              ...m,
              value: t.returnObject ? u : a.value
            };
            return n.header ? n.header({
              props: _
            }) : v(ea, _, c);
          },
          default: () => v(jd, {
            items: o
          }, n)
        }) : n.item ? n.item({
          props: a
        }) : v(ea, Oe(a, {
          value: t.returnObject ? u : a.value
        }), c);
      }));
    };
  }
}), Rx = B({
  items: {
    type: Array,
    default: () => []
  },
  itemTitle: {
    type: [String, Array, Function],
    default: "title"
  },
  itemValue: {
    type: [String, Array, Function],
    default: "value"
  },
  itemChildren: {
    type: [Boolean, String, Array, Function],
    default: "children"
  },
  itemProps: {
    type: [Boolean, String, Array, Function],
    default: "props"
  },
  returnObject: Boolean,
  valueComparator: {
    type: Function,
    default: Fr
  }
}, "list-items");
function Lx(t) {
  return typeof t == "string" || typeof t == "number" || typeof t == "boolean";
}
function Ax(t, e) {
  const n = Yi(e, t.itemType, "item"), i = Lx(e) ? e : Yi(e, t.itemTitle), s = Yi(e, t.itemValue, void 0), r = Yi(e, t.itemChildren), o = t.itemProps === !0 ? Nh(e, ["children"]) : Yi(e, t.itemProps), a = {
    title: i,
    value: s,
    ...o
  };
  return {
    type: n,
    title: a.title,
    value: a.value,
    props: a,
    children: n === "item" && r ? Ud(t, r) : void 0,
    raw: e
  };
}
function Ud(t, e) {
  const n = [];
  for (const i of e)
    n.push(Ax(t, i));
  return n;
}
function Px(t) {
  return {
    items: w(() => Ud(t, t.items))
  };
}
const Mx = B({
  baseColor: String,
  /* @deprecated */
  activeColor: String,
  activeClass: String,
  bgColor: String,
  disabled: Boolean,
  expandIcon: String,
  collapseIcon: String,
  lines: {
    type: [Boolean, String],
    default: "one"
  },
  slim: Boolean,
  nav: Boolean,
  ..._x({
    selectStrategy: "single-leaf",
    openStrategy: "list"
  }),
  ...Di(),
  ...ie(),
  ...Tn(),
  ...Mi(),
  ...Yn(),
  itemType: {
    type: String,
    default: "type"
  },
  ...Rx(),
  ...wt(),
  ...Le(),
  ...je(),
  ...Oi({
    variant: "text"
  })
}, "VList"), kx = Z()({
  name: "VList",
  props: Mx(),
  emits: {
    "update:selected": (t) => !0,
    "update:opened": (t) => !0,
    "click:open": (t) => !0,
    "click:select": (t) => !0
  },
  setup(t, e) {
    let {
      slots: n
    } = e;
    const {
      items: i
    } = Px(t), {
      themeClasses: s
    } = Qe(t), {
      backgroundColorClasses: r,
      backgroundColorStyles: o
    } = En(re(t, "bgColor")), {
      borderClasses: a
    } = Fi(t), {
      densityClasses: l
    } = Xn(t), {
      dimensionStyles: u
    } = ki(t), {
      elevationClasses: c
    } = jn(t), {
      roundedClasses: h
    } = St(t), {
      open: d,
      select: f
    } = vx(t), g = w(() => t.lines ? `v-list--${t.lines}-line` : void 0), m = re(t, "activeColor"), _ = re(t, "baseColor"), p = re(t, "color");
    Gd(), Pi({
      VListGroup: {
        activeColor: m,
        baseColor: _,
        color: p,
        expandIcon: re(t, "expandIcon"),
        collapseIcon: re(t, "collapseIcon")
      },
      VListItem: {
        activeClass: re(t, "activeClass"),
        activeColor: m,
        baseColor: _,
        color: p,
        density: re(t, "density"),
        disabled: re(t, "disabled"),
        lines: re(t, "lines"),
        nav: re(t, "nav"),
        slim: re(t, "slim"),
        variant: re(t, "variant")
      }
    });
    const y = ye(!1), C = J();
    function x(D) {
      y.value = !0;
    }
    function E(D) {
      y.value = !1;
    }
    function S(D) {
      var P;
      !y.value && !(D.relatedTarget && ((P = C.value) != null && P.contains(D.relatedTarget))) && b();
    }
    function T(D) {
      if (C.value) {
        if (D.key === "ArrowDown")
          b("next");
        else if (D.key === "ArrowUp")
          b("prev");
        else if (D.key === "Home")
          b("first");
        else if (D.key === "End")
          b("last");
        else
          return;
        D.preventDefault();
      }
    }
    function I(D) {
      y.value = !0;
    }
    function b(D) {
      if (C.value)
        return Yh(C.value, D);
    }
    return ne(() => v(t.tag, {
      ref: C,
      class: ["v-list", {
        "v-list--disabled": t.disabled,
        "v-list--nav": t.nav,
        "v-list--slim": t.slim
      }, s.value, r.value, a.value, l.value, c.value, g.value, h.value, t.class],
      style: [o.value, u.value, t.style],
      tabindex: t.disabled || y.value ? -1 : 0,
      role: "listbox",
      "aria-activedescendant": void 0,
      onFocusin: x,
      onFocusout: E,
      onFocus: S,
      onKeydown: T,
      onMousedown: I
    }, {
      default: () => [v(jd, {
        items: i.value,
        returnObject: t.returnObject
      }, n)]
    })), {
      open: d,
      select: f,
      focus: b
    };
  }
});
const Ox = B({
  active: Boolean,
  max: [Number, String],
  value: {
    type: [Number, String],
    default: 0
  },
  ...ie(),
  ...Za({
    transition: {
      component: kd
    }
  })
}, "VCounter"), Zd = Z()({
  name: "VCounter",
  functional: !0,
  props: Ox(),
  setup(t, e) {
    let {
      slots: n
    } = e;
    const i = w(() => t.max ? `${t.value} / ${t.max}` : String(t.value));
    return ne(() => v(vn, {
      transition: t.transition
    }, {
      default: () => [Xe(v("div", {
        class: ["v-counter", t.class],
        style: t.style
      }, [n.default ? n.default({
        counter: i.value,
        max: t.max,
        value: t.value
      }) : i.value]), [[Ii, t.active]])]
    })), {};
  }
});
const Dx = B({
  text: String,
  onClick: en(),
  ...ie(),
  ...je()
}, "VLabel"), Fx = Z()({
  name: "VLabel",
  props: Dx(),
  setup(t, e) {
    let {
      slots: n
    } = e;
    return ne(() => {
      var i;
      return v("label", {
        class: ["v-label", {
          "v-label--clickable": !!t.onClick
        }, t.class],
        style: t.style,
        onClick: t.onClick
      }, [t.text, (i = n.default) == null ? void 0 : i.call(n)]);
    }), {};
  }
}), Nx = B({
  floating: Boolean,
  ...ie()
}, "VFieldLabel"), Hs = Z()({
  name: "VFieldLabel",
  props: Nx(),
  setup(t, e) {
    let {
      slots: n
    } = e;
    return ne(() => v(Fx, {
      class: ["v-field-label", {
        "v-field-label--floating": t.floating
      }, t.class],
      style: t.style,
      "aria-hidden": t.floating || void 0
    }, n)), {};
  }
});
function Kd(t) {
  const {
    t: e
  } = Ha();
  function n(i) {
    let {
      name: s
    } = i;
    const r = {
      prepend: "prependAction",
      prependInner: "prependAction",
      append: "appendAction",
      appendInner: "appendAction",
      clear: "clear"
    }[s], o = t[`onClick:${s}`], a = o && r ? e(`$vuetify.input.${r}`, t.label ?? "") : void 0;
    return v(We, {
      icon: t[`${s}Icon`],
      "aria-label": a,
      onClick: o
    }, null);
  }
  return {
    InputIcon: n
  };
}
const Hd = B({
  focused: Boolean,
  "onUpdate:focused": en()
}, "focus");
function dl(t) {
  let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Vt();
  const n = Dt(t, "focused"), i = w(() => ({
    [`${e}--focused`]: n.value
  }));
  function s() {
    n.value = !0;
  }
  function r() {
    n.value = !1;
  }
  return {
    focusClasses: i,
    isFocused: n,
    focus: s,
    blur: r
  };
}
const Vx = ["underlined", "outlined", "filled", "solo", "solo-inverted", "solo-filled", "plain"], fl = B({
  appendInnerIcon: xe,
  bgColor: String,
  clearable: Boolean,
  clearIcon: {
    type: xe,
    default: "$clear"
  },
  active: Boolean,
  centerAffix: {
    type: Boolean,
    default: void 0
  },
  color: String,
  baseColor: String,
  dirty: Boolean,
  disabled: {
    type: Boolean,
    default: null
  },
  error: Boolean,
  flat: Boolean,
  label: String,
  persistentClear: Boolean,
  prependInnerIcon: xe,
  reverse: Boolean,
  singleLine: Boolean,
  variant: {
    type: String,
    default: "filled",
    validator: (t) => Vx.includes(t)
  },
  "onClick:clear": en(),
  "onClick:appendInner": en(),
  "onClick:prependInner": en(),
  ...ie(),
  ...qa(),
  ...wt(),
  ...je()
}, "VField"), gl = Z()({
  name: "VField",
  inheritAttrs: !1,
  props: {
    id: String,
    ...Hd(),
    ...fl()
  },
  emits: {
    "update:focused": (t) => !0,
    "update:modelValue": (t) => !0
  },
  setup(t, e) {
    let {
      attrs: n,
      emit: i,
      slots: s
    } = e;
    const {
      themeClasses: r
    } = Qe(t), {
      loaderClasses: o
    } = Ja(t), {
      focusClasses: a,
      isFocused: l,
      focus: u,
      blur: c
    } = dl(t), {
      InputIcon: h
    } = Kd(t), {
      roundedClasses: d
    } = St(t), {
      rtlClasses: f
    } = Un(), g = w(() => t.dirty || t.active), m = w(() => !t.singleLine && !!(t.label || s.label)), _ = Ai(), p = w(() => t.id || `input-${_}`), y = w(() => `${p.value}-messages`), C = J(), x = J(), E = J(), S = w(() => ["plain", "underlined"].includes(t.variant)), {
      backgroundColorClasses: T,
      backgroundColorStyles: I
    } = En(re(t, "bgColor")), {
      textColorClasses: b,
      textColorStyles: D
    } = Cn(w(() => t.error || t.disabled ? void 0 : g.value && l.value ? t.color : t.baseColor));
    pe(g, (M) => {
      if (m.value) {
        const k = C.value.$el, V = x.value.$el;
        requestAnimationFrame(() => {
          const O = v0(k), G = V.getBoundingClientRect(), F = G.x - O.x, j = G.y - O.y - (O.height / 2 - G.height / 2), W = G.width / 0.75, N = Math.abs(W - O.width) > 1 ? {
            maxWidth: me(W)
          } : void 0, z = getComputedStyle(k), q = getComputedStyle(V), L = parseFloat(z.transitionDuration) * 1e3 || 150, se = parseFloat(q.getPropertyValue("--v-field-label-scale")), oe = q.getPropertyValue("color");
          k.style.visibility = "visible", V.style.visibility = "hidden", y0(k, {
            transform: `translate(${F}px, ${j}px) scale(${se})`,
            color: oe,
            ...N
          }, {
            duration: L,
            easing: M0,
            direction: M ? "normal" : "reverse"
          }).finished.then(() => {
            k.style.removeProperty("visibility"), V.style.removeProperty("visibility");
          });
        });
      }
    }, {
      flush: "post"
    });
    const P = w(() => ({
      isActive: g,
      isFocused: l,
      controlRef: E,
      blur: c,
      focus: u
    }));
    function A(M) {
      M.target !== document.activeElement && M.preventDefault();
    }
    return ne(() => {
      var F, j, W;
      const M = t.variant === "outlined", k = s["prepend-inner"] || t.prependInnerIcon, V = !!(t.clearable || s.clear), O = !!(s["append-inner"] || t.appendInnerIcon || V), G = () => s.label ? s.label({
        ...P.value,
        label: t.label,
        props: {
          for: p.value
        }
      }) : t.label;
      return v("div", Oe({
        class: ["v-field", {
          "v-field--active": g.value,
          "v-field--appended": O,
          "v-field--center-affix": t.centerAffix ?? !S.value,
          "v-field--disabled": t.disabled,
          "v-field--dirty": t.dirty,
          "v-field--error": t.error,
          "v-field--flat": t.flat,
          "v-field--has-background": !!t.bgColor,
          "v-field--persistent-clear": t.persistentClear,
          "v-field--prepended": k,
          "v-field--reverse": t.reverse,
          "v-field--single-line": t.singleLine,
          "v-field--no-label": !G(),
          [`v-field--variant-${t.variant}`]: !0
        }, r.value, T.value, a.value, o.value, d.value, f.value, t.class],
        style: [I.value, t.style],
        onClick: A
      }, n), [v("div", {
        class: "v-field__overlay"
      }, null), v(nd, {
        name: "v-field",
        active: !!t.loading,
        color: t.error ? "error" : typeof t.loading == "string" ? t.loading : t.color
      }, {
        default: s.loader
      }), k && v("div", {
        key: "prepend",
        class: "v-field__prepend-inner"
      }, [t.prependInnerIcon && v(h, {
        key: "prepend-icon",
        name: "prependInner"
      }, null), (F = s["prepend-inner"]) == null ? void 0 : F.call(s, P.value)]), v("div", {
        class: "v-field__field",
        "data-no-activator": ""
      }, [["filled", "solo", "solo-inverted", "solo-filled"].includes(t.variant) && m.value && v(Hs, {
        key: "floating-label",
        ref: x,
        class: [b.value],
        floating: !0,
        for: p.value,
        style: D.value
      }, {
        default: () => [G()]
      }), v(Hs, {
        ref: C,
        for: p.value
      }, {
        default: () => [G()]
      }), (j = s.default) == null ? void 0 : j.call(s, {
        ...P.value,
        props: {
          id: p.value,
          class: "v-field__input",
          "aria-describedby": y.value
        },
        focus: u,
        blur: c
      })]), V && v(Wp, {
        key: "clear"
      }, {
        default: () => [Xe(v("div", {
          class: "v-field__clearable",
          onMousedown: (N) => {
            N.preventDefault(), N.stopPropagation();
          }
        }, [s.clear ? s.clear() : v(h, {
          name: "clear"
        }, null)]), [[Ii, t.dirty]])]
      }), O && v("div", {
        key: "append",
        class: "v-field__append-inner"
      }, [(W = s["append-inner"]) == null ? void 0 : W.call(s, P.value), t.appendInnerIcon && v(h, {
        key: "append-icon",
        name: "appendInner"
      }, null)]), v("div", {
        class: ["v-field__outline", b.value],
        style: D.value
      }, [M && v(Ee, null, [v("div", {
        class: "v-field__outline__start"
      }, null), m.value && v("div", {
        class: "v-field__outline__notch"
      }, [v(Hs, {
        ref: x,
        floating: !0,
        for: p.value
      }, {
        default: () => [G()]
      })]), v("div", {
        class: "v-field__outline__end"
      }, null)]), S.value && m.value && v(Hs, {
        ref: x,
        floating: !0,
        for: p.value
      }, {
        default: () => [G()]
      })])]);
    }), {
      controlRef: E
    };
  }
});
function qd(t) {
  const e = Object.keys(gl.props).filter((n) => !c0(n) && n !== "class" && n !== "style");
  return Fh(t, e);
}
const Gx = B({
  active: Boolean,
  color: String,
  messages: {
    type: [Array, String],
    default: () => []
  },
  ...ie(),
  ...Za({
    transition: {
      component: kd,
      leaveAbsolute: !0,
      group: !0
    }
  })
}, "VMessages"), zx = Z()({
  name: "VMessages",
  props: Gx(),
  setup(t, e) {
    let {
      slots: n
    } = e;
    const i = w(() => es(t.messages)), {
      textColorClasses: s,
      textColorStyles: r
    } = Cn(w(() => t.color));
    return ne(() => v(vn, {
      transition: t.transition,
      tag: "div",
      class: ["v-messages", s.value, t.class],
      style: [r.value, t.style],
      role: "alert",
      "aria-live": "polite"
    }, {
      default: () => [t.active && i.value.map((o, a) => v("div", {
        class: "v-messages__message",
        key: `${a}-${i.value}`
      }, [n.message ? n.message({
        message: o
      }) : o]))]
    })), {};
  }
}), Bx = B({
  disabled: {
    type: Boolean,
    default: null
  },
  error: Boolean,
  errorMessages: {
    type: [Array, String],
    default: () => []
  },
  maxErrors: {
    type: [Number, String],
    default: 1
  },
  name: String,
  label: String,
  readonly: {
    type: Boolean,
    default: null
  },
  rules: {
    type: Array,
    default: () => []
  },
  modelValue: null,
  validateOn: String,
  validationValue: null,
  ...Hd()
}, "validation");
function $x(t) {
  let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Vt(), n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : Ai();
  const i = Dt(t, "modelValue"), s = w(() => t.validationValue === void 0 ? i.value : t.validationValue), r = lx(), o = J([]), a = ye(!0), l = w(() => !!(es(i.value === "" ? null : i.value).length || es(s.value === "" ? null : s.value).length)), u = w(() => !!(t.disabled ?? (r == null ? void 0 : r.isDisabled.value))), c = w(() => !!(t.readonly ?? (r == null ? void 0 : r.isReadonly.value))), h = w(() => {
    var x;
    return (x = t.errorMessages) != null && x.length ? es(t.errorMessages).concat(o.value).slice(0, Math.max(0, +t.maxErrors)) : o.value;
  }), d = w(() => {
    let x = (t.validateOn ?? (r == null ? void 0 : r.validateOn.value)) || "input";
    x === "lazy" && (x = "input lazy");
    const E = new Set((x == null ? void 0 : x.split(" ")) ?? []);
    return {
      blur: E.has("blur") || E.has("input"),
      input: E.has("input"),
      submit: E.has("submit"),
      lazy: E.has("lazy")
    };
  }), f = w(() => {
    var x;
    return t.error || (x = t.errorMessages) != null && x.length ? !1 : t.rules.length ? a.value ? o.value.length || d.value.lazy ? null : !0 : !o.value.length : !0;
  }), g = ye(!1), m = w(() => ({
    [`${e}--error`]: f.value === !1,
    [`${e}--dirty`]: l.value,
    [`${e}--disabled`]: u.value,
    [`${e}--readonly`]: c.value
  })), _ = w(() => t.name ?? te(n));
  lc(() => {
    r == null || r.register({
      id: _.value,
      validate: C,
      reset: p,
      resetValidation: y
    });
  }), Ft(() => {
    r == null || r.unregister(_.value);
  }), bn(async () => {
    d.value.lazy || await C(!0), r == null || r.update(_.value, f.value, h.value);
  }), jo(() => d.value.input, () => {
    pe(s, () => {
      if (s.value != null)
        C();
      else if (t.focused) {
        const x = pe(() => t.focused, (E) => {
          E || C(), x();
        });
      }
    });
  }), jo(() => d.value.blur, () => {
    pe(() => t.focused, (x) => {
      x || C();
    });
  }), pe([f, h], () => {
    r == null || r.update(_.value, f.value, h.value);
  });
  function p() {
    i.value = null, Ht(y);
  }
  function y() {
    a.value = !0, d.value.lazy ? o.value = [] : C(!0);
  }
  async function C() {
    let x = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1;
    const E = [];
    g.value = !0;
    for (const S of t.rules) {
      if (E.length >= +(t.maxErrors ?? 1))
        break;
      const I = await (typeof S == "function" ? S : () => S)(s.value);
      if (I !== !0) {
        if (I !== !1 && typeof I != "string") {
          console.warn(`${I} is not a valid value. Rule functions must return boolean true or a string.`);
          continue;
        }
        E.push(I || "");
      }
    }
    return o.value = E, g.value = !1, a.value = x, o.value;
  }
  return {
    errorMessages: h,
    isDirty: l,
    isDisabled: u,
    isReadonly: c,
    isPristine: a,
    isValid: f,
    isValidating: g,
    reset: p,
    resetValidation: y,
    validate: C,
    validationClasses: m
  };
}
const ml = B({
  id: String,
  appendIcon: xe,
  centerAffix: {
    type: Boolean,
    default: !0
  },
  prependIcon: xe,
  hideDetails: [Boolean, String],
  hideSpinButtons: Boolean,
  hint: String,
  persistentHint: Boolean,
  messages: {
    type: [Array, String],
    default: () => []
  },
  direction: {
    type: String,
    default: "horizontal",
    validator: (t) => ["horizontal", "vertical"].includes(t)
  },
  "onClick:prepend": en(),
  "onClick:append": en(),
  ...ie(),
  ...Tn(),
  ...Bx()
}, "VInput"), mr = Z()({
  name: "VInput",
  props: {
    ...ml()
  },
  emits: {
    "update:modelValue": (t) => !0
  },
  setup(t, e) {
    let {
      attrs: n,
      slots: i,
      emit: s
    } = e;
    const {
      densityClasses: r
    } = Xn(t), {
      rtlClasses: o
    } = Un(), {
      InputIcon: a
    } = Kd(t), l = Ai(), u = w(() => t.id || `input-${l}`), c = w(() => `${u.value}-messages`), {
      errorMessages: h,
      isDirty: d,
      isDisabled: f,
      isReadonly: g,
      isPristine: m,
      isValid: _,
      isValidating: p,
      reset: y,
      resetValidation: C,
      validate: x,
      validationClasses: E
    } = $x(t, "v-input", u), S = w(() => ({
      id: u,
      messagesId: c,
      isDirty: d,
      isDisabled: f,
      isReadonly: g,
      isPristine: m,
      isValid: _,
      isValidating: p,
      reset: y,
      resetValidation: C,
      validate: x
    })), T = w(() => {
      var I;
      return (I = t.errorMessages) != null && I.length || !m.value && h.value.length ? h.value : t.hint && (t.persistentHint || t.focused) ? t.hint : t.messages;
    });
    return ne(() => {
      var A, M, k, V;
      const I = !!(i.prepend || t.prependIcon), b = !!(i.append || t.appendIcon), D = T.value.length > 0, P = !t.hideDetails || t.hideDetails === "auto" && (D || !!i.details);
      return v("div", {
        class: ["v-input", `v-input--${t.direction}`, {
          "v-input--center-affix": t.centerAffix,
          "v-input--hide-spin-buttons": t.hideSpinButtons
        }, r.value, o.value, E.value, t.class],
        style: t.style
      }, [I && v("div", {
        key: "prepend",
        class: "v-input__prepend"
      }, [(A = i.prepend) == null ? void 0 : A.call(i, S.value), t.prependIcon && v(a, {
        key: "prepend-icon",
        name: "prepend"
      }, null)]), i.default && v("div", {
        class: "v-input__control"
      }, [(M = i.default) == null ? void 0 : M.call(i, S.value)]), b && v("div", {
        key: "append",
        class: "v-input__append"
      }, [t.appendIcon && v(a, {
        key: "append-icon",
        name: "append"
      }, null), (k = i.append) == null ? void 0 : k.call(i, S.value)]), P && v("div", {
        class: "v-input__details"
      }, [v(zx, {
        id: c.value,
        active: D,
        messages: T.value
      }, {
        message: i.message
      }), (V = i.details) == null ? void 0 : V.call(i, S.value)])]);
    }), {
      reset: y,
      resetValidation: C,
      validate: x,
      isValid: _,
      errorMessages: h
    };
  }
}), Wx = ["color", "file", "time", "date", "datetime-local", "week", "month"], Xx = B({
  autofocus: Boolean,
  counter: [Boolean, Number, String],
  counterValue: [Number, Function],
  prefix: String,
  placeholder: String,
  persistentPlaceholder: Boolean,
  persistentCounter: Boolean,
  suffix: String,
  role: String,
  type: {
    type: String,
    default: "text"
  },
  modelModifiers: Object,
  ...ml(),
  ...fl()
}, "VTextField"), tc = Z()({
  name: "VTextField",
  directives: {
    Intersect: Ka
  },
  inheritAttrs: !1,
  props: Xx(),
  emits: {
    "click:control": (t) => !0,
    "mousedown:control": (t) => !0,
    "update:focused": (t) => !0,
    "update:modelValue": (t) => !0
  },
  setup(t, e) {
    let {
      attrs: n,
      emit: i,
      slots: s
    } = e;
    const r = Dt(t, "modelValue"), {
      isFocused: o,
      focus: a,
      blur: l
    } = dl(t), u = w(() => typeof t.counterValue == "function" ? t.counterValue(r.value) : typeof t.counterValue == "number" ? t.counterValue : (r.value ?? "").toString().length), c = w(() => {
      if (n.maxlength)
        return n.maxlength;
      if (!(!t.counter || typeof t.counter != "number" && typeof t.counter != "string"))
        return t.counter;
    }), h = w(() => ["plain", "underlined"].includes(t.variant));
    function d(S, T) {
      var I, b;
      !t.autofocus || !S || (b = (I = T[0].target) == null ? void 0 : I.focus) == null || b.call(I);
    }
    const f = J(), g = J(), m = J(), _ = w(() => Wx.includes(t.type) || t.persistentPlaceholder || o.value || t.active);
    function p() {
      var S;
      m.value !== document.activeElement && ((S = m.value) == null || S.focus()), o.value || a();
    }
    function y(S) {
      i("mousedown:control", S), S.target !== m.value && (p(), S.preventDefault());
    }
    function C(S) {
      p(), i("click:control", S);
    }
    function x(S) {
      S.stopPropagation(), p(), Ht(() => {
        r.value = null, Wh(t["onClick:clear"], S);
      });
    }
    function E(S) {
      var I;
      const T = S.target;
      if (r.value = T.value, (I = t.modelModifiers) != null && I.trim && ["text", "search", "password", "tel", "url"].includes(t.type)) {
        const b = [T.selectionStart, T.selectionEnd];
        Ht(() => {
          T.selectionStart = b[0], T.selectionEnd = b[1];
        });
      }
    }
    return ne(() => {
      const S = !!(s.counter || t.counter !== !1 && t.counter != null), T = !!(S || s.details), [I, b] = Gh(n), {
        modelValue: D,
        ...P
      } = mr.filterProps(t), A = qd(t);
      return v(mr, Oe({
        ref: f,
        modelValue: r.value,
        "onUpdate:modelValue": (M) => r.value = M,
        class: ["v-text-field", {
          "v-text-field--prefixed": t.prefix,
          "v-text-field--suffixed": t.suffix,
          "v-input--plain-underlined": h.value
        }, t.class],
        style: t.style
      }, I, P, {
        centerAffix: !h.value,
        focused: o.value
      }), {
        ...s,
        default: (M) => {
          let {
            id: k,
            isDisabled: V,
            isDirty: O,
            isReadonly: G,
            isValid: F
          } = M;
          return v(gl, Oe({
            ref: g,
            onMousedown: y,
            onClick: C,
            "onClick:clear": x,
            "onClick:prependInner": t["onClick:prependInner"],
            "onClick:appendInner": t["onClick:appendInner"],
            role: t.role
          }, A, {
            id: k.value,
            active: _.value || O.value,
            dirty: O.value || t.dirty,
            disabled: V.value,
            focused: o.value,
            error: F.value === !1
          }), {
            ...s,
            default: (j) => {
              let {
                props: {
                  class: W,
                  ...N
                }
              } = j;
              const z = Xe(v("input", Oe({
                ref: m,
                value: r.value,
                onInput: E,
                autofocus: t.autofocus,
                readonly: G.value,
                disabled: V.value,
                name: t.name,
                placeholder: t.placeholder,
                size: 1,
                type: t.type,
                onFocus: p,
                onBlur: l
              }, N, b), null), [[Sn("intersect"), {
                handler: d
              }, null, {
                once: !0
              }]]);
              return v(Ee, null, [t.prefix && v("span", {
                class: "v-text-field__prefix"
              }, [v("span", {
                class: "v-text-field__prefix__text"
              }, [t.prefix])]), s.default ? v("div", {
                class: W,
                "data-no-activator": ""
              }, [s.default(), z]) : ff(z, {
                class: W
              }), t.suffix && v("span", {
                class: "v-text-field__suffix"
              }, [v("span", {
                class: "v-text-field__suffix__text"
              }, [t.suffix])])]);
            }
          });
        },
        details: T ? (M) => {
          var k;
          return v(Ee, null, [(k = s.details) == null ? void 0 : k.call(s, M), S && v(Ee, null, [v("span", null, null), v(Zd, {
            active: t.persistentCounter || o.value,
            value: u.value,
            max: c.value
          }, s.counter)])]);
        } : void 0
      });
    }), cl({}, f, g, m);
  }
});
const Yx = B({
  autoGrow: Boolean,
  autofocus: Boolean,
  counter: [Boolean, Number, String],
  counterValue: Function,
  prefix: String,
  placeholder: String,
  persistentPlaceholder: Boolean,
  persistentCounter: Boolean,
  noResize: Boolean,
  rows: {
    type: [Number, String],
    default: 5,
    validator: (t) => !isNaN(parseFloat(t))
  },
  maxRows: {
    type: [Number, String],
    validator: (t) => !isNaN(parseFloat(t))
  },
  suffix: String,
  modelModifiers: Object,
  ...ml(),
  ...fl()
}, "VTextarea"), jx = Z()({
  name: "VTextarea",
  directives: {
    Intersect: Ka
  },
  inheritAttrs: !1,
  props: Yx(),
  emits: {
    "click:control": (t) => !0,
    "mousedown:control": (t) => !0,
    "update:focused": (t) => !0,
    "update:modelValue": (t) => !0
  },
  setup(t, e) {
    let {
      attrs: n,
      emit: i,
      slots: s
    } = e;
    const r = Dt(t, "modelValue"), {
      isFocused: o,
      focus: a,
      blur: l
    } = dl(t), u = w(() => typeof t.counterValue == "function" ? t.counterValue(r.value) : (r.value || "").toString().length), c = w(() => {
      if (n.maxlength)
        return n.maxlength;
      if (!(!t.counter || typeof t.counter != "number" && typeof t.counter != "string"))
        return t.counter;
    });
    function h(P, A) {
      var M, k;
      !t.autofocus || !P || (k = (M = A[0].target) == null ? void 0 : M.focus) == null || k.call(M);
    }
    const d = J(), f = J(), g = ye(""), m = J(), _ = w(() => t.persistentPlaceholder || o.value || t.active);
    function p() {
      var P;
      m.value !== document.activeElement && ((P = m.value) == null || P.focus()), o.value || a();
    }
    function y(P) {
      p(), i("click:control", P);
    }
    function C(P) {
      i("mousedown:control", P);
    }
    function x(P) {
      P.stopPropagation(), p(), Ht(() => {
        r.value = "", Wh(t["onClick:clear"], P);
      });
    }
    function E(P) {
      var M;
      const A = P.target;
      if (r.value = A.value, (M = t.modelModifiers) != null && M.trim) {
        const k = [A.selectionStart, A.selectionEnd];
        Ht(() => {
          A.selectionStart = k[0], A.selectionEnd = k[1];
        });
      }
    }
    const S = J(), T = J(+t.rows), I = w(() => ["plain", "underlined"].includes(t.variant));
    _r(() => {
      t.autoGrow || (T.value = +t.rows);
    });
    function b() {
      t.autoGrow && Ht(() => {
        if (!S.value || !f.value)
          return;
        const P = getComputedStyle(S.value), A = getComputedStyle(f.value.$el), M = parseFloat(P.getPropertyValue("--v-field-padding-top")) + parseFloat(P.getPropertyValue("--v-input-padding-top")) + parseFloat(P.getPropertyValue("--v-field-padding-bottom")), k = S.value.scrollHeight, V = parseFloat(P.lineHeight), O = Math.max(parseFloat(t.rows) * V + M, parseFloat(A.getPropertyValue("--v-input-control-height"))), G = parseFloat(t.maxRows) * V + M || 1 / 0, F = zh(k ?? 0, O, G);
        T.value = Math.floor((F - M) / V), g.value = me(F);
      });
    }
    bn(b), pe(r, b), pe(() => t.rows, b), pe(() => t.maxRows, b), pe(() => t.density, b);
    let D;
    return pe(S, (P) => {
      P ? (D = new ResizeObserver(b), D.observe(S.value)) : D == null || D.disconnect();
    }), Ft(() => {
      D == null || D.disconnect();
    }), ne(() => {
      const P = !!(s.counter || t.counter || t.counterValue), A = !!(P || s.details), [M, k] = Gh(n), {
        modelValue: V,
        ...O
      } = mr.filterProps(t), G = qd(t);
      return v(mr, Oe({
        ref: d,
        modelValue: r.value,
        "onUpdate:modelValue": (F) => r.value = F,
        class: ["v-textarea v-text-field", {
          "v-textarea--prefixed": t.prefix,
          "v-textarea--suffixed": t.suffix,
          "v-text-field--prefixed": t.prefix,
          "v-text-field--suffixed": t.suffix,
          "v-textarea--auto-grow": t.autoGrow,
          "v-textarea--no-resize": t.noResize || t.autoGrow,
          "v-input--plain-underlined": I.value
        }, t.class],
        style: t.style
      }, M, O, {
        centerAffix: T.value === 1 && !I.value,
        focused: o.value
      }), {
        ...s,
        default: (F) => {
          let {
            id: j,
            isDisabled: W,
            isDirty: N,
            isReadonly: z,
            isValid: q
          } = F;
          return v(gl, Oe({
            ref: f,
            style: {
              "--v-textarea-control-height": g.value
            },
            onClick: y,
            onMousedown: C,
            "onClick:clear": x,
            "onClick:prependInner": t["onClick:prependInner"],
            "onClick:appendInner": t["onClick:appendInner"]
          }, G, {
            id: j.value,
            active: _.value || N.value,
            centerAffix: T.value === 1 && !I.value,
            dirty: N.value || t.dirty,
            disabled: W.value,
            focused: o.value,
            error: q.value === !1
          }), {
            ...s,
            default: (L) => {
              let {
                props: {
                  class: se,
                  ...oe
                }
              } = L;
              return v(Ee, null, [t.prefix && v("span", {
                class: "v-text-field__prefix"
              }, [t.prefix]), Xe(v("textarea", Oe({
                ref: m,
                class: se,
                value: r.value,
                onInput: E,
                autofocus: t.autofocus,
                readonly: z.value,
                disabled: W.value,
                placeholder: t.placeholder,
                rows: t.rows,
                name: t.name,
                onFocus: p,
                onBlur: l
              }, oe, k), null), [[Sn("intersect"), {
                handler: h
              }, null, {
                once: !0
              }]]), t.autoGrow && Xe(v("textarea", {
                class: [se, "v-textarea__sizer"],
                id: `${oe.id}-sizer`,
                "onUpdate:modelValue": (ve) => r.value = ve,
                ref: S,
                readonly: !0,
                "aria-hidden": "true"
              }, null), [[gf, r.value]]), t.suffix && v("span", {
                class: "v-text-field__suffix"
              }, [t.suffix])]);
            }
          });
        },
        details: A ? (F) => {
          var j;
          return v(Ee, null, [(j = s.details) == null ? void 0 : j.call(s, F), P && v(Ee, null, [v("span", null, null), v(Zd, {
            active: t.persistentCounter || o.value,
            value: u.value,
            max: c.value
          }, s.counter)])]);
        } : void 0
      });
    }), cl({}, d, f, m);
  }
}), Ux = ["innerHTML"], Zx = ["href", "innerHTML"], Kx = ["innerHTML"], Hx = {
  __name: "Contacts",
  props: ["content", "info"],
  setup(t) {
    const e = "", { getText: n } = Ls(), i = J(""), s = J(""), r = J(""), o = () => {
      !Yt.validateInput(r.value, Yt.emailRules) && !Yt.validateInput(i.value, Yt.requiredRules) && !Yt.validateInput(s.value, Yt.requiredRules) && tx.postRequestGenericBE("send-email", {
        email: e,
        subject: `Qualcuno ho usato il form del sito ${t.info.name}`,
        body: `Buongiorno,
Sono il tuo mailer, hai ricevuto il seguente messaggio:

Nominativo: ${i.value}
Mail: ${r.value}

Testo:
${s.value}`
      }, function() {
        alert(`Mail inviata
Ti ringraziamo per il contatto`);
      });
    };
    return (a, l) => (le(), Te(nn, null, {
      default: U(() => [
        v(Yr, { elevation: "20" }, {
          default: U(() => [
            v(nn, null, {
              default: U(() => [
                Ie("h2", {
                  style: Gn({ color: t.info.primaryColor }),
                  innerHTML: te(n)(t.content.title) || "I nostri contatti"
                }, null, 12, Ux),
                v(kx, null, {
                  default: U(() => [
                    (le(!0), it(Ee, null, zn(t.content.contacts, (u) => (le(), Te(ea, {
                      height: "20",
                      key: u
                    }, {
                      prepend: U(() => [
                        v(We, {
                          icon: u.icon,
                          color: t.info.primaryColor
                        }, null, 8, ["icon", "color"])
                      ]),
                      default: U(() => [
                        v(Yd, { class: "contact__text" }, {
                          default: U(() => [
                            Ie("a", {
                              href: u.url,
                              target: "_blank",
                              style: { "text-decoration": "none", color: "inherit" },
                              innerHTML: te(n)(u.title)
                            }, null, 8, Zx)
                          ]),
                          _: 2
                        }, 1024)
                      ]),
                      _: 2
                    }, 1024))), 128))
                  ]),
                  _: 1
                }),
                l[4] || (l[4] = Ie("br", null, null, -1)),
                Ie("hr", {
                  style: Gn({ height: "5px", backgroundColor: t.info.primaryColor })
                }, null, 4),
                l[5] || (l[5] = Ie("br", null, null, -1)),
                Ie("b", {
                  innerHTML: te(n)(t.content.subtitle) || "Contattaci direttamente con questo form"
                }, null, 8, Kx),
                l[6] || (l[6] = Ie("br", null, null, -1)),
                l[7] || (l[7] = Ie("br", null, null, -1)),
                v(cx, {
                  "fast-fail": "",
                  onSubmit: mf(o, ["prevent"])
                }, {
                  default: U(() => [
                    v(Ko, null, {
                      default: U(() => [
                        v(vi, {
                          cols: "12",
                          md: "6"
                        }, {
                          default: U(() => [
                            v(tc, {
                              modelValue: i.value,
                              "onUpdate:modelValue": l[0] || (l[0] = (u) => i.value = u),
                              rules: te(Yt).requiredRules,
                              variant: "outlined",
                              label: "Name"
                            }, null, 8, ["modelValue", "rules"])
                          ]),
                          _: 1
                        }),
                        v(vi, {
                          cols: "12",
                          md: "6"
                        }, {
                          default: U(() => [
                            v(tc, {
                              modelValue: r.value,
                              "onUpdate:modelValue": l[1] || (l[1] = (u) => r.value = u),
                              rules: te(Yt).emailRules,
                              variant: "outlined",
                              label: "Email"
                            }, null, 8, ["modelValue", "rules"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    v(Ko, null, {
                      default: U(() => [
                        v(vi, {
                          cols: "12",
                          md: "12"
                        }, {
                          default: U(() => [
                            v(jx, {
                              label: "Body",
                              rows: "4",
                              modelValue: s.value,
                              "onUpdate:modelValue": l[2] || (l[2] = (u) => s.value = u),
                              rules: te(Yt).requiredRules,
                              variant: "outlined"
                            }, null, 8, ["modelValue", "rules"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    l[3] || (l[3] = Ie("br", null, null, -1)),
                    v(vs, {
                      block: "",
                      text: "Send",
                      type: "submit",
                      color: t.info.primaryColor
                    }, null, 8, ["color"])
                  ]),
                  _: 1
                })
              ]),
              _: 1
            })
          ]),
          _: 1
        })
      ]),
      _: 1
    }));
  }
}, S1 = /* @__PURE__ */ Zr(Hx, [["__scopeId", "data-v-6c2056c7"]]);
function nc(t) {
  const n = Math.abs(t);
  return Math.sign(t) * (n / ((1 / 0.501 - 2) * (1 - n) + 1));
}
function ic(t) {
  let {
    selectedElement: e,
    containerSize: n,
    contentSize: i,
    isRtl: s,
    currentScrollOffset: r,
    isHorizontal: o
  } = t;
  const a = o ? e.clientWidth : e.clientHeight, l = o ? e.offsetLeft : e.offsetTop, u = s && o ? i - l - a : l, c = n + r, h = a + u, d = a * 0.4;
  return u <= r ? r = Math.max(u - d, 0) : c <= h && (r = Math.min(r - (c - h - d), i - n)), r;
}
function qx(t) {
  let {
    selectedElement: e,
    containerSize: n,
    contentSize: i,
    isRtl: s,
    isHorizontal: r
  } = t;
  const o = r ? e.clientWidth : e.clientHeight, a = r ? e.offsetLeft : e.offsetTop, l = s && r ? i - a - o / 2 - n / 2 : a + o / 2 - n / 2;
  return Math.min(i - n, Math.max(0, l));
}
const Jd = Symbol.for("vuetify:v-slide-group"), Jx = B({
  centerActive: Boolean,
  direction: {
    type: String,
    default: "horizontal"
  },
  symbol: {
    type: null,
    default: Jd
  },
  nextIcon: {
    type: xe,
    default: "$next"
  },
  prevIcon: {
    type: xe,
    default: "$prev"
  },
  showArrows: {
    type: [Boolean, String],
    validator: (t) => typeof t == "boolean" || ["always", "desktop", "mobile"].includes(t)
  },
  ...ie(),
  ...up(),
  ...Le(),
  ...rl({
    selectedClass: "v-slide-group-item--active"
  })
}, "VSlideGroup"), Qx = Z()({
  name: "VSlideGroup",
  props: Jx(),
  emits: {
    "update:modelValue": (t) => !0
  },
  setup(t, e) {
    let {
      slots: n
    } = e;
    const {
      isRtl: i
    } = Un(), {
      displayClasses: s,
      mobile: r
    } = cp(t), o = qr(t, t.symbol), a = ye(!1), l = ye(0), u = ye(0), c = ye(0), h = w(() => t.direction === "horizontal"), {
      resizeRef: d,
      contentRect: f
    } = Ho(), {
      resizeRef: g,
      contentRect: m
    } = Ho(), _ = w(() => o.selected.value.length ? o.items.value.findIndex((N) => N.id === o.selected.value[0]) : -1), p = w(() => o.selected.value.length ? o.items.value.findIndex((N) => N.id === o.selected.value[o.selected.value.length - 1]) : -1);
    if (Xa) {
      let N = -1;
      pe(() => [o.selected.value, f.value, m.value, h.value], () => {
        cancelAnimationFrame(N), N = requestAnimationFrame(() => {
          if (f.value && m.value) {
            const z = h.value ? "width" : "height";
            u.value = f.value[z], c.value = m.value[z], a.value = u.value + 1 < c.value;
          }
          if (_.value >= 0 && g.value) {
            const z = g.value.children[p.value];
            _.value === 0 || !a.value ? l.value = 0 : t.centerActive ? l.value = qx({
              selectedElement: z,
              containerSize: u.value,
              contentSize: c.value,
              isRtl: i.value,
              isHorizontal: h.value
            }) : a.value && (l.value = ic({
              selectedElement: z,
              containerSize: u.value,
              contentSize: c.value,
              isRtl: i.value,
              currentScrollOffset: l.value,
              isHorizontal: h.value
            }));
          }
        });
      });
    }
    const y = ye(!1);
    let C = 0, x = 0;
    function E(N) {
      const z = h.value ? "clientX" : "clientY";
      x = (i.value && h.value ? -1 : 1) * l.value, C = N.touches[0][z], y.value = !0;
    }
    function S(N) {
      if (!a.value)
        return;
      const z = h.value ? "clientX" : "clientY", q = i.value && h.value ? -1 : 1;
      l.value = q * (x + C - N.touches[0][z]);
    }
    function T(N) {
      const z = c.value - u.value;
      l.value < 0 || !a.value ? l.value = 0 : l.value >= z && (l.value = z), y.value = !1;
    }
    function I() {
      d.value && (d.value[h.value ? "scrollLeft" : "scrollTop"] = 0);
    }
    const b = ye(!1);
    function D(N) {
      if (b.value = !0, !(!a.value || !g.value)) {
        for (const z of N.composedPath())
          for (const q of g.value.children)
            if (q === z) {
              l.value = ic({
                selectedElement: q,
                containerSize: u.value,
                contentSize: c.value,
                isRtl: i.value,
                currentScrollOffset: l.value,
                isHorizontal: h.value
              });
              return;
            }
      }
    }
    function P(N) {
      b.value = !1;
    }
    function A(N) {
      var z;
      !b.value && !(N.relatedTarget && ((z = g.value) != null && z.contains(N.relatedTarget))) && k();
    }
    function M(N) {
      g.value && (h.value ? N.key === "ArrowRight" ? k(i.value ? "prev" : "next") : N.key === "ArrowLeft" && k(i.value ? "next" : "prev") : N.key === "ArrowDown" ? k("next") : N.key === "ArrowUp" && k("prev"), N.key === "Home" ? k("first") : N.key === "End" && k("last"));
    }
    function k(N) {
      var z, q, L, se, oe;
      if (g.value)
        if (!N)
          (z = Xh(g.value)[0]) == null || z.focus();
        else if (N === "next") {
          const ve = (q = g.value.querySelector(":focus")) == null ? void 0 : q.nextElementSibling;
          ve ? ve.focus() : k("first");
        } else if (N === "prev") {
          const ve = (L = g.value.querySelector(":focus")) == null ? void 0 : L.previousElementSibling;
          ve ? ve.focus() : k("last");
        } else
          N === "first" ? (se = g.value.firstElementChild) == null || se.focus() : N === "last" && ((oe = g.value.lastElementChild) == null || oe.focus());
    }
    function V(N) {
      const z = l.value + (N === "prev" ? -1 : 1) * u.value;
      l.value = zh(z, 0, c.value - u.value);
    }
    const O = w(() => {
      let N = l.value > c.value - u.value ? -(c.value - u.value) + nc(c.value - u.value - l.value) : -l.value;
      l.value <= 0 && (N = nc(-l.value));
      const z = i.value && h.value ? -1 : 1;
      return {
        transform: `translate${h.value ? "X" : "Y"}(${z * N}px)`,
        transition: y.value ? "none" : "",
        willChange: y.value ? "transform" : ""
      };
    }), G = w(() => ({
      next: o.next,
      prev: o.prev,
      select: o.select,
      isSelected: o.isSelected
    })), F = w(() => {
      switch (t.showArrows) {
        case "always":
          return !0;
        case "desktop":
          return !r.value;
        case !0:
          return a.value || Math.abs(l.value) > 0;
        case "mobile":
          return r.value || a.value || Math.abs(l.value) > 0;
        default:
          return !r.value && (a.value || Math.abs(l.value) > 0);
      }
    }), j = w(() => Math.abs(l.value) > 0), W = w(() => c.value > Math.abs(l.value) + u.value);
    return ne(() => v(t.tag, {
      class: ["v-slide-group", {
        "v-slide-group--vertical": !h.value,
        "v-slide-group--has-affixes": F.value,
        "v-slide-group--is-overflowing": a.value
      }, s.value, t.class],
      style: t.style,
      tabindex: b.value || o.selected.value.length ? -1 : 0,
      onFocus: A
    }, {
      default: () => {
        var N, z, q;
        return [F.value && v("div", {
          key: "prev",
          class: ["v-slide-group__prev", {
            "v-slide-group__prev--disabled": !j.value
          }],
          onClick: () => j.value && V("prev")
        }, [((N = n.prev) == null ? void 0 : N.call(n, G.value)) ?? v(Qu, null, {
          default: () => [v(We, {
            icon: i.value ? t.nextIcon : t.prevIcon
          }, null)]
        })]), v("div", {
          key: "container",
          ref: d,
          class: "v-slide-group__container",
          onScroll: I
        }, [v("div", {
          ref: g,
          class: "v-slide-group__content",
          style: O.value,
          onTouchstartPassive: E,
          onTouchmovePassive: S,
          onTouchendPassive: T,
          onFocusin: D,
          onFocusout: P,
          onKeydown: M
        }, [(z = n.default) == null ? void 0 : z.call(n, G.value)])]), F.value && v("div", {
          key: "next",
          class: ["v-slide-group__next", {
            "v-slide-group__next--disabled": !W.value
          }],
          onClick: () => W.value && V("next")
        }, [((q = n.next) == null ? void 0 : q.call(n, G.value)) ?? v(Qu, null, {
          default: () => [v(We, {
            icon: i.value ? t.prevIcon : t.nextIcon
          }, null)]
        })])];
      }
    })), {
      selected: o.selected,
      scrollTo: V,
      scrollOffset: l,
      focus: k
    };
  }
}), e1 = Z()({
  name: "VSlideGroupItem",
  props: Kr(),
  emits: {
    "group:selected": (t) => !0
  },
  setup(t, e) {
    let {
      slots: n
    } = e;
    const i = Hr(t, Jd);
    return () => {
      var s;
      return (s = n.default) == null ? void 0 : s.call(n, {
        isSelected: i.isSelected.value,
        select: i.select,
        toggle: i.toggle,
        selectedClass: i.selectedClass.value
      });
    };
  }
}), t1 = {
  __name: "BrandList",
  props: ["content", "info"],
  setup(t) {
    const { isMobile: e } = Ur();
    return (n, i) => (le(), Te(nn, null, {
      default: U(() => [
        v(Qx, { "show-arrows": "" }, {
          prev: U(() => [
            v(We, null, {
              default: U(() => i[0] || (i[0] = [
                wl("mdi-chevron-left")
              ])),
              _: 1
            })
          ]),
          next: U(() => [
            v(We, null, {
              default: U(() => i[1] || (i[1] = [
                wl("mdi-chevron-right")
              ])),
              _: 1
            })
          ]),
          default: U(() => [
            (le(!0), it(Ee, null, zn(t.content.brands, (s, r) => (le(), Te(e1, { key: r }, {
              default: U(() => [
                v(Yr, {
                  height: te(e) ? 150 : 300,
                  width: te(e) ? 150 : 300,
                  class: "brand_item"
                }, {
                  default: U(() => [
                    v(wn, { src: s }, null, 8, ["src"])
                  ]),
                  _: 2
                }, 1032, ["height", "width"])
              ]),
              _: 2
            }, 1024))), 128))
          ]),
          _: 1
        })
      ]),
      _: 1
    }));
  }
}, b1 = /* @__PURE__ */ Zr(t1, [["__scopeId", "data-v-b54a2fcf"]]);
const n1 = ["innerHTML"], i1 = ["src"], s1 = ["src"], r1 = ["innerHTML"], o1 = {
  __name: "Advantages",
  props: ["content", "info"],
  setup(t) {
    const { getText: e } = Ls(), { isMobile: n, resolveImg: i } = Ur();
    return (s, r) => (le(), Te(nn, null, {
      default: U(() => [
        Ie("h1", {
          style: Gn({ color: t.info.primaryColor }),
          innerHTML: te(e)(t.content.title) || "I nostri vantaggi"
        }, null, 12, n1),
        (le(!0), it(Ee, null, zn(t.content.advantages, (o, a) => (le(), Te(Yr, {
          key: a,
          class: Sl(["margin_top__default", { "carousel--mobile": te(n) }]),
          elevation: "20"
        }, {
          default: U(() => [
            Ie("div", {
              class: Sl(["img-wrapper", { "mobile-height": te(n) }])
            }, [
              Array.isArray(o.image) ? (le(), Te(qo, {
                key: 0,
                "show-arrows": "",
                "hide-delimiters": "",
                height: te(n) ? "400px" : "600px"
              }, {
                default: U(() => [
                  (le(!0), it(Ee, null, zn(o.image, (l, u) => (le(), Te(Jo, { key: u }, {
                    default: U(() => [
                      Ie("img", {
                        src: te(i)(l),
                        class: "img"
                      }, null, 8, i1)
                    ]),
                    _: 2
                  }, 1024))), 128))
                ]),
                _: 2
              }, 1032, ["height"])) : (le(), it("img", {
                key: 1,
                src: te(i)(o.image),
                class: "img"
              }, null, 8, s1))
            ], 2),
            v(Zh, {
              style: { "white-space": "normal" },
              innerHTML: te(e)(o.name)
            }, null, 8, ["innerHTML"]),
            o.description ? (le(), Te(Jh, { key: 0 }, {
              default: U(() => [
                Ie("div", {
                  innerHTML: te(e)(o.description)
                }, null, 8, r1)
              ]),
              _: 2
            }, 1024)) : Zt("", !0)
          ]),
          _: 2
        }, 1032, ["class"]))), 128))
      ]),
      _: 1
    }));
  }
}, I1 = /* @__PURE__ */ Zr(o1, [["__scopeId", "data-v-5781f3fc"]]);
const a1 = B({
  color: String,
  ...Di(),
  ...ie(),
  ...Mi(),
  ...Yn(),
  ...$r(),
  ...Qa(),
  ...wt(),
  ...Le(),
  ...je()
}, "VSheet"), l1 = Z()({
  name: "VSheet",
  props: a1(),
  setup(t, e) {
    let {
      slots: n
    } = e;
    const {
      themeClasses: i
    } = Qe(t), {
      backgroundColorClasses: s,
      backgroundColorStyles: r
    } = En(re(t, "color")), {
      borderClasses: o
    } = Fi(t), {
      dimensionStyles: a
    } = ki(t), {
      elevationClasses: l
    } = jn(t), {
      locationStyles: u
    } = Wr(t), {
      positionClasses: c
    } = el(t), {
      roundedClasses: h
    } = St(t);
    return ne(() => v(t.tag, {
      class: ["v-sheet", i.value, s.value, o.value, l.value, c.value, h.value, t.class],
      style: [r.value, a.value, u.value, t.style]
    }, n)), {};
  }
}), u1 = ["innerHTML"], c1 = ["innerHTML"], h1 = ["innerHTML"], d1 = ["href"], f1 = "right", g1 = "bottom", T1 = {
  __name: "DualSection",
  props: ["content", "info"],
  setup(t) {
    const { isMobile: e, resolveImg: n } = Ur(), { getText: i } = Ls(), s = w(() => (t.content.orientationDesktop || f1) === "left"), r = w(() => (t.content.orientationMobile || g1) === "top"), o = w(() => e.value ? r.value : s.value);
    return (a, l) => (le(), Te(nn, null, {
      default: U(() => [
        v(Ko, { align: "center" }, {
          default: U(() => [
            o.value ? (le(), Te(vi, {
              key: 0,
              cols: "12",
              md: "6"
            }, {
              default: U(() => [
                v(wn, {
                  src: te(n)(t.content.image),
                  cover: ""
                }, null, 8, ["src"])
              ]),
              _: 1
            })) : Zt("", !0),
            v(vi, {
              cols: "12",
              md: "6"
            }, {
              default: U(() => [
                v(l1, { style: { "background-color": "transparent" } }, {
                  default: U(() => [
                    t.content.title ? (le(), it("p", {
                      key: 0,
                      class: "text-h3 font-weight-black",
                      style: Gn({ color: t.info.primaryColor + " !important" }),
                      innerHTML: te(i)(t.content.title)
                    }, null, 12, u1)) : Zt("", !0),
                    l[0] || (l[0] = Ie("br", null, null, -1)),
                    t.content.subtitle ? (le(), it("p", {
                      key: 1,
                      class: "text-subtitle-1 font-weight-black",
                      innerHTML: te(i)(t.content.subtitle) + "<br>"
                    }, null, 8, c1)) : Zt("", !0),
                    t.content.description ? (le(), it("p", {
                      key: 2,
                      innerHTML: te(i)(t.content.description)
                    }, null, 8, h1)) : Zt("", !0),
                    l[1] || (l[1] = Ie("br", null, null, -1)),
                    t.content.url && t.content.button ? (le(), it("a", {
                      key: 3,
                      href: t.content.url
                    }, [
                      v(vs, {
                        innerHTML: te(i)(t.content.button),
                        class: "text-none",
                        variant: "flat",
                        color: t.info.primaryColor,
                        style: { marginTop: "7px" }
                      }, null, 8, ["innerHTML", "color"])
                    ], 8, d1)) : Zt("", !0)
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }),
            o.value ? Zt("", !0) : (le(), Te(vi, {
              key: 1,
              cols: "12",
              md: "6"
            }, {
              default: U(() => [
                v(wn, {
                  src: te(n)(t.content.image),
                  cover: ""
                }, null, 8, ["src"])
              ]),
              _: 1
            }))
          ]),
          _: 1
        })
      ]),
      _: 1
    }));
  }
};
export {
  I1 as Advantages,
  b1 as BrandList,
  S1 as Contacts,
  T1 as DualSection,
  E1 as Gallery,
  C1 as Line,
  x1 as Map,
  w1 as Services,
  Ls as useLanguageStore,
  Ur as useMobileUtils
};
