"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var inline_editor_component_1 = require("./inline-editor.component");
var InlineEditorModule = (function () {
    function InlineEditorModule() {
    }
    return InlineEditorModule;
}());
InlineEditorModule = __decorate([
    core_1.NgModule({
        imports: [common_1.CommonModule, forms_1.FormsModule],
        declarations: [inline_editor_component_1.InlineEditorComponent].concat(inline_editor_component_1.InputComponets),
        exports: [inline_editor_component_1.InlineEditorComponent]
    })
], InlineEditorModule);
exports.InlineEditorModule = InlineEditorModule;
//# sourceMappingURL=module.js.map