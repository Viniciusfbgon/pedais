// Navegação por âncoras (#hall, #potenciometro, #slides, #pdf) — sem dependências.
(function () {
  const ROTAS = ['hall', 'potenciometro', 'slides', 'pdf'];
  const TOTAL_SLIDES = 13;
  const PDF = 'pdf/documento.pdf';

  const secoes = document.querySelectorAll('.secao');
  const links = document.querySelectorAll('.menu a');

  // ---------- pedais: só um modelo 3D carregado por vez ----------
  function montarPedal(secao) {
    const m = secao.querySelector('.moldura');
    if (!m || m.querySelector('iframe')) return;
    const f = document.createElement('iframe');
    f.src = m.dataset.src;
    f.title = m.dataset.titulo;
    f.setAttribute('allowfullscreen', '');
    m.appendChild(f);
  }
  function desmontarPedais(exceto) {
    document.querySelectorAll('.moldura').forEach(m => {
      if (m.closest('.secao') !== exceto) m.innerHTML = '';
    });
  }

  // ---------- apresentação ----------
  let slideAtual = 1;
  const img = document.getElementById('slide-img');
  const cont = document.getElementById('contador');
  const ant = document.getElementById('ant');
  const prox = document.getElementById('prox');
  const minis = document.getElementById('miniaturas');
  const num = n => String(n).padStart(2, '0');

  for (let i = 1; i <= TOTAL_SLIDES; i++) {
    const b = document.createElement('button');
    b.setAttribute('aria-label', 'Ir para o slide ' + i);
    b.innerHTML = '<img src="slides/thumb-' + num(i) + '.jpg" alt="" loading="lazy" width="128" height="72">';
    b.addEventListener('click', () => irPara(i));
    minis.appendChild(b);
  }
  function irPara(n) {
    slideAtual = Math.min(Math.max(n, 1), TOTAL_SLIDES);
    img.src = 'slides/slide-' + num(slideAtual) + '.jpg';
    img.alt = 'Slide ' + slideAtual + ' de ' + TOTAL_SLIDES;
    cont.textContent = slideAtual + ' / ' + TOTAL_SLIDES;
    ant.disabled = slideAtual === 1;
    prox.disabled = slideAtual === TOTAL_SLIDES;
    minis.querySelectorAll('button').forEach((b, i) => b.classList.toggle('ativo', i + 1 === slideAtual));
    if (slideAtual < TOTAL_SLIDES) new Image().src = 'slides/slide-' + num(slideAtual + 1) + '.jpg';
  }
  ant.addEventListener('click', () => irPara(slideAtual - 1));
  prox.addEventListener('click', () => irPara(slideAtual + 1));
  document.addEventListener('keydown', e => {
    if (location.hash !== '#slides') return;
    if (e.key === 'ArrowLeft') irPara(slideAtual - 1);
    if (e.key === 'ArrowRight') irPara(slideAtual + 1);
  });
  irPara(1);

  // ---------- PDF: mostra se o arquivo existir ----------
  let pdfVerificado = false;
  function verificarPdf() {
    if (pdfVerificado) return;
    pdfVerificado = true;
    const area = document.getElementById('pdf-area');
    const vazio = document.getElementById('pdf-vazio');
    const acoes = document.getElementById('acoes-pdf');
    fetch(PDF, { method: 'HEAD', cache: 'no-store' })
      .then(r => {
        if (!r.ok) throw new Error('sem pdf');
        area.innerHTML = '<iframe src="' + PDF + '" title="Documento PDF"></iframe>';
        acoes.hidden = false;
      })
      .catch(() => { vazio.hidden = false; });
  }

  // ---------- rotas ----------
  function mostrar() {
    const rota = location.hash.slice(1);
    const id = ROTAS.includes(rota) ? rota : 'inicio';
    let ativa = null;
    secoes.forEach(s => {
      const on = s.id === 'sec-' + id;
      s.hidden = !on;
      if (on) ativa = s;
    });
    links.forEach(a => a.classList.toggle('ativo', a.dataset.rota === id));
    desmontarPedais(ativa);
    if (id === 'hall' || id === 'potenciometro') montarPedal(ativa);
    if (id === 'pdf') verificarPdf();
    window.scrollTo(0, 0);
  }
  window.addEventListener('hashchange', mostrar);
  mostrar();
})();
