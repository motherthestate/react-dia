import { defineConfig } from 'vite'
import { resolve } from 'path'
import react from '@vitejs/plugin-react-swc'
import dts from 'vite-plugin-dts'
import resolvePlugin from 'vite-plugin-resolve'

export default defineConfig(({ mode, command }) => {
  return {
    plugins:
      mode === 'development'
        ? [react(), dts({ rollupTypes: true })]
        : [react(), resolvePlugin({ react: {} }), dts({ rollupTypes: true })],
    resolve: {},
    build: {
      lib: {
        // Could also be a dictionary or array of multiple entry points
        entry: resolve(__dirname, 'lib/main.ts'),
        name: 'react-dia',
        formats: ['es', 'umd', 'cjs'],
        // the proper extensions will be added
        fileName: 'dia',
      },
      rollupOptions: {
        // make sure to externalize deps that shouldn't be bundled
        // into your library
        external: [
          'react',
          'react/jsx-runtime',
          'react-dom',
          '@radix-ui/react-slot',
          'react-hotkeys-hook',
          'focus-trap-react',
          'usehooks-ts',
          'embla-carousel-react',
          'react-zoom-pan-pinch',
          'react-use-measure',
        ],
        output: {
          globals: {
            react: 'react',
            'react-dom': 'ReactDOM',
            'react/jsx-runtime': 'react/jsx-runtime',
          },
        },
      },
    },
  }
})
