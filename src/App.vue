<template>
  <div id="app">
    <layout :isLoggedin="isLoggedin" @listenLogoutEvent="updateLoginStatus">
      <router-view :isLoggedin="isLoggedin" @listenLoginEvent="updateLoginStatus"></router-view>
    </layout>
  </div>
</template>

<script>
import Layout from './components/Layout.vue';

export default {
    components: { Layout },
    name: 'App',
    data() {
      return {
        isLoggedin: false
      }
    },
    beforeMount() {
      if (typeof window !== 'undefined' && sessionStorage.getItem('loggedIn') == 'true') {
        this.isLoggedin = true;
      }
    },
    methods: {
      updateLoginStatus(value) {
        this.isLoggedin = value
      }
    }
}
</script>
