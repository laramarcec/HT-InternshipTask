import React, { ChangeEvent, FormEvent, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchShipmentInfo, updateShipment } from '../services/apiMock.js';

interface Shipment {
	id: string;
	carrier: string;
	trackingCode: string;
	trackingDate: string;
	weight: number;
	estimatedDeliveryDate: string;
	addressFrom: Address;
	addressTo: Address;
	relatedCustomer: CustomerRefType;
	createDate: string;
	carrierTrackingUrl: string;
	status: string;
	statusChangeDate: string;
	statusChangeReason:string;
	order: OrderRefType;
}
  
interface OrderRefType {
	id: string;
	href: string;
	name: string;
	referredType: string;
}
  
interface CustomerRefType {
	id: string;
	href: string;
	name: string;
	description?: string;
}
  
interface Address {
	id:string,
	streetNr: string;
	streetName: string;
	streetSuffix?: string;
	postcode: string;
	city: string;
	country: string;
}

const EditShipment: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [error, setError] = useState<string>('');
	const [shipmentForm, setShipmentForm] = useState<Shipment | null>(null);

  useEffect(() => {
    const fetchShipment = async () => {
      try {
        const shipment = await fetchShipmentInfo(id as string);
        setShipmentForm(shipment as Shipment);
      } catch (error) {
        setError('Failed to load shipment data');
      }
    };

    if (id) {
      fetchShipment();
    }
  }, [id]);

	const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    if (shipmentForm) {
      const { name, value } = e.target;
      setShipmentForm({ ...shipmentForm, [name]: value });
    }
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    const requiredFields = [
      'carrier',
      'trackingCode',
      'trackingDate',
      'relatedCustomer.id',
      'addressFrom.streetNr',
      'addressFrom.streetName',
      'addressFrom.postcode',
      'addressFrom.city',
      'addressFrom.country',
      'addressTo.streetNr',
      'addressTo.streetName',
      'addressTo.postcode',
      'addressTo.city',
      'addressTo.country',
      'weight',
      'estimatedDeliveryDate',
      'createDate'
    ];

    const emptyFields = requiredFields.filter(field => {
      const value = getNestedValue(shipmentForm as Shipment, field);
      return !value || (Array.isArray(value) && value.length === 0);
    });

    if (emptyFields.length > 0) {
      setError('Please fill in all required fields.');
      return;
    }

		if (shipmentForm) {
      const formattedData = {
        ...shipmentForm,
        weight: parseFloat(shipmentForm.weight.toString()),
        trackingDate: new Date(shipmentForm.trackingDate).toISOString(),
        estimatedDeliveryDate: new Date(shipmentForm.estimatedDeliveryDate).toISOString(),
        createDate: new Date(shipmentForm.createDate).toISOString(),
      } as Shipment;
		
			try {
				await updateShipment(formattedData);
				navigate(`/shipmentTracking/${id}`);
			} catch (error) {
				setError('Failed to update shipment');
			}
		}

  };

  const getNestedValue = (object: Shipment | Address | CustomerRefType | OrderRefType, path: string) => {
    const keys = path.split('.');
    let value: string | Shipment | Address | CustomerRefType | OrderRefType = object;
    for (const key of keys) {
      if (value && typeof value === 'object' && key in value) {
        value = value[key as keyof typeof value];
      } else {
        return undefined;
      }
    }
    return value;
  };

	const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (shipmentForm) {
      setShipmentForm({ ...shipmentForm, status: e.target.value });
    }
  };

  return (
    <div className='new-div'>
      <p className='header-p'>edit shipment</p>
      <div className="newShipment">
        <form onSubmit={onSubmit}>
          <div className='input-div'>
            <label className='input-label'>Carrier:</label>
            <select
              className='input'
              name="carrier"
              value={shipmentForm?.carrier}
              onChange={handleStatusChange}
            >
              <option value="">Carrier</option>
              <option value="DHL">DHL</option>
              <option value="FedEx">FedEx</option>
              <option value="GLS">GLS</option>
              <option value="UPS">UPS</option>
            </select>
          </div>
          <div className='input-div'>
            <label className='input-label'>Tracking Code:</label>
            <div className="input-wrapper">
              <input
                className='input'
                name="trackingCode"
                placeholder='Tracking Code'
                onChange={handleInputChange}
                value={shipmentForm?.trackingCode || ''}
              />
            </div>
          </div>
          <div className='input-div'>
            <label className='input-label'>Tracking Date:</label>
            <div className="input-wrapper">
              <input
                className='input'
                name="trackingDate"
                placeholder='Tracking Date'
                type="datetime-local"
                onChange={handleInputChange}
                value={shipmentForm?.trackingDate}
              />
            </div>
          </div>
          <div className='input-div'>
            <label className='input-label'>Customer ID:</label>
            <div className="input-wrapper">
              <input
                className='input'
                name="relatedCustomer.id"
                placeholder='Customer ID'
                onChange={handleInputChange}
                value={shipmentForm?.relatedCustomer.id}
              />
            </div>
          </div>
          <div className='input-div'>
            <label className='input-label'>Address From:</label>
            <div className="input-wrapper">
              <input
                className='input'
                name="addressFrom.streetNr"
                placeholder='Street Number'
                onChange={handleInputChange}
                value={shipmentForm?.addressFrom.streetNr}
              />
            </div>
            <div className="input-wrapper">
              <input
                className='input'
                name="addressFrom.streetName"
                placeholder='Street Name'
                onChange={handleInputChange}
                value={shipmentForm?.addressFrom.streetName}
              />
            </div>
            <div className="input-wrapper">
              <input
                className='input'
                name="addressFrom.postcode"
                placeholder='Postcode'
                onChange={handleInputChange}
                value={shipmentForm?.addressFrom.postcode}
              />
            </div>
            <div className="input-wrapper">
              <input
                className='input'
                name="addressFrom.city"
                placeholder='City'
                onChange={handleInputChange}
                value={shipmentForm?.addressFrom.city}
              />
            </div>
            <div className="input-wrapper">
              <input
                className='input'
                name="addressFrom.country"
                placeholder='Country'
                onChange={handleInputChange}
                value={shipmentForm?.addressFrom.country}
              />
            </div>
          </div>
          <div className='input-div'>
            <label className='input-label'>Address To:</label>
            <div className="input-wrapper">
              <input
                className='input'
                name="addressTo.streetNr"
                placeholder='Street Number'
                onChange={handleInputChange}
                value={shipmentForm?.addressTo.streetNr}
              />
            </div>
            <div className="input-wrapper">
              <input
                className='input'
                name="addressTo.streetName"
                placeholder='Street Name'
                onChange={handleInputChange}
                value={shipmentForm?.addressTo.streetName}
              />
            </div>
            <div className="input-wrapper">
              <input
                className='input'
                name="addressTo.postcode"
                placeholder='Postcode'
                onChange={handleInputChange}
                value={shipmentForm?.addressTo.postcode}
              />
            </div>
            <div className="input-wrapper">
              <input
                className='input'
                name="addressTo.city"
                placeholder='City'
                onChange={handleInputChange}
                value={shipmentForm?.addressTo.city}
              />
            </div>
            <div className="input-wrapper">
              <input
                className='input'
                name="addressTo.country"
                placeholder='Country'
                onChange={handleInputChange}
                value={shipmentForm?.addressTo.country}
              />
            </div>
          </div>
          <div className='input-div'>
            <label className='input-label'>Weight (grams):</label>
            <div className="input-wrapper">
              <input
                className='input'
                name="weight"
                placeholder='Weight'
                type="number"
                onChange={handleInputChange}
                value={shipmentForm?.weight}
              />
            </div>
          </div>
          <div className='input-div'>
            <label className='input-label'>Estimated Delivery Date:</label>
            <div className="input-wrapper">
              <input
                className='input'
                name="estimatedDeliveryDate"
                placeholder='Estimated Delivery Date'
                type="datetime-local"
                onChange={handleInputChange}
                value={shipmentForm?.estimatedDeliveryDate}
              />
            </div>
          </div>
          <div className='input-div'>
            <label className='input-label'>Create Date:</label>
            <div className="input-wrapper">
              <input
                className='input'
                name="createDate"
                placeholder='Create Date'
                type="datetime-local"
                onChange={handleInputChange}
                value={shipmentForm?.createDate}
              />
            </div>
          </div>
          {error && <p className='error-message'>{error}</p>}
          <button className='submit-button' type="submit">submit</button>
        </form>
        
      </div>
    </div>
  );
};


export default EditShipment;