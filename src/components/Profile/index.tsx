import { routePathMap } from '@/router'
import React from 'react'
import { Link } from 'react-router-dom'

export default function Profile() {
  return (
    <div>
      <Link to={routePathMap.login}>登录</Link>
    </div>
  )
}
