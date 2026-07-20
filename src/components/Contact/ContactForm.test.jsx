import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactForm from './ContactForm.jsx';

const fetchMock = vi.fn();

async function fillAndSubmit(user) {
  await user.type(screen.getByLabelText('Name'), 'Jane Doe');
  await user.type(screen.getByLabelText('Email'), 'jane@example.com');
  await user.type(screen.getByLabelText('Message'), 'Hello there');
  await user.click(screen.getByRole('button', { name: /send message/i }));
}

describe('ContactForm', () => {
  beforeEach(() => {
    fetchMock.mockReset();
    vi.stubGlobal('fetch', fetchMock);
  });
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('shows a success message and clears the form after a successful send', async () => {
    fetchMock.mockResolvedValue({ json: async () => ({ success: true }) });
    const user = userEvent.setup();
    render(<ContactForm />);

    await fillAndSubmit(user);

    expect(
      await screen.findByText(/your message has been sent/i),
    ).toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledOnce();
    expect(screen.getByLabelText('Name')).toHaveValue('');
    expect(screen.getByLabelText('Message')).toHaveValue('');
  });

  it('shows an error message when the API reports failure', async () => {
    fetchMock.mockResolvedValue({ json: async () => ({ success: false }) });
    const user = userEvent.setup();
    render(<ContactForm />);

    await fillAndSubmit(user);

    expect(
      await screen.findByText(/something went wrong/i),
    ).toBeInTheDocument();
  });

  it('shows an error message when the request rejects (offline)', async () => {
    fetchMock.mockRejectedValue(new Error('network down'));
    const user = userEvent.setup();
    render(<ContactForm />);

    await fillAndSubmit(user);

    expect(
      await screen.findByText(/something went wrong/i),
    ).toBeInTheDocument();
  });
});
