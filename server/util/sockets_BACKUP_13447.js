const socketio = require('socket.io')
const stories = require('./controller.js')


module.exports.listen = function(http){
  var io = socketio(http)
  //establish socket connection
  io.on('connection', function(client){
    console.log("socket running, from project page")

    //here's how we create a new room
    client.on('createRoom', function(roomID) {
      console.log('ROOM--------', roomID)
      client.join(roomID);
    });

    // when the client submits a new line save it to the
    // database and return the story
    client.on('sendingLine', function(lineData) {
      stories.createNewLine(lineData)
      // this story is fully populated!
      .then(story => {
        io.in(story._id).emit('lineSaved', story);
      })
    });

    client.on('storyCreated', () => {
      stories.getAllStoriesForSocket()
        .then(allStories => {
          io.emit('storyAdded', allStories);
        })
    })
  })
}
