import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { firebaseConnect, helpers } from 'react-redux-firebase'
const { dataToJS } = helpers
const PlayerInputField = ({ symbol, playerNo, name, onChange })=> {
  return (<div className='form-group'>
            <label className='control-label'
             htmlFor={`player${playerNo}`}>{`Player ${playerNo}`}</label>
            <div className='input-group'>
              <span className='input-group-addon'>
                <i className={`fa ${symbol} input-icon`} aria-hidden='true'/>
              </span>
              <input name={name} type='text'
               className='form-control'
               placeholder={`Enter player ${playerNo} name`}
               onChange={onChange}/>
            </div>
          </div>)
}
const defaultGameValues = {
  player1: { symbol: 'X' },
  player2: { symbol: 'O' },
  status: 'started'
}
@firebaseConnect([ 'games' ])
@connect(({ firebase })=> ({
  games: dataToJS(firebase, 'games')
}))
class NewGame extends PureComponent {
  constructor() {
    super()
    this.state = {
      game: defaultGameValues
    }
  }
  handleInputChange(e) {
    const game = Object.assign({}, this.state.game)
    game[e.target.name].name = e.target.value
    this.setState({ game })
  }
  handleSubmit(name, e) {
    e.preventDefault()
    const newGame = Object.assign({}, this.state.game)
    if (name && name === 'AI') {
      newGame.player2.name = name
    }
    newGame.created = new Date().toISOString()
    this.props.firebase.push('/games', newGame)
    .then((result)=> {
      this.props.history.push(`/game/${result.path.o[1]}`)
    })
    .catch((err)=> {
      console.log('Erorr creating game data.', err)
    })
  }
  render() {
    return (<div className='panel panel-primary'>
              <div className='panel-heading'>
                <h3 className='panel-title'>Enter player name or play with AI</h3>
              </div>
              <div className='panel-body'>
                <form onSubmit={this.handleSubmit.bind(this, null)}>
                  <PlayerInputField
                    onChange={this.handleInputChange.bind(this)}
                    symbol='fa-times' playerNo={1} name='player1'/>
                  <PlayerInputField
                    onChange={this.handleInputChange.bind(this)}
                    symbol='fa-circle-o' playerNo={2} name='player2'/>

                  <button type='submit' className='btn btn-primary btn-lg'
                   style={{ marginRight: '10px' }}>Start Game</button>
                  <button onClick={this.handleSubmit.bind(this, 'AI')}
                  className='btn btn-info btn-lg'>Play with AI</button>
                </form>
              </div>
            </div>)
  }
}
export default NewGame

