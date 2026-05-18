/* Typing Speed Test
   - Word-pool generation
   - Live WPM, accuracy, error tracking
   - Selectable duration (15 / 30 / 60 seconds)
*/

const WORD_POOL = [
  'the','of','and','to','in','a','is','that','for','it','as','was','with','be','by',
  'on','not','he','this','are','or','his','from','at','which','but','have','an','had',
  'they','you','were','their','one','all','we','can','her','has','there','been','if',
  'more','when','will','would','who','so','no','out','up','about','into','than','them',
  'only','some','could','time','these','two','may','then','do','first','any','my','now',
  'such','like','our','over','man','me','even','most','made','after','also','did','many',
  'before','must','through','back','years','where','much','your','way','well','down','should',
  'because','each','just','those','people','how','too','little','state','good','very','make',
  'world','still','own','see','men','work','long','here','between','both','life','being',
  'under','never','day','same','another','know','while','last','might','great','old','year',
  'off','come','since','against','go','came','right','used','take','three','small','rocket',
  'galaxy','wonder','silent','journey','chapter','design','simple','vivid','quiet','breeze',
  'morning','coffee','window','letter','memory','river','forest','mountain','garden','library'
];

const els = {
  display: document.getElementById('typing-display'),
  input: document.getElementById('typing-input'),
  wpm: document.getElementById('stat-wpm'),
  acc: document.getElementById('stat-acc'),
  time: document.getElementById('stat-time'),
  chars: document.getElementById('stat-chars'),
  reset: document.getElementById('btn-reset'),
  pills: document.querySelectorAll('.duration-pill'),
  result: document.getElementById('result-banner')
};

let state = {
  words: [],
  charIndex: 0,
  correctChars: 0,
  incorrectChars: 0,
  totalTyped: 0,
  started: false,
  finished: false,
  startTime: 0,
  duration: 30,
  remaining: 30,
  timerId: null
};

function generateWords(count = 60) {
  const list = [];
  for (let i = 0; i < count; i++) {
    list.push(WORD_POOL[Math.floor(Math.random() * WORD_POOL.length)]);
  }
  return list;
}

function renderText() {
  const text = state.words.join(' ');
  let html = '';
  for (let i = 0; i < text.length; i++) {
    let cls = 'char';
    if (i < state.charIndex) {
      const typed = state.typedHistory[i];
      cls += typed === text[i] ? ' correct' : ' incorrect';
    } else if (i === state.charIndex) {
      cls += ' current';
    }
    const ch = text[i] === ' ' ? '&nbsp;' : text[i];
    html += `<span class="${cls}">${ch}</span>`;
  }
  els.display.innerHTML = html;
}

function reset() {
  clearInterval(state.timerId);
  state = {
    words: generateWords(),
    typedHistory: [],
    charIndex: 0,
    correctChars: 0,
    incorrectChars: 0,
    totalTyped: 0,
    started: false,
    finished: false,
    startTime: 0,
    duration: state.duration,
    remaining: state.duration,
    timerId: null
  };
  els.input.value = '';
  els.input.disabled = false;
  els.wpm.textContent = '0';
  els.acc.textContent = '100%';
  els.time.textContent = state.duration + 's';
  els.chars.textContent = '0';
  els.result.style.display = 'none';
  renderText();
  els.input.focus();
}

function startTimer() {
  state.started = true;
  state.startTime = Date.now();
  state.timerId = setInterval(() => {
    state.remaining--;
    els.time.textContent = state.remaining + 's';
    updateLiveStats();
    if (state.remaining <= 0) finish();
  }, 1000);
}

function updateLiveStats() {
  const elapsedMin = (Date.now() - state.startTime) / 60000;
  if (elapsedMin > 0) {
    const wpm = Math.round((state.correctChars / 5) / elapsedMin);
    els.wpm.textContent = isFinite(wpm) ? wpm : 0;
  }
  const total = state.correctChars + state.incorrectChars;
  const acc = total > 0 ? Math.round((state.correctChars / total) * 100) : 100;
  els.acc.textContent = acc + '%';
  els.chars.textContent = state.correctChars;
}

function finish() {
  clearInterval(state.timerId);
  state.finished = true;
  els.input.disabled = true;
  updateLiveStats();
  const wpm = els.wpm.textContent;
  const acc = els.acc.textContent;
  els.result.style.display = 'block';
  els.result.innerHTML = `
    <h3 style="color:var(--accent); margin-bottom:0.5rem;">Test complete</h3>
    <p style="font-family:var(--mono); font-size:0.95rem;">
      ${wpm} WPM &nbsp;·&nbsp; ${acc} accuracy &nbsp;·&nbsp; ${state.correctChars} correct characters
    </p>
  `;
}

els.input.addEventListener('input', e => {
  if (state.finished) return;
  if (!state.started) startTimer();

  const typed = e.target.value;
  const text = state.words.join(' ');

  // Only inspect the latest character to count it
  if (typed.length > state.charIndex) {
    const newChar = typed[typed.length - 1];
    const expected = text[state.charIndex];
    state.typedHistory.push(newChar);
    if (newChar === expected) state.correctChars++;
    else state.incorrectChars++;
    state.charIndex = typed.length;
  } else if (typed.length < state.charIndex) {
    // Backspace — step back without crediting
    state.typedHistory.pop();
    state.charIndex = typed.length;
  }

  // Auto-extend the word list as we approach the end
  if (state.charIndex > text.length - 50) {
    state.words = state.words.concat(generateWords(30));
  }
  renderText();
  updateLiveStats();
});

els.reset.addEventListener('click', reset);

els.pills.forEach(pill => {
  pill.addEventListener('click', () => {
    els.pills.forEach(p => p.classList.remove('active'));
    pill.classList.add('active');
    state.duration = parseInt(pill.dataset.duration, 10);
    reset();
  });
});

// Click anywhere on the typing display jumps focus into the input
els.display.addEventListener('click', () => els.input.focus());

reset();
