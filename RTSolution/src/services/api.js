const API_URL = 'https://localhost:8017/shipmentTracking/v1/shipmentTracking';

export const fetchShipmentInfo = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
      let errorMessage = 'Failed to fetch shipment';
      if (response.status === 404) {
        errorMessage = 'Shipment not found';
      } else {
        const responseBody = await response.json();
        if (responseBody && responseBody.error) {
          errorMessage = responseBody.error.message;
        }
      }
      throw new Error(errorMessage);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching shipment info:', error);
    throw error;
  }
};

export const addShipment = async (newShipment) => {
	try {
		const response = await fetch(API_URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(newShipment),
		});
		if (!response.ok) {
			throw new Error(`Failed to create shipment: ${response.statusText}`);
		}
		return await response.json();
	} catch (error) {
		console.error('Error adding shipment:', error);
		throw error;
	}
};

export const updateShipment = async (id, updatedFields) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedFields),
    });
    if (!response.ok) {
      throw new Error(`Failed to update shipment: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error updating shipment:', error);
    throw error;
  }
};

export const fetchShipments = async (filters) => {
  try {
    const params = new URLSearchParams(filters).toString();
    const response = await fetch(`${API_URL}?${params}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch shipments: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching shipments:', error);
    throw error;
  }
};
