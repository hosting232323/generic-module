import { ref as f, resolveComponent as n, openBlock as p, createBlock as y, withCtx as o, createVNode as t, createTextVNode as g, toDisplayString as T, withModifiers as E, normalizeStyle as V, createCommentVNode as L, createElementVNode as z, unref as O } from "vue";
import { SHA256 as M } from "crypto-js";
import { useRouter as Z, useRoute as J } from "vue-router";
const F = (e, c, s, a = "POST") => {
  fetch(e, {
    method: a,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(c)
  }).then((l) => {
    if (!l.ok)
      throw new Error(`Errore nella risposta del server: ${l.status} - ${l.statusText}`);
    return l.json();
  }).then((l) => {
    s(l);
  }).catch((l) => {
    console.error("Errore nella richiesta:", l);
  });
}, A = {
  postRequest: F
};
const N = (e, c) => {
  const s = e.__vccOpts || e;
  for (const [a, l] of c)
    s[a] = l;
  return s;
}, G = { class: "d-flex justify-center align-center full-width-btn-group" }, K = {
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
  setup(e, { emit: c }) {
    const s = e, a = f(""), l = f(""), d = f(""), b = f(!1), U = Z(), $ = c, w = () => {
      a.value && l.value && (d.value = "", A.postRequest(
        `${s.hostname}login`,
        {
          email: a.value,
          password: s.signUp ? M(l.value).toString() : l.value
        },
        function(v) {
          if (v.status === "ok") {
            if (localStorage.setItem("token", v.token), v.user_info)
              for (const r of Object.keys(v.user_info))
                localStorage.setItem(`user_${r}`, v.user_info[r]);
            U.push(i(s.redirectLink, v));
          } else
            d.value = v.error;
        }
      ));
    }, i = (v, r) => v.replace(/:([a-zA-Z0-9_]+)/g, (m, _) => _ in r ? r[_] : m), u = () => {
      b.value = !b.value;
    }, P = (v) => {
      $("changeStatus", v);
    };
    return (v, r) => {
      const m = n("v-img"), _ = n("v-card-title"), k = n("v-text-field"), S = n("v-col"), C = n("v-row"), q = n("v-btn"), I = n("v-alert"), R = n("v-form"), h = n("v-card-text"), D = n("v-card"), H = n("v-container");
      return p(), y(H, { class: "d-flex align-center justify-center fill-height" }, {
        default: o(() => [
          t(D, {
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
              t(_, { class: "text-h5 text-center mb-6" }, {
                default: o(() => [
                  g(T(e.title), 1)
                ]),
                _: 1
              }),
              t(h, null, {
                default: o(() => [
                  t(R, {
                    onSubmit: E(w, ["prevent"])
                  }, {
                    default: o(() => [
                      t(C, null, {
                        default: o(() => [
                          t(S, {
                            cols: "12",
                            md: "12"
                          }, {
                            default: o(() => [
                              t(k, {
                                label: "Email",
                                modelValue: a.value,
                                "onUpdate:modelValue": r[0] || (r[0] = (j) => a.value = j),
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
                      t(C, null, {
                        default: o(() => [
                          t(S, {
                            cols: "12",
                            md: "12"
                          }, {
                            default: o(() => [
                              t(k, {
                                type: b.value ? "text" : "password",
                                label: "Password",
                                modelValue: l.value,
                                "onUpdate:modelValue": r[1] || (r[1] = (j) => l.value = j),
                                "prepend-icon": "mdi-lock",
                                "append-inner-icon": b.value ? "mdi-eye-off" : "mdi-eye",
                                "onClick:appendInner": u,
                                outlined: "",
                                class: "mb-4"
                              }, null, 8, ["type", "modelValue", "append-inner-icon"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      t(C, null, {
                        default: o(() => [
                          t(S, {
                            cols: "12",
                            md: "12",
                            class: "text-center"
                          }, {
                            default: o(() => [
                              t(q, {
                                class: "full-width-btn mb-1 custom-btn",
                                variant: "elevated",
                                style: V({ "background-color": e.secondaryColor }),
                                type: "submit"
                              }, {
                                default: o(() => r[4] || (r[4] = [
                                  g(" Login ")
                                ])),
                                _: 1
                              }, 8, ["style"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      d.value ? (p(), y(C, { key: 0 }, {
                        default: o(() => [
                          t(S, {
                            cols: "12",
                            md: "12"
                          }, {
                            default: o(() => [
                              t(I, {
                                type: "error",
                                dense: ""
                              }, {
                                default: o(() => [
                                  g(T(d.value), 1)
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })) : L("", !0),
                      e.signUp ? (p(), y(C, { key: 1 }, {
                        default: o(() => [
                          t(S, {
                            cols: "12",
                            md: "12",
                            class: "text-center"
                          }, {
                            default: o(() => [
                              z("div", G, [
                                t(q, {
                                  text: "",
                                  onClick: r[2] || (r[2] = (j) => P(2)),
                                  class: "custom-btn full-width-btn",
                                  style: V({ "background-color": e.primaryColor })
                                }, {
                                  default: o(() => r[5] || (r[5] = [
                                    g(" Registrati qui ")
                                  ])),
                                  _: 1
                                }, 8, ["style"]),
                                r[7] || (r[7] = z("span", { class: "ml-1 mr-1" }, null, -1)),
                                t(q, {
                                  text: "",
                                  onClick: r[3] || (r[3] = (j) => P(3)),
                                  class: "custom-btn full-width-btn",
                                  style: V({ "background-color": e.primaryColor })
                                }, {
                                  default: o(() => r[6] || (r[6] = [
                                    g(" Reset password ")
                                  ])),
                                  _: 1
                                }, 8, ["style"])
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
}, Q = /* @__PURE__ */ N(K, [["__scopeId", "data-v-10ac39ff"]]), B = [
  (e) => e ? !0 : "Campo obbligatorio"
], W = B.concat([
  (e) => /.+@.+\..+/.test(e) ? !0 : "E-mail non valida."
]), X = B.concat([
  (e) => /^(https?:\/\/)?([\w-]+\.)+([a-z]{2,})+(\/[\w-]*)*(\?[a-z0-9-]+=[a-z0-9-%]+(&[a-z0-9-]+=[a-z0-9-%]+)*)?$/i.test(e) ? !0 : "Sito non valido."
]), Y = B.concat([
  (e) => /[A-Z]/.test(e) ? !0 : "La password deve contenere almeno una lettera maiuscola.",
  (e) => /[a-z]/.test(e) ? !0 : "La password deve contenere almeno una lettera minuscola.",
  (e) => /\d/.test(e) ? !0 : "La password deve contenere almeno un numero.",
  (e) => e.length >= 8 ? !0 : "La password deve contenere almeno 8 caratteri."
]), ee = (e, c) => {
  const s = [];
  for (const a of c) {
    const l = a(e);
    l !== !0 && s.push(l);
  }
  return s.length === 0 ? null : s;
}, x = {
  validateInput: ee,
  requiredRules: B,
  emailRules: W,
  siteRules: X,
  passwordRules: Y
};
const te = { class: "d-flex justify-start align-center" }, oe = {
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
  setup(e, { emit: c }) {
    const s = e, a = f(""), l = f(""), d = f(""), b = f("error"), U = c, $ = (i) => {
      U("changeStatus", i);
    }, w = () => {
      !x.validateInput(a.value, x.emailRules) && !x.validateInput(l.value, x.requiredRules) && (d.value = "", A.postRequest(
        `${s.hostname}register-user`,
        {
          name: l.value,
          email: a.value
        },
        function(i) {
          i.status === "ok" ? (b.value = "success", d.value = i.message) : (b.value = "error", d.value = i.error);
        }
      ));
    };
    return (i, u) => {
      const P = n("v-img"), v = n("v-card-title"), r = n("v-text-field"), m = n("v-col"), _ = n("v-row"), k = n("v-btn"), S = n("v-alert"), C = n("v-form"), q = n("v-card-text"), I = n("v-card"), R = n("v-container");
      return p(), y(R, { class: "d-flex align-center justify-center fill-height" }, {
        default: o(() => [
          t(I, {
            elevation: 20,
            width: "500",
            class: "pa-5"
          }, {
            default: o(() => [
              t(P, {
                src: e.logo,
                "max-width": "100",
                class: "mx-auto mb-4",
                alt: "Logo"
              }, null, 8, ["src"]),
              t(v, { class: "text-h5 text-center mb-6" }, {
                default: o(() => [
                  g(T(e.title), 1)
                ]),
                _: 1
              }),
              t(q, null, {
                default: o(() => [
                  t(C, {
                    onSubmit: E(w, ["prevent"])
                  }, {
                    default: o(() => [
                      t(_, null, {
                        default: o(() => [
                          t(m, {
                            cols: "12",
                            md: "12"
                          }, {
                            default: o(() => [
                              t(r, {
                                label: "Nome",
                                modelValue: l.value,
                                "onUpdate:modelValue": u[0] || (u[0] = (h) => l.value = h),
                                outlined: "",
                                class: "mb-4"
                              }, null, 8, ["modelValue"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      t(_, null, {
                        default: o(() => [
                          t(m, {
                            cols: "12",
                            md: "12"
                          }, {
                            default: o(() => [
                              t(r, {
                                label: "Email",
                                modelValue: a.value,
                                "onUpdate:modelValue": u[1] || (u[1] = (h) => a.value = h),
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
                      t(_, null, {
                        default: o(() => [
                          t(m, {
                            cols: "12",
                            md: "12",
                            class: "text-center"
                          }, {
                            default: o(() => [
                              t(k, {
                                block: "",
                                variant: "elevated",
                                style: V({ "background-color": e.secondaryColor }),
                                type: "submit",
                                class: "mb-4 custom-btn"
                              }, {
                                default: o(() => u[3] || (u[3] = [
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
                      d.value ? (p(), y(_, { key: 0 }, {
                        default: o(() => [
                          t(m, {
                            cols: "12",
                            md: "12"
                          }, {
                            default: o(() => [
                              t(S, {
                                type: b.value,
                                dense: ""
                              }, {
                                default: o(() => [
                                  g(T(d.value), 1)
                                ]),
                                _: 1
                              }, 8, ["type"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })) : L("", !0),
                      t(_, null, {
                        default: o(() => [
                          t(m, {
                            cols: "12",
                            md: "12"
                          }, {
                            default: o(() => [
                              z("div", te, [
                                t(k, {
                                  text: "",
                                  onClick: u[2] || (u[2] = (h) => $(1)),
                                  style: V({ "background-color": e.primaryColor }),
                                  class: "custom-btn full-width-btn"
                                }, {
                                  default: o(() => u[4] || (u[4] = [
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
}, ne = /* @__PURE__ */ N(oe, [["__scopeId", "data-v-c31c9e85"]]);
const le = { class: "d-flex justify-start align-center" }, re = {
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
  setup(e, { emit: c }) {
    const s = e, a = f(""), l = f(""), d = f("error"), b = c, U = (w) => {
      b("changeStatus", w);
    }, $ = () => {
      x.validateInput(a.value, x.emailRules) || (l.value = "", A.postRequest(
        `${s.hostname}ask-change-password`,
        {
          email: a.value
        },
        function(w) {
          w.status == "ok" ? (d.value = "success", l.value = w.message) : (d.value = "error", l.value = w.error);
        }
      ));
    };
    return (w, i) => {
      const u = n("v-img"), P = n("v-card-title"), v = n("v-text-field"), r = n("v-col"), m = n("v-row"), _ = n("v-btn"), k = n("v-alert"), S = n("v-form"), C = n("v-card-text"), q = n("v-card"), I = n("v-container");
      return p(), y(I, { class: "d-flex align-center justify-center fill-height" }, {
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
              t(P, { class: "text-h5 text-center mb-6" }, {
                default: o(() => [
                  g(T(e.title), 1)
                ]),
                _: 1
              }),
              t(C, null, {
                default: o(() => [
                  t(S, {
                    onSubmit: E($, ["prevent"])
                  }, {
                    default: o(() => [
                      t(m, null, {
                        default: o(() => [
                          t(r, {
                            cols: "12",
                            md: "12"
                          }, {
                            default: o(() => [
                              t(v, {
                                label: "Email",
                                modelValue: a.value,
                                "onUpdate:modelValue": i[0] || (i[0] = (R) => a.value = R),
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
                          t(r, {
                            cols: "12",
                            md: "12",
                            class: "text-center"
                          }, {
                            default: o(() => [
                              t(_, {
                                block: "",
                                variant: "elevated",
                                style: V({ "background-color": e.secondaryColor }),
                                type: "submit",
                                class: "mb-4 custom-btn"
                              }, {
                                default: o(() => i[2] || (i[2] = [
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
                        default: o(() => [
                          t(r, {
                            cols: "12",
                            md: "12"
                          }, {
                            default: o(() => [
                              t(k, {
                                type: d.value,
                                dense: ""
                              }, {
                                default: o(() => [
                                  g(T(l.value), 1)
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
                              z("div", le, [
                                t(_, {
                                  text: "",
                                  onClick: i[1] || (i[1] = (R) => U(1)),
                                  style: V({ "background-color": e.primaryColor }),
                                  class: "custom-btn full-width-btn"
                                }, {
                                  default: o(() => i[3] || (i[3] = [
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
}, ae = /* @__PURE__ */ N(re, [["__scopeId", "data-v-d965af57"]]);
const se = { class: "d-flex justify-start align-center" }, ue = {
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
    const c = e, s = f(""), a = f(""), l = f(""), d = f("error"), b = Z(), U = J(), $ = () => {
      b.push(c.redirectLink);
    }, w = () => {
      !x.validateInput(s.value, x.passwordRules) && !x.validateInput(a.value, x.passwordRules) && (s.value !== a.value ? (d.value = "error", l.value = "Le password non coincidono") : (l.value = "", A.postRequest(
        `${c.hostname}change-password`,
        {
          pass_token: U.params.token,
          new_password: M(s.value).toString()
        },
        function(i) {
          i.status === "ok" ? (d.value = "success", l.value = i.message) : (d.value = "error", l.value = i.error);
        }
      )));
    };
    return (i, u) => {
      const P = n("v-img"), v = n("v-card-title"), r = n("v-text-field"), m = n("v-col"), _ = n("v-row"), k = n("v-btn"), S = n("v-alert"), C = n("v-form"), q = n("v-card-text"), I = n("v-card"), R = n("v-container");
      return p(), y(R, { class: "d-flex align-center justify-center fill-height" }, {
        default: o(() => [
          t(I, {
            elevation: 20,
            width: "500",
            class: "pa-5"
          }, {
            default: o(() => [
              t(P, {
                src: e.logo,
                "max-width": "100",
                class: "mx-auto mb-4",
                alt: "Logo"
              }, null, 8, ["src"]),
              t(v, { class: "text-h5 text-center mb-6" }, {
                default: o(() => [
                  g(T(e.title), 1)
                ]),
                _: 1
              }),
              t(q, null, {
                default: o(() => [
                  t(C, {
                    onSubmit: E(w, ["prevent"])
                  }, {
                    default: o(() => [
                      t(_, null, {
                        default: o(() => [
                          t(m, { cols: "12" }, {
                            default: o(() => [
                              t(r, {
                                label: "Password",
                                modelValue: s.value,
                                "onUpdate:modelValue": u[0] || (u[0] = (h) => s.value = h),
                                rules: O(x).passwordRules,
                                type: "password",
                                outlined: "",
                                class: "mb-4"
                              }, null, 8, ["modelValue", "rules"])
                            ]),
                            _: 1
                          }),
                          t(m, { cols: "12" }, {
                            default: o(() => [
                              t(r, {
                                label: "Conferma password",
                                modelValue: a.value,
                                "onUpdate:modelValue": u[1] || (u[1] = (h) => a.value = h),
                                rules: O(x).passwordRules,
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
                      t(_, null, {
                        default: o(() => [
                          t(m, {
                            cols: "12",
                            class: "text-center"
                          }, {
                            default: o(() => [
                              t(k, {
                                block: "",
                                variant: "elevated",
                                style: V({ "background-color": e.secondaryColor }),
                                type: "submit",
                                class: "mb-4 custom-btn"
                              }, {
                                default: o(() => u[2] || (u[2] = [
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
                      l.value ? (p(), y(_, { key: 0 }, {
                        default: o(() => [
                          t(m, { cols: "12" }, {
                            default: o(() => [
                              t(S, {
                                type: d.value,
                                dense: ""
                              }, {
                                default: o(() => [
                                  g(T(l.value), 1)
                                ]),
                                _: 1
                              }, 8, ["type"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })) : L("", !0),
                      t(_, null, {
                        default: o(() => [
                          t(m, {
                            cols: "12",
                            class: "text-center"
                          }, {
                            default: o(() => [
                              z("div", se, [
                                t(k, {
                                  text: "",
                                  onClick: $,
                                  style: V({ "background-color": e.primaryColor }),
                                  class: "custom-btn full-width-btn"
                                }, {
                                  default: o(() => u[3] || (u[3] = [
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
}, ie = /* @__PURE__ */ N(ue, [["__scopeId", "data-v-9b94dbdc"]]), ve = {
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
    const c = f(1), s = (a) => {
      c.value = a;
    };
    return (a, l) => {
      const d = n("v-container");
      return p(), y(d, { class: "login-container" }, {
        default: o(() => [
          c.value == 1 ? (p(), y(Q, {
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
          c.value == 2 && e.signUp ? (p(), y(ne, {
            key: 1,
            onChangeStatus: s,
            logo: e.logo,
            title: e.signinTitle,
            primaryColor: e.primaryColor,
            secondaryColor: e.secondaryColor,
            redirectLink: e.redirectLink,
            hostname: e.hostname
          }, null, 8, ["logo", "title", "primaryColor", "secondaryColor", "redirectLink", "hostname"])) : L("", !0),
          c.value == 3 && e.signUp ? (p(), y(ae, {
            key: 2,
            onChangeStatus: s,
            logo: e.logo,
            title: e.changePasswordTitle,
            primaryColor: e.primaryColor,
            secondaryColor: e.secondaryColor,
            redirectLink: e.redirectLink,
            hostname: e.hostname
          }, null, 8, ["logo", "title", "primaryColor", "secondaryColor", "redirectLink", "hostname"])) : L("", !0),
          c.value == 4 && e.signUp ? (p(), y(ie, {
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
}, _e = {
  __name: "UpArrow",
  setup(e) {
    return (c, s) => {
      const a = n("v-btn");
      return p(), y(a, { text: "Ciao" });
    };
  }
};
export {
  ve as AuthManager,
  ie as Password,
  _e as UpArrow
};
