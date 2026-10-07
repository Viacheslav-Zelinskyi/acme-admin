import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
  clean: true,
  // React is a peer dependency and must not be bundled
  external: ['react', 'react-dom', 'react/jsx-runtime'],
});
