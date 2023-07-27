import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; 

const App = () => {
  const [stockSymbol, setStockSymbol] = useState('');
  const [date, setDate] = useState('');
  const [stockData, setStockData] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/fetchStockData', {
        stock: stockSymbol,
        date: date,
      });

      setStockData(response.data);
      setError('');
    } catch (error) {
      console.error("Error fetching stock data:", error);

      if (error.response && error.response.data && error.response.data.error) {
        setError(error.response.data.error);
      } else {
        setError("An error occurred while fetching stock data. Please try again later.");
      }
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1>Stock Trade Statistics</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Stock Symbol:
            <input type="text" value={stockSymbol} onChange={(e) => setStockSymbol(e.target.value)} />
          </label>
          <br />
          <label>
            Date:
            <input
              type="date"
              value={date}
              onChange={(e) => {
                const selectedDate = new Date(e.target.value);
                const formattedDate = selectedDate.toISOString().slice(0, 10);
                setDate(formattedDate);
              }}
            />
          </label>

          <br />
          <button type="submit" className="submit-btn">Fetch Stock Data</button>
        </form>

        {stockData && (
          <div className="result">
            <h2>Stock Trade Statistics for {stockSymbol} on {date}</h2>
            <p>Open: {stockData.open}</p>
            <p>High: {stockData.high}</p>
            <p>Low: {stockData.low}</p>
            <p>Close: {stockData.close}</p>
            <p>Volume: {stockData.volume}</p>
          </div>
        )}

        {error && (
          <div className="error">
            <p>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;