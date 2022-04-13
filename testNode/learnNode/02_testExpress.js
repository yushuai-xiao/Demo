const express = require('express')

const app = express()

app.get('/',(req,res) => {
  res.send('Hi!')
})

const server = app.listen(4000,()=>{
  console.log('Server is Running');
})


process.on('SIGTERM',()=>{
  server.close(()=>{
    console.log('Process terminated');
  })
})

console.log(process.env.NODE_ENV);