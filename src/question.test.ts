import { afterEach, describe, expect, it, vi } from 'vitest';
import { generateQuestion } from './question';

// Pasted sample records keep the tests independent of the hosted database.
const drugDiseasePairs = [
  ['Sertraline', 'Depressive disorder'],
  ['Escitalopram', 'Depressive disorder'],
  ['Amlodipine', 'Hypertension'],
  ['Atorvastatin', 'High cholesterol'],
  ['Albuterol', 'Asthma or COPD'],
] as const;

afterEach(() => vi.restoreAllMocks());

describe('generateQuestion', () => {
  it('shows only one valid drug for a disease shared by two drugs', () => {
    // Fix the shuffle so the terminal example shows the same cards each run.
    vi.spyOn(Math, 'random').mockReturnValue(0.99);
    const question = generateQuestion(drugDiseasePairs.map(([drug, disease]) => [disease, drug]));
    const cards = question?.cardOptions ?? [];
    const validDrugs = ['Sertraline', 'Escitalopram'];
    const validCards = cards.filter(card => validDrugs.includes(card));

    expect(question?.studyTerm).toBe('Depressive disorder');
    expect(cards).toHaveLength(4);
    expect(new Set(cards).size).toBe(4);
    expect(validCards).toEqual([question?.correctMatch]);

    console.log([
      `Study term: ${question?.studyTerm}`,
      `Valid matches in these records: ${validDrugs.join(', ')}`,
      `Card options: ${cards.join(' | ')}`,
      `PASS: Only ${question?.correctMatch} is a valid match among the cards shown.`,
    ].join('\n'));
  });

  it('shuffles the cards while keeping the same correct match', () => {
    const random = vi.spyOn(Math, 'random').mockReturnValue(0.99);
    const first = generateQuestion(drugDiseasePairs);
    random.mockReturnValue(0.6);
    const second = generateQuestion(drugDiseasePairs);

    expect(second?.studyTerm).toBe('Sertraline');
    expect(second?.correctMatch).toBe('Depressive disorder');
    expect(second?.cardOptions).not.toEqual(first?.cardOptions);
    expect(new Set(second?.cardOptions)).toEqual(new Set(first?.cardOptions));
  });

  it('returns no question when four rows have only three distinct card options', () => {
    expect(generateQuestion(drugDiseasePairs.slice(0, 4))).toBeNull();
  });
});
