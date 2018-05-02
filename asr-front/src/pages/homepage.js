import React from 'react'
import {Redirect} from 'react-router-dom'
import io from 'socket.io-client'
import GifPlayer from 'react-gif-player'
import '../assets/css/custom.css'

class HomePage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data : '',
            pepe : 1,
            wait : false,
            redirect : false
        }
        this.socket = io('http://localhost:3001/')
    }

    componentDidMount(){
        this.socket.on('event-kaldi',(data)=>{
            switch(data.msg){
                case 'ว่าง':
                    this.setState({data: data.msg})
                case 'มาละ':
                    this.setState({data: data.msg})
                    this.setState({redirect: true})
            }
        })
    }
    
    render() {
    const Pepe = () => {
        if (this.state.data === 'ว่าง'){
            return (
                (<GifPlayer style={{borderRadius:'50%',height:"700px",width:"700px",color:'green',marginTop:'20px'}} autoplay={true} gif={require('../assets/gifs/pepe-in-love.gif')} />)

            )
        }
        else if (this.state.data === 'มาละ'){
            return (
                (<GifPlayer style={{borderRadius:'50%',height:"700px",width:"700px",color:'green',marginTop:'20px'}} autoplay={true} gif={require('../assets/gifs/pepe-shock.gif')} />)
            )
        }
        else {
            return (
                (<GifPlayer style={{borderRadius:'50%',eight:"700px",width:"700px",color:'green',marginTop:'20px'}} autoplay={true} gif={require('../assets/gifs/thinking.gif')} />)
            )
        }
    }   
    const Text = () =>{
        if (this.state.data === 'ว่าง'){
            return (
                <div className="flexbox-col" style={{padding:'30px'}}>
                    <h1 style={{fontSize:"300%"}}>LET'S SAY</h1>
                    <h1 style={{fontSize:"500%"}}>"DJ KALDI"</h1>
                </div>
            )
        }
        else if (this.state.data === 'มาละ') {
            return <div/>
        }
        else {
            return (
                (
                    <div className="flexbox-col" style={{padding:'30px'}}>
                        <h1 style={{fontSize:"300%"}}>Welcome to</h1>
                        <h1 style={{fontSize:"500%"}}>DJ KALDI</h1>
                    </div>
                )
            )
        }
    }
    if (this.state.redirect) return <Redirect to="/playing"/>
    return (
        <div className="flexbox-row">
            <Pepe />
            {/* <audio hidden ref="audio_tag" src={require('../assets/sounds/oh-my-god.wav')} controls autoPlay/> */}
            <Text />
        </div>
    );
    }
}

export default HomePage;