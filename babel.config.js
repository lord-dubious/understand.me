module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // Add any additional Babel plugins here
      ['module-resolver', {
        root: ['./'],
        alias: {
          '@': './',
          '@components': './components',
          '@screens': './screens',
          '@services': './services',
          '@store': './store',
          '@utils': './utils',
          '@types': './types'
        }
      }]
    ],
  };
};
