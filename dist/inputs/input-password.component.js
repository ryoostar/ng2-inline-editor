"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var input_base_1 = require("./input-base");
var InputPasswordComponent = (function (_super) {
    __extends(InputPasswordComponent, _super);
    function InputPasswordComponent(renderer) {
        var _this = _super.call(this, renderer) || this;
        _this.isRegexTestable = true;
        return _this;
    }
    InputPasswordComponent.prototype.ngOnInit = function () {
        this.inputElement = this.inputRef.nativeElement;
    };
    InputPasswordComponent.prototype.getPlaceholder = function () {
        return "*****";
    };
    return InputPasswordComponent;
}(input_base_1.InputBase));
__decorate([
    core_1.ViewChild('inputRef'),
    __metadata("design:type", core_1.ElementRef)
], InputPasswordComponent.prototype, "inputRef", void 0);
InputPasswordComponent = __decorate([
    core_1.Component({
        selector: 'inline-editor-password',
        styles: ["a {\n    text-decoration: none;\n    color: #428bca;\n    border-bottom: dashed 1px #428bca;\n    cursor: pointer;\n    line-height: 2;\n    margin-right: 5px;\n    margin-left: 5px;\n}\n\n\n/* editable-empty */\n\n.editable-empty,\n.editable-empty:hover,\n.editable-empty:focus,\na.editable-empty,\na.editable-empty:hover,\na.editable-empty:focus {\n    font-style: italic;\n    color: #DD1144;\n    text-decoration: none;\n}\n\n.inlineEditForm {\n    display: inline-block;\n    white-space: nowrap;\n    margin: 0;\n}\n\n#inlineEditWrapper {\n    display: inline-block;\n}\n\n.inlineEditForm input,\nselect {\n    width: auto;\n    display: inline;\n}\n\n.editInvalid {\n    color: #a94442;\n    margin-bottom: 0;\n}\n\n.error {\n    border-color: #a94442;\n}\n\n[hidden] {\n    display: none;\n}"],
        template: "<input #inputRef type=\"password\" class=\"form-control\" [(ngModel)]=\"context.value\" [required]=\"context.required\"\n                      [disabled]=\"context.disabled\" [name]=\"context.name\" [placeholder]=\"context.placeholder\" [size]=\"context.size\"\n                      [maxlength]=\"context.size\"/>"
    }),
    __metadata("design:paramtypes", [core_1.Renderer])
], InputPasswordComponent);
exports.InputPasswordComponent = InputPasswordComponent;
//# sourceMappingURL=input-password.component.js.map