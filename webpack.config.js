const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: 'production', // or 'development'
  entry: './src/index.js', // Entry point of your application
  output: {
    path: path.resolve(__dirname, '../if-follow-package', 'lib'), // Output directory
    filename: 'index.js', // Output filename
    library: 'ifFollow', // Name of your library
    libraryTarget: 'umd', // Universal Module Definition
    // Expose the default export as a global variable
    globalObject: 'this',
  },
  optimization: {
    minimize: true, // or false if you want to disable minification
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          keep_fnames: true, // Preserve function names
        },
      }),
    ],
  },
  module: {
    rules: [
      {
        test: /\.js$/, // Apply Babel only to JavaScript files
        exclude: /node_modules/, // Exclude node_modules directory
        use: {
          loader: 'babel-loader', // Use babel-loader for transpilation
          options: {
            presets: ['@babel/preset-env'], // Use @babel/preset-env for compatibility
            plugins: [
              // Exclude arrow function transformation
              ['@babel/plugin-transform-arrow-functions', { spec: true }],
            ],
          },
        },
      },
    ],
  },
  // Add this to see any webpack-related errors
  stats: {
    colors: true,
  },
};
