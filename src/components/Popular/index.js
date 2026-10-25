/* eslint-disable react/no-unknown-property */
import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Header from '../Header'
import Footer from '../Footer'
import LoaderView from '../LoaderView'
import FailureView from '../FailureView'
import Pagination from '../Pagination'
import './index.css'

const status = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const PAGE_SIZE = 10

class Popular extends Component {
  state = {apiStatus: status.initial, movies: [], currentPage: 1}

  componentDidMount() {
    this.getPopularMovies()
  }

  onChangePage = page => {
    this.setState({currentPage: page}, () => window.scrollTo(0, 0))
  }

  getPopularMovies = async () => {
    this.setState({apiStatus: status.loading})
    const jwtToken = Cookies.get('jwt_token')
    const options = {headers: {Authorization: `Bearer ${jwtToken}`}}
    const response = await fetch(
      'https://apis.ccbp.in/movies-app/popular-movies',
      options,
    )
    if (response.ok) {
      const data = await response.json()
      this.setState({movies: data.results, apiStatus: status.success})
    } else {
      this.setState({apiStatus: status.failure})
    }
  }

  renderMovies = () => {
    const {movies, currentPage} = this.state
    const totalPages = Math.ceil(movies.length / PAGE_SIZE)
    const start = (currentPage - 1) * PAGE_SIZE
    const pageMovies = movies.slice(start, start + PAGE_SIZE)
    return (
      <>
        <ul className="popular-list">
          {pageMovies.map(movie => (
            <li className="popular-item" key={movie.id}>
              <Link to={`/movies/${movie.id}`}>
                <img
                  src={movie.poster_path}
                  alt={movie.title}
                  className="popular-img"
                  testid="movieItem"
                />
              </Link>
            </li>
          ))}
        </ul>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onChangePage={this.onChangePage}
        />
      </>
    )
  }

  renderContent = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case status.loading:
        return <LoaderView />
      case status.success:
        return this.renderMovies()
      case status.failure:
        return <FailureView onRetry={this.getPopularMovies} />
      default:
        return null
    }
  }

  render() {
    return (
      <div className="popular-container">
        <Header />
        <div className="popular-content">{this.renderContent()}</div>
        <Footer />
      </div>
    )
  }
}

export default Popular
