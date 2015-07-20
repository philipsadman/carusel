var Carusel = function () {
    // Carusel extends Swipeable
    extend(Carusel, Swipeable);

    function Carusel (options) {
        this.el = options.el,

        this.animationDuration = options.animationDuration || 0;
        this.animationDelay = options.animationDelay || 0;

        // Photo wrap width + 10 * 2 (margins)
        this.swipeStep = this.el.querySelector('.carusel-item').offsetWidth + 20;

        this.init();
    }

    return Carusel;
}();
