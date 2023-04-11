import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['src/**/*.{test,spec}.ts'],
    typecheck: {
      include: ['src/**/*.{test,spec}-d.ts']
    }
  }
})
