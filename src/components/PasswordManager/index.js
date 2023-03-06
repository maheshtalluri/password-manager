import {Component} from 'react'

import {v4} from 'uuid'

import './index.css'

const colorList = ['yellow', 'green', 'orange', 'brown', 'blue']

class PasswordManager extends Component {
  state = {
    passwordsList: [],
    website: '',
    username: '',
    password: '',
    isPassword: false,
    search: '',
  }

  websiteInput = event => {
    this.setState({website: event.target.value})
  }

  userInput = event => {
    this.setState({username: event.target.value})
  }

  passwordInput = event => {
    this.setState({password: event.target.value})
  }

  searchList = event => {
    this.setState({search: event.target.value})
  }

  showPassword = event => {
    if (event.target.checked) {
      this.setState({isPassword: true})
    } else {
      this.setState({isPassword: false})
    }
  }

  addPassword = event => {
    event.preventDefault()

    const {website, username, password} = this.state

    const initial = username.slice(0, 1)

    const addClass = colorList[Math.floor(Math.random() * 5)]

    const newPassword = {
      id: v4(),
      addClass,
      initial,
      website,
      username,
      password,
    }

    this.setState(prevState => ({
      passwordsList: [...prevState.passwordsList, newPassword],
      website: '',
      username: '',
      password: '',
    }))
  }

  onDeleteBtn = id => {
    const {passwordsList} = this.state
    const result = passwordsList.filter(prevState => prevState.id !== id)

    this.setState({passwordsList: result})
  }

  render() {
    const {passwordsList, isPassword, search} = this.state
    const filteredList = passwordsList.filter(prevState =>
      prevState.username.includes(search),
    )
    return (
      <div className="bg-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png "
          alt="app logo"
          className="app-logo-size"
        />
        <div className="add-password-container">
          <form className="input-container" onSubmit={this.addPassword}>
            <h1 className="new-password">Add New Password</h1>
            <div className="input-website-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                alt="website"
                className="website-logo"
              />
              <hr className="vertical-line" />
              <input
                type="text"
                className="website-input"
                placeholder="Enter Website"
                onChange={this.websiteInput}
              />
            </div>
            <div className="input-website-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png "
                alt="username"
                className="website-logo"
              />
              <hr className="vertical-line" />
              <input
                type="text"
                className="website-input"
                placeholder="Enter Username"
                onChange={this.userInput}
              />
            </div>
            <div className="input-website-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                alt="password"
                className="website-logo"
              />
              <hr className="vertical-line" />
              <input
                type="password"
                className="website-input"
                placeholder="Enter Password"
                onChange={this.passwordInput}
              />
            </div>
            <button type="submit" className="button">
              Add
            </button>
          </form>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            alt="password manager"
            className="password-manager"
          />
        </div>
        <div className="view-password-container">
          <div className="password-count">
            <div className="password-count-1">
              <h1 className="your-password">Your Passwords </h1>
              <p className="span-element">{passwordsList.length}</p>
            </div>
            <div className="search-input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
                className="search-icon"
              />
              <hr className="search-vertical-line" />
              <input
                type="search"
                className="search-input"
                placeholder="Search"
                onChange={this.searchList}
              />
            </div>
          </div>
          <hr className="search-horizontal-line" />
          <div className="show-password-container">
            <div className="show-password">
              <input type="checkbox" id="check" onChange={this.showPassword} />
              <label htmlFor="check" className="show-password-para">
                Show Passwords
              </label>
            </div>
          </div>
          {passwordsList.length > 0 ? (
            <ul className="list-container">
              {filteredList.map(eachPassword => (
                <li className="list-item" key={eachPassword.id}>
                  <div className="user-details">
                    <div>
                      <p className={`initial ${eachPassword.addClass}`}>
                        {eachPassword.initial}
                      </p>
                    </div>
                    <div>
                      <p className="website-item">{eachPassword.website}</p>
                      <p className="website-item">{eachPassword.username}</p>
                      {isPassword ? (
                        <p className="website-item">{eachPassword.password}</p>
                      ) : (
                        <img
                          src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                          alt="stars"
                          className="stars-icon"
                        />
                      )}
                    </div>
                  </div>
                  <div>
                    <button
                      type="button"
                      className="delete-btn"
                      onClick={this.onDeleteBtn}
                    >
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
                        alt="delete"
                        className="delete-img"
                      />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="no-password-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                alt="no passwords"
                className="no-password"
              />
              <p className="no-password-para">No Passwords</p>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default PasswordManager
