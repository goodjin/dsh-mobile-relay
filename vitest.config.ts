import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['tests/**/*.spec.ts'],
    // Node everywhere except the files that drive a real DOM (jsdom):
    // the mobile hub app boots into window/sessionStorage and the
    // relay tests assert through the live page shell.
    environment: 'node',
    environmentMatchGlobs: [
      ['tests/mobile-entry/app.spec.ts', 'jsdom'],
      ['tests/mobile-entry/hub-app.spec.ts', 'jsdom'],
    ],
  },
})
