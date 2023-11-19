// External components
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Styles
import './App.scss';

// Components
import Home from './pages/Home';
import NewEmployee from './pages/NewEmployee';
import Employee from './pages/Employee';
import Employees from './pages/Employees';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/my-profile" element={<Employee />} /> */}
        <Route path="/new-employee" element={<NewEmployee />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/employee" element={<Employee />} />
      </Routes>
    </Router>
  );
}

export default App;
