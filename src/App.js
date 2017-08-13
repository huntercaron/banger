import React, { Component } from 'react';
// import Pizzicato from 'pizzicato';
import styled from 'styled-components';
import Sound from './helpers/sound';
import Buffer from './helpers/buffer';
import Loop from './helpers/loop';
import audioFiles from './helpers/audioFiles';

import RateSlider from './components/RateSlider';
import Track from './components/Track';
import Timeline from './components/Timeline';
import RecordButton from './components/RecordButton';
import NewTrackButton from './components/NewTrackButton';
import Ticker from './components/Ticker';

let sounds = audioFiles;

const Wrapper = styled.div`
    background-color: black;
`

class App extends Component {
    constructor(props) {
        super(props);
        this.firstSound = false;

        this.state = {
            currentKey: '',
            rate: 1,
            recording: false,
            activeTrack: 0,
            loop: {},
        }

        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.playSound = this.playSound.bind(this);
        this.handleRate = this.handleRate.bind(this);
        this.handleRecord = this.handleRecord.bind(this);
        this.handleTrackCreation = this.handleTrackCreation.bind(this);
        this.isKeycode = this.isKeycode.bind(this);
    }

    playSound(id = 0) {
        let context = this.context;
        let buffer = this.buffer;

        let sound = new Sound(this.context, buffer.getSoundByIndex(id), this.state.rate);

        console.log("ACTIVE TRACK BOIS " + this.state.activeTrack)
        if (this.state.recording) {
          this.state.loop.addSound(sound, context.currentTime, this.state.activeTrack);
        }


        sound.play();
    }

    handleRate(rate) {
      this.setState({
        rate: rate
      });
    }

    handleRecord() {
      this.setState({
        recording: !this.state.recording
      });
    }

    handleTrackCreation() {
      this.state.loop.tracks.unshift({
        sounds: [],
        number: this.state.loop.tracks.length,
        isMuted: false,
        volume: 0.5
      });

      this.setState({
        //activeTrack: this.state.activeTrack + 1
      })

      console.log(this.state.loop.tracks);

    }

    handleTrackMuting(track) {
      this.state.loop.muteTrack(track);
    }

    isKeycode(keycode) {
      return function(sound) {
        return sound.keybind === keycode;
      }
    }


    handleKeyPress(e) {

        if (!(e.keyCode >= 37 && e.keyCode <= 40) && e.keyCode !== 13) {
          let soundBind = audioFiles.findIndex( this.isKeycode(e.keyCode));

          if (soundBind > -1) {
            this.playSound(soundBind);
            console.log('this sound is ' + sounds[soundBind].name)
          }

        }

        this.setState({currentKey: e.keyCode});
        console.log('You just pressed ' + e.keyCode);

        if (e.keyCode === 38) {
          e.preventDefault();
            this.setState({
              rate: this.state.rate + 0.02
            })
        }

        if (e.keyCode === 40) {
          e.preventDefault();
          this.setState({
            rate: this.state.rate - 0.02
          })
        }

        if (e.keyCode === 37) {
          e.preventDefault();
            this.setState({
              rate: 0.1
            })
        }

        if (e.keyCode === 39) {
          e.preventDefault();
          this.setState({
            rate: 3
          })
        }

        if(e.keyCode === 27) {
          this.context.close()
        }

        if(e.keyCode === 13) {
          this.handleRecord()
        }

        //console.log("currentTime" + this.context.currentTime);
    }

    componentDidMount() {
        this.context = new (window.AudioContext || window.webkitAudioContext)();
        document.addEventListener('keydown', this.handleKeyPress);

        this.setState({
          loop: new Loop(6, this.context)
        })

        this.context.createMediaStreamDestination();

        let scope = this;

        setTimeout(function(){
          scope.state.loop.startLoop(scope.context.currentTime);
        }, 10);

        this.buffer = new Buffer(this.context, sounds);
        this.buffer.loadAll();
    }

    componentWillUnmount() {
      document.removeEventListener('keydown', this.handleKeyPress);
    }

    render() {
      let tickerStyle = {};

      if (this.state.loop) {
        tickerStyle = {
          animationDuration: (this.state.loop.length) + "s"
        };
      }

      return (
      <Wrapper>
        <div className="App-header">
          <RecordButton onRecordChange={this.handleRecord} recording={this.state.recording}/>
          <NewTrackButton onNewTrack={this.handleTrackCreation}/>
          <RateSlider onRateChange={this.handleRate} rate={this.state.rate}/>

          {this.state.loop ? (
            <Ticker style={tickerStyle}/>
          ) : (<div>loading</div>)}

          {this.state.loop.tracks ? (
            this.state.loop.tracks.map((track, i) => {
              return <Track track={track} loop={this.state.loop} key={i} />  })
              ) : (
            <div>Hit a Key...</div>
          )}


        </div>




    </Wrapper>
    );
  }
}

export default App;
