import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { CATEGORIES } from './categories';

const category = (label: string) => screen.getByRole('button', { name: label });
const play = () => screen.getByRole('button', { name: 'Play' });

function setup() {
  render(<App />);
  return userEvent.setup();
}

describe('page structure', () => {
  it('has the four category buttons', () => {
    setup();
    CATEGORIES.forEach(({ label }) => expect(category(label)).toBeInTheDocument());
    expect(screen.getAllByRole('button')).toHaveLength(CATEGORIES.length + 1);
  });

  it('starts with the Play button disabled', () => {
    setup();
    expect(play()).toBeDisabled();
  });

  it('starts with no categories selected', () => {
    setup();
    CATEGORIES.forEach(({ label }) =>
      expect(category(label)).toHaveAttribute('aria-pressed', 'false'),
    );
  });
});

describe('category toggling', () => {
  it('selects on click and deselects on second click', async () => {
    const user = setup();
    await user.click(category('Generic Name'));
    expect(category('Generic Name')).toHaveAttribute('aria-pressed', 'true');
    await user.click(category('Generic Name'));
    expect(category('Generic Name')).toHaveAttribute('aria-pressed', 'false');
  });

  it.each(CATEGORIES.map((c) => c.label))(
    '%s toggles independently of the others',
    async (label) => {
      const user = setup();
      await user.click(category(label));
      CATEGORIES.forEach((c) =>
        expect(category(c.label)).toHaveAttribute(
          'aria-pressed',
          String(c.label === label),
        ),
      );
    },
  );
});

describe('Play button enabling', () => {
  it('stays disabled with 1 selected', async () => {
    const user = setup();
    await user.click(category('Generic Name'));
    expect(play()).toBeDisabled();
  });

  it('enables at exactly 2 selected', async () => {
    const user = setup();
    await user.click(category('Generic Name'));
    await user.click(category('Trade Name'));
    expect(play()).toBeEnabled();
  });

  it('stays enabled at 3 and 4 selected', async () => {
    const user = setup();
    await user.click(category('Generic Name'));
    await user.click(category('Trade Name'));
    await user.click(category('Disease treated'));
    expect(play()).toBeEnabled();
    await user.click(category('Pathway targeted'));
    expect(play()).toBeEnabled();
  });

  it('re-disables when deselected back down to 1', async () => {
    const user = setup();
    await user.click(category('Generic Name'));
    await user.click(category('Trade Name'));
    expect(play()).toBeEnabled();
    await user.click(category('Trade Name'));
    expect(play()).toBeDisabled();
  });

  it('works for any pair of categories', async () => {
    const user = setup();
    await user.click(category('Disease treated'));
    await user.click(category('Pathway targeted'));
    expect(play()).toBeEnabled();
  });
});
