import React from 'react'
import { ReactMic } from 'react-mic'
import io from 'socket.io-client'
import GifPlayer from 'react-gif-player'
import '../assets/css/custom.css'

class HomePage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            record: false
        }
        this.startRecording = this.startRecording.bind(this)
        this.stopRecording = this.stopRecording.bind(this)
        this.onData = this.onData.bind(this)
        this.onStop = this.onStop.bind(this)
        this.socket = io('http://localhost:3001/')
    }

    startRecording(){
        this.setState({
            record: true
        })
    }
     
    stopRecording = () => {
        this.setState({
            record: false
        });
    }
    
    onData(recordedBlob) {
        console.log('chunk of real-time data is: ', recordedBlob);
    }
    
    onStop(recordedBlob) {
        console.log('recordedBlob is: ', recordedBlob);
    }

    componentDidMount(){
        this.socket.on('event',(data)=>{
            console.log(data);
        })
    }
    
    render() {
    return (
        <div className="flexbox">
            <GifPlayer autoplay={true} gif={require('../assets/gifs/frog.gif')} />
        </div>
    );
    }
}

export default HomePage;