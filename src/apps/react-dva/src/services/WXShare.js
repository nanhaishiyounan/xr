import request from "../utils/request";
import { WEIXIN_JSSDK_PASSPORT_URL } from "../constants/url";

export const wxInit = (thirdpartyId) => {
  console.log("wxInit", thirdpartyId);
  const locationHref = encodeURIComponent(window.location.href)
  const url = `${WEIXIN_JSSDK_PASSPORT_URL}/xthirdparty-toolkit-web/wechat/jssdk/config/${thirdpartyId}?signatureUrl=${locationHref}`;
  return request(url);
};

export const wxShareError = (data) => {
  return request({
    method: "post",
    data,
    url: "/x-thirdparty-web/weixinJssdk/config/error",
  });
};
