import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import SEO from "../common/seo";
import Home from "../components/homes/home";
import Wrapper from "../layout/wrapper";

export default function Index() {
  const [userAddress, setUserAddress] = useState("");
  const { address, isConnected } = useAccount();

  useEffect(() => {
    if (isConnected && address) {
      setUserAddress(address);
    }
  }, [address, isConnected]);

  return (

      <Wrapper>
        <SEO pageTitle={'Swappy'} />
        <Home />
      </Wrapper>
    // <div className="flex flex-col justify-center items-center">
    //   <div className="h1">
    //     There you go... a canvas for your next Celo project!
    //   </div>
    //   {isConnected && (
    //     <div className="h2 text-center">Your address: {userAddress}</div>
    //   )}
    // </div>
  );
}
