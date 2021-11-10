const { merge } = require('webpack-merge');
const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const CopyPlugin = require('copy-webpack-plugin');
const dotenv = require('dotenv');
const dotenvExpand = require('dotenv-expand');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const { GenerateSW } = require('workbox-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const safePostCssParser = require('postcss-safe-parser');
const commonConfig = require('./webpack.common');
const deps = require('./package.json').dependencies;

// The publicUrl should be complete domain name because '/' as publicUrl will lead to
// relative path issues when the app is loaded inside a host
const getPublicURL = () => {
  const PUBLIC_URL_FROM_ENV = process.env.PUBLIC_URL;
  if (PUBLIC_URL_FROM_ENV) return `${PUBLIC_URL_FROM_ENV}/`;
  // #PORT_1: Make sure the port matches the devServer port
  return 'https://localhost:8080/';
};

const isDebugMode = () => {
  if (process.env.DEBUG === 'true') return true;
  return false;
};

const isHTTPS = () => {
  if (process.env.DEBUG === 'false') return false;
  return true;
};

const appDirectory = fs.realpathSync(process.cwd());
const resolveEnvFilePath = filePath => path.resolve(appDirectory, filePath);

const dot_env_files = () => {
  const filePaths = [resolveEnvFilePath('.env')];
  if (isDebugMode()) filePaths.push(resolveEnvFilePath('.env.development'));
  else filePaths.push(resolveEnvFilePath('.env.production'));
  return filePaths;
};

dot_env_files().forEach(dotenvFile => {
  if (fs.existsSync(dotenvFile)) {
    dotenvExpand(
      dotenv.config({
        path: dotenvFile
      })
    );
  }
});

const ENV_PREFIX_PATTERN = /^REACT_APP_/i;

const env_stringified = {
  'process.env': Object.keys(process.env)
    .filter(key => ENV_PREFIX_PATTERN.test(key))
    .reduce((env, key) => {
      env[key] = JSON.stringify(process.env[key]);
      return env;
    }, {})
};

env_stringified['process.env'].PUBLIC_URL = JSON.stringify(getPublicURL());

const getAdditionalOptimisationFlags = () => {
  if (isDebugMode()) {
    return {
      nodeEnv: 'development',
      flagIncludedChunks: false,
      concatenateModules: false,
      emitOnErrors: true,
      checkWasmTypes: false,
      removeAvailableModules: false
    };
  }
  return {
    nodeEnv: 'production',
    flagIncludedChunks: true,
    concatenateModules: true,
    emitOnErrors: false,
    checkWasmTypes: true
  };
};

const config = {
  mode: 'development',
  entry: ['./src/index.js'],
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: getPublicURL()
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    mainFields: ['browser', 'main', 'module'],
    modules: ['node_modules', path.resolve(__dirname, 'src')],
    fallback: { util: require.resolve('util/') }
  },
  devServer: {
    // #PORT. Set port, make sure that it matches the port in #PORT_1
    port: 8080,
    // #HISTORY_API_FALLBACK: Helps to resolve route paths even when page is refreshed
    historyApiFallback: true,
    compress: true,
    https: isHTTPS()
  },
  plugins: [
    // #MODULE_FED: Setup the config for creating the app as microfrontend
    new ModuleFederationPlugin({
      // #MOD_FED_NAME: Set module name
      name: 'remoteModule',
      // #MOD_FED_FILENAME: Endpoint where the file will be exposed for the host app
      // Hit the <domain>/remoteEntry.js eg: https://localhost:8080/remoteEntry.js
      filename: 'remoteEntry.js',
      // #MOD_FED_EXPOSES: Set which components to expose
      // The key will serve as alias for the components path
      exposes: {
        './RemoteApp': './src/bootstrap.js'
      },
      // shared: [ "react", "react-dom" ],
      // #MOD_FED_SHARED: Sharing dependencies to remove duplicate copies of packages
      shared: {
        react: {
          eager: true,
          singleton: true, // Specifies that only single copy of react should be loaded
          requiredVersion: deps.react // Specifies which version is required for sharing
        },
        'react-dom': {
          eager: true,
          singleton: true,
          requiredVersion: deps['react-dom']
        }
      }
    }),
    // #HTML_WP_PLUGIN: Dynamically inject the js scripts and variables in a file
    new HtmlWebpackPlugin({
      template: './public/index.html', // Specifies which file to be for inserting
      templateParameters: {
        // The variable PUBLIC_URL will be replaced with the given value in the templateFile
        PUBLIC_URL: getPublicURL()
      }
    }),
    new CopyPlugin({
      patterns: [
        { from: 'src/assets', to: 'assets' },
        {
          from: 'public',
          to: '[name][ext]',
          globOptions: {
            ignore: ['**/index.html']
          }
        }
      ]
    }),
    // #DEFINE_PLUGIN: Make process.env variables accessible within react files
    new webpack.DefinePlugin(env_stringified)
  ],
  optimization: {
    ...getAdditionalOptimisationFlags(),
    minimize: !isDebugMode(),
    minimizer: [
      // This is only used in production mode
      new TerserPlugin({
        terserOptions: {
          parse: {
            ecma: 8
          },
          compress: {
            ecma: 5,
            warnings: false,
            comparisons: false,
            inline: 2,
            drop_console:
              process.env && process.env.isProdEnvironment ? true : false
          },
          mangle: {
            safari10: true
          },
          // Added for profiling in devtools
          keep_classnames: true,
          keep_fnames: false,
          output: {
            ecma: 5,
            comments: false,
            // Turned on because emoji and regex is not minified properly using default
            // https://github.com/facebook/create-react-app/issues/2488
            ascii_only: true
          }
        },
        exclude: /assets\/images/
      }),
      // This is only used in production mode
      new CssMinimizerPlugin({
        parallel: false,
        minimizerOptions: {
          processorOptions: {
            parser: safePostCssParser,
            map: isDebugMode()
              ? {
                  // `inline: false` forces the sourcemap to be output into a
                  // separate file
                  inline: false,
                  // `annotation: true` appends the sourceMappingURL to the end of
                  // the css file, helping the browser find the sourcemap
                  annotation: true
                }
              : false
          },
          preset: ['default', { minifyFontValues: { removeQuotes: false } }]
        }
      })
    ]
  }
};

