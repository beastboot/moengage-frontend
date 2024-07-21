import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Searchpage from './components/Searchpage';
import ListsPage from './components/ListsPage';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);

    } else {
      setIsAuthenticated(false);
      
    }
  },[]);

  return (
    <Router>

    <Routes>
      <Route path="/login" element={!isAuthenticated?<Login />:<Searchpage/>} />
      <Route path="/signup" element={!isAuthenticated?<Signup />:<Searchpage/>} />
      <Route path="/search" element={isAuthenticated?<Searchpage />:<Login/>} />
      <Route path="/lists" element={isAuthenticated?<ListsPage />:<Login/>} />
      <Route path="/" element={isAuthenticated ? <Searchpage /> : <Login />} />
    </Routes>
    </Router>
  );
};



export default App;
