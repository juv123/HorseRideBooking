import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import BookingForm from './components/BookingForm';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import appStore from './config/appStore';

function App() {
  return (
    
    <Provider store={appStore}>
    <div className="AppClass">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/booking" element={<BookingForm />} />
          </Routes>
      </Router>
    </div>
  </Provider>
           
               
               
  );
}

export default App;
