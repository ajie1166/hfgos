
var ProtoBuffer = {};
ProtoBuffer.GetProtoTypeOrEnum = function (name, options) {
    var pro = protobuf.load("/libs/net/gameprotocol.proto");
    pro.then(function (root) {
        typeOrEnum = root.lookupTypeOrEnum(name);
        var typeTemp = typeOrEnum.create(options);
        var buffer = typeOrEnum.encode(typeTemp).finish();
       // alert(buffer);
        typeOrEnumDecode = typeOrEnum.decode(buffer).toJSON();
       // alert(typeOrEnumDecode.name);
    });
    return typeOrEnumDecode;
    // var Player = root.lookupTypeOrEnum("Player");
    // alert(root instanceof protobuf.Root);
    /*protobuf.load("/libs/net/gameprotocol.proto", function (err, root) {
        var Player = root.lookupTypeOrEnum("Player");
        var player = Player.create({ name: "lijie", id: "1", nickname: "ai" });
        //alert(p.Name);
        var buffer = Player.encode(player).finish();
        alert(buffer);
        var p = Player.decode(buffer);
        alert(p.rank);
});*/
};
