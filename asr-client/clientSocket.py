from socketIO_client import SocketIO, BaseNamespace

class ConnectEvent(BaseNamespace):
    def on_connect(self):
        print('[Connected]')

    def on_reconnect(self):
        print('[Reconnected]')

    def on_disconnect(self):
        print('[Disconnected]')
    
def on_response(*args):
    print('on_response', args)
    
socketIO = SocketIO('localhost', 3001, ConnectEvent) # Establish connection
socketIO.emit('event-web',{'msg':"eieis"}) # Send Message to kaldi
socketIO.on('event-kaldi', on_response)  # Listen for kaldi event
socketIO.wait()  # Open socket forever

