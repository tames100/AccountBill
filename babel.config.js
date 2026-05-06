module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
    plugins: [
      // 如果有 reanimated，确保它在这里
      "react-native-reanimated/plugin",
    ],
  };
};