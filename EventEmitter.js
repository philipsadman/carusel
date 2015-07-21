var EventEmitter = function () {
    var events = {};

    function EventEmitter () {}

    EventEmitter.prototype.on = function (eventName, handler) {
        if (!events[eventName]) events[eventName] = [];
        events[eventName].push(handler);

        return this;
    };

    EventEmitter.prototype.trigger = function (eventName, data) {
        events[eventName].forEach(function (handler) {
            handler(data);
        });

        return this;
    };

    return EventEmitter;
}();
