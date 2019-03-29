import * as React from 'react';
import InputAdornment from '@material-ui/core/InputAdornment';

import initState from '../../init';

import { IConfigTab, IConfigField, MuiTheme, FieldType } from './types';

const configTabs:IConfigTab[]=[
    {
        _order: 0 ,
        _label: 'application.label',
        _name:'application',
        _svgUrl: void 0,
        _fields:[
            {
                _type:FieldType.SUBHEADING,
                _label:'application.theme.label',
                _cols: 2,
                _rows:1,
            },
            {
                _type:FieldType.CUSTOM_FIELD,
                _label:'Theme',
                _custom:<React.Fragment/>,
                _name:'theme',
                _defaultValue:MuiTheme.DARK,
                _cols:10,
                _rows:1,
            },
            {
                _type:FieldType.SUBHEADING,
                _label:'application.language.label',
                _cols: 2,
                _rows:1,
            },
            {
                _type:FieldType.CUSTOM_FIELD,
                _label:'language',
                _custom:<React.Fragment/>,
                _name:'language',
                _defaultValue:'en-US',
                _cols:10,
                _rows:1,
            },
            {
                _type:FieldType.SUBHEADING,
                _label:'application.newWinPos.label',
                _cols: 12,
            },
            {
                _type:FieldType.NUMBER,
                _label:'application.newWinPos.newWinTop',
                _name:'newWinTop',
                _defaultValue:initState.config.newWindowTop,
                _props:{
                    InputProps:{
                        endAdornment:<InputAdornment position={'end'}>Pixel</InputAdornment>
                    }
                }
            },
            {
                _type:FieldType.NUMBER,
                _label:'application.newWinPos.newWinLeft',
                _name:'newWinLeft',
                _defaultValue:initState.config.newWindowLeft,
                _props:{
                    InputProps:{
                        endAdornment:<InputAdornment position={'end'}>Pixel</InputAdornment>
                    }
                }
            },
            {
                _type:FieldType.NUMBER,
                _label:'application.newWinPos.newWinWidth',
                _name:'newWinWidth',
                _defaultValue: initState.config.newWindowWidth,
                _props:{
                    InputProps:{
                        endAdornment:<InputAdornment position={'end'}>Pixel</InputAdornment>
                    }
                }
            },
            {
                _type:FieldType.NUMBER,
                _label:'application.newWinPos.newWinHeight',
                _name:'newWinHeight',
                _defaultValue:initState.config.newWindowHeight,
                _props:{
                    InputProps:{
                        endAdornment:<InputAdornment position={'end'}>Pixel</InputAdornment>
                    }
                }
            },
            {
                _type:FieldType.NUMBER,
                _label:'application.newWinPos.newWindDeltaLeft',
                _name:'newWindDeltaLeft',
                _defaultValue:initState.config.newWindowDeltaLeft,
                _props:{
                    InputProps:{
                        endAdornment:<InputAdornment position={'end'}>Pixel</InputAdornment>
                    }
                }
            },
            {
                _type:FieldType.NUMBER,
                _label:'application.newWinPos.newWindDeltaHeight',
                _name:'newWindDeltaHeight',
                _defaultValue:initState.config.newWindowDeltaHeight,
                _props:{
                    InputProps:{
                        endAdornment:<InputAdornment position={'end'}>Pixel</InputAdornment>
                    }
                }
            },
        ]
    },
    {
        _order: 1 ,
        _label: 'about.label',
        _name:'about',
        _svgUrl: void 0,
        _fields:[
            {
                _type:FieldType.CUSTOM_FIELD,
                _label:'About openfin starter',
                _custom:<React.Fragment/>,
                _cols:12,
                _rows:12,
            }
        ]
    }
];

export default configTabs;
