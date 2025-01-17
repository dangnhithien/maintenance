const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.tsx", // Điểm vào chính
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    clean: true, // Xóa thư mục 'dist' trước mỗi lần build
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/, // Xử lý file JS/TS/JSX/TSX
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/, // Xử lý file CSS
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"], // Để import không cần đuôi file

    alias: {
      "@components": path.resolve(__dirname, "src/components"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@utils": path.resolve(__dirname, "src/utils"),
      "@assets": path.resolve(__dirname, "src/assets"),
      "@modules": path.resolve(__dirname, "src/modules"),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html", // Template HTML
    }),
  ],

  devServer: {
    static: "./dist",
    port: 3000,
    open: true, // Tự mở trình duyệt khi chạy
    historyApiFallback: true,
  },
  mode: "development", // Hoặc 'production'
};
