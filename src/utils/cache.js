import Cookies from 'js-cookie'
import { isNull } from '@/utils/comm'
import fileUrl from '@/utils/config'
const TokenKey = 'qs_user_info'

export function getUserInfo() {
  var user = Cookies.get(TokenKey)
  if (isNull(user)) {
    return null
  }
  return JSON.parse(user)
}

export function getAvatar() {
  var user = getUserInfo()
  if (isNull(user)) {
    return ''
  }
  return fileUrl.fileUrl + user.avatar
}

export function setUserInfo(data) {
  return Cookies.set(TokenKey, data)
}

export function removeUserInfo() {
  return Cookies.remove(TokenKey)
}
