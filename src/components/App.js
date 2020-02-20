import React from 'react'
import { Row, Col } from 'antd'
import Buttons from './Buttons'
import MyPromise from '../utils/myPromise'
import '../styles/App.css'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      res1: 'p1',
      res2: 'p2',
      res3: 'p3',
      result1: 'p1',
      result2: 'p2',
      result3: 'p3',
      testInfo: '结果将在下面显示:',
      info: ['同步测试--resolve', '异步测试--resolve', '异步测试--reject', '链式调用', '链式调用--resolve', '链式调用--reject', 'all方法', 'race方法', 'catch测试', 'finally测试——异步代码错误', 'finally测试——同步代码错误', '链式同步调用reject状态的catch', '链式异步调用reject状态的catch', 'then代码错误捕获', '代码错误catch捕获', 'finally测试——正常状态', 'resolve方法测试——是MyPromise对象', 'resolve方法测试——是一个thenable对象(resolve)', 'resolve方法测试——是一个thenable对象(reject)', 'resolve方法测试——参数不是具有then方法的对象，或根本就不是对象', 'resolve方法测试——无参数', 'resolve方法测试——参数是null', 'resolve方法测试——参数是空字符串', 'reject方法测试', 'then方法resolve回调返回Promise对象(reject)', 'then方法reject回调返回Promise对象(reject)', 'Promise状态多次改变', 'then方法的异步执行']
    }
  }

  runTest(index) {
    this[`test${index}`](Promise)
    this[`test${index}`](MyPromise)
  }

  // 同步测试--resolve
  test0(_Promise) {
    this.setState({
      res1: 'p1',
      res2: 'p2',
      res3: 'p3',
      result1: 'p1',
      result2: 'p2',
      result3: 'p3',
    })
    function fn1(resolve, reject) {
      console.log(_Promise === Promise ? 'Promise' : 'MyPromise', '同步执行0')
      resolve(0);
    };
    new _Promise(fn1).then((res) => {
      if (_Promise === Promise) {
        this.setState({
          result1: res
        })
      } else {
        console.log(_Promise === Promise ? 'Promise' : 'MyPromise', res)
        this.setState({
          res1: res
        })
      }
    });
  }

  // 异步测试--resolve
  test1(_Promise) {
    this.setState({
      res1: 'p1',
      res2: 'p2',
      res3: 'p3',
      result1: 'p1',
      result2: 'p2',
      result3: 'p3',
    })
    function fn1(resolve, reject) {
      console.log(_Promise === Promise ? 'Promise' : 'MyPromise', '2秒后执行异步函数')
      setTimeout(function () {
        resolve(111);
      }, 2000);
    };
    new _Promise(fn1).then((res) => {
      if (_Promise === Promise) {
        this.setState({
          result1: res
        })
      } else {
        this.setState({
          res1: res
        })
      }
    }).then(res => {
      console.log(_Promise === Promise ? 'Promise' : 'MyPromise', 'then2==', res)
    });
  };

  // 异步测试--reject
  test2(_Promise) {
    this.setState({
      res1: 'p1',
      res2: 'p2',
      res3: 'p3',
      result1: 'p1',
      result2: 'p2',
      result3: 'p3',
    })
    function fn2(resolve, reject) {
      console.log(_Promise === Promise ? 'Promise' : 'MyPromise', '2秒后执行异步函数')
      setTimeout(function () {
        reject(222);
      }, 2000);
    };
    new _Promise(fn2).then((res) => {
      if (_Promise === Promise) {
        this.setState({
          result1: res
        })
      } else {
        this.setState({
          res1: res
        })
      }
    }, err => {
      if (_Promise === Promise) {
        this.setState({
          result2: err + ',rejected'
        })
      } else {
        this.setState({
          res2: err + ',rejected'
        })
      }
    });
  };

  // 链式调用
  test3(_Promise) {
    this.setState({
      res1: 'p1',
      res2: 'p2',
      res3: 'p3',
      result1: 'p1',
      result2: 'p2',
      result3: 'p3',
    })
    function fn1(resolve, reject) {
      setTimeout(function () {
        console.log(_Promise === Promise ? 'Promise' : 'MyPromise', '2秒后执行异步函数3-1')
        resolve('3-1');
      }, 2000);
    };
    function fn2(resolve, reject) {
      setTimeout(function () {
        console.log(_Promise === Promise ? 'Promise' : 'MyPromise', '1秒后执行异步函数3-2')
        resolve('3-2');
      }, 1000);
    };
    new _Promise(fn1).then(res => {
      if (_Promise === Promise) {
        this.setState({
          result1: res
        })
      } else {
        this.setState({
          res1: res
        })
      }
      return new _Promise(fn2);
    }).then(res => {
      if (_Promise === Promise) {
        this.setState({
          result2: res
        })
      } else {
        this.setState({
          res2: res
        })
      }
    });
  };

  // 链式调用--resolve
  test4(_Promise) {
    this.setState({
      res1: 'p1',
      res2: 'p2',
      res3: 'p3',
      result1: 'p1',
      result2: 'p2',
      result3: 'p3',
    })
    function fn3(resolve, reject) {
      console.log(_Promise === Promise ? 'Promise' : 'MyPromise', '立即执行4-1')
      resolve('4-1');
    };
    function fn4(resolve, reject) {
      console.log(_Promise === Promise ? 'Promise' : 'MyPromise', '立即执行4-2')
      resolve('4-2');
    };
    new _Promise(fn3).then(res => {
      if (_Promise === Promise) {
        this.setState({
          result1: res
        })
      } else {
        this.setState({
          res1: res
        })
      }
      return new _Promise(fn4);
    }).then(res => {
      if (_Promise === Promise) {
        this.setState({
          result2: res
        })
      } else {
        this.setState({
          res2: res
        })
      }
      return '4-3';
    }).then(res => {
      if (_Promise === Promise) {
        this.setState({
          result3: res
        })
      } else {
        this.setState({
          res3: res
        })
      }
    });
  };

  // 链式调用--reject
  test5(_Promise) {
    this.setState({
      res1: 'p1',
      res2: 'p2',
      res3: 'p3',
      result1: 'p1',
      result2: 'p2',
      result3: 'p3',
    })
    function fn3(resolve, reject) {
      console.log(_Promise === Promise ? 'Promise' : 'MyPromise', '立即执行5-1')
      reject('reject at 5-1');
    }
    function fn4(resolve, reject) {
      console.log(_Promise === Promise ? 'Promise' : 'MyPromise', '立即执行5-2')
      resolve(555);
    };
    new _Promise(fn3).then(res => {
      if (_Promise === Promise) {
        this.setState({
          result1: res
        })
      } else {
        this.setState({
          res1: res
        })
      }
      return new _Promise(fn4);
    }, err => console.log(_Promise === Promise ? 'Promise' : 'MyPromise', 'then1==', err)).then(res => {
      // 接受上一个then函数返回的MyPromise的reject函数的resFn处理
      if (_Promise === Promise) {
        this.setState({
          result2: res === undefined ? 'undefined' : ''
        })
      } else {
        this.setState({
          res2: res === undefined ? 'undefined' : ''
        })
      }
      return '55';
    }, err => console.log(_Promise === Promise ? 'Promise' : 'MyPromise', 'then2==', err)).then(res => {
      if (_Promise === Promise) {
        this.setState({
          result3: res
        })
      } else {
        this.setState({
          res3: res
        })
      }
    }, err => console.log(_Promise === Promise ? 'Promise' : 'MyPromise', 'then3==', err));
  };

  // all方法
  test6(_Promise) {
    this.setState({
      res1: 'p1',
      res2: 'p2',
      res3: 'p3',
      result1: 'p1',
      result2: 'p2',
      result3: 'p3',
    })
    //随机调用resolve或reject
    let _this = this
    function fn5(resolve, reject) {
      setTimeout(() => {
        console.log(_Promise === Promise ? 'Promise' : 'MyPromise', '2秒后执行异步函数6-1')
        let randNum = Math.random();
        if (_Promise === Promise) {
          _this.setState({
            result1: randNum
          })
        } else {
          _this.setState({
            res1: randNum
          })
        }
        if (randNum > 0.5) {
          resolve('resovle==大于0.5');
        } else {
          reject('reject==少于0.5');
        };
      }, 2000);
    };
    function fn6(resolve, reject) {
      setTimeout(() => {
        console.log(_Promise === Promise ? 'Promise' : 'MyPromise', '1秒后执行异步函数6-2')
        resolve(666);
      }, 1000);
    };
    let p5 = new _Promise(fn5),
      p6 = new _Promise(fn6);
    _Promise.all([p5, p6]).then(res => {
      if (_Promise === Promise) {
        this.setState({
          result2: res
        })
      } else {
        this.setState({
          res2: res
        })
      }
    }, err => {
      if (_Promise === Promise) {
        this.setState({
          result3: err
        })
      } else {
        this.setState({
          res3: err
        })
      }
    });
  }

  // race 方法测试
  test7(_Promise) {
    this.setState({
      res1: 'p1',
      res2: 'p2',
      res3: 'p3',
      result1: 'p1',
      result2: 'p2',
      result3: 'p3',
    })
    function fn5(resolve, reject) {
      setTimeout(() => {
        let randNum = Math.random();
        console.log(_Promise === Promise ? 'Promise' : 'MyPromise', randNum, '7-1延迟2秒执行');
        if (randNum > 0.5) {
          resolve('fn5 resovle==大于0.5');
        } else {
          reject('fn5 reject==少于0.5');
        };
      }, 2000);
    };
    function fn6(resolve, reject) {
      setTimeout(() => {
        let randNum = Math.random();
        console.log(_Promise === Promise ? 'Promise' : 'MyPromise', randNum, '7-2延迟1秒执行');
        if (randNum > 0.5) {
          resolve('fn6 resovle==大于0.5');
        } else {
          reject('fn6 reject==少于0.5');
        };
      }, 1000);
    };
    let p5 = new _Promise(fn5),
      p6 = new _Promise(fn6);
    _Promise.race([p5, p6]).then(res => {
      if (_Promise === Promise) {
        this.setState({
          result1: res
        })
      } else {
        this.setState({
          res1: res
        })
      }
    }, err => {
      if (_Promise === Promise) {
        this.setState({
          result2: err
        })
      } else {
        this.setState({
          res2: err
        })
      }
    });
  }

  // catch测试
  test8(_Promise) {
    this.setState({
      res1: 'p1',
      res2: 'p2',
      res3: 'p3',
      result1: 'p1',
      result2: 'p2',
      result3: 'p3',
    })
    function fn8(resolve, reject) {
      setTimeout(() => {
        console.log(_Promise === Promise ? 'Promise' : 'MyPromise', 'fn8执行');
        reject('rejeted');
      }, 1000);
    };
    new _Promise(fn8).then(res => {
      if (_Promise === Promise) {
        this.setState({
          result1: res
        })
      } else {
        this.setState({
          res1: res
        })
      }
    }).catch(err => {
      if (_Promise === Promise) {
        this.setState({
          result2: err
        })
      } else {
        this.setState({
          res2: err
        })
      }
    });
  }

  // finally测试——异步代码错误
  test9(_Promise) {
    this.setState({
      res1: 'p1',
      res2: 'p2',
      res3: 'p3',
      result1: 'p1',
      result2: 'p2',
      result3: 'p3',
    })
    function fn9(resolve, reject) {
      setTimeout(() => {
        throw new Error('err@fn9');
        resolve(1111); // eslint-disable-line
      }, 1000);
    };
    new _Promise(fn9).then(res => {
      if (_Promise === Promise) {
        this.setState({
          result1: res
        })
      } else {
        this.setState({
          res1: res
        })
      }
    }).catch(err => {
      console.log(_Promise === Promise ? 'Promise' : 'MyPromise', 'catch==', err);
    }).finally(() => {
      console.log(_Promise === Promise ? 'Promise' : 'MyPromise', 'finally func!')
    });
  }

  // finally测试——同步代码错误
  test10(_Promise) {
    this.setState({
      res1: 'p1',
      res2: 'p2',
      res3: 'p3',
      result1: 'p1',
      result2: 'p2',
      result3: 'p3',
    })
    function fn10(resolve, reject) {
      throw new Error('err@fn10');
      resolve(10); // eslint-disable-line
    };
    new _Promise(fn10).then(res => {
      if (_Promise === Promise) {
        this.setState({
          result1: res
        })
      } else {
        this.setState({
          res1: res
        })
      }
    }).catch(err => {
      console.log(_Promise === Promise ? 'Promise' : 'MyPromise', err)
    }).finally(() => {
      console.log(_Promise === Promise ? 'Promise' : 'MyPromise', 'finally func!')
    });
  }

  // catch测试——链式同步调用reject状态的catch（冒泡）
  test11(_Promise) {
    this.setState({
      res1: 'p1',
      res2: 'p2',
      res3: 'p3',
      result1: 'p1',
      result2: 'p2',
      result3: 'p3',
    })
    function fn11(resolve, reject) {
      console.log(_Promise === Promise ? 'Promise' : 'MyPromise', 'fn11执行');
      reject('reject at fn11');
    };
    function fn12(resolve, reject) {
      console.log(_Promise === Promise ? 'Promise' : 'MyPromise', 'fn12执行');
      resolve(12);
    };
    new _Promise(fn11).then(res => {
      if (_Promise === Promise) {
        this.setState({
          result1: res
        })
      } else {
        this.setState({
          res1: res
        })
      }
      return new _Promise(fn12);
    }).then(res => {
      if (_Promise === Promise) {
        this.setState({
          result2: res
        })
      } else {
        this.setState({
          res2: res
        })
      }
      return 13;
    }).then(res => {
      if (_Promise === Promise) {
        this.setState({
          result3: res
        })
      } else {
        this.setState({
          res3: res
        })
      }
    }).catch(err => {
      console.log(_Promise === Promise ? 'Promise' : 'MyPromise', 'catch==', err);
    });
  }

  // catch测试——链式异步调用reject状态的catch（冒泡）
  test12(_Promise) {
    this.setState({
      res1: 'p1',
      res2: 'p2',
      res3: 'p3',
      result1: 'p1',
      result2: 'p2',
      result3: 'p3',
    })
    function fn11(resolve, reject) {
      setTimeout(function () {
        console.log(_Promise === Promise ? 'Promise' : 'MyPromise', 'fn11执行');
        reject('reject at fn11');
      }, 1000)
    };
    function fn12(resolve, reject) {
      console.log(_Promise === Promise ? 'Promise' : 'MyPromise', 'fn12执行');
      resolve(12);
    };
    new _Promise(fn11).then(res => {
      if (_Promise === Promise) {
        this.setState({
          result1: res
        })
      } else {
        this.setState({
          res1: res
        })
      }
      return new _Promise(fn12);
    }).then(res => {
      if (_Promise === Promise) {
        this.setState({
          result2: res
        })
      } else {
        this.setState({
          res2: res
        })
      }
      return 13;
    }).then(res => {
      if (_Promise === Promise) {
        this.setState({
          result3: res
        })
      } else {
        this.setState({
          res3: res
        })
      }
    }).catch(err => {
      console.log(_Promise === Promise ? 'Promise' : 'MyPromise', 'catch==', err);
    });
  }

  // catch测试——then代码错误捕获
  test13(_Promise) {
    this.setState({
      res1: 'p1',
      res2: 'p2',
      res3: 'p3',
      result1: 'p1',
      result2: 'p2',
      result3: 'p3',
    })
    function fn13(resolve, reject) {
      setTimeout(function () {
        console.log(_Promise === Promise ? 'Promise' : 'MyPromise', 'fn13执行');
        resolve(13)
      }, 1000)
    };
    function fn14(resolve, reject) {
      console.log(_Promise === Promise ? 'Promise' : 'MyPromise', 'fn14执行');
      resolve(14);
    };
    new _Promise(fn13).then(res => {
      if (_Promise === Promise) {
        this.setState({
          result1: res
        })
      } else {
        this.setState({
          res1: res
        })
      }
      throw new Error('err@fn13'); // 传给下一个then的reject回调处理
      return new _Promise(fn14); // eslint-disable-line
    }, err => {
      console.log(_Promise === Promise ? 'Promise' : 'MyPromise', 'then1==', err);
    }).then(res => {
      if (_Promise === Promise) {
        this.setState({
          result2: res
        })
      } else {
        this.setState({
          res2: res
        })
      }
      return 1414;
    }, err => {
      console.log(_Promise === Promise ? 'Promise' : 'MyPromise', 'then2==', err); // 传给下一个then的resolve回调
    }).then(res => {
      if (_Promise === Promise) {
        this.setState({
          result3: res
        })
      } else {
        this.setState({
          res3: res
        })
      }
      return 1313
    }).then(res => {
      console.log(_Promise === Promise ? 'Promise' : 'MyPromise', 'then4==', res)
    }).catch(err => {
      console.log(_Promise === Promise ? 'Promise' : 'MyPromise', 'catch==', err);
    });
  }

  // catch测试——代码错误catch捕获
  test14(_Promise) {
    this.setState({
      res1: 'p1',
      res2: 'p2',
      res3: 'p3',
      result1: 'p1',
      result2: 'p2',
      result3: 'p3',
    })
    function fn13(resolve, reject) {
      setTimeout(function () {
        console.log(_Promise === Promise ? 'Promise' : 'MyPromise', 'fn13执行');
        resolve(13)
      }, 1000)
    };
    function fn14(resolve, reject) {
      console.log(_Promise === Promise ? 'Promise' : 'MyPromise', 'fn14执行');
      resolve(14);
    };
    new _Promise(fn13).then(res => {
      if (_Promise === Promise) {
        this.setState({
          result1: res
        })
      } else {
        this.setState({
          res1: res
        })
      }
      throw new Error('err@fn13');
      return new _Promise(fn14); // eslint-disable-line
    }).then(res => {
      if (_Promise === Promise) {
        this.setState({
          result2: res
        })
      } else {
        this.setState({
          res2: res
        })
      }
      return 1414;
    }).then(res => {
      if (_Promise === Promise) {
        this.setState({
          result3: res
        })
      } else {
        this.setState({
          res3: res
        })
      }
      return 1515
    }).then(res => {
      console.log(_Promise === Promise ? 'Promise' : 'MyPromise', 'then4==', res)
    }).catch(err => {
      console.log(_Promise === Promise ? 'Promise' : 'MyPromise', 'catch==', err);
    });
  }

  // finally测试——正常状态
  test15(_Promise) {
    this.setState({
      res1: 'p1',
      res2: 'p2',
      res3: 'p3',
      result1: 'p1',
      result2: 'p2',
      result3: 'p3',
    })
    function fn15(resolve, reject) {
      setTimeout(() => {
        resolve(15);
      }, 1000);
    };
    new _Promise(fn15).then(res => {
      if (_Promise === Promise) {
        this.setState({
          result1: res
        })
      } else {
        this.setState({
          res1: res
        })
      }
    }).catch(err => {
      console.log(_Promise === Promise ? 'Promise' : 'MyPromise', 'catch==', err);
    }).finally(() => {
      if (_Promise === Promise) {
        this.setState({
          result2: 'finally func!'
        })
      } else {
        this.setState({
          res2: 'finally func!'
        })
      }
    });
  }

  // resolve方法测试——是MyPromise对象
  test16(_Promise) {
    this.setState({
      res1: 'p1',
      res2: 'p2',
      res3: 'p3',
      result1: 'p1',
      result2: 'p2',
      result3: 'p3',
    })
    function fn16(resolve, reject) {
      console.log(_Promise === Promise ? 'Promise' : 'MyPromise', 'fn16执行');
      resolve(16);
    };
    _Promise.resolve(new _Promise(fn16)).then(res => {
      if (_Promise === Promise) {
        this.setState({
          result1: res
        })
      } else {
        this.setState({
          res1: res
        })
      }
    }).catch(err => {
      console.log(_Promise === Promise ? 'Promise' : 'MyPromise', 'catch==', err);
    }).finally(() => {
      if (_Promise === Promise) {
        this.setState({
          result2: 'finally func!'
        })
      } else {
        this.setState({
          res2: 'finally func!'
        })
      }
    });
  }

  // resolve方法测试——是一个thenable对象(resolve)
  test17(_Promise) {
    this.setState({
      res1: 'p1',
      res2: 'p2',
      res3: 'p3',
      result1: 'p1',
      result2: 'p2',
      result3: 'p3',
    })
    let thenable = {
      then: function (resolve, reject) {
        resolve('thenable resolved!');
      }
    };
    _Promise.resolve(thenable).then(res => {
      if (_Promise === Promise) {
        this.setState({
          result1: res
        })
      } else {
        this.setState({
          res1: res
        })
      }
    }).catch(err => {
      console.log(_Promise === Promise ? 'Promise' : 'MyPromise', 'catch==', err);
    }).finally(() => {
      if (_Promise === Promise) {
        this.setState({
          result2: 'finally func!'
        })
      } else {
        this.setState({
          res2: 'finally func!'
        })
      }
    });
  }

  // resolve方法测试——是一个thenable对象(reject)
  test18(_Promise) {
    this.setState({
      res1: 'p1',
      res2: 'p2',
      res3: 'p3',
      result1: 'p1',
      result2: 'p2',
      result3: 'p3',
    })
    let thenable = {
      then: function (resolve, reject) {
        reject('thenable rejectd!');
      }
    };
    _Promise.resolve(thenable).then(res => {
      if (_Promise === Promise) {
        this.setState({
          result1: res
        })
      } else {
        this.setState({
          res1: res
        })
      }
    }).catch(err => {
      if (_Promise === Promise) {
        this.setState({
          result2: err
        })
      } else {
        this.setState({
          res2: err
        })
      }
    }).finally(() => {
      if (_Promise === Promise) {
        this.setState({
          result3: 'finally func!'
        })
      } else {
        this.setState({
          res3: 'finally func!'
        })
      }
    });
  }

  //resolve方法测试——参数不是具有then方法的对象，或根本就不是对象
  test19(_Promise) {
    this.setState({
      res1: 'p1',
      res2: 'p2',
      res3: 'p3',
      result1: 'p1',
      result2: 'p2',
      result3: 'p3',
    })
    _Promise.resolve('Have no then func').then(res => {
      if (_Promise === Promise) {
        this.setState({
          result1: res
        })
      } else {
        this.setState({
          res1: res
        })
      }
    }).catch(err => {
      if (_Promise === Promise) {
        this.setState({
          result2: err
        })
      } else {
        this.setState({
          res2: err
        })
      }
    }).finally(() => {
      if (_Promise === Promise) {
        this.setState({
          result3: 'finally func!'
        })
      } else {
        this.setState({
          res3: 'finally func!'
        })
      }
    });
  }

  // resolve方法测试——无参数
  test20(_Promise) {
    this.setState({
      res1: 'p1',
      res2: 'p2',
      res3: 'p3',
      result1: 'p1',
      result2: 'p2',
      result3: 'p3',
    })
    let p = _Promise.resolve();
    p.then(res => {
      if (_Promise === Promise) {
        this.setState({
          result1: res === undefined ? 'undefined' : ''
        })
      } else {
        this.setState({
          res1: res === undefined ? 'undefined' : ''
        })
      }
    }).catch(err => {
      if (_Promise === Promise) {
        this.setState({
          result2: err
        })
      } else {
        this.setState({
          res2: err
        })
      }
    }).finally(() => {
      if (_Promise === Promise) {
        this.setState({
          result3: 'finally func!'
        })
      } else {
        this.setState({
          res3: 'finally func!'
        })
      }
    });
  }

  // resolve方法测试——参数是null
  test21(_Promise) {
    this.setState({
      res1: 'p1',
      res2: 'p2',
      res3: 'p3',
      result1: 'p1',
      result2: 'p2',
      result3: 'p3',
    })
    let p = _Promise.resolve(null);
    p.then(res => {
      if (_Promise === Promise) {
        this.setState({
          result1: res === null ? 'null' : ''
        })
      } else {
        this.setState({
          res1: res === null ? 'null' : ''
        })
      }
    }).catch(err => {
      if (_Promise === Promise) {
        this.setState({
          result2: err
        })
      } else {
        this.setState({
          res2: err
        })
      }
    }).finally(() => {
      if (_Promise === Promise) {
        this.setState({
          result3: 'finally func!'
        })
      } else {
        this.setState({
          res3: 'finally func!'
        })
      }
    });
  }

  // resolve方法测试——参数是空字符串
  test22(_Promise) {
    this.setState({
      res1: 'p1',
      res2: 'p2',
      res3: 'p3',
      result1: 'p1',
      result2: 'p2',
      result3: 'p3',
    })
    let p = _Promise.resolve('');
    p.then(res => {
      if (_Promise === Promise) {
        this.setState({
          result1: res
        })
      } else {
        this.setState({
          res1: res
        })
      }
    }).catch(err => {
      if (_Promise === Promise) {
        this.setState({
          result2: err
        })
      } else {
        this.setState({
          res2: err
        })
      }
    }).finally(() => {
      if (_Promise === Promise) {
        this.setState({
          result3: 'finally func!'
        })
      } else {
        this.setState({
          res3: 'finally func!'
        })
      }
    });
  }

  // reject方法测试
  test23(_Promise) {
    this.setState({
      res1: 'p1',
      res2: 'p2',
      res3: 'p3',
      result1: 'p1',
      result2: 'p2',
      result3: 'p3',
    })
    let p = _Promise.reject('reject方法');
    p.then(res => {
      if (_Promise === Promise) {
        this.setState({
          result1: res
        })
      } else {
        this.setState({
          res1: res
        })
      }
    }).catch(err => {
      if (_Promise === Promise) {
        this.setState({
          result2: err
        })
      } else {
        this.setState({
          res2: err
        })
      }
    }).finally(() => {
      if (_Promise === Promise) {
        this.setState({
          result3: 'finally func!'
        })
      } else {
        this.setState({
          res3: 'finally func!'
        })
      }
    });
  }

  // then方法resolve回调返回Promise对象(reject)
  test24(_Promise) {
    this.setState({
      res1: 'p1',
      res2: 'p2',
      res3: 'p3',
      result1: 'p1',
      result2: 'p2',
      result3: 'p3',
    })
    function fn1(resolve, reject) {
      resolve(1);
    };
    function fn2(resolve, reject) {
      reject(2);
    };
    new _Promise(fn1).then(res => {
      if (_Promise === Promise) {
        this.setState({
          result1: res
        })
      } else {
        this.setState({
          res1: res
        })
      }
      return new _Promise(fn2);
    }, err => {
      console.log(_Promise === Promise ? 'Promise' : 'MyPromise', 'err1==', err);
    }).then(res => {
      if (_Promise === Promise) {
        this.setState({
          result2: res
        })
      } else {
        this.setState({
          res2: res
        })
      }
      return 33;
    }, err => {
      console.log(_Promise === Promise ? 'Promise' : 'MyPromise', 'err2==', err);
      return 44;
    }).then((res) => {
      if (_Promise === Promise) {
        this.setState({
          result3: res
        })
      } else {
        this.setState({
          res3: res
        })
      }
    }, err => {
      console.log(_Promise === Promise ? 'Promise' : 'MyPromise', 'err3==', err);
    }).catch(err => {
      console.log(_Promise === Promise ? 'Promise' : 'MyPromise', 'catch==', err);
    });
  }

  // then方法reject回调返回Promise对象(reject)
  test25(_Promise) {
    this.setState({
      res1: 'p1',
      res2: 'p2',
      res3: 'p3',
      result1: 'p1',
      result2: 'p2',
      result3: 'p3',
    })
    function fn1(resolve, reject) {
      reject(1);
    };
    function fn2(resolve, reject) {
      reject(2);
    };
    new _Promise(fn1).then(res => {
      if (_Promise === Promise) {
        this.setState({
          result1: res
        })
      } else {
        this.setState({
          res1: res
        })
      }
    }, err => {
      console.log(_Promise === Promise ? 'Promise' : 'MyPromise', 'err1==', err);
      return new _Promise(fn2);
    }).then(res => {
      if (_Promise === Promise) {
        this.setState({
          result2: res
        })
      } else {
        this.setState({
          res2: res
        })
      }
      return 33;
    }, err => {
      console.log(_Promise === Promise ? 'Promise' : 'MyPromise', 'err2==', err);
      return 44;
    }).then((res) => {
      if (_Promise === Promise) {
        this.setState({
          result3: res
        })
      } else {
        this.setState({
          res3: res
        })
      }
    }, err => {
      console.log(_Promise === Promise ? 'Promise' : 'MyPromise', 'err3==', err);
    }).catch(err => {
      console.log(_Promise === Promise ? 'Promise' : 'MyPromise', 'catch==', err);
    });
  }

  // Promise状态多次改变
  test26(_Promise) {
    this.setState({
      res1: 'p1',
      res2: 'p2',
      res3: 'p3',
      result1: 'p1',
      result2: 'p2',
      result3: 'p3',
    })
    function fn26(resolve, reject) {
      let count = 1,
        stopId = setInterval(() => {
          let isEven = count % 2 === 0;//是否偶数 偶数resolve，基数reject
          if (isEven) {
            resolve(`resolve===${count}`);
          } else {
            reject(`reject===${count}`);
          };
          count++;
          if (count > 5) clearInterval(stopId);
        }, 1000);
    };
    new _Promise(fn26).then(res => {
      if (_Promise === Promise) {
        this.setState({
          result1: res
        })
      } else {
        this.setState({
          res1: res
        })
      }
    }, err => {
      if (_Promise === Promise) {
        this.setState({
          result2: err
        })
      } else {
        this.setState({
          res2: err
        })
      }
    });
  }

  // then方法的异步执行
  test27(_Promise) {
    function fn27(resolve, reject) {
      console.log(_Promise === Promise ? 'Promise' : 'MyPromise', 'running fn27');
      // throw new Error('err@fn27')
      resolve('resolve @fn27')
    };
    console.log(_Promise === Promise ? 'Promise' : 'MyPromise', 'start');
    let p = new _Promise(fn27);
    p.then(res => {
      console.log(_Promise === Promise ? 'Promise' : 'MyPromise', res);
    }).catch(err => {
      console.log(_Promise === Promise ? 'Promise' : 'MyPromise', 'err=', err);
    });
    console.log(_Promise === Promise ? 'Promise' : 'MyPromise', 'end');
  };

  render() {
    const testInfo = this.state.testInfo
    return (
      <div className="container">
        <Row>
          <Col id="operation_btns" className="part test_btn" span={18}>
            <Buttons info={this.state.info} onClick={(index) => this.runTest(index)}></Buttons>
          </Col>
          <Col className="part result_area" span={5} offset={1}>
            <div className="pro_item my_promise">
              <p className="title">自己封装的MyPromise</p>
              <p id="my_pro_test_info" className="test_info">{testInfo}</p>
              <div id="res_my_pro" className="log_output">
                <p>{this.state.res1}</p>
                <p>{this.state.res2}</p>
                <p>{this.state.res3}</p>
              </div>
            </div>
            <div className="pro_item native_promise">
              <p className="title">原生Promise</p>
              <p id="native_pro_test_info" className="test_info">{testInfo}</p>
              <div id="res_native_pro" className="log_output">
                <p>{this.state.result1}</p>
                <p>{this.state.result2}</p>
                <p>{this.state.result3}</p>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

export default App
