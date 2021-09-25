import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css'

import { AuthProvider } from './context/Auth'
import Home from './pages/Home'
import AnimeList from './pages/AnimeList'
import Login from './pages/Login'
import Register from './pages/Register'

function App() {
  return (
    <AuthProvider>
      <Router>        
        <Route exact path="/" component={Home} />
        <Route exact path="/animelist" component={AnimeList} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />        
      </Router>
    </AuthProvider>
  )
}

export default App;
