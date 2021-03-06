import {
    Component,
    ComponentFactoryResolver,
    ComponentRef,
    EventEmitter,
    forwardRef,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
    ViewChild,
    ViewContainerRef
} from '@angular/core';

import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {InputConfig, InputType} from './input-config';
import {InputTextComponent} from './inputs/input-text.component';
import {InputNumberComponent} from './inputs/input-number.component';
import {InputBase} from './inputs/input-base';
import {InputPasswordComponent} from './inputs/input-password.component';
import {InputRangeComponent} from './inputs/input-range.component';
import {InputTextareaComponent} from './inputs/input-textarea.component';
import {InputSelectComponent} from './inputs/input-select.component';

export const InputComponets = [
    InputTextComponent,
    InputNumberComponent,
    InputPasswordComponent,
    InputRangeComponent,
    InputTextareaComponent,
    InputSelectComponent,
];

// TO-DO Default's value
const inputConfig: InputConfig = {
    empty: 'empty',
    placeholder: '',
    type: 'text',
    disabled: false,
    name: '',
    size: 8,
    min: 1,
    pattern: '',
    max: Infinity,
    fnErrorLength: new EventEmitter(),
    fnErrorPattern: new EventEmitter(),
    validationMessage: '',
    textClass: '',
};

const NUMERIC_TYPES: InputType[] = ['range', 'number'];

@Component({
    selector: 'inline-editor',
    template: `
      <div>
        <div id="inlineEditWrapper">
          <a [ngClass]="{'editable-empty': isEmpty }" class="{{textClass}}" (click)="edit(value)"
             [hidden]="editing && !disabled">{{ showText() }}</a>
          <div class="inlineEditForm form-inline" [hidden]="!editing || disabled">
            <div class="form-group">
              <div #container></div>
              <span class="inline-editor-button-group">
                                <button id="inline-editor-button-save" class="btn btn-xs btn-primary"
                                        (click)="onSubmit(value)"><span class="fa fa-check"></span></button>
                                <button class="btn btn-xs btn-danger" (click)="cancel(value)"><span
                                    class="fa fa-remove"></span> </button>
                            </span>
            </div>
          </div>
        </div>
        <label *ngIf="!isValid && editing" style="font-size:12px;color: #dd5826;">{{validationMessage}}</label>
      </div>`,
    styles: [`a {
        text-decoration: none;
        color: #428bca;
        border-bottom: dashed 1px #428bca;
        cursor: pointer;
        line-height: 2;
        margin-right: 5px;
        margin-left: 5px;
        white-space: pre-wrap;
    }

    /* editable-empty */

    .editable-empty,
    .editable-empty:hover,
    .editable-empty:focus,
    a.editable-empty,
    a.editable-empty:hover,
    a.editable-empty:focus {
        font-style: italic;
        color: #DD1144;
        text-decoration: none;
    }

    .inlineEditForm {
        display: inline-block;
        white-space: nowrap;
        margin: 0;
    }

    #inlineEditWrapper {
        display: inline-block;
    }

    .inlineEditForm input,
    select {
        width: auto;
        display: inline;
    }

    .inline-editor-button-group {
        display: inline-block;
    }

    .editInvalid {
        color: #a94442;
        margin-bottom: 0;
    }

    .error {
        border-color: #a94442;
    }

    [hidden] {
        display: none;
    }`],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => InlineEditorComponent),
        multi: true,
    }],
    entryComponents: InputComponets,
})
export class InlineEditorComponent implements OnInit, OnChanges, ControlValueAccessor {

    // Inputs implemented
    private components: { [key: string]: any } = {
        text: InputTextComponent,
        number: InputNumberComponent,
        password: InputPasswordComponent,
        range: InputRangeComponent,
        textarea: InputTextareaComponent,
        select: InputSelectComponent,
    };

    ngOnChanges(changes: SimpleChanges) {
        const type = changes['type'];
        if (type) {
            this.generateComponent(type.currentValue);
        }
    }

    private getComponentType(typeName: InputType): any {
        const type = this.components[typeName];

        if (!type) {
            throw new Error('That type does not exist or it is not implemented yet!');
        }

        return type;
    }

    @Input() public type: InputType;

