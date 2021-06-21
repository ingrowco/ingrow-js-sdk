## JS SDK

This Javascript SDK is created by [Ingrow](https://ingrow.co) to use the Ingrow event streaming platform. It provides the functionality of collecting and sending events to the Ingrow system and make insights based on them.

## Install

Install with npm:

    npm install ingrow-js-sdk

Or with yarn:

    yarn add ingrow-js-sdk

## Import

Import ingrow with:
```js
import ingrow from "ingrow-js-sdk"
```

Or copy the following tag in your project
```html
<script src="https://github.com/ingrowco/ingrow-js-sdk/blob/main/dist/index.js" />
```

## Initialize

After importing SDK, you must initialize it by giving `api key` and `project id` that you have received from Ingrow panel.
```js
    const myIngrow = new ingrow("API_KEY", "PROJECT_ID")
```
It is possible to trace events related to specific user by adding `user id` to arguments
and initialize like this:
```js
    const myIngrow = new ingrow("API_KEY", "PROJECT_ID", "USER_ID")
```
    Or using setUserID method
```js
    myIngrow.setUserID("USER_ID")
```
By default ingrow set a cookie for every user that can be gravely useful for data analysis

By default the IP of user will attached automatically to events but You can
overwrite by sending the according IP in your custom data with `IP` key.

## Send Event

After initializing SDK, you can send event using `sendEvent()` method. You must pass stream name and custom data to sendEvent method. for example:
```js
myIngrow.sendEvent("STREAM_NAME", {
    description: "paginate",
    event_type: "Click",
    element_type: "Button",
}, {
    sendDeviceInfo: false, // sends device info (default is false)
    done: () => {}, // it will be called when it gets done
})
```
`sendEvent` method will return a promise, so you can handle success or failure of event sending, like other promises.
