import { defineConfig } from 'vitest/config'

// biome-ignore lint/nursery/noDefaultExport: <explanation>
export  default defineConfig({
  test: {
    include: ['src/**/*.{test,spec}.ts'],
    typecheck: {
      include: ['src/**/*.{test,spec}-d.ts']
    }
  }
})
