"use strict";
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
var forms_1 = require("@angular/forms");
var input_text_component_1 = require("./inputs/input-text.component");
var input_number_component_1 = require("./inputs/input-number.component");
var input_password_component_1 = require("./inputs/input-password.component");
var input_range_component_1 = require("./inputs/input-range.component");
var input_textarea_component_1 = require("./inputs/input-textarea.component");
var input_select_component_1 = require("./inputs/input-select.component");
exports.InputComponets = [
    input_text_component_1.InputTextComponent,
    input_number_component_1.InputNumberComponent,
    input_password_component_1.InputPasswordComponent,
    input_range_component_1.InputRangeComponent,
    input_textarea_component_1.InputTextareaComponent,
    input_select_component_1.InputSelectComponent,
];
var inputConfig = {
    empty: 'empty',
    placeholder: '',
    type: 'text',
    disabled: false,
    name: '',
    size: 8,
    min: 1,
    pattern: '',
    max: Infinity,
    fnErrorLength: new core_1.EventEmitter(),
    fnErrorPattern: new core_1.EventEmitter(),
    validationMessage: '',
    textClass: '',
};
var NUMERIC_TYPES = ['range', 'number'];
var InlineEditorComponent = InlineEditorComponent_1 = (function () {
    function InlineEditorComponent(componentFactoryResolver) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.components = {
            text: input_text_component_1.InputTextComponent,
            number: input_number_component_1.InputNumberComponent,
            password: input_password_component_1.InputPasswordComponent,
            range: input_range_component_1.InputRangeComponent,
            textarea: input_textarea_component_1.InputTextareaComponent,
            select: input_select_component_1.InputSelectComponent,
        };
        this.onSave = new core_1.EventEmitter();
        this.onEdit = new core_1.EventEmitter();
        this.onCancel = new core_1.EventEmitter();
        this.fnErrorLength = new core_1.EventEmitter();
        this.fnErrorPattern = new core_1.EventEmitter();
        this.cols = 50;
        this.rows = 4;
        this._value = '';
        this.preValue = '';
        this.editing = false;
        this.isEmpty = false;
        this.isValid = true;
    }
    InlineEditorComponent.prototype.ngOnChanges = function (changes) {
        var type = changes['type'];
        if (type) {
            this.generateComponent(type.currentValue);
        }
    };
    InlineEditorComponent.prototype.getComponentType = function (typeName) {
        var type = this.components[typeName];
        if (!type) {
            throw new Error('That type does not exist or it is not implemented yet!');
        }
        return type;
    };
    Object.defineProperty(InlineEditorComponent.prototype, "options", {
        get: function () {
            return this._options;
        },
        set: function (options) {
            if (options['data'] === undefined) {
                this._options = {};
                this._options['data'] = options;
                this._options['value'] = 'value';
                this._options['text'] = 'text';
            }
            else {
                this._options = options;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InlineEditorComponent.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (newValue) {
            if (newValue !== this._value) {
                this._value = newValue;
                this.onChange(newValue);
            }
        },
        enumerable: true,
        configurable: true
    });
    ;
    InlineEditorComponent.prototype.ngOnInit = function () {
        if (this.type) {
            this.initializeProperties();
        }
    };
    InlineEditorComponent.prototype.generateComponent = function (type) {
        var componentType = this.getComponentType(type);
        this.inputInstance = this.createInputInstance(componentType);
        this.inputInstance.setContext(this);
    };
    InlineEditorComponent.prototype.createInputInstance = function (componentType) {
        var factory = this.componentFactoryResolver.resolveComponentFactory(componentType);
        this.componentRef = this.container.createComponent(factory);
        return this.componentRef.instance;
    };
    InlineEditorComponent.prototype.initializeProperties = function () {
        this.initProperty('type');
        this.initProperty('disabled');
        this.initProperty('placeholder');
        this.initProperty('empty');
        this.initProperty('name');
        this.initProperty('size');
        this.initProperty('min');
        this.initProperty('max');
        this.initProperty('pattern');
        this.initProperty('fnErrorLength');
        this.initProperty('fnErrorPattern');
        this.initProperty('validationMessage');
        this.initProperty('textClass');
    };
    InlineEditorComponent.prototype.writeValue = function (value) {
        if (value || value === 0) {
            this.value = value;
            this.isEmpty = false;
        }
        else {
            this.isEmpty = true;
        }
    };
    InlineEditorComponent.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    InlineEditorComponent.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    ;
    InlineEditorComponent.prototype.edit = function (value) {
        this.preValue = value;
        this.editing = true;
        this.inputInstance.focus();
        this.onEdit.emit(this);
    };
    InlineEditorComponent.prototype.onSubmit = function (value) {
        if (this.pattern && this.inputInstance.isRegexTestable && !new RegExp(this.pattern).test(value)) {
            this.isValid = false;
            return this.fnErrorPattern.emit(this);
        }
        var length = this.inputInstance.isNumeric ? Number(value) : value.length;
        if (length < this.min || length > this.max) {
            this.isValid = false;
            return this.fnErrorLength.emit(this);
        }
        this.editing = false;
        this.isEmpty = false;
        this.isValid = true;
        this.onSave.emit(this);
    };
    InlineEditorComponent.prototype.cancel = function (value) {
        this.value = this.preValue;
        this.editing = false;
        this.isValid = this.preValue != '';
        this.onCancel.emit(this);
    };
    InlineEditorComponent.prototype.initProperty = function (property) {
        this[property] = typeof this[property] !== 'undefined'
            ? this[property]
            : inputConfig[property];
    };
    InlineEditorComponent.prototype.showText = function () {
        return this.inputInstance.getPlaceholder();
    };
    return InlineEditorComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], InlineEditorComponent.prototype, "type", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], InlineEditorComponent.prototype, "onSave", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], InlineEditorComponent.prototype, "onEdit", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], InlineEditorComponent.prototype, "onCancel", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], InlineEditorComponent.prototype, "empty", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], InlineEditorComponent.prototype, "disabled", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], InlineEditorComponent.prototype, "required", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], InlineEditorComponent.prototype, "placeholder", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], InlineEditorComponent.prototype, "name", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], InlineEditorComponent.prototype, "size", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], InlineEditorComponent.prototype, "min", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], InlineEditorComponent.prototype, "max", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], InlineEditorComponent.prototype, "pattern", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], InlineEditorComponent.prototype, "validationMessage", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], InlineEditorComponent.prototype, "textClass", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], InlineEditorComponent.prototype, "fnErrorLength", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], InlineEditorComponent.prototype, "fnErrorPattern", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], InlineEditorComponent.prototype, "cols", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], InlineEditorComponent.prototype, "rows", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], InlineEditorComponent.prototype, "options", null);
