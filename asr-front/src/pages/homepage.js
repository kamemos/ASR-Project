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
            pepe : 1,
        }
        this.socket = io('http://localhost:3001/')
    }

    componentDidMount(){
        this.socket.on('event-kaldi',(data)=>{
            switch(data.msg){
                case 'ว่าง':
                    this.setState({data:'ว่าง',pepe:2})
            }
        })
    }
    
    render() {

    return (
        <div className="flexbox-row">
            {(this.state.pepe === 1) ? 
                (<GifPlayer style={{borderRadius:'50%',eight:"700px",width:"700px",color:'green'}} autoplay={true} gif={require('../assets/gifs/thinking.gif')} />) :
                (<GifPlayer style={{borderRadius:'50%',height:"700px",width:"700px",color:'green'}} autoplay={true} gif={require('../assets/gifs/pepe-in-love.gif')} />)
            }
            {/* <audio hidden ref="audio_tag" src={require('../assets/sounds/oh-my-god.wav')} controls autoPlay/> */}
            {(this.state.data !== 'ว่าง') ?
                (
                    <div className="flexbox-col" style={{padding:'30px'}}>
                        <h1 style={{fontSize:"300%"}}>WELCOME TO</h1>
                        <h1 style={{fontSize:"500%",color:'rgb(4, 114, 4)'}}>DJ KALDI</h1>
                    </div>
                ):(
                    <div className="flexbox-col" style={{padding:'30px'}}>
                        <h1 style={{fontSize:"300%"}}>LET'S SAY</h1>
                        <h1 style={{fontSize:"500%",color:'rgb(4, 114, 4)'}}>"DJ KALDI"</h1>
                    </div>
                )
            }
        </div>
    );
    }
}

export default HomePage;