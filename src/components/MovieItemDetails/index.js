/* eslint-disable react/no-unknown-property */
import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {format} from 'date-fns'
import Header from '../Header'
import Footer from '../Footer'
import LoaderView from '../LoaderView'
import FailureView from '../FailureView'
import './index.css'

const status = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class MovieItemDetails extends Component {
  state = {apiStatus: status.initial, movie: null}

  componentDidMount() {
    this.getMovieDetails()
  }

  componentDidUpdate(prevProps) {
    const {match} = this.props
    if (prevProps.match.params.id !== match.params.id) {
      this.getMovieDetails()
    }
  }

  getMovieDetails = async () => {
    const {match} = this.props
    const {id} = match.params
    this.setState({apiStatus: status.loading})
    window.scrollTo(0, 0)
    const jwtToken = Cookies.get('jwt_token')
    const options = {headers: {Authorization: `Bearer ${jwtToken}`}}
    const response = await fetch(
      `https://apis.ccbp.in/movies-app/movies/${id}`,
      options,
    )
    if (response.ok) {
      const data = await response.json()
      const details = data.movie_details
      const movie = {
        adult: details.adult,
        backdropPath: details.backdrop_path,
        budget: details.budget,
        genres: details.genres,
        overview: details.overview,
        releaseDate: details.release_date,
        runtime: details.runtime,
        similarMovies: details.similar_movies,
        spokenLanguages: details.spoken_languages,
        title: details.title,
        voteAverage: details.vote_average,
        voteCount: details.vote_count,
      }
      this.setState({movie, apiStatus: status.success})
    } else {
      this.setState({apiStatus: status.failure})
    }
  }

  renderMovie = () => {
    const {movie} = this.state
    const hours = Math.floor(movie.runtime / 60)
    const minutes = movie.runtime % 60
    const censor = movie.adult ? 'A' : 'U/A'
    const year = new Date(movie.releaseDate).getFullYear()
    const releaseDate = format(new Date(movie.releaseDate), 'do MMMM yyyy')

    return (
      <>
        <div
          className="details-banner"
          style={{backgroundImage: `url(${movie.backdropPath})`}}
        >
          <div className="details-banner-content">
            <h1 className="details-title">{movie.title}</h1>
            <div className="details-meta">
              <p className="meta-text">{`${hours}h ${minutes}m`}</p>
              <p className="censor">{censor}</p>
              <p className="meta-text">{year}</p>
            </div>
            <p className="details-overview">{movie.overview}</p>
            <button type="button" className="play-btn">
              Play
            </button>
          </div>
        </div>
        <div className="details-info">
          <div className="info-column">
            <h1 className="info-heading">Genres</h1>
            <ul className="info-list">
              {movie.genres.map(genre => (
                <li key={genre.id}>
                  <p className="info-item">{genre.name}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="info-column">
            <h1 className="info-heading">Audio Available</h1>
            <ul className="info-list">
              {movie.spokenLanguages.map(language => (
                <li key={language.id}>
                  <p className="info-item">{language.english_name}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="info-column">
            <h1 className="info-heading">Rating Count</h1>
            <p className="info-item">{movie.voteCount}</p>
            <h1 className="info-heading">Rating Average</h1>
            <p className="info-item">{movie.voteAverage}</p>
          </div>
          <div className="info-column">
            <h1 className="info-heading">Budget</h1>
            <p className="info-item">{movie.budget}</p>
            <h1 className="info-heading">Release Date</h1>
            <p className="info-item">{releaseDate}</p>
          </div>
        </div>
        <h1 className="more-heading">More like this</h1>
        <ul className="similar-list">
          {movie.similarMovies.map(similar => (
            <li className="similar-item" key={similar.id}>
              <Link to={`/movies/${similar.id}`}>
                <img
                  src={similar.poster_path}
                  alt={similar.title}
                  className="similar-img"
                  testid="movieItem"
                />
              </Link>
            </li>
          ))}
        </ul>
      </>
    )
  }

  renderContent = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case status.loading:
        return <LoaderView />
      case status.success:
        return this.renderMovie()
      case status.failure:
        return <FailureView onRetry={this.getMovieDetails} />
      default:
        return null
    }
  }

  render() {
    return (
      <div className="details-container">
        <Header />
        <div className="details-content">{this.renderContent()}</div>
        <Footer />
      </div>
    )
  }
}

export default MovieItemDetails
