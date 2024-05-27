import './index.css'

const PasswordItems = props => {
  const {passwordDetails, checkboxStatus, onDeletePassword} = props
  const {website, username, password, id} = passwordDetails

  const inputType = checkboxStatus ? (
    <input type="text" className="input-text" value={password} />
  ) : (
    <img
      className="star-images"
      src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
      alt="stars"
    />
  )

  const onRemovePassword = () => {
    onDeletePassword(id)
  }

  return (
    <li className="list-items">
      <p className="website-text">{website}</p>
      <p className="text">{username}</p>
      <span>{inputType}</span>
      <button
        className="button"
        type="button"
        data-testid="delete"
        onClick={onRemovePassword}
      >
        <img
          className="button-icon"
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
        />
      </button>
    </li>
  )
}

export default PasswordItems
