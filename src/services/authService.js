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
        'Authorization': 'Bearer ' + token
      }
    })
  },
  unfollowUser (credentials, token) {
    return api().post('user/unfollow', credentials, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
  },
  updateInfo (credentials, id, token) {
    return api().put('user/' + id, credentials, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
  },
  updateImage (imgname, data, token) {
    var config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer ' + token
      }
    }
    return api().put('user/icon/' + imgname, data, config)
  },
  getFollowUser (id) {
    return api().get('user/' + id + '/following')
  },
  getFollower (id) {
    return api().get('user/' + id + '/follower')
  }
}
