<template>
  <div class="nav-heard">
    <div class="left">
      <div class="fold-menu" @click="handleFoldClick">
        <i class="el-icon-s-fold fold" v-if="!isFold"></i>
        <i class="el-icon-s-unfold fold" v-if="isFold"></i>
     </div>
    <breadcrumb class="breadcrumb" :breadcrumbs="breadcrumbs"/>    
    </div>

    <user-info/>
  </div>
</template>

<script>
import breadcrumb from '@/base-ui/breadcrumb'
import userInfo from './user-info.vue'
export default {
  name:'NavHeard',
  components:{
    breadcrumb,
    userInfo
  },
  data(){
    return{
      breadcrumbs:[
        {
          name:'首页',
          path:''
        },
        {
          name:'打卡',
          path:''
        },
        {
          name:'个人中心',
          path:''
        }
      ],
      isFold:false
    }
  },
  methods:{
    handleFoldClick(){
      this.isFold = !this.isFold
      this.$emit('foldChange',this.isFold)
    }
  }
}
</script>

<style lang="less" scoped>
  .nav-heard{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 15px;
    padding-right: 15px;
    width: 100%;
    height: 56px;
    background-color: #0099CC;
    .left{
      display: flex;
      align-items: center;
      .fold-menu{
        margin-right: 15px;
        width: 40px;
        .fold{
          font-size: 25px;
          color: #ffd04b;
        }
      }
    }
  }
</style>