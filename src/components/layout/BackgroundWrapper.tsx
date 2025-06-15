import React, { useState, useEffect, PropsWithChildren } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";

import homepageSvg from "../../assets/images/homepage.svg";
import signupSvg from "../../assets/images/signup.svg";

const BACKGROUND_CONFIG = {
  "/": {
    primaryPath:
      "M0,931.963C170.465,954.913,331.069,822.136,446.271,694.411C548.369,581.215,526.121,407.698,595.356,271.89C669.27,126.903,841.079,37.013,863.577,-124.164C888.044,-299.445,826.94,-482.916,720.449,-624.272C610.517,-770.196,446.864,-874.951,268.424,-914.168C95.668,-952.136,-92.895,-925.778,-245.648,-836.6C-384.713,-755.413,-434.162,-587.336,-522.273,-452.552C-597.261,-337.842,-680.9,-234.101,-724.46,-104.162C-775.612,48.423,-868.67,219.941,-795.82,363.439C-722.686,507.497,-506.654,489.901,-375.194,583.814C-233.497,685.04,-172.583,908.727,0,931.963",
    secondaryPath:
      "M1920,1819.795C2061.006,1823.26,2197.294,1772.365,2315.453,1695.337C2433.096,1618.645,2519.584,1507.771,2587.331,1384.76C2659.41,1253.885,2714.618,1114.721,2717.494,965.338C2720.714,798.082,2703.014,622.063,2604.621,486.772C2502.843,346.826,2339,267.205,2173.357,217.146C2006.806,166.813,1829.482,154.169,1662.185,201.962C1494.162,249.963,1332.479,341.213,1233.934,485.52C1139.645,623.594,1141.085,800.557,1139.244,967.744C1137.601,1116.892,1150.887,1267.832,1223.886,1397.905C1293.62,1522.159,1414.991,1602.352,1536.844,1676.203C1655.898,1748.358,1780.829,1816.375,1920,1819.795",
    primaryColor: "#aab4ca",
    secondaryColor: "#f4f6f8",
    bgColor: "rgba(207, 213, 225, 1)",
    cornerImage: homepageSvg,
    hasCornerImage: true,
    cornerStyles: {
      width: "30%",
      height: "85%",
      bottom: "10%",
      right: "3%",
    },
  },

  "/results": {
    primaryPath:
      "M0,391.869C74.133,376.426,147.822,369.455,215.106,334.712C287.872,297.139,358.964,253.139,402.725,183.918C450.01,109.123,486.12,19.403,469.374,-67.486C452.829,-153.333,381.979,-216.852,314.721,-272.707C255.17,-322.162,176.645,-331.96,107.947,-367.635C18.017,-414.336,-53.383,-541.428,-151.104,-514.614C-248.202,-487.971,-233.215,-335.217,-296.27,-256.719C-355.717,-182.713,-470.546,-160.797,-506.038,-72.757C-543.813,20.946,-530.602,131.262,-489.97,223.762C-449.06,316.895,-377.818,405.169,-281.602,438.181C-189.762,469.691,-95.055,411.67,0,391.869",
    secondaryPath:
      "M1920 1633.559C2021.412 1623.772 2091.396 1535.143 2177.434 1480.575 2264.1059999999998 1425.605 2365.122 1393.2939999999999 2427.423 1311.732 2498.938 1218.109 2585.802 1102.131 2552.928 988.999 2519.389 873.58 2364.145 852.018 2271.565 775.367 2198.047 714.498 2154.384 619.4390000000001 2065.272 585.249 1972.929 549.819 1871.923 567.273 1774.56 584.678 1666.959 603.914 1539.074 605.456 1471.5230000000001 691.392 1404.005 777.2860000000001 1440.125 901.664 1439.511 1010.9159999999999 1438.982 1105.127 1436.1390000000001 1197.743 1468.18 1286.339 1502.274 1380.612 1549.033 1472.464 1628.521 1533.55 1711.652 1597.435 1815.642 1643.63 1920 1633.559",
    primaryColor: "#aab4ca",
    secondaryColor: "#f4f6f8",
    bgColor: "rgba(207, 213, 225, 1)",
    hasCornerImage: false,
  },

  "/auth": {
    primaryPath:
      "M0,488.045C114.558,486.619,233.922,575.177,335.084,521.4C435.955,467.778,459.516,334.488,493.835,225.527C524.716,127.482,547.867,24.543,522.994,-75.195C499.334,-170.071,409.472,-227.552,359.835,-311.799C295.509,-420.976,309.513,-604.418,188.685,-642.603C68.756,-680.503,-22.197,-518.772,-137.722,-469.039C-234.506,-427.374,-364.199,-455.006,-432.824,-375.045C-501.437,-295.098,-462.5,-172.875,-480.924,-69.146C-500.171,39.214,-568.65,141.07,-543.527,248.22C-516.565,363.212,-448.548,482.131,-340.489,529.811C-233.71,576.926,-116.702,489.498,0,488.045",
    secondaryPath:
      "M1920,1708.692C2038.991,1703.076,2158.862,1670.674,2251.372,1595.626C2339.271,1524.318,2396.168,1417.905,2415.84,1306.442C2433.31,1207.459,2374.695,1115.915,2353.373,1017.69C2333.911,928.037,2349.169,828.961,2295.966,754.223C2240.785,676.707,2144.968,646.716,2059.508,604.879C1956.661,554.537,1859.28,475.037,1745.168,484.578C1623.971,494.711,1487.804,549.158,1432.21,657.328C1376.141,766.421,1460.785,893.499,1472.236,1015.621C1480.534,1104.121,1476.523,1188.439,1490.245,1276.262C1509.157,1397.305,1481.537,1540.987,1567.897,1627.884C1654.536,1715.062,1797.229,1714.486,1920,1708.692",
    primaryColor: "#a7b2c8",
    secondaryColor: "#f7f8fa",
    bgColor: "rgba(207, 213, 225, 1)",
    cornerImage: signupSvg,
    hasCornerImage: true,
    cornerStyles: {
      width: "30%",
      height: "45%",
      bottom: "0%",
      right: "0%",
    },
  },

  "/profile": {
    primaryPath:
      "M0,391.869C74.133,376.426,147.822,369.455,215.106,334.712C287.872,297.139,358.964,253.139,402.725,183.918C450.01,109.123,486.12,19.403,469.374,-67.486C452.829,-153.333,381.979,-216.852,314.721,-272.707C255.17,-322.162,176.645,-331.96,107.947,-367.635C18.017,-414.336,-53.383,-541.428,-151.104,-514.614C-248.202,-487.971,-233.215,-335.217,-296.27,-256.719C-355.717,-182.713,-470.546,-160.797,-506.038,-72.757C-543.813,20.946,-530.602,131.262,-489.97,223.762C-449.06,316.895,-377.818,405.169,-281.602,438.181C-189.762,469.691,-95.055,411.67,0,391.869",
    secondaryPath:
      "M1920 1633.559C2021.412 1623.772 2091.396 1535.143 2177.434 1480.575 2264.1059999999998 1425.605 2365.122 1393.2939999999999 2427.423 1311.732 2498.938 1218.109 2585.802 1102.131 2552.928 988.999 2519.389 873.58 2364.145 852.018 2271.565 775.367 2198.047 714.498 2154.384 619.4390000000001 2065.272 585.249 1972.929 549.819 1871.923 567.273 1774.56 584.678 1666.959 603.914 1539.074 605.456 1471.5230000000001 691.392 1404.005 777.2860000000001 1440.125 901.664 1439.511 1010.9159999999999 1438.982 1105.127 1436.1390000000001 1197.743 1468.18 1286.339 1502.274 1380.612 1549.033 1472.464 1628.521 1533.55 1711.652 1597.435 1815.642 1643.63 1920 1633.559",
    primaryColor: "#aab4ca",
    secondaryColor: "#f4f6f8",
    bgColor: "rgba(207, 213, 225, 1)",
    hasCornerImage: false,
  },

  default: {
    primaryPath:
      "M0,931.963C170.465,954.913,331.069,822.136,446.271,694.411C548.369,581.215,526.121,407.698,595.356,271.89C669.27,126.903,841.079,37.013,863.577,-124.164C888.044,-299.445,826.94,-482.916,720.449,-624.272C610.517,-770.196,446.864,-874.951,268.424,-914.168C95.668,-952.136,-92.895,-925.778,-245.648,-836.6C-384.713,-755.413,-434.162,-587.336,-522.273,-452.552C-597.261,-337.842,-680.9,-234.101,-724.46,-104.162C-775.612,48.423,-868.67,219.941,-795.82,363.439C-722.686,507.497,-506.654,489.901,-375.194,583.814C-233.497,685.04,-172.583,908.727,0,931.963",
    secondaryPath:
      "M1920,1819.795C2061.006,1823.26,2197.294,1772.365,2315.453,1695.337C2433.096,1618.645,2519.584,1507.771,2587.331,1384.76C2659.41,1253.885,2714.618,1114.721,2717.494,965.338C2720.714,798.082,2703.014,622.063,2604.621,486.772C2502.843,346.826,2339,267.205,2173.357,217.146C2006.806,166.813,1829.482,154.169,1662.185,201.962C1494.162,249.963,1332.479,341.213,1233.934,485.52C1139.645,623.594,1141.085,800.557,1139.244,967.744C1137.601,1116.892,1150.887,1267.832,1223.886,1397.905C1293.62,1522.159,1414.991,1602.352,1536.844,1676.203C1655.898,1748.358,1780.829,1816.375,1920,1819.795",
    primaryColor: "#aab4ca",
    secondaryColor: "#f4f6f8",
    bgColor: "rgba(207, 213, 225, 1)",
    hasCornerImage: false,
  },
};

