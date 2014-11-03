module.exports = {
  entry: "./app/js/boot.js",
  resolve: {
    modulesDirectories: [ 'node_modules' ]
  },
  output: {
    publicPath: "./build",
    filename: "bundle.js"
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: "style!css" },
      { test: /\.scss$/, loader: 'style!css!sass' },
      { test: /\.jsx$/, loader: 'jsx' }
    ]
  }
}
