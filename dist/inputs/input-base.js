"use strict";
var InputBase = (function () {
    function InputBase(renderer) {
        this.renderer = renderer;
        this.isNumeric = false;
        this.isRegexTestable = false;
    }
    InputBase.prototype.setContext = function (_context) {
        this.context = _context;
    };
    InputBase.prototype.getPlaceholder = function () {
        return (this.context.isEmpty) ? this.context.empty : this.context.value;
    };
    InputBase.prototype.focus = function () {
        var _this = this;
        setTimeout(function () { return _this.renderer.invokeElementMethod(_this.inputElement, 'focus', []); });
    };
    return InputBase;
}());
exports.InputBase = InputBase;
//# sourceMappingURL=input-base.js.map