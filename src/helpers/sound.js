class Sound {

    constructor(context, buffer, rate = 1) {
        this.context = context;
        this.buffer = buffer;
        this.rate = rate;
    }

    init() {
        this.gainNode = this.context.createGain();
        this.source = this.context.createBufferSource();
        this.source.buffer = this.buffer;

        this.source.playbackRate.value = this.rate;
        this.gainNode.gain.value = 0.5;

        //console.log(this.source.buffer.length);

        this.source.connect(this.gainNode);
        this.gainNode.connect(this.context.destination);
    }

    calcDuration() {
      return this.source.buffer.duration*this.rate;
    }

    play() {
        this.init();
        this.source.start(this.context.currentTime);
        console.log(this.source.buffer.duration)
    }

    playInTime(time) {
        this.init();
        this.source.start(this.context.currentTime + time);
    }

    playAtTime(time) {
        this.init();
        this.source.start(time);
    }

    stop() {
        this.gainNode.gain.exponentialRampToValueAtTime(0.001, this.context.currentTime + 0.5);
        this.source.stop(this.context.currentTime + 0.5);
    }

}

export default Sound;
