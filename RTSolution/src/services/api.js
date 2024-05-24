import mockShipments from "./mockData";

/* const API_URL = 'https://localhost:8017/shipmentTracking/v1/shipmentTracking'; */

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
};