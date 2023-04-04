import { useEffect, useRef, useState } from 'react'
import { UseWebsocketProp, WebscoketStateEnum } from './types'

export function useSocket(prop: UseWebsocketProp) {
  const socket = useRef<WebSocket | null>(null)
  const currentConnectCount = useRef<number>(0)
  const [message, setMessage] = useState()
  const [socketState, setSocketState] = useState<WebscoketStateEnum>(WebscoketStateEnum.Connecting)
  function createWebscoket() {
    if (socket.current) {
      closeWebscoket()
    }
    socket.current = new WebSocket(prop.url)
    socket.current.onopen = function () {
      setSocketState(this.readyState as WebscoketStateEnum)
    }
    socket.current.onclose = function () {
      setSocketState(this.readyState as WebscoketStateEnum)
    }
    socket.current.onerror = function () {
      setSocketState(this.readyState as WebscoketStateEnum)
      if (prop.autoReconnect) {
        reconnect()
      }
    }
    socket.current.onmessage = function (e) {
      setMessage(e.data)
    }
  }
  function closeWebscoket() {
    if (socket.current) {
      socket.current.close()
      socket.current = null
    }
  }
  function send(message: string | ArrayBufferLike | Blob | ArrayBufferView) {
    if (socket.current) {
      socket.current.send(message)
    }
  }
  function reconnect() {
    if (!prop.maxReconnectCount || prop.maxReconnectCount < 0) {
      return
    }
    if (currentConnectCount.current > prop.maxReconnectCount) {
      return
    }
    createWebscoket()
  }

  useEffect(() => {
    if (prop.immediate) {
      createWebscoket()
    }
    return () => {
      closeWebscoket()
    }
  }, [])

  return {
    send,
    reconnect,
    message,
    socketState
  }
}
