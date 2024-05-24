import React, { useEffect, useState } from 'react';
import { Shipment, fetchShipmentInfo } from "../services/api.js";
import { useParams } from 'react-router-dom';

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
		<div>
			<ul>
				<li>{shipment.id}</li>
				<li>{shipment.carrier}</li>
			</ul>
		</div>
	);
};

export default InfoShipment;
