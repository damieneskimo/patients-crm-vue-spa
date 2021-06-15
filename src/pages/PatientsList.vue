<template>
  <div>
    <div class="text-left mt-5">
      <button @click="showModal = true" class="py-2 px-4 rounded bg-green-500 text-lg">Add New Patient</button>
    </div>
    <div class="mt-3">
      <select v-model="gender" @change="filterByGender" class="border-2 rounded px-4 py-2.5 border-green-500 mr-5">
        <option disabled value="">Please select a gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="rather not say">Rather Not Say</option>
      </select>
      <input v-model="keywords" placeholder="Search by name or email"
        class="border-2 border-green-500 rounded w-1/4 py-2 px-4">
      <button @click="handleKeywordsChange" class="py-2 px-4 rounded bg-green-200 text-lg ml-3">Search</button>
      <button @click="handleClearFilters" class="py-2 px-4 rounded bg-green-100 text-lg ml-3">Clear</button>
    </div>

    <div v-if="! isLoading">
      <table class="mt-3 mx-auto w-full table-auto">
        <thead>
          <tr class="border-b border-green-500 pb-3">
            <th class="py-3"></th>
            <th class="text-left py-3 text-lg">Name</th>
            <th class="text-left text-lg">Gender</th>
            <th class="text-left text-lg">Mobile</th>
            <th class="text-left text-lg">Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody class="text-left">
          <patient v-for="patient in patients" :key="patient.id" :data="patient" />
        </tbody>
      </table>

      <pagination :total-pages="meta.totalPages" :total="meta.total" :per-page="meta.perPage" :current-page="meta.currentPage"
      :has-more-pages="hasMorePages" @pagechanged="pageChangeHandler" class="text-2xl my-5" />
    </div>
    <loader v-else></loader>

    <!-- Add New Patient Modal -->
    <modal v-if="showModal" @close="showModal = false" class="text-left">
        <h3 slot="header">Add New Patient</h3>
        <form slot="body">
          <div className="my-5">
                <div className="w-full pl-3">
                  <label className="mb-3" for="profile_photo">Update profile photo</label>
                  <input
                    type="file"
                    className="w-full border-2 rounded p-3 border-green-500"
                    name="profile_photo"
                    id="profile_photo"
                  />
                </div>
          </div>
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
          <button @click="addPatient" class="py-3 px-5 rounded bg-green-500 text-lg right">Submit</button>
          <button @click="showModal = false" class="py-3 px-5 rounded bg-gray-200 ml-3 text-lg right">Cancel</button>
        </div>
    </modal>
  </div>
</template>

<script>
  import Patient from '@/components/Patient'
  import Modal from '@/components/Modal';
  import Loader from '@/components/Loader';
  import Pagination from '@/components/Pagination';
  import { mapState } from 'vuex';

  export default {
    name: 'PatientsList',
    components: {
      Patient, Modal, Loader, Pagination
    },
    data: function () {
      return {
        patient: {},
        showModal: false,
        hasMorePages: true,
        queryString: window.location.search,
        keywords: '',
        gender: ''
      }
    },
    computed: {
      ...mapState('patients', [
        'patients',
        'meta',
      ]),
      ...mapState('general', [
        'isLoading'
      ])
    },
    mounted() {
      this.queryString = window.location.search;
      let searchParams = new URLSearchParams(this.queryString)

      this.$store.dispatch('patients/getAllPatients', this.queryString)
        .then(() => {
          if (searchParams.has('keywords')) {
            this.keywords = searchParams.get('keywords')
          }
          if (searchParams.has('gender')) {
            this.gender = searchParams.get('gender')
          }
        })
    },
    methods: {
      handleKeywordsChange() {
        let searchParams = new URLSearchParams(this.queryString);
        if (searchParams.has('page')) {
          searchParams.delete('page')
        }
        searchParams.set('keywords', this.keywords);
        this.queryString = '?' + searchParams.toString();

        this.$store.dispatch('patients/getAllPatients', this.queryString)
          .then(() => {
            window.history.pushState({}, '', window.location.href.split('?')[0] + this.queryString);
          })
      },
      addPatient() {
        const formData = new FormData();
        for (const [key, value] of Object.entries(this.patient)) {
          formData.append(key, value);
        }
        const file = document.getElementById('profile_photo');
        formData.append('profile_photo', file.files[0], file.files[0].name)

        this.$store.dispatch('patients/addPatient', {
          data: formData
        }).then(() => {
          this.showModal = false
        })
      },
      pageChangeHandler(pageNum) {
        this.currentPage = pageNum;
        let searchParams = new URLSearchParams(this.queryString);
        searchParams.set('page', pageNum)
        this.queryString = '?' + searchParams.toString();

        this.$store.dispatch('patients/getAllPatients', this.queryString)
          .then(() => {
            window.history.pushState({}, '', window.location.href.split('?')[0] + this.queryString);
          })
      },
      filterByGender() {
        let searchParams = new URLSearchParams(this.queryString);
        searchParams.set('gender', this.gender)
        this.queryString = '?' + searchParams.toString();
        
        this.$store.dispatch('patients/getAllPatients', this.queryString)
          .then(() => {
            window.history.pushState({}, '', window.location.href.split('?')[0] + this.queryString);
          })
      },
      handleClearFilters() {
        this.queryString = ''
        this.gender = ''
        this.keywords = ''
        this.$store.dispatch('patients/getAllPatients', this.queryString)
          .then(() => {
            window.history.pushState({}, '', window.location.href.split('?')[0])
          })
      }
    }
  }
</script>
