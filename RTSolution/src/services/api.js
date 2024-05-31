import mockShipments from "./mockData";
/* const API_URL = 'https://localhost:8017/shipmentTracking/v1/shipmentTracking'; */

export const fetchShipmentInfo = async (id) => {
	let shipmentInfo = mockShipments.find((shipment) => shipment.id === id);
	return shipmentInfo;
/* 	const response = await fetch(`${API_URL}/${id}`);
	if (!response.ok) {
			throw new Error('Failed to fetch shipment');
	}
	return await response.json(); */

}

export const addShipment = async (newShipment) => {
    
    const defaultShipment = {
        id: generateUniqueId(),
        carrierTrackingUrl: '',
        status: 'initialized',
        statusChangeDate: new Date().toISOString(),
        ...newShipment,
    };
    mockShipments.push(defaultShipment);
    return;
}

const generateUniqueId = () => {
    let len = mockShipments.map.length;
    let lastId = mockShipments.map.call(len).id;
    return lastId+1;
}

export const fetchShipments = async (filters) => {

    let filteredShipments = mockShipments;

    if(filters.customerId){
        filteredShipments = filteredShipments.filter(
            (shipment) => shipment.relatedCustomer.id === filters.customerId
        );
    }
    if(filters.status){
        filteredShipments = filteredShipments.filter(
            (shipment) => shipment.status === filters.status
        );
    }
    if(filters.orderId){
        filteredShipments = filteredShipments.filter(
            (shipment) => shipment.order.some((order) => order.id === filters.orderId)
        );
    }

    /* const params = new URLSearchParams(filters);
    const response = new fetch(`${API_URL}?${params}`);
    if(!response.ok){
        throw new Error("failed to fetch shipment");
    }
    return await response.json(); */

	return filteredShipments;
}

