import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './components/Home.tsx';
import ShipmentTracking from './components/ShipmentTracking.tsx';
import NewShipment from './components/NewShipment.tsx';
import InfoShipment from './components/InfoShipment.tsx';
import EditShipment from './components/EditShipment.tsx';
import NotFoundPage from './components/NotFoundPage.tsx';
import NavBar from './layout/NavBar.tsx';

import './styles/App.css';

const App:React.FC = () => 
{
  return (
    <Router>
      <NavBar/>
      <Suspense fallback = {<div> content is loading... </div>}>
        <div className="content-container">
          <Routes>
            <Route path = "/" element = {<Home />}></Route>
            <Route path = "/shipmentTracking" element = {<ShipmentTracking />}></Route>
            <Route path = "/shipmentTracking/new" element = {<NewShipment />}></Route>
            <Route path = "/shipmentTracking/:id" element = {<InfoShipment />}></Route>
            <Route path = "/shipmentTracking/:id/edit" element = {<EditShipment />}></Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div >
      </Suspense>
    </Router>
  )
}

export default App;
