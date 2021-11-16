import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import UserDetails from './components/UserDetails';
import { AnimatePresence } from 'framer-motion'


function App() {
  const location = useLocation();

  return (
      <AnimatePresence exitBeforeEnter>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/:id" element={<UserDetails />} />
        </Routes>
      </AnimatePresence>
  );
}

export default App;