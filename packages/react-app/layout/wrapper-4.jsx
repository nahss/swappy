
import React, { useEffect } from "react";
import BackToTop from "../lib/BackToTop";
import FooterThree from "./footers/footer";
import HeaderTwo from "./headers/header";
import {animationCreate} from "../utils/utils";

const WrapperFour = ({ children }) => {
  useEffect(() => {
    setTimeout(() => {
      animationCreate();
    }, 500);
  }, []);

  return (
    <>
      <HeaderTwo />
      {children}
      <FooterThree />
      <BackToTop />
    </>
  );
};

export default WrapperFour;
