import axios from "axios";
import Group from "../models/Group";
import appConfig from "../utils/AppConfig";


class Groups {

    public async getAll(): Promise<Group[]> {

        const response = await axios.get<Group[]>(appConfig.groupsUrl);

        const groups = response.data;

        return groups;
    }


}

// singleton
const groups = new Groups();
export default groups;