var webpack = require('webpack');

module.exports = {
  entry: "./app/js/boot.js",
  resolve: {
    modulesDirectories: [ 'node_modules' ]
  },
  output: {
    publicPath: "./build",
    filename: "bundle.js"
  },
  externals: {
    "jquery": "jQuery",
    "react": "React"
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin()
  ],
  module: {
    loaders: [
      { test: /\.css$/, loader: "style!css" },
      { test: /\.scss$/, loader: 'style!css!sass' },
      { test: /\.less$/, loader: 'style!css!less' },
      { test: /\.jsx$/, loader: 'jsx' },
      { test: /\.woff$/, loader: 'url?limit=10000&minetype=application/font-woff' },
      { test: /\.ttf$/, loader: 'file' },
      { test: /\.eot$/, loader: 'file' },
      { test: /\.svg$/, loader: 'file' },
      { test: /\.(gif|png|jpg)$/, loaders: 'image?optimizationLevel=7&interlaced=false' }
    ]
  }
}
