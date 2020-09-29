import request from '../utils/request';
import { MOBILE_URL } from '../constants/url';

export default function getScene() {
  const ts = +new Date();
  return request(`${MOBILE_URL}/discovery-feed/sleep/v7/share/times/${ts}`);
}
