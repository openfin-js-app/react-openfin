import { testSaga } from 'redux-saga-test-plan';
import { all, call, delay, put, putResolve, take, takeLatest, takeEvery, fork, select, actionChannel } from 'redux-saga/effects';
import {System, Event, Window, Docking} from 'redux-openfin';

import initState from '../../init';

import {findOneFieldVal} from '../../dexies/configDao'


import {
    // types
    APPLICATION_LAUNCH_BAR_STATUS,
    // actions
    applicationSetLoadingMsg,
    APPLICATION_NEW_SNACKBAR,
    APPLICATION_CLOSE_SNACKBAR,
    APPLICATION_TOGGLE_WINDOW_STATE,
    applicationAwait,
    APPLICATION_READY,
    applicationStarted,
    applicationChildAwait,
    APPLICATION_CHILD_READY,
    applicationChildStarted,
    applicationNotificationAwait,
    APPLICATION_NOTIFICATION_READY,
    applicationNotificationStarted,
    applicationCurWinClosing,
    APPLICATION_CUR_WIN_READY_TO_CLOSE,
    applicationNewSnackbar,
    applicationUpdateDockStatus,
    applicationSetSnackbarStatus,
    applicationProcessSnackbarQueue,
    APPLICATION_LAUNCH_BAR_TOGGLE,
    applicationLaunchBarToggled,
    APPLICATION_LAUNCH_BAR_TOGGLE_COLLAPSE,
    APPLICATION_LAUNCH_NEW_WINDOW,
    APPLICATION_LAUNCH_BAR_CLOSE,
    configLoadFromDexie, APPLICATION_START, APPLICATION_CHILD_START, APPLICATION_NOTIFICATION_START,
} from '..';

import { configUpdateNewWindowPosition } from '..';


import {
    // constants
    LOADING_VIEW_UUID,
    LAUNCHBAR_VIEW_UUID,
    // selectors
    getSnackBarOpen,
    getLaunchBarCollapse,
    getWindowsState,
    getNewWindowTop,
    getNewWindowLeft,
    getNewWindowHeight,
    getNewWindowWidth,
    // sub sagas
    handleApplicationLoading,
    handleApplicationChildLoading,
    handleApplicationNotificationLoading,
    handleApplicationExit,
    handleToggleWindowState,
    handleApplicationAddNewSnackBar,
    handleApplicationCloseSnackBar,
    handleApplicationLaunchBarToggle,
    handleApplicationLaunchBarToggleCollapse,
    handleApplicationLaunchBarClose,
    handleApplicationLaunchNewWindow,
    handleGroupChanged,
} from '../sagas/application';

import applicationSaga from '../sagas/application';

const LOADING_BANNER_WIDTH = initState.config.defaultLoadingBannerWidth;
const LOADING_BANNER_HEIGHT = initState.config.defaultLoadingBannerHeight;
const DEFAULT_WIDTH = initState.config.defaultAppWidth;
const DEFAULT_HEIGHT = initState.config.defaultAppHeight;

const loadingAllActions = [
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
    // delay(1000),
];

const launchBarItems = [];

declare const jsdom:any;

