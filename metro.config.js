const { getDefaultConfig } = require("@expo/metro-config");

const defaultConfig = getDefaultConfig(__dirname);

module.exports = defaultConfig;

defaultConfig.resolver.sourceExts.push(...['cjs', 'mjs', 'ts', 'tsx']);
