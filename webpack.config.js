const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const config = {
  mode: process.argv.includes('--production') ? 'production' : 'development',
  entry: {
    // 'immediate-loading': './src/assets/scripts/immediate-loading.js',
    notFound: './src/assets/scripts/notFound.js',
    index: './src/assets/scripts/gulp-modules/index.js',
    header: './src/assets/scripts/modules/header/header.js',
    footer: './src/assets/scripts/modules/footer/footer.js',
    progress: './src/assets/scripts/gulp-modules/progress.js',
    promo: './src/assets/scripts/gulp-modules/promo.js',
    documents: './src/assets/scripts/gulp-modules/documents.js',
    present: './src/assets/scripts/gulp-modules/present.js',
    terms: './src/assets/scripts/gulp-modules/terms.js',
    project: './src/assets/scripts/gulp-modules/project.js',
    invest: './src/assets/scripts/gulp-modules/invest.js',
    floors: './src/assets/scripts/gulp-modules/floors.js',
    commercial: './src/assets/scripts/gulp-modules/commercial.js',
    singleProgress: './src/assets/scripts/gulp-modules/single-progress.js',
    singlePromo: './src/assets/scripts/gulp-modules/single-promo.js',
    property: './src/assets/scripts/gulp-modules/property.js'
  },
  output: {
    filename: '[name].bundle.js',
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks(chunk) {
            // exclude `my-excluded-chunk`
            return chunk.name !== 'immediate-loading';
          },
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-class-properties'],
          },
        },
      },
      {
        test: /\.(glsl|vs|fs|vert|frag)$/,
        exclude: /node_modules/,
        use: ['raw-loader', 'glslify-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
    new UglifyJSPlugin({
      sourceMap: true,
      uglifyOptions: {
        compress: {
          drop_console: process.argv.includes('--production'),
        },
      },
    }),
  ],
};

module.exports = config;
