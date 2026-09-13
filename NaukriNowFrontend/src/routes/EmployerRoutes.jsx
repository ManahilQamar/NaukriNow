import { Routes, Route } from 'react-router-dom';
import EmployerHome from '../components/PostJob/EmployerHome';

const EmployerRoutes = () => {
    return (
        <Routes> 
            <Route path="" element={<EmployerHome />} /> 
            </Routes>);
};
export default EmployerRoutes;