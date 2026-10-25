/* eslint-disable react/no-unknown-property */
import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Header from '../Header'
import Footer from '../Footer'
import LoaderView from '../LoaderView'
import FailureView from '../FailureView'
import Pagination from '../Pagination'
import {NO_MOVIES_URL} from '../../constants'
import './index.css'

const PAGE_SIZE = 10

const status = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Search extends Component {
  state = {
    apiStatus: status.initial,
    movies: [],
    searchValue: '',
    currentPage: 1,
  }

  onSearch = searchText => {
    this.setState(
      {searchValue: searchText, currentPage: 1},
      this.getSearchResults,
    )
  }

  onChangePage = page => {
    this.setState({currentPage: page}, () => window.scrollTo(0, 0))
  }

  getSearchResults = async () => {
    const {searchValue} = this.state
    this.setState({apiStatus: status.loading})
    const jwtToken = Cookies.get('jwt_token')
    const options = {headers: {Authorization: `Bearer ${jwtToken}`}}
    const url = `https://apis.ccbp.in/movies-app/movies-search?search=${searchValue}`
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      this.setState({movies: data.results, apiStatus: status.success})
    } else {
      this.setState({apiStatus: status.failure})
    }
  }

  renderNoResults = () => {
    const {searchValue} = this.state
    return (
      <div className="no-results">
        <img src={NO_MOVIES_URL} alt="no movies" className="no-results-img" />
        <p className="no-results-text">
          {`Your search for ${searchValue} did not find any matches.`}
        </p>
      </div>
    )
  }

  renderMovies = () => {
    const {movies, currentPage} = this.state
    if (movies.length === 0) {
      return this.renderNoResults()
    }
    const totalPages = Math.ceil(movies.length / PAGE_SIZE)
    const start = (currentPage - 1) * PAGE_SIZE
    const pageMovies = movies.slice(start, start + PAGE_SIZE)
    return (
      <>
        <ul className="search-list">
          {pageMovies.map(movie => (
            <li className="search-item" key={movie.id}>
              <Link to={`/movies/${movie.id}`}>
                <img
                  src={movie.poster_path}
                  alt={movie.title}
                  className="search-img"
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
        return <FailureView onRetry={this.getSearchResults} />
      default:
        return null
    }
  }

  render() {
    return (
      <div className="search-container">
        <Header onSearch={this.onSearch} />
        <div className="search-content">{this.renderContent()}</div>
        <Footer />
      </div>
    )
  }
}

export default Search
