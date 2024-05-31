import React, { useEffect, useState } from 'react';
import { fetchShipments } from "../services/api.js";
import { Link, useNavigate } from 'react-router-dom';

import '../styles/Tracking.css';

const ShipmentTracking: React.FC = () => {
	interface Shipment {
		id: string;
		status: string;
	}

	const [isMenuVisible, setIsMenuVisible] = useState(false);
	const [shipments, setShipments] = useState<Shipment[]>([]);
	const [filters, setFilters] = useState({
		customerId: '',
		status: '',
		orderId: ''
	});

	const toggleMenu = () => {
		setIsMenuVisible(!isMenuVisible);
	};

	const handleClearField = (fieldName: string) => {
		setFilters((prevFilters) => ({
			...prevFilters,
			[fieldName]: '',
		}));
	};

	const handleResetFilters = () => {
		setFilters({
			customerId: '',
			status: '',
			orderId: ''
		});
	};

	const renderClearButton = (fieldName: string, value: string) => {
		return value ? (
			<button
				type="button"
				className="clear-button"
				onClick={() => handleClearField(fieldName)}
			>
				&times;
			</button>
		) : null;
	};

	useEffect(() => {
		fetchShipments(filters).then((data: Shipment[]) => setShipments(data));
	}, [filters]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = e.target;
		setFilters({
			...filters,
			[name]: value
		});
	};

	const navigate = useNavigate();

	const handleRowClick = (id: string) => {
		navigate(`/shipmentTracking/${id}`);
	};

	return (
		<div className='tracking-div'>
			<Link className="home-link" to="/shipmentTracking/new">
				<span className="material-symbols-outlined">
					add
				</span>
				<p>
					create new shipment
				</p>
			</Link>

			<div className='tracking-input-div'>
				<button className='home-link' onClick={toggleMenu}>
					<span className="material-symbols-outlined">
						search
					</span>
					<p>
						search shipments
					</p>
				</button>
				
				{isMenuVisible && (
					<div className='tracking-menu'>
						<div className='tracking-input'>
							<div className="input-wrapper">
								<input name="customerId" value={filters.customerId} onChange={handleChange} placeholder='CUSTOMER ID' />
								{renderClearButton("customerId", filters.customerId)}
							</div>
							<div className="input-wrapper">
								<input name="orderId" value={filters.orderId} onChange={handleChange} placeholder='ORDER ID' />
								{renderClearButton("orderId", filters.orderId)}
							</div>
						</div>
						<div className='tracking-input'>
							<select className='tracking-select' name="status" value={filters.status} onChange={handleChange}>
								<option value="">status</option>
								<option value="initialized">initialized</option>
								<option value="inProcess">in process</option>
								<option value="processed">processed</option>
								<option value="shipped">shipped</option>
								<option value="inCustoms">in customs</option>
								<option value="delivered">delivered</option>
								<option value="returned">returned</option>
								<option value="error">error</option>
							</select>
							<button className="reset-button" onClick={handleResetFilters}>reset filters</button>
						</div>
					</div>
				)}
				
			</div>
			{shipments.length === 0 ? (
				<div><p>no shipments</p></div>
			) : (
				<div className='table-div'>
					<table className='tracking-table'>
						<thead>
							<tr>
								<th>ID</th>
								<th>status</th>
							</tr>
						</thead>
						<tbody>
							{shipments.map((shipment) => (
								<tr key={shipment.id} onClick={() => handleRowClick(shipment.id)} className='table-row'>
									<td><p>{shipment.id}</p></td>
									<td><p>{shipment.status}</p></td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</div>
	);
};

export default ShipmentTracking;
