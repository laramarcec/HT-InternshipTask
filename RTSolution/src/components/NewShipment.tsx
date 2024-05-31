import React, { ChangeEvent, FormEvent, useState } from 'react';

import {addShipment} from "../services/api.js";
import '../styles/New.css';

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
  order: OrderRefType[];
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

const NewShipment: React.FC = () => {
  const [error, setError] = useState<string>('');
  const [shipmentForm, setShipmentForm] = useState<Shipment>({
    id:'',
    carrier: '',
    trackingCode: '',
    trackingDate: '',
    weight: 0,
    estimatedDeliveryDate: '',
    addressFrom: {
      id:'',
      streetNr: '',
      streetName: '',
      postcode: '',
      city: '',
      country: '',
    },
    addressTo: {
      id:'',
      streetNr: '',
      streetName: '',
      postcode: '',
      city: '',
      country: '',
    },
    relatedCustomer: {
      id: '',
      href: '',
      name: '',
      description:'',
    },
    createDate: '',
    carrierTrackingUrl: '',
  status: '',
  statusChangeDate: '',
  statusChangeReason:'',
  order: [],
  });

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    const [mainKey, subKey] = name.split('.');

    if (subKey) {
      setShipmentForm((prevForm) => ({
        ...prevForm,
        [mainKey]: {
          ...prevForm[mainKey as keyof Shipment] as Address | CustomerRefType,
          [subKey]: value,
        },
      }));
    } else {
      setShipmentForm((prevForm) => ({
        ...prevForm,
        [name]: value,
      }));
    }
  };

  const handleStatusChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setShipmentForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleClearField = (fieldName: string) => {
    setShipmentForm((prevForm) => {
      const [mainKey, subKey] = fieldName.split('.');
      if (subKey) {
        return {
          ...prevForm,
          [mainKey]: {
            ...prevForm[mainKey as keyof Shipment] as Address | CustomerRefType,
            [subKey]: '',
          },
        };
      } else {
        return {
          ...prevForm,
          [fieldName]: '',
        };
      }
    });
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
      const value = getNestedValue(shipmentForm, field);
      return !value || (Array.isArray(value) && value.length === 0);
    });
  
    if (emptyFields.length > 0) {
      setError('Please fill in all required fields.');
      return;
    }
  
    const formattedData = {
      ...shipmentForm,
      weight: parseFloat(shipmentForm.weight.toString()),
      trackingDate: new Date(shipmentForm.trackingDate).toISOString(),
      estimatedDeliveryDate: new Date(shipmentForm.estimatedDeliveryDate).toISOString(),
      createDate: new Date(shipmentForm.createDate).toISOString(),
    } as Shipment;
  
    addShipment(formattedData);
  
    console.log(formattedData);
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

  
  
  
  const renderClearButton = (fieldName: string) => {
    return (
      <button
        type="button"
        className="clear-button"
        onClick={() => handleClearField(fieldName)}
      >
        &times;
      </button>
    );
  };

  return (
    <div className='new-div'>
      <p className='header-p'>new shipment</p>
      <div className="newShipment">
        <form onSubmit={onSubmit}>
          <div className='input-div'>
            <label className='input-label'>Carrier:</label>
            <select
              className='input'
              name="carrier"
              value={shipmentForm.carrier}
              onChange={handleStatusChange}
            >
              <option value="">Carrier</option>
              <option value="dhl">DHL</option>
              <option value="fedex">FedEx</option>
              <option value="gls">GLS</option>
              <option value="ups">UPS</option>
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
                value={shipmentForm.trackingCode}
              />
              {renderClearButton("trackingCode")}
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
                value={shipmentForm.trackingDate}
              />
              {renderClearButton("trackingDate")}
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
                value={shipmentForm.relatedCustomer.id}
              />
              {renderClearButton("relatedCustomer.id")}
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
                value={shipmentForm.addressFrom.streetNr}
              />
              {renderClearButton("addressFrom.streetNr")}
            </div>
            <div className="input-wrapper">
              <input
                className='input'
                name="addressFrom.streetName"
                placeholder='Street Name'
                onChange={handleInputChange}
                value={shipmentForm.addressFrom.streetName}
              />
              {renderClearButton("addressFrom.streetName")}
            </div>
            <div className="input-wrapper">
              <input
                className='input'
                name="addressFrom.postcode"
                placeholder='Postcode'
                onChange={handleInputChange}
                value={shipmentForm.addressFrom.postcode}
              />
              {renderClearButton("addressFrom.postcode")}
            </div>
            <div className="input-wrapper">
              <input
                className='input'
                name="addressFrom.city"
                placeholder='City'
                onChange={handleInputChange}
                value={shipmentForm.addressFrom.city}
              />
              {renderClearButton("addressFrom.city")}
            </div>
            <div className="input-wrapper">
              <input
                className='input'
                name="addressFrom.country"
                placeholder='Country'
                onChange={handleInputChange}
                value={shipmentForm.addressFrom.country}
              />
              {renderClearButton("addressFrom.country")}
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
                value={shipmentForm.addressTo.streetNr}
              />
              {renderClearButton("addressTo.streetNr")}
            </div>
            <div className="input-wrapper">
              <input
                className='input'
                name="addressTo.streetName"
                placeholder='Street Name'
                onChange={handleInputChange}
                value={shipmentForm.addressTo.streetName}
              />
              {renderClearButton("addressTo.streetName")}
            </div>
            <div className="input-wrapper">
              <input
                className='input'
                name="addressTo.postcode"
                placeholder='Postcode'
                onChange={handleInputChange}
                value={shipmentForm.addressTo.postcode}
              />
              {renderClearButton("addressTo.postcode")}
            </div>
            <div className="input-wrapper">
              <input
                className='input'
                name="addressTo.city"
                placeholder='City'
                onChange={handleInputChange}
                value={shipmentForm.addressTo.city}
              />
              {renderClearButton("addressTo.city")}
            </div>
            <div className="input-wrapper">
              <input
                className='input'
                name="addressTo.country"
                placeholder='Country'
                onChange={handleInputChange}
                value={shipmentForm.addressTo.country}
              />
              {renderClearButton("addressTo.country")}
            </div>
          </div>
          <div className='input-div'>
            <label className='input-label'>Weight:</label>
            <div className="input-wrapper">
              <input
                className='input'
                name="weight"
                placeholder='Weight'
                type="number"
                onChange={handleInputChange}
                value={shipmentForm.weight}
              />
              {renderClearButton("weight")}
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
                value={shipmentForm.estimatedDeliveryDate}
              />
              {renderClearButton("estimatedDeliveryDate")}
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
                value={shipmentForm.createDate}
              />
              {renderClearButton("createDate")}
            </div>
          </div>
          <button className='submit-button' type="submit">submit</button>
        </form>
        {error && <p className='error-message'>{error}</p>}
      </div>
    </div>
  );
};

export default NewShipment;
