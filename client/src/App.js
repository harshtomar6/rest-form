import React, { Component } from 'react';
import './App.css';
import Form from './Components/form';
import PostSignup from './Components/post-signup';
import BuddyList from './Components/BuddyList';
let config = require('./config');
let request = require('request');

class App extends Component {

  constructor(){
    super()
    this.state = {
      data: '',
      signedUp: false,
      buddyList: false
    }
  }

  handleSignUp(data){
    this.setState({
      data: data
    }, () => {
      this.setState({
        signedUp: true
      })
    })
  }

  handleBuddyList(data){
    console.log(data);
    this.setState({
      buddyList: true,
      signedUp: false
    })
  }

  render() {
    if(this.state.signedUp){
      return (
        <div className="d">
          <PostSignup data={this.state.data} buddyList={this.handleBuddyList.bind(this)}/>
        </div>
      );
    }
    if(this.state.buddyList){
      return(
        <div className="d">
          <BuddyList />
        </div>
      );
    }
    else
    return (
      <div className="d">
        <Form handleSignUp={this.handleSignUp.bind(this)}/>
      </div>
    );
  }
}

export default App;
