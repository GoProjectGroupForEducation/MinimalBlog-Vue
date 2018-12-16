<template>
  <div>
    <div class="posts">
      <div class="posts-content">
        <vue-loading v-if="loading" type="bars" color="#d9544e" :size="{ width: '50px', height: '50px' }"></vue-loading>
        <div class="info-content" v-else-if="filteredList.length === 0"><h2>No valid Post!</h2></div>
        <ul class="posts-list" v-else>
          <li v-for="post in pageList" :key="post.id">
            <div class="basic-div post-item">
              <h2 class="post-title"><router-link :to="{name: 'Post', params: {id: post.id}}">{{post.title}}</router-link></h2>
              <div>
                <span class="clickable post-meta" @click="moveToProfile(post.author.id)"><span><div class="logo" :style="{backgroundImage: 'url(/api/static/'+post.author.iconpath+')'}"></div> {{post.author.username}}</span></span>
                <span class="post-meta"><v-icon class="meta-icon">far fa-comments</v-icon> {{post.comments.length}}</span>
                <span class="post-meta"><v-icon class="meta-icon">fa-calendar</v-icon> {{post.updated_at}}</span>
                <v-menu class="post-menu" v-if="editable(post)">
                  <v-btn icon slot="activator">
                    <v-icon color="black">more_vert</v-icon>
                  </v-btn>
                  <v-list>
                    <v-list-tile v-if="$store.state.user.id === post.author.id" @click="editPost(post.id)">
                      <v-list-tile-title>Edit</v-list-tile-title>
                    </v-list-tile>
                  </v-list>
                </v-menu>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <pagination :maxPage="parseInt(Math.ceil(filteredList.length/8))"/>
    </div>
    <div class="right">
      <user-info @toggle-follow="updateList" :userId="parseInt(this.$route.params.id)"/>
      <follow-list :userId="parseInt(this.$route.params.id)"/>
      <follower-list ref="followerList" :userId="parseInt(this.$route.params.id)"/>
    </div>
  </div>
</template>

<script>
import vueLoading from 'vue-loading-template'
import postService from '@/services/postService'
import Pagination from './Pagination'
import FollowerList from './FollowerList'
import UserInfo from './UserInfo'
import FollowList from './FollowList'

export default {
  data () {
    return {
      posts: [],
      loading: true,
      successMsg: '',
      error: ''
    }
  },
  components: {
    vueLoading,
    UserInfo,
    Pagination,
    FollowerList,
    FollowList
  },
  computed: {
    filteredList () {
      var keyword = ''
      if (this.$route) {
        keyword = (this.$route.query.keyword || '').toLowerCase()
      }
      return this.posts
        .filter(item => (item.title.toLowerCase().indexOf(keyword) !== -1))
    },
    pageList () {
      var keyword = ''
      var page = this.$route.query.page || 1
      if (this.$route) {
        keyword = (this.$route.query.keyword || '').toLowerCase()
      }
      var postList = this.posts
        .filter(item => (item.title.toLowerCase().indexOf(keyword) !== -1))
        .slice((page - 1) * 8, page * 8).sort(this.sortList)
      return postList
    }
  },
  created () {
    this.fetchData()
  },
  watch: {
    '$route': 'fetchData'
  },
  methods: {
    sortList (obj1, obj2) {
      var objDate1 = Date.parse(obj1.updated_at)
      var objDate2 = Date.parse(obj2.updated_at)
      if (objDate1 > objDate2) return -1
      else if (objDate1 < objDate2) return 1
      else if (objDate1 === objDate2) return 0
    },
    updateList () {
      this.$refs.followerList.fetchData()
    },
    closeSuccessAlert () {
      this.successMsg = ''
    },
    closeErrorAlert () {
      this.error = ''
    },
    async fetchData () {
      this.loading = true
      var getdata = await postService.getPersonPosts(this.$route.params.id)
      this.posts = getdata.data.data
      this.loading = false
    },
    editPost (id) {
      this.$router.push({name: 'EditPost', params: {id: id}})
    },
    editable (post) {
      if (!this.$store.state.isUserLoggedIn) {
        return false
      }
      return this.$store.state.user.id === post.author.id
    },
    moveToProfile (userId) {
      this.$router.push({name: 'Profile', params: {id: userId}})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.posts {
  width: 760px;
  float: left;
  margin-right: 10px;
}
.right {
  width: 346px;
  float: right;
}
.posts-content {
  height: 100%;
  margin: auto;
}
h2.post-title {
  color: #333;
  font-weight: bold;
  height: 24px;
  overflow: hidden;
  margin-bottom: 20px;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.posts-list {
  margin: auto;
}
.post-item {
  height: 100%;
  padding: 20px 24px;
  background: white;
}
.logo {
  height: 30px;
  width: 30px;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: contain;
  border-radius: 50%;
  margin-right: 15px;
  float: left;
}
.post-meta {
  padding-right: 10px;
}
.posts-list li {
  list-style: none;
  margin-bottom: 5px;
}
.post-menu {
  float: right;
  top: -10px;
  left: 20px;
}
.info-content {
  text-align: center;
}
.meta-icon {
  height: 15px;
  vertical-align: baseline;
}
</style>
