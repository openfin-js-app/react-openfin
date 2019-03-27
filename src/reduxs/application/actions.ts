import { createAction, ActionFunctionAny, Action } from 'redux-actions';
import {WindowOptions} from 'redux-openfin';

import { IApplicationNewSnackbarOption, IApplicationCloseSnackBarOption } from './types';
import * as React from "react";

export const APPLICATION_SET_LOADING_MSG:string = 'APPLICATION_SET_LOADING_MSG';
export const APPLICATION_STARTED:string = 'APPLICATION_STARTED';
export const APPLICATION_CHILD_STARTED:string = 'APPLICATION_CHILD_STARTED';
export const APPLICATION_NOTIFICATION_STARTED:string = 'APPLICATION_NOTIFICATION_STARTED';
export const APPLICATION_READY:string = 'APPLICATION_READY';
export const APPLICATION_DRAWER_TOGGLE:string = 'APPLICATION_DRAWER_TOGGLE';
export const APPLICATION_TOGGLE_WINDOW_STATE:string = 'APPLICATION_TOGGLE_WINDOW_STATE';

export const applicationSetLoadingMsg:ActionFunctionAny<Action<{loadingMsg:string}>> =
    createAction<{loadingMsg:string},string>(APPLICATION_SET_LOADING_MSG,(loadingMsg:string)=>({loadingMsg}));
export const applicationStarted:ActionFunctionAny<Action<void>> = createAction(APPLICATION_STARTED);
export const applicationChildStarted:ActionFunctionAny<Action<void>> = createAction(APPLICATION_CHILD_STARTED);
export const applicationNotificationStarted:ActionFunctionAny<Action<void>> = createAction(APPLICATION_NOTIFICATION_STARTED);
export const applicationReady:ActionFunctionAny<Action<void>> = createAction(APPLICATION_READY);
export const applicationDrawerToggle:ActionFunctionAny<Action<void>> = createAction(APPLICATION_DRAWER_TOGGLE);
export const applicationToogleWindowState:ActionFunctionAny<Action<void>> = createAction(APPLICATION_TOGGLE_WINDOW_STATE);

// snackbar

export const APPLICATION_NEW_SNACKBAR='APPLICATION_NEW_SNACKBAR';
export const APPLICATION_SET_SNACKBAR_STATUS='APPLICATION_SET_SNACKBAR_STATUS';
export const APPLICATION_PROCESS_SNACKBAR_QUEUE='APPLICATION_PROCESS_SNACKBAR_QUEUE';
export const APPLICATION_CLOSE_SNACKBAR='APPLICATION_CLOSE_SNACKBAR';

export const applicationNewSnackbar:ActionFunctionAny<Action<IApplicationNewSnackbarOption>>
    = createAction(APPLICATION_NEW_SNACKBAR, (option:IApplicationNewSnackbarOption)=>(option));
export const applicationSetSnackbarStatus = createAction<{snackBarOpen:boolean},boolean>(APPLICATION_SET_SNACKBAR_STATUS, (snackBarOpen:boolean)=>({snackBarOpen}));
export const applicationProcessSnackbarQueue:ActionFunctionAny<Action<{}>>
    = createAction(APPLICATION_PROCESS_SNACKBAR_QUEUE);
export const applicationCloseSnackbar:ActionFunctionAny<Action<IApplicationCloseSnackBarOption>>
    = createAction(APPLICATION_CLOSE_SNACKBAR, (event: React.SyntheticEvent<any>, reason: string)=>({event,reason}));


// snap dock
export const APPLICATION_UPDATE_DOCK_STATUS = 'APPLICATION_UPDATE_DOCK_STATUS';
export const applicationUpdateDockStatus:ActionFunctionAny<Action<{docked:boolean}>>
    = createAction(APPLICATION_UPDATE_DOCK_STATUS, (docked:boolean)=>({docked}));

// launch bar
export const APPLICATION_LAUNCH_BAR_TOGGLE = 'APPLICATION_LAUNCH_BAR_TOGGLE';
export const APPLICATION_LAUNCH_BAR_TOGGLE_COLLAPSE = 'APPLICATION_LAUNCH_BAR_TOGGLE_COLLAPSE';
export const APPLICATION_LAUNCH_NEW_WINDOW = 'APPLICATION_LAUNCH_NEW_WINDOW';
export const APPLICATION_LAUNCH_BAR_CLOSE = 'APPLICATION_LAUNCH_BAR_CLOSE';
export const applicationLaunchBarToggle:ActionFunctionAny<Action<void>> = createAction(APPLICATION_LAUNCH_BAR_TOGGLE);
export const applicationLaunchBarToggleCollapse:ActionFunctionAny<Action<void>> = createAction(APPLICATION_LAUNCH_BAR_TOGGLE_COLLAPSE);
export const applicationLaunchNewWindow:ActionFunctionAny<Action<Partial<WindowOptions>>>
    = createAction(APPLICATION_LAUNCH_NEW_WINDOW,(appJson:Partial<WindowOptions>)=>(appJson));
export const applicationLaunchBarClose:ActionFunctionAny<Action<void>> = createAction(APPLICATION_LAUNCH_BAR_CLOSE);

// network
export const APPLICATION_NETWORK_ONLINE = 'APPLICATION_NETWORK_ONLINE';
export const applicationNetworkOnline:ActionFunctionAny<Action<void>> = createAction(APPLICATION_NETWORK_ONLINE);
export const APPLICATION_NETWORK_OFFLINE = 'APPLICATION_NETWORK_OFF_LINE';
export const applicationNetworkOffline:ActionFunctionAny<Action<void>> = createAction(APPLICATION_NETWORK_OFFLINE);
