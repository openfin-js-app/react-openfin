import {Action} from "redux-actions";
import { buffers } from 'redux-saga';
import { all, call, delay, put, putResolve, take, takeLatest, takeEvery, fork, select, actionChannel } from 'redux-saga/effects';
import { Docking ,System, Event, Window } from 'redux-openfin';
import { GetGroupResPayload, NewWindowResPayload, WrapResPayload } from "redux-openfin/window";

import { findOneFieldVal } from '../../dexies/configDao';

import {
    applicationSetLoadingMsg,
    APPLICATION_STARTED,
    APPLICATION_CHILD_STARTED,
    APPLICATION_NOTIFICATION_STARTED,
    APPLICATION_NEW_SNACKBAR,
    APPLICATION_CLOSE_SNACKBAR,
    applicationUpdateDockStatus,
    APPLICATION_TOGGLE_WINDOW_STATE,
    applicationNewSnackbar,
    applicationReady,
    applicationSetSnackbarStatus,
    applicationProcessSnackbarQueue,
    APPLICATION_LAUNCH_BAR_TOGGLE,
    APPLICATION_LAUNCH_BAR_TOGGLE_COLLAPSE,
    APPLICATION_LAUNCH_BAR_CLOSE,
    APPLICATION_LAUNCH_NEW_WINDOW,
    configLoadFromDexie,
    configUpdateNewWindowPosition,
} from '..';

import initState from '../../init';
const hist = initState.hist;
const i18n = initState.i18n;
const launchBarItems = initState.launchBarItems;

export const LOADING_VIEW_UUID='openfin-react-starter-loading-view';
let loadingWindow = null;
export const LAUNCHBAR_VIEW_UUID='openfin-react-starter-launchbar-view';
let launchbarWindow = null;

const ENABLE_LOADING_VIEW=process.env.REACT_APP_ENABLE_LOADING_VIEW.toLowerCase() === 'true';

const LOADING_BANNER_WIDTH = parseInt(process.env.REACT_APP_LOADING_BANNER_WIDTH, 10);
const LOADING_BANNER_HEIGHT = parseInt(process.env.REACT_APP_LOADING_BANNER_HEIGHT, 10);
const DEFAULT_WIDTH = parseInt(process.env.REACT_APP_DEFAULT_APP_WIDTH, 10);
const DEFAULT_HEIGHT = parseInt(process.env.REACT_APP_DEFAULT_APP_HEIGHT, 10);


export const getLaunchBarCollapse = state => state.application.launchBarCollapse;
export const getWindowsState = state => state.application.windowsState;
export const getNewWindowTop = state => state.config.application.newWinTop;
export const getNewWindowLeft = state => state.config.application.newWinLeft;
export const getNewWindowWidth = state => state.config.application.newWinWidth;
export const getNewWindowHeight = state => state.config.application.newWinHeight;

export function* handleRedirectToLoadingView(monitorRect) {

    const WINDOW_WIDTH  = monitorRect.right - monitorRect.left;
    const WINDOW_HEIGHT = monitorRect.bottom - monitorRect.top;
    const _LOADING_BANNER_WIDTH     = Math.min( LOADING_BANNER_WIDTH, WINDOW_WIDTH * 0.6387 );
    const _LOADING_BANNER_HEIGHT    = Math.min( LOADING_BANNER_HEIGHT, WINDOW_HEIGHT * 0.324074 );

    const newWindowResAction:Action<NewWindowResPayload> = yield call(Window.asyncs.newWindow,Window.actions.newWindow({
        name:LOADING_VIEW_UUID,
        url:'/loading',
        frame:false,
        resizable:false,
        state:'normal',
        autoShow:true,
        defaultCentered:true,
        defaultLeft:(monitorRect.right - monitorRect.left)/2 - _LOADING_BANNER_WIDTH/2,
        defaultTop:(monitorRect.bottom - monitorRect.top)/2 - _LOADING_BANNER_HEIGHT/2,
        defaultWidth:_LOADING_BANNER_WIDTH,
        defaultHeight: _LOADING_BANNER_HEIGHT,
    }));
    loadingWindow = newWindowResAction.payload.window;

    loadingWindow.setBounds(
        (monitorRect.right - monitorRect.left)/2 - _LOADING_BANNER_WIDTH/2,
        (monitorRect.bottom - monitorRect.top)/2 - _LOADING_BANNER_HEIGHT/2,
        _LOADING_BANNER_WIDTH,
         _LOADING_BANNER_HEIGHT
    );
    loadingWindow.bringToFront();

}

