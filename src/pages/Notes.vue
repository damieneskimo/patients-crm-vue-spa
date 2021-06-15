<template>
    <div>
        <h1 class="text-2xl text-left">
            Notes for 
            <router-link 
                to="/patients"
                class="text-green-500">
                {{ name }} 
            </router-link>
        </h1>
        <button @click="showModal = true" class="py-2 px-4 rounded bg-green-500 text-lg mt-3 float-left">Add New Note</button>

        <div class="clear-both mt-20">
            <timeline v-if="! isLoading" :data="notes"></timeline>
            <loader v-else></loader>
        </div>

        <modal v-if="showModal" @close="showModal = false" class="text-left">
            <h3 slot="header">Add New Note for {{ name }}</h3>
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
    import Modal from '@/components/Modal'
    import Timeline from '@/components/Timeline'
    import Loader from '@/components/Loader'
    import { mapState } from 'vuex'

    export default {
        name: 'Notes',
        components: { Modal, Timeline, Loader },
        props: ['name'],
        data: function () {
            return {
                showModal: false,
                content: '',
            };
        },
        computed: {
            ...mapState('notes', [
                'notes',
            ]),
            ...mapState('general', [
                'isLoading',
            ]),
        },
        created() {
            this.$store.dispatch('notes/getAllNotes', this.$attrs.id)
        },
        methods: {
            addNote() {
                this.isLoading = true

                this.$store.dispatch(
                    'notes/addNote', 
                    {
                        patientId: this.$attrs.id, 
                        data: {
                            content: this.content
                        }
                    }
                ).then(() => {
                    this.showModal = false
                    this.isLoading = false
                })
            }
        }
    }
</script>