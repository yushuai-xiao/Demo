<template>
    <div class="user-img">
      <el-upload
        action="https://jsonplaceholder.typicode.com/posts/"
        :show-file-list="false"
        :before-upload="beforeAvatarUpload"
        :http-request="uploadFile"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i style="font-size: 25px" v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </div>
</template>

<script>
  // import { getHeaderImg } from "@/api/system/user";
    export default {
        name: "uploadImg",
      props: ['path'],
      data(){
        return{
          imageUrl:'',
          beforeLoad:true
        }
      },
      created(){
        this.imageUrl=this.path;
      },
      methods:{
        uploadFile(data){
          let formdata = new FormData();
          formdata.append('file',data.file);
          console.log(formdata)
          //formdata传入接口
          
          // getHeaderImg(formdata).then(res=>{
          //   this.imageUrl=res.data;
          //   this.$emit('input', this.imageUrl)
          // });
        },
        beforeAvatarUpload(file) {
          return true
          // const isLt2M = file.size / 1024 / 1024 < 2;
          // if (file.type.indexOf("image/") == -1) {
          //   this.msgError("文件格式错误，请上传图片类型,如：JPG，PNG后缀的文件。");
          //   return false
          // }else if (!isLt2M) {
          //   this.$message.error('上传图片大小不能超过 2MB!');
          //   return false
          // }else {
          //   return  true
          // }
        },
      }
    }
</script>

<style scoped>
  .user-img{
    width: 90px;
    height: 70px;
    overflow: hidden;
    border: 1px solid #ccc;
    text-align: center;
    line-height: 70px;
    margin-top: -10px;
    margin-bottom: 10px;
  }
  .user-img img{
    width: 90px;
    height: 70px;
    margin-right: 20px;
    float: left;
  }
</style>
