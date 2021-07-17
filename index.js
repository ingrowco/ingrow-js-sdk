import { getCreatedAnonymousId } from "./src/anonymous-id"
import { getDeviceInfo } from "./src/get-device-info"

export default class Ingrow {
  constructor(apiKey, projectID, userId) {
    if (!apiKey) throw 'please set the apiKey';
    if (!projectID) throw 'please set the projectID';
    this.apiKey = apiKey
    this.projectID = projectID
    this.apiEndpoint = "https://event.ingrow.co"
    this.anonymousId = getCreatedAnonymousId()
    this.ip = "autofill"
    this.streamDefaultName = "events"
    this.setUserID(userId)
  }
  
  setUserID(userId) {
    this.userId = userId || ""
  }

  setStreamDefault(streamDefaultName) {
    this.streamDefaultName = streamDefaultName
  }

  sendEvent(data, streamName, options) {
    const stream = streamName || this.streamDefaultName
    const { sendDeviceInfo = false, done } = options || {}
    const enrichment = [];
    const enrich = (name, input) => { enrichment.push({ name , input }) }

    enrich('session', { anonymous_id: this.anonymousId, user_id: this.userId });
    enrich('ip', { ip: this.ip });
    if (sendDeviceInfo) { enrich('device', getDeviceInfo()); }

    const sendingData = {
      ingrow: { stream, project: this.projectID },
      enrichment,
      event: data,
    }

    const xhr = new XMLHttpRequest();
    xhr.open("POST", `${this.apiEndpoint}/v1`);
    xhr.setRequestHeader("api-key", this.apiKey);
    xhr.send(JSON.stringify(sendingData));
    xhr.onload = function () {
      done && done(xhr.response);
    };
    xhr.onerror = function () {
      done && done(null, xhr.response);
    };
  } 
}