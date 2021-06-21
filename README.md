## JS SDK

This Javascript SDK is created by [Ingrow](https://ingrow.co) to using the Ingrow event streaming platform. It provides the functionality of collecting and sending events to the Ingrow system and make insights based on them.

## Install

Install with npm:

    npm install ingrow-js-sdk

Or with yarn:

    yarn add ingrow-js-sdk

## Import

Import ingrow with:

    import ingrow from "ingrow-js-sdk"

## Initialize

After importing SDK, you must initialize it by giving `api key` and `project id` that you have received from Ingrow panel.

    const myIngrow = new ingrow("API_KEY", "PROJECT_ID")

It is possible to trace events related to specific user by adding `user id` to arguments
and initialize like this:

    const myIngrow = new ingrow("API_KEY", "PROJECT_ID", "USER_ID")

By default ingrow set a cookie for every user that can be gravely useful for data analysis

By default the IP of user will attached automatically to events but You can
overwrite by sending the according IP in your custom data with `IP` key.

## Send Event

After initializing SDK, you can send event using `sendEvent()` method. You must pass stream name and custom data to sendEvent method, and also sendDeviceInfo which appends some information about user's device to the sending data if it was true. for example:

    myIngrow.sendEvent("STREAM_NAME", {
        description: "paginate",
        event_type: "Click",
        element_type: "Button",
        time: new Date(),
    }, sendDeviceInfo = false)
 
`sendEvent` method will return a promise, so you can handle success or failure of event sending, like other promises.
