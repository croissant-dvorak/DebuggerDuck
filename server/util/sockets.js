const socketio = require('socket.io')
const stories = require('./controller.js')


module.exports.listen = function(http){
  var io = socketio(http)
  //establish socket connection
  io.on('connection', function(client){
    // console.log("socket running")
    //here's how we create a new room
    client.on('createRoom', function(roomId) {
      // console.log('ROOM--------', roomId)
      client.join(roomId);
    });


    client.on('addMessage', function(message) {
      io.to(message.roomId).emit('addMessage', message)
    })
    // when the client submits a new line save it to the
    // database and return the story

  })
}
