import * as React from 'react';
import { createBrowserRouter } from 'react-router-dom'
import AdminMain from '../pages/admin/main'
export const router = createBrowserRouter([
  {
    path: '/',
    element: < AdminMain/>,
  },
])
