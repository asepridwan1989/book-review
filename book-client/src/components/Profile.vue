<template>
  <div>
    <h1>hi {{user}}</h1>
      <div class="wrap">
        <button class="btn btn-primary" data-toggle="modal" data-target="#create">Create Article</button>
        <div class="modal" tabindex="-1" role="dialog" id='create'>
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Create new article</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <p>title</p>
                        <input type="text" class="form-control"  placeholder="title" v-model="title">
                    </div>
                    <div>
                      <p>content</p>
                      <textarea class="form-control" id="exampleFormControlTextarea1" rows="10" placeholder="your content" v-model="content"></textarea>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" @click="uploadArticle" data-dismiss="modal">submit</button>
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <br>
    <h2>Your Article: </h2>
    <ArticleProf></ArticleProf>
  </div>
</template>

<script>
import ArticleProf from './ArticleProf'
export default {
  name: 'Profile',
  data : function () {
    return {
      user: window.localStorage['blog-username'],
      title: '',
      content: ''
    }
  },
  components: {
    ArticleProf
  },
  created () {
    let headers = {
        token : window.localStorage["blog-token"]
      }
    this.$store.dispatch('getSingpos', headers)
  },
  methods: {
    uploadArticle () {
      let body = {
        title: this.title,
        content: this.content
      }
      let headers = {
        token : window.localStorage["blog-token"]
      }
      let payload = {
        body,
        headers
      }
      this.$store.dispatch('upload', payload)      
      this.$store.dispatch('getSingpos', headers)
    }
  }
}
</script>

<style>

</style>
