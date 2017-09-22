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
            var self = this;
            var params = this.GetParams();
            this.Token = params["token"] || "";

            if (typeof this.Token == "undefined" || this.Token == "") {
                //alert("登陆失败,缺少参数");
                EventManager.publish("showMsg", "登录失败,缺少参数");
                return;
            }

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
                    var data = result.data;
                    self.storageGameInfo(data);
                } else {
                    EventManager.publish("showMsg", "对不起,请先登陆官网再开始游戏");
                }
                EventManager.subscribe("testLocalStoage", function () {
                    alert(localStorage.player_id);
                });
                
                wsConnection.initWS(localStorage.player_id);
            }).fail(function () {
                EventManager.publish("showMsg", "对不起,游戏加载出错,请重新启动客户端");
                return;
            });
        },
        storageGameInfo: function (data) {
            //alert(1);
            var s_id = data["gos_session_id"];
            var p_id = data["gos_player_id"];
            if (typeof s_id == "undefined" || s_id == "" || typeof p_id == "undefined" || p_id == "") {
                EventManager.publish("showMsg", "对不起,获取用户信息出错");
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
        },
        loginCB: function (data) {
            console.log(data);
        },
        testLocalStoage: function () {
            alert(localStorage.player_id);
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
