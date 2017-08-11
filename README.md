samsung-multiroom
====
_by @cosminlupu_

> Wrapper for the API provided by the Samsung MultiRoom speakers (R1 R3 R5)

_Tested only with a Samsung R1 speaker_

* **GitHub:** <https://github.com/cosminlupu/samsung-multiroom>

## Current features
* Get mute status
* Set mute
* Get volume
* Set volume

## How to use
```js
const SamsungMultiroom = require('samsung-multiroom');
const sm = new SamsungMultiroom({
    host: '192.168.0.4',
    port: 55001, //optional
    timeout: 5000 //optional
});

sm.getVolume( (error, volume) => {
    if(error){
        console.log(error);
        return;
    }
    console.log(volume);// 0-100
});

sm.setVolume(volume, (error, volumeSet) => {
    if(error){
        console.log(error);
        return;
    }
    console.log(volumeSet);//boolean
});

sm.getMute( (error, muted) => {
    if(error){
        console.log(error);
        return;
    }
    console.log(muted);//boolean
});

sm.setMute(true, (error, muteSet) => {
    if(error){
        console.log(error);
        return;
    }
    console.log(muteSet); //boolean
});
```

### Many thanks to [bacl](https://github.com/bacl) for documenting how the speaker can be controlled in [WAM_API_DOC](https://github.com/bacl/WAM_API_DOC)

## License
MIT