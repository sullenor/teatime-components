'use strict';

const {compose, curry} = require('../lib/dash');
const {dirname} = require('path');
const {version} = require('../package');
const merge = require('./merge');
const resolveTo = require('./resolveTo');

const replace = curry((reg, sub, s) => s.replace(reg, sub));
const rootDir = dirname(__dirname);

const minorVersion = version.split('.').slice(0, 2).join('.');

module.exports = {
  title: `${version} / Teatime Components`,
  getExampleFilename: compose(
    replace(/\.js$/, '.md'),
    replace(/\/component\//, '/\.story/')),

  sections: [
    {
      name: 'Components',
      components: resolveTo('component/*.js'),
    },
    {
      name: 'Dimensions',
      content: resolveTo('.story/docs/dimensions.md'),
    },
  ],

  updateWebpackConfig: merge({
    entry: [
      resolveTo('.config/common.css'),
    ],

    target: 'web',
    node: {
      Buffer: false,
    },

    module: {
      loaders: [
        {
          test: /\.js$/i,
          include: new RegExp(`${rootDir}/(component|decorator|lib|view)/`),
          loader: 'babel-loader',
        },
        {
          test: /\.css$/i,
          include: resolveTo('style'),
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                localIdentName: '[name]--[local]',
                modules: true,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                config: resolveTo('.config/postcss.config.js'),
              },
            },
          ],
        },
        {
          test: /\.css$/i,
          include: resolveTo('.config'),
          loader: [
            'style-loader',
            'css-loader',
          ],
        },
      ],
    },
  }),

  styleguideDir: resolveTo(`docs/${minorVersion}`),
};
