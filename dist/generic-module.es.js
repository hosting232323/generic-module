import { computed as K, onMounted as Q, ref as _, resolveComponent as n, openBlock as p, createBlock as y, withCtx as t, createVNode as o, createTextVNode as g, toDisplayString as $, withModifiers as A, createCommentVNode as V, createElementVNode as z, normalizeStyle as U, unref as N } from "vue";
import { SHA256 as B } from "crypto-js";
import { useRouter as O, useRoute as W } from "vue-router";
const X = (e, d, s, i = "POST") => {
  fetch(e, {
    method: i,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(d)
  }).then((l) => {
    if (!l.ok)
      throw new Error(`Errore nella risposta del server: ${l.status} - ${l.statusText}`);
    return l.json();
  }).then((l) => {
    s(l);
  }).catch((l) => {
    console.error("Errore nella richiesta:", l);
  });
}, E = {
  postRequest: X
};
const G = (e, d) => {
  const s = e.__vccOpts || e;
  for (const [i, l] of d)
    s[i] = l;
  return s;
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
    const s = e, i = K(() => (console.log("Login.vue - Computing showGoogleLogin with googleClientId:", s.googleClientId), !!s.googleClientId)), l = () => {
      console.log("Login.vue - Handling Google login with client ID:", s.googleClientId), google.accounts.id.initialize({
        client_id: s.googleClientId,
        callback: v
      }), google.accounts.id.prompt();
    }, v = (a) => {
      const r = a.credential;
      E.postRequest(
        `${s.hostname}/google-login`,
        { token: r },
        (C) => {
          C.status === "ok" ? (localStorage.setItem("strongbox_session_token", C.session_token), u.push(R(s.redirectLink, C))) : L.value = C.error;
        }
      );
    };
    Q(() => {
      console.log("googleClientId prop:", s.googleClientId), console.log("showGoogleLogin value:", i.value);
      const a = document.createElement("script");
      a.src = "https://accounts.google.com/gsi/client", a.async = !0, a.defer = !0, document.body.appendChild(a);
    });
    const b = _(""), q = _(""), L = _(""), f = _(!1), u = O(), c = d, T = () => {
      b.value && q.value && (L.value = "", E.postRequest(
        `${s.hostname}/login`,
        {
          email: b.value,
          password: B(q.value).toString()
        },
        function(a) {
          a.status === "ok" ? (localStorage.setItem("strongbox_session_token", a.session_token), u.push(R(s.redirectLink, a))) : L.value = a.error;
        }
      ));
    }, R = (a, r) => a.replace(/:([a-zA-Z0-9_]+)/g, (C, I) => I in r ? r[I] : C), x = () => {
      f.value = !f.value;
    }, m = (a) => {
      c("changeStatus", a);
    };
    return (a, r) => {
      const C = n("v-img"), I = n("v-card-title"), P = n("v-text-field"), k = n("v-col"), w = n("v-row"), h = n("v-btn"), D = n("v-alert"), H = n("v-form"), Z = n("v-card-text"), J = n("v-card"), F = n("v-container");
      return p(), y(F, { class: "d-flex align-center justify-center fill-height" }, {
        default: t(() => [
          o(J, {
            elevation: 20,
            width: "500",
            class: "pa-5"
          }, {
            default: t(() => [
              o(C, {
                src: e.logo,
                "max-width": "100",
                class: "mx-auto mb-4",
                alt: "Logo"
              }, null, 8, ["src"]),
              o(I, { class: "text-h5 text-center mb-6" }, {
                default: t(() => [
                  g($(e.title), 1)
                ]),
                _: 1
              }),
              o(Z, null, {
                default: t(() => [
                  o(H, {
                    onSubmit: A(T, ["prevent"])
                  }, {
                    default: t(() => [
                      o(w, null, {
                        default: t(() => [
                          o(k, {
                            cols: "12",
                            md: "12"
                          }, {
                            default: t(() => [
                              o(P, {
                                label: "Email",
                                modelValue: b.value,
                                "onUpdate:modelValue": r[0] || (r[0] = (j) => b.value = j),
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
                          o(k, {
                            cols: "12",
                            md: "12"
                          }, {
                            default: t(() => [
                              o(P, {
                                type: f.value ? "text" : "password",
                                label: "Password",
                                modelValue: q.value,
                                "onUpdate:modelValue": r[1] || (r[1] = (j) => q.value = j),
                                "prepend-icon": "mdi-lock",
                                "append-inner-icon": f.value ? "mdi-eye-off" : "mdi-eye",
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
                          o(k, {
                            cols: "12",
                            md: "12",
                            class: "text-center"
                          }, {
                            default: t(() => [
                              o(h, {
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
                      L.value ? (p(), y(w, { key: 0 }, {
                        default: t(() => [
                          o(k, {
                            cols: "12",
                            md: "12"
                          }, {
                            default: t(() => [
                              o(D, {
                                type: "error",
                                dense: ""
                              }, {
                                default: t(() => [
                                  g($(L.value), 1)
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })) : V("", !0),
                      i.value ? (p(), y(w, { key: 1 }, {
                        default: t(() => [
                          o(k, {
                            cols: "12",
                            md: "12",
                            class: "text-center"
                          }, {
                            default: t(() => [
                              o(h, {
                                class: "full-width-btn mb-3 custom-btn google-login-btn",
                                variant: "elevated",
                                onClick: l
                              }, {
                                default: t(() => r[5] || (r[5] = [
                                  g(" Accedi con Google ")
                                ])),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })) : V("", !0),
                      e.signUp ? (p(), y(w, { key: 2 }, {
                        default: t(() => [
                          o(k, {
                            cols: "12",
                            md: "12",
                            class: "text-center"
                          }, {
                            default: t(() => [
                              z("div", Y, [
                                o(h, {
                                  text: "",
                                  onClick: r[2] || (r[2] = (j) => m(2)),
                                  class: "custom-btn full-width-btn",
                                  color: e.primaryColor
                                }, {
                                  default: t(() => r[6] || (r[6] = [
                                    g(" Registrati qui ")
                                  ])),
                                  _: 1
                                }, 8, ["color"]),
                                r[8] || (r[8] = z("span", { class: "ml-1 mr-1" }, null, -1)),
                                o(h, {
                                  text: "",
                                  onClick: r[3] || (r[3] = (j) => m(3)),
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
                      })) : V("", !0)
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
}, te = /* @__PURE__ */ G(ee, [["__scopeId", "data-v-90e74617"]]), M = [
  (e) => e ? !0 : "Campo obbligatorio"
], oe = M.concat([
  (e) => /.+@.+\..+/.test(e) ? !0 : "E-mail non valida."
]), ne = M.concat([
  (e) => /^(https?:\/\/)?([\w-]+\.)+([a-z]{2,})+(\/[\w-]*)*(\?[a-z0-9-]+=[a-z0-9-%]+(&[a-z0-9-]+=[a-z0-9-%]+)*)?$/i.test(e) ? !0 : "Sito non valido."
]), le = M.concat([
  (e) => /[A-Z]/.test(e) ? !0 : "La password deve contenere almeno una lettera maiuscola.",
  (e) => /[a-z]/.test(e) ? !0 : "La password deve contenere almeno una lettera minuscola.",
  (e) => /\d/.test(e) ? !0 : "La password deve contenere almeno un numero.",
  (e) => e.length >= 8 ? !0 : "La password deve contenere almeno 8 caratteri."
]), re = (e, d) => {
  const s = [];
  for (const i of d) {
    const l = i(e);
    l !== !0 && s.push(l);
  }
  return s.length === 0 ? null : s;
}, S = {
  validateInput: re,
  requiredRules: M,
  emailRules: oe,
  siteRules: ne,
  passwordRules: le
};
const ae = { class: "d-flex justify-start align-center" }, se = {
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
    const s = e, i = _(""), l = _(""), v = _(""), b = _("error"), q = d, L = (u) => {
      q("changeStatus", u);
    }, f = () => {
      !S.validateInput(i.value, S.emailRules) && !S.validateInput(l.value, S.requiredRules) && (v.value = "", E.postRequest(
        `${s.hostname}register-user`,
        {
          name: l.value,
          email: i.value
        },
        function(u) {
          u.status === "ok" ? (b.value = "success", v.value = u.message) : (b.value = "error", v.value = u.error);
        }
      ));
    };
    return (u, c) => {
      const T = n("v-img"), R = n("v-card-title"), x = n("v-text-field"), m = n("v-col"), a = n("v-row"), r = n("v-btn"), C = n("v-alert"), I = n("v-form"), P = n("v-card-text"), k = n("v-card"), w = n("v-container");
      return p(), y(w, { class: "d-flex align-center justify-center fill-height" }, {
        default: t(() => [
          o(k, {
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
              o(R, { class: "text-h5 text-center mb-6" }, {
                default: t(() => [
                  g($(e.title), 1)
                ]),
                _: 1
              }),
              o(P, null, {
                default: t(() => [
                  o(I, {
                    onSubmit: A(f, ["prevent"])
                  }, {
                    default: t(() => [
                      o(a, null, {
                        default: t(() => [
                          o(m, {
                            cols: "12",
                            md: "12"
                          }, {
                            default: t(() => [
                              o(x, {
                                label: "Nome",
                                modelValue: l.value,
                                "onUpdate:modelValue": c[0] || (c[0] = (h) => l.value = h),
                                outlined: "",
                                class: "mb-4"
                              }, null, 8, ["modelValue"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      o(a, null, {
                        default: t(() => [
                          o(m, {
                            cols: "12",
                            md: "12"
                          }, {
                            default: t(() => [
                              o(x, {
                                label: "Email",
                                modelValue: i.value,
                                "onUpdate:modelValue": c[1] || (c[1] = (h) => i.value = h),
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
                      o(a, null, {
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
                                style: U({ "background-color": e.secondaryColor }),
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
                      v.value ? (p(), y(a, { key: 0 }, {
                        default: t(() => [
                          o(m, {
                            cols: "12",
                            md: "12"
                          }, {
                            default: t(() => [
                              o(C, {
                                type: b.value,
                                dense: ""
                              }, {
                                default: t(() => [
                                  g($(v.value), 1)
                                ]),
                                _: 1
                              }, 8, ["type"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })) : V("", !0),
                      o(a, null, {
                        default: t(() => [
                          o(m, {
                            cols: "12",
                            md: "12"
                          }, {
                            default: t(() => [
                              z("div", ae, [
                                o(r, {
                                  text: "",
                                  onClick: c[2] || (c[2] = (h) => L(1)),
                                  style: U({ "background-color": e.primaryColor }),
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
}, ie = /* @__PURE__ */ G(se, [["__scopeId", "data-v-c31c9e85"]]);
const ue = { class: "d-flex justify-start align-center" }, ce = {
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
    const s = e, i = _(""), l = _(""), v = _("error"), b = d, q = (f) => {
      b("changeStatus", f);
    }, L = () => {
      S.validateInput(i.value, S.emailRules) || (l.value = "", E.postRequest(
        `${s.hostname}ask-change-password`,
        {
          email: i.value
        },
        function(f) {
          f.status == "ok" ? (v.value = "success", l.value = f.message) : (v.value = "error", l.value = f.error);
        }
      ));
    };
    return (f, u) => {
      const c = n("v-img"), T = n("v-card-title"), R = n("v-text-field"), x = n("v-col"), m = n("v-row"), a = n("v-btn"), r = n("v-alert"), C = n("v-form"), I = n("v-card-text"), P = n("v-card"), k = n("v-container");
      return p(), y(k, { class: "d-flex align-center justify-center fill-height" }, {
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
                  g($(e.title), 1)
                ]),
                _: 1
              }),
              o(I, null, {
                default: t(() => [
                  o(C, {
                    onSubmit: A(L, ["prevent"])
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
                                modelValue: i.value,
                                "onUpdate:modelValue": u[0] || (u[0] = (w) => i.value = w),
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
                              o(a, {
                                block: "",
                                variant: "elevated",
                                style: U({ "background-color": e.secondaryColor }),
                                type: "submit",
                                class: "mb-4 custom-btn"
                              }, {
                                default: t(() => u[2] || (u[2] = [
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
                      l.value ? (p(), y(m, { key: 0 }, {
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
                                  g($(l.value), 1)
                                ]),
                                _: 1
                              }, 8, ["type"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })) : V("", !0),
                      o(m, null, {
                        default: t(() => [
                          o(x, {
                            cols: "12",
                            md: "12"
                          }, {
                            default: t(() => [
                              z("div", ue, [
                                o(a, {
                                  text: "",
                                  onClick: u[1] || (u[1] = (w) => q(1)),
                                  style: U({ "background-color": e.primaryColor }),
                                  class: "custom-btn full-width-btn"
                                }, {
                                  default: t(() => u[3] || (u[3] = [
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
}, de = /* @__PURE__ */ G(ce, [["__scopeId", "data-v-d965af57"]]);
const me = { class: "d-flex justify-start align-center" }, ge = {
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
    const d = e, s = _(""), i = _(""), l = _(""), v = _("error"), b = O(), q = W(), L = () => {
      b.push(d.redirectLink);
    }, f = () => {
      !S.validateInput(s.value, S.passwordRules) && !S.validateInput(i.value, S.passwordRules) && (s.value !== i.value ? (v.value = "error", l.value = "Le password non coincidono") : (l.value = "", E.postRequest(
        `${d.hostname}change-password`,
        {
          pass_token: q.params.token,
          new_password: B(s.value).toString()
        },
        function(u) {
          u.status === "ok" ? (v.value = "success", l.value = u.message) : (v.value = "error", l.value = u.error);
        }
      )));
    };
    return (u, c) => {
      const T = n("v-img"), R = n("v-card-title"), x = n("v-text-field"), m = n("v-col"), a = n("v-row"), r = n("v-btn"), C = n("v-alert"), I = n("v-form"), P = n("v-card-text"), k = n("v-card"), w = n("v-container");
      return p(), y(w, { class: "d-flex align-center justify-center fill-height" }, {
        default: t(() => [
          o(k, {
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
              o(R, { class: "text-h5 text-center mb-6" }, {
                default: t(() => [
                  g($(e.title), 1)
                ]),
                _: 1
              }),
              o(P, null, {
                default: t(() => [
                  o(I, {
                    onSubmit: A(f, ["prevent"])
                  }, {
                    default: t(() => [
                      o(a, null, {
                        default: t(() => [
                          o(m, { cols: "12" }, {
                            default: t(() => [
                              o(x, {
                                label: "Password",
                                modelValue: s.value,
                                "onUpdate:modelValue": c[0] || (c[0] = (h) => s.value = h),
                                rules: N(S).passwordRules,
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
                                modelValue: i.value,
                                "onUpdate:modelValue": c[1] || (c[1] = (h) => i.value = h),
                                rules: N(S).passwordRules,
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
                      o(a, null, {
                        default: t(() => [
                          o(m, {
                            cols: "12",
                            class: "text-center"
                          }, {
                            default: t(() => [
                              o(r, {
                                block: "",
                                variant: "elevated",
                                style: U({ "background-color": e.secondaryColor }),
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
                      l.value ? (p(), y(a, { key: 0 }, {
                        default: t(() => [
                          o(m, { cols: "12" }, {
                            default: t(() => [
                              o(C, {
                                type: v.value,
                                dense: ""
                              }, {
                                default: t(() => [
                                  g($(l.value), 1)
                                ]),
                                _: 1
                              }, 8, ["type"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })) : V("", !0),
                      o(a, null, {
                        default: t(() => [
                          o(m, {
                            cols: "12",
                            class: "text-center"
                          }, {
                            default: t(() => [
                              z("div", me, [
                                o(r, {
                                  text: "",
                                  onClick: L,
                                  style: U({ "background-color": e.primaryColor }),
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
}, ve = /* @__PURE__ */ G(ge, [["__scopeId", "data-v-9b94dbdc"]]), ye = {
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
    const d = _(1);
    console.log("AuthManager - received googleClientId:", e.googleClientId);
    const i = (l) => {
      d.value = l;
    };
    return (l, v) => {
      const b = n("v-container");
      return p(), y(b, { class: "login-container" }, {
        default: t(() => [
          d.value == 1 ? (p(), y(te, {
            key: 0,
            onChangeStatus: i,
            logo: e.logo,
            title: e.title,
            primaryColor: e.primaryColor,
            secondaryColor: e.secondaryColor,
            redirectLink: e.redirectLink,
            signUp: e.signUp,
            hostname: e.hostname,
            googleClientId: e.googleClientId
          }, null, 8, ["logo", "title", "primaryColor", "secondaryColor", "redirectLink", "signUp", "hostname", "googleClientId"])) : V("", !0),
          d.value == 2 && e.signUp ? (p(), y(ie, {
            key: 1,
            onChangeStatus: i,
            logo: e.logo,
            title: e.signinTitle,
            primaryColor: e.primaryColor,
            secondaryColor: e.secondaryColor,
            redirectLink: e.redirectLink,
            hostname: e.hostname
          }, null, 8, ["logo", "title", "primaryColor", "secondaryColor", "redirectLink", "hostname"])) : V("", !0),
          d.value == 3 && e.signUp ? (p(), y(de, {
            key: 2,
            onChangeStatus: i,
            logo: e.logo,
            title: e.changePasswordTitle,
            primaryColor: e.primaryColor,
            secondaryColor: e.secondaryColor,
            redirectLink: e.redirectLink,
            hostname: e.hostname
          }, null, 8, ["logo", "title", "primaryColor", "secondaryColor", "redirectLink", "hostname"])) : V("", !0),
          d.value == 4 && e.signUp ? (p(), y(ve, {
            key: 3,
            onChangeStatus: i,
            logo: e.logo,
            title: e.newPasswordTitle,
            primaryColor: e.primaryColor,
            secondaryColor: e.secondaryColor,
            redirectLink: e.redirectLink,
            hostname: e.hostname
          }, null, 8, ["logo", "title", "primaryColor", "secondaryColor", "redirectLink", "hostname"])) : V("", !0)
        ]),
        _: 1
      });
    };
  }
};
export {
  ye as AuthManager,
  ve as Password
};
