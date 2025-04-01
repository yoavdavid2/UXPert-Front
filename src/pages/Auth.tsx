import React, { useState } from 'react';
import SignIn from './SignIn';
import SignUp from './Signup';

export interface AuthPagesProps {
  onSwitchPage: () => void;
}

// Validation patterns
export const emailRegex = /^[\w.-]+@[\w.-]+\.[A-Za-z]{2,}$/;
export const passwordSignUpRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
export const passwordLogInRegex = /^.{8,}$/;

const AuthPages: React.FC = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const togglePage = () => setIsSignIn(!isSignIn);
  
  return isSignIn ? (
    <SignIn onSwitchPage={togglePage} /> 
  ) : (
    <SignUp onSwitchPage={togglePage} />
  );
};

export default AuthPages;
