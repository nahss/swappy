import Link from "next/link";
import React, {useEffect, useState} from "react";

// internal
import menu_data from "./menu-data";
import {ConnectButton} from "@rainbow-me/rainbowkit";
import {useConnect} from "wagmi";
import {InjectedConnector} from "wagmi/connectors/injected";

const MobileMenus = () => {
  const [navTitle, setNavTitle] = useState("");
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

  //openMobileMenu
  const openMobileMenu = (menu) => {
    if (navTitle === menu) {
      setNavTitle("");
    } else {
      setNavTitle(menu);
    }
  };
  return (
    <>
      <nav className="mean-nav">
        <ul>
        <div >
          {!hideConnectBtn && (
              <ConnectButton
                  showBalance={{ smallScreen: true, largeScreen: false }}
              />
          )}
        </div>



        </ul>
      </nav>
    </>
  );
};

export default MobileMenus;
