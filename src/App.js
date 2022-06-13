
import './App.css';
import Homepage from './components/api/Homepage/Homepage';
import Navbar from './components/api/Navbar/Navbar';
import SearchAsset from './components/api/SearchAsset/SearchAsset';
import AuthPage from './pages/AuthPage/AuthPage.jsx'

import { Component } from 'react';
import { Route, Routes } from 'react-router-dom';




export default class App extends Component {

  state={
    user:null,
  }

  setUserInState = (incomingUserData) => {
    this.setState({ user: incomingUserData})
  }

  // when the page refreshes, check localStorage for the user jwt token
  componentDidMount() {
    let token = localStorage.getItem('token')
    if (token) {
      // YOU DO: check expiry!
      let userDoc = JSON.parse(atob(token.split('.')[1])).user // decode jwt token
      this.setState({user: userDoc})      
    }
  }



  render() {
    return (
    <div className="App">
      <Navbar setUserInState={this.setUserInState}/>

      <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path="/search" element ={<SearchAsset/>}/>
        <Route path="/login" element ={<AuthPage setUserInState={this.setUserInState}/>}/>
      </Routes>

      
      
      </div>
    )
  }
}


