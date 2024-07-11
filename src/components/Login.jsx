import React from 'react';
import Tabs from './Tabs';
import LoginContent from './LoginContent';
import RegisterContent from './RegisterContent';

function Login() {

  const tabs = [
    { label: 'Login', content: <LoginContent /> },
    { label: 'Register', content: <RegisterContent /> },
  ];

  return (
    <div className="container mx-auto  lg:p-12">
      <div className="flex justify-center">
       <Tabs tabs={tabs}/>
      </div>
    </div>
  );
}

export default Login;