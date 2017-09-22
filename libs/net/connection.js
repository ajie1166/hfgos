var ws = null;
var conArray = ["ws://127.0.0.1:7001", "ws://172.17.7.87:7001"];
var wsConnection = {
    initWS: function (player_id) {
        var self = this;
        ws = new WebSocket(conArray[0]);
        ws.onopen = function () {
            // console.info(player_id);
            //var player_id = localStorage.player_id;
            TSDT[1000].op = "OP_LOGIN_REQ";
            TSDT[1000].player_id = player_id;
            TSDT[1000].request_id = Utility.getRequestId();
            TSDT[1000]["object"].player_id = player_id;
            TSDT[1000]["object"].version = "1.0.0";
            TSDT[1000]["object"].date = Utility.getTimestamp();

            /*var obj = {
                 "op": "1000",
                 "player_id": player_id,
                 "request_id": self.getRequestId(),
                 "object": {
                     "player_id": player_id,
                     "version": "1.0.0",
                     "date": self.getTimestamp()
                 }
             };*/
            var sendMsg = JSON.stringify(TSDT[1000]);
            ws.send(sendMsg);
            console.info(sendMsg);

        };
        ws.onmessage = function (evt) {
            console.info(evt.data);
            var message = evt.data;
            self.onMsg(message);
        };
        ws.onclose = function () {

        };
    },
    sendMsg: function (data) {
        console.info(data);
        ws.readyState === 1 && ws.send(data);
    },
    onMsg: function () {

    }

}