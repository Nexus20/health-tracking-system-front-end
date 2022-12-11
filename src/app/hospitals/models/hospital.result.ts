import {IBaseResult} from "../../core/models/IBaseResult";

export interface IHospitalResult extends IBaseResult {
    name: string;
    address: string;
    doctorsCount: number;
    patientsCount: number;
}
