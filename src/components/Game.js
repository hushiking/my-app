import React from 'react'
import Board from './Board'

class Game extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      history: [{
        num: 0,
        squares: Array(9).fill(null),
        coordinate: [0, 0]
      }],
      xIsNext: true,
      stepNumber: 0,
      order: true,
    }
  }

  handleClick(i) {
    const coordinate = [
      [1, 1],
      [2, 1],
      [3, 1],
      [1, 2],
      [2, 2],
      [3, 2],
      [1, 3],
      [2, 3],
      [3, 3]
    ]
    const history = this.state.history.slice(0, this.state.stepNumber + 1)
    const current = history[history.length - 1]
    const squares = current.squares.slice()

    if (calculateWinner(squares).winner || squares[i]) {
      return
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O'
    this.setState({
      history: history.concat([{ num: history.length, squares, coordinate: coordinate[i] }]),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length,
    })
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    })
  }

  handleOrder() {
    const history = this.state.history.slice()
    this.setState({
      order: !this.state.order,
      history: history.reverse(),
    })
  }

  render() {
    const orderStr = this.state.order ? '升序' : '降序'
    const history = this.state.history
    // const current = history[history.length - 1]
    const current = history[this.state.stepNumber]
    const winner = calculateWinner(current.squares).winner

    const moves = history.map((step, move) => {
      const desc = step.num ? `Go to move #${step.num} (${step.coordinate})` : `Go to game start${step.coordinate})`
      return (
        <li key={move}>
          <button className={move === this.state.stepNumber ? 'active' : ''} onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      )
    })

    let status, line

    if (winner) {
      status = 'Winner: ' + winner
      line = calculateWinner(current.squares).line
    } else if (this.state.stepNumber >= 9) { // history.length 也可
      status = 'This is a draw'
      line = []
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O')
      line = []
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board line={line} squares={current.squares} onClick={(i) => this.handleClick(i)} />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
        <div>
          <button onClick={() => this.handleOrder()}><strong>{orderStr}</strong>排列历史记录</button>
        </div>
      </div>
    );
  }
}

export default Game

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
        winner: squares[a],
        line: lines[i]
      }
    }
  }
  return {
    winner: null,
    line: []
  }
}