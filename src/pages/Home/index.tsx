import { Button } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'
export default function Home() {
  const navigate = useNavigate()
  function onLoginBtnClick() {
    navigate({
      pathname: '/login',
      search: '&test=1'
    })
  }
  return (
    <div>
      <p>Home</p>
      <div>
        <Button type="primary" onClick={onLoginBtnClick}>
          登录
        </Button>
      </div>
    </div>
  )
}
