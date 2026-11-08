# Changelog

Where we will log major code publishes to the project. Follows the format inside of CONTRIBUTING.

## 2026-11-08

### Added
- Vitest + jsdom tests for the category selection screen (`src/main.test.ts`), covering category toggling and the Play button enabling at 2+ selected categories.
- `jsdom` as a dev dependency.

### Changed
- Coverage config in `vitest.config.ts` now includes `.js` files and excludes config files.
