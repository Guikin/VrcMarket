import { render } from '@testing-library/react';
import React, { Component } from 'react'
import { Link } from 'react-router-dom';




export default class Navbar extends Component{

  handleLogout = () => {
    localStorage.removeItem('token')
    this.props.setUserInState(null)
  }

  loguser = () =>{
    console.log(this.props.user.name)
  }

  

  render(){
  return (
    <div className='navbar'>
        <nav className="navbar navbar-expand-lg bg-dark navbar-dark fixed-top w-100 m-auto px-5" style={{boxshadow:0+0+3 +"em" + "black"}}>
            <a className="navbar-brand" href="/">
                <img src="https://cdn.discordapp.com/attachments/963368879927730188/971311104871530527/vrctitle.png" alt="Bootstrap" style={{width:150 +"px",height:50+"px"}} className="d-inline-block align-top"/>
                {/* <!-- <span class="hidden">Bootstrap</span> --> */}
              </a>
            <button 
            	className="navbar-toggler" 
            	type="button" 
            	data-bs-toggle="collapse" 
            	data-bs-target="#toggleMobileMenu" 
            	aria-controls="toggleMobileMenu" 
            	aria-expanded="false" 
            	aria-label="Toggle navigation"
            >
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="toggleMobileMenu">
                
                <ul className="navbar-nav ms-auto text-center">
                  
                  <li className="nav-item">
                  {this.props.user ? (<Link to="/userProfile2" className='nav-link' onClick={this.loguser}>{this.props.user.name}</Link>):(
                    <p></p>
                  )}
                  </li>
                  <li className="nav-item">
                        <Link className="nav-link" to ='/uploadForm'>uploadform</Link>
                        </li>

                      <li className="nav-item">
                        <Link className="nav-link" to ='/userProfile2'>Actual profile</Link>
                        </li>
                    <li className="nav-item">
                        <Link className="nav-link" to ='/'>Home</Link>
                        </li>

                    <li className="nav-item">
                        <Link className="nav-link" to ='/search'>search</Link>
                        </li>

                        {this.props.user ? ( <li className="nav-item">
                        <button className="btn btn-dark nav-link" onClick={this.handleLogout}>Logout</button>
                        </li>) : ( <li className="nav-item">
                        <Link className="nav-link" to ='/login'>login</Link>
                        </li>
                        )}
                </ul>
            </div>
        </nav>
    </div>
  )
}
}