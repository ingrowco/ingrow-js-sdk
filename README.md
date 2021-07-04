## Ingrow JS SDK

This Javascript SDK is created by [Ingrow](https://ingrow.co). It helps you send events in your web applications to the Ingrow event streaming platform to make insights based on them.

[![MIT License][license-image]][license-url]
[![NPM version][npm-version-image]][npm-url]

## Install and Initialize ingrow-js-sdk in an HTML file
```HTML
<script src="https://github.com/ingrowco/ingrow-js-sdk/blob/main/dist/index.js" />
<script>
    var ingrow = new Ingrow("API_KEY", "PROJECT_ID")
</script>
```

## Install and Initialize ingrow-js-sdk in front-end JavaScript projects

Install with npm or yarn
```sh
npm install ingrow-js-sdk
```
Import SDK
```js
import Ingrow from "ingrow-js-sdk"
```
After importing SDK, you must initialize it by giving `api key` and `project id` that you have received from Ingrow panel.
```js
const myIngrow = new Ingrow("API_KEY", "PROJECT_ID")
```

### Set your users
It is possible to trace events related to specific user by adding `user id` to arguments and initialize like this:
```js
const myIngrow = new Ingrow("API_KEY", "PROJECT_ID", "USER_ID")
```
Or using setUserID method
```js
myIngrow.setUserID("USER_ID")
```
By default ingrow set an id in localstorage for all users which is gravely useful for data analysis

By default the IP of user will attached automatically to events but You can
overwrite by sending the according IP in your custom data with `IP` key.

## Send Event

After initializing SDK, you can send event using `sendEvent()` method. You must pass stream name and custom data, and optionally pass options which is described bellow. for example:
```js
myIngrow.sendEvent("STREAM_NAME", {
    description: "paginate",
    event_type: "Click",
    element_type: "Button",
}, {
    sendDeviceInfo: false, // append some information about users device
    done: () => {}, // it will be called when it gets done
})
```

[license-image]: http://img.shields.io/badge/license-MIT-blue.svg?style=flat
[license-url]: LICENSE

[npm-url]: https://www.npmjs.com/package/ingrow-js-sdk
[npm-version-image]: http://img.shields.io/npm/v/ingrow-js-sdk.svg?style=flat