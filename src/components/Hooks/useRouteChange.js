import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { setLoading } from 'store/actions/authAction';

const useRouteChange = () => {
  const [isRouteChanging, setIsRouteChanging] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleStart = () => {
      setIsRouteChanging(true);
      dispatch(setLoading(true));
    };
    const handleComplete = () => {
      setTimeout(() => {
        setIsRouteChanging(false);
        dispatch(setLoading(false));
      }, 2000); // Increased loading time by adding a 2-second delay
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router, dispatch]);

  return isRouteChanging;
};

export default useRouteChange;