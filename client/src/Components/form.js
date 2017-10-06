import React from 'react';
import './form.css';
let config = require('./../config');
const request = require('request');

class Form extends React.Component{

  constructor(){
    super()

    this.state = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        birthday: '',
        err: null
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e){
    switch(e.target.name){
      case 'firstName':
        this.setState({
            firstName: e.target.value
        })
        break;
      case 'lastName':
        this.setState({
            lastName: e.target.value
        })
        break;
      case 'email':
        this.setState({
            email: e.target.value
        })
        break;
      case 'password':
        this.setState({
            password: e.target.value
        })
        break;
      case 'confirmPassword':
        this.setState({
            confirmPassword: e.target.value
        })
        break;
      case 'birthday':
        this.setState({
            birthday: e.target.value
        })
    }
  }

  handleSubmit(e){
    e.preventDefault()
    var firstName = this.state.firstName;
    var lastName = this.state.lastName;
    var email = this.state.email;
    var password = this.state.password;
    var confirmPassword = this.state.confirmPassword;
    var birthday = this.state.birthday;
    var date = new Date(birthday);
    var currentDate = new Date();

    var data = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      birthday: birthday
    }

    var age = currentDate.getFullYear() - date.getFullYear();

    if(password !== confirmPassword){
      this.setState({
        "err": "Passwords do not match"
      })
    }
    else if(age < 18 || age > 150){
      this.setState({
        "err": "Age must be atleast 18 years"
      })
    }
    else{
      request.post({
        url: config.SERVER_URI+'/signup',
        json: {"firstName": firstName, "lastName": lastName, "email": email, "password": password, "birthday": birthday}
      }, (err, res, body) => {
        if(!err && res.statusCode === 200){
          this.setState({
            "err": body
          },() => {
            this.props.handleSignUp(data);
          })
        }
      })
    }
  }

  handleClear(){
    this.setState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        birthday: '',
        err: null
    })
  }

  render(){
    if(this.state.err){
      return(
      <div className="form-wraper">
        <h2>Sign Up</h2>
        <h4>{this.state.err}</h4>
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="firstName" placeholder="First Name" maxLength="50" required
            value={this.state.firstName} onChange={this.handleChange}/>
          <input type="text" name="lastName" placeholder="Last Name" maxLength="50" required
            value={this.state.lastName} onChange={this.handleChange}/>
          <input type="email" name="email" placeholder="E-mail" required
            value={this.state.email} onChange={this.handleChange}/>
          <input type="password" name="password" placeholder="Password" required
            value={this.state.password} onChange={this.handleChange}/>
          <input type="password" name="confirmPassword" placeholder="Confirm Password" required
            value={this.state.confirmPassword} onChange={this.handleChange}/>
          <input type="date" name="birthday" placeholder="Birthday" required 
            value={this.state.birthday} onChange={this.handleChange}/>
          <input type="submit" value="Sign Up" />
          <input type="button" value="Clear All" onClick={this.handleClear.bind(this)}/>
        </form>
      </div>
      );
    }
    return(
      <div className="form-wraper">
        <h2>Sign Up</h2>
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="firstName" placeholder="First Name" maxLength="50" required
            value={this.state.firstName} onChange={this.handleChange}/>
          <input type="text" name="lastName" placeholder="Last Name" maxLength="50" required
            value={this.state.lastName} onChange={this.handleChange}/>
          <input type="email" name="email" placeholder="E-mail" required
            value={this.state.email} onChange={this.handleChange}/>
          <input type="password" name="password" placeholder="Password" required
            value={this.state.password} onChange={this.handleChange}/>
          <input type="password" name="confirmPassword" placeholder="Confirm Password" required
            value={this.state.confirmPassword} onChange={this.handleChange}/>
          <input type="date" name="birthday" placeholder="Birthday" required 
            value={this.state.birthday} onChange={this.handleChange}/>
          <input type="submit" value="Sign Up" />
          <input type="button" value="Clear All" onClick={this.handleClear.bind(this)}/>
        </form>
      </div>
    );
  }

}

export default Form;