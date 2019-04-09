import {Docking, Event, System, Window} from 'redux-openfin';
import * as Actions from '../application/actions';
import reducerCreator, {defaultState} from '../application/reducer';


describe('Application reducer',()=>{

    describe('With parent state', () => {

        let reducer

        beforeAll(()=>{
            reducer = reducerCreator(defaultState);
        })


        it('System.actions.GET_MACHINE_ID_RES reduced correctly',()=>{
            const action:any = {type:System.actions.GET_MACHINE_ID_RES, payload:{id:'id'}};
            expect(reducer(undefined,action)).toMatchSnapshot();
        });


        it('System.actions.GET_DEVICE_USER_ID_RES reduced correctly',()=>{
            const action:any = {type:System.actions.GET_DEVICE_USER_ID_RES, payload:{id:'id'}};
            expect(reducer(undefined,action)).toMatchSnapshot();
        });


        it('System.actions.GET_ENVIRONMENT_VARIABLE_RES reduced correctly - username',()=>{
            const action:any = {type:System.actions.GET_ENVIRONMENT_VARIABLE_RES, payload:{
                    env:'username', value:'usernameVal'
                }};
            expect(reducer(undefined,action)).toMatchSnapshot();
        });

        it('System.actions.GET_ENVIRONMENT_VARIABLE_RES reduced correctly - computername',()=>{
            const action:any = {type:System.actions.GET_ENVIRONMENT_VARIABLE_RES, payload:{
                    env:'computername', value:'computernameVal'
                }};
            expect(reducer(undefined,action)).toMatchSnapshot();
        });

    });

    describe('With out parent state', () => {

        let reducer

        beforeAll(()=>{
            reducer = reducerCreator();
        })

        it('System.actions.GET_MACHINE_ID_RES reduced correctly',()=>{
            const action:any = {type:System.actions.GET_MACHINE_ID_RES, payload:{id:'id'}};
            expect(reducer(undefined,action)).toMatchSnapshot();
        });


        it('System.actions.GET_DEVICE_USER_ID_RES reduced correctly',()=>{
            const action:any = {type:System.actions.GET_DEVICE_USER_ID_RES, payload:{id:'id'}};
            expect(reducer(undefined,action)).toMatchSnapshot();
        });


        it('System.actions.GET_ENVIRONMENT_VARIABLE_RES reduced correctly - username',()=>{
            const action:any = {type:System.actions.GET_ENVIRONMENT_VARIABLE_RES, payload:{
                    env:'username', value:'usernameVal'
                }};
            expect(reducer(undefined,action)).toMatchSnapshot();
        });

        it('System.actions.GET_ENVIRONMENT_VARIABLE_RES reduced correctly - computername',()=>{
            const action:any = {type:System.actions.GET_ENVIRONMENT_VARIABLE_RES, payload:{
                    env:'computername', value:'computernameVal'
                }};
            expect(reducer(undefined,action)).toMatchSnapshot();
        });

        it('System.actions.GET_ENVIRONMENT_VARIABLE_RES reduced correctly - unmatched',()=>{
            const action:any = {type:System.actions.GET_ENVIRONMENT_VARIABLE_RES, payload:{
                    env:'someEnv', value:'someVal'
                }};
            expect(reducer(undefined,action)).toMatchSnapshot();
        });

        it('System.actions.GET_VERSION_RES reduced correctly',()=>{
            const action:any = {type:System.actions.GET_VERSION_RES, payload:{
                    version:'versionStr'
                }};
            expect(reducer(undefined,action)).toMatchSnapshot();
        });

        it('System.actions.GET_HOST_SPECS_RES reduced correctly',()=>{
            const action:any = {type:System.actions.GET_HOST_SPECS_RES, payload:{
                    type: 'GET_HOST_SPECS_RES'
                }};
            expect(reducer(undefined,action)).toMatchSnapshot();
        });

        it('Window.actions.GET_STATE_RES reduced correctly',()=>{
            const action:any = {type:Window.actions.GET_STATE_RES, payload:{
                    state:'windowState'
                }};
            expect(reducer(undefined,action)).toMatchSnapshot();
        });

        it('Window.actions.GET_BOUNDS_RES reduced correctly',()=>{
            const action:any = {type:Window.actions.GET_BOUNDS_RES, payload:{
                    top:0,
                    left:1,
                    right:2,
                    height:3,
                }};
            expect(reducer(undefined,action)).toMatchSnapshot();
        });

        it('Event.actionDicts.windowEventDictByName[\'bounds-changing\'].type reduced correctly',()=>{
            const action:any = {type:Event.actionDicts.windowEventDictByName['bounds-changing'].type, payload:{
                    top:0,
                    left:1,
                    right:2,
                    height:3,
                }};
            expect(reducer(undefined,action)).toMatchSnapshot();
        });

        describe('Event.actionDicts.windowEventDictByName[\'group-changed\'].type action',  () => {

            const windowsName = 'windowsName';

            beforeAll(()=>{
                window.name = windowsName;
            })

            it('join reason and correct window name',()=>{
                const action:any = {type:Event.actionDicts.windowEventDictByName['group-changed'].type, payload:{
                        sourceWindowName:windowsName,
                        reason:Docking.types.GroupEventReason.JOIN,
                        targetWindowName:"",
                        memeberOf:"",
                    }};
                expect(reducer(undefined,action)).toMatchSnapshot();
            })

            it('leave reason and correct window name',()=>{
                const action:any = {type:Event.actionDicts.windowEventDictByName['group-changed'].type, payload:{
                        sourceWindowName:windowsName,
                        reason:Docking.types.GroupEventReason.LEAVE,
                        targetWindowName:"",
                        memeberOf:"",
                    }};
                expect(reducer(undefined,action)).toMatchSnapshot();
            })

            it('disband reason and correct window name',()=>{
                const action:any = {type:Event.actionDicts.windowEventDictByName['group-changed'].type, payload:{
                        sourceWindowName:"",
                        reason:Docking.types.GroupEventReason.DISBAND,
                        targetWindowName:"",
                        memeberOf:"",
                    }};
                expect(reducer(undefined,action)).toMatchSnapshot();
            })

        });

        it('APPLICATION_UPDATE_DOCK_STATUS reduced correctly',()=>{
            const action:any = Actions.applicationUpdateDockStatus(true);
            expect(reducer(undefined,action)).toMatchSnapshot();
        });

        it('APPLICATION_SET_LOADING_MSG reduced correctly',()=>{
            const action:any = Actions.applicationSetLoadingMsg('str');
            expect(reducer(undefined,action)).toMatchSnapshot();
        });

        it('APPLICATION_READY reduced correctly',()=>{
            const action:any = Actions.applicationReady({});
            expect(reducer(undefined,action)).toMatchSnapshot();
        });

        it('APPLICATION_CHILD_READY reduced correctly',()=>{
            const action:any = Actions.applicationChildReady({});
            expect(reducer(undefined,action)).toMatchSnapshot();
        });

        it('APPLICATION_NOTIFICATION_READY reduced correctly',()=>{
            const action:any = Actions.applicationNotificationReady({});
            expect(reducer(undefined,action)).toMatchSnapshot();
        });

        it('APPLICATION_DRAWER_TOGGLE reduced correctly',()=>{
            const action:any = Actions.applicationDrawerToggle();
            expect(reducer(undefined,action)).toMatchSnapshot();
        });

        it('APPLICATION_NEW_SNACKBAR reduced correctly',()=>{
            const action:any = Actions.applicationNewSnackbar({
                message:'Snackbar message',
                variant:'primary',
            });
            const resultState = reducer(undefined,action);
            delete resultState.snackBarMsgQueue[0].key;
            expect(resultState).toMatchSnapshot();
        });

        it('APPLICATION_PROCESS_SNACKBAR_QUEUE reduced correctly - nonempty',()=>{
            const action:any = Actions.applicationProcessSnackbarQueue();
            expect(reducer({
                snackBarOpen:false,
                snackBarMsgInfo:{},
                snackBarMsgQueue:[{
                    message:'Snackbar message',
                    variant:'primary',
                }]
            },action)).toMatchSnapshot();
        });

        it('APPLICATION_PROCESS_SNACKBAR_QUEUE reduced correctly - empty',()=>{
            const action:any = Actions.applicationProcessSnackbarQueue();
            expect(reducer(undefined,action)).toMatchSnapshot();
        });

        it('APPLICATION_SET_SNACKBAR_STATUS reduced correctly - empty',()=>{
            const action:any = Actions.applicationSetSnackbarStatus(true);
            expect(reducer(undefined,action)).toMatchSnapshot();
        });

        it('APPLICATION_LAUNCH_BAR_TOGGLE_COLLAPSE reduced correctly - empty',()=>{
            const action:any = Actions.applicationLaunchBarToggleCollapse();
            expect(reducer(undefined,action)).toMatchSnapshot();
        });

        it('APPLICATION_NETWORK_ONLINE reduced correctly - empty',()=>{
            const action:any = Actions.applicationNetworkOnline();
            expect(reducer(undefined,action)).toMatchSnapshot();
        });

        it('APPLICATION_NETWORK_OFFLINE reduced correctly - empty',()=>{
            const action:any = Actions.applicationNetworkOffline();
            expect(reducer(undefined,action)).toMatchSnapshot();
        });

    });

});
