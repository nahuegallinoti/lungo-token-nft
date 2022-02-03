import './App.css';
import Navbar from './components/Navbar';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import MintNFTPage from './pages/mint';
import LoginPage from './pages/login';
import MarketPage from './pages/market';
import MyNFTPage from './pages/my-nft';
import ListingsPage from './pages/listings';
import StakingPage from './pages/staking';

import { AccountContext } from './components/Context/AccountContext';
import { useState } from 'react';

function App() {

  const [account, setAccount] = useState(null);

  return (
        <AccountContext.Provider value={{ account, setAccount }}>
          <Router>
            <Navbar />
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/mint" element={<MintNFTPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/market" element={<MarketPage />} />
              <Route path="/my-nft" element={<MyNFTPage />} />
              <Route path="/listings" element={<ListingsPage />} />
              <Route path="/staking" element={<StakingPage />} />
            </Routes>
          </Router>
        </AccountContext.Provider>
  );
}

export default App;
