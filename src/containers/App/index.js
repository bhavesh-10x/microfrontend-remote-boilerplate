import React, { memo } from 'react';
import AppRoutes from '../../routes';

const App = memo(props => {
  const { history, moduleRootPath } = props;

  return <AppRoutes history={history} moduleRootPath={moduleRootPath} />;
});

export default App;
