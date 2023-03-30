import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { router as routeConfig } from '@/router'
import { useTitle } from 'ahooks'

function App() {
  useTitle(_siteTitle)
  return <RouterProvider router={routeConfig}></RouterProvider>
}

export default App
