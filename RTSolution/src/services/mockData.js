const mockShipments = [
	{
		id: '001',
		status: 'delivered',
		carrier: 'GLS',
		trackingCode: 'GLS123456',
		carrierTrackingUrl: 'https://gls-group.com/HR/hr/pracenje-posiljke/?match=GLS123456',
		trackingDate: '2023-01-01T00:00:00Z',
		statusChangeDate: '2023-01-02T00:00:00Z',
		statusChangeReason: 'Delivered on time',
		weight: 500,
		estimatedDeliveryDate: '2023-01-02T00:00:00Z',
		addressFrom: {
			id: 'from1',
			streetNr: '63',
			streetName: 'Ilica',
			streetSuffix: '',
			postcode: '10000',
			city: 'Zagreb',
			country: 'HR'
		},
		addressTo: {
			id: 'to1',
			streetNr: '2',
			streetName: 'Novakova ulica',
			streetSuffix: '',
			postcode: '10000',
			city: 'Zagreb',
			country: 'HR'
		},
		order: [
			{
				id: 'order1',
				href: 'https://example.com/orders/order1',
				name: 'Order 1',
				referredType: 'type1'
			}
		],
		relatedCustomer: {
			id: 'customer1',
			href: 'https://example.com/customers/customer1',
			name: 'Ivan Horvat',
			description: 'Test Customer 001'
		},
		createDate: '2023-01-01T00:00:00Z'
	},
	{
			id: '002',
			status: 'delivered',
			carrier: 'GLS',
			trackingCode: 'GLS123457',
			carrierTrackingUrl: 'https://gls-group.com/HR/hr/pracenje-posiljke/?match=GLS123457',
			trackingDate: '2023-01-02T00:00:00Z',
			statusChangeDate: '2023-01-03T00:00:00Z',
			statusChangeReason: 'Delivered on time',
			weight: 470,
			estimatedDeliveryDate: '2023-01-03T00:00:00Z',
			addressFrom: {
				id: 'from2',
				streetNr: '63',
				streetName: 'Ilica',
				streetSuffix: '',
				postcode: '10000',
				city: 'Zagreb',
				country: 'HR'
			},
			addressTo: {
				id: 'to2',
				streetNr: '3',
				streetName: 'Unska',
				streetSuffix: '',
				postcode: '10000',
				city: 'Zagreb',
				country: 'HR'
			},
			order: [
				{
					id: 'order2',
					href: 'https://example.com/orders/order2',
					name: 'Order 2',
					referredType: 'type2'
				}
			],
			relatedCustomer: {
				id: 'customer2',
				href: 'https://example.com/customers/customer2',
				name: 'Ana Lovrić',
				description: 'Test Customer 002'
			},
			createDate: '2023-01-02T00:00:00Z'
	},
	{
		id: '003',
		status: 'inProcess',
		carrier: 'UPS',
		trackingCode: 'UPS789101',
		carrierTrackingUrl: 'https://www.ups.com/track?loc=en_US&tracknum=UPS789101',
		trackingDate: '2023-01-03T00:00:00Z',
		statusChangeDate: '2023-01-04T00:00:00Z',
		statusChangeReason: 'In processing',
		weight: 600,
		estimatedDeliveryDate: '2023-01-05T00:00:00Z',
		addressFrom: {
			id: 'from3',
			streetNr: '4',
			streetName: 'Savska',
			streetSuffix: '',
			postcode: '10000',
			city: 'Zagreb',
			country: 'HR'
		},
		addressTo: {
			id: 'to3',
			streetNr: '5',
			streetName: 'Vukovarska',
			streetSuffix: '',
			postcode: '21000',
			city: 'Split',
			country: 'HR'
		},
		order: [
			{
				id: 'order3',
				href: 'https://example.com/orders/order3',
				name: 'Order 3',
				referredType: 'type3'
			}
		],
		relatedCustomer: {
			id: 'customer3',
			href: 'https://example.com/customers/customer3',
			name: 'Marko Kovač',
			description: 'Test Customer 003'
		},
		createDate: '2023-01-03T00:00:00Z'
	},
	{
		id: '004',
		status: 'shipped',
		carrier: 'FedEx',
		trackingCode: 'FedEx101112',
		carrierTrackingUrl: 'https://www.fedex.com/apps/fedextrack/?tracknumbers=FedEx101112',
		trackingDate: '2023-01-04T00:00:00Z',
		statusChangeDate: '2023-01-05T00:00:00Z',
		statusChangeReason: 'Shipped',
		weight: 750,
		estimatedDeliveryDate: '2023-01-06T00:00:00Z',
		addressFrom: {
			id: 'from4',
			streetNr: '6',
			streetName: 'Radnička',
			streetSuffix: '',
			postcode: '10000',
			city: 'Zagreb',
			country: 'HR'
		},
		addressTo: {
			id: 'to4',
			streetNr: '7',
			streetName: 'Marulićeva',
			streetSuffix: '',
			postcode: '21000',
			city: 'Split',
			country: 'HR'
		},
		order: [
			{
				id: 'order4',
				href: 'https://example.com/orders/order4',
				name: 'Order 4',
				referredType: 'type4'
			}
		],
		relatedCustomer: {
			id: 'customer4',
			href: 'https://example.com/customers/customer4',
			name: 'Petra Novak',
			description: 'Test Customer 004'
		},
		createDate: '2023-01-04T00:00:00Z'
	},
	{
		id: '005',
		status: 'returned',
		carrier: 'DHL',
		trackingCode: 'DHL345678',
		carrierTrackingUrl: 'https://dhl.com/track?code=DHL345678',
		trackingDate: '2023-01-05T00:00:00Z',
		statusChangeDate: '2023-01-06T00:00:00Z',
		statusChangeReason: 'Returned to sender',
		weight: 650,
		estimatedDeliveryDate: '2023-01-07T00:00:00Z',
		addressFrom: {
			id: 'from5',
			streetNr: '8',
			streetName: 'Zagrebačka',
			streetSuffix: '',
			postcode: '10000',
			city: 'Zagreb',
			country: 'HR'
		},
		addressTo: {
			id: 'to5',
			streetNr: '9',
			streetName: 'Riječka',
			streetSuffix: '',
			postcode: '51000',
			city: 'Rijeka',
			country: 'HR'
		},
		order: [
			{
				id: 'order5',
				href: 'https://example.com/orders/order5',
				name: 'Order 5',
				referredType: 'type5'
			}
		],
		relatedCustomer: {
			id: 'customer5',
			href: 'https://example.com/customers/customer5',
			name: 'Marta Perić',
			description: 'Test Customer 005'
		},
		createDate: '2023-01-05T00:00:00Z'
	},
	{
        id: '006',
        status: 'error',
        carrier: 'UPS',
        trackingCode: 'UPS901234',
        carrierTrackingUrl: 'https://www.ups.com/track?loc=en_US&tracknum=UPS901234',
        trackingDate: '2023-01-06T00:00:00Z',
        statusChangeDate: '2023-01-07T00:00:00Z',
        statusChangeReason: 'Tracking error',
        weight: 700,
        estimatedDeliveryDate: '2023-01-08T00:00:00Z',
        addressFrom: {
          id: 'from6',
          streetNr: '10',
          streetName: 'Slavonska avenija',
          streetSuffix: '',
          postcode: '10000',
          city: 'Zagreb',
          country: 'HR'
        },
        addressTo: {
          id: 'to6',
          streetNr: '11',
          streetName: 'Hrvatske bratske zajednice',
          streetSuffix: '',
          postcode: '10000',
          city: 'Zagreb',
          country: 'HR'
        },
        order: [
          {
            id: 'order6',
            href: 'https://example.com/orders/order6',
            name: 'Order 6',
            referredType: 'type6'
          }
        ],
        relatedCustomer: {
          id: 'customer6',
          href: 'https://example.com/customers/customer6',
          name: 'Goran Prpić',
          description: 'Test Customer 006'
        },
        createDate: '2023-01-06T00:00:00Z'
	},
	{
		id: '007',
		status: 'outForDelivery',
		carrier: 'DHL',
		trackingCode: 'DHL456789',
		carrierTrackingUrl: 'https://dhl.com/track?code=DHL456789',
		trackingDate: '2023-01-07T00:00:00Z',
		statusChangeDate: '2023-01-08T00:00:00Z',
		statusChangeReason: 'Out for delivery',
		weight: 800,
		estimatedDeliveryDate: '2023-01-09T00:00:00Z',
		addressFrom: {
			id: 'from7',
			streetNr: '12',
			streetName: 'Maksimirska',
			streetSuffix: '',
			postcode: '10000',
			city: 'Zagreb',
			country: 'HR'
		},
		addressTo: {
			id: 'to7',
			streetNr: '13',
			streetName: 'Petrova',
			streetSuffix: '',
			postcode: '10000',
			city: 'Zagreb',
			country: 'HR'
		},
		order: [
			{
				id: 'order7',
				href: 'https://example.com/orders/order7',
				name: 'Order 7',
				referredType: 'type7'
			}
		],
		relatedCustomer: {
			id: 'customer7',
			href: 'https://example.com/customers/customer7',
			name: 'Ivana Babić',
			description: 'Test Customer 007'
		},
		createDate: '2023-01-07T00:00:00Z'
	},
	{
		id: '008',
		status: 'inTransit',
		carrier: 'FedEx',
		trackingCode: 'FedEx234567',
		carrierTrackingUrl: 'https://www.fedex.com/apps/fedextrack/?tracknumbers=FedEx234567',
		trackingDate: '2023-01-08T00:00:00Z',
		statusChangeDate: '2023-01-09T00:00:00Z',
		statusChangeReason: 'In transit',
		weight: 850,
		estimatedDeliveryDate: '2023-01-10T00:00:00Z',
		addressFrom: {
			id: 'from8',
			streetNr: '14',
			streetName: 'Vlaška',
			streetSuffix: '',
			postcode: '10000',
			city: 'Zagreb',
			country: 'HR'
		},
		addressTo: {
			id: 'to8',
			streetNr: '15',
			streetName: 'Palmotićeva',
			streetSuffix: '',
			postcode: '10000',
			city: 'Zagreb',
			country: 'HR'
		},
		order: [
			{
				id: 'order8',
				href: 'https://example.com/orders/order8',
				name: 'Order 8',
				referredType: 'type8'
			}
		],
		relatedCustomer: {
			id: 'customer8',
			href: 'https://example.com/customers/customer8',
			name: 'Nikola Jurković',
			description: 'Test Customer 008'
		},
		createDate: '2023-01-08T00:00:00Z'
	},
	{
		id: '009',
		status: 'pending',
		carrier: 'GLS',
		trackingCode: 'GLS678910',
		carrierTrackingUrl: 'https://gls-group.com/HR/hr/pracenje-posiljke/?match=GLS678910',
		trackingDate: '2023-01-09T00:00:00Z',
		statusChangeDate: '2023-01-10T00:00:00Z',
		statusChangeReason: 'Pending confirmation',
		weight: 300,
		estimatedDeliveryDate: '2023-01-11T00:00:00Z',
		addressFrom: {
			id: 'from9',
			streetNr: '16',
			streetName: 'Frankopanska',
			streetSuffix: '',
			postcode: '10000',
			city: 'Zagreb',
			country: 'HR'
		},
		addressTo: {
			id: 'to9',
			streetNr: '17',
			streetName: 'Medulićeva',
			streetSuffix: '',
			postcode: '10000',
			city: 'Zagreb',
			country: 'HR'
		},
		order: [
			{
				id: 'order9',
				href: 'https://example.com/orders/order9',
				name: 'Order 9',
				referredType: 'type9'
			}
		],
		relatedCustomer: {
			id: 'customer9',
			href: 'https://example.com/customers/customer9',
			name: 'Josip Marić',
			description: 'Test Customer 009'
		},
		createDate: '2023-01-09T00:00:00Z'
	},
	{
		id: '010',
		status: 'cancelled',
		carrier: 'GLS',
		trackingCode: 'GLS345678',
		carrierTrackingUrl: 'https://gls-group.com/HR/hr/pracenje-posiljke/?match=GLS345678',
		trackingDate: '2023-01-10T00:00:00Z',
		statusChangeDate: '2023-01-11T00:00:00Z',
		statusChangeReason: 'Order cancelled',
		weight: 400,
		estimatedDeliveryDate: '2023-01-12T00:00:00Z',
		addressFrom: {
			id: 'from10',
			streetNr: '18',
			streetName: 'Tkalčićeva',
			streetSuffix: '',
			postcode: '10000',
			city: 'Zagreb',
			country: 'HR'
		},
		addressTo: {
			id: 'to10',
			streetNr: '19',
			streetName: 'Gundulićeva',
			streetSuffix: '',
			postcode: '10000',
			city: 'Zagreb',
			country: 'HR'
		},
		order: [
			{
				id: 'order10',
				href: 'https://example.com/orders/order10',
				name: 'Order 10',
				referredType: 'type10'
			}
		],
		relatedCustomer: {
			id: 'customer10',
			href: 'https://example.com/customers/customer10',
			name: 'Katarina Kovačić',
			description: 'Test Customer 010'
		},
		createDate: '2023-01-10T00:00:00Z'
	}
];

export default mockShipments;
  