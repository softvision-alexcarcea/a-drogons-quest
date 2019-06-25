import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/quest.js',
    name: 'quest',
    format: 'iife'
  },
  plugins: [
    terser({
      mangle: {
        properties: {
          keep_quoted: 'strict'
        }
      }
    })
  ]
}