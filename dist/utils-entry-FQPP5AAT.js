const _ = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  pdf: "application/pdf",
  xls: "application/vnd.ms-excel",
  xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  mp4: "video/mp4"
}, G = ["jpg", "jpeg", "png", "webp"], I = ["pdf"], J = ["xls", "xlsx"], N = ["mp4"], C = [
  ...G,
  ...I,
  ...J,
  ...N
], z = (t) => {
  const n = t && t.name || "", a = n.lastIndexOf(".");
  return a < 0 ? "" : n.slice(a + 1).toLowerCase();
}, B = (t = C) => t.map((n) => `.${n}`).join(","), V = (t, n = C) => {
  const a = Array.from(t || []).filter((i) => {
    const p = z(i);
    return n.includes(p) ? !1 : !!p || !n.some(($) => _[$] === i.type);
  });
  return a.length == 0 ? null : `Estensione non supportata: ${[...new Set(a.map((i) => {
    const p = z(i);
    return p ? `.${p}` : i.name;
  }))].join(", ")}.
Estensioni ammesse: ${B(n)}`;
}, A = {
  fileTypes: _,
  defaultExtensions: C,
  imageExtensions: G,
  pdfExtensions: I,
  spreadsheetExtensions: J,
  videoExtensions: N,
  buildAccept: B,
  validateFiles: V
}, X = (t = {}) => {
  const {
    hostname: n,
    authHeader: a = "Token",
    getToken: f = () => localStorage.getItem("token"),
    setToken: i = () => {
    },
    router: p = void 0,
    allowedExtensions: $ = A.defaultExtensions,
    refreshEndpoint: R = void 0,
    logoutEndpoint: F = void 0,
    credentials: y = R ? "include" : "same-origin",
    onError: H = (e) => alert(e),
    // Quando la sessione cade, il client revoca lato server (se logoutEndpoint
    // e' configurato) e azzera il token prima di chiamare questo hook.
    onSessionExpired: D = () => {
      alert("Sessione scaduta"), p && p.push("/");
    }
  } = t, S = (e, s = !1) => {
    let u = {};
    return s ? u.Accept = "*/*" : u["Content-Type"] = "application/json", e && (u[a] = f()), u;
  };
  let x = null, O = !1;
  const M = (e) => String(e).startsWith(n), W = () => {
    if (!x) {
      const e = f();
      x = fetch(`${n}${R}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...e ? { [a]: e } : {}
        },
        credentials: y
      }).then((s) => s.ok ? s.json() : null).then((s) => s && s.status === "ok" && s.access_token ? (i(s.access_token), !0) : !1).catch(() => !1).finally(() => {
        x = null;
      });
    }
    return x;
  }, Z = () => F ? fetch(`${n}${F}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: y
  }).catch(() => {
  }) : Promise.resolve(), T = (e) => {
    O || (O = !0, Z(), i(""), D(e));
  }, v = (e, s, u, d = y) => (u && f() && (O = !1), fetch(e, { ...s, credentials: d }).then((c) => {
    if (u && c.status === 401 && R && M(e)) {
      const b = s.headers?.[a], g = f();
      return (g && g !== b ? Promise.resolve(!0) : W()).then((w) => {
        if (!w)
          return c;
        const h = { ...s.headers, [a]: f() };
        return fetch(e, { ...s, headers: h, credentials: d });
      });
    }
    return c;
  })), P = (e, s, u) => {
    u && e.status == "session" ? T(e) : (e && e.new_token && i(e.new_token), s && s(e));
  }, K = (e, s = "GET", u = {}, d = null) => {
    const {
      session: c = !0,
      hostname: b = void 0,
      body: g = void 0,
      params: m = void 0,
      credentials: w = void 0
    } = u, h = b || n, E = new URL(`${h}${e}`);
    m && Object.keys(m).forEach((r) => E.searchParams.append(r, m[r]));
    const l = {
      method: s,
      headers: S(c)
    };
    g !== void 0 && (l.body = JSON.stringify(g)), v(E, l, c, w || y).then((r) => {
      if (c && r.status === 401)
        return T({ status: "session", message: "Sessione scaduta" }), null;
      if (!r.ok)
        throw new Error(`Errore nella risposta del server: ${r.status} - ${r.statusText}`);
      return r.json();
    }).then((r) => {
      r && P(r, d, c);
    }).catch((r) => {
      console.error("Errore nella richiesta:", r);
    });
  }, q = (e) => typeof File < "u" && e instanceof File || typeof Blob < "u" && e instanceof Blob, U = (e) => {
    if (q(e))
      return e;
    if (e && typeof e == "object") {
      if (q(e.selectedFile))
        return e.selectedFile;
      if (q(e.selectedImage))
        return e.selectedImage;
    }
    return null;
  }, Q = (e, s) => {
    if (Array.isArray(s))
      return s.map((d) => U(d)).filter((d) => d).map((d) => ({ name: d.name || e, file: d }));
    const u = U(s);
    return u ? [{ name: e, file: u }] : [];
  };
  return {
    hostname: n,
    makeRequest: K,
    uploadRequest: (e, s = "POST", u = {}, d = null) => {
      const {
        session: c = !0,
        hostname: b = void 0,
        body: g = {},
        files: m = {},
        extensions: w = $,
        credentials: h = void 0
      } = u, E = b || n, l = Object.keys(m).flatMap((o) => Q(o, m[o])), r = A.validateFiles(l.map((o) => o.file), w);
      if (r) {
        H(r), d && d({ status: "ko", message: r });
        return;
      }
      const k = new FormData();
      k.append("data", JSON.stringify(g)), l.forEach((o) => k.append(o.name, o.file)), v(`${E}${e}`, {
        method: s,
        headers: S(c, !0),
        body: k
      }, c, h || y).then((o) => {
        if (c && o.status === 401)
          return T({ status: "session", message: "Sessione scaduta" }), null;
        if (!o.ok)
          throw new Error(`Errore nella risposta del server: ${o.status} - ${o.statusText}`);
        return o.json();
      }).then((o) => {
        o && P(o, d, c);
      }).catch((o) => {
        console.error("Errore nella richiesta:", o);
      });
    },
    downloadRequest: (e, s = "GET", u = {}, d = null) => {
      const {
        session: c = !0,
        hostname: b = void 0,
        body: g = void 0,
        params: m = void 0
      } = u, w = b || n;
      let h, E;
      s == "GET" ? (h = new URL(`${w}${e}`), m && Object.keys(m).forEach((l) => h.searchParams.append(l, m[l])), E = {
        method: "GET",
        headers: S(c)
      }) : (h = `${w}${e}`, E = {
        method: s,
        headers: S(c),
        body: JSON.stringify(g)
      }), v(h, E, c).then(async (l) => {
        if (c && l.status === 401)
          throw T({ status: "session", message: "Sessione scaduta" }), new Error("Sessione scaduta");
        if (!l.ok)
          throw new Error(`Server error: ${l.status}`);
        const r = l.headers.get("content-type");
        if (r && r.includes("application/json")) {
          const k = await l.json();
          throw P(k, (o) => {
            o.status === "ko" && H(o.message || "Errore durante il download");
          }, c), new Error("Server returned JSON instead of a file");
        }
        return l.blob();
      }).then((l) => {
        const r = URL.createObjectURL(l);
        if (!window.open(r, "_blank")) {
          const o = document.createElement("a");
          o.href = r, document.body.appendChild(o), o.click(), document.body.removeChild(o);
        }
        setTimeout(() => URL.revokeObjectURL(r), 1e4);
      }).catch((l) => {
        console.error("Errore nel download:", l);
      }).finally(() => {
        d && d();
      });
    }
  };
}, ae = X(), j = [
  (t) => t ? !0 : "Campo obbligatorio"
], Y = j.concat([
  (t) => /.+@.+\..+/.test(t) ? !0 : "E-mail non valida."
]), ee = j.concat([
  (t) => /^(https?:\/\/)?([\w-]+\.)+([a-z]{2,})+(\/[\w-]*)*(\?[a-z0-9-]+=[a-z0-9-%]+(&[a-z0-9-]+=[a-z0-9-%]+)*)?$/i.test(t) ? !0 : "Sito non valido."
]), te = j.concat([
  (t) => /[A-Z]/.test(t) ? !0 : "La password deve contenere almeno una lettera maiscola.",
  (t) => /[a-z]/.test(t) ? !0 : "La password deve contenere almeno una lettera minuscola.",
  (t) => /\d/.test(t) ? !0 : "La password deve contenere almeno un numero.",
  (t) => t.length >= 8 ? !0 : "La password deve contenere almeno 8 caratteri."
]), ne = (t, n) => {
  const a = [];
  for (const f of n) {
    const i = f(t);
    i !== !0 && a.push(i);
  }
  return a.length === 0 ? null : a;
}, ie = {
  validateInput: ne,
  requiredRules: j,
  emailRules: Y,
  siteRules: ee,
  passwordRules: te
}, ce = (t, { body: n, endpoint: a = "user/login", ...f } = {}, i) => {
  t.makeRequest(a, "POST", { body: n, ...f }, i);
}, le = (t, { body: n, endpoint: a = "user/register-user", ...f } = {}, i) => {
  t.makeRequest(a, "POST", { body: n, ...f }, i);
}, ue = (t, { body: n, endpoint: a = "user/ask-change-password", ...f } = {}, i) => {
  t.makeRequest(a, "POST", { body: n, ...f }, i);
};
let L = null;
const se = () => (L || (L = new Promise((t) => {
  const n = document.createElement("script");
  n.src = "https://accounts.google.com/gsi/client", n.async = !0, n.defer = !0, n.onload = t, document.body.appendChild(n);
})), L), de = (t, { googleClientId: n, endpoint: a = "user/google-login", ...f } = {}, i) => {
  se().then(() => {
    google.accounts.id.initialize({
      client_id: n,
      callback: (p) => {
        t.makeRequest(a, "POST", {
          body: { token: p.credential },
          ...f
        }, i);
      }
    }), google.accounts.id.prompt();
  });
};
export {
  ue as a,
  X as c,
  ae as d,
  A as f,
  de as g,
  ce as l,
  le as r,
  ie as v
};
