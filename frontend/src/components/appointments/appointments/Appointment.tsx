import { ChangeEvent, useEffect, useState } from "react";
import "./Appointment.css";
import groupsService from "../../../services/Groups";
import Group from "../../../models/Group";
import notify from "../../../services/Notify";
import Appointment from "../../../models/Appointment";
import appointmentsService from "../../../services/Appointments";
import AppointmentCard from "../appointmentCard/AppointmentCard";

function Appointments(): JSX.Element {

    const [groups, setGroups] = useState<Group[]>([]);
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [currentGroup, setCurrentGroup] = useState<number>(0);

    useEffect(() => {
        groupsService.getAll()
            .then(setGroups) // groupsFromServer => setGroups(groupsFromServer)
            .catch(notify.error)  // error => notify.error(error)
    }, []);

    async function displayAppointments(args: ChangeEvent<HTMLSelectElement>) {
        try {
            const groupId = +args.target.value;
            setCurrentGroup(groupId);
            const appointments = await appointmentsService.getAllByGroup(groupId);
            setAppointments(appointments);
        } catch (err) {
            notify.error(err)
        }
    }

    async function deleteCard(appointmentId: number) {
        if (!appointmentId) return;
        try {
            await appointmentsService.remove(appointmentId);
            const appointments = await appointmentsService.getAllByGroup(currentGroup);
            setAppointments(appointments);
        } catch (err) {
            notify.error(err)
        }
    }


    return (
        <div className="Appointments">
            <br />
            <label>Development groups: </label>
            <select defaultValue='' onChange={displayAppointments}>
                <option disabled value=''>Please select development group</option>
                {groups.map(group => <option key={group.id} value={group.id}>{group.name}</option>)}
            </select>
            <br />
            {appointments.map(p => <AppointmentCard key={p.id} appointment={p} deleteFunction={deleteCard} />)}
        </div>

    );
}

export default Appointments;
