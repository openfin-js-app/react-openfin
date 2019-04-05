# React Openfin
[![version][version-badge]][CHANGELOG] [![license][license-badge]][LICENSE]

React utils for Openfin Application development

* All in typescript
* Provide general features for frameless window
* Provide a general client-side config service

![](https://albertleigh.github.io/openfin-react-latest/img/screenshoot.gif)

## Installation

```text
    npm i react-openfin 
    or 
    yarn add react-openfin
```

## Usage

```typescript jsx
import { InitializeReactOpenfin, ReactOpenfin } from 'react-openfin';
declare const window:any;

//  first initialized the react-openfin with all required parameters before rendering
InitializeReactOpenfin({
    fin:window.fin,
    finUuid: process.env.REACT_APP_FIN_UUID,
    sharedActions,
    i18n,
    hist,
    configTabs,
    launchBarItems,
});

// ...


// wrap all client react component beneath it
ReactDOM.render(
    <ReactOpenfin>
        <Provider store = {window.store}>
            <Suspense fallback={<CircularProgress/>}>
                <I18nextProvider i18n={i18n}>
                    <App/>
                </I18nextProvider>
            </Suspense>
        </Provider>
    </ReactOpenfin>
    ,
    document.getElementById('root')
);
```

## Advance features
```typescript
import { applyMiddleware, createStore, compose } from 'redux';
import { createReactOpenfinMiddleware } from 'react-openfin';

declare const window:any;

export default (
)=>{

    // use the built-in middleware to communicate with react-openfin for advanced features
    const reactOpenfinMiddleware = createReactOpenfinMiddleware();

    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const enhancers = composeEnhancers(
        applyMiddleware(
            reactOpenfinMiddleware,
        ),
    );

    const store = createStore(
        rootReducer,
        enhancers,
    );

    return store;

}
```



[LICENSE]: ./LICENSE.md
[CHANGELOG]: ./CHANGELOG.md


[version-badge]: https://img.shields.io/badge/version-0.70.10.beta-blue.svg
[license-badge]: https://img.shields.io/badge/license-MIT-blue.svg
