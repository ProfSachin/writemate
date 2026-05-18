/* Templates & Essay Helper
   - Library of starter templates (essay structures, business docs, etc.)
   - Live essay builder that fills a template based on user inputs
*/

const TEMPLATES = {
  'five-para': {
    title: 'Five-Paragraph Essay',
    icon: '📝',
    type: 'Academic',
    description: 'Classic structure: intro, three body paragraphs, conclusion.',
    fields: [
      { id: 'topic',  label: 'Topic / Thesis',        type: 'input', placeholder: 'e.g. Why renewable energy matters' },
      { id: 'hook',   label: 'Opening hook',          type: 'input', placeholder: 'A surprising fact or question' },
      { id: 'point1', label: 'Main point 1',          type: 'input' },
      { id: 'point2', label: 'Main point 2',          type: 'input' },
      { id: 'point3', label: 'Main point 3',          type: 'input' },
      { id: 'conclusion', label: 'Closing thought',   type: 'textarea' }
    ],
    build: f => `INTRODUCTION
${f.hook || '[Open with a hook]'} This essay argues that ${f.topic || '[your thesis]'}. To support this, three key points will be explored: ${f.point1}, ${f.point2}, and ${f.point3}.

BODY PARAGRAPH 1
The first point is ${f.point1 || '[point one]'}. [Explain the reasoning with at least one piece of evidence and a clear example. Connect it back to the thesis.]

BODY PARAGRAPH 2
A second consideration is ${f.point2 || '[point two]'}. [Develop with evidence, then transition to the next idea.]

BODY PARAGRAPH 3
Finally, ${f.point3 || '[point three]'}. [Provide your strongest evidence here — readers remember the last argument best.]

CONCLUSION
${f.conclusion || 'In summary, the points above demonstrate the thesis.'} ${f.topic ? 'Ultimately, ' + f.topic.toLowerCase() + ' matters because it shapes how we approach the problem at hand.' : ''}`
  },

  'compare-contrast': {
    title: 'Compare & Contrast',
    icon: '⚖️',
    type: 'Academic',
    description: 'Side-by-side analysis of two subjects.',
    fields: [
      { id: 'a', label: 'Subject A', type: 'input' },
      { id: 'b', label: 'Subject B', type: 'input' },
      { id: 'similarities', label: 'Key similarities', type: 'textarea' },
      { id: 'differences', label: 'Key differences', type: 'textarea' },
      { id: 'verdict', label: 'Your verdict / insight', type: 'textarea' }
    ],
    build: f => `INTRODUCTION
This essay compares ${f.a || '[A]'} and ${f.b || '[B]'}. While they appear distinct at first glance, a closer look reveals meaningful overlap as well as critical differences.

SIMILARITIES
Both ${f.a} and ${f.b} share several characteristics. ${f.similarities || '[Describe shared traits with examples.]'}

DIFFERENCES
Despite the overlap, ${f.a} and ${f.b} diverge in important ways. ${f.differences || '[Describe distinguishing traits.]'}

ANALYSIS
${f.verdict || '[Explain what the comparison reveals — your original insight.]'}

CONCLUSION
The comparison of ${f.a} and ${f.b} demonstrates that surface-level similarity does not preclude meaningful difference, and vice versa.`
  },

  'argumentative': {
    title: 'Argumentative Essay',
    icon: '🗣️',
    type: 'Academic',
    description: 'Stake a claim, defend it, address counter-arguments.',
    fields: [
      { id: 'claim',       label: 'Your claim',          type: 'input' },
      { id: 'reason1',     label: 'Reason 1',            type: 'input' },
      { id: 'reason2',     label: 'Reason 2',            type: 'input' },
      { id: 'counter',     label: 'Strongest counter-argument', type: 'textarea' },
      { id: 'rebuttal',    label: 'Your rebuttal',       type: 'textarea' }
    ],
    build: f => `THESIS
This paper argues that ${f.claim || '[your claim]'}. The position is defended on two grounds and then tested against the strongest opposing view.

REASON ONE
${f.reason1 || '[First reason]'}. [Develop with evidence and a clear chain of reasoning.]

REASON TWO
${f.reason2 || '[Second reason]'}. [Develop further evidence, ideally from a different source or angle.]

COUNTER-ARGUMENT
Critics may respond that ${f.counter || '[the opposing view]'}. This objection deserves serious consideration.

REBUTTAL
${f.rebuttal || '[Show why the counter-argument, while reasonable, ultimately does not overturn the claim.]'}

CONCLUSION
Taken together, the reasoning above supports the claim that ${f.claim}. Acknowledging the counter-argument strengthens, rather than weakens, the position.`
  },

  'lab-report': {
    title: 'Lab Report',
    icon: 'none',
    type: 'Science',
    description: 'Standard scientific format: aim, method, results, discussion.',
    fields: [
      { id: 'aim',        label: 'Aim',         type: 'input' },
      { id: 'hypothesis', label: 'Hypothesis',  type: 'input' },
      { id: 'method',     label: 'Method',      type: 'textarea' },
      { id: 'results',    label: 'Results',     type: 'textarea' },
      { id: 'discussion', label: 'Discussion',  type: 'textarea' }
    ],
    build: f => `AIM
${f.aim || '[The purpose of the experiment.]'}

HYPOTHESIS
${f.hypothesis || '[Your predicted outcome and reasoning.]'}

METHOD
${f.method || '[Describe the materials and the steps in enough detail that another researcher could replicate them.]'}

RESULTS
${f.results || '[Present the data — tables and figures referenced here.]'}

DISCUSSION
${f.discussion || '[Interpret the results, compare them to the hypothesis, identify sources of error, and suggest improvements.]'}

CONCLUSION
The experiment ${f.hypothesis ? 'tested the hypothesis that ' + f.hypothesis.toLowerCase() : 'addressed the stated aim'}. The results indicate [supported / partially supported / not supported].`
  },

  'cover-letter': {
    title: 'Cover Letter',
    icon: '✉️',
    type: 'Professional',
    description: 'Personal letter for a job or internship application.',
    fields: [
      { id: 'name',     label: 'Your name',          type: 'input' },
      { id: 'role',     label: 'Role applying for',  type: 'input' },
      { id: 'company',  label: 'Company',            type: 'input' },
      { id: 'why',      label: 'Why this role?',     type: 'textarea' },
      { id: 'strength', label: 'Top strength + example', type: 'textarea' }
    ],
    build: f => `Dear ${f.company || '[Company]'} hiring team,

I am writing to apply for the ${f.role || '[role]'} position. ${f.why || '[A sentence on why this role and this company specifically.]'}

In my previous experience, ${f.strength || '[describe one strong, specific example of relevant work, including a result if possible.]'} I believe these skills directly translate to what the ${f.role} role at ${f.company} requires.

I would welcome the opportunity to discuss how I can contribute to your team. Thank you for considering my application.

Sincerely,
${f.name || '[Your name]'}`
  },

  'book-review': {
    title: 'Book Review',
    icon: '📚',
    type: 'Creative',
    description: 'Short critical review of a book or article.',
    fields: [
      { id: 'title',  label: 'Book / article title', type: 'input' },
      { id: 'author', label: 'Author',               type: 'input' },
      { id: 'summary',label: 'One-paragraph summary',type: 'textarea' },
      { id: 'liked',  label: 'What worked',          type: 'textarea' },
      { id: 'critic', label: 'What didn\'t',         type: 'textarea' }
    ],
    build: f => `${f.title || '[Title]'} by ${f.author || '[Author]'}

SUMMARY
${f.summary || '[A neutral one-paragraph overview — no spoilers beyond the setup.]'}

STRENGTHS
${f.liked || '[What worked: prose, argument, characters, pacing, originality?]'}

WEAKNESSES
${f.critic || '[What didn\'t land, and why — be fair and specific.]'}

VERDICT
Overall, ${f.title} is worth reading for anyone interested in [the topic / genre]. Recommended with the caveats above.`
  }
};

