import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import FacebookButton from './FacebookButton.js'

import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalClose,
  ModalBody,
  ModalFooter
} from 'react-modal-bootstrap';

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false,
      displayPhoneNumberModal: false,
    };
  }

  //Note: Navbar does not rerender when the app renders. How can we change this??
  
  //Note: All this does is toggle loggedIn back and forth so I don't have to manually change App.js's state. 
  //Once we get OAUTH up, this button functionality will need to change.
  
  //login and logOut invoke the functions passed from App.
  login() {
  	this.setState({loggedIn: true});
    console.log('Logout triggered from Navbar');
    this.props.postLogin();
	 }
  //logout updates local state and runs postLogout, inherited from App. 
  logOut() {
    this.setState({loggedIn: false})
    this.props.postLogout();
  }

  openModal (){
    this.setState({
      isOpen: true
    });
  };

  hideModal(){
    this.setState({
      isOpen: false
    });
  };

  onClick() {
    console.log('clicked')
  }
  render() {
    var phoneRender;
    if (this.props.user.phoneNumber) {
      phoneRender = 'Text Number:' + this.props.user.phoneNumber
    } else {
      phoneRender = <small onClick={this.openModal}>Enter you phone number for text updates</small>
    }

    let subModalDialogStyles = {
      base: {
        bottom: -600,
        transition: 'bottom 0.4s'
      },
      open: {
        bottom: 0
      }
    };
    let {isOpen, isSubOpen} = this.state;

		return ( 
  	<div className='nav-bar'>
      <a href="/"><img src="/logo.png" height="60" width="333" className="logo" /></a>
  		<FacebookButton 
        logOut={this.logOut.bind(this)} 
        loggedIn={this.state.loggedIn}/>
  		{/**<div className='karma'>Karma: {this.state.karma}</div>*/}
      <img className='nav-pic' src={this.props.user.picture}/>
      <div className='userName'>
        <div>{this.props.user.userName}</div>
        <div>{phoneRender}</div>
      </div>

      <Modal isOpen={isOpen} onRequestHide={this.hideModal.bind(this)}>
            <ModalHeader >
              <ModalClose onClick={this.hideModal.bind(this)}/>

            </ModalHeader>
            <div className='modal-inside'>
              <div>
                &nbsp; Where are you going? &nbsp;
                <input
                onChange={}
                className='modal-input'
                type="text"
                id="location"/>
              </div>
              <div>
                &nbsp; What time? &nbsp;
                <input
                onChange={}
                className='modal-input second-input'
                type="text"
                id="time"/>
              </div>
            </div>
            <ModalFooter>
              <button className="red-button" onClick={this.onSubmit}>
                Submit
              </button>
            </ModalFooter>
          </Modal>

  	</div>
		);
  }
};


export default NavBar;