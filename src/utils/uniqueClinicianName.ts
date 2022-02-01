import { IDataFromService } from "../types/Appointments";
import { NO_GROUP } from "./appointmentsConstants";

export const uniqueClinicianName = (appointments: IDataFromService[]) => {
    const result: string[] = [];
    for (let item of appointments) {
        const clinicianName: string = item.clinicianName

        if (!result.includes(clinicianName)) {
            result.push(clinicianName);
        }
    }

    result.unshift(NO_GROUP)
    return result;
}