var TSDTFun = {};
TSDTFun.getResponseData = function (data, obj) {
    alert(1);
    var resultObj;
    var reader = new FileReader();
    reader.readAsArrayBuffer(data);
    var buf;
    reader.onload = function (e) {
        alert(2);
        buf = new Uint8Array(reader.result);
        console.log(data);
        console.log(reader);
        console.log(buf);
    };
    protobuf.load("/libs/net/gameprotocol.proto", function (err, root) { 
        alert(3);
        var Player = root.lookupTypeOrEnum(obj);
        resultObj = Player.decode(buf);
        //callback(resultObj);
    });
    alert(4);
    console.log(resultObj);
    return resultObj;
}