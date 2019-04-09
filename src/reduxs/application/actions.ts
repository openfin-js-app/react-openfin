import { createAction } from 'redux-actions';
import {WindowOptions} from 'redux-openfin';

import makeType, {makeReqType, makeResType} from '../../utils/makeType'

import {
    IReadyPayload,
    IApplicationNewSnackbarOption, IApplicationCloseSnackBarOption
} from './types';
import * as React from "react";

// application general
export const APPLICATION_SET_LOADING_MSG        = makeReqType('APPLICATION_SET_LOADING_MSG');
// app
export const APPLICATION_START                  = makeReqType('APPLICATION_START');
export const APPLICATION_AWAIT                  = makeResType('APPLICATION_AWAIT');
export const APPLICATION_READY                  = makeReqType('APPLICATION_READY');
export const APPLICATION_STARTED                = makeResType('APPLICATION_STARTED');
// child win
export const APPLICATION_CHILD_START            = makeReqType('APPLICATION_CHILD_START');
export const APPLICATION_CHILD_AWAIT            = makeResType('APPLICATION_CHILD_AWAIT');
export const APPLICATION_CHILD_READY            = makeReqType('APPLICATION_CHILD_READY');
export const APPLICATION_CHILD_STARTED          = makeResType('APPLICATION_CHILD_STARTED');
// notification win
export const APPLICATION_NOTIFICATION_START     = makeReqType('APPLICATION_NOTIFICATION_START');
export const APPLICATION_NOTIFICATION_AWAIT     = makeResType('APPLICATION_NOTIFICATION_AWAIT');
export const APPLICATION_NOTIFICATION_READY     = makeReqType('APPLICATION_NOTIFICATION_READY');
export const APPLICATION_NOTIFICATION_STARTED   = makeResType('APPLICATION_NOTIFICATION_STARTED');
// ---- ----
export const APPLICATION_DRAWER_TOGGLE          = makeReqType('APPLICATION_DRAWER_TOGGLE');
export const APPLICATION_TOGGLE_WINDOW_STATE    = makeReqType('APPLICATION_TOGGLE_WINDOW_STATE');


export const APPLICATION_CUR_WIN_CLOSING        = makeResType('APPLICATION_CUR_WIN_CLOSING');
export const APPLICATION_CUR_WIN_READY_TO_CLOSE = makeReqType('APPLICATION_CUR_WIN_READY_TO_CLOSE');

export const applicationSetLoadingMsg
    = createAction<{loadingMsg:string},string>(APPLICATION_SET_LOADING_MSG,(loadingMsg:string)=>({loadingMsg}));

export const applicationStart
    = createAction<void>(APPLICATION_START);
export const applicationAwait
    = createAction<void>(APPLICATION_AWAIT);
export const applicationReady
    = createAction<IReadyPayload,IReadyPayload>(APPLICATION_READY,(option:IReadyPayload)=>(option));
export const applicationStarted
    = createAction<void>(APPLICATION_STARTED);

export const applicationChildStart
    = createAction<void>(APPLICATION_CHILD_START);
export const applicationChildAwait
    = createAction<void>(APPLICATION_CHILD_AWAIT);
export const applicationChildReady
    = createAction<IReadyPayload,IReadyPayload>(APPLICATION_CHILD_READY,(option:IReadyPayload)=>(option));
export const applicationChildStarted
    = createAction<void>(APPLICATION_CHILD_STARTED);

export const applicationNotificationStart
    = createAction<void>(APPLICATION_NOTIFICATION_START);
export const applicationNotificationAwait
    = createAction<void>(APPLICATION_NOTIFICATION_AWAIT);
export const applicationNotificationReady
    = createAction<IReadyPayload,IReadyPayload>(APPLICATION_NOTIFICATION_READY,(option:IReadyPayload)=>(option));
export const applicationNotificationStarted
    = createAction<void>(APPLICATION_NOTIFICATION_STARTED);

