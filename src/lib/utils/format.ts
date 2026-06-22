/**
 * Locale formatters — EN-only build.
 *
 * Policy (locked, user decision 2026-06-22):
 *   • Site is English-only. Bilingual support deferred to a future phase.
 *   • Numbers always render in Latin digits (0–9).
 *   • Dates always use the Gregorian calendar.
 *
 * All formatting still goes through Intl.* per DESIGN.md §5 — never hand-roll.
 * When the Arabic layer is re-introduced later, switch these helpers to accept
 * a Lang parameter and use BCP-47 extensions (`-u-nu-latn-ca-gregory`) on the
 * Arabic locale to keep the Latin-numeral / Gregorian-date contract.
 */

const LOCALE = 'en-US';

export const fmtNumber = (n: number, opts?: Intl.NumberFormatOptions): string =>
  new Intl.NumberFormat(LOCALE, opts).format(n);

export const fmtDate = (
  date: Date | string | number,
  opts?: Intl.DateTimeFormatOptions
): string =>
  new Intl.DateTimeFormat(LOCALE, opts ?? { year: 'numeric', month: 'long', day: 'numeric' }).format(
    typeof date === 'string' || typeof date === 'number' ? new Date(date) : date
  );

export const fmtList = (items: readonly string[]): string =>
  new Intl.ListFormat(LOCALE, { style: 'long', type: 'conjunction' }).format(items);
