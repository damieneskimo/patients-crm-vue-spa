<template>
    <div>
        <h1 class="text-2xl text-left">
            Notes for 
            <router-link 
                to="/patients"
                class="text-green-500">
                {{ patientName }} 
            </router-link>
        </h1>
        <button @click="showModal = true" class="py-2 px-4 rounded bg-green-500 text-lg mt-3 float-left">Add New Note</button>

        <div class="clear-both mt-20">
            <timeline v-if="! isLoading" :data="notes"></timeline>
            <loader v-else></loader>
        </div>

        <modal v-if="showModal" @close="showModal = false" class="text-left">
            <h3 slot="header">Add New Note for {{ patientName }}</h3>
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
    import Modal from '@/components/Modal'
    import Timeline from '@/components/Timeline'
    import Loader from '@/components/Loader'

    export default {
        name: 'Notes',
        data: function () {
            return {
                patientName: '',
                notes: [],
                showModal: false,
                content: '',
                isLoading: true,
            };
        },
        components: { Modal, Timeline, Loader },
        beforeRouteEnter (to, from, next) {
            next(vm => {
                if (! vm.$attrs.isLoggedin) {
                    vm.$router.push('/login')
                } else {
                    vm.fetchNotes('/api/patients/' + to.params.id + '/notes', (data) => {
                        vm.notes = data.data;
                        vm.isLoading = false;
                    })
                }
            })
        },
        methods: {
            fetchNotes(apiUrl, callback) {
                apiClient.get(apiUrl)
                    .then(response => {
                        if (response.status == 200) {
                            callback(response.data)
                        }
                    }).catch(error => {
                        console.error(error);
                    });
            },
            addNote() {
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
            }
        }
    }
</script>