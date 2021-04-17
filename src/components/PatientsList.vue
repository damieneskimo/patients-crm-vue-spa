<template>
  <div>
    <div class="flex justify-between">
      <h1 class="text-2xl">Patients</h1>
      <button @click="logout" class="py-2 px-4 rounded bg-green-500 text-lg">Logout</button>  
    </div>

    <router-view></router-view>
    <div class="text-left mt-5">
      <button @click="showModal = true" class="py-2 px-4 rounded bg-green-500 text-lg mr-3">Add New Patient</button>
      <input v-model="keywords"
          placeholder="Search by name"
          class="border-2 border-green-500 rounded w-1/4 py-2 px-4">
    </div>

    <table v-if="! isLoading" class="mt-3 mx-auto w-full table-auto">
      <thead>
        <tr class="border-b border-green-500 pb-3">
          <th class="text-left py-3 text-lg">Name</th>
          <th class="text-left text-lg">Gender</th>
          <th class="text-left text-lg">Mobile</th>
          <th class="text-left text-lg">Email</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody class="text-left">
        <Patient v-for="patient in filteredPatients" :key="patient.id" :data="patient" />
      </tbody>
    </table>
    <loader v-else></loader>

    <!-- Add New Patient Modal -->
    <modal v-if="showModal" @close="showModal = false" class="text-left">
        <h3 slot="header">Add New Patient</h3>
        <form slot="body">
          <div class="my-5">
            <input
              class="w-full border-2 rounded p-3 border-green-500"
              name="name"
              placeholder="Name"
              v-model="patient.name"
              required
              />
          </div>
          <div class="my-5">
            <input
              class="w-full border-2 rounded p-3 border-green-500"
              type="email"
              name="email"
              placeholder="Email"
              v-model="patient.email"
              required
              />
          </div>
          <div class="my-5">
            <select v-model="patient.gender" class="w-full border-2 rounded p-3 border-green-500">
              <option disabled value="">Please select a gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="rather not say">Rather Not Say</option>
            </select>
          </div>
          <div class="my-5">
            <input
                class="w-full border-2 rounded p-3 border-green-500"
                name="mobile"
                placeholder="Mobile"
                v-model="patient.mobile"
            />
          </div>
        </form>

        <div slot="footer">
          <button @click="addNewPatient" class="py-3 px-5 rounded bg-green-500 text-lg right">Submit</button>
          <button @click="showModal = false" class="py-3 px-5 rounded bg-gray-200 ml-3 text-lg right">Cancel</button>
        </div>
    </modal>
  </div>
</template>

<script>
  import Patient from './Patient'
  import { apiClient } from '@/api.js'
  import Modal from './Modal';
  import Loader from './Loader';

  export default {
    name: 'PatientsList',
    components: {
      Patient, Modal, Loader
    },
    props: ['isLoggedin'],
    data: function () {
      return {
        patients: [],
        keywords: '',
        patient: {},
        showModal: false,
        isLoading: true
      }
    },
    mounted() {
      if (this.isLoggedin) {
        apiClient.get('/api/patients')
          .then(response => {
              this.patients = response.data;
              this.isLoading = false;
          })
          .catch(error => console.error(error));
      }
    },
    computed: {
      filteredPatients() {
        return this.patients.filter(patient => {
          let haystack = patient.name.toLowerCase();
          return haystack.includes(this.keywords.toLowerCase())
        })
      }
    },
    methods: {
      logout() {
        apiClient.post('/logout').then(response => {
            if (response.status == 204) {
              sessionStorage.setItem('loggedIn', 'false');
              this.$emit('listenLogoutEvent', false)
            }
          }).catch(error => {
              console.error(error);
          });
      },
      addNewPatient() {
        apiClient.get('/sanctum/csrf-cookie')
          .then(() => {
              apiClient.post('/api/patients/', this.patient).then(response => {
                if (response.status == 201) {
                  this.patients.unshift(response.data);
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
