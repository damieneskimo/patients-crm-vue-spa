<template>
  <div>
    <patients-list v-if="isLoggedin" :isLoggedin="isLoggedin" @listenLogoutEvent="updateLoginStatus"></patients-list>
    <login-form v-else :isLoggedin="isLoggedin" @listenLoginEvent="updateLoginStatus"></login-form>
  </div>
</template>

<script>
import PatientsList from './PatientsList'
import LoginForm from './LoginForm'

export default {
  name: 'Home',
  components: {
    PatientsList,
    LoginForm
  },
  mounted() {
    if (typeof window !== 'undefined' && sessionStorage.getItem('loggedIn') == 'true') {
      this.isLoggedin = true;
    } else {
      this.isLoggedin = false;
    }
  },
  data: function() {
    return {
      isLoggedin: false
    }
  },
  methods: {
    updateLoginStatus(value) {
      this.isLoggedin = value
    }
  }
}
</script>
