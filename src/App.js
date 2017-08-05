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
            tracks: [{}]
        }

        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.playSound = this.playSound.bind(this);
        this.playTime = this.playTime.bind(this);
        this.handleRate = this.handleRate.bind(this);
        this.handleRecord = this.handleRecord.bind(this);
        this.handleTrackCreation = this.handleTrackCreation.bind(this);
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

        let sound = new Sound(this.context, buffer.getSoundByIndex(id), this.state.rate);

        if (this.state.recording) {
          this.state.tracks[this.state.activeTrack].loop.addSound(sound, context.currentTime);
        }

        console.log(this.state.tracks[this.state.activeTrack].loop);
        //console.log(context.currentTime)

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
      console.log("new TRACK TIME BOIZ");

      console.log(this.state)

      let newTracks = this.state.tracks.slice()
      newTracks.push({ loop: new Loop(6, [], this.context) })

      this.setState({
        tracks: newTracks,
        activeTrack: 1
      })
    }


    handleKeyPress(e) {
        let random = Math.floor(e.keyCode/3);

        if (!this.firstSound) {
          this.state.tracks[this.state.activeTrack].loop.startLoop(this.context.currentTime);
          this.firstSound = true;
        }


        if (random <= 39 && !(e.keyCode >= 37 && e.keyCode <= 40) && e.keyCode !== 13) {
            console.log(random);
            this.playSound(random);
            console.log('this sound is ' + sounds[random].name)
        }

        this.setState({currentKey: e.keyCode});
        console.log('You just pressed ' + e.keyCode);

        if (e.keyCode === 38) {
            this.setState({
              rate: this.state.rate + 0.05
            })
        }

        if (e.keyCode === 40) {
          this.setState({
            rate: this.state.rate - 0.05
          })
        }

        if (e.keyCode === 37) {
            this.setState({
              rate: 0.1
            })
        }

        if (e.keyCode === 39) {
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
        this.state.tracks[0].loop = new Loop(6, [], this.context);

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
          <RecordButton onRecordChange={this.handleRecord} recording={this.state.recording}/>

          <NewTrackButton onNewTrack={this.handleTrackCreation}/>

          {this.state.tracks[0].loop ? (
            this.state.tracks.map((track, i) => {
              return <Track loop={track.loop} key={i}/>  })
              ) : (
            <div>Hit a Key...</div>
          )}
          <RateSlider onRateChange={this.handleRate} rate={this.state.rate}/>
            {/* {this.loop ? (
              this.props.studios.map((studio, i) => {
                return
                        })
                    ) : (
              <div>Loading...</div>
            )} */}
            {this.state.tracks[0].loop ? (
              <Timeline loop={this.state.tracks[this.state.activeTrack].loop}/>
                    ) : (
              <div>Loading...</div>
            )}

        </div>




    </Wrapper>
    );
  }
}

export default App;
