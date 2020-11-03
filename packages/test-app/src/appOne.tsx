import React, { lazy, Suspense } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { initializeApp } from '@scalprum/core';

const AppOneLazyLoaded = lazy(() => import('./app-one-lazy-loaded'));

const AppOne: React.ComponentType<{ basename: string }> = ({ basename }) => {
  return (
    <BrowserRouter basename={basename}>
      <ul>
        <li>
          <Link to="/">App one top</Link>
        </li>
        <li>
          <Link to="/nested">App one nested route</Link>
        </li>
        <li>
          <Link to="/nested-lazy">App one nested lazy route</Link>
        </li>
      </ul>
      <div>
        <Route path="/">
          <h1>This is application one</h1>
        </Route>
        <Route exact path="/nested">
          <h2>App one nested route</h2>
        </Route>
        <Route exact path="/nested-lazy">
          <Suspense fallback={<div>Loading</div>}>
            <AppOneLazyLoaded />
          </Suspense>
        </Route>
      </div>
    </BrowserRouter>
  );
};

initializeApp<{ foo: string }>({
  id: 'app-one',
  name: 'appOne',
  unmount: () => {
    console.log('unmounting app one');
    unmountComponentAtNode(document.getElementById('app-one-root')!);
  },
  update: console.log,
  mount: ({ appsMetaData: { appOne } }) => {
    return render(<AppOne basename={appOne.rootLocation} />, document.getElementById('app-one-root'));
  },
});
