import http from '../utils/request'

// 账号登录
export const userAccountLogin = (params) => {
  return http({
    url: '/login',
    method: 'post',
    data: params
  })
}
// 手机号登录
export const userMobileLogin = (params) => {
  return http({
    url: '/login/code',
    method: 'post',
    data: params
  })
}
// QQ登录
export const userQQLogin = (unionId, source = 6) => {
  return http({
    url: '/login/social',
    method: 'post',
    data: { unionId, source }
  })
}
// 发送短信验证码
export const sendMsgCode = (mobile) => {
  return http({
    url: '/sendCode',
    method: 'get',
    data: mobile
  })
}
