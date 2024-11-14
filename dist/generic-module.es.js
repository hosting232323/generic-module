import { ref as g, resolveComponent as l, openBlock as y, createBlock as b, withCtx as o, createVNode as t, createTextVNode as _, toDisplayString as q, withModifiers as E, createCommentVNode as k, createElementVNode as j, unref as B } from "vue";
import { SHA256 as M } from "crypto-js";
import { useRouter as O, useRoute as D } from "vue-router";
const H = (e, c, r, a = "POST") => {
  fetch(e, {
    method: a,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(c)
  }).then((n) => {
    if (!n.ok)
      throw new Error(`Errore nella risposta del server: ${n.status} - ${n.statusText}`);
    return n.json();
  }).then((n) => {
    r(n);
  }).catch((n) => {
    console.error("Errore nella richiesta:", n);
  });
}, z = {
  postRequest: H
};
const N = (e, c) => {
  const r = e.__vccOpts || e;
  for (const [a, n] of c)
    r[a] = n;
  return r;
}, J = { class: "d-flex justify-center align-center full-width-btn-group" }, Z = {
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
    }
  },
  emits: ["changeStatus"],
  setup(e, { emit: c }) {
    const r = g(""), a = g(""), n = g(""), d = g(!1), L = O(), V = c, R = () => {
      r.value && a.value && (n.value = "", z.postRequest(
        "login",
        {
          email: r.value,
          password: M(a.value).toString()
        },
        function(i) {
          i.status === "ok" ? (localStorage.setItem("strongbox_session_token", i.session_token), L.push(`${redirectLink}/${i.user_id}`)) : n.value = i.error;
        }
      ));
    }, v = () => {
      d.value = !d.value;
    }, s = (i) => {
      V("changeStatus", i);
    };
    return (i, u) => {
      const h = l("v-img"), p = l("v-card-title"), m = l("v-text-field"), f = l("v-col"), C = l("v-row"), S = l("v-btn"), U = l("v-alert"), P = l("v-form"), T = l("v-card-text"), x = l("v-card"), $ = l("v-container");
      return y(), b($, { class: "d-flex align-center justify-center fill-height" }, {
        default: o(() => [
          t(x, {
            elevation: 20,
            width: "500",
            class: "pa-5"
          }, {
            default: o(() => [
              t(h, {
                src: e.logo,
                "max-width": "100",
                class: "mx-auto mb-4",
                alt: "Logo"
              }, null, 8, ["src"]),
              t(p, { class: "text-h5 text-center mb-6" }, {
                default: o(() => [
                  _(q(e.title), 1)
                ]),
                _: 1
              }),
              t(T, null, {
                default: o(() => [
                  t(P, {
                    onSubmit: E(R, ["prevent"])
                  }, {
                    default: o(() => [
                      t(C, null, {
                        default: o(() => [
                          t(f, {
                            cols: "12",
                            md: "12"
                          }, {
                            default: o(() => [
                              t(m, {
                                label: "Email",
                                modelValue: r.value,
                                "onUpdate:modelValue": u[0] || (u[0] = (I) => r.value = I),
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
                      t(C, null, {
                        default: o(() => [
                          t(f, {
                            cols: "12",
                            md: "12"
                          }, {
                            default: o(() => [
                              t(m, {
                                type: d.value ? "text" : "password",
                                label: "Password",
                                modelValue: a.value,
                                "onUpdate:modelValue": u[1] || (u[1] = (I) => a.value = I),
                                "prepend-icon": "mdi-lock",
                                "append-inner-icon": d.value ? "mdi-eye-off" : "mdi-eye",
                                "onClick:appendInner": v,
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
                      t(C, null, {
                        default: o(() => [
                          t(f, {
                            cols: "12",
                            md: "12",
                            class: "text-center"
                          }, {
                            default: o(() => [
                              t(S, {
                                class: "full-width-btn mb-1 custom-btn",
                                variant: "elevated",
                                color: e.secondaryColor,
                                type: "submit"
                              }, {
                                default: o(() => u[4] || (u[4] = [
                                  _(" Login ")
                                ])),
                                _: 1
                              }, 8, ["color"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      n.value ? (y(), b(C, { key: 0 }, {
                        default: o(() => [
                          t(f, {
                            cols: "12",
                            md: "12"
                          }, {
                            default: o(() => [
                              t(U, {
                                type: "error",
                                dense: ""
                              }, {
                                default: o(() => [
                                  _(q(n.value), 1)
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })) : k("", !0),
                      e.signUp ? (y(), b(C, { key: 1 }, {
                        default: o(() => [
                          t(f, {
                            cols: "12",
                            md: "12",
                            class: "text-center"
                          }, {
                            default: o(() => [
                              j("div", J, [
                                t(S, {
                                  text: "",
                                  onClick: u[2] || (u[2] = (I) => s(2)),
                                  class: "custom-btn full-width-btn",
                                  color: e.primaryColor
                                }, {
                                  default: o(() => u[5] || (u[5] = [
                                    _("Registrati qui")
                                  ])),
                                  _: 1
                                }, 8, ["color"]),
                                u[7] || (u[7] = j("span", { class: "ml-1 mr-1" }, null, -1)),
                                t(S, {
                                  text: "",
                                  onClick: u[3] || (u[3] = (I) => s(3)),
                                  class: "custom-btn full-width-btn",
                                  color: e.primaryColor
                                }, {
                                  default: o(() => u[6] || (u[6] = [
                                    _("Reset password")
                                  ])),
                                  _: 1
                                }, 8, ["color"])
                              ])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })) : k("", !0)
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
}, F = /* @__PURE__ */ N(Z, [["__scopeId", "data-v-b1376249"]]), A = [
  (e) => e ? !0 : "Campo obbligatorio"
], G = A.concat([
  (e) => /.+@.+\..+/.test(e) ? !0 : "E-mail non valida."
]), K = A.concat([
  (e) => /^(https?:\/\/)?([\w-]+\.)+([a-z]{2,})+(\/[\w-]*)*(\?[a-z0-9-]+=[a-z0-9-%]+(&[a-z0-9-]+=[a-z0-9-%]+)*)?$/i.test(e) ? !0 : "Sito non valido."
]), Q = A.concat([
  (e) => /[A-Z]/.test(e) ? !0 : "La password deve contenere almeno una lettera maiscola.",
  (e) => /[a-z]/.test(e) ? !0 : "La password deve contenere almeno una lettera minuscola.",
  (e) => /\d/.test(e) ? !0 : "La password deve contenere almeno un numero.",
  (e) => e.length >= 8 ? !0 : "La password deve contenere almeno 8 caratteri."
]), W = (e, c) => {
  const r = [];
  for (const a of c) {
    const n = a(e);
    n !== !0 && r.push(n);
  }
  return r.length === 0 ? null : r;
}, w = {
  validateInput: W,
  requiredRules: A,
  emailRules: G,
  siteRules: K,
  passwordRules: Q
};
const X = { class: "d-flex justify-start align-center" }, Y = {
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
    }
  },
  emits: ["changeStatus"],
  setup(e, { emit: c }) {
    const r = g(""), a = g(""), n = g(""), d = g("error"), L = c, V = (v) => {
      L("changeStatus", v);
    }, R = () => {
      !w.validateInput(r.value, w.emailRules) && !w.validateInput(a.value, w.requiredRules) && (n.value = "", z.postRequest(
        "register-user",
        {
          name: a.value,
          email: r.value
        },
        function(v) {
          v.status === "ok" ? (d.value = "success", n.value = v.message) : (d.value = "error", n.value = v.error);
        }
      ));
    };
    return (v, s) => {
      const i = l("v-img"), u = l("v-card-title"), h = l("v-text-field"), p = l("v-col"), m = l("v-row"), f = l("v-btn"), C = l("v-alert"), S = l("v-form"), U = l("v-card-text"), P = l("v-card"), T = l("v-container");
      return y(), b(T, { class: "d-flex align-center justify-center fill-height" }, {
        default: o(() => [
          t(P, {
            elevation: 20,
            width: "500",
            class: "pa-5"
          }, {
            default: o(() => [
              t(i, {
                src: e.logo,
                "max-width": "100",
                class: "mx-auto mb-4",
                alt: "Logo"
              }, null, 8, ["src"]),
              t(u, { class: "text-h5 text-center mb-6" }, {
                default: o(() => [
                  _(q(e.title), 1)
                ]),
                _: 1
              }),
              t(U, null, {
                default: o(() => [
                  t(S, {
                    onSubmit: E(R, ["prevent"])
                  }, {
                    default: o(() => [
                      t(m, null, {
                        default: o(() => [
                          t(p, {
                            cols: "12",
                            md: "12"
                          }, {
                            default: o(() => [
                              t(h, {
                                label: "Nome",
                                modelValue: a.value,
                                "onUpdate:modelValue": s[0] || (s[0] = (x) => a.value = x),
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
                          t(p, {
                            cols: "12",
                            md: "12"
                          }, {
                            default: o(() => [
                              t(h, {
                                label: "Email",
                                modelValue: r.value,
                                "onUpdate:modelValue": s[1] || (s[1] = (x) => r.value = x),
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
                          t(p, {
                            cols: "12",
                            md: "12",
                            class: "text-center"
                          }, {
                            default: o(() => [
                              t(f, {
                                block: "",
                                variant: "elevated",
                                color: e.secondaryColor,
                                type: "submit",
                                class: "mb-4 custom-btn"
                              }, {
                                default: o(() => s[3] || (s[3] = [
                                  _(" Registrati ")
                                ])),
                                _: 1
                              }, 8, ["color"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      n.value ? (y(), b(m, { key: 0 }, {
                        default: o(() => [
                          t(p, {
                            cols: "12",
                            md: "12"
                          }, {
                            default: o(() => [
                              t(C, {
                                type: d.value,
                                dense: ""
                              }, {
                                default: o(() => [
                                  _(q(n.value), 1)
                                ]),
                                _: 1
                              }, 8, ["type"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })) : k("", !0),
                      t(m, null, {
                        default: o(() => [
                          t(p, {
                            cols: "12",
                            md: "12"
                          }, {
                            default: o(() => [
                              j("div", X, [
                                t(f, {
                                  text: "",
                                  onClick: s[2] || (s[2] = (x) => V(1)),
                                  color: e.primaryColor,
                                  class: "custom-btn full-width-btn"
                                }, {
                                  default: o(() => s[4] || (s[4] = [
                                    _("Torna al login")
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
}, ee = /* @__PURE__ */ N(Y, [["__scopeId", "data-v-fb12e742"]]);
const te = { class: "d-flex justify-start align-center" }, oe = {
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
    }
  },
  emits: ["changeStatus"],
  setup(e, { emit: c }) {
    const r = e, a = g(""), n = g(""), d = g("error"), L = c, V = (v) => {
      L("changeStatus", v);
    }, R = () => {
      w.validateInput(a.value, w.emailRules) || (n.value = "", z.postRequest(
        `${r.hostname}ask-change-password`,
        {
          email: a.value
        },
        function(v) {
          v.status == "ok" ? (d.value = "success", n.value = v.message) : (d.value = "error", n.value = v.error);
        }
      ));
    };
    return (v, s) => {
      const i = l("v-img"), u = l("v-card-title"), h = l("v-text-field"), p = l("v-col"), m = l("v-row"), f = l("v-btn"), C = l("v-alert"), S = l("v-form"), U = l("v-card-text"), P = l("v-card"), T = l("v-container");
      return y(), b(T, { class: "d-flex align-center justify-center fill-height" }, {
        default: o(() => [
          t(P, {
            elevation: 20,
            width: "500",
            class: "pa-5"
          }, {
            default: o(() => [
              t(i, {
                src: e.logo,
                "max-width": "100",
                class: "mx-auto mb-4",
                alt: "Logo"
              }, null, 8, ["src"]),
              t(u, { class: "text-h5 text-center mb-6" }, {
                default: o(() => [
                  _(q(e.title), 1)
                ]),
                _: 1
              }),
              t(U, null, {
                default: o(() => [
                  t(S, {
                    onSubmit: E(R, ["prevent"])
                  }, {
                    default: o(() => [
                      t(m, null, {
                        default: o(() => [
                          t(p, {
                            cols: "12",
                            md: "12"
                          }, {
                            default: o(() => [
                              t(h, {
                                label: "Email",
                                modelValue: a.value,
                                "onUpdate:modelValue": s[0] || (s[0] = (x) => a.value = x),
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
                          t(p, {
                            cols: "12",
                            md: "12",
                            class: "text-center"
                          }, {
                            default: o(() => [
                              t(f, {
                                block: "",
                                variant: "elevated",
                                color: e.secondaryColor,
                                type: "submit",
                                class: "mb-4 custom-btn"
                              }, {
                                default: o(() => s[2] || (s[2] = [
                                  _(" Invia mail ")
                                ])),
                                _: 1
                              }, 8, ["color"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      n.value ? (y(), b(m, { key: 0 }, {
                        default: o(() => [
                          t(p, {
                            cols: "12",
                            md: "12"
                          }, {
                            default: o(() => [
                              t(C, {
                                type: d.value,
                                dense: ""
                              }, {
                                default: o(() => [
                                  _(q(n.value), 1)
                                ]),
                                _: 1
                              }, 8, ["type"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })) : k("", !0),
                      t(m, null, {
                        default: o(() => [
                          t(p, {
                            cols: "12",
                            md: "12"
                          }, {
                            default: o(() => [
                              j("div", te, [
                                t(f, {
                                  text: "",
                                  onClick: s[1] || (s[1] = (x) => V(1)),
                                  color: e.primaryColor,
                                  class: "custom-btn full-width-btn"
                                }, {
                                  default: o(() => s[3] || (s[3] = [
                                    _("Torna al login")
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
}, le = /* @__PURE__ */ N(oe, [["__scopeId", "data-v-be1f62d0"]]);
const ne = { class: "d-flex justify-start align-center" }, re = {
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
    }
  },
  setup(e) {
    const c = e, r = g(""), a = g(""), n = g(""), d = g("error"), L = O(), V = D(), R = () => {
      L.push(c.redirectLink);
    }, v = () => {
      !w.validateInput(r.value, w.passwordRules) && !w.validateInput(a.value, w.passwordRules) && (r.value !== a.value ? (d.value = "error", n.value = "Le password non coincidono") : (n.value = "", z.postRequest(
        "change-password",
        {
          pass_token: V.params.token,
          new_password: M(r.value).toString()
        },
        function(s) {
          s.status === "ok" ? (d.value = "success", n.value = s.message) : (d.value = "error", n.value = s.error);
        }
      )));
    };
    return (s, i) => {
      const u = l("v-img"), h = l("v-card-title"), p = l("v-text-field"), m = l("v-col"), f = l("v-row"), C = l("v-btn"), S = l("v-alert"), U = l("v-form"), P = l("v-card-text"), T = l("v-card"), x = l("v-container");
      return y(), b(x, { class: "d-flex align-center justify-center fill-height" }, {
        default: o(() => [
          t(T, {
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
              t(h, { class: "text-h5 text-center mb-6" }, {
                default: o(() => [
                  _(q(e.title), 1)
                ]),
                _: 1
              }),
              t(P, null, {
                default: o(() => [
                  t(U, {
                    onSubmit: E(v, ["prevent"])
                  }, {
                    default: o(() => [
                      t(f, null, {
                        default: o(() => [
                          t(m, { cols: "12" }, {
                            default: o(() => [
                              t(p, {
                                label: "Password",
                                modelValue: r.value,
                                "onUpdate:modelValue": i[0] || (i[0] = ($) => r.value = $),
                                rules: B(w).passwordRules,
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
                              t(p, {
                                label: "Conferma password",
                                modelValue: a.value,
                                "onUpdate:modelValue": i[1] || (i[1] = ($) => a.value = $),
                                rules: B(w).passwordRules,
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
                      t(f, null, {
                        default: o(() => [
                          t(m, {
                            cols: "12",
                            class: "text-center"
                          }, {
                            default: o(() => [
                              t(C, {
                                block: "",
                                variant: "elevated",
                                color: e.secondaryColor,
                                type: "submit",
                                class: "mb-4 custom-btn"
                              }, {
                                default: o(() => i[2] || (i[2] = [
                                  _(" Invia ")
                                ])),
                                _: 1
                              }, 8, ["color"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      n.value ? (y(), b(f, { key: 0 }, {
                        default: o(() => [
                          t(m, { cols: "12" }, {
                            default: o(() => [
                              t(S, {
                                type: d.value,
                                dense: ""
                              }, {
                                default: o(() => [
                                  _(q(n.value), 1)
                                ]),
                                _: 1
                              }, 8, ["type"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })) : k("", !0),
                      t(f, null, {
                        default: o(() => [
                          t(m, {
                            cols: "12",
                            class: "text-center"
                          }, {
                            default: o(() => [
                              j("div", ne, [
                                t(C, {
                                  text: "",
                                  onClick: R,
                                  color: e.primaryColor,
                                  class: "custom-btn full-width-btn"
                                }, {
                                  default: o(() => i[3] || (i[3] = [
                                    _("Torna al login")
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
}, ae = /* @__PURE__ */ N(re, [["__scopeId", "data-v-81f55f89"]]), ce = {
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
      type: String,
      required: (e) => e.signUp
    },
    changePasswordTitle: {
      type: String,
      required: (e) => e.signUp
    },
    newPasswordTitle: {
      type: String,
      required: (e) => e.signUp
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
    }
  },
  setup(e) {
    const c = g(1), r = (a) => {
      c.value = a;
    };
    return (a, n) => {
      const d = l("v-container");
      return y(), b(d, { class: "login-container" }, {
        default: o(() => [
          c.value == 1 ? (y(), b(F, {
            key: 0,
            onChangeStatus: r,
            logo: e.logo,
            title: e.title,
            primaryColor: e.primaryColor,
            secondaryColor: e.secondaryColor,
            redirectLink: e.redirectLink,
            signUp: e.signUp
          }, null, 8, ["logo", "title", "primaryColor", "secondaryColor", "redirectLink", "signUp"])) : k("", !0),
          c.value == 2 && e.signUp ? (y(), b(ee, {
            key: 1,
            onChangeStatus: r,
            logo: e.logo,
            title: e.signinTitle,
            primaryColor: e.primaryColor,
            secondaryColor: e.secondaryColor,
            redirectLink: e.redirectLink
          }, null, 8, ["logo", "title", "primaryColor", "secondaryColor", "redirectLink"])) : k("", !0),
          c.value == 3 && e.signUp ? (y(), b(le, {
            key: 2,
            onChangeStatus: r,
            logo: e.logo,
            title: e.changePasswordTitle,
            primaryColor: e.primaryColor,
            secondaryColor: e.secondaryColor,
            redirectLink: e.redirectLink
          }, null, 8, ["logo", "title", "primaryColor", "secondaryColor", "redirectLink"])) : k("", !0),
          c.value == 4 && e.signUp ? (y(), b(ae, {
            key: 3,
            onChangeStatus: r,
            logo: e.logo,
            title: e.newPasswordTitle,
            primaryColor: e.primaryColor,
            secondaryColor: e.secondaryColor,
            redirectLink: e.redirectLink
          }, null, 8, ["logo", "title", "primaryColor", "secondaryColor", "redirectLink"])) : k("", !0)
        ]),
        _: 1
      });
    };
  }
};
export {
  ce as AuthManager,
  ae as Password
};
