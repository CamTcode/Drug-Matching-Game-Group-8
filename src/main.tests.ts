// @vitest-environment jsdom
import { describe, it, expect, beforeEach } from 'vitest';
import { init, updateStartButton } from './main.js';

const PAGE = `
  <div id="main">
    <div id="buttons">
      <button id="Generic_Name">Generic Name</button>
      <button id="Trade_Name">Trade Name</button>
      <button id="Disease_Treated">Disease treated</button>
      <button id="Pathway_Targeted">Pathway targeted</button>
    </div>
    <button id="start_btn" disabled>Play</button>
  </div>
`;

const IDS = ['Generic_Name', 'Trade_Name', 'Disease_Treated', 'Pathway_Targeted'];

const btn = (id: string) => document.getElementById(id) as HTMLButtonElement;
const click = (id: string) => btn(id).click();
const playDisabled = () => btn('start_btn').disabled;

beforeEach(() => {
  // Fresh DOM each test, so listeners never leak between tests
  document.body.innerHTML = PAGE;
  init();
});

describe('page structure', () => {
  it('has the four category buttons', () => {
    IDS.forEach((id) => expect(btn(id)).not.toBeNull());
    expect(document.querySelectorAll('#buttons button')).toHaveLength(4);
  });

  it('starts with the Play button disabled', () => {
    expect(playDisabled()).toBe(true);
  });

  it('starts with no categories selected', () => {
    expect(document.querySelectorAll('#buttons .selected')).toHaveLength(0);
  });
});

describe('category toggling', () => {
  it('adds "selected" on click and removes it on second click', () => {
    click('Generic_Name');
    expect(btn('Generic_Name').classList.contains('selected')).toBe(true);
    click('Generic_Name');
    expect(btn('Generic_Name').classList.contains('selected')).toBe(false);
  });

  it.each(IDS)('%s toggles independently of the others', (id) => {
    click(id);
    expect(btn(id).classList.contains('selected')).toBe(true);
    IDS.filter((other) => other !== id).forEach((other) =>
      expect(btn(other).classList.contains('selected')).toBe(false),
    );
  });
});

describe('Play button enabling', () => {
  it('stays disabled with 0 selected', () => {
    expect(playDisabled()).toBe(true);
  });

  it('stays disabled with 1 selected', () => {
    click('Generic_Name');
    expect(playDisabled()).toBe(true);
  });

  it('enables at exactly 2 selected', () => {
    click('Generic_Name');
    click('Trade_Name');
    expect(playDisabled()).toBe(false);
  });

  it('stays enabled at 3 and 4 selected', () => {
    click('Generic_Name');
    click('Trade_Name');
    click('Disease_Treated');
    expect(playDisabled()).toBe(false);
    click('Pathway_Targeted');
    expect(playDisabled()).toBe(false);
  });

  it('re-disables when deselected back down to 1', () => {
    click('Generic_Name');
    click('Trade_Name');
    expect(playDisabled()).toBe(false);
    click('Trade_Name');
    expect(playDisabled()).toBe(true);
  });

  it('works for any pair of categories', () => {
    click('Disease_Treated');
    click('Pathway_Targeted');
    expect(playDisabled()).toBe(false);
  });
});

describe('updateStartButton', () => {
  it('reflects the current selection when called directly', () => {
    btn('Generic_Name').classList.add('selected');
    btn('Trade_Name').classList.add('selected');
    updateStartButton();
    expect(playDisabled()).toBe(false);

    btn('Trade_Name').classList.remove('selected');
    updateStartButton();
    expect(playDisabled()).toBe(true);
  });
});
