<template>
  <div class="holder">
    <form @submit.prevent="getProjectSettings">
    <md-field>
      <label>API Key</label>
      <md-input v-model="apiKey" v-on:focus="$event.target.select()"></md-input>
      <md-icon v-html="authenticationIcon"></md-icon>
    </md-field>
    {{ fetchError }}
    </form>
  
    <p>Project Settings</p>

    <p>{{ projectSettings }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Register',
  data() {
    return {
      apiKey: '',
      projectSettings: '',
      fetchError: ''
    }
  },
  methods: {
    getProjectSettings() {
      this.$nextTick()
      .then(function (args) {
        console.log(args)
        console.log(this.apiKey)
      })
      
      axios.get('http://localhost:4000/project-settings', { headers: { Authorization: 'Bearer'.concat(' ', this.apiKey) } })
        .then(response => {
            this.projectSettings = response.data
            this.fetchError = '';
        })
        .catch((error) => {
          if(error.response.status == 401) { // Auth Failed
            this.fetchError = "Authentication failed while fetching registration options with the key provided. Please verify your key and try again."
          }
          if(error.response.status == 500) { // Not sure what happened
            this.fetchError = "Well... we're not sure what happened, but it didn't work. Grab a coffe and try again, if that doesn't work contact Lasso."
          }
        });
    }
  },
  computed: {
    authenticationIcon: function () {
      return this.projectSettings ? '&#xe898' : '&#xe897'
    }
  }
}
</script>

<style scoped>

.holder {
  padding: 10px;
}
</style>