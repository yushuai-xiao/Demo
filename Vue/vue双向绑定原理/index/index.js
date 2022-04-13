// Vue主入口
class Vue{
  constructor(options){
    this.data = options.data
    observe(this.data,this)
    let id = options.el
    //dom块  
    let proxyDom = document.getElementById(id)
    console.dir(proxyDom)
    var dom = nodeToFragment(document.getElementById(id),this)
    //处理完所有节点后，重新把内容添加回去
    document.getElementById(id).appendChild(dom)  
  }
}