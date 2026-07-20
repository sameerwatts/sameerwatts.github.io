import { describe, it, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Work from './Work.jsx';
import { works } from '../../data/works.js';

const first = works[0]; // Spark
const triggerName = new RegExp(`${first.title}.*view details`, 'i');

describe('Work', () => {
  it('opens a project dialog on click and closes it via the × button', async () => {
    const user = userEvent.setup();
    const { container } = render(<Work />);

    const trigger = screen.getByRole('button', { name: triggerName });
    const dialog = container.querySelector(`#work-dialog-${first.id}`);

    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(dialog).not.toHaveClass('show');

    await user.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(dialog).toHaveClass('show');

    // The dialog's only <button> is its × close control.
    await user.click(within(dialog).getByRole('button'));
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(dialog).not.toHaveClass('show');
  });

  it('closes the open dialog when Escape is pressed', async () => {
    const user = userEvent.setup();
    const { container } = render(<Work />);

    const trigger = screen.getByRole('button', { name: triggerName });
    const dialog = container.querySelector(`#work-dialog-${first.id}`);

    await user.click(trigger);
    expect(dialog).toHaveClass('show');

    await user.keyboard('{Escape}');
    expect(dialog).not.toHaveClass('show');
  });
});
