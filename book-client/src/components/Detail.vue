<template>
  <div style="margin: 20px">
    <div class="card">
      <div class="card-body">
        <h1>{{singBook[0].judul}}</h1>
        <h5>Posted at: {{singBook[0].createdAt | moment("MMMM Do YYYY, h:mm:ss") }}</h5>
         <h5>Posted by: {{singBook[0].userId[0].username | moment("MMMM Do YYYY, h:mm:ss") }}</h5>
          <img :src="singBook[0].imageUrl" alt="image" width="30%">
      </div>
      <h5>liked : {{singBook[0].liked}} times</h5>
      <button type="button" class="btn btn-outline-secondary">vote up</button>
      <button type="button" class="btn btn-outline-secondary">vote down</button>
    </div>
    <br>
    <div class="form-group">
      <h3 for="exampleFormControlTextarea1">Reply Question</h3>
      <textarea class="form-control" id="exampleFormControlTextarea1" rows="5" v-model="comment"></textarea>
      <button type="button" class="btn btn-outline-secondary" @click="addComment">submit</button>
    </div>
  </div>  
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'Articledetail',
  data: function () {
    return {
      comment: ''
    }
  },
  created () {
    console.log(this.$route.params.id)
    this.$store.dispatch('getOneBook', this.$route.params.id)
    this.$store.dispatch('getComment', this.$route.params.id)
  },
    computed: {
    ...mapState([
      'singBook'
    ])
  },
  methods: {
    addComment () {
      let body = {
        bookId: this.$route.params.id,
        comment: this.comment
      }
      let headers = {
        token : window.localStorage["userbook-token"]
      }
      let payload = {
        body,
        headers
      }
      this.$store.dispatch('addComment', payload)
    }
  }
}
</script>

<style>

</style>