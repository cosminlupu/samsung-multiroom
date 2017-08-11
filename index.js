const request = require('request');
const {json2xml, xml2json} = require('xml-js');
const cmds = require('./commands');

class SamsungMultiroom{
    constructor(config = {}){
        if(!config.host) throw new Error('Host needs to be provided');

        config.port = config.port || 55001;
        config.timeout = config.timeout || 10000;

        this.config = config;
        this.isBusy = false;
        this.busyQueue = [];
        this.busyInterval = false;
    }

    getVolume(cb){
        let endpoint = cmds['getVolume'].endpoint;
        let cmd = this.__jsonToParam(cmds['getVolume'].json);

        this.queue(endpoint, cmd, (error, result) => {
            if(error){
                cb(error, false);
                return;
            }

            cb(false, result.UIC.response.volume._text);
        });
    }

    setVolume(volume, cb){
        let endpoint = cmds['setVolume'].endpoint;
        let cmd = cmds['setVolume'].json;
        cmd.p._attributes.val = volume;

        cmd = this.__jsonToParam(cmd);

        this.queue(endpoint, cmd, (error, result) => {
            if(error){
                cb(error, false);
                return;
            }

            cb(false, result.UIC.response._attributes.result === 'ok');
        });
    }

    getMute(cb){
        let endpoint = cmds['getMute'].endpoint;
        let cmd = this.__jsonToParam(cmds['getMute'].json);

        this.queue(endpoint, cmd, (error, result) => {
            if(error){
                cb(error, false);
                return;
            }

            cb(false, result.UIC.response.mute._text === 'on');
        });
    }

    setMute(state, cb){
        let endpoint = cmds['setMute'].endpoint;
        let cmd = cmds['setMute'].json;
        cmd.p._attributes.val = state ? 'on' : 'off';

        cmd = this.__jsonToParam(cmd);

        this.queue(endpoint, cmd, (error, result) => {
            if(error){
                cb(error, false);
                return;
            }

            cb(false, result.UIC.response._attributes.result === 'ok');
        });
    }

    queue(endpoint, cmd, cb){
        this.busyQueue.push([endpoint, cmd, cb]);

        if(!this.busyInterval){
            this.busyInterval = setInterval(() => {
                if(!this.isBusy && this.busyQueue.length){
                    this.request(...this.busyQueue.shift());
                }
                if(!this.busyQueue.length){
                    clearInterval(this.busyInterval);
                    this.busyInterval = false;
                }
            }, 5);
        }
    }

    request(endpoint, cmd, cb){

        this.isBusy = true;
        request({
            url: `http://${this.config.host}:${this.config.port}/${endpoint}?cmd=${cmd}`,
            timeout: this.config.timeout
        }, (error, response, body) => {
            this.isBusy = false;
            if(error){
                cb(error, false);
                return;
            }
            cb(false, JSON.parse(xml2json(body, {compact: true})));
        });
    }

    __jsonToParam(json){
        return encodeURIComponent(
            json2xml( JSON.stringify(json), {compact: true}
            )
        );
    }
}

module.exports = SamsungMultiroom;