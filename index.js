const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html')
});

io.on('connection', socket => {
  console.log("a user connected");
  socket.userName = 'Admin';

  socket.on('new user', paramUser => {
    socket.userName = paramUser.name;
  });

  socket.on('chat message', (msg) => {
    io.emit('receive message', {message: msg.message, userName: socket.userName});
  });


});

http.listen(3000, function(){
  console.log('listening on *:3000');
});