import { computed as K, onMounted as Q, ref as _, resolveComponent as n, openBlock as y, createBlock as b, withCtx as t, createVNode as o, createTextVNode as g, toDisplayString as P, withModifiers as A, createCommentVNode as I, createElementVNode as T, normalizeStyle as j, unref as B } from "vue";
import { SHA256 as M } from "crypto-js";
import { useRouter as G, useRoute as W } from "vue-router";
const X = (e, d, a, u = "POST") => {
  fetch(e, {
    method: u,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(d)
  }).then((l) => {
    if (!l.ok)
      throw new Error(`Errore nella risposta del server: ${l.status} - ${l.statusText}`);
    return l.json();
  }).then((l) => {
    a(l);
  }).catch((l) => {
    console.error("Errore nella richiesta:", l);
  });
}, E = {
  postRequest: X
};
const N = (e, d) => {
  const a = e.__vccOpts || e;
  for (const [u, l] of d)
    a[u] = l;
  return a;
}, Y = { class: "d-flex justify-center align-center full-width-btn-group" }, ee = {
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
    const a = e, u = K(() => !!a.googleClientId), l = () => {
      google.accounts.id.initialize({
        client_id: a.googleClientId,
        callback: v
      }), google.accounts.id.prompt();
    }, v = (s) => {
      const r = s.credential;
      E.postRequest(
        `${a.hostname}google-login`,
        { token: r },
        (f) => {
          if (f.status === "ok") {
            if (localStorage.setItem("token", f.token), f.user_info)
              for (const C of Object.keys(f.user_info))
                localStorage.setItem(`user_${C}`, f.user_info[C]);
            i.push(R(a.redirectLink, f));
          } else
            V.value = f.error;
        }
      );
    };
    Q(() => {
      const s = document.createElement("script");
      s.src = "https://accounts.google.com/gsi/client", s.async = !0, s.defer = !0, document.body.appendChild(s);
    });
    const S = _(""), L = _(""), V = _(""), p = _(!1), i = G(), c = d, U = () => {
      S.value && L.value && (V.value = "", E.postRequest(
        `${a.hostname}login`,
        {
          email: S.value,
          password: a.signUp ? M(L.value).toString() : L.value
        },
        function(s) {
          if (s.status === "ok") {
            if (localStorage.setItem("token", s.token), s.user_info)
              for (const r of Object.keys(s.user_info))
                localStorage.setItem(`user_${r}`, s.user_info[r]);
            i.push(R(a.redirectLink, s));
          } else
            V.value = s.error;
        }
      ));
    }, R = (s, r) => s.replace(/:([a-zA-Z0-9_]+)/g, (f, C) => C in r ? r[C] : f), x = () => {
      p.value = !p.value;
    }, m = (s) => {
      c("changeStatus", s);
    };
    return (s, r) => {
      const f = n("v-img"), C = n("v-card-title"), $ = n("v-text-field"), h = n("v-col"), w = n("v-row"), k = n("v-btn"), Z = n("v-alert"), D = n("v-form"), H = n("v-card-text"), J = n("v-card"), F = n("v-container");
      return y(), b(F, { class: "d-flex align-center justify-center fill-height" }, {
        default: t(() => [
          o(J, {
            elevation: 20,
            width: "500",
            class: "pa-5"
          }, {
            default: t(() => [
              o(f, {
                src: e.logo,
                "max-width": "100",
                class: "mx-auto mb-4",
                alt: "Logo"
              }, null, 8, ["src"]),
              o(C, { class: "text-h5 text-center mb-6" }, {
                default: t(() => [
                  g(P(e.title), 1)
                ]),
                _: 1
              }),
              o(H, null, {
                default: t(() => [
                  o(D, {
                    onSubmit: A(U, ["prevent"])
                  }, {
                    default: t(() => [
                      o(w, null, {
                        default: t(() => [
                          o(h, {
                            cols: "12",
                            md: "12"
                          }, {
                            default: t(() => [
                              o($, {
                                label: "Email",
                                modelValue: S.value,
                                "onUpdate:modelValue": r[0] || (r[0] = (z) => S.value = z),
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
                      o(w, null, {
                        default: t(() => [
                          o(h, {
                            cols: "12",
                            md: "12"
                          }, {
                            default: t(() => [
                              o($, {
                                type: p.value ? "text" : "password",
                                label: "Password",
                                modelValue: L.value,
                                "onUpdate:modelValue": r[1] || (r[1] = (z) => L.value = z),
                                "prepend-icon": "mdi-lock",
                                "append-inner-icon": p.value ? "mdi-eye-off" : "mdi-eye",
                                "onClick:appendInner": x,
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
                      o(w, null, {
                        default: t(() => [
                          o(h, {
                            cols: "12",
                            md: "12",
                            class: "text-center"
                          }, {
                            default: t(() => [
                              o(k, {
                                class: "full-width-btn mb-1 custom-btn",
                                variant: "elevated",
                                color: e.secondaryColor,
                                type: "submit"
                              }, {
                                default: t(() => r[4] || (r[4] = [
                                  g(" Login ")
                                ])),
                                _: 1
                              }, 8, ["color"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      V.value ? (y(), b(w, { key: 0 }, {
                        default: t(() => [
                          o(h, {
                            cols: "12",
                            md: "12"
                          }, {
                            default: t(() => [
                              o(Z, {
                                type: "error",
                                dense: ""
                              }, {
                                default: t(() => [
                                  g(P(V.value), 1)
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })) : I("", !0),
                      u.value ? (y(), b(w, { key: 1 }, {
                        default: t(() => [
                          o(h, {
                            cols: "12",
                            md: "12",
                            class: "text-center"
                          }, {
                            default: t(() => [
                              o(k, {
                                class: "google-login-btn",
                                variant: "elevated",
                                onClick: l
                              }, {
                                default: t(() => r[5] || (r[5] = [
                                  T("img", {
                                    src: "https://developers.google.com/identity/images/g-logo.png",
                                    class: "google-icon"
                                  }, null, -1),
                                  g(" Accedi con Google ")
                                ])),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })) : I("", !0),
                      e.signUp ? (y(), b(w, { key: 2 }, {
                        default: t(() => [
                          o(h, {
                            cols: "12",
                            md: "12",
                            class: "text-center"
                          }, {
                            default: t(() => [
                              T("div", Y, [
                                o(k, {
                                  text: "",
                                  onClick: r[2] || (r[2] = (z) => m(2)),
                                  class: "custom-btn full-width-btn",
                                  color: e.primaryColor
                                }, {
                                  default: t(() => r[6] || (r[6] = [
                                    g(" Registrati qui ")
                                  ])),
                                  _: 1
                                }, 8, ["color"]),
                                r[8] || (r[8] = T("span", { class: "ml-1 mr-1" }, null, -1)),
                                o(k, {
                                  text: "",
                                  onClick: r[3] || (r[3] = (z) => m(3)),
                                  class: "custom-btn full-width-btn",
                                  color: e.primaryColor
                                }, {
                                  default: t(() => r[7] || (r[7] = [
                                    g(" Reset password ")
                                  ])),
                                  _: 1
                                }, 8, ["color"])
                              ])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })) : I("", !0)
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
}, te = /* @__PURE__ */ N(ee, [["__scopeId", "data-v-36e46e5a"]]), O = [
  (e) => e ? !0 : "Campo obbligatorio"
], oe = O.concat([
  (e) => /.+@.+\..+/.test(e) ? !0 : "E-mail non valida."
]), ne = O.concat([
  (e) => /^(https?:\/\/)?([\w-]+\.)+([a-z]{2,})+(\/[\w-]*)*(\?[a-z0-9-]+=[a-z0-9-%]+(&[a-z0-9-]+=[a-z0-9-%]+)*)?$/i.test(e) ? !0 : "Sito non valido."
]), le = O.concat([
  (e) => /[A-Z]/.test(e) ? !0 : "La password deve contenere almeno una lettera maiuscola.",
  (e) => /[a-z]/.test(e) ? !0 : "La password deve contenere almeno una lettera minuscola.",
  (e) => /\d/.test(e) ? !0 : "La password deve contenere almeno un numero.",
  (e) => e.length >= 8 ? !0 : "La password deve contenere almeno 8 caratteri."
]), re = (e, d) => {
  const a = [];
  for (const u of d) {
    const l = u(e);
    l !== !0 && a.push(l);
  }
  return a.length === 0 ? null : a;
}, q = {
  validateInput: re,
  requiredRules: O,
  emailRules: oe,
  siteRules: ne,
  passwordRules: le
};
const se = { class: "d-flex justify-start align-center" }, ae = {
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
    const a = e, u = _(""), l = _(""), v = _(""), S = _("error"), L = d, V = (i) => {
      L("changeStatus", i);
    }, p = () => {
      !q.validateInput(u.value, q.emailRules) && !q.validateInput(l.value, q.requiredRules) && (v.value = "", E.postRequest(
        `${a.hostname}register-user`,
        {
          name: l.value,
          email: u.value
        },
        function(i) {
          i.status === "ok" ? (S.value = "success", v.value = i.message) : (S.value = "error", v.value = i.error);
        }
      ));
    };
    return (i, c) => {
      const U = n("v-img"), R = n("v-card-title"), x = n("v-text-field"), m = n("v-col"), s = n("v-row"), r = n("v-btn"), f = n("v-alert"), C = n("v-form"), $ = n("v-card-text"), h = n("v-card"), w = n("v-container");
      return y(), b(w, { class: "d-flex align-center justify-center fill-height" }, {
        default: t(() => [
          o(h, {
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
              o(R, { class: "text-h5 text-center mb-6" }, {
                default: t(() => [
                  g(P(e.title), 1)
                ]),
                _: 1
              }),
              o($, null, {
                default: t(() => [
                  o(C, {
                    onSubmit: A(p, ["prevent"])
                  }, {
                    default: t(() => [
                      o(s, null, {
                        default: t(() => [
                          o(m, {
                            cols: "12",
                            md: "12"
                          }, {
                            default: t(() => [
                              o(x, {
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
                      o(s, null, {
                        default: t(() => [
                          o(m, {
                            cols: "12",
                            md: "12"
                          }, {
                            default: t(() => [
                              o(x, {
                                label: "Email",
                                modelValue: u.value,
                                "onUpdate:modelValue": c[1] || (c[1] = (k) => u.value = k),
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
                              o(r, {
                                block: "",
                                variant: "elevated",
                                style: j({ "background-color": e.secondaryColor }),
                                type: "submit",
                                class: "mb-4 custom-btn"
                              }, {
                                default: t(() => c[3] || (c[3] = [
                                  g(" Registrati ")
                                ])),
                                _: 1
                              }, 8, ["style"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      v.value ? (y(), b(s, { key: 0 }, {
                        default: t(() => [
                          o(m, {
                            cols: "12",
                            md: "12"
                          }, {
                            default: t(() => [
                              o(f, {
                                type: S.value,
                                dense: ""
                              }, {
                                default: t(() => [
                                  g(P(v.value), 1)
                                ]),
                                _: 1
                              }, 8, ["type"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })) : I("", !0),
                      o(s, null, {
                        default: t(() => [
                          o(m, {
                            cols: "12",
                            md: "12"
                          }, {
                            default: t(() => [
                              T("div", se, [
                                o(r, {
                                  text: "",
                                  onClick: c[2] || (c[2] = (k) => V(1)),
                                  style: j({ "background-color": e.primaryColor }),
                                  class: "custom-btn full-width-btn"
                                }, {
                                  default: t(() => c[4] || (c[4] = [
                                    g(" Torna al login ")
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
}, ue = /* @__PURE__ */ N(ae, [["__scopeId", "data-v-c31c9e85"]]);
const ie = { class: "d-flex justify-start align-center" }, ce = {
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
    const a = e, u = _(""), l = _(""), v = _("error"), S = d, L = (p) => {
      S("changeStatus", p);
    }, V = () => {
      q.validateInput(u.value, q.emailRules) || (l.value = "", E.postRequest(
        `${a.hostname}ask-change-password`,
        {
          email: u.value
        },
        function(p) {
          p.status == "ok" ? (v.value = "success", l.value = p.message) : (v.value = "error", l.value = p.error);
        }
      ));
    };
    return (p, i) => {
      const c = n("v-img"), U = n("v-card-title"), R = n("v-text-field"), x = n("v-col"), m = n("v-row"), s = n("v-btn"), r = n("v-alert"), f = n("v-form"), C = n("v-card-text"), $ = n("v-card"), h = n("v-container");
      return y(), b(h, { class: "d-flex align-center justify-center fill-height" }, {
        default: t(() => [
          o($, {
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
                  g(P(e.title), 1)
                ]),
                _: 1
              }),
              o(C, null, {
                default: t(() => [
                  o(f, {
                    onSubmit: A(V, ["prevent"])
                  }, {
                    default: t(() => [
                      o(m, null, {
                        default: t(() => [
                          o(x, {
                            cols: "12",
                            md: "12"
                          }, {
                            default: t(() => [
                              o(R, {
                                label: "Email",
                                modelValue: u.value,
                                "onUpdate:modelValue": i[0] || (i[0] = (w) => u.value = w),
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
                          o(x, {
                            cols: "12",
                            md: "12",
                            class: "text-center"
                          }, {
                            default: t(() => [
                              o(s, {
                                block: "",
                                variant: "elevated",
                                style: j({ "background-color": e.secondaryColor }),
                                type: "submit",
                                class: "mb-4 custom-btn"
                              }, {
                                default: t(() => i[2] || (i[2] = [
                                  g(" Invia mail ")
                                ])),
                                _: 1
                              }, 8, ["style"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      l.value ? (y(), b(m, { key: 0 }, {
                        default: t(() => [
                          o(x, {
                            cols: "12",
                            md: "12"
                          }, {
                            default: t(() => [
                              o(r, {
                                type: v.value,
                                dense: ""
                              }, {
                                default: t(() => [
                                  g(P(l.value), 1)
                                ]),
                                _: 1
                              }, 8, ["type"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })) : I("", !0),
                      o(m, null, {
                        default: t(() => [
                          o(x, {
                            cols: "12",
                            md: "12"
                          }, {
                            default: t(() => [
                              T("div", ie, [
                                o(s, {
                                  text: "",
                                  onClick: i[1] || (i[1] = (w) => L(1)),
                                  style: j({ "background-color": e.primaryColor }),
                                  class: "custom-btn full-width-btn"
                                }, {
                                  default: t(() => i[3] || (i[3] = [
                                    g(" Torna al login ")
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
}, de = /* @__PURE__ */ N(ce, [["__scopeId", "data-v-d965af57"]]);
const me = { class: "d-flex justify-start align-center" }, ve = {
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
    const d = e, a = _(""), u = _(""), l = _(""), v = _("error"), S = G(), L = W(), V = () => {
      S.push(d.redirectLink);
    }, p = () => {
      !q.validateInput(a.value, q.passwordRules) && !q.validateInput(u.value, q.passwordRules) && (a.value !== u.value ? (v.value = "error", l.value = "Le password non coincidono") : (l.value = "", E.postRequest(
        `${d.hostname}change-password`,
        {
          pass_token: L.params.token,
          new_password: M(a.value).toString()
        },
        function(i) {
          i.status === "ok" ? (v.value = "success", l.value = i.message) : (v.value = "error", l.value = i.error);
        }
      )));
    };
    return (i, c) => {
      const U = n("v-img"), R = n("v-card-title"), x = n("v-text-field"), m = n("v-col"), s = n("v-row"), r = n("v-btn"), f = n("v-alert"), C = n("v-form"), $ = n("v-card-text"), h = n("v-card"), w = n("v-container");
      return y(), b(w, { class: "d-flex align-center justify-center fill-height" }, {
        default: t(() => [
          o(h, {
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
              o(R, { class: "text-h5 text-center mb-6" }, {
                default: t(() => [
                  g(P(e.title), 1)
                ]),
                _: 1
              }),
              o($, null, {
                default: t(() => [
                  o(C, {
                    onSubmit: A(p, ["prevent"])
                  }, {
                    default: t(() => [
                      o(s, null, {
                        default: t(() => [
                          o(m, { cols: "12" }, {
                            default: t(() => [
                              o(x, {
                                label: "Password",
                                modelValue: a.value,
                                "onUpdate:modelValue": c[0] || (c[0] = (k) => a.value = k),
                                rules: B(q).passwordRules,
                                type: "password",
                                outlined: "",
                                class: "mb-4"
                              }, null, 8, ["modelValue", "rules"])
                            ]),
                            _: 1
                          }),
                          o(m, { cols: "12" }, {
                            default: t(() => [
                              o(x, {
                                label: "Conferma password",
                                modelValue: u.value,
                                "onUpdate:modelValue": c[1] || (c[1] = (k) => u.value = k),
                                rules: B(q).passwordRules,
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
                              o(r, {
                                block: "",
                                variant: "elevated",
                                style: j({ "background-color": e.secondaryColor }),
                                type: "submit",
                                class: "mb-4 custom-btn"
                              }, {
                                default: t(() => c[2] || (c[2] = [
                                  g(" Invia ")
                                ])),
                                _: 1
                              }, 8, ["style"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      l.value ? (y(), b(s, { key: 0 }, {
                        default: t(() => [
                          o(m, { cols: "12" }, {
                            default: t(() => [
                              o(f, {
                                type: v.value,
                                dense: ""
                              }, {
                                default: t(() => [
                                  g(P(l.value), 1)
                                ]),
                                _: 1
                              }, 8, ["type"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })) : I("", !0),
                      o(s, null, {
                        default: t(() => [
                          o(m, {
                            cols: "12",
                            class: "text-center"
                          }, {
                            default: t(() => [
                              T("div", me, [
                                o(r, {
                                  text: "",
                                  onClick: V,
                                  style: j({ "background-color": e.primaryColor }),
                                  class: "custom-btn full-width-btn"
                                }, {
                                  default: t(() => c[3] || (c[3] = [
                                    g(" Torna al login ")
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
}, ge = /* @__PURE__ */ N(ve, [["__scopeId", "data-v-9b94dbdc"]]), ye = {
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
    const d = _(1), a = (u) => {
      d.value = u;
    };
    return (u, l) => {
      const v = n("v-container");
      return y(), b(v, { class: "login-container" }, {
        default: t(() => [
          d.value == 1 ? (y(), b(te, {
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
          }, null, 8, ["logo", "title", "primaryColor", "secondaryColor", "redirectLink", "signUp", "hostname", "googleClientId"])) : I("", !0),
          d.value == 2 && e.signUp ? (y(), b(ue, {
            key: 1,
            onChangeStatus: a,
            logo: e.logo,
            title: e.signinTitle,
            primaryColor: e.primaryColor,
            secondaryColor: e.secondaryColor,
            redirectLink: e.redirectLink,
            hostname: e.hostname
          }, null, 8, ["logo", "title", "primaryColor", "secondaryColor", "redirectLink", "hostname"])) : I("", !0),
          d.value == 3 && e.signUp ? (y(), b(de, {
            key: 2,
            onChangeStatus: a,
            logo: e.logo,
            title: e.changePasswordTitle,
            primaryColor: e.primaryColor,
            secondaryColor: e.secondaryColor,
            redirectLink: e.redirectLink,
            hostname: e.hostname
          }, null, 8, ["logo", "title", "primaryColor", "secondaryColor", "redirectLink", "hostname"])) : I("", !0),
          d.value == 4 && e.signUp ? (y(), b(ge, {
            key: 3,
            onChangeStatus: a,
            logo: e.logo,
            title: e.newPasswordTitle,
            primaryColor: e.primaryColor,
            secondaryColor: e.secondaryColor,
            redirectLink: e.redirectLink,
            hostname: e.hostname
          }, null, 8, ["logo", "title", "primaryColor", "secondaryColor", "redirectLink", "hostname"])) : I("", !0)
        ]),
        _: 1
      });
    };
  }
};
export {
  ye as AuthManager,
  ge as Password
};
