const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const tsConfig = require("./tsconfig.json");
const tsConfigPaths = Object.entries(tsConfig.compilerOptions.paths).reduce(
  (prev, [key, value]) => ({
    ...prev,
    [key.replace("/*", "")]: path.resolve(
      value[0].replace("/*", "").replace("*", "")
    ),
  }),
  {}
);

/** @type {import('webpack').Configuration} */
module.exports = {
  mode: "development",
  entry: {
    main: path.join(__dirname, "src", "index.ts"),
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].js",
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      minify: true,
      // Injects the script tag to the body instead of the head
      inject: "body",
      // Prevents the defer
      scriptLoading: "blocking",
      template: path.join(__dirname, "public", "index.html"),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.[jt]sx?/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
            plugins: [
              ["@babel/plugin-transform-runtime", { regenerator: true }],
            ],
          },
        },
        exclude: /node_modules/,
      },
    ],
  },
  experiments: {
    asyncWebAssembly: true,
  },
  resolve: {
    alias: tsConfigPaths,
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
    },
    // Open on yarn dev
    open: true,
    hot: true,
    historyApiFallback: true,
    port: 3000,
    // Importante para ouvir mudanças e atualizar
    liveReload: true,
  },
};
