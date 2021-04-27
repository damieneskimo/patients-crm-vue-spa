<template>
    <div class="px-40 py-5">
      <div v-if="isLoggedin" class="flex justify-between">
        <router-link
          to="/patients"
          active-class="text-green-500"
          class="text-xl"
        >
          Patients
        </router-link>
        <button @click="logout" class="py-2 px-4 rounded bg-green-500 text-lg">Logout</button>   
      </div>

      <slot></slot>
    </div>
</template>

<script>
import { apiClient } from '@/api.js';

export default {
    name: 'Layout',
    props: ['isLoggedin'],
    methods: {
        logout() {
            apiClient.post('/logout').then(response => {
                if (response.status == 204) {
                    sessionStorage.setItem('loggedIn', 'false');
                    this.$emit('listenLogoutEvent', false)
                    this.$router.push('/login')
                }
            }).catch(error => {
                console.error(error);
            });
        },
    }
}
</script>

<style>

</style>