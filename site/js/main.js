// Personal site template. No build step, no dependencies.

// ---------- Career git log (newest first, like `git log`) ----------
// x / y are the commit's dot in the graph SVG (index.html, #gl svg).
// Rows are 48px tall: y = 24 + 48 * row. Add a row here and a dot + path there.
const C = { main: 'var(--ink)', res: 'var(--b-res)', med: 'var(--b-med)', ndt: 'var(--b-ndt)', trn: 'var(--b-trn)', auto: 'var(--accent)' };
const GRAPH = [
  { hash: 'a7e04d2', branch: 'feature/current', c: C.auto, tag: 'HEAD → feature/current', head: true, x: 40, y: 24, label: 'What you are working on now', title: 'What you are working on now', body: 'The latest commit is HEAD. Describe your current focus in one or two sentences. Work in progress.', links: [['a project', '#work-edge-ai'], ['an expertise', '#exp-01']] },
  { hash: 'c41b9f7', branch: 'main', c: C.main, x: 16, y: 72, label: 'Merge branch ‘feature/industry-b’', title: 'Merge: industry b', body: 'A merge commit: what this chapter left you with.', links: [['engineering practices', '#exp-06']] },
  { hash: '9d2e6a1', branch: 'feature/industry-b', c: C.ndt, tag: 'feature/industry-b', x: 88, y: 120, label: 'Technical leadership', title: 'Technical leadership', body: 'The second commit on this branch: how your role grew.', links: [['engineering practices', '#exp-06']] },
  { hash: 'f06d2b8', branch: 'main', c: C.main, x: 16, y: 168, label: 'Merge branch ‘training/certification’', title: 'Merge: certification', body: 'What the training changed in how you work.', links: [['engineering practices', '#exp-06']] },
  { hash: '5f8c330', branch: 'training/certification', c: C.trn, tag: 'training/certification', x: 40, y: 216, label: 'A certification', title: 'A certification or course', body: 'A training branch: forks from main and merges back.', links: [['engineering practices', '#exp-06']] },
  { hash: 'e2b7d18', branch: 'feature/industry-b', c: C.ndt, x: 88, y: 264, label: 'First work in industry b', title: 'First work in industry b', body: 'The first commit on a second industry branch.', links: [['a project', '#work-yocto']] },
  { hash: '71ca5e4', branch: 'main', c: C.main, x: 16, y: 312, label: 'Merge branch ‘feature/industry-a’', title: 'Merge: industry a', body: 'A merge commit: what this chapter left you with.', links: [['an expertise', '#exp-04']] },
  { hash: '3b6f0a9', branch: 'feature/industry-a', c: C.med, tag: 'feature/industry-a', x: 64, y: 360, label: 'Third milestone', title: 'Third milestone in industry a', body: 'One sentence per commit is plenty.', links: [['a project', '#work-embedded-linux']] },
  { hash: 'd80e2c5', branch: 'feature/industry-a', c: C.med, x: 64, y: 408, label: 'Second milestone', title: 'Second milestone in industry a', body: 'One sentence per commit is plenty.', links: [['a project', '#work-biosignals']] },
  { hash: '46a1f7b', branch: 'feature/industry-a', c: C.med, x: 64, y: 456, label: 'First milestone', title: 'First milestone in industry a', body: 'One sentence per commit is plenty.', links: [['an expertise', '#exp-02']] },
  { hash: 'b19d4e3', branch: 'main', c: C.main, x: 16, y: 504, label: 'Merge branch ‘research’', title: 'Merge: research', body: 'What research gave you.', links: [['research', '#publications']] },
  { hash: '8c2f6d0', branch: 'research', c: C.res, tag: 'research', x: 40, y: 552, label: 'Research topic', title: 'Research topic', body: 'Your thesis or research work, in a sentence.', links: [['research', '#publications'], ['a project', '#work-wearables']] },
  { hash: '0e5a7b1', branch: 'main', c: C.main, x: 16, y: 600, label: 'Initial commit: foundations', title: 'Foundations', body: 'Where it started.', links: [['an expertise', '#exp-02']] }
];

