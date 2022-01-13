import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'; 
// routes
import { PATH_DASHBOARD, PATH_ADMIN } from '../routes/paths';

// ----------------------------------------------------------------------

GuestGuard.propTypes = {
  children: PropTypes.node
};

export default function GuestGuard({ children }) {
  // const { isAuthenticated } = useAuth();
  // const isAuthenticated = localStorage.getItem('token') 

  // if (isAuthenticated) {
  //   return <Link to={PATH_ADMIN.root} />;
  // }

  return <>{children}</>;
}
