<template >
    <div>
        <p style="color:red">{{errorLog}}</p>
            <form>
                <div class="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <input type="text" class="form-control" aria-describedby="emailHelp" placeholder="Enter email" v-model="email">
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" v-model="password">
                </div>
                <div class="form-check">
                </div>
                <button type="submit" class="btn btn-primary" @click="login">Login</button>
            </form>
    </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'Login',
  data: function () {
    return {
      email: '',
      password: ''
    }
  },
  computed: {
    ...mapState([
      'errorLog'
    ])
  },
  methods: {
    login () {
      let body = {
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('signin', body)
    }
  }
}
</script>

<style>

</style>
