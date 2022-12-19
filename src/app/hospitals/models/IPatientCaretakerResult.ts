import {IBaseResult} from "../../core/models/IBaseResult";

export interface IPatientCaretakerResult extends IBaseResult {
    firstName: string;
    lastName: string;
    patronymic: string;
    phone: string;
    email: string;
    birthDate: Date;
}
