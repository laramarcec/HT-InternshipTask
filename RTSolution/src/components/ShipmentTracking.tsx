import React, { useEffect, useState } from 'react';
import { fetchShipments } from "../services/api.js";
import { Link } from 'react-router-dom';

const ShipmentTracking: React.FC = () => {
    interface Shipment{
        id: string;
        status: string;
    }

    const [shipments, setShipments] = useState<Shipment[]>([]);
    const [filters, setFilters] = useState({
        customerId: '',
        status: '',
        orderId: ''
    });

    useEffect(() => {
        fetchShipments(filters).then((data:Shipment[]) => setShipments(data));
    }, [filters]);

    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFilters({
            ...filters,
            [name]:value
        });
    };

    return (
        <div>
            <h1>shipments</h1>
            <div>
                <input name = "customerId" value = {filters.customerId} onChange={handleChange} placeholder='customer id'></input>
                <input name = "status" value = {filters.status} onChange={handleChange} placeholder='status'></input>
                <input name = "orderId" value = {filters.orderId} onChange={handleChange} placeholder='order id'></input>     
            </div>

            <ul>
                {shipments.map(shipment => (
                    <li key ={shipment.id}>
                        <Link to = {`/shipmentTracking/${shipment.id}`}>
                            {shipment.id} - {shipment.status}
                        </Link>
                    </li>
                ))}
            </ul>
            <Link to="/shipmentTracking/new"> create new shipment </Link>
            
        </div>
    );
};

export default ShipmentTracking;
