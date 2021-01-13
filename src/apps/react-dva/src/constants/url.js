export const HTTP_ENV = process.env.http_env
export const NODE_ENV = process.env.NODE_ENV
export const PATH = HTTP_ENV === 'prod' ? '' : HTTP_ENV + '.'
export const LOCAL = NODE_ENV === 'development'

export const MOBILE_DOMAIN = `https://mobile.${PATH}ximalaya.com`
export const MOBILE_URL = LOCAL ? '' : MOBILE_DOMAIN
export const BASE_NAME = LOCAL ? '' : '/react-dva'
