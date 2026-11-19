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

const quit = () => screen.getByRole('button', { name: 'Quit' });
const card = (key: string) => document.getElementById(`card-${key}`);
const tile = (key: string, i: number) =>
  document.getElementById(`tile-${key}-${i}`) as HTMLElement;

async function startGame(
  user: ReturnType<typeof userEvent.setup>,
  labels: string[] = ['Generic Name', 'Trade Name'],
) {
  for (const label of labels) await user.click(category(label));
  await user.click(play());
}

describe('starting the game', () => {
  it('replaces the menu with the game screen', async () => {
    const user = setup();
    await startGame(user);
    expect(
      screen.queryByRole('heading', { name: 'Pharmacy Matching Game' }),
    ).not.toBeInTheDocument();
    expect(quit()).toBeInTheDocument();
  });

  it('shows one column per selected category and none for the rest', async () => {
    const user = setup();
    await startGame(user, ['Generic Name', 'Trade Name', 'Disease treated']);
    CATEGORIES.forEach(({ key, label }, index) => {
      if (index < 3) {
        expect(card(key)).toBeInTheDocument();
        expect(card(key)).toHaveTextContent(label);
      } else {
        expect(card(key)).not.toBeInTheDocument();
      }
    });
  });

  it.each([2, 3, 4])('creates %i columns when %i are selected', async (count) => {
    const user = setup();
    await startGame(user, CATEGORIES.slice(0, count).map((c) => c.label));
    expect(document.querySelectorAll('.card')).toHaveLength(count);
  });
});

describe('tile grid', () => {
  it('renders five tiles in every column', async () => {
    const user = setup();
    await startGame(user);
    ['generic_name', 'trade_name'].forEach((key) =>
      expect(card(key)!.querySelectorAll('.match_tile')).toHaveLength(5),
    );
  });

  it('gives every tile a unique id', async () => {
    const user = setup();
    await startGame(user, CATEGORIES.map((c) => c.label));
    const ids = Array.from(document.querySelectorAll('.match_tile')).map((el) => el.id);
    expect(ids).toHaveLength(CATEGORIES.length * 5);
    expect(new Set(ids).size).toBe(ids.length);
    expect(ids).toContain('tile-generic_name-0');
    expect(ids).toContain('tile-pathway_targeted-4');
  });

  it('tags each tile with its category and index', async () => {
    const user = setup();
    await startGame(user);
    expect(tile('trade_name', 3)).toHaveAttribute('data-category', 'trade_name');
    expect(tile('trade_name', 3)).toHaveAttribute('data-index', '3');
  });
});

describe('tile selection', () => {
  it('starts with no tiles selected', async () => {
    const user = setup();
    await startGame(user);
    expect(document.querySelectorAll('.match_tile.selected')).toHaveLength(0);
  });

  it('selects on click and deselects on second click', async () => {
    const user = setup();
    await startGame(user);
    await user.click(tile('generic_name', 0));
    expect(tile('generic_name', 0)).toHaveClass('selected');
    await user.click(tile('generic_name', 0));
    expect(tile('generic_name', 0)).not.toHaveClass('selected');
  });

  it('does not affect other tiles in the same or another column', async () => {
    const user = setup();
    await startGame(user);
    await user.click(tile('generic_name', 0));
    expect(tile('generic_name', 1)).not.toHaveClass('selected');
    expect(tile('trade_name', 0)).not.toHaveClass('selected');
  });

  it('allows several tiles to be selected at once', async () => {
    const user = setup();
    await startGame(user);
    await user.click(tile('generic_name', 0));
    await user.click(tile('trade_name', 2));
    expect(document.querySelectorAll('.match_tile.selected')).toHaveLength(2);
  });
});

describe('quitting', () => {
  it('returns to the menu', async () => {
    const user = setup();
    await startGame(user);
    await user.click(quit());
    expect(
      screen.getByRole('heading', { name: 'Pharmacy Matching Game' }),
    ).toBeInTheDocument();
  });

  it('keeps the category choices, so Play is still enabled', async () => {
    const user = setup();
    await startGame(user);
    await user.click(quit());
    expect(category('Generic Name')).toHaveAttribute('aria-pressed', 'true');
    expect(category('Trade Name')).toHaveAttribute('aria-pressed', 'true');
    expect(play()).toBeEnabled();
  });

  it('clears tile selections when a new game starts', async () => {
    const user = setup();
    await startGame(user);
    await user.click(tile('generic_name', 0));
    await user.click(quit());
    await user.click(play());
    expect(tile('generic_name', 0)).not.toHaveClass('selected');
  });

  it('shows the new categories after changing the selection', async () => {
    const user = setup();
    await startGame(user);
    await user.click(quit());
    await user.click(category('Disease treated'));
    await user.click(play());
    expect(card('disease_treated')).toBeInTheDocument();
  });
});
