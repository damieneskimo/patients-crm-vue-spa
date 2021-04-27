<template>
  <div class="min-h-screen flex justify-center items-center text-center">
        <form class="w-1/3">
            <h3 class="text-2xl">Patients CRM Login</h3>
            <div class="my-5">
                <input
                    class="w-full border-2 rounded p-3 border-green-500"
                    type="email"
                    name="email"
                    placeholder="Email"
                    v-model="email"
                    required
                />
            </div>
            <div class="my-5">
                <input
                    class="w-full border-2 rounded p-3 border-green-500"
                    type="password"
                    name="password"
                    placeholder="Password"
                    v-model="password"
                    required
                />
            </div>

            <p v-if="authError" class="text-red-400 p-3">Credentials not recognised. Please try again.</p>
            <p v-if="forbiddenError" class="text-red-400 p-3">Sorry, you don't have the permission to access.</p> 
            <p v-if="unknownError" class="text-red-400 p-3">There was an error submitting your details.</p>

            <button v-on:click="handleSubmit" class="py-4 px-8 rounded bg-green-500 text-lg">Login</button>  
        </form>
    </div>
</template>

<script>
import { apiClient } from '@/api.js'

export default {
    name: 'LoginForm',
    data: function () {
        return {
            email: '',
            password: '',
            authError: false,
            unknownError: false,
            forbiddenError: false,
            loggedIn: false
        }
    },
    methods: {
        handleSubmit(e) {
            e.preventDefault();

            apiClient.get('/sanctum/csrf-cookie')
                .then(() => {
                    apiClient.post('/login', {
                        email: this.email,
                        password: this.password
                    }).then(response => {
                        if (response.status === 204) {
                            this.login();
                        }
                    }).catch(error => {
                        if (error.response && error.response.status === 422) {
                            this.authError = true;
                        } else if (error.response.status === 403) {
                            this.forbiddenError = true;
                        } else {
                            this.unknownError = true;
                            console.error(error);
                        }
                    });
                });
        },
        login() {
            this.loggedIn = true;
            sessionStorage.setItem('loggedIn', 'true');
            this.$emit('listenLoginEvent', this.loggedIn)
            this.$router.push({name: 'patients'})
        },
    }
}
</script>

<style>

</style>