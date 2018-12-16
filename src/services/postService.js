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
        'Authorization': token
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
        'Authorization': token
      }
    })
  },
  updatePost (data, id, token) {
    return api().put('articles/' + id, data, {
      headers: {
        'Authorization': token
      }
    })
  },
  addComment (data, id, token) {
    return api().post('articles/' + id + '/comments/', data, {
      headers: {
        'Authorization': token
      }
    })
  },
  updateComment (data, id, token, commentId) {
    return api().put('articles/' + id + '/comments/' + commentId, data, {
      headers: {
        'Authorization': token
      }
    })
  },
  uploadImg (data, filename, token) {
    var config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': token
      }
    }
    return api().post('upload/' + filename, data, config)
  }
}