export const applicationDrawerToggle
    = createAction<void>(APPLICATION_DRAWER_TOGGLE);
export const applicationToggleWindowState
    = createAction<void>(APPLICATION_TOGGLE_WINDOW_STATE);

export const applicationCurWinClosing
    = createAction<void>(APPLICATION_CUR_WIN_CLOSING);
export const applicationCurWinReadyToClose
    = createAction<void>(APPLICATION_CUR_WIN_READY_TO_CLOSE);

// snackbar

export const APPLICATION_NEW_SNACKBAR               = makeReqType('APPLICATION_NEW_SNACKBAR');
export const APPLICATION_SET_SNACKBAR_STATUS        = makeReqType('APPLICATION_SET_SNACKBAR_STATUS');
export const APPLICATION_PROCESS_SNACKBAR_QUEUE     = makeReqType('APPLICATION_PROCESS_SNACKBAR_QUEUE');
export const APPLICATION_CLOSE_SNACKBAR             = makeReqType('APPLICATION_CLOSE_SNACKBAR');

export const applicationNewSnackbar
    = createAction<IApplicationNewSnackbarOption,IApplicationNewSnackbarOption>(APPLICATION_NEW_SNACKBAR, (option:IApplicationNewSnackbarOption)=>(option));
export const applicationSetSnackbarStatus
    = createAction<{snackBarOpen:boolean},boolean>(APPLICATION_SET_SNACKBAR_STATUS, (snackBarOpen:boolean)=>({snackBarOpen}));
export const applicationProcessSnackbarQueue
    = createAction<void>(APPLICATION_PROCESS_SNACKBAR_QUEUE);
export const applicationCloseSnackbar
    = createAction<{event:React.SyntheticEvent<any>,reason:string},React.SyntheticEvent<any>, string>(
        APPLICATION_CLOSE_SNACKBAR, (event: React.SyntheticEvent<any>, reason: string)=>({event,reason})
);


// snap dock
export const APPLICATION_UPDATE_DOCK_STATUS             = makeType('APPLICATION_UPDATE_DOCK_STATUS');
export const applicationUpdateDockStatus
    = createAction<{docked},boolean>(APPLICATION_UPDATE_DOCK_STATUS, (docked:boolean)=>({docked}));

// launch bar
export const APPLICATION_LAUNCH_BAR_TOGGLE              = makeReqType('APPLICATION_LAUNCH_BAR_TOGGLE');
export const APPLICATION_LAUNCH_BAR_TOGGLE_COLLAPSE     = makeReqType('APPLICATION_LAUNCH_BAR_TOGGLE_COLLAPSE');
export const APPLICATION_LAUNCH_NEW_WINDOW              = makeReqType('APPLICATION_LAUNCH_NEW_WINDOW');
export const APPLICATION_LAUNCH_BAR_CLOSE               = makeReqType('APPLICATION_LAUNCH_BAR_CLOSE');
export const applicationLaunchBarToggle
    = createAction<void>(APPLICATION_LAUNCH_BAR_TOGGLE);
export const applicationLaunchBarToggleCollapse
    = createAction<void>(APPLICATION_LAUNCH_BAR_TOGGLE_COLLAPSE);
export const applicationLaunchNewWindow
    = createAction<Partial<WindowOptions>,Partial<WindowOptions>>(APPLICATION_LAUNCH_NEW_WINDOW,(appJson:Partial<WindowOptions>)=>(appJson));
export const applicationLaunchBarClose
    = createAction<void>(APPLICATION_LAUNCH_BAR_CLOSE);

// network
export const APPLICATION_NETWORK_ONLINE                 = makeType('APPLICATION_NETWORK_ONLINE');
export const applicationNetworkOnline
    = createAction<void>(APPLICATION_NETWORK_ONLINE);
export const APPLICATION_NETWORK_OFFLINE                = makeType('APPLICATION_NETWORK_OFF_LINE');
export const applicationNetworkOffline
    = createAction<void>(APPLICATION_NETWORK_OFFLINE);
