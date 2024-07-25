import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/footer';
import { useDispatch, useSelector } from 'react-redux';
import Lightbox from '@/components/Lightbox';
import Login from '@/components/Login';
import { closeLoginPopup, closePopup } from 'store/actions/commonAction';
import AllPopUp from '@/components/common/AllPopUp';
import { useEffect, useState } from 'react';
import { setLoading } from 'store/actions/authAction';
import { useRouter } from 'next/router';
import Loading from '@/components/Loading';
import UploadItemForm from '@/components/common/UploadItemForm';

const Layout = (props) => {
  const{children,user}=props
  const dispatch = useDispatch();
  const router = useRouter();
  const isLoginPopupOpen = useSelector((state) => state.common.isLoginPopupOpen);
  const isPopupOpen=useSelector((state) => state.common.isPopupOpen);
  const {title, content }=useSelector((state) => state.common.popupInfo);
  const isLoading = useSelector((state) => state.auth.loading);
  
  useEffect(() => {
    const handleStart = () => dispatch(setLoading(true));
    const handleComplete = () => dispatch(setLoading(false));

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    setLoading(false);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router,dispatch]);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    switch (content) {
      case 'upload':
       setSelectedOption(<UploadItemForm />)
        break;
      case 'error':
        // Code for option 2
        break;
      default:
        setSelectedOption(null);
    }
  }, [content]);


  const hideLightbox = () => {
    dispatch(closeLoginPopup());
  };
  const onClose = () => {
    dispatch(closePopup());
  };

  return (
    <>
      <Head>
        <title>Closet Connect</title>
        <meta charSet='utf-8' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <div className='h-full'>
        <Header  user={user} />
        {isLoading ? <Loading />:
        <main>
          {children}
        </main>}
         <Footer />
      </div>
      <Lightbox isOpen={isLoginPopupOpen} onClose={hideLightbox} content={<Login/>} />
      <AllPopUp isOpen={isPopupOpen} onClose={onClose} title={title} content={selectedOption}/>
    </>
  )
}

export default Layout