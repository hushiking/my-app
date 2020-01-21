class MyPromise {
  constructor(fn) {
    this.__succ_res = null;     //保存成功的返回结果
    this.__err_res = null;      //保存失败的返回结果
    this.status = 'pending';    //标记处理的状态
    this.__queue = [];          //事件队列		//++
    //箭头函数绑定了this，如果使用es5写法，需要定义一个替代的this
    fn((...arg) => {
      this.__succ_res = arg;
      this.status = 'success';
      this.__queue.forEach(json => {			//++
        json.resolve(...arg);
      });
    }, (...arg) => {
      this.__err_res = arg;
      this.status = 'error';
      this.__queue.forEach(json => {			//++
        json.reject(...arg);
      });
    });
  }
  then(onFulfilled, onRejected) {
    return new MyPromise((resFn, rejFn) => {
      if (this.status === 'success') {
        handle(...this.__succ_res);
      } else if (this.status === 'error') {
        errBack(...this.__err_res);
      } else {										//++
        this.__queue.push({ resolve: handle, reject: errBack });
      };
      function handle(value) {
        let returnVal = value
        if (onFulfilled instanceof Function) {
          try {
            returnVal = onFulfilled(value);
          } catch (err) {
            //代码错误处理
            rejFn(err);
            return;
          }
        };
        if (returnVal && returnVal['then'] instanceof Function) {//如果onFulfilled返回的是新Promise对象，则调用它的then方法
          returnVal.then(res => {
            resFn(res);
          }, err => {
            rejFn(err);
          });
        } else {
          resFn(returnVal);
        };
      }
      function errBack(reason) {
        //如果有onRejected回调，执行一遍
        if (onRejected instanceof Function) {
          try {
            let returnVal = onRejected(reason);
            //执行onRejected回调有返回，判断是否thenable对象
            if (typeof returnVal !== 'undefined' && returnVal['then'] instanceof Function) {
              returnVal.then(res => {
                resFn(res);
              }, err => {
                rejFn(err);
              });
            } else {
              //不是thenable的，直接丢给新对象resFn回调
              resFn(returnVal);
            };
          } catch (err) {
            //代码错误处理
            rejFn(err);
            return;
          }
        } else {//传给下一个reject回调
          rejFn(reason);
        };
      }     
    })
  }
};

export default MyPromise