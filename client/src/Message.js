//This component is the child component of volunteerRequestContainer.js and the parent of request.js
import React, {Component} from 'react';
import ReactDOM from 'react-dom';


const Message = (props) => (
  <div className='volunteer-div'>
    {this.props.userName + ': ' + this.props.messageText}
  </div> )

export default Message;
