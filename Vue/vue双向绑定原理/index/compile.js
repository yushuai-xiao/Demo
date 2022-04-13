// 编译函数
function compile(node,vm){
  var reg = /\{\{(.+?)\}\}/g; //匹配{{xxx}}中的xxx
  // 如果是元素节点
  if(node.nodeType === 1){
    let attr = node.attributes;
    // 解析元素节点的所有属性
    for(let i = 0;i < attr.length;i++){
      if(attr[i].nodeName == 'v-model'){
        var name = attr[i].nodeValue
        node.addEventListener('input',function(e){
          vm[name] = e.target.value
        })
        node.value = vm.data[name]
        node.removeAttribute('v-model')
      }
    }
  }
  // 如果是文本节点
  if(node.nodeType === 3){
    if(reg.test(node.nodeValue)){
      let names = node.nodeValue.match(reg);
      let originNodeValue = node.nodeValue
      for(let originName of names){
        name = originName.substring(2,originName.length -2).trim()
        new Watcher(vm,node,name,originNodeValue,originName)
      }
    }
  }
}


// 向碎片化文档中添加节点时，每个节点都应处理
function nodeToFragment(node,vm){
  let fragment = document.createDocumentFragment()
  while(child = node.firstChild){
    compile(child,vm)
    fragment.appendChild(child)
  }
  return fragment
}