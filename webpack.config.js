const path = require('path');
const glob = require("glob");

function getEntry() {
  const cwd = './src';
  const result = {};
  const filesArr = glob.sync('renders/*/index.jsx', {
    cwd: cwd
  });
  if (filesArr) {
    filesArr.forEach(value => {
      result[path.dirname(value) + '/' + path.basename(value, '.jsx')] = cwd + '/' + value;
    });
  }
  return result;
}
getEntry();

module.exports = {
  entry: getEntry,
  target: 'electron-renderer',
  mode: 'development',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'build')
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [{
      test: /\.scss$/,
      use: [
        "style-loader", // creates style nodes from JS strings
        "css-loader", // translates CSS into CommonJS
        "sass-loader" // compiles Sass to CSS, using Node Sass by default
      ]
    }, {
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader'
      ]
    }, {
      test: /\.(png|svg|jpg|gif)$/,
      use: {
        loader: 'file-loader',
        options: {
          name: 'images/[name]_[hash].[ext]',
          outputPath: '',
          publicPath: '../../build'
        }
      }
    }, {
      test: /\.(woff|woff2|eot|ttf|otf)$/,
      use: [
        'file-loader'
      ]
    }, {
      test: /\.js(x?)$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ["react", "es2015", "stage-1"]
        }
      }
    }, {
      test: /\.less$/,
      use: [{
        loader: 'style-loader',
      }, {
        loader: 'css-loader', // translates CSS into CommonJS
      }, {
        loader: 'less-loader', // compiles Less to CSS
        options: {
          javascriptEnabled: true
        }
      }]
    }]
  }
};