import { MOBILE_DOMAIN, HTTP_ENV, NODE_ENV } from './src/constants/url';

const cdn = {
  test: 'https://static2.test.ximalaya.com/yx/cloud-cat/last/dist/',
  uat: 'https://s1.uat.xmcdn.com/yx/cloud-cat/last/dist/',
  prod: 'https://s1.xmcdn.com/yx/cloud-cat/last/dist/',
};

const CDN = HTTP_ENV === 'test' ? cdn.test : HTTP_ENV === 'uat' ? cdn.uat : cdn.prod;
const publicPath = NODE_ENV === 'development' ? '/' : CDN;
const headScripts = NODE_ENV === 'development' ? [`${publicPath}vconsole.min.js`] : [];

export default {
  entry: 'src/index.js',
  publicPath,
  alias: {
    components: `./src/components`,
    utils: `./src/utils`,
    routes: `./src/routes`,
    models: `./src/models`,
    services: `./src/services`,
    assets: `./src/assets`,
    constants: `./src/constants`,
  },
  define: {
    'process.env.http_env': HTTP_ENV,
  },
  hash: true,
  html: {
    template: `./src/index.ejs`,
    filename: 'index.html',
    favicon: './public/favicon.ico',
    minify: true,
    title: '喜马拉雅',
    headScripts,
    bodyScripts: [],
  },
  extraBabelIncludes: [],
  proxy: {
    '/discovery-feed/**': {
      target: MOBILE_DOMAIN,
      changeOrigin: true,
      secure: false,
    },
  },
};