const BackgroundWrapper = ({ children }: PropsWithChildren) => {
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState(location.pathname);
  const [morphing, setMorphing] = useState(false);

  const normalizePath = (path: string) => {
    return path.toLowerCase();
  };

  const getConfig = (path: string) => {
    const normalizedPath = normalizePath(
      path
    ) as keyof typeof BACKGROUND_CONFIG;
    return BACKGROUND_CONFIG[normalizedPath] || BACKGROUND_CONFIG.default;
  };

  const currentConfig = getConfig(currentPath);
  const targetConfig = getConfig(location.pathname);

  useEffect(() => {
    const normalizedLocationPath = normalizePath(location.pathname);
    if (normalizedLocationPath !== normalizePath(currentPath)) {
      setMorphing(true);

      const timer = setTimeout(() => {
        setCurrentPath(location.pathname);
        setMorphing(false);
      }, 800);

      return () => clearTimeout(timer);
    }
  }, [location.pathname, currentPath]);

  // Determine route info
  const isHomePage = normalizePath(currentPath) === "/";
  const isAuthPage = normalizePath(currentPath) === "/auth";
  const isGoingToHomePage = normalizePath(location.pathname) === "/";
  const isGoingToAuthPage = normalizePath(location.pathname) === "/auth";

  return (
    <div className="app-container">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -1,
        }}
        preserveAspectRatio="none"
        viewBox="0 0 1920 1080"
      >
        <rect width="1920" height="1080" fill={currentConfig.bgColor} />

        <motion.path
          initial={{ d: currentConfig.primaryPath }}
          animate={{
            d: morphing ? targetConfig.primaryPath : currentConfig.primaryPath,
            fill: morphing
              ? targetConfig.primaryColor
              : currentConfig.primaryColor,
          }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          fill={currentConfig.primaryColor}
        />

        <motion.path
          initial={{ d: currentConfig.secondaryPath }}
          animate={{
            d: morphing
              ? targetConfig.secondaryPath
              : currentConfig.secondaryPath,
            fill: morphing
              ? targetConfig.secondaryColor
              : currentConfig.secondaryColor,
          }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          fill={currentConfig.secondaryColor}
        />
      </svg>

      <motion.div
        key="home-corner"
        style={{
          position: "absolute",
          ...BACKGROUND_CONFIG["/"].cornerStyles,
          backgroundImage: `url(${BACKGROUND_CONFIG["/"].cornerImage})`,
          backgroundSize: "contain",
          backgroundPosition: "bottom right",
          backgroundRepeat: "no-repeat",
          zIndex: 0,
          pointerEvents: "none",
        }}
        initial={{ opacity: isHomePage ? 1 : 0 }}
        animate={{
          opacity: morphing ? (isGoingToHomePage ? 1 : 0) : isHomePage ? 1 : 0,
        }}
        transition={{
          opacity: {
            duration: 0.8,
            ease: "easeInOut",
          },
        }}
      />

      <motion.div
        key="signup-corner"
        style={{
          position: "absolute",
          ...BACKGROUND_CONFIG["/auth"].cornerStyles,
          backgroundImage: `url(${BACKGROUND_CONFIG["/auth"].cornerImage})`,
          backgroundSize: "contain",
          backgroundPosition: "bottom right",
          backgroundRepeat: "no-repeat",
          zIndex: 0,
          pointerEvents: "none",
        }}
        initial={{ opacity: isAuthPage ? 1 : 0 }}
        animate={{
          opacity: morphing ? (isGoingToAuthPage ? 1 : 0) : isAuthPage ? 1 : 0,
        }}
        transition={{
          opacity: {
            duration: 0.8,
            ease: "easeInOut",
          },
        }}
      />

      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0 }}
        style={{ height: "100%" }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default BackgroundWrapper;
