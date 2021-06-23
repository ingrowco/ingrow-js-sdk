## JS SDK

This Javascript SDK is created by [Ingrow](https://ingrow.co) to use the Ingrow event streaming platform. It provides the functionality of sending events to the Ingrow system to make insights based on them.

## Install

Install with npm:
```sh
npm install ingrow-js-sdk
```
Or with yarn:
```sh
yarn add ingrow-js-sdk
```

## Import

Import ingrow with:
```js
import Ingrow from "ingrow-js-sdk"
```
Or copy the following tag in your project
```html
<script src="https://github.com/ingrowco/ingrow-js-sdk/blob/main/dist/index.js" />
```

## Initialize

After importing SDK, you must initialize it by giving `api key` and `project id` that you have received from Ingrow panel.
```js
const myIngrow = new Ingrow("API_KEY", "PROJECT_ID")
```
It is possible to trace events related to specific user by adding `user id` to arguments
and initialize like this:
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
