let hostUrl = ''
let fileUrl = ''
if (process.env.NODE_ENV === 'development') {
  hostUrl = process.env.VUE_APP_BASE_API
  fileUrl = process.env.VUE_APP_BASE_API
} else {
  hostUrl = process.env.VUE_APP_BASE_API
  fileUrl = process.env.VUE_APP_BASE_API
}

export const host = hostUrl
export const apiPreFix = '/'
export default {
  hostUrl,
  fileUrl,
  apiPreFix
}
