import React, { useEffect, useState } from "react";
import SignIn from "./SignIn";
import SignUp from "./Signup";
import { useLocation } from "react-router";

export interface AuthPagesProps {
  onSwitchPage: () => void;
}

// Validation patterns
export const emailRegex = /^[\w.-]+@[\w.-]+\.[A-Za-z]{2,}$/;
export const passwordSignUpRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
export const passwordLogInRegex = /^.{8,}$/;

const AuthPages: React.FC = () => {
  const location = useLocation();
  const [isSignIn, setIsSignIn] = useState(
    location?.state ? location.state == "login" : true
  );
  const togglePage = () => setIsSignIn(!isSignIn);

  useEffect(() => {
    if (location?.state) {
      setIsSignIn(location.state === "login");
    }
  }, [location.state]);

  return isSignIn ? (
    <SignIn onSwitchPage={togglePage} />
  ) : (
    <SignUp onSwitchPage={togglePage} />
  );
};

export default AuthPages;
