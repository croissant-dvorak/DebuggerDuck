import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

//This is a child component of app.js and the parent of volunteer.js (and therefore a grandparent(?) of request.js)
class VolunteerRequestContainer extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
      Here be Chat
      </div>
    )
  }

};

export default VolunteerRequestContainer;
