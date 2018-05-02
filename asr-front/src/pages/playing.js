import React from 'react'
import { ReactMic } from 'react-mic'
import io from 'socket.io-client'
import GifPlayer from 'react-gif-player'
import '../assets/css/custom.css'

class Playing extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            songname : '',
            currentState : 'stop',
            randomInt : ''
        }
        this.socket = io('http://localhost:3001/')
    }

    componentDidMount(){
        this.setState({randomInt : Math.floor(Math.random() * (5 - 1 + 1) ) + 1})
        this.socket.on('event-kaldi',(data)=>{
            console.log(data);
            var sentence, songname, path;
            [sentence, songname, path] = data.msg.split(',');
            console.log('sentence: ',sentence);
            console.log('songname: ',songname);
            this.setState({songname: songname});
            switch(sentence){
                case 'หยุดเล่นเพลง':
                    this.setState({currentState: 'stop'});
                case 'กำลังเล่นเพลง':
                    this.setState({currentState: 'playing'});
            }  
        })
    }
    
    
    render() {
        const element = () =>{
            if(this.state.currentState == 'playing'){
                return (
                    <center><GifPlayer autoplay={true} gif={require('../assets/gifs/playing.gif')} className="playingGif"/></center>   
                )
            } else if (this.state.currentState == 'stop'){
                let randomInt = this.state.randomInt
                switch(randomInt){
                    case 1:
                        return (
                            <center><GifPlayer autoplay={true} gif={require('../assets/gifs/pepe-dance-1.gif')} className="playingGif"/></center>  
                        )
                    case 2:
                        return (
                            <center><GifPlayer autoplay={true} gif={require('../assets/gifs/pepe-dance-2.gif')} className="playingGif"/></center>  
                        )
                    case 3:
                        return (
                            <center><GifPlayer autoplay={true} gif={require('../assets/gifs/pepe-dance-3.gif')} className="playingGif"/></center>  
                        )
                    case 4:
                        return (
                            <center><GifPlayer autoplay={true} gif={require('../assets/gifs/pepe-dance-4.gif')} className="playingGif"/></center>  
                        )
                    case 5:
                        return (
                            <center><GifPlayer autoplay={true} gif={require('../assets/gifs/pepe-dance-5.gif')} className="playingGif"/></center>  
                        )
                }
            }
        }

        

        return (
            <div className="flexbox">
                {element()}
                <div className="playingTextBox">

                    <p className="playingText">Now Playing...  {this.state.songname}</p>
                </div>
            </div>

        );
    }
}

export default Playing;