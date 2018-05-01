import React from 'react'
import { ReactMic } from 'react-mic'
import io from 'socket.io-client'
import GifPlayer from 'react-gif-player'
import '../assets/css/custom.css'

class HomePage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data : '',
        }
        this.socket = io('http://localhost:3001/')
    }

    componentDidMount(){
        this.socket.on('event-kaldi',(data)=>{
            switch(data.msg){
                case 'ว่าง':
                    this.setState({data:'ว่าง'})
                    console.log(this.state)
            }
        })
    }
    
    render() {
    return (
        <div className="flexbox">
            <GifPlayer autoplay={true} gif={require('../assets/gifs/thinking.gif')} />
            <audio hidden ref="audio_tag" src={require('../assets/sounds/oh-my-god.wav')} controls autoPlay/>
        </div>
    );
    }
}

export default HomePage;