__decorate([
    core_1.ViewChild('container', { read: core_1.ViewContainerRef }),
    __metadata("design:type", core_1.ViewContainerRef)
], InlineEditorComponent.prototype, "container", void 0);
InlineEditorComponent = InlineEditorComponent_1 = __decorate([
    core_1.Component({
        selector: 'inline-editor',
        template: "\n      <div>\n        <div id=\"inlineEditWrapper\">\n          <a [ngClass]=\"{'editable-empty': isEmpty }\" class=\"{{textClass}}\" (click)=\"edit(value)\"\n             [hidden]=\"editing && !disabled\">{{ showText() }}</a>\n          <div class=\"inlineEditForm form-inline\" [hidden]=\"!editing || disabled\">\n            <div class=\"form-group\">\n              <div #container></div>\n              <span class=\"inline-editor-button-group\">\n                                <button id=\"inline-editor-button-save\" class=\"btn btn-xs btn-primary\"\n                                        (click)=\"onSubmit(value)\"><span class=\"fa fa-check\"></span></button>\n                                <button class=\"btn btn-xs btn-danger\" (click)=\"cancel(value)\"><span\n                                    class=\"fa fa-remove\"></span> </button>\n                            </span>\n            </div>\n          </div>\n        </div>\n        <label *ngIf=\"!isValid && editing\" style=\"font-size:12px;color: #dd5826;\">{{validationMessage}}</label>\n      </div>",
        styles: ["a {\n        text-decoration: none;\n        color: #428bca;\n        border-bottom: dashed 1px #428bca;\n        cursor: pointer;\n        line-height: 2;\n        margin-right: 5px;\n        margin-left: 5px;\n        white-space: pre-wrap;\n    }\n\n    /* editable-empty */\n\n    .editable-empty,\n    .editable-empty:hover,\n    .editable-empty:focus,\n    a.editable-empty,\n    a.editable-empty:hover,\n    a.editable-empty:focus {\n        font-style: italic;\n        color: #DD1144;\n        text-decoration: none;\n    }\n\n    .inlineEditForm {\n        display: inline-block;\n        white-space: nowrap;\n        margin: 0;\n    }\n\n    #inlineEditWrapper {\n        display: inline-block;\n    }\n\n    .inlineEditForm input,\n    select {\n        width: auto;\n        display: inline;\n    }\n\n    .inline-editor-button-group {\n        display: inline-block;\n    }\n\n    .editInvalid {\n        color: #a94442;\n        margin-bottom: 0;\n    }\n\n    .error {\n        border-color: #a94442;\n    }\n\n    [hidden] {\n        display: none;\n    }"],
        providers: [{
                provide: forms_1.NG_VALUE_ACCESSOR,
                useExisting: core_1.forwardRef(function () { return InlineEditorComponent_1; }),
                multi: true,
            }],
        entryComponents: exports.InputComponets,
    }),
    __metadata("design:paramtypes", [core_1.ComponentFactoryResolver])
], InlineEditorComponent);
exports.InlineEditorComponent = InlineEditorComponent;
var InlineEditorComponent_1;
//# sourceMappingURL=inline-editor.component.js.map