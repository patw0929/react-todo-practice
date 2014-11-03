module.exports = {
  entry: "./app/assets/js/boot.js",
  resolve: {
    modulesDirectories: [ 'node_modules' ]
  },
  output: {
    publicPath: "./build/assets/",
    filename: "bundle.js"
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: "style!css" },
      { test: /\.scss$/, loader: 'style!css!sass' }
    ]
  }
}
