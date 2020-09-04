import { Login } from '@/api/Admin/Account'
import { GetUserInfo } from '@/api/Admin/User'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { isNull } from '@/utils/comm'
import { getUserInfo, setUserInfo, removeUserInfo, getAvatar } from '@/utils/cache'
import fileUrl from '@/utils/config'
// import { resetRouter } from '@/router'
import { Message } from 'element-ui'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: getAvatar()
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { account, password } = userInfo
    return new Promise((resolve, reject) => {
      Login({ account: account, password: password }).then(response => {
        if (response.isSuccess) {
          commit('SET_TOKEN', response.data)
          setToken(response.data)
          resolve()
        } else {
          Message(
            { message: response.message || 'Error',
              type: 'error',
              duration: 5 * 1000 }
          )
        }
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      const userInfo = getUserInfo()
      if (isNull(userInfo)) {
        GetUserInfo().then(response => {
          const { data } = response
          if (!data) {
            reject('未获取到用户信息')
          }
          setUserInfo(data)
          const { name, avatar } = data
          commit('SET_NAME', name)
          commit('SET_AVATAR', fileUrl.fileUrl + avatar)
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      } else {
        resolve(userInfo)
      }
    })
  },
  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      removeToken() // must remove  token  first
      removeUserInfo()
      commit('RESET_STATE')
      resolve()
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

