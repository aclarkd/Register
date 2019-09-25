<template>
  <div class="hello">
    <div class="holder">

      
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="./Register.css" scoped>

</style>