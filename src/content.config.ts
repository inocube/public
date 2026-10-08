import { defineCollection, reference } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';

// All texts come from doc/content/web-copy-sk.md (ADR 0003). The schemas make the build fail
// when a required text is missing, instead of silently rendering an empty section.

const packages = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/packages' }),
  schema: z.object({
    order: z.number().int(),
    title: z.string(),
    /** Short label for navigation and the footer. */
    navLabel: z.string(),
    forWhom: z.string(),
    deliverables: z.array(z.string()).min(1),
    /** Either numbered steps or one sentence. */
    process: z.union([z.array(z.string()).min(1), z.string()]),
    reference: z.object({ label: z.string(), text: z.string() }),
    caseStudies: z.array(reference('caseStudies')).default([]),
  }),
});

const caseStudies = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/case-studies' }),
  schema: z.object({
    order: z.number().int(),
    title: z.string(),
    /** May contain Markdown links: [text](https://...). */
    challenge: z.string(),
    solution: z.string(),
    technologies: z.array(z.string()).min(1),
    result: z.string(),
    /** Clarifying note shown under the result (e.g. figures that are not Inocube's own). */
    note: z.string().optional(),
  }),
});

const home = defineCollection({
  loader: file('./src/content/site/home.yaml'),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    hero: z.object({ heading: z.string(), lead: z.string(), cta: z.string() }),
    reasons: z.object({ heading: z.string(), items: z.array(z.string()).length(3) }),
    packages: z.object({ heading: z.string() }),
    process: z.object({ heading: z.string(), lead: z.string(), package: reference('packages') }),
    caseStudies: z.object({ heading: z.string(), lead: z.string() }),
    cta: z.object({ heading: z.string() }),
  }),
});

const company = defineCollection({
  loader: file('./src/content/site/company.yaml'),
  schema: z.object({
    brand: z.string(),
    legalName: z.string(),
    tagline: z.string(),
    address: z.object({ street: z.string(), postalCode: z.string(), city: z.string() }),
    ico: z.string(),
    dic: z.string(),
    icDph: z.string(),
    email: z.email(),
    phone: z.string(),
  }),
});

const ui = defineCollection({
  loader: file('./src/content/site/ui.yaml'),
  schema: z.object({
    skipLink: z.string(),
    homeLabel: z.string(),
    mainNav: z.string(),
    menuOpen: z.string(),
    menuClose: z.string(),
    nav: z.object({ caseStudies: z.string(), contact: z.string() }),
    package: z.object({
      forWhom: z.string(),
      deliverables: z.string(),
      process: z.string(),
      more: z.string(),
      relatedCaseStudies: z.string(),
    }),
    caseStudy: z.object({
      challenge: z.string(),
      solution: z.string(),
      technologies: z.string(),
      result: z.string(),
      more: z.string(),
    }),
    caseStudiesPage: z.object({ title: z.string(), lead: z.string(), description: z.string() }),
    contactPage: z.object({
      title: z.string(),
      description: z.string(),
      companyHeading: z.string(),
      formHeading: z.string(),
      formNotice: z.string(),
      formName: z.string(),
      formEmail: z.string(),
      formMessage: z.string(),
      formSubmit: z.string(),
    }),
    footer: z.object({
      contactHeading: z.string(),
      companyHeading: z.string(),
      navHeading: z.string(),
      email: z.string(),
      phone: z.string(),
      ico: z.string(),
      dic: z.string(),
      icDph: z.string(),
      rights: z.string(),
    }),
    notFound: z.object({ title: z.string(), text: z.string(), back: z.string() }),
    ctaMailSubject: z.string(),
  }),
});

export const collections = { packages, caseStudies, home, company, ui };
