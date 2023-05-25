const { extendDefaultPlugins } = require('svgo');

module.exports = {
  multipass: true, // boolean. false by default
  plugins: extendDefaultPlugins([
    {
      name: 'removeViewBox',
      active: false,
    },
    {
      name: 'convertPathData',
      active: false,
    },
    {
      name: 'convertTransform',
      active: false,
    },
    {
      name: 'collapseGroups',
      active: false,
    },
    {
      name: 'cleanupIDs',
      active: false,
    },
    {
      name: 'removeUselessStrokeAndFill',
      active: false,
    },
  ]),
  js2svg: {
    indent: 2, // string with spaces or number of spaces. 4 by default
    pretty: true, // boolean, false by default
  },
};
