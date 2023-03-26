/**
 * 环境配置文件
 * 开发环境: dev
 * 测试环境: test
 * 线上环境: prod
 */

// 当前的环境
const env = process.env.NODE_ENV
// console.log('当前环境的VUE_APP_API', process.env.VUE_APP_API)
const baseApi = process.env.VUE_APP_API
const mockApi = process.env.VUE_APP_MOCKAPI
const EnvConfig = {
  env,
  baseApi,
  mockApi
}
export default {
  isMock: true,
  ...EnvConfig
}
