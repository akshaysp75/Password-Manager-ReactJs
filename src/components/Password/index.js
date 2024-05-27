import {Component} from 'react'
import './index.css'
import {v4 as uniqueId} from 'uuid'
import PasswordItems from '../PasswordItems'

class Password extends Component {
  state = {
    website: '',
    username: '',
    password: '',
    initialList: [],
    checkbox: false,
    searchInput: '',
  }

  onDeletePassword = id => {
    const {initialList} = this.state
    const deletedPasswords = initialList.filter(
      eachPassword => id !== eachPassword.id,
    )
    this.setState({initialList: deletedPasswords})
  }

  onSubmitForm = event => {
    event.preventDefault()

    const {website, username, password} = this.state

    const newPasswordsList = {
      website,
      username,
      password,
      id: uniqueId(),
    }
    this.setState(prevState => ({
      initialList: [...prevState.initialList, newPasswordsList],
      website: '',
      username: '',
      password: '',
    }))
  }

  onCheckboxTrue = () => {
    this.setState(prevState => {
      const {checkbox} = prevState
      return {checkbox: !checkbox}
    })
  }

  onEnterWeb = event => {
    this.setState({website: event.target.value})
  }

  onEnterUserName = event => {
    this.setState({username: event.target.value})
  }

  onEnterPassword = event => {
    this.setState({password: event.target.value})
  }

  onSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  renderEmptyView = () => (
    <div className="empty-password-view">
      <img
        className="password-empty-view-image"
        src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png "
        alt="no passwords"
      />
      <p className="passwords-count">No Passwords</p>
    </div>
  )

  render() {
    const {
      initialList,
      website,
      username,
      password,
      checkbox,
      searchInput,
    } = this.state

    const searchItems = initialList.filter(eachItem =>
      eachItem.website.toLowerCase().includes(searchInput.toLowerCase()),
    )

    const ShowEmptyView = initialList.length === 0 || searchItems.length === 0

    return (
      <div className="app-container">
        <img
          className="app-logo-image"
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
        />
        <div className="password-card-container">
          <div className="password-container">
            <div className="password-input-container">
              <h1 className="heading">Add New Password</h1>
              <form className="password-form" onSubmit={this.onSubmitForm}>
                <div className="form-group">
                  <div className="input-container">
                    <img
                      className="input-logo"
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                      alt="website"
                    />
                    <input
                      className="form-input"
                      type="text"
                      placeholder="Enter Website"
                      required
                      value={website}
                      onChange={this.onEnterWeb}
                    />
                  </div>
                  <div className="input-container">
                    <img
                      className="input-logo"
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                      alt="username"
                    />
                    <input
                      className="form-input"
                      type="text"
                      placeholder="Enter Username"
                      required
                      value={username}
                      onChange={this.onEnterUserName}
                    />
                  </div>
                  <div className="input-container">
                    <img
                      className="input-logo"
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                      alt="password"
                    />
                    <input
                      className="form-input"
                      type="password"
                      placeholder="Enter Password"
                      required
                      value={password}
                      onChange={this.onEnterPassword}
                    />
                  </div>
                </div>
                <div className="text-right">
                  <button className="submit-button" type="submit">
                    Add
                  </button>
                </div>
              </form>
            </div>

            <img
              className="password-manager-image"
              src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
              alt="password manager"
            />
          </div>
        </div>

        <div className="password-card-container">
          <div className="password-items-container">
            <div className="header-container">
              <h5 className="heading">Your Passwords</h5>
              <p className="passwords-count">{initialList.length}</p>
              <img
                className="search-icon"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png "
                alt="search"
              />
              <input
                type="search"
                className="search-input"
                placeholder="Search"
                onChange={this.onSearchInput}
              />
            </div>
            <hr className="line" />
            <div className="checkbox-container">
              <input
                type="checkbox"
                id="checkbox"
                onChange={this.onCheckboxTrue}
              />
              <label className="label-text" htmlFor="checkbox">
                Show passwords
              </label>
            </div>

            {ShowEmptyView ? (
              this.renderEmptyView()
            ) : (
              <ul className="list-container">
                {searchItems.map(eachItem => (
                  <PasswordItems
                    passwordDetails={eachItem}
                    key={eachItem.id}
                    checkboxStatus={checkbox}
                    onDeletePassword={this.onDeletePassword}
                  />
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default Password
