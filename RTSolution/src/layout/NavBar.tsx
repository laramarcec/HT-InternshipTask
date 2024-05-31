import React from 'react';

import '../styles/Layout.css';
import { Link } from 'react-router-dom';

const NavBar: React.FC = () => {
	return(
		<div className='navbar-div'>
			<Link to='/' className="navbar-button">
				<p>
					ShipmentTracking
				</p>
			</Link>
		</div>
	)
};

export default NavBar;

