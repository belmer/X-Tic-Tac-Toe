import React from 'react'
import { Switch, Route } from 'react-router-dom'
import NewGame from './NewGame'
import StartGame from './StartGame'
import GameResults from './GameResults'
const Main = ()=> (
  <Switch>
    <Route exact path='/' component={NewGame}/>
    <Route path='/game/:id' component={StartGame}/>
    <Route exact path='/matches' component={GameResults}/>
  </Switch>
)

export default Main
