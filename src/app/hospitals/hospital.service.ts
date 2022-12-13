import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {IHospitalResult} from "./models/hospital.result";
import {IHospitalAdministratorResult} from "./models/IHospitalAdministratorResult";
import {IDoctorResult} from "./models/IDoctorResult";
import {IPatientResult} from "./models/IPatientResult";

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

    private readonly api = environment.api;

    constructor(private httpClient: HttpClient) {
    }

    public get = (queryParams?: {}) => {
        return this.httpClient.get<IHospitalResult[]>(`${this.api}hospital`, {params: queryParams});
    }

    public getAdministrators = (id: string, queryParams?: {}) => {
        return this.httpClient.get<IHospitalAdministratorResult[]>(`${this.api}hospital/${id}/administrators`, {params: queryParams});
    }

    public getDoctors = (id: string, queryParams?: {}) => {
        return this.httpClient.get<IDoctorResult[]>(`${this.api}hospital/${id}/doctors`, {params: queryParams});
    }

    public getPatients = (id: string, queryParams?: {}) => {
        return this.httpClient.get<IPatientResult[]>(`${this.api}hospital/${id}/patients`, {params: queryParams});
    }

    public getById = (id: string) => {
        return this.httpClient.get<IHospitalResult>(`${this.api}hospital/${id}`);
    }

    public create = (body: FormData) => {
        return this.httpClient.post<IHospitalResult>(`${this.api}hospital`, body);
    }

    public update = (id: string, body: FormData) => {
        return this.httpClient.put<IHospitalResult>(`${this.api}hospital/${id}`, body);
    }
}
