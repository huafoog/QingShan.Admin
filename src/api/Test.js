import request from '@/utils/request'

// 首页
export function Index(data) {
  return request({
    url: '/Test/Index',
    method: 'get',
    params: data
  })
}
