/* =====================================================
   ABIDEMI'S PORTFOLIO — script

   TO CUSTOMIZE:
   - Edit the `codeLines` array below to change what types out
     in the hero editor panel.
===================================================== */

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- hero typing animation ---------- */

const codeLines = [
  { text: "const developer = {", cls: "" },
  { text: "  name: 'Abidemi',", cls: "" },
  { text: "  role: 'Front-End Engineer',", cls: "" },
  { text: "  stack: ['React', 'TypeScript', 'CSS'],", cls: "" },
  { text: "  focus: 'interfaces that feel inevitable',", cls: "" },
  { text: "  available: true,", cls: "" },
  { text: "};", cls: "" },
];

const typeTarget = document.getElementById('typeTarget');
const caret = document.getElementById('caret');

function typeCode() {
  if (!typeTarget) return;

  if (prefersReducedMotion) {
    typeTarget.textContent = codeLines.map(l => l.text).join('\n');
    return;
  }

  let lineIndex = 0;
  let charIndex = 0;
  let buffer = '';

  function step() {
    if (lineIndex >= codeLines.length) {
      return; // done
    }

    const line = codeLines[lineIndex];

    if (charIndex <= line.text.length) {
      typeTarget.textContent = buffer + line.text.slice(0, charIndex);
      charIndex++;
      setTimeout(step, 18 + Math.random() * 22);
    } else {
      buffer += line.text + '\n';
      typeTarget.textContent = buffer;
      lineIndex++;
      charIndex = 0;
      setTimeout(step, 120);
    }
  }

  step();
}

/* ---------- scroll reveal ---------- */

function initReveal() {
  const targets = document.querySelectorAll('.reveal');

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    targets.forEach(el => el.classList.add('in-view'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  targets.forEach(el => observer.observe(el));
}

/* ---------- nav: mobile toggle + scroll spy ---------- */

function initNav() {
  const toggle = document.getElementById('navToggle');
  const tabs = document.querySelector('.nav__tabs');

  if (toggle && tabs) {
    toggle.addEventListener('click', () => {
      const isOpen = tabs.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });

    tabs.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        tabs.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const sections = ['work', 'about', 'contact']
    .map(id => document.getElementById(id))
    .filter(Boolean);

  const tabLinks = document.querySelectorAll('.tab');

  if (sections.length && 'IntersectionObserver' in window) {
    const spy = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          tabLinks.forEach(t => t.classList.remove('active'));
          const match = document.querySelector(`.tab[data-target="${entry.target.id}"]`);
          if (match) match.classList.add('active');
        }
      });
    }, { threshold: 0.4 });

    sections.forEach(s => spy.observe(s));
  }
}

/* ---------- init ---------- */

document.addEventListener('DOMContentLoaded', () => {
  typeCode();
  initReveal();
  initNav();
});