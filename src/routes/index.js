import React, { lazy, memo, Suspense } from 'react';
import { Link, Switch, Route, Router } from 'react-router-dom';

const Page2 = lazy(() => import('../containers/Page2'));

const Page1 = lazy(() => import('../containers/Page1'));

const Home = lazy(() => import('../containers/Home'));

const FeedbackRoutes = memo(({ history, moduleRootPath = '' }) => {
  // #MOD_ROOT_PATH Append the moduleRootPath if feedback module is loaded from container
  const createRoutePath = (path = '') => `${moduleRootPath}${path}`;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Router history={history}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginLeft: '20px'
          }}
        >
          <Link to={createRoutePath()}>Home</Link>
          <Link to={createRoutePath('/page1')}>Page1</Link>
          <Link to={createRoutePath('/page2')}>Page2</Link>
        </div>
        <hr />
        <Switch>
          <Route path={createRoutePath('/page2')} component={Page2} />
          <Route path={createRoutePath('/page1')} component={Page1} />
          <Route path={createRoutePath('/')} component={Home} />
        </Switch>
      </Router>
    </Suspense>
  );
});

export default FeedbackRoutes;
