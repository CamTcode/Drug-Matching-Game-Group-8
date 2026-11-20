// Reads text aloud using the browser's built-in text-to-speech.
// Must be called directly from a click/tap handler (phones block it otherwise).

// Terms the browser's voice tends to mispronounce. Each entry is
// [what appears on the card, how it should be spoken]. Add more as you find them.
// Matching ignores upper/lower case. Longer terms go first.
const PRONUNCIATIONS: [RegExp, string][] = [
  [/HMG-CoA/gi, 'H M G co A'],
  [/COPD/gi, 'C O P D'],
  [/GLP-1/gi, 'G L P 1'],
  [/angiotensin II/gi, 'angiotensin 2'],
];

// Turns the text shown on a card into text that sounds right when spoken.
export function toSpeakable(text: string): string {
  const fixed = PRONUNCIATIONS.reduce(
    (result, [pattern, spoken]) => result.replace(pattern, spoken),
    text,
  );
  // Read hyphens as pauses ("beta-2" -> "beta 2"), not as the word "minus"/"dash".
  return fixed.replace(/-/g, ' ');
}

// Keep a reference so the browser doesn't discard the utterance mid-speech.
let current: SpeechSynthesisUtterance | null = null;

export function speak(text: string) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

  const synth = window.speechSynthesis;

  // Only cancel if something is actually playing. Cancelling right before
  // speaking can make phone browsers ignore the first tap.
  if (synth.speaking || synth.pending) synth.cancel();

  const utterance = new SpeechSynthesisUtterance(toSpeakable(text));
  utterance.lang = 'en-US';
  utterance.rate = 0.9; // slightly slower helps with drug names

  current = utterance;
  synth.speak(current);
}
