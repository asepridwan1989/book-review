import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import swal from 'sweetalert'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    books: '',
    user: '',
    error: '',
    errorLog: '',
    artProf:'',
    singBook: ''
  },
  mutations: {
    setError (state, payload) {
      console.log('commit', payload)
      state.error = payload
    },
    setErrorLog (state, payload) {
      console.log('commit', payload)
      state.errorLog = payload
    },
    setBook (state, payload) {
      state.artProf = payload
    },
    setBookHome (state, payload) {
      state.books = payload
    },
    setOneBook (state, payload) {
      state.singBook = payload
    }
  },
  actions: {
    signup: function (context, payload) {
      console.log(payload)
      axios.post('http://localhost:3000/users/signup', payload)
        .then(response => {
          console.log('success', response)
          swal('successfuly registered')
        })
        .catch(function (err) {
          console.log(err.response.data.message)
          let errorMsg = err.response.data.message
          context.commit('setError', errorMsg)
        })
    },
    signin: function (context, payload) {
      console.log(payload)
      axios.post('http://localhost:3000/users/signin', payload)
        .then(response => {
          console.log('success', response.data.dataUser.username)
          let token = response.data.token
          let userbook = response.data.dataUser.username
          localStorage.setItem('userbook-username', userbook)
          localStorage.setItem('userbook-token', token)
          swal('successfuly logged in')
          window.location.reload(true)
        })
        .catch(function (err) {
          console.log(err.response.data.message)
          let errorMsg = err.response.data.message
          context.commit('setErrorLog', errorMsg)
        })
    },
    upload: function (context, payload) {
      let headers = payload.headers
      axios.post('http://localhost:3000/books', payload.formData, {headers})
      .then(response => {
        console.log('success', response.data)
      })
      .catch(function (err) {
        console.log(err)
      })
    },
    getSingpos: function (context, payload) {
      console.log(payload)
      axios.get('http://localhost:3000/articles/profile', {headers: payload})
      .then(response => {
        console.log('success', response.data)
        context.commit('setBook', response.data.data)
      })
      .catch(function (err) {
        console.log(err)
      })
    },
    deleteArticle: function (context, payload) {
      console.log(payload)
      axios.delete(`http://localhost:3000/articles/${payload.id}`, {headers: payload.headers})
        .then( response => {
            swal('successfuly deleted article') 
            window.location.reload(true);
        })
        .catch( err => {
            // this.error = err.response.data.message
        })
    },
    getAllPost: function (context, payload) {
      axios.get('http://localhost:3000/books', {headers: payload})
      .then(response => {
        console.log('success', response.data)
        context.commit('setBookHome', response.data.data)
      })
      .catch(function (err) {
        console.log(err)
      })
    },
    updateArticle: function (context, payload) {
      console.log(payload)
      axios.put(`http://localhost:3000/articles/${payload.id}`, payload.body, {headers: payload.headers})
      .then(response => {
        console.log('success', response.data)
        swal('successfuly updated article') 
        context.commit('setBookHome', response.data.data)
      })
      .catch(function (err) {
        console.log(err)
      })
    },
    search: function (context, payload) {
      axios.get(`http://localhost:3000/articles/search?title=${payload}`)
      .then(response => {
        console.log('success', response.data)
        context.commit('setBookHome', response.data.data)
      })
      .catch(function (err) {
        console.log(err)
      })
    },
    getOneBook (context, payload) {
      axios.get(`http://localhost:3000/books/${payload}`)
      .then(response => {
        console.log('success', response.data)
        context.commit('setOneBook', response.data.data)
      })
      .catch(function (err) {
        console.log(err)
      })
    },
    addComment (context, payload) {
      axios.post('http://localhost:3000/comments', payload.body, {headers: payload.headers})
      .then(response => {
        console.log('success', response.data)
      })
      .catch(function (err) {
        console.log(err)
      })
    }
  }  
})
