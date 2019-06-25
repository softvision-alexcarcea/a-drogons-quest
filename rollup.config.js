import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/index.js',
  output: {
    file: 'q.js',
    name: 'q',
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