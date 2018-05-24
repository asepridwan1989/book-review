<template>
  <div>
    <div class="card" style="width: auto;" v-for="(article, index) in artProf" v-bind:key="index">
    <div class="card-body">
      <h5 class="card-title">{{article.title}}</h5>
      <h6 class="card-subtitle mb-2 text-muted">posted at: {{article.createdAt | moment("MMMM Do YYYY, h:mm:ss")}}</h6>
      <h6 class="card-subtitle mb-2 text-muted">last update: {{article.updatedAt | moment("MMMM Do YYYY, h:mm:ss")}}</h6>
      <p style="text-align: justify;">{{article.content}}</p>
    </div>
    <div class="d-flex flex-row">
      <div class="p-2">
        <div class="wrap">
        <button class="btn btn-outline-secondary" data-toggle="modal" data-target="#update" >Edit Article</button>
        <div class="modal" tabindex="-1" role="dialog" id='update'>
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Edit article</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <p>title</p>
                        <input type="text" class="form-control" v-model="title">
                    </div>
                    <div>
                      <p>content</p>
                      <textarea class="form-control" id="exampleFormControlTextarea1" rows="10" placeholder="your content" v-model="content"></textarea>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-outline-secondary" data-dismiss="modal" :data-id="article._id" @click="updateArticle">submit</button>
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
      </div>
      </div>
      <div class="p-2">
        <button @click="deleteArt" :data-id="article._id" class="btn btn-outline-secondary" >delete</button>
      </div>
    </div>   
  </div>
  </div>  
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'ArticleProf',
  data: function () {
    return {
      title: '',
      content: ''
      }
  },
  computed: {
    ...mapState([
      'artProf'
    ])
  },
  methods: {
    deleteArt () {
      let id = event.srcElement.dataset.id
      let headers = {
            token : window.localStorage["blog-token"]
          }
      let payload = {
        id,
        headers
      }
      this.$store.dispatch('deleteArticle', payload)
      // this.$store.dispatch('getSingpos', headers)
    },
    updateArticle() {
      let id = event.srcElement.dataset.id
      let body = {
              title : this.title,
              content : this.content 
          }
      let headers = {
            token : window.localStorage["blog-token"]
          }
      let payload = {
        id,
        body,
        headers
      }
      console.log('payload', payload)
      this.$store.dispatch('updateArticle', payload)
      this.$store.dispatch('getSingpos', payload.headers)
      this.$store.dispatch('getAllPost')
    }
  }
}
</script>

<style>

</style>
