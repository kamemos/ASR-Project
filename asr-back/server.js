var app = require('express')();
var http = require('http');
var inSecureServer = http.createServer(app).listen(3001,function(){
    console.log('Server is running on port 3001')
})

/// START SOCKET.IO
var io = require('socket.io')(inSecureServer);

io.on('connection', function(client){
    client.on('event-kaldi', function(data){
        console.log('event-kaldi',data);
        io.emit('event-kaldi', {
            msg: data.msg
        });
    });
    client.on('event-web', function(data){
        console.log('event-web',data);
        io.emit('event-web', {
            msg: data.msg
        });
    });
    client.on('disconnect', function(){});
});

/// END SOCKET.IO

