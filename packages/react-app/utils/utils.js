export const animationCreate = () => {
  if (typeof window !== "undefined") {
    window.WOW = require("wowjs");
  }
  new WOW.WOW({ live: false }).init();
};


export const formatWalletAddress = (address) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;

}
