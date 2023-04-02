import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { router as routeConfig } from '@/router'
import { ConfigProvider } from 'antd'
import zh_CN from 'antd/lib/locale/zh_CN'

function App() {
  return (
    <ConfigProvider locale={zh_CN}>
      <RouterProvider router={routeConfig}></RouterProvider>
    </ConfigProvider>
  )
}

export default App
