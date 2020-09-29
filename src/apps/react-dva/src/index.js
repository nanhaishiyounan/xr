import dva from 'dva';
import rem from './utils/rem';
import { createBrowserHistory as createHistory } from 'history';
import { HTTP_ENV } from './constants/url';
import models from './models';

// 0. init rem
rem(375, 1024);

// 1. Initialize
const app = dva({
  history: createHistory(),
});
window.dvaApp = app;

// 2. Plugins
// app.use({});

// 3. Model
models.forEach((model) => app.model(model));

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');

// 6. init vConsole
HTTP_ENV !== 'prod' && window.VConsole && new window.VConsole();
