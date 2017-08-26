/**
 * by lijie 订阅者模式
 */
var EventManager = {
    listeners: {},
    guid: 0,
    subscribe: function (type, fn) {
        // alert("订阅开始")
        if (typeof this.listeners[type] === "undefined") {
            this.listeners[type] = [];
        }
        if (typeof fn === "function") {
            this.listeners[type].push(fn);
        }
        return this;
    },
    publish: function (type, data) {
        var arrayEvents = this.listeners[type];
        var arrayArgs = Array.prototype.slice.call(arguments, 1);
        if (arrayEvents instanceof Array) {
            for (var i = 0; i < arrayEvents.length; i++) {
                var method = arrayEvents[i];
                if (typeof method === "function") {
                    method.apply(this, arrayArgs);
                }
            }
            return this;
        }
    }
};