export function* handleRedirectFromLoadingView(monitorRect) {

    // after the sagas loaded, redirect to default page/view
    if (process.env.REACT_APP_DEFAULT_VIEW_URL && process.env.REACT_APP_DEFAULT_VIEW_URL.length > 0){
        if (process.env.NODE_ENV !== 'test'){
            hist.push(process.env.REACT_APP_DEFAULT_VIEW_URL);
        }
    }else{
        if (process.env.NODE_ENV !== 'test'){
            hist.push('/dashboard/view-one');
        }
    }

    yield delay(200);

    if (loadingWindow){
        loadingWindow.close()
    }
    yield put(Window.actions.show({force:true}))
}

export function* handleApplicationLoading() {

    const dbSavedLang = yield call(findOneFieldVal,'application','language');
    if (dbSavedLang){
        i18n.changeLanguage(dbSavedLang);
    }

    const currentIsLoadingView =
        (new URL(window.location.href).pathname.indexOf('loading')>-1) ||
        (new URL(window.location.href).pathname.indexOf('index.html')>-1);


    const monitorInfoAction = yield call(System.asyncs.getMonitorInfo,System.actions.getMonitorInfo({}));
    const monitorRect = monitorInfoAction.payload.primaryMonitor.monitorRect;

    if (ENABLE_LOADING_VIEW && currentIsLoadingView){
        yield* handleRedirectToLoadingView(monitorRect) as any;
    }

    yield putResolve(applicationSetLoadingMsg('init'));

    yield all([
        putResolve(configLoadFromDexie()),
        call(System.asyncs.getMachineId,System.actions.getMachineId({})),
        // getDeviceUserId might fail, thus use flux syntax........
        putResolve(System.actions.getDeviceUserId({})),
        take(System.actions.GET_DEVICE_USER_ID_RES),
        call(System.asyncs.getEnvironmentVariable,System.actions.getEnvironmentVariable({env:'USERNAME'})),
        call(System.asyncs.getEnvironmentVariable,System.actions.getEnvironmentVariable({env:'computername'})),
        call(System.asyncs.getEnvironmentVariable,System.actions.getEnvironmentVariable({env:'HOSTNAME'})),
        call(System.asyncs.getVersion,System.actions.getVersion({})),
        call(System.asyncs.getHostSpecs,System.actions.getHostSpecs({})),
        call(Window.asyncs.getState,Window.actions.getState({})),
        // delay for loading view render, could be removed
        delay(1000),
    ]);

    // BEGIN OF DEMO PURPOSE CODES
    yield putResolve(applicationSetLoadingMsg('delay1'));
    yield delay(1000),
    yield putResolve(applicationSetLoadingMsg('delay2'));
    yield delay(1000),
    yield putResolve(applicationSetLoadingMsg('delay3'));
    yield delay(1000),
    yield putResolve(applicationSetLoadingMsg('delay4'));
    yield delay(800),
    yield putResolve(applicationSetLoadingMsg('delay5'));
    // END OF DEMO PURPOSE CODES

    yield putResolve(applicationReady());

    yield putResolve(applicationSetLoadingMsg('ready'));

    if (ENABLE_LOADING_VIEW && currentIsLoadingView){
        yield* handleRedirectFromLoadingView(monitorRect) as any;
    }

    yield put(applicationSetLoadingMsg(''));

    yield call(Window.asyncs.bringToFront,Window.actions.bringToFront({}));
}

export function* handleApplicationChildLoading() {


    const dbSavedLang = yield call(findOneFieldVal,'application','language');
    if (dbSavedLang){
        i18n.changeLanguage(dbSavedLang);
    }

    yield all([
        call(Window.asyncs.getBounds,Window.actions.getBounds({})),
        putResolve(configLoadFromDexie()),
    ]);

    const groupedWindowsRes = yield call(Window.asyncs.getGroup,Window.actions.getGroup({}));
    const groupedWindows = (groupedWindowsRes.payload as GetGroupResPayload).windows;
    if(groupedWindows && groupedWindows.length > 0){
        yield put(applicationUpdateDockStatus(true));
    }else{
        yield put(applicationUpdateDockStatus(false));
    }

    yield putResolve(applicationReady());
}

