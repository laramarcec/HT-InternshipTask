import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
	return (
		<div>
			<p style={{textAlign:"center"}}>
				<p><b>404 page not found</b></p>
				<Link to="/"> go home </Link>
			</p>
		</div>    
	);
 
};

export default NotFoundPage;
