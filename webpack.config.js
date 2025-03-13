const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
require("dotenv").config();
const CopyWebpackPlugin = require("copy-webpack-plugin");


module.exports = {
  entry: "./src/index.tsx", // Entry chính
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js",
    clean: true, // Xóa thư mục 'dist' trước khi build
    publicPath: "/", // Đường dẫn công khai
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/, // Xử lý JS/TS/JSX/TSX
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.module\.scss$/, // Xử lý SCSS với CSS Modules
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true, // Bật CSS Modules
              sourceMap: true,
            },
          },
          "sass-loader", // Biên dịch SCSS
        ],
      },
      {
        test: /\.scss$/, // Xử lý SCSS toàn cục
        exclude: /\.module\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.css$/, // Xử lý CSS
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|eot|ttf|otf)$/i, // Xử lý file tĩnh
        type: "asset/resource",
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"], // Cho phép import không cần phần mở rộng
    alias: {
      "@components": path.resolve(__dirname, "src/components"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@utils": path.resolve(__dirname, "src/utils"),
      "@assets": path.resolve(__dirname, "src/assets"),
      "@modules": path.resolve(__dirname, "src/modules"),
      "@apis": path.resolve(__dirname, "src/apis"),
      "@datas": path.resolve(__dirname, "src/datas"),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html", // Template HTML
      favicon: "./public/favicon-vms.ico",
    }),
    new webpack.DefinePlugin({
      "process.env.BASE_URL": JSON.stringify(
        process.env.BASE_URL || "http://localhost:3001"
      ),
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: "public/favicon-vms.ico", to: "favicon-vms.ico" }],
    }),
  ],
  devServer: {
    static: {
      directory: path.resolve(__dirname, "dist"), // Thư mục tĩnh
      publicPath: "/", // Đường dẫn công khai
    },
    port: 3000, // Port cho server
    open: true, // Tự động mở trình duyệt
    historyApiFallback: true, // Điều hướng về index.html với đường dẫn không tồn tại
    compress: true, // Bật gzip
    client: {
      overlay: true, // Hiển thị lỗi trên giao diện
    },
  },
  mode: "development", // Chế độ 'development' hoặc 'production'
  devtool: "source-map", // Hỗ trợ debug
};
