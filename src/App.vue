<template>
  <div id="app">
      <nav>
        <router-link to="/">Home</router-link>
        <router-link to="/about">About</router-link>
      </nav>
    <router-view/>
  </div>
</template>

<script>
import Register from './components/Register.vue'

export default {
  name: 'app',
  components: {
    Register
  }
}
</script>

<style>
@import url('//fonts.googleapis.com/css?family=Roboto:400,500,700,400italic|Material+Icons');
</style>