module.exports = (env, argv) => {
  config.devtool = 'source-map';
  if (isDebugMode()) {
    config.cache = true;
    if (argv.analyzer && process.env.ANALYZER !== 'false') {
      config.plugins = [
        ...config.plugins,
        new BundleAnalyzerPlugin({
          openAnalyzer: false,
          analyzerMode: 'server',
          analyzerHost: 'localhost',
          defaultSizes: 'gzip',
          // #BUNDLE_ANALYZER_PORT: Change bundle analyzer port
          analyzerPort: 8081
        }),
        new UnusedWebpackPlugin({
          failOnUnused: false,
          // Source directories
          directories: [path.join(__dirname, 'src')],
          // Exclude patterns
          exclude: ['*.test.js'],
          // Root directory (optional)
          root: __dirname
        })
      ];
    }
    if (argv.hot) {
      // Cannot use 'contenthash' when hot reloading is enabled.
      config.output.filename = '[name].[fullhash].js';
    }
    config.devtool = 'eval-source-map';
  }
  if (
    process.env.NODE_ENV === 'production' &&
    !argv.analyzer &&
    argv.compress &&
    (!process.env.COMPRESS_JS || process.env.COMPRESS_JS === 'true')
  ) {
    config.plugins = [
      ...config.plugins,
      new CompressionPlugin({
        test: /\.js(\?.*)?$/i,
        algorithm: 'gzip',
        compressionOptions: { level: 6 },
        filename: '[path].gz[query]',
        exclude: /assets\/images/
      })
    ];
  }
  if (process.env.NODE_ENV === 'production') {
    config.plugins = [
      ...config.plugins,
      new GenerateSW({
        clientsClaim: true,
        exclude: [
          /\.map$/,
          /asset-manifest\.json$/,
          /service-worker\.js$/,
          /assets\/images\/blank\.png$/,
          /search\.worker\.js/,
          /index\.html/
        ],
        // importScripts: ['cdn'],
        // navigateFallback: '/' + 'index.html',
        navigateFallbackAllowlist: [
          // Exclude URLs starting with /_, as they're likely an API call
          new RegExp('^/_'),
          // Exclude any URLs whose last part seems to be a file extension
          // as they're likely a resource and not a SPA route.
          // URLs containing a "?" character won't be blacklisted as they're likely
          // a route with query params (e.g. auth callbacks).
          new RegExp('/[^/?]+\\.[^/]+$')
        ]
      })
    ];
  }
  return merge(commonConfig, config);
};
