import { computed as K, onMounted as Q, ref as y, resolveComponent as n, openBlock as _, createBlock as w, withCtx as t, createVNode as o, createTextVNode as f, toDisplayString as U, withModifiers as M, createCommentVNode as R, createElementVNode as p, createElementBlock as W, normalizeStyle as z, unref as N } from "vue";
import { SHA256 as O } from "crypto-js";
import { useRouter as G, useRoute as X } from "vue-router";
const Y = (e, d, a, i = "POST") => {
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
}, E = {
  postRequest: Y
};
const A = (e, d) => {
  const a = e.__vccOpts || e;
  for (const [i, r] of d)
    a[i] = r;
  return a;
}, ee = { class: "gsi-material-button-content-wrapper" }, te = { class: "gsi-material-button-icon" }, oe = {
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 48 48",
  "xmlns:xlink": "http://www.w3.org/1999/xlink",
  style: { display: "block" }
}, ne = { class: "d-flex justify-center align-center full-width-btn-group" }, le = {
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
    const a = e, i = K(() => !!a.googleClientId), r = () => {
      google.accounts.id.initialize({
        client_id: a.googleClientId,
        callback: v
      }), google.accounts.id.prompt();
    }, v = (s) => {
      const l = s.credential;
      E.postRequest(
        `${a.hostname}google-login`,
        { token: l },
        (g) => {
          if (g.status === "ok") {
            if (localStorage.setItem("token", g.token), g.user_info)
              for (const C of Object.keys(g.user_info))
                localStorage.setItem(`user_${C}`, g.user_info[C]);
            u.push($(a.redirectLink, g));
          } else
            I.value = g.error;
        }
      );
    };
    Q(() => {
      const s = document.createElement("script");
      s.src = "https://accounts.google.com/gsi/client", s.async = !0, s.defer = !0, document.body.appendChild(s);
    });
    const x = y(""), V = y(""), I = y(""), b = y(!1), u = G(), c = d, T = () => {
      x.value && V.value && (I.value = "", E.postRequest(
        `${a.hostname}login`,
        {
          email: x.value,
          password: a.signUp ? O(V.value).toString() : V.value
        },
        function(s) {
          if (s.status === "ok") {
            if (localStorage.setItem("token", s.token), s.user_info)
              for (const l of Object.keys(s.user_info))
                localStorage.setItem(`user_${l}`, s.user_info[l]);
            u.push($(a.redirectLink, s));
          } else
            I.value = s.error;
        }
      ));
    }, $ = (s, l) => s.replace(/:([a-zA-Z0-9_]+)/g, (g, C) => C in l ? l[C] : g), h = () => {
      b.value = !b.value;
    }, m = (s) => {
      c("changeStatus", s);
    };
    return (s, l) => {
      const g = n("v-img"), C = n("v-card-title"), P = n("v-text-field"), S = n("v-col"), k = n("v-row"), q = n("v-btn"), H = n("v-alert"), F = n("v-form"), Z = n("v-card-text"), D = n("v-card"), J = n("v-container");
      return _(), w(J, { class: "d-flex align-center justify-center fill-height" }, {
        default: t(() => [
          o(D, {
            elevation: 20,
            width: "500",
            class: "pa-5"
          }, {
            default: t(() => [
              o(g, {
                src: e.logo,
                "max-width": "100",
                class: "mx-auto mb-4",
                alt: "Logo"
              }, null, 8, ["src"]),
              o(C, { class: "text-h5 text-center mb-6" }, {
                default: t(() => [
                  f(U(e.title), 1)
                ]),
                _: 1
              }),
              o(Z, null, {
                default: t(() => [
                  o(F, {
                    onSubmit: M(T, ["prevent"])
                  }, {
                    default: t(() => [
                      o(k, null, {
                        default: t(() => [
                          o(S, {
                            cols: "12",
                            md: "12"
                          }, {
                            default: t(() => [
                              o(P, {
                                label: "Email",
                                modelValue: x.value,
                                "onUpdate:modelValue": l[0] || (l[0] = (j) => x.value = j),
                                type: "email",
                                "prepend-icon": "mdi-email",
                                outlined: "",
                                color: e.primaryColor,
                                class: "mb-2"
                              }, null, 8, ["modelValue", "color"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      o(k, null, {
                        default: t(() => [
                          o(S, {
                            cols: "12",
                            md: "12"
                          }, {
                            default: t(() => [
                              o(P, {
                                type: b.value ? "text" : "password",
                                label: "Password",
                                modelValue: V.value,
                                "onUpdate:modelValue": l[1] || (l[1] = (j) => V.value = j),
                                "prepend-icon": "mdi-lock",
                                "append-inner-icon": b.value ? "mdi-eye-off" : "mdi-eye",
                                "onClick:appendInner": h,
                                outlined: "",
                                color: e.primaryColor,
                                class: "mb-4"
                              }, null, 8, ["type", "modelValue", "append-inner-icon", "color"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      o(k, null, {
                        default: t(() => [
                          o(S, {
                            cols: "12",
                            md: "12",
                            class: "text-center"
                          }, {
                            default: t(() => [
                              o(q, {
                                class: "full-width-btn mb-4 custom-btn",
                                variant: "elevated",
                                color: e.secondaryColor,
                                type: "submit"
                              }, {
                                default: t(() => l[4] || (l[4] = [
                                  f(" Login ")
                                ])),
                                _: 1
                              }, 8, ["color"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      I.value ? (_(), w(k, { key: 0 }, {
                        default: t(() => [
                          o(S, {
                            cols: "12",
                            md: "12"
                          }, {
                            default: t(() => [
                              o(H, {
                                type: "error",
                                dense: ""
                              }, {
                                default: t(() => [
                                  f(U(I.value), 1)
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })) : R("", !0),
                      i.value ? (_(), w(k, { key: 1 }, {
                        default: t(() => [
                          o(S, {
                            cols: "12",
                            md: "12",
                            class: "text-center mb-4"
                          }, {
                            default: t(() => [
                              p("button", {
                                type: "button",
                                class: "gsi-material-button",
                                onClick: r
                              }, [
                                l[8] || (l[8] = p("div", { class: "gsi-material-button-state" }, null, -1)),
                                p("div", ee, [
                                  p("div", te, [
                                    (_(), W("svg", oe, l[5] || (l[5] = [
                                      p("path", {
                                        fill: "#EA4335",
                                        d: "M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                                      }, null, -1),
                                      p("path", {
                                        fill: "#4285F4",
                                        d: "M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                                      }, null, -1),
                                      p("path", {
                                        fill: "#FBBC05",
                                        d: "M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                                      }, null, -1),
                                      p("path", {
                                        fill: "#34A853",
                                        d: "M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                                      }, null, -1),
                                      p("path", {
                                        fill: "none",
                                        d: "M0 0h48v48H0z"
                                      }, null, -1)
                                    ])))
                                  ]),
                                  l[6] || (l[6] = p("span", { class: "gsi-material-button-contents" }, "Accedi con Google", -1)),
                                  l[7] || (l[7] = p("span", { style: { display: "none" } }, "Sign in with Google", -1))
                                ])
                              ])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })) : R("", !0),
                      e.signUp ? (_(), w(k, { key: 2 }, {
                        default: t(() => [
                          o(S, {
                            cols: "12",
                            md: "12",
                            class: "text-center"
                          }, {
                            default: t(() => [
                              p("div", ne, [
                                o(q, {
                                  text: "",
                                  onClick: l[2] || (l[2] = (j) => m(2)),
                                  class: "custom-btn full-width-btn",
                                  color: e.primaryColor
                                }, {
                                  default: t(() => l[9] || (l[9] = [
                                    f(" Registrati qui ")
                                  ])),
                                  _: 1
                                }, 8, ["color"]),
                                l[11] || (l[11] = p("span", { class: "ml-1 mr-1" }, null, -1)),
                                o(q, {
                                  text: "",
                                  onClick: l[3] || (l[3] = (j) => m(3)),
                                  class: "custom-btn full-width-btn",
                                  color: e.primaryColor
                                }, {
                                  default: t(() => l[10] || (l[10] = [
                                    f(" Reset password ")
                                  ])),
                                  _: 1
                                }, 8, ["color"])
                              ])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })) : R("", !0)
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
}, re = /* @__PURE__ */ A(le, [["__scopeId", "data-v-ca479a27"]]), B = [
  (e) => e ? !0 : "Campo obbligatorio"
], se = B.concat([
  (e) => /.+@.+\..+/.test(e) ? !0 : "E-mail non valida."
]), ae = B.concat([
  (e) => /^(https?:\/\/)?([\w-]+\.)+([a-z]{2,})+(\/[\w-]*)*(\?[a-z0-9-]+=[a-z0-9-%]+(&[a-z0-9-]+=[a-z0-9-%]+)*)?$/i.test(e) ? !0 : "Sito non valido."
]), ie = B.concat([
  (e) => /[A-Z]/.test(e) ? !0 : "La password deve contenere almeno una lettera maiuscola.",
  (e) => /[a-z]/.test(e) ? !0 : "La password deve contenere almeno una lettera minuscola.",
  (e) => /\d/.test(e) ? !0 : "La password deve contenere almeno un numero.",
  (e) => e.length >= 8 ? !0 : "La password deve contenere almeno 8 caratteri."
]), ue = (e, d) => {
  const a = [];
  for (const i of d) {
    const r = i(e);
    r !== !0 && a.push(r);
  }
  return a.length === 0 ? null : a;
}, L = {
  validateInput: ue,
  requiredRules: B,
  emailRules: se,
  siteRules: ae,
  passwordRules: ie
};
const ce = { class: "d-flex justify-start align-center" }, de = {
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
    const a = e, i = y(""), r = y(""), v = y(""), x = y("error"), V = d, I = (u) => {
      V("changeStatus", u);
    }, b = () => {
      !L.validateInput(i.value, L.emailRules) && !L.validateInput(r.value, L.requiredRules) && (v.value = "", E.postRequest(
        `${a.hostname}register-user`,
        {
          name: r.value,
          email: i.value
        },
        function(u) {
          u.status === "ok" ? (x.value = "success", v.value = u.message) : (x.value = "error", v.value = u.error);
        }
      ));
    };
    return (u, c) => {
      const T = n("v-img"), $ = n("v-card-title"), h = n("v-text-field"), m = n("v-col"), s = n("v-row"), l = n("v-btn"), g = n("v-alert"), C = n("v-form"), P = n("v-card-text"), S = n("v-card"), k = n("v-container");
      return _(), w(k, { class: "d-flex align-center justify-center fill-height" }, {
        default: t(() => [
          o(S, {
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
              o($, { class: "text-h5 text-center mb-6" }, {
                default: t(() => [
                  f(U(e.title), 1)
                ]),
                _: 1
              }),
              o(P, null, {
                default: t(() => [
                  o(C, {
                    onSubmit: M(b, ["prevent"])
                  }, {
                    default: t(() => [
                      o(s, null, {
                        default: t(() => [
                          o(m, {
                            cols: "12",
                            md: "12"
                          }, {
                            default: t(() => [
                              o(h, {
                                label: "Nome",
                                modelValue: r.value,
                                "onUpdate:modelValue": c[0] || (c[0] = (q) => r.value = q),
                                outlined: "",
                                class: "mb-4"
                              }, null, 8, ["modelValue"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      o(s, null, {
                        default: t(() => [
                          o(m, {
                            cols: "12",
                            md: "12"
                          }, {
                            default: t(() => [
                              o(h, {
                                label: "Email",
                                modelValue: i.value,
                                "onUpdate:modelValue": c[1] || (c[1] = (q) => i.value = q),
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
                      o(s, null, {
                        default: t(() => [
                          o(m, {
                            cols: "12",
                            md: "12",
                            class: "text-center"
                          }, {
                            default: t(() => [
                              o(l, {
                                block: "",
                                variant: "elevated",
                                style: z({ "background-color": e.secondaryColor }),
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
                      v.value ? (_(), w(s, { key: 0 }, {
                        default: t(() => [
                          o(m, {
                            cols: "12",
                            md: "12"
                          }, {
                            default: t(() => [
                              o(g, {
                                type: x.value,
                                dense: ""
                              }, {
                                default: t(() => [
                                  f(U(v.value), 1)
                                ]),
                                _: 1
                              }, 8, ["type"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })) : R("", !0),
                      o(s, null, {
                        default: t(() => [
                          o(m, {
                            cols: "12",
                            md: "12"
                          }, {
                            default: t(() => [
                              p("div", ce, [
                                o(l, {
                                  text: "",
                                  onClick: c[2] || (c[2] = (q) => I(1)),
                                  style: z({ "background-color": e.primaryColor }),
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
}, me = /* @__PURE__ */ A(de, [["__scopeId", "data-v-c31c9e85"]]);
const ve = { class: "d-flex justify-start align-center" }, ge = {
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
    const a = e, i = y(""), r = y(""), v = y("error"), x = d, V = (b) => {
      x("changeStatus", b);
    }, I = () => {
      L.validateInput(i.value, L.emailRules) || (r.value = "", E.postRequest(
        `${a.hostname}ask-change-password`,
        {
          email: i.value
        },
        function(b) {
          b.status == "ok" ? (v.value = "success", r.value = b.message) : (v.value = "error", r.value = b.error);
        }
      ));
    };
    return (b, u) => {
      const c = n("v-img"), T = n("v-card-title"), $ = n("v-text-field"), h = n("v-col"), m = n("v-row"), s = n("v-btn"), l = n("v-alert"), g = n("v-form"), C = n("v-card-text"), P = n("v-card"), S = n("v-container");
      return _(), w(S, { class: "d-flex align-center justify-center fill-height" }, {
        default: t(() => [
          o(P, {
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
                  f(U(e.title), 1)
                ]),
                _: 1
              }),
              o(C, null, {
                default: t(() => [
                  o(g, {
                    onSubmit: M(I, ["prevent"])
                  }, {
                    default: t(() => [
                      o(m, null, {
                        default: t(() => [
                          o(h, {
                            cols: "12",
                            md: "12"
                          }, {
                            default: t(() => [
                              o($, {
                                label: "Email",
                                modelValue: i.value,
                                "onUpdate:modelValue": u[0] || (u[0] = (k) => i.value = k),
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
                          o(h, {
                            cols: "12",
                            md: "12",
                            class: "text-center"
                          }, {
                            default: t(() => [
                              o(s, {
                                block: "",
                                variant: "elevated",
                                style: z({ "background-color": e.secondaryColor }),
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
                      r.value ? (_(), w(m, { key: 0 }, {
                        default: t(() => [
                          o(h, {
                            cols: "12",
                            md: "12"
                          }, {
                            default: t(() => [
                              o(l, {
                                type: v.value,
                                dense: ""
                              }, {
                                default: t(() => [
                                  f(U(r.value), 1)
                                ]),
                                _: 1
                              }, 8, ["type"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })) : R("", !0),
                      o(m, null, {
                        default: t(() => [
                          o(h, {
                            cols: "12",
                            md: "12"
                          }, {
                            default: t(() => [
                              p("div", ve, [
                                o(s, {
                                  text: "",
                                  onClick: u[1] || (u[1] = (k) => V(1)),
                                  style: z({ "background-color": e.primaryColor }),
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
}, fe = /* @__PURE__ */ A(ge, [["__scopeId", "data-v-d965af57"]]);
const pe = { class: "d-flex justify-start align-center" }, _e = {
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
    const d = e, a = y(""), i = y(""), r = y(""), v = y("error"), x = G(), V = X(), I = () => {
      x.push(d.redirectLink);
    }, b = () => {
      !L.validateInput(a.value, L.passwordRules) && !L.validateInput(i.value, L.passwordRules) && (a.value !== i.value ? (v.value = "error", r.value = "Le password non coincidono") : (r.value = "", E.postRequest(
        `${d.hostname}change-password`,
        {
          pass_token: V.params.token,
          new_password: O(a.value).toString()
        },
        function(u) {
          u.status === "ok" ? (v.value = "success", r.value = u.message) : (v.value = "error", r.value = u.error);
        }
      )));
    };
    return (u, c) => {
      const T = n("v-img"), $ = n("v-card-title"), h = n("v-text-field"), m = n("v-col"), s = n("v-row"), l = n("v-btn"), g = n("v-alert"), C = n("v-form"), P = n("v-card-text"), S = n("v-card"), k = n("v-container");
      return _(), w(k, { class: "d-flex align-center justify-center fill-height" }, {
        default: t(() => [
          o(S, {
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
              o($, { class: "text-h5 text-center mb-6" }, {
                default: t(() => [
                  f(U(e.title), 1)
                ]),
                _: 1
              }),
              o(P, null, {
                default: t(() => [
                  o(C, {
                    onSubmit: M(b, ["prevent"])
                  }, {
                    default: t(() => [
                      o(s, null, {
                        default: t(() => [
                          o(m, { cols: "12" }, {
                            default: t(() => [
                              o(h, {
                                label: "Password",
                                modelValue: a.value,
                                "onUpdate:modelValue": c[0] || (c[0] = (q) => a.value = q),
                                rules: N(L).passwordRules,
                                type: "password",
                                outlined: "",
                                class: "mb-4"
                              }, null, 8, ["modelValue", "rules"])
                            ]),
                            _: 1
                          }),
                          o(m, { cols: "12" }, {
                            default: t(() => [
                              o(h, {
                                label: "Conferma password",
                                modelValue: i.value,
                                "onUpdate:modelValue": c[1] || (c[1] = (q) => i.value = q),
                                rules: N(L).passwordRules,
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
                      o(s, null, {
                        default: t(() => [
                          o(m, {
                            cols: "12",
                            class: "text-center"
                          }, {
                            default: t(() => [
                              o(l, {
                                block: "",
                                variant: "elevated",
                                style: z({ "background-color": e.secondaryColor }),
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
                      r.value ? (_(), w(s, { key: 0 }, {
                        default: t(() => [
                          o(m, { cols: "12" }, {
                            default: t(() => [
                              o(g, {
                                type: v.value,
                                dense: ""
                              }, {
                                default: t(() => [
                                  f(U(r.value), 1)
                                ]),
                                _: 1
                              }, 8, ["type"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })) : R("", !0),
                      o(s, null, {
                        default: t(() => [
                          o(m, {
                            cols: "12",
                            class: "text-center"
                          }, {
                            default: t(() => [
                              p("div", pe, [
                                o(l, {
                                  text: "",
                                  onClick: I,
                                  style: z({ "background-color": e.primaryColor }),
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
}, ye = /* @__PURE__ */ A(_e, [["__scopeId", "data-v-9b94dbdc"]]), ke = {
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
    const d = y(1), a = (i) => {
      d.value = i;
    };
    return (i, r) => {
      const v = n("v-container");
      return _(), w(v, { class: "login-container" }, {
        default: t(() => [
          d.value == 1 ? (_(), w(re, {
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
          }, null, 8, ["logo", "title", "primaryColor", "secondaryColor", "redirectLink", "signUp", "hostname", "googleClientId"])) : R("", !0),
          d.value == 2 && e.signUp ? (_(), w(me, {
            key: 1,
            onChangeStatus: a,
            logo: e.logo,
            title: e.signinTitle,
            primaryColor: e.primaryColor,
            secondaryColor: e.secondaryColor,
            redirectLink: e.redirectLink,
            hostname: e.hostname
          }, null, 8, ["logo", "title", "primaryColor", "secondaryColor", "redirectLink", "hostname"])) : R("", !0),
          d.value == 3 && e.signUp ? (_(), w(fe, {
            key: 2,
            onChangeStatus: a,
            logo: e.logo,
            title: e.changePasswordTitle,
            primaryColor: e.primaryColor,
            secondaryColor: e.secondaryColor,
            redirectLink: e.redirectLink,
            hostname: e.hostname
          }, null, 8, ["logo", "title", "primaryColor", "secondaryColor", "redirectLink", "hostname"])) : R("", !0),
          d.value == 4 && e.signUp ? (_(), w(ye, {
            key: 3,
            onChangeStatus: a,
            logo: e.logo,
            title: e.newPasswordTitle,
            primaryColor: e.primaryColor,
            secondaryColor: e.secondaryColor,
            redirectLink: e.redirectLink,
            hostname: e.hostname
          }, null, 8, ["logo", "title", "primaryColor", "secondaryColor", "redirectLink", "hostname"])) : R("", !0)
        ]),
        _: 1
      });
    };
  }
};
export {
  ke as AuthManager,
  ye as Password
};
