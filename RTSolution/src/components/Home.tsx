import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
    return (
        <div>
            <h1>welcome</h1>
            <Link to="/shipmentTracking"><h2>get shipment tracking</h2></Link>
        </div>
        
    );
};

export default Home;
