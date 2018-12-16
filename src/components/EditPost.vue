<template>
  <div id="editor">
    <h1>Edit Post</h1>
    <v-container class="form-content">
      <v-layout row>
        <v-flex xs6>
          <v-flex xs6>
            <h3>Title</h3>
          </v-flex>
          <v-text-field
            name="input-1"
            placeholder="Input your title here..."
            v-model="title"
            id="post-title"
            ></v-text-field>
          <v-flex xs6>
            <h3>Tags</h3>
          </v-flex>
          <v-text-field
            name="input-2"
            placeholder="Input your tags here...(split with ',')"
            v-model="tags"
            id="post-tags"
          ></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs6>
          <h3>Content</h3>
        </v-flex>
      </v-layout>
      <mavon-editor class="markdown-editor" v-model="content" ref=md @imgAdd="$imgAdd"></mavon-editor>
      <div class="button-part">
        <v-btn large color="success" dark @click="submit">Sumbit</v-btn>
        <v-btn large color="error" dark @click="clear">Clear</v-btn>
      </div>
    </v-container>
  </div>
</template>

<script>
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import postService from '@/services/postService'

export default {
  data () {
    return {
      title: '',
      tags: '',
      content: ''
    }
  },
  created () {
    this.fetchData()
  },
  components: {
    mavonEditor
  },
  methods: {
    async fetchData () {
      var getdata = await postService.getPost(this.$route.params.id)
      this.title = getdata.data.data.title
      this.tags = ''
      for (var tag of getdata.data.data.tags) {
        this.tags += tag.Content + ','
      }
      if (this.tags.length > 0) {
        this.tags = this.tags.slice(0, this.tags.length - 1)
      }
      this.content = getdata.data.data.content
    },
    async $imgAdd (pos, $file) {
      try {
        var formData = new FormData()
        formData.append('uploadFile', $file)
        var response = await postService.uploadImg(formData, $file.name, this.$store.state.token)
        this.$refs.md.$img2Url(pos, '/api/static/' + response.data.data.imgpath)
      } catch (err) {
        console.log(err.response)
      }
    },
    async submit () {
      try {
        var tagObjs = this.tags.split(',')
        var tagArr = []
        for (var tag of tagObjs) {
          tagArr.push({
            content: tag
          })
        }
        const response = await postService.updatePost({
          title: this.title,
          tags: tagArr,
          content: this.content
        }, this.$route.params.id, this.$store.state.token)
        console.log(response)
        this.$store.dispatch('addSuccess', response.data.msg)
        this.$router.push({name: 'Post', params: {id: this.$route.params.id}})
      } catch (err) {
        console.log(err)
        this.$store.dispatch('addError', err.response.data.msg)
      }
    },
    clear () {
      this.title = ''
      this.tags = ''
      this.content = ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#editor {
  margin: auto;
  width: 80%;
  margin-top: 0;
}
.form-content {
  height: 600px;
}
.markdown-editor {
  height: 100%;
  margin-top: 20px;
}
.button-part {
  margin-top: 20px;
}
</style>
