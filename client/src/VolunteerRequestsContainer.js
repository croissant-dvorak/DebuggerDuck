import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import Volunteer from './Volunteer';
import VolunteerModal from './VolunteerModal'

//This is a child component of app.js and the parent of volunteer.js (and therefore a grandparent(?) of request.js)
class VolunteerRequestContainer extends Component {
  constructor(props) {
    super(props);
    console.log("Volunteer Props: ", props)
    this.state = {
      //this info was funneled down from app.js
      username: props.username,
      picture: props.picture,
      volunteers: props.currentData,
    };

  }

  componentDidMount() { 
  } 
  
  render() {
    return ( 
     <div className='request-container'>
        <div>
          <VolunteerModal getDataForRendering={this.getDataForRendering.bind(this)} getCurrentData={this.props.getCurrentData} currentGroup={this.props.currentGroup} onSubmit={this.onSubmit.bind(this)} postVolunteer={this.props.postVolunteer} />
        </div>
        {this.state.volunteers.filter(volunteer => volunteer.group_id === this.props.getIdFromGroupName(this.props.currentGroup))
          .map(volunteer =>
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
  
   getDataForRendering(){
    return axios.get('/api/volunteer')
      .then(response => {
        console.log('This should rerender....');
        this.setState({volunteers: response.data.data});
      })
      .catch(error => {
        console.log('Error while getting current data: ', error);
      })
  }

  onLocationChange(event) {
  	this.setState({location: event.target.value});
  }

  onTimeChange(event) {
  	this.setState({time: event.target.value});
  }
  //Runs postVolunteer (inherited from App) with appropriate data, then resets state.
  onSubmit() {
    console.log("THIS IS A GOOD THING")
    //When the user clicks submit, time and location are set to '' and the info is saved into the this.state.volunteers array
    //Change this later to add database functionality
  	this.props.getCurrentData();

    //this.setState({volunteers: });
  }
  	
};

export default VolunteerRequestContainer;