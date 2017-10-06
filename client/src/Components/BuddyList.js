import React from 'react';
import './BuddyList.css';
const request = require('request');
const config = require('./../config');

class BuddyList extends React.Component{

  constructor(){
    super();

    this.state = {
      firstName: '',
      lastName: '',
      data: '',
      done: false,
      show: false
    }

    this.getBuddies = this.getBuddies.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getBuddyList = this.getBuddyList.bind(this);
  }

  componentWillMount(){
    this.getBuddyList()
  }

  getBuddyList(){
    request(config.SERVER_URI+'/buddy-list', (err, res, body) => {
      if(!err && res.statusCode === 200){
        this.setState({
          data: JSON.parse(body)
        }, () => {
          this.setState({
            done: true
          })
        })
      }
    })
  }

  handleDelete(e){
    var id = e.target.id
    console.log(id)
    var dataArr = this.state.data
    dataArr = dataArr.filter(item => {
      return item._id !== id;  
    })

    this.setState({
      data: dataArr
    })

    request.post({
      url: config.SERVER_URI+'/delete-buddy',
      json: {id: id}
    }, (err, res, body) => {
      if(!err && res.statusCode === 200){
        
      }
    })
  }

  getBuddies(){

      var buddies = this.state.data.map(buddy => 
        <div className="buddy-row" key={buddy._id}>
          <div className="avatar">
            <p onClick={this.handleDelete.bind(this)} id={buddy._id}>&times;</p>
            <img src={require("../defaultProfile.png")} />
          </div>
          <div className="firstName">
            <h5>{buddy.firstName}</h5>
          </div>
          <div className="lastName">
            <h5>{buddy.lastName}</h5>
          </div>
        </div>
      )

    return <div>{buddies}</div>

  }

  handleClick(){
    this.setState({
      show: true,
      done: false
    })
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
    }
  }

  handleSubmit(e){
    e.preventDefault();

    var firstName = this.state.firstName;
    var lastName = this.state.lastName;

    this.setState({
      firstName: '',
      lastName: ''
    })

    request.post({
      url: config.SERVER_URI+'/buddy-list',
      json: {firstName: firstName, lastName: lastName}
    }, (err, res, body) => {
      if(!err && res.statusCode === 200){
        var datavar = this.state.data.slice()
        console.log(body)
        datavar.push(body)
        this.setState({
          data: datavar
        }, () => {
          this.setState({
            show: false,
            done: true
          })
        })
      }
    })
  }

  render(){

    if(this.state.done)
    return(
      <div id="buddyList">
        <h2>Buddy List</h2>
        <this.getBuddies />
        <button className="btn" onClick={this.handleClick.bind(this)}>Add Buddy</button>
      </div>
    )

    if(this.state.show)
    return(
      <div id="buddyList">
        <h2>Buddy List</h2>
        <this.getBuddies />
        <form onSubmit={this.handleSubmit.bind(this)} className="form-wraper">
          <input type="text" name="firstName" placeholder="First Name" required
            value={this.state.firstName} onChange={this.handleChange}/>
          <input type="text" name="lastName" placeholder="Last Name" required
            value={this.state.lastName} onChange={this.handleChange}/>
          <input type="submit"className="btn" value="Add Buddy" />
        </form>
      </div>
    );

    else
    return(
      <div id="buddyList">
        <h2>Buddy List</h2>
      </div>
    );
  }

}

export default BuddyList;