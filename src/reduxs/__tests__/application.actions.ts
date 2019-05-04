import * as Actions from '../application/actions';
import {APPLICATION_LAUNCH_BAR_STATUS} from "..";

describe('Application actions',()=>{

    it('applicationSetLoadingMsg action',()=>{
        expect(Actions.applicationSetLoadingMsg('loadingMsg')).toMatchSnapshot();
    })

    it('applicationStart action',()=>{
        expect(Actions.applicationStart()).toMatchSnapshot();
    })

    it('applicationAwait action',()=>{
        expect(Actions.applicationAwait()).toMatchSnapshot();
    })

    it('applicationReady action',()=>{
        expect(Actions.applicationReady({targetUrl:'targetUrl'})).toMatchSnapshot();
    })

    it('applicationStarted action',()=>{
        expect(Actions.applicationStarted()).toMatchSnapshot();
    })

    it('applicationChildStart action',()=>{
        expect(Actions.applicationChildStart()).toMatchSnapshot();
    })

    it('applicationChildAwait action',()=>{
        expect(Actions.applicationChildAwait()).toMatchSnapshot();
    })

    it('applicationChildReady action',()=>{
        expect(Actions.applicationChildReady({targetUrl:'targetUrl'})).toMatchSnapshot();
    })

    it('applicationChildStarted action',()=>{
        expect(Actions.applicationChildStarted()).toMatchSnapshot();
    })

    it('applicationNotificationStart action',()=>{
        expect(Actions.applicationNotificationStart()).toMatchSnapshot();
    })

    it('applicationNotificationAwait action',()=>{
        expect(Actions.applicationNotificationAwait()).toMatchSnapshot();
    })

    it('applicationNotificationReady action',()=>{
        expect(Actions.applicationNotificationReady({targetUrl:'targetUrl'})).toMatchSnapshot();
    })

    it('applicationNotificationStarted action',()=>{
        expect(Actions.applicationNotificationStarted()).toMatchSnapshot();
    })

    it('applicationDrawerToggle action',()=>{
        expect(Actions.applicationDrawerToggle()).toMatchSnapshot();
    })

    it('applicationToggleWindowState action',()=>{
        expect(Actions.applicationToggleWindowState()).toMatchSnapshot();
    })

    it('applicationCurWinClosing action',()=>{
        expect(Actions.applicationCurWinClosing()).toMatchSnapshot();
    })

    it('applicationCurWinReadyToClose action',()=>{
        expect(Actions.applicationCurWinReadyToClose()).toMatchSnapshot();
    })

    it('applicationNewSnackbar action',()=>{
        expect(Actions.applicationNewSnackbar({
            message:'message',
            variant:'primary',
        })).toMatchSnapshot();
    })

    it('applicationSetSnackbarStatus action',()=>{
        expect(Actions.applicationSetSnackbarStatus(true)).toMatchSnapshot();
    })

    it('applicationProcessSnackbarQueue action',()=>{
        expect(Actions.applicationProcessSnackbarQueue()).toMatchSnapshot();
    })

    it('applicationCloseSnackbar action',()=>{
        expect(Actions.applicationCloseSnackbar({} as any,'reason')).toMatchSnapshot();
    })

    it('applicationUpdateDockStatus action',()=>{
        expect(Actions.applicationUpdateDockStatus(true)).toMatchSnapshot();
    })

    it('applicationLaunchBarToggle action',()=>{
        expect(Actions.applicationLaunchBarToggle()).toMatchSnapshot();
    })

    it('applicationLaunchBarToggled action',()=>{
        expect(Actions.applicationLaunchBarToggled(APPLICATION_LAUNCH_BAR_STATUS.SWITCH_TO_LAUNCHBAR)).toMatchSnapshot();
        expect(Actions.applicationLaunchBarToggled(APPLICATION_LAUNCH_BAR_STATUS.SWITCH_TO_MAIN_WIN)).toMatchSnapshot();
    })

    it('applicationLaunchBarToggleCollapse action',()=>{
        expect(Actions.applicationLaunchBarToggleCollapse()).toMatchSnapshot();
    })

    it('applicationLaunchNewWindow action',()=>{
        expect(Actions.applicationLaunchNewWindow({} as any)).toMatchSnapshot();
    })

    it('applicationLaunchBarClose action',()=>{
        expect(Actions.applicationLaunchBarClose()).toMatchSnapshot();
    })

    it('applicationNetworkOnline action',()=>{
        expect(Actions.applicationNetworkOnline()).toMatchSnapshot();
    })

    it('applicationNetworkOffline action',()=>{
        expect(Actions.applicationNetworkOffline()).toMatchSnapshot();
    })

})
