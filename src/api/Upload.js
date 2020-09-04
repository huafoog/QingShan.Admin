import request from '@/utils/request'

// 首页
export function UploadFile(data) {
  return request({
    url: '/Api/Uploads/UploadFile',
    method: 'post',
    data,
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}
