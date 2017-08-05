class Loop {
    constructor(length, sounds = [], context) {
        this.sounds = sounds;
        this.length = length;
        this.recording = true;
        this.loops = 0;
        this.context = context;
        this.looping = true;
        this.loopStarting = false;

        this.loopEvent = new Event('newLoop');


        console.log("intit " + this.loops);
        this.playLoopSound = this.playLoopSound.bind(this);
    }
    //interval for every 4 seconds see what you need to play offset

    startLoop(time) {
        console.log('loop Started');
        this.startTime = time;
        let scope = this;
        //this.interval = window.setInterval(function() { scope.loopRun() }, this.length);
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

    makeSounds() {
        for ( let sound of this.sounds ) {
            sound.sound.playInTime(sound.time);
        }
    }

    loopRun() {
        this.loops++;
        console.log(this.loops)
        //console.log("looop: " + this.sounds);
        this.loopStarting = false;
        this.makeSounds();
        //this.dispatchEvent(this.loopEvent);

        if (this.sounds.length != 0 && this.context.currentTime % 4 == 0)
          console.log("SHEOSTNROISTENRSIOTENS")

    }

    addSound(sound, currentTime) {
        this.sounds.push({sound: sound, time: ( (currentTime - this.startTime) - (this.length * this.loops)  )});
        console.log(sound)
        //console.log(((currentTime - this.startTime) - ((this.length/1000) * this.loops))*-1);
    }
}

export default Loop;
