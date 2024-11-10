import { ref as f, resolveComponent as l, openBlock as y, createBlock as b, withCtx as o, createVNode as t, createTextVNode as _, toDisplayString as V, withModifiers as j, createCommentVNode as h, createElementVNode as I, unref as O } from "vue";
import { SHA256 as B } from "crypto-js";
import { useRouter as M, useRoute as D } from "vue-router";
const H = {}.VITE_HOSTNAME, G = (e, u, r, a = "POST") => {
  fetch(`${H}${e}`, {
    method: a,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(u)
  }).then((n) => {
    if (!n.ok)
      throw new Error(`Errore nella risposta del server: ${n.status} - ${n.statusText}`);
    return n.json();
  }).then((n) => {
    r(n);
  }).catch((n) => {
    console.error("Errore nella richiesta:", n);
  });
}, J = (e, u, r, a = "GET") => {
  const n = new URL(`${H}${e}`);
  Object.keys(u).forEach((s) => n.searchParams.append(s, u[s])), fetch(n, {
    method: a,
    headers: {
      "Content-Type": "application/json"
    }
  }).then((s) => {
    if (!s.ok)
      throw new Error(`Errore nella risposta del server: ${s.status} - ${s.statusText}`);
    return s.json();
  }).then((s) => {
    r(s);
  }).catch((s) => {
    console.error("Errore nella richiesta:", s);
  });
}, N = {
  postRequest: G,
  getRequest: J
};
const z = (e, u) => {
  const r = e.__vccOpts || e;
  for (const [a, n] of u)
    r[a] = n;
  return r;
}, Z = { class: "d-flex justify-center align-center full-width-btn-group" }, F = {
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
  setup(e, { emit: u }) {
    const r = f(""), a = f(""), n = f(""), s = f(!1), R = M(), T = u, w = () => {
      r.value && a.value && (n.value = "", N.postRequest(
        "login",
        {
          email: r.value,
          password: B(a.value).toString()
        },
        function(d) {
          d.status === "ok" ? (localStorage.setItem("strongbox_session_token", d.session_token), R.push(`${redirectLink}/${d.user_id}`)) : n.value = d.error;
        }
      ));
    }, m = () => {
      s.value = !s.value;
    }, c = (d) => {
      T("changeStatus", d);
    };
    return (d, i) => {
      const S = l("v-img"), g = l("v-card-title"), v = l("v-text-field"), p = l("v-col"), C = l("v-row"), k = l("v-btn"), $ = l("v-alert"), P = l("v-form"), q = l("v-card-text"), L = l("v-card"), U = l("v-container");
      return y(), b(U, { class: "d-flex align-center justify-center fill-height" }, {
        default: o(() => [
          t(L, {
            elevation: 20,
            width: "500",
            class: "pa-5"
          }, {
            default: o(() => [
              t(S, {
                src: e.logo,
                "max-width": "100",
                class: "mx-auto mb-4",
                alt: "Logo"
              }, null, 8, ["src"]),
              t(g, { class: "text-h5 text-center mb-6" }, {
                default: o(() => [
                  _(V(e.title), 1)
                ]),
                _: 1
              }),
              t(q, null, {
                default: o(() => [
                  t(P, {
                    onSubmit: j(w, ["prevent"])
                  }, {
                    default: o(() => [
                      t(C, null, {
                        default: o(() => [
                          t(p, {
                            cols: "12",
                            md: "12"
                          }, {
                            default: o(() => [
                              t(v, {
                                label: "Email",
                                modelValue: r.value,
                                "onUpdate:modelValue": i[0] || (i[0] = (E) => r.value = E),
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
                          t(p, {
                            cols: "12",
                            md: "12"
                          }, {
                            default: o(() => [
                              t(v, {
                                type: s.value ? "text" : "password",
                                label: "Password",
                                modelValue: a.value,
                                "onUpdate:modelValue": i[1] || (i[1] = (E) => a.value = E),
                                "prepend-icon": "mdi-lock",
                                "append-inner-icon": s.value ? "mdi-eye-off" : "mdi-eye",
                                "onClick:appendInner": m,
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
                          t(p, {
                            cols: "12",
                            md: "12",
                            class: "text-center"
                          }, {
                            default: o(() => [
                              t(k, {
                                class: "full-width-btn mb-1 custom-btn",
                                variant: "elevated",
                                color: e.secondaryColor,
                                type: "submit"
                              }, {
                                default: o(() => i[4] || (i[4] = [
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
                          t(p, {
                            cols: "12",
                            md: "12"
                          }, {
                            default: o(() => [
                              t($, {
                                type: "error",
                                dense: ""
                              }, {
                                default: o(() => [
                                  _(V(n.value), 1)
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })) : h("", !0),
                      e.signUp ? (y(), b(C, { key: 1 }, {
                        default: o(() => [
                          t(p, {
                            cols: "12",
                            md: "12",
                            class: "text-center"
                          }, {
                            default: o(() => [
                              I("div", Z, [
                                t(k, {
                                  text: "",
                                  onClick: i[2] || (i[2] = (E) => c(2)),
                                  class: "custom-btn full-width-btn",
                                  color: e.primaryColor
                                }, {
                                  default: o(() => i[5] || (i[5] = [
                                    _("Registrati qui")
                                  ])),
                                  _: 1
                                }, 8, ["color"]),
                                i[7] || (i[7] = I("span", { class: "ml-1 mr-1" }, null, -1)),
                                t(k, {
                                  text: "",
                                  onClick: i[3] || (i[3] = (E) => c(3)),
                                  class: "custom-btn full-width-btn",
                                  color: e.primaryColor
                                }, {
                                  default: o(() => i[6] || (i[6] = [
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
                      })) : h("", !0)
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
}, K = /* @__PURE__ */ z(F, [["__scopeId", "data-v-b1376249"]]), A = [
  (e) => e ? !0 : "Campo obbligatorio"
], Q = A.concat([
  (e) => /.+@.+\..+/.test(e) ? !0 : "E-mail non valida."
]), W = A.concat([
  (e) => /^(https?:\/\/)?([\w-]+\.)+([a-z]{2,})+(\/[\w-]*)*(\?[a-z0-9-]+=[a-z0-9-%]+(&[a-z0-9-]+=[a-z0-9-%]+)*)?$/i.test(e) ? !0 : "Sito non valido."
]), X = A.concat([
  (e) => /[A-Z]/.test(e) ? !0 : "La password deve contenere almeno una lettera maiscola.",
  (e) => /[a-z]/.test(e) ? !0 : "La password deve contenere almeno una lettera minuscola.",
  (e) => /\d/.test(e) ? !0 : "La password deve contenere almeno un numero.",
  (e) => e.length >= 8 ? !0 : "La password deve contenere almeno 8 caratteri."
]), Y = (e, u) => {
  const r = [];
  for (const a of u) {
    const n = a(e);
    n !== !0 && r.push(n);
  }
  return r.length === 0 ? null : r;
}, x = {
  validateInput: Y,
  requiredRules: A,
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
    }
  },
  emits: ["changeStatus"],
  setup(e, { emit: u }) {
    const r = f(""), a = f(""), n = f(""), s = f("error"), R = u, T = (m) => {
      R("changeStatus", m);
    }, w = () => {
      !x.validateInput(r.value, x.emailRules) && !x.validateInput(a.value, x.requiredRules) && (n.value = "", N.postRequest(
        "register-user",
        {
          name: a.value,
          email: r.value
        },
        function(m) {
          m.status === "ok" ? (s.value = "success", n.value = m.message) : (s.value = "error", n.value = m.error);
        }
      ));
    };
    return (m, c) => {
      const d = l("v-img"), i = l("v-card-title"), S = l("v-text-field"), g = l("v-col"), v = l("v-row"), p = l("v-btn"), C = l("v-alert"), k = l("v-form"), $ = l("v-card-text"), P = l("v-card"), q = l("v-container");
      return y(), b(q, { class: "d-flex align-center justify-center fill-height" }, {
        default: o(() => [
          t(P, {
            elevation: 20,
            width: "500",
            class: "pa-5"
          }, {
            default: o(() => [
              t(d, {
                src: e.logo,
                "max-width": "100",
                class: "mx-auto mb-4",
                alt: "Logo"
              }, null, 8, ["src"]),
              t(i, { class: "text-h5 text-center mb-6" }, {
                default: o(() => [
                  _(V(e.title), 1)
                ]),
                _: 1
              }),
              t($, null, {
                default: o(() => [
                  t(k, {
                    onSubmit: j(w, ["prevent"])
                  }, {
                    default: o(() => [
                      t(v, null, {
                        default: o(() => [
                          t(g, {
                            cols: "12",
                            md: "12"
                          }, {
                            default: o(() => [
                              t(S, {
                                label: "Nome",
                                modelValue: a.value,
                                "onUpdate:modelValue": c[0] || (c[0] = (L) => a.value = L),
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
                          t(g, {
                            cols: "12",
                            md: "12"
                          }, {
                            default: o(() => [
                              t(S, {
                                label: "Email",
                                modelValue: r.value,
                                "onUpdate:modelValue": c[1] || (c[1] = (L) => r.value = L),
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
                          t(g, {
                            cols: "12",
                            md: "12",
                            class: "text-center"
                          }, {
                            default: o(() => [
                              t(p, {
                                block: "",
                                variant: "elevated",
                                color: e.secondaryColor,
                                type: "submit",
                                class: "mb-4 custom-btn"
                              }, {
                                default: o(() => c[3] || (c[3] = [
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
                      n.value ? (y(), b(v, { key: 0 }, {
                        default: o(() => [
                          t(g, {
                            cols: "12",
                            md: "12"
                          }, {
                            default: o(() => [
                              t(C, {
                                type: s.value,
                                dense: ""
                              }, {
                                default: o(() => [
                                  _(V(n.value), 1)
                                ]),
                                _: 1
                              }, 8, ["type"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })) : h("", !0),
                      t(v, null, {
                        default: o(() => [
                          t(g, {
                            cols: "12",
                            md: "12"
                          }, {
                            default: o(() => [
                              I("div", ee, [
                                t(p, {
                                  text: "",
                                  onClick: c[2] || (c[2] = (L) => T(1)),
                                  color: e.primaryColor,
                                  class: "custom-btn full-width-btn"
                                }, {
                                  default: o(() => c[4] || (c[4] = [
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
}, oe = /* @__PURE__ */ z(te, [["__scopeId", "data-v-fb12e742"]]);
const le = { class: "d-flex justify-start align-center" }, ne = {
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
  setup(e, { emit: u }) {
    const r = f(""), a = f(""), n = f("error"), s = u, R = (w) => {
      s("changeStatus", w);
    }, T = () => {
      x.validateInput(r.value, x.emailRules) || (a.value = "", N.postRequest(
        "ask-change-password",
        {
          email: r.value
        },
        function(w) {
          w.status == "ok" ? (n.value = "success", a.value = w.message) : (n.value = "error", a.value = w.error);
        }
      ));
    };
    return (w, m) => {
      const c = l("v-img"), d = l("v-card-title"), i = l("v-text-field"), S = l("v-col"), g = l("v-row"), v = l("v-btn"), p = l("v-alert"), C = l("v-form"), k = l("v-card-text"), $ = l("v-card"), P = l("v-container");
      return y(), b(P, { class: "d-flex align-center justify-center fill-height" }, {
        default: o(() => [
          t($, {
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
              t(d, { class: "text-h5 text-center mb-6" }, {
                default: o(() => [
                  _(V(e.title), 1)
                ]),
                _: 1
              }),
              t(k, null, {
                default: o(() => [
                  t(C, {
                    onSubmit: j(T, ["prevent"])
                  }, {
                    default: o(() => [
                      t(g, null, {
                        default: o(() => [
                          t(S, {
                            cols: "12",
                            md: "12"
                          }, {
                            default: o(() => [
                              t(i, {
                                label: "Email",
                                modelValue: r.value,
                                "onUpdate:modelValue": m[0] || (m[0] = (q) => r.value = q),
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
                      t(g, null, {
                        default: o(() => [
                          t(S, {
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
                                default: o(() => m[2] || (m[2] = [
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
                      a.value ? (y(), b(g, { key: 0 }, {
                        default: o(() => [
                          t(S, {
                            cols: "12",
                            md: "12"
                          }, {
                            default: o(() => [
                              t(p, {
                                type: n.value,
                                dense: ""
                              }, {
                                default: o(() => [
                                  _(V(a.value), 1)
                                ]),
                                _: 1
                              }, 8, ["type"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })) : h("", !0),
                      t(g, null, {
                        default: o(() => [
                          t(S, {
                            cols: "12",
                            md: "12"
                          }, {
                            default: o(() => [
                              I("div", le, [
                                t(v, {
                                  text: "",
                                  onClick: m[1] || (m[1] = (q) => R(1)),
                                  color: e.primaryColor,
                                  class: "custom-btn full-width-btn"
                                }, {
                                  default: o(() => m[3] || (m[3] = [
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
}, re = /* @__PURE__ */ z(ne, [["__scopeId", "data-v-9c862ea9"]]);
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
    }
  },
  setup(e) {
    const u = e, r = f(""), a = f(""), n = f(""), s = f("error"), R = M(), T = D(), w = () => {
      R.push(u.redirectLink);
    }, m = () => {
      !x.validateInput(r.value, x.passwordRules) && !x.validateInput(a.value, x.passwordRules) && (r.value !== a.value ? (s.value = "error", n.value = "Le password non coincidono") : (n.value = "", N.postRequest(
        "change-password",
        {
          pass_token: T.params.token,
          new_password: B(r.value).toString()
        },
        function(c) {
          c.status === "ok" ? (s.value = "success", n.value = c.message) : (s.value = "error", n.value = c.error);
        }
      )));
    };
    return (c, d) => {
      const i = l("v-img"), S = l("v-card-title"), g = l("v-text-field"), v = l("v-col"), p = l("v-row"), C = l("v-btn"), k = l("v-alert"), $ = l("v-form"), P = l("v-card-text"), q = l("v-card"), L = l("v-container");
      return y(), b(L, { class: "d-flex align-center justify-center fill-height" }, {
        default: o(() => [
          t(q, {
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
              t(S, { class: "text-h5 text-center mb-6" }, {
                default: o(() => [
                  _(V(e.title), 1)
                ]),
                _: 1
              }),
              t(P, null, {
                default: o(() => [
                  t($, {
                    onSubmit: j(m, ["prevent"])
                  }, {
                    default: o(() => [
                      t(p, null, {
                        default: o(() => [
                          t(v, { cols: "12" }, {
                            default: o(() => [
                              t(g, {
                                label: "Password",
                                modelValue: r.value,
                                "onUpdate:modelValue": d[0] || (d[0] = (U) => r.value = U),
                                rules: O(x).passwordRules,
                                type: "password",
                                outlined: "",
                                color: e.primaryColor,
                                class: "mb-4"
                              }, null, 8, ["modelValue", "rules", "color"])
                            ]),
                            _: 1
                          }),
                          t(v, { cols: "12" }, {
                            default: o(() => [
                              t(g, {
                                label: "Conferma password",
                                modelValue: a.value,
                                "onUpdate:modelValue": d[1] || (d[1] = (U) => a.value = U),
                                rules: O(x).passwordRules,
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
                      t(p, null, {
                        default: o(() => [
                          t(v, {
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
                                default: o(() => d[2] || (d[2] = [
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
                      n.value ? (y(), b(p, { key: 0 }, {
                        default: o(() => [
                          t(v, { cols: "12" }, {
                            default: o(() => [
                              t(k, {
                                type: s.value,
                                dense: ""
                              }, {
                                default: o(() => [
                                  _(V(n.value), 1)
                                ]),
                                _: 1
                              }, 8, ["type"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })) : h("", !0),
                      t(p, null, {
                        default: o(() => [
                          t(v, {
                            cols: "12",
                            class: "text-center"
                          }, {
                            default: o(() => [
                              I("div", ae, [
                                t(C, {
                                  text: "",
                                  onClick: w,
                                  color: e.primaryColor,
                                  class: "custom-btn full-width-btn"
                                }, {
                                  default: o(() => d[3] || (d[3] = [
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
}, ue = /* @__PURE__ */ z(se, [["__scopeId", "data-v-81f55f89"]]), me = {
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
  setup(e) {
    const u = f(1), r = (a) => {
      u.value = a;
    };
    return (a, n) => {
      const s = l("v-container");
      return y(), b(s, { class: "login-container" }, {
        default: o(() => [
          u.value == 1 ? (y(), b(K, {
            key: 0,
            onChangeStatus: r,
            logo: e.logo,
            title: e.title,
            primaryColor: e.primaryColor,
            secondaryColor: e.secondaryColor,
            redirectLink: e.redirectLink,
            signUp: e.signUp
          }, null, 8, ["logo", "title", "primaryColor", "secondaryColor", "redirectLink", "signUp"])) : h("", !0),
          u.value == 2 && e.signUp ? (y(), b(oe, {
            key: 1,
            onChangeStatus: r,
            logo: e.logo,
            title: e.signinTitle,
            primaryColor: e.primaryColor,
            secondaryColor: e.secondaryColor,
            redirectLink: e.redirectLink
          }, null, 8, ["logo", "title", "primaryColor", "secondaryColor", "redirectLink"])) : h("", !0),
          u.value == 3 && e.signUp ? (y(), b(re, {
            key: 2,
            onChangeStatus: r,
            logo: e.logo,
            title: e.changePasswordTitle,
            primaryColor: e.primaryColor,
            secondaryColor: e.secondaryColor,
            redirectLink: e.redirectLink
          }, null, 8, ["logo", "title", "primaryColor", "secondaryColor", "redirectLink"])) : h("", !0),
          u.value == 4 && e.signUp ? (y(), b(ue, {
            key: 3,
            onChangeStatus: r,
            logo: e.logo,
            title: e.newPasswordTitle,
            primaryColor: e.primaryColor,
            secondaryColor: e.secondaryColor,
            redirectLink: e.redirectLink
          }, null, 8, ["logo", "title", "primaryColor", "secondaryColor", "redirectLink"])) : h("", !0)
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
