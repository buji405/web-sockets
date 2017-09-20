var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  io.emit('user connection', 'someone joined the chat.');

  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });

  socket.on('user is typing', () => {
   io.emit('user typing')
 })

  socket.on('disconnect', function(){
    socket.broadcast.emit('a user disconnected');
  });
})


http.listen(3000, function(){
  console.log('listening on *:3000');
});
