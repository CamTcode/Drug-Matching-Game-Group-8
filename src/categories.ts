export const CATEGORIES = [
  { key: 'generic_name', label: 'Generic Name' },
  { key: 'trade_name', label: 'Trade Name' },
  { key: 'disease_treated', label: 'Disease treated' },
  { key: 'pathway_targeted', label: 'Pathway targeted' },
] as const;

export type CategoryKey = (typeof CATEGORIES)[number]['key'];

export const MIN_CATEGORIES = 2;
