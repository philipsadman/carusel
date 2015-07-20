function extend (Child, Parent) {
    var f = function () {};

    f.prototype = Parent.prototype;

    Child.prototype = new f();
    Child.prototype.constructor = Child;
}