/* ---------- RENDER TEMPLATE GRID ---------- */
const grid = document.getElementById('template-grid');
Object.entries(TEMPLATES).forEach(([key, t]) => {
  const card = document.createElement('div');
  card.className = 'template-card fade-up';
  card.dataset.template = key;
  card.innerHTML = `
  
    <h3>${t.title}</h3>
    <p style="color:var(--ink-soft); font-size:0.95rem; margin-top:0.5rem;">${t.description}</p>
    <div class="template-meta">${t.type}</div>
  `;
  card.addEventListener('click', () => selectTemplate(key));
  grid.appendChild(card);
});

/* ---------- ESSAY BUILDER ---------- */
const builder = document.getElementById('essay-builder');
const builderTitle = document.getElementById('builder-title');
const builderFields = document.getElementById('builder-fields');
const builderPreview = document.getElementById('builder-preview');
let currentTemplate = null;

function selectTemplate(key) {
  document.querySelectorAll('.template-card').forEach(c => {
    c.classList.toggle('selected', c.dataset.template === key);
  });
  currentTemplate = key;
  const t = TEMPLATES[key];
  builderTitle.textContent = t.title;
  builderFields.innerHTML = '';
  t.fields.forEach(f => {
    const section = document.createElement('div');
    section.className = 'essay-section';
    if (f.type === 'textarea') {
      section.innerHTML = `<label for="f-${f.id}">${f.label}</label><textarea id="f-${f.id}" placeholder="${f.placeholder || ''}"></textarea>`;
    } else {
      section.innerHTML = `<label for="f-${f.id}">${f.label}</label><input id="f-${f.id}" type="text" placeholder="${f.placeholder || ''}" />`;
    }
    builderFields.appendChild(section);
  });
  builder.style.display = 'block';
  builder.scrollIntoView({ behavior: 'smooth', block: 'start' });
  builderFields.querySelectorAll('input, textarea').forEach(el => {
    el.addEventListener('input', updatePreview);
  });
  updatePreview();
}

function updatePreview() {
  if (!currentTemplate) return;
  const t = TEMPLATES[currentTemplate];
  const values = {};
  t.fields.forEach(f => {
    values[f.id] = document.getElementById('f-' + f.id).value;
  });
  builderPreview.textContent = t.build(values);
}

/* ---------- COPY & DOWNLOAD ---------- */
document.getElementById('btn-copy-essay').addEventListener('click', () => {
  if (!builderPreview.textContent) return showToast('Pick a template first');
  navigator.clipboard.writeText(builderPreview.textContent)
    .then(() => showToast('Essay copied'));
});

document.getElementById('btn-download-essay').addEventListener('click', () => {
  if (!builderPreview.textContent) return showToast('Pick a template first');
  const blob = new Blob([builderPreview.textContent], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = (currentTemplate || 'essay') + '.txt';
  a.click();
  URL.revokeObjectURL(url);
  showToast('Downloaded');
});
