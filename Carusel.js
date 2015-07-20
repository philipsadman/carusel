extend(Carusel, Swipeable);

function Carusel (options) {
    this.el = options.el,

    this.animationDuration = options.animationDuration || 0;
    this.animationDelay = options.animationDelay || 0;

    this.startX = undefined;
    this.delta = undefined;
    this.timeout = undefined;
    this.marginLeft = 0;

    this.swipeStep = this.el.querySelector('.carusel-item').offsetWidth + 20;

    this.onMouseUp = this._onMouseUp.bind(this);
    this.onMouseMove = this._onMouseMove.bind(this);
    this.onMouseDown = this._onMouseDown.bind(this);

    this.init();
}
