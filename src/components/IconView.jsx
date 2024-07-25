import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import SignedInMenu from './SignedInMenu';
import SignInMenu from './SignInMenu';

const IconView = () => { 
  const router = useRouter();
  const [isSignInMenuOpen, setIsSignInMenuOpen] = useState(false);
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn); 
  const user =useSelector(state => state.auth.user); 

  return (  
    <ul className="flex space-x-2">  
      <li className=" relative list-none">  
        <button className="focus:outline-none cursor-pointer" onClick={() => router.push('/help')}>  
          <div className="text-center inline-block w-14 text-primary-variant-2  rounded-sm">  
            <i className="fas fa-question-circle text-2xl leading-6"></i>
          </div>  
        </button>  
      </li>  

     {
      user ?  <li className=" relative list-none text-right">  
      <a className="inline-block text-primary-variant-2 rounded-sm hover:border-primary-accent-1" href="/notifications">  
        <i className="w-full text-center fas fa-bell text-2xl leading-6"></i>
      </a>  
    </li>  :''
     }

      <li className="sign-in-icon  relative list-none">  
        <button onMouseEnter={() => setIsSignInMenuOpen(true)} onClick={() => setIsSignInMenuOpen(false)} className="focus:outline-none cursor-pointer hidden md:block">  
          <div className="text-center inline-block w-14 text-primary-variant-2 rounded-sm">  
            <i className="fas fa-user-circle text-2xl text-center leading-6"></i> 
          </div>  
        </button>
        {isSignInMenuOpen && (
          isLoggedIn ? (
            <SignedInMenu setIsSignedInMenuOpen={setIsSignInMenuOpen} userName={user? user.name : 'Guest'} />
          ) : (
            <SignInMenu setIsSignInMenuOpen={setIsSignInMenuOpen} />
          )
        )}
      </li>  
    </ul>  
  );  
};  

export default IconView;