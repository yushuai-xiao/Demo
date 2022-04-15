<template>
  <div class="nav-breadcrumb">
    <el-breadcrumb separator="/">
      <template v-for="item in breadcrumbs"> 
        <el-breadcrumb-item :to="item.path" class="breadItem" :key="item.name">
          {{item.name}}
        </el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  props:{
    breadcrumbs:{
      type:Array,
      default:() => []
    }
  }
}
</script>

<style lang='less' scoped>
  .el-breadcrumb ::v-deep .el-breadcrumb__inner {
    // color: #f9ca24 !important;
  }
</style>