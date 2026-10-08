import { getCollection, getEntry } from 'astro:content';

/** Only Slovak exists today; English will add 'en' entries to the same data files. */
export type Locale = 'sk';

function required<T>(entry: T | undefined, what: string): T {
  if (!entry) throw new Error(`Missing content entry: ${what}`);
  return entry;
}

export const getUi = async (locale: Locale = 'sk') =>
  required(await getEntry('ui', locale), `ui/${locale}`).data;
export const getHome = async (locale: Locale = 'sk') =>
  required(await getEntry('home', locale), `home/${locale}`).data;
export const getCompany = async () => required(await getEntry('company', 'main'), 'company/main').data;

export async function getPackages() {
  const entries = await getCollection('packages');
  return entries.sort((a, b) => a.data.order - b.data.order);
}

export async function getCaseStudies() {
  const entries = await getCollection('caseStudies');
  return entries.sort((a, b) => a.data.order - b.data.order);
}

export const packageUrl = (id: string) => `/sluzby/${id}/`;
export const caseStudyUrl = (id: string) => `/referencie/#${id}`;

export function mailtoHref(email: string, subject?: string) {
  return subject ? `mailto:${email}?subject=${encodeURIComponent(subject)}` : `mailto:${email}`;
}

export function telHref(phone: string) {
  return `tel:${phone.replace(/[^+\d]/g, '')}`;
}

const escapeHtml = (text: string) =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/**
 * Renders the only Markdown the copy uses inside frontmatter: links in the form [text](https://...).
 * Everything else is escaped, so the result is safe for `set:html`.
 */
export function inlineMarkdown(text: string) {
  return escapeHtml(text).replace(
    /\[([^\]]+)\]\((https:\/\/[^)\s]+)\)/g,
    (_match, label: string, href: string) => `<a href="${href}" rel="noopener">${label}</a>`,
  );
}
