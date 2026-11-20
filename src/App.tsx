import { useState } from 'react';
import logo from './images/logo_v1.png';
import { CATEGORIES, MIN_CATEGORIES, type CategoryKey } from './categories';
import SpeakerButton from './SpeakerButton';

// TODO: temporary placeholder text so the speaker button can be tested.
// Remove once tiles are filled from the database.
const SAMPLE_TERMS = ['Metoprolol', 'Atorvastatin', 'Sertraline', 'Amlodipine', 'Albuterol'];

// Game is its own component, defined outside App
function Game({
  categories,
  onBack,
}: {
  categories: Set<CategoryKey>;
  onBack: () => void;
}) {
  const chosen = CATEGORIES.filter(({ key }) => categories.has(key));
  const [picked, setPicked] = useState<string[]>([]);

  function handleTileClick(id: string) {
    setPicked((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  }

  return (
    <div id="main">
      <div id="cards">
        {chosen.map(({ key, label }) => (
          <div key={key} id={`card-${key}`} className="card">
            {label}
            {Array.from({ length: 5 }).map((_, i) => {
              const tileId = `${key}-${i}`;
              const text = SAMPLE_TERMS[i];     // TODO: replace with the term from the database
              return (
                <div key={i} className="tile_wrap">
                  <button
                    id={`tile-${tileId}`}
                    className={picked.includes(tileId) ? 'match_tile selected' : 'match_tile'}
                    data-category={key}
                    data-index={i}
                    onClick={() => handleTileClick(tileId)}
                  >
                    {text}
                  </button>
                  <SpeakerButton text={text} />
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <button id="quit_btn" type="button" onClick={onBack}>
        Quit
      </button>
    </div>
  );
}

export default function App() {
  // 1. state (always at the top)
  const [selected, setSelected] = useState<Set<CategoryKey>>(new Set());
  const [screen, setScreen] = useState<'menu' | 'game'>('menu');

  // 2. helper functions
  function toggle(key: CategoryKey) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  }

  // 3. game screen
  if (screen === 'game') {
    return <Game categories={selected} onBack={() => setScreen('menu')} />;
  }

  // 4. menu screen (default)
  return (
    <div id="main">
      <img src={logo} alt="Pharmacy Matching Game logo" />
      <h1>Pharmacy Matching Game</h1>
      <p>Pick at least {MIN_CATEGORIES} categories</p>
      <div id="buttons">
        {CATEGORIES.map(({ key, label }) => (
          <button
            key={key}
            type="button"
            className={selected.has(key) ? 'selected' : undefined}
            aria-pressed={selected.has(key)}
            onClick={() => toggle(key)}
          >
            {label}
          </button>
        ))}
      </div>
      <button
        id="start_btn"
        type="button"
        disabled={selected.size < MIN_CATEGORIES}
        onClick={() => setScreen('game')}
      >
        Play
      </button>
    </div>
  );
}
