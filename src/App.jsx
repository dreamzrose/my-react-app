import './App.css';  // Import global app styles
import StockForm from './StockForm';
import StockList from './StockList';
import { StockProvider } from "./StockContext"; 

// import financeIcon from './assets/financeicon.png';
import financeIcon from '../public/assets/financeicon.png'


function App() {
    return (
        <StockProvider>
        <div className="container">
            <img src= {financeIcon} className= "icon" alt="Finance Icon" />
            <h1>Finance Dashboard</h1>
            <StockForm />
            <h2>Stock List</h2>
            <StockList />
        </div>
        </StockProvider>
    );
}

export default App;
  
 