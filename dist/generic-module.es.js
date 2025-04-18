import { computed as Q, onMounted as H, ref as f, resolveComponent as n, openBlock as p, createBlock as _, withCtx as o, createVNode as t, createTextVNode as b, toDisplayString as P, withModifiers as z, createElementVNode as V, createCommentVNode as q, normalizeStyle as R, unref as G } from "vue";
import { SHA256 as E } from "crypto-js";
import { useRouter as Z, useRoute as X } from "vue-router";
const F = (e, d, a, i = "POST") => {
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
    a(r);
  }).catch((r) => {
    console.error("Errore nella richiesta:", r);
  });
}, D = {
  postRequest: F
};
const U = (e, d) => {
  const a = e.__vccOpts || e;
  for (const [i, r] of d)
    a[i] = r;
  return a;
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
    const a = e, i = Q(() => !!a.googleClientId), r = () => {
      google.accounts.id.initialize({
        client_id: a.googleClientId,
        callback: g
      }), google.accounts.id.prompt();
    }, g = (l) => {
      const s = l.credential;
      D.postRequest(
        `${a.hostname}google-login`,
        { token: s },
        (v) => {
          if (v.status === "ok") {
            if (localStorage.setItem("token", v.token), v.user_info)
              for (const w of Object.keys(v.user_info))
                localStorage.setItem(`user_${w}`, v.user_info[w]);
            u.push(A(a.redirectLink, v));
          } else
            M.value = v.error;
        }
      );
    };
    H(() => {
      const l = document.createElement("script");
      l.src = "https://accounts.google.com/gsi/client", l.async = !0, l.defer = !0, document.body.appendChild(l);
    });
    const S = f(""), L = f(""), M = f(""), y = f(!1), u = Z(), c = d, T = () => {
      S.value && L.value && (M.value = "", D.postRequest(
        `${a.hostname}login`,
        {
          email: S.value,
          password: a.signUp ? E(L.value).toString() : L.value
        },
        function(l) {
          if (l.status === "ok") {
            if (localStorage.setItem("token", l.token), l.user_info)
              for (const s of Object.keys(l.user_info))
                localStorage.setItem(`user_${s}`, l.user_info[s]);
            u.push(A(a.redirectLink, l));
          } else
            M.value = l.error;
        }
      ));
    }, A = (l, s) => l.replace(/:([a-zA-Z0-9_]+)/g, (v, w) => w in s ? s[w] : v), h = () => {
      y.value = !y.value;
    }, m = (l) => {
      c("changeStatus", l);
    };
    return (l, s) => {
      const v = n("v-img"), w = n("v-card-title"), j = n("v-text-field"), k = n("v-col"), x = n("v-row"), C = n("v-btn"), O = n("v-alert"), B = n("v-form"), J = n("v-card-text"), W = n("v-card"), Y = n("v-container");
      return p(), _(Y, { class: "d-flex align-center justify-center fill-height" }, {
        default: o(() => [
          t(W, {
            elevation: 20,
            width: "500",
            class: "pa-5"
          }, {
            default: o(() => [
              t(v, {
                src: e.logo,
                "max-width": "100",
                class: "mx-auto mb-4",
                alt: "Logo"
              }, null, 8, ["src"]),
              t(w, { class: "text-h5 text-center mb-6" }, {
                default: o(() => [
                  b(P(e.title), 1)
                ]),
                _: 1
              }),
              t(J, null, {
                default: o(() => [
                  t(B, {
                    onSubmit: z(T, ["prevent"])
                  }, {
                    default: o(() => [
                      t(x, null, {
                        default: o(() => [
                          t(k, {
                            cols: "12",
                            md: "12"
                          }, {
                            default: o(() => [
                              t(j, {
                                label: "Email",
                                modelValue: S.value,
                                "onUpdate:modelValue": s[0] || (s[0] = (N) => S.value = N),
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
                      t(x, null, {
                        default: o(() => [
                          t(k, {
                            cols: "12",
                            md: "12"
                          }, {
                            default: o(() => [
                              t(j, {
                                type: y.value ? "text" : "password",
                                label: "Password",
                                modelValue: L.value,
                                "onUpdate:modelValue": s[1] || (s[1] = (N) => L.value = N),
                                "prepend-icon": "mdi-lock",
                                "append-inner-icon": y.value ? "mdi-eye-off" : "mdi-eye",
                                "onClick:appendInner": h,
                                outlined: "",
                                class: "mb-4"
                              }, null, 8, ["type", "modelValue", "append-inner-icon"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      t(x, null, {
                        default: o(() => [
                          t(k, {
                            cols: "12",
                            md: "12",
                            class: "d-flex justify-center"
                          }, {
                            default: o(() => [
                              t(C, {
                                class: "mb-4 mx-auto",
                                variant: "elevated",
                                color: e.secondaryColor,
                                type: "submit",
                                width: l.$vuetify.display.width > 400 ? 350 : 280
                              }, {
                                default: o(() => s[4] || (s[4] = [
                                  b(" Login ")
                                ])),
                                _: 1
                              }, 8, ["color", "width"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      i.value ? (p(), _(x, { key: 0 }, {
                        default: o(() => [
                          t(k, {
                            cols: "12",
                            md: "12",
                            class: "d-flex justify-center"
                          }, {
                            default: o(() => [
                              t(C, {
                                class: "mb-4 mx-auto google-btn",
                                variant: "elevated",
                                onClick: r,
                                height: "40",
                                width: l.$vuetify.display.width > 400 ? 350 : 280
                              }, {
                                default: o(() => s[5] || (s[5] = [
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
                      e.signUp ? (p(), _(x, { key: 1 }, {
                        default: o(() => [
                          t(k, {
                            cols: "12",
                            md: "12"
                          }, {
                            default: o(() => [
                              V("div", {
                                class: "d-flex flex-column flex-sm-row justify-center",
                                style: R({ maxWidth: l.$vuetify.display.width > 400 ? "350px" : "280px", margin: "0 auto", gap: "16px" })
                              }, [
                                t(C, {
                                  text: "Registrati qui",
                                  onClick: s[2] || (s[2] = (N) => m(2)),
                                  class: "custom-btn flex-grow-1",
                                  color: e.primaryColor,
                                  block: l.$vuetify.display.xs
                                }, null, 8, ["color", "block"]),
                                t(C, {
                                  text: "Reset password",
                                  onClick: s[3] || (s[3] = (N) => m(3)),
                                  class: "custom-btn flex-grow-1",
                                  color: e.primaryColor,
                                  block: l.$vuetify.display.xs
                                }, null, 8, ["color", "block"])
                              ], 4)
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })) : q("", !0),
                      M.value ? (p(), _(x, { key: 2 }, {
                        default: o(() => [
                          t(k, {
                            cols: "12",
                            md: "12"
                          }, {
                            default: o(() => [
                              t(O, {
                                type: "error",
                                dense: ""
                              }, {
                                default: o(() => [
                                  b(P(M.value), 1)
                                ]),
                                _: 1
                              })
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
}, ee = /* @__PURE__ */ U(K, [["__scopeId", "data-v-b9e59114"]]), $ = [
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
  const a = [];
  for (const i of d) {
    const r = i(e);
    r !== !0 && a.push(r);
  }
  return a.length === 0 ? null : a;
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
    const a = e, i = f(""), r = f(""), g = f(""), S = f("error"), L = d, M = (u) => {
      L("changeStatus", u);
    }, y = () => {
      !I.validateInput(i.value, I.emailRules) && !I.validateInput(r.value, I.requiredRules) && (g.value = "", D.postRequest(
        `${a.hostname}register-user`,
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
      const T = n("v-img"), A = n("v-card-title"), h = n("v-text-field"), m = n("v-col"), l = n("v-row"), s = n("v-btn"), v = n("v-alert"), w = n("v-form"), j = n("v-card-text"), k = n("v-card"), x = n("v-container");
      return p(), _(x, { class: "d-flex align-center justify-center fill-height" }, {
        default: o(() => [
          t(k, {
            elevation: 20,
            width: "500",
            class: "pa-5"
          }, {
            default: o(() => [
              t(T, {
                src: e.logo,
                "max-width": "100",
                class: "mx-auto mb-4",
                alt: "Logo"
              }, null, 8, ["src"]),
              t(A, { class: "text-h5 text-center mb-6" }, {
                default: o(() => [
                  b(P(e.title), 1)
                ]),
                _: 1
              }),
              t(j, null, {
                default: o(() => [
                  t(w, {
                    onSubmit: z(y, ["prevent"])
                  }, {
                    default: o(() => [
                      t(l, null, {
                        default: o(() => [
                          t(m, {
                            cols: "12",
                            md: "12"
                          }, {
                            default: o(() => [
                              t(h, {
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
                      t(l, null, {
                        default: o(() => [
                          t(m, {
                            cols: "12",
                            md: "12"
                          }, {
                            default: o(() => [
                              t(h, {
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
                      t(l, null, {
                        default: o(() => [
                          t(m, {
                            cols: "12",
                            md: "12",
                            class: "text-center"
                          }, {
                            default: o(() => [
                              t(s, {
                                block: "",
                                variant: "elevated",
                                style: R({ "background-color": e.secondaryColor }),
                                type: "submit",
                                class: "mb-4 custom-btn"
                              }, {
                                default: o(() => c[3] || (c[3] = [
                                  b(" Registrati ")
                                ])),
                                _: 1
                              }, 8, ["style"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      g.value ? (p(), _(l, { key: 0 }, {
                        default: o(() => [
                          t(m, {
                            cols: "12",
                            md: "12"
                          }, {
                            default: o(() => [
                              t(v, {
                                type: S.value,
                                dense: ""
                              }, {
                                default: o(() => [
                                  b(P(g.value), 1)
                                ]),
                                _: 1
                              }, 8, ["type"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })) : q("", !0),
                      t(l, null, {
                        default: o(() => [
                          t(m, {
                            cols: "12",
                            md: "12"
                          }, {
                            default: o(() => [
                              V("div", re, [
                                t(s, {
                                  text: "",
                                  onClick: c[2] || (c[2] = (C) => M(1)),
                                  style: R({ "background-color": e.primaryColor }),
                                  class: "custom-btn full-width-btn"
                                }, {
                                  default: o(() => c[4] || (c[4] = [
                                    b(" Torna al login ")
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
    const a = e, i = f(""), r = f(""), g = f("error"), S = d, L = (y) => {
      S("changeStatus", y);
    }, M = () => {
      I.validateInput(i.value, I.emailRules) || (r.value = "", D.postRequest(
        `${a.hostname}ask-change-password`,
        {
          email: i.value
        },
        function(y) {
          y.status == "ok" ? (g.value = "success", r.value = y.message) : (g.value = "error", r.value = y.error);
        }
      ));
    };
    return (y, u) => {
      const c = n("v-img"), T = n("v-card-title"), A = n("v-text-field"), h = n("v-col"), m = n("v-row"), l = n("v-btn"), s = n("v-alert"), v = n("v-form"), w = n("v-card-text"), j = n("v-card"), k = n("v-container");
      return p(), _(k, { class: "d-flex align-center justify-center fill-height" }, {
        default: o(() => [
          t(j, {
            elevation: 20,
            width: "500",
            class: "pa-5"
          }, {
            default: o(() => [
              t(c, {
                src: e.logo,
                "max-width": "100",
                class: "mx-auto mb-4",
                alt: "Logo"
              }, null, 8, ["src"]),
              t(T, { class: "text-h5 text-center mb-6" }, {
                default: o(() => [
                  b(P(e.title), 1)
                ]),
                _: 1
              }),
              t(w, null, {
                default: o(() => [
                  t(v, {
                    onSubmit: z(M, ["prevent"])
                  }, {
                    default: o(() => [
                      t(m, null, {
                        default: o(() => [
                          t(h, {
                            cols: "12",
                            md: "12"
                          }, {
                            default: o(() => [
                              t(A, {
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
                      t(m, null, {
                        default: o(() => [
                          t(h, {
                            cols: "12",
                            md: "12",
                            class: "text-center"
                          }, {
                            default: o(() => [
                              t(l, {
                                block: "",
                                variant: "elevated",
                                style: R({ "background-color": e.secondaryColor }),
                                type: "submit",
                                class: "mb-4 custom-btn"
                              }, {
                                default: o(() => u[2] || (u[2] = [
                                  b(" Invia mail ")
                                ])),
                                _: 1
                              }, 8, ["style"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      r.value ? (p(), _(m, { key: 0 }, {
                        default: o(() => [
                          t(h, {
                            cols: "12",
                            md: "12"
                          }, {
                            default: o(() => [
                              t(s, {
                                type: g.value,
                                dense: ""
                              }, {
                                default: o(() => [
                                  b(P(r.value), 1)
                                ]),
                                _: 1
                              }, 8, ["type"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })) : q("", !0),
                      t(m, null, {
                        default: o(() => [
                          t(h, {
                            cols: "12",
                            md: "12"
                          }, {
                            default: o(() => [
                              V("div", ie, [
                                t(l, {
                                  text: "",
                                  onClick: u[1] || (u[1] = (x) => L(1)),
                                  style: R({ "background-color": e.primaryColor }),
                                  class: "custom-btn full-width-btn"
                                }, {
                                  default: o(() => u[3] || (u[3] = [
                                    b(" Torna al login ")
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
    const d = e, a = f(""), i = f(""), r = f(""), g = f("error"), S = Z(), L = X(), M = () => {
      S.push(d.redirectLink);
    }, y = () => {
      !I.validateInput(a.value, I.passwordRules) && !I.validateInput(i.value, I.passwordRules) && (a.value !== i.value ? (g.value = "error", r.value = "Le password non coincidono") : (r.value = "", D.postRequest(
        `${d.hostname}change-password`,
        {
          pass_token: L.params.token,
          new_password: E(a.value).toString()
        },
        function(u) {
          u.status === "ok" ? (g.value = "success", r.value = u.message) : (g.value = "error", r.value = u.error);
        }
      )));
    };
    return (u, c) => {
      const T = n("v-img"), A = n("v-card-title"), h = n("v-text-field"), m = n("v-col"), l = n("v-row"), s = n("v-btn"), v = n("v-alert"), w = n("v-form"), j = n("v-card-text"), k = n("v-card"), x = n("v-container");
      return p(), _(x, { class: "d-flex align-center justify-center fill-height" }, {
        default: o(() => [
          t(k, {
            elevation: 20,
            width: "500",
            class: "pa-5"
          }, {
            default: o(() => [
              t(T, {
                src: e.logo,
                "max-width": "100",
                class: "mx-auto mb-4",
                alt: "Logo"
              }, null, 8, ["src"]),
              t(A, { class: "text-h5 text-center mb-6" }, {
                default: o(() => [
                  b(P(e.title), 1)
                ]),
                _: 1
              }),
              t(j, null, {
                default: o(() => [
                  t(w, {
                    onSubmit: z(y, ["prevent"])
                  }, {
                    default: o(() => [
                      t(l, null, {
                        default: o(() => [
                          t(m, { cols: "12" }, {
                            default: o(() => [
                              t(h, {
                                label: "Password",
                                modelValue: a.value,
                                "onUpdate:modelValue": c[0] || (c[0] = (C) => a.value = C),
                                rules: G(I).passwordRules,
                                type: "password",
                                outlined: "",
                                class: "mb-4"
                              }, null, 8, ["modelValue", "rules"])
                            ]),
                            _: 1
                          }),
                          t(m, { cols: "12" }, {
                            default: o(() => [
                              t(h, {
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
                      t(l, null, {
                        default: o(() => [
                          t(m, {
                            cols: "12",
                            class: "text-center"
                          }, {
                            default: o(() => [
                              t(s, {
                                block: "",
                                variant: "elevated",
                                style: R({ "background-color": e.secondaryColor }),
                                type: "submit",
                                class: "mb-4 custom-btn"
                              }, {
                                default: o(() => c[2] || (c[2] = [
                                  b(" Invia ")
                                ])),
                                _: 1
                              }, 8, ["style"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      r.value ? (p(), _(l, { key: 0 }, {
                        default: o(() => [
                          t(m, { cols: "12" }, {
                            default: o(() => [
                              t(v, {
                                type: g.value,
                                dense: ""
                              }, {
                                default: o(() => [
                                  b(P(r.value), 1)
                                ]),
                                _: 1
                              }, 8, ["type"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })) : q("", !0),
                      t(l, null, {
                        default: o(() => [
                          t(m, {
                            cols: "12",
                            class: "text-center"
                          }, {
                            default: o(() => [
                              V("div", de, [
                                t(s, {
                                  text: "",
                                  onClick: M,
                                  style: R({ "background-color": e.primaryColor }),
                                  class: "custom-btn full-width-btn"
                                }, {
                                  default: o(() => c[3] || (c[3] = [
                                    b(" Torna al login ")
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
    const d = f(1), a = (i) => {
      d.value = i;
    };
    return (i, r) => {
      const g = n("v-container");
      return p(), _(g, { class: "login-container" }, {
        default: o(() => [
          d.value == 1 ? (p(), _(ee, {
            key: 0,
            onChangeStatus: a,
            logo: e.logo,
            title: e.title,
            primaryColor: e.primaryColor,
            secondaryColor: e.secondaryColor,
            redirectLink: e.redirectLink,
            signUp: e.signUp,
            hostname: e.hostname,
            googleClientId: e.googleClientId
          }, null, 8, ["logo", "title", "primaryColor", "secondaryColor", "redirectLink", "signUp", "hostname", "googleClientId"])) : q("", !0),
          d.value == 2 && e.signUp ? (p(), _(se, {
            key: 1,
            onChangeStatus: a,
            logo: e.logo,
            title: e.signinTitle,
            primaryColor: e.primaryColor,
            secondaryColor: e.secondaryColor,
            redirectLink: e.redirectLink,
            hostname: e.hostname
          }, null, 8, ["logo", "title", "primaryColor", "secondaryColor", "redirectLink", "hostname"])) : q("", !0),
          d.value == 3 && e.signUp ? (p(), _(ce, {
            key: 2,
            onChangeStatus: a,
            logo: e.logo,
            title: e.changePasswordTitle,
            primaryColor: e.primaryColor,
            secondaryColor: e.secondaryColor,
            redirectLink: e.redirectLink,
            hostname: e.hostname
          }, null, 8, ["logo", "title", "primaryColor", "secondaryColor", "redirectLink", "hostname"])) : q("", !0),
          d.value == 4 && e.signUp ? (p(), _(ge, {
            key: 3,
            onChangeStatus: a,
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
