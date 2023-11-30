import { Navigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import Auth from '../utils/auth'

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
}

const ProtectedRoute = ({ children }) => {
  const isLoggedqIn = Auth.loggedIn()
  return isLoggedqIn ? children : <Navigate to="/" />
}

export default ProtectedRoute