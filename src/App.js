import React, { Component } from 'react';
// import Pizzicato from 'pizzicato';
import styled from 'styled-components';
import Sound from './helpers/sound';
import Buffer from './helpers/buffer';
import audioFiles from './helpers/audioFiles';

let sounds = audioFiles;

const Wrapper = styled.div`
    background-color: pink;
`

class Loop {
    constructor(length, sounds = []) {
        this.sounds = sounds;
        this.length = length;
        this.recording = true;
        this.loops = 1;

        console.log("intit " + this.loops);
    }
    //interval for every 4 seconds see what you need to play offset

    startLoop(time) {
        console.log('loop Started');
        this.startTime = time;
        let scope = this;
        this.interval = window.setInterval(function() { scope.loopRun() }, this.length);
    }

    stopLoop() {
        clearInterval(this.interval);
    }

    makeSounds() {
        for ( let sound of this.sounds ) {
            sound.sound.playInTime(sound.time);
        }
    }

    loopRun() {
        this.loops++;
        console.log("loop: " + this);
        this.makeSounds();
    }

    addSound(sound, currentTime) {
        this.sounds.push({sound: sound, time: ((currentTime - this.startTime) - ((this.length/1000) * this.loops))*-1});
        console.log(((currentTime - this.startTime) - ((this.length/1000) * this.loops))*-1);
    }
}



class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentKey: ''
        }

        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.playSound = this.playSound.bind(this);
        this.playTime = this.playTime.bind(this);
    }


    playTime() {
        let context = this.context;
        let buffer = this.buffer;

        let sound = new Sound(context, buffer.getSoundByIndex(9));
        //console.log(context.currentTime + "doingstuff");
        sound.playAtTime(13.541043083900227);
    }


    playSound(id = 0) {
        let context = this.context;
        let buffer = this.buffer;

        let sound = new Sound(this.context, buffer.getSoundByIndex(id));
        //this.loop.addSound(sound, context.currentTime);
        //console.log(this.loop);
        //console.log(context.currentTime)

        sound.play();
    }

    handleKeyPress(e) {
        let random = Math.floor(e.keyCode/3);
        if (random <= 39) {
            console.log(random);
            this.playSound(random);
            console.log('this sound is ' + sounds[random].name)
        }

        this.setState({currentKey: e.keyCode});
        console.log('You just pressed ' + e.keyCode);

        if(e.keyCode === 27) {
          this.context.close()
        }

        if(e.keyCode === 13) {
          this.context.close()
        }


    }

    componentDidMount() {
        this.context = new (window.AudioContext || window.webkitAudioContext)();
        document.addEventListener('keydown', this.handleKeyPress);
        this.loop = new Loop(5000, []);
        this.loop.startLoop(this.context.currentTime);

        this.buffer = new Buffer(this.context, sounds);
        this.buffer.loadAll();
    }

    componentWillUnmount() {
      document.removeEventListener('keydown', this.handleKeyPress);
    }

    render() {
      return (
      <Wrapper>
        <div className="App-header">
          <h2>hunters meme machine</h2>
        </div>




    </Wrapper>
    );
  }
}

export default App;
