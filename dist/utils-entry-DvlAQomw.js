const A = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  pdf: "application/pdf",
  xls: "application/vnd.ms-excel",
  xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  mp4: "video/mp4"
}, _ = ["jpg", "jpeg", "png", "webp"], G = ["pdf"], I = ["xls", "xlsx"], J = ["mp4"], L = [
  ..._,
  ...G,
  ...I,
  ...J
], U = (t) => {
  const n = t && t.name || "", a = n.lastIndexOf(".");
  return a < 0 ? "" : n.slice(a + 1).toLowerCase();
}, N = (t = L) => t.map((n) => `.${n}`).join(","), Q = (t, n = L) => {
  const a = Array.from(t || []).filter((i) => {
    const p = U(i);
    return n.includes(p) ? !1 : !!p || !n.some(($) => A[$] === i.type);
  });
  return a.length == 0 ? null : `Estensione non supportata: ${[...new Set(a.map((i) => {
    const p = U(i);
    return p ? `.${p}` : i.name;
  }))].join(", ")}.
Estensioni ammesse: ${N(n)}`;
}, z = {
  fileTypes: A,
  defaultExtensions: L,
  imageExtensions: _,
  pdfExtensions: G,
  spreadsheetExtensions: I,
  videoExtensions: J,
  buildAccept: N,
  validateFiles: Q
}, V = (t = {}) => {
  const {
    hostname: n,
    authHeader: a = "Token",
    getToken: f = () => localStorage.getItem("token"),
    setToken: i = () => {
    },
    router: p = void 0,
    allowedExtensions: $ = z.defaultExtensions,
    refreshEndpoint: R = void 0,
    logoutEndpoint: C = void 0,
    credentials: y = R ? "include" : "same-origin",
    onError: F = (e) => alert(e),
    // Quando la sessione cade, il client revoca lato server (se logoutEndpoint
    // e' configurato) e azzera il token prima di chiamare questo hook.
    onSessionExpired: B = () => {
      alert("Sessione scaduta"), p && p.push("/");
    }
  } = t, S = (e, s = !1) => {
    let d = {};
    return s ? d.Accept = "*/*" : d["Content-Type"] = "application/json", e && (d[a] = f()), d;
  };
  let T = null;
  const D = (e) => String(e).startsWith(n), M = () => {
    if (!T) {
      const e = f();
      T = fetch(`${n}${R}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...e ? { [a]: e } : {}
        },
        credentials: y
      }).then((s) => s.ok ? s.json() : null).then((s) => s && s.status === "ok" && s.access_token ? (i(s.access_token), !0) : !1).catch(() => !1).finally(() => {
        T = null;
      });
    }
    return T;
  }, W = () => C ? fetch(`${n}${C}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: y
  }).catch(() => {
  }) : Promise.resolve(), x = (e) => {
    W(), i(""), B(e);
  }, O = (e, s, d, u = y) => fetch(e, { ...s, credentials: u }).then((c) => {
    if (d && c.status === 401 && R && D(e)) {
      const b = s.headers?.[a], g = f();
      return (g && g !== b ? Promise.resolve(!0) : M()).then((w) => {
        if (!w)
          return c;
        const h = { ...s.headers, [a]: f() };
        return fetch(e, { ...s, headers: h, credentials: u });
      });
    }
    return c;
  }), v = (e, s, d) => {
    d && e.status == "session" ? x(e) : (e && e.new_token && i(e.new_token), s && s(e));
  }, Z = (e, s = "GET", d = {}, u = null) => {
    const {
      session: c = !0,
      hostname: b = void 0,
      body: g = void 0,
      params: m = void 0,
      credentials: w = void 0
    } = d, h = b || n, E = new URL(`${h}${e}`);
    m && Object.keys(m).forEach((r) => E.searchParams.append(r, m[r]));
    const l = {
      method: s,
      headers: S(c)
    };
    g !== void 0 && (l.body = JSON.stringify(g)), O(E, l, c, w || y).then((r) => {
      if (c && r.status === 401)
        return x({ status: "session", message: "Sessione scaduta" }), null;
      if (!r.ok)
        throw new Error(`Errore nella risposta del server: ${r.status} - ${r.statusText}`);
      return r.json();
    }).then((r) => {
      r && v(r, u, c);
    }).catch((r) => {
      console.error("Errore nella richiesta:", r);
    });
  }, P = (e) => typeof File < "u" && e instanceof File || typeof Blob < "u" && e instanceof Blob, H = (e) => {
    if (P(e))
      return e;
    if (e && typeof e == "object") {
      if (P(e.selectedFile))
        return e.selectedFile;
      if (P(e.selectedImage))
        return e.selectedImage;
    }
    return null;
  }, K = (e, s) => {
    if (Array.isArray(s))
      return s.map((u) => H(u)).filter((u) => u).map((u) => ({ name: u.name || e, file: u }));
    const d = H(s);
    return d ? [{ name: e, file: d }] : [];
  };
  return {
    hostname: n,
    makeRequest: Z,
    uploadRequest: (e, s = "POST", d = {}, u = null) => {
      const {
        session: c = !0,
        hostname: b = void 0,
        body: g = {},
        files: m = {},
        extensions: w = $,
        credentials: h = void 0
      } = d, E = b || n, l = Object.keys(m).flatMap((o) => K(o, m[o])), r = z.validateFiles(l.map((o) => o.file), w);
      if (r) {
        F(r), u && u({ status: "ko", message: r });
        return;
      }
      const k = new FormData();
      k.append("data", JSON.stringify(g)), l.forEach((o) => k.append(o.name, o.file)), O(`${E}${e}`, {
        method: s,
        headers: S(c, !0),
        body: k
      }, c, h || y).then((o) => {
        if (c && o.status === 401)
          return x({ status: "session", message: "Sessione scaduta" }), null;
        if (!o.ok)
          throw new Error(`Errore nella risposta del server: ${o.status} - ${o.statusText}`);
        return o.json();
      }).then((o) => {
        o && v(o, u, c);
      }).catch((o) => {
        console.error("Errore nella richiesta:", o);
      });
    },
    downloadRequest: (e, s = "GET", d = {}, u = null) => {
      const {
        session: c = !0,
        hostname: b = void 0,
        body: g = void 0,
        params: m = void 0
      } = d, w = b || n;
      let h, E;
      s == "GET" ? (h = new URL(`${w}${e}`), m && Object.keys(m).forEach((l) => h.searchParams.append(l, m[l])), E = {
        method: "GET",
        headers: S(c)
      }) : (h = `${w}${e}`, E = {
        method: s,
        headers: S(c),
        body: JSON.stringify(g)
      }), O(h, E, c).then(async (l) => {
        if (c && l.status === 401)
          throw x({ status: "session", message: "Sessione scaduta" }), new Error("Sessione scaduta");
        if (!l.ok)
          throw new Error(`Server error: ${l.status}`);
        const r = l.headers.get("content-type");
        if (r && r.includes("application/json")) {
          const k = await l.json();
          throw v(k, (o) => {
            o.status === "ko" && F(o.message || "Errore durante il download");
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
        u && u();
      });
    }
  };
}, re = V(), j = [
  (t) => t ? !0 : "Campo obbligatorio"
], X = j.concat([
  (t) => /.+@.+\..+/.test(t) ? !0 : "E-mail non valida."
]), Y = j.concat([
  (t) => /^(https?:\/\/)?([\w-]+\.)+([a-z]{2,})+(\/[\w-]*)*(\?[a-z0-9-]+=[a-z0-9-%]+(&[a-z0-9-]+=[a-z0-9-%]+)*)?$/i.test(t) ? !0 : "Sito non valido."
]), ee = j.concat([
  (t) => /[A-Z]/.test(t) ? !0 : "La password deve contenere almeno una lettera maiscola.",
  (t) => /[a-z]/.test(t) ? !0 : "La password deve contenere almeno una lettera minuscola.",
  (t) => /\d/.test(t) ? !0 : "La password deve contenere almeno un numero.",
  (t) => t.length >= 8 ? !0 : "La password deve contenere almeno 8 caratteri."
]), te = (t, n) => {
  const a = [];
  for (const f of n) {
    const i = f(t);
    i !== !0 && a.push(i);
  }
  return a.length === 0 ? null : a;
}, ae = {
  validateInput: te,
  requiredRules: j,
  emailRules: X,
  siteRules: Y,
  passwordRules: ee
}, ie = (t, { body: n, endpoint: a = "user/login", ...f } = {}, i) => {
  t.makeRequest(a, "POST", { body: n, ...f }, i);
}, ce = (t, { body: n, endpoint: a = "user/register-user", ...f } = {}, i) => {
  t.makeRequest(a, "POST", { body: n, ...f }, i);
}, le = (t, { body: n, endpoint: a = "user/ask-change-password", ...f } = {}, i) => {
  t.makeRequest(a, "POST", { body: n, ...f }, i);
};
let q = null;
const ne = () => (q || (q = new Promise((t) => {
  const n = document.createElement("script");
  n.src = "https://accounts.google.com/gsi/client", n.async = !0, n.defer = !0, n.onload = t, document.body.appendChild(n);
})), q), ue = (t, { googleClientId: n, endpoint: a = "user/google-login", ...f } = {}, i) => {
  ne().then(() => {
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
  le as a,
  V as c,
  re as d,
  z as f,
  ue as g,
  ie as l,
  ce as r,
  ae as v
};
