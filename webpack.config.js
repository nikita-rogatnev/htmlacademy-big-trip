const path = require(`path`);
const HtmlWebpackPlugin = require(`html-webpack-plugin`);
const CopyWebpackPlugin = require(`copy-webpack-plugin`);

module.exports = {
  mode: `development`,
  entry: `./src/js/main.js`,
  output: {
    filename: `bundle.js`,
    path: path.join(__dirname, `./public`)
  },
  module: {
    rules: [{
      test: /\.js$/,
      use: `babel-loader`
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: `./src/index.html`
    }),
    new CopyWebpackPlugin([
      {
        from: `src/img`,
        to: `./img`
      },
      {
        from: `src/fonts`,
        to: `./fonts`
      },
      {
        from: `src/css`,
        to: `./css`
      }
    ]),
  ],
  devtool: `source-map`,
  devServer: {
    contentBase: path.join(__dirname, `public`),
    publicPath: `http: //localhost:8080/`,
    hot: true,
    compress: true
  }
};