const $ = (sel, el = document) => el.querySelector(sel);
const $$ = (sel, el = document) => Array.from(el.querySelectorAll(sel));
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ---------- Theme ----------
function setTheme(t) {
  document.documentElement.dataset.theme = t;
  $$('[data-theme-set]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.themeSet === t)));
  try { localStorage.setItem('clf-theme', t); } catch (e) {}
}
$$('[data-theme-set]').forEach(b => b.addEventListener('click', () => setTheme(b.dataset.themeSet)));
setTheme(document.documentElement.dataset.theme || 'light');

// ---------- Git log ----------
(function gitLog() {
  const rows = $('#gl-rows');
  const gl = $('#gl');
  if (!rows || !gl) return;
  const detail = $('#gl-detail'), ring = $('#gl-ring');
  let active = -1;

  GRAPH.forEach((g, i) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'gl-row';
    b.setAttribute('aria-pressed', 'false');
    const hash = document.createElement('span'); hash.className = 'gl-hash'; hash.textContent = g.hash; b.append(hash);
    if (g.tag) { const t = document.createElement('span'); t.className = 'gl-tag' + (g.head ? ' head' : ''); t.style.setProperty('--c', g.c); t.textContent = g.tag; b.append(t); }
    const msg = document.createElement('span'); msg.className = 'gl-msg'; msg.textContent = g.label; b.append(msg);
    b.addEventListener('mouseenter', () => pick(i));
    b.addEventListener('focus', () => pick(i));
    b.addEventListener('click', () => {
      pick(i);
      // When the details panel sits below the list (narrow screens), bring it into view.
      if (detail.offsetTop > rows.offsetTop + 40) detail.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'nearest' });
    });
    rows.append(b);
  });

  function pick(i) {
    if (i === active) return;
    active = i;
    const g = GRAPH[i];
    $$('.gl-row', rows).forEach((r, j) => r.setAttribute('aria-pressed', String(j === i)));
    $('#gl-hash').textContent = g.hash;
    const br = $('#gl-branch'); br.textContent = g.branch; br.style.color = g.c;
    $('#gl-title').textContent = g.title;
    $('#gl-body').textContent = g.body;
    const links = $('#gl-links'); links.replaceChildren();
    g.links.forEach(([label, href]) => { const a = document.createElement('a'); a.href = href; a.textContent = label + ' ↓'; links.append(a); });
    ring.setAttribute('cx', g.x); ring.setAttribute('cy', g.y);
  }
  pick(0);

  // Draw the branches when the section scrolls into view.
  if ('IntersectionObserver' in window && !reduceMotion) {
    const io = new IntersectionObserver(es => { if (es.some(e => e.isIntersecting)) { gl.dataset.in = 'yes'; io.disconnect(); } }, { threshold: 0.2 });
    io.observe(gl);
  } else gl.dataset.in = 'yes';
})();

// ---------- Selected work carousel ----------
(function carousel() {
  const track = $('#work-track');
  if (!track) return;
  const cards = $$('.work-card', track);
  const pos = $('#work-pos'), prev = $('#work-prev'), next = $('#work-next');
  let wi = 0;
  const pad = n => String(n).padStart(2, '0');

  function go(i) {
    wi = Math.max(0, Math.min(cards.length - 1, i));
    track.style.transform = `translateX(calc(${-wi} * (100% + 20px)))`;
    track.parentElement.scrollLeft = 0; // undo any native anchor scroll inside the viewport
    cards.forEach((c, j) => { c.inert = j !== wi; if (j !== wi) collapse(c); });
    pos.textContent = `${pad(wi + 1)} / ${pad(cards.length)}`;
    prev.disabled = wi === 0;
    next.disabled = wi === cards.length - 1;
  }
  function collapse(card) {
    const btn = $('.work-toggle', card), more = $('.work-more', card);
    if (!btn || !more) return;
    more.hidden = true; btn.setAttribute('aria-expanded', 'false'); btn.textContent = 'show more ↓';
  }
  prev.addEventListener('click', () => go(wi - 1));
  next.addEventListener('click', () => go(wi + 1));
  track.addEventListener('keydown', e => { if (e.key === 'ArrowLeft') go(wi - 1); if (e.key === 'ArrowRight') go(wi + 1); });

  cards.forEach(card => {
    const btn = $('.work-toggle', card), more = $('.work-more', card);
    btn.addEventListener('click', () => {
      const open = more.hidden;
      more.hidden = !open;
      btn.setAttribute('aria-expanded', String(open));
      btn.textContent = open ? 'show less ↑' : 'show more ↓';
    });
  });
  // Fold an open card when clicking elsewhere.
  document.addEventListener('mousedown', e => {
    const card = cards[wi];
    if (!card.contains(e.target)) collapse(card);
  });

  // Links to a project (#work-…) slide the carousel to it.
  function openFromHash(hash, smooth) {
    const i = cards.findIndex(c => '#' + c.id === hash);
    if (i < 0) return false;
    go(i);
    $('#work').scrollIntoView({ behavior: smooth && !reduceMotion ? 'smooth' : 'auto' });
    return true;
  }
  document.addEventListener('click', e => {
    const a = e.target.closest && e.target.closest('a[href^="#work-"]');
    if (a && openFromHash(a.getAttribute('href'), true)) { e.preventDefault(); history.replaceState(null, '', a.getAttribute('href')); }
  });
  go(0);
  if (location.hash.startsWith('#work-')) openFromHash(location.hash, false);
})();
