import * as ReactDOM from 'react-dom/client'
import './index.css'
import { router } from './routes/routes'
import { RouterProvider } from 'react-router-dom'
import ContextWrapper from './context/context'

ReactDOM.createRoot(document.getElementById('root')).render(
  <ContextWrapper>
    <RouterProvider router={router} />
  </ContextWrapper>
)
