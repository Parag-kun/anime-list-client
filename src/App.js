import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css'

import { AuthProvider } from './context/Auth'
import Home from './pages/Home'
import AnimeList from './pages/AnimeList'
import Login from './pages/Login'
import Register from './pages/Register'
import Users from './pages/Users'
import Search from './pages/Search'
import FriendList from './pages/FriendList'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/animelist" component={AnimeList} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/users" component={Users} />
          <Route exact path="/search" component={Search} />
          <Route exact path="/users/:friendName" component={FriendList} />
        </Switch>
      </Router>
    </AuthProvider>
  )
}

export default App;
