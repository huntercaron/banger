class Loop {
    constructor(length, context) {
        this.length = length;
        this.recording = true;
        this.loops = 0;
        this.context = context;
        this.looping = true;
        this.loopStarting = false;
        this.tracks = [
          {
            sounds: [],
            number: 0,
            isMuted: true,
            volume: 0.5
          }
        ];

        this.playLoopSound = this.playLoopSound.bind(this);
    }
    //interval for every 4 seconds see what you need to play offset

    startLoop(time) {
        console.log('loop Started');
        this.startTime = time;

        this.playLoopSound()
    }

    playLoopSound() {

        this.loopTimer = this.context.createOscillator();

        this.loopTimer.type = 'sine';
        this.loopTimer.frequency.value = 0;
        this.loopTimer.connect(this.context.destination);

        this.loopTimer.start();
        this.loopTimer.stop(this.context.currentTime + this.length);

        let scope = this;
        this.loopTimer.onended = function(event) {

          //if (this.looping) {
            this.loopStarting = true;

            scope.playLoopSound()
            scope.loopRun()
          //}
        }
    }

    stopLoop() {
        clearInterval(this.interval);
    }

    makeSounds(track) {
      if (track.isMuted == false) {
        for ( let sound of track.sounds ) {
            sound.sound.playInTime(sound.time, track.volume);
        }
      }
    }

    loopRun() {
        this.loops++;

        this.loopStarting = false;

        for (let track of this.tracks)
          this.makeSounds(track);

    }

    addSound(sound, currentTime, track) {
        this.tracks[track].sounds.push({sound: sound, time: ( (currentTime - this.startTime) - (this.length * this.loops)  )});

        //console.log(((currentTime - this.startTime) - ((this.length/1000) * this.loops))*-1);
    }




    muteTrack(track) {
      for (let sound of track.sounds) {
        sound.sound.stop();
      }
      track.isMuted = true;
    }



    unMuteTrack(track) {
      for (let sound of track.sounds) {
        if (sound.time - (this.context.currentTime % this.length) >= 0) {
          sound.sound.playInTime(sound.time-(this.context.currentTime % this.length), track.volume);
        }
      }

      console.log(this.context.currentTime % this.length)
      track.isMuted = false;
    }
}

export default Loop;
