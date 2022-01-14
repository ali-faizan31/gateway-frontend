import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
// hooks 
// pages
import CommunityLogin from '../components/authentication/community/login/index';

// ----------------------------------------------------------------------

AuthGuard.propTypes = {
  children: PropTypes.node
};

export default function AuthGuard({ children }) {
  // const { isAuthenticated } = useAuth(); 
  const isAuthenticated = localStorage.getItem('token');
  const { pathname } = useLocation();
  const [requestedLocation, setRequestedLocation] = useState(null);

  if (!isAuthenticated) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }
    return <CommunityLogin />;
  }

  if (requestedLocation && pathname !== requestedLocation) {
    setRequestedLocation(null);
    return <Link to={requestedLocation} />;
  }

  return <>{children}</>;
}
