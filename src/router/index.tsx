import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '@/layout/MainLayout'
import ManageLayout from '@/layout/ManageLayout'
import QuestionLayout from '@/layout/QuestionLayout'
import Home from '@/pages/Home'
import Register from '@/pages/Register'
import Login from '@/pages/Login'
import NotFound from '@/pages/NotFound'
import Trash from '@/pages/Manage/Trash'
import QuestionList from '@/pages/Manage/QuestionList'
import Star from '@/pages/Manage/Star'
import Edit from '@/pages/Question/Edit'
import Stat from '@/pages/Question/Stat'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: '',
        element: <Home></Home>
      },
      {
        path: 'login',
        element: <Login></Login>
      },
      {
        path: 'register',
        element: <Register></Register>
      },
      {
        path: 'manage',
        element: <ManageLayout></ManageLayout>,
        children: [
          {
            path: 'list',
            element: <QuestionList></QuestionList>
          },
          {
            path: 'star',
            element: <Star></Star>
          },
          {
            path: 'trash',
            element: <Trash></Trash>
          }
        ]
      },
      {
        path: '*',
        element: <NotFound></NotFound>
      }
    ]
  },
  {
    path: 'question',
    element: <QuestionLayout></QuestionLayout>,
    children: [
      {
        path: 'edit/:id',
        element: <Edit></Edit>
      },
      {
        path: 'stat/:id',
        element: <Stat></Stat>
      }
    ]
  }
])
