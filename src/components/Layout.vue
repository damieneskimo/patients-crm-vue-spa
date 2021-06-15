<template>
    <div class="px-40 py-5">
      <div v-if="user" class="flex justify-between">
        <router-link
          to="/patients"
          active-class="text-green-500"
          class="text-xl"
        >
          Patients
        </router-link>
        <div>
          <span>Hi, {{ user.name }}</span>
          <button @click="logout" class="py-2 px-4 text-lg">Logout</button>
        </div>
      </div>

      <slot></slot>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'Layout',
    computed: {
      ...mapState('auth', [
        'user'
      ]),
    },
    mounted () {
      this.$store.dispatch('auth/getUser')
        .catch(error => {
          if (error.response.status === 401) {
            this.logout()
          }
        });
    },
    methods: {
      logout() {
        this.$store.dispatch('auth/logout')
          .then(() => {
            this.$router.push('/login')
          })
      }
    }
}
</script>
