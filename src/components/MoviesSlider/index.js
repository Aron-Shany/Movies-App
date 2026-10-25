/* eslint-disable react/no-unknown-property */
import Slider from 'react-slick'
import {Link} from 'react-router-dom'
import './index.css'

const settings = {
  dots: false,
  infinite: false,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    {breakpoint: 1024, settings: {slidesToShow: 3, slidesToScroll: 1}},
    {breakpoint: 768, settings: {slidesToShow: 2, slidesToScroll: 1}},
  ],
}

const MoviesSlider = props => {
  const {movies} = props
  return (
    <div className="slider-container">
      <Slider {...settings}>
        {movies.map(movie => (
          <div className="slide" key={movie.id}>
            <Link to={`/movies/${movie.id}`}>
              <img
                src={movie.poster_path}
                alt={movie.title}
                className="slide-img"
                testid="movieItem"
              />
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default MoviesSlider
