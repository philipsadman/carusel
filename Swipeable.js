var Swipeable = function () {
    var startX = 0,
        delta = 0,
        marginLeft = 0,
        timeout = null;

    function Swipeable () {}

    Swipeable.prototype.setPosition = function (val) {
        this.el.style.marginLeft = val + 'px';
    }

    Swipeable.prototype._setTransition = function (delay, duration) {
        this.el.style.webkitTransitionDelay = delay + 'ms';
        this.el.style.webkitTransitionDuration = duration + 'ms';
    };

    Swipeable.prototype._onMouseMove = function (e) {
        delta = e.clientX - startX;

        if (Math.abs(delta) < this.swipeStep) {
            this.setPosition(marginLeft + delta);
        }
        else {
            this.onMouseUp();
        }
    };

    Swipeable.prototype._onMouseUp = function () {
        if (Math.abs(delta) > this.swipeStep / 2) {
            this._setTransition(this.animationDelay, this.animationDuration);
            marginLeft += delta > 0 ? this.swipeStep : -this.swipeStep;
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

        timeout = setTimeout(function() {
            this._setTransition(0, 0);
        }.bind(this), this.animationDelay + this.animationDuration);
    };

    Swipeable.prototype._onMouseDown = function (e) {
        clearTimeout(timeout);
        this._setTransition(0, 0);

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
