const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Add support for additional file extensions
config.resolver.assetExts.push(
  // Audio formats
  'mp3',
  'wav',
  'aac',
  'm4a',
  // Document formats
  'pdf',
  'doc',
  'docx',
  // Other formats
  'db',
  'sqlite'
);

// Add support for TypeScript and JSX
config.resolver.sourceExts.push('ts', 'tsx', 'js', 'jsx', 'json');

// Configure transformer for better performance
config.transformer = {
  ...config.transformer,
  babelTransformerPath: require.resolve('metro-react-native-babel-transformer'),
  minifierConfig: {
    mangle: {
      keep_fnames: true,
    },
  },
};

// Configure serializer for better bundle optimization
config.serializer = {
  ...config.serializer,
  customSerializer: null,
};

module.exports = config;
