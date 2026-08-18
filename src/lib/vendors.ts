export const VENDORS = [
  "JEPHERSON PEREZ",
  "GUSTAVO ROSALES",
  "FRANKLIN SEGOVIA",
] as const;

export type VendorName = (typeof VENDORS)[number];

export const VENDOR_ACCOUNTS: { name: VendorName; email: string }[] = [
  { name: "JEPHERSON PEREZ", email: "jepherson@aruca.com" },
  { name: "GUSTAVO ROSALES", email: "gustavo@aruca.com" },
  { name: "FRANKLIN SEGOVIA", email: "franklin@aruca.com" },
];

export function vendorNameByEmail(email: string): VendorName | null {
  const normalized = email.trim().toLowerCase();
  const match = VENDOR_ACCOUNTS.find((a) => a.email.toLowerCase() === normalized);
  return match ? match.name : null;
}
