import { useState, useEffect, PropsWithChildren } from "react";
import { useLocation } from "react-router";

const BackgroundWrapper: React.FC<PropsWithChildren> = ({ children }) => {
  const location = useLocation();
  const [background, setBackground] = useState("");

  useEffect(() => {
    switch (location.pathname) {
      case "/":
        setBackground("home-background");
        break;
      case "/signUp":
        setBackground("signup-background");
        break;
      default:
        setBackground("default-background");
        break;
    }
  }, [location.pathname]);

  return <div className={`app-container ${background}`}>{children}</div>;
};

export default BackgroundWrapper;
