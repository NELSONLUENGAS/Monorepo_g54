import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const RouterGuard = ({ children, redirectPath = '/', isAllowed }) => {
	if (!isAllowed) {
		return (
			<Navigate
				to={redirectPath}
				replace
			/>
		);
	}

	return children ? children : <Outlet />;
};

export default RouterGuard;
