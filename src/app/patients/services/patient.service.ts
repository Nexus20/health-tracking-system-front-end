import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {IPatientResult} from "../../hospitals/models/IPatientResult";

@Injectable({
    providedIn: 'root'
})
export class PatientService {

    private readonly api = environment.api;

    constructor(private httpClient: HttpClient) {
    }

    public get = (queryParams?: {}) => {
        return this.httpClient.get<IPatientResult[]>(`${this.api}patient`, {params: queryParams});
    }

    public getById = (id: string) => {
        return this.httpClient.get<IPatientResult>(`${this.api}patient/${id}`);
    }

    public create = (body: FormData) => {
        return this.httpClient.post<IPatientResult>(`${this.api}patient`, body);
    }

    public update = (id: string, body: FormData) => {
        return this.httpClient.put<IPatientResult>(`${this.api}patient/${id}`, body);
    }
}
