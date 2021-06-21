function getRandomString(len) {
  let s = ""
  while (s.length < len)
    s += Math.random().toString(36).substr(2, len - s.length)
  return s
}
function getCreatedAnonymousId() {
  const ingrowKeyName = "ingrow_events_anonymous_id"
  let anonymousId = window.localStorage?.getItem(ingrowKeyName)

  if (!anonymousId) {
    anonymousId = getRandomString(32)
    window.localStorage?.setItem(ingrowKeyName, anonymousId)
  }

  return anonymousId
}

function getDeviceInfo() {
  const { userAgent, appName: browserName } = navigator;
  const { screen: { width, height } } = window;
  return { userAgent, browserName, screen: { width, height } };
}

export default class ingrow {
  constructor(apiKey, projectID, userId) {
    this.apiKey = apiKey
    this.projectID = projectID
    this.apiEndpoint = "https://event.ingrow.co"
    this.anonymousId = getCreatedAnonymousId()
    this.ip = "autofill"
    this.setUserID(userId)
  }
  
  setUserID(userId) {
    this.userId = userId || ""
  }

  sendEvent(stream, data, options) {
    const { sendDeviceInfo = false, done } = options || {}
    const enrichment = [];
    const enrich = (name, input) => { enrichment.push({ name , input }) }

    enrich('session', { anonymous_id: this.anonymousId, user_id: userId });
    enrich('ip', { ip: this.ip });
    if (sendDeviceInfo) { enrich('device', getDeviceInfo()); }

    const sendingData = {
      ingrow: { stream, project: this.projectID },
      enrichment,
      event: data,
    }
    const xhr = new XMLHttpRequest();
    xhr.setRequestHeader("api-key", this.apiKey);
    xhr.open("POST", `${this.apiEndpoint}/v1`);
    xhr.send(JSON.stringify(sendingData));
    xhr.onload = function () {
      done && done(xhr.response);
    };
    xhr.onerror = function () {
      done && done(null, xhr.response);
    };
  }
}