import { useState } from 'react';
import logo from './images/logo_v1.png';
import { CATEGORIES, MIN_CATEGORIES, type CategoryKey } from './categories';

export default function App() {
  const [selected, setSelected] = useState<Set<CategoryKey>>(new Set());

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
      >
        Play
      </button>
    </div>
  );
}
