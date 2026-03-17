export const GenderOptions = [
  { label: 'Male' },
  { label: 'Female' },
  { label: 'Other' },
  { label: 'Unknown' },
];

export const RaceOptions = [
  { label: 'Saiyan' },
  { label: 'Namekian' },
  { label: 'Human' },
  { label: 'Majin' },
  { label: 'Frieza Race' },
  { label: 'Jiren Race' },
  { label: 'Android' },
  { label: 'God' },
  { label: 'Angel' },
  { label: 'Evil' },
  { label: 'Unknown' },
  { label: 'Nucleico benigno' },
  { label: 'Nucleico' },
];

export const AffiliationOptions = [
  { label: 'Z Fighter' },
  { label: 'Red Ribbon Army' },
  { label: 'Namekian Warrior' },
  { label: 'Freelancer' },
  { label: 'Army of Frieza' },
  { label: 'Other' },
  { label: 'Pride Troopers' },
  { label: 'Assistant of Vermoud' },
  { label: 'Assistant of Beerus' },
  { label: 'Villain' },
];

export interface Filters {
  gender?: (typeof GenderOptions)[number]['label'];
  race?: (typeof RaceOptions)[number]['label'];
  affiliation?: (typeof AffiliationOptions)[number]['label'];
  name?: string;
}
