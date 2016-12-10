import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import Volunteer from './Volunteer';
import VolunteerModal from './VolunteerModal'

//This is a child component of app.js and the parent of volunteer.js (and therefore a grandparent(?) of request.js)
class PickUpOffers extends Component {
  constructor(props) {
    super(props);
    console.log('prrrrrrrrrro', this.props)
    var socket = io();
    socket.emit('createRoom', this.props.group._id)
    socket.on('addMessage', function(mess) {
      console.log(mess)
    })
    this.state = {
      volunteers: [],
    };

    this.getOrdersForGroupId = this.getOrdersForGroupId.bind(this);
    this.getOrdersForGroupId(this.props.group._id);
  }

  // //Gets all volunteers for today, and all associated requests.
  //   //updates currentData in state, which is then passed to VolunteerRequest Container.
  getOrdersForGroupId(groupId) {
    axios.get('/api/group/'+groupId+'/volunteer')
      .then(response => {
        console.log('Getting Current Data?', response.data.data);
        this.setState({volunteers: response.data.data});
      })
      .catch(error => {
        console.log('Error while getting current data: ', error);
      })
  }

  render() {
    //Here we check if no one has volunteered yet. If so, we render a div that tells the user that no one has volunteered yet.
    //If they do volunteer, this.state.volunteer will change and the page will render immediately and will display their info.
    if (this.state.volunteers.length===0){
      return(
        <div className="col-md-6">
          <div>
            <VolunteerModal 
            user={this.props.user}
            group={this.props.group} 
            onSubmit={this.onSubmit.bind(this)} />
          </div>
          <div className='no-requests center'>No one has volunteered to grab food yet. Why don't you go first?</div>
          <div className='center'><button className='red-button new-group' onClick={this.props.selectDifferentGroup}>Select a different group</button></div>
        </div>
        )
    } else {
      //If there are already volunteers in the system for this particular group, render them.
      return (
        //VolunteerModal pops up when you click the Volunteer Services button
     <div className='request-container'>
        <div>
          <VolunteerModal
          user={this.props.user}
          group={this.props.group}
          onSubmit={this.onSubmit.bind(this)} />
        </div>
        {this.state.volunteers.map(volunteer =>
            //Render one Volunteer component for each current volunteer in a given group.
            <Volunteer
            //I put math.random because react got angry at me
            postRequest={this.props.postRequest}
            key={Math.random()}
            username={volunteer.username}
            getDataForRendering={this.getDataForRendering.bind(this)}
            //commenting out picture for now
            picture={volunteer.picture}
            //This maps out the volunteers in the this.state.volunteers array into the child component, volunteer
            volunteer={volunteer}/>
          )}
        <div className='center'><button className='red-button new-group' onClick={this.props.selectDifferentGroup}>Select a different group</button></div>
     </div>
    );
    }
  }

  //This function will set the state of app.js
  onSubmit() {
    this.getOrdersForGroupId(this.props.group._id);
  }

};

export default PickUpOffers;
