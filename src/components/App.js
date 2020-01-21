import React from 'react'
import { Row, Col } from 'antd'
import Buttons from './Buttons'
import MyPromise from '../utils/myPromise'
import '../styles/App.css'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      res1: '',
      res2: '',
      res3: '',
      result1: '',
      result2: '',
      result3: '',
      testInfo: '结果将在下面显示:',
      info: ['同步测试--resolve', '异步测试--resolve', '异步测试--reject', '同步写法测试', '链式调用--resolve']
    }
  }

  runTest(index) {
    this[`test${index}`](MyPromise)
    this[`test${index}`](Promise)
  }

  test0(_Promise) {
    this.setState({
      res1: '',
      res2: '',
      res3: '',
      result1: '',
      result2: '',
      result3: '',
    })
    function fn1(resolve, reject) {
      console.log('同步执行0')
      resolve(0);
    };
    new _Promise(fn1).then((val) => {
      if (_Promise === Promise) {
        this.setState({
          result2: val
        })
      } else {
        this.setState({
          res2: val
        })
      }
    });
  }
  test1(_Promise) {
    this.setState({
      res1: '',
      res2: '',
      res3: '',
      result1: '',
      result2: '',
      result3: '',
    })
    function fn1(resolve, reject) {
      console.log('2秒后执行异步函数')
      setTimeout(function () {
        resolve(1);
      }, 2000);
    };
    new _Promise(fn1).then((val) => {
      if (_Promise === Promise) {
        this.setState({
          result2: val
        })
      } else {
        this.setState({
          res2: val
        })
      }
    });
  };

  test2(_Promise) {
    this.setState({
      res1: '',
      res2: '',
      res3: '',
      result1: '',
      result2: '',
      result3: '',
    })
    function fn2(resolve, reject) {
      console.log('2秒后执行异步函数')
      setTimeout(function () {
        reject(2);
      }, 2000);
    };
    new _Promise(fn2).then((val) => {
      if (_Promise === Promise) {
        this.setState({
          result2: val
        })
      } else {
        this.setState({
          res2: val
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

  test3(_Promise) {
    this.setState({
      res1: '',
      res2: '',
      res3: '',
      result1: '',
      result2: '',
      result3: '',
    })
    function fn1(resolve, reject) {
      console.log('2秒后执行异步函数1')
      setTimeout(function () {
        resolve('3-1');
      }, 2000);
    };
    function fn2(resolve, reject) {
      console.log('2秒后执行异步函数2')
      setTimeout(function () {
        resolve('3-2');
      }, 1000);
    };
    new _Promise(fn1).then(val => {
      if (_Promise === Promise) {
        this.setState({
          result1: val
        })
      } else {
        this.setState({
          res1: val
        })
      }
      return new _Promise(fn2);
    }).then(val => {
      if (_Promise === Promise) {
        this.setState({
          result2: val
        })
      } else {
        this.setState({
          res2: val
        })
      }
    });
  };

  test4(_Promise) {
    this.setState({
      res1: '',
      res2: '',
      res3: '',
      result1: '',
      result2: '',
      result3: '',
    })
    function fn3(resolve, reject) {
      console.log('同步执行4-1')
      resolve('4-1');
    };
    function fn4(resolve, reject) {
      console.log('同步执行4-2')
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

  render() {
    const testInfo = this.state.testInfo
    return (
      <div className="container">
        <Row>
          <Col id="operation_btns" className="part test_btn" span={12}>
            <Buttons info={this.state.info} onClick={(index) => this.runTest(index)}></Buttons>
          </Col>
          <Col className="part result_area" span={11} offset={1}>
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
