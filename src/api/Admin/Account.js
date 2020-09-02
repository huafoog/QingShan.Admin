import request from '@/utils/request'

// 
export function Test(data) {
  return request({
    url: '/Api/Admin/Account/Test',
    method: 'get',
    params: data
  })
}

// 用户登录
export function Login(data) {
  return request({
    url: '/Api/Admin/Account/Login',
    method: 'post',
    data
  })
}
