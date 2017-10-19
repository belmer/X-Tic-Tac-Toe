import React, { PureComponent } from 'react'
import Game from '../components/Game'
import { connect } from 'react-redux'
import { firebaseConnect, helpers } from 'react-redux-firebase'
const { dataToJS } = helpers
const Player = ({ player, defaultName })=> {
  let icon = ''
  if (player.symbol === 'X') {
    icon = 'fa-times'
  } else if (player.symbol === 'O') {
    icon = 'fa-circle-o'
  }
  return (<div className='lead text-center col-md-4 col-xs-4'>
            <div className='label label-primary game-status'>
            {`${player.name ? player.name : defaultName}`}
            <i className={`fa ${icon}`}
              style= {{ marginLeft: '10px' }}
              aria-hidden='true'/>
          </div>
          </div>)
}
const Match = ({ players })=> {
  if (!players) {
    return (<div className='row text-center'>
              <i className='fa fa-gear fa-spin spinner'/>
            </div>)
  }

  return (<div className='row'>
            <Player player={players.player1} defaultName='Player 1'/>
            <div className='text-center col-md-4 col-xs-4'>VS</div>
            <Player player={players.player2} defaultName='Player 2'/>
          </div>)
}
@firebaseConnect([ 'games' ])
@connect(({ firebase })=> ({
  games: dataToJS(firebase, 'games')
}))
class StartGame extends PureComponent {
  constructor() {
    super()
    this.state = {
      gameId: null
    }
  }
  getIdFromParams(props) {
    const { match } = props
    this.setState({
      gameId: match.params.id
    })
  }
  componentWillReceiveProps(nextProps) {
    this.getIdFromParams(nextProps)
  }
  componentWillMount() {
    this.getIdFromParams(this.props)
  }
  handleDone(winner) {
    const { games } = this.props
    const match = Object.assign({}, games[this.state.gameId])
    let winnerName = 'draw'
    if (winner !== 'draw') {
      if (winner === 'X') {
        winnerName = match.player1.name ? match.player1.name : 'Player 1'
      } else {
        winnerName = match.player2.name ? match.player2.name : 'Player 2'
      }
    }
    match.status = 'done'
    match.winner = winnerName
    setTimeout(()=> {
      this.props.firebase.update(`/games/${this.state.gameId}`, match)
    }, 10)
  }
  handleReplay() {
    const { games } = this.props
    const match = Object.assign({}, games[this.state.gameId])
    delete (match, 'winner')
    match.status = 'started'
    match.created = new Date().toISOString()
    this.props.firebase.push('/games', match)
    .then((result)=> {
      window.location.href = `/game/${result.path.o[1]}`
    })
    .catch((err)=> {
      console.log('Erorr creating game data.', err)
    })
  }
  render() {
    const { games } = this.props
    let gamePlayers = null
    if (games) {
      gamePlayers = this.state.gameId ? games[this.state.gameId] : null
    }
    return (
            <div className='panel panel-primary'>
              <div className='panel-heading'>
                <h3 className='panel-title text-center'>Game Match</h3>
              </div>
              <div className='panel-body'>
                <Match players={gamePlayers}/>
                <div className='row'>
                  <Game players={gamePlayers}
                   onDone={this.handleDone.bind(this)}
                   onReplay={this.handleReplay.bind(this)}
                   />
                </div>
              </div>
            </div>
    )
  }
}

export default StartGame
