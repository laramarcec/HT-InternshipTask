interface Shipment {
	id: string;
	carrier: string;
	trackingCode: string;
	carrierTrackingUrl: string;
	trackingDate: string;
	status: string;
	statusChangeDate: string;
	statusChangeReason: string;
	weight: number;
	estimatedDeliveryDate: string;
	addressFrom: Address;
	addressTo: Address;
	order: OrderRefType[];
	relatedCustomer: CustomerRefType;
	createDate: string;
}

interface Address {
	id: string;
	streetNr: string;
	streetName: string;
	streetSuffix?: string;
	postcode: string;
	city: string;
	country: string;
}

interface CustomerRefType {
	id: string;
	href: string;
	name: string;
	description?: string;
}

interface OrderRefType {
	id: string;
	href: string;
	name: string;
	referredType?: string;
}

export const fetchShipments: (
	filters: {
		customerId?: string; status?: string; orderId?: string 
	}
) => Promise<Shipment[]>;

export const fetchShipmentInfo: (
	id: string
) => Promise<Shipment>;

export const addShipment: (
	newShipment: Shipment
) => Promse<Shipment[]>;