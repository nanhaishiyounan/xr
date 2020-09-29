export default (function() {
  if (typeof window === 'undefined') {
    return {
      isClient: false
    }
  }
  const isSupportWebp =
    document
      .createElement('canvas')
      .toDataURL('image/webp')
      .indexOf('data:image/webp') === 0
  const ua = navigator.userAgent.toLowerCase()
  return {
    protocol: window.location.protocol,
    isClient: true,
    isSupportWebp,
    isMainApp: /iting/.test(ua),
    isTest: /local(host)?|192|test/.test(
      window.location.hostname || window.location.host
    ),
    isAndroid: /linux|android/.test(ua),
    isSafari: /safari/.test(ua) && !/chrome/.test(ua),
    isIos: !!ua.match(/\(i[^;]+;( u;)? cpu.+mac os x/),
    isWeiXin: /micromessenger/.test(ua),
    isMobile: /mobile/.test(ua),
    isWeiXinDebug: /wxdebug/.test(window.location.href),
    inApp: /iting/.test(ua)
  }
})()
