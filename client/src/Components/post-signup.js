import React from 'react';
import './post-signup.css';
import './form.css';
let config = require('./../config');
const request = require('request');

class PostSignup extends React.Component{

  constructor(){
    super()
  
  }

  handleClick(){
    this.props.buddyList(true);
  }

  render(){
    return(
      <div className="form-wraper">
        <h2>Account Created Successfully !</h2>
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="firstName" placeholder="First Name" maxLength="50"
            value={this.props.data.firstName} onChange={this.handleChange} readOnly="true" />
          <input type="text" name="lastName" placeholder="Last Name" maxLength="50"
            value={this.props.data.lastName} onChange={this.handleChange} readOnly="true"/>
          <input type="email" name="email" placeholder="E-mail" readOnly="true"
            value={this.props.data.email} onChange={this.handleChange}/>
          <input type="password" name="password" placeholder="Password" readOnly="true"
            value={this.props.data.password} onChange={this.handleChange}/>
          <input type="date" name="birthday" placeholder="Birthday" readOnly="true" 
            value={this.props.data.birthday} onChange={this.handleChange}/>
          <input type="button" value="See Buddy List" onClick={this.handleClick.bind(this)} id="buddy"/>
        </form>
      </div>
    );
  }

}

export default PostSignup;