class Sound {

  constructor(context, buffer) {
    this.context = context;
    this.buffer = buffer;
  }

  init() {
    this.gainNode = this.context.createGain();
    this.source = this.context.createBufferSource();
    this.source.buffer = this.buffer;

    this.source.playbackRate.value = 0.12;
    this.gainNode.gain.value = 1;

    this.source.connect(this.gainNode);
    this.gainNode.connect(this.context.destination);
  }

  play() {
    this.init();
    this.source.start(this.context.currentTime);
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
