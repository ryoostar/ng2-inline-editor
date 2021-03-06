export declare type InputType = 'text' | 'number' | 'select' | 'range' | 'textarea';
export interface SelectOptions {
    data: {
        value: string;
        text: string;
        children?: SelectOptions;
    }[];
    value: string;
    text: string;
}
export interface InputConfig {
    value?: string;
    isEmpty?: boolean;
    options?: SelectOptions;
    required?: boolean;
    empty: string;
    placeholder: string;
    type: InputType;
    disabled: boolean;
    name: string;
    size: number;
    min: number;
    max: number;
    pattern: string;
    fnErrorLength: any;
    fnErrorPattern: any;
    validationMessage: string;
    textClass: string;
}
