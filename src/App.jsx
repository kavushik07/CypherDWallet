import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './Components/Login/Login.jsx'
import Password from './Components/Createpassword/Password.jsx'
import WalletSetup from './Components/SeedPhrase/SeedPhrase.jsx'
import Dashboard from './Components/Dashboard/Dashboard.jsx';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/create-wallet" element={<Password />} />
          <Route path="/wallet-setup" element={<WalletSetup />} />
          <Route path="/Dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
