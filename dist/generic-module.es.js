import { computed as K, onMounted as Q, ref as _, resolveComponent as n, openBlock as p, createBlock as y, withCtx as t, createVNode as o, createTextVNode as g, toDisplayString as $, withModifiers as A, createCommentVNode as R, createElementVNode as z, normalizeStyle as U, unref as M } from "vue";
import { SHA256 as G } from "crypto-js";
import { useRouter as O, useRoute as W } from "vue-router";
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
        `${a.hostname}/google-login`,
        { token: r },
        (b) => {
          b.status === "ok" ? (localStorage.setItem("strongbox_session_token", b.session_token), i.push(I(a.redirectLink, b))) : q.value = b.error;
        }
      );
    };
    Q(() => {
      const s = document.createElement("script");
      s.src = "https://accounts.google.com/gsi/client", s.async = !0, s.defer = !0, document.body.appendChild(s);
    });
    const x = _(""), L = _(""), q = _(""), f = _(!1), i = O(), c = d, T = () => {
      x.value && L.value && (q.value = "", E.postRequest(
        `${a.hostname}/login`,
        {
          email: x.value,
          password: G(L.value).toString()
        },
        function(s) {
          s.status === "ok" ? (localStorage.setItem("strongbox_session_token", s.session_token), i.push(I(a.redirectLink, s))) : q.value = s.error;
        }
      ));
    }, I = (s, r) => s.replace(/:([a-zA-Z0-9_]+)/g, (b, V) => V in r ? r[V] : b), k = () => {
      f.value = !f.value;
    }, m = (s) => {
      c("changeStatus", s);
    };
    return (s, r) => {
      const b = n("v-img"), V = n("v-card-title"), P = n("v-text-field"), S = n("v-col"), C = n("v-row"), w = n("v-btn"), Z = n("v-alert"), D = n("v-form"), H = n("v-card-text"), J = n("v-card"), F = n("v-container");
      return p(), y(F, { class: "d-flex align-center justify-center fill-height" }, {
        default: t(() => [
          o(J, {
            elevation: 20,
            width: "500",
            class: "pa-5"
          }, {
            default: t(() => [
              o(b, {
                src: e.logo,
                "max-width": "100",
                class: "mx-auto mb-4",
                alt: "Logo"
              }, null, 8, ["src"]),
              o(V, { class: "text-h5 text-center mb-6" }, {
                default: t(() => [
                  g($(e.title), 1)
                ]),
                _: 1
              }),
              o(H, null, {
                default: t(() => [
                  o(D, {
                    onSubmit: A(T, ["prevent"])
                  }, {
                    default: t(() => [
                      o(C, null, {
                        default: t(() => [
                          o(S, {
                            cols: "12",
                            md: "12"
                          }, {
                            default: t(() => [
                              o(P, {
                                label: "Email",
                                modelValue: x.value,
                                "onUpdate:modelValue": r[0] || (r[0] = (j) => x.value = j),
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
                      o(C, null, {
                        default: t(() => [
                          o(S, {
                            cols: "12",
                            md: "12"
                          }, {
                            default: t(() => [
                              o(P, {
                                type: f.value ? "text" : "password",
                                label: "Password",
                                modelValue: L.value,
                                "onUpdate:modelValue": r[1] || (r[1] = (j) => L.value = j),
                                "prepend-icon": "mdi-lock",
                                "append-inner-icon": f.value ? "mdi-eye-off" : "mdi-eye",
                                "onClick:appendInner": k,
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
                      o(C, null, {
                        default: t(() => [
                          o(S, {
                            cols: "12",
                            md: "12",
                            class: "text-center"
                          }, {
                            default: t(() => [
                              o(w, {
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
                      q.value ? (p(), y(C, { key: 0 }, {
                        default: t(() => [
                          o(S, {
                            cols: "12",
                            md: "12"
                          }, {
                            default: t(() => [
                              o(Z, {
                                type: "error",
                                dense: ""
                              }, {
                                default: t(() => [
                                  g($(q.value), 1)
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })) : R("", !0),
                      u.value ? (p(), y(C, { key: 1 }, {
                        default: t(() => [
                          o(S, {
                            cols: "12",
                            md: "12",
                            class: "text-center"
                          }, {
                            default: t(() => [
                              o(w, {
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
                      })) : R("", !0),
                      e.signUp ? (p(), y(C, { key: 2 }, {
                        default: t(() => [
                          o(S, {
                            cols: "12",
                            md: "12",
                            class: "text-center"
                          }, {
                            default: t(() => [
                              z("div", Y, [
                                o(w, {
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
                                o(w, {
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
}, te = /* @__PURE__ */ N(ee, [["__scopeId", "data-v-6b1f9c87"]]), B = [
  (e) => e ? !0 : "Campo obbligatorio"
], oe = B.concat([
  (e) => /.+@.+\..+/.test(e) ? !0 : "E-mail non valida."
]), ne = B.concat([
  (e) => /^(https?:\/\/)?([\w-]+\.)+([a-z]{2,})+(\/[\w-]*)*(\?[a-z0-9-]+=[a-z0-9-%]+(&[a-z0-9-]+=[a-z0-9-%]+)*)?$/i.test(e) ? !0 : "Sito non valido."
]), le = B.concat([
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
}, h = {
  validateInput: re,
  requiredRules: B,
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
    const a = e, u = _(""), l = _(""), v = _(""), x = _("error"), L = d, q = (i) => {
      L("changeStatus", i);
    }, f = () => {
      !h.validateInput(u.value, h.emailRules) && !h.validateInput(l.value, h.requiredRules) && (v.value = "", E.postRequest(
        `${a.hostname}register-user`,
        {
          name: l.value,
          email: u.value
        },
        function(i) {
          i.status === "ok" ? (x.value = "success", v.value = i.message) : (x.value = "error", v.value = i.error);
        }
      ));
    };
    return (i, c) => {
      const T = n("v-img"), I = n("v-card-title"), k = n("v-text-field"), m = n("v-col"), s = n("v-row"), r = n("v-btn"), b = n("v-alert"), V = n("v-form"), P = n("v-card-text"), S = n("v-card"), C = n("v-container");
      return p(), y(C, { class: "d-flex align-center justify-center fill-height" }, {
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
              o(I, { class: "text-h5 text-center mb-6" }, {
                default: t(() => [
                  g($(e.title), 1)
                ]),
                _: 1
              }),
              o(P, null, {
                default: t(() => [
                  o(V, {
                    onSubmit: A(f, ["prevent"])
                  }, {
                    default: t(() => [
                      o(s, null, {
                        default: t(() => [
                          o(m, {
                            cols: "12",
                            md: "12"
                          }, {
                            default: t(() => [
                              o(k, {
                                label: "Nome",
                                modelValue: l.value,
                                "onUpdate:modelValue": c[0] || (c[0] = (w) => l.value = w),
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
                              o(k, {
                                label: "Email",
                                modelValue: u.value,
                                "onUpdate:modelValue": c[1] || (c[1] = (w) => u.value = w),
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
                      v.value ? (p(), y(s, { key: 0 }, {
                        default: t(() => [
                          o(m, {
                            cols: "12",
                            md: "12"
                          }, {
                            default: t(() => [
                              o(b, {
                                type: x.value,
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
                      })) : R("", !0),
                      o(s, null, {
                        default: t(() => [
                          o(m, {
                            cols: "12",
                            md: "12"
                          }, {
                            default: t(() => [
                              z("div", ae, [
                                o(r, {
                                  text: "",
                                  onClick: c[2] || (c[2] = (w) => q(1)),
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
}, ue = /* @__PURE__ */ N(se, [["__scopeId", "data-v-c31c9e85"]]);
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
    const a = e, u = _(""), l = _(""), v = _("error"), x = d, L = (f) => {
      x("changeStatus", f);
    }, q = () => {
      h.validateInput(u.value, h.emailRules) || (l.value = "", E.postRequest(
        `${a.hostname}ask-change-password`,
        {
          email: u.value
        },
        function(f) {
          f.status == "ok" ? (v.value = "success", l.value = f.message) : (v.value = "error", l.value = f.error);
        }
      ));
    };
    return (f, i) => {
      const c = n("v-img"), T = n("v-card-title"), I = n("v-text-field"), k = n("v-col"), m = n("v-row"), s = n("v-btn"), r = n("v-alert"), b = n("v-form"), V = n("v-card-text"), P = n("v-card"), S = n("v-container");
      return p(), y(S, { class: "d-flex align-center justify-center fill-height" }, {
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
              o(V, null, {
                default: t(() => [
                  o(b, {
                    onSubmit: A(q, ["prevent"])
                  }, {
                    default: t(() => [
                      o(m, null, {
                        default: t(() => [
                          o(k, {
                            cols: "12",
                            md: "12"
                          }, {
                            default: t(() => [
                              o(I, {
                                label: "Email",
                                modelValue: u.value,
                                "onUpdate:modelValue": i[0] || (i[0] = (C) => u.value = C),
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
                              o(s, {
                                block: "",
                                variant: "elevated",
                                style: U({ "background-color": e.secondaryColor }),
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
                      l.value ? (p(), y(m, { key: 0 }, {
                        default: t(() => [
                          o(k, {
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
                      })) : R("", !0),
                      o(m, null, {
                        default: t(() => [
                          o(k, {
                            cols: "12",
                            md: "12"
                          }, {
                            default: t(() => [
                              z("div", ie, [
                                o(s, {
                                  text: "",
                                  onClick: i[1] || (i[1] = (C) => L(1)),
                                  style: U({ "background-color": e.primaryColor }),
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
    const d = e, a = _(""), u = _(""), l = _(""), v = _("error"), x = O(), L = W(), q = () => {
      x.push(d.redirectLink);
    }, f = () => {
      !h.validateInput(a.value, h.passwordRules) && !h.validateInput(u.value, h.passwordRules) && (a.value !== u.value ? (v.value = "error", l.value = "Le password non coincidono") : (l.value = "", E.postRequest(
        `${d.hostname}change-password`,
        {
          pass_token: L.params.token,
          new_password: G(a.value).toString()
        },
        function(i) {
          i.status === "ok" ? (v.value = "success", l.value = i.message) : (v.value = "error", l.value = i.error);
        }
      )));
    };
    return (i, c) => {
      const T = n("v-img"), I = n("v-card-title"), k = n("v-text-field"), m = n("v-col"), s = n("v-row"), r = n("v-btn"), b = n("v-alert"), V = n("v-form"), P = n("v-card-text"), S = n("v-card"), C = n("v-container");
      return p(), y(C, { class: "d-flex align-center justify-center fill-height" }, {
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
              o(I, { class: "text-h5 text-center mb-6" }, {
                default: t(() => [
                  g($(e.title), 1)
                ]),
                _: 1
              }),
              o(P, null, {
                default: t(() => [
                  o(V, {
                    onSubmit: A(f, ["prevent"])
                  }, {
                    default: t(() => [
                      o(s, null, {
                        default: t(() => [
                          o(m, { cols: "12" }, {
                            default: t(() => [
                              o(k, {
                                label: "Password",
                                modelValue: a.value,
                                "onUpdate:modelValue": c[0] || (c[0] = (w) => a.value = w),
                                rules: M(h).passwordRules,
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
                                modelValue: u.value,
                                "onUpdate:modelValue": c[1] || (c[1] = (w) => u.value = w),
                                rules: M(h).passwordRules,
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
                      l.value ? (p(), y(s, { key: 0 }, {
                        default: t(() => [
                          o(m, { cols: "12" }, {
                            default: t(() => [
                              o(b, {
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
                      })) : R("", !0),
                      o(s, null, {
                        default: t(() => [
                          o(m, {
                            cols: "12",
                            class: "text-center"
                          }, {
                            default: t(() => [
                              z("div", me, [
                                o(r, {
                                  text: "",
                                  onClick: q,
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
      return p(), y(v, { class: "login-container" }, {
        default: t(() => [
          d.value == 1 ? (p(), y(te, {
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
          d.value == 2 && e.signUp ? (p(), y(ue, {
            key: 1,
            onChangeStatus: a,
            logo: e.logo,
            title: e.signinTitle,
            primaryColor: e.primaryColor,
            secondaryColor: e.secondaryColor,
            redirectLink: e.redirectLink,
            hostname: e.hostname
          }, null, 8, ["logo", "title", "primaryColor", "secondaryColor", "redirectLink", "hostname"])) : R("", !0),
          d.value == 3 && e.signUp ? (p(), y(de, {
            key: 2,
            onChangeStatus: a,
            logo: e.logo,
            title: e.changePasswordTitle,
            primaryColor: e.primaryColor,
            secondaryColor: e.secondaryColor,
            redirectLink: e.redirectLink,
            hostname: e.hostname
          }, null, 8, ["logo", "title", "primaryColor", "secondaryColor", "redirectLink", "hostname"])) : R("", !0),
          d.value == 4 && e.signUp ? (p(), y(ge, {
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
  ye as AuthManager,
  ge as Password
};
