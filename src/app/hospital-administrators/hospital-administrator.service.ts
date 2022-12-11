import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {IHospitalAdministratorResult} from "../hospitals/models/IHospitalAdministratorResult";

@Injectable({
    providedIn: 'root'
})
export class HospitalAdministratorService {

    private readonly api = environment.api;

    constructor(private httpClient: HttpClient) {
    }

    public getById = (id: string) => {
        return this.httpClient.get<IHospitalAdministratorResult>(`${this.api}hospitalAdministrator/${id}`);
    }

    public create = (body: FormData) => {
        return this.httpClient.post<IHospitalAdministratorResult>(`${this.api}hospitalAdministrator`, body);
    }

    public update = (id: string, body: FormData) => {
        return this.httpClient.put<IHospitalAdministratorResult>(`${this.api}hospitalAdministrator/${id}`, body);
    }
}
