export const VENDORS = [
  "JEPHERSON PEREZ",
  "GUSTAVO ROSALES",
  "FRANKLIN SEGOVIA",
] as const;

export type VendorName = (typeof VENDORS)[number];
