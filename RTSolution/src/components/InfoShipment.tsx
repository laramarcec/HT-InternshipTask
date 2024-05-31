import React, { useEffect, useState } from 'react';
import { Shipment, fetchShipmentInfo } from "../services/api.js";
import { Link, useParams } from 'react-router-dom';

const InfoShipment: React.FC = () => {
	const {id} = useParams<{id:string}>();
	const [shipment, setShipment] = useState<Shipment | undefined>(undefined);

	useEffect(() => {
		if(id){
			fetchShipmentInfo(id).then((data: Shipment) => setShipment(data || undefined));
		}
	}, [id]);

	if(!shipment){
		return (
			<div>loading</div>
		)
	}

	return (
		<div className='info-div'>
			<Link className="home-link" to={`/shipmentTracking/${id}/edit`}>
			<span className="material-symbols-outlined">
				edit
			</span>
			<p>
				edit shipment
			</p>
		</Link>
		<div className='table-div'>
			<table className='tracking-table'>
				<tbody>
					<tr>
						<td className= "table-details">ID</td>
						<td>{shipment.id}</td>
					</tr>
					<tr>
						<td className= "table-details">Carrier</td>
						<td>{shipment.carrier}</td>
					</tr>
					<tr>
						<td className= "table-details">Tracking Code</td>
						<td>{shipment.trackingCode}</td>
					</tr>
					<tr>
						<td className= "table-details">Carrier Tracking URL</td>
						<td><a href={shipment.carrierTrackingUrl}>{shipment.carrierTrackingUrl}</a></td>
					</tr>
					<tr>
						<td className= "table-details">Status</td>
						<td>{shipment.status}</td>
					</tr>
					<tr>
						<td className= "table-details">Weight</td>
						<td>{shipment.weight}</td>
					</tr>
					<tr>
						<td className= "table-details">Address From (Country)</td>
						<td>{shipment.addressFrom.country}</td>
					</tr>
					<tr>
						<td className= "table-details">Address To (Country)</td>
						<td>{shipment.addressTo.country}</td>
					</tr>
				</tbody>
			</table>
		</div>
		</div>
	);

};

export default InfoShipment;
