type StudyPair = readonly [studyTerm: string, matchingTerm: string];

function shuffle<T>(values: Iterable<T>): T[] {
  // Shuffle a copy so the caller's data stays in its original order.
  const items = [...values];
  for (let i = items.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [items[i], items[j]] = [items[j], items[i]];
  }
  return items;
}

export function generateQuestion(studyPairs: readonly StudyPair[]) {
  const studyTerms = new Set(studyPairs.map(([studyTerm]) => studyTerm));
  const cardTerms = new Set(studyPairs.map(([, matchingTerm]) => matchingTerm));

  for (const studyTerm of shuffle(studyTerms)) {
    const validMatches = new Set(
      studyPairs.filter(([term]) => term === studyTerm).map(([, matchingTerm]) => matchingTerm),
    );
    // Other valid matches cannot be shown as incorrect cards.
    const nonMatchingTerms = [...cardTerms].filter(term => !validMatches.has(term));
    if (nonMatchingTerms.length < 3) continue;

    const correctMatch = shuffle(validMatches)[0];
    const cardOptions = shuffle([correctMatch, ...shuffle(nonMatchingTerms).slice(0, 3)]);
    return { studyTerm, cardOptions, correctMatch };
  }

  return null;
}
