# Food Runner

> Help your team.  Help yourself.  Eat real food.

## Team

  - __Product Owner__: Robin Dykema
  - __Scrum Master__: Johnny McDuff
  - __Development Team Members__: Renata Maraj, Will Schwanke

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Team](#team)
1. [Contributing](#contributing)

## Usage

> Using your facebook, log on to our app on the landing page. Next, choose your group. After that, you can choose to volunteer to grab food or request a food order.

## Requirements

- Node 0.10.x
- MongoDB
- ReactJS

## Development
Other Technologies Used:
Axios
Facebook Authentication
Mongoose
Passport
React-Modal-Bootstrap

### Installing Dependencies

From within the root directory:

=======

$ npm install 
(also runs gulp build).


### Roadmap
Known Issues:

### Room to Grow!
Food Runner has several excellent avenues for growth.
1.  Karma -- Track and report how often people request and run for food.
     -- The karma functionality is already built into the DB and NavBar. 
     1a:  Create 'levels' of karma, with more helpful users earning fun titles.
     1b:  Gamify Karma points.
2.  Free food! -- Add another Component and button to the VolunteerRequestContainer to announce when there are  free nomz.
3.  Drop-downs -- Our interaction is strictly text.
     3a:  Add drop-downs for nearby restaurants.
     3b:  Add drop-downs for quick menu choices.
4.  Social -- Add the option to ask people to go with you to eat.
    --Add check box to VolunteerModal
    --Add some kind of icon to Volunteer Modal
    --Update postVolunteer function to send to DB.
5.  Max food orders -- Allow volunteers to set a limit on the number of requests they will accept.
    --Who wants to carry fifteen burritos and not eat them?
6.  Vinmo integration
    -- https://venmo.com/
7.  Only show requests from today
    -- this was supposed to be in the MVP, but fell behind.  All records have a created date, so it can be implemented by updating the queries in router.


## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.

