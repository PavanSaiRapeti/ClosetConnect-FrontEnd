import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { setLoading } from 'store/actions/authAction';
import { setPageLoading } from 'store/actions/commonAction';

const useRouteChange = () => {
  const [isRouteChanging, setIsRouteChanging] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleStart = () => {
      setIsRouteChanging(true);
    };
    const handleComplete = () => {
      setTimeout(() => {
        setIsRouteChanging(false);
      }, 2000); // Increased loading time by adding a 2-second delay
    };

    router.events.on('routeChangeComplete', handleStart);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeComplete', handleStart);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router, dispatch]);

  return isRouteChanging;
};

export default useRouteChange;