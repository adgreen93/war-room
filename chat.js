var app = require('express')();
var exbars = require('express-handlebars');
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.engine('handlebars', exbars({

	defaultLayout: 'main'
})
);

app.set('view engine', 'handlebars');

app.get('/', function(req, res){
  res.render('home');
});

app.get('/chat', function(req, res){
  res.render('chat');
});

io.on('connection', function(socket){
	socket.join('some_room');
	socket.on('chat message', function(msg){
		io.to('some_room').emit('chat message', msg);
	});
});

http.listen(3000, function(){
  console.log('War Room Started!');
});