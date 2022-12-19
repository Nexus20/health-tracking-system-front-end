import {IBaseResult} from "../../core/models/IBaseResult";

export interface IPatientResult extends IBaseResult {
    hospitalId: string;
    doctorId?: string;
    patientCaretakerId?: string;
    firstName: string;
    lastName: string;
    patronymic: string;
    phone: string;
    email: string;
    birthDate: Date;
}

