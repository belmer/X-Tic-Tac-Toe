import React, { PureComponent } from 'react'
import Board from './Board'
import AI from '../utils/AI'
const PlayAgain = ({ onReplay })=> {
  return (
          <a href='#' onClick={onReplay} className='label label-info game-status'
           style={{ marginLeft: '10px' }}>Play Again</a>
  )
}
const Status = ({ winner, xNext, players, draw })=> {
  let winnerDisplay = ''
  let move = 'X'
  if (players) {
    if (winner && winner === 'O') {
      winnerDisplay = players.player2.name ? players.player2.name : 'Player 2'
    } else if (winner && winner === 'X') {
      winnerDisplay = players.player1.name ? players.player1.name : 'Player 1'
    }

    if (xNext) {
      move = players.player1.name ? players.player1.name : 'Player 1'
    } else {
      move = players.player2.name ? players.player2.name : 'Player 2'
    }
  }
  if (winner) {
    return <span className='label label-success game-status'>{`Winner: ${winnerDisplay}`}</span>
  }

  if (draw) {
    return <span className='label label-danger game-status'>{`It's a Draw!`}</span>
  }
  return (<div className='label label-warning game-status'>
            {`Next move: ${move}`}
          </div>)
}
const calculateWinner = (squares)=> {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], set: lines[i] }
    }
  }
  return null
}

const initialGameData = {
  history: [
    {
      squares: Array(9).fill(0)
    }
  ],
  stepNumber: 0,
  xIsNext: true
}
class Game extends PureComponent {
  constructor() {
    super()
    this.state = Object.assign({}, initialGameData)
    this.ai = new AI()
  }

  move(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1)
    const current = history[history.length - 1]
    const squares = current.squares.slice()
    const calculatedWinner = calculateWinner(squares)
    if (calculatedWinner || squares[i]) {
      return
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O'

    this.setState({
      history: history.concat([
        {
          squares: squares
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    }, ()=> {
      if (this.props.players.player2.name === 'AI') {
        if (squares[i] === 'X') {
          const newBoard = squares.map(player=> {
            if (player === 'X') {
              return 1
            } else if (player === 'O') {
              return 2
            }
            return 0
          })
          this.move(this.ai.search(newBoard))
        }
      }
    })
  }
  handleClick(i) {
    this.move(i)
  }

  handleReplay() {
    this.setState(initialGameData, ()=> {
      this.props.onReplay()
    })
  }
  render() {
    const history = this.state.history
    const current = history[this.state.stepNumber]
    const calculatedWinner = calculateWinner(current.squares)
    const winner = calculatedWinner ? calculatedWinner.winner : null
    const isDraw = history.length >= 10 && !winner
    if (winner) {
      this.props.onDone(winner)
    } else if (isDraw) {
      this.props.onDone('draw')
    }
    return (
      <div className='col-md-12'>
        <div className='game-board'>
          <Board
            winner = {calculatedWinner}
            squares={current.squares}
            onClick={i => this.handleClick(i)}
          />
        </div>
        <div className='game-info'>
          <div className='text-center status-wrapper'>
            <Status winner={winner} xNext={this.state.xIsNext}
             draw={isDraw} players={this.props.players}/>
            { winner || isDraw ? <PlayAgain onReplay={this.handleReplay.bind(this)}/> : null }
          </div>
        </div>
      </div>
    )
  }
}

export default Game
