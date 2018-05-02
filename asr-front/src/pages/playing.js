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
            songType : 'สุ่ม',
            isCertain : true
        }
        this.socket = io('http://localhost:3001/')
    }

    componentDidMount(){
        this.setState({randomInt : Math.floor(Math.random() * (5 - 1 + 1) ) + 1})
        this.socket.on('event-kaldi',(data)=>{
            console.log(data);
            var sentence, songname, path, songType, certainty;
            var arr = data.msg.split(',');
            if(arr.length == 3){
                [sentence, songname, path] = arr;
            }else{
                [sentence, songname, path, songType, certainty] = arr;
                if(certainty == 'มั่นใจ') this.setState({isCertain: true});
                else this.setState({isCertain: false});
            }
            this.setState({songname: songname});
            this.setState({songType: songType});
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
                    <GifPlayer autoplay={true} gif={require('../assets/gifs/playing.gif')} className="playingGif"/>  
                )
            } else if (this.state.currentState == 'stop'){
                let type = this.state.songType;
                switch(type){
                    case 'อีดีเอ็ม':
                        return (
                            <center><GifPlayer autoplay={true} gif={require('../assets/gifs/pepe-dance-5.gif')} className="playingGif"/></center>  
                        )
                    case 'ป๊อป':
                        return (
                            <center><GifPlayer autoplay={true} gif={require('../assets/gifs/pepe-dance-1.gif')} className="playingGif"/></center>  
                        )
                    case 'สุ่ม':
                        return (
                            <center><GifPlayer autoplay={true} gif={require('../assets/gifs/pepe-dance-2.gif')} className="playingGif"/></center>  
                        )
                }
            }
        }

        const uncertainBox = () =>{
            if(!this.state.isCertain) return(
                <div style={{':hover': {}}} className="circle">ตะกี้... <br/>ว่าไงนะ?</div>
            );
            return;
        }

        

        return (
            <div className="flexbox">
                <div className="flexbox-row">
                {element()}
                {uncertainBox()}
                </div>
                <div style={{margin:'auto',marginTop:'30px'}} className="swing">
                    <p className="playingText"><i style={{fontSize:"150%",color:'#f4f4f4'}}>Now Playing...</i>   {this.state.songname}</p>
                </div>

            </div>

        );
    }
}

export default Playing;