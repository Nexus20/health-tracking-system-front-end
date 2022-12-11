import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {IHospitalResult} from "./models/hospital.result";

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

    public getById = (id: string) => {
        return this.httpClient.get<IHospitalResult>(`${this.api}hospital/${id}`);
    }

    public create = (body: FormData) => {
        return this.httpClient.post<IHospitalResult>(`${this.api}hospital`, body);
    }
}
