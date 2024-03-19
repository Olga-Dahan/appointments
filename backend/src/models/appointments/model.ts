import DTO from './dto';
import DTO_DURATION from './dtoDuration';

export default interface Model {
    getAllByGroup(groupId: number): Promise<DTO[]>;
    add(appointment: DTO): Promise<DTO>;
    delete(id: number): Promise<boolean>;
}