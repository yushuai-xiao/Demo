<template>
  <div class="dialog">
    <el-dialog
      :visible.sync = "dialogVisible"
      v-bind="$attrs"
      v-on="$listeners"
      width="30%"
    >
    <!-- 内容区域的默认插槽 -->
    <slot></slot>
    <!-- 使用弹框的foot插槽添加按钮 -->
    <template #footer>
      <!-- 对外继续暴露footer插槽，有个别弹框按钮需要自定义 -->
      <slot name="footer">
        <!-- 将取消与确定按钮集成的内部 -->
        <span>
          <el-button @click="$_handleCancel">取 消</el-button>
          <el-button type="primary" @click="$_handleConfirm">
              确定
          </el-button>
        </span>
      </slot>
    </template>
    </el-dialog>
  </div>
</template>

<script>
export default {
name:'pDialog',
inheritAttrs: false,
 props:{
  //  对外暴露visible属性，用于显示隐藏弹框
  visible:{
    type:Boolean,
    default:false
  }
 },
 created(){
   console.log(this.$attrs)
   console.log(this.$listeners)
 },
 computed:{
  //  通过计算属性，对.sync进行转换，外部也可以直接使用visible.sync
  dialogVisible:{
    get(){
      return this.visible
    },
    set(val){
      this.$emit('update:visible',val)
    }
  }
 },
 methods:{
  //  对外抛出cancel事件
  $_handleCancel(){
    this.$emit('cancel')
  },
  // 对外抛出confirm事件
  $_handleConfirm(){
    this.$emit('confirm')
  }
 }
}
</script>

<style>

</style>