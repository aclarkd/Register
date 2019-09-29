<template>
  <div class="holder">
    <form @submit.prevent="loadProjectSettings">
      <md-field>
        <label>Paste API Key, push enter</label>
        <md-input v-model="apiKey" v-on:focus="$event.target.select()"></md-input>
        <md-icon v-html="authenticationIcon"></md-icon>
      </md-field>
    </form>
    <div class="error-container" v-if="fetchError">
      <span><md-icon class="md-accent">lock</md-icon></span>
      <span>{{ fetchError }}</span>
    </div>
  
    <div v-if="projectName">
      <p  class="md-subheader">{{ projectName }} Registration Options</p>

      <md-field>
          <label for="rotation">Rotation</label>
          <md-select v-model="selectedRotation" name="rotation" id="rotation">
            <md-option v-for="availableRotation in availableRotations" 
              v-bind:key="availableRotation" 
              :value="availableRotation.rotationId">{{ availableRotation.rotationName }}</md-option>
          </md-select>
        </md-field>
    </div>

  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Register',
  data() {
    return {
      apiKey: '',
      fetchError: '',
      projectName: '',
      availableRotations: '',
      selectedRotation: ''
    }
  },
  methods: {
    loadProjectSettings() {
      axios.get('http://localhost:4000/project-settings', { headers: { Authorization: 'Bearer'.concat(' ', this.apiKey) } })
        .then(response => {
            this.projectName = response.data.project.name
            this.availableRotations = response.data.rotations
            this.fetchError = '';
        })
        .catch((error) => {
          if(error.response.status == 401) { // Auth Failed
            this.fetchError = "Authentication failed while fetching registration options with the API key provided. Please verify your key and try again."
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

<style lang="scss" scoped>

.holder {
  padding: 10px;
}

.icon-with-text {
  vertical-align: bottom;
}

.error-container md-icon {
  color: purple;
}

</style>