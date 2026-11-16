// Opens an email draft to the verified business address; visitors send it in their email app.
const CONTACT_EMAIL = 'giovanna@builtbygiovanna.com';

const toggle = document.querySelector('#menu-toggle');
const nav = document.querySelector('#primary-nav');
toggle.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') !== 'true';
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
  nav.classList.toggle('open', open);
});
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  toggle.setAttribute('aria-expanded','false');
  toggle.setAttribute('aria-label','Open navigation menu');
  nav.classList.remove('open');
}));
document.querySelector('#copyright-year').textContent = new Date().getFullYear();

const form = document.querySelector('#contact-form');
const status = document.querySelector('#form-status');
const submitButton = document.querySelector('#contact-submit');
const accessKey = form.elements.namedItem('access_key');
const ready = () => Boolean(accessKey.value.trim());
const idleMessage = () => ready()
  ? 'Your inquiry will be sent through Web3Forms to Giovanna.'
  : 'This opens your email app with a prepared inquiry. Press Send there to contact Giovanna.';
submitButton.textContent = ready() ? 'Send my inquiry ↗' : 'Open email draft ↗';
status.textContent = idleMessage();
let sending = false;
form.addEventListener('submit', async event => {
  event.preventDefault();
  if (sending || !form.reportValidity()) return;
  const values = new FormData(form);
  if (values.get('botcheck')) return;
  if (!ready()) {
    const subject = `Built by Giovanna inquiry: ${values.get('topic')}`;
    const body = `Name: ${values.get('name')}\nEmail: ${values.get('email')}\nTopic: ${values.get('topic')}\nTiming: ${values.get('timing') || 'Not specified'}\nBudget: ${values.get('budget') || 'Not specified'}\n\n${values.get('message')}`;
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    status.textContent = 'Your email app should open with the message ready. Please press Send there.';
    return;
  }
  sending = true;
  submitButton.disabled = true;
  submitButton.textContent = 'Sending…';
  form.setAttribute('aria-busy', 'true');
  status.textContent = 'Sending your inquiry…';
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20000);
  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
      body: JSON.stringify(Object.fromEntries(values)),
      signal: controller.signal
    });
    const result = await response.json();
    if (!response.ok || result.success !== true) throw new Error('Submission not accepted');
    status.textContent = 'Thanks! Your inquiry was submitted successfully. I look forward to hearing more about your project.';
    form.reset();
  } catch (error) {
    status.textContent = error.name === 'AbortError'
      ? 'We couldn’t confirm whether your inquiry arrived. Your text is still here. Please email giovanna@builtbygiovanna.com if you need help.'
      : 'We couldn’t confirm your inquiry was sent. Your text is still here—try again or email giovanna@builtbygiovanna.com.';
  } finally {
    clearTimeout(timeout);
    sending = false;
    submitButton.disabled = false;
    submitButton.textContent = 'Send my inquiry ↗';
    form.removeAttribute('aria-busy');
  }
});

// Keep the inquiry topic in step with the service the visitor chose.
document.querySelectorAll('[data-topic]').forEach(link => link.addEventListener('click', () => {
  document.querySelector('#topic').value = link.dataset.topic;
}));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && nav.classList.contains('open')) {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open navigation menu');
    toggle.focus();
  }
});
form.addEventListener('input', () => {
  if (!sending) status.textContent = idleMessage();
});
