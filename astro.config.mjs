// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  site: 'https://inocube.sk',
  output: 'static',
  trailingSlash: 'always',
  integrations: [sitemap()],
  i18n: {
    // Slovak at "/", English will be added under "/en/" (roadmap phase 4).
    locales: ['sk'],
    defaultLocale: 'sk',
    routing: { prefixDefaultLocale: false },
  },
  // Inter (variable) comes from the @fontsource-variable/inter npm package and is served from our own
  // domain: no request to Google Fonts. Two subsets: latin, and latin-ext for Slovak diacritics.
  fonts: [
    {
      provider: fontProviders.local(),
      name: 'Inter',
      cssVariable: '--font-inter',
      fallbacks: ['sans-serif'],
      options: {
        variants: [
          {
            src: ['@fontsource-variable/inter/files/inter-latin-wght-normal.woff2'],
            weight: '100 900',
            style: 'normal',
            unicodeRange: [
              'U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD',
            ],
          },
          {
            src: ['@fontsource-variable/inter/files/inter-latin-ext-wght-normal.woff2'],
            weight: '100 900',
            style: 'normal',
            unicodeRange: [
              'U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF',
            ],
          },
        ],
      },
    },
  ],
});
