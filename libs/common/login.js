/**
 * by lijie 验证登陆相关操作
 * 
 */

(function ($) {

    var Login = {
        Token: "",
        SessionId: "",
        PlayerId: "",
        GetToken: function () {
            var params = this.GetParams();
            this.Token = params["token"] || "";

            if (typeof this.Token == "undefined" || this.Token == "") {
                //alert("登陆失败,缺少参数");
                EventManager.publish("showMsg", "登录失败,缺少参数");
                return;
            }

            //alert(localStorage.session_id);
            //alert(localStorage.player_id);
            $.ajax({
                url: "http://test.xiaqi.cga.com.cn/account/checktoken",
                type: "Get",
                data: { token: this.Token },
                dataType: "jsonp",
                //jsonpCallback: 'loginCB'
            }).done(function (result) {
                console.log(result);
                if (result.status == 0) {
                    EventManager.publish("StartPreLoadRes");
                    alert(result.data.gos_session_id);
                    var data = result.data;
                    var s_id = data["gos_session_id"];
                    var p_id = data["gos_player_id"];
                    if (typeof s_id == "undefined" || s_id == "" || typeof p_id == "undefined" || p_id == "") {
                        EventManager.publish("showMsg", "对不起,服务端错误");
                        return;
                    }
                    this.SessionId = s_id;
                    this.PlayerId = p_id;
                    if (localStorage.session_id != "") {
                        if (localStorage.session_id != this.SessionId) {
                            localStorage.session_id = this.SessionId;
                        }
                    } else {
                        localStorage.session_id = this.SessionId;
                    }
                    if (localStorage.player_id != "") {
                        if (localStorage.player_id != this.PlayerId) {
                            localStorage.player_id = this.PlayerId;
                        }
                    } else {
                        localStorage.player_id = this.PlayerId;
                    }
                } else {
                    EventManager.publish("showMsg", "对不起,请先登陆官网再开始游戏");
                }
                //EventManager.publish("StartPreLoadRes");
            }).fail(function () {
                EventManager.publish("showMsg", "对不起,服务端出错");
                return;
                // var ws = new WebSocket("ws://127.0.0.1:8181");
                //var ws = new WebSocket("ws://172.17.7.35:9000");
                var ws = new WebSocket("ws://172.17.7.35:7001");
                var GameRequest;
                var Player;
                ws.onopen = function () {
                    var sendObj = { op: "OP_LOGIN_REQ", player_id: "a84hh2453j2493kkk2h3h", request_id: "WsLogin", LOGIN_REQ: { session_id: "hfhfhakk73742a8", version: "1.0.0", date: "1504695009", content: "hfhfhakk73742a8" } };
                    var sendMsg = JSON.stringify(sendObj);
                    /*var len = sendMsgTemp.length;
                    sendObj.length = len;
                    sendMsg = JSON.stringify(sendObj);*/
                    ws.send(sendMsg);

                };
                ws.onmessage = function (evt) {
                    var data = JSON.parse(evt.data);
                    console.log(data);
                }
                ws.onerror = function (evt) {
                    alert(evt.data);
                }
                EventManager.publish("StartPreLoadRes");
            });
        },
        loginCB: function (data) {
            console.log(data);
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
