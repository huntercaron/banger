import React, { Component } from 'react';
// import Pizzicato from 'pizzicato';
import styled from 'styled-components';
import Sound from './helpers/sound';
import Buffer from './helpers/buffer';
import Loop from './helpers/loop';
import audioFiles from './helpers/audioFiles';

import RateSlider from './components/PitchSlider';

let sounds = audioFiles;

const Wrapper = styled.div`
    background-color: pink;
`


class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentKey: '',
            rate: 1
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

        let sound = new Sound(this.context, buffer.getSoundByIndex(id), 1);
        window.setTimeout(function() {
          console.log(sound.calcDuration());
        }, 200)

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
          <h2>ZUCCBOI</h2>
          <RateSlider />
        </div>




    </Wrapper>
    );
  }
}

export default App;
