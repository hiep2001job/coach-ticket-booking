import React from "react";

export const useScreenSize = () => {
  const isLargeScreen = window.innerWidth > 768; // Adjust the breakpoint as needed
  const [screenSize, setScreenSize] = React.useState(isLargeScreen);

  React.useEffect(() => {
    const handleResize = () => {
      setScreenSize(window.innerWidth > 768); // Adjust the breakpoint as needed
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return screenSize;
};
