import {Link} from 'react-router-dom'
import {NOT_FOUND_URL} from '../../constants'
import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <img src={NOT_FOUND_URL} alt="not found" className="not-found-img" />
    <div className="not-found-content">
      <h1 className="not-found-heading">Lost Your Way ?</h1>
      <p className="not-found-text">
        we are sorry, the page you requested could not be found Please go back
        to the homepage.
      </p>
      <Link to="/">
        <button type="button" className="not-found-btn">
          Go to Home
        </button>
      </Link>
    </div>
  </div>
)

export default NotFound
