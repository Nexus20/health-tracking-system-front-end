import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {IPatientCaretakerResult} from "../../hospitals/models/IPatientCaretakerResult";
import {IPatientResult} from "../../hospitals/models/IPatientResult";

@Injectable({
  providedIn: 'root'
})
export class PatientCaretakerService {

    private readonly api = environment.api;

    constructor(private httpClient: HttpClient) {
    }

    public get = (queryParams?: {}) => {
        return this.httpClient.get<IPatientCaretakerResult[]>(`${this.api}patientcaretaker`, {params: queryParams});
    }

    public getById = (id: string) => {
        return this.httpClient.get<IPatientCaretakerResult>(`${this.api}patientcaretaker/${id}`);
    }

    public create = (body: FormData) => {
        return this.httpClient.post<IPatientCaretakerResult>(`${this.api}patientcaretaker`, body);
    }

    public update = (id: string, body: FormData) => {
        return this.httpClient.put<IPatientCaretakerResult>(`${this.api}patientcaretaker/${id}`, body);
    }

    public getPatients(caretakerId: string, queryParams?: {}) {
        return this.httpClient.get<IPatientResult[]>(`${this.api}patientcaretaker/${caretakerId}/patients`, {params: queryParams});
    }
}
