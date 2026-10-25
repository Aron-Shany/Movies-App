import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

class LoginForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      showPassword: false,
      errorMsg: '',
      showError: false,
      isLoading: false,
    }
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onTogglePassword = () => {
    this.setState(prevState => ({
      showPassword: !prevState.showPassword,
    }))
  }

  onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onSubmitFailure = message => {
    this.setState({
      errorMsg: message,
      showError: true,
      isLoading: false,
    })
  }

  onSubmitForm = async event => {
    event.preventDefault()

    const {username, password} = this.state

    this.setState({
      showError: false,
      isLoading: true,
    })

    try {
      const response = await fetch('https://apis.ccbp.in/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({username, password}),
      })

      const data = await response.json()

      if (response.ok) {
        this.onSubmitSuccess(data.jwt_token)
      } else {
        this.onSubmitFailure(data.error_msg || 'Login failed.')
      }
    } catch (error) {
      console.error(error)
      this.onSubmitFailure(
        'Unable to connect to the login server. Please try again.',
      )
    }
  }

  render() {
    const {username, password, showPassword, errorMsg, showError, isLoading} =
      this.state

    return (
      <div className="login-container">
        <form className="login-form" onSubmit={this.onSubmitForm}>
          <h1 className="login-heading">Login</h1>

          <label className="input-label" htmlFor="username">
            USERNAME
          </label>
          <input
            id="username"
            type="text"
            className="input-field"
            value={username}
            onChange={this.onChangeUsername}
            placeholder="Username"
          />

          <label className="input-label" htmlFor="password">
            PASSWORD
          </label>
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            className="input-field"
            value={password}
            onChange={this.onChangePassword}
            placeholder="Password"
          />

          <div className="show-password-container">
            <input
              id="showPassword"
              type="checkbox"
              checked={showPassword}
              onChange={this.onTogglePassword}
            />
            <label htmlFor="showPassword">Show Password</label>
          </div>

          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </button>

          {showError && <p className="error-message">*{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default LoginForm
