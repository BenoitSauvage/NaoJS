var express = require("express")
var app     = express();
var path    = require('path');
var server  = require('http').Server(app);
var io      = require('socket.io')(server);
var fs      = require('fs');

app.use(express.static('public'));

conf = loadJSONfile("conf.json","utf8");

app.get('/page/:id', function(req, res) {
    url='';
    conf.places.forEach(function(obj){
        if(obj.id == req.params.id){
            url = obj.url;
        }
    });
  io.emit('reload', {url:url});
  res.send();
});

app.get('/',function(req, res) {
	res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.get('/:page', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/' + req.params.page + '.html'));
});

server.listen(80);

console.log("Running at port 80");

function loadJSONfile (filename, encoding) {
    try {
        // default encoding is utf8
        if (typeof (encoding) == 'undefined') encoding = 'utf8';

        // read file synchroneously
        var contents = fs.readFileSync(filename, encoding);

        // parse contents as JSON
        return JSON.parse(contents);

    } catch (err) {
        // an error occurred
        throw err;
    }
}