var TSDTFun = {};
TSDTFun.getResponseData = function (data, obj,callback) {
    var resultObj;
    var reader = new FileReader();
    reader.readAsArrayBuffer(data);
    var buf;
    reader.onload = function (e) {
        buf = new Uint8Array(reader.result);
        //console.log(data);
        //console.log(reader);
        //console.log(buf);
    };
    protobuf.load("/libs/net/gameprotocol.proto", function (err, root) {
        var Player = root.lookupTypeOrEnum(obj);
        resultObj = Player.decode(buf);
        callback(resultObj);
    });
    //console.log(resultObj);
}