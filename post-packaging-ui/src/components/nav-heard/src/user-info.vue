<template>
    <div class="user-info">
    <el-dropdown>
      <span class="el-dropdown-link">
        <div class="info">
          <el-avatar
            class="avatar"
            size="small"
            src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.huihua8.com%2Fuploads%2Fallimg%2F20190802kkk01%2F1531715080-WjJxDotcFZ.jpg&refer=http%3A%2F%2Fwww.huihua8.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1642732967&t=9359037e8e2def3c098ecded24c46fbd"
          ></el-avatar>
          <span>{{ name }}</span>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </div>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="handleExitClick">退出登录</el-dropdown-item>
          <el-dropdown-item divided></el-dropdown-item>
          <el-dropdown-item> 用户信息</el-dropdown-item>
          <el-dropdown-item>系统管理</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  name:'userInfo',
  data(){
    return{
      name:"admin",
    }
  },
  methods:{
    handleExitClick(){

    }
  }
}
</script>

<style lang="less" scoped>
  .info{
    margin-right: 30px;
    .avatar{
      vertical-align: middle;
    }
  }
</style>