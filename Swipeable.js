function Swipeable () {}

Swipeable.prototype.setPosition = function (val) {
    this.el.style.marginLeft = val + 'px';
}

Swipeable.prototype._setTransition = function (delay, duration) {
    this.el.style.webkitTransitionDelay = delay + 'ms';
    this.el.style.webkitTransitionDuration = duration + 'ms';
};

Swipeable.prototype._onMouseMove = function (e) {
    this.delta = e.clientX - this.startX;

    if (Math.abs(this.delta) < this.swipeStep) {
        this.setPosition(this.marginLeft + this.delta);
    }
    else {
        this.onMouseUp();
    }
};

Swipeable.prototype._onMouseUp = function () {
    if (Math.abs(this.delta) > this.swipeStep / 3) {
        this._setTransition(this.animationDelay, this.animationDuration);
        this.marginLeft += this.delta > 0 ? this.swipeStep : -this.swipeStep;
    }

    if (this.marginLeft > 0) {
        this.marginLeft = 0;
    }
    else if (this.marginLeft <= -this.el.offsetWidth) {
        this.marginLeft = -this.el.offsetWidth + this.swipeStep;
    }

    this.setPosition(this.marginLeft);

    document.removeEventListener('mouseup', this.onMouseUp);
    document.removeEventListener('mousemove', this.onMouseMove);

    this.timeout = setTimeout(function() {
        this._setTransition(0, 0);
    }.bind(this), this.animationDelay + this.animationDuration);
};

Swipeable.prototype._onMouseDown = function (e) {
    clearTimeout(this.timeout);
    this._setTransition(0, 0);

    this.startX = e.clientX;

    document.addEventListener('mouseup', this.onMouseUp);
    document.addEventListener('mousemove', this.onMouseMove);
};

Swipeable.prototype.init = function () {
    this.el.addEventListener('mousedown', this.onMouseDown);
};
