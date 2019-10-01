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
      <span class="md-title">Select your registration options for: {{ projectName }}</span>

      <md-field>
        <label for="rotation">Rotation</label>
        <md-select v-model="selected.rotation" name="rotation" id="rotation">
          <md-option v-for="rotation in availableRotations" 
            v-bind:key="rotation.rotationId" 
            :value="rotation.rotationId">{{ rotation.rotationName }}</md-option>
        </md-select>
      </md-field>

      <md-field>
        <label for="auto-reply">Auto Reply Template</label>
        <md-select v-model="selected.autoReply" name="auto-reply" id="auto-reply">
          <md-option v-for="autoReply in availableAutoReplyTemplates" 
            v-bind:key="autoReply.templateId" 
            :value="autoReply.templateId">{{ autoReply.name }}</md-option>
        </md-select>
      </md-field>

      <md-field>
        <label for="website-tracking">Website Trackers</label>
        <md-select v-model="selected.trackingDomain" name="website-tracking" id="website-tracking">
          <md-option v-for="trackingDomain in availableTrackingDomains" 
            v-bind:key="trackingDomain.domainAccountId" 
            :value="trackingDomain.domainAccountId">{{ trackingDomain.domain }}</md-option>
        </md-select>
      </md-field>

      <div class="block">
          <div class="title">Spam Deterrent</div>
          <div class="input">
            <md-checkbox name="honeypot" id="honeypot" v-model="selected.honeypot">Include Honeypot</md-checkbox>
          </div>
      </div>

      <div class="block">
          <div class="title">Questions</div>
          <div class="input">
            <md-checkbox class="question-checkbox-container" v-model="selected.questions" v-for="question in availableQuestions" 
              v-bind:key="question.questionId"
              :value="question.questionId">{{ question.name }}
              <div v-if="selected.questions.includes(question.questionId)">
                <ul>
                  <li>yes its there</li>
                </ul>
              </div>
            </md-checkbox>
          </div>
      </div>

    </div>

    <span>{{ selected }}</span>
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
      availableAutoReplyTemplates: '',
      availableTrackingDomains: '',
      availableQuestions: '',
      selected: {
        rotation: '',
        autoReply: '',
        trackingDomain: '',
        honeypot: '',
        questions: []
      }
    }
  },
  methods: {
    loadProjectSettings() {
      axios.get('http://localhost:4000/project-settings', { headers: { Authorization: 'Bearer'.concat(' ', this.apiKey) } })
        .then(response => {
            this.projectName = response.data.project.name
            this.availableRotations = response.data.rotations
            this.availableAutoReplyTemplates = response.data.autoReplyTemplates
            this.availableTrackingDomains = response.data.websiteTracking
            this.availableQuestions = response.data.questions
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
      return this.projectName ? '&#xe898' : '&#xe897'
    }
  }
}
</script>

<style lang="scss" scoped>

.holder {
  padding: 10px;
}

.md-checkbox {
  display: flex;
}

#question-checkbox-container .md-checkbox-label {
  height: auto;
}

</style>