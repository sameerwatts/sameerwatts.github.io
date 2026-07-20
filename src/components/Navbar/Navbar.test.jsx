import { describe, it, expect, beforeEach } from 'vitest';
import { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Navbar from './Navbar.jsx';

function renderNavbar() {
  return render(
    <Navbar sticky={false} showLogo={false} navWrapperRef={createRef()} />,
  );
}

describe('Navbar', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
  });

  it('toggles the mobile menu open, then closes it when a link is clicked', async () => {
    const user = userEvent.setup();
    renderNavbar();
    const toggle = screen.getByRole('button', {
      name: /toggle navigation menu/i,
    });

    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await user.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'true');

    await user.click(screen.getByRole('link', { name: 'ABOUT' }));
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
  });

  it('switches the theme and persists the choice', async () => {
    const user = userEvent.setup();
    renderNavbar();

    await user.click(
      screen.getByRole('button', { name: /switch to dark mode/i }),
    );

    expect(document.documentElement).toHaveAttribute('data-theme', 'dark');
    expect(localStorage.getItem('theme')).toBe('dark');
    // The button now offers the opposite action.
    expect(
      screen.getByRole('button', { name: /switch to light mode/i }),
    ).toBeInTheDocument();
  });
});
