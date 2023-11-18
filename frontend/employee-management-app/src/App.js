// External components
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Styles
import './App.scss';

// Components
import Home from './pages/Home';
import MyProfile from './pages/MyProfile';
import Search from './pages/Search';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </Router>
  );
}

export default App;
