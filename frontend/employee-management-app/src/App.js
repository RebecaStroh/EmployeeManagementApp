// External components
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Components
import Home from './pages/Home';
import NewEmployee from './pages/NewEmployee';
import Employees from './pages/Employees';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new-employee" element={<NewEmployee />} />
        <Route path="/employees" element={<Employees />} />
      </Routes>
    </Router>
  );
}

export default App;
