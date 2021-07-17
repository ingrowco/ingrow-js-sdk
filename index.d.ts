declare interface Options {
  sendDeviceInfo?: boolean,
  done?: (err?: object, response?: object) => void
}

declare class Ingrow {
  constructor(apiKey: string, projectID: string, userId?: string);
  setUserID(userID: string): void;
  sendEvent(data: object, streamName?: string, options?: Options): void;
}

export default Ingrow