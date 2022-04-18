<template>
  <div class="upload">
    <el-upload
      class="upload-demo"
      action=""
      :on-change="handleChange"
      :on-remove="handleRemove"
      :on-exceed="handleExceed"
      accept=".xls .xlsx"
      :auto-upload="false"
      
    >
      <el-button size="small" type="primary">点击上传</el-button>
    </el-upload>
    <!-- <el-button size="mini" @click="load">下载模板excel</el-button> -->
  </div>
</template>

<script>
export default {
  name: "upload",
  data() {
    return{
        fileList:[],            
        file:""
      }
  },
  methods: {
    handleChange(file,fileList){        
      this.fileList = [fileList[fileList.length - 1]]; // 只能上传一个Excel，重复上传会覆盖之前的        
      this.file = file.raw;        
      let reader = new FileReader()        
      let _this = this        
      reader.readAsArrayBuffer(this.file)        
      reader.onload = function () {            
        let buffer = reader.result            
        let bytes = new Uint8Array(buffer)            
        let length = bytes.byteLength            
        let binary = ''            
        for (let i = 0; i < length; i++) {                
          binary += String.fromCharCode(bytes[i])            
        }            
        let XLSX = require('xlsx')            
        let wb = XLSX.read(binary, {                
          type: 'binary'            
        })            
        let outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]])            
        console.log(outdata)
      }
  },
    //超出最大上传文件数量时的处理方法
  handleExceed() {
    this.$message({
      type: "warning",
      message: "超出最大上传文件数量的限制！",
    });
    return;
  },
    //移除文件的操作方法
  handleRemove(file, fileList) {
    this.fileTemp = null;
  }
  }
}
</script>

<style>
</style>