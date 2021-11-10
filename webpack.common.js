const postcssNormalize = require('postcss-normalize');

const isDebugMode = () => {
  if (process.env.DEBUG === 'true') return true;
  return false;
};

module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 51200,
              esModule: false
            }
          }
        ]
      },
      {
        test: /\.png$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              mimetype: 'image/png'
            }
          }
        ]
      },
      {
        test: /\.(sa|sc|c)ss$/,
        // exclude: /node_modules/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [
                require('postcss-flexbugs-fixes'),
                require('postcss-preset-env')({
                  autoprefixer: {
                    flexbox: 'no-2009'
                  },
                  stage: 3
                }),
                // Adds PostCSS Normalize as the reset css with default options,
                // so that it honors browserslist config in package.json
                // which in turn let's users customize the target behavior as per their needs.
                postcssNormalize()
              ],
              sourceMap: isDebugMode()
            }
          },
          'sass-loader'
        ]
      }
    ]
  }
};
