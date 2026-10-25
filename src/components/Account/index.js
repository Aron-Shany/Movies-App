<<<<<<< HEAD
import Cookies from 'js-cookie'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const Account = props => {
  const username = localStorage.getItem('username')
  const passwordLength = Number(localStorage.getItem('passwordLength'))
  const maskedPassword = '*'.repeat(passwordLength)

  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    localStorage.removeItem('username')
    localStorage.removeItem('passwordLength')
    history.replace('/login')
  }

  return (
    <div className="account-container">
      <Header />
      <div className="account-content">
        <div className="account-card">
          <h1 className="account-heading">Account</h1>
          <hr className="account-line" />
          <div className="account-row">
            <p className="account-label">Member ship</p>
            <div>
              <p className="account-value">{username}</p>
              <p className="account-value">Password : {maskedPassword}</p>
            </div>
          </div>
          <hr className="account-line" />
          <div className="account-row">
            <p className="account-label">Plan details</p>
            <div className="plan-details">
              <p className="account-value">Premium</p>
              <p className="plan-tag">Ultra HD</p>
            </div>
          </div>
          <hr className="account-line" />
          <div className="logout-wrapper">
            <button
              type="button"
              className="logout-btn"
              onClick={onClickLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
=======
const Account = () => (
  <div>
    <h1>My Account</h1>
  </div>
)
>>>>>>> c67b3e505f20d2caeb67eb28997b6a73fcf052ea

export default Account
