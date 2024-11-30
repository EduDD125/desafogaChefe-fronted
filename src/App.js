import { BrowserRouter as Router,  Routes, Route} from 'react-router-dom'
import './App.css';
import Homepage from './pages/homepage/homepage';
import UserArea from './pages/userArea/userArea'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/user' element={<UserArea />} />
      </Routes>
    </Router>
  );
}

export default App;
