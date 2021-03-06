<template>
  <div class="basic-div" id="info" @click="$router.push({name: 'Profile', params: {id: userId}})">
    <div class="logo" :style="{backgroundImage: 'url(/api/static/'+user.iconpath+')'}"></div>
    <div class="basic-info">
      <ul class="info-list">
        <li class="username">{{user.username}}</li>
        <li>
          <div class="meta">
            <h4 class="meta-header"><v-icon class="icon">fa-file</v-icon> 文章</h4>
            <p>{{user.articles.length}}</p>
          </div>
          <div class="meta">
            <h4 class="meta-header"><v-icon class="icon">fa-heart</v-icon> 关注</h4>
            <p>{{user.following.length}}</p>
          </div>
          <div class="meta">
            <h4 class="meta-header"><v-icon class="icon">fa-star</v-icon> 粉丝</h4>
            <p>{{user.followers.length}}</p>
          </div>
        </li>
        <div class="button-list" v-if="showButton">
          <li v-if="this.$store.state.user.id === this.userId || this.$store.state.user.following.indexOf(this.userId) !== -1">
            <v-btn color="error" @click="unfollowUser">Unfollow</v-btn>
          </li>
          <li v-else>
            <v-btn color="success" @click="followUser">Follow</v-btn>
          </li>
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
import authService from '@/services/authService'

export default {
  props: {
    userId: Number
  },
  data () {
    return {
      user: {
        iconpath: '1.ico',
        followers: [],
        following: [],
        articles: []
      }
    }
  },
  created () {
    this.fetchData()
  },
  watch: {
    '$route.params': 'fetchData'
  },
  computed: {
    showButton () {
      return (this.$store.state.isUserLoggedIn && (this.$store.state.user.id !== this.userId))
    },
    followed () {
      return (this.$store.state.user.id === this.userId || this.$store.state.user.follow.indexOf(this.userId) !== -1)
    }
  },
  methods: {
    async fetchData () {
      var getdata = await authService.getData(this.userId)
      this.user = getdata.data.data
    },
    async followUser () {
      try {
        var response = await authService.followUser({id: this.userId}, this.$store.state.token)
        this.$store.dispatch('followUser', this.userId)
        this.$store.dispatch('addSuccess', response.data.msg)
        this.fetchData()
        this.$emit('toggle-follow')
      } catch (err) {
        this.$store.dispatch('addError', err.response.data.msg)
      }
    },
    async unfollowUser () {
      try {
        var response = await authService.unfollowUser({id: this.userId}, this.$store.state.token)
        this.$store.dispatch('unfollowUser', this.userId)
        this.$store.dispatch('addSuccess', response.data.msg)
        this.fetchData()
        this.$emit('toggle-follow')
      } catch (err) {
        this.$store.dispatch('addError', err.response.data.msg)
      }
    }
  }
}
</script>

<style scoped>
#info {
  padding: 20px 0 10px 0;
  width: 100%;
  height: auto;
  background: white;
  margin-bottom: 10px;
  cursor: pointer;
}
.logo {
  width: 100px;
  height: 100px;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: contain;
  border-radius: 50%;
  margin: auto;
}
.basic-info {
  width: 250px;
  text-align: center;
  margin: 10px auto 0 auto;
}
.username {
  font-size: 20px;
  margin-bottom: 15px;
}
.info-list li {
  list-style: none;
}
.meta {
  width: 30%;
  display: inline-block;
  border-right: 1px solid #eee;
}
.meta:last-child {
  border: none;
  margin-bottom: 10px;
}
.meta-header {
  margin-bottom: 10px;
}
.icon {
  font-size: 16px;
  vertical-align: baseline;
}
</style>
