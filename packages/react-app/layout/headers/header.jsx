import useSticky from "@/hooks/use-sticky";
import Link from "next/link";
import React, {useEffect, useState} from "react";
import NavMenu from "./nav-menu";
import Sidebar from "./sidebar";
import {useConnect} from "wagmi";
import {InjectedConnector} from "wagmi/connectors/injected";
import {ConnectButton} from "@rainbow-me/rainbowkit";


const Header = () => {
const {sticky} = useSticky()
  const [isActive, setIsActive] = useState(false);

  const [hideConnectBtn, setHideConnectBtn] = useState(false);
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });

  useEffect(() => {
    if (window.ethereum && window.ethereum.isMiniPay) {
      setHideConnectBtn(true);
      connect();
    }
  }, [connect]);

  return (
    <>
      <header className="header__transparent ">
        <div className="header__area">
          <div className={`main-header header-xy-spacing ${sticky ? "header-sticky" : ""}`} id="header-sticky">
            <div className="container-fluid">
              <div className="row align-items-center">
                <div className="col-xxl-3 col-xl-3 col-lg-5 col-md-6 col-6">
                  <div className="logo-area d-flex align-items-center">
                    <div className="logo">
                      <Link href="/">
                        <img src="/assets/img/swappy.svg" alt="logo" />
                      </Link>
                    </div>

                  </div>
                </div>
                <div className="col-xxl-9 col-xl-9 col-lg-7 col-md-6 col-6 d-flex align-items-center justify-content-end">

                  <div className="header-right d-md-flex align-items-center">

                    <div className="header-meta">
                      <ul>
                        <li>
                          {!hideConnectBtn && (
                              <ConnectButton
                                  showBalance={{ smallScreen: true, largeScreen: false }}
                              />
                          )}
                        </li>

                        <li>
                          <a onClick={() => setIsActive(true)}  href="#" className="tp-menu-toggle d-xl-none">
                            <i className="icon_ul"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <Sidebar isActive={isActive} setIsActive={setIsActive} />
    </>
  );
};

export default Header;
