import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import SignIn from './Pages/SignIn/SignIn.tsx'
import SignUp from './Pages/SignUp/SignUp.tsx'
import Dashboard from './Pages/Dashboard/Dashboard.tsx'
import Products from './Components/Products/Products.tsx'
import AddItem from './Components/AddItem/AddItem.tsx'
import UpdateItem from './Components/UpdateItem/UpdateItem.tsx'
import Show from './Components/Show/Show.tsx'

const routes = createBrowserRouter(
  [
    {
      path: '/',
      element: <Navigate to="/signIn" replace />
    },
    {
      path: '/signIn',
      element: <SignIn/>
    },
    {
      path: '/signUp',
      element: <SignUp/>
    },
    {
      path: '/dashboard',
      element: <Dashboard/>,
      children : [
        {
          path: '',
          element: <Products/>
        },
        {
          path: '/dashboard/show/:id',
          element: <Show/>
        },
        {
          path: '/dashboard/add',
          element: <AddItem/>
        },
        {
          path: '/dashboard/update/:id',
          element: <UpdateItem/>
        },
      ]
    },
  ]
)


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={routes}/>
  </StrictMode>,
)
