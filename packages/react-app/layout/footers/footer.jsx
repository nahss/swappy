import React from "react";


const copyright = {
  logo: "/assets/img/swappy.svg",
  copyright_text: (
    <>Copyright © Swappy {new Date().getFullYear()}, All Rights Reserved</>
  ),
};

const { logo, copyright_text } = copyright;
const Footer = () => {
  return (
    <>
      <footer>
        <div
          className="footer-bg theme-bg bg-bottom"
          style={{ backgroundImage: `url(/assets/img/bg/shape-bg-02.png)` }}
        >
          <div className="f-copyright pt-60 pb-30">
            <div className="container">
              <div className="row">
                <div className="col-md-5">
                  <div className="f-copyright__logo mb-30">
                    <a href="#">
                      <img src={logo} alt="logo" />
                    </a>
                  </div>
                </div>
                <div className="col-md-7">
                  <div className="f-copyright__text text-md-end mb-30">
                    <span>{copyright_text}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
