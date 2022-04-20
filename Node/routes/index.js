var express = require('express');
var router = express.Router();
const multer = require('multer')

const path = require('path')
const fs = require('fs')

const nodeXlsx = require('node-xlsx')
/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

const storage =multer.diskStorage({
  // 上传文件的目录
  destination:function(req,file,cb){
    cb(null,'assets/uploads')
  },
  
  // 上传文件的名称
  filename:function(req,file,cb){
    cb(null,file.originalname)
  }
})
// multer配置

// const upload = multer({dest:'assets/uploads'})
const upload = multer({
  storage
})
router.get('/:id',(req,res) => {
  console.log(req)
  res.setHeader("Access-Control-Allow-Origin", "*"); 
  res.end('lafsfs')
})

router.post('/file/upload',upload.single('file'),(req,res,next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); 
  const ePath = path.resolve(__dirname,'../assets/uploads',req.file.originalname)
  console.log(ePath)
  const ex1 = nodeXlsx.parse(ePath)

  let excel_content = ex1[0].data
  console.log(excel_content)
  res.send('lalla')
})

// 单文件上传接口
router.post('/file',upload.single('file'),(req,res,next) => {
  console.log(req.file)
  res.setHeader("Access-Control-Allow-Origin", "*"); 
  res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
  res.send({
    downloadUrl:'yunyoujun.png'
  })
})

// 多文件上传
// upload.array('formDate中的字段名', 最大上传数量)
router.post('/files', upload.array('files', 4), (req, res,next) => {
  console.log(req.files)
  res.send({
    downloadUrl:'yunyoujun.png'
  })
})



// 文件下载

router.get('/download/test',(req,res) => {
  // console.log(req)
  let fileName = req.query.fileName
  const filePath = path.join(__dirname,'../assets/downloads/' + fileName)
  res.download(filePath)
})

router.get('/download/get/test',(req,res) => {
  let fileName = req.query.fileName
  const stream = fs.readFileSync(path.join(__dirname,'../assets/downloads/' + fileName))
  console.log(stream)
  res.send(stream)
})

router.post('/download/post/test',(req,res) => {
  let fileName = req.body.fileName
  const stream = fs.readFileSync(path.join(__dirname,'../assets/downloads/' + fileName))
  res.send(stream)
})

module.exports = router;
