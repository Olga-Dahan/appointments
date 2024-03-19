import Model from "./model";
import appointment from "./mysql";

export default function getModel(): Model {
    return appointment;
}