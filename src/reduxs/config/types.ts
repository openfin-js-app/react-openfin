import { SvgIconProps } from '@material-ui/core/SvgIcon';
import { TextFieldProps } from '@material-ui/core/TextField';

export enum MuiTheme{
    LIGHT='light',
    DARK='dark',
}

export type I18Language =
    'en-US' |
    'en-GB' |
    'en-CA' |
    'zh-CN' |
    'zh-HK' |
    'de-DE' |
    'fr-FR' |
    'es-ES' |
    string;

export enum FieldType{
    CUSTOM_FIELD = 1,
    STRING = 2,
    DATETIME = 3,
    DATE = 4,
    TIME = 5,
    NUMBER = 6,
    CURRENCY = 7,
    TITLE = 8,
    SUBHEADING = 9,
    BODY1 = 10,
}

export interface IConfigField {
    _type:FieldType;
    _label:string;
    _name?:string;
    _defaultValue?:any;
    _cols?:number;
    _rows?:number;
    _props?:TextFieldProps|any;
    _custom?:any;
    [key:string]:any;
    [key:number]:any;
}

export interface IConfigTab {
    _order?:number;
    _label:string;
    _name:string;
    _svgUrl:string;
    _svgUrl_dark?:string;
    _icon?:React.ComponentType<SvgIconProps>;
    _fields:IConfigField[];
    _fieldLabels?:string;
    [key:string]:any;
    [key:number]:any;
}

export interface IConfigDexie {
    id?:number,
    tabName:string,
    fieldName:string,
    value:any,
    version?:number,
}

export interface IConfigResetOption {
    tabName?:string
}

export interface IConfigUpdateOneFieldOption {
    name:string,
    value:any,
}

export interface IConfigSelectOneFieldOption {
    tabName:string,
    fieldName:string,
    userObj?:any,
}

export interface IConfigSelectOneFieldResPayload extends IConfigSelectOneFieldOption {
    value:any,
}

export interface IConfigRemoveOneFieldOption {
    tabName:string,
    fieldName:string,
    value?:any,
}

export interface IConfigDoUpdateOneFieldOption {
    tabName:string,
    fieldName:string,
    value:any,
}

export interface IConfigRuntimeState{
    application?:Partial<{
        theme:MuiTheme,
        language:I18Language,
        newWinTop:number,
        newWinLeft:number,
        newWinWidth:number,
        newWinHeight:number,
        newWindDeltaLeft:number,
        newWindDeltaHeight:number,
    }>
}

export interface IConfigState extends Partial<IConfigRuntimeState>{
    configGlobalFilterString:string;
    _tabs:IConfigTab[];
    [key:string]:any;
    [key:number]:any;
}