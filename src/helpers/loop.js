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

export default Loop;
