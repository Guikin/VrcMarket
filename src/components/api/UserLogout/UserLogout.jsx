import React from 'react';
import './UserLogOut.css'

class UserLogOut extends React.Component {
  handleLogout = () => {
    localStorage.removeItem('token')
    this.props.setUserInState(null)
  }

  render() {
    return (
        <div className='UserLogOut'>
          <div>Name: {this.props.name}</div>
          <div>Email: {this.props.email}</div>
          <button className="btn-sm" onClick={this.handleLogout}>Logout</button>
        </div>
    );
  }
}

export default UserLogOut;