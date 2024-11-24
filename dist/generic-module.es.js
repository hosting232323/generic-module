import { ref as f, resolveComponent as n, openBlock as p, createBlock as y, withCtx as o, createVNode as t, createTextVNode as g, toDisplayString as R, withModifiers as E, createCommentVNode as L, createElementVNode as j, unref as B } from "vue";
import { SHA256 as M } from "crypto-js";
import { useRouter as O, useRoute as H } from "vue-router";
const J = (e, d, s, a = "POST") => {
  fetch(e, {
    method: a,
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
}, z = {
  postRequest: J
};
const A = (e, d) => {
  const s = e.__vccOpts || e;
  for (const [a, l] of d)
    s[a] = l;
  return s;
}, F = { class: "d-flex justify-center align-center full-width-btn-group" }, G = {
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
  setup(e, { emit: d }) {
    const s = e, a = f(""), l = f(""), c = f(""), w = f(!1), T = O(), U = d, C = () => {
      a.value && l.value && (c.value = "", z.postRequest(
        `${s.hostname}login`,
        {
          email: a.value,
          password: s.signUp ? M(l.value).toString() : l.value
        },
        function(_) {
          _.status === "ok" ? (localStorage.setItem("strongbox_session_token", _.session_token), T.push(i(s.redirectLink, _))) : c.value = _.error;
        }
      ));
    }, i = (_, r) => _.replace(/:([a-zA-Z0-9_]+)/g, (m, v) => v in r ? r[v] : m), u = () => {
      w.value = !w.value;
    }, V = (_) => {
      U("changeStatus", _);
    };
    return (_, r) => {
      const m = n("v-img"), v = n("v-card-title"), h = n("v-text-field"), x = n("v-col"), S = n("v-row"), q = n("v-btn"), $ = n("v-alert"), P = n("v-form"), k = n("v-card-text"), Z = n("v-card"), D = n("v-container");
      return p(), y(D, { class: "d-flex align-center justify-center fill-height" }, {
        default: o(() => [
          t(Z, {
            elevation: 20,
            width: "500",
            class: "pa-5"
          }, {
            default: o(() => [
              t(m, {
                src: e.logo,
                "max-width": "100",
                class: "mx-auto mb-4",
                alt: "Logo"
              }, null, 8, ["src"]),
              t(v, { class: "text-h5 text-center mb-6" }, {
                default: o(() => [
                  g(R(e.title), 1)
                ]),
                _: 1
              }),
              t(k, null, {
                default: o(() => [
                  t(P, {
                    onSubmit: E(C, ["prevent"])
                  }, {
                    default: o(() => [
                      t(S, null, {
                        default: o(() => [
                          t(x, {
                            cols: "12",
                            md: "12"
                          }, {
                            default: o(() => [
                              t(h, {
                                label: "Email",
                                modelValue: a.value,
                                "onUpdate:modelValue": r[0] || (r[0] = (I) => a.value = I),
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
                      t(S, null, {
                        default: o(() => [
                          t(x, {
                            cols: "12",
                            md: "12"
                          }, {
                            default: o(() => [
                              t(h, {
                                type: w.value ? "text" : "password",
                                label: "Password",
                                modelValue: l.value,
                                "onUpdate:modelValue": r[1] || (r[1] = (I) => l.value = I),
                                "prepend-icon": "mdi-lock",
                                "append-inner-icon": w.value ? "mdi-eye-off" : "mdi-eye",
                                "onClick:appendInner": u,
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
                      t(S, null, {
                        default: o(() => [
                          t(x, {
                            cols: "12",
                            md: "12",
                            class: "text-center"
                          }, {
                            default: o(() => [
                              t(q, {
                                class: "full-width-btn mb-1 custom-btn",
                                variant: "elevated",
                                color: e.secondaryColor,
                                type: "submit"
                              }, {
                                default: o(() => r[4] || (r[4] = [
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
                      c.value ? (p(), y(S, { key: 0 }, {
                        default: o(() => [
                          t(x, {
                            cols: "12",
                            md: "12"
                          }, {
                            default: o(() => [
                              t($, {
                                type: "error",
                                dense: ""
                              }, {
                                default: o(() => [
                                  g(R(c.value), 1)
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })) : L("", !0),
                      e.signUp ? (p(), y(S, { key: 1 }, {
                        default: o(() => [
                          t(x, {
                            cols: "12",
                            md: "12",
                            class: "text-center"
                          }, {
                            default: o(() => [
                              j("div", F, [
                                t(q, {
                                  text: "",
                                  onClick: r[2] || (r[2] = (I) => V(2)),
                                  class: "custom-btn full-width-btn",
                                  color: e.primaryColor
                                }, {
                                  default: o(() => r[5] || (r[5] = [
                                    g("Registrati qui")
                                  ])),
                                  _: 1
                                }, 8, ["color"]),
                                r[7] || (r[7] = j("span", { class: "ml-1 mr-1" }, null, -1)),
                                t(q, {
                                  text: "",
                                  onClick: r[3] || (r[3] = (I) => V(3)),
                                  class: "custom-btn full-width-btn",
                                  color: e.primaryColor
                                }, {
                                  default: o(() => r[6] || (r[6] = [
                                    g("Reset password")
                                  ])),
                                  _: 1
                                }, 8, ["color"])
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
}, K = /* @__PURE__ */ A(G, [["__scopeId", "data-v-a0d66ed2"]]), N = [
  (e) => e ? !0 : "Campo obbligatorio"
], Q = N.concat([
  (e) => /.+@.+\..+/.test(e) ? !0 : "E-mail non valida."
]), W = N.concat([
  (e) => /^(https?:\/\/)?([\w-]+\.)+([a-z]{2,})+(\/[\w-]*)*(\?[a-z0-9-]+=[a-z0-9-%]+(&[a-z0-9-]+=[a-z0-9-%]+)*)?$/i.test(e) ? !0 : "Sito non valido."
]), X = N.concat([
  (e) => /[A-Z]/.test(e) ? !0 : "La password deve contenere almeno una lettera maiscola.",
  (e) => /[a-z]/.test(e) ? !0 : "La password deve contenere almeno una lettera minuscola.",
  (e) => /\d/.test(e) ? !0 : "La password deve contenere almeno un numero.",
  (e) => e.length >= 8 ? !0 : "La password deve contenere almeno 8 caratteri."
]), Y = (e, d) => {
  const s = [];
  for (const a of d) {
    const l = a(e);
    l !== !0 && s.push(l);
  }
  return s.length === 0 ? null : s;
}, b = {
  validateInput: Y,
  requiredRules: N,
  emailRules: Q,
  siteRules: W,
  passwordRules: X
};
const ee = { class: "d-flex justify-start align-center" }, te = {
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
    const s = e, a = f(""), l = f(""), c = f(""), w = f("error"), T = d, U = (i) => {
      T("changeStatus", i);
    }, C = () => {
      !b.validateInput(a.value, b.emailRules) && !b.validateInput(l.value, b.requiredRules) && (c.value = "", z.postRequest(
        `${s.hostname}register-user`,
        {
          name: l.value,
          email: a.value
        },
        function(i) {
          i.status === "ok" ? (w.value = "success", c.value = i.message) : (w.value = "error", c.value = i.error);
        }
      ));
    };
    return (i, u) => {
      const V = n("v-img"), _ = n("v-card-title"), r = n("v-text-field"), m = n("v-col"), v = n("v-row"), h = n("v-btn"), x = n("v-alert"), S = n("v-form"), q = n("v-card-text"), $ = n("v-card"), P = n("v-container");
      return p(), y(P, { class: "d-flex align-center justify-center fill-height" }, {
        default: o(() => [
          t($, {
            elevation: 20,
            width: "500",
            class: "pa-5"
          }, {
            default: o(() => [
              t(V, {
                src: e.logo,
                "max-width": "100",
                class: "mx-auto mb-4",
                alt: "Logo"
              }, null, 8, ["src"]),
              t(_, { class: "text-h5 text-center mb-6" }, {
                default: o(() => [
                  g(R(e.title), 1)
                ]),
                _: 1
              }),
              t(q, null, {
                default: o(() => [
                  t(S, {
                    onSubmit: E(C, ["prevent"])
                  }, {
                    default: o(() => [
                      t(v, null, {
                        default: o(() => [
                          t(m, {
                            cols: "12",
                            md: "12"
                          }, {
                            default: o(() => [
                              t(r, {
                                label: "Nome",
                                modelValue: l.value,
                                "onUpdate:modelValue": u[0] || (u[0] = (k) => l.value = k),
                                outlined: "",
                                color: e.primaryColor,
                                class: "mb-4"
                              }, null, 8, ["modelValue", "color"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      t(v, null, {
                        default: o(() => [
                          t(m, {
                            cols: "12",
                            md: "12"
                          }, {
                            default: o(() => [
                              t(r, {
                                label: "Email",
                                modelValue: a.value,
                                "onUpdate:modelValue": u[1] || (u[1] = (k) => a.value = k),
                                type: "email",
                                outlined: "",
                                color: e.primaryColor,
                                class: "mb-4"
                              }, null, 8, ["modelValue", "color"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      t(v, null, {
                        default: o(() => [
                          t(m, {
                            cols: "12",
                            md: "12",
                            class: "text-center"
                          }, {
                            default: o(() => [
                              t(h, {
                                block: "",
                                variant: "elevated",
                                color: e.secondaryColor,
                                type: "submit",
                                class: "mb-4 custom-btn"
                              }, {
                                default: o(() => u[3] || (u[3] = [
                                  g(" Registrati ")
                                ])),
                                _: 1
                              }, 8, ["color"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      c.value ? (p(), y(v, { key: 0 }, {
                        default: o(() => [
                          t(m, {
                            cols: "12",
                            md: "12"
                          }, {
                            default: o(() => [
                              t(x, {
                                type: w.value,
                                dense: ""
                              }, {
                                default: o(() => [
                                  g(R(c.value), 1)
                                ]),
                                _: 1
                              }, 8, ["type"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })) : L("", !0),
                      t(v, null, {
                        default: o(() => [
                          t(m, {
                            cols: "12",
                            md: "12"
                          }, {
                            default: o(() => [
                              j("div", ee, [
                                t(h, {
                                  text: "",
                                  onClick: u[2] || (u[2] = (k) => U(1)),
                                  color: e.primaryColor,
                                  class: "custom-btn full-width-btn"
                                }, {
                                  default: o(() => u[4] || (u[4] = [
                                    g("Torna al login")
                                  ])),
                                  _: 1
                                }, 8, ["color"])
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
}, oe = /* @__PURE__ */ A(te, [["__scopeId", "data-v-0f9a674f"]]);
const ne = { class: "d-flex justify-start align-center" }, le = {
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
    const s = e, a = f(""), l = f(""), c = f("error"), w = d, T = (C) => {
      w("changeStatus", C);
    }, U = () => {
      b.validateInput(a.value, b.emailRules) || (l.value = "", z.postRequest(
        `${s.hostname}ask-change-password`,
        {
          email: a.value
        },
        function(C) {
          C.status == "ok" ? (c.value = "success", l.value = C.message) : (c.value = "error", l.value = C.error);
        }
      ));
    };
    return (C, i) => {
      const u = n("v-img"), V = n("v-card-title"), _ = n("v-text-field"), r = n("v-col"), m = n("v-row"), v = n("v-btn"), h = n("v-alert"), x = n("v-form"), S = n("v-card-text"), q = n("v-card"), $ = n("v-container");
      return p(), y($, { class: "d-flex align-center justify-center fill-height" }, {
        default: o(() => [
          t(q, {
            elevation: 20,
            width: "500",
            class: "pa-5"
          }, {
            default: o(() => [
              t(u, {
                src: e.logo,
                "max-width": "100",
                class: "mx-auto mb-4",
                alt: "Logo"
              }, null, 8, ["src"]),
              t(V, { class: "text-h5 text-center mb-6" }, {
                default: o(() => [
                  g(R(e.title), 1)
                ]),
                _: 1
              }),
              t(S, null, {
                default: o(() => [
                  t(x, {
                    onSubmit: E(U, ["prevent"])
                  }, {
                    default: o(() => [
                      t(m, null, {
                        default: o(() => [
                          t(r, {
                            cols: "12",
                            md: "12"
                          }, {
                            default: o(() => [
                              t(_, {
                                label: "Email",
                                modelValue: a.value,
                                "onUpdate:modelValue": i[0] || (i[0] = (P) => a.value = P),
                                type: "email",
                                outlined: "",
                                color: e.primaryColor,
                                class: "mb-4"
                              }, null, 8, ["modelValue", "color"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      t(m, null, {
                        default: o(() => [
                          t(r, {
                            cols: "12",
                            md: "12",
                            class: "text-center"
                          }, {
                            default: o(() => [
                              t(v, {
                                block: "",
                                variant: "elevated",
                                color: e.secondaryColor,
                                type: "submit",
                                class: "mb-4 custom-btn"
                              }, {
                                default: o(() => i[2] || (i[2] = [
                                  g(" Invia mail ")
                                ])),
                                _: 1
                              }, 8, ["color"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      l.value ? (p(), y(m, { key: 0 }, {
                        default: o(() => [
                          t(r, {
                            cols: "12",
                            md: "12"
                          }, {
                            default: o(() => [
                              t(h, {
                                type: c.value,
                                dense: ""
                              }, {
                                default: o(() => [
                                  g(R(l.value), 1)
                                ]),
                                _: 1
                              }, 8, ["type"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })) : L("", !0),
                      t(m, null, {
                        default: o(() => [
                          t(r, {
                            cols: "12",
                            md: "12"
                          }, {
                            default: o(() => [
                              j("div", ne, [
                                t(v, {
                                  text: "",
                                  onClick: i[1] || (i[1] = (P) => T(1)),
                                  color: e.primaryColor,
                                  class: "custom-btn full-width-btn"
                                }, {
                                  default: o(() => i[3] || (i[3] = [
                                    g("Torna al login")
                                  ])),
                                  _: 1
                                }, 8, ["color"])
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
}, re = /* @__PURE__ */ A(le, [["__scopeId", "data-v-c75b0514"]]);
const ae = { class: "d-flex justify-start align-center" }, se = {
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
    const d = e, s = f(""), a = f(""), l = f(""), c = f("error"), w = O(), T = H(), U = () => {
      w.push(d.redirectLink);
    }, C = () => {
      !b.validateInput(s.value, b.passwordRules) && !b.validateInput(a.value, b.passwordRules) && (s.value !== a.value ? (c.value = "error", l.value = "Le password non coincidono") : (l.value = "", z.postRequest(
        `${d.hostname}change-password`,
        {
          pass_token: T.params.token,
          new_password: M(s.value).toString()
        },
        function(i) {
          i.status === "ok" ? (c.value = "success", l.value = i.message) : (c.value = "error", l.value = i.error);
        }
      )));
    };
    return (i, u) => {
      const V = n("v-img"), _ = n("v-card-title"), r = n("v-text-field"), m = n("v-col"), v = n("v-row"), h = n("v-btn"), x = n("v-alert"), S = n("v-form"), q = n("v-card-text"), $ = n("v-card"), P = n("v-container");
      return p(), y(P, { class: "d-flex align-center justify-center fill-height" }, {
        default: o(() => [
          t($, {
            elevation: 20,
            width: "500",
            class: "pa-5"
          }, {
            default: o(() => [
              t(V, {
                src: e.logo,
                "max-width": "100",
                class: "mx-auto mb-4",
                alt: "Logo"
              }, null, 8, ["src"]),
              t(_, { class: "text-h5 text-center mb-6" }, {
                default: o(() => [
                  g(R(e.title), 1)
                ]),
                _: 1
              }),
              t(q, null, {
                default: o(() => [
                  t(S, {
                    onSubmit: E(C, ["prevent"])
                  }, {
                    default: o(() => [
                      t(v, null, {
                        default: o(() => [
                          t(m, { cols: "12" }, {
                            default: o(() => [
                              t(r, {
                                label: "Password",
                                modelValue: s.value,
                                "onUpdate:modelValue": u[0] || (u[0] = (k) => s.value = k),
                                rules: B(b).passwordRules,
                                type: "password",
                                outlined: "",
                                color: e.primaryColor,
                                class: "mb-4"
                              }, null, 8, ["modelValue", "rules", "color"])
                            ]),
                            _: 1
                          }),
                          t(m, { cols: "12" }, {
                            default: o(() => [
                              t(r, {
                                label: "Conferma password",
                                modelValue: a.value,
                                "onUpdate:modelValue": u[1] || (u[1] = (k) => a.value = k),
                                rules: B(b).passwordRules,
                                type: "password",
                                outlined: "",
                                color: e.primaryColor,
                                class: "mb-4"
                              }, null, 8, ["modelValue", "rules", "color"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      t(v, null, {
                        default: o(() => [
                          t(m, {
                            cols: "12",
                            class: "text-center"
                          }, {
                            default: o(() => [
                              t(h, {
                                block: "",
                                variant: "elevated",
                                color: e.secondaryColor,
                                type: "submit",
                                class: "mb-4 custom-btn"
                              }, {
                                default: o(() => u[2] || (u[2] = [
                                  g(" Invia ")
                                ])),
                                _: 1
                              }, 8, ["color"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      l.value ? (p(), y(v, { key: 0 }, {
                        default: o(() => [
                          t(m, { cols: "12" }, {
                            default: o(() => [
                              t(x, {
                                type: c.value,
                                dense: ""
                              }, {
                                default: o(() => [
                                  g(R(l.value), 1)
                                ]),
                                _: 1
                              }, 8, ["type"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })) : L("", !0),
                      t(v, null, {
                        default: o(() => [
                          t(m, {
                            cols: "12",
                            class: "text-center"
                          }, {
                            default: o(() => [
                              j("div", ae, [
                                t(h, {
                                  text: "",
                                  onClick: U,
                                  color: e.primaryColor,
                                  class: "custom-btn full-width-btn"
                                }, {
                                  default: o(() => u[3] || (u[3] = [
                                    g("Torna al login")
                                  ])),
                                  _: 1
                                }, 8, ["color"])
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
}, ue = /* @__PURE__ */ A(se, [["__scopeId", "data-v-2991cc40"]]), me = {
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
    const d = f(1), s = (a) => {
      d.value = a;
    };
    return (a, l) => {
      const c = n("v-container");
      return p(), y(c, { class: "login-container" }, {
        default: o(() => [
          d.value == 1 ? (p(), y(K, {
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
          d.value == 2 && e.signUp ? (p(), y(oe, {
            key: 1,
            onChangeStatus: s,
            logo: e.logo,
            title: e.signinTitle,
            primaryColor: e.primaryColor,
            secondaryColor: e.secondaryColor,
            redirectLink: e.redirectLink,
            hostname: e.hostname
          }, null, 8, ["logo", "title", "primaryColor", "secondaryColor", "redirectLink", "hostname"])) : L("", !0),
          d.value == 3 && e.signUp ? (p(), y(re, {
            key: 2,
            onChangeStatus: s,
            logo: e.logo,
            title: e.changePasswordTitle,
            primaryColor: e.primaryColor,
            secondaryColor: e.secondaryColor,
            redirectLink: e.redirectLink,
            hostname: e.hostname
          }, null, 8, ["logo", "title", "primaryColor", "secondaryColor", "redirectLink", "hostname"])) : L("", !0),
          d.value == 4 && e.signUp ? (p(), y(ue, {
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
export {
  me as AuthManager,
  ue as Password
};
