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
    return api().post('follow', credentials, {
      headers: {
        'Authorization': token
      }
    })
  },
  unfollowUser (credentials, token) {
    return api().post('unfollow', credentials, {
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
  changePower (credentials) {
    return api().post('changePower', credentials)
  },
  getFollowUser (id) {
    return api().get('followUser/' + id)
  },
  getFollower (id) {
    return api().get('follower/' + id)
  }
}
