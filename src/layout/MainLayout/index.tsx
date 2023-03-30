import React from 'react'
import { Outlet } from 'react-router-dom'
export default function MainLayout() {
  return (
    <div>
      <div>MainLayout Header</div>
      <div>
        <Outlet></Outlet>
      </div>
      <div>MainLayout Footer</div>
    </div>
  )
}
