import { useEffect, useState } from "react";
import "./index.css";

function App() {
  const [amount, setAmount] = useState(1);
  const [fromCur, setFromCur] = useState("EUR");
  const [toCur, setToCur] = useState("USD");
  const [converted, setConverted] = useState("");
  const [error, setError] = useState("");

  useEffect(
    function () {
      async function convert() {
        setError("");
        try {
          const res = await fetch(
            `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCur}&to=${toCur}`
          );
          if (!res.ok) throw new Error("failed to fetch data");
          const data = await res.json();
          setConverted(data.rates[toCur]);
        } catch (err) {
          setError(err.message);
        }
      }
      if (fromCur === toCur) return setConverted(amount);
      convert();
    },
    [amount, fromCur, toCur]
  );

  return (
    <div className="currency-converter-container">
      {error ? (
        <Error error={error} />
      ) : (
        <div className="converter-wrapper">
          <h2 className="converter-title">Currency Converter</h2>
          <div className="input-section">
            <input
              type="number"
              className="amount-input"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              placeholder="Enter amount"
            />
            <div className="currency-selectors">
              <select
                className="currency-select from-currency"
                value={fromCur}
                onChange={(e) => setFromCur(e.target.value)}
              >
                <option value="EUR">EUR</option>
                <option value="USD">USD</option>
                <option value="CAD">CAD</option>
              </select>
              <div className="swap-icon">⇄</div>
              <select
                className="currency-select to-currency"
                value={toCur}
                onChange={(e) => setToCur(e.target.value)}
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="CAD">CAD</option>
              </select>
            </div>
          </div>
          <div className="result-section">
            <p className="conversion-result">
              {amount} {fromCur} = {converted} {toCur}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function Error({ error }) {
  return (
    <div className="error-container">
      <p className="error-message">
        <span className="error-icon">❌</span> {error}
      </p>
    </div>
  );
}

export default App;
