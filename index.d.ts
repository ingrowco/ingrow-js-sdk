interface Options {
  sendDeviceInfo: boolean,
  done: (err: object, response: object) => void
}

export declare class Ingrow {
  constructor(apiKey: string, projectID: string, userId?: string);
  setUserID(userID: string): void;
  sendEvent(stream: string, data: object, options: Options): void;
}