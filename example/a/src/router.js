import React from 'react';
import 'normalize.css';
import { Route, Switch, Router } from 'dva/router';
import IndexPage from './routes/IndexPage';
import { createGlobalStyle } from 'styled-components';
import { BASE_NAME } from './constants/url';

const GlobalStyle = createGlobalStyle`
* {
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
  user-select: none;
}
html, body, #root {
  height: 100%;
  overflow: hidden;
  max-width: 1024px;
  margin: auto;
  background-color: #9F9BC0;
}
#__vconsole .vc-switch {
  bottom: 100px;
}
${'' /* modal transition style */}

.ReactModal__Content{
  @media (min-width: 500px) {
    transform-origin:top;
    transform: translateX(-50%) scale(0.8) !important;
  }
}
.ReactModal__Overlay {
    opacity: 0;
    transition: opacity 200ms ease-in-out;
}

.ReactModal__Overlay--after-open{
    opacity: 1;
}

.ReactModal__Overlay--before-close{
    opacity: 0;
}

.Share_Panel {
  opacity: 0;
  transform: translate3d(0,100%,0);
  transition: all 200ms ease-in-out;
}
.Share_Panel--after-open {
  opacity: 1;
  transform: translate3d(0,0,0);
}
.ReactModal__Overlay--before-close{
  opacity: 0;
}
`;
function RouterConfig({ history }) {
  return (
    <>
      <GlobalStyle />
      <Router history={history}>
        <Switch>
          <Route path={`${BASE_NAME}/`} exact component={IndexPage} />
        </Switch>
      </Router>
    </>
  );
}

export default RouterConfig;
