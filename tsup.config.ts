import { defineConfig } from 'tsup'
import config from './package.json'

// biome-ignore lint/nursery/noDefaultExport: <explanation>
export  default defineConfig({
  name: config.name,
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  treeshake: true,
  sourcemap: true,
  clean: true
})
