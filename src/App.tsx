import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { router as routeConfig } from '@/router'

function App() {
  return <RouterProvider router={routeConfig}></RouterProvider>
}

export default App
