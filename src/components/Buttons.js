import React, { Fragment } from 'react'
import { Button } from 'antd'

/* class Buttons extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      info: props.info,
      run: props.onClick
    }
  }
  handleClick(index) {
    this.state.run(index)
  }
  render() {
    const info = this.state.info
    return (
      <Fragment>
        {
          info.map((value, index) => 
            <Button onClick={() => this.handleClick(index)} key={index}>{index}-{value}</Button>
          )
        }
      </Fragment>
    )
  }
} */

function Buttons(props) {
  const info = props.info
  const run = props.onClick
  return (
    <Fragment>
      {
        info.map((value, index) => {
          return <Button onClick={() => run(index)} key={index}>{index}-{value}</Button>
        }
        )
      }
    </Fragment>
  )
}

export default Buttons