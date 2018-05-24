<template>
  <div>
    <nav class="navbar navbar-light bg-light">
      <form class="form-inline">
        <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" v-model="query">
        <button class="btn btn-outline-success my-2 my-sm-0" type="submit" @click="search">cari</button>
      </form>
    </nav>
    <div class="wrap">
        <button class="btn btn-primary" data-toggle="modal" data-target="#create">Tambah Buku Baru</button>
        <div class="modal" tabindex="-1" role="dialog" id='create'>
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Tambah Buku Baru</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <p>Judul Buku:</p>
                        <input type="text" class="form-control" v-model="title">
                        <p>Penulis:</p>
                        <input type="text" class="form-control" v-model="author">
                        <p>Penerbit:</p>
                        <input type="text" class="form-control" v-model="publisher">
                        <p>Foto Buku:</p>
                        <input type="file" class="form-control" id="image">
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" data-dismiss="modal" @click="addNewBook">Update</button>
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="card" style="width: auto margin: 20px;" v-for="(book, index) in books" v-bind:key="index">
      <div class="card" style="width: 18rem;">
        <img class="card-img-top" :src="book.imageUrl" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title">{{book.judul}}</h5>
          <p class="card-text"> Posted by : {{book.userId[0].username}}</p>
          <p class="card-text"> posted at {{book.createdAt | moment("MMMM Do YYYY, h:mm:ss")}}</p>
          <router-link :to="{ name: 'articledetail', params: { id: book._id }}"><h5 class="card-title">Detail</h5></router-link>
          <router-view/>
        </div>
      </div>
  </div>
  </div>  
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'Timeline',
  data: function () {
    return {
      query: '',
      title: '',
      author: '',
      publisher: ''
    }
  },
  computed: {
  ...mapState([
    'books'
  ])
  },
  created () {
    let headers = {
        token : window.localStorage["userbook-token"]
      }
    this.$store.dispatch('getAllPost', headers)
  },
  methods: {
    search () {
      let payload = this.query
      this.$store.dispatch('search', payload)
    },
    addNewBook () {
      let fileInput = document.querySelector('#image')
      let headers = {
        token : window.localStorage["userbook-token"]
      }

      let formData = new FormData()
      formData.append('judul', this.title)
      formData.append('judul', this.author)
      formData.append('judul', this.publisher)
      formData.append('image', fileInput.files[0])

      let payload = {
        headers, formData  
      }
      this.$store.dispatch('upload', payload)
    }
  }
}
</script>

<style>

</style>
