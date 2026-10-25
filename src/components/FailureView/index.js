import {FAILURE_URL} from '../../constants'
import './index.css'

const FailureView = props => {
  const {onRetry} = props
  return (
    <div className="failure-container">
      <img src={FAILURE_URL} alt="failure view" className="failure-img" />
      <p className="failure-text">Something went wrong. Please try again</p>
      <button type="button" className="try-again-btn" onClick={onRetry}>
        Try Again
      </button>
    </div>
  )
}

export default FailureView
