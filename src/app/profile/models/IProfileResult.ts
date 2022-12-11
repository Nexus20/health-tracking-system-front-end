import {IDoctorResult} from "../../hospitals/models/IDoctorResult";
import {IPatientResult} from "../../hospitals/models/IPatientResult";
import {IPatientCaretakerResult} from "../../hospitals/models/IPatientCaretakerResult";
import {IHospitalAdministratorResult} from "../../hospitals/models/IHospitalAdministratorResult";

export interface IProfileResult {
    firstName: string;
    lastName: string;
    patronymic: string;
    phone: string;
    email: string;
    birthDate: Date;
    doctorProfile?: IDoctorResult;
    patientProfile?: IPatientResult;
    patientCareTakerProfile?: IPatientCaretakerResult;
    hospitalAdministratorProfile?: IHospitalAdministratorResult;
}
