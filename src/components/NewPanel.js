import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'

class NewPanel extends PureComponent {
  render() {
    return (<div className='panel panel-primary'>
              <div className='panel-heading'>
                <h3 className='panel-title text-center'>Ready for another round?</h3>
              </div>
              <div className='panel-body'>
                <Link to='/' className='btn btn-success btn-lg'>New Game</Link>
              </div>
            </div>)
  }
}

export default NewPanel
