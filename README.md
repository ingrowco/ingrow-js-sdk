## JS SDK

This Javascript SDK is created by [Ingrow](https://ingrow.co) to using the Ingrow event streaming platform. It provides the functionality of collecting and sending events to the Ingrow system and make insights based on them.

## Initialize

After importing SDK, you must initialize it by giving `api key` and `project id` that you have received from Ingrow panel.

    const myLungo = new lungo("api key", "project Id")

By initializing the SDK, an object generated and will be attached to every event that you send. An example of the object looks like:

    {
        city: "Nuremberg",
        continent_code: "EU",
        country: "DE",
        country_area: 357021,
        country_code_iso3: "DEU",
        country_name: "Germany",
        country_population: 82927922,
        country_tld: ".de",
        ip: "195.248.241.174",
        org: "BitCommand",
        region: "Bavaria",
        version: "IPv4"
    }

You can overwrite the above information by sending the according key in your custom data.

## Send Event

After initializing SDK, you can send event using `sendEvent()` method. You must pass stream name and custom data to sendEvent method. for example:

    myLungo.sendEvent("streamName", {
        description: "paginate",
        event_type: "Click",
        element_type: "Button",
        time: new Date(),
    })

`sendEvent` method will return a promise, so you can handle success or failure of event sending like other promises.


## Configurations

By default the event endpoint is Ingrow's event listener endpoint. In the case of on-premises deployment, you can set an environment variable named `LUNGO_ENDPOINT` to change this address.