export function* handleApplicationNotificationLoading() {
    const dbSavedLang = yield call(findOneFieldVal,'application','language');
    if (dbSavedLang){
        i18n.changeLanguage(dbSavedLang);
    }

    yield all([
        call(Window.asyncs.getBounds,Window.actions.getBounds({})),
        putResolve(configLoadFromDexie()),
    ]);
}

export function* handleApplicationExit() {
    // -------------------------------start of app codes -----------------------------------------------

    // do something cleaning up before shutdonw~

    // ---------------------------------end of app codes -----------------------------------------------

    yield putResolve(Window.actions.close({force:true}));

}

export function* handleApplicationAddNewSnackBar() {
    const state = yield select();
    if(state.snackBarOpen){
        yield put(applicationSetSnackbarStatus({open:false}));
    }else{
        yield put(applicationProcessSnackbarQueue());
    }
}

export function* handleApplicationCloseSnackBar(action) {
    const {event, reason} = action.payload;
    if(reason!=='clickaway'){
        return;
    }else{
        yield put(applicationSetSnackbarStatus({open:false}));
    }
}

export function* handleToggleWindowState(){
    const windowState = yield select(getWindowsState);
    if (windowState === 'maximized'){
        yield call(Window.asyncs.restore,Window.actions.restore({}));
    }else if (windowState === 'normal'){
        yield call(Window.asyncs.maximize,Window.actions.maximize({}));
    }
}

export function* handleApplicationLaunchBarToggle(){

    const launchBarCollapse = yield select(getLaunchBarCollapse);
    const getBoundsAction = yield call(Window.asyncs.getBounds,Window.actions.getBounds({}));
    const getBoundsActionPayload = getBoundsAction.payload;

    const mainWindowAction:Action<WrapResPayload> = yield call(Window.asyncs.wrap,Window.actions.wrap({
        appUuid: process.env.REACT_APP_FIN_UUID,
        windowName: process.env.REACT_APP_FIN_UUID,
    }));
    const mainWindow = mainWindowAction.payload.window;

    const launchbarWindowAction:Action<WrapResPayload> = yield call(Window.asyncs.wrap,Window.actions.wrap({
        appUuid: process.env.REACT_APP_FIN_UUID,
        windowName: LAUNCHBAR_VIEW_UUID,
    }));


    if (launchbarWindowAction.payload.window.nativeWindow){
        launchbarWindow = launchbarWindowAction.payload.window;
        mainWindow.show(true);
        launchbarWindow.close();
    }else{
        launchbarWindow = null;
        const newWindowResAction:Action<NewWindowResPayload> = yield call(Window.asyncs.newWindow,Window.actions.newWindow({
            name:LAUNCHBAR_VIEW_UUID,
            url:'/launchBar',
            frame:false,
            resizable:false,
            state:'normal',
            autoShow:true,
            defaultLeft:getBoundsActionPayload.left,
            defaultTop:getBoundsActionPayload.top,
            defaultWidth:launchBarItems.length<10? launchBarItems.length*64+88:664,
            defaultHeight: 64,
            minWidth:88,
            minHeight:64,
        }));
        launchbarWindow = newWindowResAction.payload.window;

        if (launchBarCollapse){
            launchbarWindow.setBounds(
                getBoundsActionPayload.left,
                getBoundsActionPayload.top,
                88,
                64,
            );
        }else{
            launchbarWindow.setBounds(
                getBoundsActionPayload.left,
                getBoundsActionPayload.top,
                launchBarItems.length<10? launchBarItems.length*64+88:664,
                64,
            );
        }

        launchbarWindow.bringToFront();
        mainWindow.hide();
    }

}

export function* handleApplicationLaunchBarToggleCollapse() {
    const launchBarCollapse = yield select(getLaunchBarCollapse);

    const getBoundsAction = yield call(Window.asyncs.getBounds,Window.actions.getBounds({}));
    const getBoundsActionPayload = getBoundsAction.payload;

    if (launchBarCollapse){
        yield call(Window.asyncs.setBounds,Window.actions.setBounds({
            left:getBoundsActionPayload.left,
            top:getBoundsActionPayload.top,
            width:88,
            height:64,
        }));
    }else{
        yield call(Window.asyncs.setBounds,Window.actions.setBounds({
            left:getBoundsActionPayload.left,
            top:getBoundsActionPayload.top,
            width:launchBarItems.length<10? launchBarItems.length*64+88:664,
            height:64,
        }));
    }
}

