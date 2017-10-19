import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { firebaseConnect, helpers } from 'react-redux-firebase'
import moment from 'moment'

const { dataToJS, isLoaded, isEmpty } = helpers

const TableHeader = ()=> {
  return (<thead>
            <tr>
              <th>#</th>
              <th>Player <i className={`fa fa-times input-icon`} aria-hidden='true'/></th>
              <th>Player <i className={`fa fa-circle-o input-icon`} aria-hidden='true'/></th>
              <th>Winner</th>
              <th>Date</th>
            </tr>
          </thead>)
}
const DataRows = ({ games })=> {
  if (!isLoaded(games)) {
    return (<tr>
      <td colSpan='5' className='text-center'>Loading..</td>
    </tr>)
  } else if (isEmpty(games)) {
    return (<tr>
      <td colSpan='5'>Yikes! Be the first game match.</td>
    </tr>)
  }

  return (Object.keys(games).reverse().map((k, i)=> (
      <tr key={`row-${i}`}>
          <td>{i}</td>
          <td>{games[k].player1 ? games[k].player1.name : 'Player 1'}</td>
          <td>{games[k].player2 ? games[k].player2.name : 'Player 2'}</td>
          <td>{games[k].winner ? games[k].winner : 'N/A'}</td>
          <td>{moment(games[k].created).calendar()}</td>
      </tr>
  )))
}

@firebaseConnect([ 'games' ])
@connect(({ firebase })=> ({
  games: dataToJS(firebase, 'games')
}))
class GameResults extends PureComponent {
  render() {
    return (<table className='table table-striped table-hover '>
              <TableHeader/>
              <tbody>
                <DataRows games={this.props.games}/>
              </tbody>
            </table>)
  }
}

export default GameResults
