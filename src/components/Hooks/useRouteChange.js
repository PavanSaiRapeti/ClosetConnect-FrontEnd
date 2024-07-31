import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from 'store/actions/authAction';
import { setPageLoading } from 'store/actions/commonAction';

const useRouteChange = () => {
  const [isRouteChanging, setIsRouteChanging] = useState(false);
  const {pageLoading} = useSelector((state) => state.common);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
   
      if (pageLoading) {
        setIsRouteChanging(false);
      }else{
        const handleStart = () => {
          setIsRouteChanging(true);
        };
        const handleComplete = () => {
          setTimeout(() => {
            setIsRouteChanging(false);
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
      }

    
  }, [router,pageLoading, dispatch]);

  return isRouteChanging;
};

export default useRouteChange;