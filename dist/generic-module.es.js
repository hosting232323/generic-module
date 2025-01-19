import { ref as p, resolveComponent as l, openBlock as y, createBlock as b, withCtx as t, createVNode as e, createTextVNode as _, toDisplayString as q, withModifiers as E, createCommentVNode as k, createElementVNode as j, unref as B } from "vue";
import { SHA256 as M } from "crypto-js";
import { useRouter as O, useRoute as D } from "vue-router";
const H = (o, m, r, a = "POST") => {
  fetch(o, {
    method: a,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(m)
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
const N = (o, m) => {
  const r = o.__vccOpts || o;
  for (const [a, n] of m)
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
  setup(o, { emit: m }) {
    const r = p(""), a = p(""), n = p(""), c = p(!1), V = O(), L = m, R = () => {
      r.value && a.value && (n.value = "", z.postRequest(
        "login",
        {
          email: r.value,
          password: M(a.value).toString()
        },
        function(i) {
          i.status === "ok" ? (localStorage.setItem("strongbox_session_token", i.session_token), V.push(`${redirectLink}/${i.user_id}`)) : n.value = i.error;
        }
      ));
    }, v = () => {
      c.value = !c.value;
    }, s = (i) => {
      L("changeStatus", i);
    };
    return (i, u) => {
      const h = l("v-img"), g = l("v-card-title"), d = l("v-text-field"), f = l("v-col"), w = l("v-row"), S = l("v-btn"), P = l("v-alert"), $ = l("v-form"), T = l("v-card-text"), C = l("v-card"), U = l("v-container");
      return y(), b(U, { class: "d-flex align-center justify-center fill-height" }, {
        default: t(() => [
          e(C, {
            elevation: 20,
            width: "500",
            class: "pa-5"
          }, {
            default: t(() => [
              e(h, {
                src: o.logo,
                "max-width": "100",
                class: "mx-auto mb-4",
                alt: "Logo"
              }, null, 8, ["src"]),
              e(g, { class: "text-h5 text-center mb-6" }, {
                default: t(() => [
                  _(q(o.title), 1)
                ]),
                _: 1
              }),
              e(T, null, {
                default: t(() => [
                  e($, {
                    onSubmit: E(R, ["prevent"])
                  }, {
                    default: t(() => [
                      e(w, null, {
                        default: t(() => [
                          e(f, {
                            cols: "12",
                            md: "12"
                          }, {
                            default: t(() => [
                              e(d, {
                                label: "Email",
                                modelValue: r.value,
                                "onUpdate:modelValue": u[0] || (u[0] = (I) => r.value = I),
                                type: "email",
                                "prepend-icon": "mdi-email",
                                outlined: "",
                                color: o.primaryColor,
                                class: "mb-2"
                              }, null, 8, ["modelValue", "color"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      e(w, null, {
                        default: t(() => [
                          e(f, {
                            cols: "12",
                            md: "12"
                          }, {
                            default: t(() => [
                              e(d, {
                                type: c.value ? "text" : "password",
                                label: "Password",
                                modelValue: a.value,
                                "onUpdate:modelValue": u[1] || (u[1] = (I) => a.value = I),
                                "prepend-icon": "mdi-lock",
                                "append-inner-icon": c.value ? "mdi-eye-off" : "mdi-eye",
                                "onClick:appendInner": v,
                                outlined: "",
                                color: o.primaryColor,
                                class: "mb-4"
                              }, null, 8, ["type", "modelValue", "append-inner-icon", "color"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      e(w, null, {
                        default: t(() => [
                          e(f, {
                            cols: "12",
                            md: "12",
                            class: "text-center"
                          }, {
                            default: t(() => [
                              e(S, {
                                class: "full-width-btn mb-1 custom-btn",
                                variant: "elevated",
                                color: o.secondaryColor,
                                type: "submit"
                              }, {
                                default: t(() => u[4] || (u[4] = [
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
                      n.value ? (y(), b(w, { key: 0 }, {
                        default: t(() => [
                          e(f, {
                            cols: "12",
                            md: "12"
                          }, {
                            default: t(() => [
                              e(P, {
                                type: "error",
                                dense: ""
                              }, {
                                default: t(() => [
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
                      o.signUp ? (y(), b(w, { key: 1 }, {
                        default: t(() => [
                          e(f, {
                            cols: "12",
                            md: "12",
                            class: "text-center"
                          }, {
                            default: t(() => [
                              j("div", J, [
                                e(S, {
                                  text: "",
                                  onClick: u[2] || (u[2] = (I) => s(2)),
                                  class: "custom-btn full-width-btn",
                                  color: o.primaryColor
                                }, {
                                  default: t(() => u[5] || (u[5] = [
                                    _("Registrati qui")
                                  ])),
                                  _: 1
                                }, 8, ["color"]),
                                u[7] || (u[7] = j("span", { class: "ml-1 mr-1" }, null, -1)),
                                e(S, {
                                  text: "",
                                  onClick: u[3] || (u[3] = (I) => s(3)),
                                  class: "custom-btn full-width-btn",
                                  color: o.primaryColor
                                }, {
                                  default: t(() => u[6] || (u[6] = [
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
}, F = /* @__PURE__ */ N(Z, [["__scopeId", "data-v-e770ae14"]]), A = [
  (o) => o ? !0 : "Campo obbligatorio"
], G = A.concat([
  (o) => /.+@.+\..+/.test(o) ? !0 : "E-mail non valida."
]), K = A.concat([
  (o) => /^(https?:\/\/)?([\w-]+\.)+([a-z]{2,})+(\/[\w-]*)*(\?[a-z0-9-]+=[a-z0-9-%]+(&[a-z0-9-]+=[a-z0-9-%]+)*)?$/i.test(o) ? !0 : "Sito non valido."
]), Q = A.concat([
  (o) => /[A-Z]/.test(o) ? !0 : "La password deve contenere almeno una lettera maiscola.",
  (o) => /[a-z]/.test(o) ? !0 : "La password deve contenere almeno una lettera minuscola.",
  (o) => /\d/.test(o) ? !0 : "La password deve contenere almeno un numero.",
  (o) => o.length >= 8 ? !0 : "La password deve contenere almeno 8 caratteri."
]), W = (o, m) => {
  const r = [];
  for (const a of m) {
    const n = a(o);
    n !== !0 && r.push(n);
  }
  return r.length === 0 ? null : r;
}, x = {
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
    hostname: {
      type: String,
      required: !0
    }
  },
  emits: ["changeStatus"],
  setup(o, { emit: m }) {
    const r = p(""), a = p(""), n = p(""), c = p("error"), V = m, L = (v) => {
      V("changeStatus", v);
    }, R = () => {
      !x.validateInput(r.value, x.emailRules) && !x.validateInput(a.value, x.requiredRules) && (n.value = "", z.postRequest(
        "register-user",
        {
          name: a.value,
          email: r.value
        },
        function(v) {
          v.status === "ok" ? (c.value = "success", n.value = v.message) : (c.value = "error", n.value = v.error);
        }
      ));
    };
    return (v, s) => {
      const i = l("v-img"), u = l("v-card-title"), h = l("v-text-field"), g = l("v-col"), d = l("v-row"), f = l("v-btn"), w = l("v-alert"), S = l("v-form"), P = l("v-card-text"), $ = l("v-card"), T = l("v-container");
      return y(), b(T, { class: "d-flex align-center justify-center fill-height" }, {
        default: t(() => [
          e($, {
            elevation: 20,
            width: "500",
            class: "pa-5"
          }, {
            default: t(() => [
              e(i, {
                src: o.logo,
                "max-width": "100",
                class: "mx-auto mb-4",
                alt: "Logo"
              }, null, 8, ["src"]),
              e(u, { class: "text-h5 text-center mb-6" }, {
                default: t(() => [
                  _(q(o.title), 1)
                ]),
                _: 1
              }),
              e(P, null, {
                default: t(() => [
                  e(S, {
                    onSubmit: E(R, ["prevent"])
                  }, {
                    default: t(() => [
                      e(d, null, {
                        default: t(() => [
                          e(g, {
                            cols: "12",
                            md: "12"
                          }, {
                            default: t(() => [
                              e(h, {
                                label: "Nome",
                                modelValue: a.value,
                                "onUpdate:modelValue": s[0] || (s[0] = (C) => a.value = C),
                                outlined: "",
                                color: o.primaryColor,
                                class: "mb-4"
                              }, null, 8, ["modelValue", "color"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      e(d, null, {
                        default: t(() => [
                          e(g, {
                            cols: "12",
                            md: "12"
                          }, {
                            default: t(() => [
                              e(h, {
                                label: "Email",
                                modelValue: r.value,
                                "onUpdate:modelValue": s[1] || (s[1] = (C) => r.value = C),
                                type: "email",
                                outlined: "",
                                color: o.primaryColor,
                                class: "mb-4"
                              }, null, 8, ["modelValue", "color"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      e(d, null, {
                        default: t(() => [
                          e(g, {
                            cols: "12",
                            md: "12",
                            class: "text-center"
                          }, {
                            default: t(() => [
                              e(f, {
                                block: "",
                                variant: "elevated",
                                color: o.secondaryColor,
                                type: "submit",
                                class: "mb-4 custom-btn"
                              }, {
                                default: t(() => s[3] || (s[3] = [
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
                      n.value ? (y(), b(d, { key: 0 }, {
                        default: t(() => [
                          e(g, {
                            cols: "12",
                            md: "12"
                          }, {
                            default: t(() => [
                              e(w, {
                                type: c.value,
                                dense: ""
                              }, {
                                default: t(() => [
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
                      e(d, null, {
                        default: t(() => [
                          e(g, {
                            cols: "12",
                            md: "12"
                          }, {
                            default: t(() => [
                              j("div", X, [
                                e(f, {
                                  text: "",
                                  onClick: s[2] || (s[2] = (C) => L(1)),
                                  color: o.primaryColor,
                                  class: "custom-btn full-width-btn"
                                }, {
                                  default: t(() => s[4] || (s[4] = [
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
}, ee = /* @__PURE__ */ N(Y, [["__scopeId", "data-v-ea739c3a"]]);
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
    hostname: {
      type: String,
      required: !0
    }
  },
  emits: ["changeStatus"],
  setup(o, { emit: m }) {
    const r = o, a = p(""), n = p(""), c = p("error"), V = m, L = (v) => {
      V("changeStatus", v);
    }, R = () => {
      x.validateInput(a.value, x.emailRules) || (n.value = "", z.postRequest(
        `${r.hostname}ask-change-password`,
        {
          email: a.value
        },
        function(v) {
          v.status == "ok" ? (c.value = "success", n.value = v.message) : (c.value = "error", n.value = v.error);
        }
      ));
    };
    return (v, s) => {
      const i = l("v-img"), u = l("v-card-title"), h = l("v-text-field"), g = l("v-col"), d = l("v-row"), f = l("v-btn"), w = l("v-alert"), S = l("v-form"), P = l("v-card-text"), $ = l("v-card"), T = l("v-container");
      return y(), b(T, { class: "d-flex align-center justify-center fill-height" }, {
        default: t(() => [
          e($, {
            elevation: 20,
            width: "500",
            class: "pa-5"
          }, {
            default: t(() => [
              e(i, {
                src: o.logo,
                "max-width": "100",
                class: "mx-auto mb-4",
                alt: "Logo"
              }, null, 8, ["src"]),
              e(u, { class: "text-h5 text-center mb-6" }, {
                default: t(() => [
                  _(q(o.title), 1)
                ]),
                _: 1
              }),
              e(P, null, {
                default: t(() => [
                  e(S, {
                    onSubmit: E(R, ["prevent"])
                  }, {
                    default: t(() => [
                      e(d, null, {
                        default: t(() => [
                          e(g, {
                            cols: "12",
                            md: "12"
                          }, {
                            default: t(() => [
                              e(h, {
                                label: "Email",
                                modelValue: a.value,
                                "onUpdate:modelValue": s[0] || (s[0] = (C) => a.value = C),
                                type: "email",
                                outlined: "",
                                color: o.primaryColor,
                                class: "mb-4"
                              }, null, 8, ["modelValue", "color"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      e(d, null, {
                        default: t(() => [
                          e(g, {
                            cols: "12",
                            md: "12",
                            class: "text-center"
                          }, {
                            default: t(() => [
                              e(f, {
                                block: "",
                                variant: "elevated",
                                color: o.secondaryColor,
                                type: "submit",
                                class: "mb-4 custom-btn"
                              }, {
                                default: t(() => s[2] || (s[2] = [
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
                      n.value ? (y(), b(d, { key: 0 }, {
                        default: t(() => [
                          e(g, {
                            cols: "12",
                            md: "12"
                          }, {
                            default: t(() => [
                              e(w, {
                                type: c.value,
                                dense: ""
                              }, {
                                default: t(() => [
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
                      e(d, null, {
                        default: t(() => [
                          e(g, {
                            cols: "12",
                            md: "12"
                          }, {
                            default: t(() => [
                              j("div", te, [
                                e(f, {
                                  text: "",
                                  onClick: s[1] || (s[1] = (C) => L(1)),
                                  color: o.primaryColor,
                                  class: "custom-btn full-width-btn"
                                }, {
                                  default: t(() => s[3] || (s[3] = [
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
}, le = /* @__PURE__ */ N(oe, [["__scopeId", "data-v-734e85e2"]]), ie = {
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
      required: !0
    },
    changePasswordTitle: {
      type: String,
      required: !0
    },
    newPasswordTitle: {
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
  setup(o) {
    const m = p(1), r = (a) => {
      m.value = a;
    };
    return (a, n) => {
      const c = l("v-container");
      return y(), b(c, { class: "login-container" }, {
        default: t(() => [
          m.value == 1 ? (y(), b(F, {
            key: 0,
            onChangeStatus: r,
            logo: o.logo,
            title: o.title,
            primaryColor: o.primaryColor,
            secondaryColor: o.secondaryColor,
            redirectLink: o.redirectLink,
            signUp: o.signUp
          }, null, 8, ["logo", "title", "primaryColor", "secondaryColor", "redirectLink", "signUp"])) : k("", !0),
          m.value == 2 && o.signUp ? (y(), b(ee, {
            key: 1,
            onChangeStatus: r,
            logo: o.logo,
            title: o.signinTitle,
            primaryColor: o.primaryColor,
            secondaryColor: o.secondaryColor,
            hostname: a.hostname
          }, null, 8, ["logo", "title", "primaryColor", "secondaryColor", "hostname"])) : k("", !0),
          m.value == 3 && o.signUp ? (y(), b(le, {
            key: 2,
            onChangeStatus: r,
            logo: o.logo,
            title: o.changePasswordTitle,
            primaryColor: o.primaryColor,
            secondaryColor: o.secondaryColor,
            hostname: a.hostname
          }, null, 8, ["logo", "title", "primaryColor", "secondaryColor", "hostname"])) : k("", !0)
        ]),
        _: 1
      });
    };
  }
};
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
  setup(o) {
    const m = o, r = p(""), a = p(""), n = p(""), c = p("error"), V = O(), L = D(), R = () => {
      V.push(m.redirectLink);
    }, v = () => {
      !x.validateInput(r.value, x.passwordRules) && !x.validateInput(a.value, x.passwordRules) && (r.value !== a.value ? (c.value = "error", n.value = "Le password non coincidono") : (n.value = "", z.postRequest(
        "change-password",
        {
          pass_token: L.params.token,
          new_password: M(r.value).toString()
        },
        function(s) {
          s.status === "ok" ? (c.value = "success", n.value = s.message) : (c.value = "error", n.value = s.error);
        }
      )));
    };
    return (s, i) => {
      const u = l("v-img"), h = l("v-card-title"), g = l("v-text-field"), d = l("v-col"), f = l("v-row"), w = l("v-btn"), S = l("v-alert"), P = l("v-form"), $ = l("v-card-text"), T = l("v-card"), C = l("v-container");
      return y(), b(C, { class: "d-flex align-center justify-center fill-height" }, {
        default: t(() => [
          e(T, {
            elevation: 20,
            width: "500",
            class: "pa-5"
          }, {
            default: t(() => [
              e(u, {
                src: o.logo,
                "max-width": "100",
                class: "mx-auto mb-4",
                alt: "Logo"
              }, null, 8, ["src"]),
              e(h, { class: "text-h5 text-center mb-6" }, {
                default: t(() => [
                  _(q(o.title), 1)
                ]),
                _: 1
              }),
              e($, null, {
                default: t(() => [
                  e(P, {
                    onSubmit: E(v, ["prevent"])
                  }, {
                    default: t(() => [
                      e(f, null, {
                        default: t(() => [
                          e(d, { cols: "12" }, {
                            default: t(() => [
                              e(g, {
                                label: "Password",
                                modelValue: r.value,
                                "onUpdate:modelValue": i[0] || (i[0] = (U) => r.value = U),
                                rules: B(x).passwordRules,
                                type: "password",
                                outlined: "",
                                color: o.primaryColor,
                                class: "mb-4"
                              }, null, 8, ["modelValue", "rules", "color"])
                            ]),
                            _: 1
                          }),
                          e(d, { cols: "12" }, {
                            default: t(() => [
                              e(g, {
                                label: "Conferma password",
                                modelValue: a.value,
                                "onUpdate:modelValue": i[1] || (i[1] = (U) => a.value = U),
                                rules: B(x).passwordRules,
                                type: "password",
                                outlined: "",
                                color: o.primaryColor,
                                class: "mb-4"
                              }, null, 8, ["modelValue", "rules", "color"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      e(f, null, {
                        default: t(() => [
                          e(d, {
                            cols: "12",
                            class: "text-center"
                          }, {
                            default: t(() => [
                              e(w, {
                                block: "",
                                variant: "elevated",
                                color: o.secondaryColor,
                                type: "submit",
                                class: "mb-4 custom-btn"
                              }, {
                                default: t(() => i[2] || (i[2] = [
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
                        default: t(() => [
                          e(d, { cols: "12" }, {
                            default: t(() => [
                              e(S, {
                                type: c.value,
                                dense: ""
                              }, {
                                default: t(() => [
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
                      e(f, null, {
                        default: t(() => [
                          e(d, {
                            cols: "12",
                            class: "text-center"
                          }, {
                            default: t(() => [
                              j("div", ne, [
                                e(w, {
                                  text: "",
                                  onClick: R,
                                  color: o.primaryColor,
                                  class: "custom-btn full-width-btn"
                                }, {
                                  default: t(() => i[3] || (i[3] = [
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
}, ce = /* @__PURE__ */ N(re, [["__scopeId", "data-v-81f55f89"]]);
export {
  ie as AuthManager,
  ce as Password
};
