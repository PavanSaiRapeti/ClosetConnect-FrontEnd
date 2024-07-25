import React from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import { useDispatch, useSelector } from 'react-redux';
import Lightbox from '@/components/Lightbox';
import Login from '@/components/Login';
import { closeLoginPopup, closePopup, setPopup } from 'store/actions/commonAction';
import AllPopUp from '@/components/common/AllPopUp';
import { useEffect, useState } from 'react';
import { setLoading } from 'store/actions/authAction';
import { useRouter } from 'next/router';
import Loading from '@/components/Loading';
import UploadItemForm from '@/components/common/UploadItemForm';
import Footer from '../components/Footer';
import { handleTrigger } from 'utils/utils';

const Layout = (props) => {
  const{children,user}=props
  const dispatch = useDispatch();
  const router = useRouter();
  const isLoginPopupOpen = useSelector((state) => state.common.isLoginPopupOpen);
  const isPopupOpen=useSelector((state) => state.common.isPopupOpen);
  const {title, content }=useSelector((state) => state.common.popupInfo);
  const isLoading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.common.error);
  const info = useSelector((state) => state.common.info);
  
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
       setSelectedOption(error)
        break;
      case 'info':
        setSelectedOption(info)
      default:
        setSelectedOption(null);
    }
  }, [content]);


  useEffect(() => {
    console.log('+trigrgrer',error);
    if(error)  {
      handleTrigger(true,dispatch,setPopup({title:'Error', content: 'error'}));
    }
    if(info){

    }
  }, [error,info,dispatch]);


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