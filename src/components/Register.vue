<template>
  <div class="hello">
    <div class="holder">
      
      <md-field>
        <label>API Key</label>
        <md-input v-model="apiKey"></md-input>
        <md-icon>lock</md-icon>
      </md-field>

      <p>{{ apiKey }}</p>
      <form @submit.prevent="addQuestion">
        <input type="text" placeholder="enter a skill" v-model="question">
      </form>

      <ul>
        <transition-group nane="list" enter-active-class="animated bounceInUp" leave-active-class="animated bounceOutRight">
          <li v-for="(data, index) in questions" :key='index'>
            {{ data.question }} 
            <button v-on:click="removeQuestion(index)">remove</button>
          </li>  
        </transition-group>
      </ul>
    
      <p>Here are your selected values</p>
    </div>
  </div>
  
</template>

<script>
export default {
  name: 'Register',
  data() {
    return {
      apiKey: '',
      question: '',
      questions: [
        { "question": "How heard?" },
        { "question": "Price Range" }
      ]
    }
  },
  methods: {
    addQuestion() {
      this.questions.push({question: this.question})
      this.question = ''
    },
    removeQuestion(index) {
      this.$delete(this.questions, index)
    }
  }
}
</script>

<style scoped>

@import "https://cdn.jsdelivr.net/npm/animate.css@3.5.1";

.item-added-enter-active {
  animation: bounce-in .5s;
}

.item-added-leave-active {
  animation: bounce-in .5s reverse;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}

</style>