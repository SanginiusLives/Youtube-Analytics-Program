import './App.css';
import Header from './Header';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Main from './Main';
import Info from './Data/Info';
import "./CSS/Fonts.css";
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {

  return (
    <Router>
    <Header/>
    <Routes>
      <Route path="/" element={<Main/>}/>
      <Route path="/:id" element={<Info/>}/>
    </Routes>
    </Router>
   
  );
}

export default App;
