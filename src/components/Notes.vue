<template>
    <div>
        <h1 class="text-2xl text-left">
            Notes for 
            <router-link 
                :to="{ name: 'home' }"
                class="text-green-500">
                {{ patient.name }} 
            </router-link>
        </h1>
        <button @click="showModal = true" class="py-2 px-4 rounded bg-green-500 text-lg mt-3 float-left">Add New Note</button>

        <div class="clear-both mt-20">
            <timeline v-if="! isLoading" :data="patient.notes"></timeline>
            <loader v-else></loader>
        </div>

        <modal v-if="showModal" @close="showModal = false" class="text-left">
            <h3 slot="header">Add New Note for {{ patient.name }}</h3>
            <form slot="body">
                <div class="my-5">
                    <textarea 
                        class="w-full border-2 rounded p-3 border-green-500"
                        name="content"
                        rows="4"
                        placeholder="Please enter the content"
                        v-model="content"
                        required>
                    </textarea>
                </div>
            </form>

            <div slot="footer">
                <button @click="addNote" class="py-3 px-5 rounded bg-green-500 text-lg right">Submit</button>
                <button @click="showModal = false" class="py-3 px-5 ml-3 rounded bg-gray-200 text-lg right">Cancel</button>
            </div>
        </modal>
    </div>
</template>

<script>
    import { apiClient } from '@/api.js'
    import Modal from './Modal'
    import Timeline from './Timeline'
    import Loader from './Loader'

    export default {
        name: 'Notes',
        data: function () {
            return {
                patient: {},
                showModal: false,
                content: '',
                isLoading: true,
            };
        },
        components: {Modal, Timeline, Loader},
        beforeMount() {
            apiClient.get('/sanctum/csrf-cookie')
                .then(() => {
                    apiClient.get('/api/patients/' + this.$route.params.id)
                        .then(response => {
                            if (response.status == 200) {
                                this.patient = response.data;
                                this.isLoading = false
                            }
                        }).catch(error => {
                            console.error(error);
                        });
                });
        },
        methods: {
            addNote() {
                apiClient.get('/sanctum/csrf-cookie')
                    .then(() => {
                        apiClient.post('/api/patients/' + this.patient.id + '/notes', {
                            content: this.content,
                        }).then(response => {
                            if (response.status == 201) {
                                this.patient.notes.unshift(response.data);
                                this.showModal = false;
                            }
                        }).catch(error => {
                            console.error(error);
                        });
                    });
            }
        }
    }
</script>