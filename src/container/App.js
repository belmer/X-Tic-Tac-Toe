import React, { PureComponent } from 'react'
import { withRouter } from 'react-router-dom'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import NewPanel from '../components/NewPanel'
import Main from './Main'
import './App.css'

class App extends PureComponent {
  render() {
    return (
      <div className='App'>
        <div className='row row-offcanvas row-offcanvas-right'>
          <Header/>
          <div className='col-12 col-md-9'>
            <Main/>
          </div>
          <div className='col-6 col-md-3 sidebar-offcanvas text-center' id='sidebar'>
            {this.props.location.pathname.includes('matches') ? <NewPanel/> : <Sidebar/>}
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(App)
