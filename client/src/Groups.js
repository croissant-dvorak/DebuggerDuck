import React, {Component} from 'react';

class Groups extends Component {
   constructor(props) {
    super(props);
    console.log('group:', this.props.group)
  }
  sendGroupNameToApp() {
    this.props.selectGroup(this.props.group.name);
  }
   render(){
      // There's not much to this component. Technically, we could probably throw it in the app.js if we wanted to.
      return (
         <div className='group'><button key={Math.random()} onClick={this.sendGroupNameToApp.bind(this)} className='group-button'>{this.props.group.name}</button></div>
      )
   }
   
};

export default Groups;