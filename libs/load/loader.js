/**
 * by lijie 预加载资源 加载进度
 */
(function () {
    var preImg = "";
    var loadingTips = "";
    var loadImgBase64 = "";
    var Loader = {};
    Loader.Init = function () {
        //alert("进入loaderinit");
        preImg = document.querySelector("#hfloader-wrap");
        loadingTips = document.querySelector(".hfloading-tips");
        // preImg.style.backgroundImage = "url(loadImgBase64)" || none;
        Loader.startLoad();
        EventManager.publish("LoadInit");
    };
    Loader.setProgress = function (sTxt) {
        if (sTxt != "") {
            loadingTips.innerHTML = sTxt
        }
    };
    Loader.startLoad = function () {
        loadingTips.style.opacity = 1;
    };
    Loader.finishLoad = function () {

    };
    EventManager.subscribe("showMsg", function (txt) {
        Loader.setProgress(txt);
    });
    EventManager.subscribe('setProgress', function (itemsLoaded, itemsTotal) {
        var txt = '正在加载游戏资源...' + Math.floor(itemsLoaded / itemsTotal * 100) + '%';
        Loader.setProgress(txt);
        setTimeout(function () {
            preImg.style.display = "none";
        }, 2000);

    });
    document.addEventListener("DOMContentLoaded", Loader.Init, false);

})()