describe('Application saga',()=>{

    beforeAll(()=>{
        initState.hist = [] as any;
        initState.i18n = {
            changeLanguage:jest.fn(),
        } as any;
    })

    describe('handleApplicationLoading saga',()=>{

        it('current view is not loadingView',()=>{
            const monitorRect = { left:0, right:800, top:0, bottom:600 };

            jsdom.reconfigure({url:'http://localhost/some-other-url'});
            expect(window.location.href.toLowerCase()).toBe('http://localhost/some-other-url');

            testSaga(handleApplicationLoading)
                .next()
                .call(findOneFieldVal,'application','language')
                .next(null)
                .call(System.asyncs.getMonitorInfo,System.actions.getMonitorInfo({}))
                .next({payload:{primaryMonitor:{monitorRect}}})
                // @ts-ignore
                .putResolve(applicationSetLoadingMsg('init'))
                .next()
                .all(loadingAllActions)
                .next()
                // @ts-ignore
                .putResolve(applicationAwait())
                .next()
                .race({
                    readyRes: take(APPLICATION_READY),
                    timeout:delay(initState.config.onAppAwaitDelayTime),
                })
                .next({
                    readyRes:{}
                })
                // @ts-ignore
                .putResolve(applicationSetLoadingMsg('ready'))
                .next()
                // @ts-ignore
                .putResolve(applicationStarted())
                .next()
                .put(applicationSetLoadingMsg(''))
                .next()
                .call(Window.asyncs.bringToFront,Window.actions.bringToFront({}))
                .next()
                .isDone();
        });

        it('current is loadingView and redirect to default view url',()=>{

            const setBounds = jest.fn();
            const bringToFront = jest.fn();
            const close = jest.fn();

            const monitorRect = { left:0, right:800, top:0, bottom:600 };

            const WINDOW_WIDTH              = monitorRect.right - monitorRect.left;
            const WINDOW_HEIGHT             = monitorRect.bottom - monitorRect.top;
            const _LOADING_BANNER_WIDTH     = Math.min( LOADING_BANNER_WIDTH, WINDOW_WIDTH * 0.6387 );
            const _LOADING_BANNER_HEIGHT    = Math.min( LOADING_BANNER_HEIGHT, WINDOW_HEIGHT * 0.324074 );
            const _DEFAULT_WIDTH            = Math.min( DEFAULT_WIDTH, WINDOW_WIDTH * 0.80 );
            const _DEFAULT_HEIGHT           = Math.min( DEFAULT_HEIGHT, WINDOW_HEIGHT * 0.648148 );

            jsdom.reconfigure({url:'http://localhost/loading'});
            expect(window.location.href.toLowerCase()).toBe('http://localhost/loading');

            process.env.REACT_APP_DEFAULT_VIEW_URL = 'something-url';
            expect(process.env.REACT_APP_DEFAULT_VIEW_URL && process.env.REACT_APP_DEFAULT_VIEW_URL.length > 0).toBeTruthy();

            testSaga(handleApplicationLoading)
                .next()
                .call(findOneFieldVal,'application','language')
                .next('en-US')
                .call(System.asyncs.getMonitorInfo,System.actions.getMonitorInfo({}))
                .next({payload:{primaryMonitor:{monitorRect}}})
                .call(Window.asyncs.newWindow,Window.actions.newWindow({
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
                }))
                .next({
                    payload:{
                        window:{
                            setBounds,
                            bringToFront,
                            close,
                        }
                    }
                })
                // @ts-ignore
                .putResolve(applicationSetLoadingMsg('init'))
                .next()
                .all(loadingAllActions)
                .next()
                // @ts-ignore
                .putResolve(applicationAwait())
                .next()
                .race({
                    readyRes: take(APPLICATION_READY),
                    timeout:delay(initState.config.onAppAwaitDelayTime),
                })
                .next({
                    readyRes:{}
                })
                // @ts-ignore
                .putResolve(applicationSetLoadingMsg('ready'))
                .next()
                // @ts-ignore
                .putResolve(applicationStarted())
                .next()
                .delay(200)
                .next()
                .put(Window.actions.show({force:true}))
                .next()
                .put(applicationSetLoadingMsg(''))
                .next()
                .call(Window.asyncs.bringToFront,Window.actions.bringToFront({}))
                .next()
                .isDone();

            expect(setBounds).toHaveBeenCalled();
            expect(bringToFront).toHaveBeenCalled();
            expect(close).toHaveBeenCalled();
        });

    });

    describe('handleApplicationChildLoading saga',()=>{

        it('basically works when docked',()=>{
            testSaga(handleApplicationChildLoading)
                .next()
                .call(findOneFieldVal,'application','language')
                .next(null)
                .all([
                    call(Window.asyncs.getBounds,Window.actions.getBounds({})),
                    putResolve(configLoadFromDexie()),
                ])
                .next()
                .call(Window.asyncs.getGroup,Window.actions.getGroup({}))
                .next({payload:{windows:[{},{}]}})
                .put(applicationUpdateDockStatus(true))
                .next()
                // @ts-ignore
                .putResolve(applicationChildAwait())
                .next()
                .race({
                    readyRes: take(APPLICATION_CHILD_READY),
                    timeout:delay(initState.config.onAppChildAwaitDelayTime),
                })
                .next({
                    readyRes:{}
                })
                // @ts-ignore
                .putResolve(applicationChildStarted())
                .next()
                .isDone();
        })

        it('basically works when undocked',()=>{
            testSaga(handleApplicationChildLoading)
                .next()
                .call(findOneFieldVal,'application','language')
                .next('en-US')
                .all([
                    call(Window.asyncs.getBounds,Window.actions.getBounds({})),
                    putResolve(configLoadFromDexie()),
                ])
                .next()
                .call(Window.asyncs.getGroup,Window.actions.getGroup({}))
                .next({payload:{windows:[]}})
                .put(applicationUpdateDockStatus(false))
                .next()
                // @ts-ignore
                .putResolve(applicationChildAwait())
                .next()
                .race({
                    readyRes: take(APPLICATION_CHILD_READY),
                    timeout:delay(initState.config.onAppChildAwaitDelayTime),
                })
                .next({
                    readyRes:{}
                })
                // @ts-ignore
                .putResolve(applicationChildStarted())
                .next()
                .isDone();
        })

    })

    describe('handleApplicationNotificationLoading saga',()=>{

        it('basically works by default',()=>{
            testSaga(handleApplicationNotificationLoading)
                .next()
                .call(findOneFieldVal,'application','language')
                .next(null)
                .all([
                    call(Window.asyncs.getBounds,Window.actions.getBounds({})),
                    putResolve(configLoadFromDexie()),
                ])
                .next()
                // @ts-ignore
                .putResolve(applicationNotificationAwait())
                .next()
                .race({
                    readyRes: take(APPLICATION_NOTIFICATION_READY),
                    timeout:delay(initState.config.onAppNotificationAwaitDelayTime),
                })
                .next({
                    readyRes:{}
                })
                .putResolve(applicationNotificationStarted())
                .next()
                .isDone();
        })

        it('basically works with preset',()=>{
            testSaga(handleApplicationNotificationLoading)
                .next()
                .call(findOneFieldVal,'application','language')
                .next('en-US')
                .all([
                    call(Window.asyncs.getBounds,Window.actions.getBounds({})),
                    putResolve(configLoadFromDexie()),
                ])
                .next()
                // @ts-ignore
                .putResolve(applicationNotificationAwait())
                .next()
                .race({
                    readyRes: take(APPLICATION_NOTIFICATION_READY),
                    timeout:delay(initState.config.onAppNotificationAwaitDelayTime),
                })
                .next({
                    readyRes:{}
                })
                .putResolve(applicationNotificationStarted())
                .next()
                .isDone();
        })

    })

    describe('handleApplicationExit saga', ()=>{

        it('close by default',()=>{
            testSaga(handleApplicationExit)
                .next()
                // @ts-ignore
                .putResolve(applicationCurWinClosing())
                .next()
                .race({
                    readyToClose : take(APPLICATION_CUR_WIN_READY_TO_CLOSE),
                    timeout : delay(initState.config.onAppClosingAwaitDelayTime),
                })
                .next({readyToClose:{payload:{}}})
                .putResolve(Window.actions.close({force:true}))
                .next()
                .isDone();
        })

        it('skip to close',()=>{
            testSaga(handleApplicationExit)
                .next()
                // @ts-ignore
                .putResolve(applicationCurWinClosing())
                .next()
                .race({
                    readyToClose : take(APPLICATION_CUR_WIN_READY_TO_CLOSE),
                    timeout : delay(initState.config.onAppClosingAwaitDelayTime),
                })
                .next({readyToClose:{payload:{skipClosing:true}}})
                .isDone();
        })
    });

    describe('handleApplicationAddNewSnackBar saga', ()=>{

        it('snackBarOpen equals true',()=>{
            testSaga(handleApplicationAddNewSnackBar)
                .next()
                .select(getSnackBarOpen)
                .next(true)
                .put(applicationSetSnackbarStatus(false))
                .next()
                .isDone();
        });

        it('snackBarOpen equals false',()=>{
            testSaga(handleApplicationAddNewSnackBar)
                .next()
                .select(getSnackBarOpen)
                .next(false)
                .put(applicationProcessSnackbarQueue())
                .next()
                .isDone();
        });

    });


    describe('handleApplicationCloseSnackBar saga', ()=>{

        it('reason equals clickaway',()=>{
            testSaga(handleApplicationCloseSnackBar,{payload:{
                    reason:'clickaway',
                    event:{},
                }})
                .next()
                .put(applicationSetSnackbarStatus(false))
                .next()
                .isDone();
        });

        it('reason doesn\'t equal clickaway',()=>{
            testSaga(handleApplicationCloseSnackBar,{payload:{
                    reason:'not clickaway',
                    event:{},
                }})
                .next()
                .isDone();
        });

    });

    describe('handleToggleWindowState saga', ()=>{

        it('windowState equals maximized',()=>{
            testSaga(handleToggleWindowState)
                .next()
                .select(getWindowsState)
                .next('maximized')
                .call(Window.asyncs.restore,Window.actions.restore({}))
                .next()
                .isDone();
        });

        it('windowState equals normal',()=>{
            testSaga(handleToggleWindowState)
                .next()
                .select(getWindowsState)
                .next('normal')
                .call(Window.asyncs.maximize,Window.actions.maximize({}))
                .next()
                .isDone();
        });

    });

    describe('handleApplicationLaunchBarToggle saga', ()=>{

        let getBoundsActionPayload;

        beforeAll(()=>{
            getBoundsActionPayload = {
                top:0, left:0, width:800, height:600,
            }
        });

        it('redirect back to main window',()=>{

            const mainWindow = {
                show: jest.fn(),
            };
            const launchbarWindow = {
                nativeWindow:{},
                close: jest.fn(),
            };

            testSaga(handleApplicationLaunchBarToggle)
                .next()
                .select(getLaunchBarCollapse)
                .next(true)
                .call(Window.asyncs.getBounds,Window.actions.getBounds({}))
                .next({payload:getBoundsActionPayload})
                .call(Window.asyncs.wrap,Window.actions.wrap({
                    appUuid: initState.finUuid,
                    windowName: initState.finUuid,
                }))
                .next({
                    payload:{
                        window:mainWindow,
                    }
                })
                .call(Window.asyncs.wrap,Window.actions.wrap({
                    appUuid: initState.finUuid,
                    windowName: LAUNCHBAR_VIEW_UUID,
                }))
                .next({
                    payload:{
                        window:launchbarWindow,
                    }
                })
                .put(applicationLaunchBarToggled(APPLICATION_LAUNCH_BAR_STATUS.SWITCH_TO_MAIN_WIN))
                .next()
                .isDone();

            expect(mainWindow.show).toMatchSnapshot();
            expect(launchbarWindow.close).toMatchSnapshot();

        })

        it('redirect to collapsed launchBar window',()=>{
            const mainWindow = {
                hide: jest.fn(),
            };
            const launchbarWindow = {
                bringToFront: jest.fn(),
                setBounds: jest.fn(),
            };

            testSaga(handleApplicationLaunchBarToggle)
                .next()
                .select(getLaunchBarCollapse)
                .next(true)
                .call(Window.asyncs.getBounds,Window.actions.getBounds({}))
                .next({payload:getBoundsActionPayload})
                .call(Window.asyncs.wrap,Window.actions.wrap({
                    appUuid: process.env.REACT_APP_FIN_UUID,
                    windowName: process.env.REACT_APP_FIN_UUID,
                }))
                .next({
                    payload:{
                        window:mainWindow,
                    }
                })
                .call(Window.asyncs.wrap,Window.actions.wrap({
                    appUuid: process.env.REACT_APP_FIN_UUID,
                    windowName: LAUNCHBAR_VIEW_UUID,
                }))
                .next({
                    payload:{
                        window:launchbarWindow,
                    }
                })
                .call(Window.asyncs.newWindow,Window.actions.newWindow({
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
                }))
                .next({
                    payload:{
                        window:launchbarWindow,
                    }
                })
                .put(applicationLaunchBarToggled(APPLICATION_LAUNCH_BAR_STATUS.SWITCH_TO_LAUNCHBAR))
                .next()
                .isDone();

            expect(mainWindow.hide).toMatchSnapshot();
            expect(launchbarWindow.bringToFront).toMatchSnapshot();
            expect(launchbarWindow.setBounds).toMatchSnapshot();
        })
        it('redirect to non-collapsed launchBar window',()=>{
            const mainWindow = {
                hide: jest.fn(),
            };
            const launchbarWindow = {
                bringToFront: jest.fn(),
                setBounds: jest.fn(),
            };

            testSaga(handleApplicationLaunchBarToggle)
                .next()
                .select(getLaunchBarCollapse)
                .next(false)
                .call(Window.asyncs.getBounds,Window.actions.getBounds({}))
                .next({payload:getBoundsActionPayload})
                .call(Window.asyncs.wrap,Window.actions.wrap({
                    appUuid: process.env.REACT_APP_FIN_UUID,
                    windowName: process.env.REACT_APP_FIN_UUID,
                }))
                .next({
                    payload:{
                        window:mainWindow,
                    }
                })
                .call(Window.asyncs.wrap,Window.actions.wrap({
                    appUuid: process.env.REACT_APP_FIN_UUID,
                    windowName: LAUNCHBAR_VIEW_UUID,
                }))
                .next({
                    payload:{
                        window:launchbarWindow,
                    }
                })
                .call(Window.asyncs.newWindow,Window.actions.newWindow({
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
                }))
                .next({
                    payload:{
                        window:launchbarWindow,
                    }
                })
                .put(applicationLaunchBarToggled(APPLICATION_LAUNCH_BAR_STATUS.SWITCH_TO_LAUNCHBAR))
                .next()
                .isDone();

            expect(mainWindow.hide).toMatchSnapshot();
            expect(launchbarWindow.bringToFront).toMatchSnapshot();
            expect(launchbarWindow.setBounds).toMatchSnapshot();
        })
    });

    describe('handleApplicationLaunchBarToggleCollapse saga', ()=>{

        let getBoundsActionPayload;

        beforeAll(()=>{
            getBoundsActionPayload = {
                top:0, left:0, width:800, height:600,
            }
        });

        it('toggle to non-collapsed',()=>{
            testSaga(handleApplicationLaunchBarToggleCollapse)
                .next()
                .select(getLaunchBarCollapse)
                .next(false)
                .call(Window.asyncs.getBounds,Window.actions.getBounds({}))
                .next({payload:getBoundsActionPayload})
                .call(Window.asyncs.setBounds,Window.actions.setBounds({
                    left:getBoundsActionPayload.left,
                    top:getBoundsActionPayload.top,
                    width:launchBarItems.length<10? launchBarItems.length*64+88:664,
                    height:64,
                }))
                .next()
                .isDone();
        });

        it('toggle to collapsed',()=>{
            testSaga(handleApplicationLaunchBarToggleCollapse)
                .next()
                .select(getLaunchBarCollapse)
                .next(true)
                .call(Window.asyncs.getBounds,Window.actions.getBounds({}))
                .next({payload:getBoundsActionPayload})
                .call(Window.asyncs.setBounds,Window.actions.setBounds({
                    left:getBoundsActionPayload.left,
                    top:getBoundsActionPayload.top,
                    width:88,
                    height:64,
                }))
                .next()
                .isDone();
        });

    });

    describe('handleApplicationLaunchBarClose saga', ()=>{

        it('basically works',()=>{

            const close = jest.fn();

            testSaga(handleApplicationLaunchBarClose)
                .next()
                .call(Window.asyncs.wrap,Window.actions.wrap({
                    appUuid: initState.finUuid,
                    windowName: initState.finUuid,
                }))
                .next({
                    payload:{
                        window:{
                            close
                        }
                    }
                })
                .isDone();

            expect(close).toHaveBeenCalled();

        })

    })

    describe('handleApplicationLaunchNewWindow saga', ()=>{

        const defaultWidth = 1;
        const defaultHeight = 2;
        const defaultTop = 3;
        const defaultLeft = 4;

        it('child window receiving the msg',()=>{

            window.name = 'some other name';

            testSaga(handleApplicationLaunchNewWindow,{},)
                .next()
                .isDone();

            window.name = initState.finUuid;
        })

        it('bring up the old one',()=>{
            const appJson = {
                name:'windowsName'
            };

            const existWindow = {
                nativeWindow:{},
                show:jest.fn(),
                bringToFront:jest.fn(),
            };

            window.name = initState.finUuid;

            testSaga(handleApplicationLaunchNewWindow,{payload:appJson})
                .next()
                .call(Window.asyncs.wrap,Window.actions.wrap({
                    appUuid: initState.finUuid,
                    windowName:appJson.name,
                }))
                .next({
                    payload:{
                        window:existWindow,
                    }
                })
                .isDone();

            expect(existWindow.show).toMatchSnapshot();
            expect(existWindow.bringToFront).toMatchSnapshot();
        });

        it('do create a new one',()=>{

            const appJson = {
                name:'windowsName'
            };

            const existWindow = {
                bringToFront:jest.fn(),
            };

            window.name = initState.finUuid;

            const expectedAppJson = {
                ...appJson,
                defaultWidth, defaultHeight, defaultTop, defaultLeft,
            };
            testSaga(handleApplicationLaunchNewWindow,{payload:expectedAppJson})
                .next()
                .call(Window.asyncs.wrap,Window.actions.wrap({
                    appUuid: initState.finUuid,
                    windowName:appJson.name,
                }))
                .next({
                    payload:{
                        window:existWindow,
                    }
                })
                .select(getNewWindowWidth)
                .next(defaultWidth)
                .select(getNewWindowHeight)
                .next(defaultHeight)
                .select(getNewWindowTop)
                .next(defaultTop)
                .select(getNewWindowLeft)
                .next(defaultLeft)
                .call(Window.asyncs.newWindow,Window.actions.newWindow(expectedAppJson))
                .next({
                    payload:{
                        window:existWindow,
                    }
                })
                .put(configUpdateNewWindowPosition())
                .next()
                .isDone();

            expect(existWindow.bringToFront).toMatchSnapshot();
        })

    });

    describe('handleGroupChanged saga',()=>{

        it('self consume Docking.types.GroupEventReason.JOIN',()=>{
            window.name = 'sourceWindowName';
            testSaga(handleGroupChanged,{
                payload:{
                    sourceWindowName: 'sourceWindowName',
                    targetWindowName: 'targetWindowName',
                    memeberOf: 'nothing',
                    reason: Docking.types.GroupEventReason.JOIN
                }
            })
                .next()
                .put(applicationNewSnackbar({
                    message:'Joined group',
                    variant:'primary'
                }))
                .next()
                .isDone();
        })

        it('other consume Docking.types.GroupEventReason.JOIN',()=>{
            window.name = 'targetWindowName';
            testSaga(handleGroupChanged,{
                payload:{
                    sourceWindowName: 'sourceWindowName',
                    targetWindowName: 'targetWindowName',
                    memeberOf: 'nothing',
                    reason: Docking.types.GroupEventReason.JOIN
                }
            })
                .next()
                .put(applicationNewSnackbar({
                    message:'Been joined',
                    variant:'rose'
                }))
                .next()
                .isDone();
        })

        it('self consume Docking.types.GroupEventReason.LEAVE',()=>{
            window.name = 'windowName';
            testSaga(handleGroupChanged,{
                payload:{
                    sourceWindowName: 'windowName',
                    targetWindowName: 'windowName',
                    memeberOf: 'nothing',
                    reason: Docking.types.GroupEventReason.LEAVE
                }
            })
                .next()
                .put(applicationNewSnackbar({
                    message:'Left group',
                    variant:'primary'
                }))
                .next()
                .isDone();
        })

        it('self consume Docking.types.GroupEventReason.DISBAND',()=>{
            window.name = 'sourceWindowName';
            testSaga(handleGroupChanged,{
                payload:{
                    sourceWindowName: 'sourceWindowName',
                    targetWindowName: 'targetWindowName',
                    memeberOf: 'nothing',
                    reason: Docking.types.GroupEventReason.DISBAND
                }
            })
                .next()
                .put(applicationNewSnackbar({
                    message:'Got disbanded',
                    variant:'rose'
                }))
                .next()
                .isDone();
        })

        it('some other event',()=>{
            window.name = 'someOtherWindowName';
            testSaga(handleGroupChanged,{
                payload:{
                    sourceWindowName: 'sourceWindowName',
                    targetWindowName: 'targetWindowName',
                    memeberOf: 'nothing',
                    reason: null,
                }
            })
                .next()
                .isDone();
        })

    })

    it('default function register all event',()=>{
        testSaga(applicationSaga)
            .next()
            .takeLatest(APPLICATION_START,handleApplicationLoading)
            .next()
            .takeLatest(APPLICATION_CHILD_START,handleApplicationChildLoading)
            .next()
            .takeLatest(APPLICATION_NOTIFICATION_START,handleApplicationNotificationLoading)
            .next()
            .takeLatest(Event.actionDicts.windowEventDictByName['close-requested'].type,handleApplicationExit)
            .next()
            .takeLatest(APPLICATION_TOGGLE_WINDOW_STATE,handleToggleWindowState)
            .next()
            .takeLatest(APPLICATION_NEW_SNACKBAR,handleApplicationAddNewSnackBar)
            .next()
            .takeLatest(APPLICATION_CLOSE_SNACKBAR,handleApplicationCloseSnackBar)
            .next()
            .takeLatest(APPLICATION_LAUNCH_BAR_TOGGLE,handleApplicationLaunchBarToggle)
            .next()
            .takeLatest(APPLICATION_LAUNCH_BAR_TOGGLE_COLLAPSE,handleApplicationLaunchBarToggleCollapse)
            .next()
            .takeLatest(APPLICATION_LAUNCH_BAR_CLOSE,handleApplicationLaunchBarClose)
            .next()
            .takeLatest(APPLICATION_LAUNCH_NEW_WINDOW,handleApplicationLaunchNewWindow)
            .next()
            .takeEvery(Event.actionDicts.windowEventDictByName['group-changed'].type,handleGroupChanged)
            .next()
            .isDone();
    })

});
