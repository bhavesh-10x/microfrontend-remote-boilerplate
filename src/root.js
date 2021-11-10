/* eslint-disable no-param-reassign */
import React, { Component } from 'react';
import { ThemeProvider } from '@bit/xto10x.common.index';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import App from './containers/App';
import { store } from './store';
import GlobalStyles from './styles/globalStyle';
import theme from './styles/theme';

// NOTE: You can start development from this file

// eslint-disable-next-line react/prefer-stateless-function
class Root extends Component {
  constructor(props) {
    super(props);
    if (this.props.reducer) store.injectReducer('goals', this.props.reducer);
  }

  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={this.props.history}>
          <ThemeProvider theme={theme}>
            <>
              <App
                history={this.props.history}
                moduleRootPath={this.props.moduleRootPath}
              />
              <GlobalStyles />
            </>
          </ThemeProvider>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default Root;
