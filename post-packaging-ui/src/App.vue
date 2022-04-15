<template>
  <div id="app">
    <!--外部使用方式 confirm cancel 是自定义的事件 opened是包装el-dialog的事件，通过$listeners传入到el-dialog里面-->
    <custom-dialog 
      title="提示lalla"
      top="120px"
      :visible.sync="tVisible"
      @opened="$_handleOpened" 
      @confirm="$_handleConfirm" 
      @cancel="$_handleCancel"
     >
     <div class="content">
       这是一段内容
     </div>
     </custom-dialog>
  <el-button @click="tVisible = true">显示对话框</el-button>
  </div>

</template>

<script>
import CustomDialog from './components/CustomDialog.vue'

export default {
  name: 'App',
  components: {
    CustomDialog
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
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
