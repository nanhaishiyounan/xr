import request from "../utils/request";
import { MOBILE_DOMAIN } from "../constants/url";

export default function getShareConfig(channel) {
  const URL = `${MOBILE_DOMAIN}/thirdparty-share/share/content`;
  return request(`${URL}?srcType=60&subType=1067&srcId=0&tpName=${channel}`);
}
