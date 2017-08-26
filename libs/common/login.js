/**
 * by lijie 验证登陆相关操作
 * 
 */

(function ($) {
   
    var Login = {
        Token: "",
        GetToken: function () {
            var params = this.GetParams();
            var code = params["code"] || "";
            if (typeof code == "undefined" || code == "") {
                //alert("登陆失败,缺少参数");
                EventManager.publish("showMsg", "登录失败,缺少参数");
                return;
            }
            // alert(code);
            this.Token = params["token"];
            $.ajax({
                url: "http://qiwang.cga.com.cn",
                type: "Post",
                data: { code: code, session: this.Token }
            }).done(function (data) {
                if (data.status == 0) {

                } else {
                    EventManager.publish("showMsg", "对不起,请先登陆官网再开始游戏");
                }
                //EventManager.publish("StartPreLoadRes");
            }).fail(function () {
                // var p = ProtoBuffer.GetProtoTypeOrEnum("Player", { name: "lijie", id: "1", nickname: "ai" });

                var ws = new WebSocket("ws://127.0.0.1:8181");
                var Player;
                ws.onopen = function () {
                    protobuf.load("/libs/net/gameprotocol.proto", function (err, root) {
                        Player = root.lookupTypeOrEnum("Player");
                        var player = Player.create({ name: "lijie", id: "1", nickname: "ai" });
                        var bufferSend = Player.encode(player).finish();
                        console.log(bufferSend);
                        ws.send(bufferSend);
                    });

                };
                ws.onmessage = function (evt) {
                    var data = evt.data;

                    var j = TSDTFun.getResponseData(data, "Player");

                }
                EventManager.publish("StartPreLoadRes");
            });
        },
        GetParams: function () {
            var url = location.search;
            var theRequest = {};
            if (url.indexOf("?") != -1) {
                // 获取url中"?"符后的字串
                var str = url.substr(1);
                strs = str.split("&");
                for (var i = 0; i < strs.length; i++) {
                    var decodeParam = decodeURIComponent(strs[i]);
                    var param = decodeParam.split("=");
                    theRequest[param[0]] = param[1];
                }
            }
            return theRequest;
        },
        Init: function () {
            var self = this;
            EventManager.subscribe("LoadInit", function () {
                self.GetToken();
            });
            //EventManager.subscribe("");
        }

    };
    Login.Init();
})($)
