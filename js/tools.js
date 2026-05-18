/* Writing Tools
   Tabs:
     • Stats        — words / chars / sentences / reading time
     • Case         — UPPER / lower / Title / Sentence / aLtErNaTe
     • Transform    — reverse / sort lines / dedupe / strip extra spaces
     • Lorem        — paragraph generator
*/

const tabs = document.querySelectorAll('.tool-tab');
const panels = document.querySelectorAll('.tool-panel');
tabs.forEach(t => t.addEventListener('click', () => {
  tabs.forEach(x => x.classList.remove('active'));
  panels.forEach(p => p.classList.remove('active'));
  t.classList.add('active');
  document.getElementById('panel-' + t.dataset.tab).classList.add('active');
}));

/* ---------- STATS ---------- */
const statsInput = document.getElementById('stats-input');
const statW = document.getElementById('cnt-words');
const statC = document.getElementById('cnt-chars');
const statCN = document.getElementById('cnt-chars-nospace');
const statS = document.getElementById('cnt-sentences');
const statP = document.getElementById('cnt-paragraphs');
const statT = document.getElementById('cnt-time');

function updateStats() {
  const text = statsInput.value;
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const chars = text.length;
  const noSpaces = text.replace(/\s/g, '').length;
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
  const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim().length > 0).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  statW.textContent = words;
  statC.textContent = chars;
  statCN.textContent = noSpaces;
  statS.textContent = sentences;
  statP.textContent = paragraphs;
  statT.textContent = minutes + 'm';
}
statsInput.addEventListener('input', updateStats);
updateStats();

/* ---------- CASE CONVERTER ---------- */
const caseInput = document.getElementById('case-input');
const caseOutput = document.getElementById('case-output');

document.querySelectorAll('[data-case]').forEach(btn => {
  btn.addEventListener('click', () => {
    const t = caseInput.value;
    let r = '';
    switch (btn.dataset.case) {
      case 'upper':    r = t.toUpperCase(); break;
      case 'lower':    r = t.toLowerCase(); break;
      case 'title':    r = t.toLowerCase().replace(/\b\w/g, c => c.toUpperCase()); break;
      case 'sentence': r = t.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, c => c.toUpperCase()); break;
      case 'alt':      r = t.split('').map((c, i) => i % 2 ? c.toUpperCase() : c.toLowerCase()).join(''); break;
      case 'invert':   r = t.split('').map(c => c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()).join(''); break;
    }
    caseOutput.textContent = r;
    caseOutput.classList.remove('empty');
  });
});

/* ---------- TRANSFORM ---------- */
const xfInput = document.getElementById('xf-input');
const xfOutput = document.getElementById('xf-output');

document.querySelectorAll('[data-xf]').forEach(btn => {
  btn.addEventListener('click', () => {
    const t = xfInput.value;
    let r = '';
    switch (btn.dataset.xf) {
      case 'reverse':       r = t.split('').reverse().join(''); break;
      case 'reverse-words': r = t.split(/\s+/).reverse().join(' '); break;
      case 'sort':          r = t.split('\n').sort().join('\n'); break;
      case 'sort-desc':     r = t.split('\n').sort().reverse().join('\n'); break;
      case 'dedupe':        r = [...new Set(t.split('\n'))].join('\n'); break;
      case 'trim':          r = t.split('\n').map(l => l.trim()).join('\n'); break;
      case 'squash':        r = t.replace(/\s+/g, ' ').trim(); break;
      case 'shuffle':
        const lines = t.split('\n');
        for (let i = lines.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [lines[i], lines[j]] = [lines[j], lines[i]];
        }
        r = lines.join('\n');
        break;
    }
    xfOutput.textContent = r;
    xfOutput.classList.remove('empty');
  });
});

/* ---------- LOREM IPSUM ---------- */
const LOREM = ('lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor ' +
'incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ' +
'ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit ' +
'in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat ' +
'non proident sunt in culpa qui officia deserunt mollit anim id est laborum').split(' ');

const loremCount = document.getElementById('lorem-count');
const loremType = document.getElementById('lorem-type');
const loremOutput = document.getElementById('lorem-output');

document.getElementById('btn-lorem').addEventListener('click', () => {
  const n = parseInt(loremCount.value, 10) || 3;
  const type = loremType.value;
  let result = '';
  if (type === 'words') {
    const arr = [];
    for (let i = 0; i < n; i++) arr.push(LOREM[Math.floor(Math.random() * LOREM.length)]);
    result = arr.join(' ');
  } else if (type === 'sentences') {
    for (let i = 0; i < n; i++) {
      const len = 8 + Math.floor(Math.random() * 12);
      const arr = [];
      for (let j = 0; j < len; j++) arr.push(LOREM[Math.floor(Math.random() * LOREM.length)]);
      let s = arr.join(' ');
      s = s.charAt(0).toUpperCase() + s.slice(1) + '. ';
      result += s;
    }
  } else { // paragraphs
    for (let i = 0; i < n; i++) {
      const sCount = 3 + Math.floor(Math.random() * 4);
      let para = '';
      for (let j = 0; j < sCount; j++) {
        const len = 8 + Math.floor(Math.random() * 12);
        const arr = [];
        for (let k = 0; k < len; k++) arr.push(LOREM[Math.floor(Math.random() * LOREM.length)]);
        let s = arr.join(' ');
        s = s.charAt(0).toUpperCase() + s.slice(1) + '. ';
        para += s;
      }
      result += para + '\n\n';
    }
  }
  loremOutput.textContent = result.trim();
  loremOutput.classList.remove('empty');
});

/* ---------- COPY BUTTONS ---------- */
document.querySelectorAll('[data-copy]').forEach(btn => {
  btn.addEventListener('click', () => {
    const target = document.getElementById(btn.dataset.copy);
    const text = target.textContent || target.value;
    if (!text) { showToast('Nothing to copy'); return; }
    navigator.clipboard.writeText(text).then(() => showToast('Copied to clipboard'));
  });
});
