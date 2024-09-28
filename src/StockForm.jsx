import { useState, useContext } from 'react'; // Import React and useState
import "./StockFormStyling.css"; // Import the CSS for styling
import StockContext from './StockContext';

function StockForm() {
  // State for stock symbol
  const [stockSymbol, setStockSymbol] = useState(''); // useState hook to manage stock symbol
  const [stockQuantity, setStockQuantity] = useState(''); // useState hook to manage stock quantity
  const [stockPrice, setStockPrice] = useState(''); // useState hook to manage purchase price
  const { setStockList } = useContext(StockContext); // Get setStockList from context

  const addStock = (event) => {
    event.preventDefault(); // Prevent default form submission (which would reload the page)
    
    // Validate form fields (ensure all fields are filled)
    if (!stockSymbol || !stockQuantity || !stockPrice) {
        alert("Please fill in all fields.");
        return;
    }

  const newStock = {
    stockSymbol: stockSymbol.toUpperCase(),
    quantity: parseInt(stockQuantity),
    price: parseFloat(stockPrice),
  };

  // Add the new stock to the stock list
  setStockList((prevStockList) => [...prevStockList, newStock]);

  // Clear form fields after submission

  setStockSymbol('');
  setStockQuantity('');
  setStockPrice('');
};

  return (
    <div className="form-container">
      <form onSubmit = {addStock}> {/* Form submission handler */}
        {/* Stock Symbol Field */}
        <div className="form-group">
          <input
            type="text"
            id="symbol"
            value={stockSymbol} // Controlled input: value tied to state
            onChange={(event) => setStockSymbol(event.target.value)} // Updates state when user types
            placeholder="Stock Symbol (e.g AAPL)"
            required
          />
        </div>

        {/* Quantity Field */}
        <div className="form-group">
          <input
            type="number"
            id="quantity"
            value={stockQuantity}
            onChange={(event) => setStockQuantity(event.target.value)} // Updates state when user types
            placeholder="Quantity"
            min="1" // Ensure minimum value is 1
            required
          />
        </div>

        {/* Purchase Price Field */}
        <div className="form-group">
          <input
            type="number"
            id="price"
            value={stockPrice}
            onChange={(event) => setStockPrice(event.target.value)} // Updates state when user types
            placeholder="Purchase Price"
            min="0.01" // Minimum value is 0.01
            step="0.01" // Allows decimal values (e.g., 0.01)
            required
          />
        </div>

        {/* Submit Button */}
        <button type = "submit">Add Stock</button>
      </form>
    </div>
  );
}

export default StockForm;