const env = process.env.NODE_ENV;
const isDev = env === 'development';
const isProd = env === 'production';
const isTest = env === 'test';

module.exports = {
  env,
  isDev,
  isProd,
  isTest,
  input: 'src',
  output: 'dist',
  devServerTarget: 'localhost:5555',
  rollup: {
    watchDir: 'src/scripts/**/*',
    input: 'src/scripts/index.ts',
  },
};
