<template>
  <modal v-if="modalIsOpen" @close="closeModal">
    <h3 slot="header">{{ title }}</h3>
    
    <form slot="body">
      <div class="mb-3">
        <label for="company_name" class="form-label">Company Name</label>
        <input
          class="border-2 rounded p-3 form-control"
          name="company_name"
          v-model="formFields.company_name"
          required
          />
      </div>
      <div class="mb-3">
        <label for="address" class="form-label">Address</label>
        <input
            class="border-2 rounded p-3 form-control"
            name="address"
            v-model="formFields.address"
        />
      </div>
      <div class="mb-3">
        <label for="phone" class="form-label">Phone</label>
        <input
            class="border-2 rounded p-3 form-control"
            name="phone"
            v-model="formFields.phone"
        />
      </div>
    </form>

    <div slot="footer">
      <button @click="saveClient" type="submit" class="py-3 px-5 rounded bg-green-500 text-lg right">Submit</button>
      <button @click="closeModal" class="py-3 px-5 ml-3 rounded bg-gray-200 text-lg right">Cancel</button>
    </div>
  </modal>
</template>

<script>
  import { mapState } from 'vuex';
  import Modal from './Modal';

  export default {
    name: 'EditClient',
    components: { Modal },
    computed: {
        ...mapState('clients', [
            'currentClient',
            'modalIsOpen',
        ]),
        title() {
          if (this.currentClient) {
            return 'Edit ' + this.currentClient.company_name;
          }
          return 'Add New Client';
        },
        clientId() {
          return ! this.currentClient? '' : this.currentClient.id
        }
    },
    data: function() {
      return {
        formFields: {
          company_name: '',
          address: '',
          phone: ''
        }
      }
    },
    mounted() {
      this.formFields = { ...this.currentClient }
    },
    watch: {
      '$store.state.clients.currentClient': function() {
        this.formFields = { ...this.currentClient }
      }
    },
    methods: {
      saveClient() {
        if (this.clientId) {
          // use method spoofing for put request
          this.formFields._method = 'PUT'
        }
        this.$store.dispatch('clients/createOrUpdateClient', {
          clientId: this.clientId,
          data: this.formFields
        }).then(() => {
          this.closeModal()
          // clear form fields value after success
          this.formFields = {}
        })
      },
      closeModal() {
        this.$store.dispatch('clients/setModalStatus', false);
      }
    }
  }
</script>
