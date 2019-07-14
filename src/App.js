import React, { useState, useEffect } from "react";
import Web3 from "web3";
import "./App.css";

function App() {
  const WEI_TO_ETH = 1000000000000000000;
  const INVALID_ADDRESS = "Invalid address.";

  const [balanceResponse, setBalanceResponse] = useState(null);
  const [provider, setProvider] = useState(null);
  useEffect(() => {
    setProvider(
      new Web3(
        new Web3.providers.HttpProvider(
          `https://mainnet.infura.io/v3/${
            process.env.REACT_APP_INFURA_PROJECT_ID
          }`
        )
      )
    );
  }, []);

  const displayFormResult = balanceResponse => {
    if (balanceResponse === INVALID_ADDRESS) {
      return <p>{INVALID_ADDRESS}</p>;
    }
    if (balanceResponse !== null) {
      return <p>{"Address balance: " + balanceResponse + " ETH"}</p>;
    }
  };

  return (
    <div className="App">
      <h1>ETH Balance Checker</h1>
      <form
        id="get-balance-form"
        onSubmit={e => {
          e.preventDefault();
          const val = e.target[0].value;
          if (provider.utils.isAddress(val)) {
            provider.eth
              .getBalance(val)
              .then(res => setBalanceResponse(res / WEI_TO_ETH), console.error);
          } else {
            setBalanceResponse(INVALID_ADDRESS);
          }
        }}
      >
        <label>
          Input an Ethereum Address:
          <input id="address" required type="text" name="address" />
        </label>
        <input type="submit" value="Submit" />
      </form>
      {displayFormResult(balanceResponse)}
    </div>
  );
}

export default App;
