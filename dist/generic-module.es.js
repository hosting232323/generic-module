import { ref as g, resolveComponent as n, openBlock as p, createBlock as y, withCtx as t, createVNode as o, createTextVNode as f, toDisplayString as P, withModifiers as z, normalizeStyle as V, createCommentVNode as L, createElementVNode as j, unref as M, onMounted as J, onUnmounted as Y, normalizeClass as F } from "vue";
import { SHA256 as O } from "crypto-js";
import { useRouter as Z, useRoute as G } from "vue-router";
const K = (e, u, s, a = "POST") => {
  fetch(e, {
    method: a,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(u)
  }).then((l) => {
    if (!l.ok)
      throw new Error(`Errore nella risposta del server: ${l.status} - ${l.statusText}`);
    return l.json();
  }).then((l) => {
    s(l);
  }).catch((l) => {
    console.error("Errore nella richiesta:", l);
  });
}, N = {
  postRequest: K
};
const E = (e, u) => {
  const s = e.__vccOpts || e;
  for (const [a, l] of u)
    s[a] = l;
  return s;
}, Q = { class: "d-flex justify-center align-center full-width-btn-group" }, W = {
  __name: "Login",
  props: {
    logo: {
      type: String,
      required: !0
    },
    title: {
      type: String,
      required: !0
    },
    signinTitle: {
      type: String
    },
    changePasswordTitle: {
      type: String
    },
    newPasswordTitle: {
      type: String
    },
    primaryColor: {
      type: String,
      required: !0
    },
    secondaryColor: {
      type: String,
      required: !0
    },
    redirectLink: {
      type: String,
      required: !0
    },
    signUp: {
      type: Boolean,
      default: !0
    },
    hostname: {
      type: String,
      required: !0
    }
  },
  emits: ["changeStatus"],
  setup(e, { emit: u }) {
    const s = e, a = g(""), l = g(""), i = g(""), w = g(!1), R = Z(), $ = u, b = () => {
      a.value && l.value && (i.value = "", N.postRequest(
        `${s.hostname}login`,
        {
          email: a.value,
          password: s.signUp ? O(l.value).toString() : l.value
        },
        function(v) {
          if (v.status === "ok") {
            if (localStorage.setItem("token", v.token), v.user_info)
              for (const r of Object.keys(v.user_info))
                localStorage.setItem(`user_${r}`, v.user_info[r]);
            R.push(d(s.redirectLink, v));
          } else
            i.value = v.error;
        }
      ));
    }, d = (v, r) => v.replace(/:([a-zA-Z0-9_]+)/g, (m, _) => _ in r ? r[_] : m), c = () => {
      w.value = !w.value;
    }, U = (v) => {
      $("changeStatus", v);
    };
    return (v, r) => {
      const m = n("v-img"), _ = n("v-card-title"), h = n("v-text-field"), S = n("v-col"), C = n("v-row"), q = n("v-btn"), I = n("v-alert"), T = n("v-form"), k = n("v-card-text"), D = n("v-card"), H = n("v-container");
      return p(), y(H, { class: "d-flex align-center justify-center fill-height" }, {
        default: t(() => [
          o(D, {
            elevation: 20,
            width: "500",
            class: "pa-5"
          }, {
            default: t(() => [
              o(m, {
                src: e.logo,
                "max-width": "100",
                class: "mx-auto mb-4",
                alt: "Logo"
              }, null, 8, ["src"]),
              o(_, { class: "text-h5 text-center mb-6" }, {
                default: t(() => [
                  f(P(e.title), 1)
                ]),
                _: 1
              }),
              o(k, null, {
                default: t(() => [
                  o(T, {
                    onSubmit: z(b, ["prevent"])
                  }, {
                    default: t(() => [
                      o(C, null, {
                        default: t(() => [
                          o(S, {
                            cols: "12",
                            md: "12"
                          }, {
                            default: t(() => [
                              o(h, {
                                label: "Email",
                                modelValue: a.value,
                                "onUpdate:modelValue": r[0] || (r[0] = (A) => a.value = A),
                                type: "email",
                                "prepend-icon": "mdi-email",
                                outlined: "",
                                class: "mb-2"
                              }, null, 8, ["modelValue"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      o(C, null, {
                        default: t(() => [
                          o(S, {
                            cols: "12",
                            md: "12"
                          }, {
                            default: t(() => [
                              o(h, {
                                type: w.value ? "text" : "password",
                                label: "Password",
                                modelValue: l.value,
                                "onUpdate:modelValue": r[1] || (r[1] = (A) => l.value = A),
                                "prepend-icon": "mdi-lock",
                                "append-inner-icon": w.value ? "mdi-eye-off" : "mdi-eye",
                                "onClick:appendInner": c,
                                outlined: "",
                                class: "mb-4"
                              }, null, 8, ["type", "modelValue", "append-inner-icon"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      o(C, null, {
                        default: t(() => [
                          o(S, {
                            cols: "12",
                            md: "12",
                            class: "text-center"
                          }, {
                            default: t(() => [
                              o(q, {
                                class: "full-width-btn mb-1 custom-btn",
                                variant: "elevated",
                                style: V({ "background-color": e.secondaryColor }),
                                type: "submit"
                              }, {
                                default: t(() => r[4] || (r[4] = [
                                  f(" Login ")
                                ])),
                                _: 1
                              }, 8, ["style"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      i.value ? (p(), y(C, { key: 0 }, {
                        default: t(() => [
                          o(S, {
                            cols: "12",
                            md: "12"
                          }, {
                            default: t(() => [
                              o(I, {
                                type: "error",
                                dense: ""
                              }, {
                                default: t(() => [
                                  f(P(i.value), 1)
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })) : L("", !0),
                      e.signUp ? (p(), y(C, { key: 1 }, {
                        default: t(() => [
                          o(S, {
                            cols: "12",
                            md: "12",
                            class: "text-center"
                          }, {
                            default: t(() => [
                              j("div", Q, [
                                o(q, {
                                  text: "",
                                  onClick: r[2] || (r[2] = (A) => U(2)),
                                  class: "custom-btn full-width-btn",
                                  style: V({ "background-color": e.primaryColor })
                                }, {
                                  default: t(() => r[5] || (r[5] = [
                                    f(" Registrati qui ")
                                  ])),
                                  _: 1
                                }, 8, ["style"]),
                                r[7] || (r[7] = j("span", { class: "ml-1 mr-1" }, null, -1)),
                                o(q, {
                                  text: "",
                                  onClick: r[3] || (r[3] = (A) => U(3)),
                                  class: "custom-btn full-width-btn",
                                  style: V({ "background-color": e.primaryColor })
                                }, {
                                  default: t(() => r[6] || (r[6] = [
                                    f(" Reset password ")
                                  ])),
                                  _: 1
                                }, 8, ["style"])
                              ])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })) : L("", !0)
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
      });
    };
  }
}, X = /* @__PURE__ */ E(W, [["__scopeId", "data-v-10ac39ff"]]), B = [
  (e) => e ? !0 : "Campo obbligatorio"
], ee = B.concat([
  (e) => /.+@.+\..+/.test(e) ? !0 : "E-mail non valida."
]), te = B.concat([
  (e) => /^(https?:\/\/)?([\w-]+\.)+([a-z]{2,})+(\/[\w-]*)*(\?[a-z0-9-]+=[a-z0-9-%]+(&[a-z0-9-]+=[a-z0-9-%]+)*)?$/i.test(e) ? !0 : "Sito non valido."
]), oe = B.concat([
  (e) => /[A-Z]/.test(e) ? !0 : "La password deve contenere almeno una lettera maiuscola.",
  (e) => /[a-z]/.test(e) ? !0 : "La password deve contenere almeno una lettera minuscola.",
  (e) => /\d/.test(e) ? !0 : "La password deve contenere almeno un numero.",
  (e) => e.length >= 8 ? !0 : "La password deve contenere almeno 8 caratteri."
]), ne = (e, u) => {
  const s = [];
  for (const a of u) {
    const l = a(e);
    l !== !0 && s.push(l);
  }
  return s.length === 0 ? null : s;
}, x = {
  validateInput: ne,
  requiredRules: B,
  emailRules: ee,
  siteRules: te,
  passwordRules: oe
};
const le = { class: "d-flex justify-start align-center" }, re = {
  __name: "Signin",
  props: {
    logo: {
      type: String,
      required: !0
    },
    title: {
      type: String,
      required: !0
    },
    primaryColor: {
      type: String,
      required: !0
    },
    secondaryColor: {
      type: String,
      required: !0
    },
    redirectLink: {
      type: String,
      required: !0
    },
    hostname: {
      type: String,
      required: !0
    }
  },
  emits: ["changeStatus"],
  setup(e, { emit: u }) {
    const s = e, a = g(""), l = g(""), i = g(""), w = g("error"), R = u, $ = (d) => {
      R("changeStatus", d);
    }, b = () => {
      !x.validateInput(a.value, x.emailRules) && !x.validateInput(l.value, x.requiredRules) && (i.value = "", N.postRequest(
        `${s.hostname}register-user`,
        {
          name: l.value,
          email: a.value
        },
        function(d) {
          d.status === "ok" ? (w.value = "success", i.value = d.message) : (w.value = "error", i.value = d.error);
        }
      ));
    };
    return (d, c) => {
      const U = n("v-img"), v = n("v-card-title"), r = n("v-text-field"), m = n("v-col"), _ = n("v-row"), h = n("v-btn"), S = n("v-alert"), C = n("v-form"), q = n("v-card-text"), I = n("v-card"), T = n("v-container");
      return p(), y(T, { class: "d-flex align-center justify-center fill-height" }, {
        default: t(() => [
          o(I, {
            elevation: 20,
            width: "500",
            class: "pa-5"
          }, {
            default: t(() => [
              o(U, {
                src: e.logo,
                "max-width": "100",
                class: "mx-auto mb-4",
                alt: "Logo"
              }, null, 8, ["src"]),
              o(v, { class: "text-h5 text-center mb-6" }, {
                default: t(() => [
                  f(P(e.title), 1)
                ]),
                _: 1
              }),
              o(q, null, {
                default: t(() => [
                  o(C, {
                    onSubmit: z(b, ["prevent"])
                  }, {
                    default: t(() => [
                      o(_, null, {
                        default: t(() => [
                          o(m, {
                            cols: "12",
                            md: "12"
                          }, {
                            default: t(() => [
                              o(r, {
                                label: "Nome",
                                modelValue: l.value,
                                "onUpdate:modelValue": c[0] || (c[0] = (k) => l.value = k),
                                outlined: "",
                                class: "mb-4"
                              }, null, 8, ["modelValue"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      o(_, null, {
                        default: t(() => [
                          o(m, {
                            cols: "12",
                            md: "12"
                          }, {
                            default: t(() => [
                              o(r, {
                                label: "Email",
                                modelValue: a.value,
                                "onUpdate:modelValue": c[1] || (c[1] = (k) => a.value = k),
                                type: "email",
                                outlined: "",
                                class: "mb-4"
                              }, null, 8, ["modelValue"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      o(_, null, {
                        default: t(() => [
                          o(m, {
                            cols: "12",
                            md: "12",
                            class: "text-center"
                          }, {
                            default: t(() => [
                              o(h, {
                                block: "",
                                variant: "elevated",
                                style: V({ "background-color": e.secondaryColor }),
                                type: "submit",
                                class: "mb-4 custom-btn"
                              }, {
                                default: t(() => c[3] || (c[3] = [
                                  f(" Registrati ")
                                ])),
                                _: 1
                              }, 8, ["style"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      i.value ? (p(), y(_, { key: 0 }, {
                        default: t(() => [
                          o(m, {
                            cols: "12",
                            md: "12"
                          }, {
                            default: t(() => [
                              o(S, {
                                type: w.value,
                                dense: ""
                              }, {
                                default: t(() => [
                                  f(P(i.value), 1)
                                ]),
                                _: 1
                              }, 8, ["type"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })) : L("", !0),
                      o(_, null, {
                        default: t(() => [
                          o(m, {
                            cols: "12",
                            md: "12"
                          }, {
                            default: t(() => [
                              j("div", le, [
                                o(h, {
                                  text: "",
                                  onClick: c[2] || (c[2] = (k) => $(1)),
                                  style: V({ "background-color": e.primaryColor }),
                                  class: "custom-btn full-width-btn"
                                }, {
                                  default: t(() => c[4] || (c[4] = [
                                    f(" Torna al login ")
                                  ])),
                                  _: 1
                                }, 8, ["style"])
                              ])
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
              })
            ]),
            _: 1
          })
        ]),
        _: 1
      });
    };
  }
}, ae = /* @__PURE__ */ E(re, [["__scopeId", "data-v-c31c9e85"]]);
const se = { class: "d-flex justify-start align-center" }, ue = {
  __name: "ChangePassword",
  props: {
    logo: {
      type: String,
      required: !0
    },
    title: {
      type: String,
      required: !0
    },
    primaryColor: {
      type: String,
      required: !0
    },
    secondaryColor: {
      type: String,
      required: !0
    },
    redirectLink: {
      type: String,
      required: !0
    },
    hostname: {
      type: String,
      required: !0
    }
  },
  emits: ["changeStatus"],
  setup(e, { emit: u }) {
    const s = e, a = g(""), l = g(""), i = g("error"), w = u, R = (b) => {
      w("changeStatus", b);
    }, $ = () => {
      x.validateInput(a.value, x.emailRules) || (l.value = "", N.postRequest(
        `${s.hostname}ask-change-password`,
        {
          email: a.value
        },
        function(b) {
          b.status == "ok" ? (i.value = "success", l.value = b.message) : (i.value = "error", l.value = b.error);
        }
      ));
    };
    return (b, d) => {
      const c = n("v-img"), U = n("v-card-title"), v = n("v-text-field"), r = n("v-col"), m = n("v-row"), _ = n("v-btn"), h = n("v-alert"), S = n("v-form"), C = n("v-card-text"), q = n("v-card"), I = n("v-container");
      return p(), y(I, { class: "d-flex align-center justify-center fill-height" }, {
        default: t(() => [
          o(q, {
            elevation: 20,
            width: "500",
            class: "pa-5"
          }, {
            default: t(() => [
              o(c, {
                src: e.logo,
                "max-width": "100",
                class: "mx-auto mb-4",
                alt: "Logo"
              }, null, 8, ["src"]),
              o(U, { class: "text-h5 text-center mb-6" }, {
                default: t(() => [
                  f(P(e.title), 1)
                ]),
                _: 1
              }),
              o(C, null, {
                default: t(() => [
                  o(S, {
                    onSubmit: z($, ["prevent"])
                  }, {
                    default: t(() => [
                      o(m, null, {
                        default: t(() => [
                          o(r, {
                            cols: "12",
                            md: "12"
                          }, {
                            default: t(() => [
                              o(v, {
                                label: "Email",
                                modelValue: a.value,
                                "onUpdate:modelValue": d[0] || (d[0] = (T) => a.value = T),
                                type: "email",
                                outlined: "",
                                class: "mb-4"
                              }, null, 8, ["modelValue"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      o(m, null, {
                        default: t(() => [
                          o(r, {
                            cols: "12",
                            md: "12",
                            class: "text-center"
                          }, {
                            default: t(() => [
                              o(_, {
                                block: "",
                                variant: "elevated",
                                style: V({ "background-color": e.secondaryColor }),
                                type: "submit",
                                class: "mb-4 custom-btn"
                              }, {
                                default: t(() => d[2] || (d[2] = [
                                  f(" Invia mail ")
                                ])),
                                _: 1
                              }, 8, ["style"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      l.value ? (p(), y(m, { key: 0 }, {
                        default: t(() => [
                          o(r, {
                            cols: "12",
                            md: "12"
                          }, {
                            default: t(() => [
                              o(h, {
                                type: i.value,
                                dense: ""
                              }, {
                                default: t(() => [
                                  f(P(l.value), 1)
                                ]),
                                _: 1
                              }, 8, ["type"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })) : L("", !0),
                      o(m, null, {
                        default: t(() => [
                          o(r, {
                            cols: "12",
                            md: "12"
                          }, {
                            default: t(() => [
                              j("div", se, [
                                o(_, {
                                  text: "",
                                  onClick: d[1] || (d[1] = (T) => R(1)),
                                  style: V({ "background-color": e.primaryColor }),
                                  class: "custom-btn full-width-btn"
                                }, {
                                  default: t(() => d[3] || (d[3] = [
                                    f(" Torna al login ")
                                  ])),
                                  _: 1
                                }, 8, ["style"])
                              ])
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
              })
            ]),
            _: 1
          })
        ]),
        _: 1
      });
    };
  }
}, ie = /* @__PURE__ */ E(ue, [["__scopeId", "data-v-d965af57"]]);
const ce = { class: "d-flex justify-start align-center" }, de = {
  __name: "Password",
  props: {
    logo: {
      type: String,
      required: !0
    },
    title: {
      type: String,
      required: !0
    },
    primaryColor: {
      type: String,
      required: !0
    },
    secondaryColor: {
      type: String,
      required: !0
    },
    redirectLink: {
      type: String,
      required: !0
    },
    hostname: {
      type: String,
      required: !0
    }
  },
  setup(e) {
    const u = e, s = g(""), a = g(""), l = g(""), i = g("error"), w = Z(), R = G(), $ = () => {
      w.push(u.redirectLink);
    }, b = () => {
      !x.validateInput(s.value, x.passwordRules) && !x.validateInput(a.value, x.passwordRules) && (s.value !== a.value ? (i.value = "error", l.value = "Le password non coincidono") : (l.value = "", N.postRequest(
        `${u.hostname}change-password`,
        {
          pass_token: R.params.token,
          new_password: O(s.value).toString()
        },
        function(d) {
          d.status === "ok" ? (i.value = "success", l.value = d.message) : (i.value = "error", l.value = d.error);
        }
      )));
    };
    return (d, c) => {
      const U = n("v-img"), v = n("v-card-title"), r = n("v-text-field"), m = n("v-col"), _ = n("v-row"), h = n("v-btn"), S = n("v-alert"), C = n("v-form"), q = n("v-card-text"), I = n("v-card"), T = n("v-container");
      return p(), y(T, { class: "d-flex align-center justify-center fill-height" }, {
        default: t(() => [
          o(I, {
            elevation: 20,
            width: "500",
            class: "pa-5"
          }, {
            default: t(() => [
              o(U, {
                src: e.logo,
                "max-width": "100",
                class: "mx-auto mb-4",
                alt: "Logo"
              }, null, 8, ["src"]),
              o(v, { class: "text-h5 text-center mb-6" }, {
                default: t(() => [
                  f(P(e.title), 1)
                ]),
                _: 1
              }),
              o(q, null, {
                default: t(() => [
                  o(C, {
                    onSubmit: z(b, ["prevent"])
                  }, {
                    default: t(() => [
                      o(_, null, {
                        default: t(() => [
                          o(m, { cols: "12" }, {
                            default: t(() => [
                              o(r, {
                                label: "Password",
                                modelValue: s.value,
                                "onUpdate:modelValue": c[0] || (c[0] = (k) => s.value = k),
                                rules: M(x).passwordRules,
                                type: "password",
                                outlined: "",
                                class: "mb-4"
                              }, null, 8, ["modelValue", "rules"])
                            ]),
                            _: 1
                          }),
                          o(m, { cols: "12" }, {
                            default: t(() => [
                              o(r, {
                                label: "Conferma password",
                                modelValue: a.value,
                                "onUpdate:modelValue": c[1] || (c[1] = (k) => a.value = k),
                                rules: M(x).passwordRules,
                                type: "password",
                                outlined: "",
                                class: "mb-4"
                              }, null, 8, ["modelValue", "rules"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      o(_, null, {
                        default: t(() => [
                          o(m, {
                            cols: "12",
                            class: "text-center"
                          }, {
                            default: t(() => [
                              o(h, {
                                block: "",
                                variant: "elevated",
                                style: V({ "background-color": e.secondaryColor }),
                                type: "submit",
                                class: "mb-4 custom-btn"
                              }, {
                                default: t(() => c[2] || (c[2] = [
                                  f(" Invia ")
                                ])),
                                _: 1
                              }, 8, ["style"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      l.value ? (p(), y(_, { key: 0 }, {
                        default: t(() => [
                          o(m, { cols: "12" }, {
                            default: t(() => [
                              o(S, {
                                type: i.value,
                                dense: ""
                              }, {
                                default: t(() => [
                                  f(P(l.value), 1)
                                ]),
                                _: 1
                              }, 8, ["type"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })) : L("", !0),
                      o(_, null, {
                        default: t(() => [
                          o(m, {
                            cols: "12",
                            class: "text-center"
                          }, {
                            default: t(() => [
                              j("div", ce, [
                                o(h, {
                                  text: "",
                                  onClick: $,
                                  style: V({ "background-color": e.primaryColor }),
                                  class: "custom-btn full-width-btn"
                                }, {
                                  default: t(() => c[3] || (c[3] = [
                                    f(" Torna al login ")
                                  ])),
                                  _: 1
                                }, 8, ["style"])
                              ])
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
              })
            ]),
            _: 1
          })
        ]),
        _: 1
      });
    };
  }
}, me = /* @__PURE__ */ E(de, [["__scopeId", "data-v-9b94dbdc"]]), pe = {
  __name: "AuthManager",
  props: {
    logo: {
      type: String,
      required: !0
    },
    title: {
      type: String,
      required: !0
    },
    signinTitle: {
      type: String
    },
    changePasswordTitle: {
      type: String
    },
    newPasswordTitle: {
      type: String
    },
    primaryColor: {
      type: String,
      required: !0
    },
    secondaryColor: {
      type: String,
      required: !0
    },
    redirectLink: {
      type: String,
      required: !0
    },
    signUp: {
      type: Boolean,
      default: !0
    },
    hostname: {
      type: String,
      required: !0
    }
  },
  setup(e) {
    const u = g(1), s = (a) => {
      u.value = a;
    };
    return (a, l) => {
      const i = n("v-container");
      return p(), y(i, { class: "login-container" }, {
        default: t(() => [
          u.value == 1 ? (p(), y(X, {
            key: 0,
            onChangeStatus: s,
            logo: e.logo,
            title: e.title,
            primaryColor: e.primaryColor,
            secondaryColor: e.secondaryColor,
            redirectLink: e.redirectLink,
            signUp: e.signUp,
            hostname: e.hostname
          }, null, 8, ["logo", "title", "primaryColor", "secondaryColor", "redirectLink", "signUp", "hostname"])) : L("", !0),
          u.value == 2 && e.signUp ? (p(), y(ae, {
            key: 1,
            onChangeStatus: s,
            logo: e.logo,
            title: e.signinTitle,
            primaryColor: e.primaryColor,
            secondaryColor: e.secondaryColor,
            redirectLink: e.redirectLink,
            hostname: e.hostname
          }, null, 8, ["logo", "title", "primaryColor", "secondaryColor", "redirectLink", "hostname"])) : L("", !0),
          u.value == 3 && e.signUp ? (p(), y(ie, {
            key: 2,
            onChangeStatus: s,
            logo: e.logo,
            title: e.changePasswordTitle,
            primaryColor: e.primaryColor,
            secondaryColor: e.secondaryColor,
            redirectLink: e.redirectLink,
            hostname: e.hostname
          }, null, 8, ["logo", "title", "primaryColor", "secondaryColor", "redirectLink", "hostname"])) : L("", !0),
          u.value == 4 && e.signUp ? (p(), y(me, {
            key: 3,
            onChangeStatus: s,
            logo: e.logo,
            title: e.newPasswordTitle,
            primaryColor: e.primaryColor,
            secondaryColor: e.secondaryColor,
            redirectLink: e.redirectLink,
            hostname: e.hostname
          }, null, 8, ["logo", "title", "primaryColor", "secondaryColor", "redirectLink", "hostname"])) : L("", !0)
        ]),
        _: 1
      });
    };
  }
};
const ve = {
  __name: "UpArrow",
  setup(e) {
    const u = g(!1), s = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }, a = () => {
      window.scrollY >= 250 ? (u.value = !0, console.log("ciao")) : (u.value = !1, console.log("ciao2"));
    };
    return J(() => {
      window.addEventListener("scroll", a);
    }), Y(() => {
      window.removeEventListener("scroll", a);
    }), (l, i) => {
      const w = n("v-UpArrow");
      return p(), y(w, null, {
        default: t(() => [
          j("div", {
            class: F({ "sup-container shadown": !0, visible: u.value }),
            onClick: s
          }, i[0] || (i[0] = [
            j("i", {
              class: "fas fa-arrow-up",
              id: "UpArrow"
            }, null, -1)
          ]), 2)
        ]),
        _: 1
      });
    };
  }
}, ye = /* @__PURE__ */ E(ve, [["__scopeId", "data-v-a7ef9f0e"]]);
export {
  pe as AuthManager,
  me as Password,
  ye as UpArrow
};
