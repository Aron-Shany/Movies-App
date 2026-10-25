import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import {LOGO_URL} from '../../constants'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', errorMsg: ''}

  onChangeUsername = event => this.setState({username: event.target.value})

  onChangePassword = event => this.setState({password: event.target.value})

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    const {username, password} = this.state
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    localStorage.setItem('username', username)
    localStorage.setItem('passwordLength', password.length)
    history.replace('/')
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const options = {
      method: 'POST',
      body: JSON.stringify({username, password}),
    }
    const response = await fetch('https://apis.ccbp.in/login', options)
    const data = await response.json()
    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.setState({errorMsg: data.error_msg})
    }
  }

  render() {
    if (Cookies.get('jwt_token') !== undefined) {
      return <Redirect to="/" />
    }
    const {username, password, errorMsg} = this.state
    return (
      <div className="login-container">
        <img src={LOGO_URL} alt="login website logo" className="login-logo" />
        <div className="login-card-wrapper">
          <form className="login-form" onSubmit={this.onSubmitForm}>
            <h1 className="login-heading">Login</h1>
            <label htmlFor="username" className="login-label">
              USERNAME
            </label>
            <input
              id="username"
              type="text"
              className="login-input"
              value={username}
              onChange={this.onChangeUsername}
            />
            <label htmlFor="password" className="login-label">
              PASSWORD
            </label>
            <input
              id="password"
              type="password"
              className="login-input"
              value={password}
              onChange={this.onChangePassword}
            />
            {errorMsg !== '' && <p className="error-msg">{errorMsg}</p>}
            <button type="submit" className="login-button">
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default Login
