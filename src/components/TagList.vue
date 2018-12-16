<template>
  <div class="basic-div tag-list-div" id="tag-list">
    <h2 class="div-header">标签列表</h2>
    <ul class="tag-list">
      <li v-for="tag in tags" class="tag-item" :key="tag.Content">
        <div @click="changeTag(tag.Content)">
          <h3 class="tag-name">{{tag.Content}}</h3>
        </div>
      </li>
    </ul>

  </div>
</template>

<script>
import postService from '@/services/postService'

export default {
  data () {
    return {
      tags: []
    }
  },
  created () {
    this.fetchData()
  },
  watch: {
    '$route.params': 'fetchData'
  },
  methods: {
    sortList (obj1, obj2) {
      if (obj1.Content > obj2.Content) return 1
      else if (obj1.Content < obj2.Content) return -1
      else if (obj1.Content === obj2.Content) return 0
    },
    async fetchData () {
      var getdata = await postService.getTags()
      this.tags = getdata.data.data
      this.tags.sort(this.sortList)
    },
    changeTag (tag) {
      this.$router.push({name: 'Posts', query: {tag: tag}})
    }
  }
}
</script>

<style scoped>
* {
  font-size: 18px;
}
#tag-list {
  height: 394px;
}
.tag-list {
  height: 350px;
  overflow-y: scroll;
}
.tag-list li {
  list-style: none;
  padding: 5px 5px;
  cursor: pointer;
}
.tag-item {
  height: 65px;
  margin-top: 5px;
  border-bottom: 1px solid #eee;
}
.tag-name {
  line-height: 50px;
}
.tag-list::-webkit-scrollbar {display:none}
</style>
