const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const src = {root: path.resolve(__dirname, 'src/')};
Object.assign(src, {
  videos: path.resolve(src.root, 'videos/'),
  images: path.resolve(src.root, 'images/'),
  fonts: path.resolve(src.root, 'fonts/'),
  icons: path.resolve(src.root, 'icons/'),
  pug: path.resolve(src.root, 'pug/')
});

const dist = {root: path.resolve(__dirname, 'dist/')};

const config = {
  context: src.root,
  entry: './',
  resolve: {
    alias: {
      Videos: src.videos,
      Images: src.images,
      Fonts: src.fonts,
      vue: 'vue/dist/vue.common.js'
    }
  },
  output: {
    path: dist.root,
    filename: './js/app.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: src.root,
        loader: 'babel-loader'
      },
      {
        test: /\.styl$/,
        include: src.root,
        use: ExtractTextPlugin.extract({
          fallback: {loader: 'style-loader', options: {sourceMap: true}},
          publicPath: '../',
          use: [
            {loader: 'css-loader', options: {sourceMap: true}},
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
                plugins: [
                  require('autoprefixer')
                ]
              }
            },
            {loader: 'stylus-loader', options: {sourceMap: true}}
          ]
        })
      },
      {
        test: /\.(gif|png|jpe?g|svg|woff|woff2|mp4)$/,
        include: src.root,
        exclude: src.icons,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.svg$/,
        include: src.icons,
        use: ['svg-sprite-loader', 'svgo-loader']
      },
      {
        test: /\.pug$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].html',
              context: src.pug
            }
          },
          'extract-loader',
          {
            loader: 'html-loader',
            options: {
              interpolate: true
            }
          },
          {
            loader: 'pug-html-loader',
            options: {
              pretty: true,
              exports: false,
              doctype: 'html',
              basedir: src.pug,
              data: {
                data() {
                  return JSON.parse(fs.readFileSync(path.resolve(src.pug, 'data/global.json'), 'utf8'));
                }
              },
              filters: {
                // filter for include json data as empty string
                'json-watch': () => ''
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: './styles/app.css'
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      "window.jQuery": "jquery"
    })
  ]
};

module.exports = config;
