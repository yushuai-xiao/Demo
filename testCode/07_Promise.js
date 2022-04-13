// 创建promise的三种状态
const PROMISE_STATUS_PEDING = 'pending';
const PROMISE_STATUS_FULFILLED = 'fulfilled'
const PROMISE_STATUS_REJECTED = 'rejected'

// 工具函数
function execFunctionWithCatchError(execFn,value,resolve,reject){
  try {
    let res = execFn(value)
    resolve(res)
  } catch (err) {
    reject(err)
  }
}

class TPromise{
  constructor(executor) {
    this.status = PROMISE_STATUS_PEDING

    this.value = undefined
    this.reason = undefined

    this.onResolveFns = []
    this.onRejectedFns = []
    
    // resolve回调
    const resolve = (value)=>{
      if(this.status === PROMISE_STATUS_PEDING){
        queueMicrotask(()=>{
          if(this.status !== PROMISE_STATUS_PEDING) return false
          this.status = PROMISE_STATUS_FULFILLED
          this.value = value
          this.onResolveFns.forEach(fn => {
            fn(this.value)
          })
        })
      }
    }
    
    // reject回调
    const reject = (reason) =>{
      if(this.status === PROMISE_STATUS_PEDING){
        queueMicrotask(()=>{
          if(this.status !== PROMISE_STATUS_PEDING) return false
          this.status = PROMISE_STATUS_REJECTED
          this.reason = reason
          this.onRejectedFns.forEach(fn => {
            fn(this.reason)
          })
        })
      }
    }
    try {
      executor(resolve,reject)
    } catch (err) {
      reject(err)
    }
  }
  // then方法
  then(onFulfilled,onRejected){
    const defaultOnRejected = (err) =>{
      throw err
    }
    const defaultOnFulfilled = (value) =>{
      return value
    }
    onFulfilled =  onFulfilled || defaultOnFulfilled 
    onRejected = onRejected || defaultOnRejected

    return new TPromise((resolve,reject) =>{
      if(this.status === PROMISE_STATUS_FULFILLED && onFulfilled){
        execFunctionWithCatchError(onFulfilled , this.value , resolve , reject)
      }
      if(this.status ===PROMISE_STATUS_REJECTED && onRejected){
        execFunctionWithCatchError(onRejected , this.reason , resolve , reject)
      }
      if(this.status === PROMISE_STATUS_PEDING){
        this.onResolveFns.push(()=>{
          execFunctionWithCatchError(onFulfilled , this.value , resolve , reject)
        })
        this.onRejectedFns.push(() => {
          execFunctionWithCatchError(onRejected , this.reason , resolve , reject)
        })
      }
    })
  }

  // catch方法
  catch(onRejected){
   return this.then(undefined,onRejected)
  }

  // finally方法
  finally(onFinally){
    console.log(111);
    this.then(() => {
      onFinally()
    },()=>{
      onFinally()
    })
  }

  // 类方法resolve
  static resolve(value){
    return new TPromise((resolve) => resolve(value))
  }

  // 类方法reject
  static reject(reason){
    return new TPromise((resolve,reject) => reject(reason))
  }

  // 类方法all
  static all(promises){
    return new TPromise((resolve,reject) => {
      let resArr = []
      promises.forEach(promise => {
        promise.then((res)=>{
          resArr.push(res)
          if(resArr.length === promises.length){
            resolve(resArr)
          }
        },(err) => {
          reject(err)
        })
      }) 
    })
  }

  // 类方法allSettled
  static allSettled(promises){
    return new TPromise((resolve,reject) => {
      let resArr = []
      promises.forEach(promise => {
        promise.then(res => {
          resArr.push({status:PROMISE_STATUS_FULFILLED,value:res})
          if(resArr.length === promises.length){
            resolve(resArr)
          }
        },err => {
          resArr.push({status:PROMISE_STATUS_REJECTED,value:err})
          if(resArr.length === promises.length){
            resolve(resArr)
          }
        })
      })
    })
  }

  // 类方法race
  static race(promises){
    return new TPromise((resolve,reject) => {
      promises.forEach(promise => {
        promise.then(res=>{
          resolve(res)
        },err => {
          reject(err)
        })
      })
    })
  }

  // 类方法any
  static any(promises){
    return new TPromise((resolve,reject) => {
      let resArr = []
      promises.forEach(promise => {
        promise.then(resolve,err => {
          resArr.push(err)
          if(resArr.length === promises.length){
            reject(new AggregateError('All promises were rejected'))
          }
        })
      })
    })
  }
}

// const tp  = new TPromise((resolve,reject) => {
//   resolve('test')
//   reject('err test')
// })
// tp.then(res => {
//   console.log('res',res);
//   return 'tete'
// }).catch(err =>{
//   console.log('err11',err);
// }).finally(()=>{
//   console.log('object');
// })
// TPromise.resolve(111).then(res => {
//   console.log(res);
// })
// TPromise.reject(222).catch(res => {
//   console.log(res);
// })

const promise1 = new TPromise((resolve,reject) => {
  setTimeout(()=>{
    reject('111')
  },100)
})
const promise2 = new TPromise((resolve,reject) => {
  setTimeout(()=>{
    reject('222')
  },50)
})

const promise3 = new TPromise((resolve,reject) => {
  setTimeout(()=>{
    reject('333')
  },10)
})

// Promise.allSettled([promise1,promise2,promise3]).then(res => {
//   console.log('RES',res);
// }).catch(err => {
//   console.log(err);
// })

// TPromise.allSettled([promise1,promise2,promise3]).then(res => {
//   console.log('TRES',res);
// }).catch(err => {
//   console.log(err);
// })

// Promise.race([promise1,promise2,promise3]).then(res => {
//   console.log('RES',res);
// }).catch(err => {
//   console.log(err);
// })

// TPromise.race([promise1,promise2,promise3]).then(res => {
//   console.log('TRES',res);
// }).catch(err => {
//   console.log('TErr',err);
// })

Promise.any([promise1,promise2,promise3]).then(res => {
  console.log('RES',res);
}).catch(err => {
  console.log(err);
})

TPromise.any([promise1,promise2,promise3]).then(res => {
  console.log('RES',res);
}).catch(err => {
  console.log('TERR',err);
})
// TPromise.all([promise1,promise2,promise3]).then(res => {
//   console.log(res);
// }).catch(err => {
//   console.log(err);
// })


// mp.then(res => {
//   console.log('res2',res);
// })
// setTimeout(()=>{
//   mp.then(res => {
//     console.log('res3',res);
//   })
// },500)