const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Add .jsx to the supported extensions
config.resolver.sourceExts = [...config.resolver.sourceExts, 'jsx'];

module.exports = config;