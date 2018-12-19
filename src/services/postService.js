import api from '@/services/api'

export default {
  /**
   * authService.register({
   *   email: 'example@qq.com',
   *   password: 'example'
   * })
   * @param {*} credentials
   */
  getPosts () {
    return api().get('articles/')
  },
  getTags () {
    return api().get('tag/')
  },
  getPersonPosts (id) {
    return api().get('articles/user/' + id)
  },
  getConcernPosts (token) {
    return api().get('articles/concerning', {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
  },
  getTagPosts (tag) {
    return api().get('articles/tag/' + tag)
  },
  getPost (id) {
    return api().get('articles/' + id)
  },
  addPost (data, token) {
    return api().post('articles/', data, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
  },
  updatePost (data, id, token) {
    return api().put('articles/' + id, data, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
  },
  addComment (data, id, token) {
    return api().post('articles/' + id + '/comments/', data, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
  },
  updateComment (data, id, token, commentId) {
    return api().put('articles/' + id + '/comments/' + commentId, data, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
  },
  uploadImg (data, filename, token) {
    var config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer ' + token
      }
    }
    return api().post('upload/' + filename, data, config)
  }
}
