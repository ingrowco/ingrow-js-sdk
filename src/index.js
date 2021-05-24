function getRandomString(len) {
  let s = ""
  while (s.length < len)
    s += Math.random().toString(36).substr(2, len - s.length)
  return s
}

function getCreatedAnonymousId() {
  const ingrowKeyName = "ingrow_events_anonymous_id"
  let anonymousId = localStorage.getItem(ingrowKeyName)

  if (!anonymousId) {
    anonymousId = getRandomString(32)
    localStorage.setItem(ingrowKeyName, anonymousId)
  }

  return anonymousId
}

function getDeviceInfo() {
  const { userAgent, appName: browserName } = navigator;
  const { screen: { width, height } } = window;
  return { userAgent, browserName, screen: { width, height } };
}

export default class ingrow {
  constructor(apiKey, projectID) {
    this.apiKey = apiKey
    this.projectID = projectID
    this.apiEndpoint = "https://event.ingrow.co"
    this.anonymousId = getCreatedAnonymousId()
    this.ip = "autofill"
  }

  sendEvent(stream, data, userId = "", sendDeviceInfo = false) {
    const enrichment = [];
    const enrich = (name, input) => { enrichment.push({ name , input }) }

    enrich('session', { anonymous_id: this.anonymousId, user_id: userId });
    enrich('ip', { ip: this.ip });
    if (sendDeviceInfo) { enrich('browser', getDeviceInfo()); }

    return fetch(`${this.apiEndpoint}/v1`, {
      method: "POST",
      headers: {
        "api-key": this.apiKey,
      },
      body: JSON.stringify({
        ingrow: {
          stream,
          project: this.projectID,
        },
        enrichment,
        event: data,
      }),
    })
  }
}