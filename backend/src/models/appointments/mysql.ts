import Model from "./model";
import DTO from './dto';
import DTO_DURATION from './dtoDuration';
import { OkPacketParams } from "mysql2";
import query from "../../db/mysql";

class Appointment implements Model {

    public async getAllByGroup(groupId: number): Promise<DTO[]> {
        const appointments = await query(`
            SELECT  id,
                    groupId,
                    DATE_FORMAT(startApp, '%a, %Y %M %D, %H:%i') AS startAppointment,
                    DATE_FORMAT(endApp, '%a, %Y %M %D, %H:%i') AS endAppointment,
                    CONCAT(
                        HOUR(TIMEDIFF(endApp, startApp)), ' h ',
                        MINUTE(TIMEDIFF(endApp, startApp)), ' min'
                    ) AS duration,
                    description,
                    room
            FROM    appointments  
            WHERE   groupId = ?
            ORDER BY startApp
        `, [groupId]);
        return appointments;
    }


    public async getOne(id: number): Promise<DTO> {
        const appointment = (await query(`
            SELECT  id,
                    groupId,
                    DATE_FORMAT(startApp, '%a, %Y %M %D, %H:%i') AS startAppointment,
                    DATE_FORMAT(endApp, '%a, %Y %M %D, %H:%i') AS endAppointment,
                    description,
                    room
            FROM    appointments  
            WHERE   id = ?
        `, [id]))[0];
        return appointment;
    }

    public async add(appointment: DTO): Promise<DTO> {
        const {
            groupId,
            startAppointment,
            endAppointment,
            description,
            room
        } = appointment;

        if (endAppointment <= startAppointment) throw Error('The end of appointment must be later than the beginning!');

        const bookedDates = await query(`
            SELECT  *
            FROM    appointments  
            WHERE   groupId = ? 
                AND ((startApp >= ? AND startApp < ?) 
                OR (startApp < ? AND endApp > ?));
        `, [groupId, startAppointment, endAppointment, startAppointment, startAppointment]);

        if (bookedDates.length === 0) {
            const result: OkPacketParams = await query(`
            INSERT INTO appointments (
                groupId,
                startApp,
                endApp,
                description,
                room)
            VALUES (?, ?, ?, ?, ?)
        `, [groupId, startAppointment, endAppointment, description, room]);
            return this.getOne(result.insertId);
        }

        throw Error(`This time is booked already for this development group! Choose another time.`);
    }

    public async delete(id: number): Promise<boolean> {
        const result: OkPacketParams = await query(`
            DELETE FROM appointments
            WHERE id = ?
        `, [id]);
        return Boolean(result.affectedRows);
    }

}

const appointment = new Appointment();
export default appointment;