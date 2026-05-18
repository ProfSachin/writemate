/* Keyboard Practice
   - On-screen keyboard mirrors physical keystrokes
   - Lesson packs target home-row, top-row, common bigrams, etc.
   - Highlights the next character users should hit
*/

const LESSONS = {
  homerow:   { name: 'Home Row',    text: 'asdf jkl; sad lad ask fall jolly add jab dad sash gas hall' },
  toprow:    { name: 'Top Row',     text: 'qwer tyui top row try were quote your priority quietly two ripe' },
  bottomrow: { name: 'Bottom Row',  text: 'zxcv bnm zinc vex blank brave maze comic nimble cobalt zebra' },
  numbers:   { name: 'Numbers',     text: '1234 5678 90 1066 1492 1776 2024 phone 555-0142 code 9000' },
  symbols:   { name: 'Symbols',     text: 'hello, world! "code" {key} (val) [arr] a@b.com 50% #1' },
  bigrams:   { name: 'Common Pairs',text: 'th he in er an re on at en nd ti es or te of ed is it al' },
  sentences: { name: 'Sentences',   text: 'the quick brown fox jumps over the lazy dog near the silent river' }
};

// Finger map — left/right + finger zone (used to colour the visual keyboard)
const FINGER_MAP = {
  '`':'lf','1':'lf','q':'lf','a':'lf','z':'lf',
  '2':'lr','w':'lr','s':'lr','x':'lr',
  '3':'lm','e':'lm','d':'lm','c':'lm',
  '4':'li','5':'li','r':'li','t':'li','f':'li','g':'li','v':'li','b':'li',
  '6':'ri','7':'ri','y':'ri','u':'ri','h':'ri','j':'ri','n':'ri','m':'ri',
  '8':'rm','i':'rm','k':'rm',',':'rm',
  '9':'rr','o':'rr','l':'rr','.':'rr',
  '0':'rf','-':'rf','=':'rf','p':'rf','[':'rf',']':'rf','\\':'rf',
  ';':'rf',"'":'rf','/':'rf'
};

const KB_LAYOUT = [
  ['`','1','2','3','4','5','6','7','8','9','0','-','=','⌫'],
  ['⇥','q','w','e','r','t','y','u','i','o','p','[',']','\\'],
  ['⇪','a','s','d','f','g','h','j','k','l',';',"'",'↵'],
  ['⇧','z','x','c','v','b','n','m',',','.','/','⇧'],
  [' ']
];

const KEY_WIDTHS = {
  '⌫':'wide','⇥':'wide','⇪':'xwide','↵':'xwide','⇧':'xwide',' ':'space'
};

const els = {
  target:  document.getElementById('practice-target'),
  input:   document.getElementById('practice-input'),
  keyboard:document.getElementById('keyboard'),
  pills:   document.querySelectorAll('.lesson-pill'),
  status:  document.getElementById('practice-status'),
  reset:   document.getElementById('practice-reset')
};

let pState = { text: '', idx: 0, current: 'homerow', correct: 0, total: 0 };

function buildKeyboard() {
  els.keyboard.innerHTML = '';
  KB_LAYOUT.forEach(row => {
    const rowEl = document.createElement('div');
    rowEl.className = 'keyboard-row';
    row.forEach(k => {
      const kEl = document.createElement('div');
      kEl.className = 'key';
      kEl.textContent = k === ' ' ? '' : k;
      kEl.dataset.key = k.toLowerCase();
      if (KEY_WIDTHS[k]) kEl.classList.add(KEY_WIDTHS[k]);
      const finger = FINGER_MAP[k.toLowerCase()];
      if (finger) kEl.classList.add(finger);
      rowEl.appendChild(kEl);
    });
    els.keyboard.appendChild(rowEl);
  });
}

function loadLesson(key) {
  pState.text = LESSONS[key].text;
  pState.idx = 0;
  pState.correct = 0;
  pState.total = 0;
  pState.current = key;
  els.input.value = '';
  els.input.focus();
  render();
}

function render() {
  let html = '';
  for (let i = 0; i < pState.text.length; i++) {
    let cls = 'pending';
    if (i < pState.idx) cls = 'done';
    else if (i === pState.idx) cls = 'current';
    const ch = pState.text[i] === ' ' ? '&nbsp;' : pState.text[i];
    html += `<span class="${cls}">${ch}</span>`;
  }
  els.target.innerHTML = html;

  // Spotlight the next target key
  document.querySelectorAll('.key.target').forEach(k => k.classList.remove('target'));
  const nextChar = pState.text[pState.idx];
  if (nextChar) {
    const lookFor = nextChar === ' ' ? ' ' : nextChar.toLowerCase();
    const keyEl = document.querySelector(`.key[data-key="${lookFor}"]`);
    if (keyEl) keyEl.classList.add('target');
  }

  const acc = pState.total > 0 ? Math.round((pState.correct / pState.total) * 100) : 100;
  els.status.textContent = `${pState.idx} / ${pState.text.length} chars · ${acc}% accuracy`;
}

els.input.addEventListener('input', e => {
  const v = e.target.value;
  if (v.length > pState.idx) {
    const typed = v[v.length - 1];
    const expected = pState.text[pState.idx];
    pState.total++;
    if (typed === expected) {
      pState.correct++;
      pState.idx = v.length;
    } else {
      // Don't advance on a wrong key — keep target steady
      e.target.value = v.slice(0, -1);
    }
  } else {
    pState.idx = v.length;
  }

  if (pState.idx >= pState.text.length) {
    showToast('Lesson complete — nice work');
    setTimeout(() => loadLesson(pState.current), 1200);
  }
  render();
});

// Flash the on-screen key whenever a physical key is pressed
document.addEventListener('keydown', e => {
  const k = e.key.toLowerCase();
  const kEl = document.querySelector(`.key[data-key="${k}"]`);
  if (kEl) kEl.classList.add('active');
});
document.addEventListener('keyup', e => {
  const k = e.key.toLowerCase();
  const kEl = document.querySelector(`.key[data-key="${k}"]`);
  if (kEl) kEl.classList.remove('active');
});

els.pills.forEach(pill => {
  pill.addEventListener('click', () => {
    els.pills.forEach(p => p.classList.remove('active'));
    pill.classList.add('active');
    loadLesson(pill.dataset.lesson);
  });
});

els.reset.addEventListener('click', () => loadLesson(pState.current));

buildKeyboard();
loadLesson('homerow');
