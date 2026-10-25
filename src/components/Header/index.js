/* eslint-disable react/no-unknown-property */
import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {HiOutlineSearch} from 'react-icons/hi'
import {LOGO_URL, PROFILE_URL} from '../../constants'
import './index.css'

class Header extends Component {
  state = {searchInput: ''}

  onChangeSearch = event => this.setState({searchInput: event.target.value})

  onClickSearch = () => {
    const {history, location, onSearch} = this.props
    const {searchInput} = this.state
    if (location.pathname === '/search') {
      onSearch(searchInput)
    } else {
      history.push('/search')
    }
  }

  onKeyDownSearch = event => {
    if (event.key === 'Enter') {
      this.onClickSearch()
    }
  }

  render() {
    const {location} = this.props
    const {searchInput} = this.state
    const {pathname} = location
    const isSearchRoute = pathname === '/search'

    return (
      <nav className="header">
        <div className="header-left">
          <Link to="/">
            <img src={LOGO_URL} alt="website logo" className="header-logo" />
          </Link>
          <ul className="nav-links">
            <li>
              <Link
                to="/"
                className={pathname === '/' ? 'nav-link active' : 'nav-link'}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/popular"
                className={
                  pathname === '/popular' ? 'nav-link active' : 'nav-link'
                }
              >
                Popular
              </Link>
            </li>
          </ul>
        </div>
        <div className="header-right">
          {isSearchRoute && (
            <input
              type="search"
              className="search-input"
              placeholder="Search"
              value={searchInput}
              onChange={this.onChangeSearch}
              onKeyDown={this.onKeyDownSearch}
            />
          )}
          <button
            type="button"
            className="search-button"
            testid="searchButton"
            onClick={this.onClickSearch}
          >
            <HiOutlineSearch className="search-icon" />
          </button>
          <Link to="/account">
            <img src={PROFILE_URL} alt="profile" className="profile-img" />
          </Link>
        </div>
      </nav>
    )
  }
}

Header.defaultProps = {
  onSearch: () => {},
}

export default withRouter(Header)
