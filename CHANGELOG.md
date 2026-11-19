# Changelog

Where we will log major code publishes to the project. Follows the format inside of CONTRIBUTING.

## Unreleased

### Added

- A local command that checks whether Supabase returns a linked drug record.
- A standalone question generator draft and tests for distinct cards, shared study terms, and insufficient data.

## 2026-11-08

### Added
- Category selection screen (`src/index.html`, `src/main.css`, `src/main.js`). Players pick at least two categories (Generic Name, Trade Name, Disease Treated, Pathway Targeted), and the Play button stays disabled until they do.
- Vitest + jsdom tests for the category selection screen (`src/main.test.ts`), covering category toggling and the Play button enabling at 2+ selected categories.
- `jsdom` as a dev dependency.

### Changed
- Coverage config in `vitest.config.ts` now includes `.js` files and excludes config files.


## 2026-11-19

### Added
- A local command that checks whether Supabase returns a linked drug record.
- A standalone question generator draft and tests for distinct cards, shared study terms, and insufficient data.
- Game screen (`src/App.tsx`, `src/main.css`) shown after pressing Play, with one column per selected category and five selectable placeholder tiles per column. Each tile has a unique id (`tile-<category>-<index>`) and toggles a selected style on click.
- Tests for the game screen, tile grid, tile selection, and quitting (`src/App.test.tsx`).

### Changed
- Play button now switches to the game screen, and Quit returns to the menu.
