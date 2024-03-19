import Add from "../../appointments/add/Add";
import Appointments from "../../appointments/appointments/Appointment";
import Home from "../../home/home/Home";
import Page404 from "../page404/Page404";
import { Routes, Route, Navigate } from 'react-router-dom';
function Routing(): JSX.Element {
    return (
        <Routes>

            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Navigate to="/" />} />

            <Route path="/appointments" element={<Appointments />} />
            <Route path="/appointments/add" element={<Add />} />

            <Route path="*" element={<Page404 />} />

        </Routes>

    );
}

export default Routing;
