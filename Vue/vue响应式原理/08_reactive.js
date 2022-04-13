let reactiveFn = null

class Depend{
  constructor() {
    this.reactiveFns = new Set()
  }
  depend(){
    if(reactiveFn){
      this.reactiveFns.add(reactiveFn)
    }
  }
  notify(){
    this.reactiveFns.forEach(fn => {
      fn()
    })
  }
}

const dep = new Depend()


function watchEffective(fn){
  reactiveFn = fn
  fn()
  reactiveFn = null
}

const targetMap = new WeakMap()
function getDepend(target,value){
  let map = targetMap.get(target)
  if(!map){
    map = new Map()
    targetMap.set(target,map)
  }
  let depend = map.get(value)
  if(!depend){
    depend = new Depend()
    map.set(value,depend)
  }
  return depend
}

function reactive(obj){
  return new Proxy(obj,{
    get:function(target,value,receiver){
      const dep = getDepend(target,value)
      dep.depend()
      return Reflect.get(target,value,receiver)
    },
    set:function(target,value,newValue,receiver){
      Reflect.set(target,value,newValue,receiver)
      const dep = getDepend(target,value)
      dep.notify()
    }
  })
}

const proxyObj1 = reactive({
  name:"zs",
  age:18
})
const proxyObj2 = reactive({
  name:"xj",
  age:20
})
let testName
let testAge 
watchEffective(()=>{
  testName = proxyObj1.name
})

watchEffective(()=>{
  testAge = proxyObj1.age
})

proxyObj1.name = 'xs'

proxyObj1.name = '小红'
console.log(testName);

