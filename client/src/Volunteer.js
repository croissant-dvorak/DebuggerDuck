//This component is the child component of volunteerRequestContainer.js and the parent of request.js
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import Request from './Request.js';
import RequestModal from './RequestModal.js';
import BackButton from './BackButton.js';

class Volunteer extends Component {
  constructor(props) {
    var socket = io;
    // io.createRoom('2233')
    super(props);
    console.log('PROP', this.props.pickup)
    this.state = {
      //This info has been funneled down from volunteerRequestContainer, which was funneled down from app.js
      //we set text as '' because nothing has been entered yet.
      text:'',
      //requests is an array of stuff obtained from the database.
      //It can be added to by the user by typing into the inputs and submitting.
      requests:this.props.pickup.requests,
      count:0
    };

    this.postRequest = this.postRequest.bind(this);
  }
  onTextChange(event) {
    //every time the user types a new letter, the state is changed to the current input
    this.setState({text: event.target.value});
  }
  //Run postRequest to send request data to the server.
  //update text state to reset box.
  //run getDataforRendering to update App (somewhat ugly, last-minute hack).
  //update existing requests with new data from props.
  onSubmit(text){
    //console.log('Text?', text, "volunteer id", this.props.volunteer._id);
    this.postRequest(this.props.pickup._id, text);
    this.setState({text:''});
    // this.setState({requests:this.props.volunteer.requests})
  }

  postRequest(volunteerId, text) {
    console.log('volunteer id', volunteerId, 'text', text)
    axios.post('/api/request', {data:{
      volunteerId: volunteerId,
      user_id: this.props.user._id,
      picture: this.props.user.picture,
      userName: this.props.user.userName,
      text: text,
      }
    })
      .then(response => {
        console.log('Request submitted: ', response.data);
        this.setState({requests: response.data.requests});
      })
      .catch(error => {
        console.log('Error while submitting food request:', error);
      })
  }

  postText(text) {
    var nums = this.props.pickup.requests.map
    axios.post('/api/group' + this.props.group._id + '/text', {data:{
      nums: volunteerId,
      message: this.props.user._id,
      }
    })
      .then(response => {
        console.log('Request submitted: ', response.data);
        this.setState({requests: response.data.requests});
      })
      .catch(error => {
        console.log('Error while submitting food request:', error);
      })
  }


  render() {
  	return (
      <div>
      <BackButton viewOrders={this.props.viewOrders}/>
        <div className='volunteer-div'>
          <img className='small-profile-pic' src={this.props.pickup.picture}/>
          {this.props.pickup.orderer_userName} is going to {this.props.pickup.location} at {this.props.pickup.time}.

        {this.state.requests.map(request =>
          //this goes through the array of requests and maps them using the child component, Request.js
          <Request
          //I threw math.random as the key because react kept getting angry at me for making duplicate keys??
            key= {Math.random()}
            request={request}/>
          )}
           <RequestModal onSubmit={this.onSubmit.bind(this)}/>
        </div>
        </div>
  );
 }

};

export default Volunteer;
