import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './routes/HomePage';
import UpdatePage from './routes/UpdatePage';
import RestaurantDetail from './routes/RestaurantDetail';
import { RestaurantContextProvider } from './Context/RestaurantContext';

function App() {

  return (
    <RestaurantContextProvider>
        <div className='container'>
            <Router>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/restaurant/:id/update" element={<UpdatePage />} />
                    <Route path="/restaurant/:id" element={<RestaurantDetail />} />
                </Routes>
            </Router>
        </div>
    </RestaurantContextProvider>
  );
}

export default App;
