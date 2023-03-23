import { message } from 'antd'

export function alertError(err: unknown) {
  const msg = err instanceof Error ? err.message : (err as string)
  message.error(msg)
}
