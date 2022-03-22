import {Navigate, Outlet} from 'react-router-dom'
import { useAuthStatus } from '../hooks/useAuthStatus'
import LoadingSpinner from './LoadingSpinner'

const PrivateRoute = () => {
  const { loggedIn, checkingStatus } = useAuthStatus()

  if(checkingStatus) {
    return <LoadingSpinner />
  }

  // outlet allows you to return child elements in this case the profile route in app.js on line 20
  return loggedIn ? <Outlet /> : <Navigate to='/sign-in' />
}

export default PrivateRoute