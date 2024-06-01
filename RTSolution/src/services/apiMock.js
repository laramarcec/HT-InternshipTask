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
    const newId = generateUniqueId();
    console.log(newId);
    const defaultShipment = {
        ...newShipment,
        id: newId,
        carrierTrackingUrl: newShipment.carrierTrackingUrl || '',
        status: newShipment.status || 'initialized',
        statusChangeDate: newShipment.statusChangeDate || new Date().toISOString(),
    };
    mockShipments.push(defaultShipment);
    console.log(defaultShipment);
    return defaultShipment.id;
}

const generateUniqueId = () => {
    if (mockShipments.length === 0) {
        return '1';
    }
    const lastId = Math.max(...mockShipments.map((shipment) => parseInt(shipment.id, 10) || 0));
    console.log(lastId + 1);
    const newId = '0' + ((lastId + 1).toString());
    console.log(newId);
    return newId;
}

export const updateShipment = async (updatedShipment) => {
    const shipmentIndex = mockShipments.findIndex(shipment => shipment.id === updatedShipment.id);
    if (shipmentIndex === -1) {
      throw new Error('Shipment not found');
    }
    mockShipments[shipmentIndex] = updatedShipment;
    return updatedShipment.id;
  };

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