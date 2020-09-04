export function isNull(ele) {
  if (typeof ele === 'undefined') { // 先判断类型
    return true
  } else if (ele == null) {
    return true
  } else if (ele === '') {
    return true
  } else if (ele === 'undefined') {
    return true
  }
  return false
}
