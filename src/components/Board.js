import React from 'react'
import Square from './Square'

class Board extends React.Component {
  /* constructor(props) {
    super(props)
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    }
  }
  
  handleClick(i) {
    const squares = this.state.squares.slice()
    if (calculateWinner(squares) || squares[i])  return
    squares[i] = this.state.xIsNext ? 'X' : 'O'
    this.setState({
      squares,
      xIsNext: !this.state.xIsNext,
    })
  } */
  renderSquare(i) {
    let style
    if (this.props.line.indexOf(i) !== -1) {
      style = 'square pink'
    } else {
      style = 'square'
    }
    return <Square style={style} key={i} value={this.props.squares[i]} onClick={() => this.props.onClick(i)} />;
  }

  render() {
    return (
      <div>
        {
          Array(3).fill(null).map((v, i) => (
            <div className="board-row" key={i}>
              {
                Array(3).fill(null).map((v, j) => (
                  this.renderSquare(3 * i + j)
                ))
              }
            </div>
          ))
        }
      </div>
    )
  }

  renderDeprecated() {
    /* const winner = calculateWinner(this.state.squares)
    let status
    if (winner) {
      status = 'Winner: ' + winner
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    } */

    return (
      <div>
        {/* <div className="status">{status}</div> */}
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

export default Board
