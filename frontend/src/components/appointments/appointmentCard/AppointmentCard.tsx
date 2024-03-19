import Appointment from "../../../models/Appointment";
import "./AppointmentCard.css";

interface AppointmentCardProps {
    appointment: Appointment,
    deleteFunction: (appointmentId: number) => void
}

function AppointmentCard(props: AppointmentCardProps): JSX.Element {

    function deleteMe() {
        if (!props.appointment.id) return;
        props.deleteFunction(props.appointment.id)
    }

    return (
        <div className="AppointmentCard">
            <div>
                <br />
                <b>From:</b> {props.appointment.startAppointment?.toString()}
                <br />
                <b>To:</b> {props.appointment.endAppointment?.toString()}
                <br />
                <b>Duration:</b> {props.appointment.duration?.toString()}
                <br />
                <b>Description:</b> {props.appointment.description}
                <br />
                <b>Room:</b> {props.appointment.room}
                <br />
                <button onClick={deleteMe}>delete</button>
            </div>
        </div>
    );
}

export default AppointmentCard;
