import axios from "axios";
import Appointment from "../models/Appointment";
// import AppointmentWithDuration from "../models/AppointmentWithDuration";
import appConfig from "../utils/AppConfig";


class Appointments {

    public async getAllByGroup(groupId: number): Promise<Appointment[]> {
        const response = await axios.get<Appointment[]>(`${appConfig.appointmentsUrl}/groups/${groupId}`);
        const appointments = response.data;
        return appointments;
    }

    public async add(appointment: Appointment): Promise<Appointment> {
        const response = await axios.post<Appointment>(appConfig.appointmentsUrl, appointment);
        const addedAppointment = response.data;
        return addedAppointment;
    }

    public async remove(id: number): Promise<void> {
        await axios.delete(`${appConfig.appointmentsUrl}/${id}`);
    }


}

// singleton
const appointments = new Appointments();
export default appointments;