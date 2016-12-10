import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import Message from './message.js'

class Chat extends Component {
  constructor(props) {
    super(props);
    console.log('prrrrrrrrrro', this.props)
    socket.emit('createRoom', this.props.group._id)
    socket.on('addMessage', function(mess) {
      console.log('GOT ONE', mess)
      this.addMessageFn(mess)
    })
    this.state = {
      messages: []
    };

    this.getChatForGroupId(this.props.group._id);
    // this.getChatForGroupId(this.props.group._id);
  }


  addMessageFn(mess) {
    this.setState('messages', this.state.messages.concat(mess))
  }


  getChatForGroupId(groupId) {
    axios.get('/api/group/' + groupId)
      .then(response => {
        console.log('MESSAGES FROM CHAT.JS', response.data.data[0].messages);
        this.setState({messages: response.data.data[0].messages});
      })
      .catch(error => {
        console.log('ERROR MESSAGES GET FROM CHAT.JS', error);
      })
  }


  submitMessage(event) {
    socket.emit('addMessage', {
      user_id: this.props.user._id,
      userName: this.props.user.userName,
      picture: this.props.user.picture,
      text: $('.chatInput input').val()
    })
    console.log('PROPS:', this.props)
    event.preventDefault();

    axios.post('api/group/' + this.props.group._id + '/message',
      {data: {
        user_id: this.props.user._id,
        userName: this.props.user.userName,
        picture: this.props.user.picture,
        text: $('.chatInput input').val()
      }})
      .then(response => {
        console.log('Message posted!', response);
        //this.render();
      })
      .catch(error => {
        console.log('Error while posting message: ', error);
      });

    //     axios.post('/api/volunteer', {data:{
    //     userName: this.props.user.userName,
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
    <div className="chatBox">
      <div className="messagesBox">
        {
        this.state.messages.map( (message) => <Message text={message.text} userName={message.userName} /> )
        }
    </div>
      <form className="chatInput">
        <input type="text" />
        <input type="button" value="send" onClick={function(){ return this.submitMessage(event) }.bind(this)} />
      </form>
    </div>
    )
  }

};

export default Chat;
