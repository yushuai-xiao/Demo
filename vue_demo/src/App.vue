<template>
  <div id="app">
    <img src="./assets/logo.png">
    <HelloWorld/>
    <upload1/>
    
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'
import Upload1 from './components/upload1.vue'
import Upload from './components/upload1.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,
    Upload1
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
