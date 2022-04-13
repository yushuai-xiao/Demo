const EventEmitter = require('events')
const eventEmitter = new EventEmitter()

eventEmitter.on('start',(start,end)=>{
  console.log(`从${start}到${end}`);
})


eventEmitter.emit('start',1,1000)