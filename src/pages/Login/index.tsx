import { Button } from 'antd'
import React, { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
export default function Login() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  console.log(searchParams.get('test'))
  useEffect(() => {
    setTimeout(() => {
      setSearchParams({
        test: '3'
      })
      console.log(searchParams.get('test'))
    }, 200)
  }, [])

  return (
    <div>
      <p>这是登陆页面</p>
      <Button type="primary" onClick={() => navigate(-1)}>
        返回
      </Button>
    </div>
  )
}
