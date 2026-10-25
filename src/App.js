import {Switch, Route, Redirect} from 'react-router-dom'
<<<<<<< HEAD
import Login from './components/Login'
import Home from './components/Home'
import Popular from './components/Popular'
import Search from './components/Search'
import MovieItemDetails from './components/MovieItemDetails'
import Account from './components/Account'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoutes'
import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/popular" component={Popular} />
    <ProtectedRoute exact path="/search" component={Search} />
    <ProtectedRoute exact path="/movies/:id" component={MovieItemDetails} />
    <ProtectedRoute exact path="/account" component={Account} />
    <Route path="/not-found" component={NotFound} />
=======

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Popular from './components/Popular'
import MovieItemDetails from './components/MovieItemDetails'
import Search from './components/Search'
import Account from './components/Account'
import NotFound from './components/NotFound'

const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginForm} />
    <Route exact path="/" component={Home} />
    <Route exact path="/popular" component={Popular} />
    <Route exact path="/movies/:id" component={MovieItemDetails} />
    <Route exact path="/search" component={Search} />
    <Route exact path="/account" component={Account} />
    <Route exact path="/not-found" component={NotFound} />
>>>>>>> c67b3e505f20d2caeb67eb28997b6a73fcf052ea
    <Redirect to="/not-found" />
  </Switch>
)

export default App
