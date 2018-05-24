<template>
  <div class="home">
    <div class="d-flex justify-content-center" v-if="!statTok">
      <div class="p-2">
        <div class="card" style="width: 18rem;">
          <h3>Register</h3>
          <Register></Register>
        </div>
      </div>
      <div class="p-2">
        <div class="card" style="width: 18rem;">
          <h3>Login</h3>
          <Login></Login>
        </div>
      </div>
    </div>
    <Conten v-if="statTok"></Conten>
  </div>
</template>

<script>
// @ is an alias to /src
import Register from '@/components/Register.vue'
import Login from '@/components/Login.vue'
import Conten from '@/components/Conten.vue'

export default {
  name: 'home',
  components: {
    Register,
    Login,
    Conten
  },
  data () {
    return {
      token: window.localStorage['userbook-token'],
      statTok: ''
    }
  },
  created () {
    if (this.token) {
      this.statTok = true
    } else {
      this.statTok = false
    }
  }
}
</script>

<style scoped>
.home{
  background-color: grey;
}
</style>
