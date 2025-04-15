import { computed as Q, onMounted as H, ref as y, resolveComponent as n, openBlock as _, createBlock as b, withCtx as t, createVNode as o, createTextVNode as f, toDisplayString as P, withModifiers as z, createCommentVNode as q, createElementVNode as V, normalizeStyle as R, unref as G } from "vue";
import { SHA256 as E } from "crypto-js";
import { useRouter as Z, useRoute as X } from "vue-router";
const F = (e, d, s, i = "POST") => {
  fetch(e, {
    method: i,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(d)
  }).then((r) => {
    if (!r.ok)
      throw new Error(`Errore nella risposta del server: ${r.status} - ${r.statusText}`);
    return r.json();
  }).then((r) => {
    s(r);
  }).catch((r) => {
    console.error("Errore nella richiesta:", r);
  });
}, D = {
  postRequest: F
};
const U = (e, d) => {
  const s = e.__vccOpts || e;
  for (const [i, r] of d)
    s[i] = r;
  return s;
}, K = {
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
    },
    googleClientId: {
      type: String,
      default: ""
    }
  },
  emits: ["changeStatus"],
  setup(e, { emit: d }) {
    const s = e, i = Q(() => !!s.googleClientId), r = () => {
      google.accounts.id.initialize({
        client_id: s.googleClientId,
        callback: g
      }), google.accounts.id.prompt();
    }, g = (l) => {
      const a = l.credential;
      D.postRequest(
        `${s.hostname}google-login`,
        { token: a },
        (v) => {
          if (v.status === "ok") {
            if (localStorage.setItem("token", v.token), v.user_info)
              for (const w of Object.keys(v.user_info))
                localStorage.setItem(`user_${w}`, v.user_info[w]);
            u.push(A(s.redirectLink, v));
          } else
            M.value = v.error;
        }
      );
    };
    H(() => {
      const l = document.createElement("script");
      l.src = "https://accounts.google.com/gsi/client", l.async = !0, l.defer = !0, document.body.appendChild(l);
    });
    const S = y(""), L = y(""), M = y(""), p = y(!1), u = Z(), c = d, T = () => {
      S.value && L.value && (M.value = "", D.postRequest(
        `${s.hostname}login`,
        {
          email: S.value,
          password: s.signUp ? E(L.value).toString() : L.value
        },
        function(l) {
          if (l.status === "ok") {
            if (localStorage.setItem("token", l.token), l.user_info)
              for (const a of Object.keys(l.user_info))
                localStorage.setItem(`user_${a}`, l.user_info[a]);
            u.push(A(s.redirectLink, l));
          } else
            M.value = l.error;
        }
      ));
    }, A = (l, a) => l.replace(/:([a-zA-Z0-9_]+)/g, (v, w) => w in a ? a[w] : v), k = () => {
      p.value = !p.value;
    }, m = (l) => {
      c("changeStatus", l);
    };
    return (l, a) => {
      const v = n("v-img"), w = n("v-card-title"), j = n("v-text-field"), h = n("v-col"), x = n("v-row"), C = n("v-btn"), O = n("v-alert"), B = n("v-form"), J = n("v-card-text"), W = n("v-card"), Y = n("v-container");
      return _(), b(Y, { class: "d-flex align-center justify-center fill-height" }, {
        default: t(() => [
          o(W, {
            elevation: 20,
            width: "500",
            class: "pa-5"
          }, {
            default: t(() => [
              o(v, {
                src: e.logo,
                "max-width": "100",
                class: "mx-auto mb-4",
                alt: "Logo"
              }, null, 8, ["src"]),
              o(w, { class: "text-h5 text-center mb-6" }, {
                default: t(() => [
                  f(P(e.title), 1)
                ]),
                _: 1
              }),
              o(J, null, {
                default: t(() => [
                  o(B, {
                    onSubmit: z(T, ["prevent"])
                  }, {
                    default: t(() => [
                      o(x, null, {
                        default: t(() => [
                          o(h, {
                            cols: "12",
                            md: "12"
                          }, {
                            default: t(() => [
                              o(j, {
                                label: "Email",
                                modelValue: S.value,
                                "onUpdate:modelValue": a[0] || (a[0] = (N) => S.value = N),
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
                      o(x, null, {
                        default: t(() => [
                          o(h, {
                            cols: "12",
                            md: "12"
                          }, {
                            default: t(() => [
                              o(j, {
                                type: p.value ? "text" : "password",
                                label: "Password",
                                modelValue: L.value,
                                "onUpdate:modelValue": a[1] || (a[1] = (N) => L.value = N),
                                "prepend-icon": "mdi-lock",
                                "append-inner-icon": p.value ? "mdi-eye-off" : "mdi-eye",
                                "onClick:appendInner": k,
                                outlined: "",
                                class: "mb-4"
                              }, null, 8, ["type", "modelValue", "append-inner-icon"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      o(x, null, {
                        default: t(() => [
                          o(h, {
                            cols: "12",
                            md: "12",
                            class: "d-flex justify-center"
                          }, {
                            default: t(() => [
                              o(C, {
                                class: "mb-4 mx-auto",
                                variant: "elevated",
                                color: e.secondaryColor,
                                type: "submit",
                                width: l.$vuetify.display.width > 400 ? 350 : 280
                              }, {
                                default: t(() => a[4] || (a[4] = [
                                  f(" Login ")
                                ])),
                                _: 1
                              }, 8, ["color", "width"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      M.value ? (_(), b(x, { key: 0 }, {
                        default: t(() => [
                          o(h, {
                            cols: "12",
                            md: "12"
                          }, {
                            default: t(() => [
                              o(O, {
                                type: "error",
                                dense: ""
                              }, {
                                default: t(() => [
                                  f(P(M.value), 1)
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })) : q("", !0),
                      i.value ? (_(), b(x, { key: 1 }, {
                        default: t(() => [
                          o(h, {
                            cols: "12",
                            md: "12",
                            class: "d-flex justify-center"
                          }, {
                            default: t(() => [
                              o(C, {
                                class: "mb-4 mx-auto google-btn",
                                variant: "elevated",
                                onClick: r,
                                height: "40",
                                width: l.$vuetify.display.width > 400 ? 350 : 280
                              }, {
                                default: t(() => a[5] || (a[5] = [
                                  V("div", { class: "google-icon-wrapper" }, [
                                    V("img", {
                                      src: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMTcuNiA5LjJsLS4xLTEuOEg5djMuNGg0LjhDMTMuNiAxMiAxMyAxMyAxMiAxMy42djIuMmgzYTguOCA4LjggMCAwIDAgMi42LTYuNnoiIGZpbGw9IiM0Mjg1RjQiIGZpbGwtcnVsZT0ibm9uemVybyIvPjxwYXRoIGQ9Ik05IDE4YzIuNCAwIDQuNS0uOCA2LTIuMmwtMy0yLjJhNS40IDUuNCAwIDAgMS04LTIuOUgxVjEzYTkgOSAwIDAgMCA4IDV6IiBmaWxsPSIjMzRBODUzIiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNNCAxMC43YTUuNCA1LjQgMCAwIDEgMC0zLjRWNUgxYTkgOSAwIDAgMCAwIDhsMy0yLjN6IiBmaWxsPSIjRkJCQzA1IiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNOSAzLjZjMS4zIDAgMi41LjQgMy40IDEuM0wxNSAyLjNBOSA5IDAgMCAwIDEgNWwzIDIuNGE1LjQgNS40IDAgMCAxIDUtMy43eiIgZmlsbD0iI0VBNDMzNSIgZmlsbC1ydWxlPSJub256ZXJvIi8+PHBhdGggZD0iTTAgMGgxOHYxOEgweiIvPjwvZz48L3N2Zz4=",
                                      alt: "Google logo",
                                      class: "google-icon"
                                    })
                                  ], -1),
                                  V("span", { class: "google-btn-text" }, "Accedi con Google", -1)
                                ])),
                                _: 1
                              }, 8, ["width"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })) : q("", !0),
                      e.signUp ? (_(), b(x, { key: 2 }, {
                        default: t(() => [
                          o(h, {
                            cols: "12",
                            md: "12"
                          }, {
                            default: t(() => [
                              V("div", {
                                class: "d-flex flex-column flex-sm-row justify-center",
                                style: R({ maxWidth: l.$vuetify.display.width > 400 ? "350px" : "280px", margin: "0 auto", gap: "16px" })
                              }, [
                                o(C, {
                                  text: "",
                                  onClick: a[2] || (a[2] = (N) => m(2)),
                                  class: "custom-btn flex-grow-1",
                                  color: e.primaryColor,
                                  block: l.$vuetify.display.xs
                                }, {
                                  default: t(() => a[6] || (a[6] = [
                                    f(" Registrati qui ")
                                  ])),
                                  _: 1
                                }, 8, ["color", "block"]),
                                o(C, {
                                  text: "",
                                  onClick: a[3] || (a[3] = (N) => m(3)),
                                  class: "custom-btn flex-grow-1",
                                  color: e.primaryColor,
                                  block: l.$vuetify.display.xs
                                }, {
                                  default: t(() => a[7] || (a[7] = [
                                    f(" Reset password ")
                                  ])),
                                  _: 1
                                }, 8, ["color", "block"])
                              ], 4)
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })) : q("", !0)
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
}, ee = /* @__PURE__ */ U(K, [["__scopeId", "data-v-1960da10"]]), $ = [
  (e) => e ? !0 : "Campo obbligatorio"
], te = $.concat([
  (e) => /.+@.+\..+/.test(e) ? !0 : "E-mail non valida."
]), oe = $.concat([
  (e) => /^(https?:\/\/)?([\w-]+\.)+([a-z]{2,})+(\/[\w-]*)*(\?[a-z0-9-]+=[a-z0-9-%]+(&[a-z0-9-]+=[a-z0-9-%]+)*)?$/i.test(e) ? !0 : "Sito non valido."
]), ne = $.concat([
  (e) => /[A-Z]/.test(e) ? !0 : "La password deve contenere almeno una lettera maiuscola.",
  (e) => /[a-z]/.test(e) ? !0 : "La password deve contenere almeno una lettera minuscola.",
  (e) => /\d/.test(e) ? !0 : "La password deve contenere almeno un numero.",
  (e) => e.length >= 8 ? !0 : "La password deve contenere almeno 8 caratteri."
]), le = (e, d) => {
  const s = [];
  for (const i of d) {
    const r = i(e);
    r !== !0 && s.push(r);
  }
  return s.length === 0 ? null : s;
}, I = {
  validateInput: le,
  requiredRules: $,
  emailRules: te,
  siteRules: oe,
  passwordRules: ne
};
const re = { class: "d-flex justify-start align-center" }, ae = {
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
  setup(e, { emit: d }) {
    const s = e, i = y(""), r = y(""), g = y(""), S = y("error"), L = d, M = (u) => {
      L("changeStatus", u);
    }, p = () => {
      !I.validateInput(i.value, I.emailRules) && !I.validateInput(r.value, I.requiredRules) && (g.value = "", D.postRequest(
        `${s.hostname}register-user`,
        {
          name: r.value,
          email: i.value
        },
        function(u) {
          u.status === "ok" ? (S.value = "success", g.value = u.message) : (S.value = "error", g.value = u.error);
        }
      ));
    };
    return (u, c) => {
      const T = n("v-img"), A = n("v-card-title"), k = n("v-text-field"), m = n("v-col"), l = n("v-row"), a = n("v-btn"), v = n("v-alert"), w = n("v-form"), j = n("v-card-text"), h = n("v-card"), x = n("v-container");
      return _(), b(x, { class: "d-flex align-center justify-center fill-height" }, {
        default: t(() => [
          o(h, {
            elevation: 20,
            width: "500",
            class: "pa-5"
          }, {
            default: t(() => [
              o(T, {
                src: e.logo,
                "max-width": "100",
                class: "mx-auto mb-4",
                alt: "Logo"
              }, null, 8, ["src"]),
              o(A, { class: "text-h5 text-center mb-6" }, {
                default: t(() => [
                  f(P(e.title), 1)
                ]),
                _: 1
              }),
              o(j, null, {
                default: t(() => [
                  o(w, {
                    onSubmit: z(p, ["prevent"])
                  }, {
                    default: t(() => [
                      o(l, null, {
                        default: t(() => [
                          o(m, {
                            cols: "12",
                            md: "12"
                          }, {
                            default: t(() => [
                              o(k, {
                                label: "Nome",
                                modelValue: r.value,
                                "onUpdate:modelValue": c[0] || (c[0] = (C) => r.value = C),
                                outlined: "",
                                class: "mb-4"
                              }, null, 8, ["modelValue"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      o(l, null, {
                        default: t(() => [
                          o(m, {
                            cols: "12",
                            md: "12"
                          }, {
                            default: t(() => [
                              o(k, {
                                label: "Email",
                                modelValue: i.value,
                                "onUpdate:modelValue": c[1] || (c[1] = (C) => i.value = C),
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
                      o(l, null, {
                        default: t(() => [
                          o(m, {
                            cols: "12",
                            md: "12",
                            class: "text-center"
                          }, {
                            default: t(() => [
                              o(a, {
                                block: "",
                                variant: "elevated",
                                style: R({ "background-color": e.secondaryColor }),
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
                      g.value ? (_(), b(l, { key: 0 }, {
                        default: t(() => [
                          o(m, {
                            cols: "12",
                            md: "12"
                          }, {
                            default: t(() => [
                              o(v, {
                                type: S.value,
                                dense: ""
                              }, {
                                default: t(() => [
                                  f(P(g.value), 1)
                                ]),
                                _: 1
                              }, 8, ["type"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })) : q("", !0),
                      o(l, null, {
                        default: t(() => [
                          o(m, {
                            cols: "12",
                            md: "12"
                          }, {
                            default: t(() => [
                              V("div", re, [
                                o(a, {
                                  text: "",
                                  onClick: c[2] || (c[2] = (C) => M(1)),
                                  style: R({ "background-color": e.primaryColor }),
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
}, se = /* @__PURE__ */ U(ae, [["__scopeId", "data-v-c31c9e85"]]);
const ie = { class: "d-flex justify-start align-center" }, ue = {
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
  setup(e, { emit: d }) {
    const s = e, i = y(""), r = y(""), g = y("error"), S = d, L = (p) => {
      S("changeStatus", p);
    }, M = () => {
      I.validateInput(i.value, I.emailRules) || (r.value = "", D.postRequest(
        `${s.hostname}ask-change-password`,
        {
          email: i.value
        },
        function(p) {
          p.status == "ok" ? (g.value = "success", r.value = p.message) : (g.value = "error", r.value = p.error);
        }
      ));
    };
    return (p, u) => {
      const c = n("v-img"), T = n("v-card-title"), A = n("v-text-field"), k = n("v-col"), m = n("v-row"), l = n("v-btn"), a = n("v-alert"), v = n("v-form"), w = n("v-card-text"), j = n("v-card"), h = n("v-container");
      return _(), b(h, { class: "d-flex align-center justify-center fill-height" }, {
        default: t(() => [
          o(j, {
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
              o(T, { class: "text-h5 text-center mb-6" }, {
                default: t(() => [
                  f(P(e.title), 1)
                ]),
                _: 1
              }),
              o(w, null, {
                default: t(() => [
                  o(v, {
                    onSubmit: z(M, ["prevent"])
                  }, {
                    default: t(() => [
                      o(m, null, {
                        default: t(() => [
                          o(k, {
                            cols: "12",
                            md: "12"
                          }, {
                            default: t(() => [
                              o(A, {
                                label: "Email",
                                modelValue: i.value,
                                "onUpdate:modelValue": u[0] || (u[0] = (x) => i.value = x),
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
                          o(k, {
                            cols: "12",
                            md: "12",
                            class: "text-center"
                          }, {
                            default: t(() => [
                              o(l, {
                                block: "",
                                variant: "elevated",
                                style: R({ "background-color": e.secondaryColor }),
                                type: "submit",
                                class: "mb-4 custom-btn"
                              }, {
                                default: t(() => u[2] || (u[2] = [
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
                      r.value ? (_(), b(m, { key: 0 }, {
                        default: t(() => [
                          o(k, {
                            cols: "12",
                            md: "12"
                          }, {
                            default: t(() => [
                              o(a, {
                                type: g.value,
                                dense: ""
                              }, {
                                default: t(() => [
                                  f(P(r.value), 1)
                                ]),
                                _: 1
                              }, 8, ["type"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })) : q("", !0),
                      o(m, null, {
                        default: t(() => [
                          o(k, {
                            cols: "12",
                            md: "12"
                          }, {
                            default: t(() => [
                              V("div", ie, [
                                o(l, {
                                  text: "",
                                  onClick: u[1] || (u[1] = (x) => L(1)),
                                  style: R({ "background-color": e.primaryColor }),
                                  class: "custom-btn full-width-btn"
                                }, {
                                  default: t(() => u[3] || (u[3] = [
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
}, ce = /* @__PURE__ */ U(ue, [["__scopeId", "data-v-d965af57"]]);
const de = { class: "d-flex justify-start align-center" }, me = {
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
    const d = e, s = y(""), i = y(""), r = y(""), g = y("error"), S = Z(), L = X(), M = () => {
      S.push(d.redirectLink);
    }, p = () => {
      !I.validateInput(s.value, I.passwordRules) && !I.validateInput(i.value, I.passwordRules) && (s.value !== i.value ? (g.value = "error", r.value = "Le password non coincidono") : (r.value = "", D.postRequest(
        `${d.hostname}change-password`,
        {
          pass_token: L.params.token,
          new_password: E(s.value).toString()
        },
        function(u) {
          u.status === "ok" ? (g.value = "success", r.value = u.message) : (g.value = "error", r.value = u.error);
        }
      )));
    };
    return (u, c) => {
      const T = n("v-img"), A = n("v-card-title"), k = n("v-text-field"), m = n("v-col"), l = n("v-row"), a = n("v-btn"), v = n("v-alert"), w = n("v-form"), j = n("v-card-text"), h = n("v-card"), x = n("v-container");
      return _(), b(x, { class: "d-flex align-center justify-center fill-height" }, {
        default: t(() => [
          o(h, {
            elevation: 20,
            width: "500",
            class: "pa-5"
          }, {
            default: t(() => [
              o(T, {
                src: e.logo,
                "max-width": "100",
                class: "mx-auto mb-4",
                alt: "Logo"
              }, null, 8, ["src"]),
              o(A, { class: "text-h5 text-center mb-6" }, {
                default: t(() => [
                  f(P(e.title), 1)
                ]),
                _: 1
              }),
              o(j, null, {
                default: t(() => [
                  o(w, {
                    onSubmit: z(p, ["prevent"])
                  }, {
                    default: t(() => [
                      o(l, null, {
                        default: t(() => [
                          o(m, { cols: "12" }, {
                            default: t(() => [
                              o(k, {
                                label: "Password",
                                modelValue: s.value,
                                "onUpdate:modelValue": c[0] || (c[0] = (C) => s.value = C),
                                rules: G(I).passwordRules,
                                type: "password",
                                outlined: "",
                                class: "mb-4"
                              }, null, 8, ["modelValue", "rules"])
                            ]),
                            _: 1
                          }),
                          o(m, { cols: "12" }, {
                            default: t(() => [
                              o(k, {
                                label: "Conferma password",
                                modelValue: i.value,
                                "onUpdate:modelValue": c[1] || (c[1] = (C) => i.value = C),
                                rules: G(I).passwordRules,
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
                      o(l, null, {
                        default: t(() => [
                          o(m, {
                            cols: "12",
                            class: "text-center"
                          }, {
                            default: t(() => [
                              o(a, {
                                block: "",
                                variant: "elevated",
                                style: R({ "background-color": e.secondaryColor }),
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
                      r.value ? (_(), b(l, { key: 0 }, {
                        default: t(() => [
                          o(m, { cols: "12" }, {
                            default: t(() => [
                              o(v, {
                                type: g.value,
                                dense: ""
                              }, {
                                default: t(() => [
                                  f(P(r.value), 1)
                                ]),
                                _: 1
                              }, 8, ["type"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })) : q("", !0),
                      o(l, null, {
                        default: t(() => [
                          o(m, {
                            cols: "12",
                            class: "text-center"
                          }, {
                            default: t(() => [
                              V("div", de, [
                                o(a, {
                                  text: "",
                                  onClick: M,
                                  style: R({ "background-color": e.primaryColor }),
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
}, ge = /* @__PURE__ */ U(me, [["__scopeId", "data-v-9b94dbdc"]]), pe = {
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
    },
    googleClientId: {
      type: String,
      default: ""
    }
  },
  setup(e) {
    const d = y(1), s = (i) => {
      d.value = i;
    };
    return (i, r) => {
      const g = n("v-container");
      return _(), b(g, { class: "login-container" }, {
        default: t(() => [
          d.value == 1 ? (_(), b(ee, {
            key: 0,
            onChangeStatus: s,
            logo: e.logo,
            title: e.title,
            primaryColor: e.primaryColor,
            secondaryColor: e.secondaryColor,
            redirectLink: e.redirectLink,
            signUp: e.signUp,
            hostname: e.hostname,
            googleClientId: e.googleClientId
          }, null, 8, ["logo", "title", "primaryColor", "secondaryColor", "redirectLink", "signUp", "hostname", "googleClientId"])) : q("", !0),
          d.value == 2 && e.signUp ? (_(), b(se, {
            key: 1,
            onChangeStatus: s,
            logo: e.logo,
            title: e.signinTitle,
            primaryColor: e.primaryColor,
            secondaryColor: e.secondaryColor,
            redirectLink: e.redirectLink,
            hostname: e.hostname
          }, null, 8, ["logo", "title", "primaryColor", "secondaryColor", "redirectLink", "hostname"])) : q("", !0),
          d.value == 3 && e.signUp ? (_(), b(ce, {
            key: 2,
            onChangeStatus: s,
            logo: e.logo,
            title: e.changePasswordTitle,
            primaryColor: e.primaryColor,
            secondaryColor: e.secondaryColor,
            redirectLink: e.redirectLink,
            hostname: e.hostname
          }, null, 8, ["logo", "title", "primaryColor", "secondaryColor", "redirectLink", "hostname"])) : q("", !0),
          d.value == 4 && e.signUp ? (_(), b(ge, {
            key: 3,
            onChangeStatus: s,
            logo: e.logo,
            title: e.newPasswordTitle,
            primaryColor: e.primaryColor,
            secondaryColor: e.secondaryColor,
            redirectLink: e.redirectLink,
            hostname: e.hostname
          }, null, 8, ["logo", "title", "primaryColor", "secondaryColor", "redirectLink", "hostname"])) : q("", !0)
        ]),
        _: 1
      });
    };
  }
};
export {
  pe as AuthManager,
  ge as Password
};
