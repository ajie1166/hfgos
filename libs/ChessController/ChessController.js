var oGameData = {
    'oBlockIndex': {},
    'oAllBlockIndex': {},
    'oLastEatGos': { 'x': -1, 'y': -1 },
    'oLastSetGos': { 'x': -1, 'y': -1 },
    'oMarkGos': {},
    'oMarkMap': {},
    'oMap': {},
    'oSteps': {},
    'nStep': 0,
    'oRoomInfo': {}
};

var NetController = {

    hfListen: function () {
        var self = this;
        EventManager.subscribe("MatchingScene/btnStartMatching", function () {
            TSDT[2001].op = "OP_NEW_REQ";
            TSDT[2001].request_id = Utility.getRequestId();
            TSDT[2001].player_id = localStorage.player_id;
            var sendMsg = JSON.stringify(TSDT[2001]);
            wsConnection.sendMsg(sendMsg);
        })

    }
};

NetController.hfListen();