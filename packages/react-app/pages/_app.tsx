import { Alfajores, Celo } from "@celo/rainbowkit-celo/chains";
import celoGroups from "@celo/rainbowkit-celo/lists";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import type { AppProps } from "next/app";
import { WagmiConfig, configureChains, createConfig, Chain, ConnectorConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import Layout from "../components/Layout";
import "../styles/globals.css";
import "../styles/index.scss";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-responsive-modal/styles.css';

const projectId = process.env.NEXT_PUBLIC_WC_PROJECT_ID as string;

if (!projectId) {
  throw new Error("NEXT_PUBLIC_WC_PROJECT_ID is missing in the environment variables");
}

const { chains, publicClient } = configureChains<Chain, typeof publicProvider>([Celo, Alfajores], [publicProvider()]);

const connectors: ConnectorConfig = celoGroups({
  chains,
  projectId,
  appName: "Swappy Marketplace", // Sanitize or validate this input if necessary
});

const appInfo = {
  appName: "Swappy Marketplace",
};

const wagmiConfig = createConfig({
  connectors,
  publicClient: publicClient,
});

function App({ Component, pageProps }: AppProps) {
  try {
    return (
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider chains={chains} appInfo={appInfo}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
          <ToastContainer />
        </RainbowKitProvider>
      </WagmiConfig>
    );
  } catch (error) {
    console.error("An error occurred:", error);
    // Handle the error appropriately, e.g., show a user-friendly message or log for further investigation
    return null; // Return a fallback or null to prevent unexpected behavior
  }
}

export default App;
