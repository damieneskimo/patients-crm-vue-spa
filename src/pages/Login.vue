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
            <p class="mb-5">For mock data, you can use any email and password combination</p>
            <button v-on:click="handleSubmit" class="py-4 px-8 rounded bg-green-500 text-lg">Login</button>  
        </form>
    </div>
</template>

<script>
export default {
    name: 'Login',
    data: function () {
        return {
            email: '',
            password: '',
            authError: false,
            forbiddenError: false,
        }
    },
    methods: {
        handleSubmit(e) {
            e.preventDefault();

            this.$store.dispatch('auth/login', {
                data: {
                    email: this.email,
                    password: this.password
                }
            }).then(() => {
                this.$router.push('/patients')
            }).catch((error) => {
                if (error.response && error.response.status === 422) {
                    this.authError = true;
                } else if (error.response.status === 403) {
                    this.forbiddenError = true;
                }
            })
        }
    }
}
</script>
