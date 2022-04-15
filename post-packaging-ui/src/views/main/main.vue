<template>
  <div class="main">
    <div class="left-aside">
      <nav-bar :isCollapse="isFold"/>
    </div>
    <div class="right-content">
      <nav-heard @foldChange="foldChange"/>
      <div class="main-content">
         lalal
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/nav-bar'
import NavHeard from "@/components/nav-heard"
export default {
  name:'AppMain',
  components:{
    NavBar,
    NavHeard
  },
  data(){
    return{
      isFold:false
    }
  },
  methods:{
    foldChange(isFold){
      this.isFold = isFold
    }
  }
}
</script>

<style lang="less" scoped>
  .main {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
  
    .right-content{
      width: 100%;
      .header{
        width: 100%;
        height: 56px;
        background-color: #0099CC;
      }
      .main-content{
        padding: 6px;
      }
    }
  }

</style>