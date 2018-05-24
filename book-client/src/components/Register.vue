<template>
  <div>
    <form>
        <div class="form-group" v-on:submit.prevent="register">
            <label for="exampleInputEmail1">Username</label>
            <input type="text" class="form-control"  placeholder="Enter username" v-model="username">
        </div>
        <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <p style="color:red">{{error.mail}}</p>
            <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" v-model="email">
        </div>
        <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <p style="color:red">{{error.pass}}</p>
            <input type="password" placeholder="Password" v-model="password">
        </div>
        <button type="submit" class="btn btn-primary" @click="register">Submit</button>
    </form>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'Register',
  data: function () {
    return {
      username: '',
      email: '',
      password: ''
    }
  },
  computed: {
    ...mapState([
      'error'
    ])
  },
  methods: {
    register () {
      let body = {
        username: this.username,
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('signup', body)
    }
  }
}
</script>

<style>

</style>
