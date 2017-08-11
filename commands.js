module.exports = {
    "getVolume": {
        "json": {
            "name": {
                "_text": "GetVolume"
            }
        },
        "endpoint": "UIC"
    },
    "setVolume": {
        "json": {
            "name": {
                "_text": "SetVolume"
            },
            "p": {
                "_attributes": {
                    "type": "dec",
                    "name": "volume",
                    "val": ""
                }
            }
        },
        "endpoint": "UIC"
    },
    "getMute": {
        "json": {
            "name": {
                "_text": "GetMute"
            }
        },
        "endpoint": "UIC"
    },
    "setMute": {
        "json": {
            "pwron": {
                "_text": "on"
            },
            "name": {
                "_text": "SetMute"
            },
            "p": {
                "_attributes": {
                    "type": "str",
                    "name": "mute",
                    "val": ""
                }
            }
        },
        "endpoint": "UIC"
    },
};