class Buffer {

    constructor(context, urls) {
        this.context = context;
        this.urls = urls;
        this.buffer = [];
    }

    loadSound(url, index) {
        let request = new XMLHttpRequest();
        request.open('get', url.audio, true);
        request.responseType = 'arraybuffer';
        let thisBuffer = this;

        request.onload = function() {
            thisBuffer.context.decodeAudioData(request.response, function(buffer) {
                thisBuffer.buffer[index] = buffer;
                //updateProgress(thisBuffer.urls.length);
                if (index == thisBuffer.urls.length - 1) {
                    thisBuffer.loaded();
                }
            });
        };
        request.send();
    };

    loadAll() {
        this.urls.forEach((url, index) => {
            this.loadSound(url, index);
        })
    }

    loaded() {
        //console.log(this.buffer)
        console.log("WE READY")
    }

    getSoundByIndex(index) {
        return this.buffer[index];
    }

}

export default Buffer;
