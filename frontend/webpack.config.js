const path = require("path");

module.exports = {
  entry: {
    login: "./src/login.ts",
    signUp: "./src/signUp.ts",
    HereMaps_Interativo2: "./src/HereMaps_Interativo2.ts",
    HereMaps_Fixo2: "./src/HereMaps_Fixo2.ts",
    Weather: "./src/Weather.ts",
    Logout: "./src/logout.ts",
    currentRiverLevel: "./src/currentRiverLevel.ts"
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
  mode: "production",
  node: {
    global: false,
  },
  performance: {
    maxEntrypointSize: 2048000,
    maxAssetSize: 2048000,
  },
  devServer: {
    static: path.join(__dirname, "dist"),
    compress: true,
    port: 4000,
  },
};
