import { afterEach, describe, expect, it, vi } from 'vitest';
import { generateQuestion } from './question';

// Pasted sample records keep the tests independent of the hosted database.
const pairs = [
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
    const question = generateQuestion(pairs.map(([drug, disease]) => [disease, drug]));
    const cards = question?.choices ?? [];
    const validDrugs = ['Sertraline', 'Escitalopram'];
    const validCards = cards.filter(card => validDrugs.includes(card));

    expect(question?.prompt).toBe('Depressive disorder');
    expect(cards).toHaveLength(4);
    expect(new Set(cards).size).toBe(4);
    expect(validCards).toEqual([question?.correct]);

    console.log([
      `Prompt: ${question?.prompt}`,
      `Valid matches in these records: ${validDrugs.join(', ')}`,
      `Cards: ${cards.join(' | ')}`,
      `PASS: Only ${question?.correct} is a valid match among the cards shown.`,
    ].join('\n'));
  });

  it('shuffles the cards while keeping the same correct answer', () => {
    const random = vi.spyOn(Math, 'random').mockReturnValue(0.99);
    const first = generateQuestion(pairs);
    random.mockReturnValue(0.6);
    const second = generateQuestion(pairs);

    expect(second?.prompt).toBe('Sertraline');
    expect(second?.correct).toBe('Depressive disorder');
    expect(second?.choices).not.toEqual(first?.choices);
    expect(new Set(second?.choices)).toEqual(new Set(first?.choices));
  });

  it('returns no question when four rows have only three distinct answers', () => {
    expect(generateQuestion(pairs.slice(0, 4))).toBeNull();
  });
});
