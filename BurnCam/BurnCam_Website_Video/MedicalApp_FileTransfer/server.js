/*
This code was developed by @ArinSime and AgilityFeat for an O'Reilly video course on WebRTC basics.  

You are welcome to use it at your own risk as starter code for your applications, 
but please be aware that this is not a complete code example with all the necessary 
security and privacy considerations implemented that a production app would require.  

It is for educational purposes only, and any other use is done at your own risk.
*/

//Server.js:  This is the core Node.js configuration code, and also used for
//setting up signaling channels to be used by socket.io

var express = require('express.io');
var app = express();
app.http().io();
var PORT = 3000;
console.log('server started on port ' + PORT);

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
	res.render('index.ejs');
});

app.listen(process.env.PORT || PORT);

app.io.route('signal', function(req) {
	req.io.join(req.data);
	req.io.join('files');
	app.io.room(req.data).broadcast('signal', {
		user_type: req.data.user_type,
		user_name: req.data.user_name,
		user_data: req.data.user_data,
		command: req.data.command
	})
})

app.io.route('files', function(req) {
	req.io.room('files').broadcast('files', {
		filename: req.data.filename,
		filesize: req.data.filesize
	});
})