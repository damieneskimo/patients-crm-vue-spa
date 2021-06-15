<template>
  <tr v-if="Object.keys(patient).length != 0">
    <td><img :src="patient.profile_photo" alt="profile" class="h-16" /></td>
    <td class="py-3">{{ patient.name }}</td>
    <td>{{ patient.gender }}</td>
    <td>
      {{ patient.mobile }}
    </td>
    <td>
      {{ patient.email }}
    </td>
    <td class="text-center">
      <a @click="showModal = true" class="py-1 px-6 rounded bg-green-400 text-lg mr-3 cursor-pointer">Edit</a>
      <router-link 
        :to="{ name: 'notes', params: { id: patient.id, name: patient.name } }"
        class="py-1 px-6 rounded bg-green-400 text-lg">
          Notes
      </router-link>
    </td>

    <!-- edit patient modal -->
    <modal v-if="showModal" @close="showModal = false">
        <h3 slot="header">Edit {{ patient.name }}</h3>
        <form slot="body">
          <div className="my-5 flex">
                <img :src="patient.profile_photo" alt="profile" className="h-32" />
                <div className="w-full pl-3">
                  <p className="mb-3">Update profile photo</p>
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
              v-model="patient.name"
              required
              />
          </div>
          <div class="my-5">
            <select v-model="patient.gender" class="w-full border-2 rounded p-3 border-green-500">
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="rather not say">Rather Not Say</option>
            </select>
          </div>
          <div class="my-5">
            <input
                class="w-full border-2 rounded p-3 border-green-500"
                name="mobile"
                v-model="patient.mobile"
            />
          </div>
        </form>

        <div slot="footer">
          <button @click="editPatient" class="py-3 px-5 rounded bg-green-500 text-lg right">Submit</button>
          <button @click="showModal = false" class="py-3 px-5 ml-3 rounded bg-gray-200 text-lg right">Cancel</button>
        </div>
    </modal>
  </tr>
</template>

<script>
import Modal from './Modal'

export default {
  name: 'Patient',
  components: {
    Modal
  },
  data: function () {
    return {
      patient: Object.assign({}, this.data),
      showModal: false
    }
  },
  props: {
    data: Object,
  },
  methods: {
    editPatient() {
      const formData = new FormData();
      for (const [key, value] of Object.entries(this.patient)) {
        formData.append(key, value);
      }
      formData.append('_method', 'put')
      const file = document.getElementById('profile_photo');
      formData.append('profile_photo', file.files[0], file.files[0].name)
      
      this.$store.dispatch('patients/editPatient', {
        patientId: this.patient.id,
        data: formData
      }).then(() => {
        this.showModal = false
      })
    }
  }
}
</script>
