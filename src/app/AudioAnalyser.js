import * as THREE from 'three';

export default class AudioAnalyser {

    constructor({ track, loop, fftSize}){
        this.track = track
        this.listener = new THREE.AudioListener()
        this.audioLoader = new THREE.AudioLoader()
        this.sound =  new THREE.Audio(this.listener)
        this.loop = loop
        this.fftSize = fftSize
    }

    loadTrack() {

        return new Promise((resolve, reject) => {

            this.audioLoader.load(this.track, buffer => {
                this.sound.setBuffer( buffer )
                this.sound.setLoop(this.loop)
                this.sound.setVolume(0.5)
                this.analyser = new THREE.AudioAnalyser( this.sound, this.fftSize )
                resolve(buffer)
            })
        })

    }

    playTrack() {
        this.sound.play()
    }

    setVol(volume) {
        this.sound.setVolume(volume);
    }

    get trackAnalyser() {
        return this.analyser;
    }

    get getFrequency() {
        return this.analyser.getAverageFrequency()
    }

    get getListener() {
        return this.listener;
    }
}