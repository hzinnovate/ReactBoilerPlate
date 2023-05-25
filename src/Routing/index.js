import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import * as WEB_SCREENS from '../Screens';
import * as ADMIN_SCREENS from '../AdminDashboard';
import * as AUTH_SCREENS from '../Authentication';


const RoutingFile = () => {
    const user = useSelector(({ auth }) => auth.user);

    const PrivateRoute = ({ element: Element, ...rest }) => {
        return user ? (
            <Element {...rest} />
        ) : (
            <Navigate to="/login" replace state={{ from: rest.location }} />
        );
    };
    const LoginRedirection = ({ location }) => {
        const from = location?.state?.from || '/admin';
        return user ? <Navigate to={from} replace /> : <AUTH_SCREENS.LoginPage />;
    };

    return (
        <Router>
            <Routes>
                <Route path="/" element={<WEB_SCREENS.Main />} />
                <Route path="/amenities" element={<WEB_SCREENS.Amenities />} />
                <Route path="/gallery" element={<WEB_SCREENS.Gallery />} />
                <Route path="/login" element={<LoginRedirection />} />
                <Route path="/admin" element={<PrivateRoute element={ADMIN_SCREENS.AdminDashboard} />} />
                <Route path="/gallery-admin" element={<PrivateRoute element={ADMIN_SCREENS.GalleryDashboard} />} />
            </Routes>
        </Router>
    );
};

export default RoutingFile;