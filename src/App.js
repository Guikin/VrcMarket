
import './App.css';
import Homepage from './components/api/Homepage/Homepage';
import Navbar from './components/api/Navbar/Navbar';
import SearchAsset from './components/api/SearchAsset/SearchAsset';
import AuthPage from './pages/AuthPage/AuthPage.jsx'
import Uploadfoto from './components/api/Uploadfoto/Uploadfoto';
import UploadAsset from './components/api/UploadAsset/UploadAsset';
import UploadForm from './components/api/UploadForm/UploadForm';
import UserProfile from './components/api/UserProfile/UserProfile';
import EditAsset from './components/api/EditAsset/EditAsset';
import UserProfile2 from './components/api/UserProfile2/UserProfile2';
import DisplayAsset from './components/api/DisplayAsset/DisplayAsset';

import { Component } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';




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
      // YOU DO: check expiry! sure 
      let userDoc = JSON.parse(atob(token.split('.')[1])).user // decode jwt token
      this.setState({user: userDoc})      
    }
  }



  render() {
    return (
    <div className="App">
      <Navbar setUserInState={this.setUserInState} user={this.state.user}/>

      <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path="/photo" element={<Uploadfoto user={this.state.user}/>}/>
        <Route path="/upload" element={<UploadAsset/>}/>
        <Route path="/search" element ={<SearchAsset/>}/>
        <Route path="/edit" element ={<EditAsset/>}/>
        <Route path="/display" element ={<DisplayAsset/>}/>

        <Route path ="/uploadForm" element={<UploadForm user={this.state.user}/>}/> 
        <Route path="userProfile" element={<UserProfile user={this.state.user}/>}/>
        <Route path="userProfile2" element={<UserProfile2 user={this.state.user}/>}/>
        {this.state.user ? (
        <Route path="/login" element={<Navigate to="/" replace />}/>
        ) : (<Route path="/login" element ={<AuthPage setUserInState={this.setUserInState}/>}/>)}
        
      </Routes>
      </div>
    )
  }
}


