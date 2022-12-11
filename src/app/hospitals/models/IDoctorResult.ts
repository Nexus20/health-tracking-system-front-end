import {IBaseResult} from "../../core/models/IBaseResult";

export interface IDoctorResult extends IBaseResult {
    hospitalId: string;
    firstName: string;
    lastName: string;
    patronymic: string;
    phone: string;
    email: string;
    birthDate: Date;
}
