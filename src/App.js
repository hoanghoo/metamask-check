import './App.css';
import React, { useEffect } from 'react';
import {Moralis} from "moralis";
const chainIdHex = "0x89"; //Ethereum Mainnet

function App() {
  const serverUrl = "https://drlp2ug0uakg.usemoralis.com:2053/server";
  const appId = "xnxh8FsyIL3QabOITEJQDdndQUNUR7z70JPnJYGV";

  useEffect(async () => {
    await Moralis.start({ serverUrl, appId });
    if (Moralis.User.current()){
        console.log('Logged as: ' + Moralis.User.current().attributes.ethAddress);
        Moralis.enableWeb3();
    }
  },[]);

    const isMetamaskInstalled = async () => {
        const isMetaMaskInstalled= await Moralis.isMetaMaskInstalled();
        console.log(isMetaMaskInstalled)
    }

    const getChainId = async () => {
        const chainId = await Moralis.getChainId();
        console.log(chainId);
        console.log(chainId == 137 ? true : false); // 56
    }

    const switchChain = async () => {
        await Moralis.enableWeb3();
        const chainId = await Moralis.getChainId();
        if(chainId == 137){
            // Connect
            await Moralis.authenticate({signingMessage:"Bizverse Authentication"});
        }else{
            // Check network exist, if exist -> switch to network -> connect
            try {
                await Moralis.switchNetwork(chainIdHex);
                await Moralis.authenticate({signingMessage:"Bizverse Authentication"});
            } catch (e){
                // If not exist -> add network -> switch to network -> connect
                if(e.code==4902){
                    const chainId_ = 137;
                    const chainName = "Polygon Mainnet";
                    const currencyName = "MATIC";
                    const currencySymbol = "MATIC";
                    const rpcUrl = "https://speedy-nodes-nyc.moralis.io/c0ff78e0f9946303a9f02905/polygon/mainnet";
                    const blockExplorerUrl = "https://mumbai.polygonscan.com/";

                    await Moralis.addNetwork(
                        chainId_,
                        chainName,
                        currencyName,
                        currencySymbol,
                        rpcUrl,
                        blockExplorerUrl
                    );

                    await Moralis.switchNetwork(chainIdHex);
                    await Moralis.authenticate({signingMessage:"Bizverse Authentication"});
                }
            }
        }
    }

  return (
      <div>
        <button onClick={isMetamaskInstalled}> Check Metamask installed</button>
        <button onClick={getChainId}> Check network</button>
        <button onClick={switchChain}> Connect + switch to correct network</button>
      </div>
  );
}

export default App;
