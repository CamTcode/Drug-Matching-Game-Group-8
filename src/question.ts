type MatchPair = readonly [prompt: string, answer: string];

function shuffle<T>(values: Iterable<T>): T[] {
  // Shuffle a copy so the caller's data stays in its original order.
  const items = [...values];
  for (let i = items.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [items[i], items[j]] = [items[j], items[i]];
  }
  return items;
}

export function generateQuestion(pairs: readonly MatchPair[]) {
  const prompts = new Set(pairs.map(([prompt]) => prompt));
  const answers = new Set(pairs.map(([, answer]) => answer));

  for (const prompt of shuffle(prompts)) {
    const valid = new Set(
      pairs.filter(([clue]) => clue === prompt).map(([, answer]) => answer),
    );
    // Every valid match stays out of the wrong-answer pool.
    const wrong = [...answers].filter(answer => !valid.has(answer));
    if (wrong.length < 3) continue;

    const correct = shuffle(valid)[0];
    const choices = shuffle([correct, ...shuffle(wrong).slice(0, 3)]);
    return { prompt, choices, correct };
  }

  return null;
}
