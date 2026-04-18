import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from '../utils/analytics';

const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      trackPageView(location.pathname + location.search, document.title);
    }, 0);
    return () => clearTimeout(timer);
  }, [location.pathname, location.search]);
};

export default usePageTracking;
