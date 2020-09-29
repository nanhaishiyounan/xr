import env from '../utils/env';
import { getQueryValue } from '../utils/util';
import { WxShare } from '../utils/wxShareConfig';
import getShareConfig from '../services/getShareConfig';

export default {
  namespace: 'context',

  state: {
    isLogin: false,
    unlockedAll: false,
    isMainApp: env.isMainApp,
    isInApp: !!getQueryValue('inapp'),
  },

  subscriptions: {
    setup({ dispatch, history }) {
      // eslint-disable-line
      // init weixin jssdk
      getShareConfig('weixin').then((res) => {
        const { title, picUrl, content } = res;
        WxShare({
          title: title, // 分享标题
          desc: content, // 分享描述
          imgUrl: picUrl,
          type: 'link',
        });
      });

      // 6. init jssdk
      if (env.isMainApp) {
        require('../utils/ly');

        window.ly.config({
          appId: '5c5f7035a1e8ca1e67e44940edc22c3c',
          apiList: [
            'ui.toast',
            'util.share',
            'account.login',
            'ui.showLoading',
            'ui.hideLoading',
            'nav.setMenu',
            'account.getUserInfo',
            'account.login',
            'nav.close',
            'util.copyText',
            'gplayer.stop',
            'device.getDeviceInfo',
          ],
        });

        window.ly.ready(function() {
          // 需要立即调用native能力的接口在这里初始化,点击触发的可以不用写这里
          function updateUserInfo(data) {
            dispatch({
              type: 'save',
              payload: {
                isLogin: data.isLogin,
              },
            });
          }
          window.ly.invokeApp('account.getUserInfo', {
            success: function(data) {
              updateUserInfo(data);
            },
          });

          window.ly.invokeApp('account.watchAccountChange', {
            success: function(data) {
              updateUserInfo(data);
            },
          });

          window.ly.invokeApp('gplayer.stop', {
            success: function(info) {
              /* info :{
                same as gplayer.play
              }

            */
            },
          });
        });

        window.ly.error(function(err) {
          alert(JSON.stringify(err));
        });
      }
    },
  },

  effects: {
    *login({ payload }, { call, put }) {
      // eslint-disable-line
      window.ly.invokeApp('account.login', {
        halfScreen: true, // 默认全屏登录 支持版本 v6.5.27+
        control: false, // 控制非登录态的登录回调 支持版本 v6.5.27+
        success: function(data) {},
      });
    },
  },

  reducers: {
    save(state, action) {
      console.log(action);
      return { ...state, ...action.payload };
    },
  },
};
