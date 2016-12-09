import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class Chat extends Component {
  constructor(props) {
    super(props);
    axios.get('/api/group/' + this.props.groupId + '/volunteer').then(response => {
      console.log('Axios Response data for Chat component:', response.data);
      this.setState({messages: response.data});
    }).catch(error => {
      console.log('Error in Chat component axios call:', error);
    })
    console.log('prrrrrrrrrro', this.props)
    var socket = io();
    socket.emit('createRoom', this.props.group._id)
    socket.on('addMessage', function(mess) {
      console.log(mess)
    })
    this.state = {
      messages: []
    };
  }


  submitChat() {
    $('.chat')
  }

  render() {
    return (
    <div class="chat">
      <div class="messages">
        {
        this.state.messages.map( (message) => <Message messageText={message.text} userName={message.user} /> )
      }
    </div>
      <form class="chatInput" method="post" action={"/api/group" + this.props.group._id + '/message'}>
        <input type="text"></input>
        <input onClick={submitChat}><a href="">SUBMIT MESSAGE</a></input>
      </form>
    </div>
    )
  }

};

export default Chat;
