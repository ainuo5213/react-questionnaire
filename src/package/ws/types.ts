export type UseWebsocketProp = {
  url: string
  autoReconnect?: boolean
  maxReconnectCount?: number
  immediate?: boolean
}

export const enum WebscoketStateEnum {
  Connecting,
  Connected,
  Closing,
  Closed
}
