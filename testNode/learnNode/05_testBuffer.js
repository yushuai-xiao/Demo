// const buf = Buffer.from('hello')
// console.log(buf);
// console.log(buf.toString());

console.log("start");

setTimeout(()=>{
  console.log("222");
},0)

new Promise((resolve) => {
  resolve("111")
  console.log("444");
}).then(res => {
  console.log(res);
})


setTimeout(()=>{
  console.log("333");
},100)

console.log("end");