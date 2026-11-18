export const CATEGORIES = [
  { key: 'generic_name', label: 'Generic Name' },
  { key: 'trade_name', label: 'Trade Name' },
  { key: 'disease_use', label: 'Disease treated' },
  { key: 'mechanism_of_action', label: 'Pathway targeted' },
] as const;

export type CategoryKey = (typeof CATEGORIES)[number]['key'];

export const MIN_CATEGORIES = 2;
