module.exports = {
  modules: true,
  plugins: {
    'postcss-modules': {
      generateScopedName: '_[path]_[name]__[local]',
      globalModulePaths: [/src\/antd-theme\.less/],
    },
  },
};
