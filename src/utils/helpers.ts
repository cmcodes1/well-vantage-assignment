/** String / formatting helpers */

/**
 * Capitalize the first letter of a string.
 */
export const capitalize = (s: string): string =>
  s.charAt(0).toUpperCase() + s.slice(1);

/**
 * Truncate a string with ellipsis.
 */
export const truncate = (s: string, maxLength: number): string =>
  s.length > maxLength ? `${s.slice(0, maxLength)}…` : s;

/**
 * Simple email validation.
 */
export const isValidEmail = (email: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

/**
 * Format a number as compact (1.2K, 3.4M, etc.)
 */
export const formatCompact = (n: number): string => {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toString();
};

/**
 * Format a date string to a readable form.
 */
export const formatDate = (dateStr: string, locale = 'en-US'): string =>
  new Date(dateStr).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
