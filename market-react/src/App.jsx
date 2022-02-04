import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import { useState } from 'react';

import { HomeScreen } from './components/home/HomeScreen.jsx';
import { MintScreen } from './components/mint/MintScreen.jsx';
import { ListingsScreen } from './components/listings/ListingsScreen';
import { StakingScreen } from './components/staking/StakingScreen.jsx';
import { MyNFTScreen } from './components/mynft/MyNFTScreen.jsx';
import { MarketScreen } from './components/market/MarketScreen.jsx';
import { NavbarComponent } from './components/shared/NavbarComponent.jsx';

import { AccountContext } from './context/AccountContext.jsx';


import './App.css';

function App() {
  
  const [account, setAccount] = useState(null);

  return (

    <AccountContext.Provider value={{ account, setAccount }} >
      <Router>
        <NavbarComponent/>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="mint" element={<MintScreen />} />
          <Route path="listings" element={<ListingsScreen />} />
          <Route path="staking" element={<StakingScreen />} />
          <Route path="my-nft" element={<MyNFTScreen />} />
          <Route path="market" element={<MarketScreen />} />
          <Route path="*" element={<HomeScreen />} />
        </Routes>
      </Router>
    </AccountContext.Provider>

  )
}

export default App
