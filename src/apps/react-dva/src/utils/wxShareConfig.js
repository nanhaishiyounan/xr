import { wxInit } from "../services/WXShare";
import { HTTP_ENV } from "../constants/url";

function _WxShare(sData) {
  const thirdpartyId = HTTP_ENV === "prod" ? 17 : 31;
  return wxInit(thirdpartyId).then((data) => {
    const config = {
      debug: false,
      appId: data.appId,
      timestamp: data.timestamp,
      nonceStr: data.nonceStr,
      signature: data.signature,
      jsApiList: [
        "onMenuShareTimeline",
        "onMenuShareAppMessage",
        "onMenuShareQQ",
        "onMenuShareWeibo",
      ],
    };
    window.wx && window.wx.config(config);

    return new Promise((resolve) => {
      window.wx && window.wx.ready(() => {
        if (sData) {
          // 朋友圈
          window.wx.onMenuShareTimeline(sData);
          // 朋友
          window.wx.onMenuShareAppMessage(sData);
          // qq
          window.wx.onMenuShareQQ(sData);
          // weibo
          window.wx.onMenuShareWeibo(sData);
        }
      });
    });
  });
}
export async function WxShare(sData) {
  const state = await _WxShare(sData);
  return state;
}
