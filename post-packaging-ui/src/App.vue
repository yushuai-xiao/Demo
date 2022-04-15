<template>
  <div id="app">
    <app-main/>
  </div>
</template>

<script>
import AppMain from '@/views/main/main.vue'
export default {
  name: 'App',
  components: {
    AppMain
  },
  data(){
    return{
      tVisible:false
    }
  },
  methods:{
    $_handleOpened(){
      // this.tVisible = true
      console.log("listener opened")
    },
    $_handleConfirm(){
      this.tVisible = false
    },
    $_handleCancel(){
      this.tVisible = false  
    }
  }
}
</script>

<style>
  /* #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  } */
</style>