export function* handleApplicationLaunchBarClose() {
    const mainWindowAction:Action<WrapResPayload> = yield call(Window.asyncs.wrap,Window.actions.wrap({
        appUuid: process.env.REACT_APP_FIN_UUID,
        windowName: process.env.REACT_APP_FIN_UUID,
    }));
    const mainWindow = mainWindowAction.payload.window;
    mainWindow.close(false);
}

export function* handleApplicationLaunchNewWindow(action) {

    if (window.name === process.env.REACT_APP_FIN_UUID){

        const appJson = action.payload;
        const windowName = appJson.name;

        const wrapWindowAction:Action<WrapResPayload> = yield call(Window.asyncs.wrap,Window.actions.wrap({
            appUuid: process.env.REACT_APP_FIN_UUID,
            windowName,
        }));

        if (
            wrapWindowAction.payload &&
            wrapWindowAction.payload.window &&
            wrapWindowAction.payload.window.nativeWindow
        ){
            // already created, not need to create anymore
            const theWindow = wrapWindowAction.payload.window;
            theWindow.show(true);
            theWindow.bringToFront();
        }else{
            // not created, need to create one
            const defaultWidth = yield select(getNewWindowWidth);
            const defaultHeight = yield select(getNewWindowHeight);
            const defaultTop = yield select(getNewWindowTop);
            const defaultLeft = yield select(getNewWindowLeft);

            if(!appJson.defaultWidth){ appJson.defaultWidth = defaultWidth}
            if(!appJson.defaultHeight){ appJson.defaultHeight = defaultHeight}
            if(!appJson.defaultTop){ appJson.defaultTop = defaultTop}
            if(!appJson.defaultLeft){ appJson.defaultLeft = defaultLeft}

            const newWindowResAction:Action<NewWindowResPayload> = yield call(Window.asyncs.newWindow,Window.actions.newWindow(appJson));
            const newWindow = newWindowResAction.payload.window;
            newWindow.bringToFront();

            yield put(configUpdateNewWindowPosition());
        }

    }

}

export function* handleGroupChanged(action){
    const {
        sourceWindowName, targetWindowName, memeberOf, reason
    } = action.payload;


    if (reason === Docking.types.GroupEventReason.JOIN){
        if(sourceWindowName === window.name){
            yield put(applicationNewSnackbar({
                message:'Joined group',
                variant:'primary'
            }))
        }else if (targetWindowName === window.name){
            yield put(applicationNewSnackbar({
                message:'Been joined',
                variant:'rose'
            }))
        }
    }else if (
        reason === Docking.types.GroupEventReason.LEAVE &&
        sourceWindowName === window.name
    ){
        yield put(applicationNewSnackbar({
            message:'Left group',
            variant:'primary'
        }))
    }else if (
        reason === Docking.types.GroupEventReason.DISBAND &&
        sourceWindowName === window.name
    ){
        yield put(applicationNewSnackbar({
            message:'Got disbanded',
            variant:'rose'
        }))
    }

}

export default function* (){
    yield takeLatest(APPLICATION_STARTED,handleApplicationLoading);
    yield takeLatest(APPLICATION_CHILD_STARTED,handleApplicationChildLoading);
    yield takeLatest(APPLICATION_NOTIFICATION_STARTED,handleApplicationNotificationLoading);
    yield takeLatest(Event.actionDicts.windowEventDictByName['close-requested'].type,handleApplicationExit);
    yield takeLatest(APPLICATION_TOGGLE_WINDOW_STATE,handleToggleWindowState);
    yield takeLatest(APPLICATION_NEW_SNACKBAR,handleApplicationAddNewSnackBar);
    yield takeLatest(APPLICATION_CLOSE_SNACKBAR,handleApplicationCloseSnackBar);
    yield takeLatest(APPLICATION_LAUNCH_BAR_TOGGLE,handleApplicationLaunchBarToggle);
    yield takeLatest(APPLICATION_LAUNCH_BAR_TOGGLE_COLLAPSE,handleApplicationLaunchBarToggleCollapse);
    yield takeLatest(APPLICATION_LAUNCH_BAR_CLOSE,handleApplicationLaunchBarClose);
    yield takeLatest(APPLICATION_LAUNCH_NEW_WINDOW,handleApplicationLaunchNewWindow);
    yield takeEvery(Event.actionDicts.windowEventDictByName['group-changed'].type,handleGroupChanged);
}