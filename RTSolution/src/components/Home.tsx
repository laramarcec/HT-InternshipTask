import React from 'react';
import { Link } from 'react-router-dom';

import '../styles/Home.css';

const Home: React.FC = () => {
	return (
		<div className='home-div'>
			<div className='home-linkdiv'>
				<Link className="home-link" to="/shipmentTracking">
					<span className="material-symbols-outlined">
							list
					</span>
					<p>
						get shipment tracking
					</p>
				</Link>
				<Link className="home-link" to="/shipmentTracking/new">
					<span className="material-symbols-outlined">
							add
					</span>
					<p>
						create new shipment
					</p>
				</Link>
			</div>
		</div>
			
	);
};

export default Home;
