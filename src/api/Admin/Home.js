import request from '@/utils/request'

// 获取
export function Index(data) {
  return request({
    url: '/Api/Admin/Home/Index',
    method: 'get',
    params: data
  })
}

// 添加
export function Add(data) {
  return request({
    url: '/Api/Admin/Home/Add',
    method: 'post',
    data
  })
}

// 删除
export function Delete(data) {
  return request({
    url: '/Api/Admin/Home/Delete',
    method: 'post',
    data
  })
}
