import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import Message from './message.js'

class Chat extends Component {
  constructor(props) {
    super(props);
    console.log('prrrrrrrrrro', this.props)
    var socket = io();
    socket.emit('createRoom', this.props.group._id)
    socket.on('addMessage', function(mess) {
      console.log(mess)
    })
    this.state = {
      messages: []
    };

    this.getChatForGroupId = this.getChatForGroupId.bind(this);
    // this.getChatForGroupId(this.props.group._id);
  }

  getChatForGroupId(groupId) {
    axios.get('/api/group/'+groupId+'/chat')
      .then(response => {
        console.log('Getting Current Data?', response.data.data);
        this.setState({volunteers: response.data.data});
      })
      .catch(error => {
        console.log('Error while getting current data: ', error);
      })
  }


  submitMessage() {
    console.log('PROPS:', this.props)

    axios.post('/group/' + this.props.group._id + '/message',
      {data: {
        userId: this.props.user._id,
        messageText: $('.chatInput input').val()
      }})
      .then(response => {
        console.log('Message posted!', response);
        this.render();
      })
      .catch(error => {
        console.log('Error while posting message: ', error);
      });

    //     axios.post('/api/volunteer', {data:{
    //     username: this.props.user.username,
    //     location: location,
    //     time:  time,
    //     picture: this.props.user.picture,
    //     groupId: this.props.group._id,
    //     requests: [],
    //   }
    // })
    // .then(response => {
    //   console.log('Volunteer posted! ',response);
    //   // this.getCurrentData();
    //   this.render();
    // })
    // .catch(error => {
    //   console.log('Error while posting Volunteer: ',error);
    // });
  }

  render() {
    return (
    <div className="col-md-6 chatBox">
      <div className="messagesBox">
        {
        this.state.messages.map( (message) => <Message messageText={message.text} userName={message.user} /> )
        }
    </div>
      <form className="chatInput">
        <input type="text" />
        <button onClick={this.submitMessage} >send a chat!</button>
      </form>
    </div>
    )
  }

};

export default Chat;
