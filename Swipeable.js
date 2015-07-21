var Swipeable = function () {
    extend(Swipeable, EventEmitter);

    var startX = 0,
        delta = 0,
        marginLeft = 0,
        timeout = null;

    function Swipeable () {}

    Swipeable.prototype.setPosition = function (val) {
        this.el.style.marginLeft = val + 'px';
    };

    Swipeable.prototype._onMouseMove = function (e) {
        delta = e.clientX - startX;

        // Move item until mouseup event would not fire or until the end of border of next item
        if (Math.abs(delta) < this.swipeStep) {
            this.setPosition(marginLeft + delta);
        }
        else {
            this.onMouseUp();
        }
    };

    Swipeable.prototype._onMouseUp = function () {
        if (Math.abs(delta) > this.swipeStep / 2) {
            marginLeft += delta > 0 ? this.swipeStep : -this.swipeStep;
            this.trigger('swipeSuccess', marginLeft);
        }
        else {
            this.trigger('swipeFail');
        }

        if (marginLeft > 0) {
            marginLeft = 0;
        }
        else if (marginLeft <= -this.el.offsetWidth) {
            marginLeft = -this.el.offsetWidth + this.swipeStep;
        }

        this.setPosition(marginLeft);

        document.removeEventListener('mouseup', this.onMouseUp);
        document.removeEventListener('mousemove', this.onMouseMove);
    };

    Swipeable.prototype._onMouseDown = function (e) {
        this.trigger('swipeStart');
        clearTimeout(timeout);

        startX = e.clientX;

        document.addEventListener('mouseup', this.onMouseUp);
        document.addEventListener('mousemove', this.onMouseMove);
    };

    Swipeable.prototype.init = function () {
        // defining these methods to save content and to store links to be able remove event listeners in future
        this.onMouseUp = this._onMouseUp.bind(this);
        this.onMouseMove = this._onMouseMove.bind(this);
        this.onMouseDown = this._onMouseDown.bind(this);

        this.el.addEventListener('mousedown', this.onMouseDown);
    };

    return Swipeable;
}();
