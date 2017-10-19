import React, { PureComponent } from 'react'
const Square = (props)=> {
  let valueIcon = ''
  if (props.value === 'X') {
    valueIcon = 'fa-times'
  } else if (props.value === 'O') {
    valueIcon = 'fa-circle-o'
  }
  return (
    <div className='slot col-md-4' onClick={props.onClick}>
      <div className='slot-content'>
        <i className={`fa ${valueIcon} ${props.winnerClass} slot-icon`} aria-hidden='true'/>
      </div>
    </div>
  )
}

class Board extends PureComponent {
  renderSquare(i) {
    let winnerClass = ''
    if (this.props.winner && this.props.winner.set.includes(i)) {
      winnerClass = 'winner'
    }
    return (
      <Square
        winnerClass = {`${winnerClass}`}
        key={`square-${i}`}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    )
  }
  drawGrid(gridWidth) {
    return [...Array(gridWidth * gridWidth)].map((u, i)=>this.renderSquare(i))
  }
  render() {
    return (
      <div id='grid'>
        <div id='slots'>
          {this.drawGrid(3)}
        </div>
      </div>
    )
  }
}

export default Board
