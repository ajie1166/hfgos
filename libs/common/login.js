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
                var ws = new WebSocket("ws://127.0.0.1:8181");
                //var ws = new WebSocket("ws://172.17.7.35:9000");
                var GameRequest;
                var Player;
                ws.onopen = function () {
                    var sendObj = { op: "0", player_id: "123", request_id: "12", player: { name: "lijie", nickname: "ai" } };
                    var sendMsg;
                    var sendMsgTemp = JSON.stringify(sendObj);
                    var len = sendMsgTemp.length;
                    sendObj.length = len;
                    sendMsg = JSON.stringify(sendObj);
                    ws.send(sendMsg);
          

                };
                ws.onmessage = function (evt) {
                    var data = JSON.parse(evt.data);
                    console.log(data);
                   // alert(data.op+"---"+data.player.Name);
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
