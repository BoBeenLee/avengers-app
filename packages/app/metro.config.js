/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const { getDefaultConfig } = require("metro-config");
const exclusionList = require('metro-config/src/defaults/exclusionList');
const path = require("path");

const installedDependencies = require("./package.json").dependencies;

const extraNodeModules = {};
Object.keys(installedDependencies).forEach(dep => {
  extraNodeModules[dep] = path.resolve(__dirname, "node_modules", dep);
});
extraNodeModules['@babel/runtime'] = path.resolve(__dirname, "node_modules", '@babel/runtime');

module.exports = (async () => {
  const {
    resolver: { sourceExts, assetExts }
  } = await getDefaultConfig();
  return {
    transformer: {
      babelTransformerPath: require.resolve("react-native-svg-transformer"),
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: false
        }
      })
    },
    resolver: {
      assetExts: assetExts.filter(ext => ext !== "svg"),
      sourceExts: [...sourceExts, "svg"],
      extraNodeModules,
      blacklistRE: exclusionList([/..\/shared\/node_modules\/react\/.*/, /..\/shared\/node_modules\/react-dom\/.*/])
    },
    watchFolders: [path.resolve(__dirname, "../shared/lib")],
    projectRoot: path.resolve(__dirname)
  };
})();
