import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import Root from './root';

// Mount function to start up the app
const mount = (
  el,
  {
    containerHistory, // Hosts history object
    moduleRootPath, // The path from where the new root location will begin for the app
    defaultHistory, // The default history object for app
    reducer // Sharing reducer object
  }
) => {
  const history = defaultHistory || containerHistory;

  ReactDOM.render(
    <Root
      history={history}
      moduleRootPath={moduleRootPath}
      reducer={reducer}
    />,
    el
  );
};

const devRoot = document.querySelector('#remoteApp-root'); // This element is in /public/index.html

if (devRoot) {
  // If devRoot is present means the app is running is isolation
  mount(devRoot, {
    defaultHistory: createBrowserHistory() // If mounted in isolation then use browserRouter
  });
}

// eslint-disable-next-line import/prefer-default-export
export { mount };
