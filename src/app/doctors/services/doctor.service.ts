import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {IDoctorResult} from "../../hospitals/models/IDoctorResult";
import {IPatientResult} from "../../hospitals/models/IPatientResult";

@Injectable({
    providedIn: 'root'
})
export class DoctorService {

    private readonly api = environment.api;

    constructor(private httpClient: HttpClient) {
    }

    public get = (queryParams?: {}) => {
        return this.httpClient.get<IDoctorResult[]>(`${this.api}doctor`, {params: queryParams});
    }

    public getById = (id: string) => {
        return this.httpClient.get<IDoctorResult>(`${this.api}doctor/${id}`);
    }

    public create = (body: FormData) => {
        return this.httpClient.post<IDoctorResult>(`${this.api}doctor`, body);
    }

    public update = (id: string, body: FormData) => {
        return this.httpClient.put<IDoctorResult>(`${this.api}doctor/${id}`, body);
    }

    public getPatients(doctorId: string, queryParams?: {}) {
        return this.httpClient.get<IPatientResult[]>(`${this.api}doctor/${doctorId}/patients`, {params: queryParams});
    }
}
