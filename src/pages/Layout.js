import React from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import { useDispatch, useSelector } from 'react-redux';
import Lightbox from '@/components/Lightbox';
import Login from '@/components/Login';
import { closeLoginPopup, closePopup, setPageLoading, setPopup } from 'store/actions/commonAction';
import AllPopUp from '@/components/common/AllPopUp';
import { useEffect, useState } from 'react';
import Loading from '@/components/Loading';
import UploadItemForm from '@/components/common/UploadItemForm';
import Footer from '../components/Footer';
import { handleTrigger } from 'utils/utils';

const Layout = (props) => {
  const { children, user } = props;
  const dispatch = useDispatch();
  const isLoginPopupOpen = useSelector((state) => state.common.isLoginPopupOpen);
  const isPopupOpen = useSelector((state) => state.common.isPopupOpen);
  const { title, content, data } = useSelector((state) => state.common.popupInfo);
  const isLoading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.common.error);
  const loginError = useSelector((state) => state.auth.error);
  const info = useSelector((state) => state.common.info);

  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    switch (content) {
      case 'upload':
        setSelectedOption(<UploadItemForm />);
        break;
      case 'edit':
        setSelectedOption(<UploadItemForm initialData={data} isUpdate={true} />);
        break;
      case 'error':
        setSelectedOption(error);
        break;
      case 'loginError':
        setSelectedOption(loginError);
        break;
      case 'info':
        setSelectedOption(info);
        break;
      default:
        setSelectedOption(content);
    }
  }, [content]);
  
  useEffect(() => {
    dispatch(setPageLoading(false));
  }, []);

  useEffect(() => {
    if (error) {
      handleTrigger(true, dispatch, setPopup({ title: 'Error', content: 'error' }));
    }
    if (loginError) {
      handleTrigger(true, dispatch, setPopup({ title: 'Error', content: 'loginError' }));
    }
    if (info) {
      handleTrigger(true, dispatch, setPopup({ title: 'Error', content: 'error' }));
    }
  }, [error, info, dispatch]);

  const hideLightbox = () => {
    dispatch(closeLoginPopup());
  };
  const onClose = () => {
    dispatch({type:'LOGIN_SET_ERROR',payload:null})
    dispatch(closePopup());
  };

  return (
    <>
      <Head>
        <title>Closet Connect</title>
        <meta charSet='utf-8' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <div className='min-h-screen flex flex-col'>
        <Header user={user} />
          <main className='flex-grow'>
            {children}
          </main>
        <Footer className='w-full' />
      </div>
      <Lightbox isOpen={isLoginPopupOpen} onClose={hideLightbox} content={<Login />} />
      <AllPopUp isOpen={isPopupOpen} onClose={onClose} title={title} content={selectedOption} />
    </>
  );
};

export async function getServerSideProps(context) {
  
}


export default Layout;