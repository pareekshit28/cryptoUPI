import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Nav from "../src/components/nav.jsx";

function App() {
  const [currentAccount, setCurrentAccount] = useState(null);

  useEffect(() => {
    checkWalletIsConnected();
  }, []);

  const checkWalletIsConnected = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      alert("Make sure you have Metamask installed!");
      return;
    } else {
      console.log("Wallet exists! We're ready to go!");
    }

    const accounts = await ethereum.request({ method: "eth_accounts" });

    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Found an authorized account: ", account);
      setCurrentAccount(account);
    } else {
      console.log("No authorized account found");
    }
  };

  const connectWalletHandler = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      alert("Please install Metamask!");
    }

    try {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("Found an account! Address: ", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (err) {
      console.log(err);
    }
  };

  const WalletNotConnected = () => {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <button
          className=" bg-black p-3 rounded-xl font-bold flex justify-center items-center text-white shadow-lg"
          onClick={connectWalletHandler}
        >
          &nbsp;Connect to Wallet
        </button>
      </div>
    );
  };

  const WalletConnected = () => {
    return (
      <div className="h-screen flex flex-col justify-center items-center">
        <Link to="/scan">
          <button className=" bg-black p-3 rounded-xl font-bold flex justify-center items-center shadow-lg text-white">
            Scan QR
          </button>
        </Link>
      </div>
    );
  };

  return (
    <div>
      <Nav />
      {currentAccount ? <WalletConnected /> : <WalletNotConnected />}
    </div>
  );
}

export default App;
