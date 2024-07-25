import React from 'react';
import Tabs from './Tabs';
import LoginContent from './LoginContent';
import RegisterContent from './RegisterContent';
import LogoSymbol from 'websiteInfo/LogoSymbol';

function Login() {

  const tabs = [
    { label: 'Login', content: <LoginContent /> },
    { label: 'Register', content: <RegisterContent /> },
  ];

  return (
    <div className="container mx-auto  lg:p-12">
      <div className='hidden md:block w-1/6 m-auto'>
       <LogoSymbol className='w-full h-auto' />
       </div>
      <div className="flex justify-center">
       <Tabs tabs={tabs}/>
      </div>
    </div>
  );
}

export default Login;