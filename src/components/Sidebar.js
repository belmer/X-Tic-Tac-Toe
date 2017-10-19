import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { firebaseConnect, helpers } from 'react-redux-firebase'
import { Link } from 'react-router-dom'
const { dataToJS, isLoaded, isEmpty } = helpers
const Recent = ({ games })=> {
  if (isEmpty(games)) {
    return (<a href='#' className='list-group-item'>Yikes! Be the first game match.
              </a>)
  }
  return Object.keys(games).reverse().slice(0, 5).map((k, i)=> {
    const { player1, player2 } = games[k]
    const p1Name = player1.name ? player1.name : 'Player 1'
    const p2Name = player2.name ? player2.name : 'Player 2'
    return (<a key={`g-${i}`} href='#' className='list-group-item'>
            <span className='badge'>{i + 1}</span>
            { `${p1Name} vs ${p2Name}` }
      </a>)
  })
}
@firebaseConnect([ 'games' ])
@connect(({ firebase })=> ({
  games: dataToJS(firebase, 'games')
}))
class Sidebar extends PureComponent {
  constructor() {
    super()
  }

  render() {
    const { games } = this.props
    return (<div className='list-group'>
              <a href='#' className='list-group-item active'>
                { !isLoaded(games) ? <i className='fa fa-gear fa-spin spinner'/> : 'Recent Games'}
              </a>
              <Recent games={games}/>
              <Link to='/matches' className='list-group-item active'>
                View Game Results
              </Link>
            </div>)
  }
}

export default Sidebar
