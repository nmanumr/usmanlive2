const { nodeResolve } = require('@rollup/plugin-node-resolve');
const { terser } = require('rollup-plugin-terser');
const typescript = require('rollup-plugin-typescript2');
const path = require('path');

const { input, output } = require('./_config')

const inputOptions = {
  input: path.join(input, 'scripts/index.ts'),
  plugins: [
    nodeResolve(),
    typescript(),
    terser(),
  ],
}

const outputs = [
  { file: path.join(output, 'js/app.mjs'), format: 'esm' },
  { file: path.join(output, 'js/app.js'), format: 'iife' },
]

const outputOptions = outputs.map(output => {
  return {
    ...output,
    sourcemap: true,
    plugins: [terser()],
  };
});

const watchOptions = {
  ...inputOptions,
  output: outputOptions,
  watch: {
    chokidar: false,
    include: 'src/scripts/**/*',
  },
};

module.exports = {
  inputOptions,
  outputOptions,
  watchOptions,
};
