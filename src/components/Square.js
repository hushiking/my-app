import React from 'react'

/* class Square extends React.Component {
  render() {
    return (
      <button className="square" onClick={() => this.props.onClick()}>
        {this.props.value}
      </button>
    );
  }
} */

export default function Square(props) {
  return (
    <button className={props.style} onClick={props.onClick}>
      {props.value}
    </button>
  )
}