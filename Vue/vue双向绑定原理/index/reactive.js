// Watcher监听者
class Watcher{
  constructor(vm,node,name,originNodeValue,originName){
    Dep.target = this
    this.vm = vm
    this.node = node
    this.name = name
    this.originNodeValue = originNodeValue
    this.originName = originName
    this.update()
    Dep.target = null
  }
  update(){
    this.get()
    console.log(this.originNodeValue,this.originName)
    this.node.nodeValue =  this.originNodeValue.replace(new RegExp(this.originName,'g'),this.value)
  }
  get(){
    this.value = this.vm[this.name] //触发相应的get
  }
}

// Dep依赖类,添加依赖，通知观察者
class Dep{
  constructor(){
    this.subs = []
  }
  addSub(sub){
    this.subs.push(sub)
  }
  notify(){
    this.subs.forEach(sub => {
      sub.update()
    })
  }
}

function defineReactive(obj,key,val){
  let dep = new Dep()
  Object.defineProperty(obj,key,{
    get:function(){
      if(Dep.target){
        dep.addSub(Dep.target)
      }
      return val
    },
    set:function(newVal){
      if(newVal === val){
        return
      }
      val = newVal
      // 有更新，立马通知
      dep.notify()
    }
  })
}
// 实现一个观察者，对vue实例中data的每个属性进行观察
function observe(obj,vm){
  for(let key of Object.keys(obj)){
    defineReactive(vm,key,obj[key])
  }
}