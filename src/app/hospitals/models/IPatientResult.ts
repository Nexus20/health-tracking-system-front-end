import {IBaseResult} from "../../core/models/IBaseResult";

export interface IPatientResult extends IBaseResult {
    hospitalId: string;
    doctorId?: string;
    firstName: string;
    lastName: string;
    patronymic: string;
    phone: string;
    email: string;
    birthDate: Date;
}

