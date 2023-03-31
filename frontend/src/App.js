import logo from './zksynclogo.png';
import './App.css';
import "@rainbow-me/rainbowkit/styles.css";
import { connectorsForWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { injectedWallet } from '@rainbow-me/rainbowkit/wallets';
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { zkSyncTestnet } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { ConnectButton } from "@rainbow-me/rainbowkit";

function App() {

  const { chains, provider } = configureChains(
    [zkSyncTestnet],
    [publicProvider()]
  );
  
  const connectors = connectorsForWallets([
    {
      groupName: 'Recommended',
      wallets: [
        injectedWallet({ chains })
      ],
    },
  ]);
  
  const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider
  });

  return (
    
      
        <WagmiConfig client={wagmiClient}>
          <RainbowKitProvider chains={chains}>
            <div className="App">
              <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <b>Number Guessing game deployed on zkSync ERA</b>
                <ConnectButton/>
              </header>
              <div className="body">
                
              </div>
            </div>
          </RainbowKitProvider>
        </WagmiConfig>
  );
}

export default App;
