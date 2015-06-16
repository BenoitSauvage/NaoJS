var express = require("express")
var app     = express();
var path    = require('path');
var server  = require('http').Server(app);
var io      = require('socket.io')(server);

app.use(express.static('public'));

app.get('/page/:id', function(req, res) {
	url='';
	switch(req.params.id) {
  	case '1':
  		url='puydufou.html';
  		break;
		case '2':
  		url='planetesauvage.html';
  		break;
		default:
			console.log('err');
			url='no';
			break;
  }
  io.emit('reload', {url:url});
  res.send();
});

app.get('/:page', function(req, res) {
	res.sendFile(path.join(__dirname + '/public/' + req.params.page + '.html'));
});

app.get('/index',function(req, res) {
	res.sendFile(path.join(__dirname + '/public/index.html'));
});

server.listen(3000);

console.log("Running at port 3000");