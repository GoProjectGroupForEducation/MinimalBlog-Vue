import api from '@/services/api'

export default {
  /**
   * authService.register({
   *   email: 'example@qq.com',
   *   password: 'example'
   * })
   * @param {*} credentials
   */
  register (credentials) {
    return api().post('user/register', credentials)
  },
  login (credentials) {
    return api().post('user/login', credentials)
  },
  getData (id) {
    return api().get('user/' + id)
  },
  getTopUsers () {
    return api().get('topusers')
  },
  followUser (credentials, token) {
    return api().post('user/follow', credentials, {
      headers: {
        'Authorization': token
      }
    })
  },
  unfollowUser (credentials, token) {
    return api().post('user/unfollow', credentials, {
      headers: {
        'Authorization': token
      }
    })
  },
  updateInfo (credentials) {
    return api().post('updateInfo', credentials)
  },
  updateImage (data, token) {
    var config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': token
      }
    }
    return api().post('updateImg', data, config)
  },
  getFollowUser (id) {
    return api().get('user/' + id + '/following')
  },
  getFollower (id) {
    return api().get('user/' + id + '/follower')
  }
}
