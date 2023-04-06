export type RegisterUserForm = {
  username: string
  password: string
  nickname: string
  confirm: string
}

export type LoginUserForm = {
  username: string
  password: string
  remember: boolean
}
