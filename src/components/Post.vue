<template>
  <div class="post-page">
    <div>
      <div class="basic-div post-header">
        <h1>{{post.title}}</h1>
        <div class="post-meta-bar">
          <span class="clickable"><div class="logo" @click="moveToProfile(post.author.id)" :style="{backgroundImage: 'url(https://avatars1.githubusercontent.com/u/45589718?s=200&v=4)'}"></div> {{post.author.username}}</span>
          <span class="post-meta"><v-icon class="meta-icon">far fa-comments</v-icon> {{post.comments.length}}</span>
          <span class="post-meta"><v-icon class="meta-icon">fa-calendar</v-icon> {{post.updated_at}}</span>
        </div>
      </div>
      <div class="basic-div post-content markdown-content" v-html="compiledMarkdown"></div>
      <div class="basic-div post-comment">
        <div class="comment-header">
          <h1>用户评论</h1>
        </div>
        <div class="comment-list">
          <div class="make-comment" v-if="$store.state.user">
            <textarea name="comment" placeholder="写下你的评论..." class="comment-editor" :class="{'show-editor': showEditor, 'not-show-editor': !showEditor}" v-model="commentContent" @focus="showFlag = true" @blur="showFlag = false"></textarea>
            <v-btn class="cyan" v-if="showEditor" @click="submitComment">Submit</v-btn>
          </div>
          <p v-if="post.comments.length === 0">暂无用户评论</p>
          <ul v-else>
            <li v-for="comment in post.comments" :key="comment.id">
              <div>
                <div class="clickable">
                  <div class="logo" @click="moveToProfile(comment.creator.id)" :style="{backgroundImage: 'url(https://avatars1.githubusercontent.com/u/45589718?s=200&v=4)'}"></div><h4>{{comment.creator.username}}</h4>
                </div>
                <p>{{comment.content}}</p>
                <v-menu class="comment-menu" v-if="editable(comment)">
                  <v-btn icon slot="activator">
                    <v-icon color="black">more_vert</v-icon>
                  </v-btn>
                  <v-list>
                    <v-list-tile @click="showEditComment(comment)">
                      <v-list-tile-title>Edit</v-list-tile-title>
                    </v-list-tile>
                  </v-list>
                </v-menu>
              </div>
            </li>
          </ul>
          <v-dialog v-model="editComment" max-width="500px">
            <v-card>
              <v-card-title>
                <span class="headline">Edit Comment</span>
              </v-card-title>
              <v-card-text>
                <textarea name="comment" v-model="editCommentContent" placeholder="编辑你的评论..." class="comment-editor show-editor"></textarea>
              </v-card-text>
              <v-card-actions>
                <v-btn color="primary" @click.stop="editComment=false">Close</v-btn>
                <v-btn color="success" @click.stop="submitEditComment">Submit</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import vueLoading from 'vue-loading-template'
import marked from '../utils/render.js'
import postService from '@/services/postService'

export default {
  name: 'Post',
  data () {
    return {
      post: {
        title: '',
        author: {
          username: ''
        },
        comments: []
      },
      commentContent: '',
      showFlag: false,
      loading: true,
      editComment: false,
      editCommentId: null,
      editCommentContent: ''
    }
  },
  components: {
    vueLoading,
    marked
  },
  created () {
    this.fetchData()
  },
  watch: {
    '$route': 'fetchData'
  },
  computed: {
    compiledMarkdown: function () {
      if (this.loading) {
        return ''
      }
      return marked(this.post.content)
    },
    showEditor: function () {
      return this.showFlag || (this.commentContent.length > 0)
    }
  },
  methods: {
    async fetchData () {
      this.loading = true
      var getdata = await postService.getPost(this.$route.params.id)
      this.post = getdata.data.data
      this.loading = false
    },
    async submitComment () {
      try {
        var response = await postService.addComment({
          content: this.commentContent
        }, this.$route.params.id, this.$store.state.token)
        this.showFlag = false
        this.commentContent = ''
        this.fetchData()
        this.$store.dispatch('addSuccess', response.data.msg)
      } catch (err) {
        this.$store.dispatch('addError', err.response.data.msg)
      }
    },
    async submitEditComment () {
      try {
        var response = await postService.updateComment({
          content: this.editCommentContent
        }, this.$route.params.id, this.$store.state.token, this.editCommentId)
        this.editComment = false
        this.editCommentContent = ''
        this.editCommentId = null
        this.fetchData()
        this.$store.dispatch('addSuccess', response.data.msg)
      } catch (err) {
        this.$store.dispatch('addError', err.response.data.msg)
      }
    },
    editable (editTarget) {
      if (!this.$store.state.user) {
        return false
      }
      return this.$store.state.user.username === editTarget.creator.username
    },
    showEditComment (comment) {
      this.editComment = true
      this.editCommentId = comment.id
      this.editCommentContent = comment.content
    },
    moveToProfile (userId) {
      this.$router.push({name: 'Profile', params: {id: userId}})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.post-page {
  width: 100%;
}
.post-header {
  padding: 20px 40px;
  height: 110px;
  border-bottom: 1px solid #e5e5e5;
}
.post-meta-bar {
  color: #888;
  line-height: 38px;
  margin-top: 5px;
  font-size: 14px;
}
.post-meta {
  margin-left: 20px;
}
.favourite:hover {
  cursor: pointer;
}
.meta-icon {
  height: 14px;
  margin-right: 5px;
  vertical-align: baseline;
}
.post-content {
  margin-bottom: 20px;
}
.comment-header {
  padding: 20px 40px;
  height: 80px;
  border-bottom: 1px solid #e5e5e5;
}
.comment-list {
  padding: 20px 40px;
}
.comment-list li {
  list-style: none;
  min-height: 50px;
  margin-bottom: 20px;
  border-bottom: 1px solid #e5e5e5;
}
.make-comment {
  margin-bottom: 20px;
}
.comment-list p {
  font-size: 16px;
}
.comment-editor {
  width: 100%;
  border: 1px solid #d0d0d0;
  border-radius: 4px;
  margin-bottom: 10px;
  padding: 6px 10px;
  outline: none;
  resize: none;
}
.comment-menu {
  float: right;
  top: -45px;
}
.comment-meta span{
  cursor: pointer;
  user-select: none;
}
.not-show-editor {
  height: 60px;
  transition: all 0.5s;
}
.show-editor {
  height: 300px;
  transition: all 0.5s;
}
.logo {
  height: 30px;
  width: 30px;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: contain;
  border-radius: 50%;
  margin-right: 15px;
  vertical-align: baseline;
  float: left;
}
</style>
