import { ref as _, resolveComponent as n, openBlock as g, createBlock as p, withCtx as o, createVNode as t, createTextVNode as v, toDisplayString as R, withModifiers as j, createCommentVNode as L, createElementVNode as E, unref as B } from "vue";
import { SHA256 as M } from "crypto-js";
import { useRouter as O, useRoute as H } from "vue-router";
const G = (e, d, a, r = "POST") => {
  fetch(e, {
    method: r,
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
}, N = {
  postRequest: G
};
const z = (e, d) => {
  const a = e.__vccOpts || e;
  for (const [r, l] of d)
    a[r] = l;
  return a;
}, J = { class: "d-flex justify-center align-center full-width-btn-group" }, K = {
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
    }
  },
  emits: ["changeStatus"],
  setup(e, { emit: d }) {
    const a = e, r = _(""), l = _(""), c = _(""), b = _(!1), U = O(), $ = d, w = () => {
      r.value && l.value && (c.value = "", N.postRequest(
        `${a.hostname}login`,
        {
          email: r.value,
          password: a.signUp ? M(l.value).toString() : l.value
        },
        function(y) {
          y.status === "ok" ? (localStorage.setItem("strongbox_session_token", y.session_token), U.push(`${a.redirectLink}/${y.user_id}`)) : c.value = y.error;
        }
      ));
    }, u = () => {
      b.value = !b.value;
    }, s = (y) => {
      $("changeStatus", y);
    };
    return (y, i) => {
      const x = n("v-img"), m = n("v-card-title"), f = n("v-text-field"), C = n("v-col"), h = n("v-row"), q = n("v-btn"), T = n("v-alert"), P = n("v-form"), V = n("v-card-text"), k = n("v-card"), D = n("v-container");
      return g(), p(D, { class: "d-flex align-center justify-center fill-height" }, {
        default: o(() => [
          t(k, {
            elevation: 20,
            width: "500",
            class: "pa-5"
          }, {
            default: o(() => [
              t(x, {
                src: e.logo,
                "max-width": "100",
                class: "mx-auto mb-4",
                alt: "Logo"
              }, null, 8, ["src"]),
              t(m, { class: "text-h5 text-center mb-6" }, {
                default: o(() => [
                  v(R(e.title), 1)
                ]),
                _: 1
              }),
              t(V, null, {
                default: o(() => [
                  t(P, {
                    onSubmit: j(w, ["prevent"])
                  }, {
                    default: o(() => [
                      t(h, null, {
                        default: o(() => [
                          t(C, {
                            cols: "12",
                            md: "12"
                          }, {
                            default: o(() => [
                              t(f, {
                                label: "Email",
                                modelValue: r.value,
                                "onUpdate:modelValue": i[0] || (i[0] = (I) => r.value = I),
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
                      t(h, null, {
                        default: o(() => [
                          t(C, {
                            cols: "12",
                            md: "12"
                          }, {
                            default: o(() => [
                              t(f, {
                                type: b.value ? "text" : "password",
                                label: "Password",
                                modelValue: l.value,
                                "onUpdate:modelValue": i[1] || (i[1] = (I) => l.value = I),
                                "prepend-icon": "mdi-lock",
                                "append-inner-icon": b.value ? "mdi-eye-off" : "mdi-eye",
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
                      t(h, null, {
                        default: o(() => [
                          t(C, {
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
                                default: o(() => i[4] || (i[4] = [
                                  v(" Login ")
                                ])),
                                _: 1
                              }, 8, ["color"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      c.value ? (g(), p(h, { key: 0 }, {
                        default: o(() => [
                          t(C, {
                            cols: "12",
                            md: "12"
                          }, {
                            default: o(() => [
                              t(T, {
                                type: "error",
                                dense: ""
                              }, {
                                default: o(() => [
                                  v(R(c.value), 1)
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })) : L("", !0),
                      e.signUp ? (g(), p(h, { key: 1 }, {
                        default: o(() => [
                          t(C, {
                            cols: "12",
                            md: "12",
                            class: "text-center"
                          }, {
                            default: o(() => [
                              E("div", J, [
                                t(q, {
                                  text: "",
                                  onClick: i[2] || (i[2] = (I) => s(2)),
                                  class: "custom-btn full-width-btn",
                                  color: e.primaryColor
                                }, {
                                  default: o(() => i[5] || (i[5] = [
                                    v("Registrati qui")
                                  ])),
                                  _: 1
                                }, 8, ["color"]),
                                i[7] || (i[7] = E("span", { class: "ml-1 mr-1" }, null, -1)),
                                t(q, {
                                  text: "",
                                  onClick: i[3] || (i[3] = (I) => s(3)),
                                  class: "custom-btn full-width-btn",
                                  color: e.primaryColor
                                }, {
                                  default: o(() => i[6] || (i[6] = [
                                    v("Reset password")
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
}, Z = /* @__PURE__ */ z(K, [["__scopeId", "data-v-16255f9e"]]), A = [
  (e) => e ? !0 : "Campo obbligatorio"
], F = A.concat([
  (e) => /.+@.+\..+/.test(e) ? !0 : "E-mail non valida."
]), Q = A.concat([
  (e) => /^(https?:\/\/)?([\w-]+\.)+([a-z]{2,})+(\/[\w-]*)*(\?[a-z0-9-]+=[a-z0-9-%]+(&[a-z0-9-]+=[a-z0-9-%]+)*)?$/i.test(e) ? !0 : "Sito non valido."
]), W = A.concat([
  (e) => /[A-Z]/.test(e) ? !0 : "La password deve contenere almeno una lettera maiscola.",
  (e) => /[a-z]/.test(e) ? !0 : "La password deve contenere almeno una lettera minuscola.",
  (e) => /\d/.test(e) ? !0 : "La password deve contenere almeno un numero.",
  (e) => e.length >= 8 ? !0 : "La password deve contenere almeno 8 caratteri."
]), X = (e, d) => {
  const a = [];
  for (const r of d) {
    const l = r(e);
    l !== !0 && a.push(l);
  }
  return a.length === 0 ? null : a;
}, S = {
  validateInput: X,
  requiredRules: A,
  emailRules: F,
  siteRules: Q,
  passwordRules: W
};
const Y = { class: "d-flex justify-start align-center" }, ee = {
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
    const a = e, r = _(""), l = _(""), c = _(""), b = _("error"), U = d, $ = (u) => {
      U("changeStatus", u);
    }, w = () => {
      !S.validateInput(r.value, S.emailRules) && !S.validateInput(l.value, S.requiredRules) && (c.value = "", N.postRequest(
        `${a.hostname}register-user`,
        {
          name: l.value,
          email: r.value
        },
        function(u) {
          u.status === "ok" ? (b.value = "success", c.value = u.message) : (b.value = "error", c.value = u.error);
        }
      ));
    };
    return (u, s) => {
      const y = n("v-img"), i = n("v-card-title"), x = n("v-text-field"), m = n("v-col"), f = n("v-row"), C = n("v-btn"), h = n("v-alert"), q = n("v-form"), T = n("v-card-text"), P = n("v-card"), V = n("v-container");
      return g(), p(V, { class: "d-flex align-center justify-center fill-height" }, {
        default: o(() => [
          t(P, {
            elevation: 20,
            width: "500",
            class: "pa-5"
          }, {
            default: o(() => [
              t(y, {
                src: e.logo,
                "max-width": "100",
                class: "mx-auto mb-4",
                alt: "Logo"
              }, null, 8, ["src"]),
              t(i, { class: "text-h5 text-center mb-6" }, {
                default: o(() => [
                  v(R(e.title), 1)
                ]),
                _: 1
              }),
              t(T, null, {
                default: o(() => [
                  t(q, {
                    onSubmit: j(w, ["prevent"])
                  }, {
                    default: o(() => [
                      t(f, null, {
                        default: o(() => [
                          t(m, {
                            cols: "12",
                            md: "12"
                          }, {
                            default: o(() => [
                              t(x, {
                                label: "Nome",
                                modelValue: l.value,
                                "onUpdate:modelValue": s[0] || (s[0] = (k) => l.value = k),
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
                      t(f, null, {
                        default: o(() => [
                          t(m, {
                            cols: "12",
                            md: "12"
                          }, {
                            default: o(() => [
                              t(x, {
                                label: "Email",
                                modelValue: r.value,
                                "onUpdate:modelValue": s[1] || (s[1] = (k) => r.value = k),
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
                      t(f, null, {
                        default: o(() => [
                          t(m, {
                            cols: "12",
                            md: "12",
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
                                default: o(() => s[3] || (s[3] = [
                                  v(" Registrati ")
                                ])),
                                _: 1
                              }, 8, ["color"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      c.value ? (g(), p(f, { key: 0 }, {
                        default: o(() => [
                          t(m, {
                            cols: "12",
                            md: "12"
                          }, {
                            default: o(() => [
                              t(h, {
                                type: b.value,
                                dense: ""
                              }, {
                                default: o(() => [
                                  v(R(c.value), 1)
                                ]),
                                _: 1
                              }, 8, ["type"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })) : L("", !0),
                      t(f, null, {
                        default: o(() => [
                          t(m, {
                            cols: "12",
                            md: "12"
                          }, {
                            default: o(() => [
                              E("div", Y, [
                                t(C, {
                                  text: "",
                                  onClick: s[2] || (s[2] = (k) => $(1)),
                                  color: e.primaryColor,
                                  class: "custom-btn full-width-btn"
                                }, {
                                  default: o(() => s[4] || (s[4] = [
                                    v("Torna al login")
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
}, te = /* @__PURE__ */ z(ee, [["__scopeId", "data-v-0f9a674f"]]);
const oe = { class: "d-flex justify-start align-center" }, ne = {
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
    const a = e, r = _(""), l = _(""), c = _("error"), b = d, U = (w) => {
      b("changeStatus", w);
    }, $ = () => {
      S.validateInput(r.value, S.emailRules) || (l.value = "", N.postRequest(
        `${a.hostname}ask-change-password`,
        {
          email: r.value
        },
        function(w) {
          w.status == "ok" ? (c.value = "success", l.value = w.message) : (c.value = "error", l.value = w.error);
        }
      ));
    };
    return (w, u) => {
      const s = n("v-img"), y = n("v-card-title"), i = n("v-text-field"), x = n("v-col"), m = n("v-row"), f = n("v-btn"), C = n("v-alert"), h = n("v-form"), q = n("v-card-text"), T = n("v-card"), P = n("v-container");
      return g(), p(P, { class: "d-flex align-center justify-center fill-height" }, {
        default: o(() => [
          t(T, {
            elevation: 20,
            width: "500",
            class: "pa-5"
          }, {
            default: o(() => [
              t(s, {
                src: e.logo,
                "max-width": "100",
                class: "mx-auto mb-4",
                alt: "Logo"
              }, null, 8, ["src"]),
              t(y, { class: "text-h5 text-center mb-6" }, {
                default: o(() => [
                  v(R(e.title), 1)
                ]),
                _: 1
              }),
              t(q, null, {
                default: o(() => [
                  t(h, {
                    onSubmit: j($, ["prevent"])
                  }, {
                    default: o(() => [
                      t(m, null, {
                        default: o(() => [
                          t(x, {
                            cols: "12",
                            md: "12"
                          }, {
                            default: o(() => [
                              t(i, {
                                label: "Email",
                                modelValue: r.value,
                                "onUpdate:modelValue": u[0] || (u[0] = (V) => r.value = V),
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
                          t(x, {
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
                                default: o(() => u[2] || (u[2] = [
                                  v(" Invia mail ")
                                ])),
                                _: 1
                              }, 8, ["color"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      l.value ? (g(), p(m, { key: 0 }, {
                        default: o(() => [
                          t(x, {
                            cols: "12",
                            md: "12"
                          }, {
                            default: o(() => [
                              t(C, {
                                type: c.value,
                                dense: ""
                              }, {
                                default: o(() => [
                                  v(R(l.value), 1)
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
                          t(x, {
                            cols: "12",
                            md: "12"
                          }, {
                            default: o(() => [
                              E("div", oe, [
                                t(f, {
                                  text: "",
                                  onClick: u[1] || (u[1] = (V) => U(1)),
                                  color: e.primaryColor,
                                  class: "custom-btn full-width-btn"
                                }, {
                                  default: o(() => u[3] || (u[3] = [
                                    v("Torna al login")
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
}, le = /* @__PURE__ */ z(ne, [["__scopeId", "data-v-c75b0514"]]);
const re = { class: "d-flex justify-start align-center" }, ae = {
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
    const d = e, a = _(""), r = _(""), l = _(""), c = _("error"), b = O(), U = H(), $ = () => {
      b.push(d.redirectLink);
    }, w = () => {
      !S.validateInput(a.value, S.passwordRules) && !S.validateInput(r.value, S.passwordRules) && (a.value !== r.value ? (c.value = "error", l.value = "Le password non coincidono") : (l.value = "", N.postRequest(
        `${d.hostname}change-password`,
        {
          pass_token: U.params.token,
          new_password: M(a.value).toString()
        },
        function(u) {
          u.status === "ok" ? (c.value = "success", l.value = u.message) : (c.value = "error", l.value = u.error);
        }
      )));
    };
    return (u, s) => {
      const y = n("v-img"), i = n("v-card-title"), x = n("v-text-field"), m = n("v-col"), f = n("v-row"), C = n("v-btn"), h = n("v-alert"), q = n("v-form"), T = n("v-card-text"), P = n("v-card"), V = n("v-container");
      return g(), p(V, { class: "d-flex align-center justify-center fill-height" }, {
        default: o(() => [
          t(P, {
            elevation: 20,
            width: "500",
            class: "pa-5"
          }, {
            default: o(() => [
              t(y, {
                src: e.logo,
                "max-width": "100",
                class: "mx-auto mb-4",
                alt: "Logo"
              }, null, 8, ["src"]),
              t(i, { class: "text-h5 text-center mb-6" }, {
                default: o(() => [
                  v(R(e.title), 1)
                ]),
                _: 1
              }),
              t(T, null, {
                default: o(() => [
                  t(q, {
                    onSubmit: j(w, ["prevent"])
                  }, {
                    default: o(() => [
                      t(f, null, {
                        default: o(() => [
                          t(m, { cols: "12" }, {
                            default: o(() => [
                              t(x, {
                                label: "Password",
                                modelValue: a.value,
                                "onUpdate:modelValue": s[0] || (s[0] = (k) => a.value = k),
                                rules: B(S).passwordRules,
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
                              t(x, {
                                label: "Conferma password",
                                modelValue: r.value,
                                "onUpdate:modelValue": s[1] || (s[1] = (k) => r.value = k),
                                rules: B(S).passwordRules,
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
                                default: o(() => s[2] || (s[2] = [
                                  v(" Invia ")
                                ])),
                                _: 1
                              }, 8, ["color"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      l.value ? (g(), p(f, { key: 0 }, {
                        default: o(() => [
                          t(m, { cols: "12" }, {
                            default: o(() => [
                              t(h, {
                                type: c.value,
                                dense: ""
                              }, {
                                default: o(() => [
                                  v(R(l.value), 1)
                                ]),
                                _: 1
                              }, 8, ["type"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })) : L("", !0),
                      t(f, null, {
                        default: o(() => [
                          t(m, {
                            cols: "12",
                            class: "text-center"
                          }, {
                            default: o(() => [
                              E("div", re, [
                                t(C, {
                                  text: "",
                                  onClick: $,
                                  color: e.primaryColor,
                                  class: "custom-btn full-width-btn"
                                }, {
                                  default: o(() => s[3] || (s[3] = [
                                    v("Torna al login")
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
}, se = /* @__PURE__ */ z(ae, [["__scopeId", "data-v-2991cc40"]]), de = {
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
    },
    hostname: {
      type: String,
      default: {}.VITE_HOSTNAME_GENERICBACKED
    }
  },
  setup(e) {
    const d = _(1), a = (r) => {
      d.value = r;
    };
    return (r, l) => {
      const c = n("v-container");
      return g(), p(c, { class: "login-container" }, {
        default: o(() => [
          d.value == 1 ? (g(), p(Z, {
            key: 0,
            onChangeStatus: a,
            logo: e.logo,
            title: e.title,
            primaryColor: e.primaryColor,
            secondaryColor: e.secondaryColor,
            redirectLink: e.redirectLink,
            signUp: e.signUp,
            hostname: e.hostname
          }, null, 8, ["logo", "title", "primaryColor", "secondaryColor", "redirectLink", "signUp", "hostname"])) : L("", !0),
          d.value == 2 && e.signUp ? (g(), p(te, {
            key: 1,
            onChangeStatus: a,
            logo: e.logo,
            title: e.signinTitle,
            primaryColor: e.primaryColor,
            secondaryColor: e.secondaryColor,
            redirectLink: e.redirectLink,
            hostname: e.hostname
          }, null, 8, ["logo", "title", "primaryColor", "secondaryColor", "redirectLink", "hostname"])) : L("", !0),
          d.value == 3 && e.signUp ? (g(), p(le, {
            key: 2,
            onChangeStatus: a,
            logo: e.logo,
            title: e.changePasswordTitle,
            primaryColor: e.primaryColor,
            secondaryColor: e.secondaryColor,
            redirectLink: e.redirectLink,
            hostname: e.hostname
          }, null, 8, ["logo", "title", "primaryColor", "secondaryColor", "redirectLink", "hostname"])) : L("", !0),
          d.value == 4 && e.signUp ? (g(), p(se, {
            key: 3,
            onChangeStatus: a,
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
  de as AuthManager,
  se as Password
};
