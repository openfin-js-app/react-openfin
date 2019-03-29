import { createAction, ActionFunctionAny, Action } from 'redux-actions';
import {WindowOptions} from 'redux-openfin';

import makeType, {makeResType, makeReqType} from '../../utils/makeType'

import { IApplicationNewSnackbarOption, IApplicationCloseSnackBarOption } from './types';
import * as React from "react";

export const APPLICATION_SET_LOADING_MSG        = makeType('APPLICATION_SET_LOADING_MSG');
export const APPLICATION_STARTED                = makeType('APPLICATION_STARTED');
export const APPLICATION_CHILD_STARTED          = makeType('APPLICATION_CHILD_STARTED');
export const APPLICATION_NOTIFICATION_STARTED   = makeType('APPLICATION_NOTIFICATION_STARTED');
export const APPLICATION_READY                  = makeType('APPLICATION_READY');
export const APPLICATION_DRAWER_TOGGLE          = makeType('APPLICATION_DRAWER_TOGGLE');
export const APPLICATION_TOGGLE_WINDOW_STATE    = makeType('APPLICATION_TOGGLE_WINDOW_STATE');

export const applicationSetLoadingMsg
    = createAction<{loadingMsg:string},string>(APPLICATION_SET_LOADING_MSG,(loadingMsg:string)=>({loadingMsg}));
export const applicationStarted
    = createAction<void>(APPLICATION_STARTED);
export const applicationChildStarted:ActionFunctionAny<Action<void>>
    = createAction(APPLICATION_CHILD_STARTED);
export const applicationNotificationStarted
    = createAction<void>(APPLICATION_NOTIFICATION_STARTED);
export const applicationReady
    = createAction<void>(APPLICATION_READY);
export const applicationDrawerToggle
    = createAction<void>(APPLICATION_DRAWER_TOGGLE);
export const applicationToogleWindowState
    = createAction<void>(APPLICATION_TOGGLE_WINDOW_STATE);

// snackbar

export const APPLICATION_NEW_SNACKBAR               = makeType('APPLICATION_NEW_SNACKBAR');
export const APPLICATION_SET_SNACKBAR_STATUS        = makeType('APPLICATION_SET_SNACKBAR_STATUS');
export const APPLICATION_PROCESS_SNACKBAR_QUEUE     = makeType('APPLICATION_PROCESS_SNACKBAR_QUEUE');
export const APPLICATION_CLOSE_SNACKBAR             = makeType('APPLICATION_CLOSE_SNACKBAR');

export const applicationNewSnackbar
    = createAction<IApplicationNewSnackbarOption,IApplicationNewSnackbarOption>(APPLICATION_NEW_SNACKBAR, (option:IApplicationNewSnackbarOption)=>(option));
export const applicationSetSnackbarStatus
    = createAction<{snackBarOpen:boolean},boolean>(APPLICATION_SET_SNACKBAR_STATUS, (snackBarOpen:boolean)=>({snackBarOpen}));
export const applicationProcessSnackbarQueue
    = createAction<void>(APPLICATION_PROCESS_SNACKBAR_QUEUE);
export const applicationCloseSnackbar:ActionFunctionAny<Action<IApplicationCloseSnackBarOption>>
    = createAction<{event:React.SyntheticEvent<any>,reason:string},React.SyntheticEvent<any>, string>(
        APPLICATION_CLOSE_SNACKBAR, (event: React.SyntheticEvent<any>, reason: string)=>({event,reason})
);


// snap dock
export const APPLICATION_UPDATE_DOCK_STATUS             = makeType('APPLICATION_UPDATE_DOCK_STATUS');
export const applicationUpdateDockStatus
    = createAction<{docked},boolean>(APPLICATION_UPDATE_DOCK_STATUS, (docked:boolean)=>({docked}));

// launch bar
export const APPLICATION_LAUNCH_BAR_TOGGLE              = makeType('APPLICATION_LAUNCH_BAR_TOGGLE');
export const APPLICATION_LAUNCH_BAR_TOGGLE_COLLAPSE     = makeType('APPLICATION_LAUNCH_BAR_TOGGLE_COLLAPSE');
export const APPLICATION_LAUNCH_NEW_WINDOW              = makeType('APPLICATION_LAUNCH_NEW_WINDOW');
export const APPLICATION_LAUNCH_BAR_CLOSE               = makeType('APPLICATION_LAUNCH_BAR_CLOSE');
export const applicationLaunchBarToggle
    = createAction<void>(APPLICATION_LAUNCH_BAR_TOGGLE);
export const applicationLaunchBarToggleCollapse
    = createAction<void>(APPLICATION_LAUNCH_BAR_TOGGLE_COLLAPSE);
export const applicationLaunchNewWindow
    = createAction<Partial<WindowOptions>,Partial<WindowOptions>>(APPLICATION_LAUNCH_NEW_WINDOW,(appJson:Partial<WindowOptions>)=>(appJson));
export const applicationLaunchBarClose:ActionFunctionAny<Action<void>> = createAction(APPLICATION_LAUNCH_BAR_CLOSE);

// network
export const APPLICATION_NETWORK_ONLINE                 = makeType('APPLICATION_NETWORK_ONLINE');
export const applicationNetworkOnline
    = createAction<void>(APPLICATION_NETWORK_ONLINE);
export const APPLICATION_NETWORK_OFFLINE                = makeType('APPLICATION_NETWORK_OFF_LINE');
export const applicationNetworkOffline
    = createAction<void>(APPLICATION_NETWORK_OFFLINE);
