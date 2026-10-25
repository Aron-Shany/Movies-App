import {Component} from 'react'
import Cookies from 'js-cookie'
import Header from '../Header'
import Footer from '../Footer'
import LoaderView from '../LoaderView'
import FailureView from '../FailureView'
import MoviesSlider from '../MoviesSlider'
import './index.css'

const status = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {
    trendingStatus: status.initial,
    trendingMovies: [],
    originalsStatus: status.initial,
    originalsMovies: [],
    topRatedStatus: status.initial,
    topRatedMovies: [],
    banner: null,
  }

  componentDidMount() {
    this.getTrending()
    this.getOriginals()
    this.getTopRated()
  }

  fetchMovies = async url => {
    const jwtToken = Cookies.get('jwt_token')
    const options = {headers: {Authorization: `Bearer ${jwtToken}`}}
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      return data.results
    }
    return null
  }

  getTrending = async () => {
    this.setState({trendingStatus: status.loading})
    const results = await this.fetchMovies(
      'https://apis.ccbp.in/movies-app/trending-movies',
    )
    if (results !== null) {
      this.setState({trendingMovies: results, trendingStatus: status.success})
    } else {
      this.setState({trendingStatus: status.failure})
    }
  }

  getTopRated = async () => {
    this.setState({topRatedStatus: status.loading})
    const results = await this.fetchMovies(
      'https://apis.ccbp.in/movies-app/top-rated-movies',
    )
    if (results !== null) {
      this.setState({topRatedMovies: results, topRatedStatus: status.success})
    } else {
      this.setState({topRatedStatus: status.failure})
    }
  }

  getOriginals = async () => {
    this.setState({originalsStatus: status.loading})
    const results = await this.fetchMovies(
      'https://apis.ccbp.in/movies-app/originals',
    )
    if (results !== null) {
      const banner = results[Math.floor(Math.random() * results.length)]
      this.setState({
        originalsMovies: results,
        banner,
        originalsStatus: status.success,
      })
    } else {
      this.setState({originalsStatus: status.failure})
    }
  }

  renderBanner = () => {
    const {originalsStatus, banner} = this.state
    switch (originalsStatus) {
      case status.loading:
        return <LoaderView />
      case status.success:
        return (
          <div
            className="banner"
            style={{backgroundImage: `url(${banner.backdrop_path})`}}
          >
            <div className="banner-content">
              <h1 className="banner-title">{banner.title}</h1>
              <p className="banner-overview">{banner.overview}</p>
              <button type="button" className="play-btn">
                Play
              </button>
            </div>
          </div>
        )
      case status.failure:
        return <FailureView onRetry={this.getOriginals} />
      default:
        return null
    }
  }

  renderRow = (rowStatus, movies, onRetry) => {
    switch (rowStatus) {
      case status.loading:
        return <LoaderView />
      case status.success:
        return <MoviesSlider movies={movies} />
      case status.failure:
        return <FailureView onRetry={onRetry} />
      default:
        return null
    }
  }

  render() {
    const {trendingStatus, trendingMovies} = this.state
    const {originalsStatus, originalsMovies} = this.state
    const {topRatedStatus, topRatedMovies} = this.state
    return (
      <div className="home-container">
        <Header />
        {this.renderBanner()}
        <h1 className="row-heading">Trending Now</h1>
        {this.renderRow(trendingStatus, trendingMovies, this.getTrending)}
        <h1 className="row-heading">Top Rated</h1>
        {this.renderRow(topRatedStatus, topRatedMovies, this.getTopRated)}
        <h1 className="row-heading">Originals</h1>
        {this.renderRow(originalsStatus, originalsMovies, this.getOriginals)}
        <Footer />
      </div>
    )
  }
}

export default Home
