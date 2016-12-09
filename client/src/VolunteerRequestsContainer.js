import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import PickUpOffers from './PickUpOffers.jsx'
import Chat from './Chat.js'

//This is a child component of app.js and the parent of volunteer.js (and therefore a grandparent(?) of request.js)
class VolunteerRequestContainer extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="row">
        <Chat group={this.props.group} className="col-md-6"/>
        <PickUpOffers group={this.props.group} className="col-md-6"/>
      </div>
    )
  }
};

export default VolunteerRequestContainer;
