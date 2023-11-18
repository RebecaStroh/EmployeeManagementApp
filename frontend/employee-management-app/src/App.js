// External components
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Styles
import './App.scss';

// Components
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
