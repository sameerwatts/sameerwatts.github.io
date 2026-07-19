import { useState } from 'react';

// Web3Forms delivers the message to your inbox. GitHub Pages is static and can't
// send email itself, so the form POSTs to their API. This key is meant to live
// in the page — it only lets visitors send YOU a message, nothing else.
const ACCESS_KEY = '34863606-ffac-4082-a182-ef746456311c';
const ENDPOINT = 'https://api.web3forms.com/submit';

// Simple state machine for the submit lifecycle so the UI (button label,
// disabled state, status message) all derive from one value.
// idle → submitting → success | error
export default function ContactForm() {
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');

    const form = e.target;
    const data = Object.fromEntries(new FormData(form));

    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ access_key: ACCESS_KEY, ...data }),
      });
      const result = await res.json();
      if (result.success) {
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch {
      // Network failure (offline, blocked request, etc.).
      setStatus('error');
    }
  };

  const submitting = status === 'submitting';

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      {/* Honeypot: real people never see or fill this; bots that auto-fill every
          field trip it and Web3Forms silently drops the submission. */}
      <input
        type="checkbox"
        name="botcheck"
        style={{ display: 'none' }}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <div className="contact-form-row">
        <div className="contact-field">
          <label htmlFor="cf-name">Name</label>
          <input
            id="cf-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            disabled={submitting}
          />
        </div>
        <div className="contact-field">
          <label htmlFor="cf-email">Email</label>
          <input
            id="cf-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            disabled={submitting}
          />
        </div>
      </div>

      <div className="contact-field">
        <label htmlFor="cf-message">Message</label>
        <textarea
          id="cf-message"
          name="message"
          rows="5"
          required
          disabled={submitting}
        ></textarea>
      </div>

      <button type="submit" className="contact-submit" disabled={submitting}>
        {submitting ? 'Sending…' : 'Send message'}
      </button>

      {/* aria-live so screen readers announce the outcome without moving focus. */}
      <p className="contact-status" role="status" aria-live="polite">
        {status === 'success' &&
          'Thanks — your message has been sent. I’ll get back to you soon.'}
        {status === 'error' &&
          'Something went wrong. Please try again, or email me directly.'}
      </p>
    </form>
  );
}