    @Output() public onSave: EventEmitter<any> = new EventEmitter();
    @Output() public onEdit: EventEmitter<any> = new EventEmitter();
    @Output() public onCancel: EventEmitter<any> = new EventEmitter();


    // input's attribute
    @Input() public empty: string;
    @Input() public disabled: boolean;
    @Input() public required: boolean;
    @Input() public placeholder: string;
    @Input() public name: string;
    @Input() public size: number;
    @Input() public min: number;
    @Input() public max: number;
    @Input() public pattern: string;
    @Input() public validationMessage: string;
    @Input() public textClass: string;
    // TO DO: This must be outputs events emitter
    @Output() public fnErrorLength = new EventEmitter<any>();
    @Output() public fnErrorPattern = new EventEmitter<any>();


    //textarea's attribute
    @Input() public cols: number = 50;
    @Input() public rows: number = 4;

    // select's attribute
    @Input()
    set options(options) {
        if (options['data'] === undefined) {
            this._options = {};
            this._options['data'] = options;
            this._options['value'] = 'value';
            this._options['text'] = 'text';
        } else {
            this._options = options;
        }
    }

    get options() {
        return this._options;
    }

    // @Output() public selected:EventEmitter<any> = new EventEmitter();

    public onChange: Function;
    public onTouched: Function;

    private _value: string = '';
    private preValue: string = '';
    private editing: boolean = false;
    public isEmpty: boolean = false;
    public isValid: boolean = true;
    private _options;

    public get value(): any {
        return this._value;
    };

    public set value(newValue: any) {
        if (newValue !== this._value) {
            this._value = newValue;
            this.onChange(newValue);
        }
    }

    constructor(public componentFactoryResolver: ComponentFactoryResolver) {
    }

    private componentRef: ComponentRef<{}>;

    @ViewChild('container', {read: ViewContainerRef})
    private container: ViewContainerRef;
    private inputInstance: InputBase;

    ngOnInit() {
        if (this.type) {
            this.initializeProperties();
        }
    }

    private generateComponent(type: InputType) {
        const componentType = this.getComponentType(type);
        this.inputInstance = this.createInputInstance(componentType);
        this.inputInstance.setContext(this);
    }

    private createInputInstance(componentType): InputBase {
        const factory = this.componentFactoryResolver.resolveComponentFactory(componentType);
        this.componentRef = this.container.createComponent(factory);

        return <InputBase>this.componentRef.instance;
    }

    public initializeProperties(): void {
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
    }

    writeValue(value: any): void {
        if (value || value === 0) {
            this.value = value;
            this.isEmpty = false;
        } else {

            /*if (this.type === "select") {
             this.empty = this.options.data[0][this.options.value];
             }*/
            //this._value = this.empty;
            this.isEmpty = true;
        }
    }

    public registerOnChange(fn: Function): void {
        this.onChange = fn;
    }

    public registerOnTouched(fn: Function): void {
        this.onTouched = fn;
    };

    // Method to display the inline edit form and hide the <a> element
    edit(value): void {
        this.preValue = value;  // Store original value in case the form is cancelled
        this.editing = true;
        this.inputInstance.focus();
        this.onEdit.emit(this);
    }

    // Method to display the editable value as text and emit save event to host
    onSubmit(value): void {
        if (this.pattern && this.inputInstance.isRegexTestable && !new RegExp(this.pattern).test(value)) {
            this.isValid = false;
            return this.fnErrorPattern.emit(this)
        }

        const length = this.inputInstance.isNumeric ? Number(value) : value.length;

        if (length < this.min || length > this.max) {
            this.isValid = false;
            return this.fnErrorLength.emit(this)
        }

        this.editing = false;
        this.isEmpty = false;
        this.isValid = true;
        this.onSave.emit(this);
    }

    // Method to reset the editable value
    cancel(value: any): void {
        this.value = this.preValue;
        this.editing = false;
        this.isValid = this.preValue != '';

        this.onCancel.emit(this);
    }

    private initProperty(property: string): void {
        this[property] = typeof this[property] !== 'undefined'
            ? this[property]
            : inputConfig[property];
    }

    public showText(): any {
        return this.inputInstance.getPlaceholder();
    }
}
