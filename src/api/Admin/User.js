import request from '@/utils/request'

// 新增用户
export function Add(data) {
  return request({
    url: '/Api/Admin/User/Add',
    method: 'post',
    data
  })
}

// 修改用户
export function Update(data) {
  return request({
    url: '/Api/Admin/User/Update',
    method: 'post',
    data
  })
}

// 获取用户信息
export function GetUserInfo(data) {
  return request({
    url: '/Api/Admin/User/GetUserInfo',
    method: 'post',
    data
  })
}

// 获取用户列表
export function GetUserPage(data) {
  return request({
    url: '/Api/Admin/User/GetUserPage',
    method: 'get',
    params: data
  })
}
