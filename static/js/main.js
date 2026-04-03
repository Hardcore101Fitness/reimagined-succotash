/* ============================================================
   HARDCORE FITNESS 101 — MAIN JS
   ============================================================ */

/* ---------- Sticky header ---------- */
const header = document.getElementById('site-header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

/* ---------- Mobile hamburger menu ---------- */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', String(isOpen));
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

// Close nav when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  });
});

/* ---------- FAQ accordion ---------- */
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    const answerId = btn.getAttribute('aria-controls');
    const answer   = document.getElementById(answerId);

    // Collapse all others
    document.querySelectorAll('.faq-question').forEach(other => {
      if (other !== btn) {
        other.setAttribute('aria-expanded', 'false');
        const otherId = other.getAttribute('aria-controls');
        document.getElementById(otherId).hidden = true;
      }
    });

    // Toggle current
    btn.setAttribute('aria-expanded', String(!expanded));
    answer.hidden = expanded;
  });
});

/* ---------- Trial form submission ---------- */
const form        = document.getElementById('trial-form');
const formSuccess = document.getElementById('form-success');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const payload = {
    first_name: form.first_name.value.trim(),
    phone:      form.phone.value.trim(),
    email:      form.email.value.trim(),
  };

  const submitBtn = form.querySelector('[type="submit"]');
  submitBtn.disabled = true;
  submitBtn.textContent = 'Submitting…';

  try {
    const res  = await fetch('/submit-trial', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(payload),
    });
    const data = await res.json();

    if (data.success) {
      form.hidden = true;
      formSuccess.hidden = false;
    } else {
      alert(data.message || 'Something went wrong. Please try again.');
      submitBtn.disabled = false;
      submitBtn.textContent = 'Claim Your 21 Day Trial';
    }
  } catch {
    alert('Network error. Please try again.');
    submitBtn.disabled = false;
    submitBtn.textContent = 'Claim Your 21 Day Trial';
  }
});

/* ---------- Footer year ---------- */
const yearEl = document.getElementById('footer-year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
