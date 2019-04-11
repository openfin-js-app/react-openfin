# REACT-OPENFIN CONCISE DOCUMENTATION
> please refer [openfin-react-starter](https://github.com/openfin-js-app/openfin-react-starter) as an usage example 
while reading the doc 

## Installation

```text
    npm i react-openfin 
        or 
    yarn add react-openfin
```
## Initialization
Before using the contexts and renderring any components, react-openfin needs initializaiton
```typescript jsx
import { InitializeReactOpenfin } from 'react-openfin';

InitializeReactOpenfin({
    fin:window.fin,                                                     // openfin handler
    finUuid: process.env.REACT_APP_FIN_UUID,                            // openfin app uuid, very important
    sharedActions,                                                      // shared redux actions if needed
    i18n,                                                               // i18next handler
    hist,                                                               // url history handler
    configTabs,                                                         // config tabs
    launchBarItems,                                                     // launchbar items
    config:{
        // all optional sample default values, do not need to populate all in prod
        logActions:false,                                               // log internal action for debuging
        enableLoadingView:true,                                         // enable redirect to loading view on start
        enableAutoDocking:true,                                         // enable cross-window auto docking
        defaultViewUrl:'/dashboard/view-one',                           // default view url
        defaultDashboardViewUrl:'/dashboard/accessibility',             // default dashboard view url        
        defaultDashboardMinWidth:570,                                   // default dashboard min width
        defaultDashboardMinHeight:300,                                  // default dashboard min height
        defaultLoadingBannerWidth:728,                                  // default loading banner width
        defaultLoadingBannerHeight:450,                                 // default loading banner height
        defaultAppHeight:900,                                           // default app height
        defaultAppWidth:1400,                                           // default app width
        newWindowTop:60,                                                // the staring top pixel of new windows
        newWindowLeft:300,                                              // the staring left pixel of new windows
        newWindowWidth:640,                                             // the default width of new windows
        newWindowHeight:320,                                            // the default height of new windows
        newWindowDeltaLeft:40,                                          // the default vertical shift pixels of a new created window
        newWindowDeltaHeight:40,                                        // the default horizontal shift pixels of a new created window
        onAppAwaitDelayTime:4000,                                       // the fuse timout time to switch from loading view
        onAppChildAwaitDelayTime:200,                                   // the fuse timout time to switch to target child url
        onAppNotificationAwaitDelayTime:200,                            // the fuse timout time to switch to target notification url
        onAppClosingAwaitDelayTime:200,                                 // the fuse timout time to shutdown the whole application
    }
});
```


todo: to be continued, the author is lazy................. 