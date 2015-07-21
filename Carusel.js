var Carusel = function () {
    var timeout = null;

    // Carusel extends Swipeable
    extend(Carusel, Swipeable);

    function Carusel (options) {
        this.el = options.el,

        this.animationDuration = options.animationDuration || 0;
        this.animationDelay = options.animationDelay || 0;

        // Photo wrap width + 10 * 2 (margins)
        this.swipeStep = this.el.querySelector('.carusel-item').offsetWidth + 20;

        this.init();

        this.on('swipeStart', function (marginLeft) {
            this._setTransition(0, 0);
        }.bind(this));

        this.on('swipeSuccess', handleSwipeFinish.bind(this));

        this.on('swipeFail', handleSwipeFinish.bind(this));

        function handleSwipeFinish (marginLeft) {
            this._setTransition(this.animationDelay, this.animationDuration);
            this.setPosition(marginLeft);
        }
    }

    Carusel.prototype._setTransition = function (delay, duration) {
        if (duration > 0) {
            console.log(1)
            timeout = setTimeout(function() {
                this._setTransition(0, 0);
            }.bind(this), this.animationDelay + this.animationDuration);
        }
        else {
            console.log(2)
            clearTimeout(timeout);
        }

        this.el.style.webkitTransitionDelay = delay + 'ms';
        this.el.style.webkitTransitionDuration = duration + 'ms';
    };

    return Carusel;
}();
