/* Fontanería RIF · todo el JS de la web (vanilla, sin dependencias). Se minifica e inlinea al compilar. */
(function () {
  var d = document, w = window;
  w.dataLayer = w.dataLayer || [];
  function track(ev, extra) {
    var o = { event: ev, pagina: location.pathname };
    for (var k in extra) o[k] = extra[k];
    w.dataLayer.push(o);
  }
  /* ── 0. Abrir con doble clic (file://): los enlaces a carpetas («contacto/») apuntan a su index.html.
        En un servidor o hosting no hace nada: allí las URLs limpias funcionan solas. ── */
  /* Con file:// el navegador bloquea las fuentes web: se carga una copia incrustada (fonts/archivo-rif.js). */
  if (location.protocol === 'file:' && d.currentScript) {
    var fs = d.createElement('script');
    fs.src = d.currentScript.src.replace(/js\/app\.js.*$/, 'fonts/archivo-rif.js');
    d.head.appendChild(fs);
  }
  if (location.protocol === 'file:') d.querySelectorAll('a[href]').forEach(function (a) {
    if (a.hasAttribute('data-pendiente')) return;
    var h = a.getAttribute('href');
    if (/^[a-z]+:/i.test(h) || h.charAt(0) === '#') return;
    var i = h.indexOf('#'), ruta = i < 0 ? h : h.slice(0, i), ancla = i < 0 ? '' : h.slice(i);
    if (ruta.slice(-1) === '/') a.setAttribute('href', ruta + 'index.html' + ancla);
  });

  function store(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; } }

  /* ── 1. Abierto ahora / Cerrado (hora de Madrid). Festivos: no contemplados [CONFIRMAR calendario]. ── */
  var TRAMOS = [[540, 780], [900, 1140]], LAB = [1, 2, 3, 4, 5];
  var DIAS = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
  var hhmm = function (m) { return Math.floor(m / 60) + ':' + String(m % 60).padStart(2, '0'); };
  function ahora() {
    var p = {}; new Intl.DateTimeFormat('en-US', { timeZone: 'Europe/Madrid', weekday: 'short', hour: 'numeric', minute: 'numeric', hourCycle: 'h23' })
      .formatToParts(new Date()).forEach(function (x) { p[x.type] = x.value; });
    return { dia: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(p.weekday), min: (+p.hour % 24) * 60 + +p.minute };
  }
  function estado() {
    var n = ahora(), hoy = LAB.indexOf(n.dia) > -1, i, t;
    if (hoy) for (i = 0; i < TRAMOS.length; i++) {
      t = TRAMOS[i];
      if (n.min >= t[0] && n.min < t[1]) return { abierto: true, txt: 'Abierto ahora · hasta las ' + hhmm(t[1]) };
      if (n.min < t[0]) return { abierto: false, txt: 'Cerrado · abrimos hoy a las ' + hhmm(t[0]) };
    }
    for (i = 1; i <= 7; i++) {
      var dd = (n.dia + i) % 7;
      if (LAB.indexOf(dd) > -1) return { abierto: false, txt: 'Cerrado · abrimos ' + (i === 1 ? 'mañana' : 'el ' + DIAS[dd]) + ' a las ' + hhmm(TRAMOS[0][0]) };
    }
  }
  function pintaChips() {
    var e = estado();
    d.querySelectorAll('[data-chip]').forEach(function (c) {
      c.classList.toggle('estado--abierto', e.abierto);
      c.classList.toggle('estado--cerrado', !e.abierto);
      c.querySelector('[data-chip-text]').textContent = e.txt;
    });
    var hoy = ahora().dia;
    d.querySelectorAll('[data-dia]').forEach(function (r) { r.classList.toggle('hoy', r.getAttribute('data-dia').split(',').indexOf(String(hoy)) > -1); });
  }
  pintaChips(); setInterval(pintaChips, 60000);

  /* ── 2. Eventos de conversión (dataLayer) ── */
  d.addEventListener('click', function (e) {
    var a = e.target.closest('a');
    if (!a) return;
    var href = a.getAttribute('href') || '', ub = a.getAttribute('data-ub') || 'contenido';
    if (href.indexOf('tel:') === 0) track('clic_telefono', { ubicacion: ub, telefono: href.slice(4) });
    else if (href.indexOf('wa.me') > -1) track('clic_whatsapp', { ubicacion: ub });
    /* Prototipo: páginas previstas en la arquitectura pero aún no desarrolladas */
    if (a.hasAttribute('data-pendiente')) {
      e.preventDefault();
      toast('Página prevista: <b>/' + href.replace(/^(\.\.\/)+|^\.\//, '') + '</b><br>Se construye con la misma plantilla que «Desatascos en Ermua».');
    }
  });
  var s75 = false;
  w.addEventListener('scroll', function onS() {
    if (s75) return;
    var h = d.documentElement;
    if ((w.scrollY + w.innerHeight) / h.scrollHeight >= 0.75) { s75 = true; track('scroll_75'); w.removeEventListener('scroll', onS); }
  }, { passive: true });

  /* ── 3. Formulario (validación nativa; en el prototipo no se envía a ningún servidor) ── */
  d.querySelectorAll('[data-form]').forEach(function (f) {
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      if (f.web && f.web.value) return; // honeypot antispam
      // PRODUCCIÓN: fetch(f.action, { method: 'POST', body: new FormData(f) }).then(ok => …)
      track('envio_formulario', { servicio: f.servicio.value });
      f.hidden = true;
      var ok = f.parentNode.querySelector('[data-form-ok]');
      ok.hidden = false; ok.setAttribute('tabindex', '-1'); ok.focus();
    });
  });

  /* ── 4. Mapa con fachada: el iframe de Google solo se carga al pulsar ── */
  d.querySelectorAll('[data-map-load]').forEach(function (b) {
    b.addEventListener('click', function () {
      var m = b.closest('[data-map]'), f = d.createElement('iframe');
      f.src = m.getAttribute('data-map'); f.title = 'Mapa: ubicación de Fontanería RIF en Ermua';
      f.loading = 'lazy'; f.referrerPolicy = 'no-referrer-when-downgrade'; f.allowFullscreen = true;
      m.innerHTML = ''; m.appendChild(f);
    });
  });

  /* ── 5. Comparador antes/después ── */
  d.querySelectorAll('[data-ba]').forEach(function (b) {
    var r = b.querySelector('input');
    r.addEventListener('input', function () { b.style.setProperty('--pos', r.value + '%'); });
  });

  /* ── 6. Consentimiento de cookies (RGPD) + analítica diferida ── */
  var banner = d.querySelector('[data-cookie]');
  function cargarAnalitica() {
    if (w.__rifGA) return; w.__rifGA = true;
    /* Descomentar al tener el contenedor de GTM (GTM-XXXXXXX). Solo se ejecuta tras «Aceptar».
    w.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
    var s = d.createElement('script'); s.async = true;
    s.src = 'https://www.googletagmanager.com/gtm.js?id=GTM-XXXXXXX';
    d.head.appendChild(s);
    */
    /* Alternativa solo GA4 (G-XXXXXXXXXX):
    var g = d.createElement('script'); g.async = true;
    g.src = 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX'; d.head.appendChild(g);
    window.gtag = function () { dataLayer.push(arguments); };
    gtag('js', new Date()); gtag('config', 'G-XXXXXXXXXX');
    */
  }
  function decide(v) { store('rif_consent', v); banner.hidden = true; track('consentimiento', { analitica: v }); if (v === 'si') cargarAnalitica(); }
  var c = store('rif_consent');
  if (c === 'si') cargarAnalitica(); else if (c !== 'no' && banner) banner.hidden = false;
  if (banner) {
    banner.querySelector('[data-cookie-si]').onclick = function () { decide('si'); };
    banner.querySelector('[data-cookie-no]').onclick = function () { decide('no'); };
  }
  d.querySelectorAll('[data-cookie-open]').forEach(function (b) { b.onclick = function () { banner.hidden = false; }; });

  /* ── Aviso del prototipo ── */
  var tEl = d.querySelector('[data-toast]'), tT;
  function toast(html) { tEl.innerHTML = html; tEl.hidden = false; clearTimeout(tT); tT = setTimeout(function () { tEl.hidden = true; }, 4000); }
})();
