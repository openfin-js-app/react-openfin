import * as React from 'react';
import InputAdornment from '@material-ui/core/InputAdornment';

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
                _defaultValue:parseInt(process.env.REACT_APP_NEW_WINDOW_TOP,10),
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
                _defaultValue:parseInt(process.env.REACT_APP_NEW_WINDOW_LEFT,10),
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
                _defaultValue:parseInt(process.env.REACT_APP_NEW_WINDOW_WIDTH,10),
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
                _defaultValue:parseInt(process.env.REACT_APP_NEW_WINDOW_HEIGHT,10),
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
                _defaultValue:parseInt(process.env.REACT_APP_NEW_WINDOW_DELTA_LEFT,10),
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
                _defaultValue:parseInt(process.env.REACT_APP_NEW_WINDOW_DELTA_HEIGHT,10),
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
