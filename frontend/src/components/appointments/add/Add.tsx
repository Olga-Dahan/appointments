import { useEffect, useState } from "react";
import "./Add.css";
import groupsService from "../../../services/Groups";
import notify from "../../../services/Notify";
import Group from "../../../models/Group";
import { useForm } from "react-hook-form";
import Appointment from "../../../models/Appointment";
import appointmentsService from "../../../services/Appointments";
import { useNavigate } from "react-router-dom";


function Add(): JSX.Element {
    const [groups, setGroups] = useState<Group[]>([]);
    const { register, handleSubmit, formState } = useForm<Appointment>();

    useEffect(() => {
        groupsService.getAll()
            .then(setGroups)
            .catch(notify.error)
    }, []);

    const navigate = useNavigate();

    async function addAppointment(appointment: Appointment) {
        try {
            const addedAppointment = await appointmentsService.add(appointment);
            notify.success(`added appointment with id ${addedAppointment.id}`)
            navigate('/appointments');
        } catch (err) {
            navigate('/home');
            notify.error(err);
        }
    }

    return (

        <div className="Add">
            <form onSubmit={handleSubmit(addAppointment)}>
                <select defaultValue=''  {...register('groupId', { 
                    required: {
                        value: true,
                        message: 'this field is required'
                    }
                })} >
                    <option disabled value=''>Please select group</option>
                    {groups.map(group => <option key={group.id} value={group.id}>{group.name}</option>)}
                </select>
                <span className="error">{formState.errors.groupId?.message}</span>

                <input type="datetime-local" placeholder="appointment starts" {...register('startAppointment', {
                    required: {
                        value: true,
                        message: 'date and time of appointment is a required field'
                    },
                    min: {
                        value: Date(),
                        message: `date cannot be earlier than "NOW"`
                    }
                })} />
                <span className="error">{formState.errors.startAppointment?.message}</span>

                <input type="datetime-local" placeholder="appointment ends" {...register('endAppointment', {
                    required: {
                        value: true,
                        message: `appointment's end date is a required field`
                    },
                    min: {
                        value: Date(),
                        message: `date cannot be earlier than "NOW"`
                    }
                })} />
                <span className="error">{formState.errors.endAppointment?.message}</span>

                <input type="text" placeholder="description" {...register('description', {
                    required: {
                        value: true,
                        message: `appointment's description is a required field`
                    }
                })} />
                <span className="error">{formState.errors.description?.message}</span>

                <input type="text" placeholder="room" {...register('room', {
                    required: {
                        value: true,
                        message: `appointment's room is a required field`
                    },
                })} />
                <span className="error">{formState.errors.room?.message}</span>

                <button>Add Appointment</button>
            </form>
        </div>
    );
}

export default Add;
