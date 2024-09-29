import { useContext, useEffect, useState, useCallback } from "react";
import StockContext from "./StockContext"; // Import StockContext for global state
import './StockListStyling.css'; 

function StockList() {
  const [currentPrices, setCurrentPrices] = useState({}); // To store current prices
  const { stockList } = useContext(StockContext); // Use context to access stock data

  // Memoized function to fetch stock price from AlphaVantage API for a given stock symbol
  const fetchStockPrice = useCallback((symbol) => {
    const API_KEY = "B4VJEWF6RYCP5X4O"; // My AlphaVantage API key
    const API_URL = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=" + symbol + "&apikey=" + API_KEY;
    console.log("Fetching current price for " + symbol + "..."); // Log when fetch starts

    return fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        console.log("API response for " + symbol + ":", data); // Log the API response

        if (data["Global Quote"] && data["Global Quote"]["05. price"]) {
          const currentPrice = parseFloat(data["Global Quote"]["05. price"]);
          console.log("Current price for " + symbol + ": $" + currentPrice);
          return currentPrice;
        } else {
          console.error("Failed to fetch price for " + symbol);
          return null;
        }
      })
      .catch((err) => {
        console.error("Error fetching stock price for " + symbol + ":", err);
        return null;
      });
  }, []); // Empty dependency array ensures the function is only created once

  // UseEffect to fetch current prices for all stocks in stockList
  useEffect(() => {
    // fetchStockPrice('IBM')
    if (stockList.length > 0) {
      console.log(stockList);

      stockList.forEach((stock) => {
        fetchStockPrice(stock.stockSymbol).then((currentPrice) => {
          if (currentPrice !== null) {
            setCurrentPrices((prevPrices) => ({
              ...prevPrices,
              [stock.stockSymbol]: currentPrice,
            }));
          }
        });
      });
    }
  }, [stockList, fetchStockPrice]); // Dependencies: stockList and memoized fetchStockPrice

  // Function to calculate profit/loss
  const calculateProfitLoss = (purchasePrice, currentPrice, quantity) => {
    return (currentPrice - purchasePrice) * quantity;
  };

  return (
    <div className="container">
      {stockList.length === 0 ? (
        <p>No stocks added yet.</p>
      ) : (
        <ul>
          {stockList.map((stock, index) => {
            const currentPrice = currentPrices[stock.stockSymbol];
            const profitLoss = currentPrice
              ? calculateProfitLoss(stock.price, currentPrice, stock.quantity)
              : null;

            return (
              <li key={index}>
                <p>Symbol: {stock.stockSymbol}</p>
                <p>Quantity: {stock.quantity}</p>
                <p>Purchase Price: {stock.price}</p>
                {currentPrice ? (
                  <>
                    <p>Current Price: {currentPrice.toFixed(2)}</p>
                    <p className={profitLoss >= 0 ? "profit" : "loss"}>
                      {profitLoss >= 0 ? "Profit: " : "Loss: "} {/* Conditionally show "Profit" or "Loss" */} 
                      {profitLoss >= 0
                        ? " +" + profitLoss.toFixed(2)
                        : " -" + Math.abs(profitLoss).toFixed(2)}  {/* Formatting for loss */}
                    </p>
                  </>
                ) : (
                  <p>Fetching current price...</p>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default StockList;