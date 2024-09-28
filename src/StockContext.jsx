import { createContext, useState } from 'react';

// Create a StockContext
const StockContext = createContext();

// StockProvider to provide the stockList and setStockList functions to child components
export const StockProvider = ({ children }) => {
    const [stockList, setStockList] = useState([]);

    return (
        <StockContext.Provider value={{ stockList, setStockList }}>
            {children}
        </StockContext.Provider>
    );
};

export default StockContext;